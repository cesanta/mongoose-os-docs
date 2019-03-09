# CCS811 I2C
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/ccs811-i2c](https://github.com/mongoose-os-libs/ccs811-i2c) | [mgos_ccs811.h](https://github.com/mongoose-os-libs/ccs811-i2c/tree/master/include/mgos_ccs811.h) | &nbsp;  | &nbsp;         |



A Mongoose library for AMS CCS811 integrated circuit.

## Sensor details

The CCS811 is an ultra-low power digital gas sensor solution which integrates
a metal oxide (MOX) gas sensor to detect a wide range of Volatile Organic
Compounds (VOCs) for indoor air quality monitoring with a microcontroller unit
(MCU), which includes an Analog-to-Digital converter (ADC), and an I2C
interface.

CCS811 is based on ams unique micro-hotplate technology which enables a highly
reliable solution for gas sensors, very fast cycle times and a significant
reduction in average power consumption.

The integrated MCU manages the sensor driver modes and measurements. The I2C
digital interface significantly simplifies the hardware and software design,
enabling a faster time to market.

CCS811 supports intelligent algorithms to process raw sensor measurements to
output a TVOC value or equivalent CO2 (eCO2) levels, where the main cause of
VOCs is from humans.

CCS811 supports multiple measurement modes that have been optimized for
low-power consumption during an active sensor measurement and idle mode
extending battery life in portable applications. 

See [datasheet](https://ams.com/eng/content/download/951091/2269479/file/CCS811_DS000459_4-00.pdf)
for implementation details.

A great place to buy a ready made and tested unit is at [Adafruit](https://learn.adafruit.com/adafruit-ccs811-air-quality-sensor/overview).

## Example application

An example program using a timer to read data from the sensor every 5 seconds:

```
#include "mgos.h"
#include "mgos_i2c.h"
#include "mgos_ccs811.h"

static struct mgos_ccs811 *s_ccs811;

static void timer_cb(void *user_data) {
  float eco2, tvoc;

  eco2=mgos_ccs811_get_eco2(s_ccs811);
  tvoc=mgos_ccs811_get_tvoc(s_ccs811);

  LOG(LL_INFO, ("ccs811 eCO2=%.0fppm TVOC=%.0fppb", eco2, tvoc));

  (void) user_data;
}

enum mgos_app_init_result mgos_app_init(void) {
  struct mgos_i2c *i2c;

  i2c=mgos_i2c_get_global();
  if (!i2c) {
    LOG(LL_ERROR, ("I2C bus missing, set i2c.enable=true in mos.yml"));
  } else {
    s_ccs811=mgos_ccs811_create(i2c, 0x5a); // Default I2C address
    if (s_ccs811) {
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
> value of mg_time() upon last call to _read()
#### mgos_ccs811_create

```c
struct mgos_ccs811 *mgos_ccs811_create(struct mgos_i2c *i2c, uint8_t i2caddr);
```
> 
> Initialize a CCS811 on the I2C bus `i2c` at address specified in `i2caddr`
> parameter (default CCS811 is on address 0x5A). The sensor will be polled for
> validity, upon success a new `struct mgos_ccs811` is allocated and
> returned. If the device could not be found, NULL is returned.
>  
#### mgos_ccs811_destroy

```c
void mgos_ccs811_destroy(struct mgos_ccs811 **sensor);
```
> 
> Destroy the data structure associated with a CCS811 device. The reference
> to the pointer of the `struct mgos_ccs811` has to be provided, and upon
> successful destruction, its associated memory will be freed and the pointer
> set to NULL.
>  
#### mgos_ccs811_read

```c
bool mgos_ccs811_read(struct mgos_ccs811 *sensor);
```
> 
> The sensor will be polled for its temperature and humidity data. If the poll
> has occured in the last `MGOS_CCS811_READ_DELAY` seconds, the cached data is
> used (so as not to repeatedly poll the bus upon subsequent calls).
>  
#### mgos_ccs811_setDriveMode

```c
bool mgos_ccs811_setDriveMode(struct mgos_ccs811 *sensor, enum mgos_ccs811_drive_mode_t mode);
```
> 
> Set the drive mode of the CCS811 sensor based on the `mode` argument
> Returns true on success, false otherwise.
>  
#### mgos_ccs811_getDriveMode

```c
bool mgos_ccs811_getDriveMode(struct mgos_ccs811 *sensor, uint8_t *mode);
```
> 
> Retrieve the current drive mode (which will be one of `enum mgos_ccs811_drive_mode_t`
> values into the byte pointed to by `mode`.
> Returns true on success, false otherwise.
>  
#### mgos_ccs811_get_eco2

```c
float mgos_ccs811_get_eco2(struct mgos_ccs811 *sensor);
```
> 
> The sensor will be polled for its effective CO2 data. If the poll
> has occured in the last `MGOS_CCS811_READ_DELAY` seconds, the cached data is
> used (so as not to repeatedly poll the bus upon subsequent calls).
> 
> Returns a value in eCO2 parts per million on success, NAN otherwise.
>  
#### mgos_ccs811_get_tvoc

```c
float mgos_ccs811_get_tvoc(struct mgos_ccs811 *sensor);
```
> 
> The sensor will be polled for its Volatile Organic Compounds (TVOC) data.
> If the poll has occured in the last `MGOS_CCS811_READ_DELAY` seconds, the
> cached data is used (so as not to repeatedly poll the bus upon subsequent
> calls).
> 
> Returns a value in TVOC parts per billion on success, NAN otherwise.
>  
#### mgos_ccs811_getStats

```c
bool mgos_ccs811_getStats(struct mgos_ccs811 *sensor, struct mgos_ccs811_stats *stats);
```
> 
> Returns the running statistics on the sensor interaction, the user provides
> a pointer to a `struct mgos_ccs811_stats` object, which is filled in by this
> call.
> 
> Upon success, true is returned. Otherwise, false is returned, in which case
> the contents of `stats` is undetermined.
>  
#### mgos_ccs811_i2c_init

```c
bool mgos_ccs811_i2c_init(void);
```
> 
> Initialization function for MGOS -- currently a noop.
>  
