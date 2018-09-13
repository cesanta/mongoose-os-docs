# Arduino SPI library for Mongoose OS

This library provides an Arduino compatibility layer for SPI by providing
an `SPI.h` public header, so that one could pick an existing Arduino
program which uses SPI, throw it into the Mongoose OS application sources,
and ideally, it "just works".

### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-spi](https://github.com/mongoose-os-libs/arduino-spi) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API
#### begin

```c
void begin();
  void end();
```
 Arduino interface 
#### setBitOrder

```c
void setBitOrder(uint8_t bitOrder);
  void setDataMode(uint8_t dataMode);
  void setFrequency(uint32_t freq);
  // void setClockDivider(uint32_t clockDiv);
```
void setHwCs(bool use);
#### write

```c
void write(uint8_t data);
  void write16(uint16_t data);
  void write32(uint32_t data);
  void writeBytes(const uint8_t *data, uint32_t size);
```
void transferBits(uint32_t data, uint32_t * out, uint8_t bits);
