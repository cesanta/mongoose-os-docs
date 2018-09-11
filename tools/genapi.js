const fs = require('fs');

const ignore = {
  'mgos.h': 1,
  'mgos_config_util.h': 1,
  'mgos_features.h': 1,
  'mgos_dlsym.h': 1,
  'mgos_sys_config.h': 1,
  'mgos_init.h': 1,
  'mgos_sys_debug.h': 1,
};

const stripComments = text =>
    (text.startsWith('/*') ?
         text.replace(/^\/\*/, '')
             .replace(/\*\//, '')
             .replace(/\n\s*\* ?/g, '\n') :
         text.replace(/(^|\n)\s*\/\/ ?/g, '$1').replace(/^\s+|\s+$/, ''));

const srcFile = process.argv[2];
const dstFile = process.argv[3];
const srcBase = srcFile.replace(/.+\//, '');

if (ignore[srcBase]) process.exit(0);

const source = fs.readFileSync(srcFile, 'utf-8');
const re = /^\s*(((?:\s*\/\/.*\n)+)|(\/\*[\s\S]+?\*\/))/;
const urlBase = 'https://github.com/cesanta/mongoose-os/tree/master/fw';
let menuTitle = srcBase;

let md = '';

const m = source.replace(re, '').match(re);
if (m) {
  const comment = stripComments(m[1]);
  md += comment;
  md += '\n';
  const m2 = comment.match(/#\s*(.+)\n/);
  if (m2) menuTitle = m2[1];
}

const repolink = `[mongoose-os](${urlBase})`;
const hlink = `[${srcBase}](${urlBase}/include/${srcBase})`;
const cName = srcBase.replace(/.h$/, '.c');
const clink = `[${cName}](${urlBase}/src/${cName})`;
const jslink = hlink;
md += '#### Github repo links\n';
md += '| Github Repo | C Header | C source  | Javascript source |\n';
md += '| ----------- | -------- | --------  | ----------------- |\n';
md += `| ${repolink}  | ${hlink} | ${clink} |          |\n\n`;

// md += '\n#### C API reference\n';

const rest = source.replace(re, '').replace(re, '');
const re2 = /(((?:\s*\/\/.*\n)+)|(\/\*[\s\S]+?\*\/))\s*([\s\S]+?)\n\n/g;
let a;
const backs = '```';
while ((a = re2.exec(rest)) != null) {
  const x = a[4].match(/^.*?\*?(\S+)\(/);
  if (!x) continue;
  md += `#### ${x[1]}\n`;
  md += `\n${backs}c\n${a[4]}\n${backs}\n${stripComments(a[1])}\n`;
}

// const boo =
// rest.match(/(((?:\s*\/\/.*\n)+)|(\/\*[\s\S]+?\*\/))([\s\S]+?)\n/g); md +=
// `\n## Foooo ----- ${backs}${JSON.stringify(boo, null, '  ')}${backs}\n`;

// boo.forEach(m => {
//   md += `\n##### heee\n${stripComments(m[1])}\n`;
// });

fs.writeFileSync(dstFile, md);
console.log(`- [${menuTitle}](${dstFile.replace(/.*\//, '')})`);
