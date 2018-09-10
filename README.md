# Mongoose OS documentation

Mongoose OS is a firmware development framework for microcontrollers.

Mongoose OS was created for developers who work on commercial connected
products, and care about things like manageability, security, and reliability.
80-90% of the commercial firmware is around infrastructure, which is the same
for many products regardless of what they do. Mongoose OS provides such a
reliable, field-tested infrastructure.

#### Quick Summary

- Designed for commercial products
- Reliable OTA
- Support for major cloud services: AWS IoT, Microsoft Azure, Google
  IoT Core, IBM Watson, Samsung Artik
- Support for generic in-house MQTT, RESTful, Websocket servers
- Networking core is based on the mature
  [Mongoose Networking Library](https://github.com/cesanta/mongoose)
- RPC infrastructure for remote management:
   * JSON-RPC 2.0 framing
   * transports: MQTT, UART, BLE, REST, Websocket
   * many built-in services like Config, FS, GPIO, I2C, GATTC, Wifi, etc 
- Configuration infrastructure with "reset to factory defaults"
- Advanced security features
   * ECC508A crypto element support
   * TLS 1.2 based on the ARM mbedTLS
   * low footprint tuning of the TLS stack
- Modular: [small core](https://github.com/cesanta/mongoose-os) and
  [over a hundred libraries](https://github.com/mongoose-os-libs/)
- Commercial friendly Apache 2.0 license

#### Smart Light IoT product reference

We have published an end-to-end IoT product reference,
https://github.com/cesanta/mongoose-os-smart-light. It could be used as
a baseline for your own commercial product! See usage guide video:

<iframe src="https://www.youtube.com/embed/fNrIwCoiazI"
 style="width:560px; height:315px;"
 frameborder="0" allowfullscreen></iframe>


#### Other resources

- [Developer forum](https://forum.mongoose-os.com/)
- [Developer chat](https://gitter.im/cesanta/mongoose-os)
- [Youtube video tutorials](https://www.youtube.com/channel/UCZ9lQ7b-4bDbLOLpKwjpSAw/videos)

This documentation is browseable online at https://mongoose-os.com/docs
