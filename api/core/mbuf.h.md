# Membuf
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [cesanta/mongoose-os](https://github.com/cesanta/mongoose-os) | [mbuf.h](https://github.com/cesanta/mongoose-os/tree/master/fw/include/mbuf.h) | [mbuf.c](https://github.com/cesanta/mongoose-os/tree/master/fw/src/mbuf.c)  | &nbsp;         |


Mbufs are mutable/growing memory buffers, like C++ strings.
Mbuf can append data to the end of a buffer or insert data into arbitrary
position in the middle of a buffer. The buffer grows automatically when
needed.
 

 ----- 
#### mbuf_init

```c
void mbuf_init(struct mbuf *, size_t initial_capacity);
```
<div class="apidescr">

Initialises an Mbuf.
`initial_capacity` specifies the initial capacity of the mbuf.
 
</div>
#### mbuf_free

```c
void mbuf_free(struct mbuf *);
```
<div class="apidescr">
 Frees the space allocated for the mbuffer and resets the mbuf structure. 
</div>
#### mbuf_append

```c
size_t mbuf_append(struct mbuf *, const void *data, size_t data_size);
```
<div class="apidescr">

Appends data to the Mbuf.

Returns the number of bytes appended or 0 if out of memory.
 
</div>
#### mbuf_insert

```c
size_t mbuf_insert(struct mbuf *, size_t, const void *, size_t);
```
<div class="apidescr">

Inserts data at a specified offset in the Mbuf.

Existing data will be shifted forwards and the buffer will
be grown if necessary.
Returns the number of bytes inserted.
 
</div>
#### mbuf_remove

```c
void mbuf_remove(struct mbuf *, size_t data_size);
```
<div class="apidescr">
 Removes `data_size` bytes from the beginning of the buffer. 
</div>
#### mbuf_resize

```c
void mbuf_resize(struct mbuf *, size_t new_size);
```
<div class="apidescr">

Resizes an Mbuf.

If `new_size` is smaller than buffer's `len`, the
resize is not performed.
 
</div>
#### mbuf_trim

```c
void mbuf_trim(struct mbuf *);
```
<div class="apidescr">
 Shrinks an Mbuf by resizing its `size` to `len`. 
</div>
