# Google IoT Core
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/gcp](https://github.com/mongoose-os-libs/gcp) | [mgos_gcp.h](https://github.com/mongoose-os-libs/gcp/tree/master/include/mgos_gcp.h) | &nbsp;  | &nbsp;         |



This library implements integration of Mongoose OS with Google IoT Core.

See tutorial at https://mongoose-os.com/docs/mos/cloud/google.md


 ----- 
#### mgos_gcp_send_event

```c
bool mgos_gcp_send_event(const struct mg_str data);
bool mgos_gcp_send_eventp(const struct mg_str *data);
bool mgos_gcp_send_eventf(const char *json_fmt, ...);
```
> 
> Send a telemetry event to the default topic.
> 
> Se documentation here:
> https://cloud.google.com/iot/docs/how-tos/mqtt-bridge#publishing_telemetry_events
> 
> E.g.: mgos_gcp_send_eventf("{foo: %d}", foo);
>  
#### mgos_gcp_send_event_sub

```c
bool mgos_gcp_send_event_sub(const struct mg_str subfolder,
                             const struct mg_str data);
bool mgos_gcp_send_event_subp(const struct mg_str *subfolder,
                              const struct mg_str *data);
bool mgos_gcp_send_event_subf(const char *subfolder, const char *json_fmt, ...);
```
> 
> Send a telemetry event to a subfolder topic.
> 
> E.g.: mgos_gcp_send_event_subf("foo_events", "{foo: %d}", foo);
>  
