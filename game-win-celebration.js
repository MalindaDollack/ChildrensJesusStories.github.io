document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('storyMatchBoard');
  const message = document.getElementById('storyMatchMessage');
  const reset = document.getElementById('storyMatchReset');

  if (board && message && reset) {
    let celebrating = false;
    let celebrationTimer = null;

    const style = document.createElement('style');
    style.textContent = `
      #storyMatchBoard { position: relative; }
      .story-match-win-picture {
        position: absolute;
        inset: 0;
        z-index: 20;
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 14px;
        background: #fff;
        opacity: 1;
        pointer-events: none;
      }
      .story-match-win-picture.flash { animation: storyMatchWinFlash .55s ease-in-out 4; }
      @keyframes storyMatchWinFlash { 0%,100%{opacity:1} 50%{opacity:.12} }
      @media (prefers-reduced-motion: reduce) { .story-match-win-picture.flash { animation:none; } }
    `;
    document.head.appendChild(style);

    function showWinCelebration() {
      if (celebrating) return;
      celebrating = true;
      const winner = document.createElement('img');
      winner.className = 'story-match-win-picture flash';
      winner.src = 'game-win-jesus-loves-you.png?v=1';
      winner.alt = 'Sarah the Baby Sheep — Jesus Loves You!';
      board.appendChild(winner);
      message.textContent = 'Wonderful! You matched all 12 animal friends! Jesus Loves You!';
      const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      celebrationTimer = window.setTimeout(() => {
        winner.remove();
        celebrating = false;
        reset.click();
      }, reducedMotion ? 2400 : 3000);
    }

    const isComplete = () => board.querySelectorAll('.story-match-card.matched').length >= 24 || message.textContent.includes('matched all 12 animal friends');
    const observer = new MutationObserver(() => { if (isComplete()) showWinCelebration(); });
    observer.observe(board, { childList:true, subtree:true, attributes:true, attributeFilter:['class'] });
    observer.observe(message, { childList:true, characterData:true, subtree:true });

    reset.addEventListener('click', () => {
      if (celebrationTimer) clearTimeout(celebrationTimer);
      celebrationTimer = null;
      board.querySelector('.story-match-win-picture')?.remove();
      celebrating = false;
    });
  }
});

// PID15 large laminated tile area note — October 1, 2026.
document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('store-PID15');
  if (!card || card.querySelector('.pid15-large-layout-note')) return;

  const price = card.querySelector('.price');
  if (!price || !price.parentNode) return;

  const spaceBefore = document.createElement('div');
  spaceBefore.setAttribute('aria-hidden', 'true');
  spaceBefore.style.height = '14px';

  const note = document.createElement('p');
  note.className = 'pid15-large-layout-note';
  note.innerHTML = '<strong>Extremely Large</strong> Laminated Tile Area Lay-Out . Each tile is 5.5" X 4.25". They cover over <strong>5 feet</strong> when placed in a double matching row lay-out or over 2 Ft Square when placed in a 6 Tile lay-out.';

  const spaceAfter = document.createElement('div');
  spaceAfter.setAttribute('aria-hidden', 'true');
  spaceAfter.style.height = '14px';

  price.parentNode.insertBefore(spaceBefore, price);
  price.parentNode.insertBefore(note, price);
  price.parentNode.insertBefore(spaceAfter, price);
});
