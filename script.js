// Load English-only website enhancements.
document.write('<script src="script-enhancements.js?v=1"><\/script>');

document.addEventListener('DOMContentLoaded', () => {
  const siteUrl = 'https://bigblueeyeschildrensbiblestories.com/';
  const title = "Children's Bible Stories & Christian Books for Kids | Malinda's Story Garden";
  const description = "Discover colourful children's Bible stories and Christian books for kids from Malinda's Story Garden, featuring adorable animal friends, Bible adventures and the love of Jesus.";

  document.documentElement.lang = 'en-CA';
  document.title = title;

  const setMeta = (selector, attrs, content) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('meta[name="description"]', {name:'description'}, description);
  setMeta('meta[name="robots"]', {name:'robots'}, 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('meta[name="author"]', {name:'author'}, 'Malinda Dollack');
  document.querySelectorAll('meta[property="og:locale:alternate"]').forEach(el => el.remove());
  setMeta('meta[property="og:locale"]', {property:'og:locale'}, 'en_CA');
  setMeta('meta[property="og:type"]', {property:'og:type'}, 'website');
  setMeta('meta[property="og:site_name"]', {property:'og:site_name'}, "Malinda's Story Garden");
  setMeta('meta[property="og:title"]', {property:'og:title'}, title);
  setMeta('meta[property="og:description"]', {property:'og:description'}, description);
  setMeta('meta[property="og:url"]', {property:'og:url'}, siteUrl);
  setMeta('meta[property="og:image"]', {property:'og:image'}, siteUrl + 'sarah.png');
  setMeta('meta[property="og:image:alt"]', {property:'og:image:alt'}, "Sarah the Baby Sheep children's Bible story book cover from Malinda's Story Garden");
  setMeta('meta[name="twitter:card"]', {name:'twitter:card'}, 'summary_large_image');
  setMeta('meta[name="twitter:title"]', {name:'twitter:title'}, title);
  setMeta('meta[name="twitter:description"]', {name:'twitter:description'}, description);
  setMeta('meta[name="twitter:image"]', {name:'twitter:image'}, siteUrl + 'sarah.png');
  setMeta('meta[name="twitter:image:alt"]', {name:'twitter:image:alt'}, "Sarah the Baby Sheep children's Bible story book cover");

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = siteUrl;

  document.getElementById('bilingual-canada-schema')?.remove();
  document.getElementById('english-site-schema')?.remove();
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.id = 'english-site-schema';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {'@type':'WebSite','@id':siteUrl+'#website',url:siteUrl,name:"Malinda's Story Garden",description,inLanguage:'en-CA',publisher:{'@id':siteUrl+'#organization'}},
      {'@type':'Organization','@id':siteUrl+'#organization',name:"Malinda's Story Garden",url:siteUrl,founder:{'@id':siteUrl+'#author'},areaServed:{'@type':'Country',name:'Canada'}},
      {'@type':'Person','@id':siteUrl+'#author',name:'Malinda Dollack',url:siteUrl+'#about',jobTitle:"Christian children's book author",worksFor:{'@id':siteUrl+'#organization'}}
    ]
  });
  document.head.appendChild(schema);

  const h1s = [...document.querySelectorAll('h1')];
  h1s.slice(1).forEach(h => {
    const replacement = document.createElement('h2');
    replacement.innerHTML = h.innerHTML;
    replacement.className = h.className;
    replacement.id = h.id;
    replacement.style.cssText = h.style.cssText;
    h.replaceWith(replacement);
  });

  const setHeading = (selector, text) => {
    const el = document.querySelector(selector);
    if (el && el.textContent.trim() !== text) el.textContent = text;
  };
  setHeading('#books .section-title h2', "Children's Bible Stories & Christian Books for Kids");
  setHeading('#store .store-intro h2', "Malinda's Story Garden Christian Books, Bible Activities & Gifts");

  const addSeoIntro = (sectionSelector, id, text, afterSelector) => {
    const section = document.querySelector(sectionSelector);
    if (!section || document.getElementById(id)) return;
    const p = document.createElement('p');
    p.id = id;
    p.textContent = text;
    p.style.cssText = 'max-width:850px;margin:8px auto 20px;text-align:center;line-height:1.55;font-weight:700;color:#4b146f;padding:0 14px';
    const anchor = afterSelector ? section.querySelector(afterSelector) : null;
    if (anchor) anchor.insertAdjacentElement('afterend', p);
    else section.insertAdjacentElement('afterbegin', p);
  };
  addSeoIntro('#books', 'books-seo-intro', "Explore faith-filled children's Bible stories and Christian books for kids featuring Sarah the Baby Sheep and adorable animal friends who help young readers discover Bible adventures, kindness, courage, hope and the love of Jesus.", '.section-title');
  addSeoIntro('#store', 'store-seo-intro', "Shop children's Christian books, Bible story activities, bookmarks and gifts from Malinda's Story Garden, created to make Bible learning joyful and memorable for children and families.", '.store-intro');

  const sectionNames = {home:'Home', books:"Children's Bible Story Books", store:'Christian Books and Gifts Store', bookmarks:'Bible Story Bookmarks', about:'About Christian Author Malinda Dollack', community:'Story Garden Community', contact:'Contact Malinda Dollack'};
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const id = a.getAttribute('href').slice(1);
    if (!id || !document.getElementById(id)) return;
    if (!a.getAttribute('aria-label') && sectionNames[id]) a.setAttribute('aria-label', sectionNames[id]);
  });

  if (!document.getElementById('seo-quick-links')) {
    const target = document.querySelector('#books');
    if (target) {
      const nav = document.createElement('nav');
      nav.id = 'seo-quick-links';
      nav.setAttribute('aria-label', 'Explore Malinda’s Story Garden');
      nav.style.cssText = 'max-width:900px;margin:0 auto 18px;text-align:center;padding:0 12px;line-height:1.8';
      nav.innerHTML = '<a href="#books">Explore Children’s Bible Story Books</a> &nbsp;•&nbsp; <a href="#store">Shop Christian Books & Gifts</a> &nbsp;•&nbsp; <a href="#about">Meet Author Malinda Dollack</a> &nbsp;•&nbsp; <a href="#contact">Contact Malinda</a>';
      target.insertAdjacentElement('afterbegin', nav);
    }
  }

  const improveImageAlt = (img) => {
    if (!img || img.dataset.seoAltDone === '1') return;
    const card = img.closest('.store-card, .book-card, .preview-page');
    const heading = card?.querySelector('h2,h3,b,figcaption')?.textContent?.replace(/\s+/g,' ').trim();
    const src = (img.getAttribute('src') || '').toLowerCase();

    if (img.classList.contains('hero-book')) img.alt = "Sarah the Baby Sheep children's Bible story book cover about Jesus's birth";
    else if (src.includes('sarah-character')) img.alt = "Sarah the Baby Sheep, a Christian children's Bible story character with big blue eyes";
    else if (src.includes('about-malinda')) img.alt = "Malinda Dollack, Christian children's book author of Malinda's Story Garden";
    else if (card?.classList.contains('store-card') && heading) img.alt = heading + " from Malinda's Story Garden";
    else if (card?.classList.contains('book-card') && heading) img.alt = heading + " children's Bible story book cover by Malinda Dollack";
    else if (!img.alt?.trim() && heading) img.alt = heading + " from Malinda's Story Garden";

    if (!img.classList.contains('hero-book') && !img.closest('.welcome-guide') && !img.hasAttribute('loading')) img.loading = 'lazy';
    if (!img.classList.contains('hero-book') && !img.hasAttribute('decoding')) img.decoding = 'async';
    img.dataset.seoAltDone = '1';
  };

  const improveAllImages = (root = document) => root.querySelectorAll('img').forEach(improveImageAlt);
  improveAllImages();

  document.querySelectorAll('iframe:not([loading])').forEach(frame => frame.loading = 'lazy');

  // The green Photo Book buttons in Sarah's 12-book area and preview should take visitors to the separate Photo Book product listing, not open email directly.
  const linkPhotoBookButton = (button) => {
    if (!button) return;
    button.onclick = () => {
      const product = document.getElementById('staples-book-card');
      if (product) product.scrollIntoView({behavior:'smooth', block:'start'});
    };
  };
  linkPhotoBookButton(document.querySelector('#bookGrid .book-card:first-child .softcover-coming'));
  linkPhotoBookButton(document.querySelector('#sarahPreviewModal .preview-buy button'));

  const imageObserver = new MutationObserver(mutations => {
    mutations.forEach(m => m.addedNodes.forEach(node => {
      if (!(node instanceof Element)) return;
      if (node.matches('img')) improveImageAlt(node);
      improveAllImages(node);
      if (node.matches('iframe') && !node.hasAttribute('loading')) node.loading = 'lazy';
      node.querySelectorAll?.('iframe:not([loading])').forEach(frame => frame.loading = 'lazy');
    }));
  });
  imageObserver.observe(document.body, {childList:true, subtree:true});
});

