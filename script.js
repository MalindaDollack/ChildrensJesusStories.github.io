// Malinda's Story Garden website enhancements.

document.addEventListener('DOMContentLoaded', () => {
  const email = 'dollackj316@gmail.com';
  const storeGrid = document.querySelector('#store .store-grid');
  const storeIntro = document.querySelector('#store .store-intro');

  // Physical-product guarantee and digital-product disclaimer.
  if (storeIntro && !document.querySelector('#store-guarantee')) {
    const guarantee = document.createElement('div');
    guarantee.id = 'store-guarantee';
    guarantee.style.cssText = 'max-width:820px;margin:18px auto 6px;padding:16px 18px;background:#fff;border:3px solid #d9b3ee;border-radius:16px;color:#33243a;line-height:1.5;box-shadow:0 5px 14px rgba(75,20,111,.10)';
    guarantee.innerHTML = '<p style="margin:0 0 8px"><strong style="color:#4b146f">30-Day Satisfaction Guarantee — Physical Handmade Products</strong></p><p style="margin:0 0 8px">All physical handmade products are guaranteed to be exactly as described. Please keep in mind that our physical products are handmade, so slight variations may occur. Please examine all pictures carefully; I have tried to make every picture and description as accurate as possible. If you are unsatisfied with your purchase, please let me know immediately and simply return the product within 30 days for a full refund.</p><p style="margin:0"><strong>Digital downloads and products delivered by e-mail are not covered by this guarantee and are non-refundable.</strong></p>';
    storeIntro.appendChild(guarantee);
  }

  // Find the Staples Soft Cover PhotoBook card and make it clearly available.
  let staplesCard = null;
  if (storeGrid) {
    staplesCard = [...storeGrid.querySelectorAll('.store-card')].find(card => /staples[- ]produced soft cover|staples produced soft cover|soft cover photobook/i.test(card.textContent));
  }

  if (staplesCard) {
    staplesCard.id = 'staples-book-card';

    const mainImage = staplesCard.querySelector('img');
    if (mainImage) {
      mainImage.src = 'staples-current-front.jpg';
      mainImage.alt = 'Current Staples printed Sarah the Baby Sheep soft cover book';
      mainImage.loading = 'eager';
    }

    const heading = staplesCard.querySelector('h3');
    if (heading) heading.textContent = 'Staples Produced Soft Cover Edition PhotoBook';

    let availability = staplesCard.querySelector('.staples-availability');
    if (!availability) {
      availability = document.createElement('p');
      availability.className = 'staples-availability';
      availability.textContent = '✓ AVAILABLE NOW';
      availability.style.cssText = 'display:inline-block;align-self:flex-start;margin:7px 0 5px;padding:7px 12px;border-radius:999px;background:#e8f7e8;color:#176b27;font-weight:900;border:2px solid #73b97d';
      const price = staplesCard.querySelector('.price, .store-price');
      if (price) price.insertAdjacentElement('afterend', availability);
      else if (heading) heading.insertAdjacentElement('afterend', availability);
    }

    const oldDescription = staplesCard.querySelector('.catalog-details') || [...staplesCard.querySelectorAll('p')].find(p => /7 inches tall|10.?14 days processing/i.test(p.textContent));
    if (oldDescription) {
      oldDescription.textContent = 'Size: 7 inches tall × 9 inches wide. Allow 10–14 days processing time. Pick-up is available at the buyer’s local Staples Canada location, or the book can be shipped to the buyer after processing by Staples Canada and receipt in Olds, Alberta. The e-Transfer must be received before the book is ordered from Staples. Shipping to the buyer is extra; there is no shipping cost when picked up at the buyer’s own local Staples Canada location. E-mail dollackj316@gmail.com for exact shipping costs to your location.';
    }

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
      photos.forEach(([src,label], index) => {
        const figure = document.createElement('figure');
        figure.style.cssText = index === 4 ? 'grid-column:1 / -1;margin:0;text-align:center' : 'margin:0;text-align:center';
        const img = document.createElement('img');
        img.src = src;
        img.alt = label;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.style.cssText = 'width:100%;height:145px;object-fit:contain;background:#fff;border:2px solid #ead5f5;border-radius:10px;cursor:pointer';
        const caption = document.createElement('figcaption');
        caption.textContent = label;
        caption.style.cssText = 'font-size:.82rem;font-weight:900;color:#4b146f;margin-top:4px';
        figure.append(img, caption);
        gallery.appendChild(figure);
      });
      const order = staplesCard.querySelector('.store-order');
      if (order) order.insertAdjacentElement('beforebegin', gallery);
      else staplesCard.appendChild(gallery);
    }

    if (!staplesCard.querySelector('.future-printing-note')) {
      const note = document.createElement('div');
      note.className = 'future-printing-note';
      note.style.cssText = 'margin:10px 0 12px;padding:12px 13px;border-radius:12px;background:#fff7d9;border:2px solid #e4bf54;color:#4d3b08;line-height:1.45;font-weight:700';
      note.innerHTML = '<strong>Please Note:</strong> The first photos show the current book printed by Staples. For all future printings, the new cover shown here will be used. Illustrations in the current book that depict Jerusalem with the Dome of the Rock have also been updated for future printings to depict <strong>Bethlehem, with white buildings and flat roofs</strong>.';
      const order = staplesCard.querySelector('.store-order');
      if (order) order.insertAdjacentElement('beforebegin', note);
      else staplesCard.appendChild(note);
    }

    let order = staplesCard.querySelector('.store-order');
    if (!order) {
      order = document.createElement('div');
      order.className = 'store-order';
      staplesCard.appendChild(order);
    }
    const subject = encodeURIComponent('Order inquiry: Staples Produced Soft Cover Edition PhotoBook');
    const body = encodeURIComponent('Hello Malinda,\n\nI would like to order: Staples Produced Soft Cover Edition PhotoBook\n\nMy name:\nMy mailing address:\n\nPlease tell me the exact shipping cost and e-Transfer instructions.');
    order.innerHTML = `<a href="mailto:${email}?subject=${subject}&body=${body}" style="display:block;width:100%;box-sizing:border-box;border-radius:999px;background:#5b197d;color:#fff;text-decoration:none;text-align:center;font-weight:900;font-size:1rem;padding:13px 12px;box-shadow:0 5px 12px rgba(75,20,111,.22)">E-mail Malinda Your Home Address</a>`;
  }

  // Sarah's softcover is no longer "Coming Soon". Point both existing buttons to the available Staples edition.
  const makeAvailableButton = button => {
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
  };
  makeAvailableButton(document.querySelector('.softcover-coming'));
  makeAvailableButton(document.querySelector('#sarahPreviewModal .preview-buy button'));

  // Large-picture viewing for the new Staples gallery.
  document.querySelectorAll('.staples-photo-gallery img').forEach(img => {
    img.addEventListener('click', () => {
      if (typeof openImage === 'function') openImage(img.src, img.alt);
    });
  });

  // Performance: defer non-hero images.
  const hero = document.querySelector('.hero-book');
  document.querySelectorAll('img').forEach(img => {
    img.decoding = 'async';
    if (img === hero) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    } else if (!img.closest('#staples-book-card') || img !== mainImage) {
      img.loading = 'lazy';
      img.fetchPriority = 'low';
    }
  });

  // Make the shipping-cost sentence clickable and provide the existing simple request form.
  if (storeIntro && !document.getElementById('shipping-cost-modal')) {
    const paragraphs = [...storeIntro.querySelectorAll('p')];
    const shippingParagraph = paragraphs.find(p => p.textContent.includes('e-mail Malinda for exact shipping costs before sending payment.'));
    if (shippingParagraph && !document.getElementById('shipping-cost-link')) {
      shippingParagraph.innerHTML = shippingParagraph.innerHTML.replace(
        'e-mail Malinda for exact shipping costs before sending payment.',
        '<a href="#" id="shipping-cost-link" style="color:#6b218a;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px;font-weight:900">e-mail Malinda for exact shipping costs before sending payment.</a>'
      );
    }

    const modal = document.createElement('div');
    modal.id = 'shipping-cost-modal';
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:2000;background:rgba(35,10,45,.72);padding:20px;overflow:auto;box-sizing:border-box';
    modal.innerHTML = `<div style="width:min(620px,96vw);margin:6vh auto;background:#fff;border:5px solid #6b218a;border-radius:22px;padding:22px;box-sizing:border-box;box-shadow:0 18px 60px rgba(0,0,0,.35)"><button type="button" id="shipping-cost-close" aria-label="Close" style="float:right;width:42px;height:42px;border:0;border-radius:50%;background:#6b218a;color:#fff;font-size:26px;cursor:pointer">×</button><h2 style="color:#4b146f;margin:0 52px 8px 0">Request Shipping Cost</h2><p style="font-weight:800;color:#33243a">Please send me the shipping costs for this item.</p><form id="shipping-cost-form"><label style="display:block;font-weight:800;color:#4b146f;margin:14px 0 6px">Item name<input name="item" required style="display:block;width:100%;box-sizing:border-box;padding:12px;border:2px solid #d8b7e7;border-radius:10px;font:inherit;margin-top:5px" placeholder="Enter the item name"></label><label style="display:block;font-weight:800;color:#4b146f;margin:14px 0 6px">Your physical / mailing address<textarea name="address" rows="5" required style="display:block;width:100%;box-sizing:border-box;padding:12px;border:2px solid #d8b7e7;border-radius:10px;font:inherit;margin-top:5px" placeholder="Street address, town/city, province/state, postal/ZIP code, country"></textarea></label><button type="submit" style="width:100%;margin-top:16px;border:0;border-radius:999px;background:#5b197d;color:#fff;font-weight:900;font-size:1.05rem;padding:13px;cursor:pointer">Open E-mail to Malinda</button></form></div>`;
    document.body.appendChild(modal);
    const link = document.getElementById('shipping-cost-link');
    const close = document.getElementById('shipping-cost-close');
    const form = document.getElementById('shipping-cost-form');
    if (link) link.addEventListener('click', e => { e.preventDefault(); modal.style.display = 'block'; });
    if (close) close.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const item = String(data.get('item') || '').trim();
      const address = String(data.get('address') || '').trim();
      if (!item || !address) return;
      const subject = encodeURIComponent(`Shipping cost request: ${item}`);
      const body = encodeURIComponent(`Hello Malinda,\n\nPlease send me the shipping costs for this item.\n\nItem name: ${item}\n\nMy physical / mailing address:\n${address}\n`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }
});
