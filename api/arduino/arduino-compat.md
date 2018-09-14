# Arduino compatibility
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-compat](https://github.com/mongoose-os-libs/arduino-compat) | [Arduino.h](https://github.com/mongoose-os-libs/arduino-compat/tree/master/include/Arduino.h) | &nbsp;  | &nbsp;         |

# Arduino compatibility for Mongoose OS

This library provides a common Arduino compatibility layer, so that one could
pick an existing Arduino program, throw it into the Mongoose OS application
sources, and ideally, it "just works".

Currently, the following public headers are provided:

- `Arduino.h`
- `Print.h`
- `WString.h`
- `stdlib_noniso.h`

There are more specific Arduino-compatibility libraries available: for
[onewire](https://github.com/mongoose-os-libs/arduino-onewire),
[SPI](https://github.com/mongoose-os-libs/arduino-spi), etc.


 ----- 

Cesanta note: This file is copied from esp8266/Arduino
 

 ----- 
#### pinMode

```c
void pinMode(uint8_t pin, uint8_t mode);
void digitalWrite(uint8_t pin, uint8_t val);
int digitalRead(uint8_t pin);
#ifdef TODO
int analogRead(uint8_t pin);
void analogReference(uint8_t mode);
void analogWrite(uint8_t pin, int val);
void analogWriteFreq(uint32_t freq);
void analogWriteRange(uint32_t range);
#endif
```
int atexit(void (*func)()) __attribute__((weak));
