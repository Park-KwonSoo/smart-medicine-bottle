from bluetooth import *
import time

client_socket = BluetoothSocket( RFCOMM )
client_socket.connect(("00:18:91:D8:24:39", 1))
print("bluetooth connected!")

def _send_data(msg:str):
    client_socket.send(msg)

def _recv_data():
    # 소켓에 2초간 받을 수 있는 시간을 준다
    client_socket.settimeout(2)

    # 데이터 받을 변수
    data = ''

    try:
        timeout_start = time.time()
        timeout = 2
        while time.time() < timeout_start + timeout:
            data += client_socket.recv(1024).decode('utf-8')
    except:
        print("INFO: DATA RECV TIMEOUT")
    finally:
        return data


while True:
    sel_mode = input("SELECT MODE: ")

    if sel_mode == 'W':
        msg = input("send message : ")
        _send_data(msg)
        
    elif sel_mode == 'WR':
        msg = input("send message : ")
        _send_data(msg)

        data = _recv_data()
        print(f"Received: {data}")

client_socket.close()