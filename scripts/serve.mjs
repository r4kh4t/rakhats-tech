import './build.mjs';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.xml':'application/xml','.png':'image/png','.txt':'text/plain'};
createServer(async(req,res)=>{try{
  const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=resolve(root,'.'+(path==='/'?'/index.html':path));
  if(!file.startsWith(root+'/'))throw Error('Invalid path');
  try {if(!(await stat(file)).isFile())file+='.html'}catch{file+='.html'}
  const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(body);
}catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(root+'/404.html'));}}).listen(4321,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4321'));
