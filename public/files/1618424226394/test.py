from juniorcup import *

r0 = Robot(0)
r1 = Robot(1)
s = 255

def compass():
    global  cmp0,cmp1
    cmp0 = r0.cmp
    if (cmp0 < 0):        cmp0 = cmp0 + 255
    if (cmp0 > 128):      cmp0 = cmp0 - 255
    if (cmp0 < 128):      cmp0 = cmp0
    if (cmp0 < 30 and cmp0 > -30):
        cmp0 = -cmp0 * 2
    else:
        cmp0 = -cmp0 * 1

    cmp1 = r1.cmp
    if (cmp1 < 0):        cmp1 = cmp1 + 255
    if (cmp1 > 128):      cmp1 = cmp1 - 255
    if (cmp1 < 128):      cmp1 = cmp1
    if(cmp1 < 40 and cmp1 > -40):
        cmp1 = -cmp1 * 2
    else:
        cmp1 = -cmp1 * 1

def motor0(ml0, ml1, mr0, mr1):
    r0.motor(ml0 + cmp0, ml1 + cmp0, mr0 + cmp0, mr1 + cmp0)

def motor1(ml0, ml1, mr0, mr1):
    r1.motor(ml0 + cmp1, ml1 + cmp1, mr0 + cmp1, mr1 + cmp1)

def move0(dir):
    if  (dir == 0):  motor0(s,    s,    -s,  -s   ) #0
    elif(dir == 1):  motor0(s,    -s,   -s,   s   ) #4
    elif(dir == 2):  motor0(s,    -s,   -s,   s   ) #4
    elif(dir == 3):  motor0(s/2,  -s,   -s/2, s   ) #5
    elif(dir == 4):  motor0(0,    -s,   0,    s   ) #6
    elif(dir == 5):  motor0(-s/2, -s,   s/2,  s   ) #7
    elif(dir == 6):  motor0(-s,   -s,   s,    s   ) #8
    elif(dir == 7):  motor0(-s,   0,    s,    0   ) #10
    elif(dir == 8):  motor0(-s,   s/2,  s,    -s/2) #11
    elif(dir == 9):  motor0(0,    -s,   0,    s   ) #6
    elif(dir == 10): motor0(-s/2, -s,   s/2,  s   ) #7
    elif(dir == 11): motor0(-s,   -s/2, s,    s/2 ) #9
    elif(dir == 12): motor0(-s,   0,    s,    0   ) #10
    elif(dir == 13): motor0(-s,   s/2,  s,    -s/2) #11
    elif(dir == 14): motor0(-s,   s,    s,    -s  ) #12
    elif(dir == 15): motor0(-s,   s,    s,    -s  ) #12

def move1(dir):
    if  (dir == 0):  motor1(s,    s,    -s,  -s   ) #0
    elif(dir == 1):  motor1(s,    -s,   -s,   s   ) #4
    elif(dir == 2):  motor1(s,    -s,   -s,   s   ) #4
    elif(dir == 3):  motor1(s/2,  -s,   -s/2, s   ) #5
    elif(dir == 4):  motor1(0,    -s,   0,    s   ) #6
    elif(dir == 5):  motor1(-s/2, -s,   s/2,  s   ) #7
    elif(dir == 6):  motor1(-s,   -s,   s,    s   ) #8
    elif(dir == 7):  motor1(-s,   0,    s,    0   ) #10
    elif(dir == 8):  motor1(-s,   s/2,  s,    -s/2) #11
    elif(dir == 9):  motor1(0,    -s,   0,    s   ) #6
    elif(dir == 10): motor1(-s/2, -s,   s/2,  s   ) #7
    elif(dir == 11): motor1(-s,   -s/2, s,    s/2 ) #9
    elif(dir == 12): motor1(-s,   0,    s,    0   ) #10
    elif(dir == 13): motor1(-s,   s/2,  s,    -s/2) #11
    elif(dir == 14): motor1(-s,   s,    s,    -s  ) #12
    elif(dir == 15): motor1(-s,   s,    s,    -s  ) #12

