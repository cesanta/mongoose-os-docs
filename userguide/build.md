# Apps and libraries

A Mongoose OS **app** is a firmware that does something specific. It could be
built and flashed on a microcontroller. For example, a
[blynk app](https://github.com/mongoose-os-apps/blynk) is a firmware that
makes a device controllable by the [Blynk mobile app](https://blynk.cc).

Another example is a [default app](https://github.com/mongoose-os-apps/default)
that gets flashed when you press a "Flash" button on a Web UI "device control"
dialog, or type `mos flash <arch>` on a terminal. That default app
blinks an LED periodically, can talk to an MQTT server, and allows user
to extend the logic by editing JavaScript code directly on a device filesystem.

An app can use any number of libs. A **lib** is a reusable library. It
cannot be built directly into a working firmware, because it only provides
an API but does not actually use that API. An app can include a lib by
listing it in the `libs:` section of the
[mos.yml](https://github.com/mongoose-os-apps/empty/blob/master/mos.yml) file.
`mos build` command generates code that calls library initialisation
functions. Libraries are initialised in the order of their reference.

## Local and remote builds

By default, a `mos build` command that builds an app's firmware, is using so-called
remote build - it packs apps's sources and sends them over to the Mongoose OS
build machine. This is the default behavior, cause it does not require a [Docker](http://docker.com/)
installation on the workstation.

However, if a Docker is installed, then it is possible to build locally.
This is done by adding an extra `--local` flag (see below). In this case,
everything is done on the local machine. This is a preferrable option for the
automated builds, and for those who do not want their sources leaving their
workstations. Summary:

| Build type | Build command |
| ---------- | ------------- |
| Remote (default)    | <pre>mos build --platform PLATFORM</pre> |
| Local  (requires Docker)   | <pre>mos build --platform PLATFORM --local --verbose</pre> |

## How to create a new app using Web UI

An app sources is a directory with a `mos.yml` file which describes how
to build an app. Click on
[mos.yml](https://github.com/mongoose-os-apps/empty/blob/master/mos.yml) to
see a well-documented `mos.yml` of the `empty` app, which is used as a
app template, or see a detailed description below.

To build an app, use Web UI to either import an existing app from the
[existing apps collection](https://github.com/mongoose-os-apps), or to create
a new app from scratch (a new app is really a clone of an
[empty app](https://github.com/mongoose-os-apps/empty). Then click on
a build button, and once you see a successful build log message, click on
the flash button:

![](images/app1.gif)

## How to create a new app using command line

If you like working with terminal, or if you want to integrate
app build process into your favorite IDE, you can use `mos` in console mode:

```bash
# Clone an `empty` template app into a new directory `my-app`
git clone https://github.com/mongoose-os-apps/empty my-app
cd my-app
mos build
mos flash
mos console
```

## mos.yml file format reference

`mos.yml` file drives the way Mongoose apps are biult. Below is a description
of the sections (keys) in this file. Libraries also have `mos.yml` files, the
only difference with apps is that they have `type: lib` key and they cannot
be built into a firmware. So the following applies to both apps and libraries.

### author

A string, `FirstName SecondName <Email>` of the author, example:
```yaml
author: Joe Bloggs <joe@bloggs.net>
```

### build_vars

List of Makefile variables that are passed to the architecture-specific
Makefile when an app is getting built. See next section for a build process
deep-dive. An example of arch-specific Makefile is:
[fw/platforms/esp32/Makefile.build](https://github.com/cesanta/mongoose-os/blob/master/fw/platforms/esp32/Makefile.build).
The others are in the respective directories: `fw/platforms/*/Makefile.build`.

The example below changes ESP32 SDK configuration by disabling brownout detection:

```yaml
build_vars:
  ESP_IDF_SDKCONFIG_OPTS: "${build_vars.ESP_IDF_SDKCONFIG_OPTS} CONFIG_BROWNOUT_DET="
```

Another example is the [dns-sd library](https://github.com/mongoose-os-libs/dns-sd/blob/master/mos.yml) that enables DNS-SD:
```yaml
build_vars:
  MGOS_ENABLE_MDNS: 1
```

### binary_libs

A list of `.a` libs or directories with those. Do not put trailing slashes to
directory names:
```yaml
binary_libs:
  - mylib/mylib.a
```

### cdefs

Additional preprocessor flags to pass to the compiler, example:
```yaml
cdefs:
  FOO: BAR
```

That gets converted into the `-DFOO=BAR` compilation option, for both C and C++
sources.

### cflags, cxxflags

Modify compilation flags for C (`cflags`) and C++ (`cxxflags`). For example, by
default warnings are treated as errors. This setting ignores warnings when
compiling C code:

```yaml
cflags:
  - "-Wno-error"
```

If what you're after is defining preprocessor variables, `cdefs` makes it
easier. This snippet:

```yaml
cdefs:
  FOO: BAR
```

Is the same as:

```yaml
cflags:
  - "-DFOO=BAR"
cxxflags:
  - "-DFOO=BAR"
```

### config_schema

This can define a new configuration section for the device, and also override
a previosly defined configuration entries defined elsewhere. For example, the
following snippet defines a new section `foo` and overrides a default
value of `mqtt.server` set by the `mqtt` library:
```yaml
config_schema:
  - ["foo", "o", {title: "my app settings"}]
  - ["foo.enable", "b", true, {title: "Enable foo"}]
  - ["mqtt.server", "1.2.3.4:1883"]
```


### description

A string, one-line short description, example:
```yaml
description: Send BME280 temperature sensor readings via MQTT
```


### filesystem

A list of files or directories with files to be copied to the device's
filesystem, example:
```yaml
filesystem:
  - fs
  - other_dir_with_files
  - foo/somepage.html
```

### includes

A list of directories with C/C++ include files. Do not put trailing slash
to the directory name. Example:
```yaml
includes:
  - my_stuff/include
```

### libs

Library dependencies. Each library should have an `origin` and optionally can
have `name` and `version`. `origin` is a GitHub URL, like
`https://github.com/mongoose-os-libs/aws` (note: it must be a repo with
`mos.yml` in the repo root!).

Name is used to generate the code which calls
library initialization function: e.g. if the lib name is `mylib`, it should have
the function `bool mgos_mylib_init(void)`. Also, for local builds, name is used
as a directory name under `deps`: that's where `mos` clones libraries.

`version` is a git tag name, or branch name, or SHA of the library's
repository. If omitted, it defaults to the `libs_version` in `mos.yml`, which,
in turn, defaults to the mos tool version. So e.g. if the mos tool version is
1.21, then by default it will try to use libs with the tag `1.21`. Latest mos
will use the `master` branch.

Example:
```yaml
libs:
    # Use aws lib on the default version
  - origin: https://github.com/mongoose-os-libs/aws

    # Use aws lib on the version 1.20
  - origin: https://github.com/mongoose-os-libs/aws
    version: 1.20

    # Use the lib "mylib" located at https://github.com/bob/mylib-test1
  - origin: https://github.com/bob/mylib-test1
    name: mylib
```


### sources

A list of C/C++ source files or directories with those. Do not put trailing
slashes to directory names:
```yaml
sources:
  - src
  - foo/bar.c
```


### tags

A list of free-form string tags, used for Web UI search.
Some tags are predefined, they place the app or library in a certain category.
Those predefined tags are: `cloud` (cloud integrations),
`hardware` (hardware peripherals or API),
`remote_management` (remote management), `core` (core functionality). Example:
```yaml
tags:
  - cloud
  - JavaScript
  - AWS
```

## Build process deep dive

When `mos build [FLAGS]` command is executed in the app directory,
the following happens:

- `mos` scans `libs:` section of the `mos.yml` file and imports all
  libraries into the libs directory (`~/.mos/libs`, could be overridden
  by `--libs-dir ANOTHER_DIR` flag)

- Each library also has `mos.yml` file, and a library could have a `libs:`
  section as well - this way the library can depend on other library. `mos`
  imports all dependent libraries too, recursively.

- When all required libraries are imported, `mos` executes `git pull` in each
  of them, in order to update. That could be switched off by `--no-libs-update`
  flag.

- At this point, all required libraries are imported and updated.

- `mos` combines app's `mos.yml` file together with the `mos.yml` files of
  all dependent libraries, merging them into one file. The order of merging
  is this: if `my-app` depends on library `lib1`, and library `lib1` depends
  on library `lib2`, then
  `result_yml = lib2/mos.yml + lib1/mos.yml + my-app/mos.yml`. Meaning, the
  application's `mos.yml` has the highest priority.

- If `--local --verbose --repo PATH/TO/MONGOOSE_OS_REPO` flag is specified,
  then `mos` starts a local build by invoking `docker.cesanta.com/ARCH-build`
  docker image. That image encapsulates a native SDK for the given architecture
  together with Mongoose OS sources, https://github.com/cesanta/mongoose-os.
  `mos` tool invokes `make -f fw/platforms/ARCH/Makefile.build` for the given
  platform. The result of this docker invocation is a `build/` directory with
  build artifacts and `build/fw.zip` firmware zip file which could be flashed
  to the device with `mos flash` command.

- If `--local` flag is not specified, packs source and filesystem
  files and sends them to the Mongoose OS cloud build backend at
  http://mongoose.cloud, which performs an actual build as described in the
  previous step, and sends back a `build/` directory with built `build/fw.zip`
  and artifacts.
- Generated artifacts in the `build/` directory is as follows:

```bash
build/fw.zip  - a built firmware
build/fs      - a filesystem directory that is put in the firmware
build/gen     - a generated header and source files
```

## How to create a new library

- The best way to develop a new library is as part of an app development.
  In your app, do a local build, which creates a `deps/` directory. That is
  the directory where you should place your new library.
- Clone an `empty` library, which is a skeleton for the new library,
  into the `deps/mylib` directory (change `mylib` to whatever name you want):
  `git clone https://github.com/mongoose-os-libs/empty deps/mylib`
- Create `include/mgos_mylib.h` and `src/mgos_mylib.c` files in your library:

  #### mgos_mylib.c:

```c
#include "mgos_mylib.h"

// NOTE: library init function must be called mgos_LIBNAME_init()
bool mgos_mylib_init(void) {
  return true;
}
```

  #### mgos_mylib.h:

```c
#include "mgos.h"
```

- You can add your library-specific API to `mgos_mylib.h` and implementation
  in `mgos_mylib.c`.
- In your app's `mos.yml` file, add a reference to the new library:
```yaml
libs:
  - name: mylib
```

- Click on build button to build an app, and flash button to flash it
- Edit library source files `mylib/src`, build `myapp` until a test app
  works as intented.

## How to port an Arduino library

- Follow the steps outlined in the previous section.
- Copy Arduino library sources into the `mylib/src` directory,
  and .h files into the `include/` directory
- Add C wrappers for the C++ API. Make it so that wrappers are FFI-able
  into JS : use simple types in the API, max 6 32-bit params,
  2 64-bit params. See https://github.com/cesanta/mjs#cc-interoperability
- If you plan to add JavaScript support too, create `mjs/api_mylib.js` file
  with the FFI JS wrappers.
- Build / test `myapp` until it works.
- See example libraries at
  https://mongoose-os.com/docs/reference/api.html#hardware

## Contributing an app or library

If you would like to share your project with a community and publish
it under the [Apache 2.0 license](https://en.wikipedia.org/wiki/Apache_License),
please follow these steps:

- Build your app as described in the previous section, flash and test it.
- Modify `mos.yml`, set `author` field as `Your Name <your@email.address>`.
- Make sure you have a descriptive `README.md` file.
- If this is a library:
    - Create `mjs_fs/api_<name>.js` file if your library has JavaScript API.
    - If it is a port of an Arduino library, make sure you include `arduino-compat` library in `mos.yml` file, see [arduino-adafruit-ssd1306 lib](https://github.com/mongoose-os-libs/arduino-adafruit-ssd1306/blob/master/mos.yml) for an example
    - See https://github.com/mongoose-os-libs/blynk for the reference
    - Consider contributing an example app that uses your library
- [Start a new discussion on forum](https://forum.mongoose-os.com/post/discussion/mongoose-iot) with a subject `New contribution: ...`,
	show a link to your code on GitHub / Bitbucket / whatever, or
	attach a zip file with the app sources.
