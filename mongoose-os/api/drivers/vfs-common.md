# VFS
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/vfs-common](https://github.com/mongoose-os-libs/vfs-common) | [mgos_vfs.h](https://github.com/mongoose-os-libs/vfs-common/tree/master/include/mgos_vfs.h) | &nbsp;  | &nbsp;         |

VFS subsystem multiplexes calls to libc file API methods such as open,
read, write and close between (potentially) several filesystems attached
at different mount points.

A filesystem is backed by a device which supports block reads and writes.


 ----- 
#### MGOS_VFS_VFD_TO_FS_FD

```c
#define MGOS_VFS_VFD_TO_FS_FD(vfd) ((vfd) &0xff)
```
>  Convert virtual fd to filesystem-specific fd 
#### (

```c
#define MMAP_NUM_MASK ((1 << MMAP_NUM_BITS) - 1)
#define MMAP_ADDR_MASK ((1 << MMAP_ADDR_BITS) - 1)
```
> 
> Platform-dependent header should define the following macros:
> 
> - MMAP_BASE: base address for mmapped points; e.g. ((void *) 0x10000000)
> - MMAP_END:  end address for mmapped points; e.g. ((void *) 0x20000000)
> 
> So with the example values given above, the range 0x10000000 - 0x20000000 is
> used for all mmapped areas. We need to partition it further, by choosing the
> optimal tradeoff between the max number of mmapped areas and the max size
> of the mmapped area. Within the example range, we have 28 bits, and we
> need to define two more macros which will define how these bits are used:
> 
> - MMAP_ADDR_BITS: how many bits are used for the address within each
>   mmapped area;
> - MMAP_NUM_BITS: how many bits are used for the number of mmapped area.
>  
#### mgos_vfs_mmap_descs_cnt

```c
int mgos_vfs_mmap_descs_cnt(void);
```
> 
> Returns total number of allocated mmap descriptors (not all of them might be
> used at the moment)
>  
#### mgos_vfs_mmap_desc_get

```c
struct mgos_vfs_mmap_desc *mgos_vfs_mmap_desc_get(int idx);
#endif /* CS_MMAP */
```
> 
> Returns mmap descriptor at the given index
>  
#### mgos_vfs_fs_register_type

```c
bool mgos_vfs_fs_register_type(const char *type,
                               const struct mgos_vfs_fs_ops *ops);
```
>  Register fielsystem type and make it available for use in mkfs and mount. 
#### mgos_vfs_mkfs

```c
bool mgos_vfs_mkfs(const char *dev_type, const char *dev_opts,
                   const char *fs_type, const char *fs_opts);
```
> 
> Create a filesystem.
> First a device is created with given type and options and then filesystem
> is created on it. Device and filesystem types must've been previosuly
> registered and options have device and filesystem-specific format
> and usually are JSON objects.
>  
#### mgos_vfs_mkfs_dev

```c
bool mgos_vfs_mkfs_dev(struct mgos_vfs_dev *dev, const char *fs_type,
                       const char *fs_opts);
bool mgos_vfs_mkfs_dev_name(const char *dev_name, const char *fs_type,
                            const char *fs_opts);
```
>  Create a filesystem on an existing device. 
#### mgos_vfs_mount

```c
bool mgos_vfs_mount(const char *path, const char *dev_type,
                    const char *dev_opts, const char *fs_type,
                    const char *fs_opts);
```
> 
> Mount a filesystem.
> First a device is created with given type and options and then filesystem
> is mounted from it and attached to the VFS at a given path.
> Path must start with a "/" and consist of one component, e.g. "/mnt".
> Nested mounts are not currently supported, so "/mnt/foo" is not ok.
> Device and filesystem types must've been previosly registered and options
> have device and filesystem-specific format and usually are JSON objects.
>  
#### mgos_vfs_mount_dev_name

```c
bool mgos_vfs_mount_dev_name(const char *path, const char *dev_name,
                             const char *fs_type, const char *fs_opts);
```
> 
> Mount a filesystem from an existing device.
>  
#### mgos_vfs_umount

```c
bool mgos_vfs_umount(const char *path);
```
> 
> Unmount a previously mounted filesystem.
> Only filesystems with no open files can be unmounted.
>  
#### mgos_vfs_umount_all

```c
void mgos_vfs_umount_all(void);
```
> 
> Unmount all the filesystems, regardless of open files.
> Done only on reboot.
>  
#### mgos_vfs_get_space_total

```c
size_t mgos_vfs_get_space_total(const char *path);
```
> 
> Get FS size of a file system at the specified mountpoint.
>  
#### mgos_vfs_get_space_free

```c
size_t mgos_vfs_get_space_free(const char *path);
```
> 
> Get free spece of a file system at the specified mountpoint.
>  
#### mgos_vfs_gc

```c
bool mgos_vfs_gc(const char *path);
```
> 
> Perform GC of a filesystem at the specified mountpoint.
>  
#### mgos_vfs_hal_mount

```c
bool mgos_vfs_hal_mount(const char *path, struct mgos_vfs_fs *fs);
```
> 
> Platform implementation must ensure that paths prefixed with "path" are
> routed to "fs" and file descriptors are translated appropriately.
>  
#### mgos_realpath

```c
char *mgos_realpath(const char *path, char *resolved_path);
```
> 
> Clean up path, see realpath(3).
>  
#### mgos_vfs_open

```c
int mgos_vfs_open(const char *filename, int flags, int mode);
int mgos_vfs_close(int vfd);
ssize_t mgos_vfs_read(int vfd, void *dst, size_t len);
ssize_t mgos_vfs_write(int vfd, const void *src, size_t len);
int mgos_vfs_stat(const char *path, struct stat *st);
int mgos_vfs_fstat(int vfd, struct stat *st);
off_t mgos_vfs_lseek(int vfd, off_t offset, int whence);
int mgos_vfs_unlink(const char *path);
int mgos_vfs_rename(const char *src, const char *dst);
#if MG_ENABLE_DIRECTORY_LISTING
DIR *mgos_vfs_opendir(const char *path);
struct dirent *mgos_vfs_readdir(DIR *pdir);
int mgos_vfs_closedir(DIR *pdir);
#endif
```
>  libc API 
