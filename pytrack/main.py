
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

def send(socket, data, color = 0x007f00):
    pycom.rgbled(color)
    socket.setblocking(True)
    socket.send(bytes(data))
    socket.setblocking(False)
    time.sleep(0.5)
    pycom.rgbled(0x000000)

pycom.heartbeat(False)

# Initialize LoRa in LORAWAN mode.
lora = LoRa(mode=LoRa.LORAWAN)

# create an OTA authentication params
dev_eui = binascii.unhexlify('...') # these settings can be found from TTN
app_eui = binascii.unhexlify('...') # these settings can be found from TTN
app_key = binascii.unhexlify('...') # these settings can be found from TTN

# set the 3 default channels to the same frequency (must be before sending the OTAA join request)
lora.add_channel(0, frequency=868100000, dr_min=0, dr_max=5)
lora.add_channel(1, frequency=86810000, dr_min=0, dr_max=5)
lora.add_channel(2, frequency=86810000, dr_min=0, dr_max=5)

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
l76 = L76GNSS(py, timeout=30) # GSP timeout set to 120 seconds

last_lat = 0.0
last_lon = 0.0
data_log_size = 8

data_log = []

while True:

    print('read gps data')
    lat, lon = l76.coordinates();
    #lat = 48.12345678
    #lon = 8.12345678

    if lat != None and  lon != None:

        if True or lat != last_lat and lon != last_lon:

            msgType = [2]

            lat_b = list(struct.pack("!f", lat))
            lon_b = list(struct.pack("!f", lon))
            alt_b = list(struct.pack('<H', 444))

            data_log_lenth = [len(data_log)]
            data = msgType + lat_b + lon_b + alt_b + data_log_lenth

            for li in data_log:
                data = data + list(struct.pack("!f", li[0])) + list(struct.pack("!f", li[1]))

            #print('send msg')
            #print(data)

            send(s, bytes(data))

            #print('sent bytes:' + str(len(data)) )

            data_log.insert(0, [lat, lon])
            if len(data_log) > data_log_size:
                data_log.pop()


            last_lat = lat
            last_lon = lon

            time.sleep(40)

        else:
            #print('same coordinates')
            time.sleep(5)

    else:
        #print('invalid gps data')
        blink(0x7f0000, 1, 3)
        time.sleep(5)
