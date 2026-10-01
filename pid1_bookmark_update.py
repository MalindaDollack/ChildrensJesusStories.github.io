from pathlib import Path

html_path = Path("index.html")
required_images = [
    "1 book mark alone.jpg",
    "1 book mark close up.jpg",
    "1 book mark envelope ruler vertical.jpg",
    "1 book mark ruler horizontal.jpg",
    "1 book mark envelope ruler horizontal.jpg",
    "1 book mark envelope.jpg",
]

missing = [name for name in required_images if not Path(name).exists()]
if missing:
    raise SystemExit("Missing requested PID1 image file(s): " + ", ".join(missing))

html = html_path.read_text(encoding="utf-8")
marker = 'id="store-PID1"'
marker_pos = html.find(marker)
if marker_pos < 0:
    raise SystemExit("PID1 card not found; no changes made.")
start = html.rfind("<article", 0, marker_pos)
end = html.find("</article>", marker_pos)
if start < 0 or end < 0:
    raise SystemExit("PID1 article boundaries not found; no changes made.")
end += len("</article>")
block = html[start:end]

old_main = '<img loading="lazy" decoding="async" src="1%20bm%20corrected.png?v=3" alt="1 Hand-Made JESUS LOVES YOU ! Laminated Book Mark: Sarah the Baby Sheep: My Shepherd, Jesus\'s Birth, The Christmas Story Edition">'
new_main = '<img loading="lazy" decoding="async" src="1 book mark alone.jpg?v=1" alt="1 Hand-Made JESUS LOVES YOU ! Laminated Book Mark: Sarah the Baby Sheep: My Shepherd, Jesus\'s Birth, The Christmas Story Edition" style="width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;">'

if block.count(old_main) != 1:
    raise SystemExit("Expected PID1 old main picture was not found exactly once; no changes made.")

note_text = "Please note this Book Mark looks much better in real life. I am using very old equipment to produce these ads the blurriness and sometimes lack of definition are caused by my camera. I wanted to give you the most accurate representation of the Children's Bible Story Book Mark, Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story.  JESUS LOVES YOU !"
note = f'<p><strong>{note_text}</strong></p>'
if note_text in block:
    raise SystemExit("PID1 already contains the new note; no changes made.")

names = [
    "1 book mark close up",
    "1 book mark envelope ruler vertical",
    "1 book mark ruler horizontal",
    "1 book mark envelope ruler horizontal",
    "1 book mark envelope",
]
figures = []
for name in names:
    figures.append(
        f'<figure style="margin:0;text-align:center;">'
        f'<img loading="lazy" decoding="async" src="{name}.jpg?v=1" alt="{name}" style="display:block;width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;margin:0 auto;">'
        f'<figcaption style="margin-top:6px;color:#4b146f;font-weight:800;line-height:1.25;">{name}</figcaption>'
        f'</figure>'
    )
gallery = '<div class="pid1-bookmark-photo-gallery" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:18px 0 22px;">\n' + "\n".join(figures) + '\n</div>'

opening = '<p class="product-available">AVAILABLE</p><div class="store-details" hidden>\n'
if block.count(opening) != 1:
    raise SystemExit("PID1 store-details opening was not found exactly once; no changes made.")

new_block = block.replace(old_main, new_main, 1)
new_block = new_block.replace(opening, opening + note + "\n" + gallery + "\n", 1)

# Safety checks: preserve the current PID1 title, price, existing description, and order form.
checks = [
    '<h3>PID1 — 1 Hand-Made JESUS LOVES YOU ! Laminated Book Mark: Sarah the Baby Sheep: My Shepherd, Jesus\'s Birth, The Christmas Story Edition</h3>',
    '<p class="price">C$7.00</p>',
    '<p>Size: 6" Tall x 2" Wide. Allow 24 hours processing time. Shipped to the buyer\'s location once processed by Malinda and the RBC Interac Request Money payment is received. Send your Shipping Address with product name and number to berachahdirector@gmail.com. For Canadian orders, Malinda will send an RBC Interac Request Money notice to the e-mail address provided in the order. Item\'s listed price includes shipping within Canada using Canada Post Regular Letter Mail with no tracking available. Each Item purchased comes with an email confirmation of the $1.00 donation made to Sameritain\'s Purse. This Property has been Copyrighted through Legal Channels in Canada and can only be used for personal use no commercial use. All Items Available World Wide. International Customers contact Malinda prior to purchase for cost to your Individual Locations due to differences in Shipping Costs. This story and related items have been 100% produced by Malinda Dollack with Malinda Dollack directing, guiding and editing Chat GPT for Art Work Alone.</p>',
    'data-email-form="m14"',
]
for check in checks:
    if check not in block or check not in new_block:
        raise SystemExit("PID1 safety check failed; no changes made.")

html = html[:start] + new_block + html[end:]
html_path.write_text(html, encoding="utf-8")
print("Updated PID1 bookmark pictures and note only; preserved existing PID1 description.")
