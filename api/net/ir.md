# IR (infrared)
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/ir](https://github.com/mongoose-os-libs/ir) | [mgos_ir.h](https://github.com/mongoose-os-libs/ir/tree/master/include/mgos_ir.h) | &nbsp;  | [api_ir.js](https://github.com/mongoose-os-libs/ir/tree/master/mjs_fs/api_ir.js)         |

# IR protocol library

## Usage

Either

### src/main.c

```c
#include "mgos.h"
#include "mgos_ir.h"

static void irrecv_cb(int code, void *arg)
{
  LOG(LL_INFO, ("IR: %08X", code));
  (void) arg;
}

enum mgos_app_init_result mgos_app_init(void)
{
  // TSOP on pin 14, NEC protocol
  mgos_irrecv_nec_create(14, irrecv_cb, NULL);

  return MGOS_APP_INIT_SUCCESS;
}
```

or

### fs/init.js

```js
load("api_ir.js");

// TSOP on pin 14, NEC protocol
let ir = IR.Receiver.NEC.create(14, function(code) {
    print("IR", code);
}, null);
```


 ----- 
#### mgos_irrecv_nec_create

```c
struct mgos_irrecv_nec_s *mgos_irrecv_nec_create(
  int pin,
  void (*cb)(int, void *),
  void *userdata
);
```

Create an object instance of IR receiver for NEC protocol.
Return value: an object with the methods described below.
 
#### mgos_irrecv_nec_close

```c
void mgos_irrecv_nec_close(struct mgos_irrecv_nec_s *obj);
```

Destroy an object instance of IR receiver for NEC protocol.
 
#### mgos_irsend_nec

```c
void mgos_irsend_nec(int pin, int code, bool tsop);
```

Send IR code for NEC protocol.
Params:
pin:  GPIO number.
code: 32-bit code.
tsop: mode: true - mimic TSOP signal, false - drive real IR led at 38 kHz.
 

### JS API

 --- 
#### IR.Receiver.NEC.create

```javascript
IR.Receiver.NEC.create(pin, callback, userdata)
```
Create an object instance of IR receiver for NEC protocol.
Return value: an object with the methods described below.
#### myIR.close

```javascript
myIR.close()
```
Close receiver handle. Return value: none.
#### IR.Sender.NEC.pwm

```javascript
IR.Sender.NEC.pwm(pin, code)
```
Send NEC IR code via real IR led. Return value: none.
#### IR.Sender.NEC.tsop

```javascript
IR.Sender.NEC.tsop(pin, code)
```
Mimic TSOP receiver: drive a pin as if it would be connected to a TSOP receiver. Return value: none.
