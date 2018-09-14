# MAX72xx LED matrix
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-md-max72xx](https://github.com/mongoose-os-libs/arduino-md-max72xx) | [MD_MAX72xx.h](https://github.com/mongoose-os-libs/arduino-md-max72xx/tree/master/include/MD_MAX72xx.h) | &nbsp;  | &nbsp;         |

# MAX72xx LED Matrix Display Library

<i>IMPORTANT NOTE: Please make sure that you find and read the html documentation that comes with the library (open "docs/index.html") or use the link below. <b>You will need to edit the MAX72xx.h file to configure the type of matrix you are using</b>. This is the most asked support question so avoid frustration and READ THE MANUAL in the docs subfolder.</i>

The library implements functions that allow the MAX72xx to be used for LED matrices (64 individual LEDs), allowing the programmer to use the LED matrix as a pixel device, displaying graphics elements much like any other pixel addressable display.

In this scenario, it is convenient to abstract out the concept of the hardware device and create a uniform and consistent pixel address space, with the libraries determining device and device-element address. Similarly, control of the devices is uniform and abstracted to a system level.

The library still retains flexibility for device level control, should the developer require, through the use of overloaded class methods.

[Library Documentation](https://majicdesigns.github.io/MD_MAX72XX/)


 ----- 
#### MD_MAX72XX

```c
MD_MAX72XX(uint8_t dataPin, uint8_t clkPin, uint8_t csPin, uint8_t numDevices=1);
```
*
Class Constructor - arbitrary digital interface.

Instantiate a new instance of the class. The parameters passed are used to
connect the software to the hardware. Multiple instances may co-exist
but they should not share the same hardware CS pin (SPI interface).

\param dataPin		output on the Arduino where data gets shifted out.
\param clkPin		output for the clock signal.
\param csPin		output for selecting the device.
\param numDevices	number of devices connected. Default is 1 if not supplied.
                   Memory for device buffers is dynamically allocated based
                   on this parameter.
   
#### MD_MAX72XX

```c
MD_MAX72XX(uint8_t csPin, uint8_t numDevices=1);
```
*
Class Constructor - SPI hardware interface.

Instantiate a new instance of the class. The parameters passed are used to
connect the software to the hardware. Multiple instances may co-exist
but they should not share the same hardware CS pin (SPI interface).
The dataPin and the clockPin are defined by the Arduino hardware definition
(SPI MOSI and SCK signals).

\param csPin		output for selecting the device.
\param numDevices	number of devices connected. Default is 1 if not supplied.
                   Memory for device buffers is dynamically allocated based
                   on this parameter.
   
#### begin

```c
void begin(void);
```
*
Initialize the object.

Initialise the object data. This needs to be called during setup() to initialise new
data for the class that cannot be done during the object creation.

The LED hardware is initialized to the middle intensity value, all rows showing,
and all LEDs cleared (off). Test, shutdown and decode modes are off. Display updates
are on and wraparound is off.
   
#### ~MD_MAX72XX

```c
~MD_MAX72XX();
```
*
Class Destructor.

Released allocated memory and does the necessary to clean up once the object is
no longer required.
   
#### control

```c
bool control(uint8_t dev, controlRequest_t mode, int value);
```
*
Set the control status of the specified parameter for the specified device.

The device has a number of control parameters that can be set through this method.
The type of control action required is passed through the mode parameter and
should be one of the control actions defined by controlRequest_t. The value that
needs to be supplied on the control action required is one of the defined
actions in controlValue_t or a numeric parameter suitable for the control action.

\param dev			address of the device to control [0..getDeviceCount()-1].
\param mode		one of the defined control requests.
\param value		parameter value or one of the control status defined.
\return false if parameter errors, true otherwise.
   
#### control

```c
inline void control(controlRequest_t mode, int value) { control(0, getDeviceCount()-1, mode, value); };
```
*
Set the control status of the specified parameter for all devices.

Invokes the control function for each device in turn. as this is a wrapper for the
control(startDev, endDev, ...) methods, see the documentation for that method.

\param mode		one of the defined control requests.
\param value		parameter value or one of the control status defined.
\return No return value.
   
#### control

```c
bool control(uint8_t startDev, uint8_t endDev, controlRequest_t mode, int value);
```
*
Set the control status of the specified parameter for contiguous subset of devices.

Invokes the control function for each device in turn for the devices in the subset.
See documentation for the control() method.

\param startDev	the first device for the transformation [0..getDeviceCount()-1]
\param endDev		the last device for the transformation [0..getDeviceCount()-1]
\param mode		one of the defined control requests.
\param value		parameter value or one of the control status defined.
\return false if parameter errors, true otherwise.
   
#### getDeviceCount

```c
uint8_t getDeviceCount(void) { return(_maxDevices); };
```
*
Gets the number of devices attached to this class instance.

\return uint8_t representing the number of devices attached to this object.
   
#### getColumnCount

```c
uint16_t getColumnCount(void) { return(_maxDevices*COL_SIZE); };
```
*
Gets the maximum number of columns for devices attached to this class instance.

\return uint16_t representing the number of columns.
   
#### setShiftDataInCallback

```c
void setShiftDataInCallback(uint8_t (*cb)(uint8_t dev, transformType_t t)) { _cbShiftDataIn = cb; };
```
*
Set the Shift Data In callback function.

The callback function is called from the library when a transform shift left
or shift right operation is executed and the library needs to obtain data for
the end element of the shift (ie, conceptually this is the new data that is
shifted 'into' the display). The callback function is invoked when
- WRAPAROUND is not active, as the data would automatically supplied within the library.
- the call to transform() is global (ie, not for an individual buffer).

The callback function takes 2 parameters:
- the device number requesting the data [0..getDeviceCount()-1]
- one of the transformation types in transformType_t) that tells the callback function
what shift is being performed
The return value is the data for the column to be shifted into the display.

\param cb	the address of the function to be called from the library.
\return No return data
   
#### setShiftDataOutCallback

```c
void setShiftDataOutCallback(void (*cb)(uint8_t dev, transformType_t t, uint8_t colData)) { _cbShiftDataOut = cb; };
```
*
Set the Shift Data Out callback function.

The callback function is called from the library when a transform shift left
or shift right operation is executed and the library is about to discard the data for
the first element of the shift (ie, conceptually this is the data that 'falls' off
the front end of the scrolling display). The callback function is invoked when
- WRAPAROUND is not active, as the data would automatically supplied to the tail end.
- the call to transform() is global (ie, not for an individual buffer).

The callback function is with supplied 3 parameters, with no return value required:
- the device number that is the source of the data [0..getDeviceCount()-1]
- one of the transformation types transformType_t that tells the callback
function the type of shifting being executed
- the data for the column being shifted out

\param cb	the address of the function to be called from the library.
\return No return data
   
#### clear

```c
inline void clear(void) { clear(0, getDeviceCount()-1); };
```
*
Clear all the display data on all the display devices.

\return No return value.
   
#### clear

```c
void clear(uint8_t startDev, uint8_t endDev);
```
*
Clear all the display data on a subset of devices.

endDev must be greater than or equal to startDev.

\param startDev	the first device to clear [0..getDeviceCount()-1]
\param endDev		the last device to clear [0..getDeviceCount()-1]
\return No return value.
   
#### drawLine

```c
bool drawLine(uint8_t r1, uint16_t c1, uint8_t r2, uint16_t c2, bool state);
```
*
Draw a line between two points on the display

Draw a line between the specified points. The LED will be turned on or
off depending on the value supplied. The column number will be dereferenced
into the device and column within the device, allowing the LEDs to be treated
as a continuous pixel field.

\param r1		starting row coordinate for the point [0..ROW_SIZE-1].
\param c1		starting column coordinate for the point [0..getColumnCount()-1].
\param r2		ending row coordinate for the point [0..ROW_SIZE-1].
\param c2		ending column coordinate for the point [0..getColumnCount())-1].
\param state	true - switch on; false - switch off.
\return false if parameter errors, true otherwise.
   
