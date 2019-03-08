# Timers
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_timers.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_timers.h) | [mgos_timers.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_timers.c)  | [api_timer.js](http://github.com/mongoose-os-libs/mjs/tree/master/fs/api_timer.js)         |


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
  LOG(LL_INFO, ("uptime: %.2lf", mgos_uptime()));
  (void) arg;
}

enum mgos_app_init_result mgos_app_init(void) {
  mgos_set_timer(1000, MGOS_TIMER_REPEAT, my_timer_cb, NULL);
  return MGOS_APP_INIT_SUCCESS;
}
```
 

 ----- 
#### (*timer_callback)

```c
typedef void (*timer_callback)(void *param);
```
>  Timer callback 
#### mgos_set_timer

```c
mgos_timer_id mgos_set_timer(int msecs, int flags, timer_callback cb,
                             void *cb_arg);
```
> 
> Setup a timer with `msecs` timeout and `cb` as a callback.
> 
> `flags` is a bitmask, currently there's only one flag available:
> `MGOS_TIMER_REPEAT` (see above). `arg` is a parameter to pass to `cb`.
> Return numeric timer ID.
> 
> Note that this is a software timer, with fairly low accuracy and high jitter.
> However, number of software timers is not limited.
> If you need intervals < 10ms, use mgos_set_hw_timer.
> 
> Example:
> ```c
> static void my_timer_cb(void *arg) {
>   bool val = mgos_gpio_toggle(mgos_sys_config_get_pins_led());
>   LOG(LL_INFO, ("uptime: %.2lf", mgos_uptime()));
>   (void) arg;
> }
> 
> enum mgos_app_init_result mgos_app_init(void) {
>   mgos_set_timer(1000, MGOS_TIMER_REPEAT, my_timer_cb, NULL);
>   return MGOS_APP_INIT_SUCCESS;
> }
> ```
>  
#### mgos_set_hw_timer

```c
mgos_timer_id mgos_set_hw_timer(int usecs, int flags, timer_callback cb,
                                void *cb_arg);
```
> 
> Setup a hardware timer with `usecs` timeout and `cb` as a callback.
> 
> This is similar to mgos_set_timer, but can be used for shorter intervals
> (note that time unit is microseconds).
> 
> Number of hardware timers is limited (ESP8266: 1, ESP32: 4, CC32xx: 4).
> 
> Callback is executed in ISR context, with all the implications of that.
>  
#### mgos_clear_timer

```c
void mgos_clear_timer(mgos_timer_id id);
```
> 
> Disable timer with a given timer ID.
>  
#### mgos_uptime

```c
double mgos_uptime(void);
```
>  Get number of seconds since last reboot 
#### mgos_strftime

```c
int mgos_strftime(char *s, int size, char *fmt, int time);
```
> 
> Format `time` according to a `strftime()`-conformant format.
> Write the result into the `s,size` buffer. Return resulting string length.
>  

### JS API

 --- 
#### Timer.set

```javascript
Timer.set(milliseconds, flags, handler, userdata)
```
Setup timer with `milliseconds` timeout and `handler` as a callback.
`flags` can be either 0 or `Timer.REPEAT`. In the latter case, the call
will be repeated indefinitely (but can be cancelled with `Timer.del()`),
otherwise it's a one-off.

Return value: numeric timer ID.

Example:
```javascript
// Call every second
Timer.set(1000, Timer.REPEAT, function() {
  let value = GPIO.toggle(2);
  print(value ? 'Tick' : 'Tock');
}, null);
```
#### Timer.now

```javascript
Timer.now()
```
Return current time as double value, UNIX epoch (seconds since 1970).
#### Timer.del

```javascript
Timer.del(id)
```
Cancel previously installed timer.
#### Timer.fmt

```javascript
Timer.fmt(fmt, time)
```
Formats the time 'time' according to the strftime-like format
specification 'fmt'. The strftime reference can be found e.g.
[here](http://www.cplusplus.com/reference/ctime/strftime/).
Example:
```javascript
let now = Timer.now();
let s = Timer.fmt("Now it's %I:%M%p.", now);
print(s); // Example output: "Now it's 12:01AM."
```
