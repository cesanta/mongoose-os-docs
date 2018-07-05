# Mongoose OS + Azure IoT tutorial

This tutorial is a quick start guide for Mongoose OS and Azure IoT. It demonstrates the following:

- How to build a skeleton for a commercial smart device, managed by Azure IoT
- How to reuse the code for different hardware platforms
- How to use Azure IoT device twin
- How to use Azure IoT device configuration
- How to perform bulk OTA updates using Azure device management


## Setup Azure IoT

<!-- <img class="w-50 float-right ml-3 pl-4" src="images/azure1.png" /> -->

- Create an account on [portal.azure.com](http://portal.azure.com)
- Install `az`, [an Azure command line utility](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest")
- Create an IoT hub. Note:
   * Use EU-West region (this is important, since not all regions have IoT device configuration enabled)
   * Choose standard pricing tier

![](images/azure1.png)
<!-- <div class="clearfix" /> -->

## Setup devices


