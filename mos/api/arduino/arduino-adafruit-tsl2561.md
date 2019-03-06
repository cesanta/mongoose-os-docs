# Adafruit TSL2561
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-adafruit-tsl2561](https://github.com/mongoose-os-libs/arduino-adafruit-tsl2561) | [mgos_arduino_adafruit_tsl2561.h](https://github.com/mongoose-os-libs/arduino-adafruit-tsl2561/tree/master/include/mgos_arduino_adafruit_tsl2561.h) | &nbsp;  | [api_arduino_tsl2561.js](https://github.com/mongoose-os-libs/arduino-adafruit-tsl2561/tree/master/mjs_fs/api_arduino_tsl2561.js)         |


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
#### mgos_tsl2561_create

```c
TSL2561 *mgos_tsl2561_create(uint8_t addr);
```
> 
> Initialize Adafruit TSDL2561 library for sensor at address `addr`.  Address can be one of
> `TSL2561_ADDR_LOW`, `TSL2561_ADDR_FLOAT`, or `TSL2561_ADDR_HIGH`.  See above and your datasheet
> and/or your wiring guide to determine which address value to use for your application.
> 
> Return value: opaque pointer handle to C++ TSL2561 class.
>  
#### mgos_tsl2561_begin

```c
int mgos_tsl2561_begin(TSL2561 *tsl);
```
> 
> Checks that the sensor exists at the address it was created on and applies default settings for
> gain and integration timing.
> 
> Returns 1 (true) if the above actions were successful, 0 (false) otherwise.
>  
#### mgos_tsl2561_enable

```c
void mgos_tsl2561_enable(TSL2561 *tsl);
```
> 
> Send a command to sensor to enable it
>  
#### mgos_tsl2561_disable

```c
void mgos_tsl2561_disable(TSL2561 *tsl);
```
> 
> Send a command to the sensor to disable it
>  
#### mgos_tsl2561_getLuminosity

```c
int mgos_tsl2561_getLuminosity(TSL2561 *tsl, int channel);
```
> 
> Get the luminosity of the desired channel.
> 
> Supported channel values:
> - 0 or `TSL2561_FULLSPECTRUM` - visible + infrared
> - 1 or `TSL2561_INFRARED` - infrared
> - 2 or `TSL2561_VISIBLE` - visible
> 
> Returns -1 for any error.
> 
>  
#### mgos_tsl2561_getFullLuminosity

```c
int mgos_tsl2561_getFullLuminosity(TSL2561 *tsl);
```
> 
> Return the value of both channels in a 32-bit unsigned integer.  The upper (lower)
> 16 bits contain value of channel 1 (channel 0).
>  
#### mgos_tsl2561_setIntegrationTime

```c
void mgos_tsl2561_setIntegrationTime(TSL2561 *tsl, int timing);
```
> 
> Sets the sensor integration time.  Allowed values are:
> - 0x00 or `TSL2561_INTEGRATIONTIME_13MS` - 13.7 ms - use w. no gain and bright light conditions
> - 0x01 or `TSL2561_INTEGRATIONTIME_101MS` - 101 ms - use w. either gain setting and med. light conditions
> - 0x02 or `TSL2561_INTEGRATIONTIME_402MS` - 402 ms - use w. 16x gain and low light conditions
>  
#### mgos_tsl2561_setGain

```c
void mgos_tsl2561_setGain(TSL2561 *tsl, int gain);
```
> 
> Sets the sensor gain.  Allowed values are:
> - 0x00 or `TSL2561_GAIN_0X` - no gain, use for bright lighting conditions
> - 0x10 or `TSL2561_GAIN_16X` - 16x gain, low light conditions
>  
#### mgos_tsl2561_calculateLux

```c
uint32_t mgos_tsl2561_calculateLux(TSL2561 *tsl, uint16_t ch0, uint16_t ch1);
```
> 
> Convert sensor reading into lux value.
>  
#### mgos_tsl2561_close

```c
void mgos_tsl2561_close(TSL2561 *tsl);
```
> 
> Delete TSL2561 handle and its resources.
>  

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
