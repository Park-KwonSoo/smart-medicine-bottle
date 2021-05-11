import array, utime
from machine import Pin
import rp2

import neopixel
import dht
import bluetoooth as bto
import ultrasonic

# --------------------------------------------------- #
# INIT
# --------------------------------------------------- #


# --------------------------------------------------- #
# ENTRYPOINT
# --------------------------------------------------- #
def _run():
    while True:
        input_data = bto.recv_data_bt()
        if input_data != '':
            input_data = input_data.strip()
            print('INPUT FOUND ', input_data)
            print(len(input_data))
            if input_data == 'A':
                neopixel.work_led(0.2)
            elif input_data == 'B':
                dht_data = dht.work_dht()
                if dht_data == False:
                    print("ERROR: DHT22 NOT WORKING")
                else:
                    print("INFO: HUMI ", dht_data[0])
                    print("INFO: TEMP ", dht_data[1])
                    send_string = str(dht_data[0]) + ',' + str(dht_data[1])
                    print(send_string)
                    bto.send_data_bt(send_string)
            elif input_data == 'C':
                ultasonic_data = ultrasonic.work_sr04()
                bto.send_data_bt(str(ultasonic_data))
            else:
                print('WRONG INPUT')

if __name__ == '__main__':
    _run()