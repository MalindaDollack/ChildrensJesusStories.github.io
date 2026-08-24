// Load the existing website enhancements, then keep the live site English-only.
document.write('<script src="script-bilingual-legacy.js?v=1"><\/script>');

document.addEventListener('DOMContentLoaded', () => {
  // English-only page and Google SEO settings.
  document.documentElement.lang = 'en-CA';
  document.title = "Children's Bible Stories & Christian Books for Kids | Malinda's Story Garden";

  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.content = "Discover children's Bible stories, Christian books and Bible activities for kids at Malinda's Story Garden, featuring Sarah the Baby Sheep and the Christmas story of Jesus's birth.";

  // Remove French alternate-locale SEO left by the previous bilingual setup.
  document.querySelectorAll('meta[property="og:locale:alternate"]').forEach(el => el.remove());

  const setOg = (property, content) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.content = content;
  };
  setOg('og:locale', 'en_CA');
  setOg('og:type', 'website');
  setOg('og:site_name', "Malinda's Story Garden");
  setOg('og:title', "Children's Bible Stories & Christian Books for Kids | Malinda's Story Garden");
  setOg('og:description', "Children's Bible stories, Christian books and Bible activities for kids from Malinda's Story Garden.");
  setOg('og:url', 'https://bigblueeyeschildrensbiblestories.com/');

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = 'https://bigblueeyeschildrensbiblestories.com/';

  // Remove bilingual schema from the old setup and replace it with English-only schema.
  document.getElementById('bilingual-canada-schema')?.remove();
  if (!document.getElementById('english-site-schema')) {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'english-site-schema';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://bigblueeyeschildrensbiblestories.com/#website',
          url: 'https://bigblueeyeschildrensbiblestories.com/',
          name: "Malinda's Story Garden",
          description: "Children's Bible stories, Christian books and Bible activities for kids.",
          inLanguage: 'en-CA'
        },
        {
          '@type': 'Organization',
          '@id': 'https://bigblueeyeschildrensbiblestories.com/#organization',
          name: "Malinda's Story Garden",
          url: 'https://bigblueeyeschildrensbiblestories.com/',
          areaServed: {'@type':'Country', name:'Canada'}
        }
      ]
    });
    document.head.appendChild(schema);
  }

  // Remove every French translation and every French-coming-soon notice from the live page.
  const removeFrench = root => {
    if (!(root instanceof Element || root instanceof Document)) return;
    root.querySelectorAll?.('.fr-ca, .fr-ca-inline, .fr-version-coming-soon, #fr-ca-style').forEach(el => el.remove());
  };
  removeFrench(document);

  // The old enhancement file can add translated text when cards are created later,
  // so immediately remove any such additions before they remain on the page.
  const englishOnlyObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (!(node instanceof Element)) return;
      if (node.matches('.fr-ca, .fr-ca-inline, .fr-version-coming-soon, #fr-ca-style')) node.remove();
      else removeFrench(node);
    }));
  });
  englishOnlyObserver.observe(document.body, {childList:true, subtree:true});
});
