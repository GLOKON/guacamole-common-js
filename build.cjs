const fs = require('fs');
const srcDir = './src/';

const src = fs.readdirSync(srcDir)
    .map(file => {
        const content = fs.readFileSync(srcDir + file, 'utf-8');
        return content.substring(content.indexOf('*/') + 3)
    })
    .join('\n\n');

const cjs = `${src}
module.exports = Guacamole;`;

fs.rmSync('./lib/', { recursive: true, force: true });
fs.mkdirSync('./lib/', { recursive: true });
fs.writeFileSync('./lib/index.js', cjs);
