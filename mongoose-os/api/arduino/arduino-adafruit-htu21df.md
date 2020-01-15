# Adafruit HTU21D-F
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-adafruit-htu21df](https://github.com/mongoose-os-libs/arduino-adafruit-htu21df) | &nbsp; | &nbsp;  | [api_arduino_htu21df.js](https://github.com/mongoose-os-libs/arduino-adafruit-htu21df/blob/master/mjs_fs/api_arduino_htu21df.js)         |


# Arduino Adafruit HTU21D(D) library for Mongoose OS

This is a port of the [Adafruit Arduino driver for the HTU21D(F) sensor](https://github.com/adafruit/Adafruit_HTU21DF_Library) ported to run on the [Mongoose OS ecosystem](https://mongoose-os.com/docs/reference/api.html).

Usage is extremely simple....

in _**mos.yml**_, add to **libs:** section,

`  - origin: https://github.com/mongoose-os-libs/arduino-adafruit-htu21df`
  
in your _**init.js**_, add something like the following,

```javascript
load('api_arduino_htu21df.js');
```

and

```javascript
// Initialize Adafruit_HTU21DF library
let htu = Adafruit_HTU21DF.create();
htu.begin();
let htuGetData = function () {
    print('HTU21D:  T: ', htu.readTemperature() ,'C     RH: ', htu.readHumidity(), '%');
};
let htuTimer = Timer.set(10000 /* milliseconds */, true /* repeat */, htuGetData, null);
```

to use the library.

Enjoy!


 ----- 

### JS API

 --- 
#### myHTU.begin

```javascript
myHTU.begin()
```
Initialize sensor and make it ready for use.
Return value: 1 if sensor is ready, 0 otherwise.
#### myHTU.readTemperature

```javascript
myHTU.readTemperature()
```
Read the current temperature.
Return value: current temperature value in Celsius as a double.
#### myHTU.readHumidity

```javascript
myHTU.readHumidity()
```
Read the current relative humidity as a percentage.
Return value: current humidity value as a double.
#### myHTU.reset

```javascript
myHTU.reset()
```
Reset the sensor - sends the sensor-specific command to reset.
Return value: none
#### Adafruit_HTU21DF.create

```javascript
Adafruit_HTU21DF.create()
```
Create an Adafruit_HTU21DF instance on I2C bus (address = 0x40).
Return value: an object with the methods defined in _proto: {...} (above).
