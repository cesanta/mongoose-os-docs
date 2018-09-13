# Service - WiFi
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-service-wifi](https://github.com/mongoose-os-libs/rpc-service-wifi) | [](https://github.com/mongoose-os-libs/rpc-service-wifi/tree/master/include/) | &nbsp;  | &nbsp;         |

# RPC Service - WiFi

## Wifi.Scan

Scan wifi networks.

Arguments: none.

Example usage:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos call Wifi.Scan
[
  {
    "ssid": "my_essid",
    "bssid": "12:34:56:78:90:ab",
    "auth": 0,
    "channel": 1,
    "rssi": -25
  },
  ...
]
</code></pre>


 ----- 
