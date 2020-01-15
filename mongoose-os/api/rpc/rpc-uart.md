# RPC over UART
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-uart](https://github.com/mongoose-os-libs/rpc-uart) | [mgos_rpc_channel_uart.h](https://github.com/mongoose-os-libs/rpc-uart/blob/master/include/mgos_rpc_channel_uart.h) | &nbsp;  | &nbsp;         |




 ----- 
#### mg_rpc_channel_uart

```c
struct mg_rpc_channel *mg_rpc_channel_uart(
    const struct mgos_config_rpc_uart *cfg,
    const struct mgos_uart_config *ucfg);
```
>  __cplusplus 
