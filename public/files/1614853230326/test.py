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
    if(r0.imin == 0): r0.motor(v, v, -v, -v)#0
    elif(r0.imin == 1): r0.motor(v, -v/2, -v, v/2)#3
    elif(r0.imin == 2): r0.motor(v, -v, -v, v)#4
    elif(r0.imin == 3): r0.motor(v/2, -v, -v/2, v)#5
    elif(r0.imin == 4): r0.motor(0, -v, 0, v)#6
    elif(r0.imin == 5): r0.motor(-v/2, -v, v/2, v)#7
    elif(r0.imin == 6): r0.motor(-v, -v, v,v)#8
    elif(r0.imin == 7): r0.motor(-v, -v/2, v, v/2)#9
    elif(r0.imin == 8): r0.motor(0, -v, 0, v)#6
    elif(r0.imin == 9): r0.motor(-v/2, -v, v/2, v)#7
    elif(r0.imin == 10): r0.motor(-v, -v, v,v)#8
    elif(r0.imin == 11): r0.motor(-v, -v/2, v, v/2)#9
    elif(r0.imin == 12): r0.motor(-v, 0, v, 0)#10
    elif(r0.imin == 13): r0.motor(-v, v/2, v, -v/2)#11
    elif(r0.imin == 14): r0.motor(-v, v, v, -v)#12
    elif(r0.imin == 15): r0.motor(-v/2, v, v/2, -v)#13
    else:    r0.motor(0 + com0,0 + com0,0 + com0,0 + com0)
    
    r1.sensor()
    if(r1.imin == 0): r1.motor(v, v, -v, -v)#0
    elif(r1.imin == 1): r1.motor(v, v/2, -v, -v/2)#3
    elif(r1.imin == 2): r1.motor(v,0, -v, 0)#4
    elif(r1.imin == 3): r1.motor(v, -v/2, -v, v/2)#5
    elif(r1.imin == 4): r1.motor(v, -v, -v, v)#6
    elif(r1.imin == 5): r1.motor(v/2, -v, -v/2, v)#7
    elif(r1.imin == 6): r1.motor(0, -v, 0, v)#8
    elif(r1.imin == 7): r1.motor(-v/2, -v, v/2, v)#9
    elif(r1.imin == 8): r1.motor(-v, -v, v,v)#10
    elif(r1.imin == 9): r1.motor(-v, -v/2, v, v/2)#7
    elif(r1.imin == 10): r1.motor(-v, 0, v, 0)#8
    elif(r1.imin == 11): r1.motor(-v, v/2, v, -v/2)#9
    elif(r1.imin == 12): r1.motor(-v, v, v, -v)#10
    elif(r1.imin == 13): r1.motor(-v/2, v, v/2, -v)#11
    elif(r1.imin == 14): r1.motor(0, v, 0, -v)#12
    elif(r1.imin == 15): r1.motor(v/2, v, -v/2, -v)#13
    else:            r1.motor(0+com1,0+com1, 0+com1, 0+com1) 
    

    #follow ball
    #if(r0.imin == 0): r0.motor(v, v, -v, -v)
    #elif(r0.imin == 1): r0.motor(v, v/2, -v, -v/2)
    #elif(r0.imin == 2): r0.motor(v,0, -v, 0)
    #elif(r0.imin == 3): r0.motor(v, -v/2, -v, v/2)
    #elif(r0.imin == 4): r0.motor(v, -v, -v, v)
    #elif(r0.imin == 5): r0.motor(v/2, -v, -v/2, v)
    #elif(r0.imin == 6): r0.motor(0, -v, 0, v)
    #elif(r0.imin == 7): r0.motor(-v/2, -v, v/2, v)
    #elif(r0.imin == 8): r0.motor(-v, -v, v,v)
    #elif(r0.imin == 9): r0.motor(-v, -v/2, v, v/2)
    #elif(r0.imin == 10): r0.motor(-v, 0, v, 0)
    #elif(r0.imin == 11): r0.motor(-v, v/2, v, -v/2)
    #elif(r0.imin == 12): r0.motor(-v, v, v, -v)
    #elif(r0.imin == 13): r0.motor(-v/2, v, v/2, -v)
    #elif(r0.imin == 14): r0.motor(0, v, 0, -v)
    #elif(r0.imin == 15): r0.motor(v/2, v, -v/2, -v)
    #else:            r0.motor(0, 0, 0, 0) 
