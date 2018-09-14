# GPIO
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_gpio.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_gpio.h) | [mgos_gpio.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_gpio.c)  | [api_gpio.js](http://github.com/mongoose-os-libs/mjs/tree/master/fs/api_gpio.js)         |

#### (*mgos_gpio_int_handler_f)

```c
typedef void (*mgos_gpio_int_handler_f)(int pin, void *arg);
```
<div class="apidescr">
 GPIO interrupt handler signature. 
</div>
#### mgos_gpio_set_mode

```c
bool mgos_gpio_set_mode(int pin, enum mgos_gpio_mode mode);
```
<div class="apidescr">
 Set mode - input or output. 
</div>
#### mgos_gpio_set_pull

```c
bool mgos_gpio_set_pull(int pin, enum mgos_gpio_pull_type pull);
```
<div class="apidescr">
 Set pull-up or pull-down type. 
</div>
#### mgos_gpio_read

```c
bool mgos_gpio_read(int pin);
```
<div class="apidescr">
 Read pin input level. 
</div>
#### mgos_gpio_write

```c
void mgos_gpio_write(int pin, bool level);
```
<div class="apidescr">
 Set pin's output level. 
</div>
#### mgos_gpio_toggle

```c
bool mgos_gpio_toggle(int pin);
```
<div class="apidescr">
 Flip output pin value. Returns value that was written. 
</div>
#### mgos_gpio_read_out

```c
bool mgos_gpio_read_out(int pin);
```
<div class="apidescr">
 Read the value of the output register. 
</div>
#### mgos_gpio_set_int_handler

```c
bool mgos_gpio_set_int_handler(int pin, enum mgos_gpio_int_mode mode,
                               mgos_gpio_int_handler_f cb, void *arg);
```
<div class="apidescr">

Install a GPIO interrupt handler.

This will invoke handler on the main task, which makes it possible to use
any functions but may delay servicing of the interrupt. If lower latency
is required, use `mgos_gpio_set_int_handler_isr`, but you'll need to
understand the implications, which are platform-specific.

Note that this will not enable the interrupt, this must be done explicitly
with `mgos_gpio_enable_int()`.
 
</div>
#### mgos_gpio_set_int_handler_isr

```c
bool mgos_gpio_set_int_handler_isr(int pin, enum mgos_gpio_int_mode mode,
                                   mgos_gpio_int_handler_f cb, void *arg);
```
<div class="apidescr">

Same as mgos_gpio_set_int_handler but invokes handler in ISR context,
without the overhead of a context switch. GPIO interrupts are disabled while
the handler is running.
 
</div>
#### mgos_gpio_enable_int

```c
bool mgos_gpio_enable_int(int pin);
```
<div class="apidescr">
 Enable interrupt on the specified pin. 
</div>
#### mgos_gpio_disable_int

```c
bool mgos_gpio_disable_int(int pin);
```
<div class="apidescr">
 Disables interrupt (without removing the handler). 
</div>
#### mgos_gpio_remove_int_handler

```c
void mgos_gpio_remove_int_handler(int pin, mgos_gpio_int_handler_f *old_cb,
                                  void **old_arg);
```
<div class="apidescr">

Removes a previosuly set interrupt handler.

If `cb` and `arg` are not NULL, they will contain previous handler and arg.
 
</div>
#### mgos_gpio_set_button_handler

```c
bool mgos_gpio_set_button_handler(int pin, enum mgos_gpio_pull_type pull_type,
                                  enum mgos_gpio_int_mode int_mode,
                                  int debounce_ms, mgos_gpio_int_handler_f cb,
                                  void *arg);
```
<div class="apidescr">

Handle a button on the specified pin.

Configures the pin for input with specified pull-up and performs debouncing:
upon first triggering user's callback is invoked immediately but further
interrupts are inhibited for the following debounce_ms millseconds.

Typically 50 ms of debouncing time is sufficient.
int_mode is one of the `MGOS_GPIO_INT_EDGE_*` values and will specify whether
the handler triggers when button is pressed, released or both.
Which is which depends on how the button is wired: if the normal state is
pull-up (typical), then `MGOS_GPIO_INT_EDGE_NEG` is press and
`_POS` is release.

Calling with `cb` = NULL will remove a previously installed handler.

Note: implicitly enables the interrupt.
 
</div>
#### mgos_gpio_str

```c
const char *mgos_gpio_str(int pin_def, char buf[8]);
```
<div class="apidescr">
 String representation of pin number.
Will return "PA5" or "PK3" for platforms that have port banks. 
</div>

### JS API

 --- 
#### GPIO.set_mode

```javascript
GPIO.set_mode(pin, mode)
```
<div class="apidescr">
Set GPIO pin mode.
`mode` can be either `GPIO.MODE_INPUT` or `GPIO.MODE_OUTPUT`.
</div>
#### GPIO.set_pull

```javascript
GPIO.set_pull(pin, type)
```
<div class="apidescr">
Set GPIO pin pull type.
`type` can be either `GPIO.PULL_NONE`, `GPIO.PULL_UP`, or `GPIO.PULL_DOWN`.
</div>
#### GPIO.toggle

```javascript
GPIO.toggle(pin)
```
<div class="apidescr">
Toggle the level of certain GPIO pin.
Return value: 0 or 1, indicating the resulting pin level.
</div>
#### GPIO.write

```javascript
GPIO.write(pin, level)
```
<div class="apidescr">
Set GPIO pin level to either 0 or 1. Return value: none.
</div>
#### GPIO.read

```javascript
GPIO.read(pin)
```
<div class="apidescr">
Read GPIO pin level. Return value: 0 or 1.
</div>
#### GPIO.enable_int

```javascript
GPIO.enable_int(pin)
```
<div class="apidescr">
Enable interrupts on GPIO pin.
This function must be called AFTER the interrupt handler is installed.
Return value: 1 in case of success, 0 otherwise.
</div>
#### GPIO.disable_int

```javascript
GPIO.disable_int(pin)
```
<div class="apidescr">
Disable interrupts on GPIO pin.
Return value: 1 in case of success, 0 otherwise.
</div>
#### GPIO.set_int_handler

```javascript
GPIO.set_int_handler(pin, mode, handler)
```
<div class="apidescr">
Install GPIO interrupt handler. `mode` could be one of: `GPIO.INT_NONE`,
`GPIO.INT_EDGE_POS`, `GPIO.INT_EDGE_NEG`, `GPIO.INT_EDGE_ANY`,
`GPIO.INT_LEVEL_HI`, `GPIO.INT_LEVEL_LO`.
Return value: 1 in case of success, 0 otherwise.
Example:
```javascript
GPIO.set_mode(pin, GPIO.MODE_INPUT);
GPIO.set_int_handler(pin, GPIO.INT_EDGE_NEG, function(pin) {
   print('Pin', pin, 'got interrupt');
}, null);
GPIO.enable_int(pin);
```
</div>
#### GPIO.set_button_handler

```javascript
GPIO.set_button_handler(pin, pull, intmode, period, handler)
```
<div class="apidescr">
Install
GPIO button handler. `pull` is pull type, `intmode` is interrupt mode,
`period` is debounce interval in milliseconds, handler is a function that
receives pin number.
Return value: 1 in case of success, 0 otherwise.
Example:
```javascript
GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function(x) {
  print('Button press, pin: ', x);
}, null);
```
</div>
