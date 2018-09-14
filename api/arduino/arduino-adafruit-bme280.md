# BME280
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-adafruit-bme280](https://github.com/mongoose-os-libs/arduino-adafruit-bme280) | [Adafruit_BME280.h](https://github.com/mongoose-os-libs/arduino-adafruit-bme280/tree/master/include/Adafruit_BME280.h) | &nbsp;  | [api_arduino_bme280.js](https://github.com/mongoose-os-libs/arduino-adafruit-bme280/tree/master/mjs_fs/api_arduino_bme280.js)         |




 ----- 
#### readS16_LE

```c
int16_t   readS16_LE(byte reg); // little endian
```
<div class="apidescr">
little endian
</div>

### JS API

 --- 
#### Adafruit_BME280.createI2C

```javascript
Adafruit_BME280.createI2C(i2caddr)
```
<div class="apidescr">
Create a BME280 instance on I2C bus with the given address `i2caddr`.
Return value: an object with the methods described below.
</div>
#### Adafruit_BME280.createSPI

```javascript
Adafruit_BME280.createSPI(cspin)
```
<div class="apidescr">
Create a BME280 instance on SPI bus with the given Chip Select pin `cspin`.
Return value: an object with the methods described below.
</div>
#### Adafruit_BME280.createSPIFull

```javascript
Adafruit_BME280.createSPIFull(cspin, mosipin, misopin, sckpin)
```
<div class="apidescr">
Create a BME280 instance on SPI bus with the given pins `cspin`,
`mosipin`, `misopin`, `sckpin`.
Return value: an object with the methods described below.
</div>
#### myBME.close

```javascript
myBME.close()
```
<div class="apidescr">
Close Adafruit_BME280 instance; no methods can be called on this instance
after that.
Return value: none.
</div>
#### myBME.takeForcedMeasurement

```javascript
myBME.takeForcedMeasurement()
```
<div class="apidescr">
Take a new measurement (only possible in forced mode).
</div>
#### myBME.readTemperature

```javascript
myBME.readTemperature()
```
<div class="apidescr">
Return the temperature from the sensor in degrees C or
`Adafruit_BME280.RES_FAIL` in case of a failure.
</div>
#### myBME.readPressure

```javascript
myBME.readPressure()
```
<div class="apidescr">
Returns the pressure from the sensor in hPa
or `Adafruit_BME280.RES_FAIL` in case of a failure.
</div>
#### myBME.readHumidity

```javascript
myBME.readHumidity()
```
<div class="apidescr">
Returns the humidity from the sensor in %RH
or `Adafruit_BME280.RES_FAIL` in case of a failure.
</div>
#### myBME.readAltitude

```javascript
myBME.readAltitude(seaLevel)
```
<div class="apidescr">
Returns the altitude in meters calculated from the specified
sea-level pressure `seaLevel` (in hPa)
or `Adafruit_BME280.RES_FAIL` in case of a failure.
http://www.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf, P.16
</div>
#### myBME.seaLevelForAltitude

```javascript
myBME.seaLevelForAltitude(alt, pres)
```
<div class="apidescr">
Returns the pressure at sea level in hPa
calculated from the specified altitude `alt` (in meters),
and atmospheric pressure `pres` (in hPa)
or `Adafruit_BME280.RES_FAIL` in case of a failure.
http://www.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf, P.17
</div>
