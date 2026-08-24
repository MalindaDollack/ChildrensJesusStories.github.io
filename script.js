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

  // Image SEO: give important images descriptive, natural alt text without changing the artwork or layout.
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
    img.dataset.seoAltDone = '1';
  };

  const improveAllImages = (root = document) => root.querySelectorAll('img').forEach(improveImageAlt);
  improveAllImages();

  // Some book cards and galleries are created after page load; optimize those images too.
  const imageObserver = new MutationObserver(mutations => {
    mutations.forEach(m => m.addedNodes.forEach(node => {
      if (!(node instanceof Element)) return;
      if (node.matches('img')) improveImageAlt(node);
      improveAllImages(node);
    }));
  });
  imageObserver.observe(document.body, {childList:true, subtree:true});
});
