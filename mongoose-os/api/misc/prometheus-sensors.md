# prometheus-sensors
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/prometheus-sensors](https://github.com/mongoose-os-libs/prometheus-sensors) | [mgos_prometheus_sensors.h](https://github.com/mongoose-os-libs/prometheus-sensors/blob/master/include/mgos_prometheus_sensors.h) | &nbsp;  | &nbsp;         |



This is a library that implements a set of sensor types, reading their values
periodically and exposing them to Prometheus using the `prometheus-metrics`
library.

## Supported Sensors

### DHT 

This is using `dht` library; each sensor reading takes approximately 32ms (28ms
if there is no sensor on the GPIO in). They are placed on timers so as to
minimize pre-emption of the main application. DHT sensors are polled in order
based on `sensors.dht_gpio` pins and with a period of `sensors.dht_period`
which defaults to 3 seconds.

Please see the upstream [source](https://github.com/mongoose-os-libs/dht)
for more information on the driver.

Reported values (all types are gauges):
```
temperature{sensor="0",type="DHT"} 3.5
temperature{sensor="1",type="DHT"} 6.2
humidity{sensor="0",type="DHT"} 43.900002
humidity{sensor="1",type="DHT"} 35.599998
```

### VEML6075

This is using `veml6075-i2c` library; one sensor is allowed based on I2C
address on the bus, normally `0x10`, but configurable with `sensors.veml6075_i2caddr`
in `mos.yml`.  The chip is polled with a period of `sensors.veml6075_period`
which defaults to 3 seconds, each sensor reading takes approximately 15ms.

Please see the upstream [source](https://github.com/mongoose-os-libs/veml6075-i2c)
for more information on the driver.

Reported values (all types are gauges):
```
UV{band="UVA",sensor="0",type="VEML6075"} 0
UV{band="UVB",sensor="0",type="VEML6075"} 2
UVIndex{sensor="0",type="VEML6075"} 0.00125
```

### BME280

This is using `bme280` library; one sensor is allowed based on I2C
address on the bus, normally `0x10`, but configurable with `sensors.bme280_i2caddr`
in `mos.yml`.  The chip is polled with a period of `sensors.bme280_period`
which defaults to 3 seconds, each sensor reading takes approximately 4ms.
Note that there are several versions of this popular barometer chip: BME280
is fully fledged and includes a hygrometer (measuring the relative humidity),
while BMP280 does not.

Please see the upstream [source](https://github.com/mongoose-os-libs/bme280)
for more information on the driver.

Reported values (all types are gauges):
```
temperature{sensor="0",type="BME280"} 18.4
humidity{sensor="0",type="BME280"} 77.4
pressure{sensor="0",type="BME280"} 96720.4
```

### MCP9808

This is using `mcp9808-i2c` library; one sensor is allowed based on I2C
address on the bus, normally `0x18`, but configurable with `sensors.mcp9808_i2caddr`
in `mos.yml`.  The chip is polled with a period of `sensors.mcp9808_period`
which defaults to 3 seconds, each sensor reading takes approximately 3ms.

Please see the upstream [source](https://github.com/mongoose-os-libs/mcp9808-i2c)
for more information on the driver.

Reported values (all types are gauges):
```
temperature{sensor="0",type="MCP9808"} 18.6
```

### Si7021

This is using `si7021-i2c` library; one sensor is allowed based on I2C
address on the bus, normally `0x40`, but configurable with `sensors.si7021_i2caddr`
in `mos.yml`.  The chip is polled with a period of `sensors.si7021_period`
which defaults to 3 seconds, each sensor reading takes approximately 54ms.

Please see the upstream [source](https://github.com/mongoose-os-libs/si7021-i2c)
for more information on the driver.

Reported values (all types are gauges):
```
temperature{sensor="0",type="SI7021"} 18.6
humidity{sensor="0",type="SI7021"} 56.4
```

### SHT31

This is using `sht31-i2c` library; one sensor is allowed based on I2C
address on the bus, normally `0x44`, but configurable with `sensors.sht31_i2caddr`
in `mos.yml`.  The chip is polled with a period of `sensors.sht31_period`
which defaults to 3 seconds, each sensor reading takes approximately 18ms.

Please see the upstream [source](https://github.com/mongoose-os-libs/si7021-i2c)
for more information on the driver.

Reported values (all types are gauges):
```
temperature{sensor="0",type="SHT31"} 18.6
humidity{sensor="0",type="SHT31"} 56.4
```

### HTU21D-F

This is using `htu21df-i2c` library; one sensor is allowed based on I2C
address on the bus, normally `0x40`, but configurable with `sensors.htu21df_i2caddr`
in `mos.yml`.  The chip is polled with a period of `sensors.htu21df_period`
which defaults to 3 seconds, each sensor reading takes approximately 105ms.

Please see the upstream [source](https://github.com/mongoose-os-libs/htu21df-i2c)
for more information on the driver.

Reported values (all types are gauges):
```
temperature{sensor="0",type="HTU21DF"} 18.5
humidity{sensor="0",type="HTU21DF"} 55.8
```

### CCS811

This is using `ccs811-i2c` library; one sensor is allowed based on I2C
address on the bus, normally `0x5A`, but configurable with `sensors.ccs811_i2caddr`
in `mos.yml`.  The chip is polled with a period of `sensors.ccs811_period`
which defaults to 3 seconds, each sensor reading takes approximately 5ms.

Please see the upstream [source](https://github.com/mongoose-os-libs/ccs811-i2c)
for more information on the driver.

Reported values (all types are gauges):
```
eco2{sensor="0",type="CCS811"} 7992
tvoc{sensor="0",type="CCS811"} 1156
```

# Disclaimer

This project is not an official Google project. It is not supported by Google
and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.



 ----- 
