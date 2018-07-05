# Mongoose OS + Azure IoT tutorial

This tutorial demonstrates the following:

- How to build a skeleton for a commercial smart device, managed by Azure IoT
- How to reuse the code for different hardware platforms
- How to use Azure IoT device twin
- How to use Azure IoT device configuration
- How to perform bulk OTA updates using Azure device management


## Setup Azure IoT

<!-- <img class="w-50 float-right ml-3 pl-4" src="images/azure1.png" /> -->

- Create an account on [portal.azure.com](http://portal.azure.com)
- Install `az`, an Azure command line utility, by [following these instructions](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest")
- Create an IoT hub. Note:
   * Use EU-West region (this is important, since not all regions have IoT device configuration enabled)
   * Choose standard pricing tier

![](images/azure1.png)

## Setup devices

- Follow [mos tool setup instructions](/software.html) to install `mos` tool
- Pick one of the supported devices. We suggest to choose from [recommended devboards](../quickstart/devboards.md)
- Clone, build and flash the firmware:

```bash
git clone https://github.com/mongoose-os-apps/demo-js
cd demo-js
mos build --platform YOUR_PLATFORM  # e.g. stm32, esp32, esp8266, cc3220
mos flash
```

- Configure WiFi on a device

```
mos wifi WIFI_NETWORK WIFI_PASSWORD
```

- Provision your device to Azure IoT

```
mos azure-iot-setup
```
