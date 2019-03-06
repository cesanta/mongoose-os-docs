# UART gateway

## Introduction

UART gateway connects any device to the Internet via UART.
Everything that your device sends to the UART, the gateway forwards
to the Internet server - for example, AWS IoT, or
Azure, or your own private TCP / Websocket backend.
Likewise, everything that is sent to the gateway, gateway forwards
to the UART.

UART gateway does not implement any logic whilst forwarding data to and
from the UART. Data is transferred as-is, no modification happens
in any direction. Message boundaries are determined by timing.

Authentication and encryption is provided by the TLS layer.
The server side must be a TLS1.2 server with client-side
authentication (mutual TLS) for the industry-standard level of security.
AWS IoT is an example of such service.

## Quick start

1. Buy hardware mentioned on the [Uart gateway page](/uart-gateway/)
2. Connect hardware to your workstation via USB
3. Follow steps 1,2,3 of [mos setup](https://mongoose-os.com/docs/quickstart/setup.md)
4. In the `mos` UI, run `mos flash https://mongoose-os.com/downloads/uart-gateway/uart-gateway.zip` command
5. Follow step 7 of [mos setup](https://mongoose-os.com/docs/quickstart/setup.md)
6. Login to the [license manager](https://license.mongoose-os.com) and buy uart-gateway licenses (one per device)
7. Execute `mos license`
8. Configure MQTT:
   - For generic/private MQTT server, run
   ```
   mos config-set mqtt.enable=true mqtt.server=HOST:PORT tu.mqtt.enable=true
   ```
   - For AWS, follow [AWS guide's](/docs/quickstart/cloud/aws.md) "Setup AWS IoT" and "Setup device" chapters
   - For Google, follow [GCP guide's](/docs/quickstart/cloud/google.md) "Setup Google IoT Core" and "Setup device" chapters
   - For Azure, follow [Azure guide's](/docs/quickstart/cloud/azure.md) "Setup Azure IoT Hub" and "Setup device" chapters
   - For Watson, follow [Watson guide's](/docs/quickstart/cloud/watson.md) "Quick setup" chapter
   - For [mDash](https://dash.mongoose-os.com), follow step 8 of [mos setup](https://mongoose-os.com/docs/quickstart/setup.md)
9. Connect GND and UART pins to a device: pin 25 to TX, pin 26 to RX

When done, you should have your device flashed, provisioned to WiFi,
connected to the cloud, and reporting UART data. Below is an example
of the eval ESP32 Devkit-C board that connects a USB-to-Serial,
making computer's serial device controlled via MQTT:

![UART gateway](images/demo1.png)

reporting data to the http://www.mqtt-dashboard.com:

![UART gateway](images/demo2.png)


## Configuring UART gateway

UART gateway keeps its configuration on a flash filesystem. It could be instected
and changed using `mos` tool. To see an existing configuration,
execute `mos config-get`. Below is the documentation for relevant entries:

```javascript
"kiwi": {
  "pub_topic": "kiwi",        // Publish topic - devices get reported to it
  "sub_topic": "kiwi_flush",  // Subscribe topic - on message, devices are re-reported
  "qos":  0,                  // Publish QOS
  "report_interval_ms":  0,   // Reporting interval in milliseconds
  "active_scan":  false,      // Do an active or passive BLE scan
  "name_filter":  "",         // Only report devices with this substring in the name
},
"mqtt": {
  "enable": true,                               // Enable MQTT. Requires a license
  "server": "broker.mqttdashboard.com:1883",    // MQTT server address
}
```

In order to change any configuration parameter, execute `mos config-set name=value`, for example:

```
mos config-set mqtt.server=my.server.com:1883
mos config-set kiwi.pub_topic=my_cool_topic
```
