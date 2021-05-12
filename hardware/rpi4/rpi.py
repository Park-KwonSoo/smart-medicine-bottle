import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

from bluetooth import *
import time

MQTT_BLOCK = False

BT_MAC_ADDRESS = '00:18:91:D8:24:39'
MED_BOTT_NO = '1'

client_socket = BluetoothSocket( RFCOMM )
client_mqtt = mqtt.Client()

# --------------------------------------------------- #
# INTERNAL FUNCTIONS
# --------------------------------------------------- #
def _send_data(msg:str):
    ''' Bluetooth를 통해 데이터를 송신한다
    '''
    client_socket.send(msg)

def _recv_data():
    ''' Bluetooth를 통해 데이터를 수신한다
    '''
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
        print('INFO: DATA RECV TIMEOUT')
    finally:
        return data


def _sub_mqtt(client, userdata, flags, rc):
    ''' MQTT에서 subscribe한다
    '''
    print("Connected with result code "+str(rc))
    client.subscribe(f'bottle/1/stb')

def _work_mqtt(client, userdata, msg):
    ''' MQTT에서 데이터를 받으면 알맞게 로직을 수행한다
    '''
    print('DOING SOMETHING')
    global MQTT_BLOCK
    MQTT_BLOCK = True

    received_msg = msg.payload.decode('utf-8')

    data = ''
    data_list = []

    # 만약 req메시지를 받았다면
    if received_msg == 'req':
        while len(data_list) != 4:
            _send_data('REQ')
            data = _recv_data()
            data_list = data.split('/')
        # 데이터를 Publish한다
        _pub_mqtt(f'bottle/{MED_BOTT_NO}/bts', data, 'localhost')
        
    # 만약 res메시지를 받았다면
    elif received_msg.split('/')[0] == 'res':
        _send_data(received_msg.split('/')[1])
        data = _recv_data()
        data_list = data.split('/')
        while len(data_list) != 4:
            _send_data('REQ')
            data = _recv_data()
            data_list = data.split('/')
        # 데이터를 Publish한다
        _pub_mqtt(f'bottle/{MED_BOTT_NO}/bts', data, 'localhost')

    print("DEBUG")
    print(data)
    print(data_list)
    print(received_msg)
    MQTT_BLOCK = False

def _pub_mqtt(topic:str, payload:str, hostname:str):
    ''' MQTT를 통해 데이터를 publish한다
    '''
    publish.single(
        topic=topic,
        payload=payload,
        hostname=hostname)


# --------------------------------------------------- #
# MAIN
# --------------------------------------------------- #
def _run():
    # CONNECT BT
    client_socket.connect((BT_MAC_ADDRESS, 1))
    print('bluetooth connected!')

    # SUBSCRIBE MQTT
    client_mqtt.on_connect = _sub_mqtt
    client_mqtt.on_message = _work_mqtt
    client_mqtt.connect_async("localhost")
    client_mqtt.loop_start()


    while True:
        if MQTT_BLOCK is False:
            # 항상 데이터를 받을 상태로 있는다
            data = _recv_data()

            # 만약 데이터가 ''가 아니면 무언가 온 것이므로 처리한다
            if data != '':
                print('DATA IN')
                data_list = data.split('/')
                
                # 만약 데이터가 불량하게 왔을 경우, 제대로 올때까지 반복시도한다
                while len(data_list) != 4:
                    data = _recv_data()
                    data_list = data.split('/')

                # 데이터를 Publish한다
                _pub_mqtt(f'bottle/{MED_BOTT_NO}/bts', data, 'localhost')

    client_socket.close()

if __name__ == '__main__':
    _run()