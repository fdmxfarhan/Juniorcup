#include <LiquidCrystal.h>
const int rs = 10, en = 9, d4 = 8, d5 = 7, d6 = 6, d7 = 5;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
int a;
int srf(int trig,int echo){
  digitalWrite(trig,1);
  delayMicroseconds(10);
  digitalWrite(trig,0);
  return(pulseIn(echo, 1)*0.034/2);
}

void setup() {
  pinMode(2, OUTPUT);
  pinMode(13, OUTPUT);
  lcd.begin(16, 2);
}

void loop() {
  a = srf(2, 4);
  if(a < 8) digitalWrite(13, 1); // Buzzer On
  else{
    digitalWrite(13, 1); // Buzzer On
    delay(100);
    digitalWrite(13, 0); // Buzzer Off
    delay(a * 10);
  }
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(a);
  lcd.display();
  delay(100);
}
