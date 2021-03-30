#include <LiquidCrystal.h>
int distance=0;
char num = ' ';
int srf(int trig,int echo){
  digitalWrite(trig,1);
  delayMicroseconds(10);
  digitalWrite(trig,0);
  return(pulseIn(echo, 1)*0.034/2);
}
const int rs = 10, en = 9, d4 = 8, d5 = 7, d6 = 6, d7 = 5;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

void setup() {
  lcd.begin(16, 2);
  pinMode(2, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  
  pinMode(13, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  
  digitalWrite(11, 1);
  digitalWrite(12, 0);
  
  lcd.setCursor(2, 0);
  lcd.print("Wellcome to");
  lcd.setCursor(3, 1);
  lcd.print("GB board");
  
  for(int i=0; i<3; i++){
    digitalWrite(13, 1);
    delay(200);
    digitalWrite(13, 0);
    delay(200);
  }
  digitalWrite(11, 0);
  digitalWrite(12, 1);
  lcd.clear();
}

void loop() {
  int a = analogRead(A7);
  int b = analogRead(A6);
  distance = srf(2,4);
  
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
  lcd.print("LDR:");
  lcd.print((a/1000)%10);
  lcd.print((a/100)%10);
  lcd.print((a/10)%10);
  lcd.print((a/1)%10);
  
  lcd.setCursor(9,0);
  lcd.print("IR:");
  lcd.print((b/1000)%10);
  lcd.print((b/100)%10);
  lcd.print((b/10)%10);
  lcd.print((b/1)%10);
  
  lcd.setCursor(0,1);
  lcd.print("D:");
  lcd.print((distance/100)%10);
  lcd.print((distance/10)%10);
  lcd.print((distance/1)%10);
  
  lcd.setCursor(9,1);
  lcd.print("Key:");
  lcd.print(num);
  
  lcd.display();

  delay(100);
}



















































  /*
  ////////Scroll Display
  for (int positionCounter = 0; positionCounter < 11; positionCounter++) {
    lcd.scrollDisplayRight();
    delay(150);
  }
  for (int positionCounter = 0; positionCounter < 11; positionCounter++) {
    lcd.scrollDisplayLeft();
    delay(150);
  }
  */

  /*
  ////////a to z print
  if (thisChar == 'q')
    lcd.setCursor(0,1);
  if (thisChar != 'z'+1) {
    lcd.write(thisChar);
    delay(100);
    thisChar++;
  }
  */
  
  /*
  ////////Text Blink
  lcd.setCursor(0,0);
  //lcd.home();
  lcd.print("Hello");
  
  lcd.noDisplay();
  delay(500);
  lcd.display();
  delay(500);
  */
  
  /*
  /////////Line Blink
  lcd.noCursor();
  delay(500);
  // Turn on the cursor:
  lcd.cursor();
  delay(500);
  */
  /*
  ////////Blink
  lcd.noBlink();
  delay(3000);
  lcd.blink();
  delay(3000);
  */
//}
