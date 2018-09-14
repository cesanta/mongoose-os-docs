# Mongoose network lib
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/mongoose](https://github.com/mongoose-os-libs/mongoose) | [mgos_mongoose.h](https://github.com/mongoose-os-libs/mongoose/tree/master/include/mgos_mongoose.h) | &nbsp;  | &nbsp;         |



See [here](https://github.com/cesanta/mongoose).


 ----- 

This file contains wrappers around low-level Mongoose Library calls.

See https://mongoose-os.com/docs/book/intro.html#main-event-loop
for the detailed explanation.
 

 ----- 
#### mgos_get_mgr

```c
struct mg_mgr *mgos_get_mgr(void);
```
<div class="apidescr">
 Return global event manager 
</div>
#### mongoose_poll

```c
int mongoose_poll(int ms);
```
<div class="apidescr">

If there are active connections, calls `mg_mgr_poll` on global event
manager. Also calls all registered on-poll callbacks (see
`mgos_add_poll_cb()` and friends). Also feeds watchdog if that feature is
enabled (see `mgos_wdt_set_feed_on_poll()`). Also reports min free heap size
if that feature is enabled (see `mgos_set_enable_min_heap_free_reporting()`)
 
</div>
#### (*mgos_poll_cb_t)

```c
typedef void (*mgos_poll_cb_t)(void *cb_arg);
```
<div class="apidescr">

On-poll callback; `cb_arg` is an arbitrary pointer given to
`mgos_add_poll_cb()`
 
</div>
#### mgos_add_poll_cb

```c
void mgos_add_poll_cb(mgos_poll_cb_t cb, void *cb_arg);
```
<div class="apidescr">

Add an on-poll callback with an arbitrary argument, see `mongoose_poll()`.
 
</div>
#### mgos_remove_poll_cb

```c
void mgos_remove_poll_cb(mgos_poll_cb_t cb, void *cb_arg);
```
<div class="apidescr">

Remove an on-poll callback, see `mongoose_poll()`.
 
</div>
#### mgos_wdt_set_feed_on_poll

```c
void mgos_wdt_set_feed_on_poll(bool enable);
```
<div class="apidescr">

Set whether wdt should be fed on each call to `mongoose_poll()`.
 
</div>
#### mgos_set_enable_min_heap_free_reporting

```c
void mgos_set_enable_min_heap_free_reporting(bool enable);
```
<div class="apidescr">

Set whether min free heap size should be reported on each call to
`mongoose_poll()`.
 
</div>
