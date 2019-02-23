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
>  Get system memory size. 
#### mgos_get_free_heap_size

```c
size_t mgos_get_free_heap_size(void);
```
>  Get system free memory. 
#### mgos_get_min_free_heap_size

```c
size_t mgos_get_min_free_heap_size(void);
```
>  Get minimal watermark of the system free memory. 
#### mgos_get_fs_memory_usage

```c
size_t mgos_get_fs_memory_usage(void);
```
>  Get filesystem memory usage 
#### mgos_get_fs_size

```c
size_t mgos_get_fs_size(void);
```
>  Get filesystem size. 
#### mgos_get_free_fs_size

```c
size_t mgos_get_free_fs_size(void);
```
>  Get filesystem free space. 
#### mgos_fs_gc

```c
void mgos_fs_gc(void);
```
>  Garbage-collect filesystem 
#### mgos_wdt_feed

```c
void mgos_wdt_feed(void);
```
>  Feed watchdog 
#### mgos_wdt_set_timeout

```c
void mgos_wdt_set_timeout(int secs);
```
>  Set watchdog timeout
#### mgos_wdt_enable

```c
void mgos_wdt_enable(void);
```
>  Enable watchdog 
#### mgos_wdt_disable

```c
void mgos_wdt_disable(void);
```
>  Disable watchdog 
#### mgos_system_restart

```c
void mgos_system_restart(void);
```
>  Restart system 
#### mgos_msleep

```c
void mgos_msleep(uint32_t msecs);
```
>  Delay given number of milliseconds 
#### mgos_usleep

```c
void mgos_usleep(uint32_t usecs);
```
>  Delay given number of microseconds 
#### mgos_ints_disable

```c
void mgos_ints_disable(void);
```
>  Disable interrupts 
#### mgos_ints_enable

```c
void mgos_ints_enable(void);
```
>  Enable interrupts 
#### (*mgos_cb_t)

```c
typedef void (*mgos_cb_t)(void *arg);
```
>  Callback for `mgos_invoke_cb()` 
#### mgos_invoke_cb

```c
bool mgos_invoke_cb(mgos_cb_t cb, void *arg, bool from_isr);
```
> 
> Invoke a callback in the main MGOS event loop.
> Returns true if the callback has been scheduled for execution.
>  
#### mgos_get_cpu_freq

```c
uint32_t mgos_get_cpu_freq(void);
```
>  Get the CPU frequency in Hz 
#### mgos_rlock_create

```c
struct mgos_rlock_type *mgos_rlock_create(void);
```
>  Create a recursive lock. 
#### mgos_rlock

```c
void mgos_rlock(struct mgos_rlock_type *l);
```
>  Acquire a recursive lock. 
#### mgos_runlock

```c
void mgos_runlock(struct mgos_rlock_type *l);
```
>  Release a recursive lock. 
#### mgos_rlock_destroy

```c
void mgos_rlock_destroy(struct mgos_rlock_type *l);
```
>  Destroy a recursive lock. 

### JS API

 --- 
#### Sys._sbuf

```javascript
Sys._sbuf(len)
```
Helper function to allocate string of at least given length. Note that
the resulting string is usually bigger than this, and it is always
longer than 5 bytes; that's to guarantee that the string data is stored in
a common buffer and not inlined into mjs_val_t, thus the buffer can be
used as an "output" buffer: a string can be passed to some function which
will alter the contents, and these changes will be visible to the caller.
#### Sys.calloc

```javascript
Sys.calloc(nmemb, size)
```
Allocate a memory region.
Note: currently memory allocated this way must be explicitly released with
`free()`.
#### Sys.total_ram

```javascript
Sys.total_ram()
```
Return total available RAM in bytes.
#### Sys.free_ram

```javascript
Sys.free_ram()
```
Return free available RAM in bytes.
#### Sys.reboot

```javascript
Sys.reboot(ms)
```
Reboot the system after `ms` milliseconds. Return value: none.
#### Sys.uptime

```javascript
Sys.uptime()
```
Return number of seconds since last reboot.
#### Sys.usleep

```javascript
Sys.usleep(microseconds)
```
Sleep given number of microseconds.
Return value: none.
#### Sys.wdt_feed

```javascript
Sys.wdt_feed()
```
Feed the watchdog timer.
Return value: none.
