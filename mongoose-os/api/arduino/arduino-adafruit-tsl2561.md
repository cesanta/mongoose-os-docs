# Adafruit TSL2561
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-adafruit-tsl2561](https://github.com/mongoose-os-libs/arduino-adafruit-tsl2561) | [TSL2561.h](https://github.com/mongoose-os-libs/arduino-adafruit-tsl2561/blob/master/include/TSL2561.h) | &nbsp;  | [api_arduino_tsl2561.js](https://github.com/mongoose-os-libs/arduino-adafruit-tsl2561/blob/master/mjs_fs/api_arduino_tsl2561.js)         |


# Arduino Adafruit TSL2561 library for Mongoose OS

This is a port of the [Adafruit Arduino driver for the TSL2561 sensor](https://github.com/adafruit/TSL2561-Arduino-Library) ported to run on the [Mongoose OS ecosystem](https://mongoose-os.com/docs/reference/api.html).

Usage is extremely simple....

in _**mos.yml**_, add to **libs:** section,

`  - origin: https://github.com/mongoose-os-libs/arduino-adafruit-tsl2561 `
  
in your _**init.js**_, add something like the following,

```javascript
load('api_arduino_tsl2561.js');
```

and

```javascript
//Initialize Adafruit_TSL2561 library
let tsl = Adafruit_TSL2561.create();
print('Adafruit_TSL2561.TSL2561_GAIN_16X -> ',Adafruit_TSL2561.TSL2561_GAIN_16X);
tsl.setGain(Adafruit_TSL2561.TSL2561_GAIN_16X);
tsl.setIntegrationTime(Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_402MS);
tsl.begin();

let tslGetData = function() {
    let vis = tsl.getVisible();
    let ir = tsl.getInfrared();
    let lux = tsl.calculateLux(vis, ir);
    print('TSL2561:  Vis: ', vis ,', IR: ', ir, ', Lux: ',lux);
};

let tslTimer = Timer.set(10000 /* milliseconds */, true /* repeat */, tslGetData, null);
```

to use the library.

Enjoy!


 ----- 
! 
    @file     tsl2561.h
    @author   K. Townsend (microBuilder.eu)

    @section LICENSE

    Software License Agreement (BSD License)

    Copyright (c) 2010, microBuilder SARL
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
    3. Neither the name of the copyright holders nor the
    names of its contributors may be used to endorse or promote products
    derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


 ----- 

### JS API

 --- 
#### getLuminosity

```javascript
getLuminosity( p )
```
### ** Adafruit_TSL2561.TSL2561_VISIBLE **
get visible luminosity:  channel 0 - channel 1
#### myTSL.begin

```javascript
myTSL.begin()
```
Initialize sensor and make it ready for use.
Return value: 1 if sensor is ready, 0 otherwise.
#### myTSL.getLuminosity

```javascript
myTSL.getLuminosity( lumo )
```
Return the current luminosity for either channel or both.
Set `lumo` parameter to:
* `Adafruit_TSL2561.TSL2561_INFRARED` for channel 1 (infrared) contribution to luminosity
* `Adafruit_TSL2561.TSL2561_FULLSPECTRUM` for channel 1 and channel 0 combined as luminosity
* `Adafruit_TSL2561.TSL2561_VISIBLE` for channel 0 (visible) contribution to luminosity
Return value: current humidity value as a double.
#### myTSL.getVisible

```javascript
myTSL.getVisible( )
```
Convenience function equivalent to calling `myTSL.getLuminosity( Adafruit_TSL2561.TSL2561_VISIBLE )`.
#### myTSL.getInfrared

```javascript
myTSL.getInfrared( )
```
Convenience function equivalent to calling `myTSL.getLuminosity( Adafruit_TSL2561.TSL2561_INFRARED )`.
#### myTSL.getFullSpectrum

```javascript
myTSL.getFullSpectrum( )
```
Convenience function equivalent to calling `myTSL.getLuminosity( Adafruit_TSL2561.TSL2561_FULLSPECTRUM )`.
Return value:
#### myTSL.getFullLuminosity

```javascript
myTSL.getFullLuminosity( )
```
Return value:  32-bit `unsigned int` with the 16 high-bits containing channel 1 (infrared) and the 16 low-bits
containing channel 0 (visible).
#### myTSL.setIntegrationTime

```javascript
myTSL.setIntegrationTime( t )
```
Set the sampling (integration) time of the sensor using the value of parameter `t`.
Allowed values for `t` and their meanings are:
* `Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_13MS` 13.7ms - shortest integration time (bright light)
* `Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_101MS` 101ms  - medium integration time (medium light)
* `Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_402MS` 402ms  - longest integration time (dim light)
#### myTSL.setGain

```javascript
myTSL.setGain( g )
```
Set the gain of the sensor using the value of parameter `g`.
Allowed values for `g` and their meanings are:
* `Adafruit_TSL2561.TSL2561_GAIN_0X` No gain  - set no gain (for bright situations)
* `Adafruit_TSL2561.TSL2561_GAIN_16X` 16x gain - set 16x gain (for dim situations)
#### myTSL.calculateLux

```javascript
myTSL.calculateLux( ch0, ch1 )
```
Uses the formula supplied in the sensor datasheet to calculate Lux for the supplied values of
channel 0 (ch0) and channel 1 (ch1).
Return value:  the calculated Lux
#### Adafruit_TSL2561.create

```javascript
Adafruit_TSL2561.create( addr )
```
Create an Adafruit_TSL2561 instance on I2C bus.  Supported i2c addresses are:
* `Adafruit_TSL2561.TSL2561_ADDR_LOW` (0x29)
* `Adafruit_TSL2561.TSL2561_ADDR_FLOAT` (0x39 - default if addr not specified).
* `Adafruit_TSL2561.TSL2561_ADDR_HIGH` (0x49)
Return value: an object representing the TSL2561 sensor with the methods defined in _proto: {...} (above).
