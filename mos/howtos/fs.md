# File system

Mongoose OS implements Virtual File System layer, VFS. That means it can
attach (mount) different storage types into a single file system tree.
For example, a device can have an SPI flash storage and an SD card storage.
For each storage type, a filesystem driver must be implemented. For example,
it is possible to write a driver that implements a Dropbox or Google Drive
storage type, and a device (e.g. ESP8266 module) can mount a Dropbox folder.

Mongoose OS provides a
[Filesystem RPC service](/libraries/remote_management/rpc-service-fs.html)
that allows remote filesystem management - for example,
you can edit files remotely.

## Adding file system

Let's see how to attach an additional filesystem to Mongoose OS in practice.

### ESP8266

On ESP8266, Mongoose OS uses approximately 3MB of flash and default file system is 256K.
Most modules (ESP-12F have 4MB), so the last 1MB or so is available. Let's create a 512KB SPIFFS file system in this free space.
Note: we cannot use 1MB because at the end of flash there is system params area 16K in size which is used by SDK and SPIFFS requres size to be a power of 2.

First, flash the default firmware and verify that you have at least 4M of SPI flash, watch for the boot message:

```
$ mos flash esp8266 && mos console
Fetching https://mongoose-os.com/downloads/esp8266.zip...
...
[Jul 28 13:51:11.662] esp_mgos_init2       default 1.0 (20170728-103845/???)
[Jul 28 13:51:11.668] esp_mgos_init2       Mongoose OS 2017072810 (20170728-103845/???)
[Jul 28 13:51:11.675] esp_mgos_init2       SDK 2.1.0(ce90efd); flash: 4M; RAM: 52184 total, 49140 free
...

```

`flash: 4M` means we're good to go. There are modules with even bigger flash chips - [WEMOS D1 mini Pro](https://wiki.wemos.cc/products:d1:d1_mini_pro) has 16MB, you can have extra 8MB filesystem there.

Now, create the file system:

```
$ mos call FS.Mkfs '{"dev_type": "sysflash", "fs_type": "SPIFFS", "fs_opts": "{\"addr\": 3145728, \"size\": 524288"}'
Using port /dev/ttyUSB0
null
```

`addr` is the offset from the beginning of the flash chip where to create the filesystem, 3145728 is just after the first 3M.

Mount the newly-created filesystem:

```
$ mos call FS.Mount '{"dev_type": "sysflash", "fs_type": "SPIFFS", "fs_opts": "{\"addr\": 3145728, \"size\": 524288}", "path": "/mnt"}'
Using port /dev/ttyUSB0
null
```

List files on the new FS - it will be empty:

```
$ mos ls -l /mnt
Using port /dev/ttyUSB0
```

Let's put a file there

```
$ mos ls -l /mnt
Using port /dev/ttyUSB0
README.md 991
```

To make the device attach the file system automatically at boot, let's configure the `sys.mount` section:

```
$ mos config-set sys.mount.path=/mnt sys.mount.dev_type=sysflash sys.mount.fs_type=SPIFFS 'sys.mount.fs_opts={"addr": 3145728, "size": 524288}' && mos console
Using port /dev/ttyUSB0
Getting configuration...
Setting new configuration...
Saving and rebooting...
Using port /dev/ttyUSB0
...
[Jul 28 14:02:32.787] esp_mgos_init2       default 1.0 (20170728-103845/???)
[Jul 28 14:02:32.793] esp_mgos_init2       Mongoose OS 2017072810 (20170728-103845/???)
[Jul 28 14:02:32.801] esp_mgos_init2       SDK 2.1.0(ce90efd); flash: 4M; RAM: 52184 total, 49140 free
[Jul 28 14:02:32.805] esp_print_reset_info Reset cause: 4 (soft reset)
[Jul 28 14:02:32.810] mgos_vfs_dev_open    sysflash () -> 0x3fff0034
[Jul 28 14:02:32.820] mgos_vfs_mount       Mount SPIFFS @ / (dev 0x3fff0034, opts {"addr": 32768, "size": 262144}) -> 0x3fff0044
[Jul 28 14:02:32.883] mgos_vfs_mount       /: size 233681, used: 99647, free: 134034
[Jul 28 14:02:32.970] mgos_sys_config_init MAC: 1AFE34A5930F
[Jul 28 14:02:32.975] mgos_sys_config_init WDT: 30 seconds
[Jul 28 14:02:32.979] mgos_vfs_dev_open    sysflash () -> 0x3fff087c
[Jul 28 14:02:32.989] mgos_vfs_mount       Mount SPIFFS @ /mnt (dev 0x3fff087c, opts {"addr": 3145728, "size": 524288}) -> 0x3fff088c
[Jul 28 14:02:33.120] mgos_vfs_mount       /mnt: size 474641, used: 1255, free: 473386
[Jul 28 14:02:33.125] mgos_mdns_init       Listening on udp://:5353
...
```

