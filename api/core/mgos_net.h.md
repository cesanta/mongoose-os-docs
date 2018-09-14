# Net events
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_net.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_net.h) | [mgos_net.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_net.c)  | [api_net.js](http://github.com/mongoose-os-libs/mjs/tree/master/fs/api_net.js)         |


Low-level network configuration API.

Contains definitions of the configuration state. Allows to set up an
event handler that tracks state changes: when the network connectivity
is lost, established, etc.
 

 ----- 
#### MGOS_EVENT_BASE

```c
#define MGOS_EVENT_GRP_NET MGOS_EVENT_BASE('N', 'E', 'T')
```

Event group which should be given to `mgos_event_add_group_handler()`
in order to subscribe to network events.

Example:
```c
static void my_net_ev_handler(int ev, void *evd, void *arg) {
  if (ev == MGOS_NET_EV_IP_ACQUIRED) {
    LOG(LL_INFO, ("Just got IP!"));
    // Fetch something very useful from somewhere
  }
  (void) evd;
  (void) arg;
}

// Somewhere else:
mgos_event_add_group_handler(MGOS_EVENT_GRP_NET, my_net_ev_handler, NULL);
```
 
#### mgos_net_get_ip_info

```c
bool mgos_net_get_ip_info(enum mgos_net_if_type if_type, int if_instance,
                          struct mgos_net_ip_info *ip_info);
```

Retrieve IP configuration of the provided interface type and instance
number, and fill provided `ip_info` with it. Returns `true` in case of
success, false otherwise.
 
#### mgos_net_ip_to_str

```c
char *mgos_net_ip_to_str(const struct sockaddr_in *sin, char *out);
```

Converts address to dotted-quad NUL-terminated string.
`out` must be at least 16 bytes long.
Returns the out pointer.
 
#### mgos_net_str_to_ip

```c
bool mgos_net_str_to_ip(const char *ips, struct sockaddr_in *sin);
```

Parses dotted-quad NUL-terminated string into an IPv4 address.
 
#### mgos_net_str_to_ip_n

```c
bool mgos_net_str_to_ip_n(const struct mg_str ips, struct sockaddr_in *sin);
```

Parses dotted-quad NUL-terminated string into an IPv4 address.
 
#### mgos_get_nameserver

```c
char *mgos_get_nameserver(void);
```

Returns nameserver address. The caller should `free()` it. Returns NULL
in case of no DNS.
 

### JS API

 --- 
#### Net.ctos

```javascript
Net.ctos(conn, local, ip, port)
```
Convert address of a connection `conn` to string. Set `local` to
`true` to stringify local address, otherwise `false` to stringify remote.
Set `ip` to `true` to stringify IP, `port` to stringify port. Example:
```javascript
print('Connection from:', Net.ctos(conn, false, true, true));
```
#### Net.discard

```javascript
Net.discard(conn, len)
```
Remove initial `len` bytes of data from the connection's `conn`
receive buffer in order to discard that data and reclaim RAM to the system.
#### Net.serve

```javascript
Net.serve(options)
```
Start TCP or UDP server. `options` is an object:
```javascript
{
   // Required. Port to listen on, 'tcp://PORT' or `udp://PORT`.
   addr: 'tcp://1234',
   // Optional. Called when connection is established.
   onconnect: function(conn) {}, 
   // Optional. Called when new data is arrived.
   ondata: function(conn, data) {},
   // Optional. Called when protocol-specific event is triggered.
   onevent: function(conn, data, ev, edata) {},
   // Optional. Called when the connection is about to close.
   onclose: function(conn) {},
   // Optional. Called when on connection error.
   onerror: function(conn) {},
}
```
Example - a UDP echo server. Change `udp://` to `tcp://` to turn this
example into the TCP echo server:
```javascript
Net.serve({
  addr: 'udp://1234',
  ondata: function(conn, data) {
    print('Received from:', Net.ctos(conn, false, true, true), ':', data);
    Net.send(conn, data);            // Echo received data back
    Net.discard(conn, data.length);  // Discard received data
  },
});
```
#### Net.connect

```javascript
Net.connect(options)
```
Connect to a remote host. `options` is the same as for the `Net.serve`.
The addr format is `[PROTO://]HOST:PORT`. `PROTO` could be `tcp` or
`udp`. `HOST` could be an IP address or a host name. If `HOST` is a name,
it will be resolved asynchronously.

Examples of valid addresses: `google.com:80`, `udp://1.2.3.4:53`,
`10.0.0.1:443`, `[::1]:80`.
#### Net.close

```javascript
Net.close(conn)
```
Send all pending data to the remote peer,
and disconnect when all data is sent.
Return value: none.
#### Net.send

```javascript
Net.send(conn, data)
```
Send data to the remote peer. `data` is an mJS string.
Return value: none.
#### Net.EVENT_GRP

```javascript
Net.EVENT_GRP
```
Net events group, to be used with `Event.addGroupHandler()`. Possible
events are:
- `Net.STATUS_DISCONNECTED`
- `Net.STATUS_CONNECTING`
- `Net.STATUS_CONNECTED`
- `Net.STATUS_GOT_IP`
