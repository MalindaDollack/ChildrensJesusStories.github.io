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
      .story-match-win-picture { position:absolute; inset:0; z-index:20; width:100%; height:100%; object-fit:contain; border-radius:14px; background:#fff; opacity:1; pointer-events:none; }
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
      const current = board.querySelector('.story-match-win-picture');
      if (current) current.remove();
      celebrating = false;
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const DARK_PURPLE = '#4b146f';
  const BRIGHT_BLUE = '#008cff';

  const repairStyle = document.createElement('style');
  repairStyle.textContent = `
    #bookGrid .book-card, #bookGrid .book-card h2, #bookGrid .book-card h3,
    #bookGrid .book-card p, #bookGrid .book-card .book-title, #bookGrid .book-card .book-subtitle {
      color:${DARK_PURPLE}!important;
    }
    #bookGrid .book-card .big-blue-eyes { color:${BRIGHT_BLUE}!important; font-weight:900!important; }
    #bookGrid .book-card .book-subtitle {
      display:block!important; visibility:visible!important; opacity:1!important;
      margin:10px 0 12px!important; line-height:1.35!important;
    }
  `;
  document.head.appendChild(repairStyle);

  const books = [
    { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV).", subtitle: "Jesus's Birth told through the BIG BLUE EYES of Sarah the Baby Sheep !" },
    { title: "Sweet-Pea the baby Sparrow: Don't Be Afraid ! God Cares ! Even the Feathers on your head are all numbered. Matthew 10: 29-31 (NIV).", subtitle: "God's Message of Caring told through the BIG BLUE EYES of Sweet-Pea the Baby Sparrow !" },
    { title: "Larry the Lizard: Larry Leaps with the Lepers !  Only One Leper Thanks Jesus. The Healing of the Ten Lepers. Luke 17: 11-19 (NIV).", subtitle: "God's Message of Thankfulness and Healing  told through BIG BLUE EYES of Larry the Lizard !" },
    { title: "Davy the Donkey: Davey Speaks Out Loud ! Davy sees an Angel. Balaam Doesn't and is Mean. Balaam Sees the Angel and Changes. Balaam is Now, Kind and Truthful. Numbers 22: 21-41 (NIV).", subtitle: "God's Message of Kindness and Truthfulness told through BIG BLUE EYES Davy the Donkey !" },
    { title: "Patsy the Plain Peacock: Gives Queen Esther Fashion Advice Esther 4:13-17 (NIV).", subtitle: "God's Message of How to Dress told through BIG BLUE EYES Patsy the Plain Peacock !" },
    { title: "Francesco the Frog: The Frog Fiesta in Egypt ! Frogs Moved in Everywhere. The Second Plague of Egypt. Exodus 8:1-15 (NIV).", subtitle: "God's Message of Obedience told through BIG BLUE EYES Francesco the Frog !" },
    { title: "Freddy the Ferret: Freddy Finds Fun in the Firey Furnace with Friends ! Freddy Trusted God to Deliver him from the Flames. Daniel In the Lion's Den. Daniel 3:1-30 (NIV).", subtitle: "God's Message of Trust told through BIG BLUE EYES Freddy the Ferret !" },
    { title: "Joy the Fish: Joy Learns about her Forever Pond ! Heaven our Forever Home. Papa Fish Sings over the Eggs. Jesus Sings Over All Of Us! Zepheniah 3:17 (NIV).", subtitle: "God's Message of Heaven and how He sings over all of us told through BIG BLUE EYES Joy the Fish !" },
    { title: "Willy the Water Strider Bug: Willy Walks on Water with Peter ! Peter Walks on Water Towards Jesus. Peter takes his Eyes Off Jesus and Sinks! Matthew 14:22-33 (NIV).", subtitle: "God's Message Keeping Our Eyes on Jesus  told through BIG BLUE EYES Willy the Water Strider Bug !" },
    { title: "Wally the Whale: Wally Obeys God !  Wally Swallows a Human. Wally Gets Sick. Jonah Obeys God.  Jonah and the Whale. Jonah 1:1-17 (NIV).", subtitle: "God's Message of Always Do What God Says told through BIG BLUE EYES Wally the Whale !" },
    { title: "Levi the Lion: Levi Listens to God and Shuts His Mouth ! Sign Language helps Levi speaks to Daniel. Daniel In the Lion's Den. Daniel 6:1-28 (NIV).", subtitle: "God's Message of Protection told through BIG BLUE EYES Levi the Lion !" },
    { title: "Barry the Blind Mole: Barry and a Blind Man Read Braille. Barry Receives His Sight ! Jesus Heals a Blind Man. John 9:25 (NIV).", subtitle: "God's Message of Healing told through BIG BLUE EYES Barry the Blind Mole !" }
  ];

  function styleBlueEyes(text) {
    return text.replace(/BIG BLUE EYES/g, '<strong class="big-blue-eyes">BIG BLUE EYES</strong>');
  }

  function setShelfCard(card, book) {
    const titleEl = card.querySelector('.book-title, h3, h2');
    if (titleEl) {
      if (titleEl.textContent.trim() !== book.title) titleEl.textContent = book.title;
      titleEl.style.setProperty('color', DARK_PURPLE, 'important');
    }

    let subtitleEl = card.querySelector('.book-subtitle, [class*="subtitle"]');
    if (!subtitleEl) {
      subtitleEl = [...card.querySelectorAll('p')].find(p => /Message|Birth|BIG BLUE EYES|Eyes of|told through/i.test(p.textContent || ''));
    }
    if (!subtitleEl) {
      subtitleEl = document.createElement('p');
      subtitleEl.className = 'book-subtitle';
      const actions = card.querySelector('.book-actions');
      if (actions) card.insertBefore(subtitleEl, actions);
      else if (titleEl) titleEl.insertAdjacentElement('afterend', subtitleEl);
      else card.appendChild(subtitleEl);
    }
    subtitleEl.classList.add('book-subtitle');
    const wanted = styleBlueEyes(book.subtitle);
    if (subtitleEl.innerHTML !== wanted) subtitleEl.innerHTML = wanted;
    subtitleEl.style.setProperty('color', DARK_PURPLE, 'important');
    subtitleEl.style.setProperty('display', 'block', 'important');
    subtitleEl.style.setProperty('visibility', 'visible', 'important');
    subtitleEl.style.setProperty('opacity', '1', 'important');
  }

  function replaceKids(text) {
    if (!text) return text;
    return text.replace(/\bKIDS\b/g, 'CHILDREN').replace(/\bKids\b/g, 'Children').replace(/\bkids\b/g, 'children');
  }

  function replaceWebsitePhrases(text) {
    if (!text) return text;
    return replaceKids(text)
      .replace(/Children’s Bible Stories For Children/g, 'Childrens Bible Stories')
      .replace(/Children's Bible Stories For Children/g, 'Childrens Bible Stories')
      .replace(/Joyful, colourful Christian children’s books and Bible stories for children that help children discover courage, kindness, obedience, hope, and the love of Jesus\./g, 'Joyful, colourful Bible Adventures that help children discover courage, kindness, obedience, hope, and the love of Jesus.')
      .replace(/Joyful, colourful Christian children's books and Bible stories for children that help children discover courage, kindness, obedience, hope, and the love of Jesus\./g, 'Joyful, colourful Bible Adventures that help children discover courage, kindness, obedience, hope, and the love of Jesus.')
      .replace(/Christian children’s books and Bible stories for children/g, 'Bible Adventures for children')
      .replace(/Christian children's books and Bible stories for children/g, 'Bible Adventures for children')
      .replace(/Christian stories/gi, 'Bible Adventures');
  }

  function applyAllWording() {
    [...document.querySelectorAll('#bookGrid .book-card')].forEach((card, index) => {
      if (books[index]) setShelfCard(card, books[index]);
    });

    document.title = replaceWebsitePhrases(document.title);
    document.querySelectorAll('meta[content]').forEach(meta => {
      const old = meta.getAttribute('content') || '';
      const next = replaceWebsitePhrases(old);
      if (next !== old) meta.setAttribute('content', next);
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/i.test(parent.tagName)) continue;
      const old = node.nodeValue || '';
      const next = replaceWebsitePhrases(old);
      if (next !== old) nodes.push([node, next]);
    }
    nodes.forEach(([node, next]) => { node.nodeValue = next; });

    document.querySelectorAll('[alt],[title],[aria-label],[placeholder]').forEach(el => {
      ['alt','title','aria-label','placeholder'].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        const old = el.getAttribute(attr) || '';
        const next = replaceWebsitePhrases(old);
        if (next !== old) el.setAttribute(attr, next);
      });
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      const old = link.getAttribute('href') || '';
      const next = replaceWebsitePhrases(old);
      if (next !== old) link.setAttribute('href', next);
    });
  }

  [0, 250, 800, 1600].forEach(ms => setTimeout(applyAllWording, ms));
  const observer = new MutationObserver(() => {
    clearTimeout(window.__officialWordingTimer);
    window.__officialWordingTimer = setTimeout(applyAllWording, 80);
  });
  observer.observe(document.body, { childList:true, subtree:true, characterData:true });
});
