# HTU21D(F) I2C
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/htu21df-i2c](https://github.com/mongoose-os-libs/htu21df-i2c) | [mgos_htu21df.h](https://github.com/mongoose-os-libs/htu21df-i2c/tree/master/include/mgos_htu21df.h) | &nbsp;  | &nbsp;         |



A Mongoose library for Measurement Specialities HTU21D(F) integrated circuit.

## Sensor details

The HTU21D(F) is a new digital humidity sensor with temperature output by MEAS.
Setting new standards in terms of size and intelligence, it is embedded in a
reflow solderable Dual Flat No leads (DFN) package with a small 3 x 3 x 0.9 mm
footprint. This sensor provides calibrated, linearized signals in digital, I2C
format.

HTU21D(F) digital humidity sensors are dedicated humidity and temperature plug
and play transducers for OEM applications where reliable and accurate
measurements are needed. Direct interface with a micro-controller is made
possible with the module for humidity and temperature digital outputs. These
low power sensors are designed for high volume and cost sensitive applications
with tight space constraints.

Every sensor is individually calibrated and tested. Lot identification is
printed on the sensor and an electronic identification code is stored on the
chip – which can be read out by command. Low battery can be detected and a
checksum improves communication reliability. The resolution of these digital
humidity sensors can be changed by command (8/12bit up to 12/14bit for RH/T).

With MEAS’ improvements and miniaturization of this sensor, the
performance-to-price ratio has been improved – and eventually, any device
should benefit from its cutting edge energy saving operation mode. Optional
PTFE filter/membrane (F) protects HTU21D digital humidity sensors against
dust and water immersion, as well as against contamination by particles.
PTFE filter/membranes preserve a high response time. The white PTFE
filter/membrane is directly stuck on the sensor housing.

See [datasheet](https://cdn-shop.adafruit.com/datasheets/1899_HTU21D.pdf)
for implementation details.

A great place to buy a ready made and tested unit is at [Adafruit](https://learn.adafruit.com/adafruit-htu21d-f-temperature-humidity-sensor/overview).

## Example application

An example program using a timer to read data from the sensor every 5 seconds:

```
#include "mgos.h"
#include "mgos_i2c.h"
#include "mgos_htu21df.h"

static struct mgos_htu21df *s_htu21df;

static void timer_cb(void *user_data) {
  float temperature, humidity;

  temperature=mgos_htu21df_getTemperature(s_htu21df);
  humidity=mgos_htu21df_getHumidity(s_htu21df);

  LOG(LL_INFO, ("htu21df temperature=%.2f humidity=%.2f", temperature, humidity));

  (void) user_data;
}

enum mgos_app_init_result mgos_app_init(void) {
  struct mgos_i2c *i2c;

  i2c=mgos_i2c_get_global();
  if (!i2c) {
    LOG(LL_ERROR, ("I2C bus missing, set i2c.enable=true in mos.yml"));
  } else {
    s_htu21df=mgos_htu21df_create(i2c, 0x40); // Default I2C address
    if (s_htu21df) {
      mgos_set_timer(5000, true, timer_cb, NULL);
    } else {
      LOG(LL_ERROR, ("Could not initialize sensor"));
    }
  }
  return MGOS_APP_INIT_SUCCESS;
}
```

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
#### mgos_htu21df_create

```c
struct mgos_htu21df *mgos_htu21df_create(struct mgos_i2c *i2c, uint8_t i2caddr);
```
<div class="apidescr">

Initialize a HTU21DF on the I2C bus `i2c` at address specified in `i2caddr`
parameter (default HTU21DF is on address 0x40). The sensor will be polled for
validity, upon success a new `struct mgos_htu21df` is allocated and
returned. If the device could not be found, NULL is returned.
 
</div>
#### mgos_htu21df_destroy

```c
void mgos_htu21df_destroy(struct mgos_htu21df **sensor);
```
<div class="apidescr">

Destroy the data structure associated with a HTU21DF device. The reference
to the pointer of the `struct mgos_htu21df` has to be provided, and upon
successful destruction, its associated memory will be freed and the pointer
set to NULL.
 
</div>
#### mgos_htu21df_read

```c
bool mgos_htu21df_read(struct mgos_htu21df *sensor);
```
<div class="apidescr">

The sensor will be polled for its temperature and humidity data. If the poll
has occured in the last `MGOS_HTU21DF_READ_DELAY` seconds, the cached data is
used (so as not to repeatedly poll the bus upon subsequent calls).
 
</div>
#### mgos_htu21df_getTemperature

```c
float mgos_htu21df_getTemperature(struct mgos_htu21df *sensor);
```
<div class="apidescr">

The sensor will be polled for its temperature and humidity data. If the poll
has occured in the last `MGOS_HTU21DF_READ_DELAY` seconds, the cached data is
used (so as not to repeatedly poll the bus upon subsequent calls).

The return value is the temperature of the sensor in Celsius, or NAN if no
data was found.
 
</div>
#### mgos_htu21df_getHumidity

```c
float mgos_htu21df_getHumidity(struct mgos_htu21df *sensor);
```
<div class="apidescr">

The sensor will be polled for its temperature and humidity data. If the poll
has occured in the last `MGOS_HTU21DF_READ_DELAY` seconds, the cached data is
used (so as not to repeatedly poll the bus upon subsequent calls).

The return value is the humidity of the sensor in percent relative humidity,
or NAN if no data was found.
 
</div>
#### mgos_htu21df_getStats

```c
bool mgos_htu21df_getStats(struct mgos_htu21df *sensor, struct mgos_htu21df_stats *stats);
```
<div class="apidescr">

Returns the running statistics on the sensor interaction, the user provides
a pointer to a `struct mgos_htu21df_stats` object, which is filled in by
this call.

Upon success, true is returned. Otherwise, false is returned, in which case
the contents of `stats` is undetermined.
 
</div>
#### mgos_htu21df_i2c_init

```c
bool mgos_htu21df_i2c_init(void);
```
<div class="apidescr">

Initialization function for MGOS -- currently a noop.
 
</div>
