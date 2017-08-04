
from network import LoRa
from pytrack import Pytrack
from L76GNSS import L76GNSS
import socket
import binascii
import struct
import pycom
import time
import struct


def blink(color, timeout, count):
    for i in range(count):
        pycom.rgbled(color)
        time.sleep(timeout / 2)
        pycom.rgbled(0x000000)
        time.sleep(timeout / 2)

def send(socket, data):
    pycom.rgbled(0x007f00)
    socket.setblocking(True)
    socket.send(bytes(data))
    socket.setblocking(False)
    time.sleep(0.5)
    pycom.rgbled(0x000000)


pycom.heartbeat(False)

# Initialize LoRa in LORAWAN mode.
lora = LoRa(mode=LoRa.LORAWAN)


#gps-tracker-001 : 00 7D 9B 0E 60 33 24 03
#gps-tracker-002 : 00 C4 35 FB 84 60 DB E0
#gps-tracker-003 : 00 AF CA 24 11 3A B6 3A
#gps-tracker-004 : 00 8B 10 ED EB B2 11 A3
#gps-tracker-005 : 00 7C 16 4A 96 8F 3D CB

# create an OTA authentication params
dev_eui = binascii.unhexlify('00 7D 9B 0E 60 33 24 03'.replace(' ','')) # these settings can be found from TTN
app_eui = binascii.unhexlify('70 B3 D5 7E F0 00 62 1E'.replace(' ','')) # these settings can be found from TTN
app_key = binascii.unhexlify('61 7D 22 55 B1 20 0C 0C 9D FB 1F 8B 18 EF 90 59'.replace(' ','')) # these settings can be found from TTN

# set the 3 default channels to the same frequency (must be before sending the OTAA join request)
lora.add_channel(0, frequency=868100000, dr_min=0, dr_max=5)
lora.add_channel(1, frequency=868100000, dr_min=0, dr_max=5)
lora.add_channel(2, frequency=868100000, dr_min=0, dr_max=5)

# join a network using OTAA
lora.join(activation=LoRa.OTAA, auth=(dev_eui,  app_eui, app_key), timeout=0)

# wait until the module has joined the network
while not lora.has_joined():
    blink(0x00007f, 1, 1)
    print('Not joined yet...')

print('joined...')
blink(0x00007f, 5, 1)

# remove all the non-default channels
for i in range(3, 16):
    lora.remove_channel(i)

# create a LoRa socket
s = socket.socket(socket.AF_LORA, socket.SOCK_RAW)

# set the LoRaWAN data rate
s.setsockopt(socket.SOL_LORA, socket.SO_DR, 5)
s.setblocking(False)

py = Pytrack()
l76 = L76GNSS(py, timeout=45) # GSP timeout set to 120 seconds

last_lat = 0.0
last_lon = 0.0

nomsg_count = 0

while True:

    print('read gps data')
    lat, lon = l76.coordinates();

    if lat != None and  lon != None:


        if lat != last_lat and lon != last_lon:

            msgType = [1]
            lat_b = list(struct.pack("!f", lat))
            lon_b = list(struct.pack("!f", lon))
            alt_b = list(struct.pack('<H', 444))
            data = msgType + lat_b + lon_b + alt_b


            print('send msg')
            print(data)

            send(s, bytes(data))

            last_lat = lat
            last_lon = lon
            nomsg_count = 0
            time.sleep(60)
        else:
            print('same coordinates')
            nomsg_count = nomsg_count + 1
            time.sleep(30)

    else:
        print('invalid gps data')
        blink(0x7f0000, 1, 3)
        nomsg_count = nomsg_count + 1
        time.sleep(5)

    if nomsg_count >= 20:
        print('send ping')
        send(s, bytes([128]))
        nomsg_count = 0
