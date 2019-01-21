# Kiwi: BLE to MQTT gateway

Kiwi is a BLE to MQTT gateway that provides the following functionality:

- Catch BLE beacons and forward them to the specified MQTT topic
- Provide set of commands (driven by MQTT or REST) to:
    * Scan bluetooth network for devices
    * Connect to a given device
    * Scan a given device for characteristics
    * Read a given characteristic
    * Write to a given characteristic
    * Subscribe to notifications
- Configure gatway to read BLE devices and forward data to the cloud (MQTT)

## Quick start

1. Pick one of the supported ESP32 devices. We suggest to choose from [recommended devboards](/docs/quicktart/devboards.md)
2. Connect your device to your workstation via USB
3. Follow steps 1,2,3 of [mos setup](https://mongoose-os.com/docs/quickstart/setup.md)
4. In the `mos` UI, run `mos flash https://mongoose-os.com/downloads/kiwi.zip` command
5. Follow steps 7,8 of [mos setup](https://mongoose-os.com/docs/quickstart/setup.md)

When done, you should have your ESP32 device flashed, provisioned to WiFi,
and connected to mDash. Now, you need to catch notifications from it.
Read the [mDash notification](/docs/mdash/notifications.md) section on how
to catch notifications from your devices.

If you run an example Node.js code provided by the mDash doc, you should
see BLE advertisement printed on a console, e.g.:

```javascript
Got message: {"id":"e0a560b5b1d7d70deed4b811","name":"rpc.out.BLE.Adv",
"data":{"mac":"7f:d3:87:0b:ac:d5","rssi":-16,
"adv":"02011a14ff4c0001000000000400000000000010000000006c1dfd3f7fd387",
"parsed":[{"type":1,"name":"flags","value":"1a14"},{"type":255,"name":"manufacturer_specific_data",
"value":"4c0001000000000400000000000010000000006c"}, {"type":29,"name":"paring_rand_256",
"value":"fd3f7fd38700f0ffffff01000000000000009bc6e7f5b505d74100000000000000008c1dfd3f841dfd3f06000000848e0f40b0f4fd3f00000000333930313036fd3f991dfd3f5492fd3f00000000a81dfd3f00000000000000007270633f281efd3f70c10e404cc10e402cc1"}]},
"at":"2018-12-16T22:55:22.977011429Z"}
```

# Using MQTT

Kiwi firmware could send BLE advertisements to mDash, or to any MQTT service.
In order to use MQTT, please follow the steps below:

- License your device, per [licensing instructions](/docs/mos/userguide/licensing.md)
- Configure MQTT:
   - For generic/private MQTT server, run
   ```
   mos config-set mqtt.enable=true mqtt.server=HOST:PORT
   ```
   - For AWS, follow [AWS guide's](/docs/quickstart/cloud/aws.md) "Setup AWS IoT" and "Setup device" chapters
   - For Google, follow [GCP guide's](/docs/quickstart/cloud/google.md) "Setup Google IoT Core" and "Setup device" chapters
   - For Azure, follow [Azure guide's](/docs/quickstart/cloud/azure.md) "Setup Azure IoT Hub" and "Setup device" chapters
   - For Watson, follow [Watson guide's](/docs/quickstart/cloud/watson.md) "Quick setup" chapter

By default, Kiwi reports to the `kiwi` MQTT topic. You can change the default
by running

```
mos config-set kiwi.topic=YOUR_TOPIC
```

# Rewriting scan responses

It is possible to define a custom logic to modify received scan results
before storing/reporting them. This can be done by uploading an `app.js`
file to the device:

```
mos put path/to/app.js
```

Here is how `app.js` content should look like:

```javascript
load('api_events.js');

let evo = ffi('void *get_kiwi_ev_descr(void)')();
let mkrsp = ffi('void kiwi_mkrsp(void *, char *, int)');  
let mkadv = ffi('void kiwi_mkadv(void *, char *, int)');

Event.on(Event.baseNumber('KWI'), function(ev, data) {
  let obj = s2o(data, evo);
  print('got kiwi event:', JSON.stringify(obj));

  // Put your response rewrite logic below.
  if (obj.stored_rsp !== '') {
    mkrsp(data, '\x01\x02\x03', 3);   // Rewrite scan resp
    mkadv(data, 'abc321', 6);         // Rewrite adv data
  }
}, null);

print('JS rewrite initialised');
```

For each scan result, a JavaScript callback function is called.
It receives scan `data` opaque pointer, which could be transformed into the
JavaScript object `obj` with the following fields:

```javascript
{
  "addr": "...",          // 6-byte device MAC address
  "adv": "...",           // Adv data
  "stored_adv": "...",    // Stored adv data
  "rsp": "...",           // Scan response
  "stored_rsp": "..."     // Stored scan response
}
```

All fields a byte strings. Length could be taken like `obj.adv.length`.
Contents could be examined using `at()` function, like `obj.adv.at(0)`.
See https://github.com/cesanta/mjs#built-in-api for mjs API reference.

For example, to traverse an adv data, do:

```javascript
    for (let i = 0; i < obj.adv.length; i++) {
       let val = obj.adv.at(i);
       print('Value at index', i, 'is', val);
    }
```


Functions `mkrsp()` and `mkadv` could be used to rewrite response and adv
data, respectively. They both take an opaque pointer, and string + length
parameter.

If you need to disable rewrite, just remove the `app.js`:
```
mos rm app.js
```

The device needs to be rebooted after `app.js` change, since `app.js` is
read once at startup.
