# Dallas RMT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/dallas-rmt](https://github.com/mongoose-os-libs/dallas-rmt) | [DallasRmt.h](https://github.com/mongoose-os-libs/dallas-rmt/tree/master/include/DallasRmt.h) | &nbsp;  | [api_dallas_rmt.js](https://github.com/mongoose-os-libs/dallas-rmt/tree/master/mjs_fs/api_dallas_rmt.js)         |


The library uses the `onewire-rmt` library. 
A pullup resistor (4.7k) must be connected between the data line of the sensor and Vcc.

# Example code in C++
```
#include <mgos.h>
#include "DallasRmt.h"

static DallasRmt* dallas = NULL;
static OnewireRmt* ow = NULL;
static int numDevices = 0;
static uint32_t readings = 0;

static void loop_onewire(void *arg)
{
    (void) arg;
    if (0 == numDevices) {
        LOG(LL_WARN, ("No device found"));
        return;
    }
    bool wait = dallas->getWaitForConversion();
    double start = mg_time();
    dallas->requestTemperatures();
    double end = mg_time();
    LOG(LL_WARN, ("wait=%d, conversionTime=%.2fms", wait, 1000.0 * (end - start)));

    uint8_t deviceAddress[8];
    for (int i = 0; i < numDevices; ++i) {
        float temp = dallas->getTempCByIndex(i);
        dallas->getAddress(deviceAddress, i);
        char buf[17];
        char*p = buf;
        for (int i = 0; i < 8; ++i) {
            p += snprintf(p, sizeof (buf) - 2 * i, "%02x", deviceAddress[i]);
        }
        LOG(LL_WARN, ("index=%d, address=%s, temp=%.2f, reading=%d", i, buf, temp, readings));
        readings++;
    }
}

extern "C"
enum mgos_app_init_result mgos_app_init(void)
{
    dallas = new DallasRmt();
    ow = new OnewireRmt(13 /*pin*/, 0 /*rmt_rx*/, 1 /*rmt_tx*/);
    dallas->setOneWire(ow);
    dallas->begin();
    numDevices = dallas->getDeviceCount();
    
    mgos_set_timer(3000, 1, loop_onewire, NULL);

    return MGOS_APP_INIT_SUCCESS;
}
```

# Example code in C
```
#include <mgos.h>
#include "mgos_dallas_rmt.h"

static DallasRmt* dallas = NULL;
static int numDevices = 0;
static uint32_t readings = 0;

static void readData() {
    char deviceAddress[8];
    for (int i = 0; i < numDevices; ++i) {
        float temp = mgos_dallas_rmt_get_tempc_by_index(dallas, i) / 100.0;
        mgos_dallas_rmt_get_address(dallas, deviceAddress, i);
        char buf[17];
        char*p = buf;
        for (int i = 0; i < 8; ++i) {
            p += snprintf(p, sizeof (buf) - 2 * i, "%02x", deviceAddress[i]);
        }
        LOG(LL_WARN, ("index=%d, address=%s, temp=%.2f, reading=%d", i, buf, temp, readings));
        readings++;
    }
}

static void owTimerCB(void * arg) {
    readData();
}

static void loop_onewire(void *arg) {
    (void) arg;
    if (0 == numDevices) {
        LOG(LL_WARN, ("No device found"));
        return;
    }
    bool wait = mgos_dallas_rmt_get_wait_for_conversion(dallas);
    double start = mg_time();
    mgos_dallas_rmt_request_temperatures(dallas);
    double end = mg_time();
    LOG(LL_WARN, ("wait=%d, conversionTime=%.2fms", wait, 1000.0 * (end - start)));
    if (wait) {
        readData();
    } else {
        mgos_set_timer(800, 0, owTimerCB, NULL);
    }
}

enum mgos_app_init_result mgos_app_init(void) {
    OnewireRmt* ow = mgos_onewire_rmt_create(13 /*pin*/, 0 /*rmt_rx*/, 1 /*rmt_tx*/);
    dallas = mgos_dallas_rmt_create(ow);
    
    mgos_dallas_rmt_begin(dallas);
    numDevices = mgos_dallas_rmt_get_device_count(dallas);
    
    int resolution = mgos_dallas_rmt_get_global_resolution(dallas);
    int16_t millis = mgos_dallas_rmt_millis_to_wait_for_conversion(dallas, resolution);
    LOG(LL_WARN, ("resolution=%d, millis=%d", resolution, millis));
    //mgos_dallas_rmt_set_wait_for_conversion(dallas, false);

    mgos_set_timer(3000, 1, loop_onewire, NULL);

    return MGOS_APP_INIT_SUCCESS;
}




 ----- 
#### begin

```c
void begin(void);
```
<div class="apidescr">

Initialises the bus
   
</div>
#### getDeviceCount

```c
uint8_t getDeviceCount(void) {
    return _devices;
  }
