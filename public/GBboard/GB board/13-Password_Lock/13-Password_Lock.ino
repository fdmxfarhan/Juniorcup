#include <LiquidCrystal.h>
const int rs = 10, en = 9, d4 = 8, d5 = 7, d6 = 6, d7 = 5;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
String num = "";
String password = "1234";
void setup() {
  lcd.begin(16, 2);
  pinMode(13, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  lcd.print("Password: ");
  lcd.setCursor(0,1);
  lcd.print("Press *");
}

void loop() {
  digitalWrite(13, 1);
  digitalWrite(3 , 0);
  digitalWrite(A0, 0);
  digitalWrite(A1, 0);
  if(digitalRead(A2)) num += '3';
  if(digitalRead(A3)) num += '6';
  if(digitalRead(A4)) num += '9';
  if(digitalRead(A5)) num += '#';
  while(digitalRead(A2) || digitalRead(A3) || digitalRead(A4) || digitalRead(A5));
  delay(1);
  digitalWrite(13, 0);
  digitalWrite(3 , 1);
  digitalWrite(A0, 0);
  digitalWrite(A1, 0);
  if(digitalRead(A2)) num += 'A';
  if(digitalRead(A3)) num += 'B';
  if(digitalRead(A4)) num += 'C';
  if(digitalRead(A5)) num += 'D';
  while(digitalRead(A2) || digitalRead(A3) || digitalRead(A4) || digitalRead(A5));
  delay(1);
  digitalWrite(13, 0);
  digitalWrite(3 , 0);
  digitalWrite(A0, 1);
  digitalWrite(A1, 0);
  if(digitalRead(A2)) num += '2';
  if(digitalRead(A3)) num += '5';
  if(digitalRead(A4)) num += '8';
  if(digitalRead(A5)) num += '0';
  while(digitalRead(A2) || digitalRead(A3) || digitalRead(A4) || digitalRead(A5));
  delay(1);
  digitalWrite(13, 0);
  digitalWrite(3 , 0);
  digitalWrite(A0, 0);
  digitalWrite(A1, 1);
  if(digitalRead(A2)) num += '1';
  if(digitalRead(A3)) num += '4';
  if(digitalRead(A4)) num += '7';
  if(digitalRead(A5)){
    lcd.clear();
    if(num == password){
      digitalWrite(12, 1);
      digitalWrite(11, 0);
      lcd.print("Wellcome...");
      lcd.display();
      delay(10000);
    }
    else{
      digitalWrite(12, 0);
      digitalWrite(11, 1);
      lcd.print("Failed!");
      lcd.display();
    }
    num = "";
    delay(3000);
    digitalWrite(12, 0);
    digitalWrite(11, 0);
    lcd.clear();
    lcd.print("Password: ");
    lcd.setCursor(0,1);
    lcd.print("Press *");
  }
  while(digitalRead(A2) || digitalRead(A3) || digitalRead(A4) || digitalRead(A5));
  delay(1);
  lcd.setCursor(10,0);
  for(int i=0; i<num.length(); i++)
    lcd.print("*");
  lcd.display();
}