We can make built-in HTTP server serve from `/mnt` instead of `/`:

```
$ mos config-set http.document_root=/mnt
```

### ESP32

Typical ESP32 modules have 4M flash. Code size is bigger, there is approximately 400K available after all the system stuff. Let's add a 256K file system.

ESP32 uses [partition tables](http://esp-idf.readthedocs.io/en/latest/api-guides/partition-tables.html) for allocating flash space, we will need to add a partition and recompile firmware.
Check out or download the [default app](https://github.com/mongoose-os-apps/default), edit the [mos.yml](https://github.com/mongoose-os-apps/default/blob/master/mos.yml) file and edit the esp32-specific section:

```yaml
  - when: mos.platform == "esp32"
    apply:
      build_vars:                                           # Add these
        ESP_IDF_EXTRA_PARTITION: fs_ext,data,spiffs,,256K   # two lines
```

Build and flash the firmware:

```
$ mos build --verbose --arch esp32 --clean && mos flash && mos console
...
Connecting to https://mongoose.cloud, user test
Uploading sources (2878 bytes)
...
Success, built default/esp32 version 1.0 (20170728-131414/???).
Firmware saved to build/fw.zip
...
[Jul 28 14:14:44.990] I (99) boot: Partition Table:
[Jul 28 14:14:44.990] I (110) boot: ## Label            Usage          Type ST Offset   Length   Flags
[Jul 28 14:14:44.990] I (135) boot:  0 nvs              WiFi data        01 02 00009000 00004000 00000000
[Jul 28 14:14:45.012] I (161) boot:  1 otadata          OTA data         01 00 0000d000 00002000 00000000
[Jul 28 14:14:45.012] I (186) boot:  2 app_0            OTA app          00 10 00010000 00180000 00000000
[Jul 28 14:14:45.013] I (212) boot:  3 fs_0             SPIFFS           01 82 00190000 00040000 00000000
[Jul 28 14:14:45.034] I (238) boot:  4 app_1            OTA app          00 11 001d0000 00180000 00000000
[Jul 28 14:14:45.035] I (263) boot:  5 fs_1             SPIFFS           01 82 00350000 00040000 00000000
[Jul 28 14:14:45.052] I (289) boot:  6 fs_ext           SPIFFS           01 82 00390000 00040000 00000000
[Jul 28 14:14:45.053] I (315) boot: End of partition table
...
```

Note presence of the extra `fs_ext` partition at the end.
Create the file system:

```bash
$ mos call FS.Mkfs '{"dev_type": "esp32part", "dev_opts": "{\"label\": \"fs_ext\"}", "fs_type": "SPIFFS"}'
Using port /dev/ttyUSB0
null
```

There is no need to specify size and offset, they are taken from partition information.
Mount the file system:

```bash
$ mos call FS.Mount '{"dev_type": "esp32part", "dev_opts": "{\"label\": \"fs_ext\"}", "fs_type": "SPIFFS", "path": "/mnt"}'
Using port /dev/ttyUSB0
null
```

To make the device attach the file system automatically at boot, let's configure the `sys.mount` section:

```bash
$ mos config-set sys.mount.path=/mnt sys.mount.dev_type=esp32part sys.mount.fs_type=SPIFFS 'sys.mount.dev_opts={"label": "fs_ext"}'
```

### CC3200

There is no space availabe on the CC3200 chip fo extra file system, but extern SPI flash can be attached - see below.

## External SPI flash

Mongoose OS has an [external SPI flash driver](https://github.com/mongoose-os-libs/vfs-dev-spi-flash/), which can be used to attach.
Having attached an SPI flash chip, you will be able to use the `spi_flash` driver like so:

```
$ mos call FS.Mkfs '{"dev_type": "spi_flash", "dev_opts": "{\"freq\": 20000000, \"cs\": 0}", "fs_type": "SPIFFS", "fs_opts": "{\"size\": 1048576}"}'
```
