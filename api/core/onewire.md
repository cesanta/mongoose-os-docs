# Onewire
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/onewire](https://github.com/mongoose-os-libs/onewire) | [mgos_onewire.h](https://github.com/mongoose-os-libs/onewire/tree/master/include/mgos_onewire.h) | &nbsp;  | &nbsp;         |

This library provides support for
[1-wire](https://en.wikipedia.org/wiki/1-Wire) protocol for Mongoose OS.


 ----- 
#### mgos_onewire_crc8

```c
uint8_t mgos_onewire_crc8(const uint8_t *rom, int len);
```
<div class="apidescr">

Calculate CRC8 of the given chunk of memory.
 
</div>
#### mgos_onewire_create

```c
struct mgos_onewire *mgos_onewire_create(int pin);
```
<div class="apidescr">

Create onewire instance on a given pin.
 
</div>
#### mgos_onewire_reset

```c
bool mgos_onewire_reset(struct mgos_onewire *ow);
```
<div class="apidescr">

Reset onewire bus. Usually this is needed before communicating with any
device.
 
</div>
#### mgos_onewire_target_setup

```c
void mgos_onewire_target_setup(struct mgos_onewire *ow,
                               const uint8_t family_code);
/*
 * Search for the next device. The given `rom` should point to a chunk of at
 * least 8 bytes; result will be written there. `mode` is as follows:
 * 0 - normal search, 1 - conditional search.
 */
bool mgos_onewire_next(struct mgos_onewire *ow, uint8_t *rom, int mode);
```
<div class="apidescr">

Setup the search to find the device type 'family_code' on the next call
mgos_onewire_next() if it is present Note if no devices of the desired
family are currently on the 1-Wire, then another type will be found.
 
</div>
#### mgos_onewire_select

```c
void mgos_onewire_select(struct mgos_onewire *ow, const uint8_t *rom);
```
<div class="apidescr">

Select a device based on is address `rom`, which is a 8-byte string. After
a reset, this is needed to choose which device you will use, and then all
communication will be with that device, until another reset.
 
</div>
#### mgos_onewire_skip

```c
void mgos_onewire_skip(struct mgos_onewire *ow);
```
<div class="apidescr">

Skip the device selection. This only works if you have a single device, but
you can avoid searching and use this to immediately access your device.
 
</div>
#### mgos_onewire_search_clean

```c
void mgos_onewire_search_clean(struct mgos_onewire *ow);
```
<div class="apidescr">

Reset a search. Next use of `mgos_onewire_next` will begin at the first
device.
 
</div>
#### mgos_onewire_read_bit

```c
bool mgos_onewire_read_bit(struct mgos_onewire *ow);
```
<div class="apidescr">

Read a single bit from the onewire bus. Returned value is `true` for 1, or
`false` for 0.
 
</div>
#### mgos_onewire_read

```c
uint8_t mgos_onewire_read(struct mgos_onewire *ow);
```
<div class="apidescr">

Read a byte from the onewire bus.
 
</div>
#### mgos_onewire_read_bytes

```c
void mgos_onewire_read_bytes(struct mgos_onewire *ow, uint8_t *buf, int len);
```
<div class="apidescr">

Read `len` bytes from the onewire bus to the buffer `buf`.
 
</div>
#### mgos_onewire_write_bit

```c
void mgos_onewire_write_bit(struct mgos_onewire *ow, int bit);
```
<div class="apidescr">

Write a single bit to the onewire bus; given `bit` should be either `0` or
`1`.
 
</div>
#### mgos_onewire_write

```c
void mgos_onewire_write(struct mgos_onewire *ow, const uint8_t data);
```
<div class="apidescr">

Write a byte to the onewire bus.
 
</div>
#### mgos_onewire_write_bytes

```c
void mgos_onewire_write_bytes(struct mgos_onewire *ow, const uint8_t *buf,
                              int len);
```
<div class="apidescr">

Write `len` bytes to the onewire bus from `buf`.
 
</div>
#### mgos_onewire_close

```c
void mgos_onewire_close(struct mgos_onewire *ow);
```
<div class="apidescr">

Close onewire instance and free the occupied memory.
 
</div>
