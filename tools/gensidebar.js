const fs = require('fs');

const f = (dir, depth) => {
  const toggleLevel = 0;
  const st = depth >= toggleLevel + 1 ? 'display:none;' : '';
  let a = [`<ul class="tree" style="${st}">`];
  const md = fs.readFileSync(`${dir}/index.md`, 'utf-8');
  md.split('\n').forEach((line) => {
    const m = line.match(/\[(.+)\]\((.+)\)/);
    if (!m) return;
    const link = dir.replace(/^./, '/docs');
    if (m[2].match(/.md$/)) {
      a.push(`<li><a href="${link}/${m[2]}">${m[1]}</a></li>`);
    } else {
      const cls = depth >= toggleLevel ? 'fa-caret-right' : 'fa-caret-down';
      const caret = `<i class="fa fa-fw ${cls}"></i>`;
      a.push(`<div class="tree-toggler">${caret}&nbsp;${m[1]}`);
      a = a.concat(f(`${dir}/${m[2]}`, depth + 1));
      a.push('</div>');
    }
  });
  a.push('</ul>');
  return a;
};
console.log(f('.', 0, '').join('\n'));
