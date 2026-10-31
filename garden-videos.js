(function(root){
'use strict';
// Alberta permanent UTC-6. A reading day starts at 06:00 ABT (12:00 UTC).
// Fixed offset avoids outdated timezone tables on older Windows/iPhone browsers.
function readingDay(now){return new Date(+now-12*60*60*1000).toISOString().slice(0,10);}
function selectReadings(items,now){var day=readingDay(now);return {day:day,today:items.filter(function(x){return x.date===day;})[0]||null,past:items.filter(function(x){return x.date<day;}).sort(function(a,b){return b.date.localeCompare(a.date);})};}
root.GardenReadingClock={readingDay:readingDay,selectReadings:selectReadings};
if(typeof document==='undefined')return;
var data=root.GARDEN_VIDEO_DATA||{readings:[]};
function el(tag,text,cls){var e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;}
function choices(item,parent,key){
 var links=el('div',null,'video-links'),screen=el('div',null,'video-screen');screen.id='video-screen-'+key;screen.hidden=true;
 if(item.video){var a=el('a','Video');a.href='#'+screen.id;a.setAttribute('aria-expanded','false');a.setAttribute('aria-controls',screen.id);a.onclick=function(e){e.preventDefault();if(!screen.firstChild){var v=el('video');v.controls=true;v.playsInline=true;v.preload='none';v.src=item.video;if(item.poster)v.poster=item.poster;v.setAttribute('aria-label',item.title);screen.appendChild(v);var direct=el('a','Open Video');direct.href=item.video;screen.appendChild(direct);}screen.hidden=!screen.hidden;a.setAttribute('aria-expanded',String(!screen.hidden));if(screen.hidden)screen.querySelector('video').pause();};links.appendChild(a);}else{var pending=el('span','Video — coming soon');pending.setAttribute('aria-disabled','true');links.appendChild(pending);}
 if(item.youtube){var yt=el('a','U-Tube');yt.href=item.youtube;yt.target='_blank';yt.rel='noopener';links.appendChild(yt);}else{var s=el('span','U-Tube — coming soon');s.setAttribute('aria-disabled','true');links.appendChild(s);}
 parent.appendChild(links);parent.appendChild(screen);
}
var lastDay='';
function render(){var selected=selectReadings(data.readings,new Date());if(selected.day===lastDay)return;lastDay=selected.day;
 var today=document.getElementById('today-reading');if(today){today.textContent='';var title=el('h3',selected.today?selected.today.title:'Today’s reading is coming soon.');today.appendChild(title);choices(selected.today||{},today,'today');}
 var archive=document.getElementById('past-readings');if(archive){archive.textContent='';selected.past.forEach(function(item,i){var card=el('article',null,'garden-video-card');card.appendChild(el('h2',item.title));choices(item,card,'past-'+i);archive.appendChild(card);});if(!selected.past.length)archive.appendChild(el('p','Past readings will appear here.'));}
}
var sarah=document.querySelector('[data-video-key="sarah-intro"]');if(sarah&&data.sarahIntro){sarah.textContent='';sarah.appendChild(el('h3',data.sarahIntro.title));var v=el('video');v.controls=true;v.playsInline=true;v.preload='none';v.src=data.sarahIntro.video;if(data.sarahIntro.poster)v.poster=data.sarahIntro.poster;v.setAttribute('aria-label',data.sarahIntro.title);sarah.appendChild(v);var links=el('div',null,'video-links');var a=el('a','Video');a.href=data.sarahIntro.video;links.appendChild(a);var yt=el('span','U-Tube — coming soon');yt.setAttribute('aria-disabled','true');links.appendChild(yt);sarah.appendChild(links);}
render();setInterval(render,1000);document.addEventListener('visibilitychange',render);window.addEventListener('pageshow',render);
})(typeof window!=='undefined'?window:globalThis);
