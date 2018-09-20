# OTA support

<video controls="" class="float-right border w-50 ml-3 mb-3">
    <source src="./dash2.mp4" type="video/mp4">
</video>

If a device includes `rpc-service-ota` library, then it can be updated remotely.
The three RPC functions that perform the OTA are `OTA.Begin`, `OTA.Write` and
`OTA.End`.

mDash provides a convenience RESTful handler for the OTA, where you can
just `POST` the new firmware .zip file, and mDash will call `OTA.Begin`
followed by a sequence of `OTA.Write` calls, finished by `OTA.End`.

The OTA can be performed either via the Web UI, or programmatically
using the REST API:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-4"><code>curl -H 'Authorization: Bearer API_KEY' \
  -v -F file=@fw.zip
  http://dash.mongoose-os.com/api/v2/devices/DEVICE_ID/ota
true</code></pre>

Once the firmware is updated, the device reboots in the "dirty", uncommitted
state. An `OTA.Commit` call must be done to bless the new firmware, otherwise
it will rollback, thinking that the health check did not pass. You can
call `OTA.Commit` as any other RPC method. mDash provides a handy
commit button for the convenience, when it sees an uncommitted device.
