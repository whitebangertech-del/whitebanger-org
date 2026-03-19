const fs = require('fs');
const path = require('path');

const sourceDir = __dirname;

function minifyCSS(filePath, outPath) {
    if (!fs.existsSync(filePath)) return;
    let css = fs.readFileSync(filePath, 'utf8');
    // Simple regex-based minification (matching deploy.ps1 logic)
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    css = css.replace(/[\r\n]+/g, '');
    css = css.replace(/\s+/g, ' ');
    css = css.replace(/\s*{\s*/g, '{');
    css = css.replace(/\s*}\s*/g, '}');
    css = css.replace(/\s*:\s*/g, ':');
    css = css.replace(/\s*;\s*/g, ';');
    css = css.replace(/\s*,\s*/g, ',');
    fs.writeFileSync(outPath, css, 'utf8');
    console.log(`Minified CSS: ${path.basename(filePath)} -> ${path.basename(outPath)}`);
}

function minifyJS(filePath, outPath) {
    if (!fs.existsSync(filePath)) return;
    let js = fs.readFileSync(filePath, 'utf8');
    // Very basic JS minification (matching deploy.ps1 logic)
    let lines = js.split('\n');
    let minified = '';
    let inBlockComment = false;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('/*')) inBlockComment = true;
        
        if (inBlockComment) {
            if (line.includes('*/')) {
                inBlockComment = false;
                line = line.substring(line.indexOf('*/') + 2).trim();
            } else {
                return;
            }
        }
        
        if (line.startsWith('//')) return;
        
        // Remove end-of-line comments if not in a URL
        if (line.includes('//') && !line.includes('http://') && !line.includes('https://')) {
            line = line.substring(0, line.indexOf('//')).trim();
        }
        
        if (line !== '') minified += line + '\n';
    });

    // Remove block comments that span multiple lines correctly
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    
    fs.writeFileSync(outPath, minified, 'utf8');
    console.log(`Minified JS: ${path.basename(filePath)} -> ${path.basename(outPath)}`);
}

console.log('Optimizing CSS & JS files...');
minifyCSS(path.join(sourceDir, 'wb-style.css'), path.join(sourceDir, 'wb-style.min.css'));
minifyJS(path.join(sourceDir, 'wb-script.js'), path.join(sourceDir, 'wb-script.min.js'));
minifyJS(path.join(sourceDir, 'wb-translations.js'), path.join(sourceDir, 'wb-translations.min.js'));
console.log('Optimization Complete!');
