const fs = require('fs');
const path = require('path');

const sourceDir = __dirname;
const distDir = path.join(sourceDir, 'dist');

// Clean dist directory
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

console.log('Building production bundle...\n');

// Files and directories to copy to dist
const itemsToCopy = [
    // HTML files
    '*.html',
    // CSS files
    '*.css',
    // JS files
    '*.js',
    // Image files
    '*.png',
    '*.jpg',
    '*.jpeg',
    '*.svg',
    '*.gif',
    '*.webp',
    // Text files
    '*.txt',
    // Directories
    'css',
    'js',
    'erp',
    'mou-logos',
    'placement-logos',
    'supabase',
    '_agents'
];

// Files to exclude
const excludeFiles = [
    'node_modules',
    'dist',
    'package.json',
    'package-lock.json',
    '.env',
    '.gitignore',
    'build.cjs',
    'minify.cjs',
    'deploy.ps1',
    'fix_encoding.ps1',
    'fix_encoding_safe.ps1',
    'fix_encoding.py',
    'update_script.ps1',
    'ARCHITECTURE.md',
    'IMPROVEMENTS.md',
    'QUICK_START.md'
];

function shouldExclude(filePath) {
    const fileName = path.basename(filePath);
    return excludeFiles.some(exclude => {
        if (exclude.includes('/') || exclude.includes('\\')) {
            return filePath.includes(exclude);
        }
        return fileName === exclude;
    });
}

function copyRecursive(src, dest) {
    if (shouldExclude(src)) {
        return;
    }

    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const items = fs.readdirSync(src);
        items.forEach(item => {
            copyRecursive(path.join(src, item), path.join(dest, item));
        });
    } else {
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${path.relative(sourceDir, src)}`);
    }
}

function copyByPattern(pattern) {
    const files = fs.readdirSync(sourceDir);
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');

    files.forEach(file => {
        if (regex.test(file) && !shouldExclude(file)) {
            const srcPath = path.join(sourceDir, file);
            const destPath = path.join(distDir, file);

            const stats = fs.statSync(srcPath);
            if (stats.isFile()) {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied: ${file}`);
            }
        }
    });
}

// Copy all items
itemsToCopy.forEach(item => {
    if (item.includes('*')) {
        // Pattern matching
        copyByPattern(item);
    } else {
        // Direct file or directory
        const srcPath = path.join(sourceDir, item);
        const destPath = path.join(distDir, item);

        if (fs.existsSync(srcPath)) {
            const stats = fs.statSync(srcPath);
            if (stats.isDirectory()) {
                copyRecursive(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied: ${item}`);
            }
        }
    }
});

// Minify CSS
function minifyCSS(filePath, outPath) {
    if (!fs.existsSync(filePath)) return;
    let css = fs.readFileSync(filePath, 'utf8');
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    css = css.replace(/[\r\n]+/g, '');
    css = css.replace(/\s+/g, ' ');
    css = css.replace(/\s*{\s*/g, '{');
    css = css.replace(/\s*}\s*/g, '}');
    css = css.replace(/\s*:\s*/g, ':');
    css = css.replace(/\s*;\s*/g, ';');
    css = css.replace(/\s*,\s*/g, ',');
    fs.writeFileSync(outPath, css, 'utf8');
    console.log(`Minified: ${path.basename(filePath)} -> ${path.basename(outPath)}`);
}

// Minify JS
function minifyJS(filePath, outPath) {
    if (!fs.existsSync(filePath)) return;
    let js = fs.readFileSync(filePath, 'utf8');
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

        if (line.includes('//') && !line.includes('http://') && !line.includes('https://')) {
            line = line.substring(0, line.indexOf('//')).trim();
        }

        if (line !== '') minified += line + '\n';
    });

    minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    fs.writeFileSync(outPath, minified, 'utf8');
    console.log(`Minified: ${path.basename(filePath)} -> ${path.basename(outPath)}`);
}

// Minify specific files in dist
console.log('\nMinifying assets...');
const wbStylePath = path.join(distDir, 'wb-style.css');
const wbScriptPath = path.join(distDir, 'wb-script.js');
const wbTransPath = path.join(distDir, 'wb-translations.js');

if (fs.existsSync(wbStylePath)) {
    minifyCSS(wbStylePath, path.join(distDir, 'wb-style.min.css'));
}
if (fs.existsSync(wbScriptPath)) {
    minifyJS(wbScriptPath, path.join(distDir, 'wb-script.min.js'));
}
if (fs.existsSync(wbTransPath)) {
    minifyJS(wbTransPath, path.join(distDir, 'wb-translations.min.js'));
}

console.log('\n✓ Build complete! Output directory: dist/');
console.log('✓ Ready for deployment\n');
