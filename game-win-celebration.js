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
      winner.src = 'masterpage11.png?v=2';
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
