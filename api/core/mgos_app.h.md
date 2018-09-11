
# App

This file contains definitions for the user-defined app entry point,
`mgos_app_init()`.

The `mgos_app_init()` function is like the `main()` function in the C
program. This is a app's entry point.

The mongoose-os core code does implement `mgos_app_init()`
stub function as a weak symbol, so if user app does not define its own
`mgos_app_init()`, a default stub will be used. That's what most of the
JavaScript based apps do - they do not contain C code at all.

Usage example:
```c
#include "mgos_app.h"

enum mgos_app_init_result mgos_app_init(void) {
  if (!my_super_duper_hardware_init()) {
    LOG(LL_ERROR, ("something went bad"));
    return MGOS_APP_INIT_ERROR;
  }
  LOG(LL_INFO, ("my app initialised"));
  return MGOS_APP_INIT_SUCCESS;
}
```
 
#### Github repo links
| Github Repo | C Header | C source  | Javascript source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os](https://github.com/cesanta/mongoose-os/tree/master/fw)  | [mgos_app.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_app.h) | [mgos_app.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_app.c) |          |

#### C API reference
