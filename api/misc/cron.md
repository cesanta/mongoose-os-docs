
View this file on GitHub:
[mgos_cron.h](https://github.com/mongoose-os-libs/cron/blob/master/include/mgos_cron.h)

This library implements cron core functionality; see also:
[crontab](https://mongoose-os.com/docs/api/mgos_crontab.h.html).

See cron syntax explanation
[here](https://github.com/mongoose-os-libs/cron/blob/master/README.md).
 
### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/cron](https://github.com/mongoose-os-libs/cron) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API
#### (*mgos_cron_callback_t)

```c
typedef void (*mgos_cron_callback_t)(void *user_data, mgos_cron_id_t id);
```

Cron callback signature; `user_data` is a pointer given to
`mgos_cron_add()`, and `id` is the id of the corresponding cron job.
 
#### mgos_cron_add

```c
mgos_cron_id_t mgos_cron_add(const char *expr, mgos_cron_callback_t cb,
                             void *user_data);
```

Adds cron entry with the expression `expr` (a null-terminated string, should
be no longer that 256 bytes) and `cb` as a callback.
`user_data` is an arbitrary pointer which will be passed to `cb`.
Returns cron ID.
 
#### mgos_cron_get_next_invocation

```c
time_t mgos_cron_get_next_invocation(mgos_cron_id_t id, time_t date);
```

Calculate the next fire date after the specified date.
 
#### mgos_cron_is_expr_valid

```c
bool mgos_cron_is_expr_valid(const char *expr, const char **perr);
```

Returns whether the given string is a valid cron expression or not. In case
of an error, if `perr` is not NULL, `*perr` is set to an error message; it
should NOT be freed by the caller.
 
#### mgos_cron_remove

```c
void mgos_cron_remove(mgos_cron_id_t id);
```

Removes cron entry with a given cron ID.
 
