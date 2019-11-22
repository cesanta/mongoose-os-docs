# RPC core
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/rpc-common](https://github.com/mongoose-os-libs/rpc-common) | [mg_rpc.h](https://github.com/mongoose-os-libs/rpc-common/tree/master/include/mg_rpc.h) | &nbsp;  | [api_rpc.js](https://github.com/mongoose-os-libs/rpc-common/tree/master/mjs_fs/api_rpc.js)         |



See [MG-RPC Guide](https://mongoose-os.com/docs/mongoose-os/userguide/rpc.md)
for detailed documentation.


 ----- 
#### mg_rpc_create

```c
struct mg_rpc *mg_rpc_create(struct mg_rpc_cfg *cfg);
```
>  Create mg_rpc instance. Takes over cfg, which must be heap-allocated. 
#### mg_rpc_add_channel

```c
void mg_rpc_add_channel(struct mg_rpc *c, const struct mg_str dst,
                        struct mg_rpc_channel *ch);
#define MG_RPC_DST_DEFAULT "*"
```
> 
> Adds a channel to the instance.
> If dst is empty, it will be learned when first frame arrives from the other
> end. A "default" channel, if present, will be used for frames that don't have
> a better match.
>  
#### mg_rpc_remove_channel

```c
void mg_rpc_remove_channel(struct mg_rpc *c, struct mg_rpc_channel *ch);
```
>  Remove a channel from the instance. 
#### mg_rpc_connect

```c
void mg_rpc_connect(struct mg_rpc *c);
```
>  Invokes connect method on all channels of this instance. 
#### mg_rpc_disconnect

```c
void mg_rpc_disconnect(struct mg_rpc *c);
```
>  Invokes close method on all channels of this instance. 
#### mg_rpc_add_local_id

```c
void mg_rpc_add_local_id(struct mg_rpc *c, const struct mg_str id);
```
> 
> Add a local ID. Frames with this `dst` will be considered addressed to this
> instance.
>  
#### (*mg_result_cb_t)

```c
typedef void (*mg_result_cb_t)(struct mg_rpc *c, void *cb_arg,
                               struct mg_rpc_frame_info *fi,
                               struct mg_str result, int error_code,
                               struct mg_str error_msg);
```
>  Signature of the function that receives response to a request. 
#### mg_rpc_callf

```c
bool mg_rpc_callf(struct mg_rpc *c, const struct mg_str method,
                  mg_result_cb_t cb, void *cb_arg,
                  const struct mg_rpc_call_opts *opts, const char *args_jsonf,
                  ...);
```
> 
> Make an RPC call.
> The destination RPC server is specified by `opts`, and destination
> RPC service name is `method`.
> `cb` callback function is optional, in which case request is sent but
> response is not required.
> opts can be NULL, in which case the default destination is used.
> Example - calling a remote RPC server over websocket:
> 
> ```c
> struct mg_rpc_call_opts opts = {.dst = mg_mk_str("ws://1.2.3.4/foo") };
> mg_rpc_callf(mgos_rpc_get_global(), mg_mk_str("My.Func"), NULL, NULL, &opts,
>              "{param1: %Q, param2: %d}", "jaja", 1234);
> ```
> It is possible to call RPC services running locally. In this case,
> include the https://github.com/mongoose-os-libs/rpc-loopback library,
> and use `MGOS_RPC_LOOPBACK_ADDR` special destination address:
> 
> ```c
> #include "mg_rpc_channel_loopback.h"
> struct mg_rpc_call_opts opts = {.dst = mg_mk_str(MGOS_RPC_LOOPBACK_ADDR) };
> ```
>  
#### mg_rpc_vcallf

```c
bool mg_rpc_vcallf(struct mg_rpc *c, const struct mg_str method,
                   mg_result_cb_t cb, void *cb_arg,
                   const struct mg_rpc_call_opts *opts, const char *args_jsonf,
                   va_list ap);
```
>  Same as mg_rpc_callf, but takes va_list ap 
#### (*mg_handler_cb_t)

```c
typedef void (*mg_handler_cb_t)(struct mg_rpc_request_info *ri, void *cb_arg,
                                struct mg_rpc_frame_info *fi,
                                struct mg_str args);
```
> 
> Signature of an incoming request handler.
> Note that only request_info remains valid after return from this function,
> frame_info and args will be invalidated.
>  
#### mg_rpc_add_handler

```c
void mg_rpc_add_handler(struct mg_rpc *c, const char *method,
                        const char *args_fmt, mg_handler_cb_t cb, void *cb_arg);
```
> 
> Add a method handler.
> `method` can be a pattern, e.g. `Foo.*` will match calls to `Foo.Bar`.
> Matching is case-insensitive so invoking `foo.bar` will also work.
>  
#### (*mg_prehandler_cb_t)

```c
typedef bool (*mg_prehandler_cb_t)(struct mg_rpc_request_info *ri, void *cb_arg,
                                   struct mg_rpc_frame_info *fi,
                                   struct mg_str args);
```
> 
> Signature of an incoming requests prehandler, which is called right before
> calling the actual handler.
> 
> If it returns false, the further request processing is not performed. It's
> called for existing handlers only.
>  
#### mg_rpc_set_prehandler

```c
void mg_rpc_set_prehandler(struct mg_rpc *c, mg_prehandler_cb_t cb,
                           void *cb_arg);
```
>  Set a generic method prehandler. 
#### mg_rpc_send_responsef

```c
bool mg_rpc_send_responsef(struct mg_rpc_request_info *ri,
                           const char *result_json_fmt, ...);
```
> 
> Respond to an incoming request.
> result_json_fmt can be NULL, in which case no result is included.
> `ri` is freed by the call, so it's illegal to use it afterwards.
>  
#### mg_rpc_send_errorf

```c
bool mg_rpc_send_errorf(struct mg_rpc_request_info *ri, int error_code,
                        const char *error_msg_fmt, ...);
```
> 
> Send and error response to an incoming request.
> error_msg_fmt is optional and can be NULL, in which case only code is sent.
> `ri` is freed by the call, so it's illegal to use it afterwards.
>  
#### mg_rpc_send_error_jsonf

```c
bool mg_rpc_send_error_jsonf(struct mg_rpc_request_info *ri, int error_code,
                             const char *error_json_fmt, ...);
```
> 
> Like mg_rpc_send_errorf, but uses JSON formatting, see json_printf().
> NOTE: "error.message" will still be a string but will contain serialized
> JSON formatted accordingly to error_json_fmt.
>  
#### mg_rpc_is_connected

```c
bool mg_rpc_is_connected(struct mg_rpc *c);
```
>  Returns true if the instance has an open default channel. 
#### mg_rpc_can_send

```c
bool mg_rpc_can_send(struct mg_rpc *c);
```
>  Returns true if the instance has an open default channel
> and it's not currently busy. 
#### mg_rpc_get_channel_info

```c
bool mg_rpc_get_channel_info(struct mg_rpc *c, struct mg_rpc_channel_info **ci,
                             int *num_ci);
void mg_rpc_channel_info_free(struct mg_rpc_channel_info *ci);
void mg_rpc_channel_info_free_all(struct mg_rpc_channel_info *ci, int num_ci);
```
> 
> Retrieve information about currently active channels.
> Results are heap-allocated and must be freed all together with
> mg_rpc_channel_info_free_all() or individuallt with
> mg_rpc_channel_info_free().
> Note: mg_rpc_channel_info_free_all does not free the pointer passed to it.
>  
#### mg_rpc_add_list_handler

```c
void mg_rpc_add_list_handler(struct mg_rpc *c);
```
>  Enable RPC.List handler that returns a list of all registered endpoints 
#### mg_rpc_parse_frame

```c
bool mg_rpc_parse_frame(const struct mg_str f, struct mg_rpc_frame *frame);
```
> 
> Parses frame `f` and stores result into `frame`. Returns true in case of
> success, false otherwise.
>  
#### mg_rpc_check_digest_auth

```c
bool mg_rpc_check_digest_auth(struct mg_rpc_request_info *ri);
```
> 
> Checks whether digest auth creds were provided and were correct. After that
> call, the caller should check whether the authn was successful by checking
> if `ri->authn_info.username.len` is not empty.
> 
> If some error has happened, like failure to open `htdigest` file, sends
> an error response and returns false (in this case, `ri` is not valid
> anymore). Otherwise returns true.
> 
> NOTE: returned true does not necessarily mean the successful authentication.
>  

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
RPC.call(RPC.LOCAL, 'Config.Save', {reboot: true}, function (resp, err_code, err_msg, ud) {
  if (err_code !== 0) {
    print("Error: (" + JSON.stringify(err_code) + ') ' + err_msg);
  } else {
    print('Result: ' + JSON.stringify(result));
  }
}, null);
```
