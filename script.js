// Load English-only website enhancements.
document.write('<script src="script-enhancements.js?v=1"><\/script>');

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = 'en-CA';
  document.title = "Children's Bible Stories & Christian Books for Kids | Malinda's Story Garden";

  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.content = "Discover children's Bible stories, Christian books and Bible activities for kids at Malinda's Story Garden, featuring Sarah the Baby Sheep and the Christmas story of Jesus's birth.";

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
});
