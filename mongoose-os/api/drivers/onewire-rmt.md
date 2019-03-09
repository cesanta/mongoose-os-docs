# Onewire RMT
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/onewire-rmt](https://github.com/mongoose-os-libs/onewire-rmt) | [OnewireRmt.h](https://github.com/mongoose-os-libs/onewire-rmt/tree/master/include/OnewireRmt.h) | &nbsp;  | &nbsp;         |


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
#### reset

```c
uint8_t reset(void);
```
> 
> Perform a 1-Wire reset cycle. Returns 1 if a device responds
> with a presence pulse.  Returns 0 if there is no device or the
> bus is shorted or otherwise held low for more than 250uS
>      
#### select

```c
void select(const uint8_t rom[8]);
```
> 
> Issues a 1-Wire rom select command, you do the reset first.
>      
#### skip

```c
void skip(void);
```
> 
> Issues a 1-Wire rom skip command, to address all on bus.
>      
#### write

```c
void write(uint8_t v, uint8_t power = 0);
    void write_bytes(const uint8_t *buf, uint16_t count, bool power = 0);
```
> 
> Write a byte/sequence of bytes. If 'power' is one then the wire is held high at
> the end for parasitically powered devices. You are responsible
> for eventually depowering it by calling depower() or doing
> another read or write.
>      
#### read

```c
uint8_t read(void);
    void read_bytes(uint8_t *buf, uint16_t count);
```
> 
> Read a byte/sequence of bytes.
>      
#### write_bit

```c
void write_bit(uint8_t v);
```
> 
> Write a bit. The bus is always left powered at the end, see
> note in write() about that.
>      
#### read_bit

```c
uint8_t read_bit(void);
```
> 
> Read a bit.
>      
#### depower

```c
void depower(void);
```
> 
> Stop forcing power onto the bus. You only need to do this if
> you used the 'power' flag to write() or used a write_bit() call
> and aren't about to do another read or write. You would rather
> not leave this powered if you don't have to, just in case
> someone shorts your bus.
>      
#### reset_search

```c
void reset_search();
```
> 
> Clear the search state so that if will start from the beginning again.
>      
#### target_search

```c
void target_search(uint8_t family_code);
```
> 
> Setup the search to find the device type 'family_code' on the next call
> to search(*newAddr) if it is present.
>      
#### search

```c
uint8_t search(uint8_t *newAddr, bool search_mode = true);
```
> 
> Look for the next device. Returns 1 if a new address has been
> returned. A zero might mean that the bus is shorted, there are
> no devices, or you have already retrieved all of them.  It
> might be a good idea to check the CRC to make sure you didn't
> get garbage.  The order is deterministic. You will always get
> the same devices in the same order.
>      
#### crc8

```c
static uint8_t crc8(const uint8_t *addr, uint8_t len);
```
> 
> Compute a Dallas Semiconductor 8 bit CRC, these are used in the
> ROM and scratchpad registers.
>      
