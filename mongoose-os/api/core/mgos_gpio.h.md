# GPIO
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_gpio.h](https://github.com/cesanta/mongoose-os/blob/master/include/mgos_gpio.h) | [mgos_gpio.c](https://github.com/cesanta/mongoose-os/blob/master/src/mgos_gpio.c)  | [api_gpio.js](https://github.com/mongoose-os-libs/mjs/blob/master/fs/api_gpio.js)         |

#### (*mgos_gpio_int_handler_f)

```c
typedef void (*mgos_gpio_int_handler_f)(int pin, void *arg);
```
>  GPIO interrupt handler signature. 
#### mgos_gpio_set_mode

```c
bool mgos_gpio_set_mode(int pin, enum mgos_gpio_mode mode);
```
>  Set mode - input or output. 
#### mgos_gpio_set_pull

```c
bool mgos_gpio_set_pull(int pin, enum mgos_gpio_pull_type pull);
```
>  Set pull-up or pull-down type. 
#### mgos_gpio_setup_input

```c
bool mgos_gpio_setup_input(int pin, enum mgos_gpio_pull_type pull);
```
>  Sets up a pin as an input and confiures pull-up or pull-down. 
#### mgos_gpio_setup_output

```c
bool mgos_gpio_setup_output(int pin, bool level);
```
> 
> Sets up pin output while avoiding spurious transitions:
> desired output level is configured first, then mode.
>  
#### mgos_gpio_read

```c
bool mgos_gpio_read(int pin);
```
>  Read pin input level. 
#### mgos_gpio_write

```c
void mgos_gpio_write(int pin, bool level);
```
>  Set pin's output level. 
#### mgos_gpio_toggle

```c
bool mgos_gpio_toggle(int pin);
```
>  Flip output pin value. Returns value that was written. 
#### mgos_gpio_read_out

```c
bool mgos_gpio_read_out(int pin);
```
>  Read the value of the output register. 
#### mgos_gpio_set_int_handler

```c
bool mgos_gpio_set_int_handler(int pin, enum mgos_gpio_int_mode mode,
                               mgos_gpio_int_handler_f cb, void *arg);
```
> 
> Install a GPIO interrupt handler.
> 
> This will invoke handler on the main task, which makes it possible to use
> any functions but may delay servicing of the interrupt. If lower latency
> is required, use `mgos_gpio_set_int_handler_isr`, but you'll need to
> understand the implications, which are platform-specific.
> 
> Interrupt is automatically cleared once upon triggering.
> Then it is disabled until the handler gets a chance to run, at which point
> it is re-enabled. At this point it may re-trigger immediately if the
> interrupt condition arose again while the handler was pending or running.
> Handler may use `mgos_gpio_clear_int` to explicitly clear the condition.
> 
> Note that this will not enable the interrupt, this must be done explicitly
> with `mgos_gpio_enable_int()`.
>  
#### mgos_gpio_set_int_handler_isr

```c
bool mgos_gpio_set_int_handler_isr(int pin, enum mgos_gpio_int_mode mode,
                                   mgos_gpio_int_handler_f cb, void *arg);
```
> 
> Same as mgos_gpio_set_int_handler but invokes handler in ISR context,
> without the overhead of a context switch. GPIO interrupts are disabled while
> the handler is running.
>  
#### mgos_gpio_enable_int

```c
bool mgos_gpio_enable_int(int pin);
```
>  Enable interrupt on the specified pin. 
#### mgos_gpio_disable_int

```c
bool mgos_gpio_disable_int(int pin);
```
>  Disables interrupt (without removing the handler). 
#### mgos_gpio_clear_int

```c
void mgos_gpio_clear_int(int pin);
```
>  Clears a GPIO interrupt flag. 
#### mgos_gpio_remove_int_handler

```c
void mgos_gpio_remove_int_handler(int pin, mgos_gpio_int_handler_f *old_cb,
                                  void **old_arg);
```
> 
> Removes a previosuly set interrupt handler.
> 
> If `cb` and `arg` are not NULL, they will contain previous handler and arg.
>  
#### mgos_gpio_set_button_handler

```c
bool mgos_gpio_set_button_handler(int pin, enum mgos_gpio_pull_type pull_type,
                                  enum mgos_gpio_int_mode int_mode,
                                  int debounce_ms, mgos_gpio_int_handler_f cb,
                                  void *arg);
```
> 
> Handle a button on the specified pin.
> 
> Configures the pin for input with specified pull-up and performs debouncing:
> upon first triggering user's callback is invoked immediately but further
> interrupts are inhibited for the following debounce_ms millseconds.
> 
> Typically 50 ms of debouncing time is sufficient.
> int_mode is one of the `MGOS_GPIO_INT_EDGE_*` values and will specify whether
> the handler triggers when button is pressed, released or both.
> Which is which depends on how the button is wired: if the normal state is
> pull-up (typical), then `MGOS_GPIO_INT_EDGE_NEG` is press and
> `_POS` is release.
> 
> Calling with `cb` = NULL will remove a previously installed handler.
> 
> Note: implicitly enables the interrupt.
>  
#### mgos_gpio_blink

```c
bool mgos_gpio_blink(int pin, int on_ms, int off_ms);
```
> 
> A utility function that takes care of blinking an LED.
> The pin must be configured as output first.
> On (output "1") and off ("0") times are specified in milliseconds.
> Set to (0, 0) to disable.
>  
#### mgos_gpio_str

```c
const char *mgos_gpio_str(int pin_def, char buf[8]);
```
>  String representation of pin number.
> Will return "PA5" or "PK3" for platforms that have port banks. 

### JS API

 --- 
#### GPIO.set_mode

```javascript
GPIO.set_mode(pin, mode)
```
Set GPIO pin mode.
`mode` can be either `GPIO.MODE_INPUT` or `GPIO.MODE_OUTPUT`.
#### GPIO.set_pull

```javascript
GPIO.set_pull(pin, pull_type)
```
Set GPIO pin pull type.
`pull_type` can be either `GPIO.PULL_NONE`, `GPIO.PULL_UP`, or
`GPIO.PULL_DOWN`.
#### GPIO.setup_input

```javascript
GPIO.setup_input(pin, pull_type)
```
Setup pin as input and configure pull type.
`pull_type` can be either `GPIO.PULL_NONE`, `GPIO.PULL_UP`, or
`GPIO.PULL_DOWN`.
#### GPIO.setup_output

```javascript
GPIO.setup_output(pin, level)
```
Setup pin as output and set initial level, 0 or 1.
Avoids spurious transitions: applies level first, then sets mode.
#### GPIO.toggle

```javascript
GPIO.toggle(pin)
```
Toggle the level of certain GPIO pin.
Return value: 0 or 1, indicating the resulting pin level.
#### GPIO.write

```javascript
GPIO.write(pin, level)
```
Set GPIO pin level to either 0 or 1. Return value: none.
#### GPIO.read

```javascript
GPIO.read(pin)
```
Read GPIO pin level. Return value: 0 or 1.
#### GPIO.enable_int

```javascript
GPIO.enable_int(pin)
```
Enable interrupts on GPIO pin.
This function must be called AFTER the interrupt handler is installed.
Return value: 1 in case of success, 0 otherwise.
#### GPIO.disable_int

```javascript
GPIO.disable_int(pin)
```
Disable interrupts on GPIO pin.
Return value: 1 in case of success, 0 otherwise.
#### GPIO.blink

```javascript
GPIO.blink(pin, on_ms, off_ms)
```
A utility function that takes care of blinking an LED.
The pin must be configured as output first.
On (output "1") and off ("0") times are specified in milliseconds.
Set to (0, 0) to disable.
Return value: 1 on success, 0 on failure.
#### GPIO.set_int_handler

```javascript
GPIO.set_int_handler(pin, mode, handler)
```
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
#### GPIO.set_button_handler

```javascript
GPIO.set_button_handler(pin, pull, intmode, period, handler)
```
Install
GPIO button handler. `pull` is pull type, `intmode` is interrupt mode,
`period` is debounce interval in milliseconds, handler is a function that
receives pin number.
Return value: 1 in case of success, 0 otherwise.
Example:
```javascript
GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200,
function(x) {
  print('Button press, pin: ', x);
}, null);
```
