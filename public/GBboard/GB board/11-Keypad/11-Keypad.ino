#include <LiquidCrystal.h>
const int rs = 10, en = 9, d4 = 8, d5 = 7, d6 = 6, d7 = 5;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
char num = ' ';
void setup() {
  lcd.begin(16, 2);
  pinMode(13, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
}

void loop() {
  digitalWrite(13, 1);
  digitalWrite(3 , 0);
  digitalWrite(A0, 0);
  digitalWrite(A1, 0);
  if(digitalRead(A2)) num = '3';
  if(digitalRead(A3)) num = '6';
  if(digitalRead(A4)) num = '9';
  if(digitalRead(A5)) num = '#';
  delay(1);
  digitalWrite(13, 0);
  digitalWrite(3 , 1);
  digitalWrite(A0, 0);
  digitalWrite(A1, 0);
  if(digitalRead(A2)) num = 'A';
  if(digitalRead(A3)) num = 'B';
  if(digitalRead(A4)) num = 'C';
  if(digitalRead(A5)) num = 'D';
  delay(1);
  digitalWrite(13, 0);
  digitalWrite(3 , 0);
  digitalWrite(A0, 1);
  digitalWrite(A1, 0);
  if(digitalRead(A2)) num = '2';
  if(digitalRead(A3)) num = '5';
  if(digitalRead(A4)) num = '8';
  if(digitalRead(A5)) num = '0';
  delay(1);
  digitalWrite(13, 0);
  digitalWrite(3 , 0);
  digitalWrite(A0, 0);
  digitalWrite(A1, 1);
  if(digitalRead(A2)) num = '1';
  if(digitalRead(A3)) num = '4';
  if(digitalRead(A4)) num = '7';
  if(digitalRead(A5)) num = '*';
  delay(1);
  
  lcd.setCursor(0,0);
  lcd.print(num);
  lcd.display();
}
