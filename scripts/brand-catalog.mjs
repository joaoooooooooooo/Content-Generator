import fs from 'node:fs';
const text=fs.readFileSync('brand-tools/source/features/brand-tools/report-features.js','utf8');
const features=[...text.matchAll(/value: "([^"]+)", label: "([^"]+)", group: "([^"]+)"/g)].map(m=>({value:m[1],label:m[2],group:m[3]}));
fs.mkdirSync('templates/brand-tools',{recursive:true});
fs.writeFileSync('templates/brand-tools/features.json',JSON.stringify(features,null,2)+'\n');
