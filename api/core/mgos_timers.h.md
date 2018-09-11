
# Timers

Mongoose OS supports two types of timers: software timers and hardware
timers.

- Software timers. Implemented as Mongoose library events, in software.
  Timer callback is called in a Mongoose task context. Frequency is
  specified in milliseconds. Number of software timers is not limited.
  Timer intervals cannot be short - limited by the underlying
  task scheduling. For example, if you want a very frequent sensor reading,
  like thousand readings a second, use hardware timer instead.
  Both C and JavaScript API is available.
- Hardware timers. Implemented in hardware. Timer callback is executed in
  the ISR context, therefore it can do a limited set of actions.
  Number of hardware timers is limied: (ESP8266: 1, ESP32: 4, CC32xx: 4).
  Frequency is specified in microseconds. Only C API is present, because
  calling to JS requires switching to Mongoose task context.

Usage example:
```c
#include "mgos_app.h"
#include "mgos_system.h"
#include "mgos_timers.h"

static void my_timer_cb(void *arg) {
  bool val = mgos_gpio_toggle(mgos_sys_config_get_pins_led());
  LOG(LL_INFO, ("uptime: %.2lf", mgos_uptime());
  (void) arg;
}

enum mgos_app_init_result mgos_app_init(void) {
  mgos_set_timer(1000, MGOS_TIMER_REPEAT, my_timer_cb, NULL);
  return MGOS_APP_INIT_SUCCESS;
}
```
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_timers.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_timers.h) | [mgos_timers.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_timers.c) |          |

#### C API reference
