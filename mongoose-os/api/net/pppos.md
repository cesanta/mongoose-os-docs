# PPPoS
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/pppos](https://github.com/mongoose-os-libs/pppos) | [mgos_pppos.h](https://github.com/mongoose-os-libs/pppos/blob/master/include/mgos_pppos.h) | &nbsp;  | &nbsp;         |



This library provides IP over serial port. Encapsulation is PPP.

## Settings

```
  "pppos": {
    "enable": false,                # Enable PPPoS
    "uart_no": 1,                   # Which UART to use.
    "baud_rate": 115200,            # Baud rate, data mode is 8-N-1.
    "fc_enable": false,             # Enable hardware CTS/RTS flow control
    "apn": "",                      # APN name
    "user": "",                     # User name
    "pass": "",                     # Password
    "connect_cmd": "ATDT*99***1#",  # AT command to send to initiate PPP data mode
    "echo_interval": 10,            # LCP Echo interval, seconds
    "echo_fails": 3,                # Number of failed echos before connection is declared dead are retried
    "hexdump_enable": false         # Dump all the data sent over UART to stderr
  }
```

Default UART pin assignments are used and they can be found [here](https://github.com/cesanta/mongoose-os/blob/aa89bc237e4ba492e791a069617a5c6f74ee63f4/fw/platforms/esp32/src/esp32_uart.c#L228).

## Example configuration

Access Point Name, PPP username and password depend on the operator. They are usually public and can be found [here](http://wiki.apnchanger.org/Main_Page).

Here's an example for Vodafone Ireland:

```
"pppos": {
  "enable": true,
  "uart_no": 1,
  "apn": "live.vodafone.ie",
  "user": "dublin",
  "pass": "dublin",
}
```


 ----- 
#### mgos_pppos_dev_get_ip_info

```c
bool mgos_pppos_dev_get_ip_info(int if_instance,
                                struct mgos_net_ip_info *ip_info);
```
> 
> Retrieve IP configuration of the provided instance number (which should be
> of type `MGOS_NET_IF_TYPE_PPP`), and fill provided `ip_info` with it. Returns
> `true` in case of success, false otherwise.
>  
#### mgos_pppos_create

```c
bool mgos_pppos_create(const struct mgos_config_pppos *cfg, int if_instance);
```
>  Create PPPoS interface instance.
> cfg must remain valid for the lifetime of the instance. 
#### mgos_pppos_connect

```c
bool mgos_pppos_connect(int if_instance);
```
>  Initiate connection. 
#### mgos_pppos_disconnect

```c
bool mgos_pppos_disconnect(int if_instance);
```
>  Disconnect interface. 
#### (*mgos_pppos_cmd_cb_t)

```c
typedef bool (*mgos_pppos_cmd_cb_t)(void *cb_arg, bool ok, struct mg_str data);
```
> 
> Command/sequence callback.
> ok will be set to the command response status (OK = true, ERROR == false).
> data will contain response payload - any data received from the modem
> after the comamnd was sent and before OK/ERROR was received.
> Return value should indicate whether sequence should continue: if callback
> returns true, the sequence continued and next command is executed.
> If the return value is false, the sequence is aborted, remaining commands
> (if any) are not executed and sequence finalizer is run (if provided).
>  
#### mgos_pppos_run_cmds

```c
bool mgos_pppos_run_cmds(int if_instance, const struct mgos_pppos_cmd *cmds);
```
> 
> Send custom command sequence. This can be sent both when the interface is
> idle as well as when connection is up. In the latter case the connectio will
> be suspended to execute the command sequence.
> If cb is set, it will receive command response (not including  OK/ERROR).
> The sequence must end with an entry that has cmd set to NULL.
> Callback on this last entry, if set, serves as a finalzier: it will be
> invoked when the sequence ends, successfully or not (this is passed as "ok"
> argument). The finalizer does not receive and data.
> 
> mgos_pppos_run_cmds may return false if the modem is busy executing
> another command sequence.
> 
> Example:
>   // Retrieve GNSS status from SimCom GPS-capable modem:
>   const struct mgos_pppos_cmd cmds[] = {
>       {.cmd = "AT+CGNSPWR=1"},  // Turn on GNSS (if not already).
>       {.cmd = "AT+CGNSINF", .cb = gnsinf_cb},
>       {.cmd = NULL},
>   };
>   mgos_pppos_run_cmds(0, cmds);
> 
>   bool gnsinf_cb(void *cb_arg, bool ok, struct mg_str data) {
>     if (!ok) return false;
>     int run = 0, fix = 0;
>     char time[20];
>     float lat = 0, lon = 0, alt = 0, speed = 0, course = 0;
>     sscanf(data.p, "+CGNSINF: %d,%d,%18s,%f,%f,%f,%f,%f",
>                    &run, &fix, time, &lat, &lon, &alt, &speed, &course);
>     if (fix) {
>       LOG(LL_INFO, ("lat,lon: %f,%f alt: %.3f speed: %.2f course: %.2f",
>                     lat, lon, alt, speed, course));
>     } else {
>       LOG(LL_INFO, ("No GNSS fix yet"));
>     }
>     (void) cb_arg;
>     return true;
>   }
>  
