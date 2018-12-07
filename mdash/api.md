# REST API Reference

Every API call must be authenticated by sending `Authorization: Bearer KEY`
HTTP header. Those API calls that use `POST` or `PUT`, should specify
`application/json` mime type. Example - calling device's RPC function:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-4"><code>curl -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer API_KEY' \
  -d '{"pin": 2}' \
  https://dash.mongoose-os.com/api/v2/devices/DEVICE_ID/rpc/GPIO.Toggle
true</code></pre>

## GET /devices

List all registered devices. Params: none.

## POST /devices

Register new device. Params: none.

## POST /devices/:id

Change device properties. Params:

```javascript
{
  "name": "MyCoolDeviceName",
  "shared_with": "github_user1,github_user2",
  "shadow": ...
}
```

Any key in the params is optional.


## DELETE /devices/:id     

Delete device. Params: none.

## POST /devices/:id/rpc/:func

Call device's RPC function. Params: any valid JSON string, which is expected by the function.


## POST /devices/:id/ota

Perform device OTA. Params: a binary content of the firmware .zip file. Example: `curl -v -F file=@fw.zip URL`.

## GET /devices/:id/data

Get device saved data. Params: none.

## GET  /keys

List all API keys. Params: none.

## POST  /keys

Create an API key. Params: none.

## DELETE /keys/:id

Delete an API key. Params: none.

## POST /logs

Get stored notification logs. Params:  `{"start": 0}` - an offset to start from.

## GET  /devices/data 

Get data from all devices. Params: none.
