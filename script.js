// Malinda's Story Garden store catalogue updater.
// Existing products stay in the store. Matching products are updated and new products are added.
// Subscription products are intentionally not added.

document.addEventListener('DOMContentLoaded', () => {
  const storeGrid = document.querySelector('#store .store-grid');
  if (!storeGrid) return;

  // Physical-product guarantee and digital-download disclaimer.
  const storeIntro = document.querySelector('#store .store-intro');
  if (storeIntro && !document.querySelector('#store-guarantee')) {
    const guarantee = document.createElement('div');
    guarantee.id = 'store-guarantee';
    guarantee.style.cssText = 'max-width:820px;margin:18px auto 6px;padding:16px 18px;background:#fff;border:3px solid #d9b3ee;border-radius:16px;color:#33243a;line-height:1.5;box-shadow:0 5px 14px rgba(75,20,111,.10)';
    guarantee.innerHTML = '<p style="margin:0 0 8px"><strong style="color:#4b146f">30-Day Satisfaction Guarantee — Physical Handmade Products</strong></p><p style="margin:0 0 8px">All physical handmade products are guaranteed to be exactly as described. Please keep in mind that our physical products are handmade, so slight variations may occur. Please examine all pictures carefully; I have tried to make every picture and description as accurate as possible. If you are unsatisfied with your purchase, please let me know immediately and simply return the product within 30 days for a full refund.</p><p style="margin:0"><strong>Digital downloads and products delivered by e-mail are not covered by this guarantee and are non-refundable.</strong></p>';
    storeIntro.appendChild(guarantee);
  }

  const email = 'dollackj316@gmail.com';
  const products = [
    {match:['pdf download book mark','pdf download bookmark'],title:'PDF Download Book Mark',price:'FREE',details:'Dimensions: 8 inches tall × 2 inches wide. Immediately e-mailed to the recipient after Malinda receives the recipient’s e-mail address.',physical:false},
    {match:['one hand-made laminated jesus loves you','individual laminated bookmark'],title:'One Hand-made Laminated Jesus Loves You! Book Mark',price:'C$6.14',details:'Size: 8 inches tall × 2 inches wide. Allow 24 hours processing time. Shipped to the buyer by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for exact shipping costs to your location.',physical:true},
    {match:['four hand-made laminated jesus loves you','4 individual laminated bookmarks','four laminated bookmarks'],title:'Four Hand-made Laminated Jesus Loves You! Book Marks',price:'C$8.05',details:'Each Book Mark is 8 inches tall × 2 inches wide. Allow 24 hours processing time. Shipped to the buyer by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for exact shipping costs to your location.',physical:true},
    {match:['pdf download jesus loves you! stickers','pdf download jesus loves you stickers'],title:'PDF Download Jesus Loves You! Stickers',price:'C$4.50 / C$5.00 / C$7.00',details:'Choose 1 page for C$4.50: 1 Large sticker, 9 inches tall × 6.5 inches wide; 4 Medium stickers, each 5.75 inches tall × 4 inches wide; or 20 Small stickers, each 2 inches tall × 2 inches wide. Choose any 2 pages for C$5.00 or all 3 pages for C$7.00. Immediately e-mailed to the buyer after the e-Transfer is received.',physical:false},
    {match:['hand-made jesus loves you! stickers','hand-made jesus loves you stickers'],title:'Hand-made Jesus Loves You! Stickers',price:'C$6.58 / C$10.00 / C$15.00',details:'Choose 1 page for C$6.58: 1 Large sticker, 9 inches tall × 6.5 inches wide; 4 Medium stickers, each 5.75 inches tall × 4 inches wide; or 20 Small stickers, each 2 inches tall × 2 inches wide. Choose any 2 pages for C$10.00 or all 3 pages for C$15.00. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for exact shipping costs to your location.',physical:true},
    {match:['pdf download standard e-book edition','standard e-book edition'],title:'PDF Download Standard E-Book Edition',price:'C$7.00',details:'Immediately e-mailed to the buyer after the e-Transfer is received.',physical:false},
    {match:['pdf download flip book e-book edition','flip book e-book edition'],title:'PDF Download Flip Book E-Book Edition',price:'C$10.00',details:'Immediately e-mailed to the buyer after the e-Transfer is received.',physical:false},
    {match:['pdf download standard e-book coloring book','e-book coloring book edition'],title:'PDF Download Standard E-Book Coloring Book Edition',price:'C$7.00',details:'Immediately e-mailed to the buyer after the e-Transfer is received.',physical:false},
    {match:['staple produced soft cover','staples-produced soft cover','soft cover edition photobook'],title:'Staples Produced Soft Cover Edition PhotoBook',price:'C$22.27',details:'Size: 7 inches tall × 9 inches wide. Allow 10–14 days processing time. Pick-up is available at the buyer’s local Staples Canada location, or the book can be shipped to the buyer after processing by Staples Canada and receipt in Olds, Alberta. The e-Transfer must be received before the book is ordered from Staples. Shipping to the buyer is extra; there is no shipping cost when picked up at the buyer’s own local Staples Canada location. E-mail dollackj316@gmail.com for exact shipping costs to your location.',physical:true},
    {match:['hand made perfect binding soft cover','hand-made perfect binding soft cover','perfect binding soft cover edition'],title:'Hand Made Perfect Binding Soft Cover Edition',price:'C$27.88',details:'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for exact shipping costs to your location.',physical:true},
    {match:['hand made perfect binding hard cover','hand-made perfect binding hard cover','perfect binding hard cover edition'],title:'Hand Made Perfect Binding Hard Cover Edition',price:'C$29.88',details:'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for exact shipping costs to your location.',physical:true},
    {match:['hand made upcycled decoupage art pad','hand-made upcycled decoupage art pad','upcycled decoupage art pad edition'],title:'Hand Made Upcycled Decoupage Art Pad Edition',price:'C$16.32',details:'Size: 10 inches tall × 8 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for exact shipping costs to your location.',physical:true},
    {match:['hand made card stock coloring book','hand-made card stock coloring book','card stock coloring book edition'],title:'Hand Made Card Stock Coloring Book Edition',price:'C$18.20',details:'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for exact shipping costs to your location.',physical:true}
  ];

  const normalize = text => (text || '').toLowerCase().replace(/\s+/g,' ').trim();
  function orderLink(product){
    const subject=`Order inquiry: ${product.title}`;
    const body=product.physical ? `Hello Malinda,\n\nI would like to order: ${product.title}\n\nMy name:\nMy mailing address:\n\nPlease tell me the exact shipping cost and e-Transfer instructions.` : `Hello Malinda,\n\nI would like: ${product.title}\n\nMy name:\nMy e-mail address:\n\nPlease send me the ordering/e-Transfer instructions.`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  function setCard(card,product){
    const heading=card.querySelector('h3'); if(heading) heading.textContent=product.title;
    let price=card.querySelector('.price, .store-price');
    if(!price){price=document.createElement('p');price.className='price';heading?heading.insertAdjacentElement('afterend',price):card.appendChild(price)}
    price.textContent=product.price;
    let description=card.querySelector('.catalog-details');
    if(!description){description=document.createElement('p');description.className='catalog-details';price.insertAdjacentElement('afterend',description)}
    description.textContent=product.details;
    let order=card.querySelector('.store-order'); if(!order){order=document.createElement('div');order.className='store-order';card.appendChild(order)}
    order.innerHTML=''; const link=document.createElement('a'); link.href=orderLink(product); link.textContent=product.physical?'E-mail Malinda Your Home Address':'E-mail Malinda to Order'; link.style.cssText='display:block;width:100%;box-sizing:border-box;border-radius:999px;background:#5b197d;color:#fff;text-decoration:none;text-align:center;font-weight:900;font-size:1rem;padding:13px 12px;box-shadow:0 5px 12px rgba(75,20,111,.22)'; order.appendChild(link);
  }
  function newCard(product){const card=document.createElement('article');card.className='store-card';const image=document.createElement('img');image.src='sarah.png';image.alt=product.title;image.loading='lazy';image.decoding='async';card.appendChild(image);const heading=document.createElement('h3');card.appendChild(heading);setCard(card,product);return card}
  products.forEach(product=>{const cards=[...storeGrid.querySelectorAll('.store-card')];const existing=cards.find(card=>{const text=normalize(card.textContent);return product.match.some(term=>text.includes(normalize(term)))});existing?setCard(existing,product):storeGrid.appendChild(newCard(product))});
});

// Performance boost: load only the main hero image immediately.
document.addEventListener('DOMContentLoaded',()=>{
  const hero=document.querySelector('.hero-book');
  document.querySelectorAll('img').forEach(img=>{img.decoding='async';if(img===hero){img.loading='eager';img.fetchPriority='high'}else{img.loading='lazy';img.fetchPriority='low'}});
  const observer=new MutationObserver(mutations=>{mutations.forEach(mutation=>{mutation.addedNodes.forEach(node=>{if(!(node instanceof Element))return;const images=node.matches('img')?[node]:[...node.querySelectorAll('img')];images.forEach(img=>{img.decoding='async';img.loading='lazy';img.fetchPriority='low'})})})});
  observer.observe(document.body,{childList:true,subtree:true});
});

// Shipping-cost request link and form.
document.addEventListener('DOMContentLoaded', () => {
  const storeIntro = document.querySelector('#store .store-intro');
  if (!storeIntro || document.getElementById('shipping-cost-modal')) return;

  const paragraphs = [...storeIntro.querySelectorAll('p')];
  const shippingParagraph = paragraphs.find(p => p.textContent.includes('e-mail Malinda for exact shipping costs before sending payment.'));
  if (shippingParagraph) {
    shippingParagraph.innerHTML = shippingParagraph.innerHTML.replace(
      'e-mail Malinda for exact shipping costs before sending payment.',
      '<a href="#" id="shipping-cost-link" style="color:#6b218a;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px;font-weight:900">e-mail Malinda for exact shipping costs before sending payment.</a>'
    );
  }

  const modal = document.createElement('div');
  modal.id = 'shipping-cost-modal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:2000;background:rgba(35,10,45,.72);padding:20px;overflow:auto;box-sizing:border-box';
  modal.innerHTML = `
    <div style="width:min(620px,96vw);margin:6vh auto;background:#fff;border:5px solid #6b218a;border-radius:22px;padding:22px;box-sizing:border-box;box-shadow:0 18px 60px rgba(0,0,0,.35)">
      <button type="button" id="shipping-cost-close" aria-label="Close" style="float:right;width:42px;height:42px;border:0;border-radius:50%;background:#6b218a;color:#fff;font-size:26px;cursor:pointer">×</button>
      <h2 style="color:#4b146f;margin:0 52px 8px 0">Request Shipping Cost</h2>
      <p style="font-weight:800;color:#33243a">Please send me the shipping costs for this item.</p>
      <form id="shipping-cost-form">
        <label style="display:block;font-weight:800;color:#4b146f;margin:14px 0 6px">Item name
          <input name="item" required style="display:block;width:100%;box-sizing:border-box;padding:12px;border:2px solid #d8b7e7;border-radius:10px;font:inherit;margin-top:5px" placeholder="Enter the item name">
        </label>
        <label style="display:block;font-weight:800;color:#4b146f;margin:14px 0 6px">Your physical / mailing address
          <textarea name="address" rows="5" required style="display:block;width:100%;box-sizing:border-box;padding:12px;border:2px solid #d8b7e7;border-radius:10px;font:inherit;margin-top:5px" placeholder="Street address, town/city, province/state, postal/ZIP code, country"></textarea>
        </label>
        <button type="submit" style="width:100%;margin-top:16px;border:0;border-radius:999px;background:#5b197d;color:#fff;font-weight:900;font-size:1.05rem;padding:13px;cursor:pointer">Open E-mail to Malinda</button>
      </form>
    </div>`;
  document.body.appendChild(modal);

  const link = document.getElementById('shipping-cost-link');
  const close = document.getElementById('shipping-cost-close');
  const form = document.getElementById('shipping-cost-form');
  const openModal = () => { modal.style.display = 'block'; const input = form.querySelector('input[name="item"]'); if (input) input.focus(); };
  const closeModal = () => { modal.style.display = 'none'; };

  if (link) link.addEventListener('click', e => { e.preventDefault(); openModal(); });
  close.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display === 'block') closeModal(); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const item = String(data.get('item') || '').trim();
    const address = String(data.get('address') || '').trim();
    if (!item || !address) return;
    const subject = `Shipping cost request: ${item}`;
    const body = `Hello Malinda,\n\nPlease send me the shipping costs for this item.\n\nItem name: ${item}\n\nMy physical / mailing address:\n${address}\n`;
    window.location.href = `mailto:dollackj316@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
