const fs = require('fs');

const f = (d) => {
  let a = ['<ul>'];
  const md = fs.readFileSync(`${d}/index.md`, 'utf-8');
  md.split('\n').forEach((line) => {
    const m = line.match(/\[(.+)\]\((.+)\)/);
    if (!m) {
      console.error(m);
    } else if (m[2].match(/.md$/)) {
      a.push(`<li><a href="${d}/${m[2]}">${m[1]}</a></li>`);
    } else {
      const caret = '<i class="fa fa-caret-down"></i>';
      a.push(`<div class="tree-toggler">${caret}&nbsp;${m[1]}</div>`);
      a = a.concat(f(`${d}/${m[2]}`));
    }
  });
  a.push('</ul>');
  return a;
};
console.log(f('/docs').join('\n'));
