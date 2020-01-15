# freertos
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/freertos](https://github.com/mongoose-os-libs/freertos) | [FreeRTOSConfigCommon.h](https://github.com/mongoose-os-libs/freertos/blob/master/include/FreeRTOSConfigCommon.h) | &nbsp;  | &nbsp;         |



This is official FreeRTOS 10.2.0 kernel from www.freertos.org with some irrelevant stuff removed.

It is used by all the ports except ESP32, which uses its own, heavily modified version.


 ----- 
#### (

```c
#define configTICK_RATE_HZ ((TickType_t) 100)
#define configUSE_NEWLIB_REENTRANT 0
#define configMINIMAL_STACK_SIZE 256 /* x 4 = 1024 */
#define configMAX_PRIORITIES 25
#define configUSE_PREEMPTION 1
#define configUSE_IDLE_HOOK 0
#define configUSE_TICK_HOOK 0
#define configUSE_16_BIT_TICKS 0
```
> no_extern_c_check
