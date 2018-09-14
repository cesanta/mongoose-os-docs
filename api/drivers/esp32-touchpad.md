# ESP32 touch sensor
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/esp32-touchpad](https://github.com/mongoose-os-libs/esp32-touchpad) | [](https://github.com/mongoose-os-libs/esp32-touchpad/tree/master/include/) | &nbsp;  | [api_esp32_touchpad.js](https://github.com/mongoose-os-libs/esp32-touchpad/tree/master/mjs_fs/api_esp32_touchpad.js)         |



## Overview

This library provides JavaScript bindings for the ESP32 touch pad sensor.
The JS API largely mirrors the [C API](https://github.com/espressif/esp-idf/blob/master/components/driver/include/driver/touch_pad.h).

## Examples

### Polling the sensor manually

```js
load('api_esp32_touchpad.js');

// Touch sensors are numbered from 0 to 9.
// For convenience, TouchPad.GPIO map translates from GPIO number to sensor number.
let ts = TouchPad.GPIO[15];

TouchPad.init();
TouchPad.setVoltage(TouchPad.HVOLT_2V4, TouchPad.LVOLT_0V8, TouchPad.HVOLT_ATTEN_1V5);
TouchPad.config(ts, 0);
Timer.set(1000 /* 1 sec */, Timer.REPEAT, function() {
  let tv = TouchPad.read(ts);
  print('Sensor', ts, 'value', tv);
}, null);

```

### Using interrupts

```js
load('api_esp32_touchpad.js');

// Touch sensors are numbered from 0 to 9.
// For convenience, TouchPad.GPIO map translates from GPIO number to sensor number.
let ts = TouchPad.GPIO[15];

TouchPad.init();
TouchPad.filterStart(10);
TouchPad.setMeasTime(0x1000, 0xffff);
TouchPad.setVoltage(TouchPad.HVOLT_2V4, TouchPad.LVOLT_0V8, TouchPad.HVOLT_ATTEN_1V5);
TouchPad.config(ts, 0);
Sys.usleep(100000); // wait a bit for initial filtering.
let noTouchVal = TouchPad.readFiltered(ts);
let touchThresh = noTouchVal * 2 / 3;
print('Sensor', ts, 'noTouchVal', noTouchVal, 'touchThresh', touchThresh);
TouchPad.setThresh(ts, touchThresh);
TouchPad.isrRegister(function(st) {
  // st is a bitmap with 1 bit per sensor.
  let val = TouchPad.readFiltered(ts);
  print('Status:', st, 'Value:', val);
}, null);
TouchPad.intrEnable();
```


 ----- 

### JS API

 --- 
#### TouchPad.GPIO

```javascript
TouchPad.GPIO
```
<div class="apidescr">
Handy map of GPIO to touch sensor number. Touch sensor number is a number
from 0 to 9.
</div>
#### TouchPad.init

```javascript
TouchPad.init()
```
<div class="apidescr">
Initialize touch pad module.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.deinit

```javascript
TouchPad.deinit()
```
<div class="apidescr">
Uninstall touch pad driver.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.config

```javascript
TouchPad.config(touch_num, threshold)
```
<div class="apidescr">
Configure touch pad interrupt threshold.
`touch_num` is a touchpad index (a number from 0 to 9), `threshold` is an interrupt threshold
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.read

```javascript
TouchPad.read(touch_num)
```
<div class="apidescr">
Return touch sensor counter value or -1 in case of a failure. `touch_num`
is a touchpad index (a number from 0 to 9)

Each touch sensor has a counter to count the number of charge/discharge
cycles.  When the pad is not 'touched', we can get a number of the
counter.  When the pad is 'touched', the value in counter will get smaller
because of the larger equivalent capacitance.  User can use this function
to determine the interrupt trigger threshold.
</div>
#### TouchPad.readFiltered

```javascript
TouchPad.readFiltered(touch_num)
```
<div class="apidescr">
Get filtered touch sensor counter value by IIR filter, or -1 in case of a
failure. NOTE: `TouchPad.filterStart()` has to be called before this
function.  `touch_num` is a touchpad index (a number from 0 to 9).
</div>
#### TouchPad.isrRegister

```javascript
TouchPad.isrRegister(handler, userdata)
```
<div class="apidescr">
Register touchpad ISR. The handler will be attached to the same CPU core
that this function is running on. Handler is a function like
`function(status, userdata){ /* ... */ }`, `status` is a number
representing which pads are "touched".
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.isrDeregister

```javascript
TouchPad.isrDeregister()
```
<div class="apidescr">
Deregister touchpad ISR previously registered with
`TouchPad.isrRegister()`.  Return value: 0 in case of success, non-zero
otherwise.
</div>
#### TouchPad.intrEnable

```javascript
TouchPad.intrEnable()
```
<div class="apidescr">
Enable touchpad interrupt. Return value: 0.
</div>
#### TouchPad.intrDisable

```javascript
TouchPad.intrDisable()
```
<div class="apidescr">
Disable touchpad interrupt. Return value: 0.
</div>
#### TouchPad.setMeasTime

```javascript
TouchPad.setMeasTime(sleep_cycle, meas_cycle)
```
<div class="apidescr">
Set touch sensor measurement and sleep time.
The touch sensor will sleep after each measurement.  `sleep_cycle` determines
the interval between each measurement:  `t_sleep = sleep_cycle / (RTC_SLOW_CLK frequency)`.
`meas_cycle` is the duration of the touch sensor measurement.
`t_meas = meas_cycle / 8M`, the maximum measure time is `0xffff / 8M = 8.19 ms`
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getMeasTimeSleepCycle

```javascript
TouchPad.getMeasTimeSleepCycle()
```
<div class="apidescr">
Return sleep cycle (previously set with `TouchPad.setMeasTime()`), or -1 in
case of a failure.
</div>
#### TouchPad.getMeasTimeMeasCycle

```javascript
TouchPad.getMeasTimeMeasCycle()
```
<div class="apidescr">
Return duration of the touch sensor measurement (previously set with
`TouchPad.setMeasTime()`), or -1 in case of a failure.
</div>
#### TouchPad.setVoltage

```javascript
TouchPad.setVoltage(refh, refl, atten)
```
<div class="apidescr">
Set touch sensor reference voltage, if the voltage gap between high and
low reference voltage get less, the charging and discharging time would be
faster; accordingly, the counter value would be larger.  In the case of
detecting very slight change of capacitance, we can narrow down the gap so
as to increase the sensitivity. On the other hand, narrow voltage gap
would also introduce more noise, but we can use a software filter to
pre-process the counter value.

`refh` is the value of `DREFH`, one of the following:
- `TouchPad.HVOLT_KEEP`
- `TouchPad.HVOLT_2V4`
- `TouchPad.HVOLT_2V5`
- `TouchPad.HVOLT_2V6`
- `TouchPad.HVOLT_2V7`

`refl` is the value os `DREFL`, one of the following:
- `TouchPad.LVOLT_KEEP`
- `TouchPad.LVOLT_0V5`
- `TouchPad.LVOLT_0V6`
- `TouchPad.LVOLT_0V7`
- `TouchPad.LVOLT_0V8`

`atten` is the attenuation of `DREFH`, one of the following:
- `TouchPad.HVOLT_ATTEN_KEEP`
- `TouchPad.HVOLT_ATTEN_1V5`
- `TouchPad.HVOLT_ATTEN_1V`
- `TouchPad.HVOLT_ATTEN_0V5`
- `TouchPad.HVOLT_ATTEN_0V`

Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getVoltageRefH

```javascript
TouchPad.getVoltageRefH()
```
<div class="apidescr">
Get touch sensor reference voltage `refh` (previously set with
`TouchPad.setVoltage()`), or -1 in case of a failure.
</div>
#### TouchPad.getVoltageRefL

```javascript
TouchPad.getVoltageRefL()
```
<div class="apidescr">
Get touch sensor reference voltage `refl` (previously set with
`TouchPad.setVoltage()`), or -1 in case of a failure.
</div>
#### TouchPad.getVoltageAtten

```javascript
TouchPad.getVoltageAtten()
```
<div class="apidescr">
Get touch sensor attenuation of `DREFH` (previously set with
`TouchPad.setVoltage()`), or -1 in case of a failure.
</div>
#### TouchPad.setCntMode

```javascript
TouchPad.setCntMode(touch_num, slope, opt)
```
<div class="apidescr">
Set touch sensor charge/discharge speed for each pad.

`touch_num` is a touchpad index (a number from 0 to 9), `slope` is a
charge/discharge speed, `opt` is the initial voltage, one of the following:
- `TouchPad.PAD_TIE_OPT_LOW`
- `TouchPad.PAD_TIE_OPT_HIGH`

If `slope` is 0, the counter would always be zero.
If `slope` is 1, the charging and discharging would be slow, accordingly,
the counter value would be small.
If `slope` is set 7, which is the maximum value, the charging and
discharging would be fast, accordingly, the counter value would be larger.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getCntModeSlope

```javascript
TouchPad.getCntModeSlope(touch_num)
```
<div class="apidescr">
Get "slope": a charge/discharge speed previously set with
`TouchPad.setCntMode()`, or -1 in case of a failure.
</div>
#### TouchPad.getCntModeOpt

```javascript
TouchPad.getCntModeOpt(touch_num)
```
<div class="apidescr">
Get initial voltage previously set with `TouchPad.setCntMode()`, or -1 in
case of a failure.
`touch_num` is a touchpad index (a number from 0 to 9).
</div>
#### TouchPad.ioInit

```javascript
TouchPad.ioInit(touch_num)
```
<div class="apidescr">
Initialize touch pad GPIO.
`touch_num` is a touchpad index (a number from 0 to 9).
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.setFSMMode

```javascript
TouchPad.setFSMMode(mode)
```
<div class="apidescr">
Set touch sensor FSM mode, the test action can be triggered by the timer,
as well as by the software. `mode` can be one of the following:
- `TouchPad.FSM_MODE_TIMER`
- `TouchPad.FSM_MODE_SW`
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getFSMMode

```javascript
TouchPad.getFSMMode()
```
<div class="apidescr">
Get FSM mode previously set with `TouchPad.setFSMMode()`, or -1 in case of
a failure.
</div>
#### TouchPad.swStart

```javascript
TouchPad.swStart()
```
<div class="apidescr">
Trigger a touch sensor measurement, only support in `FSM_MODE_SW` mode of
FSM.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.setThresh

```javascript
TouchPad.setThresh(touch_num, threshold)
```
<div class="apidescr">
Set touch sensor interrupt threshold.
`touch_num` is a touchpad index (a number from 0 to 9), `threshold` is a
threshold of touchpad count; refer to `TouchPad.setTriggerMode()` to see
how to set trigger mode.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getThresh

```javascript
TouchPad.getThresh(touch_num)
```
<div class="apidescr">
Get touch sensor interrupt threshold previously set with
`TouchPad.setThresh()`, or -1 in case of a failure.
`touch_num` is a touchpad index (a number from 0 to 9).
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.setTriggerMode

```javascript
TouchPad.setTriggerMode(mode)
```
<div class="apidescr">
Set touch sensor interrupt trigger mode, one of the following:
- `TouchPad.TRIGGER_BELOW`
- `TouchPad.TRIGGER_ABOVE`

Interrupt can be triggered either when counter result is less than
threshold, or when counter result is more than threshold.

Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getTriggerMode

```javascript
TouchPad.getTriggerMode()
```
<div class="apidescr">
Get touch sensor interrupt trigger mode previously set with
`TouchPad.setTriggerMode()`, or -1 in case of a failure.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.setTriggerSource

```javascript
TouchPad.setTriggerSource(src)
```
<div class="apidescr">
Set touch sensor interrupt trigger source `src`, one of the following:
- `TouchPad.TRIGGER_SOURCE_BOTH`
- `TouchPad.TRIGGER_SOURCE_SET1`

There are two sets of touch signals.  Set1 and set2 can be mapped to
several touch signals. Either set will be triggered if at least one of its
touch signal is 'touched'. The interrupt can be configured to be generated
if set1 is triggered, or only if both sets are triggered.

Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getTriggerSource

```javascript
TouchPad.getTriggerSource()
```
<div class="apidescr">
Get touch sensor interrupt trigger source previously set with
`TouchPad.setTriggerSource()`, or -1 in case of a failure.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.setGroupMask

```javascript
TouchPad.setGroupMask(set1_mask, set2_mask, en_mask)
```
<div class="apidescr">
Set touch sensor group mask.  Touch pad module has two sets of signals,
'Touched' signal is triggered only if at least one of touch pad in this
group is "touched".  This function will set the register bits according to
the given bitmask.

`set1_mask` is a bitmask of touch sensor signal group1, it's a 10-bit value.
`set2_mask` is a bitmask of touch sensor signal group2, it's a 10-bit value.
`en_mask` is a bitmask of touch sensor work enable, it's a 10-bit value.

Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getGroupMaskSet1

```javascript
TouchPad.getGroupMaskSet1()
```
<div class="apidescr">
Get set1 mask previously set with `TouchPad.setGroupMask()`, or -1 in case
of a failure.
</div>
#### TouchPad.getGroupMaskSet2

```javascript
TouchPad.getGroupMaskSet2()
```
<div class="apidescr">
Get set2 mask previously set with `TouchPad.setGroupMask()`, or -1 in case
of a failure.
</div>
#### TouchPad.getGroupMaskEn

```javascript
TouchPad.getGroupMaskEn()
```
<div class="apidescr">
Get mask of enabled sensors previously set with `TouchPad.setGroupMask()`,
or -1 in case of a failure.
</div>
#### TouchPad.clearStatus

```javascript
TouchPad.clearStatus()
```
<div class="apidescr">
Clear touch status register.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getStatus

```javascript
TouchPad.getStatus()
```
<div class="apidescr">
Return status: a number representing which pads are "touched".
</div>
#### TouchPad.setFilterPeriod

```javascript
TouchPad.setFilterPeriod(period_ms)
```
<div class="apidescr">
Set touch pad filter calibration period, in ms.  Need to call
`TouchPad.filterStart()` before all touch filter APIs.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.getFilterPeriod

```javascript
TouchPad.getFilterPeriod(period_ms)
```
<div class="apidescr">
Get touch pad filter calibration period in ms previously set with
`TouchPad.setFilterPeriod()`, or -1 in case of a failure.
</div>
#### TouchPad.filterStart

```javascript
TouchPad.filterStart(filter_period_ms)
```
<div class="apidescr">
Start a filter to process the noise in order to prevent false triggering
when detecting slight change of capacitance. This function must be called
before any other filter API functions.

If filter is not initialized, this function will initialize the filter
with given period.  If filter is already initialized, it will update the
filter period.

Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.filterStop

```javascript
TouchPad.filterStop()
```
<div class="apidescr">
Stop touch pad filter, started before with `TouchPad.filterStart()`.
Return value: 0 in case of success, non-zero otherwise.
</div>
#### TouchPad.filterDelete

```javascript
TouchPad.filterDelete()
```
<div class="apidescr">
Delete touch pad filter driver (activated before with
`TouchPad.filterStart()`) and release the memory.
Return value: 0 in case of success, non-zero otherwise.
</div>