```
<div class="apidescr">

 Returns the number of devices found on the bus
   
</div>
#### validAddress

```c
bool validAddress(const uint8_t *);
```
<div class="apidescr">

 Returns true if address is valid
   
</div>
#### validFamily

```c
bool validFamily(const uint8_t *deviceAddress);
```
<div class="apidescr">

Returns true if address is of the family of sensors the lib supports.
   
</div>
#### getAddress

```c
bool getAddress(uint8_t *deviceAddress, uint8_t index);
```
<div class="apidescr">

Finds an address at a given index on the bus
   
</div>
#### isConnected

```c
bool isConnected(const uint8_t *);
```
<div class="apidescr">

Attempts to determine if the device at the given address is connected to
the bus
   
</div>
#### isConnected

```c
bool isConnected(const uint8_t *, uint8_t *);
```
<div class="apidescr">

Attempts to determine if the device at the given address is connected to
the bus.
Also allows for updating the read scratchpad
   
</div>
#### readScratchPad

```c
bool readScratchPad(const uint8_t *, uint8_t *);
```
<div class="apidescr">

Reads device's scratchpad
   
</div>
#### writeScratchPad

```c
void writeScratchPad(const uint8_t *, const uint8_t *);
```
<div class="apidescr">

Writes device's scratchpad
   
</div>
#### readPowerSupply

```c
bool readPowerSupply(const uint8_t *deviceAddress);
```
<div class="apidescr">

Reads device's power requirements
   
</div>
#### getResolution

```c
uint8_t getResolution() {
    return _bitResolution;
  }
  /*
   * Returns the device's resolution: 9, 10, 11, or 12 bits
   */
  uint8_t getResolution(const uint8_t *deviceAddress);
```
<div class="apidescr">

Gets the global resolution
   
</div>
#### setResolution

```c
void setResolution(uint8_t);
```
<div class="apidescr">

Sets the global resolution to 9, 10, 11, or 12 bits
   
</div>
#### setResolution

```c
bool setResolution(const uint8_t *, uint8_t,
                     bool skipGlobalBitResolutionCalculation = false);
```
<div class="apidescr">

Sets the resolution of a device to 9, 10, 11, or 12 bits
   
</div>
#### setWaitForConversion

```c
void setWaitForConversion(bool value) {
    _waitForConversion = value;
  }
```
<div class="apidescr">

Sets/gets the value of the waitForConversion flag
true : function requestTemperature() etc returns when conversion is ready
false: function requestTemperature() etc returns immediately (USE WITH
CARE!!)
       (1) programmer has to check if the needed delay has passed
       (2) but the application can do meaningful things in that time
   
</div>
#### setCheckForConversion

```c
void setCheckForConversion(bool value) {
    _checkForConversion = value;
  }
```
<div class="apidescr">

Sets/gets the checkForConversion flag
sets the value of the checkForConversion flag
true : function requestTemperature() etc will 'listen' to an IC to
determine whether a conversion is complete
false: function requestTemperature() etc will wait a set time (worst case
scenario) for a conversion to complete
   
</div>
#### requestTemperatures

```c
void requestTemperatures(void);
  // sends command for one device to perform a temperature conversion by address
  bool requestTemperaturesByAddress(const uint8_t *);
