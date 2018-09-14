# BME280
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-adafruit-bme280](https://github.com/mongoose-os-libs/arduino-adafruit-bme280) | [Adafruit_BME280.h](https://github.com/mongoose-os-libs/arduino-adafruit-bme280/tree/master/include/Adafruit_BME280.h) | &nbsp;  | [api_arduino_bme280.js](https://github.com/mongoose-os-libs/arduino-adafruit-bme280/tree/master/mjs_fs/api_arduino_bme280.js)         |




 ----- 
#### readS16_LE

```c
int16_t   readS16_LE(byte reg); // little endian
```
little endian

### JS API

 --- 
#### Adafruit_BME280.createI2C

```javascript
Adafruit_BME280.createI2C(i2caddr)
```
Create a BME280 instance on I2C bus with the given address `i2caddr`.
Return value: an object with the methods described below.
#### Adafruit_BME280.createSPI

```javascript
Adafruit_BME280.createSPI(cspin)
```
Create a BME280 instance on SPI bus with the given Chip Select pin `cspin`.
Return value: an object with the methods described below.
#### Adafruit_BME280.createSPIFull

```javascript
Adafruit_BME280.createSPIFull(cspin, mosipin, misopin, sckpin)
```
Create a BME280 instance on SPI bus with the given pins `cspin`,
`mosipin`, `misopin`, `sckpin`.
Return value: an object with the methods described below.
#### myBME.close

```javascript
myBME.close()
```
Close Adafruit_BME280 instance; no methods can be called on this instance
after that.
Return value: none.
#### myBME.takeForcedMeasurement

```javascript
myBME.takeForcedMeasurement()
```
Take a new measurement (only possible in forced mode).
#### myBME.readTemperature

```javascript
myBME.readTemperature()
```
Return the temperature from the sensor in degrees C or
`Adafruit_BME280.RES_FAIL` in case of a failure.
#### myBME.readPressure

```javascript
myBME.readPressure()
```
Returns the pressure from the sensor in hPa
or `Adafruit_BME280.RES_FAIL` in case of a failure.
#### myBME.readHumidity

```javascript
myBME.readHumidity()
```
Returns the humidity from the sensor in %RH
or `Adafruit_BME280.RES_FAIL` in case of a failure.
#### myBME.readAltitude

```javascript
myBME.readAltitude(seaLevel)
```
Returns the altitude in meters calculated from the specified
sea-level pressure `seaLevel` (in hPa)
or `Adafruit_BME280.RES_FAIL` in case of a failure.
http://www.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf, P.16
#### myBME.seaLevelForAltitude

```javascript
myBME.seaLevelForAltitude(alt, pres)
```
Returns the pressure at sea level in hPa
calculated from the specified altitude `alt` (in meters),
and atmospheric pressure `pres` (in hPa)
or `Adafruit_BME280.RES_FAIL` in case of a failure.
http://www.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf, P.17
