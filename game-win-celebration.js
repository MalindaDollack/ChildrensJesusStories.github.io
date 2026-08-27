document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('storyMatchBoard');
  const message = document.getElementById('storyMatchMessage');
  const reset = document.getElementById('storyMatchReset');
  if (!board || !message || !reset) return;

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
      object-fit: cover;
      border-radius: 14px;
      background: #fff;
      opacity: 1;
      pointer-events: none;
    }
    .story-match-win-picture.flash {
      animation: storyMatchWinFlash .65s ease-in-out 3;
    }
    @keyframes storyMatchWinFlash {
      0%, 100% { opacity: 1; }
      50% { opacity: .18; }
    }
    @media (prefers-reduced-motion: reduce) {
      .story-match-win-picture.flash { animation: none; }
    }
  `;
  document.head.appendChild(style);

  function showWinCelebration() {
    if (celebrating) return;
    celebrating = true;

    const winner = document.createElement('img');
    winner.className = 'story-match-win-picture flash';
    winner.src = 'masterpage11.png';
    winner.alt = 'Sarah the Baby Sheep — Jesus Loves You!';
    board.appendChild(winner);

    message.textContent = 'Wonderful! You matched all 12 animal friends! Jesus Loves You!';

    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const displayTime = reducedMotion ? 2200 : 2600;

    celebrationTimer = window.setTimeout(() => {
      winner.remove();
      celebrating = false;
      reset.click();
    }, displayTime);
  }

  const observer = new MutationObserver(() => {
    if (message.textContent.includes('matched all 12 animal friends')) {
      showWinCelebration();
    }
  });
  observer.observe(message, { childList: true, characterData: true, subtree: true });

  reset.addEventListener('click', () => {
    if (celebrationTimer) {
      clearTimeout(celebrationTimer);
      celebrationTimer = null;
    }
    board.querySelector('.story-match-win-picture')?.remove();
    celebrating = false;
  });
});
