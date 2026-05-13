# Mbed CE Development Suite

A collection of embedded systems projects and tools for Mbed CE development, designed to streamline the workflow and help students.

## 📋 Table of Contents

- [Projects](#projects)
- [Tools](#tools)
- [Setup & Installation](#setup--installation)
- [Hardware & Tech Stack](#hardware--tech-stack)



## Projects

### 4 7-Segment Display Controller
A C++ implementation for controlling 7-segment LED displays on STM32 Nucleo boards using the Mbed OS framework.
- **Status**: Available in `/projects/7segmentDisplay`
- **Language**: C++17
- **Board**: Nucleo L152RE

### Blinking LED
A foundational project demonstrating LED control and GPIO configuration on Mbed-compatible microcontrollers.
- **Status**: Available in `/projects/blinkingLED`
- **Language**: C++17

### I2C Communication
A basic implementation showcasing I2C protocol communication between microcontroller and peripherals.
- **Status**: Available in `/projects/I2C`
- **Language**: C++17

### Test1
A test project for validating Mbed CE setup and configurations.
- **Status**: Available in `/projects/test1`
- **Language**: C++17

## Tools

### 🛠️ VS Code Extension: Project Creator

A custom JavaScript-based VS Code extension that automates Mbed CE project creation.

**Features:**
- One-command setup via `CTRL+SHIFT+P`
- Automatic library linking
- Boilerplate code generation
- Streamlined project initialization

**Requirements:**
- VS Code version 1.80.0 or higher
- Mbed CE toolchain installed

**Usage:**
- Run **Mbed CE: Create new Project** from the Command Palette

**Goal:** Help developers focus on projects rather than environment configuration.

Located in `/project-creator-for-mbed-ce/`

## Setup & Installation

Setting up Mbed CE can be complex. A comprehensive video guide is available to walk you through the complete installation process and toolchain configuration.

For detailed documentation, see the `/docs` folder.

### Toolchain Installation Guide

For a step-by-step setup, refer to the official [Getting Started Guide](https://mbed-ce.dev/getting-started/toolchain-install/) or follow my video tutorial below:

- [Mbed CE Toolchain Installation Guide](https://www.youtube.com/watch?v=mTTktjTeiOo)

## Hardware & Tech Stack

- **Microcontrollers**: STM32 Nucleo boards (compatible with other Arduino-style boards)
- **Framework**: Mbed OS / Mbed CE
- **Language**: C++17
- **Build System**: CMake
- **Development**: VS Code with custom extensions