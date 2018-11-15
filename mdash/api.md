# REST API Reference

Every API call must be authenticated by sending `Authorization: Bearer KEY`
HTTP header. Those API calls that use `POST` or `PUT`, should specify
`application/json` mime type. Example - calling device's RPC function:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-4"><code>curl -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer API_KEY' \
  -d '{"pin": 2}' \
  https://dash.mongoose-os.com/api/v2/devices/DEVICE_ID/rpc/GPIO.Toggle
true</code></pre>


| Method | Endpoint         | Params | Description |
| ------ | ---------------- | ------ | ----------- |
| GET    | /devices         | &nbsp; | List all registered devices |
| POST   | /devices         | &nbsp; | Register new device |
| POST   | /devices/:id     | {"name": "x", "shared_with": "github_user1", "shadow": ...} | Change device properties |
| DELETE | /devices/:id     | &nbsp; | Delete device |
| POST   | /devices/:id/rpc/:func | {...} | Call device's RPC function |
| POST   | /devices/:id/ota | fw.zip | OTA: `curl -v -F file=@fw.zip URL` |
| GET    | /keys            | &nbsp; | List all API keys |
| POST   | /keys            | &nbsp; | Create an API key |
| DELETE | /keys/:id        | &nbsp; | Delete an API key |
| POST   | /logs            | {"start": 0} | Get stored notification logs |
