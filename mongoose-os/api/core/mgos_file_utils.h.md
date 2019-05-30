# mgos_file_utils.h
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mgos_file_utils.h](https://github.com/cesanta/mongoose-os/tree/master/include/mgos_file_utils.h) | [mgos_file_utils.c](https://github.com/cesanta/mongoose-os/tree/master/src/mgos_file_utils.c)  | &nbsp;         |

#### mgos_file_copy

```c
bool mgos_file_copy(const char *from, const char *to);
```
>  Copy a file 
#### mgos_file_digest

```c
bool mgos_file_digest(const char *fname, mbedtls_md_type_t dt, uint8_t *digest);
```
>  Compute file's digest. *digest must have enough space for the digest type. 
#### mgos_file_copy_if_different

```c
bool mgos_file_copy_if_different(const char *from, const char *to);
```
>  Copy the file if target does not exist or is different. 
