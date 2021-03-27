from juniorcup import *

r0 = Robot(0)
r1 = Robot(1)
v = 255
cmp0 = r0.cmp
cmp1 = r1.cmp
if (cmp0>128): cmp0 -= 225
cmp0 = -cmp0
if (cmp1>128): cmp1 -= 225
cmp1 = -cmp1

while True:

    r0.sensor()
    if r0.imin==0: r0.motor(v+cmp0, v+cmp0, -v+cmp0, -v+cmp0)
    elif r0.imin==1: r0.motor(v+cmp0, -v/2+cmp0, -v+cmp0, v/2+cmp0)
    elif r0.imin==2: r0.motor(v+cmp0, -v+cmp0, -v+cmp0, v+cmp0)
    elif r0.imin==3: r0.motor(v/2+cmp0, -v+cmp0, -v/2+cmp0, v+cmp0)
    elif r0.imin==4: r0.motor(-v/2+cmp0, -v+cmp0, v/2+cmp0, v+cmp0)
    elif r0.imin==5: r0.motor(-v+cmp0, -v+cmp0, v+cmp0, v+cmp0)
    elif r0.imin==6: r0.motor(-v+cmp0, -v/2+cmp0, v+cmp0, v/2+cmp0)
    elif r0.imin==7: r0.motor(-v+cmp0, 0+cmp0, v+cmp0, 0+cmp0)
    elif r0.imin==8: r0.motor(v/2+cmp0, -v+cmp0, -v/2+cmp0, v+cmp0)
    elif r0.imin==9: r0.motor(0+cmp0, -v+cmp0, 0+cmp0, v+cmp0)
    elif r0.imin==10: r0.motor(-v/2+cmp0, -v+cmp0, v/2+cmp0, v+cmp0)
    elif r0.imin==11: r0.motor(-v+cmp0, -v+cmp0, v+cmp0, v+cmp0)
    elif r0.imin==12: r0.motor(-v+cmp0, -v/2+cmp0, v+cmp0, v/2+cmp0)
    elif r0.imin==13: r0.motor(-v+cmp0, v/2+cmp0, v+cmp0, -v/2+cmp0)
    elif r0.imin==14: r0.motor(-v+cmp0, v+cmp0, v+cmp0, -v+cmp0)
    else: r0.motor(-v+cmp0, v+cmp0, v+cmp0, -v+cmp0)

    r1.sensor()
    if r1.imin==1 or r1.imin==2 or r1.imin==3: r1.motor(v, -v, -v, v)
    elif r1.imin==13 or r1.imin==14 or r1.imin==15: r1.motor(-v, v, v, -v)
