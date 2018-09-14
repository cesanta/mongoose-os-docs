# DNS-SD
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/dns-sd](https://github.com/mongoose-os-libs/dns-sd) | [mgos_dns_sd.h](https://github.com/mongoose-os-libs/dns-sd/tree/master/include/mgos_dns_sd.h) | &nbsp;  | &nbsp;         |




 ----- 
#### mgos_dns_sd_get_host_name

```c
const char *mgos_dns_sd_get_host_name(void);
```
<div class="apidescr">

Return currently configure DNS-SD hostname.
 
</div>
#### mgos_dns_sd_advertise

```c
void mgos_dns_sd_advertise(void);
```
<div class="apidescr">
 Send a DNS-SD advertisement message now. 
</div>
#### mgos_dns_sd_goodbye

```c
void mgos_dns_sd_goodbye(void);
```
<div class="apidescr">
 Send a goodbye packet 
</div>
