# Device Shadow
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/shadow](https://github.com/mongoose-os-libs/shadow) | [mgos_shadow.h](https://github.com/mongoose-os-libs/shadow/tree/master/include/mgos_shadow.h) | &nbsp;  | [api_shadow.js](https://github.com/mongoose-os-libs/shadow/tree/master/mjs_fs/api_shadow.js)         |

# A cross-cloud device shadow API

## Overview

This library provides a device shadow interface to manage
device metadata on the cloud.


 ----- 

Cross-cloud device cloud state API.
 

 ----- 
#### MGOS_EVENT_BASE

```c
#define MGOS_SHADOW_BASE MGOS_EVENT_BASE('S', 'D', 'W')
```
 __cplusplus 
#### mgos_shadow_event_name

```c
const char *mgos_shadow_event_name(int ev);
```
 Stringify shadow event name 
#### mgos_shadow_get

```c
bool mgos_shadow_get(void);
```

Request shadow state. Response will arrive via GET_ACCEPTED topic.
Note that MGOS automatically does this on every (re)connect if
device.shadow.get_on_connect is true (default).
 
#### mgos_shadow_updatef

```c
bool mgos_shadow_updatef(uint64_t version, const char *state_jsonf, ...);
```

Send an update. Format string should define the value of the "state" key,
i.e. it should be an object with an update to the reported state, e.g.:
`mgos_shadow_updatef("{foo: %d, bar: %d}", foo, bar)`.
Response will arrive via UPDATE_ACCEPTED or REJECTED topic.
If you want the update to be aplied only if a particular version is
current,
specify the version. Otherwise set it to 0 to apply to any version.
 
#### mgos_shadow_update

```c
bool mgos_shadow_update(double version, const char *state_json);
```
 "Simple" version of mgos_shadow_updatef, primarily for FFI.  

### JS API

 --- 
#### Shadow.addHandler

```javascript
Shadow.addHandler(callback)
```
Set up shadow event handler. Callback receives `event, obj` parameters.
Possibble values for `event` are:
`CONNECTED`,  `UPDATE_ACCEPTED`, `UPDATE_REJECTED`,`UPDATE_DELTA`.
`obj` is an shadow object, valid for `UPDATE_DELTA` and `UPDATE_ACCEPTED`
events.
See https://github.com/mongoose-os-apps/example-shadow-js for the
idiomatic usage.
#### Shadow.get

```javascript
Shadow.get()
```
Ask cloud for the shadow. The reply will come as either `GET_ACCEPTED`
event or `GET_REJECTED` event.
#### Shadow.update

```javascript
Shadow.update()
```
Send shadow update. The idiomatic way of using shadow is: a) catch
`CONNECTED` event and report the current state, and b) catch `UPDATE_DELTA`
event, apply the delta, and report the state. Example:
```javascript
Shadow.update(0, {temperature: 12.34});
```
