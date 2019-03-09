# mos tool reference

## Using `--port` option

`mos` tool connects to the device specified by `--port` flag, which is
set to `auto` by default. That means, `mos` auto-detects the serial port
for the device. You can specify this value manually. It could be a
serial device,  e.g. `--port COM3` on Windows or `--port /dev/ttyUSB0` on Linux.

It is possible to set `--port` value to be a network endpoint instead of
serial port. Device listens for commands on serial, Websocket, and MQTT
transports (unless they are disabled). Therefore, `--port ws://IP_ADDR/rpc`
connects to the remote device via Websocket, and
`--port mqtt://MQTT_SERVER/DEVICE_ID/rpc` via the MQTT protocol.
That gives an ability to use `mos` tool as a remote device management tool.

## Using environment variables to set default option values

The default values for any `mos` flag could be overridden via the
environment variable `MOS_FLAGNAME`. For example, to set the default value
for `--port` flag, export `MOS_PORT` variable - on Mac/Linux,
put that into your `~/.profile`:

```
export MOS_PORT=YOUR_SERIAL_PORT  # E.g. /dev/ttyUSB0
```

## Boards wiring

In some cases, for example if you're using a bare-bones ESP8266
module instead of a development board, you need to perform extra
steps to switch the module between flashing and firmware boot
state. This table provides a summary:

| Platform           | Wiring Notes                                           |
| ------------------ |--------------------------------------------------------|
| bare bones ESP8266 |  flash via UART:  `GPIO15 LOW, GPIO0 LOW, GPIO2 HIGH`<br> boot from flash: `GPIO15 LOW, GPIO0 HIGH, GPIO2 HIGH`<br> boot from SD: `GPIO15 HIGH` |
| bare bones ESP32 |  flash via UART:  `GPIO0 LOW`<br> boot from flash: `GPIO0 HIGH`|
| CC3200 launchpad   | connect J8 to SOP2 (see [guide](http://energia.nu/cc3200guide/))  |

## Versioning

The `mos` tool could be self-updated via the Web UI or via the console
command `mos update`. The `mos` tool version also influences the firmware
build: the libraries that are used during the build correspond to the
`mos` version. There are 3 ways you can stay updated:

- Pin to a specific version, e.g. `mos update 1.18`. This is the most
  stable approach, as nothing gets changed in this case
- Pin to the "release" channel, `mos update release`. This is the default.
  Released are created once in 1-2 weeks
- Pin to the "latest" channel, `mos update latest`. Get the most latest
  updates, but experience breakages sometimes

