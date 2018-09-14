# System
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_system.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_system.h) | [mgos_system.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_system.c)  | [api_sys.js](http://github.com/mongoose-os-libs/mjs/tree/master/fs/api_sys.js)         |


HAL that needs to be implemented for each hardware platform.
 

 ----- 
#### mgos_get_heap_size

```c
size_t mgos_get_heap_size(void);
```
<div class="apidescr">
 Get system memory size. 
</div>
#### mgos_get_free_heap_size

```c
size_t mgos_get_free_heap_size(void);
```
<div class="apidescr">
 Get system free memory. 
</div>
#### mgos_get_min_free_heap_size

```c
size_t mgos_get_min_free_heap_size(void);
```
<div class="apidescr">
 Get minimal watermark of the system free memory. 
</div>
#### mgos_get_fs_memory_usage

```c
size_t mgos_get_fs_memory_usage(void);
```
<div class="apidescr">
 Get filesystem memory usage 
</div>
#### mgos_get_fs_size

```c
size_t mgos_get_fs_size(void);
```
<div class="apidescr">
 Get filesystem size. 
</div>
#### mgos_get_free_fs_size

```c
size_t mgos_get_free_fs_size(void);
```
<div class="apidescr">
 Get filesystem free space. 
</div>
#### mgos_fs_gc

```c
void mgos_fs_gc(void);
```
<div class="apidescr">
 Garbage-collect filesystem 
</div>
#### mgos_wdt_feed

```c
void mgos_wdt_feed(void);
```
<div class="apidescr">
 Feed watchdog 
</div>
#### mgos_wdt_set_timeout

```c
void mgos_wdt_set_timeout(int secs);
```
<div class="apidescr">
 Set watchdog timeout
</div>
#### mgos_wdt_enable

```c
void mgos_wdt_enable(void);
```
<div class="apidescr">
 Enable watchdog 
</div>
#### mgos_wdt_disable

```c
void mgos_wdt_disable(void);
```
<div class="apidescr">
 Disable watchdog 
</div>
#### mgos_system_restart

```c
void mgos_system_restart(void);
```
<div class="apidescr">
 Restart system 
</div>
#### mgos_msleep

```c
void mgos_msleep(uint32_t msecs);
```
<div class="apidescr">
 Delay given number of milliseconds 
</div>
#### mgos_usleep

```c
void mgos_usleep(uint32_t usecs);
```
<div class="apidescr">
 Delay given number of microseconds 
</div>
#### mgos_ints_disable

```c
void mgos_ints_disable(void);
```
<div class="apidescr">
 Disable interrupts 
</div>
#### mgos_ints_enable

```c
void mgos_ints_enable(void);
```
<div class="apidescr">
 Enable interrupts 
</div>
#### (*mgos_cb_t)

```c
typedef void (*mgos_cb_t)(void *arg);
```
<div class="apidescr">
 Callback for `mgos_invoke_cb()` 
</div>
#### mgos_invoke_cb

```c
bool mgos_invoke_cb(mgos_cb_t cb, void *arg, bool from_isr);
```
<div class="apidescr">

Invoke a callback in the main MGOS event loop.
Returns true if the callback has been scheduled for execution.
 
</div>
#### mgos_get_cpu_freq

```c
uint32_t mgos_get_cpu_freq(void);
```
<div class="apidescr">
 Get the CPU frequency in Hz 
</div>
#### mgos_rlock_create

```c
struct mgos_rlock_type *mgos_rlock_create(void);
```
<div class="apidescr">
 Create a recursive lock. 
</div>
#### mgos_rlock

```c
void mgos_rlock(struct mgos_rlock_type *l);
```
<div class="apidescr">
 Acquire a recursive lock. 
</div>
#### mgos_runlock

```c
void mgos_runlock(struct mgos_rlock_type *l);
```
<div class="apidescr">
 Release a recursive lock. 
</div>
#### mgos_rlock_destroy

```c
void mgos_rlock_destroy(struct mgos_rlock_type *l);
```
<div class="apidescr">
 Destroy a recursive lock. 
</div>

### JS API

 --- 
#### Sys._sbuf

```javascript
Sys._sbuf(len)
```
<div class="apidescr">
Helper function to allocate string of at least given length. Note that
the resulting string is usually bigger than this, and it is always
longer than 5 bytes; that's to guarantee that the string data is stored in
a common buffer and not inlined into mjs_val_t, thus the buffer can be
used as an "output" buffer: a string can be passed to some function which
will alter the contents, and these changes will be visible to the caller.
</div>
#### Sys.calloc

```javascript
Sys.calloc(nmemb, size)
```
<div class="apidescr">
Allocate a memory region.
Note: currently memory allocated this way must be explicitly released with `free()`.
</div>
#### Sys.total_ram

```javascript
Sys.total_ram()
```
<div class="apidescr">
Return total available RAM in bytes.
</div>
#### Sys.free_ram

```javascript
Sys.free_ram()
```
<div class="apidescr">
Return free available RAM in bytes.
</div>
#### Sys.reboot

```javascript
Sys.reboot(us)
```
<div class="apidescr">
Reboot the system after `us` microseconds. Return value: none.
</div>
#### Sys.uptime

```javascript
Sys.uptime()
```
<div class="apidescr">
Return number of seconds since last reboot.
</div>
#### Sys.usleep

```javascript
Sys.usleep(microseconds)
```
<div class="apidescr">
Sleep given number of microseconds.
Return value: none.
</div>
#### Sys.wdt_feed

```javascript
Sys.wdt_feed()
```
<div class="apidescr">
Feed the watchdog timer.
Return value: none.
</div>
