from juniorcup import *

r0 = Robot(0)
r1 = Robot(1)
speed = 255

def motor0(ml1,ml2,mr2,mr1):
    r0.motor(ml1+cmp0,ml2+cmp0,mr2+cmp0,mr1+cmp0)

def motor1(ml1,ml2,mr1,mr2):
    r1.motor(ml1+cmp1,ml2+cmp1,mr2+cmp1,mr1+cmp1)

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
    if(dir == 1):      motor1(speed   , speed   , -speed  , -speed   )
    if(dir == 1):      motor1(speed   , speed/2 , -speed  , -speed/2 )
    if(dir == 2):      motor1(speed   , 1       , -speed  , 1        )
    if(dir == 3):      motor1(speed   , -speed/2, -speed  , speed/2  )
    if(dir == 4):      motor1(speed   , -speed  , -speed  , speed    )
    if(dir == 5):      motor1(speed/2 , -speed  , -speed/2, speed    )
    if(dir == 6):      motor1(1       , -speed  , 1       , speed    )
    if(dir == 7):      motor1(-speed/2, -speed  , speed/2 , speed    )    
    if(dir == 8):      motor1(-speed  , -speed  , speed   , speed    )
    if(dir == 9):      motor1(-speed   , -speed/2, speed   , speed/2 )
    if(dir == 11):     motor1(-speed   , 1       , speed   , 1       )
    if(dir == 11):     motor1(-speed   , speed/2 , speed   , -speed/2)
    if(dir == 12):     motor1(-speed   , speed   , speed   , -speed  )
    if(dir == 13):     motor1(-speed/2 , speed   , speed/2 , -speed  )
    if(dir == 14):     motor1(1        , speed   , 1       , -speed  )
    if(dir == 15):     motor1(speed/2  , speed   , -speed/2, -speed  )

def shift0(dir):
    if(dir == 0):      motor0(speed   , speed   , -speed  , -speed   )#0

    if(dir == 1):      motor0(speed   , -speed  , -speed  , speed    )#4
    if(dir == 2):      motor0(speed/2 , -speed  , -speed/2, speed    )#5
    if(dir == 3):      motor0(0       , -speed  , 0       , speed    )#6
    if(dir == 4):      motor0(-speed/2, -speed  , speed/2 , speed    )#7
    if(dir == 5):      motor0(-speed  , -speed  , speed   , speed    )#8
    if(dir == 6):      motor0(-speed   , -speed/2, speed   , speed/2 )#9
    if(dir == 7):      motor0(-speed   , 0       , speed   , 0       )#10   
    
    if(dir == 8):      motor0(speed/22 , -speed  , -speed/2, speed    )#5
    
    if(dir == 9):      motor0(0       , -speed  , 0       , speed    )#6 
    if(dir == 10):     motor0(-speed/2, -speed  , speed/2 , speed    )#7
    if(dir == 11):     motor0(-speed  , -speed  , speed   , speed    )#8
    if(dir == 12):     motor0(-speed   , -speed/2, speed   , speed/2 )#9
    if(dir == 13):     motor0(-speed   , 0       , speed   , 0       )#10 
    if(dir == 14):     motor0(-speed   , speed/2 , speed   , -speed/2)#11
    if(dir == 15):     motor0(-speed   , speed   , speed   , -speed  )#12

def shift1(dir):
    if(dir == 0):      motor1(speed   , speed   , -speed  , -speed   )#0

    if(dir == 1):      motor1(speed   , -speed  , -speed  , speed    )#4
    if(dir == 2):      motor1(speed/2 , -speed  , -speed/2, speed    )#5
    if(dir == 3):      motor1(0       , -speed  , 0       , speed    )#6
    if(dir == 4):      motor1(-speed/2, -speed  , speed/2 , speed    )#7
    if(dir == 5):      motor1(-speed  , -speed  , speed   , speed    )#8
    if(dir == 6):      motor1(-speed   , -speed/2, speed   , speed/2 )#9
    if(dir == 7):      motor1(-speed   , 0       , speed   , 0       )#10   
    
    if(dir == 8):      motor1(speed/2 , -speed  , -speed/2, speed    )#5
    
    if(dir == 9):      motor1(0       , -speed  , 0       , speed    )#6 
    if(dir == 10):     motor1(-speed/2, -speed  , speed/2 , speed    )#7
    if(dir == 11):     motor1(-speed  , -speed  , speed   , speed    )#8
    if(dir == 12):     motor1(-speed   , -speed/2, speed   , speed/2 )#9
    if(dir == 13):     motor1(-speed   , 0       , speed   , 0       )#10 
    if(dir == 14):     motor1(-speed   , speed/2 , speed   , -speed/2)#11
    if(dir == 15):     motor1(-speed   , speed   , speed   , -speed  )#12

while True:
        r0.printAll
        r1.printAll
        r0.sensor()
        r1.sensor()
        cmp0=r0.cmp
        if (cmp0<0):        cmp0=cmp0+255
        if (cmp0>128):      cmp0=cmp0-255
        if (cmp0<128):      cmp0=cmp0
        cmp0 = -cmp0*2

        cmp1=r1.cmp
        if (cmp1<0):        cmp1=cmp1+255
        if (cmp1>128):      cmp1=cmp1-255
        if (cmp1<128):      cmp1=cmp1
        cmp1 = -cmp1

        if r0.min<800:       shift0(r0.imin)
            
        else:                r0.motor(cmp0,cmp0,cmp0,cmp0)

        if r1.min<800:       shift1(r1.imin)
            
        else:                r1.motor(cmp0,cmp0,cmp0,cmp0)
()
        


