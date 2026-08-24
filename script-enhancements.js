// Malinda's Story Garden website enhancements.
document.addEventListener('DOMContentLoaded', () => {
  // Clean up old order-email wording everywhere on the page.
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.href = link.href
      .replace(/Please%20send%20me%20the%20e-Transfer%20instructions%20if%20payment%20is%20required\.?/gi, 'Please%20send%20me%20the%20e-Transfer%20instructions.')
      .replace(/Please send me the e-Transfer instructions if payment is required\.?/gi, 'Please send me the e-Transfer instructions.');
  });

  const storeIntro = document.querySelector('#store .store-intro');
  const storeGrid = document.querySelector('#store .store-grid');

  if (storeIntro && !document.getElementById('store-guarantee')) {
    const guarantee = document.createElement('div');
    guarantee.id = 'store-guarantee';
    guarantee.style.cssText = 'max-width:820px;margin:18px auto 6px;padding:16px 18px;background:#fff;border:3px solid #d9b3ee;border-radius:16px;color:#33243a;line-height:1.5;box-shadow:0 5px 14px rgba(75,20,111,.10)';
    guarantee.innerHTML = '<p style="margin:0 0 8px"><strong style="color:#4b146f">30-Day Satisfaction Guarantee — Physical Handmade Products</strong></p><p style="margin:0 0 8px">All physical handmade products are guaranteed to be exactly as described. Please keep in mind that our physical products are handmade, so slight variations may occur. Please examine all pictures carefully; I have tried to make every picture and description as accurate as possible. If you are unsatisfied with your purchase, please let me know immediately and simply return the product within 30 days for a full refund.</p><p style="margin:0"><strong>Digital downloads and products delivered by e-mail are not covered by this guarantee and are non-refundable.</strong></p>';
    storeIntro.appendChild(guarantee);
  }

  const staplesCard = storeGrid ? [...storeGrid.querySelectorAll('.store-card')].find(card => /staples[- ]produced soft cover|staples produced soft cover|soft cover photobook/i.test(card.textContent)) : null;
  if (staplesCard) {
    staplesCard.id = 'staples-book-card';
    const mainImage = staplesCard.querySelector('img');
    if (mainImage) { mainImage.src = 'sarah-future-printing-cover.jpg'; mainImage.alt = 'Sarah the Baby Sheep Photo Book - Malinda Dollack cover'; }
    const heading = staplesCard.querySelector('h3');
    if (heading) heading.textContent = 'Staples Produced Soft Cover Edition PhotoBook';
    const price = staplesCard.querySelector('.price, .store-price');
    if (!staplesCard.querySelector('.staples-availability')) {
      const available = document.createElement('p'); available.className = 'staples-availability'; available.textContent = '✓ AVAILABLE NOW';
      available.style.cssText = 'display:inline-block;align-self:flex-start;margin:7px 0 5px;padding:7px 12px;border-radius:999px;background:#e8f7e8;color:#176b27;font-weight:900;border:2px solid #73b97d';
      (price || heading).insertAdjacentElement('afterend', available);
    }
    const description = staplesCard.querySelector('.catalog-details') || [...staplesCard.querySelectorAll('p')].find(p => /7 inches tall|10.?14 days processing/i.test(p.textContent));
    if (description) description.textContent = 'Size: 7 inches tall × 9 inches wide. Allow 10–14 days processing time. Pick-up is available at the buyer’s local Staples Canada location, or the book can be shipped to the buyer after processing by Staples Canada and receipt in Olds, Alberta. The e-Transfer must be received before the book is ordered from Staples. Shipping to the buyer is extra; there is no shipping cost when picked up at the buyer’s own local Staples Canada location. E-mail dollackj316@gmail.com for exact shipping costs to your location.';
    if (!staplesCard.querySelector('.staples-photo-gallery')) {
      const gallery = document.createElement('div'); gallery.className = 'staples-photo-gallery'; gallery.style.cssText = 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:14px 0 10px';
      const photos = [['sarah-future-printing-cover.jpg','Photo Book Cover'],['staples-back-cover.jpg','Back Cover'],['staples-pages-1-2.jpg','Pages 1 + 2'],['staples-pages-3-4.jpg','Pages 3 + 4'],['sarah-future-printing-cover.jpg','New Cover — Future Printings']];
      photos.forEach(([src,label], i) => { const figure = document.createElement('figure'); figure.style.cssText = i === 4 ? 'grid-column:1/-1;margin:0;text-align:center' : 'margin:0;text-align:center'; figure.innerHTML = `<img src="${src}" alt="${label}" loading="lazy" style="width:100%;height:145px;object-fit:contain;background:#fff;border:2px solid #ead5f5;border-radius:10px"><figcaption style="font-size:.82rem;font-weight:900;color:#4b146f;margin-top:4px">${label}</figcaption>`; gallery.appendChild(figure); });
      const order = staplesCard.querySelector('.store-order'); (order || staplesCard).insertAdjacentElement(order ? 'beforebegin' : 'beforeend', gallery);
    }
    if (!staplesCard.querySelector('.future-printing-note')) {
      const note = document.createElement('div'); note.className = 'future-printing-note'; note.style.cssText = 'margin:10px 0 12px;padding:12px 13px;border-radius:12px;background:#fff7d9;border:2px solid #e4bf54;color:#4d3b08;line-height:1.45;font-weight:700';
      note.innerHTML = '<strong>Please Note:</strong> The first photos show the current book printed by Staples. For all future printings, the new cover shown here will be used. Illustrations in the current book that depict Jerusalem with the Dome of the Rock have also been updated for future printings to depict <strong>Bethlehem, with white buildings and flat roofs</strong>.';
      const order = staplesCard.querySelector('.store-order'); (order || staplesCard).insertAdjacentElement(order ? 'beforebegin' : 'beforeend', note);
    }
    const staplesOrderButton = staplesCard.querySelector('.store-order a, .store-order button'); if (staplesOrderButton) staplesOrderButton.textContent = 'Buy Now !';
  }

  function goToPhotoBook() {
    const previewModal = document.getElementById('sarahPreviewModal');
    if (previewModal) previewModal.classList.remove('open');
    document.body.classList.remove('preview-open');
    const target = document.getElementById('staples-book-card');
    if (target) {
      history.replaceState(null, '', '#staples-book-card');
      target.scrollIntoView({behavior:'smooth', block:'center'});
    }
  }

  function makePhotoBookAvailable(button) {
    if (!button) return;
    button.disabled = false;
    button.classList.remove('disabled');
    button.textContent = 'Photo Book Edition Available Now !';
    button.style.background = '#176b27';
    button.style.cursor = 'pointer';
    button.onclick = goToPhotoBook;
  }
  document.querySelectorAll('.photo-book-buy-link').forEach(link => link.remove());
  makePhotoBookAvailable(document.querySelector('.softcover-coming'));
  makePhotoBookAvailable(document.querySelector('#sarahPreviewModal .preview-buy button'));

  const standardCoverFile = '1 Standard e-book edition cover.png';
  const sarahShelfCover = document.querySelector('#bookGrid .book-card:first-child .cover-button img');
  if (sarahShelfCover) { sarahShelfCover.src = standardCoverFile; sarahShelfCover.alt = 'Sarah the Baby Sheep Standard E-Book Edition cover'; }

  const sarahShelfCard = document.querySelector('#bookGrid .book-card:first-child');
  if (sarahShelfCard) {
    const actions = sarahShelfCard.querySelector('.book-actions');
    if (actions) {
      let flipButton = actions.querySelector('.shelf-flip-preview');
      if (!flipButton) { flipButton = document.createElement('button'); flipButton.type = 'button'; flipButton.className = 'soon shelf-flip-preview'; actions.appendChild(flipButton); }
      flipButton.textContent = 'FLIP BOOK C$7.00'; flipButton.style.background = '#5b197d'; flipButton.style.color = '#fff'; flipButton.style.cursor = 'pointer';
      flipButton.onclick = () => window.open('flip-book-preview-clean.html', '_blank', 'noopener');
    }
  }

  const standardEbookCard = storeGrid ? [...storeGrid.querySelectorAll('.store-card')].find(card => /PDF Download Standard E-Book Edition/i.test(card.textContent)) : null;
  if (standardEbookCard) { const img = standardEbookCard.querySelector('img'); if (img) { img.src = standardCoverFile; img.alt = 'Sarah the Baby Sheep Standard PDF E-Book Edition cover'; } }

  function markDigitalAvailable(card) {
    if (!card) return; const price = card.querySelector('.price, .store-price'); const heading = card.querySelector('h3');
    if (!card.querySelector('.digital-availability')) { const available = document.createElement('p'); available.className = 'digital-availability'; available.textContent = '✓ AVAILABLE NOW'; available.style.cssText = 'display:inline-block;align-self:flex-start;margin:7px 0 5px;padding:7px 12px;border-radius:999px;background:#e8f7e8;color:#176b27;font-weight:900;border:2px solid #73b97d'; (price || heading).insertAdjacentElement('afterend', available); }
    const orderButton = card.querySelector('.store-order a, .store-order button'); if (orderButton) orderButton.textContent = 'Buy Now !';
  }

  markDigitalAvailable(standardEbookCard);
  if (standardEbookCard) {
    const standardOrder = standardEbookCard.querySelector('.store-order a');
    if (standardOrder) standardOrder.href = 'mailto:dollackj316@gmail.com?subject=Order%20inquiry%3A%20PDF%20Download%20Standard%20E-Book%20Edition&body=Hello%20Malinda%2C%0A%0AI%20would%20like%20the%20PDF%20Download%20Standard%20E-Book%20Edition%0A%0AMy%20name%3A%0AMy%20e-mail%20address%3A%0A%0APlease%20send%20me%20the%20e-Transfer%20instructions.%0A';
    if (!standardEbookCard.querySelector('.standard-preview-link')) {
      const preview = document.createElement('a'); preview.className = 'standard-preview-link'; preview.href = 'Sarah_the_Baby_Sheep_5_Page_Standard_Ebook_Preview.pdf'; preview.target = '_blank'; preview.rel = 'noopener'; preview.textContent = 'View 5-Page Standard E-Book Preview'; preview.style.cssText = 'display:block;margin:12px 0 4px;padding:12px 14px;border-radius:999px;background:#176b27;color:#fff;text-decoration:none;text-align:center;font-weight:900;box-shadow:0 5px 12px rgba(23,107,39,.18)';
      const order = standardEbookCard.querySelector('.store-order'); if (order) order.insertAdjacentElement('beforebegin', preview); else standardEbookCard.appendChild(preview);
    }
  }

  const flipEbookCard = storeGrid ? [...storeGrid.querySelectorAll('.store-card')].find(card => /PDF Download Flip Book E-Book Edition/i.test(card.textContent)) : null;
  markDigitalAvailable(flipEbookCard);
  if (flipEbookCard) {
    const deliveryText = [...flipEbookCard.querySelectorAll('p')].find(p => /Flip Book E-Book is e-mailed to the buyer after the e-Transfer is received/i.test(p.textContent));
    if (deliveryText) deliveryText.textContent = 'A Link to the Flip Book E-Book is e-mailed to the buyer after the e-Transfer is received.';
    const flipOrder = flipEbookCard.querySelector('.store-order a');
    if (flipOrder) flipOrder.href = 'mailto:dollackj316@gmail.com?subject=Order%20inquiry%3A%20Flip%20Book%20E-Book%20Edition%20Link&body=Hello%20Malinda%2C%0A%0AI%20would%20like%20-%20The%20Link%20to%20the%20Flip%20Book%20E-Book%20Edition%0A%0AMy%20name%3A%0AMy%20e-mail%20address%3A%0A%0APlease%20send%20me%20the%20e-Transfer%20instructions.%0A';
    if (!flipEbookCard.querySelector('.flip-preview-link')) { const preview = document.createElement('a'); preview.className = 'flip-preview-link'; preview.href = 'flip-book-preview-clean.html'; preview.target = '_blank'; preview.rel = 'noopener'; preview.textContent = 'View 5-Page Flip Book Preview'; preview.style.cssText = 'display:block;margin:12px 0 4px;padding:12px 14px;border-radius:999px;background:#176b27;color:#fff;text-decoration:none;text-align:center;font-weight:900;box-shadow:0 5px 12px rgba(23,107,39,.18)'; const order = flipEbookCard.querySelector('.store-order'); if (order) order.insertAdjacentElement('beforebegin', preview); else flipEbookCard.appendChild(preview); }
  }

  const sarahPreview = document.getElementById('sarahPreviewModal');
  if (sarahPreview) {
    const pdfFile = 'Sarah_the_Baby_Sheep_5_Page_Standard_Ebook_Preview.pdf'; const heading = sarahPreview.querySelector('#sarahPreviewTitle'); const note = sarahPreview.querySelector('.preview-note'); const pages = sarahPreview.querySelector('.preview-pages'); const buy = sarahPreview.querySelector('.preview-buy');
    if (heading) heading.textContent = '5-Page Standard PDF Downloadable E-Book Preview';
    if (note) note.textContent = 'Read the new approved five-page Standard E-Book preview below. Purchase the complete Standard PDF E-Book for C$7.00.';
    if (pages) { pages.style.display = 'block'; pages.innerHTML = `<iframe src="${pdfFile}#view=FitH" title="Sarah the Baby Sheep 5-page Standard E-Book PDF preview" style="width:100%;height:min(76vh,900px);border:3px solid #dcb8ee;border-radius:14px;background:#fff"></iframe><p style="text-align:center;margin:12px 0 0"><a href="${pdfFile}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#6b218a;color:#fff;text-decoration:none;font-weight:900">OPEN 5-PAGE PDF PREVIEW</a></p>`; }
    if (buy) { const purchase = buy.querySelector('a'); if (purchase) purchase.textContent = 'Buy Now !'; makePhotoBookAvailable(buy.querySelector('button')); }
  }

  const about = document.querySelector('#about');
  if (about) { const signoffs = [...about.querySelectorAll('p,div,span')].filter(el => el.children.length === 0 && /with love in christ\s*,?\s*malinda dollack/i.test(el.textContent || '')); signoffs.slice(1).forEach(el => el.remove()); }
});
