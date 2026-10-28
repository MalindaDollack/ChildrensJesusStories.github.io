/* Gentle game effects; audio begins only after a player's gesture. */
(function () {
  'use strict';
  var enabled = true, context, active = [];
  var scriptUrl = document.currentScript.src;
  var pianoUrl = new URL('games/jesus-loves-you-piano.mp3', scriptUrl).href;
  try { enabled = localStorage.getItem('storyGardenSound') !== 'off'; } catch (e) {}
  function update() {
    document.querySelectorAll('[data-garden-sound]').forEach(function (b) {
      b.textContent = enabled ? 'Sound Effects: ON' : 'Sound Effects: OFF';
      b.setAttribute('aria-pressed', String(enabled));
      b.setAttribute('aria-label', enabled ? 'Turn game sounds off' : 'Turn game sounds on');
    });
  }
  function stop() { active.forEach(function (s) { try { s.stop(); } catch (e) {} }); active = []; }
  function unlock() {
    try { var Audio = window.AudioContext || window.webkitAudioContext; if(!Audio)return; context = context || new Audio(); if(context.state === 'suspended')context.resume().catch(function(){}); } catch(e){}
  }
  document.addEventListener('pointerdown', unlock, {passive:true});
  document.addEventListener('touchstart', unlock, {passive:true});
  function play(kind) {
    if (!enabled) return;
    try {
      var Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      context = context || new Audio();
      if (context.state === 'suspended') context.resume().catch(function () {});
      var t = context.currentTime, gain = context.createGain(), source, duration;
      if (kind === 'swoosh') {
        duration = .3;
        var buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        source = context.createBufferSource(); source.buffer = buffer;
        var filter = context.createBiquadFilter(); filter.type = 'bandpass'; filter.Q.value = .7;
        filter.frequency.setValueAtTime(1800, t); filter.frequency.exponentialRampToValueAtTime(250, t + duration);
        source.connect(filter); filter.connect(gain);
        gain.gain.setValueAtTime(.001, t); gain.gain.linearRampToValueAtTime(.16, t + .07);
      } else {
        duration = kind === 'drop' ? .15 : .045;
        source = context.createOscillator(); source.type = 'sine';
        source.frequency.setValueAtTime(kind === 'drop' ? 580 : 1100, t);
        source.frequency.exponentialRampToValueAtTime(kind === 'drop' ? 210 : 650, t + duration);
        source.connect(gain); gain.gain.setValueAtTime(.12, t);
      }
      gain.gain.exponentialRampToValueAtTime(.001, t + duration);
      gain.connect(context.destination); active.push(source);
      source.onended = function () { active = active.filter(function (s) { return s !== source; }); gain.disconnect(); };
      source.start(t); source.stop(t + duration);
    } catch (e) { /* Games remain playable when audio is unavailable. */ }
  }
  function mount(container, withMusic) {
    if (!container || container.querySelector('[data-garden-sound]')) return;
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-garden-sound', '');
    b.style.cssText = 'display:block;min-height:44px;margin:10px auto;padding:10px 18px;border:2px solid #5b197d;border-radius:24px;background:#fff;color:#4b146f;font:bold 16px Arial;cursor:pointer;touch-action:manipulation';
    b.onclick = function () {
      enabled = !enabled; if (!enabled) stop();
      try { localStorage.setItem('storyGardenSound', enabled ? 'on' : 'off'); } catch (e) {}
      update(); if (enabled) play('click');
    };
    container.appendChild(b); update();
    if(withMusic) {
      var music=document.createElement('button'), audio=document.createElement('audio'), note=document.createElement('span');
      audio.src=pianoUrl;audio.loop=true;audio.preload='none';audio.volume=.35;
      music.type='button';music.setAttribute('data-garden-music','');music.style.cssText=b.style.cssText;
      music.title='Jesus Loves Me — piano by Malinda Dollack';
      note.setAttribute('role','status');note.style.cssText='display:block;font-size:14px;color:#4b146f';
      function musicState(){music.textContent=audio.paused?'Music: OFF':'Music: ON';music.setAttribute('aria-pressed',String(!audio.paused));music.setAttribute('aria-label',audio.paused?'Turn piano music on':'Turn piano music off');}
      var owner=window;
      try{if(window.top.location.origin===location.origin)owner=window.top;}catch(e){}
      if(!owner.storyGardenMusicPlayers)owner.storyGardenMusicPlayers=[];
      owner.storyGardenMusicPlayers.push(audio);
      music.onclick=function(){
        note.textContent='';
        if(!audio.paused){audio.pause();return;}
        owner.storyGardenMusicPlayers.forEach(function(other){if(other!==audio)other.pause();});
        var result=audio.play();if(result&&result.catch)result.catch(function(){note.textContent='Please tap Music again to play your piano recording.';musicState();});
      };
      audio.addEventListener('play',musicState);audio.addEventListener('pause',musicState);
      audio.addEventListener('error',function(){note.textContent='The piano recording could not load. Please try again.';musicState();});
      window.addEventListener('pagehide',function(){audio.pause();});
      container.insertBefore(music,b);container.appendChild(audio);container.appendChild(note);musicState();
    }
  }
  window.addEventListener('storage', function (e) { if (e.key === 'storyGardenSound') { enabled = e.newValue !== 'off'; if (!enabled) stop(); update(); } });
  window.GardenSound = {play:play, mount:mount};
  function init() {
    var sections = document.querySelectorAll('.story-match-section,.malinda-sudoku-section,.malinda-wordsearch-section');
    if (sections.length) sections.forEach(function (s) { var slot = document.createElement('div'); (s.querySelector('h3') || s.firstElementChild).insertAdjacentElement('afterend', slot); mount(slot, !s.classList.contains('malinda-sudoku-section')); });
    else { var header = document.querySelector('header,h1'); if (header) { var slot = document.createElement('div'); header.insertAdjacentElement('afterend', slot); mount(slot, document.body.getAttribute('data-game-music')==='true'); } }
    var play=document.createElement('script');play.src=new URL('game-play.js?v=20261028-scroll',scriptUrl).href;document.head.appendChild(play);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
