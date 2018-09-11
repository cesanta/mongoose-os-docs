
# Network

Low-level network configuration API.

Contains definitions of the configuration state. Allows to set up an
event handler that tracks state changes: when the network connectivity
is lost, established, etc.
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_net.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_net.h) | [mgos_net.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_net.c) |          |

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
 
