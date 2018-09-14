# SPI
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-spi](https://github.com/mongoose-os-libs/arduino-spi) | [SPI.h](https://github.com/mongoose-os-libs/arduino-spi/tree/master/include/SPI.h) | &nbsp;  | &nbsp;         |



This library provides an Arduino compatibility layer for SPI by providing
an `SPI.h` public header, so that one could pick an existing Arduino
program which uses SPI, throw it into the Mongoose OS application sources,
and ideally, it "just works".


 ----- 
#### begin

```c
void begin();
  void end();
```
<div class="apidescr">
 Arduino interface 
</div>
#### setBitOrder

```c
void setBitOrder(uint8_t bitOrder);
  void setDataMode(uint8_t dataMode);
  void setFrequency(uint32_t freq);
  // void setClockDivider(uint32_t clockDiv);
```
<div class="apidescr">
void setHwCs(bool use);
</div>
#### write

```c
void write(uint8_t data);
  void write16(uint16_t data);
  void write32(uint32_t data);
  void writeBytes(const uint8_t *data, uint32_t size);
```
<div class="apidescr">
void transferBits(uint32_t data, uint32_t * out, uint8_t bits);
</div>
