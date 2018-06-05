# RPC - Remote Procedure Calls

RPC means Remote Procedure Call. Mongoose OS RPC (MG-RPC) service is simply a C
or JavaScript function that:

- Has a name, for example `GPIO.Toggle`,
- Takes a JSON object with function arguments,
- Gives back a JSON object with results.

These JSON messages could be carried out by many different channels:
serial (UART), HTTP/Restful, WebSocket, MQTT, Bluetooth. RPC API allows
to add support for other channels. `mos` tool provides an easy way to call
device's RPC services over the serial connection or over the network.
Alternatively, RPC services can be invoked programmatically.

That means, you can write a function in C or JavaSciprt,
and call it remotely via multiple protocols. Example: 
an RPC service `Sum` that adds two numbers `a` and `b`:

```javascript
RPC.addHandler('Sum', function(args) {
  return args.a + args.b;
});
```

Here is how you can call it:

#### Via serial connection, if a device is attached to a serial port:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2"><code>mos --port /dev/ttyUSB0 call Sum '{"a":1, "b": 2}'
3</code></pre>

#### Via WebSocket, if a device is in the local network:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2"><code>mos --port ws://192.168.0.206/rpc call Sum '{"a":1, "b": 2}'
3</code></pre>

#### Via RESTful call, if a device is in the local network:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2"><code>curl -d '{"a":1, "b": 2}' 192.168.0.206/rpc/Sum
3</code></pre>

#### Via an MQTT server, talking to an device idendified by its ID esp32_6732ac:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2"><code>mos --port mqtt://my.mqtt.server:1883/esp32_6732ac call Sum '{"a":1, "b": 2}'
3</code></pre>

To see a list of all RPC services implemented by a device, call `RPC.List`:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos call RPC.List
[
  "I2C.WriteRegW",
  "I2C.WriteRegB",
  "I2C.ReadRegW",
  "I2C.ReadRegB",
  ...</code></pre>

## MG-RPC frame format

MG-RPC frame formats for request, successful and failed responses are
documented below. Couple of notes to keep in mind:

- The criteria of whether the call is successful or failed is the presense
  of the `error` in the response. If `error` is present, it is a failure.
  Otherwise, it is a success. Note that the `result` in the successful
  response is optional - thus an empty response is a success.
- Requests and responses are not necessarily go in the same order. For
  example, a response to a call that takes long to compute, may arrive
  later. An `id` is used to associate requests with responses.
- It is possible to attach an arbitrary `tag` string to a request. MG-RPC
  will repeat that string unchanged in the response.

### Request

```json
{
  "method": "Math.Add",     // Required. Function name to call.
  "args": {                 // Optional. Function arguments
    "a": 1,
    "b": 2
  },
  "src": "joe/32efc823aa",  // Optional. Used with MQTT: response will be sent
                            // to that topic followed by "/rpc", so in this
                            // case it'll be "joe/32efc823aa/rpc".
  "tag": "hey!",            // Optional. Any arbitrary string. Will be repeated in the response
  "id": 1772                // Optional. Numeric frame ID.
}
```

### Response - success

```json
{
  "result": { ... },        // Optional. Call result
  "tag": "hey!"             // Optional. Present if a request contained "tag"
}
```

###  Response - failure

```json
{
  "error": {
    "code": 123,
    "message": "oops"
  }
}
```

## MG-RPC API

For the quick introduction, see
[Mongoose OS quick start guide](https://mongoose-os.com/docs/quickstart/using-javascript.html)
on how to add RPC service in JavaScript or C/C++.

See [API reference](https://mongoose-os.com/docs/reference/api.html#rpc-common)
for the C/C++ and JavaScript API spec.

## Remote management

Mongoose OS has many built-in RPC services: for managing files, accessing
hardware peripherals, performing over-the-air updates, etc. In fact,
the majority of `mos` command talks to a device via an RPC call.

See [Secure remote device management with Mongoose OS and AWS IoT](https://mongoose-os.com/blog/secure-remote-device-management-with-mongoose-os-and-aws-iot-for-esp32-esp8266-ti-cc3200-stm32/)
for an example of remote management over the secure AWS IoT cloud. In that
case, Mongoose OS uses secure MQTT RPC channel, authenticated via the
mutual TLS - per AWS IoT standards.

An ability to call RPC services via network add an incredible level of
control, implementing remote management capabilities at the highest levels.

Example: scan I2C bus and return addresses of I2C peripherals from a device
at IP address 192.168.1.4 using `mos` tool in a command line mode:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos --port ws://192.168.1.4/rpc call I2C.Scan
[
  31
]</code></pre>

Example: connect to a remote device via the MQTT server and manage it
using `mos` tool Web UI:

![](images/mos3.gif)

