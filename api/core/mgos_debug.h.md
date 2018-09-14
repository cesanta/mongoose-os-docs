# Debug (UART)
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_debug.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_debug.h) | [mgos_debug.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_debug.c)  | [api_log.js](http://github.com/mongoose-os-libs/mjs/tree/master/fs/api_log.js)         |

#### mgos_debug_write

```c
void mgos_debug_write(int fd, const void *buf, size_t len);
```
<div class="apidescr">

Write debug info `buf`, `len` to the given file descriptor `fd`.
 
</div>
#### mgos_debug_flush

```c
void mgos_debug_flush(void);
```
<div class="apidescr">

Flush debug UARTs, both stdout and stderr.
 
</div>
#### mgos_set_stdout_uart

```c
enum mgos_init_result mgos_set_stdout_uart(int uart_no);
```
<div class="apidescr">
 Set UART for stdout. Negative value disables stdout. 
</div>
#### mgos_set_stderr_uart

```c
enum mgos_init_result mgos_set_stderr_uart(int uart_no);
```
<div class="apidescr">
 Set UART for stderr. Negative value disables stderr. 
</div>
#### mgos_get_stdout_uart

```c
int mgos_get_stdout_uart(void);
```
<div class="apidescr">
 Get stdout UART number; -1 indicates that stdout is disabled. 
</div>
#### mgos_get_stderr_uart

```c
int mgos_get_stderr_uart(void);
```
<div class="apidescr">
 Get stderr UART number; -1 indicates that stderr is disabled. 
</div>
#### mgos_debug_suspend_uart

```c
void mgos_debug_suspend_uart(void);
```
<div class="apidescr">

Suspend UART output (both stdout and stderr); see
`mgos_debug_resume_uart()`. Nested suspension is supported: UART needs to be
resumed as many times as it was suspended.
 
</div>
#### mgos_debug_resume_uart

```c
void mgos_debug_resume_uart(void);
```
<div class="apidescr">

Resume previously suspended UART output, see `mgos_debug_suspend_uart()`.
 
</div>
#### mgos_debug_uart_is_suspended

```c
bool mgos_debug_uart_is_suspended(void);
```
<div class="apidescr">

Returns whether UART output is suspended at the moment.
 
</div>

### JS API

 --- 
#### Log.print

```javascript
Log.print(level, msg)
```
<div class="apidescr">
Print message to stderr if provided
level is >= `Cfg.get('debug.level')`. Possible levels are:
- `Log.ERROR` (0)
- `Log.WARN` (1)
- `Log.INFO` (2)
- `Log.DEBUG` (3)
- `Log.VERBOSE_DEBUG` (4)
</div>
#### Log.error

```javascript
Log.error(msg)
```
<div class="apidescr">
Shortcut for `Log.print(Log.ERROR, msg)`
</div>
#### Log.warn

```javascript
Log.warn(msg)
```
<div class="apidescr">
Shortcut for `Log.print(Log.WARN, msg)`
</div>
#### Log.info

```javascript
Log.info(msg)
```
<div class="apidescr">
Shortcut for `Log.print(Log.INFO, msg)`
</div>
#### Log.debug

```javascript
Log.debug(msg)
```
<div class="apidescr">
Shortcut for `Log.print(Log.DEBUG, msg)`
</div>
#### Log.verboseDebug

```javascript
Log.verboseDebug(msg)
```
<div class="apidescr">
Shortcut for `Log.print(Log.VERBOSE_DEBUG, msg)`
</div>
