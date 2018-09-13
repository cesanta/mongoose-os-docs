
I2C API.

See https://en.wikipedia.org/wiki/I%C2%B2C for the background information.
 
### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/i2c](https://github.com/mongoose-os-libs/i2c) | &nbsp; | &nbsp;  | &nbsp;         |


### C/С++ API
#### mgos_i2c_create

```c
struct mgos_i2c *mgos_i2c_create(const struct mgos_config_i2c *cfg);
```

Initialize I2C master with the given params. Typically clients don't need to
do that manually: mgos has a global I2C instance created with the params
given in system config, use `mgos_i2c_get_global()` to get the global
instance.

Example:
```c
const struct mgos_config_i2c cfg = {
  .enable: true,
  .freq: 400,
  .debug: 0,
  .sda_gpio: 13,
  .scl_gpio: 12,
};
struct mgos_i2c *myi2c = mgos_i2c_create(&cfg);
```
 
#### (

```c
#define MGOS_I2C_ADDR_CONTINUE ((uint16_t) -1)
```
 If this special address is passed to read or write, START is not generated
and address is not put on the bus. It is assumed that this is a continuation
of a previous operation which (after read or write with stop = false). 
#### mgos_i2c_read

```c
bool mgos_i2c_read(struct mgos_i2c *i2c, uint16_t addr, void *data, size_t len,
                   bool stop);
```

Read specified number of bytes from the specified address.
Address should not include the R/W bit. If addr is -1, START is not
performed.
If |stop| is true, then at the end of the operation bus will be released.
 
#### mgos_i2c_write

```c
bool mgos_i2c_write(struct mgos_i2c *i2c, uint16_t addr, const void *data,
                    size_t len, bool stop);
```

Write specified number of bytes from the specified address.
Address should not include the R/W bit. If addr is -1, START is not
performed.
If |stop| is true, then at the end of the operation bus will be released.
 
#### mgos_i2c_stop

```c
void mgos_i2c_stop(struct mgos_i2c *i2c);
```

Release the bus (when left unreleased after read or write).
 
#### mgos_i2c_get_freq

```c
int mgos_i2c_get_freq(struct mgos_i2c *i2c);
```

Get I2C interface frequency.
 
#### mgos_i2c_set_freq

```c
bool mgos_i2c_set_freq(struct mgos_i2c *i2c, int freq);
```

Set I2C interface frequency.
 
#### mgos_i2c_read_reg_b

```c
int mgos_i2c_read_reg_b(struct mgos_i2c *conn, uint16_t addr, uint8_t reg);
```

Helper for reading 1-byte register `reg` from a device at address `addr`.
In case of success return a numeric byte value from 0x00 to 0xff; otherwise
return -1.
 
#### mgos_i2c_read_reg_w

```c
int mgos_i2c_read_reg_w(struct mgos_i2c *conn, uint16_t addr, uint8_t reg);
```

Helper for reading 2-byte register `reg` from a device at address `addr`.
In case of success returns a numeric big-endian value: e.g. if 0x01, 0x02
was read from a device, 0x0102 will be returned.

In case of error returns -1.
 
#### mgos_i2c_read_reg_n

```c
bool mgos_i2c_read_reg_n(struct mgos_i2c *conn, uint16_t addr, uint8_t reg,
                         size_t n, uint8_t *buf);
```

Helper for reading `n`-byte register value from a device. Returns true on
success, false on error. Data is written to `buf`, which should be large
enough.
 
#### mgos_i2c_write_reg_b

```c
bool mgos_i2c_write_reg_b(struct mgos_i2c *conn, uint16_t addr, uint8_t reg,
                          uint8_t value);
```

Helper for writing 1-byte register `reg` to a device at address `addr`.
Returns `true` in case of success, `false` otherwise.
 
#### mgos_i2c_write_reg_w

```c
bool mgos_i2c_write_reg_w(struct mgos_i2c *conn, uint16_t addr, uint8_t reg,
                          uint16_t value);
```

Helper for writing 2-byte register `reg` to a device at address `addr`.
The value is big-endian: e.g. if `value` is `0x0102`, then `0x01, 0x02`
will be written.
Returns `true` in case of success, `false` otherwise.
 
#### mgos_i2c_write_reg_n

```c
bool mgos_i2c_write_reg_n(struct mgos_i2c *conn, uint16_t addr, uint8_t reg,
                          size_t n, const uint8_t *buf);
```

