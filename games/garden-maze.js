/* Two deterministic, connected heart mazes. Geometry controls both drawing and movement. */
(function(root){
'use strict';
function random(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function heartPath(){var p=new Path2D();p.moveTo(500,940);p.bezierCurveTo(440,880,50,650,45,350);p.bezierCurveTo(5,55,330,0,500,190);p.bezierCurveTo(670,0,995,55,955,350);p.bezierCurveTo(950,650,560,880,500,940);p.closePath();return p;}
function makeMaze(kind){
 var rng=random(kind==='sarah'?72831:91207),nodes=[],map={},step=58;
 // Use a mathematical heart boundary independent of drawing libraries.
 var polygon=[{x:500,y:940}];
 [[500,940,440,880,50,650,45,350],[45,350,5,55,330,0,500,190],[500,190,670,0,995,55,955,350],[955,350,950,650,560,880,500,940]].forEach(function(b){for(var t=1;t<=50;t++){var u=t/50,v=1-u;polygon.push({x:v*v*v*b[0]+3*v*v*u*b[2]+3*v*u*u*b[4]+u*u*u*b[6],y:v*v*v*b[1]+3*v*v*u*b[3]+3*v*u*u*b[5]+u*u*u*b[7]});}});
 function inside(x,y){var hit=false,nearest=Infinity;for(var i=0,j=polygon.length-1;i<polygon.length;j=i++){var a=polygon[i],b=polygon[j];if((a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)hit=!hit;var dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy||1)));nearest=Math.min(nearest,Math.hypot(x-a.x-t*dx,y-a.y-t*dy));}return hit&&nearest>35;}
 for(var r=0;r<15;r++)for(var c=0;c<15;c++){var x=94+c*step,y=100+r*step;if(inside(x,y)){var n={id:nodes.length,r:r,c:c,x:x,y:y,links:[]};nodes.push(n);map[r+','+c]=n;}}
 // Keep the heart connected; carve a spanning tree with a seeded depth-first walk.
 var start=nodes.reduce(function(a,b){return b.y>a.y||b.y===a.y&&Math.abs(b.x-500)<Math.abs(a.x-500)?b:a;}),seen={},stack=[start];seen[start.id]=true;
 while(stack.length){var cur=stack[stack.length-1],options=[];[[0,-1],[1,0],[0,1],[-1,0]].forEach(function(d){var n=map[(cur.r+d[1])+','+(cur.c+d[0])];if(n&&!seen[n.id])options.push(n);});
 if(!options.length){stack.pop();continue;}var next=options[Math.floor(rng()*options.length)];cur.links.push(next.id);next.links.push(cur.id);seen[next.id]=true;stack.push(next);}
 var upper=nodes.filter(function(n){return n.x>650&&n.y<235;});
 function route(end){var q=[start.id],parent={};parent[start.id]=-1;for(var k=0;k<q.length;k++){var id=q[k];nodes[id].links.forEach(function(next){if(parent[next]===undefined){parent[next]=id;q.push(next);}});}var out=[end.id];while(out[out.length-1]!==start.id)out.push(parent[out[out.length-1]]);return out.reverse();}
 var finish=upper.reduce(function(a,b){return route(b).length>route(a).length?b:a;});
 return {nodes:nodes,start:start.id,finish:finish.id,solution:route(finish),step:step,kind:kind};
}
function install(){
 var config=root.GARDEN_MAZE;if(!config)return;
 var c=document.getElementById('c'),ctx=c.getContext('2d'),status=document.getElementById('status'),overlay=document.getElementById('celebrate');
 var game=makeMaze(config.kind),nodes=game.nodes,pos=game.start,trail=[pos],won=false,drag=false,pointer=null,lastPoint=null,timers=[],held=null,heldAt=0,images={};
 var background=document.createElement('canvas');background.width=1000;background.height=1000;var bg=background.getContext('2d');
 function strokeLinks(draw,width,color){draw.strokeStyle=color;draw.fillStyle=color;draw.lineWidth=width;draw.lineJoin='round';draw.lineCap='round';nodes.forEach(function(n){draw.beginPath();draw.arc(n.x,n.y,width/2,0,Math.PI*2);draw.fill();n.links.forEach(function(id){if(id<n.id)return;draw.beginPath();draw.moveTo(n.x,n.y);draw.lineTo(nodes[id].x,nodes[id].y);draw.stroke();});});}
 function garden(){
  var rng=random(1771),heart=heartPath();bg.fillStyle='#fff9e8';bg.fillRect(0,0,1000,1000);
  bg.save();bg.shadowColor='#48622855';bg.shadowBlur=18;bg.shadowOffsetY=9;bg.fillStyle='#387234';bg.fill(heart);bg.restore();
  // Clip the leaf texture to the smooth heart. Corridors are cut from this same surface.
  bg.save();bg.clip(heart);
  var floor=document.createElement('canvas');floor.width=1000;floor.height=1000;var f=floor.getContext('2d');strokeLinks(f,38,'#fff');
  // Entrance and finish garden clearings.
  var a=nodes[game.start],z=nodes[game.finish];f.beginPath();f.arc(z.x,z.y,28,0,Math.PI*2);f.fill();
  var mask=f.getImageData(0,0,1000,1000).data;
  bg.fillStyle='#244d29';bg.fillRect(0,0,1000,1000);
  var greens=['#3b7335','#51893b','#649d45','#7eaf4d','#91ba59','#a8c76b'];
  for(var y=20;y<980;y+=9)for(var x=20;x<980;x+=9){var px=x+(rng()-.5)*12,py=y+(rng()-.5)*12;bg.fillStyle=greens[Math.floor(rng()*greens.length)];bg.beginPath();bg.ellipse(px,py,5+rng()*6,3+rng()*4,rng()*Math.PI,0,Math.PI*2);bg.fill();}
  // Cut pale paths after leaves, so no leaf can obscure a playable corridor.
  strokeLinks(bg,38,'#f5e5bd');strokeLinks(bg,31,'#fff2d6');
  // Small flowers sit on hedge edges, never inside the walkways.
  var petals=['#fffdf1','#e8a6c4','#cfacd9','#f2ce63'];
  for(var j=0;j<440;j++){var fx=40+rng()*920,fy=50+rng()*880,idx=(Math.floor(fy)*1000+Math.floor(fx))*4;
   if(mask[idx+3]||!bg.isPointInPath(heart,fx,fy))continue;
   var near=false;for(var d=-22;d<=22;d+=44){var k=(Math.floor(fy)*1000+Math.floor(fx+d))*4;if(mask[k+3])near=true;}
   if(!near&&rng()>.15)continue;var size=3+rng()*2;bg.fillStyle=petals[j%4];for(var p=0;p<5;p++){var angle=p*Math.PI*2/5;bg.beginPath();bg.ellipse(fx+Math.cos(angle)*size,fy+Math.sin(angle)*size,size*.8,size*.5,angle,0,Math.PI*2);bg.fill();}bg.fillStyle='#e9b63b';bg.beginPath();bg.arc(fx,fy,1.7,0,Math.PI*2);bg.fill();
  }
  bg.restore();
 }
 function avatar(image,x,y,r,crop){ctx.save();ctx.shadowColor='#415b3344';ctx.shadowBlur=5;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();ctx.fillStyle='#fff';ctx.fillRect(x-r,y-r,r*2,r*2);if(crop)ctx.drawImage(image,crop[0],crop[1],crop[2],crop[3],x-r,y-r,r*2,r*2);else ctx.drawImage(image,x-r,y-r,r*2,r*2);ctx.restore();ctx.strokeStyle='#e9bc4b';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();}
 function render(){ctx.clearRect(0,0,1000,1000);ctx.drawImage(background,0,0);ctx.save();ctx.strokeStyle='#ffe05c';ctx.lineWidth=26;ctx.lineJoin='round';ctx.lineCap='round';ctx.shadowColor='#ffbd27';ctx.shadowBlur=17;ctx.beginPath();trail.forEach(function(id,i){var n=nodes[id];if(i)ctx.lineTo(n.x,n.y);else ctx.moveTo(n.x,n.y);});ctx.stroke();ctx.restore();var end=nodes[game.finish];avatar(images.goal,end.x,end.y,31,config.kind==='malinda'?[95,30,125,135]:[790,930,245,265]);var n=nodes[pos];avatar(images.jesus,n.x,n.y,29,[35,0,165,185]);}
 function reset(){timers.forEach(clearTimeout);timers=[];pos=game.start;trail=[pos];won=false;drag=false;pointer=null;held=null;overlay.style.display='none';status.textContent='Help Jesus find '+config.name+'! Touch Jesus to begin.';render();}
 function victory(){won=true;drag=false;held=null;status.textContent='You found '+config.name+'! JESUS LOVES YOU !';document.getElementById('prize').src=config.winner;[0,700,1400,2100,2800].forEach(function(t,i){timers.push(setTimeout(function(){overlay.style.display=i%2===0?'flex':'none';},t));});timers.push(setTimeout(reset,8500));}
 function move(id){if(won||nodes[pos].links.indexOf(id)<0)return;var at=trail.indexOf(id);if(at>=0)trail.length=at+1;else trail.push(id);pos=id;render();if(pos===game.finish)victory();}
 function toward(p){var cur=nodes[pos],best=null,dist=Math.hypot(cur.x-p.x,cur.y-p.y);cur.links.forEach(function(id){var n=nodes[id],d=Math.hypot(n.x-p.x,n.y-p.y);if(d<dist-2&&d<game.step*.78){dist=d;best=id;}});if(best!==null)move(best);}
 function point(e){var r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*1000/r.width,y:(e.clientY-r.top)*1000/r.height};}
 c.addEventListener('pointerdown',function(e){if(won||pointer!==null||e.isPrimary===false)return;var p=point(e),n=nodes[pos],r=c.getBoundingClientRect();if(Math.hypot(p.x-n.x,p.y-n.y)>Math.max(42,26*1000/r.width))return;pointer=e.pointerId;drag=true;lastPoint=p;c.setPointerCapture(pointer);e.preventDefault();});
 c.addEventListener('pointermove',function(e){if(!drag||e.pointerId!==pointer)return;var p=point(e),a=lastPoint,d=Math.hypot(p.x-a.x,p.y-a.y),steps=Math.ceil(d/12);for(var i=1;i<=steps;i++)toward({x:a.x+(p.x-a.x)*i/steps,y:a.y+(p.y-a.y)*i/steps});lastPoint=p;e.preventDefault();});
 ['pointerup','pointercancel','lostpointercapture'].forEach(function(ev){c.addEventListener(ev,function(e){if(e.pointerId===pointer){drag=false;pointer=null;lastPoint=null;}});});
 function arrow(dx,dy){var n=nodes[pos];var next=n.links.find(function(id){return nodes[id].c===n.c+dx&&nodes[id].r===n.r+dy;});if(next!==undefined)move(next);}
 var keys={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};c.addEventListener('keydown',function(e){if(keys[e.key]){arrow.apply(null,keys[e.key]);e.preventDefault();}});
 document.querySelectorAll('[data-d]').forEach(function(b){b.addEventListener('pointerdown',function(e){held=b.dataset.d.split(',').map(Number);heldAt=0;arrow.apply(null,held);b.setPointerCapture(e.pointerId);e.preventDefault();});['pointerup','pointercancel','lostpointercapture'].forEach(function(ev){b.addEventListener(ev,function(){held=null;});});});
 window.addEventListener('blur',function(){held=null;drag=false;pointer=null;});
 document.getElementById('reset').onclick=reset;
 function tick(t){if(held&&!won&&t-heldAt>160){arrow.apply(null,held);heldAt=t;}requestAnimationFrame(tick);}
 function image(name,src){return new Promise(function(resolve,reject){var im=new Image();im.onload=function(){images[name]=im;resolve();};im.onerror=reject;im.src=src;});}
 Promise.all([image('jesus','sarah-jesus.jpg'),image('goal',config.kind==='malinda'?'../web-images/matching-win-malinda.webp':'sarah-maze.jpg'),image('poster',config.poster)]).then(function(){
  var title=document.getElementById('originalTitle'),t=title.getContext('2d');t.drawImage(images.poster,0,0,1103,385,0,0,1103,385);
  var scripture=document.getElementById('scripture'),s=scripture.getContext('2d');s.drawImage(images.poster,180,1080,460,336,0,0,460,336);
  garden();reset();requestAnimationFrame(tick);
 }).catch(function(){status.textContent='A maze picture could not load. Please refresh to try again.';});
}
root.GardenMaze={make:makeMaze,install:install};if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();}
})(typeof window!=='undefined'?window:globalThis);
