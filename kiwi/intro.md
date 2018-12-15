# Kiwi: BLE to MQTT gateway

Kiwi is a BLE to MQTT gateway that provides the following functionality:

- Catch BLE beacons and forward them to the specified MQTT topic
- Provide set of commands (driven by MQTT or REST) to:
    * Scan bluetooth network for devices
    * Connect to a given device
    * Scan a given device for characteristics
    * Read a given characteristic
    * Write to a given characteristic
    * Subscribe to notifications
- Configure gatway to read BLE devices and forward data to the cloud (MQTT)
