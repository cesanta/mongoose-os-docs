# DHT temp sensor
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/dht](https://github.com/mongoose-os-libs/dht) | [mgos_dht.h](https://github.com/mongoose-os-libs/dht/tree/master/include/mgos_dht.h) | &nbsp;  | [api_dht.js](https://github.com/mongoose-os-libs/dht/tree/master/mjs_fs/api_dht.js)         |



## Overview

This is a library for the DHT series of low cost temperature/humidity sensors.

 ----- 

DHT sensor API.

See https://learn.adafruit.com/dht/overview for more information.
 

 ----- 
#### mgos_dht_create

```c
struct mgos_dht *mgos_dht_create(int pin, enum dht_type type);
```
<div class="apidescr">
 Initialise DHT sensor. Return an opaque DHT handle, or `NULL` on error. 
</div>
#### mgos_dht_close

```c
void mgos_dht_close(struct mgos_dht *dht);
```
<div class="apidescr">
 Close DHT handle. 
</div>
#### mgos_dht_get_temp

```c
float mgos_dht_get_temp(struct mgos_dht *dht);
```
<div class="apidescr">
 Return temperature in DegC or 'NAN' on failure. 
</div>
#### mgos_dht_get_humidity

```c
float mgos_dht_get_humidity(struct mgos_dht *dht);
```
<div class="apidescr">
 Return humidity in % or 'NAN' on failure. 
</div>

### JS API

 --- 
#### DHT.create

```javascript
DHT.create(pin, type)
```
<div class="apidescr">
Create a DHT object. `type` could be `DHT.DHT11`, `DHT.DHT21`,
`DHT.DHT22`. Return value: an object with the methods described below, or
'null' in case of a failure.
Example:
```javascript
let mydht = DHT.create(5, DHT.DHT11);
print('Temperature:', mydht.getTemp());
```
</div>
#### mydht.close

```javascript
mydht.close()
```
<div class="apidescr">
Close DHT handle. Return value: none.
</div>
#### mydht.getTemp

```javascript
mydht.getTemp()
```
<div class="apidescr">
Return temperature in degrees C or 'NaN' in case of a failure.
</div>
#### mydht.getHumidity

```javascript
mydht.getHumidity()
```
<div class="apidescr">
Return humidity in RH% or 'NaN' in case of a failure.
</div>
