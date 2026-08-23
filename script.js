// Malinda's Story Garden website enhancements.
document.addEventListener('DOMContentLoaded', () => {
  const storeIntro = document.querySelector('#store .store-intro');
  const storeGrid = document.querySelector('#store .store-grid');

  // Keep the store guarantee visible.
  if (storeIntro && !document.getElementById('store-guarantee')) {
    const guarantee = document.createElement('div');
    guarantee.id = 'store-guarantee';
    guarantee.style.cssText = 'max-width:820px;margin:18px auto 6px;padding:16px 18px;background:#fff;border:3px solid #d9b3ee;border-radius:16px;color:#33243a;line-height:1.5;box-shadow:0 5px 14px rgba(75,20,111,.10)';
    guarantee.innerHTML = '<p style="margin:0 0 8px"><strong style="color:#4b146f">30-Day Satisfaction Guarantee — Physical Handmade Products</strong></p><p style="margin:0 0 8px">All physical handmade products are guaranteed to be exactly as described. Please keep in mind that our physical products are handmade, so slight variations may occur. Please examine all pictures carefully; I have tried to make every picture and description as accurate as possible. If you are unsatisfied with your purchase, please let me know immediately and simply return the product within 30 days for a full refund.</p><p style="margin:0"><strong>Digital downloads and products delivered by e-mail are not covered by this guarantee and are non-refundable.</strong></p>';
    storeIntro.appendChild(guarantee);
  }

  // Update the Staples Soft Cover PhotoBook listing.
  const staplesCard = storeGrid ? [...storeGrid.querySelectorAll('.store-card')].find(card => /staples[- ]produced soft cover|staples produced soft cover|soft cover photobook/i.test(card.textContent)) : null;
  if (staplesCard) {
    staplesCard.id = 'staples-book-card';
    const mainImage = staplesCard.querySelector('img');
    if (mainImage) {
      mainImage.src = 'staples-current-front.jpg';
      mainImage.alt = 'Current Staples printed Sarah the Baby Sheep soft cover book';
    }
    const heading = staplesCard.querySelector('h3');
    if (heading) heading.textContent = 'Staples Produced Soft Cover Edition PhotoBook';

    const price = staplesCard.querySelector('.price, .store-price');
    if (!staplesCard.querySelector('.staples-availability')) {
      const available = document.createElement('p');
      available.className = 'staples-availability';
      available.textContent = '✓ AVAILABLE NOW';
      available.style.cssText = 'display:inline-block;align-self:flex-start;margin:7px 0 5px;padding:7px 12px;border-radius:999px;background:#e8f7e8;color:#176b27;font-weight:900;border:2px solid #73b97d';
      (price || heading).insertAdjacentElement('afterend', available);
    }

    const description = staplesCard.querySelector('.catalog-details') || [...staplesCard.querySelectorAll('p')].find(p => /7 inches tall|10.?14 days processing/i.test(p.textContent));
    if (description) description.textContent = 'Size: 7 inches tall × 9 inches wide. Allow 10–14 days processing time. Pick-up is available at the buyer’s local Staples Canada location, or the book can be shipped to the buyer after processing by Staples Canada and receipt in Olds, Alberta. The e-Transfer must be received before the book is ordered from Staples. Shipping to the buyer is extra; there is no shipping cost when picked up at the buyer’s own local Staples Canada location. E-mail dollackj316@gmail.com for exact shipping costs to your location.';

    if (!staplesCard.querySelector('.staples-photo-gallery')) {
      const gallery = document.createElement('div');
      gallery.className = 'staples-photo-gallery';
      gallery.style.cssText = 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:14px 0 10px';
      const photos = [
        ['staples-current-front.jpg','Current Staples Printed Front Cover'],
        ['staples-back-cover.jpg','Back Cover'],
        ['staples-pages-1-2.jpg','Pages 1 + 2'],
        ['staples-pages-3-4.jpg','Pages 3 + 4'],
        ['sarah-future-printing-cover.jpg','New Cover — Future Printings']
      ];
      photos.forEach(([src,label], i) => {
        const figure = document.createElement('figure');
        figure.style.cssText = i === 4 ? 'grid-column:1/-1;margin:0;text-align:center' : 'margin:0;text-align:center';
        figure.innerHTML = `<img src="${src}" alt="${label}" loading="lazy" style="width:100%;height:145px;object-fit:contain;background:#fff;border:2px solid #ead5f5;border-radius:10px"><figcaption style="font-size:.82rem;font-weight:900;color:#4b146f;margin-top:4px">${label}</figcaption>`;
        gallery.appendChild(figure);
      });
      const order = staplesCard.querySelector('.store-order');
      (order || staplesCard).insertAdjacentElement(order ? 'beforebegin' : 'beforeend', gallery);
    }

    if (!staplesCard.querySelector('.future-printing-note')) {
      const note = document.createElement('div');
      note.className = 'future-printing-note';
      note.style.cssText = 'margin:10px 0 12px;padding:12px 13px;border-radius:12px;background:#fff7d9;border:2px solid #e4bf54;color:#4d3b08;line-height:1.45;font-weight:700';
      note.innerHTML = '<strong>Please Note:</strong> The first photos show the current book printed by Staples. For all future printings, the new cover shown here will be used. Illustrations in the current book that depict Jerusalem with the Dome of the Rock have also been updated for future printings to depict <strong>Bethlehem, with white buildings and flat roofs</strong>.';
      const order = staplesCard.querySelector('.store-order');
      (order || staplesCard).insertAdjacentElement(order ? 'beforebegin' : 'beforeend', note);
    }
  }

  // Sarah softcover is available now, not coming soon.
  function makeAvailable(button) {
    if (!button) return;
    button.disabled = false;
    button.classList.remove('disabled');
    button.textContent = 'SOFTCOVER AVAILABLE NOW — C$22.27';
    button.style.background = '#176b27';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
      const target = document.getElementById('staples-book-card');
      if (target) target.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }
  makeAvailable(document.querySelector('.softcover-coming'));
  makeAvailable(document.querySelector('#sarahPreviewModal .preview-buy button'));
});
