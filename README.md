# Mongoose OS documentation

Mongoose OS is an firmware development framework for connected microcontrollers.

Mongoose OS is created for developers who work on firmare for commercial
products, and care about things like manageability, security, reliability.
80-90% of the commercial firmware is around infrastructure, which is the same
for many products regardless what they do. Mongoose OS provides such
infrastructure.

#### Quick Summary

- Designed for commercial products, hence main focus is on
  features like cloud connectivity, built-in OTA, etc
- Reliable OTA
- Support for major cloud services: AWS IoT, Microsoft Azure, Google
  IoT Core, IBM Watson, Samsung Artik
- Support for generic in-house MQTT, RESTful, Websocket servers
- Networking core is based on mature, marked-tested
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
  [over hundred libraries](https://github.com/mongoose-os-libs/)

#### Other resources

- [Developer forum](https://forum.mongoose-os.com/)
- [Developer chat](https://gitter.im/cesanta/mongoose-os)
- [Youtube video tutorials](https://www.youtube.com/channel/UCZ9lQ7b-4bDbLOLpKwjpSAw/videos)

This documentation is browseable online at https://mongoose-os.com/docs
