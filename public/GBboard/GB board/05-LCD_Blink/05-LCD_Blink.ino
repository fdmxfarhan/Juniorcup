#include <LiquidCrystal.h>
const int rs = 10, en = 9, d4 = 8, d5 = 7, d6 = 6, d7 = 5;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
void setup() {
  lcd.begin(16, 2);
  lcd.print("Hello World");
  lcd.display();
}

void loop() {
  lcd.noBlink();
  delay(3000);
  lcd.blink();
  delay(3000);
  /*
  lcd.noDisplay();
  delay(500);
  lcd.display();
  delay(500);
  */
}
