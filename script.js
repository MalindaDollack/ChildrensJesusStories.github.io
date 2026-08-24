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
  setMeta('meta[name="twitter:card"]', {name:'twitter:card'}, 'summary_large_image');
  setMeta('meta[name="twitter:title"]', {name:'twitter:title'}, title);
  setMeta('meta[name="twitter:description"]', {name:'twitter:description'}, description);

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
      {
        '@type': 'WebSite',
        '@id': siteUrl + '#website',
        url: siteUrl,
        name: "Malinda's Story Garden",
        description,
        inLanguage: 'en-CA',
        publisher: {'@id': siteUrl + '#organization'}
      },
      {
        '@type': 'Organization',
        '@id': siteUrl + '#organization',
        name: "Malinda's Story Garden",
        url: siteUrl,
        founder: {'@id': siteUrl + '#author'},
        areaServed: {'@type':'Country', name:'Canada'}
      },
      {
        '@type': 'Person',
        '@id': siteUrl + '#author',
        name: 'Malinda Dollack',
        url: siteUrl + '#about',
        jobTitle: "Christian children's book author",
        worksFor: {'@id': siteUrl + '#organization'}
      }
    ]
  });
  document.head.appendChild(schema);
});
