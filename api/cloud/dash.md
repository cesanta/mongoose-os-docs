# mDash dashboard
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/dash](https://github.com/mongoose-os-libs/dash) | [mgos_dash.h](https://github.com/mongoose-os-libs/dash/tree/master/include/mgos_dash.h) | &nbsp;  | &nbsp;         |

# Support library for the device management dashboard

## Overview

This library provides support for device management dashboard.


 ----- 

Device management dashboard API.
 

 ----- 
#### mgos_dash_callf_noreply

```c
void mgos_dash_callf_noreply(const char *method, const char *json_fmt, ...);
```

Send an RPC request to the dashboard that does not require an answer.
Example - report statistical data:
```c
   mgos_dash_call_noreply("Dash.Data", "[%d, %d]", value1, value2);
```
 
