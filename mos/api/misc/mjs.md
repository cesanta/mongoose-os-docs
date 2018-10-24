# MJS JavaScript engine
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/mjs](https://github.com/mongoose-os-libs/mjs) | [mos_mjs.h](https://github.com/mongoose-os-libs/mjs/tree/master/include/mos_mjs.h) | &nbsp;  | &nbsp;         |



This library brings an [mJS: restricted JavaScript-like
Engine](https://github.com/cesanta/mjs).

Apart from adding the mJS itself, the library creates a global instance of it
(available via `mgos_mjs_get_global()`), and also brings a number of
mgos-specific API files, see `fs` directory.


 ----- 

mJS wrapper API.
 

 ----- 
#### mgos_mjs_get_global

```c
struct mjs *mgos_mjs_get_global(void);
```
>  Return global mJS instance. 
