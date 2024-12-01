const fs = require('node:fs');
const srcDir = './src/';

const src = fs.readdirSync(srcDir)
    .map(file => {
        const content = fs.readFileSync(srcDir + file, 'utf-8');
        return content.substring(content.indexOf('*/') + 3)
    })
    .join('\n\n');

const cjs = `${src}
module.exports = Guacamole;`;

fs.rmSync('./lib/cjs/', { recursive: true, force: true });
fs.mkdirSync('./lib/cjs/', { recursive: true });
fs.writeFileSync('./lib/cjs/guacamole.js', cjs);
