# Mongoose OS + private MQTT server

The `mqtt` library provides [MQTT protocol](https://en.wikipedia.org/wiki/MQTT)
API that allows devices to talk to MQTT servers.

Mongoose OS implements MQTT 3.1.1 client functionality, and works with
all popular MQTT server implementations, like AWS IoT, Google IoT Core,
Microsoft Azure, IBM Watson, HiveMQ, Mosquitto, etc.

## Usage

In order to use MQTT functionality,
- Include [mqtt](https://github.com/mongoose-os-libs/mqtt) library in the `libs` section
of the `mos.yml` file of your app:
```yaml
libs:
  ...
  - origin: https://github.com/mongoose-os-libs/mqtt # <-- Add this!
```
- Rebuild and reflash your app:
```
mos build --platform YOUR_PLATFORM # e.g. stm32, esp32, cc3220, esp8266, cc3200, etc
mos flash
```

NOTE: if you're using a pre-built Mongoose OS `demo-js` app, that step is not
required, since `mqtt` library is already included in the `demo-js`.

In order to talk to an MQTT server, configure MQTT server settings -
see Configuration section below. Once configured, Mongoose OS keeps that
connection alive by reconnecting and re-subscribing to all topics
after disconnections - you do not need to implement the reconnection logic.

```
$ mos config-set mqtt.enable=true mqtt.server=my_server:1883
```

If you want to use TLS, set `mqtt.ssl_ca_cert=ca.pem`. Make sure that `ca.pem`
file has required CA certificates. If you want to use mutual TLS, set
`mqtt.ssl_cert=CLIENT_CERT.pem` and `mqtt.ssl_key=PRIVATE_KEY.pem`.

See example video (don't forget to set `mqtt.enable=true` before you try it):

<iframe src="https://www.youtube.com/embed/8dvpeonjmC0"
  style="width: 640px; height: 320px;"
  frameborder="1" allowfullscreen></iframe>

## MQTT publish and subscribe - JavaScript

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

## MQTT publish and subscribe - C/C++

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

## Configuration Reference

The MQTT library adds `mqtt` section to the device configuration:

```javascript
{
  "clean_session": true,        // Clean session info stored on server 
  "client_id": "",              // If not set, device.id is used
  "enable": false,              // Enable MQTT functionality
  "keep_alive": 60,             // How often to send PING messages in seconds
  "pass": "",                   // User password
  "reconnect_timeout_max": 60,  // Maximum reconnection timeout in seconds
  "reconnect_timeout_min": 2,   // Minimum reconnection timeout in seconds
  "server": "iot.eclipse.org:1883",    // SERVER:PORT to connect to
  "ssl_ca_cert": "",            // Set this to file name with CA certs to enable TLS
  "ssl_cert": "",               // Client certificate for mutual TLS
  "ssl_cipher_suites": "",      // TLS cipher suites
  "ssl_key": "",                // Private key for the client certificate
  "ssl_psk_identity": "",       // If set, a preshared key auth is used
  "ssl_psk_key": "",            // Preshared key
  "user": "",                   // MQTT user name, if MQTT auth is used
  "will_message": "",           // MQTT last will message
  "will_topic": ""              // MQTT last will topic
}
```
