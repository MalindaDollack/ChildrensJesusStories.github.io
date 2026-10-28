/* A reversible play view: the game keeps its state and the website keeps its scroll position. */
(function(){
'use strict';
if(window.GardenPlay)return;
var current=null,buttonStyle='min-height:44px;padding:10px 16px;margin:6px;border:2px solid #5b197d;border-radius:24px;background:#fff;color:#4b146f;font:bold 16px Arial;cursor:pointer;touch-action:manipulation';
var css=document.createElement('style');css.textContent=`
.garden-play-dialog{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;background:#fff9e8;color:#4b146f;overflow:hidden;overscroll-behavior:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)}
.garden-play-bar{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;flex:none;padding:3px;background:#f8efff;border-bottom:2px solid #d9b3ee;min-height:54px}
.garden-play-stage{position:relative;flex:1;min-height:0;overflow:hidden;display:flex;align-items:center;justify-content:center}
.garden-play-content{position:absolute;top:0;left:0;transform-origin:top left;box-sizing:border-box}
.garden-play-dialog [data-garden-launch],.garden-child-play [data-garden-launch]{display:none!important}
.garden-game-active{box-sizing:border-box!important;margin:0!important;max-width:none!important;padding:8px!important;border-width:2px!important;border-radius:0!important}
.garden-game-active h1,.garden-game-active h2,.garden-game-active h3{font-size:18px!important;margin:3px 0!important;line-height:1.12!important}
.garden-game-active p{margin:4px!important}.garden-game-active [data-garden-music],.garden-game-active [data-garden-sound]{display:inline-block!important;font-size:14px!important;min-height:40px!important;padding:7px 11px!important;margin:3px!important}
.garden-game-active .instructions,.garden-game-active .intro,.garden-game-active .note,.garden-game-active .small,.garden-game-active .last,.garden-game-active .malinda-sudoku-instructions,.garden-game-active .malinda-sudoku-last,.garden-game-active .malinda-wordsearch-intro,.garden-game-active .malinda-wordsearch-note,.garden-game-active .malinda-wordsearch-top,.garden-game-active .malinda-wordsearch-flowers,.garden-game-active .malinda-wordsearch-banner,.garden-game-active .footer,.garden-game-active #originalTitle,.garden-game-active #scripture,.garden-game-active header>p,.garden-game-active>p:first-of-type{display:none!important}
.garden-game-active .story-match-board,.garden-game-active .board{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:4px!important}
.garden-game-active .story-match-card{height:clamp(38px,calc((var(--garden-height) - 190px)/6),120px)!important;min-height:0!important}
.garden-game-active .card{height:clamp(34px,calc((var(--garden-height) - 190px)/8),120px)!important;aspect-ratio:auto!important;min-height:0!important}
.garden-game-active .card img,.garden-game-active .story-match-card img{object-fit:contain!important}
.garden-game-active .bottom,.garden-game-active .story-match-bottom{min-height:0!important;padding:3px!important}
.garden-game-active .malinda-sudoku-play,.garden-game-active .play{display:flex!important;flex-direction:column!important;align-items:center!important;margin:5px!important;gap:5px!important}
.garden-game-active .malinda-sudoku-board,.garden-game-active.game #board{width:342px!important;max-width:100%!important;height:auto!important;aspect-ratio:1;grid-template-columns:repeat(9,minmax(0,1fr))!important;grid-template-rows:repeat(9,minmax(0,1fr))!important;grid-auto-rows:1fr!important}
.garden-game-active .malinda-sudoku-cell,.garden-game-active .cell{width:100%!important;height:100%!important;min-width:0!important}
.garden-game-active .cell img{width:100%!important;height:100%!important;margin:0!important}
.garden-game-active .malinda-sudoku-picker{width:342px!important;max-width:100%!important;padding:3px!important}.garden-game-active .malinda-sudoku-picker h4{font-size:14px!important;margin:1px!important}
.garden-game-active .malinda-sudoku-tiles,.garden-game-active #tiles{width:100%!important;display:grid!important;grid-template-columns:repeat(9,minmax(0,1fr))!important;gap:2px!important}
.garden-game-active .malinda-sudoku-tile,.garden-game-active .tile{width:100%!important;height:auto!important;aspect-ratio:1!important}.garden-game-active .tile img{width:100%!important;height:100%!important;margin:0!important}
.garden-game-active .malinda-wordsearch-gridwrap{overflow:hidden!important;padding:2px!important}.garden-game-active .malinda-wordsearch-grid{width:100%!important;box-sizing:border-box!important}.garden-game-active .malinda-wordsearch-cell{width:auto!important;flex:1 1 0!important;min-width:0!important;height:24px!important;font-size:11px!important}
.garden-game-active .malinda-word-list{padding:5px!important;margin:4px!important}.garden-game-active .malinda-word{font-size:12px!important;margin:2px 1%!important;width:48%!important}.garden-game-active .malinda-word-list h4{margin:2px!important;font-size:14px!important}
.garden-game-active .layout{display:flex!important;flex-direction:column!important;align-items:center!important;gap:4px!important;margin:4px!important}.garden-game-active .puzzle{width:100%!important;max-width:450px!important;margin:0!important}.garden-game-active .words{width:100%!important;flex:auto!important;padding:3px!important}.garden-game-active .words h2{font-size:14px!important}.garden-game-active #wordList{display:flex;flex-wrap:wrap;justify-content:center;gap:2px 10px;font-size:12px!important;line-height:1.1!important}.garden-game-active #wordList br{display:none}
.garden-game-active #c{width:100%!important;height:auto!important}.garden-game-active header{padding:2px!important}.garden-game-active .controls{margin:2px!important;gap:3px!important}.garden-game-active .controls button{font-size:16px!important;padding:6px 12px!important;min-height:40px!important}
.garden-game-active .malinda-sudoku-win img,.garden-game-active .malinda-wordsearch-win img,.garden-game-active .win img{max-height:260px!important;object-fit:contain!important}
.garden-play-frame{position:fixed!important;left:0!important;top:var(--garden-frame-top)!important;width:100vw!important;height:var(--garden-frame-height)!important;max-width:none!important;margin:0!important;border:0!important;border-radius:0!important;z-index:2147483001!important;background:#fff9e8!important}
.garden-child-play{overflow:hidden!important;overscroll-behavior:none!important}.garden-child-play body{margin:0!important;overflow:hidden!important}.garden-child-stage{position:fixed;inset:0;overflow:hidden;background:#fff9e8}
`;
document.head.appendChild(css);
function makeButton(text,fn){var b=document.createElement('button');b.type='button';b.textContent=text;b.style.cssText=buttonStyle;b.onclick=fn;return b;}
function stopScroll(e){if(!e.touches||e.touches.length===1)e.preventDefault();}
function titleOf(game){var h=game.querySelector('h1,h2,h3');return h?h.textContent.trim():document.title;}
function fit(record){
 if(!record||!record.content)return;var stage=record.stage,content=record.content,rect=stage.getBoundingClientRect();if(!rect.width||!rect.height)return;
 content.style.transform='none';content.style.width=Math.max(300,Math.min(900,rect.width))+'px';content.style.setProperty('--garden-height',rect.height+'px');
 var width=content.scrollWidth,height=content.scrollHeight,scale=Math.min(1,rect.width/width,rect.height/height);
 content.style.transform='translate('+Math.max(0,(rect.width-width*scale)/2)+'px,'+Math.max(0,(rect.height-height*scale)/2)+'px) scale('+scale+')';
}
var child=null;
function prepare(game,stage){
 var mark=document.createComment('game position');game.parentNode.insertBefore(mark,game);var content=document.createElement('div');content.className='garden-play-content';stage.appendChild(content);game.classList.add('garden-game-active');content.appendChild(game);
 var rec={game:game,mark:mark,content:content,stage:stage};
 var queued=false;rec.schedule=function(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;fit(rec);});};
 rec.observer=new MutationObserver(rec.schedule);rec.observer.observe(game,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','hidden','src']});
 game.addEventListener('load',rec.schedule,true);window.addEventListener('resize',rec.schedule);if(window.visualViewport)visualViewport.addEventListener('resize',rec.schedule);rec.schedule();return rec;
}
function restore(rec){if(!rec)return;rec.observer.disconnect();rec.game.removeEventListener('load',rec.schedule,true);window.removeEventListener('resize',rec.schedule);if(window.visualViewport)visualViewport.removeEventListener('resize',rec.schedule);rec.game.classList.remove('garden-game-active');rec.mark.parentNode.insertBefore(rec.game,rec.mark);rec.mark.remove();rec.content.remove();}
function activateChild(){if(child)return;var game=standalone();if(!game)return;document.documentElement.classList.add('garden-child-play');var stage=document.createElement('div');stage.className='garden-child-stage';document.body.appendChild(stage);stage.addEventListener('touchmove',stopScroll,{passive:false});stage.addEventListener('wheel',stopScroll,{passive:false});child=prepare(game,stage);child.root=stage;}
function deactivateChild(){if(!child)return;var stage=child.root;restore(child);child=null;stage.remove();document.documentElement.classList.remove('garden-child-play');}
function close(){if(!current)return;var rec=current;current=null;if(rec.frame){rec.frame.classList.remove('garden-play-frame');rec.frame.style.removeProperty('--garden-frame-top');rec.frame.style.removeProperty('--garden-frame-height');try{rec.frame.contentWindow.GardenPlay.deactivate();}catch(e){}window.removeEventListener('resize',rec.size);}else restore(rec.inner);
 rec.dialog.remove();document.body.style.cssText=rec.bodyStyle;document.documentElement.style.cssText=rec.htmlStyle;window.scrollTo(rec.x,rec.y);rec.launch.focus({preventScroll:true});document.removeEventListener('keydown',escape);
}
function escape(e){if(e.key==='Escape'){close();e.preventDefault();}}
function open(game,launch,frame){
 if(current)return;var dialog=document.createElement('div');dialog.className='garden-play-dialog';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label',frame?frame.title:titleOf(game));var bar=document.createElement('div');bar.className='garden-play-bar';var back=makeButton('Back to Website',close);bar.appendChild(back);dialog.appendChild(bar);var stage=document.createElement('div');stage.className='garden-play-stage';dialog.appendChild(stage);
 var rec={dialog:dialog,launch:launch,x:window.scrollX,y:window.scrollY,bodyStyle:document.body.style.cssText,htmlStyle:document.documentElement.style.cssText};current=rec;
 document.body.style.position='fixed';document.body.style.top=-rec.y+'px';document.body.style.left='0';document.body.style.width='100%';document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';document.body.appendChild(dialog);dialog.addEventListener('touchmove',stopScroll,{passive:false});dialog.addEventListener('wheel',stopScroll,{passive:false});
 if(frame){rec.frame=frame;rec.size=function(){var r=stage.getBoundingClientRect();frame.style.setProperty('--garden-frame-top',r.top+'px');frame.style.setProperty('--garden-frame-height',r.height+'px');};rec.size();frame.classList.add('garden-play-frame');window.addEventListener('resize',rec.size);try{frame.contentWindow.GardenPlay.activate();}catch(e){close();return;}}
 else rec.inner=prepare(game,stage);
 document.addEventListener('keydown',escape);back.focus({preventScroll:true});
}
function launch(game,b){try{if(window!==top&&top.GardenPlay){top.GardenPlay.openFrame(window.frameElement,b);return;}}catch(e){}open(game,b);}
var single=null;
function standalone(){
 if(single)return single;
 if(window.GARDEN_MAZE){single=document.createElement('div');single.className='garden-maze-game';Array.from(document.body.children).forEach(function(el){if(!['SCRIPT','STYLE'].includes(el.tagName))single.appendChild(el);});document.body.appendChild(single);return single;}
 return document.querySelector('.gamebox,.game');
}
document.addEventListener('keydown',function(e){if(child&&e.key==='Escape'){try{top.GardenPlay.close();}catch(error){}e.preventDefault();}});
window.GardenPlay={openFrame:function(frame,launch){open(null,launch,frame);},activate:activateChild,deactivate:deactivateChild,close:close};
function init(){
 var sections=document.querySelectorAll('.story-match-section,.malinda-sudoku-section,.malinda-wordsearch-section');var games=sections.length?Array.from(sections):[standalone()].filter(Boolean);
 games.forEach(function(game){var b=makeButton('Play Without Scrolling',function(){launch(game,b);});b.setAttribute('data-garden-launch','');var h=game.querySelector('h1,h2,h3');if(h)h.insertAdjacentElement('afterend',b);else game.insertBefore(b,game.firstChild);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
