#include <LiquidCrystal.h>
const int rs = 10, en = 9, d4 = 8, d5 = 7, d6 = 6, d7 = 5;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
void setup() {
  lcd.begin(16, 2);
  lcd.setCursor(2, 0);
  lcd.print("Hello World");
  lcd.display();
}

void loop() {
  
}
