# WiFi
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/wifi](https://github.com/mongoose-os-libs/wifi) | [mgos_wifi.h](https://github.com/mongoose-os-libs/wifi/tree/master/include/mgos_wifi.h) | &nbsp;  | [api_wifi.js](https://github.com/mongoose-os-libs/wifi/tree/master/mjs_fs/api_wifi.js)         |



This library provides common WiFi API.

## Configuration

A library adds a `wifi` configuration entry with two sub-entries: `wifi.ap`
which contains configuration settings for the Access Point mode, and
`wifi.sta*` for the Station mode.

### Station configuration

```javascript
"wifi": {
  "sta": {
    "enable": true,         // Enable Station mode
    "ssid": "",             // WiFi network name
    "pass": "",             // Password
    "user": "",             // Username for WPA-PEAP mode
    "anon_identity": "",    // Anonymous identity for WPA mode
    "cert": "",             // Client certificate for WPA-TTLS mode
    "key": "",              // Client key for WPA-TTLS mode
    "ca_cert": "",          // CA certificate for WPA-enterprise mode
    "ip": "",               // Static IP Address
    "netmask": "",          // Static Netmask
    "gw": "",               // Static Default Gateway
    "nameserver": "",       // DNS Server
    "dhcp_hostname": ""     // Host name to include in DHCP requests
  },
  "sta1": {
    ...
  },
  "sta2": {
    ...
  },
  "sta_cfg_idx": 0,           // Station config index to start connecting with, 0, 1 or 2.
  "sta_connect_timeout": 30   // Timeout for connection, seconds.
}
```

#### Multiple Station Configurations

Station configurations will be tried starting from `sta_cfg_idx` and each one that is enabled will be given `sta_connect_timeout` seconds to connect. Successfully connected station's index will be saved in `sta_cfg_idx` so next boot will start with previously used configuration.

Setting `sta_connect_timeout` to 0 disables this logic.

### Access Point configuration

```javascript
"wifi": {
  "ap": {
    "enable": true,               // Enable Access Point mode
    "ssid": "Mongoose_??????",    // SSID to use. ?? symbols are substituted by MAC address
    "pass": "Mongoose",           // Password
    "hidden": false,              // Hide WiFi network
    "channel": 6,                 // WiFi channel
    "max_connections": 10,        // Maximum number of connections
    "ip": "192.168.4.1",          // Static IP Address
    "netmask": "255.255.255.0",   // Static Netmask
    "gw": "192.168.4.1",          // Static Default Gateway
    "dhcp_start": "192.168.4.2",  // DHCP Start Address
    "dhcp_end": "192.168.4.100",  // DHCP End Address
    "trigger_on_gpio": -1         // Trigger AP on low GPIO
  }
}
```



 ----- 
#### mgos_wifi_setup_sta

```c
bool mgos_wifi_setup_sta(const struct mgos_config_wifi_sta *cfg);
```
> 
> Setup wifi station; `struct mgos_config_wifi_sta` looks as follows:
> 
> ```c
> struct mgos_config_wifi_sta {
>   int enable;
>   char *ssid;
>   char *pass;
>   char *user;
>   char *anon_identity;
>   char *cert;
>   char *key;
>   char *ca_cert;
>   char *ip;
>   char *netmask;
>   char *gw;
>   char *nameserver;
>   char *dhcp_hostname;
> };
> ```
> 
> If `cfg->enable` is true, also calls `mgos_wifi_connect()`.
>  
#### mgos_wifi_setup_ap

```c
bool mgos_wifi_setup_ap(const struct mgos_config_wifi_ap *cfg);
```
> 
> Setup wifi access point; `struct mgos_config_wifi_ap` looks as follows:
> 
> ```c
> struct mgos_config_wifi_ap {
>   int enable;
>   char *ssid;
>   char *pass;
>   int hidden;
>   int channel;
>   int max_connections;
>   char *ip;
>   char *netmask;
>   char *gw;
>   char *dhcp_start;
>   char *dhcp_end;
>   int trigger_on_gpio;
>   int disable_after;
>   int keep_enabled;
> };
> ```
>  
#### mgos_wifi_setup

```c
bool mgos_wifi_setup(struct mgos_config_wifi *cfg);
```
> 
> Setup both wifi station and access point at once; `struct mgos_config_wifi`
> looks as follows:
> 
> ```c
> struct mgos_config_wifi {
>   struct mgos_config_wifi_sta sta; // See definition above
>   struct mgos_config_wifi_ap ap;   // See definition above
> };
> ```
>  
#### mgos_wifi_connect

```c
bool mgos_wifi_connect(void);
```
> 
> Connect to the previously setup wifi station (with `mgos_wifi_setup_sta()`).
>  
#### mgos_wifi_disconnect

```c
bool mgos_wifi_disconnect(void);
```
> 
> Disconnect from wifi station.
>  
#### mgos_wifi_validate_ap_cfg

```c
bool mgos_wifi_validate_ap_cfg(const struct mgos_config_wifi_ap *cfg,
                               char **msg);
```
> 
> Check whether the wifi access point config `cfg` is valid; if it is, `true`
> is returned; otherwise `false` is returned and error message is written
> to `*msg`. The caller should free `*msg`.
>  
#### mgos_wifi_validate_sta_cfg

```c
bool mgos_wifi_validate_sta_cfg(const struct mgos_config_wifi_sta *cfg,
                                char **msg);
```
> 
> Check whether the wifi station config `cfg` is valid; if it is, `true` is
> returned; otherwise `false` is returned and error message is written to
> `*msg`. The caller should free `*msg`.
>  
#### mgos_wifi_get_status

```c
enum mgos_wifi_status mgos_wifi_get_status(void);
```
> 
> Get wifi status, see `enum mgos_wifi_status`.
>  
#### mgos_wifi_get_status_str

```c
char *mgos_wifi_get_status_str(void);
```
> 
> Return wifi status string; the caller should free it.
>  
#### mgos_wifi_get_connected_ssid

```c
char *mgos_wifi_get_connected_ssid(void);
```
> 
> Return wifi ssid the device is currently connected to (if any); the caller
> should free it. If the device is not connected to any wifi network, `NULL`
> is returned.
>  
#### mgos_wifi_get_sta_default_dns

```c
char *mgos_wifi_get_sta_default_dns(void);
```
> 
> Return default DNS server IP address. The caller should free it.
>  
#### mgos_wifi_sta_get_rssi

```c
int mgos_wifi_sta_get_rssi(void);
```
> 
> Returns RSSI of the station if connected to an AP, otherwise 0.
> Note: RSSI is a negative number.
>  
#### (*mgos_wifi_scan_cb_t)

```c
typedef void (*mgos_wifi_scan_cb_t)(int num_res,
                                    struct mgos_wifi_scan_result *res,
                                    void *arg);
```
> 
> Callback prototype for `mgos_wifi_scan()`, called when wifi scan is done.
> `num_res` is a number of networks found, `res` is a pointer to the first
> one. `arg` is an arbitrary pointer given to `mgos_wifi_scan()`.
> 
> See `mgos_wifi_scan()` for more details.
>  
#### mgos_wifi_scan

```c
void mgos_wifi_scan(mgos_wifi_scan_cb_t cb, void *arg);
```
> 
> Scan available wifi networks; when the scan is done, the provided callback
> `cb` will be called with list of SSIDs or NULL on error.
> 
> Each particular scan result isn't guaranteed to be exhaustive; a few scans
> might be necessary to get all networks around.
> 
> Caller owns SSIDS, they are not freed by the callee.
> 
> A note for implementations: invoking inline is ok.
>  
#### mgos_wifi_deinit

```c
void mgos_wifi_deinit(void);
```
> 
> Deinitialize wifi.
>  
#### mgos_wifi_scan_js

```c
void mgos_wifi_scan_js(struct mjs *mjs);
#endif
```
> 
> Internal: implementation of mJS `Wifi.scan()`; available if only
> `MGOS_HAVE_MJS` is 1.
>  

### JS API

 --- 
#### Wifi.scan

```javascript
Wifi.scan(cb)
```
Scan WiFi networks, call `cb` when done.
`cb` accepts a single argument `results`, which is
either `undefined` in case of error, or an array of object containing:
```javascript
{
  "ssid": "NetworkName",
  "bssid": "12:34:56:78:90:ab",
  "authMode": Wifi.AUTH_MODE_WPA_PSK, // Auth mode, one of AUTH constants.
  "channel": 11,
  "rssi": -70
}
```
Example:
```javascript
Wifi.scan(function(results) {
  print(JSON.stringify(results));
});
```
Must be kept in sync with enum mgos_wifi_auth_mode
## **Auth modes**
- `Wifi.AUTH_MODE_OPEN`
- `Wifi.AUTH_MODE_WEP`
- `Wifi.AUTH_MODE_WPA_PSK`
- `Wifi.AUTH_MODE_WPA2_PSK`
- `Wifi.AUTH_MODE_WPA_WPA2_PSK`
- `Wifi.AUTH_MODE_WPA2_ENTERPRISE`
