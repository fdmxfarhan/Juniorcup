#include <LiquidCrystal.h>
const int rs = 10, en = 9, d4 = 8, d5 = 7, d6 = 6, d7 = 5;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
int a;
void setup() {
  pinMode(A6, INPUT);
  lcd.begin(16, 2);
}

void loop() {
  a = analogRead(A6);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(a);
  lcd.display();
  delay(100);
}
