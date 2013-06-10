import serial
import json
import sqlite3
import time

working = True
ser = 0
i = 0

while (working):
    try:
        ser=serial.Serial("/dev/ttyACM" + str(i), 9600)
        working = False
    except:
        print "Not on " + str(i)
        i = i + 1
    if i > 20:
        i = 0
conn = sqlite3.connect('/home/pi/humidor/humidor-server/db/development.sqlite3')
c = conn.cursor()
c.execute('delete from tempdata where id > -1')
i = 0;
while(1):
    try:
        s = ser.readline()
        obj = json.loads(s)
        ex1 = (obj['distance'], obj['humid'] ,obj['temp'])
        ex2 = (i, obj['distance'], obj['humid'], obj['temp'])
        if (i == 0):
            c.execute('insert into saveddata(level, humid, temp, created_at, updated_at) values (?, ?, ?, current_timestamp, current_timestamp)', ex1) #insert into saveddata
        c.execute('insert or replace into tempdata(id, level, humid, temp, created_at, updated_at) values(?, ?, ?, ?, current_timestamp, current_timestamp)', ex2) #insert into tempdata
        conn.commit()
        i = i + 1
        if (i >= 1600):
            i = 0
    except:
        print "resync"
