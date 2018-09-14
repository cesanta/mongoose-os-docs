# Parola for MAX 7219
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/arduino-md-parola](https://github.com/mongoose-os-libs/arduino-md-parola) | [MD_Parola.h](https://github.com/mongoose-os-libs/arduino-md-parola/tree/master/include/MD_Parola.h) | &nbsp;  | &nbsp;         |



[Version 1.0 Video](http://www.youtube.com/watch?v=JgzVCSFaz3I)

[Version 2.0 Video](http://www.youtube.com/watch?v=u1iELyROjW8)

[Library Documentation](https://majicdesigns.github.io/MD_Parola/)

Parola is a modular scrolling text display using MAX7219 or MAX7221 LED matrix display controllers using Arduino. The display is made up of any number of identical modules that are plugged together to create a wider/longer display.
* Text left, right or center justification in the display
* Text scrolling, entry and exit effects
* Control display parameters and animation speed
* Support for hardware SPI interface
* Multiple virtual displays (zones) in each string of LED modules
* User defined fonts and/or individual characters substitutions
* Support for double height displays

The aim was to create a 'lego-like' LED matrix display, using standard 8x8 LED matrices. The software supports this flexibility through a scalable approach that only requires the definition of the number of modules to adapt existing software to a new configuration.

The Parola software has a dependency on the [MD_MAX72xx Arduino library](https://github.com/MajicDesigns/MD_MAX72xx) which implements hardware functions of the LED matrix. The library needs to be configured for the type of matrices being used - please refer to the hardware section of documentation for the [MD_MAX72xx library](https://majicdesigns.github.io/MD_MAX72XX/page_hardware.html).

Parola discussion on the [Arduino forum](http://forum.arduino.cc/index.php?topic=171056.0) and kits available from [ElectroDragon](http://www.electrodragon.com/product/dot-matrix-chain-display-kit-max7219-v2).

Additional information also at [my blog](http://arduinoplusplus.wordpress.com).


 ----- 
#### begin

```c
void begin(MD_MAX72XX *p);
```
> *
> Initialize the object.
> 
> Initialize the object data. This will be called to initialize
> new data for the class that cannot be done during the object creation.
> 
> \param p	pointer to the parent object for this zone.
>    
#### ~MD_PZone

```c
~MD_PZone(void);
```
> *
> Class Destructor.
> 
> Release allocated memory and does the necessary to clean up once the object is
> no longer required.
>    
#### zoneAnimate

```c
bool zoneAnimate(void);
```
> *
> Animate the zone.
> 
> Animate using the currently specified text and animation parameters.
> This method is invoked from the main Parola object.
> 
> \return bool	true if the zone animation has completed, false otherwise.
>    
#### getStatus

```c
bool getStatus(void) { return (_fsmState == END); }
```
> *
> Get the completion status.
> 
> Return the current completion status for the zone animation.
> 
> See comments for the MD_Parola getZoneStatus() method.
> 
> \return bool	true if the zone animation is completed
>    
#### zoneClear

```c
void zoneClear(void) { _MX->clear(_zoneStart, _zoneEnd); if (_inverted) _MX->transform(_zoneStart, _zoneEnd, MD_MAX72XX::TINV); };
```
> *
> Clear the zone.
> 
> See comments for the MD_Parola namesake method.
> 
> \return No return value.
>    
#### zoneReset

```c
inline void zoneReset(void) { _fsmState = INITIALISE; };
```
> *
> Reset the current zone animation to restart.
> 
> See comments for the MD_Parola namesake method.
> 
> \return No return value.
>    
#### zoneShutdown

```c
void zoneShutdown(bool b) { _MX->control(_zoneStart, _zoneEnd, MD_MAX72XX::SHUTDOWN, b ? MD_MAX72XX::ON : MD_MAX72XX::OFF); };
```
> *
> Sshutdown or resume zone hardware.
> 
> See comments for the MD_Parola namesake method.
> 
> \param b	boolean value to shutdown (true) or resume (false).
> \return No return value.
>   
#### zoneSuspend

```c
inline void zoneSuspend(bool b) { _suspend = b; };
```
> *
> Suspend or resume zone updates.
> 
> See comments for the MD_Parola namesake method.
> 
> \param b	boolean value to suspend (true) or resume (false).
> \return No return value.
>    
#### setZone

```c
inline void setZone(uint8_t zStart, uint8_t zEnd) { _zoneStart = zStart; _zoneEnd = zEnd; };
```
> *
> Set the start and end parameters for a zone.
> 
> See comments for the MD_Parola namesake method.
> 
> \param zStart	the first module number for the zone [0..numZones-1].
> \param zEnd	the last module number for the zone [0..numZones-1].
>    
#### getCharSpacing

```c
inline uint8_t getCharSpacing(void) { return _charSpacing; };
```
> *
> Get the zone inter-character spacing in columns.
> 
> \return the current setting for the space between characters in columns.
>    
#### getIntensity

```c
inline uint8_t getIntensity() { return _intensity; };
```
> *
> Get the zone brightness.
> 
> Get the intensity (brightness) of the display.
> 
> \return The intensity setting.
>   
#### getInvert

```c
inline bool getInvert(void) { return _inverted; };
```
> *
> Get the zone current invert state.
> 
> See the setInvert() method.
> 
> \return the inverted boolean value.
>    
#### getPause

```c
inline uint16_t getPause(void) { return _pauseTime; };
```
> *
> Get the zone pause time.
> 
> See the setPause() method.
> 
> \return the pause value in milliseconds.
>    
#### getScrollSpacing

```c
inline uint16_t getScrollSpacing(void) { return _scrollDistance; };
```
> *
> Get the horizontal Scroll spcing.
> 
> See the setScrollSpacing() method
> 
> \return the space between message in columns.
>    
#### getSpeed

```c
inline uint16_t getSpeed(void) { return _tickTime; };
```
> *
> Get the zone animation speed.
> 
> See the setSpeed() method
> 
> \return the speed value.
>    
#### getSynchTime

```c
inline uint32_t getSynchTime(void) { return _lastRunTime; }
```
> *
> Get the zone animation start time.
> 
> See the setSynchTime() method
> 
> \return the internal time reference.
>   
#### getTextAlignment

```c
inline textPosition_t getTextAlignment(void) { return _textAlignment; };
```
> *
> Get the current text alignment specification.
> 
> \return the current text alignment setting
>    
#### getZoneEffect

```c
boolean getZoneEffect(zoneEffect_t ze);
```
> *
> Get the value of specified display effect.
> 
> The display effect is one of the zoneEffect_t types. The returned value will be
> true if the attribute is set, false if the attribute is not set.
> 
> \param ze	the required text alignment.
> \return true if the value is set, false otherwise.
>    
#### setCharSpacing

```c
inline void setCharSpacing(uint8_t cs) { _charSpacing = cs; allocateFontBuffer(); };
```
> *
> Set the zone inter-character spacing in columns.
> 
> Set the number of blank columns between characters when they are displayed.
> 
> \param cs	space between characters in columns.
> \return No return value.
>    
#### setIntensity

```c
inline void setIntensity(uint8_t intensity) { _intensity = intensity; _MX->control(_zoneStart, _zoneEnd, MD_MAX72XX::INTENSITY, _intensity); };
```
> *
> Set the zone brightness.
> 
> Set the intensity (brightness) of the display.
> 
> \param intensity	the intensity to set the display (0-15).
> \return No return value.
>    
#### setInvert

```c
inline void setInvert(uint8_t invert) { _inverted = invert; };
```
> *
> Invert the zone display.
> 
> Set the display to inverted (ON LED turns OFF and vice versa).
> 
> \param invert	true for inverted display, false for normal display
> \return No return value.
>    
#### setPause

```c
inline void setPause(uint16_t pause) { _pauseTime = pause; };
```
> *
> Set the pause between ENTER and EXIT animations for this zone.
> 
> Between each entry and exit, the library will pause by the number of milliseconds
> specified to allow the viewer to read the message. For continuous scrolling displays
> this should be set to the same value as the display speed.
> 
> \param pause	the time, in milliseconds, between animations.
> \return No return value.
>    
#### setScrollSpacing

```c
inline void setScrollSpacing(uint16_t space) { _scrollDistance = space; };
```
> *
> Set the horizontal scrolling distance between messages.
> 
> When scrolling horizontally, the distance between the end of one message and the
> start of the next can be set using this method. Normal operation is for the message
> to be fully off the display before the new message starts.
> Set to zero for default behavior.
> 
> \param space	the spacing, in columns, between messages; zero for default behaviour..
> \return No return value.
>    
#### setSpeed

```c
inline void setSpeed(uint16_t speed) { _tickTime = speed; };
```
> *
> Set the zone animation frame speed.
> 
> The speed of the display is the 'tick' time between animation frames. The lower this time
> the faster the animation; set it to zero to run as fast as possible.
> 
> \param speed	the time, in milliseconds, between animation frames.
> \return No return value.
>    
#### setSynchTime

```c
inline void setSynchTime(uint32_t zt) { _lastRunTime = zt; }
```
> *
> Set the zone animation start time.
> 
> Each zone animation has an associated start time. The start time
> defaults to the time when the zone is initialised. This method allows
> synchronisation between zones by setting the same start time. Should be
> used in conjunction with the getSynchTime() method as the return value
> should only be treated as an internal reference and arbitrary values
> will result in irregular behaviour.
> 
> \param zt	the required start time.
> \return No return value.
>   
#### setTextAlignment

```c
inline void setTextAlignment(textPosition_t ta) { _textAlignment = ta; };
```
> *
> Set the text alignment within the zone.
> 
> Text alignment is specified as one of the values in textPosition_t.
> 
> \param ta	the required text alignment.
> \return No return value.
>    
#### setTextBuffer

```c
inline void setTextBuffer(char *pb) { _pText = pb; };
```
> *
> Set the pointer to the text buffer for this zone.
> 
> Sets the text buffer to be a pointer to user data.
> See the comments for the namesake method in MD_Parola.
> 
> \param pb	pointer to the text buffer to be used.
> \return No return value.
>    
#### setTextEffect

```c
inline void setTextEffect(textEffect_t effectIn, textEffect_t effectOut) { _effectIn = effectIn, _effectOut = effectOut; };
```
> *
> Set the entry and exit text effects for the zone.
> 
> See the comments for the namesake method in MD_Parola.
> 
> \param	effectIn	the entry effect, one of the textEffect_t enumerated values.
> \param	effectOut	the exit effect, one of the textEffect_t enumerated values.
> \return No return value.
>    
#### setZoneEffect

```c
void setZoneEffect(boolean b, zoneEffect_t ze);
```
> *
> Set the zone display effect.
> 
> The display effect is one of the zoneEffect_t types, and this will be set (true) or
> reset (false) depending on the boolean value. The resulting zone display will be
> modified as per the required effect.
> 
> \param b set the value if true, reset the value if false
> \param ze	the required text alignment.
> \return No return value.
>    
#### addChar

```c
bool addChar(uint8_t code, uint8_t *data);
```
> *
> Add a user defined character to the replacement list.
> 
> Add a replacement characters to the user defined list. The character data must be
> the same as for a single character in the font definition file. If a character is
> specified with a code the same as an existing character the existing data will be
> substituted for the new data. A character code of 0 is illegal as this denotes the
> end of string character for C++ and cannot be used in an actual string.
> The library does not copy the in the data in the data definition but only retains
> a pointer to the data, so any changes to the data storage in the calling program will
> be reflected in the library.
> 
> \param code	ASCII code for the character data.
> \param data	pointer to the character data.
> \return true of the character was inserted in the substitution list.
>    
#### delChar

```c
bool delChar(uint8_t code);
```
> *
> Delete a user defined character to the replacement list.
> 
> Delete a replacement character to the user defined list. A character code of 0 is
> illegal as this denotes the end of string character for C++ and cannot be used in
> an actual string.
> 
> \param code	ASCII code for the character data.
> \return true of the character was found in the substitution list.
>    
#### setZoneFont

```c
void setZoneFont(MD_MAX72XX::fontType_t *fontDef) { _fontDef = fontDef; _MX->setFont(_fontDef); allocateFontBuffer(); };
  /** @} */
```
> *
> Set the display font.
> 
> See comments for the namesake Parola method.
> 
> \param fontDef	Pointer to the font definition to be used.
> \return No return value.
>    
#### getTextWidth

```c
uint16_t  getTextWidth(char *p);      // width of text in columns
  bool      calcTextLimits(char *p);    // calculate the right and left limits for the text
```
> set up initial conditions for an effect
#### getNextChar

```c
uint8_t getNextChar(void);      // put the next Text char into the char buffer
```
> put the first Text char into the char buffer
#### findChar

```c
uint8_t   findChar(uint8_t code, uint8_t size, uint8_t *cBuf);	// look for user defined character
  uint8_t   makeChar(char c, bool addBlank);      // load a character bitmap and add in trailing _charSpacing blanks if req'd
  void      reverseBuf(uint8_t *p, uint8_t size); // reverse the elements of the buffer
  void      invertBuf(uint8_t *p, uint8_t size);  // invert the elements of the buffer
```
> allocate _cBuf based on the size of the largest font characters
#### state2string

```c
char *state2string(fsmState_t s);
```
> Debugging aid
#### commonPrint

```c
void  commonPrint(void);
  void  effectPrint(bool bIn);
//#if ENA_MISC
  void  effectSlice(bool bIn);
  void  effectMesh(bool bIn);
  void  effectFade(bool bIn);
  void  effectBlinds(bool bIn);
  void  effectDissolve(bool bIn);
  void  effectRandom(bool bIn);
//#endif // ENA_MISC
//#if ENA_WIPE
  void  effectWipe(bool bLightBar, bool bIn);
//#endif
//#if ENA_OPNCLS
  void  effectOpen(bool bLightBar, bool bIn);
  void  effectClose(bool bLightBar, bool bIn);
//#endif // ENA_OPNCLS
//#if ENA_SCR_STR
  void  effectVScroll(bool bUp, bool bIn);
  void  effectHScroll(bool bLeft, bool bIn);
//#endif // ENA_SCR_STR
//#if ENA_SCR_DIA
  void  effectDiag(bool bUp, bool bLeft, bool bIn);
//#endif // ENA_SCR_DIA
//#if ENA_SCAN
  void  effectHScan(bool bIn, bool bBlank);
  void  effectVScan(bool bIn, bool bBlank);
//#endif // ENA_SCAN
//#if ENA_GROW
  void  effectGrow(bool bUp, bool bIn);
//#endif // ENA_GROW
};
```
> Effect functions
#### MD_Parola

```c
MD_Parola(uint8_t csPin, uint8_t numDevices=1);
```
> *
> Class Constructor - SPI hardware interface.
> 
> Instantiate a new instance of the class. The parameters passed are used to
> connect the software to the hardware using the MD_MAX72XX class.
> 
> See documentation for the MD_MAX72XX library for detailed explanation of parameters.
> 
> \param csPin		output for selecting the device.
> \param numDevices	number of devices connected. Default is 1 if not supplied.
>    
#### begin

```c
void begin(void) { begin(1); };
```
> *
> Initialize the object.
> 
> Initialise the object data. This needs to be called during setup() to initialise new
> data for the class that cannot be done during the object creation. This form of the
> method is for backward compatibility and creates one zone for the entire display.
>    
#### begin

```c
void begin(uint8_t numZones);
```
> *
> Initialize the object.
> 
> Initialise the object data. This needs to be called during setup() to initialise new
> data for the class that cannot be done during the object creation. This form of the
> method allows specifying the number of zones used. The maximum number of zones is set 
> by the MAX_ZONES constant which can be chanhed to allow more or fewer zones. The module
> limits for the zones need to be initialized separately using setZone().
> 
> \param numZones	maximum number of zones [1..MAX_ZONES]
>    
#### ~MD_Parola

```c
~MD_Parola(void);
```
> *
> Class Destructor.
> 
> Release allocated memory and does the necessary to clean up once the object is
> no longer required.
>    
#### displayAnimate

```c
bool displayAnimate(void);
```
> *
> Animate the display.
> 
> Animate all the zones in the display using the currently specified text and
> animation parameters. This method needs to be invoked as often as possible
> to ensure smooth animation. The animation is governed by a time tick that
> is set by the setSpeed() method and it will pause between entry and exit using
> the time set by the setPause() method.
> 
> The calling program should monitor the return value for 'true' in order to either
> reset the zone animation or supply another string for display. A 'true' return
> value means that one or more zones have completed their animation.
> 
> \return bool	true if at least one zone animation has completed, false otherwise.
>    
#### getZoneStatus

```c
bool getZoneStatus(uint8_t z) { if (z < _numZones) return(_Z[z].getStatus()); };
```
> *
> Get the completion status for a zone.
> 
> This method is to determine which zone has completed when displayAnimate()
> has returned a completion status.
> 
> The calling program should monitor the return value for 'true' in order to either
> reset the zone animation or supply another string for display. A 'true' return
> value means that the zone has completed its animation cycle.
> 
> \param z		specified zone
> \return bool	true if the zone animation has completed, false otherwise.
>    
#### displayClear

```c
void displayClear(void) { for (uint8_t i=0; i<_numZones; i++) _Z[i].zoneClear(); };
```
> *
> Clear the display.
> 
> Clear all the zones in the current display.
> 
> \return No return value.
>    
#### displayClear

```c
void displayClear(uint8_t z) { if (z < _numZones) _Z[z].zoneClear(); };
```
> *
> Clear one zone in the display.
> 
> Clear the specified zone in the current display.
> 
> \param z		specified zone
> \return No return value.
>    
#### displayReset

```c
void displayReset(void) { for (uint8_t i=0; i<_numZones; i++) _Z[i].zoneReset(); };
```
> *
> Reset the current animation to restart for all zones.
> 
> This method is used to reset all the zone animations an animation back to the start
> of their cycle current cycle.
> It is normally invoked after all the parameters for a display are set and the
> animation needs to be started (or restarted).
> 
> \return No return value.
>    
#### displayReset

```c
void displayReset(uint8_t z) { if (z < _numZones) _Z[z].zoneReset(); };
```
> *
> Reset the current animation to restart for the specified zone.
> 
> See the comments for the 'all zones' variant of this method.
> 
> \param z	specified zone
> \return No return value.
>    
#### displayShutdown

```c
void displayShutdown(bool b) { for (uint8_t i=0; i<_numZones; i++) _Z[i].zoneShutdown(b); };
```
> *
> Shutdown or restart display hardware.
> 
> Shutdown the display hardware to a low power state. The display will
> be blank during the shutdown. Calling animate() will continue to
> animate the display in the memory buffers but this will not be visible
> on the display (ie, the librarie still function but the display does not).
> To reset the animation back to the beginning, use the displayReset() method.
> 
> \param b	boolean value to shutdown (true) or resume (false).
> \return No return value.
>    
#### displaySuspend

```c
void displaySuspend(bool b) { for (uint8_t i = 0; i<_numZones; i++) _Z[i].zoneSuspend(b); };
```
> *
> Suspend or resume display updates.
> 
> Stop the current display animation. When pausing it leaves the
> display showing the current text. Resuming will restart the animation where
> it left off. To reset the animation back to the beginning, use the
> displayReset() method.
> 
> \param b	boolean value to suspend (true) or resume (false).
> \return No return value.
>   
#### setZone

```c
bool setZone(uint8_t z, uint8_t moduleStart, uint8_t moduleEnd);
```
> *
> Define the module limits for a zone.
> 
> When multiple zones are defined, the library needs to know the contiguous module
> ranges that make up the different zones. If the library has been started with only
> one zone then it will automatically initialize the zone to be the entire range for
> the display modules, so calling this function is not required.
> 
> A module is a unit of 8x8 LEDs, as defined in the MD_MAX72xx library.
> Zones should not overlap or unexpected results will occur.
> 
> \param z		zone number.
> \param moduleStart	the first module number for the zone [0..numZones-1].
> \param moduleEnd	the last module number for the zone [0..numZones-1].
> \return true if set, false otherwise.
>    
#### displayScroll

```c
inline void displayScroll(char *pText, textPosition_t align, textEffect_t effect, uint16_t speed)
    { displayZoneText(0, pText, align, speed, 0, effect, effect); };
```
> *
> Easy start for a scrolling text display.
> 
> This method is a convenient way to set up a scrolling display. All the data
> necessary for setup is passed through as parameters and the display animation
> is started. Assumes one zone only (zone 0).
> 
> \param pText	parameter suitable for the setTextBuffer() method.
> \param align	parameter suitable for the the setTextAlignment() method.
> \param effect	parameter suitable for the the setTextEffect() method.
> \param speed	parameter suitable for the setSpeed() method.
> \return No return value.
>    
#### displayText

```c
inline void displayText(char *pText, textPosition_t align, uint16_t speed, uint16_t pause, textEffect_t effectIn, textEffect_t effectOut = PA_NO_EFFECT)
    { displayZoneText(0, pText, align, speed, pause, effectIn, effectOut); };
```
> *
> Easy start for a non-scrolling text display.
> 
> This method is a convenient way to set up a static text display. All the data
> necessary for setup is passed through as parameters and the display animation
> is started. Assumes one zone only (zone 0).
> 
> \param pText	parameter suitable for the setTextBuffer() method.
> \param align	parameter suitable for the the setTextAlignment() method.
> \param speed	parameter suitable for the setSpeed() method.
> \param pause	parameter suitable for the setPause() method.
> \param	effectIn	parameter suitable for the setTextEffect() method.
> \param	effectOut	parameter suitable for the setTextEffect() method.
> \return No return value.
>    
#### displayZoneText

```c
void displayZoneText(uint8_t z, char *pText, textPosition_t align, uint16_t speed, uint16_t pause, textEffect_t effectIn, textEffect_t effectOut = PA_NO_EFFECT);
```
> *
> Easy start for a non-scrolling zone text display.
> 
> This method is a convenient way to set up a static text display within the
> specified zone. All the data necessary for setup is passed through as
> parameters and the display animation is started.
> 
> \param z		zone specified.
> \param pText	parameter suitable for the setTextBuffer() method.
> \param align	parameter suitable for the the setTextAlignment() method.
> \param speed	parameter suitable for the setSpeed() method.
> \param pause	parameter suitable for the setPause() method.
> \param	effectIn	parameter suitable for the setTextEffect() method.
> \param	effectOut	parameter suitable for the setTextEffect() method.
> \return No return value.
>    
#### getCharSpacing

```c
inline uint8_t getCharSpacing(void) { return _Z[0].getCharSpacing(); };
```
> *
> Get the inter-character spacing in columns.
> 
> \return the current setting for the space between characters in columns. Assumes one zone only.
>    
#### getCharSpacing

```c
inline uint8_t getCharSpacing(uint8_t z) { return (z < _numZones ? _Z[z].getCharSpacing() : 0); };
```
> *
> Get the inter-character spacing in columns for a specific zone.
> 
> \param z		zone number.
> \return the current setting for the space between characters in columns.
>    
#### getInvert

```c
inline bool getInvert(void) { return _Z[0].getInvert(); };
```
> *
> Get the current display invert state.
> 
> See the setInvert() method.
> 
> \return true if the display is inverted. Assumes one zone only.
>    
#### getInvert

```c
inline bool getInvert(uint8_t z) { return (z < _numZones ? _Z[z].getInvert() : false); };
```
> *
> Get the current display invert state for a specific zone.
> 
> See the setInvert() method.
> 
> \param z		zone number.
> \return the inverted boolean value for the specified zone.
>    
#### getPause

```c
inline uint16_t getPause(void) { return _Z[0].getPause(); };
```
> *
> Get the current pause time.
> 
> See the setPause() method. Assumes one zone only.
> 
> \return the pause value in milliseconds.
>    
#### getPause

```c
inline uint16_t getPause(uint8_t z) { return (z < _numZones ? _Z[z].getPause() : 0); };
```
> *
> Get the current pause time for a specific zone.
> 
> See the setPause() method.
> 
> \param z		zone number.
> \return the pause value in milliseconds for the specified zone.
>    
#### getScrollSpacing

```c
inline uint16_t getScrollSpacing(void) { return _Z[0].getScrollSpacing(); };
```
> *
> Get the horizontal scrolling spacing.
> 
> See the setScrollSpacing() method. Assumes one zone only
> 
> \return the speed value.
>    
#### getSpeed

```c
inline uint16_t getSpeed(void) { return _Z[0].getSpeed(); };
```
> *
> Get the current animation speed.
> 
> See the setSpeed() method. Assumes one zone only
> 
> \return the speed value.
>    
#### getSpeed

```c
inline uint16_t getSpeed(uint8_t z) { return (z < _numZones ? _Z[z].getSpeed() : 0); };
```
> *
> Get the current animation speed for the specified zone.
> 
> See the setSpeed() method.
> 
> \param z		zone number.
> \return the speed value for the specified zone.
>    
#### getTextAlignment

```c
inline textPosition_t getTextAlignment(void) { return _Z[0].getTextAlignment(); };
```
> *
> Get the current text alignment specification.
> 
> Assumes one zone only.
> 
> \return the current text alignment setting.
>    
#### getTextAlignment

```c
inline textPosition_t getTextAlignment(uint8_t z) { return (z < _numZones ? _Z[z].getTextAlignment() : PA_CENTER); };
```
> *
> Get the current text alignment specification for the specified zone.
> 
> \param z		zone number.
> \return the current text alignment setting for the specified zone.
>    
#### getZoneEffect

```c
inline boolean getZoneEffect(uint8_t z, zoneEffect_t ze) { return (z < _numZones ? _Z[z].getZoneEffect(ze) : false); };
```
> *
> Get the value of specified display effect.
> 
> The display effect is one of the zoneEffect_t types. The returned value will be
> true if the attribute is set, false if the attribute is not set.
> 
> \param z   zone number.
> \param ze  the required text alignment.
> \return true if the value is set, false otherwise.
>    
#### setCharSpacing

```c
void setCharSpacing(uint8_t cs) { for (uint8_t i=0; i<_numZones; i++) _Z[i].setCharSpacing(cs); };
```
> *
> Set the inter-character spacing in columns for all zones.
> 
> Set the number of blank columns between characters when they are displayed.
> 
> \param cs	space between characters in columns.
> \return No return value.
>    
#### setCharSpacing

```c
inline void setCharSpacing(uint8_t z, uint8_t cs) { if (z < _numZones) _Z[z].setCharSpacing(cs); };
```
> *
> Set the inter-character spacing in columns for the specified zone.
> 
> See comments for the 'all zones' variant of this method.
> 
> \param z	zone number.
> \param cs	space between characters in columns.
> \return No return value.
>    
#### setIntensity

```c
void setIntensity(uint8_t intensity) { for (uint8_t i=0; i<_numZones; i++) _Z[i].setIntensity(intensity); };
```
> *
> Set the display brightness for all the zones.
> 
> Set the intensity (brightness) of the display.
> 
> \param intensity	the intensity to set the display (0-15).
> \return No return value.
>    
#### setIntensity

```c
inline void setIntensity(uint8_t z, uint8_t intensity) { if (z < _numZones) _Z[z].setIntensity(intensity); };
```
> *
> Set the display brightness for the specified zone.
> 
> See comments for the 'all zones' variant of this method.
> 
> \param z			zone number.
> \param intensity	the intensity to set the display (0-15).
> \return No return value.
>    
#### setInvert

```c
void setInvert(uint8_t invert) { for (uint8_t i=0; i<_numZones; i++) _Z[i].setInvert(invert); };
```
> *
> Invert the display in all the zones.
> 
> Set the display to inverted (ON LED turns OFF and vice versa).
> 
> \param invert	true for inverted display, false for normal display
> \return No return value.
>    
#### setInvert

```c
inline void setInvert(uint8_t z, uint8_t invert) { if (z < _numZones) _Z[z].setInvert(invert); };
```
> *
> Invert the display in the specified zone.
> 
> See comments for the 'all zones' variant of this method.
> 
> \param z		zone number.
> \param invert	true for inverted display, false for normal display
> \return No return value.
>    
#### setPause

```c
void setPause(uint16_t pause) { for (uint8_t i=0; i<_numZones; i++) _Z[i].setPause(pause); };
```
> *
> Set the pause between ENTER and EXIT animations for all zones.
> 
> Between each entry and exit, the library will pause by the number of milliseconds
> specified to allow the viewer to read the message. For continuous scrolling displays
> this should be set to the same value as the display speed.
> 
> \param pause	the time, in milliseconds, between animations.
> \return No return value.
>    
#### setPause

```c
void setPause(uint8_t z, uint16_t pause) { if (z < _numZones) _Z[z].setPause(pause); };
```
> *
> Set the pause between ENTER and EXIT animations for the specified zone.
> 
> See comments for the 'all zones' variant of this method.
> 
> \param z		zone number.
> \param pause	the time, in milliseconds, between animations.
> \return No return value.
>    
#### setScrollSpacing

```c
void setScrollSpacing(uint16_t space) { for (uint8_t i=0; i<_numZones; i++) _Z[i].setScrollSpacing(space); };
```
> *
> Set the horizontal scrolling distance between messages for all the zones.
> 
> When scrolling horizontally, the distance between the end of one message and the
> start of the next can be set using this method. Default behavior is for the message
> to be fully off the display before the new message starts.
> Set to zero for default behavior.
> 
> \param space	the spacing, in columns, between messages; zero for default behaviour..
> \return No return value.
>    
#### setSpeed

```c
void setSpeed(uint16_t speed) { for (uint8_t i=0; i<_numZones; i++) _Z[i].setSpeed(speed); };
```
> *
> Set the animation frame speed for all zones.
> 
> The speed of the display is the 'tick' time between animation frames. The lower this time
> the faster the animation; set it to zero to run as fast as possible.
> 
> \param speed	the time, in milliseconds, between animation frames.
> \return No return value.
>    
#### setSpeed

```c
inline void setSpeed(uint8_t z, uint16_t speed) { if (z < _numZones) _Z[z].setSpeed(speed); };
```
> *
> Set the animation frame speed for the specified zone.
> 
> See comments for the 'all zones' variant of this method.
> 
> \param z		zone number.
> \param speed	the time, in milliseconds, between animation frames.
> \return No return value.
>    
#### setTextAlignment

```c
void setTextAlignment(textPosition_t ta) { for (uint8_t i=0; i<_numZones; i++) _Z[i].setTextAlignment(ta); };
```
> *
> Set the text alignment for all zones.
> 
> Text alignment is specified as one of the values in textPosition_t.
> 
> \param ta	the required text alignment.
> \return No return value.
>    
#### setTextAlignment

```c
inline void setTextAlignment(uint8_t z, textPosition_t ta) { if (z < _numZones) _Z[z].setTextAlignment(ta); };
```
> *
> Set the text alignment for the specified zone.
> 
> See comments for the 'all zones' variant of this method.
> 
> \param z	zone number.
> \param ta	the required text alignment.
> \return No return value.
>    
#### setTextBuffer

```c
void setTextBuffer(char *pb) { /*for (uint8_t i = 0; i<_numZones; i++) */_Z[0].setTextBuffer(pb); };
```
> *
> Set the pointer to the text buffer.
> 
> Sets the text buffer to be a pointer to user data. The library does not allocate
> any memory for the text message, rather it is the calling program that supplies
> a pointer to a buffer. This reduces memory requirements and offers the flexibility
> to keep a single buffer or rotate buffers with different messages, all under calling
> program control, with no library limit to the size or numbers of buffers. The text
> placed in the buffer must be properly terminated by the NUL ('\0') character or
> processing will overrun the end of the message.
> 
> This form of the method assumes one zone only.
> 
> \param pb	pointer to the text buffer to be used.
> \return No return value.
>    
#### setTextBuffer

```c
inline void setTextBuffer(uint8_t z, char *pb) { if (z < _numZones) _Z[z].setTextBuffer(pb); };
```
> *
> Set the pointer to the text buffer for the specified zone.
> 
> See comments for the single zone version of this method.
> 
> \param z	zone number.
> \param pb	pointer to the text buffer to be used.
> \return No return value.
>    
#### setTextEffect

```c
void setTextEffect(textEffect_t effectIn, textEffect_t effectOut) { for (uint8_t i = 0; i < _numZones; i++) _Z[i].setTextEffect(effectIn, effectOut); };
```
> *
> Set the entry and exit text effects for all zones.
> 
> The 'in' and 'out' text effects are specified using the textEffect_t enumerated
> type. If no effect is required, NO_EFFECT should be specified. NO_EFFECT
> is most useful when no exit effect is required (e.g., when DISSOLVE is used) and
> the entry effect is sufficient.
> 
> \param	effectIn	the entry effect, one of the textEffect_t enumerated values.
> \param	effectOut	the exit effect, one of the textEffect_t enumerated values.
> \return No return value.
>    
#### setTextEffect

```c
inline void setTextEffect(uint8_t z, textEffect_t effectIn, textEffect_t effectOut) { if (z < _numZones) _Z[z].setTextEffect(effectIn, effectOut); };
```
> *
> Set the entry and exit text effects for a specific zone.
> 
> See comments for the 'all zones' variant of this method.
> 
> \param z			zone number.
> \param	effectIn	the entry effect, one of the textEffect_t enumerated values.
> \param	effectOut	the exit effect, one of the textEffect_t enumerated values.
> \return No return value.
>    
#### setZoneEffect

```c
inline void setZoneEffect(uint8_t z, boolean b, zoneEffect_t ze) { if (z < _numZones) _Z[z].setZoneEffect(b, ze); };
```
> *
> Set the display effect for the specified zone.
> 
> The display effect is one of the zoneEffect_t types, and this will be set (true) or
> reset (false) depending on the boolean value. The resulting zone display will be
> modified as per the required effect.
> 
> \param z   zone number.
> \param b   set the value if true, reset the value if false
> \param ze  the required text alignment.
> \return No return value.
>    
#### synchZoneStart

```c
void synchZoneStart(void) { for (uint8_t i = 1; i < _numZones; i++) _Z[i].setSynchTime(_Z[0].getSynchTime()); }
```
> *
> Synchronise the start of zone animations.
> 
> When zones are set up, the animation start time will default
> to the set-up time. If several zones need to be animated
> in synchronised fashion (eg, they are visually stacked vertically),
> this method will ensure that all the zones start at the same instant.
> 
> \return No return value.
>   
#### addChar

```c
void addChar(uint8_t code, uint8_t *data) { for (uint8_t i=0; i<_numZones; i++) _Z[i].addChar(code, data); };
```
> *
> Add a user defined character to the replacement list for all zones.
> 
> Add a replacement characters to the user defined list. The character data must be
> the same as for a single character in the font definition file. If a character is
> specified with a code the same as an existing character the existing data will be
> substituted for the new data. A character code of 0 ('\0') is illegal as this
> denotes the end of string character for C++ and cannot be used in an actual string.
> 
> The library does not copy the data definition but only retains a pointer to the data,
> so any changes to the data storage in the calling program will be reflected into the
> library. The data must also remain in scope while it is being used.
> 
> \param code	ASCII code for the character data.
> \param data	pointer to the character data.
> \return No return value.
>    
#### addChar

```c
inline bool addChar(uint8_t z, uint8_t code, uint8_t *data) { return(z < _numZones ? _Z[z].addChar(code, data) : false); };
```
> *
> Add a user defined character to the replacement specified zone.
> 
> See the comments for the 'all zones' variant of this method
> 
> \param z		zone specified
> \param code	ASCII code for the character data.
> \param data	pointer to the character data.
> \return true of the character was inserted in the substitution list.
>    
#### delChar

```c
void delChar(uint8_t code) { for (uint8_t i=0; i<_numZones; i++) _Z[i].delChar(code); };
```
> *
> Delete a user defined character to the replacement list for all zones.
> 
> Delete a reference to a replacement character in the user defined list.
> 
> \param code	ASCII code for the character data.
> \return No return value.
>    
#### delChar

```c
inline bool delChar(uint8_t z, uint8_t code) { return(z < _numZones ? _Z[z].delChar(code) : false); };
```
> *
> Delete a user defined character to the replacement list for the specified zone.
> 
> See the comments for the 'all zones' variant of this method.
> 
> \param z		zone specified
> \param code	ASCII code for the character data.
> \return true of the character was found in the substitution list.
>    
#### setFont

```c
void setFont(MD_MAX72XX::fontType_t *fontDef) { for (uint8_t i=0; i<_numZones; i++) _Z[i].setZoneFont(fontDef); };
```
> *
> Set the display font for all zones.
> 
> Set the display font to a user defined font table. This can be created using the
> MD_MAX72xx font builder (refer to documentation for the tool and the MD_MAX72xx library).
> Passing nullptr resets to the library default font.
> 
> \param fontDef	Pointer to the font definition to be used.
> \return No return value.
>    
#### setFont

```c
inline void setFont(uint8_t z, MD_MAX72XX::fontType_t *fontDef) { if (z < _numZones) _Z[z].setZoneFont(fontDef); };
```
> *
> Set the display font for a specific zone.
> 
> Set the display font to a user defined font table. This can be created using the
> MD_MAX72xx font builder (refer to documentation for the tool and the MD_MAX72xx library).
> Passing nullptr resets to the library default font.
> 
> \param z		specified zone.
> \param fontDef	Pointer to the font definition to be used.
> \return No return value.
>    
#### write

```c
virtual size_t write(uint8_t c) { char sz[2]; sz[0] = c; sz[1] = '\0'; write(sz); return(1); }
```
> *
> Write a single character to the output display
> 
> Display a character when given the ASCII code for it. The character is
> converted to a string and the string printing function invoked.
> The LED display is designed for string based output, so it does not make much
> sense to do this. Creating the short string is a consistent way to way to handle
> single the character.
> 
> \param c	ASCII code for the character to write.
> \return the number of characters written.
>   
#### write

```c
virtual size_t write(const char *str);
```
> *
> Write a nul terminated string to the output display.
> 
> Display a nul terminated string when given a pointer to the char array.
> Invokes an animation using PA_PRINT with all other settings (alignment,
> speed, etc) taken from current defaults.
> This method also invokes the animation for the print and returns when that has
> finished, so it blocks while the printing is happening, which should be at least 
> one iteration of the wait loop.
> 
> \param str	Pointer to the nul terminated char array.
> \return the number of characters written.
>   
#### write

```c
virtual size_t write(const uint8_t *buffer, size_t size);
```
> *
> Write a character buffer to the output display.
> 
> Display a non-nul terminated string given a pointer to the buffer and
> the size of the buffer. The buffer is turned into a nul terminated string
> and the simple write() method is invoked. Memory is allocated and freed
> in this method to copy the string.
> 
> \param buffer	Pointer to the data buffer.
> \param size The number of bytes to write.
> \return the number of bytes written.
>   
