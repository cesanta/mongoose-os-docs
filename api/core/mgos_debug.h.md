
# Debug
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_debug.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_debug.h) | [mgos_debug.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_debug.c) |          |

#### mgos_debug_write

```c
void mgos_debug_write(int fd, const void *buf, size_t len);
```

Write debug info `buf`, `len` to the given file descriptor `fd`.
 
#### mgos_debug_flush

```c
void mgos_debug_flush(void);
```

Flush debug UARTs, both stdout and stderr.
 
#### mgos_set_stdout_uart

```c
enum mgos_init_result mgos_set_stdout_uart(int uart_no);
```
 Set UART for stdout. Negative value disables stdout. 
#### mgos_set_stderr_uart

```c
enum mgos_init_result mgos_set_stderr_uart(int uart_no);
```
 Set UART for stderr. Negative value disables stderr. 
#### mgos_get_stdout_uart

```c
int mgos_get_stdout_uart(void);
```
 Get stdout UART number; -1 indicates that stdout is disabled. 
#### mgos_get_stderr_uart

```c
int mgos_get_stderr_uart(void);
```
 Get stderr UART number; -1 indicates that stderr is disabled. 
#### mgos_debug_suspend_uart

```c
void mgos_debug_suspend_uart(void);
```

Suspend UART output (both stdout and stderr); see
`mgos_debug_resume_uart()`. Nested suspension is supported: UART needs to be
resumed as many times as it was suspended.
 
#### mgos_debug_resume_uart

```c
void mgos_debug_resume_uart(void);
```

Resume previously suspended UART output, see `mgos_debug_suspend_uart()`.
 
#### mgos_debug_uart_is_suspended

```c
bool mgos_debug_uart_is_suspended(void);
```

Returns whether UART output is suspended at the moment.
 
