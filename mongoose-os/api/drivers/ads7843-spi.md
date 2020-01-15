# ADS7843/XPT2046 SPI
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/ads7843-spi](https://github.com/mongoose-os-libs/ads7843-spi) | [mgos_ads7843.h](https://github.com/mongoose-os-libs/ads7843-spi/blob/master/include/mgos_ads7843.h) | &nbsp;  | &nbsp;         |


Mongoose native SPI driver for ADS7843/XPT2046 Touch Screen Controller

## Introduction

ADS7843/XPT2046 is a chip that is connected to a resistive touchscreen.
The touchscreen has resistance in the X and Y directions separately.  
When the user touches the touchscreen a resistance in both directions
is detected by the touchscreen controller.
The touchscreen controller records the X and Y resistance changes using
an ADC that can measure the voltage from the resistance changes in the
X an Y directions. A schematic of the test board used is included in
this project.

### API

This driver initializes the chip and allows the user to register a callback,
which will be called each time the driver senses a touch (`TOUCH_DOWN`) or
a release (`TOUCH_UP`) event. The callback function will be given
the `X` and `Y` coordinates where the user pressed the screen.
The `X` and `Y` coordinates are passed in the mgos_ads7843_event_data
structure. The x and y attributes are values in screen pixels.

#### Details

The SPI bus must be connected to the screen via 5 signals. These are
MOSI, MISO, SCK, /CS and /IRQ. When the screen is touched by the user
the /IRQ line goes low. In the microcontroller code this causes an
interrupt to occur. The interrupt service routine then reads the X
and Y ADC values from the ADS7843 device (using the MOSI, MISO, SCK,
/CS signals).
The interrupt service routine then converts these ADC values into
screen pixel positions. Once this is done a callback function is called.
A pointer to a structure that holds the above X and y values along with
some other data is passed to the callback function.

### Example Application

#### mos.yml

The driver uses the Mongoose native SPI driver. It is configured by setting
up the `MOSI`, `MISO`, `SCLK` pins and assigning one of the three
available `CS` positions, in this example we use `CS1`:

```
config_schema:
  - ["spi.enable", true]
  - ["spi.mosi_gpio", 23]
  - ["spi.miso_gpio", 19]
  - ["spi.sclk_gpio", 18]
  - ["spi.cs1_gpio", 27 ] # This defines the ADS7843 SPI chip select pin
  - ["ads7843", "o", {title: "ADS7843/XPT2046 TouchScreen"}]
  - ["ads7843.cs_index", "i", 1, {title: "spi.cs*_gpio index, 0, 1 or 2"}] # This defines the SPI CS line to use (0, 1 or 2)
  - ["ads7843.irq_pin", "i", 25, {title: "IRQ pin (taken low when the display is touched.)"}]
  - ["ads7843.x_pixels", "i", 320, {title: "The display pixel count in the horizontal direction"}]
  - ["ads7843.y_pixels", "i", 240, {title: "The display pixel count in the vertical direction"}]
  - ["ads7843.flip_x",    "i", 0, {title: "Flip the X direction (0/1, 0 = no flip). Use this if the x direction is reversed."}]
  - ["ads7843.flip_y",    "i", 0, {title: "Flip the Y direction (0/1, 0 = no flip). Use this if the y direction is reversed."}]
  - ["ads7843.flip_x_y", "i", 0, {title: "Flip the X and Y directions (0/1, 0 = no flip). Use this is if the display is upside down."}]
  - ["ads7843.min_x_adc", "i", 12,  {title: "The min X axis ADC calibration value. Enter the value from debug output (min adc x value at screen edge)."}]
  - ["ads7843.max_x_adc", "i", 121,  {title: "The max X axis ADC calibration value. Enter the value from debug output (max adc x value at screen edge)."}]
  - ["ads7843.min_y_adc", "i", 7,  {title: "The min Y axis ADC calibration value. Enter the value from debug output (min adc y value at screen edge)."}]
  - ["ads7843.max_y_adc", "i", 118,  {title: "The max Y axis ADC calibration value. Enter the value from debug output (max adc y value at screen edge)."}]
```

#### Application

```
#include "mgos.h"
#include "mgos_ads7843.h"

static void touch_handler(struct mgos_ads7843_event_data *event_data) {
  if (!event_data) {
    return;
  }

  LOG(LL_INFO, ("orientation=%s", event_data->orientation ? "PORTRAIT" : "LANDSCAPE"));
  LOG(LL_INFO, ("Touch %s, down for %.1f seconds", event_data->direction==TOUCH_UP?"UP":"DOWN", event_data->down_seconds));
  LOG(LL_INFO, ("pixels x/y = %d/%d, adc x/y = %d/%d",  event_data->x, event_data->y, event_data->x_adc, event_data->y_adc));

}

enum mgos_app_init_result mgos_app_init(void) {

  mgos_ads7843_set_handler(touch_handler);

  return MGOS_APP_INIT_SUCCESS;
}
```

#### Screen calibration

The min_x_adc, max_x_adc, min_y_adc and max_y_adc should be set in the mos.yml
file in order to calibrate the display. This allows the pixel positions returned
to accurately represent the position the display was touched.
In order to calibrate the display run the example program and touch each edge
of the display.

When running the example application debug data is sent out on the serial port
when the display is touched.
E.G
```
[Jan  9 02:36:10.761] touch_handler        orientation=PORTRAIT
[Jan  9 02:36:10.766] touch_handler        Touch DOWN, down for 0.0 seconds
[Jan  9 02:36:10.772] touch_handler        pixels x/y = 0/4, adc x/y = 10/9
```

The above shows the top left corner of the display being touched. The
'adc x/y = 10/9' text contains the min X and Y values. The min_x_adc and
min_y_adc attributes in the example mos.yml should be set to the values found.

This should be repeated for the bottom right corner of the display using the
max_x_adc and max_y_adc values.
E.G
```
[Jan  9 02:36:15.110] touch_handler        orientation=PORTRAIT
[Jan  9 02:36:15.115] touch_handler        Touch DOWN, down for 0.3 seconds
[Jan  9 02:36:15.120] touch_handler        pixels x/y = 317/233, adc x/y = 120/115
```


# Testing

This driver has been tested with the following display

    http://www.lcdwiki.com/2.8inch_SPI_Module_ILI9341_SKU:MSP2807

in all four orientations using a modified version of the following project

    https://github.com/mongoose-os-apps/huzzah-featherwing


 ----- 
