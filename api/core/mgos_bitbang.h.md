
# Bitbang

Bit banging is a technique to implement hardware protocols fully in
software, by managing microcontroller pin states - including timing,
voltage levels, etc.
See [wikipedia article](https://en.wikipedia.org/wiki/Bit_banging) for
a detailed information.

Usage example:
```c
#include "mgos_bitbang.h"
#include "mgos_gpio.h"
#include "mgos_system.h"

void mgos_neopixel_show(struct mgos_neopixel *np) {
  mgos_gpio_write(np->pin, 0);
  mgos_usleep(60);
  mgos_bitbang_write_bits(np->pin, MGOS_DELAY_100NSEC, 3, 8, 8, 6, np->data,
                          np->num_pixels * NUM_CHANNELS);
  mgos_gpio_write(np->pin, 0);
  mgos_usleep(60);
  mgos_gpio_write(np->pin, 1);
}
```
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_bitbang.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_bitbang.h) | [mgos_bitbang.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_bitbang.c) |          |

#### C API reference
