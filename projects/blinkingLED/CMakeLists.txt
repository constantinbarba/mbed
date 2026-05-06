cmake_minimum_required(VERSION 3.19)
cmake_policy(VERSION 3.19...3.22)
set(MBED_APP_JSON_PATH mbed_app.json5)

# Use the path provided by the user earlier
include(../_Mbed-OS_Versions/mbed-os_7.0.0/tools/cmake/mbed_toolchain_setup.cmake)

project(blinkingLED LANGUAGES C CXX ASM) 
include(mbed_project_setup)

# Add Mbed OS subdirectory using the path from the user
add_subdirectory(../_Mbed-OS_Versions/mbed-os_7.0.0 build/mbed-os-build)

add_executable(${PROJECT_NAME} main.cpp)
target_link_libraries(${PROJECT_NAME} mbed-os)
mbed_set_post_build(${PROJECT_NAME})
		