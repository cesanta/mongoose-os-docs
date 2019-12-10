# ADS1X1X I2C
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/ads1x1x-i2c](https://github.com/mongoose-os-libs/ads1x1x-i2c) | [mgos_ads1x1x.h](https://github.com/mongoose-os-libs/ads1x1x-i2c/tree/master/include/mgos_ads1x1x.h) | &nbsp;  | &nbsp;         |



A Mongoose library for various `I2C` speaking ADCs from Texas Instruments:

*   ADS1115 - 16bit, 860 Samples/sec, 2 differential / 4 single-ended, programmable gain
*   ADS1114 - 16bit, 860 Samples/sec, 1 differential / 1 single-ended, programmable gain
*   ADS1113 - 16bit, 860 Samples/sec, 1 differential / 1 single-ended, no gain
*   ADS1015 - 12bit, 3300 Samples/sec, 2 differential / 4 single-ended, programmable gain
*   ADS1014 - 12bit, 3300 Samples/sec, 1 differential / 1 single-ended, programmable gain
*   ADS1013 - 12bit, 3300 Samples/sec, 1 differential / 1 single-ended, no gain.

The most common are the **ADS1115** and **ADS1015** chips.

## Implementation details

The driver takes care of exposing the correct fuctionality based on which `type`
is created. Differential measurements can be taken on all devices, but only
`ADS1x15` has multiple options.

## API Description

First, create a device using `mgos_ads1x1x_create()` by specifying the type of
chip you're using. Take some measurements using `mgos_ads1x1x_read()`, and
clean up the driver by using `mgos_ads1x1x_destroy()`.

`mgos_ads1x1x_set_fsr()` is used to set the full scale range (FSR) of
the ADC. Each chip supports ranges from 6.144 Volts down to 0.256 Volts. You
can read the current FSR with `mgos_ads1x1x_get_fsr()`.

`mgos_ads1x1x_set_dr()` is used to set the data rate of continuous
measurements. The support differs between `ADS101X` (the 12-bit version,
which is faster), and `ADS111X` (the 16-bit version, which is slower). You
can read the current DR with `mgos_ads1x1x_get_dr()`.

`mgos_ads1x1x_read()` starts a singleshot measurement on the given
channel (which takes 1ms for `ADS101X` and 8ms for `ADS111X`), and
returns a 16 bit signed value. The datasheet mentions that with input
voltages around `GND`, a negative value might be returned (ie -2 rather
than 0).

`mgos_ads1x1x_read_diff()` starts a singleshot measurement of
the differential voltage between two channels, typically `Chan0` and
`Chan1`. Several channel pairs are allowed, see the include file for
details. Note, that this function is only available on `ADS1X15` chips.

## Example application

```
#include "mgos.h"
#include "mgos_config.h"
#include "mgos_ads1x1x.h"

void timer_cb(void *data) {
  struct mgos_ads1x1x *d = (struct mgos_ads1x1x *)data;
  int16_t res[4];

  if (!d) return;

  for(int i=0; i<4; i++) {
    if (!mgos_ads1x1x_read(s_adc, i, &res[i])) {
      LOG(LL_ERROR, ("Could not read device"));
      return;
    }
  }
  LOG(LL_INFO, ("chan={%6d, %6d, %6d, %6d}", res[0], res[1], res[2], res[3]));
}

enum mgos_app_init_result mgos_app_init(void) {
  struct mgos_ads1x1x *d = NULL;

  if (!(d = mgos_ads1x1x_create(mgos_i2c_get_global(), 0x48, ADC_ADS1115))) {
    LOG(LL_ERROR, ("Could not create ADS1115"));
    return MGOS_APP_INIT_ERROR;
  }

  mgos_set_timer(100, true, timer_cb, d);

  return MGOS_APP_INIT_SUCCESS;
}

```

# Disclaimer

This project is not an official Google project. It is not supported by Google
and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.


 ----- 
#### mgos_ads1x1x_create

```c
struct mgos_ads1x1x *mgos_ads1x1x_create(struct mgos_i2c *i2c, uint8_t i2caddr, enum mgos_ads1x1x_type type);
```
> 
> Initialize a ADS1X1X on the I2C bus `i2c` at address specified in `i2caddr`
> parameter (default ADS1X1X is on address 0x48). The device will be polled for
> validity, upon success a new `struct mgos_ads1x1x` is allocated and
> returned. If the device could not be found, NULL is returned.
>  
#### mgos_ads1x1x_destroy

```c
bool mgos_ads1x1x_destroy(struct mgos_ads1x1x **dev);
```
> 
> Destroy the data structure associated with a ADS1X1X device. The reference
> to the pointer of the `struct mgos_ads1x1x` has to be provided, and upon
> successful destruction, its associated memory will be freed and the pointer
> set to NULL and true will be returned.
>  
#### mgos_ads1x1x_set_fsr

```c
bool mgos_ads1x1x_set_fsr(struct mgos_ads1x1x *dev, enum mgos_ads1x1x_fsr fsr);
bool mgos_ads1x1x_get_fsr(struct mgos_ads1x1x *dev, enum mgos_ads1x1x_fsr *fsr);
```
>  Get or Set the Full Scale Range (FSR). All chips in the ADS1X1X family support
> the same settings. By default, 2.048V is used.
> 
> Note: ADS1x13 does not support this, and always has an FSR of 2.048V.
> 
> Returns true on success, false otherwise.
>  
#### mgos_ads1x1x_set_dr

```c
bool mgos_ads1x1x_set_dr(struct mgos_ads1x1x *dev, enum mgos_ads1x1x_dr dr);
bool mgos_ads1x1x_get_dr(struct mgos_ads1x1x *dev, enum mgos_ads1x1x_dr *dr);
```
>  Get or Set the Data Rate (in Samples per Second). If the supplied `dr`
> argument cannot be set on the chip, false is returned. Otherwise, the
> supplied `dr` is set. By default, ADS101X sets 1600SPS, ADS111X sets 128SPS.
> 
> Returns true on success, false otherwise.
>  
#### mgos_ads1x1x_read

```c
bool mgos_ads1x1x_read(struct mgos_ads1x1x *dev, uint8_t chan, int16_t *result);
```
>  Read a channel from the ADC and return the read value in `result`. If the
> channel was invalid, or an error occurred, false is returned and the result
> cannot be relied upon.
> 
> Returns true on success, false otherwise.
>  
#### mgos_ads1x1x_read_diff

```c
bool mgos_ads1x1x_read_diff(struct mgos_ads1x1x *dev, uint8_t chanP, uint8_t chanN, int16_t *result);
```
>  Read a 2-channel differential from the ADC and return the read value in `result`.
> If the channel pair invalid, or an error occurred, false is returned and the
> result cannot be relied upon. Upon success, true is returned.
> 
> Note: This is only available on ADS1X15 chips.
>       Valid chanP/chanN pairs are : 0/1, 0/3, 1/3, 2/3.
> 
> Returns true on success, false otherwise.
>  
