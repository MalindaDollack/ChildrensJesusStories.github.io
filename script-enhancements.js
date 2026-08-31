// Malinda's Story Garden website enhancements.
document.addEventListener('DOMContentLoaded', () => {
  const storeGrid = document.querySelector('#store .store-grid');
  const fullTitle = "Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story";
  const standardCoverFile = 'stb1.png?v=31';

  const standardEbookCard = storeGrid ? [...storeGrid.querySelectorAll('.store-card')].find(card => /PDF Download Standard E-Book Edition|Standard E-Book Edition/i.test(card.textContent)) : null;
  if (standardEbookCard) {
    const heading = standardEbookCard.querySelector('h3');
    if (heading) heading.textContent = fullTitle + ' — PDF Download Standard E-Book Edition';
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
    const orderLink = standardEbookCard.querySelector('.store-order a');
    if (orderLink) { orderLink.textContent='Buy Now !'; orderLink.href='mailto:dollackj316@gmail.com?subject='+encodeURIComponent('Order inquiry: '+fullTitle+' — Standard E-Book')+'&body='+encodeURIComponent('Hello Malinda,\n\nI would like to order: '+fullTitle+' — PDF Download Standard E-Book Edition\n\nMy name:\nMy e-mail address:\n\nPlease send me the e-Transfer instructions.\n'); }
  }

  const sarahShelfCover = document.querySelector('#bookGrid .book-card:first-child .cover-button img');
  if (sarahShelfCover) { sarahShelfCover.src = standardCoverFile; sarahShelfCover.alt = fullTitle + ' Standard E-Book cover'; }

  const sarahShelfCard = document.querySelector('#bookGrid .book-card:first-child');
  if (sarahShelfCard) {
    const actions = sarahShelfCard.querySelector('.book-actions');
    if (actions) {
      let previewButton = actions.querySelector('.shelf-flip-preview');
      if (!previewButton) { previewButton=document.createElement('button'); previewButton.className='soon shelf-flip-preview'; actions.appendChild(previewButton); }
      previewButton.textContent='STANDARD E-BOOK C$7.00'; previewButton.style.cursor='pointer';
      previewButton.onclick=()=>window.open('sarah-5-page-preview.html?v=31','_blank','noopener');
    }
  }
});
