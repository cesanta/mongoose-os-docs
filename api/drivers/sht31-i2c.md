# SHT31 I2C
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/sht31-i2c](https://github.com/mongoose-os-libs/sht31-i2c) | [mgos_sht31.h](https://github.com/mongoose-os-libs/sht31-i2c/tree/master/include/mgos_sht31.h) | &nbsp;  | &nbsp;         |



A Mongoose library for Sensirion's SHT31 integrated circuit.

## Sensor details

SHT3x-DIS is the next generation of Sensirion’s temperature and humidity
sensors. It builds on a new CMOSens sensor chip that is at the heart of
Sensirion’s new humidity and temperature platform. The SHT3x-DIS has increased
intelligence, reliability and improved accuracy specifications compared to its
predecessor. Its functionality includes enhanced signal processing, two
distinctive and user selectable I2C addresses and communication speeds of up
to 1 MHz. The DFN package has a footprint of 2.5 x 2.5 mm while keeping a
height of 0.9 mm. This allows for integration of the SHT3x-DIS into a great
variety of applications.

Additionally, the wide supply voltage range of 2.4 to 5.5 V guarantees
compatibility with diverse assembly situations. All in all, the SHT3x-DIS
incorporates 15 years of knowledge of Sensirion, the leader in the humidity
sensor industry.

See [datasheet](https://cdn-shop.adafruit.com/product-files/2857/Sensirion_Humidity_SHT3x_Datasheet_digital-767294.pdf)
for implementation details.

A great place to buy a ready made and tested unit is at [Adafruit](https://learn.adafruit.com/adafruit-sht31-d-temperature-and-humidity-sensor-breakout).

## Example application

An example program using a timer to read data from the sensor every 5 seconds:

```
#include "mgos.h"
#include "mgos_i2c.h"
#include "mgos_sht31.h"

static struct mgos_sht31 *s_sht31;

static void timer_cb(void *user_data) {
  float temperature, humidity;

  temperature=mgos_sht31_getTemperature(s_sht31);
  humidity=mgos_sht31_getHumidity(s_sht31);

  LOG(LL_INFO, ("sht31 temperature=%.2f humidity=%.2f", temperature, humidity));

  (void) user_data;
}

enum mgos_app_init_result mgos_app_init(void) {
  struct mgos_i2c *i2c;

  i2c=mgos_i2c_get_global();
  if (!i2c) {
    LOG(LL_ERROR, ("I2C bus missing, set i2c.enable=true in mos.yml"));
  } else {
    s_sht31=mgos_sht31_create(i2c, 0x40); // Default I2C address
    if (s_sht31) {
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
#### mgos_sht31_create

```c
struct mgos_sht31 *mgos_sht31_create(struct mgos_i2c *i2c, uint8_t i2caddr);
```
> 
> Initialize a SHT31 on the I2C bus `i2c` at address specified in `i2caddr`
> parameter (default SHT31 is on address 0x44). The sensor will be polled for
> validity, upon success a new `struct mgos_sht31` is allocated and
> returned. If the device could not be found, NULL is returned.
>  
#### mgos_sht31_destroy

```c
void mgos_sht31_destroy(struct mgos_sht31 **sensor);
```
> 
> Destroy the data structure associated with a SHT31 device. The reference
> to the pointer of the `struct mgos_sht31` has to be provided, and upon
> successful destruction, its associated memory will be freed and the pointer
> set to NULL.
>  
#### mgos_sht31_read

```c
bool mgos_sht31_read(struct mgos_sht31 *sensor);
```
> 
> The sensor will be polled for its temperature and humidity data. If the poll
> has occured in the last `MGOS_SHT31_READ_DELAY` seconds, the cached data is
> used (so as not to repeatedly poll the bus upon subsequent calls).
>  
#### mgos_sht31_getTemperature

```c
float mgos_sht31_getTemperature(struct mgos_sht31 *sensor);
```
> 
> The sensor will be polled for its temperature and humidity data. If the poll
> has occured in the last `MGOS_SHT31_READ_DELAY` seconds, the cached data is
> used (so as not to repeatedly poll the bus upon subsequent calls).
> 
> The return value is the temperature of the sensor in Celsius, or NAN if no
> data was found.
>  
#### mgos_sht31_getHumidity

```c
float mgos_sht31_getHumidity(struct mgos_sht31 *sensor);
```
> 
> The sensor will be polled for its temperature and humidity data. If the poll
> has occured in the last `MGOS_SHT31_READ_DELAY` seconds, the cached data is
> used (so as not to repeatedly poll the bus upon subsequent calls).
> 
> The return value is the humidity of the sensor in percent relative humidity,
> or NAN if no data was found.
>  
#### mgos_sht31_getStats

```c
bool mgos_sht31_getStats(struct mgos_sht31 *sensor, struct mgos_sht31_stats *stats);
```
> 
> Returns the running statistics on the sensor interaction, the user provides
> a pointer to a `struct mgos_sht31_stats` object, which is filled in by this
> call.
> 
> Upon success, true is returned. Otherwise, false is returned, in which case
> the contents of `stats` is undetermined.
>  
#### mgos_sht31_i2c_init

```c
bool mgos_sht31_i2c_init(void);
```
> 
> Initialization function for MGOS -- currently a noop.
>  
