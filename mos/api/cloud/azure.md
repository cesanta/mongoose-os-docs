# Miscrosoft Azure IoT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/azure](https://github.com/mongoose-os-libs/azure) | [mgos_azure.h](https://github.com/mongoose-os-libs/azure/tree/master/include/mgos_azure.h) | &nbsp;  | [api_azure.js](https://github.com/mongoose-os-libs/azure/tree/master/mjs_fs/api_azure.js)         |



This library provides [Azure IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/) support for Mongoose OS.

Currently only plain MQTT is supported.

See Azure IoT + Mongoose OS tutorial at https://mongoose-os.com/docs/mos/cloud/azure.md

## Authentication

Authentication by both SAS token and X.509 certificate is supported. See the [Authentication section](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security#authentication) of the documentation for explanation.


### `mos azure-iot-setup`

The easiest way to setup Azure cloud connection is by using `mos azure-iot-setup`. Makes sure you have the `az` CLI tool installed, create an IoT Hub, then run:
```
$ mos azure-iot-setup --azure-hub-name MY-HUB-NAME --azure-device-id NEW-DEVICE-ID
```

### SAS Token

To use symmetric key authentication, obtain the connection string from the web interface or by using the `az` CLI utility:
```
$ az iot hub device-identity show-connection-string --hub-name my-hub --device-id test1
{
  "cs": "HostName=my-hub.azure-devices.net;DeviceId=test1;SharedAccessKey=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
}
```

Enable the Azure client and set the `azure.cs` config setting:
```
$ mos config-set azure.enable=true "azure.cs=HostName=my-hub.azure-devices.net;DeviceId=test1;SharedAccessKey=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
```

### X.509 Certificate

To use authentication by an X.509 certificate, upload the certificate and private key files in PEM format on the device and configure `azure.host_name`, `azure.device_id`, `azure.cert` and `azure.key`:

```
$ mos put test4.crt.pem
$ mos put test4.key.pem
$ mos config-set azure.enable=true azure.host_name=my-hub.azure-devices.net azure.device_id=test4 \
                 azure.cert=test4.crt.pem azure.key=test4.key.pem

```

_Note:_ It is possible to store private key in a cryptochip, such as [ATECC508A](http://www.microchip.com/wwwproducts/en/ATECC508A) (for example, as described [here](https://mongoose-os.com/blog/mongoose-os-google-iot-ecc508a/) for Google IoT Core). Just specify `azure.key=ATCA:0` to use private key in slot 0 of the chip. [mos azure-iot-setup] supports ATECC508 key storage - just add `--use-atca` to the setup command above.


 ----- 
#### mgos_azure_send_d2c_msg

```c
bool mgos_azure_send_d2c_msg(const struct mg_str props,
                             const struct mg_str body);
```
> 
> Send a Device to Cloud message.
> If present, the properties string must be URL-encoded.
>  
#### mgos_azure_send_d2c_msgf

```c
bool mgos_azure_send_d2c_msgf(const struct mg_str props, const char *json_fmt,
                              ...);
```
>  A variant of mgos_azure_send_d2c_msg that formats a JSON message. 
#### mgos_azure_send_d2c_msgp

```c
bool mgos_azure_send_d2c_msgp(const struct mg_str *props,
                              const struct mg_str *body);
```
>  A variant of mgos_azure_send_d2c_msg that takes pointers, for easy FFI. 
#### mgos_azure_get_host_name

```c
struct mg_str mgos_azure_get_host_name(void);
```
>  Returns host name of the Azure hub 
#### mgos_azure_get_device_id

```c
struct mg_str mgos_azure_get_device_id(void);
```
>  Returns Azure device ID 
#### mgos_azure_is_connected

```c
bool mgos_azure_is_connected(void);
```
>  Returns true if Azure connection is up, false otherwise. 
#### mgos_azure_dm_response

```c
bool mgos_azure_dm_response(struct mg_str id, int status,
                            const struct mg_str *resp);
```
>  Respond to a Direct Method call. 
#### mgos_azure_dm_responsef

```c
bool mgos_azure_dm_responsef(struct mg_str id, int status, const char *json_fmt,
                             ...);
```
>  Respond to a Direct Method call with a JSON message. 

### JS API

 --- 
#### Azure.isConnected

```javascript
Azure.isConnected()
```
Return value: true if Azure connection is up, false otherwise.
#### Azure.sendD2CMsg

```javascript
Azure.sendD2CMsg(props, body)
```
Send a Device to Cloud message. `props`, if specified, must be URL-encoded.
