# MQTT publish and subscribe

## JavaScript

```javascript
load('api_mqtt.js');
load('api_gpio.js');

let pin = 0, topic = 'my/topic';

GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  MQTT.pub('my/topic', JSON.stringify({ a: 1, b: 2 }));
}, null);

MQTT.sub('my/topic/#', function(conn, topic, msg) {
  print('Topic:', topic, 'message:', msg);
}, null);
```

Also, see [YouTube video](https://www.youtube.com/watch?v=8dvpeonjmC0).

## C/C++

```c
#include "mgos_mqtt.h"

static void handler(struct mg_connection *c, const char *topic, int topic_len,
                    const char *msg, int msg_len, void *userdata) {
  LOG(LL_INFO, ("Got message on topic %.*s", topic_len, topic));
  ...
}

mgos_mqtt_sub("my/#", handler, NULL);       /* Subscribe */
mgos_mqtt_pub("my/topic", "hi", 2, 1, 0);   /* Publish */
```
