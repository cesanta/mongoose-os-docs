# mgos_iram.h
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_iram.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_iram.h) | [mgos_iram.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_iram.c)  | &nbsp;         |

#### _IRAM_STR_LIT

```c
#define _IRAM_STR_LIT(a) #a
#define _IRAM_STR(a) _IRAM_STR_LIT(a)
```
> 
> Provides the IRAM macro that creates unique sections under .text
> so that unused functions can be GC'd.
>  
