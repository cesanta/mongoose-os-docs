# Send data directly to Google Spreadsheet


## Prepare Google Spreadsheet
- Create and empty Google spreadsheet
- Click on Tools / Script Editor, paste the following code:
  ```javascript
    function doPost(e) {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0];
    var row = JSON.parse(e.postData.contents) || [];
    row.unshift(new Date());  // Add timestamp
    var r = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
    r.setValues([row]);
    return ContentService.createTextOutput('');
  }
  ```
- Click "save".  Choose a name if prompted
- In the menu, choose Publish / Deploy as web app.
  Choose Project version: "New", Execute the app as: "Me", Who has
  access: "Everyone, even anonymous". Click deploy
- On Authorization prompt, click "Review permissions", allow this application
  to see, edit, create and delete spreadsheets
- Click deploy. Copy the app URL, it should be in form
  https://script.google.com/macros/s/xxxxxxx/exec

## Add reporting logic to the firmware code

This is a minimal app that reports free RAM to the spreadsheet:

```c
#include "mgos.h"

const char *s_url = "https://script.google.com/macros/s/xxxxxxx/exec";

static void timer_cb(void *arg) {
  char buf[100];
  struct json_out out = JSON_OUT_BUF(buf, sizeof(buf));
  json_printf(&out, "[%d]", mgos_get_free_heap_size());
  mg_connect_http(mgos_get_mgr(), NULL, NULL, s_url, NULL, buf);
  (void) arg;
}

enum mgos_app_init_result mgos_app_init(void) {
  mgos_set_timer(3000, MGOS_TIMER_REPEAT, timer_cb, NULL);
  return MGOS_APP_INIT_SUCCESS;
}
```
