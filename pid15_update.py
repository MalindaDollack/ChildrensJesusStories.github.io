from pathlib import Path
import re

path = Path("index.html")
html = path.read_text(encoding="utf-8")

photo_names = [
    "game card package no measurements mailing",
    "game card package measure vertical",
    "game card package measure horizontally",
    "game card Title Page",
    "game card Dedication",
    "game card copyrights",
    "frog",
    "game card Afraid",
    "game card single angel",
    "game card lots of angels",
    "game card Walking to Bethlehem",
    "game card Nativity",
    "game card Jesus holding sheep",
    "game card Kids Manger",
    "game card The Birth of Jesus Scripture",
    "game card Jesus Loves You Sheep",
    "game card Jesus Loves You Sheep 2",
    "game card Jesus Loves You Sheep 3",
    "game left table 6",
    "game left inside left table 5",
    "game left inside table 4",
    "game beside rt section further left table 3",
    "game beside rt section table 2",
    "game rt section table 1",
    "game furthest left ruler 7",
    "game furthest left ruler 8",
    "game furthest left ruler 9",
    "game furthest left ruler 10",
    "game furthest left ruler 11",
]

figures = []
for name in photo_names:
    figures.append(
        f'''<figure style="margin:0;padding:10px;border:2px solid #ead5f5;border-radius:12px;background:#fff;text-align:center;">
<img loading="lazy" decoding="async" src="{name}.jpg?v=1" alt="{name}" style="display:block;width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;margin:0 auto;">
<figcaption style="margin-top:8px;color:#4b146f;font-weight:800;line-height:1.25;word-break:break-word;">{name}</figcaption>
</figure>'''
    )

gallery = '\n'.join(figures)

note = "Please note this Game looks much better in real life. I am using very old equipment to produce these ads the blurriness and sometimes lack of definition are caused by my camera. I wanted to give you the most accurate representation of this Game and when spread out it covers most of a table. I have included photos with rulers. It contains Two sets of thirteen Laminated Tiles of different scenes from the Children's Bible Story Book, Sarah the Baby Sheep: My Shepherd, Jesus's Birth. The Christmas Story. All Laminated Tiles are back sided with Sarah the Baby Sheep: JESUS LOVES YOU !. Included are Two sets of three extra Laminated Tiles that are double sided with Sarah the Baby Sheep: JESUS LOVES YOU !! for a total of Thirty Laminated Tiles to match. JESUS LOVES YOU !"

title = "PID15 — Hand Made Laminated Ribbon Tied Matching JESUS LOVES YOU ! Game Laminated Tiles: Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story Edition"
alt = "Hand Made Laminated Ribbon Tied Matching JESUS LOVES YOU ! Game Laminated Tiles: Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story Edition"

existing_description = "Size - 30 Laminated Tiles - 2 Laminated Tiles of each picture from the book Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story. Each Laminated Tile measures 5.5\" Tall x 4.25\" Wide. Allow 3 days for processing time - shipped to the buyer's location once processed by Malinda and the RBC Interac Request Money payment is received. Send your Shipping Address with product name and number to berachahdirector@gmail.com. For Canadian orders, Malinda will send an RBC Interac Request Money notice to the e-mail address provided in the order. Item's listed price includes shipping within Canada using Canada Post Regular Letter Mail with no tracking available. Each Item purchased comes with an email confirmation of the $1.00 donation made to Sameritain's Purse. This Property has been Copyrighted through Legal Channels in Canada and can only be used for personal use no commercial use. But I do give Church Goups the right to perform this book in whole or in part as a Christmas Performance. All Items Available World Wide. International Customers contact Malinda prior to purchase for cost to your Individual Locations due to differences in Shipping Costs. This story and related items have been 100% produced by Malinda Dollack with Malinda Dollack directing, guiding and editing Chat GPT for Art Work Alone."

new_block = f'''<article class="store-card portrait-product" id="store-PID15">
<div class="product-gallery collapsible-gallery">
<img loading="lazy" decoding="async" src="game card package no measurements.jpg?v=1" alt="{alt}" style="width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain;">
<div style="margin-top:8px;text-align:center;color:#4b146f;font-weight:800;line-height:1.25;">game card package no measurements</div>
</div>
<h3>{title}</h3>
<p class="price">C$24.00</p>
<p class="product-available">AVAILABLE</p><div class="store-details" hidden>
<p><strong>{note}</strong></p>
<div class="pid15-photo-gallery" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:18px 0 22px;">
{gallery}
</div>
<p><strong>Price: C$24.00</strong> — includes shipping within Canada. International customers, please contact Malinda before purchasing for a shipping quote to your location.</p>
<p>{existing_description}</p>
<div class="store-order"><a href="mailto:berachahdirector@gmail.com" data-email-form="m28" onclick="return openPreparedEmail('m28');">Buy Now</a></div>
</div></article>'''

pattern = re.compile(r'<article class="store-card portrait-product" id="store-PID15">.*?</article>', re.S)
html, count = pattern.subn(new_block, html, count=1)
if count != 1:
    raise SystemExit(f"PID15 block replacement count was {count}; expected 1. No file written.")

old_email = "I would like to order: PID15 - Hand Made Laminated Ribbon Tied Matching JESUS LOVES YOU ! Game Card Tiles: Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story Edition"
new_email = "I would like to order: PID15 - Hand Made Laminated Ribbon Tied Matching JESUS LOVES YOU ! Game Laminated Tiles: Sarah the Baby Sheep: My Shepherd, Jesus's Birth, The Christmas Story Edition"
if old_email not in html:
    raise SystemExit("PID15 email order line was not found; no file written.")
html = html.replace(old_email, new_email, 1)

path.write_text(html, encoding="utf-8")
print("PID15 updated: new main image, 29 named photos, requested note, 30 Laminated Tiles wording, and PID15 email text.")
