import fs from 'node:fs';
import path from 'node:path';
const source = path.resolve('../MVDS/src');
const target = path.resolve('brand-tools/source');
const seen = new Set();
const packages = new Set();
function visit(file) {
 if (seen.has(file)) return; seen.add(file);
 const out = path.join(target, path.relative(source,file));
 fs.mkdirSync(path.dirname(out),{recursive:true}); fs.copyFileSync(file,out);
 if (!/\.(jsx?|tsx?|css)$/.test(file)) return;
 const text=fs.readFileSync(file,'utf8');
 const matches=[...text.matchAll(/(?:from\s*|import\s*\(?|export\s+[^;]*?from\s*)["']([^"']+)["']/g),...text.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)];
 for(const m of matches){ const spec=m[1].split('?')[0];
 if(!spec.startsWith('.')&&!spec.startsWith('@/')) {if(!spec.startsWith('/')&&!spec.startsWith('data:')) packages.add(spec);continue;}
 const base=spec.startsWith('@/')?path.join(source,spec.slice(2)):path.resolve(path.dirname(file),spec);
 const resolved=['','.js','.jsx','.ts','.tsx','.css','/index.js','/index.jsx','/index.ts','/index.tsx'].map(ext=>base+ext).find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
 if(resolved) visit(resolved); else console.log('UNRESOLVED',file,spec);
 }
}
for(const entry of ['features/brand-tools/ReportFeature.jsx','features/brand-tools/post-renderer.js','features/brand-tools/citation-renderer.js','styles/index.css'])visit(path.join(source,entry));
console.log('Copied',seen.size,'files. Packages:',[...packages].sort());
for (const name of ['report-logos','report-media','NibPro-SemiBold.woff2']) {const p=path.resolve('../MVDS/public',name); if(fs.existsSync(p))fs.cpSync(p,path.resolve('public',name),{recursive:true});}
