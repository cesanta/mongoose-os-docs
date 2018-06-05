# List all RPC services exported by device

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos call RPC.List
[
  "FS.Umount",
  ...</code></pre>

You can see see what arguments an RPC service expects by calling
an `RPC.Describe`, which provides a simple introspection:

<pre class="command-line language-bash" data-user="chris" data-host="localhost" data-output="2-100"><code>mos call RPC.Describe '{"name": "Config.Set"}'
{
  "name": "Config.Set",
  "args_fmt": "{config: %M}"
}</code></pre>

It works because C API for registering an RPC service has JSON format
specification for the input arguments. That's why Mongoose OS knows about
JSON formats for all registered RPC services.