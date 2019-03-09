# Commercial firmare

Below is the procedure on how to build a firmware using
Mongoose OS Enterprise Edition (commercial version).

1. Acquire Mongoose OS license
2. Nominate a single GitHub accound (user, not organisation)
   that gets an access to the private repo https://gitub.com/cesanta/mos-libs
3. On your build machine,
   - Clone `mos-libs` to some directory
   - Add `--local --verbose --libs-dir /path/to/mos-libs` arguments to your
     `mos build` command

Example command line to build a firmware:

```
mos build --platform stm32 --build-var BOARD=B-L475E-IOT01A \
   --local --verbose --libs-dir ../mos-libs
```

Mongoose OS public libraries are located under the
https://github.com/mongoose-os-libs organisation. That org contains libraries
authored by Cesanta, as well as libraries contributed by the community.
The mos-libs private reposotiry contains only libraries authored by Cesanta. Also,
the  mos-libs repository contain the source code for all libraries, whereas
some of the mongoose-os-libs libraries are in the binary form, built from sources with certain compilation flags that enable restrictions.

The commercial firmware must be built against the mos-libs libraries, in order to use the sources, without enabling restrictions. When you specify `--libs-dir /path/to/fetched/mos-libs` then your firmware is built correctly: Cesanta's libraries would use the locally fetched mos-libs, and all other libraries clone mongoose-os-libs.
