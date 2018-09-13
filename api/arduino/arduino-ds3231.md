Arduino DS3231 High Precision Real Time Clock (RTC) library for Mongoose OS
=========

Tested and works on esp8266/esp32

## Description
DS3231 is a low-cost, extremely accurate I2C real-time clock (RTC), with an integrated temperature-compensated crystal oscillator (TCXO) and crystal. The device incorporates a battery input, disconnect the main power supply and maintains accurate timekeeping. Integrated oscillator improve long-term accuracy of the device and reduces the number of components of the production line.
RTC maintains seconds, minutes, hours, day, date, month, and year information. Less than 31 days of the month, the end date will be automatically adjusted, including corrections for leap year. The clock operates in either the 24 hours or band / AM / PM indication of the 12-hour format. Provides two configurable alarm clock and a calendar can be set to a square wave output. Address and data are transferred serially through an I2C bidirectional bus.See [product page link](https://www.adafruit.com/product/3013) for more information about the hardware.

![alt text](https://cdn-shop.adafruit.com/970x728/3013-02.jpg)

### Features
* Battery
* Operating voltage: 3.3 - 5.5V
* Clock chip: High-precision clock chip DS3231
* Clock Accuracy: 0-40 °C range, the accuracy 2ppm, the error was about 1 minute
* Calendar alarm clock with two
* Programmable square-wave output
* Real time clock generator seconds, minutes, hours, day, date, month and year timing and provide valid until the year 2100 leap year compensation

### Usage

mos.yml, add:
```
config_schema:
 - ["i2c.enable", true]
libs:
 - origin: https://github.com/mongoose-os-libs/arduino-ds3231
 ```
init.js, add:
```
load('api_ds3231.js');
```
[ (JavaScript) usage example](https://github.com/mongoose-os-apps/example-arduino-ds3231-js)

```
#include "mgos_arduino_DS3231.h" 
```

### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-ds3231](https://github.com/mongoose-os-libs/arduino-ds3231) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API

### JS API
#### DS3231.create

```javascript
DS3231.create()
```
Create an instance of DS3231 with the methods described below.
#### myds.setVoltage

```javascript
myds.setVoltage()
```
Destroy `myds` instance; it's illegal to call any methods on that instance
afterwards.
Return value: none.
#### myds.setTimeSeconds

```javascript
myds.setTimeSeconds(seconds)
```
Set seconds, 0 to 59.
Return value: none.
#### myds.setTimeMinutes

```javascript
myds.setTimeMinutes(minutes)
```
Set minutes, 0 to 59.
Return value: none.
#### myds.setTimeHours

```javascript
myds.setTimeHours(hours)
```
Set hours, 0 to 23.
Return value: none.
#### myds.setTimeDayOfTheWeek

```javascript
myds.setTimeDayOfTheWeek(dayOfTheWeekDay)
```
Set day of the week, 1 to 7.
Return value: none.
#### myds.setTimeDate

```javascript
myds.setTimeDate(date)
```
Set day of month, 1 to 31.
Return value: none.
#### myds.setTimeMonth

```javascript
myds.setTimeMonth(month)
```
Set month, 1 to 12
Return value: none.
#### myds.setTimeYear

```javascript
myds.setTimeYear(twoDigitYear)
```
Set two last digits of the year, 0 to 99.
Return value: none.
#### myds.getTimeSeconds

```javascript
myds.getTimeSeconds()
```
Get seconds, 0 to 59.
#### myds.getTimeMinutes

```javascript
myds.getTimeMinutes()
```
Get minutes, 0 to 59.
#### myds.getTimeHours

```javascript
myds.getTimeHours()
```
Get hours, 0 to 23.
#### myds.getTimeHoursIs12HourClock

```javascript
myds.getTimeHoursIs12HourClock()
```
Return 1 if 12-hour format is used, 0 otherwise.
#### myds.getTimeHoursIsPM

```javascript
myds.getTimeHoursIsPM()
```
Return 1 if it's later than the noon.
#### myds.getTimeDayOfTheWeek

```javascript
myds.getTimeDayOfTheWeek()
```
Get day of week, 1 to 7.
#### myds.getTimeDate

```javascript
myds.getTimeDate()
```
Get day of month, 1 to 31.
#### myds.getTimeMonth

```javascript
myds.getTimeMonth()
```
Get month, 1 to 12.
#### myds.getTimeYear

```javascript
myds.getTimeYear()
```
Get last two digits of the year, 0 to 99.
#### myds.getTimeYearCentury

```javascript
myds.getTimeYearCentury()
```
Return 1 if year is between 2100 and 2199; 0 otherwise.
