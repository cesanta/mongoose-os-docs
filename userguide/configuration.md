# Configuration infrastructure

Mongoose OS uses a structured, multi-layer configuration.
It consists of two parts: a compile time part that defines configuration,
and a run time part that uses configuration.

### Compile-time generation

- Any piece of code that requires config setting, can define a .yaml file
that describes configuration parameters for that piece of code
- User code could define it's own set of configuration parameters in
it's own .yaml file
- All these yaml files are merged together during firmware compilation,
and a single `sys_config_defaults.json` file is generated
- User-defined YAML file is applied last, therefore it can override any
default settings specified in the system .yaml files
- Generated `sys_config_defaults.json` file represents all possible
  configurable settings for the firmware
- A C header and source files are also generated. C header contains a structure
that mirrors `sys_config_defaults.json` file, and an API for getting and setting
individual configuration values

![](images/config1.png)

### Run-time init

- `conf0.json` - configuration defaults. This is a copy of the generated
  `sys_config_defaults.json`. It is loaded first and must exist on the file system.
  All other layers are optional.
- `conf1.json` - `conf8.json` - these layers are loaded one after another, each
  successive layer can override the previous one (provided `conf_acl` of the previous
  layer allows it). These layers can be used for vendor configuration  overrides.
- `conf9.json` is the user configuration file. Applied last, on top of all other layers.
  `mos config-set` and `save_cfg()` API function modify `conf9.json`.

![](images/config2.png)

Therefore here are the rules of thumb:

