# Mbed CE Project Help

Welcome to your new Mbed CE project! Here are some quick commands to get you started:

1. Configure the project:
   ```
   cmake .. -GNinja -DCMAKE_BUILD_TYPE=Develop -DMBED_TARGET=<your mbed target>
   ```
   Replace <your mbed target> with your specific Mbed board (e.g., NUCLEO_L152RE).

2. Build the code:
   ```
   ninja
   ```

3. Build and flash to board:
   ```
   ninja flash-I2C
   ```

Happy coding!
