// Malinda's Story Garden store catalogue updater.
// Existing products stay in the store. Matching products are updated and new products are added.
// Subscription products are intentionally not added.

document.addEventListener('DOMContentLoaded', () => {
  const storeGrid = document.querySelector('#store .store-grid');
  if (!storeGrid) return;

  const email = 'dollackj316@gmail.com';

  const products = [
    {
      match: ['pdf download book mark', 'pdf download bookmark'],
      title: 'PDF Download Book Mark',
      price: 'FREE',
      details: 'Dimensions: 8 inches tall × 2 inches wide. Immediately e-mailed to the recipient after Malinda receives the recipient’s e-mail address.',
      physical: false
    },
    {
      match: ['one hand-made laminated jesus loves you', 'individual laminated bookmark'],
      title: 'One Hand-made Laminated Jesus Loves You! Book Mark',
      price: 'C$6.14',
      details: 'Size: 8 inches tall × 2 inches wide. Allow 24 hours processing time. Shipped to the buyer by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for exact shipping costs to your location.',
      physical: true
    },
    {
      match: ['four hand-made laminated jesus loves you', '4 individual laminated bookmarks', 'four laminated bookmarks'],
      title: 'Four Hand-made Laminated Jesus Loves You! Book Marks',
      price: 'C$8.05',
      details: 'Each Book Mark is 8 inches tall × 2 inches wide. Allow 24 hours processing time. Shipped to the buyer by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for exact shipping costs to your location.',
      physical: true
    },
    {
      match: ['pdf download jesus loves you! stickers', 'pdf download jesus loves you stickers'],
      title: 'PDF Download Jesus Loves You! Stickers',
      price: 'C$4.50 / C$5.00 / C$7.00',
      details: 'Choose 1 page for C$4.50: 1 Large sticker, 9 inches tall × 6.5 inches wide; 4 Medium stickers, each 5.75 inches tall × 4 inches wide; or 20 Small stickers, each 2 inches tall × 2 inches wide. Choose any 2 pages for C$5.00 or all 3 pages for C$7.00. Immediately e-mailed to the buyer after the e-Transfer is received.',
      physical: false
    },
    {
      match: ['hand-made jesus loves you! stickers', 'hand-made jesus loves you stickers'],
      title: 'Hand-made Jesus Loves You! Stickers',
      price: 'C$6.58 / C$10.00 / C$15.00',
      details: 'Choose 1 page for C$6.58: 1 Large sticker, 9 inches tall × 6.5 inches wide; 4 Medium stickers, each 5.75 inches tall × 4 inches wide; or 20 Small stickers, each 2 inches tall × 2 inches wide. Choose any 2 pages for C$10.00 or all 3 pages for C$15.00. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for exact shipping costs to your location.',
      physical: true
    },
    {
      match: ['pdf download standard e-book edition', 'standard e-book edition'],
      title: 'PDF Download Standard E-Book Edition',
      price: 'C$7.00',
      details: 'Immediately e-mailed to the buyer after the e-Transfer is received.',
      physical: false
    },
    {
      match: ['pdf download flip book e-book edition', 'flip book e-book edition'],
      title: 'PDF Download Flip Book E-Book Edition',
      price: 'C$10.00',
      details: 'Immediately e-mailed to the buyer after the e-Transfer is received.',
      physical: false
    },
    {
      match: ['pdf download standard e-book coloring book', 'e-book coloring book edition'],
      title: 'PDF Download Standard E-Book Coloring Book Edition',
      price: 'C$7.00',
      details: 'Immediately e-mailed to the buyer after the e-Transfer is received.',
      physical: false
    },
    {
      match: ['staple produced soft cover', 'staples-produced soft cover', 'soft cover edition photobook'],
      title: 'Staples Produced Soft Cover Edition PhotoBook',
      price: 'C$22.27',
      details: 'Size: 7 inches tall × 9 inches wide. Allow 10–14 days processing time. Pick-up is available at the buyer’s local Staples Canada location, or the book can be shipped to the buyer after processing by Staples Canada and receipt in Olds, Alberta. The e-Transfer must be received before the book is ordered from Staples. Shipping to the buyer is extra; there is no shipping cost when picked up at the buyer’s own local Staples Canada location. E-mail dollackj316@gmail.com for exact shipping costs to your location.',
      physical: true
    },
    {
      match: ['hand made perfect binding soft cover', 'hand-made perfect binding soft cover', 'perfect binding soft cover edition'],
      title: 'Hand Made Perfect Binding Soft Cover Edition',
      price: 'C$27.88',
      details: 'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for exact shipping costs to your location.',
      physical: true
    },
    {
      match: ['hand made perfect binding hard cover', 'hand-made perfect binding hard cover', 'perfect binding hard cover edition'],
      title: 'Hand Made Perfect Binding Hard Cover Edition',
      price: 'C$29.88',
      details: 'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for exact shipping costs to your location.',
      physical: true
    },
    {
      match: ['hand made upcycled decoupage art pad', 'hand-made upcycled decoupage art pad', 'upcycled decoupage art pad edition'],
      title: 'Hand Made Upcycled Decoupage Art Pad Edition',
      price: 'C$16.32',
      details: 'Size: 10 inches tall × 8 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for exact shipping costs to your location.',
      physical: true
    },
    {
      match: ['hand made card stock coloring book', 'hand-made card stock coloring book', 'card stock coloring book edition'],
      title: 'Hand Made Card Stock Coloring Book Edition',
      price: 'C$18.20',
      details: 'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for exact shipping costs to your location.',
      physical: true
    }
  ];

  function normalize(text) {
    return (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function orderLink(product) {
    const subject = `Order inquiry: ${product.title}`;
    const body = product.physical
      ? `Hello Malinda,\n\nI would like to order: ${product.title}\n\nMy name:\nMy mailing address:\n\nPlease tell me the exact shipping cost and e-Transfer instructions.`
      : `Hello Malinda,\n\nI would like: ${product.title}\n\nMy name:\nMy e-mail address:\n\nPlease send me the ordering/e-Transfer instructions.`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function setCard(card, product) {
    const heading = card.querySelector('h3');
    if (heading) heading.textContent = product.title;

    let price = card.querySelector('.price, .store-price');
    if (!price) {
      price = document.createElement('p');
      price.className = 'price';
      if (heading) heading.insertAdjacentElement('afterend', price);
      else card.appendChild(price);
    }
    price.textContent = product.price;

    let description = card.querySelector('.catalog-details');
    if (!description) {
      description = document.createElement('p');
      description.className = 'catalog-details';
      price.insertAdjacentElement('afterend', description);
    }
    description.textContent = product.details;

    let order = card.querySelector('.store-order');
    if (!order) {
      order = document.createElement('div');
      order.className = 'store-order';
      card.appendChild(order);
    }
    order.innerHTML = '';
    const link = document.createElement('a');
    link.href = orderLink(product);
    link.textContent = product.physical ? 'E-mail Malinda Your Home Address' : 'E-mail Malinda to Order';
    link.style.cssText = 'display:block;width:100%;box-sizing:border-box;border-radius:999px;background:#5b197d;color:#fff;text-decoration:none;text-align:center;font-weight:900;font-size:1rem;padding:13px 12px;box-shadow:0 5px 12px rgba(75,20,111,.22)';
    order.appendChild(link);
  }

  function newCard(product) {
    const card = document.createElement('article');
    card.className = 'store-card';
    const image = document.createElement('img');
    image.src = 'sarah.png';
    image.alt = product.title;
    image.loading = 'lazy';
    image.decoding = 'async';
    card.appendChild(image);
    const heading = document.createElement('h3');
    card.appendChild(heading);
    setCard(card, product);
    return card;
  }

  products.forEach(product => {
    const cards = [...storeGrid.querySelectorAll('.store-card')];
    const existing = cards.find(card => {
      const text = normalize(card.textContent);
      return product.match.some(term => text.includes(normalize(term)));
    });
    if (existing) setCard(existing, product);
    else storeGrid.appendChild(newCard(product));
  });

  // Keep every other existing product exactly where it is: T-shirts, calendar,
  // matching game, cards, and any other current store products remain available.
});

// Performance boost: load only the main hero image immediately.
// All other page images are decoded asynchronously and deferred until needed.
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-book');
  document.querySelectorAll('img').forEach((img) => {
    img.decoding = 'async';
    if (img === hero) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    } else {
      img.loading = 'lazy';
      img.fetchPriority = 'low';
    }
  });

  // Apply the same policy to images added later by the catalogue or other scripts.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        const images = node.matches('img') ? [node] : [...node.querySelectorAll('img')];
        images.forEach((img) => {
          img.decoding = 'async';
          img.loading = 'lazy';
          img.fetchPriority = 'low';
        });
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
