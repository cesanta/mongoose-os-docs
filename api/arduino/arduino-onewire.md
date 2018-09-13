# Arduino OneWire library for Mongoose OS

This library provides an Arduino compatibility layer for onewire by providing
an `OneWire.h` public header, so that one could pick an existing Arduino
program which uses onewire, throw it into the Mongoose OS application sources,
and ideally, it "just works".

Additionally, a mgos-specific API is available: for
[C](https://mongoose-os.com/docs/api/mgos_arduino_onewire.h.html) and
[mJS](https://mongoose-os.com/docs/api/api_arduino_onewire.js.html).

### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-onewire](https://github.com/mongoose-os-libs/arduino-onewire) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API
#### reset

```c
uint8_t reset(void);
```
Perform a 1-Wire reset cycle. Returns 1 if a device responds
with a presence pulse.  Returns 0 if there is no device or the
bus is shorted or otherwise held low for more than 250uS
#### select

```c
void select(const uint8_t rom[8]);
```
Issue a 1-Wire rom select command, you do the reset first.
#### skip

```c
void skip(void);
```
Issue a 1-Wire rom skip command, to address all on bus.
#### write

```c
void write(uint8_t v, uint8_t power = 0);
```
Write a byte. If 'power' is one then the wire is held high at
the end for parasitically powered devices. You are responsible
for eventually depowering it by calling depower() or doing
another read or write.
#### read

```c
uint8_t read(void);
```
Read a byte.
#### write_bit

```c
void write_bit(uint8_t v);
```
Write a bit. The bus is always left powered at the end, see
note in write() about that.
#### read_bit

```c
uint8_t read_bit(void);
```
Read a bit.
#### depower

```c
void depower(void);
```
Stop forcing power onto the bus. You only need to do this if
you used the 'power' flag to write() or used a write_bit() call
and aren't about to do another read or write. You would rather
not leave this powered if you don't have to, just in case
someone shorts your bus.
#### reset_search

```c
void reset_search();
```
Clear the search state so that if will start from the beginning again.
#### target_search

```c
void target_search(uint8_t family_code);
```
Setup the search to find the device type 'family_code' on the next call
to search(*newAddr) if it is present.
#### search

```c
uint8_t search(uint8_t *newAddr, bool search_mode = true);
```
Look for the next device. Returns 1 if a new address has been
returned. A zero might mean that the bus is shorted, there are
no devices, or you have already retrieved all of them.  It
might be a good idea to check the CRC to make sure you didn't
get garbage.  The order is deterministic. You will always get
the same devices in the same order.
#### crc8

```c
static uint8_t crc8(const uint8_t *addr, uint8_t len);
  
 private:
  struct mgos_onewire *ow_;  // The mgos_onewire handle
};
```
Compute a Dallas Semiconductor 8 bit CRC, these are used in the
ROM and scratchpad registers.

### JS API
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
