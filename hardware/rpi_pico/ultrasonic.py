''' Original code from https://www.iottrends.tech/blog/how-to-use-ultrasonic-sensor-with-raspberry-pi-pico/
'''
from machine import Pin
import utime
trigger = Pin(26, Pin.OUT)
echo = Pin(27, Pin.IN)

# --------------------------------------------------- #
# FUNCTIONS
# --------------------------------------------------- #
def work_sr04():
    trigger.low()
    utime.sleep_us(2)
    trigger.high()
    utime.sleep_us(5)
    trigger.low()
    while echo.value() == 0:
        signaloff = utime.ticks_us()
    while echo.value() == 1:
        signalon = utime.ticks_us()
    timepassed = signalon - signaloff
    distance = (timepassed * 0.0330) / 2
    
    return distance
