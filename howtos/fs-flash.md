# HowTo: Create an image file of an populated filesystem

When developing with **Mongoose OS** and IoT devices to flash, it is often necessary to provide data that takes up more space than the average file system can provide. There exists a nice [HowTo](https://mongoose-os.com/docs/howtos/fs.md) that explains how to add an additional filesystem to a device running **Mongoose-OS** - but the problem is: it's a lot of manual effort and it's a bit complicated. To make matters worse, the file system must also be "filled" manually for each individual device. So if you plan to flash many devices, you need to find a way to create a firmware package that already contains the file system. This will then be transferred to the device in one go - there is no need to intervene manually - everything is included in one firmware.

This HowTo describes how to achieve this goal. This requires some preparatory work and a few steps, but the result is worthwhile. And it doesn't matter if it's an additional 256kB file system or one with 16MB - in both cases you can cover it with a single firmware package and save a lot of trouble.

### Necessary Preparations

The first step is to go the usual way - set up your device the way you want it, create the additional file system and store the desired files in it. There are two ways to do this:

- on the one hand the **conventional way** to create such a file system as described in [this manual](https://mongoose-os.com/docs/howtos/fs.md), or
- on the other hand the **use of the [library "fstab"](https://github.com/mongoose-os-libs/fstab)**, which does the work of creating and mounting the file system for you.

It is sufficient to use the first way, because you only have to set up and mount the file system once. All in all, the effort is even a little less than with the external library, so here we describe the first way. A tutorial on how to use the "fstab" library may be created elsewhere, then you can decide yourself which way you want to go.

### Creating and Populating an Additonal Filesystem

This part is not very tiring: proceed as described under ["Adding File System"](https://mongoose-os.com/docs/howtos/fs.md), set up the filesystem and mount it under the desired name, e.g. _**"/mnt"**_ (this is our example) or another name as you like. The spelling of the filesystem reminds of a directory and is also used in the path syntax, but it is ultimately a mounting point for the files, the filesystem below is flat.

Once your device is newly flashed and the file system is active, you can test it with e.g.

```bash
mos[.exe] --port <portname> ls /mnt
```
If it is not available, an **error message** is displayed, if it is active, nothing is shown because it is empty - but without an error message. Very simple.

Now you have to copy the desired files into the directory - there are a few points to consider. Files will be transferred to the device with the command

```bash
mos[.exe] --port <portname> put <local relative path>/<filename> <file system of the device>/<filename>
```
Unfortunately ```mos[.exe]``` may not transfer a whole bunch of files from a folder - every file has to be copied one after another with the full command line. So if you have to transfer a lot of files, it might be helpful to write this command down to a *shell script* or *batch file*, so you may edit and adapt the commands to your need and then execute them via the *shell script/batch file* - this will be much faster than doing it by hand.

__*Be aware: the command to put a file to an additional file system needs the complete target filename including the mountpoint. This is mandatory If you only use the mount point - so to sepak as a target folder - no error will be shown, but the data will be copied into a file with an empty filename. This is kind of a bug, but you may avoid it.*__

So if you have finished this step succesfully, you may examine your files system again with this command:

```bash
mos[.exe] --port <portname> ls -l /mnt
```
and you should see something like this (of course with different port and file names, but the example is clear):

```bash
macuser@Mac-Pro:~$ mos --port /dev/cu.SLABS_USB-to-UART ls -l /mnt
Bulb-green.dif 3024
Bulb-off.dif 3024
Bulb-red.dif 3024
Bulb-yellow.dif 3024
Switch-off.dif 11108
Switch-on.dif 11108
Titles-Ident.dif 6046
Titles.dif 18188
config.min.css.gz 1488
config.min.js.gz 1819
index.html 4962
logo.svg.gz 1142
mainswitch-status.json 19
tz-archive.zip 5220
workplaces.min.json 417
zepto.min.js.gz 10295
macuser@Mac-Pro:~$ 

```
The parameter **-l** tells ```mos[.exe] ls```to list the file sizes too - it's a helpful information. With this process you have now created the "original file system", which is now used as the basis for the image file. For this reason you should be aware that all files are available in the desired version and form (e.g. gzipped).

### Getting the Image

Now it's time to transfer the filesystem in the device to the local images file. So there has to be some information gathering first. When you boot your device and you have the serial monitor aka console active with this command:

```bash
mos[.exe] --port <portname> console
```
then you should see something like this scrolling in the terminals window:

![Boot phase console log](https://github.com/mamuesp/mongoose-os-docs/blob/master/howtos/images/start-small.svg)

The **red marked** entries are describing the filesystem you want to create an image from:

- *"Name/Label"* is the name or albel of the existing filesystem, often also called "fs_ext"
- *"Offset (HEX)"* is the start address of the file systems data
- *"Size (HEX)"* is the size or length of the whole file system (even if it is empty)

With these parameters you may create the command to get the data to your local hard drive. For this you need the Python tool **"esptool.py"** from *espressif*. Since this tool is also used by ```mos[.exe]```, you will also have it on your system, but you can as well download it [from here](https://github.com/espressif/esptool). You'll find some documentation how to use the Python script too at this linked place. That Pathon must be installed is obvious, of course - this will not be further explained here.

```bash
esptool.py -p <portname> -b 1500000 read_flash 0x390000 0xC00000 mnt12mb.img
```

As you see, the parameters after ```read_flash```are describing the start and the length of the data block to be read from the device and written to the file - these are the values we investigated before (see illustration above). In this example you see that a big file will be created - it is the addtional file system of an ODROID-GO which comes with 16MB flash - as the system uses 4MB, there are still 12MB remaining for additional file system use. But even if you have an system like e.g. an ESP32 developer bord with 4MB, you may use a space of 256kB as external file system. This already may help a lot to put some files aside which e.g. you may use for web server purposes or symbols to be displayed on an TFT or OLED display. You may put the created image file e.g. in the ```src```subfolder of your application folder, it will be used later.

### Configuring ```mos.yml```

Now we have to look for some settings in ```mos.yml```to integrate the newly created image file into the build paclage ```fw.zip```.

In this file you need to have the following lines in the ```build_vars```section:

```yaml
build_vars:
  ESP_IDF_EXTRA_PARTITION: data,data,spiffs,,12288K
  APP_EXTRA_FW_PARTS: fs_data:type=fs,src=src/mnt12mb.img,ptn=data
```
The first line should already exist as you have created the file system according to the mentioned HowTo. Perhaps the name may differ and you used ```fs_ext``` instead of ```data```- but this won't play a big role. As you see, you have to enter the path of the created image file under the ```src=```entry, and the name of the file system under ```ptn```. As mentioned, you may exchange ```data```found here with ```fs_ext```in your own version. But be aware that the second parameter of the entry ```ESP_IDF_EXTRA_PARTITION``` has allways to be ```data``` no matter what the name is you've chosen for your file system.

After these settings you have to tell the system to mount the file system whwn booting - so you have to enter the following lines (if using another platform than ESP32 as in this example you have to look which parameters are valid in the particular case):

```yaml
config_schema:
  - ["sys.mount.path", "/mnt"]
  - ["sys.mount.dev_type", "esp32part"]
  - ["sys.mount.dev_opts", "{\"label\": \"data\"}"]
  - ["sys.mount.fs_type", "LFS"]
```
Under ```fs_type``` you have to enter which file system type is used - this depends on the cretaed file systems in the first place. So in this example the file system type ```LFS``` (Little File System) is chosen for a bigger partition because it's way faster than ```SPIFFS``` and handles big file systems quite well. But as it wastes a lot of space, you should use ```SPIFFS```for smaller filesystems.

If you want to use ```LFS```, you have to include the appropriate library in the configuration file:

```yaml
libs:
  - origin: https://github.com/mongoose-os-libs/vfs-fs-lfs

```
Optionally - if you use the http server - you may enter also the following line unter ```config_schema```:

```yaml
  - ["http.document_root", "/mnt"]
```
This will use the mounted file system as DOCROOT for the web werver as well.

### Goal reached!

So this is it! With these steps taken, after the next flash build process the image file will be integrated into the ```fw.zip```package and flashed to the device. No futher action necessary. So using this method enables you to create firmware packages with addtional file systems which might be installed also via OTA without the need of individually handling the setup up of the file system.

