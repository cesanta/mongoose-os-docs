# Licensing

CCM-MOD and CCM-EVAL hardware modules are shipped with all functionality
unrestricted. CCM-FIRMWARE is distributed in the software form, unlicensed,
where some functionality is restricted. A device which is flashed with
the CCM-FIRMWARE, can be licensed to "unlock" full functionality.
The summary is below:


|  Functionality  | Unlicensed  | Licensed |
| --------------- | ----------- | -------- |
| Over-the-air update (OTA) | OTA only from [mDash](https://mongoose-os.com/docs/mdash/intro.md) | OTA from anywhere
| Cloud services supported | Only [mDash](https://mongoose-os.com/docs/mdash/intro.md) | mDash, AWS, Azure, Google, Watson, private MQTT |

## Licensing process

- Login to the [Mongoose License Manager](https://license.mongoose-os.com)
- Buy any number of licenses you need. IMPORTANT: choose "ccm" license type
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
Thus the device, once licensed, is licensed permanently.

