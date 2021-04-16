from juniorcup import *

r0 = Robot(0)
r1 = Robot(1)
speed = 200
c0=r0.cmp
c1=r1.cmp

def compass():
    global cmp0 , cmp1
    cmp0=r0.cmp
    if (cmp0<0):        cmp0=cmp0+255
    if (cmp0>128):      cmp0=cmp0-255
    if (cmp0<128):      cmp0=cmp0
    if (cmp0>-40 and cmp0<40):   cmp0 = -cmp0*2
    else:                        cmp0=  -cmp0

    cmp1=r1.cmp
    if (cmp1<0):        cmp1=cmp1+255
    if (cmp1>128):      cmp1=cmp1-255
    if (cmp1<128):      cmp1=cmp1
    if (cmp1>-40 and cmp1<40):   cmp1 = -cmp1*4
    else:                        cmp1=  -cmp1*3

    if r0.dist<30 and r0.shf<900 and r0.shr+r0.shl>1450 and r0.shf+r0.shb>2000:
        if r0.shr>1000 :     cmp0+=100
        elif r0.shr<800:     cmp0+=-100


def motor0(ml1, ml2, mr2, mr1):
    r0.motor(ml1 + cmp0, ml2 + cmp0, mr2 + cmp0, mr1 + cmp0)


def motor1(ml1, ml2, mr2, mr1):
    r1.motor(ml1 + cmp1, ml2 + cmp1, mr2 + cmp1, mr1 + cmp1)

def move0(dir):
    if(dir == 0):
        motor0(speed   , speed   , -speed  , -speed   )
    elif(dir == 1):      motor0(speed   , speed/2 , -speed  , -speed/2 )
    elif(dir == 2):      motor0(speed   , 0       , -speed  , 0        )
    elif(dir == 3):      motor0(speed   , -speed/2, -speed  , speed/2  )
    elif(dir == 4):      motor0(speed   , -speed  , -speed  , speed    )
    elif(dir == 5):      motor0(speed/2 , -speed  , -speed/2, speed    )
    elif(dir == 6):      motor0(0       , -speed  , 0       , speed    )
    elif(dir == 7):      motor0(-speed/2, -speed  , speed/2 , speed    )    
    
    elif(dir == 8):      motor0(-speed  , -speed  , speed   , speed    )
    
    elif(dir == 9):      motor0(-speed   , -speed/2, speed   , speed/2 )
    elif(dir == 10):     motor0(-speed   , 0       , speed   , 0       )
    elif(dir == 11):     motor0(-speed   , speed/2 , speed   , -speed/2)
    elif(dir == 12):     motor0(-speed   , speed   , speed   , -speed  )
    elif(dir == 13):     motor0(-speed/2 , speed   , speed/2 , -speed  )
    elif(dir == 14):     motor0(0        , speed   , 0       , -speed  )
    elif(dir == 15):     motor0(speed/2  , speed   , -speed/2, -speed  )

def move1(dir):
    if(dir == 0):      motor1(speed   , speed   , -speed  , -speed   )
    elif(dir == 1):      motor1(speed   , speed/2 , -speed  , -speed/2 )
    elif(dir == 2):      motor1(speed   , 0       , -speed  , 0        )
    elif(dir == 3):      motor1(speed   , -speed/2, -speed  , speed/2  )
    elif(dir == 4):      motor1(speed/2   , -speed/2  , -speed/2  , speed/2    )
    elif(dir == 5):      motor1(speed/2 , -speed  , -speed/2, speed    )
    elif(dir == 6):      motor1(0       , -speed  , 0       , speed    )
    elif(dir == 7):      motor1(-speed/2, -speed  , speed/2 , speed    )    
    
    elif(dir == 8):      motor1(-speed  , -speed  , speed   , speed    )
    
    elif(dir == 9):      motor1(-speed   , -speed/2, speed   , speed/2 )
    elif(dir == 10):     motor1(-speed   , 0       , speed   , 0       )
    elif(dir == 11):     motor1(-speed   , speed/2 , speed   , -speed/2)
    elif(dir == 12):     motor1(-speed/2   , speed/2   , speed/2   , -speed/2  )
    elif(dir == 13):     motor1(-speed/2 , speed   , speed/2 , -speed  )
    elif(dir == 14):     motor1(0        , speed   , 0       , -speed  )
    elif(dir == 15):     motor1(speed/2  , speed   , -speed/2, -speed  )

def shift0(dir):
    if(dir == 0):      motor0(255   , 255   , -255  , -255   )#0

    elif(dir == 1):      motor0(speed   , -speed  , -speed  , speed    )#4
    elif(dir == 2):      motor0(speed/2 , -speed  , -speed/2, speed    )#5
    elif(dir == 3):      motor0(0       , -speed  , 0       , speed    )#6
    elif(dir == 4):      motor0(-speed/2, -speed  , speed/2 , speed    )#7
    elif(dir == 5):      motor0(-speed  , -speed  , speed   , speed    )#8
    elif(dir == 6):      motor0(-speed  , -speed  , speed   , speed    )#8
    elif(dir == 7):      motor0(-speed   , -speed/2, speed   , speed/2 )#9
    
    elif(dir == 8):      motor0(0       , -speed  , 0       , speed    )#6 
    
    elif(dir == 9):      motor0(-speed/2, -speed  , speed/2 , speed    )#7
    elif(dir == 10):     motor0(-speed  , -speed  , speed   , speed    )#8
    elif(dir == 11):     motor0(-speed  , -speed  , speed   , speed    )#8
    elif(dir == 12):     motor0(-speed   , -speed/2, speed   , speed/2 )#9 
    elif(dir == 13):     motor0(-speed   , 0       , speed   , 0       )#10 
    elif(dir == 14):     motor0(-speed   , speed/2 , speed   , -speed/2)#11
    elif(dir == 15):     motor0(-speed   , speed   , speed   , -speed  )#12

