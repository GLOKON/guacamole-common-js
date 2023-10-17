const fs = require('fs');
const srcDir = './src/';

const src = fs.readdirSync(srcDir)
    .map(file => {
        const content = fs.readFileSync(srcDir + file, 'utf-8');
        return content.substring(content.indexOf('*/') + 3)
    })
    .join('\n\n');

const esm = `${src}
export default Guacamole;`;

fs.rmSync('./lib/esm/', { recursive: true, force: true });
fs.mkdirSync('./lib/esm/', { recursive: true });
fs.writeFileSync('./lib/esm/index.js', esm);
