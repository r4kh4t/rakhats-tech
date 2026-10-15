import { readdir, readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
const posts = await Promise.all((await readdir('content/posts')).filter(f=>f.endsWith('.json')).map(async f=>JSON.parse(await readFile(`content/posts/${f}`,'utf8'))));
const slugs=new Set();
for(const p of posts){assert.match(p.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);assert(!slugs.has(p.slug),'Duplicate article slug');slugs.add(p.slug);assert(p.title&&p.description&&p.category&&p.paragraphs.length);assert.match(p.date,/^\d{4}-\d{2}-\d{2}$/);assert(!Number.isNaN(Date.parse(p.date)));assert.equal(new URL(p.source).hostname,'www.linkedin.com');}
const files=(await readdir('dist',{recursive:true})).filter(f=>f.endsWith('.html'));
let checked=0;
for(const file of files){const html=await readFile('dist/'+file,'utf8');assert(html.includes('id="main"'),`${file} missing main target`);assert(html.includes('rel="canonical"'));assert(!html.includes('undefined'));assert(!html.includes('TODO'));for(const [,link]of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:#[^"]*)?"/g)){if(!link)continue;const path=link==='/'?'index.html':link.slice(1);let found=false;for(const candidate of [path,path+'.html',path+'/index.html']){try{if((await stat('dist/'+candidate)).isFile()){found=true;break}}catch{}}assert(found,`${file} broken local link ${link}`);checked++;}}
const feed=await readFile('dist/feed.xml','utf8');assert.equal([...feed.matchAll(/<item>/g)].length,posts.length);const sitemap=await readFile('dist/sitemap.xml','utf8');assert.equal([...sitemap.matchAll(/<url>/g)].length,posts.length+2);
console.log(`Passed: ${posts.length} content records, ${files.length} HTML pages, ${checked} local links/assets, RSS and sitemap.`);
