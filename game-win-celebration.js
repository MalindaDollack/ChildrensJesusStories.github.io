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

// Official ISBN master wording — October 5, 2026.
// This runs after the website builds the book shelf/store and keeps the official
// titles/subtitles consistent if older website routines redraw those areas.
document.addEventListener('DOMContentLoaded', () => {
  const books = [
    {
      key: 'Sarah the Baby Sheep',
      title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV).",
      subtitle: "Jesus's Birthtold through the BIG BLUE EYES of Sarah the Baby Sheep !"
    },
    {
      key: 'Sweet-Pea',
      title: "Sweet-Pea the baby Sparrow: Don't Be Afraid ! God Cares ! Even the Feathers on your head are all numbered. Matthew 10: 29-31 (NIV).",
      subtitle: "God's Message of Caring told through the BIG BLUE EYES of Sweet-Pea the Baby Sparrow !"
    },
    {
      key: 'Larry the Lizard',
      title: "Larry the Lizard: Larry Leaps with the Lepers !  Only One Leper Thanks Jesus. The Healing of the Ten Lepers. Luke 17: 11-19 (NIV).",
      subtitle: "God's Message of Thankfulness and Healing  told through BIG BLUE EYES of Larry the Lizard !"
    },
    {
      key: 'Davy the Donkey',
      title: "Davy the Donkey: Davey Speaks Out Loud ! Davy sees an Angel. Balaam Doesn't and is Mean. Balaam Sees the Angel and Changes. Balaam is Now, Kind and Truthful. Numbers 22: 21-41 (NIV).",
      subtitle: "God's Message of Kindness and Truthfulness told through BIG BLUE EYES Davy the Donkey !"
    },
    {
      key: 'Patsy the Plain Peacock',
      title: "Patsy the Plain Peacock: Patsy Gives Esther Fashion Advice !  Esther is Clothed with Strength and Dignity. Esther is chosen as Queen. Esther 2: 1-17 (NIV) Proverbs 31: 10-31 (NIV).",
      subtitle: "God's Message of How to Dress told through BIG BLUE EYES Patsy the Plain Peacock !"
    },
    {
      key: 'Francesco the Frog',
      title: "Francesco the Frog: The Frog Fiesta in Egypt ! Frogs Moved in Everywhere. The Second Plague of Egypt. Exodus 8:1-15 (NIV).",
      subtitle: "God's Message of Obedience told through BIG BLUE EYES Francesco the Frog !"
    },
    {
      key: 'Freddy the Ferret',
      title: "Freddy the Ferret: Freddy Finds Fun in the Firey Furnace with Friends ! Freddy Trusted God to Deliver him from the Flames. Daniel In the Lion's Den. Daniel 3:1-30 (NIV).",
      subtitle: "God's Message of Trust told through BIG BLUE EYES Freddy the Ferret !"
    },
    {
      key: 'Joy the Fish',
      title: "Joy the Fish: Joy Learns about her Forever Pond ! Heaven our Forever Home. Papa Fish Sings over the Eggs. Jesus Sings Over All Of Us! Zepheniah 3:17 (NIV).",
      subtitle: "God's Message of Heaven and how He sings over all of us told through BIG BLUE EYES Joy the Fish !"
    },
    {
      key: 'Willy the Water Strider Bug',
      title: "Willy the Water Strider Bug: Willy Walks on Water with Peter ! Peter Walks on Water Towards Jesus. Peter takes his Eyes Off Jesus and Sinks! Matthew 14:22-33 (NIV).",
      subtitle: "God's Message Keeping Our Eyes on Jesus  told through BIG BLUE EYES Willy the Water Strider Bug !"
    },
    {
      key: 'Wally the Whale',
      title: "Wally the Whale: Wally Obeys God !  Wally Swallows a Human. Wally Gets Sick. Jonah Obeys God.  Jonah and the Whale. Jonah 1:1-17 (NIV).",
      subtitle: "God's Message of Always Do What God Says told through BIG BLUE EYES Wally the Whale !"
    },
    {
      key: 'Levi the Lion',
      title: "Levi the Lion: Levi Listens to God and Shuts His Mouth ! Sign Language helps Levi speaks to Daniel. Daniel In the Lion's Den. Daniel 6:1-28 (NIV).",
      subtitle: "God's Message of Protection told through BIG BLUE EYES Levi the Lion !"
    },
    {
      key: 'Barry the Blind Mole',
      title: "Barry the Blind Mole: Barry and a Blind Man Read Braille. Barry Receives His Sight ! Jesus Heals a Blind Man. John 9:25 (NIV).",
      subtitle: "God's Message of Healing told through BIG BLUE EYES Barry the Blind Mole !"
    }
  ];

  const styleBlueEyes = text => text.replace(/BIG BLUE EYES/g, '<strong class="big-blue-eyes">BIG BLUE EYES</strong>');

  function setShelfCard(card, book) {
    const titleEl = card.querySelector('.book-title, h3, h2');
    if (titleEl && titleEl.textContent.trim() !== book.title) titleEl.textContent = book.title;

    let subtitleEl = card.querySelector('.book-subtitle, [class*="subtitle"]');
    if (!subtitleEl) {
      subtitleEl = [...card.querySelectorAll('p')].find(p => /Message|Birth|BIG BLUE EYES|Eyes of|told through/i.test(p.textContent || ''));
    }
    if (subtitleEl && subtitleEl.textContent.replace(/\s+/g, ' ').trim() !== book.subtitle.replace(/\s+/g, ' ').trim()) {
      subtitleEl.innerHTML = styleBlueEyes(book.subtitle);
    }

    card.querySelectorAll('img[alt]').forEach(img => {
      const alt = img.alt || '';
      if (new RegExp(book.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(alt)) {
        const suffix = /\b(cover|book cover|preview|image|picture)\b/i.exec(alt);
        img.alt = book.title + (suffix ? ' ' + suffix[0] : '');
      }
    });
  }

  function normalizeSarahText(text) {
    if (!text || !/Sarah the Baby Sheep/i.test(text)) return text;
    const official = books[0].title;
    return text
      .replace(/Sarah the Baby Sheep:\s*My Shepherd,\s*Jesus's Birth[.,]\s*The Christmas Story(?:\s*Edition)?[.,]?\s*Luke\s*2:\s*1-20\s*\(NIV\)\.?/gi, official)
      .replace(/Sarah the Baby Sheep:\s*My Shepherd,\s*Jesus's Birth[.,]\s*The Christmas Story[.,]?\s*Luke\s*2:\s*1-20\s*\(NIV\)\.?/gi, official)
      .replace(/Sarah the Baby Sheep:\s*My Shepherd,\s*Jesus's Birth[.,]\s*The Christmas Story\.?/gi, "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story.");
  }

  function applyOfficialIsbnWording() {
    document.querySelectorAll('#bookGrid .book-card').forEach(card => {
      const text = card.textContent || '';
      const book = books.find(b => text.toLowerCase().includes(b.key.toLowerCase()));
      if (book) setShelfCard(card, book);
    });

    // Sarah appears throughout the current store. Keep her official ISBN title as
    // the product-title prefix while retaining each item's edition/product wording.
    document.querySelectorAll('#store h3, #store p, #store a, #store img[alt], [aria-label], [title]').forEach(el => {
      if (el.tagName === 'IMG') {
        const next = normalizeSarahText(el.alt);
        if (next !== el.alt) el.alt = next;
        return;
      }
      if (el.hasAttribute && el.hasAttribute('aria-label')) {
        const old = el.getAttribute('aria-label');
        const next = normalizeSarahText(old);
        if (next !== old) el.setAttribute('aria-label', next);
      }
      if (el.hasAttribute && el.hasAttribute('title')) {
        const old = el.getAttribute('title');
        const next = normalizeSarahText(old);
        if (next !== old) el.setAttribute('title', next);
      }
      if (el.tagName === 'A' && /^mailto:/i.test(el.getAttribute('href') || '')) {
        try {
          const decoded = decodeURIComponent(el.getAttribute('href'));
          const next = normalizeSarahText(decoded);
          if (next !== decoded) el.setAttribute('href', encodeURI(next).replace(/#/g, '%23'));
        } catch (_) {}
      }
      if (el.childNodes.length === 1 && el.firstChild.nodeType === Node.TEXT_NODE) {
        const old = el.textContent;
        const next = normalizeSarahText(old);
        if (next !== old) el.textContent = next;
      }
    });

    // The official Sarah subtitle is also used in order forms and store listings.
    document.querySelectorAll('#store *').forEach(el => {
      if (el.childNodes.length !== 1 || el.firstChild.nodeType !== Node.TEXT_NODE) return;
      const old = el.textContent || '';
      if (/Jesus's Birth\s+through the BIG BLUE EYES of Sarah the Baby Sheep\s*!/i.test(old) || /Jesus's Birthtold through the BIG BLUE EYES of Sarah the Baby Sheep\s*!/i.test(old)) {
        el.textContent = old.replace(/Jesus's Birth(?:told|\s+through)?\s*through?\s*the BIG BLUE EYES of Sarah the Baby Sheep\s*!/i, books[0].subtitle);
      }
    });
  }

  // Run after the shelf/store has been drawn, then keep it correct if older code
  // redraws any of those elements later.
  [0, 250, 800, 1600].forEach(ms => setTimeout(applyOfficialIsbnWording, ms));
  const isbnObserver = new MutationObserver(() => {
    clearTimeout(window.__isbnMasterTimer);
    window.__isbnMasterTimer = setTimeout(applyOfficialIsbnWording, 60);
  });
  isbnObserver.observe(document.body, { childList:true, subtree:true });
});