#### getBuffer

```c
bool getBuffer(uint16_t col, uint8_t size, uint8_t *pd);
```
*
Load a bitmap from the display buffers to a user buffer.

Allows the calling program to read bitmaps (characters or graphic)
elements from the library display buffers. The data buffer
pointer should be a block of uint8_t data of size elements that will
contain the returned data.

\param col		address of the display column [0..getColumnCount()-1].
\param size	number of columns of data to return.
\param *pd		Pointer to a data buffer [0..size-1].
\return false if parameter errors, true otherwise. If true, data will be in the buffer at *pd.
   
#### getColumn

```c
uint8_t getColumn(uint8_t c) { return getColumn((c / COL_SIZE), c % COL_SIZE); };
```
*
Get the LEDS status for the specified column.

This method operates on a specific buffer

This method operates on one column, getting the bit field value of
the LEDs in the column. The column is referenced with the absolute column
number (ie, the device number is inferred from the column).

\param c		column which is to be set [0..getColumnCount()-1].
\return uint8_t value with each bit set to 1 if the corresponding LED is lit. 0 is returned for parameter error.
   
#### getPoint

```c
bool getPoint(uint8_t r, uint16_t c);
```
*
Get the status of a single LED, addressed as a pixel.

The method will get the status of a specific LED element based on its
coordinate position. The column number is dereferenced into the device
and column within the device, allowing the LEDs to be treated as a
continuous pixel field.

