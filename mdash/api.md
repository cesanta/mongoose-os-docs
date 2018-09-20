# REST API Reference

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

Example:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-4"><code>curl -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer API_KEY' \
  -d '{"pin": 2}' \
  http://dash.mongoose-os.com/api/v2/devices/DEVICE_ID/rpc/GPIO.Toggle
true</code></pre>
