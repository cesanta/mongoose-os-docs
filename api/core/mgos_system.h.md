
# System

These API need to be implemented for each hardware platform.
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_system.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_system.h) | [mgos_system.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_system.c) |          |

#### mgos_get_free_heap_size

```c
size_t mgos_get_free_heap_size(void);
```
 Get system free memory. 
#### mgos_get_min_free_heap_size

```c
size_t mgos_get_min_free_heap_size(void);
```
 Get minimal watermark of the system free memory. 
#### mgos_get_fs_memory_usage

```c
size_t mgos_get_fs_memory_usage(void);
```
 Get filesystem memory usage 
#### mgos_get_fs_size

```c
size_t mgos_get_fs_size(void);
```
 Get filesystem size. 
#### mgos_get_free_fs_size

```c
size_t mgos_get_free_fs_size(void);
```
 Get filesystem free space. 
#### mgos_fs_gc

```c
void mgos_fs_gc(void);
```
 Garbage-collect filesystem 
#### mgos_wdt_feed

```c
void mgos_wdt_feed(void);
```
 Feed watchdog 
#### mgos_wdt_set_timeout

```c
void mgos_wdt_set_timeout(int secs);
```
 Set watchdog timeout
#### mgos_wdt_enable

```c
void mgos_wdt_enable(void);
```
 Enable watchdog 
#### mgos_wdt_disable

```c
void mgos_wdt_disable(void);
```
 Disable watchdog 
#### mgos_system_restart

```c
void mgos_system_restart(void);
```
 Restart system 
#### mgos_msleep

```c
void mgos_msleep(uint32_t msecs);
```
 Delay given number of milliseconds 
#### mgos_usleep

```c
void mgos_usleep(uint32_t usecs);
```
 Delay given number of microseconds 
#### mgos_ints_disable

```c
void mgos_ints_disable(void);
```
 Disable interrupts 
#### mgos_ints_enable

```c
void mgos_ints_enable(void);
```
 Enable interrupts 
#### (*mgos_cb_t)

```c
typedef void (*mgos_cb_t)(void *arg);
```
 Callback for `mgos_invoke_cb()` 
#### mgos_invoke_cb

```c
bool mgos_invoke_cb(mgos_cb_t cb, void *arg, bool from_isr);
```

Invoke a callback in the main MGOS event loop.
Returns true if the callback has been scheduled for execution.
 
#### mgos_get_cpu_freq

```c
uint32_t mgos_get_cpu_freq(void);
```
 Get the CPU frequency in Hz 
#### mgos_rlock_create

```c
struct mgos_rlock_type *mgos_rlock_create(void);
```
 Create a recursive lock. 
#### mgos_rlock

```c
void mgos_rlock(struct mgos_rlock_type *l);
```
 Acquire a recursive lock. 
#### mgos_runlock

```c
void mgos_runlock(struct mgos_rlock_type *l);
```
 Release a recursive lock. 
#### mgos_rlock_destroy

```c
void mgos_rlock_destroy(struct mgos_rlock_type *l);
```
 Destroy a recursive lock. 
