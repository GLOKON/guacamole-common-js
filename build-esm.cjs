const fs = require('node:fs');
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

//Now that we've written the ESM file, import it so we can dynamically add named exports
import('./lib/esm/guacamole.js').then((Guac) => {
    const namesToExport = Object.keys(Guac.default);
    esm += namesToExport.map((n) => `const exportGuac_${n} = Guacamole.${n};`).join('\n');   //Generate separate variable for each key in `Guacamole`

    esm += `\nexport {\n${namesToExport.map(n => `    exportGuac_${n} as ${n},`).join('\n')}\n};`; //Export every key
    fs.writeFileSync('./lib/esm/guacamole.js', esm);
});
