const fs = require('fs');
const srcDir = './src/';

fs.rmSync('./lib/', { recursive: true, force: true });

const src = fs.readdirSync(srcDir)
    .map(file => {
        const content = fs.readFileSync(srcDir + file, 'utf-8');
        return content.substring(content.indexOf('*/') + 3)
    })
    .join('\n\n');

const esm = `${src}
export default Guacamole;`;

fs.mkdirSync('./lib/esm/', { recursive: true });
fs.writeFileSync('./lib/esm/index.js', esm);

const cjs = `${src}
module.exports = Guacamole;`;

fs.mkdirSync('./lib/cjs/', { recursive: true });
fs.writeFileSync('./lib/cjs/index.js', cjs);
