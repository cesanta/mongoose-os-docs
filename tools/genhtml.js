const fs = require('fs');
const path = require('path');
const marked = require('marked');

const dstDir = process.argv[2];
const mdFiles = process.argv.slice(3);
const t = `
<!--#include virtual="/partials/header_start.hbs" -->
<title>Mongoose OS Documentation</title>
<meta name="Description" content="Mongoose OS Documentation">
<link href="/css/docs.css" rel="stylesheet">
<!--#include virtual="/partials/header_end.hbs" -->

<body>
  <!--#include virtual="/partials/menu.hbs" -->

  <div class="container docs mt-4 pb-5">
    <div class="mg-color-grey row ">
      <div class="col-sm-3 col-xs-12 sidebar">
        <!--#include virtual="/docs/sidebar.html" -->
        <hr class="mb-4 mt-1">
      </div>

      <div class="col-sm-9 col-xs-12 content">
        DOC_CONTENT

        <a href="EDITLINK" class="editme small" target="_blank">
          <i class="fa fa-edit"></i> edit this doc
        </a>
      </div>
    </div>
  </div>

  <script src="/js/prism.js"></script>
  <script src="/js/docs.js"></script>
  <!--#include virtual="/partials/footer.hbs" -->
</body>

</html>
`;

fs.writeFileSync(path.join(dstDir, 'index.html'), `
<html>
<meta http-equiv="refresh" content="0; url=mongoose-os/quickstart/setup.html">
</html>
`);

mdFiles.forEach(f => {
  if (f.match(/sidebar.md|index.md$/)) return;
  console.log(`${f} -> ${path.join(dstDir, f)}`);
  const dst = path.join(dstDir, f).replace(/.md$/, '.html');
  var editlink = `https://github.com/cesanta/mongoose-os-docs/blob/master/${f}`;
  let markdown = fs.readFileSync(f, 'utf-8');
  let html = marked(markdown).replace(/(h\d id="(.+?)")/g, '$1 name="$2"');
  let data = t.replace('DOC_CONTENT', html || (f + ' not found'))
                 .replace('EDITLINK', editlink);
  if (!data) {
    console.error('ERROR: cannot read', f);
    return;
  } else {
    const dir = path.dirname(dst);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
    fs.writeFileSync(dst, data);
  }
});
