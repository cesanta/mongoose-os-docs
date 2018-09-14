# Neopixel
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/neopixel](https://github.com/mongoose-os-libs/neopixel) | [mgos_neopixel.h](https://github.com/mongoose-os-libs/neopixel/tree/master/include/mgos_neopixel.h) | &nbsp;  | [api_neopixel.js](https://github.com/mongoose-os-libs/neopixel/tree/master/mjs_fs/api_neopixel.js)         |




 ----- 
#### mgos_neopixel_create

```c
struct mgos_neopixel *mgos_neopixel_create(int pin, int num_pixels,
                                           enum mgos_neopixel_order order);
```
<div class="apidescr">

Create and return a NeoPixel strip object. Example:
```c
struct mgos_neopixel *mystrip = mgos_neopixel_create(
    5, 16, MGOS_NEOPIXEL_ORDER_GRB);
mgos_neopixel_set(mystrip, 0, 12, 34, 56);
mgos_neopixel_show(mystrip);

mgos_neopixel_clear(mystrip);
mgos_neopixel_set(mystrip, 1, 12, 34, 56);
mgos_neopixel_show(mystrip);
```
 
</div>
#### mgos_neopixel_set

```c
void mgos_neopixel_set(struct mgos_neopixel *np, int i, int r, int g, int b);
```
<div class="apidescr">

Set i-th pixel's RGB value. Each color (`r`, `g`, `b`) should be an integer
from 0 to 255; they are ints and not `uint8_t`s just for the FFI.

Note that this only affects in-memory value of the pixel; you'll need to
call `mgos_neopixel_show()` to apply changes.
 
</div>
#### mgos_neopixel_clear

```c
void mgos_neopixel_clear(struct mgos_neopixel *np);
```
<div class="apidescr">

Clear in-memory values of the pixels.
 
</div>
#### mgos_neopixel_show

```c
void mgos_neopixel_show(struct mgos_neopixel *np);
```
<div class="apidescr">

Output values of the pixels.
 
</div>
#### mgos_neopixel_free

```c
void mgos_neopixel_free(struct mgos_neopixel *np);
```
<div class="apidescr">

Free neopixel instance.
 
</div>

### JS API

 --- 
#### NeoPixel.create

```javascript
NeoPixel.create(pin, numPixels, order)
```
<div class="apidescr">
Create and return a NeoPixel strip object. Example:
```javascript
let pin = 5, numPixels = 16, colorOrder = NeoPixel.GRB;
let strip = NeoPixel.create(pin, numPixels, colorOrder);
strip.setPixel(0 /* pixel */, 12, 34, 56);
strip.show();

strip.clear();
strip.setPixel(1 /* pixel */, 12, 34, 56);
strip.show();
```
</div>
#### strip.setPixel

```javascript
strip.setPixel(i, r, g, b)
```
<div class="apidescr">
Set i-th's pixel's RGB value.
Note that this only affects in-memory value of the pixel.
</div>
#### strip.clear

```javascript
strip.clear()
```
<div class="apidescr">
Clear in-memory values of the pixels.
</div>
#### strip.show

```javascript
strip.show()
```
<div class="apidescr">
Output values of the pixels.
</div>
