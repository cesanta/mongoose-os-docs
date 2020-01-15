# IBM Watson
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/watson](https://github.com/mongoose-os-libs/watson) | [mgos_watson.h](https://github.com/mongoose-os-libs/watson/blob/master/include/mgos_watson.h) | &nbsp;  | [api_watson.js](https://github.com/mongoose-os-libs/watson/blob/master/mjs_fs/api_watson.js)         |



See [IBM Watson tutorial](https://mongoose-os.com/docs/quickstart/cloud/watson.md)


 ----- 
#### mgos_watson_is_connected

```c
bool mgos_watson_is_connected(void);
```
>  Returns true if Watson connection is up, false otherwise. 
#### mgos_watson_send_event_jsonf

```c
bool mgos_watson_send_event_jsonf(const char *event_id, const char *json_fmt,
                                  ...);
bool mgos_watson_send_event_jsonp(const struct mg_str *event_id,
                                  const struct mg_str *body);
```
> 
> Send an event, in JSON format.
> The message should be an object with a "d" key and properties, e.g.:
> `mgos_watson_send_eventf("{d: {foo: %d}}", foo);`
>  

### JS API

 --- 
#### Watson.isConnected

```javascript
Watson.isConnected()
```
Return value: true if Watson connection is up, false otherwise.