\param r		row coordinate for the point [0..ROW_SIZE-1].
\param c		column coordinate for the point [0..getColumnCount()-1].
\return true if LED is on, false if off or parameter errors.
   
#### setBuffer

```c
bool setBuffer(uint16_t col, uint8_t size, uint8_t *pd);
```
*
Load a bitfield from the user buffer to a display buffer.

Allows the calling program to define bitmaps (characters or graphic)
elements and pass them to the library for display. The data buffer
pointer should be a block of uint8_t data of size elements that define
the bitmap.

\param col		address of the display column [0..getColumnCount()-1].
\param size	number of columns of data following.
\param *pd		Pointer to a data buffer [0..size-1].
\return false if parameter errors, true otherwise.
   
#### setColumn

```c
bool setColumn(uint8_t c, uint8_t value) { return setColumn((c / COL_SIZE), c % COL_SIZE, value); };
```
*
Set all LEDs in a specific column to a new state.

This method operates on one column, setting the value of the LEDs in
the column to the specified value bitfield. The column is
referenced with the absolute column number (ie, the device number is
inferred from the column). The method is useful for drawing vertical
lines and patterns when the display is being treated as a pixel field.
The least significant bit of the value is the lowest row number.

\param c		column which is to be set [0..getColumnCount()-1].
\param value	each bit set to 1 will light up the corresponding LED.
\return false if parameter errors, true otherwise.
   
#### setPoint

```c
bool setPoint(uint8_t r, uint16_t c, bool state);
```
*
Set the status of a single LED, addressed as a pixel.

The method will set the value of a specific LED element based on its
coordinate position. The LED will be turned on or off depending on the
value supplied. The column number is dereferenced into the device and
column within the device, allowing the LEDs to be treated as a
continuous pixel field.

\param r		row coordinate for the point [0..ROW_SIZE-1].
\param c		column coordinate for the point [0..getColumnCount()-1].
\param state	true - switch on; false - switch off.
\return false if parameter errors, true otherwise.
   
#### setRow

```c
inline bool setRow(uint8_t r, uint8_t value) { return setRow(0, getDeviceCount()-1, r, value); };
```
*
Set all LEDs in a row to a new state on all devices.

This method operates on all devices, setting the value of the LEDs in
the row to the specified value bit field. The method is useful for
drawing patterns and lines horizontally across on the entire display.
The least significant bit of the value is the lowest column number.

\param r	   row which is to be set [0..ROW_SIZE-1].
\param value  each bit set to 1 will light up the corresponding LED on each device.
\return false if parameter errors, true otherwise.
   
#### setRow

```c
bool setRow(uint8_t startDev, uint8_t endDev, uint8_t r, uint8_t value);
```
*
Set all LEDs in a row to a new state on contiguous subset of devices.

This method operates on a contiguous subset of devices, setting the value
of the LEDs in the row to the specified value bit field. The method is useful for
drawing patterns and lines horizontally across specific devices only.
endDev must be greater than or equal to startDev.
The least significant bit of the value is the lowest column number.

\param startDev	the first device for the transformation [0..getDeviceCount()-1]
\param endDev		the last device for the transformation [0..getDeviceCount()-1]
\param r			row which is to be set [0..ROW_SIZE-1].
\param value		each bit set to 1 will light up the corresponding LED on each device.
\return false if parameter errors, true otherwise.
   
#### transform

```c
inline bool transform(transformType_t ttype) { return transform(0, getDeviceCount()-1, ttype); };
```
*
Apply a transformation to the data in all the devices.

The buffers for all devices can be transformed using one of the enumerated
transformations in transformType_t. The transformation is carried across
device boundaries (ie, there is overflow to an adjacent devices if appropriate).

\param ttype  one of the transformation types in transformType_t.
\return false if parameter errors, true otherwise.
   
