# JSON
### Github repo links
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/frozen](https://github.com/cesanta/frozen) | [frozen.h](https://github.com/cesanta/frozen/tree/master/frozen.h) | [frozen.c](https://github.com/cesanta/frozen/tree/master/frozen.c)  |          |


### C/С++ API
#### (*json_walk_callback_t)

```c
typedef void (*json_walk_callback_t)(void *callback_data, const char *name,
                                     size_t name_len, const char *path,
                                     const struct json_token *token);
```

Callback-based SAX-like API.

Property name and length is given only if it's available: i.e. if current
event is an object's property. In other cases, `name` is `NULL`. For
example, name is never given:
  - For the first value in the JSON string;
  - For events JSON_TYPE_OBJECT_END and JSON_TYPE_ARRAY_END

E.g. for the input `{ "foo": 123, "bar": [ 1, 2, { "baz": true } ] }`,
the sequence of callback invocations will be as follows:

- type: JSON_TYPE_OBJECT_START, name: NULL, path: "", value: NULL
- type: JSON_TYPE_NUMBER, name: "foo", path: ".foo", value: "123"
- type: JSON_TYPE_ARRAY_START,  name: "bar", path: ".bar", value: NULL
- type: JSON_TYPE_NUMBER, name: "0", path: ".bar[0]", value: "1"
- type: JSON_TYPE_NUMBER, name: "1", path: ".bar[1]", value: "2"
- type: JSON_TYPE_OBJECT_START, name: "2", path: ".bar[2]", value: NULL
- type: JSON_TYPE_TRUE, name: "baz", path: ".bar[2].baz", value: "true"
- type: JSON_TYPE_OBJECT_END, name: NULL, path: ".bar[2]", value: "{ \"baz\":
true }"
- type: JSON_TYPE_ARRAY_END, name: NULL, path: ".bar", value: "[ 1, 2, {
\"baz\": true } ]"
- type: JSON_TYPE_OBJECT_END, name: NULL, path: "", value: "{ \"foo\": 123,
\"bar\": [ 1, 2, { \"baz\": true } ] }"
 
#### json_walk

```c
int json_walk(const char *json_string, int json_string_length,
              json_walk_callback_t callback, void *callback_data);
```

Parse `json_string`, invoking `callback` in a way similar to SAX parsers;
see `json_walk_callback_t`.
Return number of processed bytes, or a negative error code.
 
#### json_printf

```c
int json_printf(struct json_out *, const char *fmt, ...);
int json_vprintf(struct json_out *, const char *fmt, va_list ap);
```

Generate formatted output into a given sting buffer.
This is a superset of printf() function, with extra format specifiers:
 - `%B` print json boolean, `true` or `false`. Accepts an `int`.
 - `%Q` print quoted escaped string or `null`. Accepts a `const char *`.
 - `%.*Q` same as `%Q`, but with length. Accepts `int`, `const char *`
 - `%V` print quoted base64-encoded string. Accepts a `const char *`, `int`.
 - `%H` print quoted hex-encoded string. Accepts a `int`, `const char *`.
 - `%M` invokes a json_printf_callback_t function. That callback function
 can consume more parameters.

Return number of bytes printed. If the return value is bigger than the
supplied buffer, that is an indicator of overflow. In the overflow case,
overflown bytes are not printed.
 
#### json_fprintf

```c
int json_fprintf(const char *file_name, const char *fmt, ...);
int json_vfprintf(const char *file_name, const char *fmt, va_list ap);
```

Same as json_printf, but prints to a file.
File is created if does not exist. File is truncated if already exists.
 
#### json_asprintf

```c
char *json_asprintf(const char *fmt, ...);
char *json_vasprintf(const char *fmt, va_list ap);
```

Print JSON into an allocated 0-terminated string.
Return allocated string, or NULL on error.
Example:

```c
  char *str = json_asprintf("{a:%H}", 3, "abc");
  printf("%s\n", str);  // Prints "616263"
  free(str);
```
 
#### json_printf_array

```c
int json_printf_array(struct json_out *, va_list *ap);
```

Helper %M callback that prints contiguous C arrays.
Consumes void *array_ptr, size_t array_size, size_t elem_size, char *fmt
Return number of bytes printed.
 
#### json_scanf

```c
int json_scanf(const char *str, int str_len, const char *fmt, ...);
int json_vscanf(const char *str, int str_len, const char *fmt, va_list ap);
```

Scan JSON string `str`, performing scanf-like conversions according to `fmt`.
This is a `scanf()` - like function, with following differences:

