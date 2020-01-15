# SPI
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/spi](https://github.com/mongoose-os-libs/spi) | [mgos_spi.h](https://github.com/mongoose-os-libs/spi/blob/master/include/mgos_spi.h) | &nbsp;  | [api_spi.js](https://github.com/mongoose-os-libs/spi/blob/master/mjs_fs/api_spi.js)         |

This library provides SPI ([Serial Peripheral Interface](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface)) support for Mongoose OS.


 ----- 
#### mgos_spi_create

```c
struct mgos_spi *mgos_spi_create(const struct mgos_config_spi *cfg);
```
>  Initialize SPI master. 
#### mgos_spi_configure

```c
bool mgos_spi_configure(struct mgos_spi *spi,
                        const struct mgos_config_spi *cfg);
```
>  (Re)configure existing SPI interface. 
#### mgos_spi_run_txn

```c
bool mgos_spi_run_txn(struct mgos_spi *spi, bool full_duplex,
                      const struct mgos_spi_txn *txn);
```
> 
> Execute a half-duplex transaction. See `struct mgos_spi_txn` for the details
> on transaction params.
>  
#### mgos_spi_close

```c
void mgos_spi_close(struct mgos_spi *spi);
```
>  Close SPI handle. 
#### mgos_spi_get_global

```c
struct mgos_spi *mgos_spi_get_global(void);
```
>  Return global SPI bus handle which is configured via sysconfig. 

### JS API

 --- 
#### SPI.get

```javascript
SPI.get()
```
Get SPI bus handle. Return value: opaque pointer.
#### SPI.runTransaction

```javascript
SPI.runTransaction(spi, param)
```
Run SPI transaction, which might be a half-duplex or a full-duplex one.

Half-duplex transaction includes one or more of the following:
- Writing data,
- Waiting for dummy bytes,
- Reading data.

Full-duplex transaction performs writing and reading at the same time.

Whether the transaction is half-duplex or full-duplex is determined by
given params: if "fd" property is set, it's a full-duplex transaction;
otherwise "hd" property should be set (see details below).

`spi` is an SPI instance, e.g. the one returned by `SPI.get()`.
`param` is an object with the following parameters:

```javascript
{
  // Which CS line to use, 0, 1 or 2. use -1 to not assert any CS
  // during transaction, it is assumed to be done externally.
  // Note: this is not a GPIO number, mapping from cs to GPIO is set in
  // the device configuration.
  cs: 0,

  // Mode, 0-3. This controls clock phase and polarity.
  mode: 0,

  // Clock frequency to use. 0 means don't change.
  freq: 2000000,

  // Half-duplex transaction parameters
  hd: {
    // A string with data to transmit. If undefined, no data is transmitted.
    tx_data: "foobar",

    // Number of dummy bytes to wait for. If undefined, 0 is assumed.
    dummy_len: 1,

    // Number of bytes to read.
    rx_len: 3,
  },

  // Full-duplex transaction parameters
  fd: {
    // A string with data to transmit. Equal number of bytes will be read.
    tx_data: "foo",
  },
}
```

Return value: a string with the data read (an empty string if no read was
requested), or `false` in case of an error.
