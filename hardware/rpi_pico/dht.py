''' Original code from https://www.raspberrypi.org/forums/viewtopic.php?t=303606
'''
import utime
import rp2 
from rp2 import PIO, asm_pio
from machine import Pin

# --------------------------------------------------- #
# INIT
# --------------------------------------------------- #
# For VCC
dht_pwr = Pin(14, Pin.OUT)
# For data
dht_data = Pin(15, Pin.IN, Pin.PULL_UP)

# Power on
dht_pwr.value(1)
# Create empty state
sm=rp2.StateMachine(1)
# Wait for DHT22 to start up
utime.sleep(2)

# --------------------------------------------------- #
# INIT2
# --------------------------------------------------- #
@asm_pio(set_init=(PIO.OUT_HIGH),autopush=True, push_thresh=8) #output one byte at a time
def DHT22():
    #drive output low for at least 20ms
    set(pindirs,1)              #set pin to output  
    set(pins,0)                 #set pin low
    set(y,31)                   #prepare countdown, y*x*100cycles
    label ('waity')
    set(x,31) 
    label ('waitx')
    nop() [30] 
    jmp(x_dec,'waitx')          #decrement x reg every 100 cycles
    jmp(y_dec,'waity')          #decrement y reg every time x reaches zero
     
    #begin reading from device
    set(pindirs,0)              #set pin to input 
    wait(1,pin,0)               #check pin is high before starting
    wait(0,pin,0)
    wait(1,pin,0)
    wait(0,pin,0)               #wait for start of data

    #read databit
    label('readdata')
    set(x,21)                   #reset x register to count down from 20
    wait(1,pin,0)               #wait for high signal
    label('countdown')
    jmp(pin,'continue')         #if pin still high continue counting
    #pin is low before countdown is complete - bit '0' detected
    set(y,0)                 
    in_(y, 1)                   #shift '0' into the isr
    jmp('readdata')             #read the next bit
        
    label('continue')
    jmp(x_dec,'countdown')      #decrement x reg and continue counting if x!=0
    #pin is still high after countdown complete - bit '1' detected 
    set(y,1)                  
    in_(y, 1)                   #shift one bit into the isr
    wait(0,pin,0)               #wait for low signal (next bit) 
    jmp('readdata')             #read the next bit
    

# --------------------------------------------------- #
# FUNCTIONS
# --------------------------------------------------- #
def work_dht():
    data=[]
    total=0
    sm.init(DHT22,freq=1600000,set_base=dht_data,in_base=dht_data,jmp_pin=dht_data) 
    sm.active(1)    
    for i in range(5):         #data should be 40 bits (5 bytes) long
        data.append(sm.get())  #read byte
    
    #check checksum (lowest 8 bits of the sum of the first 4 bytes)
    for i in range(4):
        total=total+data[i]
    if((total & 255) == data[4]):
        humidity=((data[0]<<8)  + data[1])/10.0
        temperature=(((data[2] &0x7f) << 8)  + data[3]) /10.0
        if (data[2] & 0x80) == 0x80:
            temperature = -temperature
        return [humidity, temperature]       
    else:
        return False