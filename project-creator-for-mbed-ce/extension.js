
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec); // This lets us use "await" with git commands



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposable = vscode.commands.registerCommand('initialize.createMbedProject', async () => {
		const projectPath = await vscode.window.showOpenDialog({
			canSelectFolders: true,
			canSelectFiles: false,
			canSelectMany: false,
			openLabel: "Select Mbed CE project folder"
		});
	

		if (!projectPath || projectPath.length === 0) {
			vscode.window.showErrorMessage("No folder selected. Please select a folder to create your Mbed CE project.");
			return;
		}
			console.log("projectPath:", projectPath[0].fsPath);

		let projectName = await vscode.window.showInputBox({
    	placeHolder: "Enter your Mbed CE project name"
		});
		if (!projectName) return;
		console.log("projectName:", projectName);

		const mbedInstalled = await vscode.window.showQuickPick([
			{label: 'Yes', description: ""}, 
			{label: 'No', description: "Mbed OS will be installed along with the project."}
		], {
    		placeHolder: "Is Mbed OS already installed on your PC?"
		});

		if(!mbedInstalled || mbedInstalled.label == 'No'){
			// create git thingy
		}

		const projectDir = path.join(projectPath[0].fsPath, projectName);

		let formattedMbedPath = "";
		let mbedOSPath = "";
		if (mbedInstalled && mbedInstalled.label === 'Yes') {
			const mbedPath = await vscode.window.showOpenDialog({
				canSelectFolders: true,
				canSelectFiles: false,
				canSelectMany: false,
				openLabel: "Select Mbed OS folder"
			});
			if (!mbedPath || mbedPath.length === 0) {
				vscode.window.showErrorMessage("No folder selected. Please select the Mbed OS folder.");
				return;
			}
			mbedOSPath = mbedPath[0].fsPath;
			console.log("mbedOSPath:", mbedOSPath);
			formattedMbedPath = mbedOSPath.replace(/\\/g, '/'); // Convert backslashes to forward slashes for CMake
			console.log("Y-Formatted Mbed OS Path for CMake:", formattedMbedPath);
		} else {
			
			formattedMbedPath = 'mbed-os'; 
			console.log("N-Formatted Mbed OS Path for CMake: ", formattedMbedPath);
		}

		

		if(!fs.existsSync(projectPath[0].fsPath)){
			vscode.window.showErrorMessage(`Error: The folder ${projectPath[0].fsPath} no longer exists!`);
			return;
		}

		

		if(fs.existsSync(projectDir)){
			vscode.window.showWarningMessage(`Warning: The folder ${projectDir} already exists! Please choose a different project name or location.`);
			return;
		} else {
			try {
				vscode.window.showInformationMessage(`Creating Mbed CE project "${projectName}" at "${projectPath[0].fsPath}" with Mbed OS  ${mbedInstalled.label === 'Yes' ? "already installed" : "installed along with the project"}.`);
			//1. Create projects directory
			fs.mkdirSync(projectDir);
			console.log(`1.Created project directory: ${projectDir}`);


				//2. Create main.cpp with boilerplate code
			const mainCppPath = path.join(projectDir, 'main.cpp');
			const mainCPPBoilerplate = `#include "mbed.h"\n\nint main() {\n    while (true) {\n        // Your code here\n    }\n}\n`;
			fs.writeFileSync(mainCppPath, mainCPPBoilerplate, 'utf8');

			console.log(`2.Created main.cpp with boilerplate code at: ${mainCppPath}`);

			//3. Create CMakeLists.txt and boilerplate code
			
			const CMakeListsPath = path.join(projectDir, 'CMakeLists.txt');
			const CMakeListsBoilerplate = `cmake_minimum_required(VERSION 3.19)
cmake_policy(VERSION 3.19...3.22)
set(MBED_APP_JSON_PATH mbed_app.json5)

# Use the path provided by the user earlier
include(${formattedMbedPath}/tools/cmake/mbed_toolchain_setup.cmake)

project(${projectName} LANGUAGES C CXX ASM) 
include(mbed_project_setup)

# Add Mbed OS subdirectory using the path from the user
add_subdirectory(${formattedMbedPath} build/mbed-os-build)

add_executable(\${PROJECT_NAME} main.cpp)
target_link_libraries(\${PROJECT_NAME} mbed-os)
mbed_set_post_build(\${PROJECT_NAME})
		`;
			fs.writeFileSync(CMakeListsPath, CMakeListsBoilerplate, 'utf8');
			console.log(`3.Created CMakeLists.txt with boilerplate code at: ${CMakeListsPath}`);

			//4. Create mbed_app.json5 with boilerplate code
			const mbedAppJsonPath = path.join(projectDir, 'mbed_app.json5');
			const mbedAppJsonBoilerplate = `{
   "target_overrides": {
      "*": {
         "platform.stdio-baud-rate": 115200,
         "platform.stdio-buffered-serial": 1
      }
   }
}`;
			fs.writeFileSync(mbedAppJsonPath, mbedAppJsonBoilerplate, 'utf8');
			console.log(`4.Created mbed_app.json5 with boilerplate code at: ${mbedAppJsonPath}`);

			//5. Create build folder
			const buildPath = path.join(projectDir, 'build') //-> needs to be a folder and open terminal in build folder
			fs.mkdirSync(buildPath);
			console.log(`5.Created build folder at: ${buildPath}`);


			//5a. opened main.cpp in editor or open help in editor
			/*
			vscode.workspace.openTextDocument(mainCppPath).then(doc => {
				vscode.window.showTextDocument(doc, { preview: false });
			});
			*/
			const helpFilePath = path.join(projectDir, 'HELP.md');
			const helpBoilerplate = `# Mbed CE Project Help

Welcome to your new Mbed CE project! Here are some quick commands to get you started:

1. Configure the project:
   \`\`\`
   cmake .. -GNinja -DCMAKE_BUILD_TYPE=Develop -DMBED_TARGET=<your mbed target>
   \`\`\`
   Replace <your mbed target> with your specific Mbed board (e.g., NUCLEO_L152RE).

2. Build the code:
   \`\`\`
   ninja
   \`\`\`

3. Build and flash to board:
   \`\`\`
   ninja flash-${projectName}
   \`\`\`

Happy coding!
`;
			fs.writeFileSync(helpFilePath, helpBoilerplate, 'utf8');

			vscode.workspace.openTextDocument(helpFilePath).then(doc => {
				vscode.window.showTextDocument(doc, { preview: false });
			});

			//6: If Mbed OS is not installed, initialize git and add Mbed OS as a submodule
			if(mbedInstalled && mbedInstalled.label === 'No'){

				await vscode.window.withProgress({
					location: vscode.ProgressLocation.Notification,
					title: "Setting up Mbed OS submodule...",
					cancellable: false
				}, async (progress) => {
					progress.report({message: "Initializing git repository..."});
					const options = {cwd: projectDir};
					progress.report({message: "Adding Mbed OS as a submodule..."});
					await execAsync('git submodule add  https://github.com/mbed-ce/mbed-os.git mbed-os', options);

			});
			vscode.window.showInformationMessage("Mbed OS submodule setup complete!");
			console.log("6. Initialized git repository and added Mbed OS as a submodule.");
		}

		//7. Open terminal in build directory
			const terminal = vscode.window.createTerminal({ 
				cwd: buildPath,
				name: `${projectName} Build Terminal` 
			});
			terminal.show(true);

			vscode.window.showInformationMessage(`Project ${projectName} is ready!`);
		} catch (error) {
			vscode.window.showErrorMessage(`Error creating project: ${error.message}`);
		}
	}
	});context.subscriptions.push(disposable);
}


function deactivate() {}

module.exports = {
	activate,
	deactivate
}
