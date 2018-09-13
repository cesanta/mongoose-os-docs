
MQTT API.

See https://mongoose-os.com/blog/why-mqtt-is-getting-so-popular-in-iot/
for some background information.
 
### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/mqtt](https://github.com/mongoose-os-libs/mqtt) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API
#### mgos_mqtt_add_global_handler

```c
void mgos_mqtt_add_global_handler(mg_event_handler_t handler, void *ud);
```
 Registers a mongoose handler to be invoked on the global MQTT connection 
#### (*mgos_mqtt_connect_fn_t)

```c
typedef void (*mgos_mqtt_connect_fn_t)(struct mg_connection *c,
                                       const char *client_id,
                                       struct mg_send_mqtt_handshake_opts *opts,
                                       void *fn_arg);
```

Callback signature for `mgos_mqtt_set_connect_fn()`, see its docs for
details.
 
#### mgos_mqtt_set_connect_fn

```c
void mgos_mqtt_set_connect_fn(mgos_mqtt_connect_fn_t cb, void *fn_arg);
```

Set connect callback. It is invoked when CONNECT message is about to
be sent. The callback is responsible to call `mg_send_mqtt_handshake_opt()`
 
#### mgos_mqtt_get_global_conn

```c
struct mg_connection *mgos_mqtt_get_global_conn(void);
```

Returns current MQTT connection if it is established; otherwise returns
`NULL`
 
#### mgos_mqtt_global_connect

```c
bool mgos_mqtt_global_connect(void);
```

Attempt MQTT connection now (if enabled and not already connected).
Normally MQTT will try to connect in the background, at certain interval.
This function will force immediate connection attempt.
 
#### mgos_mqtt_pub

```c
bool mgos_mqtt_pub(const char *topic, const void *message, size_t len, int qos,
                   bool retain);
```

Publish message to the configured MQTT server, to the given MQTT topic.
Return value will be true if there is a connection to the server and the
message has been queued for sending. In case of QoS 1 return value does
not indicate that PUBACK has been received; there is currently no way to
check for that.
 
#### mgos_mqtt_pubf

```c
bool mgos_mqtt_pubf(const char *topic, int qos, bool retain,
                    const char *json_fmt, ...);
bool mgos_mqtt_pubv(const char *topic, int qos, bool retain,
                    const char *json_fmt, va_list ap);
```
 Variant of mgos_mqtt_pub for publishing a JSON-formatted string 
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

Callback signature for `mgos_mqtt_sub()` below.
 
#### mgos_mqtt_num_unsent_bytes

```c
size_t mgos_mqtt_num_unsent_bytes(void);
```

Returns number of pending bytes to send.
 
#### mgos_mqtt_get_packet_id

```c
uint16_t mgos_mqtt_get_packet_id(void);
```

Returns next packet id; the returned value is incremented every time the
function is called, and it's never 0 (so after 0xffff it'll be 1)
 
#### mgos_mqtt_set_max_qos

```c
void mgos_mqtt_set_max_qos(int qos);
```

Set maximum QOS level that is supported by server: 0, 1 or 2.
Some servers, particularly AWS GreenGrass, accept only QoS0 transactions.
An attempt to use any other QoS results into silent disconnect.
Therefore, instead of forcing all client code to track such server's quirks,
we add mechanism to transparently downgrade the QoS.
 

### JS API
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
