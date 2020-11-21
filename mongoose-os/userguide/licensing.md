# Licensing

Mongoose OS is highly modular. It consists of the
[core](https://github.com/cesanta/mongoose-os)
and a large number of
[libraries](https://github.com/mongoose-os-libs). The core, and most of
the libraries, are open source and released under the
[Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0) as Mongoose OS Community Edition.

Some of the libraries are closed-source, and have certain restrictions.
Those restrictions can be removed by purchasing a Mongoose OS Enterprise Edition license.

## Mongoose OS Enterprise Edition Licensing process

- Make sure that `rpc-service-ota` library is used by your app
- Login to the [Mongoose License Manager](https://license.mongoose-os.com)
- Buy any number of licenses you need. IMPORTANT: choose "mongoose-os" license type
- If your device is connected to your workstation over USB, run:
  ```
  mos license
  ```
- Or, if your device is accessible remotely, run:
  ```
  mos --port DEVICE_ADDRESS license
  ```

Licenses are bound to devices, and they are permanent.

The `mos license` command creates a unique license string specific
for a device,
and updates `device.license` configuration parameter, which "unlocks"
the device and removes restrictions. The License Manager decreases
the number of available licenses and saves a unique
license string. The next time `mos license` is run for the same device,
an old license string is returned by the License Manager
but the number of available licenses is not decreased.
Thus a device, once licensed, is licensed permanently.

### Important note regarding conf1.json
While running `mos license` you may receive an error regarding STA SSID, ie: 
```
Setting new configuration (level 1)...
Error: /private/tmp/mos-latest-20200904-44646-wpkm4w/mos-7d543c623dcc1987bede975488c3d41837253b05/cli/dev/dev_conn_impl.go:171: remote error -1: error saving config: STA SSID must be between 1 and 31 chars
```

The solution is to put a conf1.json file on the device that has some basic wifi details, which could be fake, they just need to be populated!

conf1.json contents:
```
{
    "wifi": {
        "sta": {
            "enable": true,
            "ssid": "placeholder",
            "pass": "complexPassword"
        }
    }
}
```
Put the file on your device with `mos put conf1.json`, then run `mos license` again.


## Libraries with restrictions

Below is the list of closed-source libraries and their restrictions.

|  Library  | Restriction |
| --------- | ------------ |
| [ota-common](https://github.com/mongoose-os-libs/ota-common) | OTA only from [mDash](https://mongoose-os.com/docs/mdash/intro.md) |
| [ota-http-client](https://github.com/mongoose-os-libs/ota-http-client) | OTA only from [mDash](https://mongoose-os.com/docs/mdash/intro.md) |
| [ota-http-server](https://github.com/mongoose-os-libs/ota-http-server) | No restrictions |
| [ota-shadow](https://github.com/mongoose-os-libs/ota-shadow) | OTA only from [mDash](https://mongoose-os.com/docs/mdash/intro.md) |
| [cron](https://github.com/mongoose-os-libs/cron) | 3 cron tasks max |
| [crontab](https://github.com/mongoose-os-libs/crontab) | 3 crontab entries max |


