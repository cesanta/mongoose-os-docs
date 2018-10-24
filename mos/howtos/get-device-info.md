# Get device information

The solution is to call `Sys.GetInfo` RPC service.
From your terminal, run:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos call Sys.GetInfo
[Aug 21 08:29:17.016] {
...
[Aug 21 08:29:17.016]   "mac": "5ECF7F060046",
[Aug 21 08:29:17.016]   "arch": "esp8266",
[Aug 21 08:29:17.016]   "wifi": {
[Aug 21 08:29:17.016]     "sta_ip": "192.168.1.31",
...</code></pre>

You can see e.g. MAC and IP addresses in the output.
In order to call the same function in JS, do:

```javascript
load('api_rpc.js');
RPC.call(RPC.LOCAL, 'Sys.GetInfo', null, function(resp, ud) {
  print('Response:', JSON.stringify(resp));
  print('MAC address:', resp.mac);
}, null);
```

The device would print to the output:

```
[Aug 21 08:23:33.162] Response: {... "arch":"esp8266",... } 
[Aug 21 08:23:33.170] MAC address: 5ECF7F060046 
```
