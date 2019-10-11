# RPC over MQTT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-mqtt](https://github.com/mongoose-os-libs/rpc-mqtt) | [mgos_rpc_channel_mqtt.h](https://github.com/mongoose-os-libs/rpc-mqtt/tree/master/include/mgos_rpc_channel_mqtt.h) | &nbsp;  | &nbsp;         |



## Overview

MQTT RPC channel allows invoking RPC calls via MQTT. 

## Topics

When `rpc.mqtt.enable` is true (default), device subscribes to `rpc.mqtt.sub_topic` (default: `${device.id}/rpc`, e.g. `esp8266_DA7E15/rpc` in the example).

Responses are published to `${src}/rpc`, where `${src}` is taken from the request's frame, so requests for which a response is expected must include `src`.

## Examples

### Request

Published to `esp8266_DA7E15/rpc`:
```
{ "id": 123, "src": "foo", "method": "Sys.GetInfo"}
```
Response will be published to `foo/rpc`.

### mos tool support

`mos` tool supports RPC over MQTT via the `mqtt` port schema:

```bash
$ mos --port mqtt://iot.eclipse.org/esp8266_DA7E15 call Sys.GetInfo
```

For brokers that require TLS, `mqtts` should be used:

```bash
$ mos --port mqtts://iot.eclipse.org/esp8266_DA7E15 call Sys.GetInfo
```

For brokers that require TLS client authentication (e.g. AWS), cert and file should be supplied:

```
$ mos --port mqtts://XXXXXXXX.iot.REGION.amazonaws.com/esp8266_DA7E15 --cert-file mycert.pem --key-file mykey.pem call Sys.GetInfo
```


 ----- 
#### mg_rpc_channel_mqtt

```c
struct mg_rpc_channel *mg_rpc_channel_mqtt(const struct mg_str device_id);
```
>  __cplusplus 
