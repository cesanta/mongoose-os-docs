# mDash dashboard
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/dash](https://github.com/mongoose-os-libs/dash) | [mgos_dash.h](https://github.com/mongoose-os-libs/dash/tree/master/include/mgos_dash.h) | &nbsp;  | [api_dash.js](https://github.com/mongoose-os-libs/dash/tree/master/mjs_fs/api_dash.js)         |



## Overview

This library provides support for device management dashboard.


 ----- 

Device management dashboard API.
 

 ----- 
#### mgos_dash_notifyf

```c
void mgos_dash_notifyf(const char *method, const char *json_fmt, ...);
```
> 
> Send an notification RPC to the dashboard that does not require an answer.
> Example - report statistical data:
> ```c
>    mgos_dash_notifyf("Data", "[%d, %d]", value1, value2);
> ```
>  
#### mgos_dash_notify

```c
void mgos_dash_notify(const char *method, const char *data);
```
> 
> Same as `mgos_dash_notifyf()` but accepts stringified data.
>  

### JS API

 --- 
#### Dash.notify

```javascript
Dash.notify(name, data)
```
Send notification event to mDash. `name` is an event name,
`data` is either a string or an object. A string is sent as-is,
and object gets `JSON.stringify()`-ed then sent.

Return value: none.

Example:
```javascript
Dash.notify('Data', {temperature: 12.34});
```
