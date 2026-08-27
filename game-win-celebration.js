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
      .story-match-win-picture.flash {
        animation: storyMatchWinFlash .55s ease-in-out 4;
      }
      @keyframes storyMatchWinFlash {
        0%, 100% { opacity: 1; }
        50% { opacity: .12; }
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
      winner.src = 'masterpage11.png?v=2';
      winner.alt = 'Sarah the Baby Sheep — Jesus Loves You!';
      board.appendChild(winner);

      message.textContent = 'Wonderful! You matched all 12 animal friends! Jesus Loves You!';

      const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const displayTime = reducedMotion ? 2400 : 3000;

      celebrationTimer = window.setTimeout(() => {
        winner.remove();
        celebrating = false;
        reset.click();
      }, displayTime);
    }

    const isComplete = () => {
      const matched = board.querySelectorAll('.story-match-card.matched').length;
      return matched >= 24 || message.textContent.includes('matched all 12 animal friends');
    };

    const observer = new MutationObserver(() => {
      if (isComplete()) showWinCelebration();
    });
    observer.observe(board, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    observer.observe(message, { childList: true, characterData: true, subtree: true });

    reset.addEventListener('click', () => {
      if (celebrationTimer) {
        clearTimeout(celebrationTimer);
        celebrationTimer = null;
      }
      board.querySelector('.story-match-win-picture')?.remove();
      celebrating = false;
    });
  }

  if (!document.getElementById('sarah-exact-activities')) {
    const section = document.createElement('section');
    section.id = 'sarah-exact-activities';
    section.style.cssText = 'padding:42px 18px;background:#fffafc;border-top:4px solid #ead5f5;border-bottom:4px solid #ead5f5';
    section.innerHTML = `
      <div style="max-width:1100px;margin:0 auto">
        <h2 style="text-align:center;color:#4b146f;font-family:'Baloo 2',sans-serif;font-size:clamp(2rem,5vw,3rem);margin:0 0 8px">Sarah's Bible Activities</h2>
        <p style="text-align:center;max-width:760px;margin:0 auto 24px;font-weight:800;color:#5b197d">These are Malinda's exact activity pages from the book. The artwork has not been redrawn or changed.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;align-items:start">
          <article style="background:#fff;border:3px solid #d9b3ee;border-radius:20px;padding:14px;box-shadow:0 8px 22px rgba(75,20,111,.10)">
            <h3 style="text-align:center;color:#4b146f;margin:0 0 10px">Find-A-Word</h3>
            <img src="Sarah Find-A-Word.png?v=1" alt="Sarah Find-A-Word activity" style="width:100%;height:auto;display:block;border-radius:12px;background:#fff">
            <img src="sarah-find-a-word-instructions.png?v=1" alt="Sarah Find-A-Word instructions" style="width:100%;height:auto;display:block;border-radius:12px;background:#fff;margin-top:14px">
          </article>
          <article style="background:#fff;border:3px solid #d9b3ee;border-radius:20px;padding:14px;box-shadow:0 8px 22px rgba(75,20,111,.10)">
            <h3 style="text-align:center;color:#4b146f;margin:0 0 10px">Animal Sudoku</h3>
            <img src="Sarah Animal Suduko.png?v=1" alt="Sarah Animal Sudoku activity" style="width:100%;height:auto;display:block;border-radius:12px;background:#fff">
          </article>
        </div>
      </div>`;

    const about = document.getElementById('about');
    if (about) about.insertAdjacentElement('beforebegin', section);
    else document.querySelector('main')?.appendChild(section);
  }
});