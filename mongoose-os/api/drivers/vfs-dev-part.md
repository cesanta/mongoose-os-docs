# VFS (another device)
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/vfs-dev-part](https://github.com/mongoose-os-libs/vfs-dev-part) | [mgos_vfs_dev_part.h](https://github.com/mongoose-os-libs/vfs-dev-part/tree/master/include/mgos_vfs_dev_part.h) | &nbsp;  | &nbsp;         |



## Example

```c
vfs_dev_create("big0part", "{\"dev\": \"big0\", \"offset\": 32768, \"size\": 65536}");
```


 ----- 
