# DS3231 RTC
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-ds3231](https://github.com/mongoose-os-libs/arduino-ds3231) | [](https://github.com/mongoose-os-libs/arduino-ds3231/tree/master/include/) | &nbsp;  | [api_ds3231.js](https://github.com/mongoose-os-libs/arduino-ds3231/tree/master/mjs_fs/api_ds3231.js)         |

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


 ----- 

### JS API

 --- 
#### DS3231.create

```javascript
DS3231.create()
```
<div class="apidescr">
Create an instance of DS3231 with the methods described below.
</div>
#### myds.setVoltage

```javascript
myds.setVoltage()
```
<div class="apidescr">
Destroy `myds` instance; it's illegal to call any methods on that instance
afterwards.
Return value: none.
</div>
#### myds.setTimeSeconds

```javascript
myds.setTimeSeconds(seconds)
```
<div class="apidescr">
Set seconds, 0 to 59.
Return value: none.
</div>
#### myds.setTimeMinutes

```javascript
myds.setTimeMinutes(minutes)
```
<div class="apidescr">
Set minutes, 0 to 59.
Return value: none.
</div>
#### myds.setTimeHours

```javascript
myds.setTimeHours(hours)
```
<div class="apidescr">
Set hours, 0 to 23.
Return value: none.
</div>
#### myds.setTimeDayOfTheWeek

```javascript
myds.setTimeDayOfTheWeek(dayOfTheWeekDay)
```
<div class="apidescr">
Set day of the week, 1 to 7.
Return value: none.
</div>
#### myds.setTimeDate

```javascript
myds.setTimeDate(date)
```
<div class="apidescr">
Set day of month, 1 to 31.
Return value: none.
</div>
#### myds.setTimeMonth

```javascript
myds.setTimeMonth(month)
```
<div class="apidescr">
Set month, 1 to 12
Return value: none.
</div>
#### myds.setTimeYear

```javascript
myds.setTimeYear(twoDigitYear)
```
<div class="apidescr">
Set two last digits of the year, 0 to 99.
Return value: none.
</div>
#### myds.getTimeSeconds

```javascript
myds.getTimeSeconds()
```
<div class="apidescr">
Get seconds, 0 to 59.
</div>
#### myds.getTimeMinutes

```javascript
myds.getTimeMinutes()
```
<div class="apidescr">
Get minutes, 0 to 59.
</div>
#### myds.getTimeHours

```javascript
myds.getTimeHours()
```
<div class="apidescr">
Get hours, 0 to 23.
</div>
#### myds.getTimeHoursIs12HourClock

```javascript
myds.getTimeHoursIs12HourClock()
```
<div class="apidescr">
Return 1 if 12-hour format is used, 0 otherwise.
</div>
#### myds.getTimeHoursIsPM

```javascript
myds.getTimeHoursIsPM()
```
<div class="apidescr">
Return 1 if it's later than the noon.
</div>
#### myds.getTimeDayOfTheWeek

```javascript
myds.getTimeDayOfTheWeek()
```
<div class="apidescr">
Get day of week, 1 to 7.
</div>
#### myds.getTimeDate

```javascript
myds.getTimeDate()
```
<div class="apidescr">
Get day of month, 1 to 31.
</div>
#### myds.getTimeMonth

```javascript
myds.getTimeMonth()
```
<div class="apidescr">
Get month, 1 to 12.
</div>
#### myds.getTimeYear

```javascript
myds.getTimeYear()
```
<div class="apidescr">
Get last two digits of the year, 0 to 99.
</div>
#### myds.getTimeYearCentury

```javascript
myds.getTimeYearCentury()
```
<div class="apidescr">
Return 1 if year is between 2100 and 2199; 0 otherwise.
</div>
