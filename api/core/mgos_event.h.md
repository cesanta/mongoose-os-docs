
# Event

Mongoose OS provides a way to get a notification when certain event
happens. Each event has an associated event data passed as `void *`.
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_event.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_event.h) | [mgos_event.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_event.c) |          |

#### MGOS_EVENT_BASE

```c
#define MGOS_EVENT_SYS MGOS_EVENT_BASE('M', 'O', 'S')
```

These events are registered by the MGOS core.
Other events could be registered by the external libraries.
 
#### mgos_event_register_base

```c
bool mgos_event_register_base(int base_event_number, const char *name);
```

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
 
#### mgos_event_trigger

```c
int mgos_event_trigger(int ev, void *ev_data);
```
 Trigger an event `ev` with the event data `ev_data`. Return number of event
handlers invoked. 
#### (*mgos_event_handler_t)

```c
typedef void (*mgos_event_handler_t)(int ev, void *ev_data, void *userdata);
```
 Event handler signature. 
#### mgos_event_add_handler

```c
bool mgos_event_add_handler(int ev, mgos_event_handler_t cb, void *userdata);
```

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
 
#### mgos_event_add_group_handler

```c
bool mgos_event_add_group_handler(int evgrp, mgos_event_handler_t cb,
                                  void *userdata);
```

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
 
#### mgos_event_remove_handler

```c
bool mgos_event_remove_handler(int ev, mgos_event_handler_t cb, void *userdata);
bool mgos_event_remove_group_handler(int evgrp, mgos_event_handler_t cb,
                                     void *userdata);
```

Remove an event handler.
Both cb and userdata must match the initial add invocation.
Returns true if a handler was found and removed, false if there was no
such handler in the first place.
 
