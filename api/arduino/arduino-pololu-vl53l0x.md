# VL53L0X library for Mongoose OS

Version: 1.0<br>
Release date: 2017 Nov 17<br>

## Summary

This is a library for the Mongoose OS that helps interface with ST's
[VL53L0X time-of-flight distance sensor](https://www.pololu.com/product/2490).
The library makes it simple to configure the sensor and read range data from it via I&sup2;C.

This library is simple port of pololu's
[VL53L0X library for Arduino](https://github.com/pololu/vl53l0x-arduino).

## Supported platforms

This library is designed to work with Mongoose OS versions 1.19.6 or later;
I have not tested it with earlier versions.
This library should support any boards which support Mongoose OS and I&sup2;C.

## Getting started

### Hardware

I have tested with [ESPr Developer 32](https://www.switch-science.com/catalog/3210/)
and [VL53L0X Time-of-Flight Range sensor module](https://www.switch-science.com/catalog/2894/).

Make the following connections between mongoose os board and the VL53L0X module:

#### ESP32 boards

          ESP32   VL53L0X
    -----------   -------
            3V3 - VIN
            GND - GND
      SDA(IO21) - SDA
      SCL(IO22) - SCL

### Software
Add configuration below to your application's mos.yml
```
config_schema:
 - ["i2c.enable", true]
 - ["i2c.sda_gpio", 21]
 - ["i2c.scl_gpio", 22]

libs:
  - origin: https://github.com/mongoose-os-libs/arduino-pololu-vl53l0x
```


## Examples

Simple Javascript example is available under examples directory.

## ST's VL53L0X API and this library

Most of the functionality of this library is based on the
[VL53L0X API](http://www.st.com/content/st_com/en/products/embedded-software/proximity-sensors-software/stsw-img005.html)
provided by ST (STSW-IMG005), and some of the explanatory comments in the code are
quoted or paraphrased from the API source code, API user manual (UM2039),
and the VL53L0X datasheet. For more explanation about the library code and
how it was derived from the API, see the comments in VL53L0X.cpp.

This library is intended to provide a quicker and easier way to get started
using the VL53L0X with an Arduino-compatible controller, in contrast to customizing
and compiling ST's API for the Arduino. The library has a more streamlined interface,
as well as smaller storage and memory footprints. However, it does not implement
some of the more advanced functionality available in the API
(for example, calibrating the sensor to work well under a cover glass),
and it has less robust error checking. For advanced applications, especially
when storage and memory are less of an issue, consider using the VL53L0X API directly.

## Library reference

* `Pololu_VL53L0X.create()`<br>
  Constructor.

* `int getLastStatus()`<br>
  The status of the last I&sup2;C write transmission. See the
  [`Wire.endTransmission()` documentation](http://arduino.cc/en/Reference/WireEndTransmission)
  for return values.

* `void setAddress(int new_addr)`<br>
  Changes the I&sup2;C slave device address of the VL53L0X to the given value (7-bit).

* `int getAddress()`<br>
  Returns the current I&sup2;C address.

* `void begin()`<br>
* `void end()`<br>
  Begin or end underlying Arduino's I&sup2;C library. Call begin before call init.

* `bool init_2v8()`<br>
* `bool init_1v8()`<br>
  Iniitializes and configures the sensor. If the optional argument `io_2v8` is true (the default if not specified), the sensor is configured for 2V8 mode (2.8 V I/O); if false, the sensor is left in 1V8 mode. The return value is a boolean indicating whether the initialization completed successfully.

* `void writeReg(int reg, int value)`<br>
  Writes an 8-bit sensor register with the given value.

  Register address constants are defined by the regAddr enumeration type in VL53L0X.h.<br>
  Example use: `sensor.writeReg(VL53L0X::SYSRANGE_START, 0x01);`

* `void writeReg16Bit(int reg, int value)`<br>
  Writes a 16-bit sensor register with the given value.

* `void writeReg32Bit(int reg, int value)`<br>
  Writes a 32-bit sensor register with the given value.

* `int readReg(int reg)`<br>
  Reads an 8-bit sensor register and returns the value read.

* `int readReg16Bit(int reg)`<br>
  Reads a 16-bit sensor register and returns the value read.

* `int readReg32Bit(int reg)`<br>
  Reads a 32-bit sensor register and returns the value read.

* `void writeMulti(int reg, char const * src, int count)`<br>
  Writes an arbitrary number of bytes from the given array to the sensor, starting at the given register.

* `void readMulti(int reg, int * dst, int count)`<br>
  Reads an arbitrary number of bytes from the sensor, starting at the given register, into the given array.

* `bool setSignalRateLimit(float limit_Mcps)`<br>
  Sets the return signal rate limit to the given value in units of MCPS (mega counts per second). This is the minimum amplitude of the signal reflected from the target and received by the sensor necessary for it to report a valid reading. Setting a lower limit increases the potential range of the sensor but also increases the likelihood of getting an inaccurate reading because of reflections from objects other than the intended target. This limit is initialized to 0.25 MCPS by default. The return value is a boolean indicating whether the requested limit was valid.

* `float getSignalRateLimit()`<br>
  Returns the current return signal rate limit in MCPS.

* `bool setMeasurementTimingBudget(int budget_us)`<br>
  Sets the measurement timing budget to the given value in microseconds. This is the time allowed for one range measurement; a longer timing budget allows for more accurate measurements. The default budget is about 33000 microseconds, or 33 ms; the minimum is 20 ms. The return value is a boolean indicating whether the requested budget was valid.

* `int getMeasurementTimingBudget()`<br>
  Returns the current measurement timing budget in microseconds.

* `bool setVcselPulsePeriod(vcselPeriodType type, int period_pclks)`
  Sets the VCSEL (vertical cavity surface emitting laser) pulse period for the given period type (`VL53L0X::VcselPeriodPreRange` or `VL53L0X::VcselPeriodFinalRange`) to the given value (in PCLKs). Longer periods increase the potential range of the sensor. Valid values are (even numbers only):

  Pre: 12 to 18 (initialized to 14 by default)<br>
  Final: 8 to 14 (initialized to 10 by default)

  The return value is a boolean indicating whether the requested period was valid.

* `int getVcselPulsePeriod(vcselPeriodType type)`<br>
  Returns the current VCSEL pulse period for the given period type.

* `void startContinuous(int period_ms = 0)`<br>
  Starts continuous ranging measurements. If the optional argument `period_ms` is 0 (the default if not specified), continuous back-to-back mode is used (the sensor takes measurements as often as possible); if it is nonzero, continuous timed mode is used, with the specified inter-measurement period in milliseconds determining how often the sensor takes a measurement.

* `void stopContinuous()`<br>
  Stops continuous mode.

* `int readRangeContinuousMillimeters()`<br>
  Returns a range reading in millimeters when continuous mode is active.

* `int readRangeSingleMillimeters()`<br>
  Performs a single-shot ranging measurement and returns the reading in millimeters.

* `void setTimeout(int timeout)`<br>
  Sets a timeout period in milliseconds after which read operations will abort if the sensor is not ready. A value of 0 disables the timeout.

* `int getTimeout()`<br>
  Returns the current timeout period setting.

* `bool timeoutOccurred()`<br>
  Indicates whether a read timeout has occurred since the last call to `timeoutOccurred()`.

## Version history

* 1.0 (2017 Nov 17): Original release.
* 1.1 (2017 Nov 29): Avoid "unused-parameter" error.

### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-pololu-vl53l0x](https://github.com/mongoose-os-libs/arduino-pololu-vl53l0x) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API

### JS API
