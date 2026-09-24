from pathlib import Path
from urllib.parse import quote
import re

path = Path('index.html')
html = path.read_text(encoding='utf-8')

EMAIL = 'dollackj316@gmail.com'

def mailto(subject, body):
    return f"mailto:{EMAIL}?subject={quote(subject)}&body={quote(body)}"

def card(title, price, details, physical=False, image='sarah.png'):
    subject = f"Order inquiry: {title}"
    if physical:
        body = f"Hello Malinda,\n\nI would like to order: {title}\n\nMy name:\nMy mailing address:\n\nPlease tell me the exact shipping cost and e-Transfer instructions.\n"
        button = 'E-mail Malinda Your Home Address'
    else:
        body = f"Hello Malinda,\n\nI would like: {title}\n\nMy name:\nMy e-mail address:\n\nPlease send me the e-Transfer instructions if payment is required.\n"
        button = 'E-mail Malinda to Order'
    href = mailto(subject, body)
    return f'''<article class="store-card">
      <img src="{image}" alt="{title}">
      <h3>{title}</h3>
      <p class="price">{price}</p>
      <p>{details}</p>
      <div class="store-order"><a href="{href}" style="display:block;width:100%;box-sizing:border-box;border-radius:999px;background:#5b197d;color:#fff;text-decoration:none;text-align:center;font-weight:900;font-size:1rem;padding:13px 12px;box-shadow:0 5px 12px rgba(75,20,111,.22)">{button}</a></div>
    </article>'''

cards = []
cards.append(card(
    'PDF Download Bookmark',
    'FREE',
    'Dimensions: 8 inches tall × 2 inches wide. The PDF bookmark is e-mailed to the recipient after Malinda receives the recipient’s e-mail address.',
    image='sarah-bookmark.png'
))
cards.append(card(
    'One Hand-made Laminated Jesus Loves You! Bookmark',
    'C$6.14',
    'Size: 8 inches tall × 2 inches wide. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for the exact shipping cost to your location.',
    physical=True,
    image='sarah-bookmark.png'
))
cards.append(card(
    'Four Hand-made Laminated Jesus Loves You! Bookmarks',
    'C$8.05',
    'Each bookmark is 8 inches tall × 2 inches wide. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for the exact shipping cost to your location.',
    physical=True,
    image='sarah-bookmark.png'
))
cards.append(card(
    'PDF Download Jesus Loves You! Stickers',
    'C$4.50 / C$5.00 / C$7.00',
    'Choose 1 page for C$4.50: 1 Large sticker (9 inches tall × 6.5 inches wide), 4 Medium stickers (each 5.75 inches tall × 4 inches wide), or 20 Small stickers (each 2 inches tall × 2 inches wide). Choose any 2 pages for C$5.00, or all 3 pages for C$7.00. PDF page(s) are e-mailed after the e-Transfer is received.'
))
cards.append(card(
    'Hand-made Jesus Loves You! Stickers',
    'C$6.58 / C$10.00 / C$15.00',
    'Choose 1 page for C$6.58: 1 Large sticker (9 inches tall × 6.5 inches wide), 4 Medium stickers (each 5.75 inches tall × 4 inches wide), or 20 Small stickers (each 2 inches tall × 2 inches wide). Choose any 2 pages for C$10.00, or all 3 pages for C$15.00. Allow 24 hours processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. E-mail dollackj316@gmail.com for the exact shipping cost to your location.',
    physical=True
))
cards.append(card(
    'PDF Download Standard E-Book Edition',
    'C$7.00',
    'The Standard E-Book PDF is e-mailed to the buyer after the e-Transfer is received.'
))
cards.append(card(
    'PDF Download Flip Book E-Book Edition',
    'C$10.00',
    'The Flip Book E-Book is e-mailed to the buyer after the e-Transfer is received.'
))
cards.append(card(
    'PDF Download Standard E-Book Coloring Book Edition',
    'C$7.00',
    'The Standard E-Book Coloring Book PDF is e-mailed to the buyer after the e-Transfer is received.'
))
cards.append(card(
    'Staples-produced Soft Cover PhotoBook Edition',
    'C$22.27',
    'Size: 7 inches tall × 9 inches wide. Allow 10–14 days processing time. Pick-up is available at your local Staples Canada location, or the book can be shipped to the buyer after it is processed by Staples Canada and received in Olds, Alberta. The e-Transfer must be received before the book is ordered from Staples. Shipping to the buyer is extra; shipping is free when the order is picked up at the buyer’s own local Staples Canada location. E-mail dollackj316@gmail.com for the exact shipping cost to your location.',
    physical=True
))
cards.append(card(
    'Hand-made Perfect Binding Soft Cover Edition',
    'C$27.88',
    'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for the exact shipping cost to your location.',
    physical=True
))
cards.append(card(
    'Hand-made Perfect Binding Hard Cover Edition',
    'C$29.88',
    'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for the exact shipping cost to your location.',
    physical=True
))
cards.append(card(
    'Hand-made Upcycled Decoupage Art Pad Edition',
    'C$16.32',
    'Size: 10 inches tall × 8 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for the exact shipping cost to your location.',
    physical=True
))
cards.append(card(
    'Hand-made Card Stock Coloring Book Edition',
    'C$18.20',
    'Size: 11 inches tall × 8.5 inches wide. Allow 3 days processing time. Shipped by Malinda using Canada Post after the e-Transfer is received and processing is complete. Shipping is extra. E-mail dollackj316@gmail.com for the exact shipping cost to your location.',
    physical=True
))

new_store = '''    <section class="store-section" id="store">
      <div class="store-intro">
        <h2>🛍️ Malinda’s Story Garden Store</h2>
        <p>Books, e-books, bookmarks and stickers featuring Sarah the Baby Sheep and Malinda’s Story Garden.</p>
        <p><strong>Interac e-Transfer is the accepted payment method for paid products.</strong> For physical products, e-mail Malinda for exact shipping costs before sending payment.</p>
      </div>
      <div class="store-grid">
''' + '\n'.join(cards) + '''
      </div>
    </section>'''

pattern = re.compile(r'\s*<section class="store-section" id="store">.*?</section>', re.S)
match = pattern.search(html)
if not match:
    raise SystemExit('Store section not found; no changes made.')
html = html[:match.start()] + '\n\n' + new_store + html[match.end():]

# Correct two accidental JavaScript typos already present in the live page.
html = html.replace('  concard.innerHTML=', '  card.innerHTML=')
html = html.replace('\nst cover=card.querySelector', '\n  const cover=card.querySelector')

path.write_text(html, encoding='utf-8')
print('Updated store catalog and corrected inline JavaScript typos.')
