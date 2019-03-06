# Onewire RMT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/onewire-rmt](https://github.com/mongoose-os-libs/onewire-rmt) | [mgos_onewire_rmt.h](https://github.com/mongoose-os-libs/onewire-rmt/tree/master/include/mgos_onewire_rmt.h) | &nbsp;  | &nbsp;         |


Based on https://github.com/nodemcu/nodemcu-firmware/blob/dev-esp32/components/platform/onewire.c

It uses 2 RMT channels, one for RX and one for TX.
Create the onewire object like this:
```
OnewireRmt* mgos_onewire_rmt_create(int pin,int rmt_rx,int rmt_tx);
```
or
```
OnewireRmt(uint8_t pin,uint8_t rmt_rx,uint8_t rmt_tx);
```





 ----- 
#### mgos_onewire_rmt_create

```c
OnewireRmt* mgos_onewire_rmt_create(int pin, int rmt_rx, int rmt_tx);
```
> 
> Create a OnewireRmt object instance. Return value: an object with the methods
> described below.
>  
#### mgos_onewire_rmt_close

```c
void mgos_onewire_rmt_close(OnewireRmt *ow);
```
> 
> Destroy an `ow` instance.
>  
#### mgos_onewire_rmt_reset

```c
bool mgos_onewire_rmt_reset(OnewireRmt *ow);
```
> 
> Performs a 1-Wire reset cycle. Returns 1 if a device responds
> with a presence pulse.  Returns 0 if there is no device or the
> bus is shorted or otherwise held low for more than 250uS
>  
#### mgos_onewire_rmt_crc8

```c
uint8_t mgos_onewire_rmt_crc8(const uint8_t *rom, int len);
```
> 
> Computes a Dallas Semiconductor 8 bit CRC, these are used in the
> ROM and scratchpad registers.
>  
#### mgos_onewire_rmt_target_setup

```c
void mgos_onewire_rmt_target_setup(OnewireRmt *ow, const uint8_t family_code);
```
> 
> Setup the search to find the device type 'family_code' (family code) on the next call
> to `mgos_onewire_rmt_next()` if it is present.
> 
> If no devices of the desired family are currently on the bus, then
> device of some another type will be found by `search()`.
>  
#### mgos_onewire_rmt_next

```c
bool mgos_onewire_rmt_next(OnewireRmt *ow, uint8_t *rom, int mode);
```
> 
> Looks for the next device.
> Returns 1 if a new address has been returned in the provided 8-byte array `buf`.
> A zero might mean that the bus is shorted, there are no devices,
> or you have already retrieved all of them.
> It might be a good idea to check the CRC to make sure you didn't get garbage.
> The order is deterministic. You will always get the same devices in the same order.
> Parameter mode is not used.
>  
#### mgos_onewire_rmt_select

```c
void mgos_onewire_rmt_select(OnewireRmt *ow, const uint8_t *rom);
```
> 
> Select a device based on its address `rom`, which is a 8-byte array.
> After a reset, this is needed to choose which device you will use, and then
> all communication will be with that device, until another reset.
>  
#### mgos_onewire_rmt_skip

```c
void mgos_onewire_rmt_skip(OnewireRmt *ow);
```
> 
> Issues a 1-Wire rom skip command, to address all on bus.
>  
#### mgos_onewire_rmt_search_clean

```c
void mgos_onewire_rmt_search_clean(OnewireRmt *ow);
```
> 
> Reset a search. Next use of `mgos_onewire_rmt_next(....)` will begin
> at the first device.
>  
#### mgos_onewire_rmt_read_bit

```c
bool mgos_onewire_rmt_read_bit(OnewireRmt *ow);
```
> 
> Reads a single bit from the onewire bus.
> The returned value is either 0 or 1.
>  
#### mgos_onewire_rmt_read

```c
uint8_t mgos_onewire_rmt_read(OnewireRmt *ow);
```
> 
> Reads a byte from the onewire bus.
>  
#### mgos_onewire_rmt_read_bytes

```c
void mgos_onewire_rmt_read_bytes(OnewireRmt *ow, uint8_t *buf, int len);
```
> 
> Reads multiple bytes from the onewire bus and write them to `buf`. The given
> buffer should be at least `len` bytes long.
>  
#### mgos_onewire_rmt_write_bit

```c
void mgos_onewire_rmt_write_bit(OnewireRmt *ow, int bit);
```
> 
> Writes a single bit to the onewire bus. Given `bit` should be either 0 or 1.
>  
#### mgos_onewire_rmt_write

```c
void mgos_onewire_rmt_write(OnewireRmt *ow, const uint8_t data);
```
> 
> Writes a byte to the onewire bus.
>  
#### mgos_onewire_rmt_write_bytes

```c
void mgos_onewire_rmt_write_bytes(OnewireRmt *ow, const uint8_t *buf, int len);
```
> 
> Writes `len` bytes from the buffer `buf`.
>  
