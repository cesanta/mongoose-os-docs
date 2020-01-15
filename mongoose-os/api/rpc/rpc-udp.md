# RPC over UDP
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-udp](https://github.com/mongoose-os-libs/rpc-udp) | [mgos_rpc_channel_udp.h](https://github.com/mongoose-os-libs/rpc-udp/blob/master/include/mgos_rpc_channel_udp.h) | &nbsp;  | &nbsp;         |



## Overview

Frames are sent as datagrams. Fragmentation is not supported, so 1 frame = 1 datagram.

Responses are supported, but because UDP is not reliable, it is best suited for notifications.

## Listener configuration

Set `rpc.udp.listen_addr` to `udp://0.0.0.0:1234` to listen on port 1234.

## Outbound channel configuration

To use UDP for outbound RPC, set `rpc.udp.dst_addr` to the address of the server / peer, e.g. `udp://192.168.1.23:1234`.

## mos tool support

`mos` supports UDP transport via the `udp://` port scheme, e.g.:

```
 $ mos call --port udp://192.168.11.5:1234/ Sys.GetInfo
```


 ----- 
