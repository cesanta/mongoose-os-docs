# Service - WiFi
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-service-wifi](https://github.com/mongoose-os-libs/rpc-service-wifi) | [](https://github.com/mongoose-os-libs/rpc-service-wifi/tree/master/include/) | &nbsp;  | &nbsp;         |



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

### Authentication ENUM mapping

From mgos_wifi.h
```
enum mgos_wifi_auth_mode {
  MGOS_WIFI_AUTH_MODE_OPEN = 0,
  MGOS_WIFI_AUTH_MODE_WEP = 1,
  MGOS_WIFI_AUTH_MODE_WPA_PSK = 2,
  MGOS_WIFI_AUTH_MODE_WPA2_PSK = 3,
  MGOS_WIFI_AUTH_MODE_WPA_WPA2_PSK = 4,
  MGOS_WIFI_AUTH_MODE_WPA2_ENTERPRISE = 5,
};
```


 ----- 
