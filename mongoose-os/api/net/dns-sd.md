# DNS-SD
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/dns-sd](https://github.com/mongoose-os-libs/dns-sd) | [mgos_dns_sd.h](https://github.com/mongoose-os-libs/dns-sd/blob/master/include/mgos_dns_sd.h) | &nbsp;  | &nbsp;         |



By default, advertises HTTP server (if enabled).

Additional insances can be added by user's application, example (for Apple HAP):

```c
const struct mgos_dns_sd_txt_entry gizmo_txt[] = {
    {.key = "c#", .value = MG_MK_STR("1")},
    {.key = "ff", .value = MG_MK_STR("0")},
    {.key = "pv", .value = MG_MK_STR("1.0")},
    {.key = "id", .value = MG_MK_STR("11:22:33:44:55:66")},
    {.key = "md", .value = MG_MK_STR("Fancy Gizmo 9000")},
    {.key = "s#", .value = MG_MK_STR("1")},
    {.key = "sf", .value = MG_MK_STR("1")},
    {.key = "ci", .value = MG_MK_STR("8")},  // Switch
    {.key = NULL},
};
mgos_dns_sd_add_service_instance("gizmo9000", "_hap._tcp", 8080, gizmo_txt);
```


 ----- 
#### mgos_dns_sd_get_host_name

```c
const char *mgos_dns_sd_get_host_name(void);
```
> 
> Return currently configure DNS-SD hostname.
>  
#### mgos_dns_sd_add_service_instance

```c
bool mgos_dns_sd_add_service_instance(
    const char *instance, const char *proto, int port,
    const struct mgos_dns_sd_txt_entry *txt_entries);
```
> 
> Add a service instance.
> If service instance already exists, its definition will be replaced.
> A record will be added automatically to point to the device.
> If txt_entries is not NULL, it must end with an entry with key=NULL.
> 
> Example (for Apple HAP):
> 
> const struct mgos_dns_sd_txt_entry gizmo_txt[] = {
>     {.key = "c#", .value = MG_MK_STR("1")},
>     {.key = "ff", .value = MG_MK_STR("0")},
>     {.key = "pv", .value = MG_MK_STR("1.0")},
>     {.key = "id", .value = MG_MK_STR("11:22:33:44:55:66")},
>     {.key = "md", .value = MG_MK_STR("Fancy Gizmo 9000")},
>     {.key = "s#", .value = MG_MK_STR("1")},
>     {.key = "sf", .value = MG_MK_STR("1")},
>     {.key = "ci", .value = MG_MK_STR("8")},  // Switch
>     {.key = NULL},
> };
> mgos_dns_sd_add_service_instance("gizmo9000", "_hap._tcp", 8080, gizmo_txt);
>  
#### mgos_dns_sd_remove_service_instance

```c
bool mgos_dns_sd_remove_service_instance(
    const char *instance, const char *proto, int port);
```
>  Stop advertising the specified instance. 
#### mgos_dns_sd_advertise

```c
void mgos_dns_sd_advertise(void);
```
>  Send a DNS-SD advertisement message now. 
#### mgos_dns_sd_goodbye

```c
void mgos_dns_sd_goodbye(void);
```
>  Send a goodbye packet 
