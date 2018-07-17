# MakerFactory board + Mongoose OS

This tutorial demonstrates how to use Mongoose OS on MakerFactory ESP32
development board, and use Google IoT core as a cloud backed to
control the board and report metrics.

## Setup the board and Google IoT Core

Please follow [Google IoT Core tutorial](../cloud/google.md)
in order to setup the cloud side and provision your board to Google IoT Core.

<video controls="" class="float-right border w-50 p-3">
    <source src="images/mf1.mp4" type="video/mp4">
</video>

NOTE: before executing `mos flash` command, press and hold
`IO0` button on the board in order to enter programming mode. That needs
to be done every time you flash the board.

HINT FOR THE MANUFACTURER:
in order to omit manual button press, modify USB-to-Serial adapter wiring by connecting
DTR to GPIO0 and RTS to RESET. See notes from Espressif at
https://github.com/espressif/esptool/wiki/ESP8266-Boot-Mode-Selection#automatic-bootloader


## Controlling LED via Google IoT Core

Start your favorite editor, create a file called `init.js`, copy-paste
the following snippet and save:

```javascript
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_neopixel.js');

let pin = 5, numPixels = 4, colorOrder = NeoPixel.GRB;
let strip = NeoPixel.create(pin, numPixels, colorOrder);

let topic = '/devices/' + Cfg.get('device.id') + '/config';
MQTT.sub(topic, function(conn, topic, msg) {
  print('Topic:', topic, 'message:', msg);
  // Expected config format: {"led": 0, "r": 123, "g": 123, "b":123}
  let obj = JSON.parse(msg); 
  strip.setPixel(obj.led, obj.g, obj.r, obj.b);
  strip.show();
}, null);
```

The snippet above initialises RGB LED strip, and subscribes to the
`/config` object notifications. Once the config object is sent to device
by Google IoT Core, the handler function is called and lights the
corresponding LED.

In the command prompt (or terminal on Linux/Mac), enter the following commands
to copy `init.js` to the device, reboot the device, and start monitoring
serial output:

```
mos put init.js
mos call Sys.Reboot
```
