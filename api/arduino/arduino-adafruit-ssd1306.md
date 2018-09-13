# Adafuit SSD1306
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-adafruit-ssd1306](https://github.com/mongoose-os-libs/arduino-adafruit-ssd1306) | [Adafruit_SSD1306.h](https://github.com/mongoose-os-libs/arduino-adafruit-ssd1306/tree/master/include/Adafruit_SSD1306.h) | &nbsp;  | [api_arduino_ssd1306.js](https://github.com/mongoose-os-libs/arduino-adafruit-ssd1306/tree/master/mjs_fs/api_arduino_ssd1306.js)         |

# Arduino Adafruit SSD1306 library for Mongoose OS


 ----- 
#### defined

```c
#elif defined(ESP8266) || defined(ESP32) || defined(ARDUINO_STM32_FEATHER) || defined(__arc__)
  typedef volatile uint32_t PortReg;
  typedef uint32_t PortMask;
#elif defined(__AVR__)
  typedef volatile uint8_t PortReg;
  typedef uint8_t PortMask;
  #define HAVE_PORTREG
#else
  // chances are its 32 bit so assume that
  typedef volatile uint32_t PortReg;
  typedef uint32_t PortMask;
#endif
```
not supported

### JS API

 --- 
#### Colors

```javascript
Colors
```
- `Adafruit_SSD1306.BLACK`
- `Adafruit_SSD1306.WHITE`
- `Adafruit_SSD1306.INVERSE`
#### Adafruit_SSD1306.create_i2c

```javascript
Adafruit_SSD1306.create_i2c(rst, res)
```
Create an SSD1306 object for I2C. `rst` is a number of reset pin,
`res` is the resolution, one of the:
- `Adafruit_SSD1306.RES_96_16`
- `Adafruit_SSD1306.RES_128_32`
- `Adafruit_SSD1306.RES_128_64`

Return value: an object with methods described below.
Example:
```javascript
Adafruit_SSD1306.create_i2c(12, Adafruit_SSD1306.RES_128_32);
```
#### Adafruit_SSD1306.create_spi

```javascript
Adafruit_SSD1306.create_spi(dc, rst, cs, res)
```
Create an SSD1306 object for SPI.
`dc` is a number of data command pin, `rst` is a number of reset pin,
`cs` is a number of chip select pin, `res` is the resolution, one of the:
- `Adafruit_SSD1306.RES_96_16`
- `Adafruit_SSD1306.RES_128_32`
- `Adafruit_SSD1306.RES_128_64`

Return value: an object with methods described below.
Example:
```javascript
Adafruit_SSD1306.create_spi(10, 12, 11, Adafruit_SSD1306.RES_128_32);
```
#### mySSD1306.close

```javascript
mySSD1306.close()
```
Close Adafruit_SSD1306 instance. Return value: none.
#### mySSD1306.begin

```javascript
mySSD1306.begin(vccst, i2caddr, reset)
```
Initialize the display. `vccst` is a VCC state, one of those:
- `Adafruit_SSD1306.EXTERNALVCC`
- `Adafruit_SSD1306.SWITCHCAPVCC`
`i2caddr` is an I2C address (ignored if `create_spi` was used). `reset`
is a boolean; if true, then the display controller will be reset.
Return value: none.
Example:
```javascript
mySSD1306.begin(Adafruit_SSD1306.EXTERNALVCC, 0x42, true);
```
#### mySSD1306.ssd1306_command

```javascript
mySSD1306.ssd1306_command(cmd)
```
Send an arbitrary command `cmd`, which must be a number from 0 to 255.
Return value: none.
#### mySSD1306.clearDisplay

```javascript
mySSD1306.clearDisplay()
```
Clear display. Return value: none.
#### mySSD1306.invertDisplay

```javascript
mySSD1306.invertDisplay(i)
```
Set invert mode: 0 - don't invert; 1 - invert. Return value: none.
#### mySSD1306.display

```javascript
mySSD1306.display()
```
Put image data to the display. Return value: none.
#### mySSD1306.startScrollRight

```javascript
mySSD1306.startScrollRight()
```
Activate a right handed scroll for rows from `start` to `stop`.
Return value: none.
#### mySSD1306.startScrollLeft

```javascript
mySSD1306.startScrollLeft()
```
Activate a left handed scroll for rows from `start` to `stop`.
Return value: none.
#### mySSD1306.startScrollDiagRight

```javascript
mySSD1306.startScrollDiagRight()
```
Activate a diagonal scroll for rows from `start` to `stop`.
Return value: none.
#### mySSD1306.startScrollDiagLeft

```javascript
mySSD1306.startScrollDiagLeft()
```
Activate a diagonal scroll for rows from `start` to `stop`.
Return value: none.
#### mySSD1306.stopScroll

```javascript
mySSD1306.stopScroll()
```
Stop scrolling. Return value: none.
#### mySSD1306.dim

```javascript
mySSD1306.dim(dim)
```
Set dim mode:
`dim` is 1: display is dimmed;
`dim` is 0: display is normal.
Return value: none.
#### mySSD1306.drawPixel

```javascript
mySSD1306.drawPixel(x, y, color)
```
Set a single pixel with coords `x`, `y` to have the given `color`. See
available colors above.
Return value: none.
#### mySSD1306.drawFastVLine

```javascript
mySSD1306.drawFastVLine(x, y, h, color)
```
Draw a vertical line with height `h` starting from `x`, `y`, with color
`color`. See available colors above.
Return value: none.
Example:
```javascript
mySSD1306.drawFastVLine(10, 5, 15, Adafruit_SSD1306.WHITE);
```
#### mySSD1306.drawFastHLine

```javascript
mySSD1306.drawFastHLine(x, y, w, color)
```
Draw a horizontal line of width `w` starting from `x`, `y`, with color
`color`. See available colors above.
Return value: none.
Example:
```javascript
mySSD1306.drawFastHLine(10, 10, 20, Adafruit_SSD1306.WHITE);
```
#### mySSD1306.drawCircle

```javascript
mySSD1306.drawCircle(x, y, r, color)
```
Draw a circle with the radius `r`, centered at from `x`, `y`, with color
`color`. See available colors above.
Return value: none.
Example:
```javascript
mySSD1306.drawCircle(10, 10, 20, 10, 3, Adafruit_SSD1306.WHITE);
```
#### mySSD1306.fillCircle

```javascript
mySSD1306.fillCircle(x, y, r, color)
```
Draw a filled circle with the radius `r`, centered at from `x`, `y`,
with color `color`. See available colors above.
Return value: none.
Example:
```javascript
mySSD1306.fillCircle(10, 10, 5, Adafruit_SSD1306.WHITE);
```
#### mySSD1306.drawTriangle

```javascript
mySSD1306.drawTriangle(x0, y0, x1, y1, x2, y2, color)
```
Draw a triangle at the given coordinates, with color `color`. See
available colors above.
Return value: none.
Example:
```javascript
mySSD1306.drawTriangle(10, 0, 20, 20, 0, 20, Adafruit_SSD1306.WHITE);
```
#### mySSD1306.drawRoundRect

```javascript
mySSD1306.drawRoundRect(x0, y0, w, h, radius, color)
```
Draw a rectangle with round corners; `x0`, `y0` are the coords of the
left-top corner, `w` is width, `h` is height, `radius` is the corners
radius, with color `color`. See available colors above.
Return value: none.
Example:
```javascript
mySSD1306.drawRoundRect(10, 10, 20, 10, 3, Adafruit_SSD1306.WHITE);
```
#### mySSD1306.drawRoundRect

```javascript
mySSD1306.drawRoundRect(x0, y0, w, h, radius, color)
```
Draw a filled rectangle with round corners; `x0`, `y0` are the coords of
the left-top corner, `w` is width, `h` is height, `radius` is the
corners radius, with color `color`. See available colors above.
Return value: none.
Example:
```javascript
mySSD1306.fillRoundRect(10, 10, 20, 10, 3, Adafruit_SSD1306.WHITE);
```
#### mySSD1306.drawChar

```javascript
mySSD1306.drawChar(x, y, c, color, bg, size)
```
Draw a character `c` starting at the point `x`, `y`, with the color
`color` (see available colors above). If `bg` is different from `color`,
then the background is filled with `bg`; otherwise bacground is left
intact.

There is only one font (to save space) and it's meant to be 5x8 pixels,
but an optional `size` parameter which scales the font by this factor (e.g.
size=2 will render the text at 10x16 pixels per character).
Return value: none.
Example:
```javascript
mySSD1306.drawChar(10, 10, 'a',
                   Adafruit_SSD1306.WHITE, Adafruit_SSD1306.WHITE, 1);
```
#### mySSD1306.setCursor

```javascript
mySSD1306.setCursor(x, y)
```
Set text cursor for the following calls to `mySSD1306.write()`.
See example for `write()` below.
Return value: none.
#### mySSD1306.setTextColor

```javascript
mySSD1306.setTextColor(color)
```
Set text color for the following calls to `mySSD1306.write()`. See
available colors above.
See example for `write()` below.
Return value: none.
#### mySSD1306.setTextColorBg

```javascript
mySSD1306.setTextColorBg(color, bg)
```
Set text color and background color for the following calls to
`mySSD1306.write()`. If `bg` is equal to the `color`, then the
background will be left intact while drawing characters.
See example for `write()` below.
Return value: none.
#### mySSD1306.setTextSize

```javascript
mySSD1306.setTextSize(size)
```
Set text color for the following calls to `mySSD1306.write()`. There is
only one font (to save space) and it's meant to be 5x8 pixels, but an
optional `size` parameter which scales the font by this factor (e.g.
size=2 will render the text at 10x16 pixels per character).
See example for `write()` below.
Return value: none.
#### mySSD1306.setTextWrap

```javascript
mySSD1306.setTextWrap(wrap)
```
Set text wrap mode (true or false) for the following calls to
`mySSD1306.write()`.
See example for `write()` below.
Return value: none.
#### mySSD1306.write

```javascript
mySSD1306.write(str)
```
Write given string `str` using the parameters set before (`setCursor()`,
`setTextColor()`, `setTextColorBg()`, `setTextSize()`, `setTextWrap()`)
Return value: 1.
Example:
```javascript
mySSD1306.setCursor(10, 10);
mySSD1306.setTextColor(Adafruit_SSD1306.WHITE);
mySSD1306.setTextSize(2);
mySSD1306.setTextWrap(true);
mySSD1306.write("Hello world!");
```
#### mySSD1306.height

```javascript
mySSD1306.height()
```
Return display height in pixels.
#### mySSD1306.width

```javascript
mySSD1306.width()
```
Return display width in pixels.
#### mySSD1306.setRotation

```javascript
mySSD1306.setRotation(rot)
```
Set display rotation:
- 0: no rotation
- 1: rotated at 90 degrees
- 2: rotated at 180 degrees
- 3: rotated at 270 degrees
#### mySSD1306.getRotation

```javascript
mySSD1306.getRotation()
```
Return rotation previously set with `setRotation()`
#### mySSD1306.getCursorX

```javascript
mySSD1306.getCursorX()
```
Return cursor X coordinate, previously set with `setCursor()`.
#### mySSD1306.getCursorY

```javascript
mySSD1306.getCursorY()
```
Return cursor Y coordinate, previously set with `setCursor()`.
