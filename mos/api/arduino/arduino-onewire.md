# Onewire
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-onewire](https://github.com/mongoose-os-libs/arduino-onewire) | [mgos_arduino_onewire.h](https://github.com/mongoose-os-libs/arduino-onewire/tree/master/include/mgos_arduino_onewire.h) | &nbsp;  | [api_arduino_onewire.js](https://github.com/mongoose-os-libs/arduino-onewire/tree/master/mjs_fs/api_arduino_onewire.js)         |



This library provides an Arduino compatibility layer for onewire by providing
an `OneWire.h` public header, so that one could pick an existing Arduino
program which uses onewire, throw it into the Mongoose OS application sources,
and ideally, it "just works".

Additionally, a mgos-specific API is available, see
`include/mgos_arduino_onewire.h` and `mjs_fs/api_arduino_onewire.js`.


 ----- 
#### mgos_arduino_onewire_create

```c
OneWire *mgos_arduino_onewire_create(uint8_t pin);
```
> 
> Create a OneWire object instance. Return value: an object with the methods
> described below.
>  
#### mgos_arduino_onewire_close

```c
void mgos_arduino_onewire_close(OneWire *ow);
```
> 
> Destroy an `ow` instance.
>  
#### mgos_arduino_onewire_reset

```c
uint8_t mgos_arduino_onewire_reset(OneWire *ow);
```
> 
> Reset the 1-wire bus. Usually this is needed before communicating with any
> device.
>  
#### mgos_arduino_onewire_select

```c
void mgos_arduino_onewire_select(OneWire *ow, const uint8_t *addr);
```
> 
> Select a device based on its address `addr`, which is a 8-byte array.
> After a reset, this is needed to choose which device you will use, and then
> all communication will be with that device, until another reset.
> 
> Example:
> ```c
> uint8_t addr[] = {0x28, 0xff, 0x2b, 0x45, 0x4c, 0x04, 0x00, 0x10};
> mgos_arduino_onewire_select(myow, addr);
> ```
>  
#### mgos_arduino_onewire_skip

```c
void mgos_arduino_onewire_skip(OneWire *ow);
```
> 
> Skip the device selection. This only works if you have a single device, but
> you can avoid searching and use this to immediately access your device.
>  
#### mgos_arduino_onewire_write

```c
void mgos_arduino_onewire_write(OneWire *ow, uint8_t v);
```
> 
> Write a byte to the onewire bus.
> 
> Example:
> ```c
> // Write 0x12 to the onewire bus
> mgos_arduino_onewire_write(myow, 0x12);
> ```
>  
#### mgos_arduino_onewire_write_bytes

```c
void mgos_arduino_onewire_write_bytes(OneWire *ow, const uint8_t *buf,
                                      uint16_t count);
```
> 
> Write `count` bytes from the buffer `buf`. Example:
> 
> ```c
> // Write [0x55, 0x66, 0x77] to the onewire bus
> const uint8_t buf[] = {0xff, 0x66, 0x77};
> mgos_arduino_onewire_write_bytes(myow, buf, sizeof(buf));
> ```
>  
#### mgos_arduino_onewire_read

```c
uint8_t mgos_arduino_onewire_read(OneWire *ow);
```
> 
> Read a byte from the onewire bus.
>  
#### mgos_arduino_onewire_read_bytes

```c
void mgos_arduino_onewire_read_bytes(OneWire *ow, uint8_t *buf, uint16_t count);
```
> 
> Read multiple bytes from the onewire bus and write them to `buf`. The given
> buffer should be at least `count` bytes long.
>  
#### mgos_arduino_onewire_write_bit

```c
void mgos_arduino_onewire_write_bit(OneWire *ow, uint8_t v);
```
> 
> Write a single bit to the onewire bus. Given `v` should be either 0 or 1.
>  
#### mgos_arduino_onewire_read_bit

```c
uint8_t mgos_arduino_onewire_read_bit(OneWire *ow);
```
> 
> Read a single bit from the onewire bus. Returned value is either 0 or 1.
>  
#### mgos_arduino_onewire_depower

```c
void mgos_arduino_onewire_depower(OneWire *ow);
```
> 
> Not implemented yet.
>  
#### mgos_arduino_onewire_search

```c
uint8_t mgos_arduino_onewire_search(OneWire *ow, uint8_t *newAddr,
                                    uint8_t search_mode);
```
> 
> Search for the next device. The given `addr` should point to the buffer with
> at least 8 bytes. If a device is found, `addr` is
> filled with the device's address and 1 is returned. If no more
> devices are found, 0 is returned.
> `mode` is an integer: 0 means normal search, 1 means conditional search.
> Example:
> ```c
> uint8_t addr[8];
> uint8_t res = mgos_arduino_onewire_search(addr, 0);
> if (res) {
>   // addr contains the next device's address
>   printf("Found!");
> } else {
>   printf("Not found");
> }
> ```
>  
#### mgos_arduino_onewire_reset_search

```c
void mgos_arduino_onewire_reset_search(OneWire *ow);
```
> 
> Reset a search. Next use of `mgos_arduino_onewire_search(....)` will begin
> at the first device.
>  
#### mgos_arduino_onewire_target_search

```c
void mgos_arduino_onewire_target_search(OneWire *ow, uint8_t family_code);
```
> 
> Setup the search to find the device type 'fc' (family code) on the next call
> to `mgos_arduino_onewire_search()` if it is present.
> 
> If no devices of the desired family are currently on the bus, then
> device of some another type will be found by `search()`.
>  
#### mgos_arduino_onewire_crc8

```c
uint8_t mgos_arduino_onewire_crc8(OneWire *ow, const uint8_t *addr,
                                  uint8_t len);
```
> 
> Calculate crc8 for the given buffer `addr`, `len`.
>  

### JS API

 --- 
#### OneWire.create

```javascript
OneWire.create()
```
Create a OneWire object instance. Return value: an object with the methods
described below.
#### myOW.close

```javascript
myOW.close()
```
Close OneWire handle. Return value: none.
#### myOW.reset

```javascript
myOW.reset()
```
Reset the 1-wire bus. Usually this is needed before communicating with
any device.
#### myOW.select

```javascript
myOW.select(addr)
```
Select a device based on its address `addr`, which is a 8-byte string.
After a reset, this is needed to choose which device you will use, and
then all communication will be with that device, until another reset.
Example:
```javascript
myOW.select("\x28\xff\x2b\x45\x4c\x04\x00\x10");
```
#### myOW.skip

```javascript
myOW.skip()
```
Skip the device selection. This only works if you have a single device,
but you can avoid searching and use this to immediately access your
device.
#### myOW.write

```javascript
myOW.write(v)
```
Write a byte to the onewire bus. Example:
```javascript
// Write 0x12 to the onewire bus
myOW.write(0x12);
```
#### myOW.write_bytes

```javascript
myOW.write_bytes(buf, len)
```
Write first `len` bytes of the string `buf`. Example:
```javascript
// Write [0x55, 0x66, 0x77] to the onewire bus
myOW.write_bytes("\x55\x66\x77", 3);
```
#### myOW.read

```javascript
myOW.read()
```
Read a byte from the onewire bus. Example:
```javascript
let b = myOW.read();
print('read:', b);
```
#### myOW.read_bytes

```javascript
myOW.read_bytes(buf, len)
```
Read multiple bytes from the onewire bus. The given buffer should
be large enough to fit the data; otherwise it will result in memory
corruption and thus undefined behavior.
Return value: none.
Example:
```javascript
let buf = "          ";
myOW.read_bytes(buf, 10);
print('read:', buf);
```
#### myOW.write_bit

```javascript
myOW.write_bit(v)
```
Write a single bit to the onewire bus. Given `v` should be a number:
either 0 or 1.
#### myOW.read_bit

```javascript
myOW.read_bit()
```
Read a single bit from the onewire bus. Returned value is either 0 or 1.
#### myOW.depower

```javascript
myOW.depower()
```
Not implemented yet.
#### myOW.search

```javascript
myOW.search(addr, mode)
```
Search for the next device. The given `addr` should be an string
containing least 8 bytes (any bytes). If a device is found, `addr` is
filled with the device's address and 1 is returned. If no more
devices are found, 0 is returned.
`mode` is an integer: 0 means normal search, 1 means conditional search.
Example:
```javascript
let addr = "        ";
let res = myOW.search(addr, 0);
if (res === 1) {
  print("Found:", addr);
} else {
  print("Not found");
}
```
#### myOW.reset_search

```javascript
myOW.reset_search()
```
Reset a search. Next use of `myOW.search(....)` will begin at the first
device.
#### myOW.target_search

```javascript
myOW.target_search(fc)
```
Setup the search to find the device type 'fc' (family code) on the next
call to `myOW.search()` if it is present.

If no devices of the desired family are currently on the bus, then
device of some another type will be found by `search()`.
#### myOW.crc8

```javascript
myOW.crc8(buf, len)
```
Calculate crc8 for the first `len` bytes of a string `buf`.
Example:
```javascript
// Calculate crc8 of the buffer
let s = "foobar";
let crc = myOW.crc8(s, 6);
print("crc:", crc);
```
#### myOW.delay

```javascript
myOW.delay(t)
```
Delay `t` milliseconds.