Helper for writing `n`-byte register `reg` to a device at address `addr`.
Returns `true` in case of success, `false` otherwise.
 
#### mgos_i2c_close

```c
void mgos_i2c_close(struct mgos_i2c *conn);
```
 Close i2c connection and free resources. 
#### mgos_i2c_get_global

```c
struct mgos_i2c *mgos_i2c_get_global(void);
```
 Return i2c bus handle that is set up via the sysconfig. 

### JS API
#### I2C.get

```javascript
I2C.get()
```
Get I2C bus handle. Return value: opaque pointer.
#### I2C.close

```javascript
I2C.close(handle)
```
Close I2C handle. Return value: none.
#### I2C.write

```javascript
I2C.write(handle, addr, buf, size, stop)
```
Send a byte array to I2C.
If stop is true, the bus will be released at the end.
Return value: success, true/false.
#### I2C.read

```javascript
I2C.read(handle, addr, len, stop)
```
Read specified number of bytes from the specified address.
If stop is true, the bus will be released at the end.
Return value: null on error, string with data on success. Example:
```javascript
let data = I2C.read(bus, 31, 3, true);  // Read 3 bytes
if (data) print(JSON.stringify([data.at(0), data.at(1), data.at(2)]));
```
#### I2C.stop

```javascript
I2C.stop(handle)
```
Set i2c Stop condition. Releases the bus.
Return value: none.
#### I2C.readRegB

```javascript
I2C.readRegB(handle, addr, reg)
```
Read 1-byte register `reg` from the device at address `addr`; in case of
success return a numeric byte value from 0x00 to 0xff; otherwise return
-1. Example:
```javascript
// Read 1 byte from the register 0x40 of the device at the address 0x12
let val = I2C.readRegB(bus, 0x12, 0x40);
if (val >= 0) print(val);
```
#### I2C.readRegW

```javascript
I2C.readRegW(handle, addr, reg)
```
Read 2-byte register `reg` from the device at address `addr`; in case of
success return a numeric value; e.g. if 0x01, 0x02 was read from a device,
0x0102 will be returned. In case of a failure return -1.
```javascript
// Read 2 bytes from the register 0x40 of the device at the address 0x12
let val = I2C.readRegW(bus, 0x12, 0x40);
if (val >= 0) print(val);
```
#### I2C.readRegN

```javascript
I2C.readRegN(handle, addr, reg, num)
```
Read N-byte register `reg` from the device at address `addr`. In case of
success return a string with data; otherwise return an empty string.

E.g. if 0x61, 0x62, 0x63 was read from a device, "abc" will be returned.
You can get numeric values using `at(n)`, e.g. `"abc".at(0)` is `0x61`.

```javascript
// Read 7 bytes from the register 0x40 of the device at the address 0x12
let buf = I2C.readRegN(bus, 0x12, 0x40, 7);
if (buf != "") for (let i = 0; i < buf.length; i++) { print(buf.at(i)); }
```
#### I2C.writeRegB

```javascript
I2C.writeRegB(handle, addr, reg, val)
```
Write numeric `val` (from 0x00 to 0xff) into 1-byte register `reg` at
address `addr`.  Return `true` on success, `false` on failure.
```javascript
// Write a byte 0x55 to the register 0x40 of the device at the address 0x12
let result = I2C.writeRegB(bus, 0x12, 0x40, 0x55);
if (result) print('success') else print('failure');
```
#### I2C.writeRegW

```javascript
I2C.writeRegW(handle, addr, reg, val)
```
Write numeric `val` into 2-byte register `reg` at address `addr`. E.g.
if `val` is `0x0102`, then `0x01, 0x02` will be written.
Return `true` on success, `false` on failure.
```javascript
// Write a [0x55, 0x66] to the register 0x40 of the device at the address 0x12
let result = I2C.writeRegW(bus, 0x12, 0x40, 0x5566);
if (result) print('success') else print('failure');
```
#### I2C.writeRegN

```javascript
I2C.writeRegN(handle, addr, reg, n, buf)
```
Write n first bytes of the string `buf` into the  register `reg` at
address `addr`. E.g.  if `buf` is `"abc"`, then `0x61, 0x62, 0x63` will be
written.
Return `true` on success, `false` on failure.
```javascript
// Write a [0x55, 0x66, 0x77] to the register 0x40 of the device at the address 0x12
let result = I2C.writeRegN(bus, 0x12, 0x40, 3, "\x55\x66\x77");
if (result) print('success') else print('failure');
```
