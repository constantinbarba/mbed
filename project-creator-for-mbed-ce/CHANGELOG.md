# Change Log

All notable changes to the Project Creator for MBED CE extension will be documented in this file.


### 0.0.1 - 28/04/2026
- First release of the Mbed CE Project Creator

### 0.0.2 - 28/04/2026
- Fixed minor bugs

### 0.0.3 - 06/05/2026
- Changed the project creation workflow to open a terminal in the generated project's build folder instead of opening a new VS Code workspace, preventing disruption to the user's current workspace.

### 0.0.4 - 10/09/2026
- Moved the extension entry point into the `src` directory and updated the extension manifest to load it correctly.
- Fixed project creation by using the correct Node.js filesystem API.
- Changed Mbed OS setup to clone the `mbed-os-7.0.0` repository into the generated project when Mbed OS is not already installed.
- Added a generated `HELP.md` file with project configuration, build, and flash instructions.