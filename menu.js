'use strict';

const fs = require('fs');
const path = require('path');

const base = 'src/';
const pagePreFix = 'https://jhonatantft.github.io/canvas/';
const sourcePrefix = 'https://github.com/jhonatantft/canvas/tree/master/';

const files = fs.readdirSync(base);

let html = fs.readFileSync('./index.html').toString();
let readme = fs.readFileSync('./README.md').toString();

let ul_html = '<div class="view">';
let md_value = '| Title |  |\n|:-------- |:--------:|\n';

const mlList = [
  'Particle-demo'
];

files.sort(function(a, b) {
  let astat = fs.lstatSync(base + a);
  let bstat = fs.lstatSync(base + b);

  return bstat.mtime - astat.mtime;
});

mlList.forEach(function(f) {
  var npath = path.join(base, f);
  var array = findHtml(npath);

  array.sort(function(a, b) {
    return b[2].mtime - a[2].mtime;
  });

  if (array.length > 0) {
    ul_html += `<p>${f}</p><ul class='main'>`;

    array.forEach(function(p) {
      const title = /<title>(.*)<\/title>/.test(
        fs.readFileSync(p[0]).toString()
      )
        ? RegExp.$1
        : 'Document';

      const address = pagePreFix + p[0];
      const filedir = path.dirname(sourcePrefix + p[0]);

      ul_html += `
          <li>
            <a href='${
              p[0]
            }' target='_blank' class='demo-name' title='Particles'>${title}</a><a href='${filedir}' class='demo-source' target='_blank' title='Particles'>See more</a>
          </li>
      `;

      md_value += `| [${title}](${address}) | [Particles](${filedir}) |\r`;
    });

    ul_html += '</ul>';
  }
});

ul_html += '</div>';
html = html.replace(/(<body>)[\s\S]*?(<\/body>)/, '$1' + ul_html + '$2');
readme = readme.replace(
  /(\[placeholder]:p)[\s\S]*?(\[\/placeholder]:p)/,
  '$1\n\n' + md_value + '\n\n$2'
);

fs.writeFileSync('./index.html', html);
fs.writeFileSync('./README.md', readme);

function findHtml(folder_path, collector) {
  collector = collector || [];

  let files = fs.readdirSync((folder_path += '/'));
  let npath, stat;

  files.forEach(function(f) {
    npath = folder_path + f;
    stat = fs.lstatSync(npath);

    if (stat.isDirectory()) {
      findHtml(npath, collector);
      return;
    }

    if (/^[^_].+\.html/.test(f)) {
      collector.push([npath, f, stat]);
    }
  });

  return collector;
}
