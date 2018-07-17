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
- Install beta components:
```
gcloud components install beta
```
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
gcloud beta pubsub topics create iot-topic
```
- Create PubSub subscription for device data:
```
gcloud beta pubsub subscriptions create --topic iot-topic iot-subscription
```
- Create device registry:
```
gcloud beta iot registries create iot-registry --region europe-west1 --event-pubsub-topic=iot-topic
```

## Setup device

- Follow [mos tool setup instructions](/software.html) to install `mos` tool
- Pick one of the supported devices. We suggest to choose from [recommended devboards](../quickstart/devboards.md)
- Connect your device to your workstation via USB
- Clone, build and flash the firmware:
```bash
git clone https://github.com/mongoose-os-apps/demo-js
cd demo-js
mos build --platform YOUR_PLATFORM  # e.g. stm32, esp32, esp8266, cc3220
mos flash
```
NOTE: you can customise this firmware as you wish, or build a firmware
from scratch using an [empty](https://github.com/mongoose-os-apps/empty) app.
In this case, it is important to include
[gcp](https://github.com/mongoose-os-libs/gcp) library in the `libs` section
of the `mos.yml` file:
```yaml
libs:
  ...
  - origin: https://github.com/mongoose-os-libs/gcp # <-- Add this!
```

- Configure WiFi on a device
```
mos wifi WIFI_NETWORK WIFI_PASSWORD
```

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

## Using ATECC508A crypto chip

See https://mongoose-os.com/blog/mongoose-os-google-iot-ecc508a/ on
how to use ATECC508A crypto chip with Mongoose OS and Google IoT Core.
