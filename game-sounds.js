/* Gentle game effects; audio begins only after a player's gesture. */
(function () {
  'use strict';
  var enabled = true, context, active = [];
  try { enabled = localStorage.getItem('storyGardenSound') !== 'off'; } catch (e) {}
  function update() {
    document.querySelectorAll('[data-garden-sound]').forEach(function (b) {
      b.textContent = enabled ? 'Sound: ON' : 'Sound: OFF';
      b.setAttribute('aria-pressed', String(enabled));
      b.setAttribute('aria-label', enabled ? 'Turn game sounds off' : 'Turn game sounds on');
    });
  }
  function stop() { active.forEach(function (s) { try { s.stop(); } catch (e) {} }); active = []; }
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
  function mount(container) {
    if (!container || container.querySelector('[data-garden-sound]')) return;
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-garden-sound', '');
    b.style.cssText = 'display:block;min-height:44px;margin:10px auto;padding:10px 18px;border:2px solid #5b197d;border-radius:24px;background:#fff;color:#4b146f;font:bold 16px Arial;cursor:pointer;touch-action:manipulation';
    b.onclick = function () {
      enabled = !enabled; if (!enabled) stop();
      try { localStorage.setItem('storyGardenSound', enabled ? 'on' : 'off'); } catch (e) {}
      update(); if (enabled) play('click');
    };
    container.appendChild(b); update();
  }
  window.addEventListener('storage', function (e) { if (e.key === 'storyGardenSound') { enabled = e.newValue !== 'off'; if (!enabled) stop(); update(); } });
  window.GardenSound = {play:play, mount:mount};
  function init() {
    var sections = document.querySelectorAll('.story-match-section,.malinda-sudoku-section,.malinda-wordsearch-section');
    if (sections.length) sections.forEach(function (s) { var slot = document.createElement('div'); (s.querySelector('h3') || s.firstElementChild).insertAdjacentElement('afterend', slot); mount(slot); });
    else { var header = document.querySelector('header,h1'); if (header) { var slot = document.createElement('div'); header.insertAdjacentElement('afterend', slot); mount(slot); } }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
