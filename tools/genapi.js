const fs = require('fs');

const ignore = {
  'mgos.h': 1,
  'mgos_config_util.h': 1,
  'mgos_features.h': 1,
  'mgos_dlsym.h': 1,
  'mgos_init.h': 1,
  'mgos_sys_debug.h': 1,
};

const jsmap = {
  'mgos_bitbang.h': 'api_bitbang.js',
  'mgos_sys_config.h': 'api_config.js',
  'mgos_event.h': 'api_events.js',
  'mgos_gpio.h': 'api_gpio.js',
  'mgos_net.h': 'api_net.js',
  'mgos_system.h': 'api_sys.js',
  'mgos_timers.h': 'api_timer.js',
  'mgos_uart.h': 'api_uart.js',
};

const stripComments = text =>
    (text.startsWith('/*') ?
         text.replace(/^\/\*/, '')
             .replace(/\*\//, '')
             .replace(/\n\s*\* ?/g, '\n') :
         text.replace(/(^|\n)\s*\/\/ ?/g, '$1').replace(/^\s+|\s+$/, ''));

const srcFile = process.argv[2];
const dstFile = process.argv[3];
const mjsPath = process.argv[4];
const srcBase = srcFile.replace(/.+\//, '');

if (ignore[srcBase]) process.exit(0);

const source = fs.readFileSync(srcFile, 'utf-8');
const re = /^\s*(((?:\s*\/\/.*\n)+)|(\/\*[\s\S]+?\*\/))/;
const urlBase = 'https://github.com/cesanta/mongoose-os/tree/master/fw';
const mjsBase = 'https://github.com/mongoose-os-libs/mjs/tree/master/fs';
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
const jsFile = jsmap[srcBase];
const jslink = jsFile ? `[${jsFile}](${mjsBase}/${jsFile})` : '';
md += '### Github repo links\n';
md += '| Github Repo | C Header | C source  | JS source |\n';
md += '| ----------- | -------- | --------  | ----------------- |\n';
md += `| ${repolink}  | ${hlink} | ${clink} | ${jslink}         |\n\n`;

md += '\n### C/С++ API\n';

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

if (jsFile) {
  md += '\n### JS API\n';
  const js = fs.readFileSync(`${mjsPath}/fs/${jsFile}`, 'utf-8');
  var re3 = /((?:\s*\/\/.*\n)+)/g;
  while ((a = re3.exec(js)) !== null) {
    const m2 = stripComments(a[1]).match(/^[^`]+?`(.*)`.*?\n([\s\S]+)$/);
    if (!m2) continue;
    md += `#### ${m2[1].replace(/\(.*/, '')}\n`;
    md += `\n${backs}javascript\n${m2[1]}\n${backs}\n${m2[2]}\n`;
  }
}

// const boo =
// rest.match(/(((?:\s*\/\/.*\n)+)|(\/\*[\s\S]+?\*\/))([\s\S]+?)\n/g); md +=
// `\n## Foooo ----- ${backs}${JSON.stringify(boo, null, '  ')}${backs}\n`;

// boo.forEach(m => {
//   md += `\n##### heee\n${stripComments(m[1])}\n`;
// });

fs.writeFileSync(dstFile, md);
console.log(`- [${menuTitle}](${dstFile.replace(/.*\//, '')})`);
