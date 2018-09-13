# IBM Warson IoT Platform support library for Mongoose OS

This library provides [IBM Watson IoT Platform](https://internetofthings.ibmcloud.com/) support for Mongoose OS.

## QuickStart setup

The easiest way to setup Watson IoT Platform cloud connection is by using `mos watson-iot-setup`.
```
$ mos watson-iot-setup
```

This does not require any credentials and will set up the device for [QuickStart cloud dashboard](https://quickstart.internetofthings.ibmcloud.com/#/) connectivity.
With QuickStart dashboard, you will be able to send data from the device at a limited rate but device management (sending commands to the device) is not available.

## Own IBM Cloud Account setup

If you already have an IBM Cloud account and a cloud orgaization set up (you can register for a free trial [here](https://www.ibm.com/internet-of-things/spotlight/watson-iot-platform)) you can use `mos` to add a device to your org.

You will need to obtain app access credentials for `mos` to use:

 * In the left side pane og your Watson IoT Platform dashboard select *Apps*
 * Click the *Generate API Key* button in the upper right corner
 * For description, enter any meaningful text - e.g. "MOS CLI tool" and click *Next*
 * For *Role* select *Standard Application*
 * Copy the *API Key* and *Authentication Token* and use them on the `mos` command line:

```
$ mos watson-iot-setup --watson-api-key a-bcdefgh-qwertyio --watson-api-auth-token "tokengoeshere"
Using port /dev/ttyUSB0
Connecting to the device...
  esp8266 1AFE34A5930F running demo-c
Org ID: bcdefgh
Device ID: esp8266_A5930F
Checking device type "mos"...
Creating device "esp8266_A5930F"...

Updating config:
  device.id = esp8266_A5930F
  watson.client_id = d:bcdefgh:mos:esp8266_A5930F
  watson.enable = true
  watson.host_name = bcdefgh.messaging.internetofthings.ibmcloud.com
  watson.token = SECRET
Setting new configuration...
Saving and rebooting...
```
_Note: As with other flags, values can be specified as environment variables: `MOS_WATSON_API_KEY` and `MOS_WATSON_API_AUTH_TOKEN`._

Invoked with no additional flags, as above, `mos` will use device type `mos` (will be created if necessary) and device ID derived from platform and the device's unique ID (usually MAC address) and a random auth token. Additional flags can be provided to override these defaults:
 * `--watson-device-type` - specifies device type
 * `--watson-device-id` - specifies device id
 * `--watson-device-auth-token` - specifies device auth token instead of generating a random one
 * `--watson-api-host-name` - use this host name for API calls instead of `ORG_ID.internetofthings.ibmcloud.com`
 * `--watson-messaging-host-name` - use this host name for device connections instead of `ORG_ID.messaging.internetofthings.ibmcloud.com`

### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/watson](https://github.com/mongoose-os-libs/watson) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API
#### mgos_watson_send_event_jsonf

```c
bool mgos_watson_send_event_jsonf(const char *event_id, const char *json_fmt,
                                  ...);
bool mgos_watson_send_event_jsonp(const struct mg_str *event_id,
                                  const struct mg_str *body);
```

Send an event, in JSON format.
The message should be an object with a "d" key and properties, e.g.:
`mgos_watson_send_eventf("{d: {foo: %d}}", foo);`
 

### JS API