// August 27, 2026 store product picture and price updates.
document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('#store .store-card')];
  const byHeading = text => cards.find(card => card.querySelector('h3')?.textContent.trim() === text);

  const oneBookmark = byHeading('One Hand-made Laminated Jesus Loves You! Bookmark');
  if (oneBookmark) {
    const img = oneBookmark.querySelector('img');
    if (img) { img.src = 'bookmark-1.jpg'; img.alt = 'One Hand-made Laminated Jesus Loves You! Bookmark'; }
    const price = oneBookmark.querySelector('.price');
    if (price) price.textContent = 'C$6.00';
  }

  const bookmarkPack = byHeading('Four Hand-made Laminated Jesus Loves You! Bookmarks') || byHeading('Three Hand-made Laminated Jesus Loves You! Bookmarks');
  if (bookmarkPack) {
    const img = bookmarkPack.querySelector('img');
    if (img) { img.src = 'bookmarks-3.jpg'; img.alt = 'Three Hand-made Laminated Jesus Loves You! Bookmarks'; }
    const heading = bookmarkPack.querySelector('h3');
    if (heading) heading.textContent = 'Three Hand-made Laminated Jesus Loves You! Bookmarks';
    const price = bookmarkPack.querySelector('.price');
    if (price) price.textContent = 'C$8.00';
    const orderLink = bookmarkPack.querySelector('.store-order a');
    if (orderLink) {
      orderLink.href = orderLink.href
        .replaceAll('Four%20Hand-made%20Laminated%20Jesus%20Loves%20You%21%20Bookmarks','Three%20Hand-made%20Laminated%20Jesus%20Loves%20You%21%20Bookmarks')
        .replaceAll('Four+Hand-made+Laminated+Jesus+Loves+You%21+Bookmarks','Three+Hand-made+Laminated+Jesus+Loves+You%21+Bookmarks');
    }
  }

  const stickerCard = byHeading('Hand-made Jesus Loves You! Stickers');
  if (stickerCard) {
    const makeStickerCard = (quantity, image) => {
      const card = stickerCard.cloneNode(true);
      const img = card.querySelector('img');
      const heading = card.querySelector('h3');
      const price = card.querySelector('.price');
      const desc = card.querySelectorAll('p:not(.price)')[0];
      const orderLink = card.querySelector('.store-order a');
      if (img) { img.src = image; img.alt = `${quantity} Hand-made Jesus Loves You! Stickers`; }
      if (heading) heading.textContent = `${quantity} Hand-made Jesus Loves You! Stickers`;
      if (price) price.textContent = 'C$7.00';
      if (desc) desc.textContent = `${quantity} Jesus Loves You! stickers. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for the exact shipping cost to your location.`;
      if (orderLink) {
        const product = `${quantity} Hand-made Jesus Loves You! Stickers`;
        orderLink.href = `mailto:dollackj316@gmail.com?subject=${encodeURIComponent('Order inquiry: ' + product)}&body=${encodeURIComponent('Hello Malinda,\n\nI would like to order: ' + product + '\n\nMy name:\nMy mailing address:\n\nPlease tell me the exact shipping cost and e-Transfer instructions.\n')}`;
      }
      return card;
    };
    const four = makeStickerCard(4, 'stickers-4.jpg');
    const twenty = makeStickerCard(20, 'stickers-20.jpg');
    stickerCard.replaceWith(four, twenty);
  }
});
