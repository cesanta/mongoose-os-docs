# Inventek ISM43xxx WiFi
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/wifi-ism43xxx](https://github.com/mongoose-os-libs/wifi-ism43xxx) | [](https://github.com/mongoose-os-libs/wifi-ism43xxx/tree/master/include/) | &nbsp;  | &nbsp;         |



Driver for the [Inventek eS-WiFi ISM43xxx module series](https://www.inventeksys.com/es-wifi-support/) (ISM4319-M3-xxx, ISM43362-M3G-xxx).

Only SPI interface is supported for now.

## Configuration

In addition to the common wifi STA and AP options, this library adds a number of its own settings.

You need to configure at least CS and DRDY pins, others are optional.

See [manifest](mos.yml) for definitions and examples.


 ----- 
