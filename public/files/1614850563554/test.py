from juniorcup import *

r0 = Robot(0)
r1 = Robot(1)
v = 255

com0 = r0.cmp
com1 = r1.cmp

if(com0 > 128) : com0 -= 255
com0 = -com0

if(com1 > 128) : com1 -= 255
com1 = -com1

while True:
    r0.sensor()
    if  (r0.imin == 0):  r0.motor(v + com0,    v + com0,    -v + com0,   -v + com0)   #0
    elif(r0.imin == 1):  r0.motor(v + com0,    -v + com0,   -v + com0,   v + com0)    #4
    elif(r0.imin == 2):  r0.motor(v/2 + com0,  -v + com0,   -v/2 + com0, v + com0)    #5
    elif(r0.imin == 3):  r0.motor(0 + com0,    -v + com0,   0 + com0,    v + com0)    #6
    elif(r0.imin == 4):  r0.motor(-v/2 + com0, -v + com0,   v/2 + com0,  v + com0)    #7
    elif(r0.imin == 5):  r0.motor(-v + com0,   -v + com0,   v + com0,    v + com0)    #8
    elif(r0.imin == 6):  r0.motor(-v + com0,   -v/2 + com0, v + com0,    v/2 + com0)  #9
    elif(r0.imin == 7):  r0.motor(-v + com0,   0 + com0,    v + com0,    0 + com0)    #10
    elif(r0.imin == 8):  r0.motor(-v + com0,   v/2 + com0,  v + com0,    -v/2 + com0) #11
    elif(r0.imin == 9):  r0.motor(0 + com0,    -v + com0,   0 + com0,    v + com0)    #6
    elif(r0.imin == 10): r0.motor(-v/2 + com0, -v + com0,   v/2 + com0,  v + com0)    #7
    elif(r0.imin == 11): r0.motor(-v + com0,   -v + com0,   v + com0,    v + com0)    #8
    elif(r0.imin == 12): r0.motor(-v + com0,   -v/2 + com0, v + com0,    v/2 + com0)  #9
    elif(r0.imin == 13): r0.motor(-v + com0,   0 + com0,    v + com0,    0 + com0)    #10
    elif(r0.imin == 14): r0.motor(-v + com0,   v/2 + com0,  v + com0,    -v/2 + com0) #11
    elif(r0.imin == 15): r0.motor(-v + com0,   v + com0,    v + com0,    -v + com0)   #12
    else:                r0.motor(0 + com0,    0 + com0,    0 + com0,    0 + com0)
    
    r1.sensor()
    if  (r1.imin == 0):  r1.motor(v + com1,    v + com1,    -v + com1,   -v + com1)   #0
    elif(r1.imin == 1):  r1.motor(v + com1,    -v + com1,   -v + com1,   v + com1)    #4
    elif(r1.imin == 2):  r1.motor(v/2 + com1,  -v + com1,   -v/2 + com1, v + com1)    #5
    elif(r1.imin == 3):  r1.motor(0 + com1,    -v + com1,   0 + com1,    v + com1)    #6
    elif(r1.imin == 4):  r1.motor(-v/2 + com1, -v + com1,   v/2 + com1,  v + com1)    #7
    elif(r1.imin == 5):  r1.motor(-v + com1,   -v + com1,   v + com1,    v + com1)    #8
    elif(r1.imin == 6):  r1.motor(-v + com1,   -v/2 + com1, v + com1,    v/2 + com1)  #9
    elif(r1.imin == 7):  r1.motor(-v + com1,   0 + com1,    v + com1,    0 + com1)    #10
    elif(r1.imin == 8):  r1.motor(-v + com1,   v/2 + com1,  v + com1,    -v/2 + com1) #11
    elif(r1.imin == 9):  r1.motor(0 + com1,    -v + com1,   0 + com1,    v + com1)    #6
    elif(r1.imin == 10): r1.motor(-v/2 + com1, -v + com1,   v/2 + com1,  v + com1)    #7
    elif(r1.imin == 11): r1.motor(-v + com1,   -v + com1,   v + com1,    v + com1)    #8
    elif(r1.imin == 12): r1.motor(-v + com1,   -v/2 + com1, v + com1,    v/2 + com1)  #9
    elif(r1.imin == 13): r1.motor(-v + com1,   0 + com1,    v + com1,    0 + com1)    #10
    elif(r1.imin == 14): r1.motor(-v + com1,   v/2 + com1,  v + com1,    -v/2 + com1) #11
    elif(r1.imin == 15): r1.motor(-v + com1,   v/2 + com1,  v + com1,    -v/2 + com1) #11
    else:                r1.motor(0 + com1,    0 + com1,    0 + com1,    0 + com1)