# Prometheus metrics
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/prometheus-metrics](https://github.com/mongoose-os-libs/prometheus-metrics) | [mgos_prometheus_metrics.h](https://github.com/mongoose-os-libs/prometheus-metrics/tree/master/include/mgos_prometheus_metrics.h) | &nbsp;  | &nbsp;         |



A Mongoose OS Prometheus Metrics library.

## Introduction

[Prometheus](https://prometheus.io) is an open-source systems monitoring and
alerting toolkit originally built at SoundCloud. Since its inception in 2012,
many companies and organizations have adopted Prometheus, and the project has
a very active developer and user community. It is now a standalone open source
project and maintained independently of any company.

[Mongoose OS](https://mongoose-os.com) is a purpose-built secure Operating
System for commercial connected devices. It focuses on stable and secure
functioning of multiple connected devices in production and post-sale stages.
Key features include secure communication (TLS), over-the-air updates (OTA)
and remote device management. These features are usually missing from SDK and
their correct implementation would be a complex and resource consuming task.
Neglecting them may result in compromised device security and negative brand
perception of your products.

### Structure

`prometheus-metrics` is a library component that can be added to the app's
`mos.yml` file without any configuration needed out of the box, and it pulls
in the `http-server` module. The library opens a `/metrics` endpoint which
exposes the operating system and library vitalsigns to Prometheus.

By adding the library to the build manifest in `mos.yml`, a compiler define
`MGOS_HAVE_PROMETHEUS_METRICS` is set, which other libraries can use to
create metrics and update them. This is _non intrusive_ because if the
library is not used, no additional code is compiled in Mongoose OS and its
libraries.

### Implementation

#### Base MGOS Metrics

All Mongoose vitals (memory, WiFi/Ethernet, CPU, scheduling) are exposed
using the `mgos_` prefix.

```
# HELP mgos_build Build info
# TYPE mgos_build gauge
mgos_build{app="empty",id="20171121-164823/???",version="1.1.04"} 1
# HELP mgos_platform Platform information
# TYPE mgos_platform gauge
mgos_platform{arch="esp32",mac="240AC4106560",idf="v1.0-2815-g50a73c1"} 1
# HELP mgos_uptime Uptime in seconds
# TYPE mgos_uptime counter
mgos_uptime 1888
# HELP mgos_heap_size System memory size
# TYPE mgos_heap_size gauge
mgos_heap_size 295076
```

#### Platform Specific Metrics

Platform specific vitals are exposed using the `$platform_` prefix, for
example `esp32_` for ESP32 and ESP-IDF metrics.

```
# HELP esp32_chip_info ESP32 Chip Information
# TYPE esp32_chip_info gauge
esp32_chip_info{model=0,cores=2,revision=1,features=32,sdk="master"} 1
# HELP esp32_num_tasks ESP32 FreeRTOS task count
# TYPE esp32_num_tasks gauge
esp32_num_tasks 9
```

#### Library Specific Metrics

Library owners gate the code that creates, updates and exposes the metrics
by the define `MGOS_HAVE_PROMETHEUS_METRICS`. Metrics should be defined as
static variables to stay private to the implementation. Then, a callback
function is installed, and `prometheus-metrics` will loop over all
registered callbacks to allow them to add their metrics to the output.

Taking `mqtt` as an example:

```
#if MGOS_HAVE_PROMETHEUS_METRICS
#include "mgos_prometheus_metrics.h"

static uint32_t metrics_mqtt_sent_topics_count = 0;
static uint32_t metrics_mqtt_sent_topics_bytes_total = 0;
static uint32_t metrics_mqtt_received_topics_count = 0;
static uint32_t metrics_mqtt_received_topics_bytes_total = 0;

static void metrics_mqtt(struct mg_connection *nc, void *user_data) {
  mgos_prometheus_metrics_printf(nc, COUNTER,
    "mgos_mqtt_sent_topics_count", "MQTT topics sent",
    "%u", metrics_mqtt_sent_topics_count);

  mgos_prometheus_metrics_printf(nc, COUNTER,
    "mgos_mqtt_sent_topics_bytes_total", "Total bytes sent in MQTT topics",
    "%u", metrics_mqtt_sent_topics_bytes_total);

  mgos_prometheus_metrics_printf(nc, COUNTER,
    "mgos_mqtt_received_topics_count", "MQTT topics sent",
    "%u", metrics_mqtt_received_topics_count);

  mgos_prometheus_metrics_printf(nc, COUNTER,
    "mgos_mqtt_received_topics_bytes_total", "Total bytes received in MQTT topics",
    "%u", metrics_mqtt_received_topics_bytes_total);

  (void) user_data;
}
#endif // MGOS_HAVE_PROMETHEUS_METRICS
```

Then in the library's `init` function, register the callback:

```
bool mgos_mqtt_init(void) {
#if MGOS_HAVE_PROMETHEUS_METRICS
  mgos_prometheus_metrics_add_handler(metrics_mqtt, NULL);
#endif
  return true;
}
```

As mentioned above, if the `prometheus-metrics` library is not included in
the app's `mos.yml` manifest, no code will be compiled which makes the addition
_non intrusive_.

#### Application Specific Metrics

Users are able to add their app's own metrics in the same way as libraries can.
They do this by registering a handler function, which is called from
`prometheus-metrics`.

```
#include "mgos_prometheus_metrics.h"
uint32_t my_counter=0;

static void prometheus_metrics_fn(struct mg_connection *nc, void *user_data) {
  mgos_prometheus_metrics_printf(nc, COUNTER,
    "my_counter", "Total things counted",
    "%u", my_counter);
  (void) user_data;
}

enum mgos_app_init_result mgos_app_init(void) {
  mgos_prometheus_metrics_add_handler(prometheus_metrics_fn, NULL);
  return MGOS_APP_INIT_SUCCESS;
}
```

### POSTing to Pushgateway

Prometheus offers an intermediate receiver called a `Pushgateway`, see their
[codebase](https://github.com/prometheus/pushgateway) for details. Some users
may not wish to have their Mongoose IoT device listen on the network for HTTP
connections to the `/metrics` endpoint, for security reasons. As an
alternative, the library can be configured to close its serving endpoint, and
push its metrics upstream instead. In `mos.yml`:

```
config_schema:
  - ["prometheus.server_enable", false]
  - ["prometheus.pushgateway", "s", "example.com:9091"]
```

An example program using a timer to POST every 5 seconds:

```
#include "mgos.h"
#include "mgos_prometheus_metrics.h"

static void timer_cb(void *user_data) {
  mgos_prometheus_metrics_push("test1", "instance1");
  (void) user_data;
}

enum mgos_app_init_result mgos_app_init(void) {
  mgos_set_timer(5000, true, timer_cb, NULL);
  return MGOS_APP_INIT_SUCCESS;
}
```


# Disclaimer

This project is not an official Google project. It is not supported by Google
and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.


 ----- 
#### mgos_prometheus_metrics_printf

```c
void mgos_prometheus_metrics_printf(struct mg_connection *nc,
                                    enum mgos_prometheus_metrics_type_t type,
                                    const char *name, const char *descr,
                                    const char *fmt, ...);
```
>  Output a formatted metric tuple to the network connection. For example:
> ```c
> uint32_t my_counter=1234;
> mgos_prometheus_metrics_printf(nc, COUNTER, "number_of_requests", "My Description",
>                                "%u", my_counter);
> ```
> 
> will output:
> ```
> # TYPE number_of_requests counter
> # HELP number_of_requests My Description
> number_of_requests 1234
> ```
>  
#### (*mgos_prometheus_metrics_fn_t)

```c
typedef void (*mgos_prometheus_metrics_fn_t)(struct mg_connection *nc, void *user_data);
```
>  Prototype of a function which is to be called on each prometheus pull/push.
>  
#### mgos_prometheus_metrics_add_handler

```c
void mgos_prometheus_metrics_add_handler(mgos_prometheus_metrics_fn_t handler, void *user_data);
```
>  Registers a function handler, which will be called each time Prometheus
> scrapes our HTTP /metrics endpoint. Libraries and application code can
> register any number of handlers, which will be called one after another.
> Example:
> 
> ```c
> #include "mgos_prometheus_metrics.h"
> uint32_t my_counter=0;
> 
> static void prometheus_metrics_fn(struct mg_connection *nc, void *user_data) {
>   mgos_prometheus_metrics_printf(nc, COUNTER,
>     "my_counter", "Total things counted",
>     "%u", my_counter);
>   (void) user_data;
> }
> 
> enum mgos_app_init_result mgos_app_init(void) {
>   mgos_prometheus_metrics_add_handler(prometheus_metrics_fn, NULL);
>   return MGOS_APP_INIT_SUCCESS;
> }
> ```
>  
#### mgos_prometheus_metrics_push

```c
void mgos_prometheus_metrics_push(const char *job, const char *instance);
```
>  Perform an HTTP POST request against the Prometheus Pushgateway specified in
> the flag prometheus.pushgateway in mos.yml, using 'job' and 'instance'.
> The job argument is mandatory, but instance can be passed NULL.
>  
