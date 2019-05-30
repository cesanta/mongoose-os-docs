# Logging
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [cs_dbg.h](https://github.com/cesanta/mongoose-os/tree/master/include/cs_dbg.h) | [cs_dbg.c](https://github.com/cesanta/mongoose-os/tree/master/src/cs_dbg.c)  | &nbsp;         |

#### cs_log_set_level

```c
void cs_log_set_level(enum cs_log_level level);
```
> 
> Set max log level to print; messages with the level above the given one will
> not be printed.
>  
#### cs_log_set_file_level

```c
void cs_log_set_file_level(const char *file_level);
```
> 
> A comma-separated set of prefix=level.
> prefix is matched against the log prefix exactly as printed, including line
> number, but partial match is ok. Check stops on first matching entry.
> If nothing matches, default level is used.
> 
> Examples:
>   main.c:=4 - everything from main C at verbose debug level.
>   mongoose.c=1,mjs.c=1,=4 - everything at verbose debug except mg_* and mjs_*
> 
>  
#### cs_log_print_prefix

```c
int cs_log_print_prefix(enum cs_log_level level, const char *fname, int line);
```
> 
> Helper function which prints message prefix with the given `level`.
> If message should be printed (according to the current log level
> and filter), prints the prefix and returns 1, otherwise returns 0.
> 
> Clients should typically just use `LOG()` macro.
>  
#### cs_log_set_file

```c
void cs_log_set_file(FILE *file);
```
> 
> Set file to write logs into. If `NULL`, logs go to `stderr`.
>  
#### cs_log_printf

```c
void cs_log_printf(const char *fmt, ...) PRINTF_LIKE(1, 2);
```
> 
> Prints log to the current log file, appends "\n" in the end and flushes the
> stream.
>  
#### LOG

```c
#define LOG(l, x)                                     \
  do {                                                \
    if (cs_log_print_prefix(l, __FILE__, __LINE__)) { \
      cs_log_printf x;                                \
    }                                                 \
  } while (0)
```
> 
> Format and print message `x` with the given level `l`. Example:
> 
> ```c
> LOG(LL_INFO, ("my info message: %d", 123));
> LOG(LL_DEBUG, ("my debug message: %d", 123));
> ```
>  
#### DBG

```c
#define DBG(x) LOG(LL_VERBOSE_DEBUG, x)
```
> 
> Shortcut for `LOG(LL_VERBOSE_DEBUG, (...))`
>  
#### DBG

```c
#define DBG(x)
```
>  NDEBUG 
#### LOG

```c
#define LOG(l, x)
#define DBG(x)
```
>  CS_ENABLE_STDIO 
