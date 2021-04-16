from juniorcup import *

r0 = Robot(0)
r1 = Robot(1)
speed = 255



def motor0(ml1, ml2, mr2, mr1):
    r0.motor(ml1 + cmp0, ml2 + cmp0, mr2 + cmp0, mr1 + cmp0)

def motor1(ml1, ml2, mr2, mr1):
    r1.motor(ml1 + cmp1, ml2 + cmp1, mr2 + cmp1, mr1 + cmp1)

def move0(dir):
    if(dir == 0):      motor0(speed   , speed   , -speed  , -speed   )
    if(dir == 1):      motor0(speed   , speed/2 , -speed  , -speed/2 )
    if(dir == 2):      motor0(speed   , 0       , -speed  , 0        )
    if(dir == 3):      motor0(speed   , -speed/2, -speed  , speed/2  )
    if(dir == 4):      motor0(speed   , -speed  , -speed  , speed    )
    if(dir == 5):      motor0(speed/2 , -speed  , -speed/2, speed    )
    if(dir == 6):      motor0(0       , -speed  , 0       , speed    )
    if(dir == 7):      motor0(-speed/2, -speed  , speed/2 , speed    )    
    
    if(dir == 8):      motor0(-speed  , -speed  , speed   , speed    )
    
    if(dir == 9):      motor0(-speed   , -speed/2, speed   , speed/2 )
    if(dir == 10):     motor0(-speed   , 0       , speed   , 0       )
    if(dir == 11):     motor0(-speed   , speed/2 , speed   , -speed/2)
    if(dir == 12):     motor0(-speed   , speed   , speed   , -speed  )
    if(dir == 13):     motor0(-speed/2 , speed   , speed/2 , -speed  )
    if(dir == 14):     motor0(0        , speed   , 0       , -speed  )
    if(dir == 15):     motor0(speed/2  , speed   , -speed/2, -speed  )

def move1(dir):
    if(dir == 0):      motor1(speed   , speed   , -speed  , -speed   )
    if(dir == 1):      motor1(speed   , speed/2 , -speed  , -speed/2 )
    if(dir == 2):      motor1(speed   , 0       , -speed  , 0        )
    if(dir == 3):      motor1(speed   , -speed/2, -speed  , speed/2  )
    if(dir == 4):      motor1(speed   , -speed  , -speed  , speed    )
    if(dir == 5):      motor1(speed/2 , -speed  , -speed/2, speed    )
    if(dir == 6):      motor1(0       , -speed  , 0       , speed    )
    if(dir == 7):      motor1(-speed/2, -speed  , speed/2 , speed    )    
    
    if(dir == 8):      motor1(-speed  , -speed  , speed   , speed    )
    
    if(dir == 9):      motor1(-speed   , -speed/2, speed   , speed/2 )
    if(dir == 10):     motor1(-speed   , 0       , speed   , 0       )
    if(dir == 11):     motor1(-speed   , speed/2 , speed   , -speed/2)
    if(dir == 12):     motor1(-speed   , speed   , speed   , -speed  )
    if(dir == 13):     motor1(-speed/2 , speed   , speed/2 , -speed  )
    if(dir == 14):     motor1(0        , speed   , 0       , -speed  )
    if(dir == 15):     motor1(speed/2  , speed   , -speed/2, -speed  )

def shift0(dir): 
    if (dir==0): motor0(speed, speed, -speed, -speed)#0
    if (dir==1): motor0(speed, -speed/2, -speed, speed/2)#3
    if (dir==2): motor0(speed, -speed, -speed, speed)#4
    if ((dir==3 or dir==4) or dir==9): motor0(0, -speed, 0, speed)#6
    if (((dir==5 or dir==6) or dir==10) or dir==11): motor0(-speed, -speed, speed, speed)#8
    if ((dir==7 or dir==12) or dir==13): motor0(-speed , 0 , speed , 0)#10
    if (dir==8): motor0(speed/2 , -speed , -speed/2, speed)#5
    if (dir==14): motor0(-speed , speed , speed , -speed )#12
    if (dir==15): motor0(-speed/2 , speed , speed/2 , -speed )#13

def shift1(dir):
    if (dir>0 and dir<8): motor1(speed, -speed, -speed, speed)
    elif (dir>8 and dir<=15): motor1(-speed, speed, speed, -speed)
    else: motor1(0, 0, 0, 0)

def out0():
    if (r0.ldr_r>=700):
        while (r0.imin<8 and r0.min<700):
            r0.sensor()
            if (r0.shr<=290):
                move0(12)
            else:
                r0.motor(0,0,0,0)
    if (r0.ldr_f>=700):
        while ((r0.imin<4 or r0.imin>12) and r0.min<700):
            r0.sensor()
            if (r0.shf<=280):
                move0(8)
            else:
                r0.motor(0,0,0,0)
    if (r0.ldr_l>=700):
        while ((r0.imin>8 and r0.imin<16) and r0.min<700):
            r0.sensor()
            if (r0.shl<=380):
                move0(4)
            else:
                r0.motor(0,0,0,0)
    if (r0.ldr_b>=700):
        while ((r0.imin>4 and r0.imin<12) and r0.min<700):
            r0.sensor()
            if (r0.shb<=370):
                move0(0)
            else:
                r0.motor(0,0,0,0)

def out1():
    while ((r1.imin>0 and r1.imin<8) and r1.min<700):
        r1.sensor()
        if (r1.shr>=500): move1(4)
        else: r1.motor(0, 0, 0, 0)
    while ((r1.imin>8 and r1.imin<16) and r1.min<700):
        r1.sensor()
        if (r1.shl>=560): move1(12)
        else: r1.motor(0, 0, 0, 0)

def bargasht0(sh_f0, sh_r0):
    if (sh_f0<1410):
        motor0(-speed, -speed, speed, speed)
    elif (sh_f0>1450):
        motor0(speed, speed, -speed, -speed)
    else:
        if (sh_r0<770):
            motor0(-speed, speed, speed, -speed)
        elif (sh_r0>810):
            motor0(speed, -speed, -speed, speed)
        else:
            motor0(0,0,0,0)

def bargasht1(sh_f1, sh_r1):
    if (sh_f1<1760):
        motor1(-speed, -speed, speed, speed)
    elif (sh_f1>1800):
        motor1(speed, speed, -speed, -speed)
    else:
        if (sh_r1<770):
            motor1(-speed, speed, speed, -speed)
        elif (sh_r1>810):
            motor1(speed, -speed, -speed, speed)
        else:
            motor1(0,0,0,0)





while True:
    r0.sensor()
    r1.sensor()

    cmp0=r0.cmp
    if (cmp0<0):        cmp0=cmp0+255
    if (cmp0>128):      cmp0=cmp0-255
    if (cmp0<128):      cmp0=cmp0
    cmp0 = -cmp0*2.3

    cmp1=r1.cmp
    if (cmp1<0):        cmp1=cmp1+255
    if (cmp1>128):      cmp1=cmp1-255
    if (cmp1<128):      cmp1=cmp1
    cmp1 = -cmp1*3
    
    if r0.min<500: shift0(r0.imin)
    else: 
        r0.sensor()
        bargasht0(r0.shf, r0.shr)
    
    if r1.min<500: shift1(r1.imin)
    else:
        r1.sensor()
        bargasht1(r1.shf, r1.shr)
    
    r1.sensor()
    if r1.cmp!=0: bargasht1(r1.shf, r1.shr)
    elif not(r1.shb>=380 and r1.shb<=420):
        r1.sensor()
        bargasht1(r1.shf, r1.shr)

    out0()
    out1()
