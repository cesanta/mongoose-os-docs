const fs = require('fs');

const dstFile = process.argv[2];     // Destination .md file
const repoName = process.argv[3];    // Repo name, e.g. 'cesanta/mongoose-os'
const hFile = process.argv[4];       // C header file
let jsFile = process.argv[5] || '';  // JS source file
const hBase = (hFile || '').replace(/.+\//, '');
let menuTitle = process.argv[6] || hBase;
const readmeMD = process.argv[7];

const ignoreHeaders = {
  'mgos.h': 1,
  'mgos_config_util.h': 1,
  'mgos_features.h': 1,
  'mgos_dlsym.h': 1,
  'mgos_init.h': 1,
  'mgos_sys_debug.h': 1,
};
const ignoreRepos = {
  'mongoose-os-libs/json-store': 1,
  'mongoose-os-libs/js-demo-bundle': 1,
  'mongoose-os-libs/demo-bundle': 1,
  'mongoose-os-libs/core': 1,
  'mongoose-os-libs/empty': 1,
};
if (ignoreHeaders[hBase] || ignoreRepos[repoName]) process.exit(0);

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
  'mgos_debug.h': 'api_log.js',
};

const menuTitles = {
  'frozen.h': 'JSON',
  'cs_dbg.h': 'Logging',
  'mbuf.h': 'Membuf',
  'mg_str.h': 'String',
  'mgos_app.h': 'App',
  'mgos_bitbang.h': 'Bitbang',
  'mgos_debug.h': 'Debug (UART)',
  'mgos_event.h': 'Event',
  'mgos_gpio.h': 'GPIO',
  'mgos_net.h': 'Net events',
  'mgos_sys_config.h': 'Config',
  'mgos_system.h': 'System',
  'mgos_time.h': 'Time',
  'mgos_timers.h': 'Timers',
  'mgos_uart.h': 'UART',
  'mgos_utils.h': 'Utils',
};
if (menuTitles[hBase]) menuTitle = menuTitles[hBase];

const stripComments = text =>
    (text.startsWith('/*') ?
         text.replace(/^\/\*/, '')
             .replace(/\*\//, '')
             .replace(/\n\s*\* ?/g, '\n') :
         text.replace(/(^|\n)\s*\/\/ ?/g, '$1').replace(/^\s+|\s+$/, ''));

let md = '';
md += `# ${menuTitle}\n`;

// ------------------------------------------------ Add GitHub links table
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
} else if (repoName == 'cesanta/frozen') {
  const cBase = hBase.replace(/.h$/, '.c');
  hLink = `[${hBase}](${repoURL}/tree/master/${hBase})`;
  cLink = `[${cBase}](${repoURL}/tree/master/${cBase})`;
} else {
  hLink = `[${hBase}](${repoURL}/tree/master/include/${hBase})`;
  // const cBase = hBase.replace(/.h$/, '.c');
  // cLink = `[src/](${repoURL}/tree/master/src/)`;
  const jsBase = jsFile.replace(/.*\//, '');
  if (jsBase) {
    jsLink = `[${jsBase}](${repoURL}/tree/master/mjs_fs/${jsBase})`;
  }
}
// md += '### Github repo links\n';
md += '| Github Repo | C Header | C source  | JS source |\n';
md += '| ----------- | -------- | --------  | ----------------- |\n';
md += `| ${repoLink} | ${hLink} | ${cLink}  | ${jsLink}         |\n\n`;

// ------------------------------------------------  Add READM
if (readmeMD) {
  const text = fs.readFileSync(readmeMD, 'utf-8').replace(/^#.*/, '');
  md += `${text}\n\n ----- \n`;
}

// ------------------------------------------------  Add C/C++ API
const re = /^\s*(((\s*\/\/.*\n)+)|(\/\*([^\*]|\*[^\/])*\*\/))/;
const source = hFile ? fs.readFileSync(hFile, 'utf-8') : '';
const m = source.replace(re, '').match(re);
if (m) md += `${stripComments(m[1])}\n\n ----- \n`;

const rest = source.replace(re, '').replace(re, '');
const re2 =
    /(((\s*\/\/.*\n)+)|(\/\*([^\*]|\*[^\/])*\*\/))\s+(?![\s\/])([\s\S]+?)\n\n/g;
let a;
const backs = '```';
const dd = '\n<div class="apidescr">\n';
while ((a = re2.exec(rest)) != null) {
  const x = a[6].match(/^.*?\*?(\S+)\(/);
  // console.error('----------', a[6]);
  if (!x) continue;
  md += `#### ${x[1]}\n`;
  md += `\n${backs}c\n${a[6]}\n${backs}${dd}${stripComments(a[1])}\n</div>\n`;
}

// ------------------------------------------------  Add JS API

if (jsFile) {
  md += '\n### JS API\n\n --- \n';
  const js = fs.readFileSync(jsFile, 'utf-8');
  var re3 = /((?:\s*\/\/.*\n)+)/g;
  while ((a = re3.exec(js)) !== null) {
    const m2 = stripComments(a[1]).match(/^[^`]+?`(.*)`.*?\n([\s\S]+)$/);
    if (!m2) continue;
    md += `#### ${m2[1].replace(/\(.*/, '')}\n`;
    md += `\n${backs}javascript\n${m2[1]}\n${backs}${dd}${m2[2]}\n</div>\n`;
  }
}

fs.writeFileSync(dstFile, md);
console.log(`- [${menuTitle}](${dstFile.replace(/.*\//, '')})`);
