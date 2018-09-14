# Device location (lat/lon)
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/location](https://github.com/mongoose-os-libs/location) | [mgos_location.h](https://github.com/mongoose-os-libs/location/tree/master/include/mgos_location.h) | &nbsp;  | &nbsp;         |



## Overview

Provides a function to get latitude and longtitude; so far it merely
returns the configured values. Example usage, in the app's `mos.yml`:

```yaml
libs:
  - origin: https://github.com/mongoose-os-libs/location

config_schema:
  - ["device.location.lat", 53.3242381]
  - ["device.location.lon", -6.385785]
```


 ----- 
#### mgos_location_get

```c
bool mgos_location_get(struct mgos_location_lat_lon *loc);
```

Fills provided `loc` with the device location data (currently device just
uses values from the config), see `struct mgos_location_lat_lon`. Returns
`true` on success, `false` otherwise.
 
