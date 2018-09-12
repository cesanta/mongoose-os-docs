const fs = require('fs');

const dstFile = process.argv[2];     // Destination .md file
const repoName = process.argv[3];    // Repo name, e.g. 'cesanta/mongoose-os'
const hFile = process.argv[4];       // C header file
let jsFile = process.argv[5] || '';  // JS source file
const hBase = (hFile || '').replace(/.+\//, '');
let menuTitle = process.argv[6] || hBase;

const ignore = {
  'mgos.h': 1,
  'mgos_config_util.h': 1,
  'mgos_features.h': 1,
  'mgos_dlsym.h': 1,
  'mgos_init.h': 1,
  'mgos_sys_debug.h': 1,
};
if (ignore[hBase]) process.exit(0);

// Locations of the JS bindings for the core API
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

const menuTitles = {
  'frozen.h': 'JSON',
  'cs_dbg.h': 'Logging',
  'mbuf.h': 'Membuf',
  'mg_str.h': 'String',
};
if (menuTitles[hBase]) menuTitle = menuTitles[hBase];

const stripComments = text =>
    (text.startsWith('/*') ?
         text.replace(/^\/\*/, '')
             .replace(/\*\//, '')
             .replace(/\n\s*\* ?/g, '\n') :
         text.replace(/(^|\n)\s*\/\/ ?/g, '$1').replace(/^\s+|\s+$/, ''));

const re = /^\s*(((?:\s*\/\/.*\n)+)|(\/\*[\s\S]+?\*\/))/;
const source = hFile ? fs.readFileSync(hFile, 'utf-8') : '';

let md = '';
const m = source.replace(re, '').match(re);
if (m) {
  const comment = stripComments(m[1]);
  md += comment;
  md += '\n';
  const m2 = comment.match(/#\s*(.+)\n/);
  if (m2) menuTitle = m2[1];
} else {
  md += `# ${menuTitle}\n`;
}

const repoURL = `https://github.com/${repoName}`;
const repoLink = `[${repoName}](${repoURL})`;
const mjsURL = 'http://github.com/mongoose-os-libs/mjs';
let hLink = '&nbsp;';
let cLink = '&nbsp;';
let jsLink = '&nbsp;';

if (repoName == 'cesanta/mongoose-os') {
  const cBase = hBase.replace(/.h$/, '.c');
  hLink = `[${hBase}](${repoURL}/tree/master/fw/include/${hBase})`;
  cLink = `[${cBase}](${repoURL}/tree/master/fw/src/${cBase})`;
  const jsBase = jsmap[hBase];
  if (jsBase) {
    jsLink = `[${jsBase}](${mjsURL}/tree/master/fs/${jsBase})`;
    jsFile = `${hFile.replace(/[^\/]+$/, '')}../../mos_libs/mjs/fs/${jsBase}`;
  }
}
if (repoName == 'cesanta/frozen') {
  const cBase = hBase.replace(/.h$/, '.c');
  hLink = `[${hBase}](${repoURL}/tree/master/${hBase})`;
  cLink = `[${cBase}](${repoURL}/tree/master/${cBase})`;
}
md += '### Github repo links\n';
md += '| Github Repo | C Header | C source  | JS source |\n';
md += '| ----------- | -------- | --------  | ----------------- |\n';
md += `| ${repoLink} | ${hLink} | ${cLink}  | ${jsLink}         |\n\n`;

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
  const js = fs.readFileSync(jsFile, 'utf-8');
  var re3 = /((?:\s*\/\/.*\n)+)/g;
  while ((a = re3.exec(js)) !== null) {
    const m2 = stripComments(a[1]).match(/^[^`]+?`(.*)`.*?\n([\s\S]+)$/);
    if (!m2) continue;
    md += `#### ${m2[1].replace(/\(.*/, '')}\n`;
    md += `\n${backs}javascript\n${m2[1]}\n${backs}\n${m2[2]}\n`;
  }
}

fs.writeFileSync(dstFile, md);
console.log(`- [${menuTitle}](${dstFile.replace(/.*\//, '')})`);
