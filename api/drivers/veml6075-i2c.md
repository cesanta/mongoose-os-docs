# VEML6075 I2C
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/veml6075-i2c](https://github.com/mongoose-os-libs/veml6075-i2c) | [mgos_veml6075.h](https://github.com/mongoose-os-libs/veml6075-i2c/tree/master/include/mgos_veml6075.h) | &nbsp;  | &nbsp;         |

# VEML6075 I2C Driver

A Mongoose library for Vishay Technologies UVA/UVB intensity sensor.

## Implementation details

The VEML6075 sensor can be configured in continuous or one-shot measurement
modes, and upon each measurement returns the 16-bit raw counters for UVA, UVB,
visual and IR bands. Using conversion coefficients, the UVIndex can be returned
using these data points.

An accurate VEML6075 UVI sensing system requires visible and infrared noise
compensation and a teflon diffusor for cosine angular response correction. The
UVI formulas and related UVI formula coefficients are discussed here in detail.

This library implements the application [notes](https://www.vishay.com/docs/84339/designingveml6075.pdf)

### Limitations

The sensor measures for a configurable interval and integrates the total light
received for each band. Although its sensitivity can easily be adjusted with
selecting the proper integration times (from 50ms through to 800ms), the
algorithm provided in the Vishay paper is only applicable to 100ms integration
times. Therefore, the library currently does not support other integration
times.

## Example application

An example program using a timer to read data from the sensor every 5 seconds:

```
#include "mgos.h"
#include "mgos_veml6075.h"

static struct mgos_veml6075 *s_veml6075;

static void timer_cb(void *user_data) {
  float uva, uvb, uvindex;

  uva=mgos_veml6075_getUVA(s_veml6075);
  uvb=mgos_veml6075_getUVB(s_veml6075);
  uvindex=mgos_veml6075_getUVIndex(s_veml6075);

  LOG(LL_INFO, ("VEML6075 uva=%.1f uvb=%.1f uvindex=%.2f usecs=%u", uva, uvb, uvindex));

  (void) user_data;
}

enum mgos_app_init_result mgos_app_init(void) {
  s_veml6075=mgos_veml6075_create(0x10); // Default I2C address
  if (s_veml6075) {
    mgos_set_timer(5000, true, timer_cb, NULL);
  } else {
    LOG(LL_ERROR, ("Could not initialize sensor"));
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
value of mg_time() upon last call to _read()
#### mgos_veml6075_create

```c
struct mgos_veml6075 *mgos_veml6075_create(struct mgos_i2c *i2c, uint8_t i2caddr);
```

Initialize a VEML6075 on the I2C bus `i2c` at address specified in `i2caddr`
parameter (default VEML607 is on address 0x10). The sensor will be polled for
its deviceid, upon success a new `struct mgos_veml6075` is allocated and
returned. If the device could not be found, NULL is returned.
 
#### mgos_veml6075_destroy

```c
void mgos_veml6075_destroy(struct mgos_veml6075 **sensor);
```

Destroy the data structure associated with a VEML6075 device. The reference
to the pointer of the `struct mgos_veml6075` has to be provided, and upon
successful destruction, its associated memory will be freed and the pointer
set to NULL.
 
#### mgos_veml6075_getUVA

```c
float mgos_veml6075_getUVA(struct mgos_veml6075 *sensor);
```

The sensor will be polled for its light counter registers. If the poll has
occured in the last `MGOS_VEML6075_READ_DELAY` seconds, the cached data is
used (so as not to repeatedly poll the bus upon subsequent calls).

The UVA band intensity is returned as a float (0.0 means "no light", higher
numbers mean more light was measured).
 
#### mgos_veml6075_getUVB

```c
float mgos_veml6075_getUVB(struct mgos_veml6075 *sensor);
```

The sensor will be polled for its light counter registers. If the poll has
occured in the last `MGOS_VEML6075_READ_DELAY` seconds, the cached data is
used (so as not to repeatedly poll the bus upon subsequent calls).

The UVB band intensity is returned as a float (0.0 means "no light", higher
numbers mean more light was measured).
 
#### mgos_veml6075_getUVIndex

```c
float mgos_veml6075_getUVIndex(struct mgos_veml6075 *sensor);
```

The sensor will be polled for its light counter registers. If the poll has
occured in the last `MGOS_VEML6075_READ_DELAY` seconds, the cached data is
used (so as not to repeatedly poll the bus upon subsequent calls).

Please see https://www.vishay.com/docs/84339/designingveml6075.pdf for
details.

The UVIndex is computed from UVA, UVB, IR and Visual counters and returned.
*   <2.0  - Low UVIndex intensity
*   <5.5  - Moderate
*   <7.5  - High
*   <10.5 - Very High
*   >10.5 - Extreme UVIndex intensity

 
#### mgos_veml6075_getRawUVA

```c
uint16_t mgos_veml6075_getRawUVA(struct mgos_veml6075 *sensor);
```

Return raw counters for light measured in the UVA register.
 
#### mgos_veml6075_getRawUVB

```c
uint16_t mgos_veml6075_getRawUVB(struct mgos_veml6075 *sensor);
```

Return raw counters for light measured in the UVB register.
 
#### mgos_veml6075_getRawDark

```c
uint16_t mgos_veml6075_getRawDark(struct mgos_veml6075 *sensor);
```

Return raw counters for light measured in the RawDark register.
 
#### mgos_veml6075_getRawVisComp

```c
uint16_t mgos_veml6075_getRawVisComp(struct mgos_veml6075 *sensor);
```

Return raw counters for light measured in the Visual register.
 
#### mgos_veml6075_getRawIRComp

```c
uint16_t mgos_veml6075_getRawIRComp(struct mgos_veml6075 *sensor);
```

Return raw counters for light measured in the Infra Red register.
 
#### mgos_veml6075_getStats

```c
bool mgos_veml6075_getStats(struct mgos_veml6075 *sensor, struct mgos_veml6075_stats *stats);
```

Returns the running statistics on the sensor interaction, the user provides
a pointer to a `struct mgos_veml6075_stats` object, which is filled in by this
call.

Upon success, true is returned. Otherwise, false is returned, in which case
the contents of `stats` is undetermined.
 
