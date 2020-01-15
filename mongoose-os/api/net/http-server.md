# HTTP server
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/http-server](https://github.com/mongoose-os-libs/http-server) | [mgos_http_server.h](https://github.com/mongoose-os-libs/http-server/blob/master/include/mgos_http_server.h) | &nbsp;  | &nbsp;         |




 ----- 
#### mgos_get_sys_http_server

```c
struct mg_connection *mgos_get_sys_http_server(void);
```
> 
> Return global listening connection
>  
#### mgos_register_http_endpoint

```c
void mgos_register_http_endpoint(const char *uri_path,
                                 mg_event_handler_t handler, void *user_data);
```
> 
> Register HTTP endpoint handler `handler` on URI `uri_path`
> 
> Example:
> ```c
> static void foo_handler(struct mg_connection *c, int ev, void *p,
>                         void *user_data) {
>   (void) p;
>   if (ev != MG_EV_HTTP_REQUEST) return;
>   LOG(LL_INFO, ("Foo requested"));
>   mg_send_response_line(c, 200,
>                         "Content-Type: text/html\r\n");
>   mg_printf(c, "%s\r\n", "Fooooo");
>   c->flags |= (MG_F_SEND_AND_CLOSE | MGOS_F_RELOAD_CONFIG);
>   (void) user_data;
> }
> 
> // Somewhere else:
> mgos_register_http_endpoint("/foo/", foo_handler, NULL);
> ```
>  
#### mgos_register_http_endpoint_opt

```c
void mgos_register_http_endpoint_opt(const char *uri_path,
                                     mg_event_handler_t handler,
                                     struct mg_http_endpoint_opts opts);
```
> 
> Like `mgos_register_http_endpoint()`, but additionally takes `struct
> mg_http_endpoint_opts opts`
>  
#### mgos_http_server_set_document_root

```c
void mgos_http_server_set_document_root(const char *document_root);
```
> 
> Set document root to serve static content from. Setting it to NULL disables
> static server (404 will be returned).
>  
