# Debug (UART)
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_debug.h](https://github.com/cesanta/mongoose-os/blob/master/include/mgos_debug.h) | [mgos_debug.c](https://github.com/cesanta/mongoose-os/blob/master/src/mgos_debug.c)  | [api_log.js](https://github.com/mongoose-os-libs/mjs/blob/master/fs/api_log.js)         |

#### mgos_debug_write

```c
void mgos_debug_write(int fd, const void *buf, size_t len);
```
> 
> Write debug info `buf`, `len` to the given file descriptor `fd`.
>  
#### mgos_debug_flush

```c
void mgos_debug_flush(void);
```
> 
> Flush debug UARTs, both stdout and stderr.
>  
#### mgos_set_stdout_uart

```c
enum mgos_init_result mgos_set_stdout_uart(int uart_no);
```
>  Set UART for stdout. Negative value disables stdout. 
#### mgos_set_stderr_uart

```c
enum mgos_init_result mgos_set_stderr_uart(int uart_no);
```
>  Set UART for stderr. Negative value disables stderr. 
#### mgos_get_stdout_uart

```c
int mgos_get_stdout_uart(void);
```
>  Get stdout UART number; -1 indicates that stdout is disabled. 
#### mgos_get_stderr_uart

```c
int mgos_get_stderr_uart(void);
```
>  Get stderr UART number; -1 indicates that stderr is disabled. 
#### mgos_debug_suspend_uart

```c
void mgos_debug_suspend_uart(void);
```
> 
> Suspend UART output (both stdout and stderr); see
> `mgos_debug_resume_uart()`. Nested suspension is supported: UART needs to be
> resumed as many times as it was suspended.
>  
#### mgos_debug_resume_uart

```c
void mgos_debug_resume_uart(void);
```
> 
> Resume previously suspended UART output, see `mgos_debug_suspend_uart()`.
>  
#### mgos_debug_uart_is_suspended

```c
bool mgos_debug_uart_is_suspended(void);
```
> 
> Returns whether UART output is suspended at the moment.
>  

### JS API

 --- 
#### Log.print

```javascript
Log.print(level, msg)
```
Print message to stderr if provided
level is >= `Cfg.get('debug.level')`. Possible levels are:
- `Log.ERROR` (0)
- `Log.WARN` (1)
- `Log.INFO` (2)
- `Log.DEBUG` (3)
- `Log.VERBOSE_DEBUG` (4)
#### Log.error

```javascript
Log.error(msg)
```
Shortcut for `Log.print(Log.ERROR, msg)`
#### Log.warn

```javascript
Log.warn(msg)
```
Shortcut for `Log.print(Log.WARN, msg)`
#### Log.info

```javascript
Log.info(msg)
```
Shortcut for `Log.print(Log.INFO, msg)`
#### Log.debug

```javascript
Log.debug(msg)
```
Shortcut for `Log.print(Log.DEBUG, msg)`
#### Log.verboseDebug

```javascript
Log.verboseDebug(msg)
```
Shortcut for `Log.print(Log.VERBOSE_DEBUG, msg)`
