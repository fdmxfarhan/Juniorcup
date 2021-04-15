from juniorcup import *
r0 = Robot(0)
r1 = Robot(1)
speed = 255
cmp0 = 0
cmp1 = 0
out_0 = 'N'
out_1 = 'N'

def readSensor():
    global cmp1, cmp0
    r0.sensor()
    r1.sensor()
    
    cmp0 = r0.cmp
    if cmp0 > 128 : cmp0 = cmp0-255
    if(cmp0 > -20 and cmp0 < 20): cmp0 = -cmp0 * 3
    else:  cmp0 = -cmp0 * 2

    cmp1 = r1.cmp
    if cmp1 > 128 : cmp1 = cmp1-255
    if(cmp1 > -20 and cmp1 < 20): cmp1 = -cmp1 * 3
    else:  cmp1 = -cmp1 * 2
    

def move0(direction):
    if(direction == 0):      r0.motor(speed+cmp0   , speed+cmp0    , -speed+cmp0   , -speed+cmp0 )
    if(direction == 1):      r0.motor(speed+cmp0   , speed/2+cmp0 , -speed+cmp0  , -speed/2+cmp0 )
    if(direction == 2):      r0.motor(speed+cmp0   , 0+cmp0        , -speed+cmp0  , 0+cmp0       )
    if(direction == 3):      r0.motor(speed+cmp0   , -speed/2+cmp0, -speed+cmp0  , speed/2+cmp0  )
    if(direction == 4):      r0.motor(speed+cmp0   , -speed+cmp0  , -speed+cmp0  , speed+cmp0    )
    if(direction == 5):      r0.motor(speed/2+cmp0 , -speed+cmp0  , -speed/2+cmp0, speed+cmp0    )
    if(direction == 6):      r0.motor(0+cmp0        , -speed+cmp0  , 0+cmp0        , speed+cmp0  )
    if(direction == 7):      r0.motor(-speed/2+cmp0, -speed+cmp0  , speed/2+cmp0 , speed+cmp0    )    
    
    if(direction == 8):      r0.motor(-speed+cmp0  , -speed+cmp0  , speed+cmp0   , speed+cmp0    )
    
    if(direction == 9):      r0.motor(-speed+cmp0   , -speed/2+cmp0, speed+cmp0   , speed/2+cmp0 )
    if(direction == 10):     r0.motor(-speed+cmp0   , 0+cmp0        , speed+cmp0   , 0+cmp0      )
    if(direction == 11):     r0.motor(-speed+cmp0   , speed/2+cmp0 , speed+cmp0   , -speed/2+cmp0)
    if(direction == 12):     r0.motor(-speed+cmp0   , speed+cmp0   , speed+cmp0   , -speed+cmp0  )
    if(direction == 13):     r0.motor(-speed/2+cmp0 , speed+cmp0   , speed/2+cmp0 , -speed+cmp0  )
    if(direction == 14):     r0.motor(0+cmp0         , speed+cmp0   , 0+cmp0       , -speed+cmp0 )
    if(direction == 15):     r0.motor(speed/2+cmp0  , speed+cmp0   , -speed/2+cmp0, -speed+cmp0  )    

def move1(direction):
    if(direction == 0):      r1.motor(speed+cmp1   , speed+cmp1   , -speed+cmp1  , -speed+cmp1   )
    if(direction == 1):      r1.motor(speed+cmp1   , speed/2+cmp1 , -speed+cmp1  , -speed/2+cmp1 )
    if(direction == 2):      r1.motor(speed+cmp1   , 0+cmp1       , -speed+cmp1  , 0+cmp1        )
    if(direction == 3):      r1.motor(speed+cmp1   , -speed/2+cmp1, -speed+cmp1  , speed/2+cmp1  )
    if(direction == 4):      r1.motor(speed+cmp1   , -speed+cmp1  , -speed+cmp1  , speed+cmp1    )
    if(direction == 5):      r1.motor(speed/2+cmp1 , -speed+cmp1  , -speed/2+cmp1, speed+cmp1    )
    if(direction == 6):      r1.motor(0+cmp1       , -speed+cmp1  , 0+cmp1       , speed+cmp1    )
    if(direction == 7):      r1.motor(-speed/2+cmp1, -speed+cmp1  , speed/2+cmp1 , speed+cmp1    )    
    
    if(direction == 8):      r1.motor(-speed+cmp1  , -speed+cmp1  , speed+cmp1   , speed+cmp1    )
    
    if(direction == 9):      r1.motor(-speed+cmp1   , -speed/2+cmp1, speed+cmp1   , speed/2+cmp1 )
    if(direction == 10):     r1.motor(-speed+cmp1   , 0+cmp1       , speed+cmp1   , 0+cmp1       )
    if(direction == 11):     r1.motor(-speed+cmp1   , speed/2+cmp1 , speed+cmp1   , -speed/2+cmp1)
    if(direction == 12):     r1.motor(-speed+cmp1   , speed+cmp1   , speed+cmp1   , -speed+cmp1  )
    if(direction == 13):     r1.motor(-speed/2+cmp1 , speed+cmp1   , speed/2+cmp1 , -speed+cmp1  )
    if(direction == 14):     r1.motor(0+cmp1        , speed+cmp1   , 0+cmp1       , -speed+cmp1  )
    if(direction == 15):     r1.motor(speed/2+cmp1  , speed+cmp1   , -speed/2+cmp1, -speed+cmp1  )   

