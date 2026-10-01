from pathlib import Path
import re

# trigger
INDEX = Path("index.html")
text = INDEX.read_text(encoding="utf-8")

NOTE = "Please note these Book Marks looks much better in real life. I am using very old equipment to produce these ads the blurriness and sometimes lack of definition are caused by my camera. I wanted to give you the most accurate representation of the Children's Bible Story Book Marks, Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story.  JESUS LOVES YOU !"

FIGURE_STYLE = "margin:0;text-align:center;"
IMG_STYLE = "display:block;width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;margin:0 auto;"
CAPTION_STYLE = "margin-top:6px;color:#4b146f;font-weight:800;line-height:1.25;"
GALLERY_STYLE = "display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:18px 0 22px;"


def figure(src, caption):
    return (
        f'<figure style="{FIGURE_STYLE}"><img loading="lazy" decoding="async" '
        f'src="{src}?v=1" alt="{caption}" style="{IMG_STYLE}">'
        f'<figcaption style="{CAPTION_STYLE}">{caption}</figcaption></figure>'
    )


def update_card(pid, main_src, supports):
    global text
    card_re = re.compile(rf'<article class="store-card" id="store-{pid}">.*?</article>', re.S)
    matches = list(card_re.finditer(text))
    if len(matches) != 1:
        raise SystemExit(f"Expected exactly one {pid} card, found {len(matches)}")

    block = matches[0].group(0)
    gallery_id = f'{pid.lower()}-bookmark-photo-gallery'
    if gallery_id in block:
        print(f"{pid} already updated; no duplicate insertion")
        return

    main_re = re.compile(rf'(<article class="store-card" id="store-{pid}">\s*<img\b[^>]*?\bsrc=")[^"]+("[^>]*>)', re.S)
    block, n = main_re.subn(lambda m: m.group(1) + main_src + '?v=1' + m.group(2), block, count=1)
    if n != 1:
        raise SystemExit(f"Could not replace main image for {pid}")

    marker = '<p class="product-available">AVAILABLE</p><div class="store-details" hidden>'
    if block.count(marker) != 1:
        raise SystemExit(f"Expected one details marker for {pid}, found {block.count(marker)}")

    gallery = '\n'.join(figure(src, caption) for src, caption in supports)
    injection = (
        f'\n<p><strong>{NOTE}</strong></p>\n'
        f'<div class="{gallery_id}" style="{GALLERY_STYLE}">\n'
        f'{gallery}\n'
        f'</div>'
    )
    block = block.replace(marker, marker + injection, 1)

    start, end = matches[0].span()
    text = text[:start] + block + text[end:]
    print(f"Updated {pid}")


update_card(
    "PID2",
    "2 book marks main.jpg",
    [
        ("1 book mark close up.jpg", "1 book mark close up"),
        ("2 book marks measured vertically.jpg", "2 book marks measured vertically"),
        ("2 book marks measred horizontally mailing.jpg", "2 book marks measured horizontally"),
        ("2 book marks measred horizontally mailing.jpg", "2 book marks mailing"),
    ],
)

update_card(
    "PID3",
    "5 book marks main.jpg",
    [
        ("1 book mark close up.jpg", "1 book mark close up"),
        ("1 book mark envelope ruler vertical.jpg", "1 book marks measured vertically"),
        ("5 book marks measured horizontally.jpg", "5 book marks measured horizontally"),
        ("5 book marks mailing.jpg", "5 book marks mailing"),
    ],
)

INDEX.write_text(text, encoding="utf-8")
