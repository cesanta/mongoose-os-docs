# APDS9960 I2C
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/apds9960-i2c](https://github.com/mongoose-os-libs/apds9960-i2c) | [mgos_apds9960.h](https://github.com/mongoose-os-libs/apds9960-i2c/tree/master/include/mgos_apds9960.h) | &nbsp;  | &nbsp;         |



A Mongoose library for Avago's APDS-9960 RGB, IR and Gesture Sensor.

## Implementation details

The APDS-9960 device features advanced Gesture detection, Proximity detection,
Digital Ambient Light Sense (ALS) and Color Sense (RGBC). The slim modular
package, L 3.94 x W 2.36 x H 1.35 mm, incorporates an IR LED and factory
calibrated LED driver for drop-in compatibility with existing footprints.  

### Gesture detection

Gesture detection utilizes four directional photodiodes to sense reflected IR
energy (sourced by the integrated LED) to convert physical motion information
(i.e. velocity, direction and distance) to a digital information. The
architecture of the gesture engine features automatic activation (based on
Proximity engine results), ambient light subtraction, cross-talk cancelation,
dual 8-bit data converters, power saving inter-conversion delay, 32-dataset
FIFO, and interrupt driven I2C communication. The gesture engine accommodates
a wide range of mobile device gesturing requirements: simple UP-DOWN-RIGHT-LEFT
gestures or more complex gestures can be accurately sensed. Power consumption
and noise are minimized with adjustable IR LED timing.

### Proximity detection

The Proximity detection feature provides distance measurement (E.g. mobile
device screen to user’s ear) by photodiode detection of reflected IR energy
(sourced by the integrated LED). Detect/release events are interrupt driven,
and occur whenever proximity result crosses upper and/ or lower threshold
settings. The proximity engine features offset adjustment registers to
compensate for system offset caused by unwanted IR energy reflections
appearing at the sensor. The IR LED intensity is factory trimmed to eliminate
 the need for end-equipment calibration due to component variations. Proximity
 results are further improved by automatic ambient light subtraction.

### Color and ALS detection

The Color and ALS detection feature provides red, green, blue and clear light
intensity data. Each of the R, G, B, C channels have a UV and IR blocking
filter and a dedicated data converter producing16-bit data simultaneously. This
architecture allows applications to accurately measure ambient light and sense
color which enables devices to calculate color temperature and control display
backlight.

## API Description

There are two APIs defined in this driver. Firstly, a low level API is used to
drive the configuration of the chip. Secondly, a higher level abstraction is
provided for application programmers that want to merely read `proximity` and
`light` data from the sensor, or install a hardware interrupt to callback user
code upon certain events (such as `proximity`, `light` and `gesture` events
described above.)

### Notes

Gesture sending is incredibly hard with this sensor. Work is needed to improve
the performance of the gesture code in this driver.

Proximity and Light sensing and interrupts are working fine.

## Example application

An example program using a timer to read data from the sensor every 5 seconds:

```
#include "mgos.h"
#include "mgos_config.h"
#include "mgos_apds9960.h"

static void light_interrupt(uint16_t clear, uint16_t red, uint16_t green, uint16_t blue) {
  LOG(LL_INFO, ("clear=%u red=%u green=%u blue=%u", clear, red, green, blue));
}

static void proximity_interrupt(uint8_t proximity) {
  LOG(LL_INFO, ("proximity=%u", proximity));
}

static void apds9960_timer_cb(void *user_data) {
  struct mgos_apds9960 *sensor = (struct mgos_apds9960 *)user_data;
  uint16_t clear = 0, red = 0,  green = 0, blue = 0;
  uint8_t proximity = 0;

  if (!mgos_apds9960_read_light(sensor, &clear, &red, &green, &blue)) {
    LOG(LL_ERROR, ("Could not read APDS9960 light sensor"));
  }
  if (!mgos_apds9960_read_proximity(sensor, &proximity)) {
    LOG(LL_ERROR, ("Could not read APDS9960 proximity sensor"));
  }

  LOG(LL_INFO, ("clear=%u red=%u green=%u blue=%u proximity=%u", clear, red, green, blue, proximity));
}

enum mgos_app_init_result mgos_app_init(void) {
  struct mgos_apds9960 *sensor;

  sensor = mgos_apds9960_create(mgos_i2c_get_global(), mgos_sys_config_get_apds9960_i2caddr());
  if (!sensor) {
    LOG(LL_ERROR, ("Could not create APDS9960 sensor"));
    return false;
  }

  if (!mgos_apds9960_set_callback_light(sensor, 10, 1000, light_interrupt)) {
    LOG(LL_ERROR, ("Could not enable APDS9960 light callback"));
    return false;
  }

  if (!mgos_apds9960_set_callback_proximity(sensor, 0, 150, proximity_interrupt)) {
    LOG(LL_ERROR, ("Could not enable APDS9960 proximity callback"));
    return false;
  }

  mgos_set_timer(1000, true, apds9960_timer_cb, sensor);

  return MGOS_APP_INIT_SUCCESS;
}
```


# Disclaimer

This project is not an official Google project. It is not supported by Google
and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.


 ----- 
#### mgos_apds9960_create

```c
struct mgos_apds9960 *mgos_apds9960_create(struct mgos_i2c *i2c, uint8_t i2caddr);
```
> 
> Initialize a APDS9960 on the I2C bus `i2c` at address specified in `i2caddr`
> parameter (default APDS9960 is on address 0x39). The sensor will be polled for
> validity, upon success a new `struct mgos_apds9960` is allocated and
> returned. If the device could not be found, NULL is returned.
>  
#### mgos_apds9960_destroy

```c
void mgos_apds9960_destroy(struct mgos_apds9960 **sensor);
```
> 
> Destroy the data structure associated with a APDS9960 device. The reference
> to the pointer of the `struct mgos_apds9960` has to be provided, and upon
> successful destruction, its associated memory will be freed and the pointer
> set to NULL.
>  
#### mgos_apds9960_set_callback_light

```c
bool mgos_apds9960_set_callback_light(struct mgos_apds9960 *sensor, uint16_t low_threshold, uint16_t high_threshold, mgos_apds9960_light_event_t handler);
bool mgos_apds9960_set_callback_proximity(struct mgos_apds9960 *sensor, uint8_t low_threshold, uint8_t high_threshold, mgos_apds9960_proximity_event_t handler);
bool mgos_apds9960_set_callback_gesture(struct mgos_apds9960 *sensor, mgos_apds9960_gesture_event_t handler);
```
> 
> Install an interrupt (see `mos.yml` key `apds9960.irq_pin`), and when the
> interrupt is asserted, call a callback for `light`, `proximity` and/or
> `gesture` events.
> 
> For light: `low_threshold` and `high_threshold` arguments determine between
> which values on the `clear` (ambient) light channel an interrupt is generated.
> 
> For proximity: `low_threshold` and `high_threshold` arguments determine between
> which values on the `proximity` channel an interrupt is generated. Note: high
> values are closer to the sensor, low values are further away.
> 
> Returns true on success, or false otherwise.
>  
#### mgos_apds9960_read_light

```c
bool mgos_apds9960_read_light(struct mgos_apds9960 *sensor, uint16_t *clear, uint16_t *red, uint16_t *green, uint16_t *blue);
```
> 
> Read the clear (ambient), red, green, and blue light values from the sensor.
> Lower values mean less light was detected. The arguments clear, red, green
> and blue may be NULL, in which case they are not polled from the sensor.
> Returns true on success, or false otherwise. If false is returned, the
> values of clear, red, green and blue cannot be used.
>  
#### mgos_apds9960_read_proximity

```c
bool mgos_apds9960_read_proximity(struct mgos_apds9960 *sensor, uint8_t *proximity);
```
> 
> Read the proximity value from the sensor. Lower values mean further away,
> higher values mean closer to the sensor.
> Returns true on success, or false otherwise. If false is returned, the
> value of proximity cannot be used.
>  
#### mgos_apds9960_is_gesture_available

```c
bool mgos_apds9960_is_gesture_available(struct mgos_apds9960 *sensor);
```
> 
> Return true if the gesture sensor has available data in its FIFO buffer.
>  
