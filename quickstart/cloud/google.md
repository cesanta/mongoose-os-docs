# Mongoose OS + Google IoT Core

This tutorial demonstrates the following:

- How to build a skeleton firmware for a commercial smart device, managed by Google IoT Core
- How to reuse the code for different hardware platforms
- How to control devices via Google IoT Core `config` object
- How to report device state via Google IoT Core `state` object

See following video that repeats setup steps mentioned below:

<iframe src="https://www.youtube.com/embed/Rz6-RvYLLlk"
  style="width:560px; height:315px;"
  frameborder="0" allowfullscreen></iframe>


## Setup Google IoT Core

- Install [gcloud command line tool](https://cloud.google.com/sdk/gcloud/)
- Authenticate with Google Cloud:
```
gcloud auth login
```
- Create cloud project - choose your unique project name:
```
gcloud projects create YOUR_PROJECT_NAME
```
- Add permissions for IoT Core:
```
gcloud projects add-iam-policy-binding YOUR_PROJECT_NAME --member=serviceAccount:cloud-iot@system.gserviceaccount.com --role=roles/pubsub.publisher
```
- Set default values for `gcloud`:
```
gcloud config set project YOUR_PROJECT_NAME
```
- Create PubSub topic for device data:
```
gcloud pubsub topics create iot-topic
```
- Create PubSub subscription for device data:
```
gcloud pubsub subscriptions create --topic iot-topic iot-subscription
```
- Create device registry:
```
gcloud iot registries create iot-registry --region europe-west1 --event-notification-config=topic=iot-topic
```

## Setup device

- Pick one of the supported devices. We suggest to choose from [recommended devboards](../devboards.md)
- Connect your device to your workstation via USB
- Complete [Quickstart Guide](../../quickstart/setup.md) steps 1-7 inclusive.
  As a result, your device should be connected to the Internet
- Get project ID of your new project:
```
gcloud projects list
```
- Register device on Google IoT Core. If a device is already registered,
this command deletes it, then registers again. Note that this command is
using `YOUR_PROJECT_ID` instead of `YOUR_PROJECT_NAME`. Take the project ID
from the result of your previous command:
```
mos gcp-iot-setup --gcp-project YOUR_PROJECT_ID --gcp-region europe-west1 --gcp-registry iot-registry
```
This command performs certificate management for you, and
onboards your device on a cloud. If your device has an
[Atmel ECC508A](http://www.atmel.com/devices/ATECC508A.aspx) secure element
attached, Mongoose OS automatically uses ECC508A chip for TLS
and keeps your credentials securely stored.

## Controlling LED via Google IoT Core

Open `fs/init.js` in your favorite editor, copy-paste the following snippet and save:

```javascript
load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');

let led = Cfg.get('board.led1.pin');
let topic = '/devices/' + Cfg.get('device.id') + '/config';

GPIO.set_mode(led, GPIO.MODE_OUTPUT);

MQTT.sub(topic, function(conn, topic, msg) {
  print('Topic:', topic, 'message:', msg);
  let obj = JSON.parse(msg) || {led: 0};
  GPIO.write(led, obj.led);
}, null);
```

The snippet above subscribes to the `/config` notifications.
Once the config object is sent to device by Google IoT Core,
the handler function is called and lights the corresponding LED.

In the command prompt (or terminal on Linux/Mac), enter the following commands
to copy `init.js` to the device, reboot the device, and start monitoring
serial output:

```
mos put fs/init.js
mos call Sys.Reboot
mos console
```

<video controls="" class="float-right border w-50 m-3">
    <source src="images/gcp1.mp4" type="video/mp4">
</video>

Find a registered device in a Google IoT Core device registry.
Click on "Update Config" button, and in the opened dialog, enter
the following configuration and hit "SEND TO DEVICE":

```json
{"led": 1}
```

Note how one of the LEDs turns on. NOTE: some dev boards, notably Espressif,
have LED pins inverted, i.e. they switch off on value `1` and switch on,
on value `0`. Enter

```json
{"led": 0}
```

Note how the LED turns off.

Important thing to note: Google IoT Core send device config object
each time device comes online or a config change is made. That means,
that if you power cycle the device, it'll sync its LED state with the
cloud as soon as it gets connected.


## Reporting state to Google IoT Core

We are going to report free RAM to the Google IoT Core periodically, to the
Google's special `/state` object.

Open `fs/init.js` in your favorite editor, copy-paste the following snippet and save:

```javascript
load('api_config.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_timer.js');

let topic = '/devices/' + Cfg.get('device.id') + '/state';

Timer.set(3000 /* milliseconds */, Timer.REPEAT, function() {
  let msg = JSON.stringify({free: Sys.free_ram(), total: Sys.total_ram()});
  print(topic, '->', msg);
  MQTT.pub(topic, msg, 1);
}, null);
```

<video controls="" class="float-right border w-50 m-3">
    <source src="images/gcp2.mp4" type="video/mp4">
</video>

In the command prompt (or terminal on Linux/Mac), enter the following commands
to copy `init.js` to the device, reboot the device, and start monitoring
serial output:

```
mos put fs/init.js
mos call Sys.Reboot
mos console
```

In the Google IoT Web console, click on the "Configuration and state history",
and see how new state objects are arriving. Click on any state object,
select "text" view, and check the JSON string that is sent by device.


## Using ATECC508A crypto chip

See https://mongoose-os.com/blog/mongoose-os-google-iot-ecc508a/ on
how to use ATECC508A crypto chip with Mongoose OS and Google IoT Core.
