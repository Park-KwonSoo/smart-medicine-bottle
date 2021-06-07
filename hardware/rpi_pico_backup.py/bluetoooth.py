import uos
import machine
import utime

uart0 = machine.UART(0,baudrate=9600)
    
def _clartBuf(uart=uart0):
    print("Clear UART buffer "+ str(uart))
    while uart.any():
        print(uart.read(1))


def send_data_bt(sdata:str):
    _clartBuf()
    uart0.write(sdata)


def recv_data_bt():
    _clartBuf()
    prvMills = utime.ticks_ms()
    received_data = ''

    while (utime.ticks_ms()-prvMills)<2000:
        if uart0.any():
            single_data = uart0.read(1)
            received_data += single_data.decode('utf-8')
    
    return received_data
