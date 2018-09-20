# Device registration

**Step 1.** Make sure that your app has a library `dash` listed
in the `mos.yml` file. If you're using a pre-built `demo-js` Mongoose OS app,
you can omit this step. Otherwise, edit `mos.yml`:

```yaml
libs:
  ...
  - origin: https://github.com/mongoose-os-libs/dash  # <-- Add this line!
```

Then, `mos build` and `mos flash`.

**Step 2.** Congifure WiFi: `mos wifi NETWORK_NAME NETWORK_PASSWORD`

**Step 3.** Login to the https://dash.mongoose-os.com/, register a new device.
Click on a "Token" field for the new device to copy it to the clipboard.

<img src="./dash8.png" class="w-75 pb-3" />

**Step 4.** Configure device: `mos config-set dash.enable=true dash.token=GENERATED_TOKEN`

Done! Now your device should appear "green" (online) on a dashboard.


## Using device simulator

If you don't want to use a real device for some reason, there
is a POSIX program for Linux/Mac/Windows that could be used to simulate
the device. Clone it from
[https://github.com/cesanta/mongoose-os-device-simulator](https://github.com/cesanta/mongoose-os-device-simulator).

Then simply run `make`. You'll the the access token prompt:

```
$ make
cc -W -Wall -g -O2 -D MG_ENABLE_CALLBACK_USERDATA=1 -D MG_ENABLE_SSL -DMG_SSL_IF=MG_SSL_IF_MBEDTLS -lmbedtls -lmbedcrypto -lmbedx509 main.c mongoose.c -o simulator
./simulator
Enter access token: 
```

Login to [dash.mongoose-os.com](https://dash.mongoose-os.com), choose some
registered device, copy the
access token to the clipboard, paste into the prompt and press enter.

