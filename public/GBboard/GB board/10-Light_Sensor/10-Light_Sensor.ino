#include <LiquidCrystal.h>
const int rs = 10, en = 9, d4 = 8, d5 = 7, d6 = 6, d7 = 5;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
int a;
void setup() {
  pinMode(A7, INPUT);
  pinMode(12, OUTPUT);
  lcd.begin(16, 2);
}

void loop() {
  a = analogRead(A7);
  if(a > 800) digitalWrite(12, 1);
  else        digitalWrite(12, 0);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(a);
  lcd.display();
  delay(100);
}
