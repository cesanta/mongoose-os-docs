# IoT button example

## C/C++

## JavaScript

Make sure your app has [mqtt](https://github.com/mongoose-os-libs/mqtt)
library included. Then, edit `fs/init.js` file:

```javascript
load('api_config.js');
load('api_gpio.js');
load('api_sys.js');
load('api_mqtt.js');

let pin = Cfg.get('board.button1.pin');  // Built-in button GPIO number
let topic = '/devices/' + Cfg.get('device.id') + '/events';  // MQTT topic

let f = function() {
  let message = JSON.stringify({
    total_ram: Sys.total_ram(),
    free_ram: Sys.free_ram(),
    uptime: Sys.uptime(),
  });
  let ok = MQTT.pub(topic, message, 1);
  print('Published:', ok, topic, '->', message);
};

GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 20, f, null);
```
