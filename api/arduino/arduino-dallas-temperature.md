# Dallas Temperature
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-dallas-temperature](https://github.com/mongoose-os-libs/arduino-dallas-temperature) | [DallasTemperature.h](https://github.com/mongoose-os-libs/arduino-dallas-temperature/tree/master/include/DallasTemperature.h) | &nbsp;  | [api_arduino_dallas_temp.js](https://github.com/mongoose-os-libs/arduino-dallas-temperature/tree/master/mjs_fs/api_arduino_dallas_temp.js)         |




 ----- 
#### begin

```c
void begin(void);
```
<div class="apidescr">
initialise bus
</div>
#### getDeviceCount

```c
uint8_t getDeviceCount(void);
```
<div class="apidescr">
returns the number of devices found on the bus
</div>
#### validAddress

```c
bool validAddress(const uint8_t*);
```
<div class="apidescr">
returns true if address is valid
</div>
#### validFamily

```c
bool validFamily(const uint8_t* deviceAddress);
```
<div class="apidescr">
returns true if address is of the family of sensors the lib supports.
</div>
#### getAddress

```c
bool getAddress(uint8_t*, uint8_t);
```
<div class="apidescr">
finds an address at a given index on the bus
</div>
#### isConnected

```c
bool isConnected(const uint8_t*);
```
<div class="apidescr">
attempt to determine if the device at the given address is connected to the bus
</div>
#### isConnected

```c
bool isConnected(const uint8_t*, uint8_t*);
```
<div class="apidescr">
attempt to determine if the device at the given address is connected to the bus
also allows for updating the read scratchpad
</div>
#### readScratchPad

```c
bool readScratchPad(const uint8_t*, uint8_t*);
```
<div class="apidescr">
read device's scratchpad
</div>
#### writeScratchPad

```c
void writeScratchPad(const uint8_t*, const uint8_t*);
```
<div class="apidescr">
write device's scratchpad
</div>
#### readPowerSupply

```c
bool readPowerSupply(const uint8_t*);
```
<div class="apidescr">
read device's power requirements
</div>
#### getResolution

```c
uint8_t getResolution();
```
<div class="apidescr">
get global resolution
</div>
#### setResolution

```c
void setResolution(uint8_t);
```
<div class="apidescr">
set global resolution to 9, 10, 11, or 12 bits
</div>
#### getResolution

```c
uint8_t getResolution(const uint8_t*);
```
<div class="apidescr">
returns the device resolution: 9, 10, 11, or 12 bits
</div>
#### setResolution

```c
bool setResolution(const uint8_t*, uint8_t, bool skipGlobalBitResolutionCalculation = false);
```
<div class="apidescr">
set resolution of a device to 9, 10, 11, or 12 bits
</div>
#### setWaitForConversion

```c
void setWaitForConversion(bool);
    bool getWaitForConversion(void);
```
<div class="apidescr">
sets/gets the waitForConversion flag
</div>
#### setCheckForConversion

```c
void setCheckForConversion(bool);
    bool getCheckForConversion(void);
```
<div class="apidescr">
sets/gets the checkForConversion flag
</div>
#### requestTemperatures

```c
void requestTemperatures(void);
```
<div class="apidescr">
sends command for all devices on the bus to perform a temperature conversion
</div>
#### requestTemperaturesByAddress

```c
bool requestTemperaturesByAddress(const uint8_t*);
```
<div class="apidescr">
sends command for one device to perform a temperature conversion by address
</div>
#### requestTemperaturesByIndex

```c
bool requestTemperaturesByIndex(uint8_t);
```
<div class="apidescr">
sends command for one device to perform a temperature conversion by index
</div>
#### getTemp

```c
int16_t getTemp(const uint8_t*);
```
<div class="apidescr">
returns temperature raw value (12 bit integer of 1/128 degrees C)
</div>
#### getTempC

```c
float getTempC(const uint8_t*);
```
<div class="apidescr">
returns temperature in degrees C
</div>
#### getTempF

```c
float getTempF(const uint8_t*);
```
<div class="apidescr">
returns temperature in degrees F
</div>
#### getTempCByIndex

```c
float getTempCByIndex(uint8_t);
```
<div class="apidescr">
Get temperature for device index (slow)
</div>
#### getTempFByIndex

```c
float getTempFByIndex(uint8_t);
```
<div class="apidescr">
Get temperature for device index (slow)
</div>
#### isParasitePowerMode

```c
bool isParasitePowerMode(void);
```
<div class="apidescr">
returns true if the bus requires parasite power
</div>
#### isConversionComplete

```c
bool isConversionComplete(void);
```
<div class="apidescr">
Is a conversion complete on the wire?
</div>
#### setHighAlarmTemp

```c
void setHighAlarmTemp(const uint8_t*, char);
```
<div class="apidescr">
sets the high alarm temperature for a device
accepts a char.  valid range is -55C - 125C
</div>
#### setLowAlarmTemp

```c
void setLowAlarmTemp(const uint8_t*, char);
```
<div class="apidescr">
sets the low alarm temperature for a device
accepts a char.  valid range is -55C - 125C
</div>
#### getHighAlarmTemp

```c
char getHighAlarmTemp(const uint8_t*);
```
<div class="apidescr">
returns a signed char with the current high alarm temperature for a device
in the range -55C - 125C
</div>
#### getLowAlarmTemp

```c
char getLowAlarmTemp(const uint8_t*);
```
<div class="apidescr">
returns a signed char with the current low alarm temperature for a device
in the range -55C - 125C
</div>
#### resetAlarmSearch

```c
void resetAlarmSearch(void);
```
<div class="apidescr">
resets internal variables used for the alarm search
</div>
#### alarmSearch

```c
bool alarmSearch(uint8_t*);
```
<div class="apidescr">
search the wire for devices with active alarms
</div>
#### hasAlarm

```c
bool hasAlarm(const uint8_t*);
```
<div class="apidescr">
returns true if ia specific device has an alarm
</div>
#### hasAlarm

```c
bool hasAlarm(void);
```
<div class="apidescr">
returns true if any device is reporting an alarm on the bus
</div>
#### processAlarms

```c
void processAlarms(void);
```
<div class="apidescr">
runs the alarm handler for all devices returned by alarmSearch()
</div>
#### setAlarmHandler

```c
void setAlarmHandler(const AlarmHandler *);
```
<div class="apidescr">
sets the alarm handler
</div>
#### defaultAlarmHandler

```c
static void defaultAlarmHandler(const uint8_t*);
```
<div class="apidescr">
The default alarm handler
</div>
#### setUserData

```c
void setUserData(const uint8_t*, int16_t );
    void setUserDataByIndex(uint8_t, int16_t );
    int16_t getUserData(const uint8_t* );
    int16_t getUserDataByIndex(uint8_t );
```
<div class="apidescr">
if no alarm handler is used the two bytes can be used as user data
example of such usage is an ID.
note if device is not connected it will fail writing the data.
note if address cannot be found no error will be reported.
in short use carefully
</div>
#### toFahrenheit

```c
static float toFahrenheit(float);
```
<div class="apidescr">
convert from Celsius to Fahrenheit
</div>
#### toCelsius

```c
static float toCelsius(float);
```
<div class="apidescr">
convert from Fahrenheit to Celsius
</div>
#### rawToCelsius

```c
static float rawToCelsius(int16_t);
```
<div class="apidescr">
convert from raw to Celsius
</div>
#### rawToFahrenheit

```c
static float rawToFahrenheit(int16_t);
```
<div class="apidescr">
convert from raw to Fahrenheit
</div>
#### delete

```c
void operator delete(void*);
```
<div class="apidescr">
delete memory reference
</div>
#### calculateTemperature

```c
int16_t calculateTemperature(const uint8_t*, uint8_t*);
```
<div class="apidescr">
reads scratchpad and returns the raw temperature
</div>

### JS API

 --- 
#### DallasTemperature.create

```javascript
DallasTemperature.create(ow)
```
<div class="apidescr">
Create and return an instance of the dallas temperature: an object with
methods described below. `ow` is an OneWire instance.

Example:
```javascript
let ow = OneWire(12 /* onewire pin number */);
let myDT = DallasTemperature.create(ow);
```
</div>
#### myDT.close

```javascript
myDT.close()
```
<div class="apidescr">
Close DallasTemperature handle. Return value: none.
</div>
#### myDT.begin

```javascript
myDT.begin()
```
<div class="apidescr">
Initialise the sensor. Return value: none.
</div>
#### myDT.getDeviceCount

```javascript
myDT.getDeviceCount()
```
<div class="apidescr">
Return the number of devices found on the bus.
If an operaiton is failed, 0 is returned.
</div>
#### myDT.validAddress

```javascript
myDT.validAddress(addr)
```
<div class="apidescr">
Check if given onewire `addr` (8-byte string) is valid; returns 1 if it
is, or 0 otherwise.
</div>
#### myDT.validFamily

```javascript
myDT.validFamily(addr)
```
<div class="apidescr">
Return 1 if onewire address `addr` (8-byte string) is of the family of
sensors the lib supports.  Return always 0 if an operaiton failed.
</div>
#### myDT.getAddress

```javascript
myDT.getAddress(addr, idx)
```
<div class="apidescr">
Find an onewire address at a given index `idx` on the bus. Resulting
address is written into the provided string buffer `addr`, which should
be 8 bytes lont.
Return value: 1 in case of success, 0 otherwise.
Example:
```javascript
load("api_sys.js");
load("api_arduino_dallas_temp.js");

let addr = Sys._sbuf(8);
let res = myDT.getAddress(addr, 0);
if (res === 1) {
  print("found:", addr);
} else {
  print("not found");
}
```
</div>
#### myDT.isConnected

```javascript
myDT.isConnected(addr)
```
<div class="apidescr">
Determine if the device at the given onewire address (8-byte string) is
connected to the bus.
Return value: 1 if device is connected, 0 otherwise.
</div>
#### myDT.isConnectedWithScratchPad

```javascript
myDT.isConnectedWithScratchPad(addr, sp)
```
<div class="apidescr">
Determine if the device at the given onewire address (8-byte string) is
connected to the bus, and if so, read the scratch pad to the provided
buffer (9-byte string).
Return value: 1 if device is connected (and a scratchpad is read), 0
otherwise.
Example:
```javascript
load("api_sys.js");
load("api_arduino_dallas_temp.js");

let sp = Sys._sbuf(9);
let res = myDT.isConnectedWithScratchPad("\x28\xff\x2b\x45\x4c\x04\x00\x10", sp);
if (res === 1) {
  print("connected, scratchpad:", sp);
} else {
  print("not connected");
}
```
</div>
#### myDT.readScratchPad

```javascript
myDT.readScratchPad(addr, sp)
```
<div class="apidescr">
Read device's scratchpad.
`sp` is a string buffer (minimum 9 bytes length) to read scratchpad
into.
Return 1 in case of success, 0 otherwise.
Example:
```javascript
load("api_sys.js");
load("api_arduino_dallas_temp.js");

let sp = Sys._sbuf(9);
let res = myDT.readScratchPad("\x28\xff\x2b\x45\x4c\x04\x00\x10", sp);
if (res === 1) {
  print("scratchpad:", sp);
} else {
  print("failed to read scratchpad");
}
```
</div>
#### myDT.writeScratchPad

```javascript
myDT.writeScratchPad(addr, sp)
```
<div class="apidescr">
Write device's scratchpad `sp` (which should be a 9-byte string) by
the provided onewire address `addr` (a 8-byte string).
Return value: none.
</div>
#### myDT.readPowerSupply

```javascript
myDT.readPowerSupply()
```
<div class="apidescr">
Read device's power requirements.
Return 1 if device needs parasite power.
Return always 0 if an operaiton failed.
</div>
#### myDT.getGlobalResolution

```javascript
myDT.getGlobalResolution()
```
<div class="apidescr">
Get global resolution in bits. Return value: 9, 10, 11 or 12.
In case of a failure, returns 0.
</div>
#### myDT.setGlobalResolution

```javascript
myDT.setGlobalResolution(res)
```
<div class="apidescr">
Set global resolution `res` in bits, which can be either 9, 10, 11, or
12. If given resolution is out of range, 9 bits is used.
Return value: none.
</div>
#### myDT.getResolution

```javascript
myDT.getResolution(addr)
```
<div class="apidescr">
Get device's resolution in bits. Return value: 9, 10, 11 or 12.
In case of a failure, returns 0.
</div>
#### myDT.setResolution

```javascript
myDT.setResolution(addr, res, skip)
```
<div class="apidescr">
Set resolution of a device with onewire address `addr` to 9, 10, 11, or
12 bits.  If given resolution is out of range, 9 bits is used.
Return 1 in case of success, 0 otherwise.
</div>
#### myDT.setWaitForConversion

```javascript
myDT.setWaitForConversion(waitForConversion)
```
<div class="apidescr">
Set/clear the waitForConversion flag.
Return value: none.
</div>
#### myDT.getWaitForConversion

```javascript
myDT.getWaitForConversion()
```
<div class="apidescr">
Get the value of the waitForConversion flag: either 1 or 0. In case
of a failure, return 0.
</div>
#### myDT.setCheckForConversion

```javascript
myDT.setCheckForConversion(checkForConversion)
```
<div class="apidescr">
Set/clear the `checkForConversion` flag.
</div>
#### myDT.getCheckForConversion

```javascript
myDT.getCheckForConversion()
```
<div class="apidescr">
Get the value of the `checkForConversion` flag: either 1 or 0. In case
of a failure, return 0.
</div>
#### myDT.requestTemperatures

```javascript
myDT.requestTemperatures()
```
<div class="apidescr">
Send command for all devices on the bus to perform a temperature
conversion.

Return value: 1 in case of success, 0 otherwise.
</div>
#### myDT.requestTemperaturesByAddress

```javascript
myDT.requestTemperaturesByAddress(addr)
```
<div class="apidescr">
Send command to a device with the given onewire address `addr` to
perform a temperature conversion.

Return value: 1 in case of success, 0 otherwise.
</div>
#### myDT.requestTemperaturesByIndex

```javascript
myDT.requestTemperaturesByIndex(idx)
```
<div class="apidescr">
Send command to a device with the given index `idx` to perform a
temperature conversion.

Return value: 1 in case of success, 0 otherwise.
</div>
#### myDT.getTemp

```javascript
myDT.getTemp(addr)
```
<div class="apidescr">
Return raw temperature value (12 bit integer of 1/128 degrees C)
or `DallasTemperature.DEVICE_DISCONNECTED_RAW` in case of a failure.
</div>
#### myDT.getTempC

```javascript
myDT.getTempC(addr)
```
<div class="apidescr">
Returns temperature in degrees C or
`DallasTemperature.DEVICE_DISCONNECTED_C` in case of a failure.
</div>
#### myDT.getTempF

```javascript
myDT.getTempF(addr)
```
<div class="apidescr">
Returns temperature in degrees F or
`DallasTemperature.DEVICE_DISCONNECTED_F` in case of a failure.
</div>
#### myDT.getTempCByIndex

```javascript
myDT.getTempCByIndex(idx)
```
<div class="apidescr">
Get temperature from the device with the given index `idx` in degrees C,
or `DallasTemperature.DEVICE_DISCONNECTED_C` in case of a failure.
</div>
#### myDT.getTempFByIndex

```javascript
myDT.getTempFByIndex(idx)
```
<div class="apidescr">
Get temperature from the device with the given index `idx` in degrees F,
or `DallasTemperature.DEVICE_DISCONNECTED_F` in case of a failure.
</div>
#### myDT.isParasitePowerMode

```javascript
myDT.isParasitePowerMode()
```
<div class="apidescr">
Return 1 if the bus requires parasite power, 0 otherwise. In case of a
failure return 0.
</div>
#### myDT.isConversionComplete

```javascript
myDT.isConversionComplete()
```
<div class="apidescr">
Return whether a conversion is completed.
</div>
#### myDT.millisToWaitForConversion

```javascript
myDT.millisToWaitForConversion(res)
```
<div class="apidescr">
Return number of milliseconds to wait until the conversion is completed
for the given resolution `res` in bits (9, 10, 11 or 12).
In case of a failure, return 0.
</div>
#### myDT.setHighAlarmTemp

```javascript
myDT.setHighAlarmTemp(grc)
```
<div class="apidescr">
Set the upper alarm temperature (in degrees C) for a device; valid range
for `grc` is from -55 to 125.
Return value: none.
</div>
#### myDT.setLowAlarmTemp

```javascript
myDT.setLowAlarmTemp()
```
<div class="apidescr">
Set the lower alarm temperature (in degrees C) for a device; valid range
for `grc` is from -55 to 125.
Return value: none.
</div>
#### myDT.getHighAlarmTemp

```javascript
myDT.getHighAlarmTemp()
```
<div class="apidescr">
Return upper alarm temperature in degrees C (from -55 to 125), or
`DallasTemperature.DEVICE_DISCONNECTED_C` in case of a failure.
</div>
#### myDT.getHighAlarmTemp

```javascript
myDT.getHighAlarmTemp()
```
<div class="apidescr">
Return lower alarm temperature in degrees C (from -55 to 125), or
`DallasTemperature.DEVICE_DISCONNECTED_C` in case of a failure.
</div>
#### myDT.alarmSearch

```javascript
myDT.alarmSearch(addr)
```
<div class="apidescr">
Search the wire for devices with active alarms.

`addr` should be a string buffer of at least 8 bytes.

If the next device is found, 1 is returned and the device's address
is written to `addr`; otherwise 0 is returned.

Use `myDT.resetAlarmSearch()` to start over.
Example:
```javascript
load("api_sys.js");
load("api_arduino_dallas_temp.js");

print("Looking for devices with active alarms...");
let addr = Sys._sbuf(8);
while (myDT.alarmSearch(addr) === 1) {
  print("Found:", addr);
}
print("Done.");
```
</div>
#### myDT.resetAlarmSearch

```javascript
myDT.resetAlarmSearch()
```
<div class="apidescr">
Reset alarm search.
Return value: none.
</div>
#### myDT.hasAlarm

```javascript
myDT.hasAlarm(addr)
```
<div class="apidescr">
Return 1 if device with the given onewire address has active alarm;
0 otherwise. In case of a failure, 0 is returned.
</div>
#### myDT.hasAlarms

```javascript
myDT.hasAlarms()
```
<div class="apidescr">
Return 1 if any device on the bus has active alarm; 0 otherwise.
In case of a failure, 0 is returned.
</div>
#### myDT.toHexStr

```javascript
myDT.toHexStr(addr)
```
<div class="apidescr">
Return device address `addr` in the hex format.
</div>
