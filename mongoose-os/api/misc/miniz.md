# Miniz compression
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/miniz](https://github.com/mongoose-os-libs/miniz) | [miniz.h](https://github.com/mongoose-os-libs/miniz/blob/master/include/miniz.h) | &nbsp;  | &nbsp;         |



## Overview

Provides support for reading and writing ZIP archives.

This is the version 2.0.7 of the library, obtained from [here](https://github.com/richgel999/miniz/releases/tag/2.0.7).

## License

MIT 3-clause:

```
Copyright 2013-2014 RAD Game Tools and Valve Software
Copyright 2010-2014 Rich Geldreich and Tenacious Software LLC

All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```


 ----- 
 miniz.c 2.0.7 - public domain deflate/inflate, zlib-subset, ZIP reading/writing/appending, PNG writing
   See "unlicense" statement at the end of this file.
   Rich Geldreich <richgel99@gmail.com>, last updated Oct. 13, 2013
   Implements RFC 1950: http://www.ietf.org/rfc/rfc1950.txt and RFC 1951: http://www.ietf.org/rfc/rfc1951.txt

   Most API's defined in miniz.c are optional. For example, to disable the archive related functions just define
   MINIZ_NO_ARCHIVE_APIS, or to get rid of all stdio usage define MINIZ_NO_STDIO (see the list below for more macros).
Low-level Deflate/Inflate implementation notes:

     Compression: Use the "tdefl" API's. The compressor supports raw, static, and dynamic blocks, lazy or
     greedy parsing, match length filtering, RLE-only, and Huffman-only streams. It performs and compresses
     approximately as well as zlib.

     Decompression: Use the "tinfl" API's. The entire decompressor is implemented as a single function
     coroutine: see tinfl_decompress(). It supports decompression into a 32KB (or larger power of 2) wrapping buffer, or into a memory
     block large enough to hold the entire file.

     The low-level tdefl/tinfl API's do not make any use of dynamic memory allocation.
zlib-style API notes:

     miniz.c implements a fairly large subset of zlib. There's enough functionality present for it to be a drop-in
     zlib replacement in many apps:
        The z_stream struct, optional memory allocation callbacks
        deflateInit/deflateInit2/deflate/deflateReset/deflateEnd/deflateBound
        inflateInit/inflateInit2/inflate/inflateEnd
        compress, compress2, compressBound, uncompress
        CRC-32, Adler-32 - Using modern, minimal code size, CPU cache friendly routines.
        Supports raw deflate streams or standard zlib streams with adler-32 checking.

     Limitations:
      The callback API's are not implemented yet. No support for gzip headers or zlib static dictionaries.
      I've tried to closely emulate zlib's various flavors of stream flushing and return status codes, but
      there are no guarantees that miniz.c pulls this off perfectly.
PNG writing: See the tdefl_write_image_to_png_file_in_memory() function, originally written by
     Alex Evans. Supports 1-4 bytes/pixel images.
ZIP archive API notes:

     The ZIP archive API's where designed with simplicity and efficiency in mind, with just enough abstraction to
     get the job done with minimal fuss. There are simple API's to retrieve file information, read files from
     existing archives, create new archives, append new files to existing archives, or clone archive data from
     one archive to another. It supports archives located in memory or the heap, on disk (using stdio.h),
     or you can specify custom file read/write callbacks.

     - Archive reading: Just call this function to read a single file from a disk archive:

      void *mz_zip_extract_archive_file_to_heap(const char *pZip_filename, const char *pArchive_name,
        size_t *pSize, mz_uint zip_flags);

     For more complex cases, use the "mz_zip_reader" functions. Upon opening an archive, the entire central
     directory is located and read as-is into memory, and subsequent file access only occurs when reading individual files.

     - Archives file scanning: The simple way is to use this function to scan a loaded archive for a specific file:

     int mz_zip_reader_locate_file(mz_zip_archive *pZip, const char *pName, const char *pComment, mz_uint flags);

     The locate operation can optionally check file comments too, which (as one example) can be used to identify
     multiple versions of the same file in an archive. This function uses a simple linear search through the central
     directory, so it's not very fast.

     Alternately, you can iterate through all the files in an archive (using mz_zip_reader_get_num_files()) and
     retrieve detailed info on each file by calling mz_zip_reader_file_stat().

     - Archive creation: Use the "mz_zip_writer" functions. The ZIP writer immediately writes compressed file data
     to disk and builds an exact image of the central directory in memory. The central directory image is written
     all at once at the end of the archive file when the archive is finalized.

     The archive writer can optionally align each file's local header and file data to any power of 2 alignment,
     which can be useful when the archive will be read from optical media. Also, the writer supports placing
     arbitrary data blobs at the very beginning of ZIP archives. Archives written using either feature are still
     readable by any ZIP tool.

     - Archive appending: The simple way to add a single file to an archive is to call this function:

      mz_bool mz_zip_add_mem_to_archive_file_in_place(const char *pZip_filename, const char *pArchive_name,
        const void *pBuf, size_t buf_size, const void *pComment, mz_uint16 comment_size, mz_uint level_and_flags);

     The archive will be created if it doesn't already exist, otherwise it'll be appended to.
     Note the appending is done in-place and is not an atomic operation, so if something goes wrong
     during the operation it's possible the archive could be left without a central directory (although the local
     file headers and file data will be fine, so the archive will be recoverable).

     For more complex archive modification scenarios:
     1. The safest way is to use a mz_zip_reader to read the existing archive, cloning only those bits you want to
     preserve into a new archive using using the mz_zip_writer_add_from_zip_reader() function (which compiles the
     compressed file data as-is). When you're done, delete the old archive and rename the newly written archive, and
     you're done. This is safe but requires a bunch of temporary disk space or heap memory.

     2. Or, you can convert an mz_zip_reader in-place to an mz_zip_writer using mz_zip_writer_init_from_reader(),
     append new files as needed, then finalize the archive which will write an updated central directory to the
     original archive. (This is basically what mz_zip_add_mem_to_archive_file_in_place() does.) There's a
     possibility that the archive's central directory could be lost with this method if anything goes wrong, though.

     - ZIP archive support limitations:
     No zip64 or spanning support. Extraction functions can only handle unencrypted, stored or deflated files.
     Requires streams capable of seeking.
This is a header file library, like stb_image.c. To get only a header file, either cut and paste the
     below header, or create miniz.h, #define MINIZ_HEADER_FILE_ONLY, and then include miniz.c from it.
Important: For best perf. be sure to customize the below macros for your target platform:
     #define MINIZ_USE_UNALIGNED_LOADS_AND_STORES 1
     #define MINIZ_LITTLE_ENDIAN 1
     #define MINIZ_HAS_64BIT_REGISTERS 1
On platforms using glibc, Be sure to "#define _LARGEFILE64_SOURCE 1" before including miniz.c to ensure miniz
     uses the 64-bit variants: fopen64(), stat64(), etc. Otherwise you won't be able to process large files
     (i.e. 32-bit stat() fails for me on files > 0x7FFFFFFF bytes).


 ----- 
#### defined

```c
#if defined(__TINYC__) && (defined(__linux) || defined(__linux__))
/* TODO: Work around "error: include file 'sys\utime.h' when compiling with tcc on Linux */
#define MINIZ_NO_TIME
#endif
```
> #define MINIZ_NO_MALLOC 
#### mz_free

```c
void mz_free(void *p);
```
>  mz_free() internally uses the MZ_FREE() macro (which by default calls free() unless you've modified the MZ_MALLOC macro) to release a block allocated from the heap. 
#### mz_adler32

```c
mz_ulong mz_adler32(mz_ulong adler, const unsigned char *ptr, size_t buf_len);
```
>  mz_adler32() returns the initial adler-32 value to use when called with ptr==NULL. 
#### mz_crc32

```c
mz_ulong mz_crc32(mz_ulong crc, const unsigned char *ptr, size_t buf_len);
```
>  mz_crc32() returns the initial CRC-32 value to use when called with ptr==NULL. 
#### (*mz_alloc_func)

```c
typedef void *(*mz_alloc_func)(void *opaque, size_t items, size_t size);
typedef void (*mz_free_func)(void *opaque, void *address);
typedef void *(*mz_realloc_func)(void *opaque, void *address, size_t items, size_t size);
```
>  Heap allocation callbacks.
> Note that mz_alloc_func parameter types purpsosely differ from zlib's: items/size is size_t, not unsigned long. 
#### mz_version

```c
const char *mz_version(void);
```
>  Returns the version string of miniz.c. 
#### mz_deflateInit

```c
int mz_deflateInit(mz_streamp pStream, int level);
```
>   MZ_MEM_ERROR on out of memory. 
#### mz_deflateInit2

```c
int mz_deflateInit2(mz_streamp pStream, int level, int method, int window_bits, int mem_level, int strategy);
```
>    mem_level must be between [1, 9] (it's checked but ignored by miniz.c) 
#### mz_deflateReset

```c
int mz_deflateReset(mz_streamp pStream);
```
>  Quickly resets a compressor without having to reallocate anything. Same as calling mz_deflateEnd() followed by mz_deflateInit()/mz_deflateInit2(). 
#### mz_deflate

```c
int mz_deflate(mz_streamp pStream, int flush);
```
>    MZ_BUF_ERROR if no forward progress is possible because the input and/or output buffers are empty. (Fill up the input buffer or free up some output space and try again.) 
#### mz_deflateEnd

```c
int mz_deflateEnd(mz_streamp pStream);
```
>   MZ_STREAM_ERROR if the stream is bogus. 
#### mz_deflateBound

```c
mz_ulong mz_deflateBound(mz_streamp pStream, mz_ulong source_len);
```
>  mz_deflateBound() returns a (very) conservative upper bound on the amount of data that could be generated by deflate(), assuming flush is set to only MZ_NO_FLUSH or MZ_FINISH. 
#### mz_compress

```c
int mz_compress(unsigned char *pDest, mz_ulong *pDest_len, const unsigned char *pSource, mz_ulong source_len);
int mz_compress2(unsigned char *pDest, mz_ulong *pDest_len, const unsigned char *pSource, mz_ulong source_len, int level);
```
>  Returns MZ_OK on success, or one of the error codes from mz_deflate() on failure. 
#### mz_compressBound

```c
mz_ulong mz_compressBound(mz_ulong source_len);
```
>  mz_compressBound() returns a (very) conservative upper bound on the amount of data that could be generated by calling mz_compress(). 
#### mz_inflateInit

```c
int mz_inflateInit(mz_streamp pStream);
```
>  Initializes a decompressor. 
#### mz_inflateInit2

```c
int mz_inflateInit2(mz_streamp pStream, int window_bits);
```
>  window_bits must be MZ_DEFAULT_WINDOW_BITS (to parse zlib header/footer) or -MZ_DEFAULT_WINDOW_BITS (raw deflate). 
#### mz_inflate

```c
int mz_inflate(mz_streamp pStream, int flush);
```
>    with more input data, or with more room in the output buffer (except when using single call decompression, described above). 
#### mz_inflateEnd

```c
int mz_inflateEnd(mz_streamp pStream);
```
>  Deinitializes a decompressor. 
#### mz_uncompress

```c
int mz_uncompress(unsigned char *pDest, mz_ulong *pDest_len, const unsigned char *pSource, mz_ulong source_len);
```
>  Returns MZ_OK on success, or one of the error codes from mz_inflate() on failure. 
#### mz_error

```c
const char *mz_error(int err);
```
>  Returns a string description of the specified error code, or NULL if the error code is invalid. 
#### tdefl_compress_mem_to_heap

```c
void *tdefl_compress_mem_to_heap(const void *pSrc_buf, size_t src_buf_len, size_t *pOut_len, int flags);
```
>   The caller must free() the returned block when it's no longer needed. 
#### tdefl_compress_mem_to_mem

```c
size_t tdefl_compress_mem_to_mem(void *pOut_buf, size_t out_buf_len, const void *pSrc_buf, size_t src_buf_len, int flags);
```
>  Returns 0 on failure. 
#### tdefl_write_image_to_png_file_in_memory_ex

```c
void *tdefl_write_image_to_png_file_in_memory_ex(const void *pImage, int w, int h, int num_chans, size_t *pLen_out, mz_uint level, mz_bool flip);
void *tdefl_write_image_to_png_file_in_memory(const void *pImage, int w, int h, int num_chans, size_t *pLen_out);
```
>   The caller must mz_free() the returned heap block (which will typically be larger than *pLen_out) when it's no longer needed. 
#### (*tdefl_put_buf_func_ptr)

```c
typedef mz_bool (*tdefl_put_buf_func_ptr)(const void *pBuf, int len, void *pUser);
```
>  Output stream interface. The compressor uses this interface to write compressed data. It'll typically be called TDEFL_OUT_BUF_SIZE at a time. 
#### tdefl_compress_mem_to_output

```c
mz_bool tdefl_compress_mem_to_output(const void *pBuf, size_t buf_len, tdefl_put_buf_func_ptr pPut_buf_func, void *pPut_buf_user, int flags);
```
>  tdefl_compress_mem_to_output() compresses a block to an output stream. The above helpers use this function internally. 
#### tdefl_init

```c
tdefl_status tdefl_init(tdefl_compressor *d, tdefl_put_buf_func_ptr pPut_buf_func, void *pPut_buf_user, int flags);
```
>  flags: See the above enums (TDEFL_HUFFMAN_ONLY, TDEFL_WRITE_ZLIB_HEADER, etc.) 
#### tdefl_compress

```c
tdefl_status tdefl_compress(tdefl_compressor *d, const void *pIn_buf, size_t *pIn_buf_size, void *pOut_buf, size_t *pOut_buf_size, tdefl_flush flush);
```
>  Compresses a block of data, consuming as much of the specified input buffer as possible, and writing as much compressed data to the specified output buffer as possible. 
#### tdefl_compress_buffer

```c
tdefl_status tdefl_compress_buffer(tdefl_compressor *d, const void *pIn_buf, size_t in_buf_size, tdefl_flush flush);
```
>  tdefl_compress_buffer() always consumes the entire input buffer. 
#### tdefl_create_comp_flags_from_zip_params

```c
mz_uint tdefl_create_comp_flags_from_zip_params(int level, int window_bits, int strategy);
```
>  strategy may be either MZ_DEFAULT_STRATEGY, MZ_FILTERED, MZ_HUFFMAN_ONLY, MZ_RLE, or MZ_FIXED 
#### tdefl_compressor_alloc

```c
tdefl_compressor *tdefl_compressor_alloc();
void tdefl_compressor_free(tdefl_compressor *pComp);
```
>  structure size and allocation mechanism. 
#### tinfl_decompress_mem_to_heap

```c
void *tinfl_decompress_mem_to_heap(const void *pSrc_buf, size_t src_buf_len, size_t *pOut_len, int flags);
```
>   The caller must call mz_free() on the returned block when it's no longer needed. 
#### ((size_t)

```c
#define TINFL_DECOMPRESS_MEM_TO_MEM_FAILED ((size_t)(-1))
size_t tinfl_decompress_mem_to_mem(void *pOut_buf, size_t out_buf_len, const void *pSrc_buf, size_t src_buf_len, int flags);
```
>  Returns TINFL_DECOMPRESS_MEM_TO_MEM_FAILED on failure, or the number of bytes written on success. 
#### (*tinfl_put_buf_func_ptr)

```c
typedef int (*tinfl_put_buf_func_ptr)(const void *pBuf, int len, void *pUser);
int tinfl_decompress_mem_to_callback(const void *pIn_buf, size_t *pIn_buf_size, tinfl_put_buf_func_ptr pPut_buf_func, void *pPut_buf_user, int flags);
```
>  Returns 1 on success or 0 on failure. 
#### tinfl_decompressor_alloc

```c
tinfl_decompressor *tinfl_decompressor_alloc();
void tinfl_decompressor_free(tinfl_decompressor *pDecomp);
```
>  structure size and allocation mechanism. 
#### tinfl_init

```c
#define tinfl_init(r)     \
    do                    \
    {                     \
        (r)->m_state = 0; \
    }                     \
    MZ_MACRO_END
#define tinfl_get_adler32(r) (r)->m_check_adler32
```
>  Initializes the decompressor to its initial state. 
#### tinfl_decompress

```c
tinfl_status tinfl_decompress(tinfl_decompressor *r, const mz_uint8 *pIn_buf_next, size_t *pIn_buf_size, mz_uint8 *pOut_buf_start, mz_uint8 *pOut_buf_next, size_t *pOut_buf_size, const mz_uint32 decomp_flags);
```
>  This is a universal API, i.e. it can be used as a building block to build any desired higher level decompression API. In the limit case, it can be called once per every byte input or output. 
#### mz_zip_reader_init

```c
mz_bool mz_zip_reader_init(mz_zip_archive *pZip, mz_uint64 size, mz_uint flags);
```
>  These functions read and validate the archive's central directory. 
#### mz_zip_reader_init_file

```c
mz_bool mz_zip_reader_init_file(mz_zip_archive *pZip, const char *pFilename, mz_uint32 flags);
mz_bool mz_zip_reader_init_file_v2(mz_zip_archive *pZip, const char *pFilename, mz_uint flags, mz_uint64 file_start_ofs, mz_uint64 archive_size);
```
>  actual_archive_size is the true total size of the archive, which may be smaller than the file's actual size on disk. If zero the entire file is treated as the archive. 
#### mz_zip_reader_init_cfile

```c
mz_bool mz_zip_reader_init_cfile(mz_zip_archive *pZip, MZ_FILE *pFile, mz_uint64 archive_size, mz_uint flags);
#endif
```
>  The FILE will NOT be closed when mz_zip_reader_end() is called. 
#### mz_zip_reader_end

```c
mz_bool mz_zip_reader_end(mz_zip_archive *pZip);
```
>  Ends archive reading, freeing all allocations, and closing the input archive file if mz_zip_reader_init_file() was used. 
#### mz_zip_zero_struct

```c
void mz_zip_zero_struct(mz_zip_archive *pZip);
```
>  Important: This must be done before passing the struct to any mz_zip functions. 
#### mz_zip_reader_get_num_files

```c
mz_uint mz_zip_reader_get_num_files(mz_zip_archive *pZip);
```
>  Returns the total number of files in the archive. 
#### mz_zip_read_archive_data

```c
size_t mz_zip_read_archive_data(mz_zip_archive *pZip, mz_uint64 file_ofs, void *pBuf, size_t n);
```
>  Reads n bytes of raw archive data, starting at file offset file_ofs, to pBuf. 
#### mz_zip_locate_file

```c
int mz_zip_locate_file(mz_zip_archive *pZip, const char *pName, const char *pComment, mz_uint flags);
/* Returns MZ_FALSE if the file cannot be found. */
mz_bool mz_zip_locate_file_v2(mz_zip_archive *pZip, const char *pName, const char *pComment, mz_uint flags, mz_uint32 *pIndex);
```
>  Returns -1 if the file cannot be found. 
#### mz_zip_set_last_error

```c
mz_zip_error mz_zip_set_last_error(mz_zip_archive *pZip, mz_zip_error err_num);
mz_zip_error mz_zip_peek_last_error(mz_zip_archive *pZip);
mz_zip_error mz_zip_clear_last_error(mz_zip_archive *pZip);
mz_zip_error mz_zip_get_last_error(mz_zip_archive *pZip);
const char *mz_zip_get_error_string(mz_zip_error mz_err);
```
>  Note that the m_last_error functionality is not thread safe. 
#### mz_zip_reader_is_file_a_directory

```c
mz_bool mz_zip_reader_is_file_a_directory(mz_zip_archive *pZip, mz_uint file_index);
```
>  MZ_TRUE if the archive file entry is a directory entry. 
#### mz_zip_reader_is_file_encrypted

```c
mz_bool mz_zip_reader_is_file_encrypted(mz_zip_archive *pZip, mz_uint file_index);
```
>  MZ_TRUE if the file is encrypted/strong encrypted. 
#### mz_zip_reader_is_file_supported

```c
mz_bool mz_zip_reader_is_file_supported(mz_zip_archive *pZip, mz_uint file_index);
```
>  MZ_TRUE if the compression method is supported, and the file is not encrypted, and the file is not a compressed patch file. 
#### mz_zip_reader_get_filename

```c
mz_uint mz_zip_reader_get_filename(mz_zip_archive *pZip, mz_uint file_index, char *pFilename, mz_uint filename_buf_size);
```
>  Returns the number of bytes written to pFilename, or if filename_buf_size is 0 this function returns the number of bytes needed to fully store the filename. 
#### mz_zip_reader_locate_file

```c
int mz_zip_reader_locate_file(mz_zip_archive *pZip, const char *pName, const char *pComment, mz_uint flags);
int mz_zip_reader_locate_file_v2(mz_zip_archive *pZip, const char *pName, const char *pComment, mz_uint flags, mz_uint32 *file_index);
```
>  Returns -1 if the file cannot be found. 
#### mz_zip_reader_file_stat

```c
mz_bool mz_zip_reader_file_stat(mz_zip_archive *pZip, mz_uint file_index, mz_zip_archive_file_stat *pStat);
```
>  Returns detailed information about an archive file entry. 
#### mz_zip_is_zip64

```c
mz_bool mz_zip_is_zip64(mz_zip_archive *pZip);
```
>  A file is considered zip64 if it contained a zip64 end of central directory marker, or if it contained any zip64 extended file information fields in the central directory. 
#### mz_zip_get_central_dir_size

```c
size_t mz_zip_get_central_dir_size(mz_zip_archive *pZip);
```
>  The current max supported size is <= MZ_UINT32_MAX. 
#### mz_zip_reader_extract_to_mem_no_alloc

```c
mz_bool mz_zip_reader_extract_to_mem_no_alloc(mz_zip_archive *pZip, mz_uint file_index, void *pBuf, size_t buf_size, mz_uint flags, void *pUser_read_buf, size_t user_read_buf_size);
mz_bool mz_zip_reader_extract_file_to_mem_no_alloc(mz_zip_archive *pZip, const char *pFilename, void *pBuf, size_t buf_size, mz_uint flags, void *pUser_read_buf, size_t user_read_buf_size);
```
>  There must be at least enough room on the stack to store the inflator's state (~34KB or so). 
#### mz_zip_reader_extract_to_mem

```c
mz_bool mz_zip_reader_extract_to_mem(mz_zip_archive *pZip, mz_uint file_index, void *pBuf, size_t buf_size, mz_uint flags);
mz_bool mz_zip_reader_extract_file_to_mem(mz_zip_archive *pZip, const char *pFilename, void *pBuf, size_t buf_size, mz_uint flags);
```
>  Extracts a archive file to a memory buffer. 
#### mz_zip_reader_extract_to_heap

```c
void *mz_zip_reader_extract_to_heap(mz_zip_archive *pZip, mz_uint file_index, size_t *pSize, mz_uint flags);
void *mz_zip_reader_extract_file_to_heap(mz_zip_archive *pZip, const char *pFilename, size_t *pSize, mz_uint flags);
```
>  Returns NULL and sets the last error on failure. 
#### mz_zip_reader_extract_to_callback

```c
mz_bool mz_zip_reader_extract_to_callback(mz_zip_archive *pZip, mz_uint file_index, mz_file_write_func pCallback, void *pOpaque, mz_uint flags);
mz_bool mz_zip_reader_extract_file_to_callback(mz_zip_archive *pZip, const char *pFilename, mz_file_write_func pCallback, void *pOpaque, mz_uint flags);
```
>  Extracts a archive file using a callback function to output the file's data. 
#### mz_zip_reader_extract_iter_new

```c
mz_zip_reader_extract_iter_state* mz_zip_reader_extract_iter_new(mz_zip_archive *pZip, mz_uint file_index, mz_uint flags);
mz_zip_reader_extract_iter_state* mz_zip_reader_extract_file_iter_new(mz_zip_archive *pZip, const char *pFilename, mz_uint flags);
size_t mz_zip_reader_extract_iter_read(mz_zip_reader_extract_iter_state* pState, void* pvBuf, size_t buf_size);
mz_bool mz_zip_reader_extract_iter_free(mz_zip_reader_extract_iter_state* pState);
```
>  Extract a file iteratively 
#### mz_zip_reader_extract_to_file

```c
mz_bool mz_zip_reader_extract_to_file(mz_zip_archive *pZip, mz_uint file_index, const char *pDst_filename, mz_uint flags);
mz_bool mz_zip_reader_extract_file_to_file(mz_zip_archive *pZip, const char *pArchive_filename, const char *pDst_filename, mz_uint flags);
```
>  This function only extracts files, not archive directory records. 
#### mz_zip_reader_extract_to_cfile

```c
mz_bool mz_zip_reader_extract_to_cfile(mz_zip_archive *pZip, mz_uint file_index, MZ_FILE *File, mz_uint flags);
mz_bool mz_zip_reader_extract_file_to_cfile(mz_zip_archive *pZip, const char *pArchive_filename, MZ_FILE *pFile, mz_uint flags);
#endif
```
>  Extracts a archive file starting at the current position in the destination FILE stream. 
#### mz_zip_validate_file

```c
mz_bool mz_zip_validate_file(mz_zip_archive *pZip, mz_uint file_index, mz_uint flags);
```
>  It also validates that each file can be successfully uncompressed unless the MZ_ZIP_FLAG_VALIDATE_HEADERS_ONLY is specified. 
#### mz_zip_validate_archive

```c
mz_bool mz_zip_validate_archive(mz_zip_archive *pZip, mz_uint flags);
```
>  Validates an entire archive by calling mz_zip_validate_file() on each file. 
#### mz_zip_validate_mem_archive

```c
mz_bool mz_zip_validate_mem_archive(const void *pMem, size_t size, mz_uint flags, mz_zip_error *pErr);
mz_bool mz_zip_validate_file_archive(const char *pFilename, mz_uint flags, mz_zip_error *pErr);
```
>  Misc utils/helpers, valid for ZIP reading or writing 
#### mz_zip_end

```c
mz_bool mz_zip_end(mz_zip_archive *pZip);
```
>  Universal end function - calls either mz_zip_reader_end() or mz_zip_writer_end(). 
#### mz_zip_writer_init

```c
mz_bool mz_zip_writer_init(mz_zip_archive *pZip, mz_uint64 existing_size);
mz_bool mz_zip_writer_init_v2(mz_zip_archive *pZip, mz_uint64 existing_size, mz_uint flags);
```
> The output is streamable, i.e. file_ofs in mz_file_write_func always increases only by n
#### mz_zip_writer_init_from_reader

```c
mz_bool mz_zip_writer_init_from_reader(mz_zip_archive *pZip, const char *pFilename);
mz_bool mz_zip_writer_init_from_reader_v2(mz_zip_archive *pZip, const char *pFilename, mz_uint flags);
```
>  the archive is finalized the file's central directory will be hosed. 
#### mz_zip_writer_add_mem

```c
mz_bool mz_zip_writer_add_mem(mz_zip_archive *pZip, const char *pArchive_name, const void *pBuf, size_t buf_size, mz_uint level_and_flags);
```
>  level_and_flags - compression level (0-10, see MZ_BEST_SPEED, MZ_BEST_COMPRESSION, etc.) logically OR'd with zero or more mz_zip_flags, or just set to MZ_DEFAULT_COMPRESSION. 
#### mz_zip_writer_add_mem_ex

```c
mz_bool mz_zip_writer_add_mem_ex(mz_zip_archive *pZip, const char *pArchive_name, const void *pBuf, size_t buf_size, const void *pComment, mz_uint16 comment_size, mz_uint level_and_flags,
                                 mz_uint64 uncomp_size, mz_uint32 uncomp_crc32);
```
>  uncomp_size/uncomp_crc32 are only used if the MZ_ZIP_FLAG_COMPRESSED_DATA flag is specified. 
#### mz_zip_writer_add_file

```c
mz_bool mz_zip_writer_add_file(mz_zip_archive *pZip, const char *pArchive_name, const char *pSrc_filename, const void *pComment, mz_uint16 comment_size, mz_uint level_and_flags);
```
>  level_and_flags - compression level (0-10, see MZ_BEST_SPEED, MZ_BEST_COMPRESSION, etc.) logically OR'd with zero or more mz_zip_flags, or just set to MZ_DEFAULT_COMPRESSION. 
#### mz_zip_writer_add_cfile

```c
mz_bool mz_zip_writer_add_cfile(mz_zip_archive *pZip, const char *pArchive_name, MZ_FILE *pSrc_file, mz_uint64 size_to_add,
                                const MZ_TIME_T *pFile_time, const void *pComment, mz_uint16 comment_size, mz_uint level_and_flags, const char *user_extra_data_local, mz_uint user_extra_data_local_len,
                                const char *user_extra_data_central, mz_uint user_extra_data_central_len);
#endif
```
>  Like mz_zip_writer_add_file(), except the file data is read from the specified FILE stream. 
#### mz_zip_writer_add_from_zip_reader

```c
mz_bool mz_zip_writer_add_from_zip_reader(mz_zip_archive *pZip, mz_zip_archive *pSource_zip, mz_uint src_file_index);
```
>  This function fully clones the source file's compressed data (no recompression), along with its full filename, extra data (it may add or modify the zip64 local header extra data field), and the optional descriptor following the compressed data. 
#### mz_zip_writer_finalize_archive

```c
mz_bool mz_zip_writer_finalize_archive(mz_zip_archive *pZip);
```
>  An archive must be manually finalized by calling this function for it to be valid. 
#### mz_zip_writer_finalize_heap_archive

```c
mz_bool mz_zip_writer_finalize_heap_archive(mz_zip_archive *pZip, void **ppBuf, size_t *pSize);
```
>  The heap block will be allocated using the mz_zip_archive's alloc/realloc callbacks. 
#### mz_zip_writer_end

```c
mz_bool mz_zip_writer_end(mz_zip_archive *pZip);
```
>  Note for the archive to be valid, it *must* have been finalized before ending (this function will not do it for you). 
#### mz_zip_add_mem_to_archive_file_in_place

```c
mz_bool mz_zip_add_mem_to_archive_file_in_place(const char *pZip_filename, const char *pArchive_name, const void *pBuf, size_t buf_size, const void *pComment, mz_uint16 comment_size, mz_uint level_and_flags);
mz_bool mz_zip_add_mem_to_archive_file_in_place_v2(const char *pZip_filename, const char *pArchive_name, const void *pBuf, size_t buf_size, const void *pComment, mz_uint16 comment_size, mz_uint level_and_flags, mz_zip_error *pErr);
```
>  TODO: Perhaps add an option to leave the existing central dir in place in case the add dies? We could then truncate the file (so the old central dir would be at the end) if something goes wrong. 
#### mz_zip_extract_archive_file_to_heap

```c
void *mz_zip_extract_archive_file_to_heap(const char *pZip_filename, const char *pArchive_name, size_t *pSize, mz_uint flags);
void *mz_zip_extract_archive_file_to_heap_v2(const char *pZip_filename, const char *pArchive_name, const char *pComment, size_t *pSize, mz_uint flags, mz_zip_error *pErr);
```
>  Returns NULL on failure. 
