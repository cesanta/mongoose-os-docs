# VFS (SPIFFS)
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/vfs-fs-spiffs](https://github.com/mongoose-os-libs/vfs-fs-spiffs) | [mgos_vfs_fs_spiffs.h](https://github.com/mongoose-os-libs/vfs-fs-spiffs/tree/master/include/mgos_vfs_fs_spiffs.h) | &nbsp;  | &nbsp;         |




 ----- 
#### mgos_vfs_fs_spiffs_enc_name

```c
bool mgos_vfs_fs_spiffs_enc_name(const char *name, char *enc_name,
                                 size_t enc_name_size);
bool mgos_vfs_fs_spiffs_dec_name(const char *enc_name, char *name,
                                 size_t name_size);
```

Name encrypotion/decryption routines.
Source and destination can be the same, both must be at least
SPIFFS_OBJ_NAME_LEN bytes long. Outputs are guaranteed to be
NUL-terminated.
 
#### mgos_vfs_fs_spiffs_encrypt_block

```c
bool mgos_vfs_fs_spiffs_encrypt_block(spiffs_obj_id obj_id, uint32_t offset,
                                      void *data, uint32_t len);
bool mgos_vfs_fs_spiffs_decrypt_block(spiffs_obj_id obj_id, uint32_t offset,
                                      void *data, uint32_t len);
#endif
```
 Functions that must be provided by the platform 
