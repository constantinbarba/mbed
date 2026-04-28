#include "mbed.h"

DigitalOut latch(PB_4);
DigitalOut clockPin(PA_8);
DigitalOut dataPin(PA_9);

/*
Data pins set
  0 0 0 0 0 0 0 0
  . G F E D C B A 

1=1 1 1 1 1 0 0 1
2=1 0 1 0 0 1 0 0


char 0 = 0b10000000;
char 1 = 0b11111001;
char 2 = 0b10100100;
char 3 = 0b10110000;
char 4 = 0b10011001;
char 5 = 0b10010010;
char 6 = 0b10000010;
char 7 = 0b11111000;
char 8 = 0b10000000;
char 9 = 0b10010000;
*/
unsigned char segments[] = {0b11000000,
    0b11111001,0b10100100,
    0b10110000,0b10011001,
    0b10010010,0b10000010,
    0b11111000,0b10000000,0b10010000,0b11111111};

void segmentSelector(unsigned char number){
    for(int i =0; i<8; i++){
        if(number >> (7-i)& 1){
            dataPin= 1;
        } else {
            dataPin= 0;
        }
    
    clockPin=1;
    wait_us(1);
    clockPin=0;
    }
    
}



void digitSelector(int digitSelected){
    char digit = 0b00000000;
    switch(digitSelected){
        case 1: digit = 0b00000001; break;
        case 2: digit = 0b00000010; break;
        case 3: digit = 0b00000100; break;
        case 4: digit = 0b00001000; break;
        default: digit = 0b11110111; 
    } 

    for(int i = 0; i<8; i++){
        if(digit >> (7-i) & 1){
            dataPin=1;
        } else {
            dataPin =0;
        }
        
    clockPin=1;
    wait_us(1);
    clockPin=0;
    }
}

void latchPulse(){
    latch = 1;
    wait_us(1);
    latch = 0;
}

int main(){

     
   
    while(true){
    segmentSelector(segments[7]); // Only bottom segment ON
    
    digitSelector(1);   // Only digit 2 ON (if your digitSelector allows direct byte input)
    latchPulse();            
    
                     
    ThisThread::sleep_for(1ms);

    segmentSelector(segments[4]); // Only bottom segment ON
    
    digitSelector(2);   // Only digit 2 ON (if your digitSelector allows direct byte input)
    latchPulse(); 
    }
}



