# Send data directly to Google Spreadsheet


## Prepare Google Spreadsheet
- Create and empty Google spreadsheet
- Click on Tools / Script Editor, paste the following code:
  ```javascript
  function doPost(e) {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0];
    var row = JSON.parse(e.postData.contents) || []; // Parse POST data
    row.unshift(new Date());        // Add timestamp as a first field
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
- Click deploy. Copy the script URL, it should be in form
  https://script.google.com/macros/s/xxxxxxx/exec

## Add reporting logic to the firmware code

A firmware must send a POST request do the script URL.
A POST data must be a JSON array. Each element of the array will be inserted
into a spreadsheet in a separate column. For example, if a POST data
is `[1234, "hello"]`, then in a spreadsheet a new row will be inserted with
3 columns: timestamp, `1234`, and `"hello"`.

This is a minimal app that reports a single value (free RAM) to the spreadsheet:

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
