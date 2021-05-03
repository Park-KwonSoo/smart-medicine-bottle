from bluetooth import *

socket = BluetoothSocket( RFCOMM )
socket.connect(("04:A3:16:99:C7:42", 1))
print("bluetooth connected!")

msg = input("send message : ")
socket.send(msg)

print("finished")
socket.close()