1. Object keys in the format string may be not quoted, e.g. "{key: %d}"
2. Order of keys in an object is irrelevant.
3. Several extra format specifiers are supported:
   - %B: consumes `int *` (or `char *`, if `sizeof(bool) == sizeof(char)`),
      expects boolean `true` or `false`.
   - %Q: consumes `char **`, expects quoted, JSON-encoded string. Scanned
      string is malloc-ed, caller must free() the string.
   - %V: consumes `char **`, `int *`. Expects base64-encoded string.
      Result string is base64-decoded, malloced and NUL-terminated.
      The length of result string is stored in `int *` placeholder.
      Caller must free() the result.
   - %H: consumes `int *`, `char **`.
      Expects a hex-encoded string, e.g. "fa014f".
      Result string is hex-decoded, malloced and NUL-terminated.
      The length of the result string is stored in `int *` placeholder.
      Caller must free() the result.
   - %M: consumes custom scanning function pointer and
      `void *user_data` parameter - see json_scanner_t definition.
   - %T: consumes `struct json_token *`, fills it out with matched token.

Return number of elements successfully scanned & converted.
Negative number means scan error.
 
#### (*json_scanner_t)

```c
typedef void (*json_scanner_t)(const char *str, int len, void *user_data);
```
 json_scanf's %M handler  
#### json_scanf_array_elem

```c
int json_scanf_array_elem(const char *s, int len, const char *path, int index,
                          struct json_token *token);
```

Helper function to scan array item with given path and index.
Fills `token` with the matched JSON token.
Return -1 if no array element found, otherwise non-negative token length.
 
#### json_unescape

```c
int json_unescape(const char *src, int slen, char *dst, int dlen);
```

Unescape JSON-encoded string src,slen into dst, dlen.
src and dst may overlap.
If destination buffer is too small (or zero-length), result string is not
written but the length is counted nevertheless (similar to snprintf).
Return the length of unescaped string in bytes.
 
#### json_escape

```c
int json_escape(struct json_out *out, const char *str, size_t str_len);
```

Escape a string `str`, `str_len` into the printer `out`.
Return the number of bytes printed.
 
#### json_fread

```c
char *json_fread(const char *file_name);
```

Read the whole file in memory.
Return malloc-ed file content, or NULL on error. The caller must free().
 
#### json_setf

```c
int json_setf(const char *s, int len, struct json_out *out,
              const char *json_path, const char *json_fmt, ...);
```

Update given JSON string `s,len` by changing the value at given `json_path`.
The result is saved to `out`. If `json_fmt` == NULL, that deletes the key.
If path is not present, missing keys are added. Array path without an
index pushes a value to the end of an array.
Return 1 if the string was changed, 0 otherwise.

Example:  s is a JSON string { "a": 1, "b": [ 2 ] }
  json_setf(s, len, out, ".a", "7");     // { "a": 7, "b": [ 2 ] }
  json_setf(s, len, out, ".b", "7");     // { "a": 1, "b": 7 }
  json_setf(s, len, out, ".b[]", "7");   // { "a": 1, "b": [ 2,7 ] }
  json_setf(s, len, out, ".b", NULL);    // { "a": 1 }
 
#### json_prettify

```c
int json_prettify(const char *s, int len, struct json_out *out);
```

Pretty-print JSON string `s,len` into `out`.
Return number of processed bytes in `s`.
 
#### json_prettify_file

```c
int json_prettify_file(const char *file_name);
```

Prettify JSON file `file_name`.
Return number of processed bytes, or negative number of error.
On error, file content is not modified.
 
#### json_next_key

```c
void *json_next_key(const char *s, int len, void *handle, const char *path,
                    struct json_token *key, struct json_token *val);
```

Iterate over an object at given JSON `path`.
On each iteration, fill the `key` and `val` tokens. It is OK to pass NULL
for `key`, or `val`, in which case they won't be populated.
Return an opaque value suitable for the next iteration, or NULL when done.

Example:

```c
void *h = NULL;
struct json_token key, val;
while ((h = json_next_key(s, len, h, ".foo", &key, &val)) != NULL) {
  printf("[%.*s] -> [%.*s]\n", key.len, key.ptr, val.len, val.ptr);
}
```
 
#### json_next_elem

```c
void *json_next_elem(const char *s, int len, void *handle, const char *path,
                     int *idx, struct json_token *val);
```

Iterate over an array at given JSON `path`.
Similar to `json_next_key`, but fills array index `idx` instead of `key`.
 
