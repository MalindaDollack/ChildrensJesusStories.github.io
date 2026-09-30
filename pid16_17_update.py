from pathlib import Path

# One-time scoped update for PID16 and PID17 only.
path = Path('index.html')
html = path.read_text(encoding='utf-8')

note = "Please note this Saddle Book looks much better in real life. I am using very old equipment to produce these ads the blurriness and sometimes lack of definition are caused by my camera. I wanted to give you the most accurate representation of the Children's Bible Story Saddle Book Edition, Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story.  JESUS LOVES YOU !"

requested = [
    'saddle book cover measured vertically',
    'saddle book cover measured horizontally',
    'saddle book copyrights and dedication measured horizontally',
    'saddle book frog and snuggled measured horizontally',
    'saddle book mailing',
]

available = []
missing = []
for name in requested:
    file = Path(name + '.jpg')
    if file.exists():
        available.append(name)
    else:
        missing.append(name)

figures = []
for name in available:
    figures.append(
        '<figure style="margin:0;text-align:center;">'
        f'<img loading="lazy" decoding="async" src="{name}.jpg?v=1" alt="{name}" style="display:block;width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;margin:0 auto;">'
        f'<figcaption style="margin-top:6px;color:#4b146f;font-weight:800;line-height:1.25;">{name}</figcaption>'
        '</figure>'
    )

detail_insert = (
    f'<p><strong>{note}</strong></p>\n'
    '<div class="pid-saddle-photo-gallery" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:18px 0 22px;">\n'
    + '\n'.join(figures)
    + '\n</div>\n'
)

updates = {
    'PID16': {
        'old_gallery': '<div class="product-gallery collapsible-gallery"><img loading="lazy" decoding="async" src="web-images/website picture sb28cover.webp?v=1" alt="Premium Saddle Book"><div class="extra-product-pictures" hidden><img loading="lazy" decoding="async" src="web-images/website picture sbback.webp?v=1" alt="Premium Saddle Book"><img loading="lazy" decoding="async" src="web-images/website picture sb1&2.webp?v=1" alt="Premium Saddle Book"><img loading="lazy" decoding="async" src="web-images/website picture sb3&4.webp?v=1" alt="Premium Saddle Book"></div></div>',
        'new_gallery': '<div class="product-gallery collapsible-gallery"><img loading="lazy" decoding="async" src="saddle book main picture.jpg?v=1" alt="Premium Saddle Book"></div>',
    },
    'PID17': {
        'old_gallery': '<div class="product-gallery collapsible-gallery"><img loading="lazy" decoding="async" src="web-images/website picture sb20cover.webp?v=1" alt="Regular Saddle Book"><div class="extra-product-pictures" hidden><img loading="lazy" decoding="async" src="web-images/website picture sbback.webp?v=1" alt="Regular Saddle Book"><img loading="lazy" decoding="async" src="web-images/website picture sb1&2.webp?v=1" alt="Regular Saddle Book"><img loading="lazy" decoding="async" src="web-images/website picture sb3&4.webp?v=1" alt="Regular Saddle Book"></div></div>',
        'new_gallery': '<div class="product-gallery collapsible-gallery"><img loading="lazy" decoding="async" src="saddle book main picture.jpg?v=1" alt="Regular Saddle Book"></div>',
    },
}

for pid, u in updates.items():
    marker = f'id="store-{pid}"'
    start = html.find('<article', html.find(marker) - 100)
    if start < 0:
        raise SystemExit(f'{pid} article start not found; no changes written.')
    end = html.find('</article>', start)
    if end < 0:
        raise SystemExit(f'{pid} article end not found; no changes written.')
    end += len('</article>')
    block = html[start:end]

    if u['old_gallery'] not in block:
        raise SystemExit(f'{pid} old gallery not found exactly; no changes written.')
    block2 = block.replace(u['old_gallery'], u['new_gallery'], 1)

    details_marker = '<p class="product-available">AVAILABLE</p><div class="store-details" hidden>\n'
    if details_marker not in block2:
        raise SystemExit(f'{pid} details marker not found; no changes written.')
    block2 = block2.replace(details_marker, details_marker + detail_insert, 1)

    html = html[:start] + block2 + html[end:]

path.write_text(html, encoding='utf-8')
print('Updated PID16 and PID17 main images, note, and supporting gallery without changing existing descriptions.')
if missing:
    print('Missing requested image file(s), skipped: ' + ', '.join(missing))
