import tm1637
from machine import Pin
from utime import sleep
display4 = tm1637.TM1637(clk=Pin(12), dio=Pin(13))

# --------------------------------------------------- #
# FUNCTIONS
# --------------------------------------------------- #
def work_tm1637(data:str):
    display4.show(data)

def off_tm1637():
    display4.show('    ')
 
# # Show a word
# mydisplay.show("Pico")
# sleep(1)
 
# #blank the screen
# mydisplay.show("    ")
# sleep(1)
 
# #show numbers
# mydisplay.number(-123)
# sleep(1)
 
# #show a time with colon
# mydisplay.numbers(12,59)
# sleep(1)
 
# #adjust the brightness to make it lower
# mydisplay.brightness(0)
# sleep(1)
 
# #show scrolling text
# mydisplay.scroll("Hello World 123", delay=200)
# sleep(1)
 
# #show temperature
# mydisplay.temperature(99)
# sleep(1)
 
# #blank the screen again
# mydisplay.show(" ")