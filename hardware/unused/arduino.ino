
#include <SoftwareSerial.h>
#include <DHT.h>
#include <TM1637Display.h>
#include <Adafruit_NeoPixel.h>
#include <string.h>

//-------------Bluetooth--------------//
#define BLUETXPIN 2
#define BLUERXPIN 3

const byte numChars = 15;
char inputdata[numChars]; // an array to store the received data

boolean newData = false;

//--------Temperature, Humidity--------//
#define DHTPIN A2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

//-------------Ultrasonic-------------//
#define USTRIGPIN A0
#define USECHOPIN A1

long duration;
long distance;

//--------------Magnetic--------------//
#define MAGPIN 13
int mag_value = 0;

SoftwareSerial wirelessSerial(BLUETXPIN, BLUERXPIN);

//--------------7Segment--------------//
#define TM1637CLKPIN 5
#define TM1637DIOPIN 4

TM1637Display display = TM1637Display(TM1637CLKPIN, TM1637DIOPIN);

// All segments on:
const uint8_t data[] = {0xff, 0xff, 0xff, 0xff};
// All segments off:
const uint8_t blank[] = {0x00, 0x00, 0x00, 0x00};

//--------------NeoPixel--------------//
#define NEOPIXELPIN 6
#define NUMLED 8
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMLED, NEOPIXELPIN, NEO_GRB + NEO_KHZ800);

//------------Entrypoint--------------//
void setup() {
  // Temp, Hum
  dht.begin();

  // Ultrasonic
  pinMode(USTRIGPIN, OUTPUT);
  pinMode(USECHOPIN, INPUT);

  // Magnetic
  pinMode(MAGPIN, INPUT);

  // Bluetooth
  wirelessSerial.begin(9600);

  // 7Segment
  display.clear();
  display.setBrightness(7);

  // NeoPixel
  strip.begin();
  strip.show();

  // Test
  Serial.begin(9600);
}

//------------Functions-------------//
void recvWithEndMarker() {
  static byte ndx = 0;
  char endMarker = '\n';
  char rc;

  while (wirelessSerial.available() > 0 && newData == false) {
    rc = wirelessSerial.read();

    if (rc != endMarker) {
      inputdata[ndx] = rc;
      ndx++;
      if (ndx >= numChars) {
        ndx = numChars - 1;
      }
    }
    else {
      inputdata[ndx] = '\0'; // terminate the string
      ndx = 0;
      newData = true;
    }
  }
  if (newData == true) {
    Serial.print("TESTTSETESTST ...... ");
    Serial.println(inputdata);
    Serial.println(strlen(inputdata));
    
    int inputdata_len = strlen(inputdata) - 10;
    Serial.print("INPUTDATALEN: ");
    Serial.println(inputdata_len);
    inputdata[inputdata_len] = '\0';

    Serial.println(inputdata);
    Serial.println(strlen(inputdata));
  }
}

void showNewData() {
  Serial.print("This just in ... ");
  Serial.println(inputdata);
  Serial.println(strlen(inputdata));
}

void ultrasonicSensor() {
  // Send signal
  digitalWrite(USTRIGPIN, LOW);
  delayMicroseconds(2);
  digitalWrite(USTRIGPIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(USTRIGPIN, LOW);

  // Save duration(Oneway x 2)
  duration = pulseIn(USECHOPIN, HIGH);

  // Calculate distance
  Serial.print("Duration: ");
  Serial.println(duration);
  distance = (duration * 17) / 1000 ;

  // Test
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println("cm");

  // Send thw BLE
  wirelessSerial.write(distance);
}

void temphumSensor() {
  // Get humidity and temperature
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Test
  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.println(" *C");

  // Send thw BLE
  wirelessSerial.write(h);
  wirelessSerial.write(t);
}

void magneticSensor() {
  // Get mag value
  mag_value = digitalRead(MAGPIN);

  // Test
  Serial.print("Magnetic: ");
  Serial.println(mag_value);

  // Send thw BLE
  wirelessSerial.write(mag_value);
}

void cycleNeoPixel() {
  for (int i = 0; i < NUMLED; i++) {
    strip.setPixelColor(i % NUMLED, 0, 0, 0);
    strip.setPixelColor((i + 1) % NUMLED, 0, 1, 2);
    strip.setPixelColor((i + 2) % NUMLED, 0, 4, 3);
    strip.setPixelColor((i + 3) % NUMLED, 0, 16, 9);
    strip.setPixelColor((i + 4) % NUMLED, 0, 30, 16);
    strip.setPixelColor((i + 5) % NUMLED, 0, 60, 31);
    strip.setPixelColor((i + 6) % NUMLED, 0, 0, 0);
    strip.setPixelColor((i + 7) % NUMLED, 1, 2, 0);
  
    strip.show();
    delay(80);
  }
}

void offNeoPixel() {
  for (int i = 0; i < NUMLED; i++) {
    strip.setPixelColor(i, 0, 0, 0);
  }
  strip.show();
}

void doseDisplay() {
  Serial.print("Dose: ");
  Serial.println(inputdata);
  Serial.println(int(inputdata[0] - '0'));
  for (int i = 0; i < 10; i++) {
    cycleNeoPixel();
    display.showNumberDec(int(inputdata[0] - '0'), false, 1, 3);
  }
  display.clear();
  offNeoPixel();
}

void dateDisplay() {
  Serial.print("Last time: ");
  Serial.print(inputdata[0]);
  Serial.print(inputdata[1]);
  Serial.print(inputdata[2]);
  Serial.println(inputdata[3]);

  display.showNumberDec(int(inputdata[0] - '0'), false, 1, 0);
  display.showNumberDec(int(inputdata[1] - '0'), false, 1, 1);
  display.showNumberDec(int(inputdata[2] - '0'), false, 1, 2);
  display.showNumberDec(int(inputdata[3] - '0'), false, 1, 3);
  delay(5000);
  display.clear();
}


//---------------Main----------------//
void loop() {
  // Data
  if (newData == false) {
    recvWithEndMarker();
  }

  // Call Functions
  if (newData == true) {
    showNewData();
    // Menu
    if (inputdata[0] == 'A') {
      ultrasonicSensor();
    }
    else if (inputdata[0] == 'B') {
      temphumSensor();
    }
    else if (inputdata[0] == 'C') {
      magneticSensor();
    }
    else if (strlen(inputdata) < 4) {
      doseDisplay();
    } else {
      dateDisplay();
    }
    newData = false;
  }
}