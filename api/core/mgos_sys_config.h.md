# Config
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_sys_config.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mgos_sys_config.h) | [mgos_sys_config.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mgos_sys_config.c)  | [api_config.js](http://github.com/mongoose-os-libs/mjs/tree/master/fs/api_config.js)         |


A lot of the Mongose OS functionality is driven by the device configuration.
For example, in order to make a device connected to the MQTT server,
there is no need to write a single line of code. It is enough to
modify `mqtt.*` configuration settings.

A configuration infrastructure is described in the user guide. Below is
the programmatic API for the device configuration.
 

 ----- 
#### save_cfg

```c
bool save_cfg(const struct mgos_config *cfg, char **msg);
```

Save config. Performs diff against defaults and only saves diffs.
Reboot is required to reload the config.
If return value is false, a message may be provided in *msg.
If non-NULL, it must be free()d.
It is safe to pass a NULL `msg`
 
#### load_config_defaults

```c
bool load_config_defaults(struct mgos_config *cfg);
```

Reset all config values to defaults.
 
#### mgos_config_reset

```c
void mgos_config_reset(int level);
```

Reset config down to and including |level|.
0 - defaults, 1-8 - vendor levels, 9 - user.
mgos_config_reset(MGOS_CONFIG_LEVEL_USER) will wipe user settings.
 
#### (*mgos_config_validator_fn)

```c
typedef bool (*mgos_config_validator_fn)(const struct mgos_config *cfg,
                                         char **msg);
void mgos_register_config_validator(mgos_config_validator_fn fn);
```

Register a config validator.
Validators will be invoked before saving config and if any of them
returns false, config will not be saved.
An error message may be *msg may be set to error message.
Note: if non-NULL, *msg will be freed. Remember to use strdup and asprintf.
 
#### mgos_expand_mac_address_placeholders

```c
void mgos_expand_mac_address_placeholders(char *str);
```
 Expands question marks in "str" with digits from the MAC address. 
#### mgos_config_apply

```c
bool mgos_config_apply(const char *sys_config_subset_json, bool save);
```
 Apply a subset of system configuration. Return true on success. 
#### mgos_config_apply_s

```c
bool mgos_config_apply_s(const struct mg_str, bool save);
```
 Same as mgos_config_apply but uses mg_str 
#### mgos_sys_config_parse_sub

```c
bool mgos_sys_config_parse_sub(const struct mg_str json, const char *section,
                               void *cfg);
```

Parse a subsection of sys config, e.g. just "spi".
cfg must point to the subsection's struct.
Example:
```
  struct mgos_config_spi cfg;
  const struct mg_str json_cfg = MG_MK_STR("{\"unit_no\": 1}");
  memset(&cfg, 0, sizeof(cfg));
  mgos_sys_config_parse_sub(json_cfg, "spi", cfg);
```
 

### JS API

 --- 
#### Cfg.get

```javascript
Cfg.get(path)
```
Get the config value by the configuration variable. Currently, only
simple types are returned: strings, ints, booleans, doubles. Objects
are not yet supported.

Examples:
```javascript
load('api_config.js');
Cfg.get('device.id');        // returns a string
Cfg.get('debug.level');      // returns an integer
Cfg.get('wifi.sta.enable');  // returns a boolean
```
#### Cfg.set

```javascript
Cfg.set(obj, opt_save)
```
Set the configuration. `obj` must be a subset of the whole configuation
tree. `save` is boolean flag that indicating whether the change should
be saved - it could be omitted, in which case it defaults to `true`.
Examples:
```javascript
load('api_config.js');
Cfg.set({wifi: {ap: {enable: false}}});  // Disable WiFi AP mode
Cfg.set({debug: {level: 3}});            // Set debug level to 3
```
