// Malinda's Story Garden website enhancements.
document.addEventListener('DOMContentLoaded', () => {
  const storeGrid = document.querySelector('#store .store-grid');
  const fullTitle = "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV)";
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

  // PID4, PID5 and PID6: use the Thank You photographs as the main ad pictures.
  // Move each former main photograph into the expanded description and label it "Alone".
  const stickerPhotoNote = `Please note these Stickers looks much better in real life. I am using very old equipment to produce these ads the blurriness and sometimes lack of definition are caused by my camera. I wanted to give you the most accurate representation of these Stickers. I have included photos with rulers. The Stickers are all of Sarah the Baby Sheep: Jesus Loves You ! from the Children's Bible Story Book, Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. All Avery Paper Stickers are reusable. I have tried it and you can "carefully" remove them and place them again somewhere else. JESUS LOVES YOU !`;
  [
    {
      id: 'store-PID4',
      main: { src: 'Thank You 20 Small Stickers.jpg?v=20261004', alt: 'Thank You 20 Small Stickers' },
      detail: [
        { src: 'stickers 20 small alone.jpg?v=20261002', label: 'Alone' },
        { src: 'stickers 20 small horizontal.jpg?v=20261002', label: 'stickers 20 small horizontal' },
        { src: 'stickers 20 small vertical.jpg?v=20261002', label: 'stickers 20 small vertical' },
        { src: 'stickers 20 small envelope.jpg?v=20261002', label: 'stickers 20 small envelope' }
      ]
    },
    {
      id: 'store-PID5',
      main: { src: 'Thank You 4 Medium Stickers.jpg?v=20261004', alt: 'Thank You 4 Medium Stickers' },
      detail: [
        { src: 'stickers 4 medium alone.jpg?v=20261002', label: 'Alone' },
        { src: 'stickers 4 medium horizontal.jpg?v=20261002', label: 'stickers 4 medium horizontal' },
        { src: 'stickers 4 medium vertical.jpg?v=20261002', label: 'stickers 4 medium vertical' },
        { src: 'stickers 4 medium envelope.jpg?v=20261002', label: 'stickers 4 medium envelope' }
      ]
    },
    {
      id: 'store-PID6',
      main: { src: 'Thank You 1 Large Sticker.jpg?v=20261004', alt: 'Thank You 1 Large Sticker' },
      detail: [
        { src: 'sticker lg alone.jpg?v=20261002', label: 'Alone' },
        { src: 'sticker lg horizontal.jpg?v=20261002', label: 'sticker lg horizontal' },
        { src: 'sticker lg vertical.jpg?v=20261002', label: 'sticker lg vertical' },
        { src: 'sticker lg mailing.jpg?v=20261002', label: 'sticker lg mailing' }
      ]
    }
  ].forEach(item => {
    const card = document.getElementById(item.id);
    if (!card) return;

    const mainPicture = card.querySelector('img');
    if (mainPicture) {
      mainPicture.src = item.main.src;
      mainPicture.alt = item.main.alt;
    }

    const details = card.querySelector('.store-details');
    if (!details) return;
    details.querySelectorAll('.pid-sticker-photo-note, .pid-sticker-photo-gallery').forEach(el => el.remove());

    const note = document.createElement('p');
    note.className = 'pid-sticker-photo-note';
    const strong = document.createElement('strong');
    strong.textContent = stickerPhotoNote;
    note.appendChild(strong);

    const gallery = document.createElement('div');
    gallery.className = 'pid-sticker-photo-gallery';
    gallery.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:18px 0 22px;';

    item.detail.forEach(photoData => {
      const figure = document.createElement('figure');
      figure.style.cssText = 'margin:0;text-align:center;';

      const photo = document.createElement('img');
      photo.loading = 'lazy';
      photo.decoding = 'async';
      photo.src = photoData.src;
      photo.alt = photoData.label;
      photo.style.cssText = 'display:block;width:100%;height:250px;object-fit:contain;object-position:center;background:#fff;margin:0 auto;';

      const caption = document.createElement('figcaption');
      caption.textContent = photoData.label;
      caption.style.cssText = 'margin-top:6px;color:#4b146f;font-weight:800;line-height:1.25;';

      figure.append(photo, caption);
      gallery.appendChild(figure);
    });

    details.insertBefore(note, details.firstChild);
    details.insertBefore(gallery, note.nextSibling);
  });

  // PID15: use Thank You Sarah Game as the main ad picture, and move the former
// main package picture into the expanded description labeled "Alone".
const pid15Card = document.getElementById('store-PID15');
if (pid15Card) {
  const pid15Main = pid15Card.querySelector('.product-gallery > img') || pid15Card.querySelector('img');
  if (pid15Main) {
    pid15Main.src = 'Thank You Sarah Game.jpg?v=20261004';
    pid15Main.alt = 'Thank You Sarah Game';
  }

  const pid15Details = pid15Card.querySelector('.store-details');
  if (pid15Details) {
    const pid15Gallery = pid15Details.querySelector('.pid15-photo-gallery');
    if (pid15Gallery) {
      pid15Gallery.querySelectorAll('.pid15-alone-photo').forEach(el => el.remove());

      const figure = document.createElement('figure');
      figure.className = 'pid15-alone-photo';
      figure.style.cssText = 'margin:0;padding:10px;border:2px solid #ead5f5;border-radius:12px;background:#fff;text-align:center;';

      const photo = document.createElement('img');
      photo.loading = 'lazy';
      photo.decoding = 'async';
      photo.src = 'game card package no measurements.jpg?v=20261004';
      photo.alt = 'Alone';
      photo.style.cssText = 'display:block;width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;margin:0 auto;';

      const caption = document.createElement('figcaption');
      caption.textContent = 'Alone';
      caption.style.cssText = 'margin-top:8px;color:#4b146f;font-weight:800;line-height:1.25;';

      figure.append(photo, caption);
      pid15Gallery.insertBefore(figure, pid15Gallery.firstChild);
    }
  }
}

  // PID16 and PID17: use the correct photographed covers and keep every picture
  // in both the main ads and their expanded descriptions the same displayed size.
  [
    { id: 'store-PID16', src: 'Thank You 20lb Saddle Book.jpg?v=20261005d', alt: 'Thank You 20lb Saddle Book' },
    { id: 'store-PID17', src: 'Thank You 28lb Saddle Book.jpg?v=20261005d', alt: 'Thank You 28lb Saddle Book' }
  ].forEach(item => {
    const card = document.getElementById(item.id);
    if (!card) return;
    if (item.id === 'store-PID16') {
      const price = card.querySelector('.price');
      if (price) price.textContent = 'C$12.00';
    }
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

// ISBN-matching Sarah book listing wording — October 2026.
// Run after the older store cleanup so those routines cannot overwrite these ISBN titles/subtitles.
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const subtitle = "Jesus\'s Birth through the BIG BLUE EYES of Sarah the Baby Sheep !";
    const subtitleHtml = "Jesus\'s Birth through the <strong class='big-blue-eyes'>BIG BLUE EYES</strong> of Sarah the Baby Sheep !";
    const listings = {
      PID15: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Hand Made Laminated Ribbon Tied Matching JESUS LOVES YOU ! Game Laminated Tiles." },
      PID1: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story. Luke 2: 1-20 (NIV) Hand-Made Color JESUS LOVES YOU ! with Sarah the Baby Sheep - 1 Laminated Book Mark." },
      PID2: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story. Luke 2: 1-20 (NIV) Hand-Made Color JESUS LOVES YOU ! with Sarah the Baby Sheep - 2 Laminated Book Marks." },
      PID3: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story. Luke 2: 1-20 (NIV) Hand-Made Color JESUS LOVES YOU ! with Sarah the Baby Sheep - 5 Laminated Book Marks." },
      PID4: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story. Luke 2: 1-20 (NIV) Hand-Made Color JESUS LOVES YOU ! with Sarah the Baby Sheep - 20 Hand Made Small Jesus Loves You ! Stickers." },
      PID5: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story. Luke 2: 1-20 (NIV) Hand-Made Color JESUS LOVES YOU ! with Sarah the Baby Sheep - 4 Hand Made Medium Jesus Loves You ! Stickers." },
      PID6: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story. Luke 2: 1-20 (NIV) Hand-Made Color JESUS LOVES YOU ! with Sarah the Baby Sheep - 1 Hand Made Large Jesus Loves You ! Sticker." },
      DID1: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story. Luke 2: 1-20 (NIV) JESUS LOVES YOU ! with Sarah the Baby Sheep - 1 Digital file.png \"Book Mark\"" },
      DID2: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story Edition. Luke 2: 1-20 (NIV) JESUS LOVES YOU ! Matching Game." },
      SESB1: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Black and White Regular 20 lb Paper Special Sameritain's Purse Edition." },
      PID8: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Laminated and Ribbon Tied Baby Book Edition." },
      PID7: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Customizable Color Laminated and Ribbon Tied Baby Book Edition." },
      PID11: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Staples Photo Book Edition. Shipping Included" },
      PID16: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Saddle Book Regular 20 lb Paper Edition." },
      PID17: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Saddle Book Regular 28 lb Paper Edition." },
      PID10: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Comb-Bound Soft Cover Book Edition." },
      PID13: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Comb-Bound Jesus Loves You ! Art Pad Laminated Covers Card Stock Edition." },
      PID9: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Comb-Bound Fully Laminated Soft Cover Edition." },
      PID12: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Comb-Bound Laminated Covers Card Stock Coloring Book Edition." },
      DID3: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Standard E-Book Edition." },
      DID4: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Flip E-Book Edition." },
      PID14: { title: "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. Luke 2: 1-20 (NIV) Color Staples Photo Book Edition. Pick up at Local Staples" },
    };

    const allCards = [...document.querySelectorAll('#store .store-card')];
    const escapeForRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    Object.entries(listings).forEach(([code, info]) => {
      const card = document.getElementById(`store-${code}`) || allCards.find(candidate => {
        const heading = candidate.querySelector('h3');
        return heading && new RegExp('^\\s*' + escapeForRegex(code) + '\\s*(?:—|-)','i').test(heading.textContent);
      });
      if (!card) return;

      const displayTitle = info.title + (info.suffix || '');
      const heading = card.querySelector('h3');
      if (heading) heading.textContent = `${code} — ${displayTitle}`;

      card.querySelectorAll('.isbn-product-subtitle').forEach(el => el.remove());
      if (heading) {
        const subtitleLine = document.createElement('p');
        subtitleLine.className = 'isbn-product-subtitle';
        subtitleLine.innerHTML = 'Subtitle: ' + subtitleHtml;
        subtitleLine.style.cssText = 'font-weight:400;color:#00008B;margin:4px 0 8px;line-height:1.3;';
        heading.insertAdjacentElement('afterend', subtitleLine);
      }

      const details = card.querySelector('.store-details');
      if (!details) return;
      details.querySelectorAll('.isbn-title-description').forEach(el => el.remove());

      const descriptionTitle = document.createElement('div');
      descriptionTitle.className = 'isbn-title-description';

      const titleLine = document.createElement('p');
      const titleStrong = document.createElement('strong');
      titleStrong.textContent = displayTitle;
      titleLine.appendChild(titleStrong);

      const descriptionSubtitle = document.createElement('p');
      descriptionSubtitle.innerHTML = 'Subtitle: ' + subtitleHtml;
      descriptionSubtitle.style.cssText = 'font-weight:400;color:#00008B;line-height:1.3;';

      descriptionTitle.append(titleLine, descriptionSubtitle);

      if (code === 'PID11' || code === 'PID14') {
        const noteEnd = [...details.childNodes].find(node => node.nodeType === Node.COMMENT_NODE && /PID-STAPLES-NOTE-END/.test(node.nodeValue || ''));
        if (noteEnd) details.insertBefore(descriptionTitle, noteEnd.nextSibling);
        else details.insertBefore(descriptionTitle, details.firstChild);
      } else {
        details.insertBefore(descriptionTitle, details.firstChild);
      }
    });
  }, 0);
});