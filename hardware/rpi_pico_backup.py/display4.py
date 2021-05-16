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
