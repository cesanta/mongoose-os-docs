# Event
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_event.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_event.h) | [mgos_event.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_event.c)  | [api_events.js](http://github.com/mongoose-os-libs/mjs/tree/master/fs/api_events.js)         |


Mongoose OS provides a way to get a notification when certain event
happens. Each event has an associated event data passed as `void *`.
 

 ----- 
#### MGOS_EVENT_BASE

```c
#define MGOS_EVENT_BASE(a, b, c) ((a) << 24 | (b) << 16 | (c) << 8)
```
<div class="apidescr">

Macro to generate unique base event number.
A library can use the last byte (LSB) to create up to 256 unique
events (see enum below on how Mongoose OS core defines its events).
A library should call mgos_event_register_base() in order to claim
it and prevent event number conflicts.
 
</div>
#### MGOS_EVENT_BASE

```c
#define MGOS_EVENT_SYS MGOS_EVENT_BASE('M', 'O', 'S')
```
<div class="apidescr">

These events are registered by the MGOS core.
Other events could be registered by the external libraries.
 
</div>
#### mgos_event_register_base

```c
bool mgos_event_register_base(int base_event_number, const char *name);
```
<div class="apidescr">

Register a base event number in order to prevent event number conflicts.
Use `MGOS_EVENT_BASE()` macro to get `base_event_number`; `name` is an
arbitrary name of the module who registers the base number.

Example:
```c
#define MY_EVENT_BASE MGOS_EVENT_BASE('F', 'O', 'O')

enum my_event {
  MY_EVENT_AAA = MY_EVENT_BASE,
  MY_EVENT_BBB,
  MY_EVENT_CCC,
};

// And somewhere else:
mgos_event_register_base(MY_EVENT_BASE, "my module foo");
```
 
</div>
#### mgos_event_trigger

```c
int mgos_event_trigger(int ev, void *ev_data);
```
<div class="apidescr">
 Trigger an event `ev` with the event data `ev_data`. Return number of event
handlers invoked. 
</div>
#### (*mgos_event_handler_t)

```c
typedef void (*mgos_event_handler_t)(int ev, void *ev_data, void *userdata);
```
<div class="apidescr">
 Event handler signature. 
</div>
#### mgos_event_add_handler

```c
bool mgos_event_add_handler(int ev, mgos_event_handler_t cb, void *userdata);
```
<div class="apidescr">

Add an event handler. Return true on success, false on error (e.g. OOM).

Example:
```c
static void system_restart_cb(int ev, void *ev_data, void *userdata) {
  LOG(LL_INFO, ("Going to reboot!"));
  (void) ev;
  (void) ev_data;
  (void) userdata;
}

// And somewhere else:
mgos_event_add_handler(MGOS_EVENT_REBOOT, system_restart_cb, NULL);
```
 
</div>
#### mgos_event_add_group_handler

```c
bool mgos_event_add_group_handler(int evgrp, mgos_event_handler_t cb,
                                  void *userdata);
```
<div class="apidescr">

Like `mgos_event_add_handler()`, but subscribes on all events in the given
group `evgrp`. Event group includes all events from `evgrp & ~0xff` to
`evgrp | 0xff`.

Example:
```c
static void sys_event_cb(int ev, void *ev_data, void *userdata) {
  LOG(LL_INFO, ("Got system event %d", ev));
  (void) ev;
  (void) ev_data;
  (void) userdata;
}

// And somewhere else:
mgos_event_add_handler(MGOS_EVENT_SYS, sys_event_cb, NULL);
```
 
</div>
#### mgos_event_remove_handler

```c
bool mgos_event_remove_handler(int ev, mgos_event_handler_t cb, void *userdata);
bool mgos_event_remove_group_handler(int evgrp, mgos_event_handler_t cb,
                                     void *userdata);
```
<div class="apidescr">

Remove an event handler.
Both cb and userdata must match the initial add invocation.
Returns true if a handler was found and removed, false if there was no
such handler in the first place.
 
</div>

### JS API

 --- 
#### Event.addHandler

```javascript
Event.addHandler(ev, callback, userdata)
```
<div class="apidescr">
Add a handler for the given event `ev`. Callback should look like:

function(ev, evdata, userdata) { /* ... */ }

Example:
```javascript

Event.addHandler(Event.REBOOT, function(ev, evdata, ud) {
  print("Going to reboot!");
}, null);
```
</div>
#### Event.addGroupHandler

```javascript
Event.addGroupHandler(evgrp, callback, userdata)
```
<div class="apidescr">
Like `Event.addHandler()`, but subscribes on all events in the given
event group `evgrp`. Event group includes all events from `evgrp & ~0xff`
to `evgrp | 0xff`.

Example:
```javascript

Event.addGroupHandler(Event.SYS, function(ev, evdata, ud) {
  print("Sys event:", ev);
}, null);
```
</div>
#### Event.regBase

```javascript
Event.regBase(base_event_number, name)
```
<div class="apidescr">
Register a base event number in order to prevent event number conflicts.
Use `Event.baseNumber(id)` to get `base_event_number`; `name` is an
arbitrary event name.

Example:
```javascript
let bn = Event.baseNumber("ABC");
if (!Event.regBase(bn, "My module")) {
  die("Failed to register base event number");
}

let MY_EVENT_FOO = bn + 0;
let MY_EVENT_BAR = bn + 1;
let MY_EVENT_BAZ = bn + 2;
```
</div>
#### Event.baseNumber

```javascript
Event.baseNumber(id)
```
<div class="apidescr">
Generates unique base event number (32-bit) by a 3-char string.
LSB is always zero, and a library can use it to create up to 256 unique
events.

A library should call `Event.regBase()` in order to claim
it and prevent event number conflicts. (see example there)
</div>
#### Event.trigger

```javascript
Event.trigger(ev, evdata)
```
<div class="apidescr">
Trigger an event with the given id `ev` and event data `evdata`.
</div>
#### Event.evdataLogStr

```javascript
Event.evdataLogStr(evdata)
```
<div class="apidescr">
Getter function for the `evdata` given to the event callback for the event
`Event.LOG`, see `Event.addHandler()`.
</div>
#### Event.LOG

```javascript
Event.LOG
```
<div class="apidescr">
System event which is triggered every time something is printed to the
log.  In the callback, use `Event.evdataLogStr(evdata)` to get string
which was printed.
</div>
#### Event.REBOOT

```javascript
Event.REBOOT
```
<div class="apidescr">
System event which is triggered right before going to reboot. `evdata`
is irrelevant for this event.
</div>
#### Event.OTA_STATUS

```javascript
Event.OTA_STATUS
```
<div class="apidescr">
System event which is triggered when OTA status changes.

In the callback, use `OTA.evdataOtaStatusMsg(evdata)` from `api_ota.js` to
get the OTA status message.
</div>
