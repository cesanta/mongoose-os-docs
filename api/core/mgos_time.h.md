# Time
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_time.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_time.h) | [mgos_time.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_time.c)  | &nbsp;         |

#### mgos_uptime

```c
double mgos_uptime(void);
```
<div class="apidescr">
 Get number of seconds since last reboot 
</div>
#### mgos_strftime

```c
int mgos_strftime(char *s, int size, char *fmt, int time);
```
<div class="apidescr">

Format `time` according to a `strftime()`-conformant format.
Write the result into the `s,size` buffer. Return resulting string length.
 
</div>
#### mgos_settimeofday

```c
int mgos_settimeofday(double time, struct timezone *tz);
```
<div class="apidescr">

Like standard `settimeofday()`, but uses `double` seconds value instead of
`struct timeval *tv`. If time was changed successfully, emits an event
`MGOS_EVENT_TIME_CHANGED`.
 
</div>
