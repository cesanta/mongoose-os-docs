# ATCA
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/atca](https://github.com/mongoose-os-libs/atca) | [mgos_atca.h](https://github.com/mongoose-os-libs/atca/tree/master/include/mgos_atca.h) | &nbsp;  | &nbsp;         |



This is a HAL implementation for the Atmel/Microchip CryptoAuthLib. It
translates ATCA interface calls into MGOS API calls. Currently only I2C is
implemented.


 ----- 
#### mbedtls_atca_is_available

```c
bool mbedtls_atca_is_available();
```
 Invoked from mbedTLS during ECDH phase of the handshake. 
