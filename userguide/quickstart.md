# Mongoose OS quick start quide

A 10-minutes tutorial that makes your device into a mobile-controllable,
updatable, remotely manageable, secure, configurable product. Just follow
the steps below.

## Install mos tool

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

## Start mos tool

Make sure your device is connected via the USB to your workstation.

On Windows, double-click on `mos.exe`. On Mac or Linux, start terminal
and enter `mos` command, with no arguments. Running `mos` tool this way,
without arguments, starts a Web UI window:

![](images/qs1.png)


## USB-to-Serial drivers

If the UI complains about the unavailable ports, and you have your device
connected, the problem could be with the USB-to-Serial driver.
Make sure you have them installed:

- [Silabs drivers](https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx) for Espressif boards
- [CH43x drivers](https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver) for Espressif boards
- [FTDI drivers](http://www.ftdichip.com/Drivers/VCP.htm) for CC3200, CC3220

When done, press `Ctrl-l` to refresh the window. In a port dropdown, at least
one port should be present.

![](images/qs2.png)

## Create new app

In a UI, choose your board from a dropdown menu. Then, press `Ctrl-n`
to create a new app. That will paste the `mos clone` command into the prompt.
Change `APP_NAME` to `my_app`:

![](images/qs3.png)

Press enter. That will clone the
[demo-js](https://github.com/mongoose-os-apps/demo-js) repository as `my_app`.
Notice how current directory has changed to `my_app`:

![](images/qs4.png)


## Build app firmware

Make sure the board is selected, then press `Ctrl-b` and press enter.
That starts a build process that takes several seconds to complete:

![](images/qs5.png)

When the command finishes, the built firmware will be located at `build/fw.zip`.
As you can see, we won't make any changes to the app - we'll do that later.

## Flash firmware

Type `mos flash` and press enter. That will flash a built firmware to a device.

## Configure WiFi

## Add device to the mDash management dashboard

## Enable mobile app

## Invite users (you) to use the mobile app

## Make changes to the firmware

## Update firmware over-the-air

