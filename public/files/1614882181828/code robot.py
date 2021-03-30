from juniorcup import *

r0 = Robot(0)
r1 = Robot(1)
v = 200

while True:
    r0.sensor()
    if(r0.imin == 0): r0.motor(v, v, -v, -v)
    elif(r0.imin <8): r0.motor(v, v, v, v)
    else:            r0.motor(-v, -v, -v, -v) 
    
    r1.sensor()
    if(r1.imin == 0): r1.motor(v, v, -v, -v)
    elif(r1.imin <8): r1.motor(v, v, v, v)
    else:            r1.motor(-v, -v, -v, -v) 
    