- If you need to define your own config parameters, add a `config_schema`
  section in the `mos.yml` file, as described in the
  [quick start guide](/docs/quickstart/prog2.md#create-custom-cofiguration-section)
- If you want to override some system default setting, for example
  a default UART speed, also use `config_schema` and add overrides there,
  see [example](https://github.com/mongoose-os-apps/default/blob/c4e2acbb5fec8d151b0d74fa12f9f1791f08edeb/mos.yml#L23-L25) 
- If you want to put some unique information on each firmware, for example
  a unique ID, and optionally protect it from further modification, use any of the layers 1 through 8, e.g. `conf5.json`.
- `conf9.json` should never be included in the firmware, or it will override user's settings during OTA.
  

So, firmware configuration is defined by a set of YAML description files, which
get translated into an opaque C structure `mgos_sys_config` and public
accessors during firmware build: getters like `mgos_sys_config_get_....()` and
setters like `mgos_sys_config_set_....(value)`. C code can access configuration
parameters by invoking those accessors. Fields can be integer, boolean or
string. C functions to retrieve and save that global configuration object are
generated.

Example on how to access configuration parameters:

```c
  printf("My device ID is: %d\n", mgos_sys_config_get_device_id());  // Get config param
```

Example on how to set configuration parameter and save the configuration:
```c
  mgos_sys_config_set_debug_level(2); // Set numeric value
  mgos_sys_config_set_device_password("big secret"); // Set string value
  char *err = NULL;
  save_cfg(&mgos_sys_config, &err); /* Writes conf9.json */
  printf("Saving configuration: %s\n", err ? err : "no error");
  free(err);
```

The generation mechanism not only gives a handy C API, but also guarantees
that if the C code accesses some parameter, it is indeed in the description
file and thus is meant to be in the firmware. That protects from the common
problems when the configuration is refactored/changed, but C code left intact.

Mongoose OS configuration is extensible, i.e. it is possible to add your own
configuration parameters, which might be either simple, or complex (nested).

At run time, a configuration is backed by several files on a filesystem.
It has multiple layers: defaults (0), vendor overrides (1-8), and user settings (9).
Vendor layers can "lock" certain parts of
configuration for the user layer, and allow only certain fields to be changed.
For example, end-user might change the WiFi settings, but cannot change the
address of the cloud backend.

## Compile time generation deep dive

Configuration is defined by several YAML files in the Mongoose OS source
repository. Each Mongoose OS module, for example, crypto chip support module,
can define it's own section in the configuration. Here are few examples:

- [mgos_sys_config.yaml](https://github.com/cesanta/mongoose-os/blob/master/fw/src/mgos_sys_config.yaml) is core module, defines debug settings, etc
- [mgos_atca_config.yaml](https://github.com/cesanta/mongoose-os/blob/master/fw/src/mgos_atca_config.yaml) is a crypto chip support module
- [mgos_mqtt_config.yaml](https://github.com/cesanta/mongoose-os/blob/master/fw/src/mgos_mqtt_config.yaml) has default MQTT server settings

There are more, you can see them all at
[fw/src](https://github.com/cesanta/mongoose-os/tree/master/fw/src) directory.

As has been mentioned in the overview, you can define your own sections in
the config, or override existing default values. This is done by placing a
config schema descriptor into `mos.yml`, like this:

```yaml
config_schema:
  - ["hello", "o", {"title": "Hello app settings"}]
  - ["hello.who", "s", "world", {"title": "Who to say hello to"}]
```

The snippet above is from [fw/examples/c_hello](https://github.com/cesanta/mongoose-os/tree/master/fw/examples/c_hello/mos.yml)
example.

When the firmware is built, all these YAML files get merged into one.
User-specified YAML file goes last, therefore it can override any other.
Then, merged YAML file gets translated into two C files, `mgos_config.h` and
and `mgos_config.c`. You can find these generated files in the
`YOUR_FIRMWARE_DIR/build/gen/` directory after you build your firmware.

Here's a translation example, taken from
[fw/examples/c_hello](https://github.com/cesanta/mongoose-os/tree/master/fw/examples/c_hello).
There, we have a custom `src/conf_schema.yaml`:

```yaml
[
  ["hello", "o", {"title": "Hello app settings"}],
  ["hello.who", "s", "world", {"title": "Who to say hello to"}]
]
```

It gets translated into the following getter and setter:

```c
const char *mgos_sys_config_get_hello_who(void);
void        mgos_sys_config_set_hello_who(const char *val);
```

Then, C firmware code in [src/main.c](https://github.com/cesanta/mongoose-os/tree/master/fw/examples/c_hello/src/main.c) accesses that custom configuration value:

```c
  printf("Hello, %s!\n", mgos_sys_config_get_hello_who());
```

Numbers are represented by integers, as are booleans.
Strings will be allocated on the heap.

**IMPORTANT NOTE**: Empty strings will be represented as `NULL` pointers,
be careful.

Currently, all substructs are actually public and can be retrieved with their
own getter; thus the header contains the struct definition and the getter:

```c
struct mgos_config_hello {
  char *who;
};

const struct mgos_config_hello *mgos_sys_config_get_hello(void);
```

It's useful to have universal functions which take the whole struct as a
parameter. In the future though there will be an option to make some particular
struct public, and by default all structs will be private.

## Run time - factory, vendor, user layers

Device configuration is stored on the filesystem in several files:

- `conf0.json` - factory defaults layer
- `conf1.json` to `conf8.json` - vendor layers
- `conf9.json` - user layer

When Mongoose OS boots, it reads those files in exactly that order,
merges into one, and initializes in-memory C configuration structure
reflects that on-flash configuration. So, at boot time,
`struct mgos_config` is intialised in the following order:

- First, the struct is zeroed.
- Second, defaults from `conf0.json` are applied.
- Third, _vendor configuration layers_ 1 through 8 are loaded one after another.
- The _user configuration file_, `conf9.json`, is applied on as the last step.

The result is the state of the global `struct mgos_config`.
Each step (layer) can override some, all or none of the values.
Defaults must be loaded and it is an error if the file does not exist
at the time of boot. But, vendor and user layers are optional.

Note that a vendor configuration layer is not present by default.
It is to facilitate post-production configuration: devices can be
customised by uploading a single file (e.g. via HTTP POST to `/upload`)
instead of performing a full reflash.
Vendor configuration is not reset by the "factory reset", whether via GPIO or web.


## Field access control

Some settings in the configuration may be sensitive and the vendor may,
while providing a way for user to change settings, restrict certain fields
or (better) specify which fields can be changed by the user.

To facilitate that, the configuration system contains field access control,
configured by the **field access control list** (ACL).

- ACL is a comma-delimited list of entries which are applied to full field
  names when loading config files at boot time.
- ACL entries are matched in order and, search terminates when a match is found.
- ACL entry is a pattern, where `*` serves as a wildcard.
- ACL entry can start with `+` or `-`, specifying whether to allow or
  deny change to the field if the entry matches. `+` is implied but can
  be used for clarity.
- The default value of the ACL is `*`, meaning changing any field is allowed.

ACL is contained in the configuration itself - it's the top-level `conf_acl`
field. The slight twist is that during loading, the setting of the
_previous_ layer is in effect: when loading user settings,
`conf_acl` from vendor settings is consulted,
and for vendor settings the `conf_acl` value from the defaults is used.

For example, to restrict users to only being able change WiFi and debug level
settings, `"conf_acl": "wifi.*,debug.level"` should be set in `conf{1-8}.json`.

Negative entries allow for default-allow behaviour:
`"conf_acl": "-debug.*,*"` allows changing all fields except anything under `debug`.


## Resetting to factory defaults

If configured by `debug.factory_reset_gpio`, holding the specified pin
low during boot will wipe out user settings (`conf9.json`).
Note, vendor settings, if present, are not reset.
