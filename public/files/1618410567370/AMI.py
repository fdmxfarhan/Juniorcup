from juniorcup import *
r0 = Robot(0)
r1 = Robot(1)
speed0 = 215
speed1 = 150
cmp0 = 0
cmp1 = 1
def move0(direction):
    if(direction == 0):      r0.motor(speed0+cmp0   , speed0+cmp0    , -speed0+cmp0   , -speed0+cmp0)
    if(direction == 1):      r0.motor(speed0+cmp0   , speed0/2+cmp0 , -speed0+cmp0  , -speed0/2+cmp0 )
    if(direction == 2):      r0.motor(speed0+cmp0   , 0+cmp0        , -speed0+cmp0  , 0+cmp0         )
    if(direction == 3):      r0.motor(speed0+cmp0   , -speed0/2+cmp0, -speed0+cmp0  , speed0/2+cmp0  )
    if(direction == 4):      r0.motor(speed0+cmp0   , -speed0+cmp0  , -speed0+cmp0  , speed0+cmp0    )
    if(direction == 5):      r0.motor(speed0/2+cmp0 , -speed0+cmp0  , -speed0/2+cmp0, speed0+cmp0    )
    if(direction == 6):      r0.motor(0+cmp0        , -speed0+cmp0  , 0+cmp0        , speed0+cmp0    )
    if(direction == 7):      r0.motor(-speed0/2+cmp0, -speed0+cmp0  , speed0/2+cmp0 , speed0+cmp0    )    
    
    if(direction == 8):      r0.motor(-speed0+cmp0  , -speed0+cmp0  , speed0+cmp0   , speed0+cmp0    )
    
    if(direction == 9):      r0.motor(-speed0+cmp0   , -speed0/2+cmp0, speed0+cmp0   , speed0/2+cmp0 )
    if(direction == 10):     r0.motor(-speed0+cmp0   , 0+cmp0        , speed0+cmp0   , 0+cmp0        )
    if(direction == 11):     r0.motor(-speed0+cmp0   , speed0/2+cmp0 , speed0+cmp0   , -speed0/2+cmp0)
    if(direction == 12):     r0.motor(-speed0+cmp0   , speed0+cmp0   , speed0+cmp0   , -speed0+cmp0  )
    if(direction == 13):     r0.motor(-speed0/2+cmp0 , speed0+cmp0   , speed0/2+cmp0 , -speed0+cmp0  )
    if(direction == 14):     r0.motor(0+cmp0         , speed0+cmp0   , 0+cmp0       , -speed0+cmp0  )
    if(direction == 15):     r0.motor(speed0/2+cmp0  , speed0+cmp0   , -speed0/2+cmp0, -speed0+cmp0  )    
def move1(direction):
    if(direction == 0):      r1.motor(speed1+cmp1   , speed1+cmp1   , -speed1+cmp1  , -speed1+cmp1   )
    if(direction == 1):      r1.motor(speed1+cmp1   , speed1/2+cmp1 , -speed1+cmp1  , -speed1/2+cmp1 )
    if(direction == 2):      r1.motor(speed1+cmp1   , 0       , -speed1+cmp1  , 0        )
    if(direction == 3):      r1.motor(speed1+cmp1   , -speed1/2+cmp1, -speed1+cmp1  , speed1/2+cmp1  )
    if(direction == 4):      r1.motor(speed1+cmp1   , -speed1+cmp1  , -speed1+cmp1  , speed1+cmp1    )
    if(direction == 5):      r1.motor(speed1/2+cmp1 , -speed1+cmp1  , -speed1/2+cmp1, speed1+cmp1    )
    if(direction == 6):      r1.motor(0       , -speed1+cmp1  , 0       , speed1+cmp1    )
    if(direction == 7):      r1.motor(-speed1/2+cmp1, -speed1+cmp1  , speed1/2+cmp1 , speed1+cmp1    )    
    
    if(direction == 8):      r1.motor(-speed1+cmp1  , -speed1+cmp1  , speed1+cmp1   , speed1+cmp1    )
    
    if(direction == 9):      r1.motor(-speed1+cmp1   , -speed1/2+cmp1, speed1+cmp1   , speed1/2+cmp1 )
    if(direction == 10):     r1.motor(-speed1+cmp1   , 0       , speed1+cmp1   , 0       )
    if(direction == 11):     r1.motor(-speed1+cmp1   , speed1/2+cmp1 , speed1+cmp1   , -speed1/2+cmp1)
    if(direction == 12):     r1.motor(-speed1+cmp1   , speed1+cmp1   , speed1+cmp1   , -speed1+cmp1  )
    if(direction == 13):     r1.motor(-speed1/2+cmp1 , speed1+cmp1   , speed1/2+cmp1 , -speed1+cmp1  )
    if(direction == 14):     r1.motor(0        , speed1+cmp1   , 0       , -speed1+cmp1  )
    if(direction == 15):     r1.motor(speed1/2+cmp1  , speed1+cmp1   , -speed1/2+cmp1, -speed1+cmp1  )   
while True:
    r0.sensor()
    cmp0 = r0.cmp
    if cmp0 > 128 : cmp0 = cmp0-255
    cmp0 = -cmp0
    if r0.imin == 0:move0(0)
    elif r0.imin < 8:move0(r0.imin+3)
    else: move0(r0.imin-3)
    r1.sensor()
    cmp1 = r1.cmp
    if cmp1 > 128 : cmp1 = cmp1-255
    cmp1 = -cmp1
    if r1.imin == 0:move1(0)
    elif r1.imin < 8:move1(r1.imin+3)
    else: move1(r1.imin-3)

