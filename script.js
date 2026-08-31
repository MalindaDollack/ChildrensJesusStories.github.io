// Stable website enhancements loader - August 31, 2026.
document.write('<script src="script-enhancements.js?v=3"><\/script>');
document.write('<script src="game-win-celebration.js?v=6"><\/script>');

document.addEventListener('DOMContentLoaded', () => {
  // Keep below-the-fold pictures from slowing initial page load.
  document.querySelectorAll('img:not(.hero-book):not(.welcome-guide img)').forEach(img => {
    if (!img.hasAttribute('loading')) img.loading = 'lazy';
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
  });

  const store = document.getElementById('store');
  if (!store) return;

  const cards = [...store.querySelectorAll('.store-card')];
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
    link.href = `mailto:dollackj316@gmail.com?subject=${encodeURIComponent('Order inquiry: ' + product)}&body=${encodeURIComponent('Hello Malinda,\n\nI would like to order: ' + product + '\n\nMy name:\nMy mailing address:\n\nPlease tell me the exact shipping cost and e-Transfer instructions.\n')}`;
  }

  const one = findCard(/^One Hand-made Laminated Jesus Loves You! Bookmark$/i);
  if (one) {
    const img = one.querySelector('img');
    if (img) { img.src = 'bookmark-1.jpg?v=6'; img.alt = 'One Hand-made Laminated Jesus Loves You! Bookmark'; }
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
    if (img) { img.src = 'bookmarks-3.jpg?v=6'; img.alt = 'Three Hand-made Laminated Jesus Loves You! Bookmarks'; }
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
    if (body) body.textContent = `${quantity} Jesus Loves You! stickers. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for the exact shipping cost to your location.`;
    setOrder(card, product);
    addAvailable(card);
  }

  if (generic && !alreadyFour && !alreadyTwenty) {
    const four = generic.cloneNode(true);
    const twenty = generic.cloneNode(true);
    configureSticker(four, 4, 'stickers-4.jpg');
    configureSticker(twenty, 20, 'stickers-20.jpg');
    generic.replaceWith(four, twenty);
  } else {
    configureSticker(alreadyFour, 4, 'stickers-4.jpg');
    configureSticker(alreadyTwenty, 20, 'stickers-20.jpg');
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
    if (preview) preview.href = 'flip-book-preview-clean.html';
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
      el.href = el.href.replace(/Download/gi, 'Link').replace(/%20Download%20/gi, '%20Link%20');
    }
  });
});