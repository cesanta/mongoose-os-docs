
Cesanta note: This file is copied from esp8266/Arduino
 
### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-compat](https://github.com/mongoose-os-libs/arduino-compat) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API
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
#### min

```c
#define min(a, b) ((a) < (b) ? (a) : (b))
#define max(a, b) ((a) > (b) ? (a) : (b))
#endif
```
arduino is not compatible with std::vector
#### random

```c
long random(long);
long random(long, long);
void randomSeed(unsigned long);
long secureRandom(long);
long secureRandom(long, long);
long map(long, long, long, long, long);
```
WMath prototypes