def out0():
    if(r0.ldr_b > 700 and r0.ldr_l > 700):
        while((r0.imin > 5 and r0.imin < 15) and r0.min < 700):
            r0.sensor()
            if(r0.shb < 300):
                motor0(s,    0,    -s,   0   ) #2
            else:
                r0.motor(0, 0, 0, 0)
    
    elif(r0.ldr_b > 700 and r0.ldr_r > 700):
        while((r0.imin > 1 and r0.imin < 11) and r0.min < 700):
            r0.sensor()
            if(r0.shb < 300):
                motor0(0,    s,    0,    -s  ) #14
            else:
                r0.motor(0, 0, 0, 0)
    
    elif(r0.ldr_b > 700):
        while((r0.imin > 3 and r0.imin < 13) and r0.min < 700):
            r0.sensor()
            if(r0.shb < 300):
                motor0(s,    s,    -s,  -s   ) #0
            else:
                r0.motor(0, 0, 0, 0)
    
    elif(r0.ldr_r > 700):
        while((r0.imin == 15 or r0.imin <= 8) and r0.min < 700):
            r0.sensor()
            if(r0.shr < 300):
                motor0(-s,   0,    s,    0   ) #10
            else:
                r0.motor(0, 0, 0, 0)

    elif(r0.ldr_l > 700):
        while((r0.imin < 2 or r0.imin >= 8) and r0.min < 700):
            r0.sensor()
            if(r0.shl < 300):
                motor0(0,    -s,   0,    s   ) #6
            else:
                r0.motor(0, 0, 0, 0)
    
    if(r0.ldr_f > 700 and r0.ldr_l > 700):
        while((r0.imin < 3 or r0.imin > 9) and r0.min < 700):
            r0.sensor()
            if(r0.shf < 300):
                motor0(0,    -s,   0,    s   ) #6
            else:
                r0.motor(0, 0, 0, 0)
    
    elif(r0.ldr_f > 700 and r0.ldr_r > 700):
        while((r0.imin < 7 or r0.imin > 13) and r0.min < 700):
            r0.sensor()
            if(r0.shf < 300):
                motor0(-s,   0,    s,    0   ) #10
            else:
                r0.motor(0, 0, 0, 0)
    
    elif(r0.ldr_f > 700):
        while((r0.imin < 5 or r0.imin > 11) and r0.min < 700):
            r0.sensor()
            if(r0.shf < 300 and (r0.shl < 300 or r0.shr < 300)):
                motor0(-s,   -s,   s,    s   ) #8
            else:
                r0.motor(0, 0, 0, 0)

#####################################################################################

def out1():
    if(r1.ldr_b > 700 and r1.ldr_l > 700):
        while((r1.imin > 5 and r1.imin < 15) and r1.min < 700):
            r1.sensor()
            if(r1.shb < 300):
                motor1(s,    0,    -s,   0   ) #2
            else:
                r1.motor(0, 0, 0, 0)
    
    elif(r1.ldr_b > 700 and r1.ldr_r > 700):
        while((r1.imin > 1 and r1.imin < 11) and r1.min < 700):
            r1.sensor()
            if(r1.shb < 300):
                motor1(0,    s,    0,    -s  ) #14
            else:
                r1.motor(0, 0, 0, 0)
    
    elif(r1.ldr_b > 700):
        while((r1.imin > 3 and r1.imin < 13) and r1.min < 700):
            r1.sensor()
            if(r1.shb < 300):
                motor1(s,    s,    -s,  -s   ) #0
            else:
                r1.motor(0, 0, 0, 0)
    
    elif(r1.ldr_r > 700):
        while((r1.imin == 15 or r1.imin <= 8) and r1.min < 700):
            r1.sensor()
            if(r1.shr < 300):
                motor1(-s,   0,    s,    0   ) #10
            else:
                r1.motor(0, 0, 0, 0)

    elif(r1.ldr_l > 700):
        while((r1.imin < 2 or r1.imin >= 8) and r1.min < 700):
            r1.sensor()
            if(r1.shl < 300):
                motor1(0,    -s,   0,    s   ) #6
            else:
                r1.motor(0, 0, 0, 0)
    
    if(r1.ldr_f > 700 and r1.ldr_l > 700):
        while((r1.imin < 3 or r1.imin > 9) and r1.min < 700):
            r1.sensor()
            if(r1.shf < 300):
                motor1(0,    -s,   0,    s   ) #6
            else:
                r1.motor(0, 0, 0, 0)
    
    elif(r1.ldr_f > 700 and r1.ldr_r > 700):
        while((r1.imin < 7 or r1.imin > 13) and r1.min < 700):
            r1.sensor()
            if(r1.shf < 300):
                motor1(-s,   0,    s,    0   ) #10
            else:
                r1.motor(0, 0, 0, 0)
    
    elif(r1.ldr_f > 700):
        while((r1.imin < 5 or r1.imin > 11) and r1.min < 700):
            r1.sensor()
            if(r1.shf < 300 and (r1.shl < 300 or r1.shr < 300)):
                motor1(-s,   -s,   s,    s   ) #8
            else:
                r1.motor(0, 0, 0, 0)

while True:
    # sensor
    r0.sensor()
    r1.sensor()

    # compass
    compass()
    
    # out
    out0()
    
    # move
    if(r0.min < 500): move0(r0.imin)
    else:             motor0(cmp0, cmp0, cmp0, cmp0)

    # goler
    if(r1.ldr_r<700 and r1.ldr_l<700 and r1.ldr_f<700 and r1.ldr_b<700):
        if(r1.min<800 and r1.shb>400):
            motor1(-s,   -s,   s,    s   ) #8
        elif(r1.min<800 and r1.shb<200):
            motor1(s,    s,    -s,  -s   ) #0
        elif(r1.min<800 and r1.imin==0):
            motor1(cmp1, cmp1, cmp1, cmp1)
        elif(r1.min<800 and r1.imin<8 and r1.shr>500 ):
            motor1(s,    -s,   -s,   s   ) #4
        elif(r1.min<800 and r1.imin>8 and r1.shl>500):
            motor1(-s,   s,    s,    -s  ) #12
        else: 
            motor1(cmp1, cmp1, cmp1, cmp1)
    else:
        out1()
