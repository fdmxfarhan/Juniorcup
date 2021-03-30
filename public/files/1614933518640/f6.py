from juniorcup import *
r0 = Robot(0)
r1 = Robot(1)
speed = 255

while True:
    #motor0(ml1, ml2, mr2, mr1):
    #r0.motor(255,128,-255,-128)

        r0.sensor()
        if(r0.imin==0):   r0.motor(speed,speed,-speed,-speed)#0
        if(r0.imin==1):   r0.motor(speed   , speed/2 , -speed  , -speed/2 )#1
        if(r0.imin==2):   r0.motor(speed   , 0       , -speed  , 0        )#2
        if(r0.imin==3):   r0.motor(speed   , -speed/2, -speed  , speed/2  )#3
        if(r0.imin==4):   r0.motor(speed   , -speed  , -speed  , speed    )#4
        if(r0.imin==5):   r0.motor(speed/2 , -speed  , -speed/2, speed    )#5
        if(r0.imin==6):   r0.motor(0       , -speed  , 0       , speed    )#6
        if(r0.imin==7):   r0.motor(-speed/2, -speed  , speed/2 , speed    )  #7
        if(r0.imin==8):   r0.motor(-speed  , -speed  , speed   , speed    )#8
        if(r0.imin==9):   r0.motor(-speed   , -speed/2, speed   , speed/2 )#9
        if(r0.imin==10):  r0.motor(-speed   , 0       , speed   , 0       )#10
        if(r0.imin==11):  r0.motor(-speed   , speed/2 , speed   , -speed/2)#11
        if(r0.imin==12):  r0.motor(-speed   , speed   , speed   , -speed  )#12
        if(r0.imin==13):  r0.motor(-speed/2 , speed   , speed/2 , -speed  )#13
        if(r0.imin==14):  r0.motor(0        , speed   , 0       , -speed  )#14
        if(r0.imin==15):  r0.motor(speed/2  , speed   , -speed/2, -speed  )#15


        r1.sensor()
        if(r1.imin==0):   r1.motor(speed,speed,-speed,-speed)#0
        if(r1.imin==1):   r1.motor(speed   , speed/2 , -speed  , -speed/2 )#1
        if(r1.imin==2):   r1.motor(speed   , 0       , -speed  , 0        )#2
        if(r1.imin==3):   r1.motor(speed   , -speed/2, -speed  , speed/2  )#3
        if(r1.imin==4):   r1.motor(speed   , -speed  , -speed  , speed    )#4
        if(r1.imin==5):   r1.motor(speed/2 , -speed  , -speed/2, speed    )#5
        if(r1.imin==6):   r1.motor(0       , -speed  , 0       , speed    )#6
        if(r1.imin==7):   r1.motor(-speed/2, -speed  , speed/2 , speed    )  #7
        if(r1.imin==8):   r1.motor(-speed  , -speed  , speed   , speed    )#8
        if(r1.imin==9):   r1.motor(-speed   , -speed/2, speed   , speed/2 )#9
        if(r1.imin==10):  r1.motor(-speed   , 0       , speed   , 0       )#10
        if(r1.imin==11):  r1.motor(-speed   , speed/2 , speed   , -speed/2)#11
        if(r1.imin==12):  r1.motor(-speed   , speed   , speed   , -speed  )#12
        if(r1.imin==13):  r1.motor(-speed/2 , speed   , speed/2 , -speed  )#13
        if(r1.imin==14):  r1.motor(0        , speed   , 0       , -speed  )#14
        if(r1.imin==15):  r1.motor(speed/2  , speed   , -speed/2, -speed  )#1