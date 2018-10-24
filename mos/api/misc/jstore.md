# JSON store
| Github Repo | C Header | C source  | JS source |
| ----------- | -------- | --------  | ----------------- |
| [mongoose-os-libs/jstore](https://github.com/mongoose-os-libs/jstore) | [mgos_jstore.h](https://github.com/mongoose-os-libs/jstore/tree/master/include/mgos_jstore.h) | &nbsp;  | &nbsp;         |



JSON Store is a library which maintains a JSON file with order-preserving
mappings from arbitrary strings to any kind of JSON values (a string, an
object, etc). IDs can be either randomly generated or custom.

The order in which items are stored in the file and iterated (with
[`mgos_jstore_iterate()`](https://mongoose-os.com/docs/api/mgos_jstore.h.html#mgos_jstore_iterate))
is the order of insertion of items to the store.

Refer to the [API documentation](https://mongoose-os.com/docs/api/mgos_jstore.h.html)
for details.


 ----- 
#### MGOS_JSTORE_REF_BY_ID

```c
#define MGOS_JSTORE_REF_BY_ID(x)                               \
  ((struct mgos_jstore_ref){                                   \
      .type = MGOS_JSTORE_REF_TYPE_BY_ID, .data = {.id = (x)}, \
  })
```
> 
> Constructs reference to an item by the given struct mg_str id.
>  
#### MGOS_JSTORE_REF_BY_INDEX

```c
#define MGOS_JSTORE_REF_BY_INDEX(x)                                  \
  ((struct mgos_jstore_ref){                                         \
      .type = MGOS_JSTORE_REF_TYPE_BY_INDEX, .data = {.index = (x)}, \
  })
```
> 
> Constructs reference to an item by the given int index.
>  
#### MGOS_JSTORE_REF_BY_HND

```c
#define MGOS_JSTORE_REF_BY_HND(x)                                \
  ((struct mgos_jstore_ref){                                     \
      .type = MGOS_JSTORE_REF_TYPE_BY_HND, .data = {.hnd = (x)}, \
  })
```
> 
> Constructs reference to an item by the given opaque handler
> mgos_jstore_item_hnd_t hnd.
>  
#### mgos_jstore_create

```c
struct mgos_jstore *mgos_jstore_create(const char *json_path, char **perr);
```
> 
> Create jstore from the JSON file `json_path`. If file does not exist or
> is empty, it's not an error and will just result in an empty jstore.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### (*mgos_jstore_cb)

```c
typedef bool (*mgos_jstore_cb)(struct mgos_jstore *store, int idx,
                               mgos_jstore_item_hnd_t hnd,
                               const struct mg_str *id,
                               const struct mg_str *data, void *userdata);
```
> 
> Callback for `mgos_jstore_iterate`, called for each item in the jstore.
> `idx` is a zero-based index of the item, `hnd` is an opaque item's
> handle, can be used for editing or removing it without having to look for
> the item by the id.
> 
> The callback should return true to continue iteration, or false to stop.
>  
#### mgos_jstore_iterate

```c
bool mgos_jstore_iterate(struct mgos_jstore *store, mgos_jstore_cb cb,
                         void *userdata);
```
> 
> Call provided callback for each item in the store; see `mgos_jstore_cb` for
> details.
> 
> Returns false if the callback has returned false at least once. Returns true
> if callback never returned false.
>  
#### mgos_jstore_item_add

```c
struct mg_str mgos_jstore_item_add(struct mgos_jstore *store, struct mg_str id,
                                   struct mg_str data,
                                   enum mgos_jstore_ownership id_own,
                                   enum mgos_jstore_ownership data_own,
                                   mgos_jstore_item_hnd_t *phnd, int *pindex,
                                   char **perr);
```
> 
> Add a new item to the store. If `id` contains some data (`id.p` is not NULL),
> the provided id will be used; otherwise, the id will be randomly generated.
> In any case, the actual id is returned; the caller should NOT free it,
> and it remains valid until the store item is freed.
> 
> Data should be a valid JSON string. Examples of valid data:
> 
> - Array: `"[\"foo", "bar\"]"`
> - String: `"\"foo bar\""` (with explicit quotes)
> 
> Plain `"foo bar"` would be an invalid data.
> 
> Ownership of `id` and `data` is determined by `id_own` and `data_own`,
> see `enum mgos_jstore_ownership`.
> 
> If `phnd` is not NULL, the new item's handle is written there.
> If `pindex` is not NULL, the new item's index is written there.
> 
> Returns the id of a new item. In case of an error, that id will be empty.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_jstore_item_edit

```c
bool mgos_jstore_item_edit(struct mgos_jstore *store,
                           const struct mgos_jstore_ref ref, struct mg_str data,
                           enum mgos_jstore_ownership data_own, char **perr);
```
> 
> Edit item by the reference (see `MGOS_JSTORE_REF_BY_...()` macros above)
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_jstore_item_remove

```c
bool mgos_jstore_item_remove(struct mgos_jstore *store,
                             const struct mgos_jstore_ref ref, char **perr);
```
> 
> Remove item by the reference (see `MGOS_JSTORE_REF_BY_...()` macros above)
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_jstore_item_get

```c
bool mgos_jstore_item_get(struct mgos_jstore *store,
                          const struct mgos_jstore_ref ref, struct mg_str *id,
                          struct mg_str *data, mgos_jstore_item_hnd_t *phnd,
                          int *pindex, char **perr);
```
> 
> Get item details by the given reference (see `MGOS_JSTORE_REF_BY_...()`
> macros above). All output pointers (`id`, `data`, `phnd`, `pindex`) are
> allowed to be NULL.
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_jstore_save

```c
bool mgos_jstore_save(struct mgos_jstore *store, const char *json_path,
                      char **perr);
```
> 
> Save jstore to the JSON file `json_path`.
> 
> Returns true in case of success, false otherwise.
> 
> If `perr` is not NULL, the error message will be written there (or NULL
> in case of success). The caller should free the error message.
>  
#### mgos_jstore_items_cnt

```c
int mgos_jstore_items_cnt(struct mgos_jstore *store);
```
> 
> Get number of items in a jstore.
>  
#### mgos_jstore_free

```c
void mgos_jstore_free(struct mgos_jstore *store);
```
> 
> Free memory occupied by jstore and all its items.
>  