def shift1(dir):
    if(dir == 0):      motor1(speed   , speed   , -speed  , -speed   )#0

    elif(dir == 1):      motor1(speed   , -speed  , -speed  , speed    )#4
    elif(dir == 2):      motor1(speed/2 , -speed  , -speed/2, speed    )#5
    elif(dir == 3):      motor1(0       , -speed  , 0       , speed    )#6
    elif(dir == 4):      motor1(-speed/2, -speed  , speed/2 , speed    )#7
    elif(dir == 5):      motor1(-speed  , -speed  , speed   , speed    )#8
    elif(dir == 6):      motor1(-speed   , -speed/2, speed   , speed/2 )#9
    elif(dir == 7):      motor1(-speed   , 0       , speed   , 0       )#10   
    
    elif(dir == 8):      motor1(speed/2 , -speed  , -speed/2, speed    )#5
    
    elif(dir == 9):      motor1(0       , -speed  , 0       , speed    )#6 
    elif(dir == 10):     motor1(-speed/2, -speed  , speed/2 , speed    )#7
    elif(dir == 11):     motor1(-speed  , -speed  , speed   , speed    )#8
    elif(dir == 12):     motor1(-speed   , -speed/2, speed   , speed/2 )#9
    elif(dir == 13):     motor1(-speed   , 0       , speed   , 0       )#10 
    elif(dir == 14):     motor1(-speed   , speed/2 , speed   , -speed/2)#11
    elif(dir == 15):     motor1(-speed   , speed   , speed   , -speed  )#12

def out0():
    if(r0.ldr_r > 600):
        while(r0.imin < 8 and r0.min < 700):
            r0.sensor()
            darvaze()
            compass()
            if(r0.shr < 300): 
                move0(12)
            else:
                motor0(0,0,0,0)
    if(r0.ldr_l > 600):
        while((r0.imin > 8 or r0.imin==0)and r0.min < 700):
            r0.sensor()
            darvaze()
            compass()
            if(r0.shl < 300): 
                move0(4)
            else:
                motor0(0,0,0,0)
    if(r0.ldr_f > 600):
        while((r0.imin<4 or r0.imin>12)and r0.min < 700):
            r0.sensor()
            darvaze()
            compass()
            if(r0.shf < 300): 
                move0(8)
            else:
                motor0(0,0,0,0)
    if(r0.ldr_b > 600):
        while((r0.imin < 12 and r0.imin>4)and r0.min < 700):
            r0.sensor()
            darvaze()
            compass()
            if(r0.shb < 300): 
                move0(0)
            else:
                motor0(0,0,0,0)

        

def out1():
    if r1.shr<350:
        if r1.ldr_r>700 and r1.imin<8:
            move1(12)
    if r1.shl<350:
        if r1.ldr_l>700 and (r1.imin>8 or r1.imin==0):
            move1(4)
    if r1.shf<350:
        if r1.ldr_f>700 and (r1.imin<4 or r1.imin>12):
            move1(8)
    if r1.shb<350:
        if r1.ldr_b>700 and (r1.imin>4 and r1.imin<12):
            move1(0)

def darvaze():
    compass()
    r1.sensor()
    if(r1.ldr_r<700 and r1.ldr_l<700 and r1.ldr_f<700 and r1.ldr_b<700):
        if r1.shr+r1.shl>1500:
            if(r1.min<800 and r1.shb>500):
                move1(8)
            elif(r1.min<800 and r1.shb<400):
                move1(0)      
            elif(r1.min<800 and r1.imin==0):
                r1.motor(cmp1,cmp1,cmp1,cmp1)
            elif(r1.min<800 and r1.imin<8 and r1.shr>500 ):
                move1(4) 
            elif(r1.min<800 and r1.imin>8 and r1.shl>500):
                move1(12) 
            else: 
                r1.motor(cmp1,cmp1,cmp1,cmp1)
                
        elif r1.shr+r1.shl<=1500:
            if(r1.min<800 and r1.shb>500):
                move1(8)
            elif(r1.min<800 and r1.shb<00):
                move1(0)      

            elif(r1.min<800 and r1.imin==0):
                r1.motor(cmp1,cmp1,cmp1,cmp1)
            elif r1.imin>8 and r1.min<800:
                move1(12)
            elif r1.min<800 and r1.imin<8:
                move1(4)
    else:
        out1()


while True:
    r0.sensor()
    r1.sensor()
    
    compass()
    
    out0()
    if(r0.min<700):        
        if r0.dist<=40:            
          shift0(r0.imin)
        elif r0.dist>40:            
          move0(r0.imin)
    else:             
        if r0.shb>300:             move0(8)            
        elif r0.shr<750:           move0(12)            
        elif r0.shl<750:           move0(4)            
        else:                      r0.motor(cmp0, cmp0, cmp0, cmp0)


    darvaze()

    print(r1.shr+r1.shl)
