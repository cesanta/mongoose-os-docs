# MQTT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/mqtt](https://github.com/mongoose-os-libs/mqtt) | [mgos_mqtt.h](https://github.com/mongoose-os-libs/mqtt/blob/master/include/mgos_mqtt.h) | &nbsp;  | [api_mqtt.js](https://github.com/mongoose-os-libs/mqtt/blob/master/mjs_fs/api_mqtt.js)         |



This library provides [MQTT protocol](https://en.wikipedia.org/wiki/MQTT) client
API that allows devices to talk to MQTT servers.

Mongoose OS implements MQTT 3.1.1 client functionality, and works with
all popular MQTT server implementations, like AWS IoT, Google IoT Core,
Microsoft Azure, IBM Watson, HiveMQ, Mosquitto, etc.

In order to talk to an MQTT server, configure MQTT server settings -
see Configuration section below. Once configured, Mongoose OS keeps that
connection alive by reconnecting and re-subscribing to all topics
after disconnections - you do not need to implement the reconnection logic.

If you want to use TLS, set `mqtt.ssl_ca_cert=ca.pem`. Make sure that `ca.pem`
file has required CA certificates. If you want to use mutual TLS, set
`mqtt.ssl_cert=CLIENT_CERT.pem` and `mqtt.ssl_key=PRIVATE_KEY.pem`.

See example video (don't forget to set `mqtt.enable=true` before you try it):

<iframe src="https://www.youtube.com/embed/8dvpeonjmC0"
  width="560" height="315"  frameborder="0" allowfullscreen></iframe>

## Configuration

The MQTT library adds `mqtt` section to the device configuration:

```javascript
{
  "clean_session": true,        // Clean session info stored on server 
  "client_id": "",              // If not set, device.id is used
  "enable": false,              // Enable MQTT functionality
  "keep_alive": 60,             // How often to send PING messages in seconds
  "pass": "",                   // User password
  "reconnect_timeout_min": 2,   // Minimum reconnection timeout in seconds
  "reconnect_timeout_max": 60,  // Maximum reconnection timeout in seconds
  "server": "iot.eclipse.org",  // Server to connect to. if `:PORT` is not specified,
                                // 1883 or 8883 is used depending on whether SSL is enabled.
  "ssl_ca_cert": "",            // Set this to file name with CA certs to enable TLS
  "ssl_cert": "",               // Client certificate for mutual TLS
  "ssl_cipher_suites": "",      // TLS cipher suites
  "ssl_key": "",                // Private key for the client certificate
  "ssl_psk_identity": "",       // If set, a preshared key auth is used
  "ssl_psk_key": "",            // Preshared key
  "user": "",                   // MQTT user name, if MQTT auth is used
  "will_message": "",           // MQTT last will message
  "will_topic": ""              // MQTT last will topic
  
  "cloud_events": true,         // Trigger cloud events when connected / disconnected"
  "debug_use_log_level": false, // Use the original cs_log_level enum instead of stdout/stderr flag
}
```

## Reconnect behavior and backup server

It is possible to have a "backup" server that device will connect to if it fails to connect to the primary server.

Backup server is configured under the `mqtt1` section which contains exactly the same parameters as `mqtt` described above.

Device will first try to connect to the main server configured under `mqtt`.
It will keep connecting to it, increasing the reconnection interval from `reconnect_timeout_min` to `reconnect_timeout_max`.
Reconnection interval is doubled after each attempt so for values above there will be
connection attempts after 2, 4, 8, 16, 32 and 60 seconds.
After reaching the maximum reconnect interval and if `mqtt1.enable` is set, it will switch to the `mqtt1`
configuration and reset the reconnect interval, so it will try to connect to `mqtt1` the same way.
If that works, it will stay connected to `mqtt1`. If connection drops, it will try to reconnect to `mqtt1`
in the same way. If connection to backup server fails, it will go back to the main server and so on.


 ----- 

MQTT API.

See https://mongoose-os.com/blog/why-mqtt-is-getting-so-popular-in-iot/
for some background information.
 

 ----- 
#### mgos_mqtt_global_subscribe

```c
void mgos_mqtt_global_subscribe(const struct mg_str topic,
                                mg_event_handler_t handler, void *ud);
```
> 
> Subscribe to a specific topic.
> This handler will receive SUBACK - when first subscribed to the topic,
> PUBLISH - for messages published to this topic, PUBACK - acks for PUBLISH
> requests. MG_EV_CLOSE - when connection is closed.
>  
#### mgos_mqtt_add_global_handler

```c
void mgos_mqtt_add_global_handler(mg_event_handler_t handler, void *ud);
```
>  Registers a mongoose handler to be invoked on the global MQTT connection 
#### (*mgos_mqtt_connect_fn_t)

```c
typedef void (*mgos_mqtt_connect_fn_t)(struct mg_connection *c,
                                       const char *client_id,
                                       struct mg_send_mqtt_handshake_opts *opts,
                                       void *fn_arg);
```
> 
> Callback signature for `mgos_mqtt_set_connect_fn()`, see its docs for
> details.
>  
#### mgos_mqtt_set_connect_fn

```c
void mgos_mqtt_set_connect_fn(mgos_mqtt_connect_fn_t cb, void *fn_arg);
```
> 
> Set connect callback. It is invoked when CONNECT message is about to
> be sent. The callback is responsible to call `mg_send_mqtt_handshake_opt()`
>  
#### mgos_mqtt_get_global_conn

```c
struct mg_connection *mgos_mqtt_get_global_conn(void);
```
> 
> Returns current MQTT connection if it is established; otherwise returns
> `NULL`
>  
#### mgos_mqtt_global_connect

```c
bool mgos_mqtt_global_connect(void);
```
> 
> Attempt MQTT connection now (if enabled and not already connected).
> Normally MQTT will try to connect in the background, at certain interval.
> This function will force immediate connection attempt.
>  
#### mgos_mqtt_global_disconnect

```c
void mgos_mqtt_global_disconnect(void);
```
> 
> Disconnect from and/or stop trying to connect to MQTT server
> until mgos_mqtt_global_connect() is called.
>  
#### mgos_mqtt_global_is_connected

```c
bool mgos_mqtt_global_is_connected(void);
```
>  Returns true if MQTT connection is up, false otherwise. 
#### mgos_mqtt_pub

```c
uint16_t mgos_mqtt_pub(const char *topic, const void *message, size_t len,
                       int qos, bool retain);
```
> 
> Publish message to the configured MQTT server, to the given MQTT topic.
> Return value will be the packet id (> 0) if there is a connection to the
> server and the message has been queued for sending. In case no connection is
> available, 0 is returned. In case of QoS 1 return value does not indicate
> that PUBACK has been received; there is currently no way to check for that.
>  
#### mgos_mqtt_pubf

```c
uint16_t mgos_mqtt_pubf(const char *topic, int qos, bool retain,
                        const char *json_fmt, ...);
uint16_t mgos_mqtt_pubv(const char *topic, int qos, bool retain,
                        const char *json_fmt, va_list ap);
```
>  Variant of mgos_mqtt_pub for publishing a JSON-formatted string 
#### (*sub_handler_t)

```c
typedef void (*sub_handler_t)(struct mg_connection *nc, const char *topic,
                              int topic_len, const char *msg, int msg_len,
                              void *ud);
/*
 * Subscribe on a topic on a configured MQTT server.
 */
void mgos_mqtt_sub(const char *topic, sub_handler_t, void *ud);
```
> 
> Callback signature for `mgos_mqtt_sub()` below.
>  
#### mgos_mqtt_num_unsent_bytes

```c
size_t mgos_mqtt_num_unsent_bytes(void);
```
> 
> Returns number of pending bytes to send.
>  
#### mgos_mqtt_get_packet_id

```c
uint16_t mgos_mqtt_get_packet_id(void);
```
> 
> Returns next packet id; the returned value is incremented every time the
> function is called, and it's never 0 (so after 0xffff it'll be 1)
>  
#### mgos_mqtt_set_max_qos

```c
void mgos_mqtt_set_max_qos(int qos);
```
> 
> Set maximum QOS level that is supported by server: 0, 1 or 2.
> Some servers, particularly AWS GreenGrass, accept only QoS0 transactions.
> An attempt to use any other QoS results into silent disconnect.
> Therefore, instead of forcing all client code to track such server's quirks,
> we add mechanism to transparently downgrade the QoS.
>  

### JS API

 --- 
#### MQTT.isConnected

```javascript
MQTT.isConnected()
```
Return value: true if MQTT connection is up, false otherwise.
#### MQTT.sub

```javascript
MQTT.sub(topic, handler)
```
Subscribe to a topic, and call given handler function when message arrives.
A handler receives 4 parameters: MQTT connection, topic name,
message, and userdata.
Return value: none.

Example:
```javascript
load('api_mqtt.js');
MQTT.sub('my/topic/#', function(conn, topic, msg) {
  print('Topic:', topic, 'message:', msg);
}, null);
```
#### MQTT.pub

```javascript
MQTT.pub(topic, message, qos, retain)
```
Publish message to a topic. If `qos` is not specified, it defaults to 0.
If `retain` is not specified, it defaults to `false`.
Return value: 0 on failure (e.g. no connection to server), 1 on success.

Example - send MQTT message on button press, with QoS 1, no retain:
```javascript
load('api_mqtt.js');
load('api_gpio.js');
let pin = 0, topic = 'my/topic';
GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  let res = MQTT.pub('my/topic', JSON.stringify({ a: 1, b: 2 }), 1);
  print('Published:', res ? 'yes' : 'no');
}, null);
```
#### MQTT.setEventHandler

```javascript
MQTT.setEventHandler(handler, userdata)
```
Set MQTT connection event handler. Event handler is
`ev_handler(conn, ev, edata)`, where `conn` is an opaque connection handle,
`ev` is an event number, `edata` is an event-specific data.
`ev` values could be low-level network events, like `Net.EV_CLOSE`
or `Net.EV_POLL`, or MQTT specific events, like `MQTT.EV_CONNACK`.

Example:
```javascript
MQTT.setEventHandler(function(conn, ev, edata) {
  if (ev !== 0) print('MQTT event handler: got', ev);
}, null);
```
