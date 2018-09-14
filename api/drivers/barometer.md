# Barometers
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/barometer](https://github.com/mongoose-os-libs/barometer) | [mgos_barometer.h](https://github.com/mongoose-os-libs/barometer/tree/master/include/mgos_barometer.h) | &nbsp;  | &nbsp;         |



## Introduction
This library provides a simple API that describes barometer sensors. It
implements various popular I2C and SPI barometers behind that API. Callers of
the library can rely on the API returning consistently typed data regardless of
the choice of sensor.

## Primitives

(work in progress)

# Disclaimer

This project is not an official Google project. It is not supported by Google
and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.


 ----- 
#### _read

```c
uint32_t read;                 // calls to _read()
  uint32_t read_success;         // successful _read()
  uint32_t read_success_cached;  // calls to _read() which were cached
  // Note: read_errors := read - read_success - read_success_cached
  double   read_success_usecs;   // time spent in successful uncached _read()
};
```
<div class="apidescr">
value of mg_time() upon last call to _read()
</div>
#### mgos_barometer_set_cache_ttl

```c
bool mgos_barometer_set_cache_ttl(struct mgos_barometer *sensor, uint16_t msecs);
```
<div class="apidescr">
 Set cache TTL -- will limit reads and return cached data. Set msecs=0 to turn off 
</div>
#### mgos_barometer_read

```c
bool mgos_barometer_read(struct mgos_barometer *sensor);
```
<div class="apidescr">
 Read all available sensor data from the barometer 
</div>
#### mgos_barometer_get_pressure

```c
bool mgos_barometer_get_pressure(struct mgos_barometer *sensor, float *p);
```
<div class="apidescr">
 Return barometer data in units of Pascals 
</div>
#### mgos_barometer_get_temperature

```c
bool mgos_barometer_get_temperature(struct mgos_barometer *sensor, float *t);
```
<div class="apidescr">
 Return temperature data in units of Celsius 
</div>
#### mgos_barometer_get_humidity

```c
bool mgos_barometer_get_humidity(struct mgos_barometer *sensor, float *h);
```
<div class="apidescr">
 Return humidity data in units of % Relative Humidity 
</div>
#### mgos_barometer_get_name

```c
const char *mgos_barometer_get_name(struct mgos_barometer *sensor);
```
<div class="apidescr">
 String representation of the barometer type, guaranteed to be 10 characters or less. 
</div>
#### mgos_barometer_get_stats

```c
bool mgos_barometer_get_stats(struct mgos_barometer *sensor, struct mgos_barometer_stats *stats);
```
<div class="apidescr">

Return statistics on the sensor.
 
</div>
#### mgos_barometer_init

```c
bool mgos_barometer_init(void);
```
<div class="apidescr">

Initialization function for MGOS -- currently a noop.
 
</div>
