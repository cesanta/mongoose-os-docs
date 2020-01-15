# STMPE610 SPI
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/stmpe610-spi](https://github.com/mongoose-os-libs/stmpe610-spi) | [mgos_stmpe610.h](https://github.com/mongoose-os-libs/stmpe610-spi/blob/master/include/mgos_stmpe610.h) | &nbsp;  | &nbsp;         |


Mongoose native SPI driver for STMP610E

## Introduction

STMPE610 is a chip that drives a resistive touchscreen. It measures pressure on
a glass plate which has an X and Y resistor samples the pressure put on the
screen (typically by pressing it).

### API

This driver initializes the chip and allows the user to register a callback,
which will be called each time the driver senses a touch (`TOUCH_DOWN`) or
a release (`TOUCH_UP`). The callback function will be given the `X` and `Y`
coordinates, together with an average pressure (`Z`). For `TOUCH_DOWN`
events, the `length` field is set to 1. For `TOUCH_UP` events, the `length`
field is set to the amount of samples read, between 1 and 128.

The `X` and `Y` coordinates as read by the screen are between [0..4095), so
a mapping function is applied by `mgos_stmpe610_set_dimensions()`. For screens
that are rotated, `mgos_stmpe610_set_rotation()` sets the mapping function to
return them in the correct orientation.

#### Details

The chip uses an interrupt pin to signal the micro controller that it has
something to say. The driver sets up a GPIO pin with a pullup, which the
chip pulls to ground to initiate the interrupt. Mongoose OS will receive
this and issue a software callback (so no hardware interrupts are used),
and the driver will clear interrupts on the STMPE610 after the user supplied
handler is called.

Users can query the driver to see if the chip is currently registering a
touch by calling `mgos_stmpe610_is_touching()` which will return `true` if
the user is currently touching the screen.

If the user touches the screen very briefly (only one sample cycle of the
driver), the callback will be called with `TOUCH_DOWN`, but no `TOUCH_UP`
event will be generated. To work around this, the driver sets a 100ms timer
upon `TOUCH_DOWN`, and if the screen is not being touched when the timer
expires, a gratuitous `TOUCH_UP` event is sent with `length` set to 1.

### Example Application

#### mos.yml

The driver uses the Mongoose native SPI driver. It is configured by setting
up the `MOSI`, `MISO`, `SCLK` pins and assinging one of the three
available `CS` positions, in this example (which was taken from
the Huzzah32 ESP32 microcontroller), we are going to use `CS0`:

```
config_schema:
  - ["spi.enable", true]
  - ["spi.cs0_gpio", 32]      # The STMPE610 CS pin
  - ["spi.cs1_gpio", -1]
  - ["spi.cs2_gpio", -1]
  - ["spi.mosi_gpio", 18]
  - ["spi.miso_gpio", 19]
  - ["spi.sclk_gpio", 5]
  - ["stmpe610.irq_pin", 23]
  - ["stmpe610.cs_index", 0]  # Use spi.cs0_gpio
```

#### Application

```c
#include "mgos.h"
#include "mgos_stmpe610.h"

static void touch_handler(struct mgos_stmpe610_event_data *ed) {
  if (!ed) return;

  LOG(LL_INFO, ("Touch %s at (%d,%d) pressure=%d, length=%d", 
      ed->direction==TOUCH_UP?"UP":"DOWN", ed->x, ed->y, ed->z, ed->length));
}

enum mgos_app_init_result mgos_app_init(void) {
  mgos_stmpe610_set_handler(touch_handler);
  mgos_stmpe610_set_rotation(STMPE610_LANDSCAPE);
  mgos_stmpe610_set_dimensions(320, 240);

  return MGOS_APP_INIT_SUCCESS;
}
```

# Disclaimer

This project is not an official Google project. It is not supported by Google
and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.


 ----- 
**************************************************
This is a library for the Adafruit STMPE610 Resistive
touch screen controller breakout
----> http://www.adafruit.com/products/1571

Check out the links above for our tutorials and wiring diagrams
These breakouts use SPI or I2C to communicate

Adafruit invests time and resources providing this open source code,
please support Adafruit and open-source hardware by purchasing
products from Adafruit!

Written by Limor Fried/Ladyada for Adafruit Industries.
MIT license, all text above must be included in any redistribution
**************************************************

/* Adapted for native Mongoose by Pim van Pelt <pim@google.com> */

 ----- 
