# MCP23XXX I2C
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/mcp23xxx](https://github.com/mongoose-os-libs/mcp23xxx) | [mgos_mcp23xxx.h](https://github.com/mongoose-os-libs/mcp23xxx/blob/master/include/mgos_mcp23xxx.h) | &nbsp;  | &nbsp;         |



A Mongoose library for MCP23XXX, a popular and cheap set of GPIO extenders using
either I2C (MCP23**0**XX) or SPI (MCP23**S**XX)
The MCP23008 is an 8-port device, and the MCP23017 is a 16-port device, but they are
otherwise identical.

**NOTE**: SPI driver is TODO at this point. Contact the author for details.

## Implementation details

The MCP230XX is a bi-directional GPIO with input pullup capability.
Each input pin can be explicitly set as INPUT or OUTPUT pin. For INPUT pins,
the pin can be left floating or pulled up with a 100kOhm internal resistor.

Interrupts are handled with this driver. This allows for callbacks to be set
for INPUT pin state changes.

**NOTE**: For simplicity reasons, on the MCP23x17 chips, `intA` and `intB`
are combined, so it does not matter which of the pins are used on the chip,
any port/pin state change will fire an interrupt, and only one pin needs to
be used on the MCU to handle all 16 ports.

## API Description

To start, `mgos_mcp23xxx_create()` is called with the correct `I2C` bus and
address (by default 0x20), and optionally a GPIO pin on the microcontroller that
serves as an interrupt pin, to detect MCP230XX input state changes.

**NOTE:** When the driver starts, it polls the current state from the chip
without changing any ports. The benefit of this is that the MCU can safely
reboot without loss of the GPIO state in MCP230XX.

The API follows `mgos_gpio.h` closely, enabling ports to be set as input or output.
For input ports, `mgos_mcp23xxx_gpio_set_pull()` can be called with either
`MGOS_GPIO_PULL_NONE` or `MGOS_GPIO_PULL_UP`, but not with `MGOS_GPIO_PULL_DOWN`
which returns an error, as the chip does not support input pulldowns.

Notably, `mgos_mcp23xxx_gpio_set_int_handler()` and `mgos_mcp23xxx_gpio_set_button_handler()`
work identically to the `mgos_gpio_*()` variants.

## Example application

```
#include "mgos.h"
#include "mgos_config.h"
#include "mgos_mcp23xxx.h"

static void button_cb(int pin, void *user_data) {
  struct mgos_mcp23xxx *d = (struct mgos_mcp23xxx *)user_data;
  LOG(LL_INFO, ("GPIO[%d] callback, value=%d", pin, mgos_mcp23xxx_gpio_read(d, pin)));
  mgos_mcp23xxx_gpio_toggle(d, pin+8);
}

enum mgos_app_init_result mgos_app_init(void) {
  struct mgos_mcp23xxx *d;
  int i;

  if (!(d = mgos_mcp23017_create(mgos_i2c_get_global(), mgos_sys_config_get_mcp23xxx_i2caddr(),
                                mgos_sys_config_get_mcp23xxx_int_gpio()))) {
    LOG(LL_ERROR, ("Could not create MCP230XX"));
    return MGOS_APP_INIT_ERROR;
  }

  for(i=0; i<4; i++) mgos_mcp23xxx_gpio_setup_input(d, i, MGOS_GPIO_PULL_UP);
  for(i=8; i<16; i++) mgos_mcp23xxx_gpio_set_mode(d, i, MGOS_GPIO_MODE_OUTPUT);

  mgos_mcp23xxx_gpio_set_button_handler(d, 0, MGOS_GPIO_PULL_UP, MGOS_GPIO_INT_EDGE_NEG, 10, button_cb, d);
  mgos_mcp23xxx_gpio_set_button_handler(d, 1, MGOS_GPIO_PULL_UP, MGOS_GPIO_INT_EDGE_POS, 10, button_cb, d);
  mgos_mcp23xxx_gpio_set_button_handler(d, 2, MGOS_GPIO_PULL_UP, MGOS_GPIO_INT_EDGE_ANY, 10, button_cb, d);
  mgos_mcp23xxx_gpio_set_button_handler(d, 3, MGOS_GPIO_PULL_UP, MGOS_GPIO_INT_EDGE_ANY, 10, button_cb, d);

  return MGOS_APP_INIT_SUCCESS;
}
```

# Disclaimer

This project is not an official Google project. It is not supported by Google
and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.


 ----- 
#### mgos_mcp23008_create

```c
struct mgos_mcp23xxx *mgos_mcp23008_create(struct mgos_i2c *i2c, uint8_t i2caddr, int int_gpio);
struct mgos_mcp23xxx *mgos_mcp23017_create(struct mgos_i2c *i2c, uint8_t i2caddr, int int_gpio);
```
> 
> Initialize a MCP230XX on the I2C bus `i2c` at address specified in `i2caddr`
> parameter (default MCP230XX is on address 0x20). The device will be polled for
> validity, upon success a new `struct mgos_mcp23xxx` is allocated and
> returned. If the device could not be found, NULL is returned.
> To install an interrupt handler for the chip, set int_gpio to any valid GPIO
> pin. Set it to -1 to disable interrupts.
>  
#### mgos_mcp23xxx_destroy

```c
bool mgos_mcp23xxx_destroy(struct mgos_mcp23xxx **dev);
```
> 
> Destroy the data structure associated with a MCP230XX device. The reference
> to the pointer of the `struct mgos_mcp23xxx` has to be provided, and upon
> successful destruction, its associated memory will be freed and the pointer
> set to NULL and true will be returned.
>  
#### mgos_mcp23xxx_print_state

```c
bool mgos_mcp23xxx_print_state(struct mgos_mcp23xxx *dev);
```
>  Emit a logline with the pin and io register stat
> Return true if the driver could read from the chip, false otherwise.
>  
#### mgos_mcp23xxx_gpio_set_mode

```c
bool mgos_mcp23xxx_gpio_set_mode(struct mgos_mcp23xxx *dev, int pin, enum mgos_gpio_mode mode);
bool mgos_mcp23xxx_gpio_set_pull(struct mgos_mcp23xxx *dev, int pin, enum mgos_gpio_pull_type pull);
bool mgos_mcp23xxx_gpio_setup_output(struct mgos_mcp23xxx *dev, int pin, bool level);
bool mgos_mcp23xxx_gpio_setup_input(struct mgos_mcp23xxx *dev, int pin, enum mgos_gpio_pull_type pull_type);
bool mgos_mcp23xxx_gpio_read(struct mgos_mcp23xxx *dev, int pin);
void mgos_mcp23xxx_gpio_write(struct mgos_mcp23xxx *dev, int pin, bool level);
bool mgos_mcp23xxx_gpio_toggle(struct mgos_mcp23xxx *dev, int pin);
```
>  These follow `mgos_gpio.h` definitions. 
