import utime
import rp2 
from rp2 import PIO, asm_pio
from machine import Pin

dht_pwr = Pin(14, Pin.OUT)      #connect GPIO 14 to '+' on DHT11
dht_data = Pin(15, Pin.IN, Pin.PULL_UP) #connect GPIO 15 to 'out' on DHT11

dht_pwr.value(1)                #power on DHT11
sm=rp2.StateMachine(1)          #create empty state machine
utime.sleep(2)                  #wait for DHT11 to start up

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
# ENTRYPOINT
# --------------------------------------------------- #
def work_dht():
    print("DHT22 WORKING")
    data=[]
    total=0
    sm.init(DHT22,freq=1600000,set_base=dht_data,in_base=dht_data,jmp_pin=dht_data) #start state machine
    #state machine frequency adjusted so that PIO countdown during 'readdata' ends somewhere between the  
    #duration of a '0' and a '1' high signal
    sm.active(1)    
    for i in range(5):         #data should be 40 bits (5 bytes) long
        data.append(sm.get())  #read byte
    
    print("data: " + str(data))
    
    #check checksum (lowest 8 bits of the sum of the first 4 bytes)
    for i in range(4):
        total=total+data[i]
    if((total & 255) == data[4]):
        humidity=((data[0]<<8)  + data[1])/10.0       #DHT11 provides integer humidity (no decimal part)
        temperature=(((data[2] &0x7f) << 8)  + data[3]) /10.0 #DHT11 provides signed integer temperature (no decimal part)
        if (data[2] & 0x80) == 0x80:
            temperature = -temperature
        return [humidity, temperature]       
    else:
        return False
