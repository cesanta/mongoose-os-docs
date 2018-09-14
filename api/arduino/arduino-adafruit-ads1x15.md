# Adafruit ADS1015
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-adafruit-ads1x15](https://github.com/mongoose-os-libs/arduino-adafruit-ads1x15) | [](https://github.com/mongoose-os-libs/arduino-adafruit-ads1x15/tree/master/include/) | &nbsp;  | [api_ads1015.js](https://github.com/mongoose-os-libs/arduino-adafruit-ads1x15/tree/master/mjs_fs/api_ads1015.js)         |

Arduino Adafruit ADS1015 12-BiT/ADS1115 16-Bit ADC - 4 Channel with Programmable Gain Amplifier library for Mongoose OS
=========

Tested and works on esp8266/esp32

## Description
Analog-to-digital converter or higher-precision ADC. 

|           | precision | samples\sec |
| :---      |     :---: | :---        |
| ADS1015   | 12-bit    | 3300        |
| ADS1115   | 16-bit    | 860         |

The chip can be configured as 4 single-ended input channels, or two differential channels. As a nice bonus, it even includes a programmable gain amplifier, up to x16, to help boost up smaller single/differential signals to the full range. See [ADS1015](https://www.adafruit.com/product/1083) [ADS1115](https://www.adafruit.com/product/1085) for more information about the hardware.   

![alt text](https://cdn-shop.adafruit.com/970x728/1083-00.jpg)
![alt text](https://cdn-shop.adafruit.com/970x728/1085-02.jpg)

### Features
* Wide supply range: 2.0V to 5.5V
* Low current consumption: Continuous Mode: Only 150uA Single-Shot Mode: Auto Shut-Down
* Programmable data rate: 8SPS to 860SPS
* Internal Low-drift voltage reference
* Internal oscillator
* Internal PGA
* I2C interface: Pin-Selectable Addresses
* Four Single-ended or two differential inputs
* Programmable comparator
* This board/chip uses I2C 7-bit addresses between 0x48-0x4B, selectable with jumpers

### Usage

mos.yml, add:
```
config_schema:
 - ["i2c.enable", true]
libs:
 - origin: https://github.com/mongoose-os-libs/arduino-adafruit-ads1x15
  ```
init.js, add:
```
load('api_ads1015.js');
```
[ (JavaScript) usage example](https://github.com/mongoose-os-apps/example-arduino-adafruit-ads1x15-js)

main.c, add:
```
#include "mgos_arduino_Adafruit_ADS1015.h"
```

### Slave address
* Address pin connected to GND = 0x48 Offset = binary 1001000
* Address pin connected to VDD = 0x49 Offset = binary 1001001
* Address pin connected to SDA = 0x4A Offset = binary 1001010
* Address pin connected to SCL = 0x4B Offset = binary 1001011



 ----- 

### JS API

 --- 
#### Adafruit_ADS1015.create

```javascript
Adafruit_ADS1015.create(i2cAddress)
```
Create an ADS1015 instance: an object with the methods described below.
`i2cAddress` is an I2C address of the ADS1015.
#### Adafruit_ADS1115.create

```javascript
Adafruit_ADS1115.create(i2cAddress)
```
Create an ADS1115 instance: an object with the methods described below.
`i2cAddress` is an I2C address of the ADS1115.
#### myADS.close

```javascript
myADS.close()
```
Close an instance; no methods can be called on this instance after that.
Return value: none.
#### myADS.begin

```javascript
myADS.begin()
```
Set up the ADS1015/ADS1115 hardware
#### myADS.readADC_SingleEnded

```javascript
myADS.readADC_SingleEnded(channel)
```
Get a single-ended ADC reading from the given `channel`.
#### myADS.readADC_Differential_0_1

```javascript
myADS.readADC_Differential_0_1()
```
Read the conversion results, measuring the difference between the P
(AIN0) and N (AIN1) input. Returns a signed value since the difference
can be either positive or negative.
#### myADS.readADC_Differential_0_1

```javascript
myADS.readADC_Differential_0_1()
```
Read the conversion results, measuring the difference between the P
(AIN2) and N (AIN3) input. Returns a signed value since the difference
can be either positive or negative.
#### myADS.startComparator_SingleEnded

```javascript
myADS.startComparator_SingleEnded(channel, threshold)
```
Set up the comparator to operate in basic mode, causing the ALERT/RDY
pin to assert (go from high to low) when the ADC value exceeds the
specified `threshold`.
Return value: none.
#### myADS.getLastConversionResults

```javascript
myADS.getLastConversionResults()
```
In order to clear the comparator, we need to read the conversion
results.  This function reads the last conversion results without
changing the config value.
#### myADS.setGain

```javascript
myADS.setGain(gain)
```
Set the gain and input voltage range; one of the following:

- `Adafruit_ADS1015.GAIN_TWOTHIRDS`
- `Adafruit_ADS1015.GAIN_ONE`
- `Adafruit_ADS1015.GAIN_TWO`
- `Adafruit_ADS1015.GAIN_FOUR`
- `Adafruit_ADS1015.GAIN_EIGHT`
- `Adafruit_ADS1015.GAIN_SIXTEEN`

Return value: none.
