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
          <article style="background:#fff;border:3px solid #d9b3ee;border-radius:20px;padding:14px;box-shadow:0 8px 22px rgba(75,20,111,.10)">
            <h3 style="text-align:center;color:#4b146f;margin:0 0 10px">Heart Maze</h3>
            <img src="Sarah Heart Maze.png?v=2" alt="Sarah Heart Maze activity" style="width:100%;height:auto;display:block;border-radius:12px;background:#fff">
          </article>
        </div>
      </div>`;

    const about = document.getElementById('about');
    if (about) about.insertAdjacentElement('beforebegin', section);
    else document.querySelector('main')?.appendChild(section);
  }

  // Reliable physical bookmark and sticker product correction.
  const store = document.getElementById('store');
  if (store) {
    const cards = [...store.querySelectorAll('.store-card')];
    const findCard = matcher => cards.find(card => matcher.test(card.querySelector('h3')?.textContent.trim() || ''));
    const setAvailable = card => {
      if (!card || card.querySelector('.product-available')) return;
      const badge = document.createElement('p');
      badge.className = 'product-available';
      badge.textContent = 'AVAILABLE';
      badge.style.cssText = 'display:inline-block;align-self:flex-start;margin:4px 0 8px;padding:5px 10px;border-radius:999px;background:#e8f7e8;color:#176b2c;font-weight:900;font-size:.92rem;border:2px solid #67b878';
      const price = card.querySelector('.price');
      (price || card.querySelector('h3'))?.insertAdjacentElement('afterend', badge);
    };
    const setOrderLink = (card, product) => {
      const link = card?.querySelector('.store-order a');
      if (!link) return;
      link.href = `mailto:dollackj316@gmail.com?subject=${encodeURIComponent('Order inquiry: ' + product)}&body=${encodeURIComponent('Hello Malinda,\n\nI would like to order: ' + product + '\n\nMy name:\nMy mailing address:\n\nPlease tell me the exact shipping cost and e-Transfer instructions.\n')}`;
    };

    const one = findCard(/^One Hand-made Laminated Jesus Loves You! Bookmark$/i);
    if (one) {
      const img = one.querySelector('img');
      if (img) { img.src = 'bookmark-1.jpg?v=4'; img.alt = 'One Hand-made Laminated Jesus Loves You! Bookmark'; }
      const price = one.querySelector('.price');
      if (price) price.textContent = 'C$6.00';
      setOrderLink(one, 'One Hand-made Laminated Jesus Loves You! Bookmark');
      setAvailable(one);
    }

    const three = findCard(/^(Four|Three) Hand-made Laminated Jesus Loves You! Bookmarks$/i);
    if (three) {
      const heading = three.querySelector('h3');
      const img = three.querySelector('img');
      const price = three.querySelector('.price');
      if (heading) heading.textContent = 'Three Hand-made Laminated Jesus Loves You! Bookmarks';
      if (img) { img.src = 'bookmarks-3.jpg?v=4'; img.alt = 'Three Hand-made Laminated Jesus Loves You! Bookmarks'; }
      if (price) price.textContent = 'C$8.00';
      setOrderLink(three, 'Three Hand-made Laminated Jesus Loves You! Bookmarks');
      setAvailable(three);
    }

    const genericStickers = findCard(/^Hand-made Jesus Loves You! Stickers$/i);
    if (genericStickers) {
      const makeStickerCard = (quantity, image) => {
        const card = genericStickers.cloneNode(true);
        const heading = card.querySelector('h3');
        const img = card.querySelector('img');
        const price = card.querySelector('.price');
        const body = [...card.querySelectorAll('p')].find(p => !p.classList.contains('price'));
        const product = `${quantity} Hand-made Jesus Loves You! Stickers`;
        if (heading) heading.textContent = product;
        if (img) { img.src = `${image}?v=4`; img.alt = product; }
        if (price) price.textContent = 'C$7.00';
        if (body) body.textContent = `${quantity} Jesus Loves You! stickers. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for the exact shipping cost to your location.`;
        setOrderLink(card, product);
        setAvailable(card);
        return card;
      };
      genericStickers.replaceWith(
        makeStickerCard(4, 'stickers-4.jpg'),
        makeStickerCard(20, 'stickers-20.jpg')
      );
    }
  }
});