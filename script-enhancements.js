// Malinda's Story Garden website enhancements.
document.addEventListener('DOMContentLoaded', () => {
  const storeGrid = document.querySelector('#store .store-grid');
  const fullTitle = "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story";
  const standardCoverFile = 'stb1.png?v=31';

  const standardEbookCard = storeGrid ? [...storeGrid.querySelectorAll('.store-card')].find(card => /PDF (?:Download|Link) Standard E-Book Edition|Standard E-Book Edition/i.test(card.textContent)) : null;
  if (standardEbookCard) {
    const heading = standardEbookCard.querySelector('h3');
    // Keep the exact DID3 product title already written in index.html.
    const img = standardEbookCard.querySelector('img');
    if (img) { img.src = standardCoverFile; img.alt = fullTitle + ' Standard E-Book cover'; }
    let preview = standardEbookCard.querySelector('.standard-preview-link');
    if (!preview) {
      preview = document.createElement('a');
      preview.className = 'standard-preview-link';
      const order = standardEbookCard.querySelector('.store-order');
      if (order) order.insertAdjacentElement('beforebegin', preview); else standardEbookCard.appendChild(preview);
    }
    preview.href = 'sarah-5-page-preview.html?v=31';
    preview.target = '_blank'; preview.rel = 'noopener';
    preview.textContent = 'View 5-Page Standard E-Book Preview';
    preview.style.cssText = 'display:block;margin:12px 0 4px;padding:12px 14px;border-radius:999px;background:#176b27;color:#fff;text-decoration:none;text-align:center;font-weight:900';
    const description = [...standardEbookCard.querySelectorAll('p')].find(p => !p.classList.contains('price') && !p.classList.contains('product-available'));
    if (description) description.textContent = 'The private Standard E-Book link is e-mailed to the buyer after the e-Transfer is received.';
    const orderLink = standardEbookCard.querySelector('.store-order a');
    if (orderLink) { orderLink.textContent='Buy Now !'; orderLink.href='mailto:berachahdirector@gmail.com?subject='+encodeURIComponent('Order inquiry: '+fullTitle+' — Standard E-Book Link')+'&body='+encodeURIComponent('Dear Malinda,\n\nI would like to order: '+fullTitle.replace(/[—–]/g,' - ').replace(/\s+/g,' ').trim()+' - PDF Link Standard E-Book Edition\n\nMy name:\nMy email address:\n\nPlease send me the e-Transfer instructions.\n\nGod Bless You and Your Family Mightily !'); }
  }

  const sarahShelfCover = document.querySelector('#bookGrid .book-card:first-child .cover-button img');
  if (sarahShelfCover) { sarahShelfCover.src = standardCoverFile; sarahShelfCover.alt = fullTitle + ' Standard E-Book cover'; }

  const sarahShelfCard = document.querySelector('#bookGrid .book-card:first-child');
  if (sarahShelfCard) {
    const actions = sarahShelfCard.querySelector('.book-actions');
    if (actions) {
      // Keep two separate Book #1 buttons: Standard preview and Flip Book preview.
      let standardButton = actions.querySelector('.shelf-standard-preview');
      if (!standardButton) {
        standardButton = document.createElement('button');
        standardButton.type = 'button';
        standardButton.className = 'soon shelf-standard-preview';
        actions.appendChild(standardButton);
      }
      standardButton.textContent = 'STANDARD E-BOOK C$7.00';
      standardButton.style.cursor = 'pointer';
      standardButton.onclick = () => window.open('sarah-5-page-preview.html?v=31', '_blank', 'noopener');

      let flipButton = actions.querySelector('.shelf-flip-preview');
      if (!flipButton) {
        flipButton = document.createElement('button');
        flipButton.type = 'button';
        flipButton.className = 'soon shelf-flip-preview';
        actions.appendChild(flipButton);
      }
      flipButton.textContent = 'FLIP BOOK E-BOOK C$10.00';
      flipButton.style.cursor = 'pointer';
      flipButton.onclick = () => window.open('flip-book-preview.html?v=33', '_blank', 'noopener');
    }
  }

  // Force every picture in PID1, PID2 and PID3 to the same display box.
  // Inline !important rules are set here so older inline height:auto rules cannot override them.
  ['store-PID1', 'store-PID2', 'store-PID3'].forEach(id => {
    const card = document.getElementById(id);
    if (!card) return;
    card.querySelectorAll('img').forEach(photo => {
      photo.style.setProperty('width', '100%', 'important');
      photo.style.setProperty('max-width', '100%', 'important');
      photo.style.setProperty('height', '250px', 'important');
      photo.style.setProperty('aspect-ratio', 'auto', 'important');
      photo.style.setProperty('object-fit', 'contain', 'important');
      photo.style.setProperty('object-position', 'center', 'important');
      photo.style.setProperty('background', '#ffffff', 'important');
      photo.style.setProperty('margin-left', 'auto', 'important');
      photo.style.setProperty('margin-right', 'auto', 'important');
    });
  });

  // PID16 and PID17: use the correct photographed covers and keep every picture
  // in both the main ads and their expanded descriptions the same displayed size.
  [
    { id: 'store-PID16', src: 'saddle book main 28 lbs.jpg?v=20261001', alt: 'Premium Saddle Book 28 lbs' },
    { id: 'store-PID17', src: 'saddle book main 20lbs.jpg?v=20261001', alt: 'Regular Saddle Book 20 lbs' }
  ].forEach(item => {
    const card = document.getElementById(item.id);
    if (!card) return;
    const mainPicture = card.querySelector('.product-gallery > img') || card.querySelector('img');
    if (mainPicture) {
      mainPicture.src = item.src;
      mainPicture.alt = item.alt;
    }
    card.querySelectorAll('img').forEach(photo => {
      photo.style.setProperty('width', '100%', 'important');
      photo.style.setProperty('max-width', '100%', 'important');
      photo.style.setProperty('height', '250px', 'important');
      photo.style.setProperty('aspect-ratio', 'auto', 'important');
      photo.style.setProperty('object-fit', 'contain', 'important');
      photo.style.setProperty('object-position', 'center', 'important');
      photo.style.setProperty('background', '#ffffff', 'important');
      photo.style.setProperty('margin-left', 'auto', 'important');
      photo.style.setProperty('margin-right', 'auto', 'important');
    });
  });
});