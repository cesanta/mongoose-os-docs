# ADC
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/adc](https://github.com/mongoose-os-libs/adc) | [mgos_adc.h](https://github.com/mongoose-os-libs/adc/tree/master/include/mgos_adc.h) | &nbsp;  | [api_adc.js](https://github.com/mongoose-os-libs/adc/tree/master/mjs_fs/api_adc.js)         |

This library implements a [analog-to-digital conversion](https://en.wikipedia.org/wiki/Analog-to-digital_converter) for Mongoose OS.


 ----- 
#### mgos_adc_enable

```c
bool mgos_adc_enable(int pin);
```
 Configure and enable ADC 
#### mgos_adc_read

```c
int mgos_adc_read(int pin);
```
 Read from the analog pin. Returns raw value. 
#### mgos_adc_read_voltage

```c
int mgos_adc_read_voltage(int pin);
```

Read from the specified analog pin.
Returns voltage on the pin, in mV.
 

### JS API

 --- 
#### ADC.enable

```javascript
ADC.enable(pin)
```
Configure and enable ADC for a `pin`,
return 1 if success, 0 otherwise.
#### ADC.read

```javascript
ADC.read(pin)
```
Read `pin` analog value, return an integer.

Note for ESP8266 platform:
with this function, you can also measure the power voltage
of VDD33 pin 3 and 4. Then:
1) TOUT pin has to be floating in the circuit
	(not connected to anything);
2) In mos.yaml must be set this feature:
	build_vars:
		MGOS_ADC_MODE_VDD: 1
3) The return value may be different in different Wi-Fi modes,
	for example, in Modem-sleep mode or in normal Wi-Fi working
	mode.
Return value: Power voltage of VDD33; unit: 1/1024 V.
