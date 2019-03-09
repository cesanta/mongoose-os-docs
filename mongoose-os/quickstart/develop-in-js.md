# Advanced Guide - JS

In this section we are going to implement the same functionality as in the
previous section, but using JavaScript instead of C/C++. Also, we learn
how to export custom C/C++ functions into JavaScript.

Please refer to the previous section on how to connect the DHT sensor.

## Clone template project

To clone the template project, repeat the same steps as in the previous
section:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-5"><code>git clone https://github.com/mongoose-os-apps/empty my-app
Cloning into 'my-app'...
remote: Counting objects: 68, done.
remote: Total 68 (delta 0), reused 0 (delta 0), pack-reused 68
Unpacking objects: 100% (68/68), done.
cd my-app</code></pre>

## Add necessary libraries

In the previous step, we added DHT library. Do that, and also add mJS library
to enable JavaScript support. Open `mos.yml` file in your
favorite editor and add support for DHT sensor and JavaScript:

```yaml
libs:
  - origin: https://github.com/mongoose-os-libs/rpc-service-config
  - origin: https://github.com/mongoose-os-libs/rpc-service-fs
  - origin: https://github.com/mongoose-os-libs/rpc-uart
  - origin: https://github.com/mongoose-os-libs/wifi
  - origin: https://github.com/mongoose-os-libs/dht  # <-- Add this line!
  - origin: https://github.com/mongoose-os-libs/mjs  # <-- Add this line!
```

## Create custom configuration section

Same as in the previous section, add custom `app.pin` config setting by
editing `mos.yml`:

```yaml
config_schema:
 - ["app", "o", {title: "My app custom settings"}]
 - ["app.pin", "i", 5, {title: "GPIO pin a sensor is attached to"}]
```

## Write device logic

Create `fs/init.js` file with the following content
(see [MG-RPC JS API reference](../api/rpc/rpc-common.md#rpc-addhandler)):

```javascript
load('api_config.js');
load('api_rpc.js');
load('api_dht.js');
load('api_timer.js');

let pin = Cfg.get('app.pin');
let dht = DHT.create(pin, DHT.DHT22);

Timer.set(1000, true, function() {
  print('Temperature:', dht.getTemp());
}, null);

RPC.addHandler('Temp.Read', function(args) {
  return { value: dht.getTemp() };
});
```

Tip: keep variable and function declaration names under 5 characters or less
to minimise JavaScript memory usage.
mJS uses `double` type to hold values. Valid double hold numbers, and NaN values
hold other types. 2 bytes out of 8 are used for type indication, and the rest
6 bytes are used for payload which depends on type.
Short strings that are 5 chars or less + terminating `\0`
are stored directly in the NaN payload.
Longer strings are stored in a special buffer, and NaN payload stores a pointer
to that buffer. Therefore, strings of length 5 and less take no extra memory
in mJS.

## Build and test the final app

Build and flash the app:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos build --arch esp8266 && mos flash</code></pre>

And now, call the device's RPC service:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos call Temp.Read
{"value": 18.6}</code></pre>

## Export custom function

[mJS JavaScript engine](https://github.com/cesanta/mjs), which is used by
Mongoose OS, allows to export C/C++ functions directly into JavaScript
via the FFI (foreign function interface) mechanism. Let's show how it is
done.

Edit `src/main.c` file and add `my_func()` function there:

```c
int my_func(int a, int b) {
  return a + b;
}
```

Note: if you want to export a C++ function, make sure it is declared
as `extern "C"`. Add the following snippet in `fs/init.js`:

```javascript
  let f = ffi('int my_func(int, int)');
  print('Calling C my_func:', f(1,2));
```

Rebuild, flash, test the app:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos build --arch esp8266 && mos flash && mos console
[Aug  9 09:02:05.399] mgos_init            Init done, RAM: 52680 total, 44404 free, 44288 min free
[Aug  9 09:02:05.753] Calling C my_func: 3</code></pre>

## How FFI calls are implemented

This is how it is done:

- During the build phase, Mongoose OS toolchain scans all JavaScript files
  present in the project.
- All `ffi(...)` JavaScript calls are collected in one list, and
  `build/gen/ffi_exports.c` file is generated with the signatures of C
  functions that JavaScript code intends to call.
- A `mgos_dlsym()` function is auto-generated that returns the address
  of the C function by its name, which makes `ffi()` call possible.

The `mos build` command has created `build` directory. Open
`build/gen/ffi_exports.c` file and notice a line with `my_func`:

```c
const struct mgos_ffi_export ffi_exports[] = {
...
  {"my_func", my_func},
...
```

To summarise, this section demonstrates how to use JavaScript API, libraries,
and how to export custom C functions.
