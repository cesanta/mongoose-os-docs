
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

#### mgos_bitbang_write_bits

```c
void mgos_bitbang_write_bits(int gpio, enum mgos_delay_unit delay_unit, int t0h,
                             int t0l, int t1h, int t1l, const uint8_t *data,
                             size_t len);
```

Bit bang GPIO pin `gpio`. `len` bytes from `data` are sent to the specified
pin bit by bit. Sending each bit consists of a "high" and "low" phases,
length of which is determined by the specified timing parameters.

```
 +-----+
 |     |
-+     +-------

 tXh   tXl
```

`t0h` and `t0l` specify timings if the bit being transmitted is 0,
`t1h` and `t1l` specify the same for the case where the bit is 1.
If any of these is < 0, the corresponding phase is skipped.
 
#### mgos_bitbang_write_bits_js

```c
void mgos_bitbang_write_bits_js(int gpio, enum mgos_delay_unit delay_unit,
                                uint32_t t, const uint8_t *data, size_t len);
```

This function is a wrapper for `mgos_bitbang_write_bits()`.
It has smaller number of arguments (less than 6) and therefore could be
FFI-ed to JavaScript. Essentially, it just packs all time patterns
into a single value `t`.
 
