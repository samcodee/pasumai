#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver myServo = Adafruit_PWMServoDriver();

#define SERVOMIN 150
#define SERVOMAX 400
#define ANALOG_PIN A0  // Analog pin to read the signal

int status = 0;  // Keep track of the servo position (0 = LOW, 1 = HIGH)

void setup() {
  Serial.begin(9600);
  myServo.begin();
  myServo.setPWMFreq(60);
  status = 0;  // Initially set status to LOW
}

void loop() {
  int analogValue = analogRead(ANALOG_PIN);  // Read analog value (0-1023)

  // Convert the analog value to voltage
  float voltage = analogValue * (5.0 / 1023.0);

  // Log the voltage
  // Serial.print("Analog Value: ");
  // Serial.print(analogValue);
  // Serial.print(", Voltage: ");
  // Serial.println(voltage);

  // If voltage is above 2.5V (representing HIGH from Raspberry Pi's 3.3V logic)
  if (voltage > 2.5 && status == 0) {
    Serial.println("Received HIGH signal");
    myServo.setPWM(0, 0, SERVOMIN);

    // Move(1);  // Move to 90 degrees (SERVOMAX)
    status = 1;  // Update status to HIGH
  } else if (voltage <= 2.5 && status == 1) {
    Serial.println("Received LOW signal");
    myServo.setPWM(0, 0, SERVOMAX);


    // Move(0);  // Move to 0 degrees (SERVOMIN)
    status = 0;  // Update status to LOW
  }

  delay(1000);  // Small delay to prevent rapid toggling
}

// Move the servo smoothly to the target position
void Move(int dir) {
  if (dir == 0) {
    // Move from SERVOMAX to SERVOMIN smoothly
    for (uint16_t pulselen = SERVOMIN; pulselen < SERVOMAX; pulselen++) {
      myServo.setPWM(0, 0, pulselen);
      // delay(5);  // Small delay to make movement smooth
    }
  } else {
    // Move from SERVOMIN to SERVOMAX smoothly
    for (uint16_t pulselen = SERVOMAX; pulselen > SERVOMIN; pulselen--) {
      myServo.setPWM(0, 0, pulselen);
      // delay(5);  // Small delay to make movement smooth
    }
  }
}