#### transform

```c
bool transform(uint8_t startDev, uint8_t endDev, transformType_t ttype);
```
*
Apply a transformation to the data in contiguous subset of devices.

The buffers for all devices in the subset can be transformed using one of the enumerated
transformations in transformType_t. The transformation is carried across
device boundaries (ie, there is overflow to an adjacent devices if appropriate).
endDev must be greater than or equal to startDev.

\param startDev	the first device for the transformation [0..getDeviceCount()-1]
\param endDev		the last device for the transformation [0..getDeviceCount()-1]
\param ttype		one of the transformation types in transformType_t.
\return false if parameter errors, true otherwise.
   
#### update

```c
void update(controlValue_t mode) { control(UPDATE, mode); };
```
*
Turn auto display updates on or off.

Turn auto updates on and off, as required. When auto updates are turned OFF the
display will not update after each operation. Display updates can be forced at any
time using using a call to update() with no parameters.

This function is a convenience wrapper for the more general control() function call.

\param mode	one of the types in controlValue_t (ON/OFF).
\return No return value.
   
#### update

```c
void update(void) { flushBufferAll(); };
```
*
Force an update of all devices

Used when auto updates have been turned off through the control
method. This will force all buffered changes to be written to
all the connected devices.

\return no return value.
   
#### wraparound

```c
void wraparound(controlValue_t mode) { control(WRAPAROUND, mode); };
  /** @} */
```
*
Turn display wraparound on or off.

When shifting left or right, up or down, the outermost edge is normally lost and a blank
row or column inserted on the opposite side. If this options is enabled, the edge is wrapped
around to the opposite side.

This function is a convenience wrapper for the more general control() function call.

\param mode	one of the types in controlValue_t (ON/OFF).
\return No return value.
   
#### clear

```c
bool clear(uint8_t buf);
```
*
Clear all display data in the specified buffer.

\param buf		address of the buffer to clear [0..getDeviceCount()-1].
\return false if parameter errors, true otherwise.
   
#### getColumn

```c
uint8_t getColumn(uint8_t buf, uint8_t c);
```
*
Get the state of the LEDs in a specific column.

This method operates on the specific buffer, returning the bit field value of
the LEDs in the column.

\param buf		address of the display [0..getDeviceCount()-1].
\param c		column which is to be set [0..COL_SIZE-1].
\return uint8_t value with each bit set to 1 if the corresponding LED is lit. 0 is returned for parameter error.
   
#### getRow

```c
uint8_t getRow(uint8_t buf, uint8_t r);
```
*
Get the state of the LEDs in a specified row.

This method operates on the specific buffer, returning the bit field value of
the LEDs in the row.

\param buf		address of the display [0..getDeviceCount()-1].
\param r		row which is to be set [0..ROW_SIZE-1].
\return uint8_t value with each bit set to 1 if the corresponding LED is lit. 0 is returned for parameter error.
   
#### setColumn

```c
bool setColumn(uint8_t buf, uint8_t c, uint8_t value);
```
*
Set all LEDs in a column to a new state.

This method operates on a specific buffer, setting the value of the LEDs in
the column to the specified value bit field. The method is useful for
drawing patterns and lines vertically on the display device.
The least significant bit of the value is the lowest column number.

\param buf		address of the display [0..getDeviceCount()-1].
\param c		column which is to be set [0..COL_SIZE-1].
\param value   each bit set to 1 will light up the	corresponding LED.
\return false if parameter errors, true otherwise.
   
#### setRow

```c
bool setRow(uint8_t buf, uint8_t r, uint8_t value);
```
*
Set all LEDs in a row to a new state.

This method operates on a specific device, setting the value of the LEDs in
the row to the specified value bit field. The method is useful for
drawing patterns and lines horizontally across the display device.
The least significant bit of the value is the lowest row number.

\param buf		address of the display [0..getDeviceCount()-1].
\param r		row which is to be set [0..ROW_SIZE-1].
\param value   each bit set to 1 within this byte will light up the corresponding LED.
\return false if parameter errors, true otherwise.
   
#### transform

```c
bool transform(uint8_t buf, transformType_t ttype);
```
*
Apply a transformation to the data in the specified device.

The buffer for one device can be transformed using one of the enumerated
transformations in transformType_t. The transformation is limited to the
nominated device buffer only (ie, there is no overflow to an adjacent device).

