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

// Official ISBN master wording and preferred "Children" wording — October 5, 2026.
document.addEventListener('DOMContentLoaded', () => {
  const books = [
    { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV).", subtitle: "Jesus's Birth told through the BIG BLUE EYES of Sarah the Baby Sheep !" },
    { title: "Sweet-Pea the baby Sparrow: Don't Be Afraid ! God Cares ! Even the Feathers on your head are all numbered. Matthew 10: 29-31 (NIV).", subtitle: "God's Message of Caring told through the BIG BLUE EYES of Sweet-Pea the Baby Sparrow !" },
    { title: "Larry the Lizard: Larry Leaps with the Lepers !  Only One Leper Thanks Jesus. The Healing of the Ten Lepers. Luke 17: 11-19 (NIV).", subtitle: "God's Message of Thankfulness and Healing  told through BIG BLUE EYES of Larry the Lizard !" },
    { title: "Davy the Donkey: Davey Speaks Out Loud ! Davy sees an Angel. Balaam Doesn't and is Mean. Balaam Sees the Angel and Changes. Balaam is Now, Kind and Truthful. Numbers 22: 21-41 (NIV).", subtitle: "God's Message of Kindness and Truthfulness told through BIG BLUE EYES Davy the Donkey !" },
    { title: "Patsy the Plain Peacock: Patsy Gives Esther Fashion Advice !  Esther is Clothed with Strength and Dignity. Esther is chosen as Queen. Esther 2: 1-17 (NIV) Proverbs 31: 10-31 (NIV).", subtitle: "God's Message of How to Dress told through BIG BLUE EYES Patsy the Plain Peacock !" },
    { title: "Francesco the Frog: The Frog Fiesta in Egypt ! Frogs Moved in Everywhere. The Second Plague of Egypt. Exodus 8:1-15 (NIV).", subtitle: "God's Message of Obedience told through BIG BLUE EYES Francesco the Frog !" },
    { title: "Freddy the Ferret: Freddy Finds Fun in the Firey Furnace with Friends ! Freddy Trusted God to Deliver him from the Flames. Daniel In the Lion's Den. Daniel 3:1-30 (NIV).", subtitle: "God's Message of Trust told through BIG BLUE EYES Freddy the Ferret !" },
    { title: "Joy the Fish: Joy Learns about her Forever Pond ! Heaven our Forever Home. Papa Fish Sings over the Eggs. Jesus Sings Over All Of Us! Zepheniah 3:17 (NIV).", subtitle: "God's Message of Heaven and how He sings over all of us told through BIG BLUE EYES Joy the Fish !" },
    { title: "Willy the Water Strider Bug: Willy Walks on Water with Peter ! Peter Walks on Water Towards Jesus. Peter takes his Eyes Off Jesus and Sinks! Matthew 14:22-33 (NIV).", subtitle: "God's Message Keeping Our Eyes on Jesus  told through BIG BLUE EYES Willy the Water Strider Bug !" },
    { title: "Wally the Whale: Wally Obeys God !  Wally Swallows a Human. Wally Gets Sick. Jonah Obeys God.  Jonah and the Whale. Jonah 1:1-17 (NIV).", subtitle: "God's Message of Always Do What God Says told through BIG BLUE EYES Wally the Whale !" },
    { title: "Levi the Lion: Levi Listens to God and Shuts His Mouth ! Sign Language helps Levi speaks to Daniel. Daniel In the Lion's Den. Daniel 6:1-28 (NIV).", subtitle: "God's Message of Protection told through BIG BLUE EYES Levi the Lion !" },
    { title: "Barry the Blind Mole: Barry and a Blind Man Read Braille. Barry Receives His Sight ! Jesus Heals a Blind Man. John 9:25 (NIV).", subtitle: "God's Message of Healing told through BIG BLUE EYES Barry the Blind Mole !" }
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
  }

  function normalizeSarahText(text) {
    if (!text || !/Sarah the Baby Sheep/i.test(text)) return text;
    const official = books[0].title;
    return text
      .replace(/Sarah the Baby Sheep:\s*My Shepherd,\s*Jesus's Birth[.,]\s*The Christmas Story(?:\s*Edition)?[.,]?\s*Luke\s*2:\s*1-20\s*\(NIV\)\.?/gi, official)
      .replace(/Sarah the Baby Sheep:\s*My Shepherd,\s*Jesus's Birth[.,]\s*The Christmas Story[.,]?\s*Luke\s*2:\s*1-20\s*\(NIV\)\.?/gi, official)
      .replace(/Sarah the Baby Sheep:\s*My Shepherd,\s*Jesus's Birth[.,]\s*The Christmas Story\.?/gi, "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story.");
  }

  function replaceKids(text) {
    if (!text) return text;
    return text
      .replace(/\bKIDS\b/g, 'CHILDREN')
      .replace(/\bKids\b/g, 'Children')
      .replace(/\bkids\b/g, 'children');
  }

  function applyOfficialIsbnWording() {
    [...document.querySelectorAll('#bookGrid .book-card')].forEach((card, index) => {
      if (books[index]) setShelfCard(card, books[index]);
    });

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

    document.querySelectorAll('#store *').forEach(el => {
      if (el.childNodes.length !== 1 || el.firstChild.nodeType !== Node.TEXT_NODE) return;
      const old = el.textContent || '';
      const fixed = old
        .replace(/Jesus's Birthtold through the BIG BLUE EYES of Sarah the Baby Sheep\s*!/gi, books[0].subtitle)
        .replace(/Jesus's Birth\s+through the BIG BLUE EYES of Sarah the Baby Sheep\s*!/gi, books[0].subtitle)
        .replace(/Jesus's Birth\s+told through the BIG BLUE EYES of Sarah the Baby Sheep\s*!/gi, books[0].subtitle);
      if (fixed !== old) el.textContent = fixed;
    });
  }

  function applyChildrenWording() {
    document.title = replaceKids(document.title);

    document.querySelectorAll('meta[content]').forEach(meta => {
      const old = meta.getAttribute('content') || '';
      const next = replaceKids(old);
      if (next !== old) meta.setAttribute('content', next);
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/i.test(parent.tagName)) continue;
      if (/\bkids\b/i.test(node.nodeValue || '')) nodes.push(node);
    }
    nodes.forEach(node => { node.nodeValue = replaceKids(node.nodeValue); });

    document.querySelectorAll('[alt],[title],[aria-label],[placeholder]').forEach(el => {
      ['alt','title','aria-label','placeholder'].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        const old = el.getAttribute(attr) || '';
        const next = replaceKids(old);
        if (next !== old) el.setAttribute(attr, next);
      });
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      const old = link.getAttribute('href') || '';
      const next = replaceKids(old);
      if (next !== old) link.setAttribute('href', next);
    });
  }

  function applyWebsiteWording() {
    applyOfficialIsbnWording();
    applyChildrenWording();
  }

  [0, 250, 800, 1600].forEach(ms => setTimeout(applyWebsiteWording, ms));
  const wordingObserver = new MutationObserver(() => {
    clearTimeout(window.__officialWordingTimer);
    window.__officialWordingTimer = setTimeout(applyWebsiteWording, 60);
  });
  wordingObserver.observe(document.body, { childList:true, subtree:true, characterData:true });
});
