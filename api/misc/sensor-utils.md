# Sensor utilities
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/sensor-utils](https://github.com/mongoose-os-libs/sensor-utils) | [](https://github.com/mongoose-os-libs/sensor-utils/tree/master/include/) | &nbsp;  | &nbsp;         |

# A Library of Utility Functions for Mongoose OS apps with Sensors


## Overview

A collection of C-functions with JS wrappers that make it convenient to calculate derived quantities (e.g. dew point temperature),
convert between different units of measure, and perform simple statistics on arrays of (double precision)
values.

### Typical usage pattern:

in _**mos.yml**_, add to **libs:** section,

`  - origin: https://github.com/mongoose-os-libs/sensor-utils `
  
in your _**init.js**_, add something like the following,

```javascript
load('api_sensor_utils.js');
```

and (here is example usage that tests the API),

```javascript
print('Test api_sensor_utils.js          ');


//Initialize a statistics object (handle)

let StatsObj = SensorUtils.initStatistics(4);

// add some numbers (e.g. obtained from sensor readings)

SensorUtils.addDataValue( StatsObj, 5.51 );
SensorUtils.addDataValue( StatsObj, 8.43 );
SensorUtils.addDataValue( StatsObj, 6.77 );
SensorUtils.addDataValue( StatsObj, 4.33 );
SensorUtils.addDataValue( StatsObj, 6.20 );
SensorUtils.addDataValue( StatsObj, 7.18 );
SensorUtils.addDataValue( StatsObj, 4.92 );
SensorUtils.addDataValue( StatsObj, 5.89 );

print('Statistics:  ',SensorUtils.calculateStatistics(StatsObj));

// other convenience functions.

print('SensorUtils.fahrenheit(0.0) -> ',SensorUtils.fahrenheit(0.0));
print('SensorUtils.celsius(32.0) -> ',SensorUtils.celsius(32.0));
print('SensorUtils.inchesHg(101325) -> ',SensorUtils.inchesHg(101325));
print('SensorUtils.mmHg(101325) -> ',SensorUtils.mmHg(101325));
print('SensorUtils.atmospheresHg(29.9213) -> ',SensorUtils.atmospheresHg(29.9213));
print('SensorUtils.atmospheresP(101325) -> ',SensorUtils.atmospheresP(101325));
print('SensorUtils.lengthF(1/12) -> ',SensorUtils.lengthF(1.0/12.0));
print('SensorUtils.computeDewpoint(4.6, 50.89) -> ',SensorUtils.computeDewpoint(4.6, 50.89));
print('SensorUtils.computeAltitude(103245.5, 101325.0) -> ',SensorUtils.computeAltitude(103245.5, 101325.0));
```
Executing the above JS code on an ESP32 typically gives the following output:

```
[Jan 17 08:35:35.996] Test api_sensor_utils.js

[Jan 17 08:35:36.183] Statistics:   {"samples":8, "length":8, "mean":6.1538, "std_deviation":1.3065, "data":[ 5.5100, 8.4300, 6.7700, 4.3300, 6.2000, 7.1800, 4.9200, 5.8900 ]  },

[Jan 17 08:35:36.214] SensorUtils.fahrenheit(0.0) ->  32
[Jan 17 08:35:36.226] SensorUtils.celsius(32.0) ->  0
[Jan 17 08:35:36.239] SensorUtils.inchesHg(101325) ->  29.921252
[Jan 17 08:35:36.255] SensorUtils.mmHg(101325) ->  1.178002
[Jan 17 08:35:36.268] SensorUtils.atmospheresHg(29.9213) ->  1.000043
[Jan 17 08:35:36.282] SensorUtils.atmospheresP(101325) ->  1
[Jan 17 08:35:36.295] SensorUtils.lengthF((2.54/100.0) * 12) ->  1.000000
[Jan 17 08:35:36.313] SensorUtils.computeDewpoint(4.6, 50.89) ->  -4.634330
[Jan 17 08:35:36.330] SensorUtils.computeAltitude(103245.5, 101325.0) ->  -158.677439

```


 ----- 
