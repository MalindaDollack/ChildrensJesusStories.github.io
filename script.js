// Wrapper: preserve the existing website script, then add Canadian bilingual SEO and product notices.
document.write('<script src="script-bilingual-legacy.js?v=1"><\/script>');

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = 'en-CA';
  document.title = "English & Canadian French Children's Bible Stories | Malinda's Story Garden Canada";

  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.content = "Canadian children's Bible stories, Christian books and Bible activities from Malinda's Story Garden. English products are available now; Canadian French versions are coming soon. Site content is presented in English and Canadian French.";

  const ensureMeta = (property, content) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.content = content;
  };
  ensureMeta('og:locale','en_CA');
  ensureMeta('og:locale:alternate','fr_CA');
  ensureMeta('og:type','website');
  ensureMeta('og:site_name',"Malinda's Story Garden");
  ensureMeta('og:title',"English & Canadian French Children's Bible Stories | Malinda's Story Garden Canada");
  ensureMeta('og:description',"Canadian children's Bible stories and Christian products. English versions are available now; Canadian French product versions are coming soon.");
  ensureMeta('og:url','https://bigblueeyeschildrensbiblestories.com/');

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = 'https://bigblueeyeschildrensbiblestories.com/';

  if (!document.getElementById('bilingual-canada-schema')) {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'bilingual-canada-schema';
    schema.textContent = JSON.stringify({
      '@context':'https://schema.org',
      '@graph':[
        {
          '@type':'WebSite',
          '@id':'https://bigblueeyeschildrensbiblestories.com/#website',
          url:'https://bigblueeyeschildrensbiblestories.com/',
          name:"Malinda's Story Garden",
          description:"Canadian children's Bible stories and Christian products in English, with Canadian French versions coming soon.",
          inLanguage:['en-CA','fr-CA']
        },
        {
          '@type':'Organization',
          '@id':'https://bigblueeyeschildrensbiblestories.com/#organization',
          name:"Malinda's Story Garden",
          url:'https://bigblueeyeschildrensbiblestories.com/',
          areaServed:{'@type':'Country',name:'Canada'}
        }
      ]
    });
    document.head.appendChild(schema);
  }

  document.querySelectorAll('.fr-ca, .fr-ca-inline').forEach(el => el.setAttribute('lang','fr-CA'));

  const addFrenchComingSoon = card => {
    if (!card || card.querySelector('.fr-version-coming-soon')) return;
    const note = document.createElement('div');
    note.className = 'fr-version-coming-soon';
    note.setAttribute('role','note');
    note.style.cssText = 'margin:10px 0 8px;padding:9px 10px;border-radius:11px;background:#f8efff;border:2px solid #d9b3ee;color:#4b146f;text-align:center;font-weight:900;line-height:1.3';
    note.innerHTML = '<span>Canadian French Versions Coming Soon !</span><span lang="fr-CA" class="fr-ca" style="margin-top:4px">Versions canadiennes-françaises à venir !</span>';
    const order = card.querySelector('.store-order, .book-actions');
    if (order) order.insertAdjacentElement('beforebegin', note);
    else card.appendChild(note);
  };

  document.querySelectorAll('.store-card, .book-card').forEach(addFrenchComingSoon);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (!(node instanceof Element)) return;
      if (node.matches('.store-card, .book-card')) addFrenchComingSoon(node);
      node.querySelectorAll?.('.store-card, .book-card').forEach(addFrenchComingSoon);
      node.querySelectorAll?.('.fr-ca, .fr-ca-inline').forEach(el => el.setAttribute('lang','fr-CA'));
    }));
  });
  observer.observe(document.body, {childList:true, subtree:true});
});
