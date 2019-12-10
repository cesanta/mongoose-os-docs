# INA226 I2C
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/ina226-i2c](https://github.com/mongoose-os-libs/ina226-i2c) | [mgos_ina226.h](https://github.com/mongoose-os-libs/ina226-i2c/tree/master/include/mgos_ina226.h) | &nbsp;  | &nbsp;         |



A Mongoose library for Texas Instruments' popular I2C current sensor.

## Implementation details

The `INA226` is a simple I2C device that measures a voltage drop over a
shunt resistor, as well as the voltage on the bus. It is able to measure
voltage up to 36V (in 1.25mV increments) on the bus and the voltage drop
over the shunt resistor in 2.5uV increments with a range of 81.92mV, and
is very precise.

Using a 0.1Ohm shunt resistor, the maximum current that can be measured
is 0.8A.

## API Description

Create an `INA226` object using `mgos_ina226_create()`, set the shunt
resistor value using `mgos_ina226_set_shunt_resistance()`, then call
`mgos_ina226_get_bus_voltage()` to get the bus voltage, call 
`mgos_ina226_get_shunt_voltage()` to get the voltage drop over
the shunt resistor, and `mgos_ina226_get_current()` to get the current
flowing through the circuit.

## Example application

```
#include "mgos.h"
#include "mgos_config.h"
#include "mgos_ina226.h"

static void ina226_timer_cb(void *user_data) {
  struct mgos_ina226 *sensor = (struct mgos_ina226 *)user_data;
  float bus, shunt, current, res;

  if (!sensor) return;

  mgos_ina226_get_bus_voltage(sensor, &bus);
  mgos_ina226_get_shunt_resistance(sensor, &res);
  mgos_ina226_get_shunt_voltage(sensor, &shunt);
  mgos_ina226_get_current(sensor, &current);
  LOG(LL_INFO, ("Vbus=%.3f V Vshunt=%.0f uV Rshunt=%.3f Ohm Ishunt=%.1f mA",
      bus, shunt*1e6, res, current*1e3));
  }
}

enum mgos_app_init_result mgos_app_init(void) {
  struct mgos_ina226 *sensor;

  sensor = mgos_ina226_create(mgos_i2c_get_global(), mgos_sys_config_get_ina226_i2caddr());
  if (!sensor) {
    LOG(LL_ERROR, ("Could not create INA226 sensor"));
    return false;
  }

  mgos_set_timer(1000, true, ina226_timer_cb, sensor);

  return MGOS_APP_INIT_SUCCESS;
}
```

# Disclaimer

This project is not an official Google project. It is not supported by Google
and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.


 ----- 
#### mgos_ina226_create

```c
struct mgos_ina226 *mgos_ina226_create(struct mgos_i2c *i2c, uint8_t i2caddr);
```
> 
> Initialize a INA226 on the I2C bus `i2c` at address specified in `i2caddr`
> parameter (default INA226 is on address 0x40). The sensor will be polled for
> validity, upon success a new `struct mgos_ina226` is allocated and
> returned. If the device could not be found, NULL is returned.
>  
#### mgos_ina226_destroy

```c
void mgos_ina226_destroy(struct mgos_ina226 **sensor);
```
> 
> Destroy the data structure associated with a INA226 device. The reference
> to the pointer of the `struct mgos_ina226` has to be provided, and upon
> successful destruction, its associated memory will be freed and the pointer
> set to NULL.
>  
#### mgos_ina226_get_bus_voltage

```c
bool mgos_ina226_get_bus_voltage(struct mgos_ina226 *sensor, float *volts);
```
>  Measure the bus voltage on the device. Return the measured voltage in `*volts`,
> in units of Volts.
> Returns true on success and false on failure, in which case `*volts` is unspecified.
>  
#### mgos_ina226_get_shunt_voltage

```c
bool mgos_ina226_get_shunt_voltage(struct mgos_ina226 *sensor, float *volts);
```
>  Measure the shunt voltage on the device. Return the measured voltage in `*volts`,
> in units of Volts.
> Returns true on success and false on failure, in which case `*volts` is unspecified.
>  
#### mgos_ina226_set_shunt_resistance

```c
bool mgos_ina226_set_shunt_resistance(struct mgos_ina226 *sensor, float ohms);
```
>  Set the shunt resistor value in units of Ohms.
> Typical values is ohms=0.100 (which yields a 3.2A range on the current sensor).
> Returns true on success and false on failure.
>  
#### mgos_ina226_get_shunt_resistance

```c
bool mgos_ina226_get_shunt_resistance(struct mgos_ina226 *sensor, float *ohms);
```
>  Get the shunt resistor value in units of Ohms.
> Returns true on success and false on failure, in which case `*ohms` is unspecified.
>  
