
# UART

See https://en.wikipedia.org/wiki/Universal_asynchronous_receiver-transmitter
for more information about UART.
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_uart.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_uart.h) | [mgos_uart.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_uart.c) |          |

#### mgos_uart_configure

```c
bool mgos_uart_configure(int uart_no, const struct mgos_uart_config *cfg);
```

Apply given UART configuration.

Example:
```c
int uart_no = 0;

struct mgos_uart_config ucfg;
mgos_uart_config_set_defaults(uart_no, &ucfg);

ucfg.baud_rate = 115200;
ucfg.rx_buf_size = 1500;
ucfg.tx_buf_size = 1500;

if (!mgos_uart_configure(uart_no, &ucfg)) {
  LOG(LL_ERROR, ("Failed to configure UART%d", uart_no));
}
```
 
#### mgos_uart_config_set_defaults

```c
void mgos_uart_config_set_defaults(int uart_no, struct mgos_uart_config *cfg);
```

Fill provided `cfg` structure with the default values. See example above.
 
#### mgos_uart_config_get

```c
bool mgos_uart_config_get(int uart_no, struct mgos_uart_config *cfg);
```

Fill provided `cfg` structure with the current UART config.
Returns false if the specified UART has not bee configured yet.
 
#### (*mgos_uart_dispatcher_t)

```c
typedef void (*mgos_uart_dispatcher_t)(int uart_no, void *arg);
```
 UART dispatcher signature, see `mgos_uart_set_dispatcher()` 
#### mgos_uart_set_dispatcher

```c
void mgos_uart_set_dispatcher(int uart_no, mgos_uart_dispatcher_t cb,
                              void *arg);
```

Set UART dispatcher: a callback which gets called when there is data in the
input buffer or space available in the output buffer.
 
#### mgos_uart_write

```c
size_t mgos_uart_write(int uart_no, const void *buf, size_t len);
```

Write data to the UART.
Note: if there is enough space in the output buffer, the call will return
immediately, otherwise it will wait for buffer to drain.
If you want the call to not block, check mgos_uart_write_avail() first.
 
#### mgos_uart_write_avail

```c
size_t mgos_uart_write_avail(int uart_no);
```
 Returns amount of space availabe in the output buffer. 
#### mgos_uart_printf

```c
int mgos_uart_printf(int uart_no, const char *fmt, ...);
```

Write data to UART, printf style.
Note: currently this requires that data is fully rendered in memory before
sending. There is no fixed limit as heap allocation is used, but be careful
when printing longer strings.
 
#### mgos_uart_read

```c
size_t mgos_uart_read(int uart_no, void *buf, size_t len);
```

Read data from UART input buffer.
Note: unlike write, read will not block if there are not enough bytes in the
input buffer.
 
#### mgos_uart_read_mbuf

```c
size_t mgos_uart_read_mbuf(int uart_no, struct mbuf *mb, size_t len);
```
 Like `mgos_uart_read`, but reads into an mbuf. 
#### mgos_uart_read_avail

```c
size_t mgos_uart_read_avail(int uart_no);
```
 Returns the number of bytes available for reading. 
#### mgos_uart_set_rx_enabled

```c
void mgos_uart_set_rx_enabled(int uart_no, bool enabled);
```
 Controls whether UART receiver is enabled. 
#### mgos_uart_is_rx_enabled

```c
bool mgos_uart_is_rx_enabled(int uart_no);
```
 Returns whether UART receiver is enabled. 
#### mgos_uart_flush

```c
void mgos_uart_flush(int uart_no);
```
 Flush the UART output buffer - waits for data to be sent. 
#### mgos_uart_schedule_dispatcher

```c
void mgos_uart_schedule_dispatcher(int uart_no, bool from_isr);
```
 Schedule a call to dispatcher on the next `mongoose_poll` 
#### mgos_uart_get_stats

```c
const struct mgos_uart_stats *mgos_uart_get_stats(int uart_no);
```
 Get UART statistics 
