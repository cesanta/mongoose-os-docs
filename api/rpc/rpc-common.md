# RPC core
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-common](https://github.com/mongoose-os-libs/rpc-common) | [mgos_rpc.h](https://github.com/mongoose-os-libs/rpc-common/tree/master/include/mgos_rpc.h) | &nbsp;  | [api_rpc.js](https://github.com/mongoose-os-libs/rpc-common/tree/master/mjs_fs/api_rpc.js)         |



See [MG-RPC in Mongoose OS book](https://mongoose-os.com/docs/book/rpc.html)
for detailed documentation.


 ----- 
#### mgos_rpc_common_init

```c
bool mgos_rpc_common_init(void);
struct mg_rpc *mgos_rpc_get_global(void);
struct mg_rpc_cfg *mgos_rpc_cfg_from_sys(const struct mgos_config *scfg);
void mgos_rpc_channel_ws_out_cfg_from_sys(
    const struct mgos_config *scfg, struct mg_rpc_channel_ws_out_cfg *chcfg);
```
>  __cplusplus 
#### (*mgos_rpc_eh_t)

```c
typedef void (*mgos_rpc_eh_t)(struct mg_rpc_request_info *ri, const char *args,
                              const char *src, void *user_data);
```
>  FFI-able signature of the function that receives RPC request 
#### (*mgos_rpc_result_cb_t)

```c
typedef void (*mgos_rpc_result_cb_t)(const char *result, int error_code,
                                     const char *error_msg, void *cb_arg);
```
>  FFI-able signature of the function that receives response to a request. 
#### mgos_rpc_add_handler

```c
void mgos_rpc_add_handler(const char *method, mgos_rpc_eh_t cb, void *cb_arg);
```
> 
> FFI-able function to add an RPC handler
>  
#### mgos_rpc_send_response

```c
bool mgos_rpc_send_response(struct mg_rpc_request_info *ri,
                            const char *response_json);
```
>  FFI-able function to send response from an RPC handler 
#### mgos_rpc_call

```c
bool mgos_rpc_call(const char *dst, const char *method, const char *args_json,
                   mgos_rpc_result_cb_t cb, void *cb_arg);
```
>  FFI-able function to perform an RPC call 
#### mgos_print_sys_info

```c
int mgos_print_sys_info(struct json_out *out);
```
>  Print system info JSON object. Return number of bytes written. 
#### MGOS_EVENT_BASE

```c
#define MGOS_RPC_EVENT_BASE MGOS_EVENT_BASE('R', 'P', 'C')
```
>  RPC events 

### JS API

 --- 
#### RPC.addHandler

```javascript
RPC.addHandler(name, handler)
```
Add RPC handler. `name` is a string like `'MyMethod'`, `handler`
is a callback function which takes `args` arguments object.
If a handler returns an object with a numeric `error` attribute and
optional `message` string attribute, the caller will get a failure.

Return value: none.

Example:
```javascript
RPC.addHandler('Sum', function(args) {
  if (typeof(args) === 'object' && typeof(args.a) === 'number' &&
      typeof(args.b) === 'number') {
    return args.a + args.b;
  } else {
    return {error: -1, message: 'Bad request. Expected: {"a":N1,"b":N2}'};
  }
});
```
#### RPC.call

```javascript
RPC.call(dst, method, args, callback)
```
Call remote or local RPC service.
Return value: true in case of success, false otherwise.

If `dst` is empty, connected server is implied. `method` is a string
like "MyMethod", `callback` is a callback function which takes the following
arguments: res (results object), err_code (0 means success, or error code
otherwise), err_msg (error messasge for non-0 error code), userdata. Example:

```javascript
RPC.call(RPC.LOCAL, 'Config.Save', {reboot: true}, function (resp, ud) {
  print('Response:', JSON.stringify(resp));
}, null);
```
