void setup() {
  pinMode(A6, INPUT);   // IR sensor
  pinMode(13, OUTPUT);  // Buzzer
}

void loop() {
  if(digitalRead(A6)) digitalWrite(13, 1);
  else                digitalWrite(13, 0);
}
