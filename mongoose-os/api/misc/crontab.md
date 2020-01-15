# Crontab
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/crontab](https://github.com/mongoose-os-libs/crontab) | [mgos_crontab.h](https://github.com/mongoose-os-libs/crontab/blob/master/include/mgos_crontab.h) | &nbsp;  | &nbsp;         |



Crontab wraps [cron core](https://github.com/mongoose-os-libs/cron) and
maintains a persisted set of cron jobs. Crontab file is simply a JSON file
(actually managed by [jstore](https://github.com/mongoose-os-libs/jstore))
which looks like this:

```javascript
{"items":[
  ["1", {
    "at": "0 0 7 * * MON-FRI",
    "enable": true,
    "action": "foo",
    "payload": {"a": 1, "b": 2}
  }],
  ["2", {
    "at": "0 */2 1-4 * * *",
    "enable": true,
    "action": "bar"
  }]
]}
```

For the cron expression syntax, see [cron
core](https://github.com/mongoose-os-libs/cron) docs.


 ----- 

Crontab wraps [cron core](https://github.com/mongoose-os-libs/cron) and
maintains a persisted set of cron jobs. Crontab file is simply a JSON file
(actually managed by [jstore](https://github.com/mongoose-os-libs/jstore))
which looks like this:

```json
{"items":[
  ["1", {
    "at": "0 0 7 * * MON-FRI",
    "enable": true,
    "action": "foo",
    "payload": {"a": 1, "b": 2}
  }],
  ["2", {
    "at": "0 30 23 30 * *",
    "enable": true,
    "action": "bar"
  }]
]}
```

This file is maintained by a set of API functions (see below).

Obviously, crontab file contains a set of cron jobs, each of which consists,
at least, of the cron expression like `0 0 7 * * MON-FRI` (refer to the
[cron core](https://github.com/mongoose-os-libs/cron) for the expression
syntax docs) and an action to be taken. Action is just a string, in the
example above there are two actions: `foo` and `bar`. Additionally, there
can be a `payload`, which is an arbitrary JSON. Payload is just a set of
parameters for the action.

Obviously, there should be a mapping between those string actions and the
corresponding functions to be called; this is what
`mgos_crontab_register_handler()` is for.

Example:

```c
static void my_foo_cb(struct mg_str action,
                      struct mg_str payload, void *userdata) {
  LOG(LL_INFO, ("Crontab foo job fired! Payload: %.*s", payload.len,
payload.p));
  (void) action;
  (void) userdata;
}

// Somewhere else:
mgos_crontab_register_handler("foo", my_foo_cb, NULL);
```

The code above maps action `foo` in the JSON to the callback `my_foo_cb`.
 

 ----- 
#### (

```c
#define MGOS_CRONTAB_INVALID_JOB_ID ((mgos_crontab_job_id_t) 0)
```
> 
> Invalid value for the crontab job id.
>  
#### (*mgos_crontab_iterate_cb)

```c
typedef void (*mgos_crontab_iterate_cb)(mgos_crontab_job_id_t id,
                                        struct mg_str at, bool enable,
                                        struct mg_str action,
                                        struct mg_str payload, void *userdata);
```
> 
> Callback for `mgos_crontab_iterate()`; all string data is invalidated when
> the callback returns.
>  
#### (*mgos_crontab_cb)

```c
typedef void (*mgos_crontab_cb)(struct mg_str action, struct mg_str payload,
                                void *userdata);
```
> 
> Prototype for a job handler to be registered with
> `mgos_crontab_register_handler()`.
>  
#### mgos_crontab_job_add

```c
bool mgos_crontab_job_add(struct mg_str at, bool enable, struct mg_str action,
                          struct mg_str payload, mgos_crontab_job_id_t *pid,
                          char **perr);
```
> 
> Add a new job. Passed string data is not retained. If `pid` is not NULL,
> resulting job id is written there.
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_crontab_job_edit

```c
bool mgos_crontab_job_edit(mgos_crontab_job_id_t id, struct mg_str at,
                           bool enable, struct mg_str action,
                           struct mg_str payload, char **perr);
```
> 
> Edit a job by its id. Passed string data is not retained.
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_crontab_job_remove

```c
bool mgos_crontab_job_remove(mgos_crontab_job_id_t id, char **perr);
```
> 
> Remove a job by its id.
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_crontab_job_get

```c
bool mgos_crontab_job_get(mgos_crontab_job_id_t id, struct mg_str *at,
                          bool *enable, struct mg_str *action,
                          struct mg_str *payload, char **perr);
```
> 
> Get job details by the job id. All output pointers (`at`, `enable`, `action`,
> `payload`) are optional (allowed to be NULL). For non-NULL string outputs
> (`at`, `action` and `payload`), the memory is allocated separately and
> the caller should free it.
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_crontab_iterate

```c
bool mgos_crontab_iterate(mgos_crontab_iterate_cb cb, void *userdata,
                          char **perr);
```
> 
> Iterate over all jobs in crontab, see `mgos_crontab_iterate_cb` for details.
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_crontab_register_handler

```c
void mgos_crontab_register_handler(struct mg_str action, mgos_crontab_cb cb,
                                   void *userdata);
```
> 
> Add a handler for the given string action
> 
> Example:
> 
> ```c
> static void my_foo_cb(struct mg_str action,
>                       struct mg_str payload, void *userdata) {
>   LOG(LL_INFO, ("Crontab foo job fired! Payload: %.*s", payload.len,
> payload.p));
>   (void) action;
>   (void) userdata;
> }
> 
> // Somewhere else:
> mgos_crontab_register_handler("foo", my_foo_cb, NULL);
> ```
> 
> The code above maps action `foo` in the JSON to the callback `my_foo_cb`.
>  
#### mgos_crontab_get_next_invocation

```c
time_t mgos_crontab_get_next_invocation(mgos_crontab_job_id_t id, time_t date);
```
> 
> Calculate the next fire date after the specified date, using crontab ID
> (returned by all cron RPC methods)
>  
