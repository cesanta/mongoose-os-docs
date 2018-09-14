# String
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mg_str.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mg_str.h) | [mg_str.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mg_str.c)  | &nbsp;         |

#### mg_mk_str

```c
struct mg_str mg_mk_str(const char *s);
```
<div class="apidescr">

Helper function for creating mg_str struct from plain C string.
`NULL` is allowed and becomes `{NULL, 0}`.
 
</div>
#### mg_mk_str_n

```c
struct mg_str mg_mk_str_n(const char *s, size_t len);
```
<div class="apidescr">

Like `mg_mk_str`, but takes string length explicitly.
 
</div>
#### MG_MK_STR

```c
#define MG_MK_STR(str_literal) \
  { str_literal, sizeof(str_literal) - 1 }
#define MG_NULL_STR \
  { NULL, 0 }
```
<div class="apidescr">
 Macro for initializing mg_str. 
</div>
#### mg_vcmp

```c
int mg_vcmp(const struct mg_str *str2, const char *str1);
```
<div class="apidescr">

Cross-platform version of `strcmp()` where where first string is
specified by `struct mg_str`.
 
</div>
#### mg_vcasecmp

```c
int mg_vcasecmp(const struct mg_str *str2, const char *str1);
```
<div class="apidescr">

Cross-platform version of `strncasecmp()` where first string is
specified by `struct mg_str`.
 
</div>
#### mg_strdup

```c
struct mg_str mg_strdup(const struct mg_str s);
```
<div class="apidescr">
 Creates a copy of s (heap-allocated). 
</div>
#### mg_strdup_nul

```c
struct mg_str mg_strdup_nul(const struct mg_str s);
```
<div class="apidescr">

Creates a copy of s (heap-allocated).
Resulting string is NUL-terminated (but NUL is not included in len).
 
</div>
#### mg_strchr

```c
const char *mg_strchr(const struct mg_str s, int c);
```
<div class="apidescr">

Locates character in a string.
 
</div>
#### mg_strcmp

```c
int mg_strcmp(const struct mg_str str1, const struct mg_str str2);
```
<div class="apidescr">

Compare two `mg_str`s; return value is the same as `strcmp`.
 
</div>
#### mg_strncmp

```c
int mg_strncmp(const struct mg_str str1, const struct mg_str str2, size_t n);
```
<div class="apidescr">

Like `mg_strcmp`, but compares at most `n` characters.
 
</div>
#### mg_strstr

```c
const char *mg_strstr(const struct mg_str haystack, const struct mg_str needle);
```
<div class="apidescr">

Finds the first occurrence of a substring `needle` in the `haystack`.
 
</div>
#### mg_strstrip

```c
struct mg_str mg_strstrip(struct mg_str s);
```
<div class="apidescr">
 Strip whitespace at the start and the end of s 
</div>
