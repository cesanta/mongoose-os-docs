# Dallas Temperature
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-dallas-temperature](https://github.com/mongoose-os-libs/arduino-dallas-temperature) | [DallasTemperature.h](https://github.com/mongoose-os-libs/arduino-dallas-temperature/tree/master/include/DallasTemperature.h) | &nbsp;  | [api_arduino_dallas_temp.js](https://github.com/mongoose-os-libs/arduino-dallas-temperature/tree/master/mjs_fs/api_arduino_dallas_temp.js)         |




 ----- 
#### begin

```c
void begin(void);
```
initialise bus
#### getDeviceCount

```c
uint8_t getDeviceCount(void);
```
returns the number of devices found on the bus
#### validAddress

```c
bool validAddress(const uint8_t*);
```
returns true if address is valid
#### validFamily

```c
bool validFamily(const uint8_t* deviceAddress);
```
returns true if address is of the family of sensors the lib supports.
#### getAddress

```c
bool getAddress(uint8_t*, uint8_t);
```
finds an address at a given index on the bus
#### isConnected

```c
bool isConnected(const uint8_t*);
```
attempt to determine if the device at the given address is connected to the bus
#### isConnected

```c
bool isConnected(const uint8_t*, uint8_t*);
```
attempt to determine if the device at the given address is connected to the bus
also allows for updating the read scratchpad
#### readScratchPad

```c
bool readScratchPad(const uint8_t*, uint8_t*);
```
read device's scratchpad
#### writeScratchPad

```c
void writeScratchPad(const uint8_t*, const uint8_t*);
```
write device's scratchpad
#### readPowerSupply

```c
bool readPowerSupply(const uint8_t*);
```
read device's power requirements
#### getResolution

```c
uint8_t getResolution();
```
get global resolution
#### setResolution

```c
void setResolution(uint8_t);
```
set global resolution to 9, 10, 11, or 12 bits
#### getResolution

```c
uint8_t getResolution(const uint8_t*);
```
returns the device resolution: 9, 10, 11, or 12 bits
#### setResolution

```c
bool setResolution(const uint8_t*, uint8_t, bool skipGlobalBitResolutionCalculation = false);
```
set resolution of a device to 9, 10, 11, or 12 bits
#### setWaitForConversion

```c
void setWaitForConversion(bool);
    bool getWaitForConversion(void);
```
sets/gets the waitForConversion flag
#### setCheckForConversion

```c
void setCheckForConversion(bool);
    bool getCheckForConversion(void);
```
sets/gets the checkForConversion flag
#### requestTemperatures

```c
void requestTemperatures(void);
```
sends command for all devices on the bus to perform a temperature conversion
#### requestTemperaturesByAddress

```c
bool requestTemperaturesByAddress(const uint8_t*);
```
sends command for one device to perform a temperature conversion by address
#### requestTemperaturesByIndex

```c
bool requestTemperaturesByIndex(uint8_t);
```
sends command for one device to perform a temperature conversion by index
#### getTemp

```c
int16_t getTemp(const uint8_t*);
```
returns temperature raw value (12 bit integer of 1/128 degrees C)
#### getTempC

```c
float getTempC(const uint8_t*);
```
returns temperature in degrees C
#### getTempF

```c
float getTempF(const uint8_t*);
```
returns temperature in degrees F
#### getTempCByIndex

```c
float getTempCByIndex(uint8_t);
```
Get temperature for device index (slow)
#### getTempFByIndex

```c
float getTempFByIndex(uint8_t);
```
Get temperature for device index (slow)
#### isParasitePowerMode

```c
bool isParasitePowerMode(void);
```
returns true if the bus requires parasite power
#### isConversionComplete

```c
bool isConversionComplete(void);
```
Is a conversion complete on the wire?
#### setHighAlarmTemp

```c
void setHighAlarmTemp(const uint8_t*, char);
```
sets the high alarm temperature for a device
accepts a char.  valid range is -55C - 125C
#### setLowAlarmTemp

```c
void setLowAlarmTemp(const uint8_t*, char);
```
sets the low alarm temperature for a device
accepts a char.  valid range is -55C - 125C
#### getHighAlarmTemp

```c
char getHighAlarmTemp(const uint8_t*);
```
returns a signed char with the current high alarm temperature for a device
in the range -55C - 125C
#### getLowAlarmTemp

```c
char getLowAlarmTemp(const uint8_t*);
```
returns a signed char with the current low alarm temperature for a device
in the range -55C - 125C
#### resetAlarmSearch

```c
void resetAlarmSearch(void);
```
resets internal variables used for the alarm search
#### alarmSearch

```c
bool alarmSearch(uint8_t*);
```
search the wire for devices with active alarms
#### hasAlarm

```c
bool hasAlarm(const uint8_t*);
```
returns true if ia specific device has an alarm
#### hasAlarm

```c
bool hasAlarm(void);
```
returns true if any device is reporting an alarm on the bus
#### processAlarms

```c
void processAlarms(void);
```
runs the alarm handler for all devices returned by alarmSearch()
#### setAlarmHandler

```c
void setAlarmHandler(const AlarmHandler *);
```
sets the alarm handler
#### defaultAlarmHandler

```c
static void defaultAlarmHandler(const uint8_t*);
```
The default alarm handler
#### setUserData

```c
void setUserData(const uint8_t*, int16_t );
    void setUserDataByIndex(uint8_t, int16_t );
    int16_t getUserData(const uint8_t* );
    int16_t getUserDataByIndex(uint8_t );
```
if no alarm handler is used the two bytes can be used as user data
example of such usage is an ID.
note if device is not connected it will fail writing the data.
note if address cannot be found no error will be reported.
in short use carefully
#### toFahrenheit

```c
static float toFahrenheit(float);
```
convert from Celsius to Fahrenheit
#### toCelsius

```c
static float toCelsius(float);
```
convert from Fahrenheit to Celsius
#### rawToCelsius

```c
static float rawToCelsius(int16_t);
```
convert from raw to Celsius
#### rawToFahrenheit

```c
static float rawToFahrenheit(int16_t);
```
convert from raw to Fahrenheit
#### delete

```c
void operator delete(void*);
```
delete memory reference
#### calculateTemperature

```c
int16_t calculateTemperature(const uint8_t*, uint8_t*);
```
reads scratchpad and returns the raw temperature

### JS API

 --- 
#### DallasTemperature.create

```javascript
DallasTemperature.create(ow)
```
Create and return an instance of the dallas temperature: an object with
methods described below. `ow` is an OneWire instance.

Example:
```javascript
let ow = OneWire(12 /* onewire pin number */);
let myDT = DallasTemperature.create(ow);
```
#### myDT.close

```javascript
myDT.close()
```
Close DallasTemperature handle. Return value: none.
#### myDT.begin

```javascript
myDT.begin()
```
Initialise the sensor. Return value: none.
#### myDT.getDeviceCount

```javascript
myDT.getDeviceCount()
```
Return the number of devices found on the bus.
If an operaiton is failed, 0 is returned.
#### myDT.validAddress

```javascript
myDT.validAddress(addr)
```
Check if given onewire `addr` (8-byte string) is valid; returns 1 if it
is, or 0 otherwise.
#### myDT.validFamily

```javascript
myDT.validFamily(addr)
```
Return 1 if onewire address `addr` (8-byte string) is of the family of
sensors the lib supports.  Return always 0 if an operaiton failed.
#### myDT.getAddress

```javascript
myDT.getAddress(addr, idx)
```
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
#### myDT.isConnected

```javascript
myDT.isConnected(addr)
```
Determine if the device at the given onewire address (8-byte string) is
connected to the bus.
Return value: 1 if device is connected, 0 otherwise.
#### myDT.isConnectedWithScratchPad

```javascript
myDT.isConnectedWithScratchPad(addr, sp)
```
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
#### myDT.readScratchPad

```javascript
myDT.readScratchPad(addr, sp)
```
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
#### myDT.writeScratchPad

```javascript
myDT.writeScratchPad(addr, sp)
```
Write device's scratchpad `sp` (which should be a 9-byte string) by
the provided onewire address `addr` (a 8-byte string).
Return value: none.
#### myDT.readPowerSupply

```javascript
myDT.readPowerSupply()
```
Read device's power requirements.
Return 1 if device needs parasite power.
Return always 0 if an operaiton failed.
#### myDT.getGlobalResolution

```javascript
myDT.getGlobalResolution()
```
Get global resolution in bits. Return value: 9, 10, 11 or 12.
In case of a failure, returns 0.
#### myDT.setGlobalResolution

```javascript
myDT.setGlobalResolution(res)
```
Set global resolution `res` in bits, which can be either 9, 10, 11, or
12. If given resolution is out of range, 9 bits is used.
Return value: none.
#### myDT.getResolution

```javascript
myDT.getResolution(addr)
```
Get device's resolution in bits. Return value: 9, 10, 11 or 12.
In case of a failure, returns 0.
#### myDT.setResolution

```javascript
myDT.setResolution(addr, res, skip)
```
Set resolution of a device with onewire address `addr` to 9, 10, 11, or
12 bits.  If given resolution is out of range, 9 bits is used.
Return 1 in case of success, 0 otherwise.
#### myDT.setWaitForConversion

```javascript
myDT.setWaitForConversion(waitForConversion)
```
Set/clear the waitForConversion flag.
Return value: none.
#### myDT.getWaitForConversion

```javascript
myDT.getWaitForConversion()
```
Get the value of the waitForConversion flag: either 1 or 0. In case
of a failure, return 0.
#### myDT.setCheckForConversion

```javascript
myDT.setCheckForConversion(checkForConversion)
```
Set/clear the `checkForConversion` flag.
#### myDT.getCheckForConversion

```javascript
myDT.getCheckForConversion()
```
Get the value of the `checkForConversion` flag: either 1 or 0. In case
of a failure, return 0.
#### myDT.requestTemperatures

```javascript
myDT.requestTemperatures()
```
Send command for all devices on the bus to perform a temperature
conversion.

Return value: 1 in case of success, 0 otherwise.
#### myDT.requestTemperaturesByAddress

```javascript
myDT.requestTemperaturesByAddress(addr)
```
Send command to a device with the given onewire address `addr` to
perform a temperature conversion.

Return value: 1 in case of success, 0 otherwise.
#### myDT.requestTemperaturesByIndex

```javascript
myDT.requestTemperaturesByIndex(idx)
```
Send command to a device with the given index `idx` to perform a
temperature conversion.

Return value: 1 in case of success, 0 otherwise.
#### myDT.getTemp

```javascript
myDT.getTemp(addr)
```
Return raw temperature value (12 bit integer of 1/128 degrees C)
or `DallasTemperature.DEVICE_DISCONNECTED_RAW` in case of a failure.
#### myDT.getTempC

```javascript
myDT.getTempC(addr)
```
Returns temperature in degrees C or
`DallasTemperature.DEVICE_DISCONNECTED_C` in case of a failure.
#### myDT.getTempF

```javascript
myDT.getTempF(addr)
```
Returns temperature in degrees F or
`DallasTemperature.DEVICE_DISCONNECTED_F` in case of a failure.
#### myDT.getTempCByIndex

```javascript
myDT.getTempCByIndex(idx)
```
Get temperature from the device with the given index `idx` in degrees C,
or `DallasTemperature.DEVICE_DISCONNECTED_C` in case of a failure.
#### myDT.getTempFByIndex

```javascript
myDT.getTempFByIndex(idx)
```
Get temperature from the device with the given index `idx` in degrees F,
or `DallasTemperature.DEVICE_DISCONNECTED_F` in case of a failure.
#### myDT.isParasitePowerMode

```javascript
myDT.isParasitePowerMode()
```
Return 1 if the bus requires parasite power, 0 otherwise. In case of a
failure return 0.
#### myDT.isConversionComplete

```javascript
myDT.isConversionComplete()
```
Return whether a conversion is completed.
#### myDT.millisToWaitForConversion

```javascript
myDT.millisToWaitForConversion(res)
```
Return number of milliseconds to wait until the conversion is completed
for the given resolution `res` in bits (9, 10, 11 or 12).
In case of a failure, return 0.
#### myDT.setHighAlarmTemp

```javascript
myDT.setHighAlarmTemp(grc)
```
Set the upper alarm temperature (in degrees C) for a device; valid range
for `grc` is from -55 to 125.
Return value: none.
#### myDT.setLowAlarmTemp

```javascript
myDT.setLowAlarmTemp()
```
Set the lower alarm temperature (in degrees C) for a device; valid range
for `grc` is from -55 to 125.
Return value: none.
#### myDT.getHighAlarmTemp

```javascript
myDT.getHighAlarmTemp()
```
Return upper alarm temperature in degrees C (from -55 to 125), or
`DallasTemperature.DEVICE_DISCONNECTED_C` in case of a failure.
#### myDT.getHighAlarmTemp

```javascript
myDT.getHighAlarmTemp()
```
Return lower alarm temperature in degrees C (from -55 to 125), or
`DallasTemperature.DEVICE_DISCONNECTED_C` in case of a failure.
#### myDT.alarmSearch

```javascript
myDT.alarmSearch(addr)
```
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
#### myDT.resetAlarmSearch

```javascript
myDT.resetAlarmSearch()
```
Reset alarm search.
Return value: none.
#### myDT.hasAlarm

```javascript
myDT.hasAlarm(addr)
```
Return 1 if device with the given onewire address has active alarm;
0 otherwise. In case of a failure, 0 is returned.
#### myDT.hasAlarms

```javascript
myDT.hasAlarms()
```
Return 1 if any device on the bus has active alarm; 0 otherwise.
In case of a failure, 0 is returned.
#### myDT.toHexStr

```javascript
myDT.toHexStr(addr)
```
Return device address `addr` in the hex format.
