# Mongoose OS quick start quide

A 10-minutes tutorial that makes your device into a mobile-controllable,
updatable, remotely manageable, secure, configurable product. Just follow
the steps below.

## Installing mos tool

Mongoose OS uses `mos` tool for various tasks:
installation (flashing firmware), building firmware from C sources,
managing files on a device, calling device's RPC services, and so on.

|  OS |  Setup instructions | 
| --- | ------------------- |
| Windows | Create `C:\mos` folder. Right-click on this [mos.exe](https://mongoose-os.com/downloads/mos-release/win/mos.exe) link,  choose "Save target as", save `mos.exe` into the `C:\mos` folder. Start a command line prompt and type: <pre class="mt-1">cd C:\mos<br>mos --help</pre> |
|  MacOS | First, [install brew utility](https://brew.sh/). Then, <pre>brew tap cesanta/mos<br>brew install mos<br>mos --help</pre> |
|  Ubuntu Linux | <pre>sudo add-apt-repository ppa:mongoose-os/mos<br>sudo apt-get update<br>sudo apt-get install mos<br>mos --help</pre> |
|  Arch Linux | <pre>git clone https://github.com/cesanta/mos-tool<br>cd mos-tool/mos/archlinux_pkgbuild/mos-release<br>makepkg<br>pacman -U ./mos-*.tar.xz<br>mos --help</pre> |
|  Generic MacOS/Linux | <pre>curl -fsSL https://mongoose-os.com/downloads/mos/install.sh \| /bin/bash<br>mos --help</pre> |

### USB-to-Serial drivers

If `mos` tool cannot talk to your device, the most usual cause for that is USB-to-Serial drivers. Make sure you have them installed:

- [Silabs drivers](https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx) for Espressif boards
- [CH43x drivers](https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver) for Espressif boards
- [FTDI drivers](http://www.ftdichip.com/Drivers/VCP.htm) for CC3200, CC3220


### Web UI and command line mode

`mos` tool is a CLI (command line interface) utility, but it also has a
buit-in Web interface. If you start
`mos` with no arguments, from the terminal or by double-clicking the executable,
it'll start a web server and open a browser window. Alternatively,
you can use it from the command line - that's useful for build automation.
Run `mos --help` to see available commands, and `mos --helpfull` to see all
possible options.

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos --help
The Mongoose OS command line tool, v. 20170910-081234/master@f7f336fd+.
Commands:
  ...</code></pre>

### Using `--port` option

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

### Using environment variables to set default option values

The default values for any `mos` flag could be overridden via the
environment variable `MOS_FLAGNAME`. For example, to set the default value
for `--port` flag, export `MOS_PORT` variable - on Mac/Linux,
put that into your `~/.profile`:

```
export MOS_PORT=YOUR_SERIAL_PORT  # E.g. /dev/ttyUSB0
```

### Notes on wiring

In some cases, for example if you're using a bare-bones ESP8266
module instead of a development board, you need to perform extra
steps to switch the module between flashing and firmware boot
state. This table provides a summary:

| Platform           | Wiring Notes                                           |
| ------------------ |--------------------------------------------------------|
| bare bones ESP8266 |  flash via UART:  `GPIO15 LOW, GPIO0 LOW, GPIO2 HIGH`<br> boot from flash: `GPIO15 LOW, GPIO0 HIGH, GPIO2 HIGH`<br> boot from SD: `GPIO15 HIGH` |
| bare bones ESP32 |  flash via UART:  `GPIO0 LOW`<br> boot from flash: `GPIO0 HIGH`|
| CC3200 launchpad   | connect J8 to SOP2 (see [guide](http://energia.nu/cc3200guide/))  |

### Notes on versioning

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
