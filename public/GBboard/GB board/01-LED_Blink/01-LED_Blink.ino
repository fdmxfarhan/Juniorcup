void setup() {
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
}

void loop() {
  digitalWrite(11, 1);
  digitalWrite(12, 0);
  delay(100);
  digitalWrite(11, 0);
  digitalWrite(12, 1);
  delay(100);
}
