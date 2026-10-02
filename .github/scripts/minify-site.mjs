import {readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {minify as minifyHtml} from 'html-minifier-terser';
import {minify as minifyJavaScript} from 'terser';

const siteDirectory = fileURLToPath(new URL('../../_site', import.meta.url));
let htmlCount = 0;
let javascriptCount = 0;

async function processDirectory(directory) {
    const entries = await readdir(directory, {withFileTypes: true});
    for (const entry of entries) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            await processDirectory(path);
            continue;
        }

        if (entry.name.endsWith('.html')) {
            const source = await readFile(path, 'utf8');
            const output = await minifyHtml(source, {
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyCSS: true,
                minifyJS: {compress: true, mangle: true},
                removeComments: true
            });
            await writeFile(path, output);
            htmlCount++;
        } else if (entry.name.endsWith('.js')) {
            const source = await readFile(path, 'utf8');
            const result = await minifyJavaScript(source, {
                compress: true,
                mangle: true,
                format: {comments: false}
            });
            if (!result.code) throw new Error(`Minifier produced no output for ${path}`);
            await writeFile(path, result.code);
            javascriptCount++;
        }
    }
}

await processDirectory(siteDirectory);
console.log(`Minified ${htmlCount} HTML files and ${javascriptCount} JavaScript files.`);