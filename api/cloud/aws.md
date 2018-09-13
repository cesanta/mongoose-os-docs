# Amazon IoT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/aws](https://github.com/mongoose-os-libs/aws) | [mgos_aws_greengrass.h](https://github.com/mongoose-os-libs/aws/tree/master/include/mgos_aws_greengrass.h) | &nbsp;  | [api_aws.js](https://github.com/mongoose-os-libs/aws/tree/master/mjs_fs/api_aws.js)         |

# AWS IoT support for Mongoose OS

This library implements integration of Mongoose OS with AWS IoT.

See tutorial at https://mongoose-os.com/docs/cloud/aws.md


 ----- 

AWS GreenGrass API.

There is not much here, because GreenGrass support is almost transparent.
Enable GG in the configuration `aws.greengrass.enable=true` and magically
the global MQTT connection goes to GG instead of AWS IoT.
GG core bootstrapping is done transparently by the library.
 

 ----- 
#### aws_gg_net_ready

```c
void aws_gg_net_ready(int ev, void *evd, void *arg);
```
 Network configuration hook handler for the AWS GreenGrass. 
#### aws_gg_reconnect

```c
void aws_gg_reconnect(void);
```
 Reconnect to GreenGrass. 

### JS API

 --- 
#### AWS.Shadow.setStateHandler

```javascript
AWS.Shadow.setStateHandler(callback, userdata)
```

Set AWS shadow state handler callback.

When AWS shadow state changes, the callback is
called with the following arguments: `(userdata, event, reported,
desired, reported_metadata, desired_metadata)`,
where `userdata` is the userdata given to `setStateHandler`,
`event` is one of the following: `AWS.Shadow.CONNECTED`,
`AWS.Shadow.GET_ACCEPTED`,
`AWS.Shadow.GET_REJECTED`, `AWS.Shadow.UPDATE_ACCEPTED`,
`AWS.Shadow.UPDATE_REJECTED`, `AWS.Shadow.UPDATE_DELTA`.
`reported` is previously reported state object (if any), and `desired`
is the desired state (if present).

Example:
```javascript
let state = { on: false, counter: 0 };  // device state: shadow metadata

// Upon startup, report current actual state, "reported"
// When cloud sends us a command to update state ("desired"), do it
AWS.Shadow.setStateHandler(function(data, event, reported, desired, reported_metadata, desired_metadata) {
  if (event === AWS.Shadow.CONNECTED) {
    AWS.Shadow.update(0, state);  // Report device state
  } else if (event === AWS.Shadow.UPDATE_DELTA) {
    for (let key in state) {
      if (desired[key] !== undefined) state[key] = desired[key];
    }
    AWS.Shadow.update(0, state);  // Report device state
  }
  print(JSON.stringify(reported), JSON.stringify(desired));
}, null);
```
#### AWS.Shadow.get

```javascript
AWS.Shadow.get()
```

Request shadow state. The event handler (see
`AWS.Shadow.setStateHandler()`) will receive a `GET_ACCEPTED` event.
Returns true in case of success, false otherwise.
#### AWS.Shadow.getVersion

```javascript
AWS.Shadow.getVersion();
```
Return last shadow state version (a number).
#### AWS.Shadow.update

```javascript
AWS.Shadow.update(version, state);
```

Update AWS shadow state.

State should be an object with "reported" and/or "desired" keys.

Response will arrive via `UPDATE_ACCEPTED` or `UPDATE_REJECTED` events.
If you want the update to be aplied only if a particular version is
current, specify the version. Otherwise set it to 0 to apply to any
version.

Example:
```javascript
// On a button press, update press counter via the shadow
let buttonPin = 0;
GPIO.set_button_handler(buttonPin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  AWS.Shadow.update(0, {desired: {on: state.on, counter: state.counter + 1}});
}, null);
```