\param buf	   address of the display [0..getBufferCount()-1].
\param ttype  one of the transformation types in transformType_t.
\return false if parameter errors, true otherwise.
   
#### update

```c
void update(uint8_t buf) { flushBuffer(buf); };
  /** @} */
```
*
Force an update of one buffer.

Used when auto updates have been turned off through the control()
method. This will force all buffered display changes to be written to
the specified device at the same time.
Note that control() messages are not buffered but cause immediate action.

\param buf	address of the display [0..getBufferCount()-1].
\return No return value.
   
#### getChar

```c
uint8_t getChar(uint8_t c, uint8_t size, uint8_t *buf);
```
*
Load a character from the font data into a user buffer.

Copy the bitmap for a library font character (current font set by setFont()) and
return it in the data area passed by the user. If the user buffer is not large
enough, only the first size elements are copied to the buffer.

NOTE: This function is only available if the library defined value
USE_LOCAL_FONT is set to 1.

\param c		the character to retrieve.
\param size	the size of the user buffer in unit8_t units.
\param buf		address of the user buffer supplied.
\return width (in columns) of the character, 0 if parameter errors.
   
#### setChar

```c
uint8_t setChar(uint16_t col, uint8_t c);
```
*
Load a character from the font data starting at a specific column.

Load a character from the font table directly into the display at the column
specified. The currently selected font table is used as the source.

NOTE: This function is only available if the library defined value
USE_LOCAL_FONT is set to 1.

\param col		column of the display in the range accepted [0..getColumnCount()-1].
\param c		the character to display.
\return width (in columns) of the character, 0 if parameter errors.
   
#### setFont

```c
bool setFont(fontType_t *f);
```
*
Set the current font table.

Font data is stored in PROGMEM, in the format described elsewhere in the
documentation. All characters retrieved or used after this call will use
the nominated font (default or user defined). To specify a user defined
character set, pass the PROGMEM address of the font table. Passing a nullptr
resets the font table to the library default table.

This function also causes the font index table to be recreated if the
library defined value USE_INDEX_TABLE is set to 1.

NOTE: This function is only available if the library defined value
USE_LOCAL_FONT is set to 1.

\param f	fontType_t pointer to the table of font data in PROGMEM or nullptr.
\return false if parameter errors, true otherwise.
   
#### getMaxFontWidth

```c
uint8_t getMaxFontWidth(void);
```
*
Get the maximum width character for the font.

Returns the number of columns for the widest character in the currently
selected font table. Useful to allocated buffers of the right size before 
loading characters from the font table.

NOTE: This function is only available if the library defined value
USE_LOCAL_FONT is set to 1.

\return number of columns (width) for the widest character.
  
#### getFont

```c
fontType_t *getFont(void) { return(_fontData); };
#endif // USE_LOCAL_FONT
  /** @} */
```
*
Get the pointer to current font table.

Returns the pointer to the current font table. Useful if user code needs 
to replace the current font temporarily and then restore previous font.

NOTE: This function is only available if the library defined value
USE_LOCAL_FONT is set to 1.

\return pointer to the start of the font table in PROGMEM.
   
#### (*_cbShiftDataIn)

```c
uint8_t	(*_cbShiftDataIn)(uint8_t dev, transformType_t t);
  void		(*_cbShiftDataOut)(uint8_t dev, transformType_t t, uint8_t colData);
```
User callback function for shifting operations
#### buildFontIndex

```c
void		buildFontIndex(void);			// build a font index
#endif
```
find the character in the font data
#### spiInit

```c
void spiInit(void);			    // do the actual physical communications task
  void spiSend(void);			    // do the actual physical communications task
  void spiSendArduino(void);	// do the actual physical communications task
  void spiClearBuffer(void);	// clear the SPI send buffer
  void controlHardware(uint8_t dev, controlRequest_t mode, int value);	// set hardware control commands
  void controlLibrary(controlRequest_t mode, int value);	// set internal control commands
```
Private functions
#### flushBufferAll

```c
void flushBufferAll();			  // determine what needs to be sent for all devices and transmit
```
determine what needs to be sent for one device and transmit
#### transformBuffer

```c
bool transformBuffer(uint8_t buf, transformType_t ttype);	// internal transform function
```
reverse the order of bits in the byte
#### copyColumn

```c
bool copyColumn(uint8_t buf, uint8_t cSrc, uint8_t cDest);// copy a row from Src to Dest
};
```
copy a row from Src to Dest
