# mdash-api
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/mdash-api](https://github.com/mongoose-os-libs/mdash-api) | [mgos_mdash_api.h](https://github.com/mongoose-os-libs/mdash-api/blob/master/include/mgos_mdash_api.h) | &nbsp;  | &nbsp;         |



## Example 1
```c

#include "mgos.h"

#define USE_WIFI 0

#if USE_WIFI == 1
#include "mgos_wifi.h"
#endif

#include "mgos_mdash_api.h"

static void create_mdash_ui() {
  struct mgos_mdash_widgets *widgets = mgos_mdash_widgets_create(0);
  mgos_mdash_widgets_add_widget(
      widgets, mgos_mdash_widget_toggle_create("Switch LED on/off",
                                               "state.reported.on"));
  mgos_mdash_widgets_add_widget(
      widgets,
      mgos_mdash_widget_value_create("Uptime (s):", "state.reported.uptime"));
  mgos_mdash_widgets_add_widget(
      widgets, mgos_mdash_widget_input_create(
                   "Led pin", "state.reported.led_pin", "fa-save"));
  mgos_mdash_widgets_add_widget(
      widgets, mgos_mdash_widget_button_create("Reboot", "Sys.Reboot", NULL,
                                               "fa-power-off"));

  mgos_mdash_create_ui(widgets);
  mgos_mdash_widgets_free(widgets);
}

#if USE_WIFI == 1
static void wifi_cb(int ev, void *evd, void *arg) {
  switch (ev) {
    case MGOS_WIFI_EV_STA_IP_ACQUIRED: {
      LOG(LL_INFO, ("%s", "MGOS_WIFI_EV_STA_IP_ACQUIRED"));

      mgos_mdash_set_label("my_label");
      create_mdash_ui();

      break;
    }
  }
  (void) evd;
  (void) arg;
}
#else
static void net_cb(int ev, void *evd, void *arg) {
  switch (ev) {
    case MGOS_NET_EV_IP_ACQUIRED: {
      LOG(LL_INFO, ("%s", "MGOS_NET_EV_IP_ACQUIRED"));

      mgos_mdash_set_label("my_label");
      create_mdash_ui();
      break;
    }
  }
  (void) evd;
  (void) arg;
}
#endif

enum mgos_app_init_result mgos_app_init(void) {
#if USE_WIFI == 1
  mgos_event_add_group_handler(MGOS_EVENT_GRP_WIFI, wifi_cb, NULL);
#else
  mgos_event_add_group_handler(MGOS_EVENT_GRP_NET, net_cb, NULL);
#endif

  return MGOS_APP_INIT_SUCCESS;
}
```

## Example 2
- Define the widgets in the `mos.yml` of your application, e.g.
```yaml
config_schema:
# mDash widgets
  - ["mdash.toggle.title", "Switch LED on/off"]
  - ["mdash.toggle.key", "state.reported.on"]

  - ["mdash.value.title", "Uptime (s):"]
  - ["mdash.value.key", "state.reported.uptime"]
  
  - ["mdash.value1.enable", true]   # enable this widget
  - ["mdash.value1.title", "Min free RAM:"]
  - ["mdash.value1.key", "state.reported.ram_min_free"]
  
  - ["mdash.value2.enable", true]   # enable this widget
  - ["mdash.value2.title", "Free RAM:"]
  - ["mdash.value2.key", "state.reported.ram_free"]
  
  - ["mdash.value3.enable", true]   # enable this widget
  - ["mdash.value3.title", "Temp:"]
  - ["mdash.value3.key", "state.reported.temp"]

  - ["mdash.button.title", "Reboot"]
  - ["mdash.button.method", "Sys.Reboot"]
  - ["mdash.button.params", ""]
  - ["mdash.button.icon", "fa-power-off"]
```
- The code
```c
#include "mgos.h"

#include "mgos_mdash_api.h"

static void create_mdash_ui() {
  struct mgos_mdash_widgets *widgets;
  if (mgos_mdash_create_widgets_from_config(&widgets)) {
    mgos_mdash_create_ui(widgets);
  }
  mgos_mdash_widgets_free(widgets);
}


static void cloud_cb(int ev, void *evd, void *arg) {
  switch (ev) {
    case MGOS_EVENT_CLOUD_CONNECTED: {
      LOG(LL_INFO, ("%s - Cloud connected", __FUNCTION__));
      mgos_mdash_set_label("my_label");
      create_mdash_ui();
      break;
    }
  }

  (void) evd;
  (void) arg;
}

enum mgos_app_init_result mgos_app_init(void) {
  mgos_event_add_handler(MGOS_EVENT_CLOUD_CONNECTED, cloud_cb, NULL);

  return MGOS_APP_INIT_SUCCESS;
}
```

- Drawback -  the order of creating the widgets is fixed: value, input, toggle and button.
- Advantage - a widget can be disabled at runtime. E.g. 
```yaml
mos --port <serial,ws,mqtt port> config-set mdash.value3.enable=false
```

## Usage
- Create a device in mDash
- Create a API key
- Build and flash the application
- `mos wifi SSID PASSWORD`
- Provision the device in mDash
- `mos --port <port> config-set mdash.device_id="<device ID from mDash>" mdash.api_key="<API key from mDash>" `

## Refs
[Device UI for remote control](https://mdash.net/docs/userguide/device-ui.md)



 ----- 
#### mgos_mdash_set_label

```c
void mgos_mdash_set_label(const char *label);
```
>  set a device label 
#### mgos_mdash_widget_toggle_create

```c
struct mgos_mdash_widget *mgos_mdash_widget_toggle_create(const char *title,
                                                          const char *key);
```
>  {"type": "toggle", "title": "Switch LED on/off", "key": "led"} 
#### mgos_mdash_widget_value_create

```c
struct mgos_mdash_widget *mgos_mdash_widget_value_create(const char *title,
                                                         const char *key);
```
>  {"type": "value", "title": "free RAM:", "key": "ram"} 
#### mgos_mdash_widget_button_create

```c
struct mgos_mdash_widget *mgos_mdash_widget_button_create(const char *title,
                                                          const char *method,
                                                          const char *params,
                                                          const char *icon);
```
>  {"type": "button", "title": "reboot", "icon": "fa-power-off", "method":
>    "Sys.Reboot", "params": {}} 
#### mgos_mdash_widget_input_create

```c
struct mgos_mdash_widget *mgos_mdash_widget_input_create(const char *title,
                                                         const char *key);
```
>  {"type": "input", "icon": "fa-save", title: "Set LED pin", "key": "pin"} 
#### mgos_mdash_widget_free

```c
void mgos_mdash_widget_free(struct mgos_mdash_widget **widget);
```
>  free the widget 
#### mgos_mdash_create_ui

```c
bool mgos_mdash_create_ui(const struct mgos_mdash_widgets *widgets);
```
>  create the mDash UI 
#### mgos_mdash_widgets_create

```c
struct mgos_mdash_widgets *mgos_mdash_widgets_create(size_t max_count);
```
>  create the widgets holder 
#### mgos_mdash_widgets_create_from_config

```c
bool mgos_mdash_widgets_create_from_config(struct mgos_mdash_widgets **widgets);
```
>  create the widgets from config 
#### mgos_mdash_widgets_add_widget

```c
void mgos_mdash_widgets_add_widget(struct mgos_mdash_widgets *widgets,
                                   struct mgos_mdash_widget *widget);
```
>  add a widget 
#### mgos_mdash_widgets_free

```c
void mgos_mdash_widgets_free(struct mgos_mdash_widgets *widgets);
```
>  free the widgets holder 
