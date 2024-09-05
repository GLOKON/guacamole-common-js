const fs = require('fs');
const srcDir = './src/';

const src = fs.readdirSync(srcDir)
    .map(file => {
        const content = fs.readFileSync(srcDir + file, 'utf-8');
        return content.substring(content.indexOf('*/') + 3)
    })
    .join('\n\n');

let esm = `${src}
export default Guacamole;
`;

fs.rmSync('./lib/esm/', { recursive: true, force: true });
fs.mkdirSync('./lib/esm/', { recursive: true });
fs.writeFileSync('./lib/esm/guacamole.js', esm);

import('./lib/esm/guacamole.js').then((Guac) => {
    const namesToExport = Object.keys(Guac.default);
    esm += namesToExport.map(n => `const ${n} = Guacamole.${n};`).join('\n');
    esm += `\nexport {\n${namesToExport.map(n => `    ${n},`).join('\n')}\n};`;
    fs.writeFileSync('./lib/esm/guacamole.js', esm);
})