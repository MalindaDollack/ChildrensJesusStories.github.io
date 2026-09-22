// Stable website enhancements loader - August 31, 2026.
document.write('<script src="script-enhancements.js?v=5"><\/script>');
document.write('<script src="game-win-celebration.js?v=6"><\/script>');

document.addEventListener('DOMContentLoaded', () => {
  const WEBSITE_EMAIL = 'berachahdirector@gmail.com';
  const OLD_EMAIL = 'dollackj316@gmail.com';

  // Change every visible old email address and every mailto link across the website.
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.href = link.href.replace(/dollackj316@gmail\.com/gi, WEBSITE_EMAIL);
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const emailTextNodes = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue && walker.currentNode.nodeValue.toLowerCase().includes(OLD_EMAIL)) emailTextNodes.push(walker.currentNode);
  }
  emailTextNodes.forEach(node => { node.nodeValue = node.nodeValue.replace(/dollackj316@gmail\.com/gi, WEBSITE_EMAIL); });

  // Keep below-the-fold pictures from slowing initial page load.
  document.querySelectorAll('img:not(.hero-book):not(.welcome-guide img)').forEach(img => {
    if (!img.hasAttribute('loading')) img.loading = 'lazy';
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
  });

  // YouTube channel link and website section.
  const youtubeUrl = 'https://www.youtube.com/@malindadollack777';
  const nav = document.querySelector('header nav');
  if (nav && !nav.querySelector('a[data-youtube-link]')) {
    const youtubeNav = document.createElement('a');
    youtubeNav.href = '#youtube';
    youtubeNav.textContent = 'YouTube';
    youtubeNav.dataset.youtubeLink = 'true';
    const communityNav = [...nav.querySelectorAll('a')].find(a => a.getAttribute('href') === '#community');
    if (communityNav) nav.insertBefore(youtubeNav, communityNav);
    else nav.appendChild(youtubeNav);
  }

  if (!document.getElementById('youtube')) {
    const youtubeSection = document.createElement('section');
    youtubeSection.id = 'youtube';
    youtubeSection.setAttribute('aria-label', 'Malinda Dollack YouTube channel');
    youtubeSection.style.cssText = 'padding:44px 18px;text-align:center;background:linear-gradient(180deg,#fff7fc,#f8efff);border-top:4px solid #ead5f5;border-bottom:4px solid #ead5f5';
    youtubeSection.innerHTML = `
      <div style="max-width:900px;margin:0 auto">
        <p style="font-weight:900;color:#a00078;margin:0 0 6px">▶ WATCH ON YOUTUBE</p>
        <h2 style="font-family:'Baloo 2',sans-serif;color:#4b146f;font-size:clamp(2rem,5vw,3rem);margin:0 0 10px">Malinda’s Story Garden Videos</h2>
        <p style="font-size:1.08rem;font-weight:700;color:#33243a;max-width:720px;margin:0 auto 20px">Visit Malinda’s YouTube channel to watch the 3 videos featuring Sarah the Baby Sheep and faith-filled children’s stories.</p>
        <a href="${youtubeUrl}" target="_blank" rel="noopener" style="display:inline-block;padding:14px 24px;border-radius:999px;background:#c00;color:#fff;text-decoration:none;font-weight:900;font-size:1.08rem;box-shadow:0 5px 14px rgba(0,0,0,.18)">▶ Watch the 3 Videos on YouTube</a>
      </div>`;
    const community = document.getElementById('community');
    const contact = document.getElementById('contact');
    const main = document.querySelector('main');
    if (community && community.parentNode) community.parentNode.insertBefore(youtubeSection, community);
    else if (contact && contact.parentNode) contact.parentNode.insertBefore(youtubeSection, contact);
    else if (main) main.appendChild(youtubeSection);
  }

  // Store products, pictures, prices, previews, and order subjects are now defined directly in index.html.
  // Do not rewrite them here; this prevents older catalog rules from overriding the current website.
});
