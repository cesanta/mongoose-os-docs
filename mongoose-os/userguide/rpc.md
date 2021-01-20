# RPC - Remote Procedure Calls

RPC means Remote Procedure Call. This is the way to send commands to devices
and receive replies, i.e. call remote procedures.
Mongoose OS uses
[JSON-RPC 2.0](https://en.wikipedia.org/wiki/JSON-RPC).

Since the RPC mechanism uses JSON-RPC, that means that the "procedure",
or an "RPC service" that device implements, is a function written in C/C++
or JavaScript with the following properties:

- Has a name, for example `GPIO.Toggle`,
- Takes a `params` JSON object,
- Returns a `result` JSON object.

For example, an RPC request to set GPIO pin 2 to high voltage looks like this:

```json
{ "id": 1932, "method": "GPIO.Write", "params": {"pin": 2, "value": 1} }
```

The successful reply from a device looks like this:

```json
{ "id": 1932, "result": true }
```

The failure reply looks like this:

```json
{ "id": 1932, "error": { "code": 400, "message": "error setting pin mode"} }
```

Note that the `"jsonrpc": "2.0"` attribute in the request frame can be omitted.

Mongoose OS libraries implement a large set of ready-to-go RPC services,
like managing hardware peripherals (GPIO, SPI, I2C), managing files,
remote updates, etc. It is easy to add custom RPC services too,
see [RPC Core library](../api/rpc/rpc-common.md) for more details.

The JSON-RPC messages could be carried out by many different channels:
serial (UART), HTTP/Restful, WebSocket, MQTT, Bluetooth. RPC API allows
to add support for other channels. `mos` tool provides an easy way to call
device's RPC services over the serial connection or over the network.
Alternatively, RPC services can be invoked programmatically.

That means, you can write a function in C or JavaScript,
and call it remotely via multiple protocols. Example: 
an RPC service `Sum` that adds two numbers `a` and `b`:

```javascript
RPC.addHandler('Sum', function(args) {
  if (typeof(args) === 'object' && typeof(args.a) === 'number' && typeof(args.b) === 'number') {
    return args.a + args.b;
  } else {
    return {error: -1, message: 'Bad request. Expected: {"a":N1,"b":N2}'};
  }
});
```

See [RPC.addHandler API reference](../api/rpc/rpc-common.md#rpc-addhandler).
The C/C++ implementation that does the same would look something like this:

```c
#include "mgos_rpc.h"

static void sum_cb(struct mg_rpc_request_info *ri, void *cb_arg,
                   struct mg_rpc_frame_info *fi, struct mg_str args) {
  double a = 0, b = 0;
  if (json_scanf(args.p, args.len, ri->args_fmt, &a, &b) == 2) {
    mg_rpc_send_responsef(ri, "%.2lf", a + b);
  } else {
    mg_rpc_send_errorf(ri, -1, "Bad request. Expected: {\"a\":N1,\"b\":N2}");
  }
  (void) cb_arg;
  (void) fi;
}

// Somewhere in init function, register the handler:
mg_rpc_add_handler(mgos_rpc_get_global(), "Sum", "{a: %lf, b: %lf}", sum_cb, NULL);
```

See [mgos_rpc_add_handler API reference](../api/rpc/rpc-common.md#mgos_rpc_add_handler). Make sure to
include the `rpc-common` library in your app's `mos.yml`.

Here is how you can call it:

#### Via serial connection, if a device is attached to a serial port:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2"><code>mos --port /dev/ttyUSB0 call Sum '{"a":1, "b": 2}'
3</code></pre>

#### Via WebSocket, if a device is in the local network:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2"><code>mos --port ws://192.168.0.206/rpc call Sum '{"a":1, "b": 2}'
3</code></pre>

#### Via RESTful call, if a device is in the local network:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2"><code>curl http://192.168.0.206/rpc/Sum -d '{"a":1, "b": 2}'
3</code></pre>

#### Via GET request, if a device is in the local network:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2"><code>curl 'http://192.168.0.206/rpc/Sum?a=1&b=2' 
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
  ...
]</code></pre>


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

### RPC Authentication via mos cli

If you have enabled RPC authentication (ie auth_domain / auth_file / acl_file), then the easiest way to authenticate is via the rpc-creds argument to the mos tool:
<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos --port ws://192.168.1.4/rpc --rpc-creds=@myusercreds.txt call I2C.Scan
</code></pre>
Where myusercreds.txt is your file containing simple auth formatted user:pass, ie ```johncitizen:plaintextpassword```

### RPC Authentication via code

Mongoose OS RPC authentication is quite basic, and is vulnerable to replay attacks as the TC field is not incremented. However it enforces basic authentication that is not plaintext, and the intention is you're communicating via a secure TLS channel like MQTT or HTTPS.

There are theoretically two ways to provide htdigest authentication, you can send a RPC command without auth and the system will reply with an error that contains a system generated nonce for you to use as input to your authentication reply. OR you can simply provide authentication with your original request, and since that works and is less traffic let's focus on that.

This is what a correctly formatted authenticated request looks like:
```
{"src":"mos","id":1602514363591,"method":"Config.Get","auth":{"realm":"myproduct","username":"serialUser",
    "nonce":1611048949,"cnonce":313273957,"response":"66e9cdd290e93ef623b1f415f10e62a7"}
```

There is good documentation on HTDIGEST auth here: https://en.wikipedia.org/wiki/Digest_access_authentication

The short version of how it applies to the Mongoose implementation is:
```
  let id = Date.now();
  let cmd = {"src":"rpc","id":id,"method":"Config.Get","params":{}};
  let cnonce = new Date().getTime(); 
  let nonce = nonce; // we're creating the request, otherwise take this from the error response
  let digestURI = {method = "dummy_method", path = "dummy_uri"}; //yes, this is hardcoded in MGOS 

  // Combine everything
  let HA1 = md5(user + ":" + realm + ":" + pass); // supply your credentials
  let HA2 = md5(digestURI.method + ":" + digestURI.path);
  let combined = HA1 + ":" + nonce + ":" + nc + ":" + cnonce + ":" + "auth" + ":" + HA2;
  let response = md5(combined);
  
  // Add it to the command
  cmd['auth'] = {"realm": realm, "username": user, "nonce": nonce, "cnonce": cnonce, "response": response};
  
  let textToSendToDevice = JSON.stringify(cmd); // transform from JSON to text
  ws.send(textToSendToDevice); // using a websocket instance 
  
```
Note: Advise using websockets as it skips CORS cross site issues you'd otherwise bump into in the browser


