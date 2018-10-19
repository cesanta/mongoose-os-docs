# Supported hardware

Mongoose OS supports the following microcontrollers:

|  Vendor  | Microcontrollers |
| -------  | --------------- | 
| STMicroelectronics | STM32L4, STM32F4, STM32F7 series |
| Texas Instruments | CC3220, CC3200 |
| Espressif Systems | ESP32, ESP8266   |

## Development boards reference

#### STM32 B-L475E-IOT01A

<div class="row pb-4">
  <div class="col-md-8">
    <table class="my-0">
      <tr><th class="small">Capabilities</th><td>WiFi, BT, 868 RF, NFC, 128k RAM, 1M Flash</td></tr>
      <tr><th class="small">Flash demo-js app</th><td><pre>mos flash stm32-B-L475E-IOT01A</pre></td></tr>
      <tr><th class="small">Build an app</th><td><pre>mos build --platform stm32 --board B-L475E-IOT01A</pre></td></tr>
    </table>
  </div>
  <div class="col-md-4">
    <img class="img-fluid mh-100 mw-100" src="/mongoose-os-docs/quickstart/images/stm32_iot01a.png" />
    <a target="_blank" href="https://www.mouser.ie/ProductDetail/STMicroelectronics/B-L475E-IOT01A2?qs=sGAEpiMZZMtw0nEwywcFgLsaY7JiSlO%2fppdYl3jRSsNnt9SKMZclVw%3d%3d">Buy on mouser.com</a>
  </div>
</div>

#### STM32 NUCLEO-F746ZG

<div class="row pb-4">
  <div class="col-md-8">
    <table class="my-0">
      <tr><th class="small">Capabilities</th><td>Ethernet, 320k RAM, 1M Flash</td></tr>
      <tr><th class="small">Flash demo-js app</th><td><pre>mos flash stm32</pre></td></tr>
      <tr><th class="small">Build an app</th><td><pre>mos build --platform stm32 --board NUCLEO-F746ZG</pre></td></tr>
    </table>
  </div>
    <div class="col-md-4">
    <img class="img-fluid mh-100 mw-100" src="images/nucleo-f746zg.png" />
    <a target="_blank" href="https://www.mouser.ie/ProductDetail/STMicroelectronics/NUCLEO-F746ZG?qs=sGAEpiMZZMtw0nEwywcFgCOvL%2fCIMT%2f2w01SZnal1Ngwgxcd9gFiJw%3d%3d">Buy on mouser.com</a>
  </div>
</div>

#### TI CC3220SF LaunchPad

<div class="row pb-4">
  <div class="col-md-8">
    <table class="my-0">
      <tr><th class="small">Capabilities</th><td>WiFi, 256k RAM, 1M Flash</td></tr>
      <tr><th class="small">Flash demo-js app</th><td><pre>mos flash cc3220</pre></td></tr>
      <tr><th class="small">Build an app</th><td><pre>mos build --platform cc3220</pre></td></tr>
    </table>
  </div>
  <div class="col-md-4">
    <img class="img-fluid mh-100 mw-100" src="images/cc3220.png" />
    <a target="_blank" href="https://www.mouser.ie/ProductDetail/Texas-Instruments/LAUNCHCC3220MODASF?qs=%2fha2pyFadujqlJX34r9ZGoAmtkXcNzJj%252bZ4VZVBUJdhvqS35TYOi%252bA%3d%3d">Buy on mouser.com</a>
  </div>
</div>

#### ESP32 PICO-D4-KIT

<div class="row pb-4">
  <div class="col-md-8">
    <table class="my-0">
      <tr><th class="small">Capabilities</th><td>WiFi, BT, 520k RAM, 4M Flash</td></tr>
      <tr><th class="small">Flash demo-js app</th><td><pre>mos flash esp32</pre></td></tr>
      <tr><th class="small">Build custom app</th><td><pre>mos build --platform esp32</pre></td></tr>
    </table>
  </div>
  <div class="col-md-4">
    <img class="img-fluid mh-100 mw-100" src="images/esp32-pico-kit.png" />
    <a target="_blank" href="https://www.mouser.ie/ProductDetail/Espressif-Systems/ESP32-PICO-KIT?qs=%2fha2pyFadug%252b4OsJtZ6BWCK54algBDG2cu7MN2ivj8E%3d">Buy on mouser.com</a>
  </div>
</div>

#### ESP8266 NodeMCU

<div class="row pb-4">
  <div class="col-md-8">
    <table class="my-0">
      <tr><th class="small">Capabilities</th><td>WiFi, 96k RAM, 4M Flash</td></tr>
      <tr><th class="small">Flash demo-js app</th><td><pre>mos flash esp8266</pre></td></tr>
      <tr><th class="small">Build an app</th><td><pre>mos build --platform esp8266</pre></td></tr>
    </table>
  </div>
    <div class="col-md-4">
    <img class="img-fluid mh-100 mw-100" src="images/nodemcu.png" />
    <a target="_blank" href="https://www.aliexpress.com/wholesale?SearchText=nodemcu">Buy on aliexpress.com</a>
  </div>
</div>

#### ESP32 Devkit-C

<div class="row pb-4">
  <div class="col-md-8">
    <table class="my-0">
      <tr><th class="small">Capabilities</th><td>WiFi, BT, 520k RAM, 4M Flash</td></tr>
      <tr><th class="small">Flash demo-js app</th><td><pre>mos flash esp32</pre></td></tr>
      <tr><th class="small">Build an app</th><td><pre>mos build --platform esp32</pre></td></tr>
    </table>
  </div>
    <div class="col-md-4">
    <img class="img-fluid mh-100 mw-100" src="images/esp32-devkitc.png" />
    <a target="_blank" href="https://www.mouser.ie/All-Manufacturers/_/N-0?Keyword=esp32-devkit-c">Buy on mouser.com</a>
  </div>
</div>

#### ESP32 ODROID-GO

<div class="row pb-4">
  <div class="col-md-8">
    <table class="my-0">
      <tr><th class="small">Capabilities</th><td>WiFi, BT, 2.4" TFT, 4MB PSRAM, 16M Flash, SD card, Battery, Speaker, 10 Buttons, Powerswitch</td></tr>
      <tr><th class="small">Flash demo-js app</th><td>First, download <a href="odroid-go/conf3.json">conf3.json from here</a>. Then, <pre class="mt-2">mos flash esp32<br>mos put conf3.json</pre></td></tr>
      <tr><th class="small">Build an app</th><td><pre>mos build --platform esp32</pre></td></tr>
    </table>
  </div>
    <div class="col-md-4">
    <img class="img-fluid mh-50 mw-100" src="images/odroid-go.png" style="max-height: 200px;" />
    <a target="_blank" href="https://www.hardkernel.com/main/shop/good_list.php?lang=en">Buy on hardkernel.com</a>
  </div>
</div>