```
<div class="apidescr">

Sends command for all devices on the bus to perform a temperature
conversion
   
</div>
#### requestTemperaturesByIndex

```c
bool requestTemperaturesByIndex(uint8_t);
```
<div class="apidescr">

Sends command for one device to perform a temperature conversion by index
   
</div>
#### getTemp

```c
int16_t getTemp(const uint8_t *);
```
<div class="apidescr">

Returns temperature raw value (12 bit integer of 1/128 degrees C)
   
</div>
#### getTempC

```c
float getTempC(const uint8_t *);
```
<div class="apidescr">

Returns temperature in degrees C
   
</div>
#### getTempF

```c
float getTempF(const uint8_t *);
```
<div class="apidescr">

Returns temperature in degrees F
   
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
bool isParasitePowerMode(void) {
    return _parasite;
  }
```
<div class="apidescr">

Returns true if the bus requires parasite power
   
</div>
#### isConversionComplete

```c
bool isConversionComplete(void);
```
<div class="apidescr">

Is a conversion complete on the wire?
   
</div>
#### toFahrenheit

```c
static float toFahrenheit(float);
```
<div class="apidescr">

Convert from Celsius to Fahrenheit
   
</div>
#### toCelsius

```c
static float toCelsius(float);
```
<div class="apidescr">

Convert from Fahrenheit to Celsius
   
</div>
#### rawToCelsius

```c
static float rawToCelsius(int16_t);
```
<div class="apidescr">

Convert from raw to Celsius
   
</div>
#### rawToFahrenheit

```c
static float rawToFahrenheit(int16_t);
```
<div class="apidescr">

Convert from raw to Fahrenheit
   
</div>
#### calculateTemperature

```c
int16_t calculateTemperature(const uint8_t *, uint8_t *);
```
<div class="apidescr">

Reads scratchpad and returns the raw temperature
   
</div>

### JS API

 --- 
#### DallasRmt.create

```javascript
DallasRmt.create(pin, rmt_rx, rmt_tx)
```
<div class="apidescr">
Create and return an instance of the dallas temperature: an object with
methods described below.
`pin` - onewire pin number
`rmt_rx` - rx RMT channel
`rmt_tx` - tx RMT channel

Example:
```javascript
let myDT = DallasRmt.create(12 /* onewire pin number */, 0 /*RMT rx channel*/, 1 /*RMT tx channel*/);
```
</div>
#### myDT.close

```javascript
myDT.close()
```
<div class="apidescr">
Close DallasRmt handle. Return value: none.
</div>
#### myDT.begin

```javascript
myDT.begin()
```
<div class="apidescr">
Initialise the sensor. Return value: none.
begin: function () {
   return DallasRmt._begin(this.dt);
},
## **`myDT.getDeviceCount()`**
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
load("api_dallas_rmt.js");

let addr = myDT.createAddress;
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
load("api_dallas_rmt.js");

let sp = myDT.createScratchPad();
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
load("api_dallas_rmt.js");

let sp = createScratchPad();
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
or `DallasRmt.DEVICE_DISCONNECTED_RAW` in case of a failure.
</div>
#### myDT.getTempC

```javascript
myDT.getTempC(addr)
```
<div class="apidescr">
Returns temperature in degrees C or
`DallasRmt.DEVICE_DISCONNECTED_C` in case of a failure.
</div>
#### myDT.getTempF

```javascript
myDT.getTempF(addr)
```
<div class="apidescr">
Returns temperature in degrees F or
`DallasRmt.DEVICE_DISCONNECTED_F` in case of a failure.
</div>
#### myDT.getTempCByIndex

```javascript
myDT.getTempCByIndex(idx)
```
<div class="apidescr">
Get temperature from the device with the given index `idx` in degrees C,
or `DallasRmt.DEVICE_DISCONNECTED_C` in case of a failure.
</div>
#### myDT.getTempFByIndex

```javascript
myDT.getTempFByIndex(idx)
```
<div class="apidescr">
Get temperature from the device with the given index `idx` in degrees F,
or `DallasRmt.DEVICE_DISCONNECTED_F` in case of a failure.
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
#### myDT.toHexStr

```javascript
myDT.toHexStr(addr)
```
<div class="apidescr">
Return device address `addr` in the hex format.
</div>
#### myDT.createAddress

```javascript
myDT.createAddress()
```
<div class="apidescr">
Return an 8 bytes empty string to be used with `*Address` function
</div>
#### myDT.createScratchPad

```javascript
myDT.createScratchPad()
```
<div class="apidescr">
Return an 9 bytes empty string to be used with `...ScratchPad` function
</div>
