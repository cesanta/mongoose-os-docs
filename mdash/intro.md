# Device Management Dashboard

<video controls="" class="float-right border w-50 ml-3 mb-3">
    <source src="./dash1.mp4" type="video/mp4">
</video>

Mongoose OS provides an integrated service for device management called mDash.
It is located at https://dash.mongoose-os.com/ , and provides the following
functionality:

- 24/7 access and monitoring for your devices in the field
- Full isolation. Other users cannot see traffic from your devices and cannot
  access them
- OTA updates, on-the-fly file editing, config editing, shadow editing,
  calling any device function like `Sys.Reboot`, `Sys.GetInfo`, `GPIO.Toggle`, etc
- RESTful API and Web UI that provide:
   * Online/offline status together with device metadata like
   firmware version, build time, device architecture
   * Full access to the devices' RPC services (remote management)
   * Reliable OTA updates with manual or automatic commit
   * Device twin (or, shadow) cloud object, semantically identical to AWS / Azure
- Notification stream that lets you catch state changes, implement custom logging, etc
