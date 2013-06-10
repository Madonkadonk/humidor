#include <DHT22.h>
#include <Wire.h>
#include <LCD.h>
#include <NewPing.h>
#include <LiquidCrystal_I2C.h>
// Only used for sprintf
#include <stdio.h>

// Data wire is plugged into port 7 on the Arduino
// Connect a 4.7K resistor between VCC and the data pin (strong pullup)
#define DHT22_PIN 7
#define I2C_ADDR    0x3F // <<----- Add your address here.  Find it from I2C Scanner
#define BACKLIGHT_PIN     3
#define En_pin  2
#define Rw_pin  1
#define Rs_pin  0
#define D4_pin  4
#define D5_pin  5
#define D6_pin  6
#define D7_pin  7

#define humid  5
#define light  6

#define TRIGGER_PIN  12  // Arduino pin tied to trigger pin on the ultrasonic sensor.
#define ECHO_PIN     11  // Arduino pin tied to echo pin on the ultrasonic sensor.
#define MAX_DISTANCE 200 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.

String out;
boolean flashing = true;
boolean empty = false;
boolean lowH = false;

LiquidCrystal_I2C	lcd(I2C_ADDR,En_pin,Rw_pin,Rs_pin,D4_pin,D5_pin,D6_pin,D7_pin);
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // NewPing setup of pins and maximum distance.
// Setup a DHT22 instance
DHT22 myDHT22(DHT22_PIN);

void setup(void)
{
  // start serial port
  lcd.begin (20,4); //  <<----- My LCD was 16x
  pinMode(humid, OUTPUT);
  pinMode(light, OUTPUT);
  Serial.begin(9600);
  lcd.setBacklightPin(BACKLIGHT_PIN,POSITIVE);
  lcd.setBacklight(HIGH);
  lcd.home (); // go home
  lcd.print("Humidor");  
}

void loop(void)
{ 
  DHT22_ERROR_t errorCode;
  
  // The sensor can only be read from every 1-2s, and requires a minimum
  // 2s warm-up after power-on.
  delay(2000);
  out = "{\"distance\":";
  errorCode = myDHT22.readData();
  unsigned int uS = sonar.ping(); // Send ping, get ping time in microseconds (uS).
  char buf3[128];
  sprintf(buf3, "Distance %d cm", uS / US_ROUNDTRIP_CM);
  out = out + uS / US_ROUNDTRIP_CM;
  //sprintf(out + strlen(out), "%d", uS / US_ROUNDTRIP_CM);
  if (uS /US_ROUNDTRIP_CM > 15) {
    digitalWrite(light, flashing);
    empty = true;
    flashing = !flashing;
  } else {
    digitalWrite(light, HIGH);
    empty = false;
  }
  lcd.setCursor(0, 3);
  lcd.print(buf3);

  switch(errorCode)
  {
    case DHT_ERROR_NONE:
      
      lcd.setCursor(0,1);
      char buf[128];
      sprintf(buf, "Temperature %hi.%01hi C", 
                   myDHT22.getTemperatureCInt()/10, abs(myDHT22.getTemperatureCInt()%10));
      out = out + ",\"temp\": " + myDHT22.getTemperatureCInt()/10;
      out = out + "." + abs(myDHT22.getTemperatureCInt()%10);
      //sprinft(out + strlen(out), ",temp: %hi.%01hi,", myDHT22.getTemperatureCInt()/10, abs(myDHT22.getTemperatureCInt()%10));

      lcd.print(buf);
      lcd.setCursor(0, 2);
      char buf2[128];
      sprintf(buf2, "Humidity %i.%01i %% RH",
                   myDHT22.getHumidityInt()/10, myDHT22.getHumidityInt()%10); 
      //sprintf(out + strlen(out), ",humid: %i.%01i", myDHT22.getHumidityInt()/10, myDHT22.getHumidityInt()%10); 
      out = out + ",\"humid\": " + myDHT22.getHumidityInt()/10;
      out = out + "." + myDHT22.getHumidityInt()%10;
      lcd.print(buf2);
       if(myDHT22.getHumidityInt()/10 < 68 && !empty && !lowH) {
        digitalWrite(humid, HIGH);
        lowH = true;
      } else {
        if(myDHT22.getHumidityInt()/10 < 70 && !empty) {
          digitalWrite(humid, HIGH);
        } else {
          lowH = false;
          digitalWrite(humid, LOW);
        }
      }
      // Alternately, with integer formatting which is clumsier but more compact to store and
	  // can be compared reliably for equality:
	  //	  
      break;
    case DHT_ERROR_CHECKSUM:
      break;
    case DHT_BUS_HUNG:
      break;
    case DHT_ERROR_NOT_PRESENT:
      break;
    case DHT_ERROR_ACK_TOO_LONG:
      break;
    case DHT_ERROR_SYNC_TIMEOUT:
      break;
    case DHT_ERROR_DATA_TIMEOUT:
      break;
    case DHT_ERROR_TOOQUICK:
      break;
  }
  out = out + "}";
  //sprintf(out + strlen(out), "}");
  Serial.println(out);
}
