#include "mbed.h"

//1. Create an I2C object called i2c with the SDA pin as PB_9 and the SCL pin as PB_8
I2C i2c(I2C_SDA, I2C_SCL);

//2. Get the address of the slave device 0b0111___0 (the last bit is the R/W bit, which is 0 for write and 1 for read)
int address = 0b01110000;   // 0b0111___0, where the last bit is the Read/Write bit or also 0x70 for the address 000


//3. You can only send a byte at a time, so create a char array of size 1 to hold the data you want to send
char data[1];

int main() {
    i2cData[0] = 0b00000000; 
    // Set all pins to low. By controlling the 8 bits of the byte, you can control the state of 8 pins on the slave device. 
    // For example, if you want to set pin D0 high and all other pins low, you would set i2cData[0] to 0b00000001.
    // If you want to set pin D1 high and all other pins low, you would set i2cData[0] to 0b00000010, and so on.

    while (true) {
        i2c.write(address, data, 1); // Write the data to the slave device at the specified address
        ThisThread::sleep_for(100ms); // Wait for 100ms before sending the next byte
    }
}




/* 1. Code for a Roullete with 2 slave devices, where the first slave device is at address 0b01110000 and the second slave device is at address 0b01110010. 
The first slave device controls the pins D0-D7 and the second slave device controls the pins D8-D15. The code will light up one pin at a time in a loop, starting with D0 and ending with D15, and then repeat. 
Each pin will be lit for 100ms before moving to the next pin. 
#include "mbed.h"

I2C i2c (I2C_SDA,I2C_SCL);
// main() runs in its own thread in the OS
int main()
{
    const int addr8bitWrite_000 =0x70;
    const int addr8bitWrite_100 =0x72;
    char i2cData[1];

    int address[2];
    address[0] = addr8bitWrite_000;
    address[1] = addr8bitWrite_100;

    char pinData[8];
    i2cData[0] = 0b00000000;
    i2c.write(address[0],i2cData,1);
    i2c.write(address[1],i2cData,1);

     pinData[0] = 0b00000001; // high
     pinData[1] = 0b00000010;
     pinData[2] = 0b00000100;
     pinData[3] = 0b00001000;
     pinData[4] = 0b00010000;
     pinData[5] = 0b00100000;
     pinData[6] = 0b01000000;
     pinData[7] = 0b10000000;

    
    int i=0;
    int n=0;
    while (true) {

    i2cData[0] = pinData[i];

    i2c.write(address[n],i2cData,1); //D0 high
    ThisThread::sleep_for(100ms); 
    i++;

    if(i>7){
        i2cData[0] = 0b00000000;
        i2c.write(address[n],i2cData,1);
        n=!n;
        i=0;
        
    }
    
    printf("i-Nummer %d\n", i);
    printf("n-Nummer %d\n", n);
    
    }
}

*/
/* 2. Code for a Read slave device and given the output through BusOut
#include "mbed.h"


I2C i2c (I2C_SDA,I2C_SCL);

BusOut myLEDS(PC_11,PC_10,PA_10,PB_3,PB_5,PB_4,PB_10,PA_8);

// main() runs in its own thread in the OS
int main()
{
    const int addr8bitRead_000 =0b01110001;
    char i2cData[1];
    
    while (true) {
    
    i2c.read(addr8bitRead_000,i2cData,1);
    ThisThread::sleep_for(100ms);

    myLEDS = i2cData[0];
        
     }
    }



*/
