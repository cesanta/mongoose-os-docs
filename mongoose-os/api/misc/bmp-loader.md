# bmp-loader
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/bmp-loader](https://github.com/mongoose-os-libs/bmp-loader) | [mgos_bmp_loader.h](https://github.com/mongoose-os-libs/bmp-loader/blob/master/include/mgos_bmp_loader.h) | &nbsp;  | [api_bmp.js](https://github.com/mongoose-os-libs/bmp-loader/blob/master/mjs_fs/api_bmp.js)         |



This is a Mongoose OS library to use ["libbmpread"](https://lab.burn.capital/chaz/libbmpread) by Charles Lindsay "chazomaticus" seamlessly in Mongoose OS applications.

The third-party software is integrated without modification under the directory `third_party`. The documentation for the underlying lib can also be found in the `third_party` directory. The external library is 100% original and not changed (will be included as submodule in a future version), so it's easier to integrate updates later, if they show up.

### Be aware: this library might be subject of change, so use it at your own risk! ###

## Dependencies

This library has a dependency:

   - [libbmpread](https://lab.burn.capital/chaz/libbmpread)

## Documentation

### These functions are available via C calls:

   ```c
      // create the needed structure to hold the data:
      bmpread_t* mgos_bmp_loader_create(void)
      
      // load an BMP image
      bool mgos_bmp_loader_load(bmpread_t* p_bmp, const char* bmp_file, unsigned int flags)
   
      // free the allocated space
      void mgos_bmp_loader_free(bmpread_t* p_bmp)

      // get the plain data pointer of the image
      uint8_t* mgos_bmp_loader_get_data(bmpread_t* p_bmp)
   
      // get the width and height of the image (wrappers for FFI)
      uint32_t mgos_bmp_loader_get_width(bmpread_t* p_bmp)
      uint32_t mgos_bmp_loader_get_height(bmpread_t* p_bmp)

      // rotate the image in 90° steps
      bool mgos_bmp_loader_rotate(bmpread_t* p_bmp, uint16_t angle)
   ```

### A MJS API is included as well:

Include the API with 
   ```JavaScript
   load('api_bmp.js');
   ```
in your own MJS file like `ìnit.js`.

### These functions are available as MJS API calls:
```JavaScript
   // the object containing the API
   let BMP_LOADER = { ... };

   // create a new object with the needed structure
   create: function () { ... }
   
   // load a BMP file
   load: function (file, flags)  { ... }
   
   // free the underlying structure and the bitmap data
   free: function () { ... }
   
   // get a pointer to the raw bitmap data
   getData: function () { ... }
   
   // get a certain pixel of the bitmap as pointer to the bytes
   getPixel: function (x, y) { ... }
   
   // get the width of the image
   getWidth: function () { ... }
   
   // get the height of the image
   getHeight: function () {...}
```

 ----- 

### JS API

 --- 
#### bitmap.getPixel

```javascript
bitmap.getPixel(x, y)
```
Returns pixel's RGB value at pos x,y
