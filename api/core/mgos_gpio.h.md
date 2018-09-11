
# GPIO

For general information about GPIO, see
[article](https://en.wikipedia.org/wiki/General-purpose_input/output).
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_gpio.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_gpio.h) | [mgos_gpio.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_gpio.c) |          |

#### (*mgos_gpio_int_handler_f)

```c
typedef void (*mgos_gpio_int_handler_f)(int pin, void *arg);
```
 GPIO interrupt handler signature. 
#### mgos_gpio_set_mode

```c
bool mgos_gpio_set_mode(int pin, enum mgos_gpio_mode mode);
```
 Set mode - input or output. 
#### mgos_gpio_set_pull

```c
bool mgos_gpio_set_pull(int pin, enum mgos_gpio_pull_type pull);
```
 Set pull-up or pull-down type. 
#### mgos_gpio_read

```c
bool mgos_gpio_read(int pin);
```
 Read pin input level. 
#### mgos_gpio_write

```c
void mgos_gpio_write(int pin, bool level);
```
 Set pin's output level. 
#### mgos_gpio_toggle

```c
bool mgos_gpio_toggle(int pin);
```
 Flip output pin value. Returns value that was written. 
#### mgos_gpio_read_out

```c
bool mgos_gpio_read_out(int pin);
```
 Read the value of the output register. 
#### mgos_gpio_set_int_handler

```c
bool mgos_gpio_set_int_handler(int pin, enum mgos_gpio_int_mode mode,
                               mgos_gpio_int_handler_f cb, void *arg);
```

Install a GPIO interrupt handler.

This will invoke handler on the main task, which makes it possible to use
any functions but may delay servicing of the interrupt. If lower latency
is required, use `mgos_gpio_set_int_handler_isr`, but you'll need to
understand the implications, which are platform-specific.

Note that this will not enable the interrupt, this must be done explicitly
with `mgos_gpio_enable_int()`.
 
#### mgos_gpio_set_int_handler_isr

```c
bool mgos_gpio_set_int_handler_isr(int pin, enum mgos_gpio_int_mode mode,
                                   mgos_gpio_int_handler_f cb, void *arg);
```

Same as mgos_gpio_set_int_handler but invokes handler in ISR context,
without the overhead of a context switch. GPIO interrupts are disabled while
the handler is running.
 
#### mgos_gpio_enable_int

```c
bool mgos_gpio_enable_int(int pin);
```
 Enable interrupt on the specified pin. 
#### mgos_gpio_disable_int

```c
bool mgos_gpio_disable_int(int pin);
```
 Disables interrupt (without removing the handler). 
#### mgos_gpio_remove_int_handler

```c
void mgos_gpio_remove_int_handler(int pin, mgos_gpio_int_handler_f *old_cb,
                                  void **old_arg);
```

Removes a previosuly set interrupt handler.

If `cb` and `arg` are not NULL, they will contain previous handler and arg.
 
#### mgos_gpio_set_button_handler

```c
bool mgos_gpio_set_button_handler(int pin, enum mgos_gpio_pull_type pull_type,
                                  enum mgos_gpio_int_mode int_mode,
                                  int debounce_ms, mgos_gpio_int_handler_f cb,
                                  void *arg);
```

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
 
#### mgos_gpio_str

```c
const char *mgos_gpio_str(int pin_def, char buf[8]);
```
 String representation of pin number.
Will return "PA5" or "PK3" for platforms that have port banks. 
