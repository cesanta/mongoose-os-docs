# RPC over BLE GATT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-gatts](https://github.com/mongoose-os-libs/rpc-gatts) | [](https://github.com/mongoose-os-libs/rpc-gatts/tree/master/include/) | &nbsp;  | &nbsp;         |



## Overview

This library provides a GATT service that actes as an RPC channel.
It accepts incoming frames and can send them as well - or rather, make them available for collection.

*Note*: Default BT configuration is permissive. See https://github.com/mongoose-os-libs/bt-common#security for a better idea.

## Attribute description

The service UUID is `5f6d4f53-5f52-5043-5f53-56435f49445f`, which is a representation of a 16-byte string `_mOS_RPC_SVC_ID_`.

Three attributes are defined:

 - `5f6d4f53-5f52-5043-5f64-6174615f5f5f (_mOS_RPC_data___)` - a r/w attribute used to submit frames for tx to the device and read out frames from the device.

 - `5f6d4f53-5f52-5043-5f74-785f63746c5f (_mOS_RPC_tx_ctl_)` - a write-only attribute. Before sending a frame expected length of the frame is submitted as a big-endian 32-bit number (so, for a 100 byte frame bytes `00 00 00 64` should be sent), followed by any number of writes to the data attribute. Chunking can be arbitrary, but the result must add up to the specified length exactly, at which point frame will be processed. Write to `tx_ctl` clears out any half-written frame that might be buffered, so writer needs to ensure there's only one frame in flight at any time.

 - `5f6d4f53-5f52-5043-5f72-785f63746c5f (_mOS_RPC_rx_ctl_)` - a read/notify attribute. It returns the length of the frame that device wishes to transmit as a big-endian 32-bit number. If this value is not zero, frame data will be returned in response to read requests of the data attribute. Read chunks will be up to MTU bytes in size. Client may subscribe to notifications on this attribute. Notification will be sent whenever a new frame is submitted for delivery and the notification body will contain length (the same value as returned by reading). Upon receiving notification client can proceed to read the data without reading `rx_ctl` again.

## Lightning How To

- Add `- origin: https://github.com/mongoose-os-libs/rpc-gatts` to your mos.yml libs
- For this example we'll be doing a wifi.scan as that's very handy! Add `- origin: https://github.com/mongoose-os-libs/rpc-service-wifi` to your mos.yml libs as well.
- Ensure your mos.yml config.schema has:
```
  - ["bt.enable", "b", true, {title: "Enable the BT service"}]
  - ["bt.keep_enabled", "b", true, {title: "Keep the BT service enabled despite WIFI being up"}]
  - ["bt.random_address", "b", false, {title: "Use a consistent BT MAC address"}]
  - ["bt.dev_name", "MyDeviceName_??????"]
```  
- Rebuild/flash your app
- Run a BLE scanner (ie Bluesee) to see your MyDeviceName_????? device. Connect to see the services. Look for the one with 5f52-5043 in the middle.
- Select that service to open it. In Bluesee you'll have 3 characteristics per above docu. 
- Figure out your RPC command, we'll use: `{"id":1999,"method":"Wifi.Scan"}`
- We need to tell the service ahead of time how many hex bytes we'll be sending. We need to convert ascii to hex, trim the extra spaces and then count the bytes. Fun!
- Enter your RPC command into this ascii to hex converter: https://www.rapidtables.com/convert/number/ascii-to-hex.html
- It'll give you a space separated hex output: `7b 22 69 64 22 3a 31 39 39 39 2c 22 6d 65 74 68 6f 64 22 3a 22 57 69 66 69 2e 53 63 61 6e 22 7d`
- Trim the spaces with http://www.unit-conversion.info/texttools/replace-text/
- Count the new hex string with: https://mothereff.in/byte-counter
- Halve the string count, as two hex characters equal one byte of data. With the text above, 64 / 2 = 32.
- Convert 32 to the large 32 bit number the system is expecting. Note: It's little endian, not big endian. Use this converter: https://www.scadacore.com/tools/programming-calculators/online-hex-converter/ . Put the 32 in the input, then copy/paste the 'UINT32 - Little Endian (DCBA)' result and trim spaces:00000020 
- Enter that `00000020` into the write only characteristic that has `5043-5F74` in the middle. Press write. In the console you'll see a log entry like: `mgos_rpc_channel_ga:296 0x3ffe1d24 expected_flen 32 res 0`
- On the middle read only characteristic with `5043-5F72` in the middle, click subscribe. The number will change to let us know when data is available (and how long the hex string is)
- On the read/write characteristic with `5043-5F53` in the middle, toggle the hex button so it says Ascii
- Paste in our ascii command: `{"id":1999,"method":"Wifi.Scan"}`
- You'll see the middle read only characteristic will have changed to let us know data is ready
- Click 'read' on the top read/write characteristic we just entered the scan command into. It'll start pulling the data of the scan results! You can click it multiple times to scroll through the data till the end.
- You can repeat the request by clicking the write only characteristic to send it our command length, then paste our command again, and click write.


 ----- 
