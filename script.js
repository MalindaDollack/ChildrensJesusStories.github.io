// Stable website enhancements loader - August 31, 2026.
document.write('<script src="script-enhancements.js?v=20261017"><\/script>');
document.write('<script src="game-win-celebration.js?v=11"><\/script>');

document.addEventListener('DOMContentLoaded', () => {
  const WEBSITE_EMAIL = 'berachahdirector@gmail.com';
  const OLD_EMAIL = 'dollackj316@gmail.com';

  // Change every visible old email address and every mailto link across the website.
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.href = link.href.replace(/dollackj316@gmail\.com/gi, WEBSITE_EMAIL);
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const emailTextNodes = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue && walker.currentNode.nodeValue.toLowerCase().includes(OLD_EMAIL)) emailTextNodes.push(walker.currentNode);
  }
  emailTextNodes.forEach(node => { node.nodeValue = node.nodeValue.replace(/dollackj316@gmail\.com/gi, WEBSITE_EMAIL); });

  // Keep below-the-fold pictures from slowing initial page load.
  document.querySelectorAll('img:not(.hero-book):not(.welcome-guide img)').forEach(img => {
    if (!img.hasAttribute('loading')) img.loading = 'lazy';
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
  });

  // Videos now live in Sarah’s Videos above the item tiles.
  const nav = document.querySelector('header nav');
  if (nav && !nav.querySelector('a[data-youtube-link]')) {
    const videoNav = document.createElement('a');
    videoNav.href = '#sarah-videos';
    videoNav.textContent = 'Videos';
    videoNav.dataset.youtubeLink = 'true';
    const communityNav = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href') === '#community');
    if (communityNav) nav.insertBefore(videoNav, communityNav);
    else nav.appendChild(videoNav);
  }

  const store = document.getElementById('store');
  if (!store) return;

  const cards = [...store.querySelectorAll('.store-card')];

  // DID7 - BASIC is the only language offered for this manual.
  const did7 = document.getElementById('store-DID7');
  if (did7) {
    const did7Price = did7.querySelector('.price');
    if (did7Price) did7Price.textContent = 'C$0.77';

    [...did7.children].forEach(function(child) {
      if (child.tagName === 'P' && /Many other programming-language manuals are also available/i.test(child.textContent || '')) {
        child.remove();
      }
    });

    const did7Details = did7.querySelector('.store-details');
    if (did7Details) {
      did7Details.innerHTML = `
<p>This manual is 77 pages in length.</p>
<p>Allow 24 hours for processing.</p>
<p>This manual is written for a true beginner. You do not need to know any programming before you start. We will move one small step at a time, type short programs, run them, make mistakes, fix them, and gradually build a complete Baby Sheep game. The examples use Commodore BASIC V2 in the style of the Commodore VIC-20. That means line numbers, simple commands, short variable names, and programs that can be understood one line at a time. The VIC-20 normally shows 22 columns by 23 rows, so many of our screen messages are deliberately short. The manual also includes the exact phrases you asked to learn how to code: "JESUS LOVES YOU !" and "I LOVE YOU". Near the end, those lessons become part of a Baby Sheep game whose final message is always "JESUS LOVES YOU !". Beginner Promise: You are allowed to make mistakes. A programming error is simply information telling you what to fix next.</p>
<p>BASIC is the only language this manual is written in.</p>
<div class="store-order"><a href="mailto:berachahdirector@gmail.com">Buy Now</a></div>`;
    }
  }

  const findCard = pattern => cards.find(card => pattern.test(card.querySelector('h3')?.textContent.trim() || ''));

  function addAvailable(card) {
    if (!card || card.querySelector('.product-available')) return;
    const badge = document.createElement('p');
    badge.className = 'product-available';
    badge.textContent = 'AVAILABLE';
    badge.style.cssText = 'display:inline-block;align-self:flex-start;margin:4px 0 8px;padding:5px 10px;border-radius:999px;background:#e8f7e8;color:#176b2c;font-weight:900;font-size:.92rem;border:2px solid #67b878';
    const price = card.querySelector('.price');
    (price || card.querySelector('h3'))?.insertAdjacentElement('afterend', badge);
  }

  function setOrder(card, product) {
    const link = card?.querySelector('.store-order a');
    if (!link) return;
    const emailProductTitle = String(product || '').replace(/[—–]/g, ' - ').replace(/\s+/g, ' ').trim();
    const lines = [
      'Dear Malinda,',
      '',
      'I would like to order: ' + emailProductTitle,
      '',
      'My name:',
      'My email address:',
      'My Shipping Address:',
      '',
      'Please send me the e-Transfer instructions.',
      '',
      'God Bless You and Your Family Mightily !'
    ];
    link.href = `mailto:${WEBSITE_EMAIL}?subject=${encodeURIComponent(emailProductTitle)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  const one = findCard(/^One Hand-made Laminated Jesus Loves You! Bookmark$/i);
  if (one) {
    const img = one.querySelector('img');
    if (img) { img.src = 'web-images/bookmark-1.webp?v=1'; img.alt = 'One Hand-made Laminated Jesus Loves You! Bookmark'; }
    const price = one.querySelector('.price');
    if (price) price.textContent = 'C$6.00';
    setOrder(one, 'One Hand-made Laminated Jesus Loves You! Bookmark');
    addAvailable(one);
  }

  const three = findCard(/^(Four|Three) Hand-made Laminated Jesus Loves You! Bookmarks$/i);
  if (three) {
    const heading = three.querySelector('h3');
    const img = three.querySelector('img');
    const price = three.querySelector('.price');
    if (heading) heading.textContent = 'Three Hand-made Laminated Jesus Loves You! Bookmarks';
    if (img) { img.src = 'web-images/bookmarks-3.webp?v=1'; img.alt = 'Three Hand-made Laminated Jesus Loves You! Bookmarks'; }
    if (price) price.textContent = 'C$8.00';
    setOrder(three, 'Three Hand-made Laminated Jesus Loves You! Bookmarks');
    addAvailable(three);
  }

  const generic = findCard(/^Hand-made Jesus Loves You! Stickers$/i);
  const alreadyFour = findCard(/^4 Hand-made Jesus Loves You! Stickers$/i);
  const alreadyTwenty = findCard(/^20 Hand-made Jesus Loves You! Stickers$/i);

  function configureSticker(card, quantity, image) {
    if (!card) return;
    const product = `${quantity} Hand-made Jesus Loves You! Stickers`;
    const heading = card.querySelector('h3');
    const img = card.querySelector('img');
    const price = card.querySelector('.price');
    const body = [...card.querySelectorAll('p')].find(p => !p.classList.contains('price') && !p.classList.contains('product-available'));
    if (heading) heading.textContent = product;
    if (img) { img.src = `${image}?v=6`; img.alt = product; img.loading = 'lazy'; }
    if (price) price.textContent = 'C$7.00';
    if (body) body.textContent = `${quantity} Jesus Loves You! stickers. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail ${WEBSITE_EMAIL} for the exact shipping cost to your location.`;
    setOrder(card, product);
    addAvailable(card);
  }

  if (generic && !alreadyFour && !alreadyTwenty) {
    const four = generic.cloneNode(true);
    const twenty = generic.cloneNode(true);
    configureSticker(four, 4, 'web-images/stickers-4.webp?v=1');
    configureSticker(twenty, 20, 'web-images/stickers-20.webp?v=1');
    generic.replaceWith(four, twenty);
  } else {
    configureSticker(alreadyFour, 4, 'web-images/stickers-4.webp?v=1');
    configureSticker(alreadyTwenty, 20, 'web-images/stickers-20.webp?v=1');
  }

  // Purchased e-books are delivered as private links. Never expose the full Standard E-Book link in the public store.
  const standardCard = cards.find(card => /Standard E-Book Edition/i.test(card.querySelector('h3')?.textContent || '') && !/Coloring Book/i.test(card.querySelector('h3')?.textContent || ''));
  if (standardCard) {
    standardCard.querySelectorAll('.standard-ebook-link').forEach(link => link.remove());
    const heading = standardCard.querySelector('h3');
    const img = standardCard.querySelector('img');
    const description = [...standardCard.querySelectorAll('p')].find(p => !p.classList.contains('price') && !p.classList.contains('product-available'));
    if (heading && /Download/i.test(heading.textContent)) heading.textContent = heading.textContent.replace(/Download/gi, 'Link');
    if (img && /Download/i.test(img.alt || '')) img.alt = img.alt.replace(/Download/gi, 'Link');
    if (description) description.textContent = 'The private Standard E-Book link is e-mailed to the buyer after the e-Transfer is received.';

    let preview = standardCard.querySelector('.standard-preview-link');
    if (!preview) {
      preview = document.createElement('a');
      preview.className = 'standard-preview-link flip-preview-link';
      const order = standardCard.querySelector('.store-order');
      if (order) order.insertAdjacentElement('beforebegin', preview);
      else standardCard.appendChild(preview);
    }
    preview.href = 'sarah-5-page-preview.html?v=32';
    preview.target = '_blank';
    preview.rel = 'noopener';
    preview.textContent = 'View 5-Page Standard E-Book Preview';
  }

  const flipCard = findCard(/Flip Book E-Book Edition/i);
  if (flipCard) {
    const description = [...flipCard.querySelectorAll('p')].find(p => !p.classList.contains('price') && !p.classList.contains('product-available'));
    if (description) description.textContent = 'The private Flip Book E-Book link is e-mailed to the buyer after the e-Transfer is received.';
    let preview = flipCard.querySelector('.flip-preview-link');
    if (preview) preview.href = 'flip-book-preview.html?v=33';
  }

  const coloringCard = findCard(/Standard E-Book Coloring Book Edition/i);
  if (coloringCard) {
    const description = [...coloringCard.querySelectorAll('p')].find(p => !p.classList.contains('price') && !p.classList.contains('product-available'));
    if (description) description.textContent = 'The private Standard E-Book Coloring Book link is e-mailed to the buyer after the e-Transfer is received.';
  }

  // Replace all public e-book wording "Download" with "Link", including order e-mails.
  store.querySelectorAll('h3, img, a').forEach(el => {
    if (el.tagName === 'H3' && /Download/i.test(el.textContent)) {
      el.textContent = el.textContent.replace(/Download/gi, 'Link');
    }
    if (el.tagName === 'IMG' && el.alt && /Download/i.test(el.alt)) {
      el.alt = el.alt.replace(/Download/gi, 'Link');
    }
    if (el.tagName === 'A' && el.href && /^mailto:/i.test(el.href)) {
      el.href = el.href.replace(/dollackj316@gmail\.com/gi, WEBSITE_EMAIL).replace(/Download/gi, 'Link').replace(/%20Download%20/gi, '%20Link%20');
    }
  });
  
  // FINAL STORE ORDER NORMALIZER - September 24, 2026
  // Product subjects contain only the DID/PID/SESB code. Digital products omit
  // shipping address; physical products and subscriptions include it.
  // The four SO service request links are intentionally left as service requests.
  store.querySelectorAll('.store-card .store-order a').forEach(function(link) {
    // Square checkout links must never be rewritten as email orders.
    if (!/^mailto:/i.test(link.getAttribute('href') || '')) return;
    var card = link.closest('.store-card');
    if (!card) return;

    var titleElement = card.querySelector('.subscription-original-title') || card.querySelector('h3');
    if (!titleElement) return;

    var productTitle = (titleElement.textContent || '').replace(/\s+/g, ' ').trim();
    if (/^SO\d+\b/i.test(productTitle) || card.id === 'store-PID14') return;

    var codeMatch = productTitle.match(/^([A-Z0-9-]+)\s*(?:—|–|-)\s*/);
    if (!codeMatch) return;

    var productCode = codeMatch[1];
    var isDigital = /^DID/i.test(productCode);
    var emailProductTitle = productTitle.replace(/[—–]/g, ' - ').replace(/\s+/g, ' ').trim();
    var isSarahBookListing = /^(?:SESB1|PID1|PID2|PID3|PID4|PID5|PID6|PID7|PID8|PID9|PID10|PID11|PID12|PID13|PID14|PID15|PID16|PID17|DID1|DID2|DID3|DID4)$/i.test(productCode);
    var lines = [
      'Dear Malinda,',
      '',
      'I would like to order: ' + emailProductTitle,
      '',
      'My name:',
      'My email address:'
    ];

    if (isSarahBookListing) {
      lines.splice(3, 0, "Subtitle: Jesus's Birth through the BIG BLUE EYES of Sarah the Baby Sheep !");
    }

    var emailPrice = productCode.toUpperCase() === 'PID7' ? 'C$24.00' :
                     productCode.toUpperCase() === 'PID8' ? 'C$23.00' : '';
    if (emailPrice) {
      lines.splice(4, 0, 'Price: ' + emailPrice);
    }

    if (!isDigital) lines.push('My Shipping Address:');

    lines.push(
      '',
      'Please send me the e-Transfer instructions.',
      '',
      'God Bless You and Your Family Mightily !'
    );

    link.href = 'mailto:' + WEBSITE_EMAIL + '?subject=' + encodeURIComponent(productCode) + '&body=' + encodeURIComponent(lines.join('\n'));
  });
});


// Shipping-specific product labels: full name only with LP, short codes for NT/WT.
document.addEventListener('DOMContentLoaded', function () {
  for (var n = 1; n <= 13; n++) {
    var card = document.getElementById('store-PID' + n);
    if (!card) continue;
    var heading = card.querySelector('h3');
    if (!heading) continue;
    var name = heading.textContent.replace(/\s+/g, ' ').trim()
      .replace(/^PID\d+(?:LP|NT|WT)?\s*[-—–]\s*/i, '').trim();
    if (!name) continue;
    heading.textContent = 'PID' + n + 'LP - ' + name + ' | PID' + n + 'NT | PID' + n + 'WT';
    var description = card.querySelector('.isbn-title-description');
    if (description) {
      var p = description.querySelector('.shipping-product-codes');
      if (!p) {
        p = document.createElement('p');
        p.className = 'shipping-product-codes';
        description.insertBefore(p, description.firstChild);
      }
      p.textContent = 'PID' + n + 'LP - ' + name + ' (Local Pick Up) | PID' + n + 'NT (No Tracking) | PID' + n + 'WT (With Tracking)';
    }
    Array.prototype.forEach.call(card.querySelectorAll('.store-order a'), function (link, i) {
      var txt = (link.textContent || '').toLowerCase();
      var suffix = /no tracking/.test(txt) ? 'NT' :
        /with tracking|tracking|tracked|flat rate box/.test(txt) ? 'WT' :
        /local|pick.?up/.test(txt) ? 'LP' :
        (i === 0 ? 'LP' : i === 1 ? 'NT' : i === 2 ? 'WT' : null);
      if (!suffix) return;
      var code = 'PID' + n + suffix;
      var href = link.getAttribute('href') || '';
      if (/^mailto:/i.test(href)) {
        var mail = href.split('?')[0];
        var params = new URLSearchParams(href.split('?').slice(1).join('?').replace(/&amp;/g, '&'));
        var body = params.get('body') || '';
        body = body.replace(new RegExp('PID' + n + '(?![0-9A-Za-z])', 'g'), code);
        body = body.replace(/I would like to order:[^\n]*/, 'I would like to order: ' + code + ' - ' + name);
        params.set('subject', code);
        params.set('body', body);
        link.href = mail + '?' + params.toString();
      }
      link.setAttribute('data-shipping-product-code', code);
      var label = link.querySelector('.shipping-code-label');
      if (!label) {
        var strong = link.querySelector('strong');
        if (strong) {
          label = document.createElement('span');
          label.className = 'shipping-code-label';
          strong.insertAdjacentElement('afterend', label);
        }
      }
      if (label) label.textContent = ' ' + code + ' |';
    });
  }
});
