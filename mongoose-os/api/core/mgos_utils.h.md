# Utils
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_utils.h](https://github.com/cesanta/mongoose-os/tree/master/include/mgos_utils.h) | [mgos_utils.c](https://github.com/cesanta/mongoose-os/tree/master/src/mgos_utils.c)  | &nbsp;         |

#### mgos_system_restart_after

```c
void mgos_system_restart_after(int delay_ms);
```
>  Restart system after the specified number of milliseconds 
#### mgos_rand_range

```c
float mgos_rand_range(float from, float to);
```
>  Return random number in a given range. 
