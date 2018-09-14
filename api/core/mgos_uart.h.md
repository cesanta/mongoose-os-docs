# UART
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_uart.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_uart.h) | [mgos_uart.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_uart.c)  | [api_uart.js](http://github.com/mongoose-os-libs/mjs/tree/master/fs/api_uart.js)         |


See https://en.wikipedia.org/wiki/Universal_asynchronous_receiver-transmitter
for more information about UART.
 

 ----- 
#### mgos_uart_configure

```c
bool mgos_uart_configure(int uart_no, const struct mgos_uart_config *cfg);
```
<div class="apidescr">

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
 
</div>
#### mgos_uart_config_set_defaults

```c
void mgos_uart_config_set_defaults(int uart_no, struct mgos_uart_config *cfg);
```
<div class="apidescr">

Fill provided `cfg` structure with the default values. See example above.
 
</div>
#### mgos_uart_config_get

```c
bool mgos_uart_config_get(int uart_no, struct mgos_uart_config *cfg);
```
<div class="apidescr">

Fill provided `cfg` structure with the current UART config.
Returns false if the specified UART has not bee configured yet.
 
</div>
#### (*mgos_uart_dispatcher_t)

```c
typedef void (*mgos_uart_dispatcher_t)(int uart_no, void *arg);
```
<div class="apidescr">
 UART dispatcher signature, see `mgos_uart_set_dispatcher()` 
</div>
#### mgos_uart_set_dispatcher

```c
void mgos_uart_set_dispatcher(int uart_no, mgos_uart_dispatcher_t cb,
                              void *arg);
```
<div class="apidescr">

Set UART dispatcher: a callback which gets called when there is data in the
input buffer or space available in the output buffer.
 
</div>
#### mgos_uart_write

```c
size_t mgos_uart_write(int uart_no, const void *buf, size_t len);
```
<div class="apidescr">

Write data to the UART.
Note: if there is enough space in the output buffer, the call will return
immediately, otherwise it will wait for buffer to drain.
If you want the call to not block, check mgos_uart_write_avail() first.
 
</div>
#### mgos_uart_write_avail

```c
size_t mgos_uart_write_avail(int uart_no);
```
<div class="apidescr">
 Returns amount of space availabe in the output buffer. 
</div>
#### mgos_uart_printf

```c
int mgos_uart_printf(int uart_no, const char *fmt, ...);
```
<div class="apidescr">

Write data to UART, printf style.
Note: currently this requires that data is fully rendered in memory before
sending. There is no fixed limit as heap allocation is used, but be careful
when printing longer strings.
 
</div>
#### mgos_uart_read

```c
size_t mgos_uart_read(int uart_no, void *buf, size_t len);
```
<div class="apidescr">

Read data from UART input buffer.
Note: unlike write, read will not block if there are not enough bytes in the
input buffer.
 
</div>
#### mgos_uart_read_mbuf

```c
size_t mgos_uart_read_mbuf(int uart_no, struct mbuf *mb, size_t len);
```
<div class="apidescr">
 Like `mgos_uart_read`, but reads into an mbuf. 
</div>
#### mgos_uart_read_avail

```c
size_t mgos_uart_read_avail(int uart_no);
```
<div class="apidescr">
 Returns the number of bytes available for reading. 
</div>
#### mgos_uart_set_rx_enabled

```c
void mgos_uart_set_rx_enabled(int uart_no, bool enabled);
```
<div class="apidescr">
 Controls whether UART receiver is enabled. 
</div>
#### mgos_uart_is_rx_enabled

```c
bool mgos_uart_is_rx_enabled(int uart_no);
```
<div class="apidescr">
 Returns whether UART receiver is enabled. 
</div>
#### mgos_uart_flush

```c
void mgos_uart_flush(int uart_no);
```
<div class="apidescr">
 Flush the UART output buffer - waits for data to be sent. 
</div>
#### mgos_uart_schedule_dispatcher

```c
void mgos_uart_schedule_dispatcher(int uart_no, bool from_isr);
```
<div class="apidescr">
 Schedule a call to dispatcher on the next `mongoose_poll` 
</div>
#### mgos_uart_get_stats

```c
const struct mgos_uart_stats *mgos_uart_get_stats(int uart_no);
```
<div class="apidescr">
 Get UART statistics 
</div>

### JS API

 --- 
#### UART.setConfig

```javascript
UART.setConfig(uartNo, param)
```
<div class="apidescr">
Set UART config. `param` is an
object with the following optional fields:

- `baudRate`: baud rate, integer, default: 115200;
- `numDataBits`: Number of data bits, default: 8;
- `parity`: Parity: 0 - none, 1 - even, 2 - odd; default: none;
- `numStopBits`: Number of stop bits: 1 - 1 bit, 2 - 2 bits, 3 - 1.5; default: 1;
- `rxBufSize`: size of the Rx buffer, integer, default: 256;
- `rxFlowControl`: whether Rx flow control (RTS pin) is enabled, boolean,
   default: false;
- `rxLingerMicros`: how many microseconds to linger after Rx fifo
  is empty, in case more data arrives. Integer, default: 15;
- `txBufSize`: size of the Tx buffer, integer, default: 256;
- `txFlowControl`: whether Tx flow control (CTS pin) is enabled, boolean,
  default: false;

Other than that, there are architecture-dependent settings, grouped in
the objects named with the architecture name: "esp32", "esp8266", etc.

Settings for esp32:

```
  esp32: {
     /*
      * GPIO pin numbers, default values depend on UART.
      *
      * UART 0: Rx: 3, Tx: 1, CTS: 19, RTS: 22
      * UART 1: Rx: 13, Tx: 14, CTS: 15, RTS: 16
      * UART 2: Rx: 17, Tx: 25, CTS: 26, RTS: 27
      */
     gpio: {
       rx: number,
       tx: number,
       cts: number,
       rts: number,
     },

     /* Hardware FIFO tweaks */
     fifo: {
       /*
        * A number of bytes in the hardware Rx fifo, should be between 1 and 127.
        * How full hardware Rx fifo should be before "rx fifo full" interrupt is
        * fired.
        */
       rxFullThresh: number,

       /*
        * A number of bytes in the hardware Rx fifo, should be more than
        * rx_fifo_full_thresh.
        *
        * How full hardware Rx fifo should be before CTS is deasserted, telling
        * the other side to stop sending data.
        */
       rxFcThresh: number,

       /*
        * Time in uart bit intervals when "rx fifo full" interrupt fires even if
        * it's not full enough
        */
       rxAlarm: number,

       /*
        * A number of bytes in the hardware Tx fifo, should be between 1 and 127.
        * When the number of bytes in Tx buffer becomes less than
        * tx_fifo_empty_thresh, "tx fifo empty" interrupt fires.
        */
       txEmptyThresh: number,
     },
   }
```
</div>
#### UART.setDispatcher

```javascript
UART.setDispatcher(uartNo, callback, userdata)
```
<div class="apidescr">
Set UART dispatcher
callback which gets invoked when there is a new data in the input buffer
or when the space becomes available on the output buffer.

Callback receives the following arguments: `(uartNo, userdata)`.
</div>
#### UART.write

```javascript
UART.write(uartNo, data)
```
<div class="apidescr">
Write data to the buffer. Returns number of bytes written.

Example usage: `UART.write(1, "foobar")`, in this case, 6 bytes will be written.
</div>
#### UART.writeAvail

```javascript
UART.writeAvail(uartNo)
```
<div class="apidescr">
Return amount of space available in the output buffer.
</div>
#### UART.read

```javascript
UART.read(uartNo)
```
<div class="apidescr">
It never blocks, and returns a string containing
read data (which will be empty if there's no data available).
</div>
#### UART.readAvail

```javascript
UART.readAvail(uartNo)
```
<div class="apidescr">
Return amount of data available in the input buffer.
</div>
#### UART.setRxEnabled

```javascript
UART.setRxEnabled(uartNo)
```
<div class="apidescr">
Set whether Rx is enabled.
</div>
#### UART.isRxEnabled

```javascript
UART.isRxEnabled(uartNo)
```
<div class="apidescr">
Returns whether Rx is enabled.
</div>
#### UART.flush

```javascript
UART.flush(uartNo)
```
<div class="apidescr">
Flush the UART output buffer, wait for the data to be sent.
</div>
