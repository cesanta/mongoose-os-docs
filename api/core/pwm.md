# PWM
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/pwm](https://github.com/mongoose-os-libs/pwm) | [mgos_pwm.h](https://github.com/mongoose-os-libs/pwm/tree/master/include/mgos_pwm.h) | &nbsp;  | [api_pwm.js](https://github.com/mongoose-os-libs/pwm/tree/master/mjs_fs/api_pwm.js)         |

This library provides PWM ([pulse-width modulation](https://en.wikipedia.org/wiki/Pulse-width_modulation)) support for Mongoose OS.


 ----- 
#### mgos_pwm_set

```c
bool mgos_pwm_set(int pin, int freq, float duty);
```


 Set and control the PWM.

 Params:
 pin:    GPIO number.
 freq:   Frequency, in Hz. 0 disables PWM on the pin.
 duty:   Specifies which fraction of the cycle is spent in "1" state:
         0 is always off, 0.5 is a square wave, 1 is always on.
 Return:
 true - SUCCESS, false - FAIL.

 Note:
 On esp32 we use 8 channels and 4 timers.
 Each `mgos_set_pwm` call with new pin number assigns a new channel.
 If we already have timer running at the specified frequency,
 we use it instead of assigning a new one.
 

### JS API

 --- 
#### PWM.set

```javascript
PWM.set(pin, freq, duty)
```
Set and control the PWM. `pin` is a GPIO pin number, `freq` is
frequency, in Hz. `freq` 0 disables PWM on the pin. `duty` specifies
which fraction of the cycle is spent in "1" state: 0 is always off,
0.5 is a square wave, 1 is always on.
Return: true - success, false - failure.

Example:
```javascript
PWM.set(pin, 50, 2.73);
```
Note:
on ESP32 we use 8 channels and 4 timers.
Each `PWM.set()` call with new pin number assigns a new channel.
If we already have a timer running at the specified frequency,
we use it instead of assigning a new one.