def out0():
    global out_0
    if(r0.ldr_r > 600 or out_0=='R'):
        out_0 = 'R'
        if(r0.imin < 8):
            readSensor()
            if(r0.shr < 250): move0(12)
            else:             r0.motor(cmp0, cmp0, cmp0, cmp0)
        else:
            out_0 = 'N'
    if(r0.ldr_l > 600 or out_0=='L'):
        out_0 = 'L'
        if(r0.imin > 8):
            readSensor()
            if(r0.shl < 250): move0(4)
            else:             r0.motor(cmp0, cmp0, cmp0, cmp0)
        else:
            out_0 = 'N'
    if(r0.ldr_b > 600 or out_0=='b'):
        out_0 = 'b'
        if(r0.imin > 4 and r0.imin < 12):
            readSensor()
            if(r0.shb < 250): move0(0)
            else:             r0.motor(cmp0, cmp0, cmp0, cmp0)
        else:
            out_0 = 'N' 
    if(r0.ldr_f > 600 or out_0=='f'):
        out_0 = 'f'
        if(r0.imin < 4 or r0.imin > 12):
            readSensor()
            if(r0.shf < 250): move0(8)
            else:             r0.motor(cmp0, cmp0, cmp0, cmp0)
        else:
            out_0 = 'N'   

def out1():
    global out_1
    if(r1.ldr_r > 600 or out_1=='R'):
        out_1 = 'R'
        if(r1.imin < 8):
            readSensor()
            if(r1.shr < 250): move0(12)
            else:             r1.motor(cmp0, cmp0, cmp0, cmp0)
        else:
            out_1 = 'N'
    if(r1.ldr_l > 600 or out_1=='L'):
        out_1 = 'L'
        if(r1.imin > 8):
            readSensor()
            if(r1.shl < 250): move0(4)
            else:             r1.motor(cmp0, cmp0, cmp0, cmp0)
        else:
            out_1 = 'N'
    if(r1.ldr_b > 600 or out_1=='b'):
        out_1 = 'b'
        if(r1.imin > 4 and r1.imin < 12):
            readSensor()
            if(r1.shb < 250): move0(0)
            else:             r1.motor(cmp0, cmp0, cmp0, cmp0)
        else:
            out_1 = 'N' 
    if(r1.ldr_f > 600 or out_1=='f'):
        out_1 = 'f'
        if(r1.imin < 4 or r1.imin > 12):
            readSensor()
            if(r1.shf < 250): move0(8)
            else:             r1.motor(cmp0, cmp0, cmp0, cmp0)
        else:
            out_1 = 'N'   

def isDamage(id):
    if(id == 0):
        if(r0.imin == 0 and r0.min == 0 and r0.ldr_r == 0 and r0.ldr_l == 0 and r0.ldr_f == 0 and r0.ldr_b == 0):
            return True
        else:
            return False
    elif(id == 1):
        if(r1.imin == 0 and r1.min == 0 and r1.ldr_r == 0 and r1.ldr_l == 0 and r1.ldr_f == 0 and r1.ldr_b == 0):
            return True
        else:
            return False
    return False

while True:
    readSensor()
     #Robot 0
    out0()
    if(out_0 == 'N'):
        if(r0.dist < r1.dist or isDamage(1)):
            if(r0.dist > 60):   move0(r0.imin)
            elif(r0.shr > r0.shl):
                if r0.imin == 0:  move0(0)
                elif r0.imin < 4:   move0(r0.imin+2)
                elif r0.imin > 12:  move0(r0.imin-2)
                elif r0.imin < 7:   move0(r0.imin+3)
                else:               move0(r0.imin-3)
            else:
                if r0.imin == 0:  move0(0)
                elif r0.imin < 4:   move0(r0.imin+2)
                elif r0.imin > 12:  move0(r0.imin-2)
                elif r0.imin <= 9:  move0(r0.imin+3)
                else:               move0(r0.imin-3)
        else:
            if(r0.shb < 500):
                if r0.imin == 0:    r0.motor(cmp0, cmp0, cmp0, cmp0)
                elif r0.imin < 8:   move0(4)
                else:               move0(12)
            else:
                move0(8)


    #Robot 1
    out1()
    if(out_1 == 'N'):
        if(r1.dist < r0.dist or isDamage(0)):
            if(r1.dist > 60):   move1(r1.imin)
            elif(r1.shr > r1.shl):
                if r1.imin == 0:  move1(0)
                elif r1.imin < 4:   move1(r1.imin+2)
                elif r1.imin > 12:  move1(r1.imin-2)
                elif r1.imin < 7:   move1(r1.imin+3)
                else:               move1(r1.imin-3)
            else:
                if r1.imin == 0:  move1(0)
                elif r1.imin < 4:   move1(r1.imin+2)
                elif r1.imin > 12:  move1(r1.imin-2)
                elif r1.imin <= 9:  move1(r1.imin+3)
                else:               move1(r1.imin-3)
        else:
            if(r1.shb < 500):
                if r1.imin == 0:    r1.motor(cmp1, cmp1, cmp1, cmp1)
                elif r1.imin < 8:   move1(4)
                else:               move1(12)
            else:
                move1(8)

