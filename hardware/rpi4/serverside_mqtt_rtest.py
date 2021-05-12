import paho.mqtt.client as mqtt

import time

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("bottle/1/bts") # 요거 수정해서 확인하세요

def on_message(client, userdata, msg):
    print(msg.topic)
    print(msg.payload.decode('utf-8'))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect_async("localhost")
client.loop_start()

while True:
    print("TESTing")
    time.sleep(1)