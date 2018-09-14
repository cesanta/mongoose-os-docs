# RPC over MQTT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-mqtt](https://github.com/mongoose-os-libs/rpc-mqtt) | [mgos_rpc_channel_mqtt.h](https://github.com/mongoose-os-libs/rpc-mqtt/tree/master/include/mgos_rpc_channel_mqtt.h) | &nbsp;  | &nbsp;         |



## Overview

MQTT RPC channel allows invoking RPC calls via MQTT. For example, assuming
your device id is `esp8266_DA7E15`, this command could be invoked to get
the config of a remote device:

```bash
mos --port mqtt://iot.eclipse.org:1883/esp8266_DA7E15 call Config.Get
```


 ----- 
#### mg_rpc_channel_mqtt

```c
struct mg_rpc_channel *mg_rpc_channel_mqtt(const struct mg_str device_id);
```
 __cplusplus 
