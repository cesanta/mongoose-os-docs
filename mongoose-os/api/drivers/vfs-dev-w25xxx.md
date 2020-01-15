# VFS (Winbond W25XXX)
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/vfs-dev-w25xxx](https://github.com/mongoose-os-libs/vfs-dev-w25xxx) | [mgos_vfs_dev_w25xxx.h](https://github.com/mongoose-os-libs/vfs-dev-w25xxx/blob/master/include/mgos_vfs_dev_w25xxx.h) | &nbsp;  | &nbsp;         |



This is a VFS device driver for [Winbond W25 series](http://www.winbond.com/hq/product/code-storage-flash-memory/serial-nand-flash/) SPI NAND flash chips.
W25N01 and W25M02 (2Gb multi-die version) are supported.


 ----- 
#### w25xxx_remap_block

```c
bool w25xxx_remap_block(struct mgos_vfs_dev *dev, size_t bad_off,
                        size_t good_off);
```
> 
> Adds a bad block lookup table entry.
> NB: Both offsets are raw, with no bb_reserve correction.
>  
