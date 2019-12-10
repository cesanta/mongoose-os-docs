# lolin-button
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/lolin-button](https://github.com/mongoose-os-libs/lolin-button) | [mgos_lolin_button.h](https://github.com/mongoose-os-libs/lolin-button/tree/master/include/mgos_lolin_button.h) | &nbsp;  | &nbsp;         |



This library provides Mongoose OS driver for the I2C button on the [WEMOS OLED shield](https://wiki.wemos.cc/products:d1_mini_shields:oled_shield).

## Usage

```c
#include "mgos_lolin_button.h"

static void lolin_button_handler(int ev, void *ev_data, void *userdata) {
  const struct mgos_lolin_button_status *bs = (const struct mgos_lolin_button_status *) ev_data;
  const char *bn = NULL;
  switch (ev) {
    case MGOS_EV_LOLIN_BUTTON_A:
      bn = "A";
      break;
    case MGOS_EV_LOLIN_BUTTON_B:
      bn = "B";
      break;
    default:
      return;
  }
  const char *sn = NULL;
  switch (bs->state) {
    case MGOS_LOLIN_BUTTON_RELEASE:
      sn = "released";
      break;
    case MGOS_LOLIN_BUTTON_PRESS:
      sn = "pressed";
      break;
    case MGOS_LOLIN_BUTTON_DOUBLE_PRESS:
      sn = "double-pressed";
      break;
    case MGOS_LOLIN_BUTTON_LONG_PRESS:
      sn = "long-pressed";
      break;
    case MGOS_LOLIN_BUTTON_HOLD:
      sn = "held";
      break;
  }
  LOG(LL_INFO, ("Button %s %s", bn, sn));
  (void) userdata;
}

mgos_event_add_group_handler(MGOS_EV_LOLIN_BUTTON_BASE, lolin_button_handler, NULL);

```


 ----- 
