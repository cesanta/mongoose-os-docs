# Adafuit GFX
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-adafruit-gfx](https://github.com/mongoose-os-libs/arduino-adafruit-gfx) | [Adafruit_GFX.h](https://github.com/mongoose-os-libs/arduino-adafruit-gfx/blob/master/include/Adafruit_GFX.h) | &nbsp;  | &nbsp;         |




 ----- 
#### drawPixel

```c
virtual void drawPixel(int16_t x, int16_t y, uint16_t color) = 0;
```
> Constructor
> This MUST be defined by the subclass:
#### startWrite

```c
virtual void startWrite(void);
  virtual void writePixel(int16_t x, int16_t y, uint16_t color);
  virtual void writeFillRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color);
  virtual void writeFastVLine(int16_t x, int16_t y, int16_t h, uint16_t color);
  virtual void writeFastHLine(int16_t x, int16_t y, int16_t w, uint16_t color);
  virtual void writeLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t color);
  virtual void endWrite(void);
```
> TRANSACTION API / CORE DRAW API
> These MAY be overridden by the subclass to provide device-specific
> optimized code.  Otherwise 'generic' versions are used.
#### setRotation

```c
virtual void setRotation(uint8_t r);
  virtual void invertDisplay(boolean i);
```
> CONTROL API
> These MAY be overridden by the subclass to provide device-specific
> optimized code.  Otherwise 'generic' versions are used.
#### getCursorX

```c
int16_t getCursorX(void) const;
  int16_t getCursorY(void) const;
```
> get current cursor position (get rotation safe maximum values, using: width() for x, height() for y)
#### initButton

```c
void initButton(Adafruit_GFX *gfx, int16_t x, int16_t y,
   uint16_t w, uint16_t h, uint16_t outline, uint16_t fill,
   uint16_t textcolor, char *label, uint8_t textsize);
  // New/alt initButton() uses upper-left corner & size
  void initButtonUL(Adafruit_GFX *gfx, int16_t x1, int16_t y1,
   uint16_t w, uint16_t h, uint16_t outline, uint16_t fill,
   uint16_t textcolor, char *label, uint8_t textsize);
  void drawButton(boolean inverted = false);
  boolean contains(int16_t x, int16_t y);
```
> "Classic" initButton() uses center & size
