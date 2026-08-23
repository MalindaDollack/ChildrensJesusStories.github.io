// Malinda's Story Garden website enhancements.
document.addEventListener('DOMContentLoaded', () => {
  const storeIntro = document.querySelector('#store .store-intro');
  const storeGrid = document.querySelector('#store .store-grid');

  // Keep the store guarantee visible.
  if (storeIntro && !document.getElementById('store-guarantee')) {
    const guarantee = document.createElement('div');
    guarantee.id = 'store-guarantee';
    guarantee.style.cssText = 'max-width:820px;margin:18px auto 6px;padding:16px 18px;background:#fff;border:3px solid #d9b3ee;border-radius:16px;color:#33243a;line-height:1.5;box-shadow:0 5px 14px rgba(75,20,111,.10)';
    guarantee.innerHTML = '<p style="margin:0 0 8px"><strong style="color:#4b146f">30-Day Satisfaction Guarantee — Physical Handmade Products</strong></p><p style="margin:0 0 8px">All physical handmade products are guaranteed to be exactly as described. Please keep in mind that our physical products are handmade, so slight variations may occur. Please examine all pictures carefully; I have tried to make every picture and description as accurate as possible. If you are unsatisfied with your purchase, please let me know immediately and simply return the product within 30 days for a full refund.</p><p style="margin:0"><strong>Digital downloads and products delivered by e-mail are not covered by this guarantee and are non-refundable.</strong></p>';
    storeIntro.appendChild(guarantee);
  }

  // Update the Staples Soft Cover PhotoBook listing.
  const staplesCard = storeGrid ? [...storeGrid.querySelectorAll('.store-card')].find(card => /staples[- ]produced soft cover|staples produced soft cover|soft cover photobook/i.test(card.textContent)) : null;
  if (staplesCard) {
    staplesCard.id = 'staples-book-card';
    const mainImage = staplesCard.querySelector('img');
    if (mainImage) {
      mainImage.src = 'staples-current-front.jpg';
      mainImage.alt = 'Current Staples printed Sarah the Baby Sheep soft cover book';
    }
    const heading = staplesCard.querySelector('h3');
    if (heading) heading.textContent = 'Staples Produced Soft Cover Edition PhotoBook';

    const price = staplesCard.querySelector('.price, .store-price');
    if (!staplesCard.querySelector('.staples-availability')) {
      const available = document.createElement('p');
      available.className = 'staples-availability';
      available.textContent = '✓ AVAILABLE NOW';
      available.style.cssText = 'display:inline-block;align-self:flex-start;margin:7px 0 5px;padding:7px 12px;border-radius:999px;background:#e8f7e8;color:#176b27;font-weight:900;border:2px solid #73b97d';
      (price || heading).insertAdjacentElement('afterend', available);
    }

    const description = staplesCard.querySelector('.catalog-details') || [...staplesCard.querySelectorAll('p')].find(p => /7 inches tall|10.?14 days processing/i.test(p.textContent));
    if (description) description.textContent = 'Size: 7 inches tall × 9 inches wide. Allow 10–14 days processing time. Pick-up is available at the buyer’s local Staples Canada location, or the book can be shipped to the buyer after processing by Staples Canada and receipt in Olds, Alberta. The e-Transfer must be received before the book is ordered from Staples. Shipping to the buyer is extra; there is no shipping cost when picked up at the buyer’s own local Staples Canada location. E-mail dollackj316@gmail.com for exact shipping costs to your location.';

    if (!staplesCard.querySelector('.staples-photo-gallery')) {
      const gallery = document.createElement('div');
      gallery.className = 'staples-photo-gallery';
      gallery.style.cssText = 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:14px 0 10px';
      const photos = [
        ['staples-current-front.jpg','Current Staples Printed Front Cover'],
        ['staples-back-cover.jpg','Back Cover'],
        ['staples-pages-1-2.jpg','Pages 1 + 2'],
        ['staples-pages-3-4.jpg','Pages 3 + 4'],
        ['sarah-future-printing-cover.jpg','New Cover — Future Printings']
      ];
      photos.forEach(([src,label], i) => {
        const figure = document.createElement('figure');
        figure.style.cssText = i === 4 ? 'grid-column:1/-1;margin:0;text-align:center' : 'margin:0;text-align:center';
        figure.innerHTML = `<img src="${src}" alt="${label}" loading="lazy" style="width:100%;height:145px;object-fit:contain;background:#fff;border:2px solid #ead5f5;border-radius:10px"><figcaption style="font-size:.82rem;font-weight:900;color:#4b146f;margin-top:4px">${label}</figcaption>`;
        gallery.appendChild(figure);
      });
      const order = staplesCard.querySelector('.store-order');
      (order || staplesCard).insertAdjacentElement(order ? 'beforebegin' : 'beforeend', gallery);
    }

    if (!staplesCard.querySelector('.future-printing-note')) {
      const note = document.createElement('div');
      note.className = 'future-printing-note';
      note.style.cssText = 'margin:10px 0 12px;padding:12px 13px;border-radius:12px;background:#fff7d9;border:2px solid #e4bf54;color:#4d3b08;line-height:1.45;font-weight:700';
      note.innerHTML = '<strong>Please Note:</strong> The first photos show the current book printed by Staples. For all future printings, the new cover shown here will be used. Illustrations in the current book that depict Jerusalem with the Dome of the Rock have also been updated for future printings to depict <strong>Bethlehem, with white buildings and flat roofs</strong>.';
      const order = staplesCard.querySelector('.store-order');
      (order || staplesCard).insertAdjacentElement(order ? 'beforebegin' : 'beforeend', note);
    }

    // The Staples purchase button should simply say Buy Now!
    const staplesOrderButton = staplesCard.querySelector('.store-order a, .store-order button');
    if (staplesOrderButton) staplesOrderButton.textContent = 'Buy Now !';
  }

  // Sarah softcover is available now, not coming soon.
  function makeAvailable(button) {
    if (!button) return;
    button.disabled = false;
    button.classList.remove('disabled');
    button.textContent = 'SOFTCOVER AVAILABLE NOW — C$22.27';
    button.style.background = '#176b27';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
      const target = document.getElementById('staples-book-card');
      if (target) target.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }
  makeAvailable(document.querySelector('.softcover-coming'));
  makeAvailable(document.querySelector('#sarahPreviewModal .preview-buy button'));
});

// Canadian French: keep the existing English first, with French directly underneath.
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('fr-ca-style')) return;
  const style = document.createElement('style');
  style.id = 'fr-ca-style';
  style.textContent = `.fr-ca{display:block;margin-top:.22em;font-size:.86em;line-height:1.3;font-weight:600;font-style:italic;color:#6b4a78}.topline .fr-ca,button .fr-ca,a .fr-ca{color:inherit;opacity:.9}.price+.fr-ca{margin-top:-2px}.fr-ca-inline{display:block;font-size:.82em;line-height:1.2;font-style:italic;font-weight:600}`;
  document.head.appendChild(style);

  const translations = new Map([
    ['Bible Stories Come Alive! Bright stories • Big blue eyes • God’s love','Les histoires de la Bible prennent vie! Histoires lumineuses • Grands yeux bleus • L’amour de Dieu'],
    ['Faith-Filled Adventures for Little Hearts','Des aventures remplies de foi pour les petits cœurs'],
    ['Home','Accueil'],['Books','Livres'],['Store','Boutique'],['Bookmarks','Signets'],['About Malinda','À propos de Malinda'],['Community','Communauté'],['Contact','Contact'],
    ['🌈 Meet 12 adorable animal friends','🌈 Rencontrez 12 adorables amis animaux'],
    ['Children’s Bible Stories Through the Big Blue Eyes of Adorable Little Animals','Des histoires bibliques pour enfants à travers les grands yeux bleus de petits animaux adorables'],
    ['Joyful, colourful Christian children’s books and Bible stories for kids that help children discover courage, kindness, obedience, hope, and the love of Jesus.','Des livres chrétiens joyeux et colorés pour enfants, ainsi que des histoires bibliques qui aident les enfants à découvrir le courage, la bonté, l’obéissance, l’espérance et l’amour de Jésus.'],
    ['Explore the Storybook Shelf','Explorez la bibliothèque d’histoires'],['Meet Malinda','Rencontrez Malinda'],
    ['Hello! I’m Sarah!','Bonjour! Je suis Sarah!'],
    ['Welcome to Malinda’s Story Garden, where children meet adorable animal friends through Christian stories and Bible adventures as we learn about Jesus together!','Bienvenue au Jardin d’histoires de Malinda, où les enfants rencontrent d’adorables amis animaux à travers des histoires chrétiennes et des aventures bibliques, tout en apprenant ensemble à connaître Jésus!'],
    ['Yes! Show Me Around!','Oui! Faites-moi visiter!'],['THE COMPLETE COLLECTION','LA COLLECTION COMPLÈTE'],
    ['Children’s Bible Stories & Christian Books for Kids','Histoires bibliques et livres chrétiens pour enfants'],
    ['🛍️ Malinda’s Story Garden Store','🛍️ Boutique du Jardin d’histoires de Malinda'],
    ['Books, e-books, bookmarks and stickers featuring Sarah the Baby Sheep and Malinda’s Story Garden.','Livres, livres numériques, signets et autocollants mettant en vedette Sarah le petit mouton et le Jardin d’histoires de Malinda.'],
    ['Interac e-Transfer is the accepted payment method for paid products. For physical products, e-mail Malinda for exact shipping costs before sending payment.','Le virement Interac est le mode de paiement accepté pour les produits payants. Pour les produits physiques, envoyez un courriel à Malinda afin d’obtenir les frais d’expédition exacts avant d’effectuer le paiement.'],
    ['30-Day Satisfaction Guarantee — Physical Handmade Products','Garantie de satisfaction de 30 jours — Produits physiques faits à la main'],
    ['All physical handmade products are guaranteed to be exactly as described. Please keep in mind that our physical products are handmade, so slight variations may occur. Please examine all pictures carefully; I have tried to make every picture and description as accurate as possible. If you are unsatisfied with your purchase, please let me know immediately and simply return the product within 30 days for a full refund.','Tous les produits physiques faits à la main sont garantis conformes à leur description. Comme ils sont fabriqués à la main, de légères variations peuvent se produire. Veuillez examiner attentivement toutes les photos; j’ai fait de mon mieux pour que chaque photo et chaque description soient aussi fidèles que possible. Si vous n’êtes pas satisfait de votre achat, veuillez m’en informer immédiatement et retourner simplement le produit dans les 30 jours pour obtenir un remboursement complet.'],
    ['Digital downloads and products delivered by e-mail are not covered by this guarantee and are non-refundable.','Les téléchargements numériques et les produits livrés par courriel ne sont pas couverts par cette garantie et ne sont pas remboursables.'],
    ['FREE','GRATUIT'],['E-mail Malinda to Order','Envoyez un courriel à Malinda pour commander'],['E-mail Malinda Your Home Address','Envoyez votre adresse postale à Malinda par courriel'],['Buy Now !','Achetez maintenant!'],['✓ AVAILABLE NOW','✓ DISPONIBLE MAINTENANT'],['SOFTCOVER AVAILABLE NOW — C$22.27','COUVERTURE SOUPLE DISPONIBLE MAINTENANT — 22,27 $ CA'],
    ['Current Staples Printed Front Cover','Couverture avant actuelle imprimée par Staples'],['Back Cover','Couverture arrière'],['Pages 1 + 2','Pages 1 + 2'],['Pages 3 + 4','Pages 3 + 4'],['New Cover — Future Printings','Nouvelle couverture — impressions futures'],
    ['Please Note: The first photos show the current book printed by Staples. For all future printings, the new cover shown here will be used. Illustrations in the current book that depict Jerusalem with the Dome of the Rock have also been updated for future printings to depict Bethlehem, with white buildings and flat roofs.','Veuillez noter : Les premières photos montrent le livre actuellement imprimé par Staples. Pour toutes les impressions futures, la nouvelle couverture présentée ici sera utilisée. Les illustrations du livre actuel qui montrent Jérusalem avec le Dôme du Rocher ont également été mises à jour pour les impressions futures afin de représenter Bethléem, avec des bâtiments blancs et des toits plats.'],
    ['❤️ Every Purchase Helps','❤️ Chaque achat aide'],['C$1.00 from every purchase will be donated to Samaritan’s Purse.','1,00 $ CA de chaque achat sera remis à La Bourse du Samaritain.'],['These colourful Bible stories would also make meaningful additions to Operation Christmas Child shoebox gifts.','Ces histoires bibliques colorées feraient aussi de merveilleux ajouts aux boîtes-cadeaux de l’Opération enfant de Noël.'],['Visit Samaritan’s Purse ↗','Visitez La Bourse du Samaritain ↗'],
    ['Bible Based','Fondé sur la Bible'],['Stories rooted in God’s Word.','Des histoires enracinées dans la Parole de Dieu.'],['Adorable Characters','Personnages adorables'],['Actual Story Garden animals with big blue eyes.','Les véritables animaux du Jardin d’histoires aux grands yeux bleus.'],['Beautifully Illustrated','Magnifiquement illustré'],['Bright, colourful art children will love.','Des illustrations lumineuses et colorées que les enfants aimeront.'],['Wholesome & Safe','Sain et sécuritaire'],['Made for families, churches, and schools.','Conçu pour les familles, les églises et les écoles.'],
    ['Match Malinda’s Animal Friends!','Associez les amis animaux de Malinda!'],['Turn over two purple tiles. Matching animals disappear!','Retournez deux tuiles mauves. Les animaux identiques disparaissent!'],['Start Again','Recommencer'],['Wonderful! You matched all 12 animal friends!','Bravo! Vous avez associé les 12 amis animaux!'],
    ['💜 About the Author','💜 À propos de l’auteure'],['Hello! My name is Malinda Dollack.','Bonjour! Je m’appelle Malinda Dollack.'],
    ['COMMUNITY CORNER','COIN COMMUNAUTAIRE'],['Share Your Story Garden Experience','Partagez votre expérience du Jardin d’histoires'],['⭐ Leave a Review','⭐ Laisser un avis'],['Tell other families which book you enjoyed and what made it special.','Dites aux autres familles quel livre vous avez aimé et ce qui l’a rendu spécial.'],['Write a Review','Écrire un avis'],['💬 Leave a Comment','💬 Laisser un commentaire'],['Share encouragement, a favourite character, or a message for Malinda.','Partagez un encouragement, un personnage préféré ou un message pour Malinda.'],['Post a Comment','Publier un commentaire'],['📷 Share a Picture','📷 Partager une photo'],['Parents may preview a photo of their child enjoying a book. Public posting would require approval.','Les parents peuvent prévisualiser une photo de leur enfant profitant d’un livre. Toute publication publique nécessitera une approbation.'],['Choose a Picture','Choisir une photo'],['🎨 Share Children’s Artwork','🎨 Partager les œuvres des enfants'],['Show us art inspired by Sarah, Joy, Wally, Levi, and their friends.','Montrez-nous des œuvres inspirées de Sarah, Joy, Wally, Levi et leurs amis.'],['Share Artwork','Partager une œuvre'],['❤️ Vote for Your Favourite Character','❤️ Votez pour votre personnage préféré'],['These thumbnails use the actual Story Garden book artwork rather than generic animal pictures.','Ces miniatures utilisent les véritables illustrations des livres du Jardin d’histoires plutôt que des images génériques d’animaux.'],['Reader Reviews','Avis des lecteurs'],['Be the first visitor to leave a review on this device.','Soyez la première personne à laisser un avis sur cet appareil.'],
    ['💌 Contact Malinda','💌 Communiquer avec Malinda'],['I’d Love to Hear From You!','J’aimerais avoir de vos nouvelles!'],['Questions, comments, prayer requests, school or church orders, library inquiries, and wholesale inquiries are all welcome.','Les questions, commentaires, demandes de prière, commandes d’écoles ou d’églises, demandes de bibliothèques et demandes de vente en gros sont les bienvenus.'],['Email:','Courriel :'],['Email Malinda','Envoyer un courriel à Malinda'],['Wholesale Inquiry','Demande de vente en gros'],['Church • School • Library','Église • École • Bibliothèque'],['Prayer Request','Demande de prière'],['Send Me a Message','Envoyez-moi un message'],['Name','Nom'],['Email','Courriel'],['Subject','Objet'],['General Message','Message général'],['Bookstore or Wholesale Inquiry','Demande de librairie ou de vente en gros'],['Church, School, or Library Order','Commande d’église, d’école ou de bibliothèque'],['Prayer Request or Encouragement','Demande de prière ou encouragement'],['Your Message','Votre message'],['Open Email to Send Message','Ouvrir le courriel pour envoyer le message'],['This opens your email program with the message filled in.','Cela ouvre votre logiciel de courriel avec le message déjà rempli.'],
    ['Ordering & Payment','Commande et paiement'],['Sarah The Baby Sheep products are available in Malinda’s Story Garden Store above.','Les produits Sarah le petit mouton sont disponibles dans la boutique du Jardin d’histoires de Malinda ci-dessus.'],['To order, choose the product you would like and click the E-mail Malinda button. Interac e-Transfer is the accepted payment method.','Pour commander, choisissez le produit désiré et cliquez sur le bouton pour envoyer un courriel à Malinda. Le virement Interac est le mode de paiement accepté.'],['Thank you for visiting Malinda’s Story Garden!','Merci de visiter le Jardin d’histoires de Malinda!'],['All rights reserved.','Tous droits réservés.'],
    ['Coming Soon!','Bientôt disponible!'],['This book is not available to order yet. Please check back soon.','Ce livre n’est pas encore disponible à la commande. Revenez bientôt.'],['E-book','Livre numérique'],['Softcover','Couverture souple'],['Coming Soon','Bientôt disponible'],['COMING SOON','BIENTÔT DISPONIBLE'],
    ['⭐ Leave a Review','⭐ Laisser un avis'],['Your Name','Votre nom'],['Book','Livre'],['Rating','Évaluation'],['Your Review','Votre avis'],['Save Review','Enregistrer l’avis'],['Reviews are saved only in this browser until a website database is connected.','Les avis sont enregistrés uniquement dans ce navigateur jusqu’à ce qu’une base de données soit connectée au site.'],['💬 Leave a Comment','💬 Laisser un commentaire'],['Your Comment','Votre commentaire'],['Email Comment to Malinda','Envoyer le commentaire à Malinda par courriel'],['Choose artwork to preview it, then email it to Malinda for approval.','Choisissez une œuvre pour la prévisualiser, puis envoyez-la à Malinda par courriel pour approbation.'],['Email the Artwork to Malinda','Envoyer l’œuvre à Malinda par courriel'],['Choose a picture to preview it. Please only share a child’s photo with a parent or guardian’s permission.','Choisissez une photo pour la prévisualiser. Veuillez partager la photo d’un enfant seulement avec la permission d’un parent ou d’un tuteur.'],['Email the Picture to Malinda','Envoyer la photo à Malinda par courriel'],['Your email program will open. Attach the selected photo before sending.','Votre logiciel de courriel s’ouvrira. Joignez la photo choisie avant l’envoi.'],
    ['E-mail Malinda Your Home Address','Envoyez votre adresse postale à Malinda par courriel'],['Your E-mail Address','Votre adresse courriel'],['Your Home / Mailing Address','Votre adresse résidentielle / postale'],['Extra Message (optional)','Message supplémentaire (facultatif)'],['Open E-mail to Malinda','Ouvrir un courriel à Malinda'],['Your e-mail program will open with your product and address already filled in. Review it, then press Send.','Votre logiciel de courriel s’ouvrira avec le produit et votre adresse déjà inscrits. Vérifiez le tout, puis appuyez sur Envoyer.'],
    ['Preview Sarah the Baby Sheep','Aperçu de Sarah le petit mouton'],['Read the first five pages free. Purchase the complete e-book for C$7.00.','Lisez gratuitement les cinq premières pages. Achetez le livre numérique complet pour 7,00 $ CA.'],['Cover','Couverture'],['Copyright','Droits d’auteur'],['Dedication','Dédicace'],['Page 1','Page 1'],['Page 2','Page 2'],['PURCHASE E-BOOK — C$7.00','ACHETER LE LIVRE NUMÉRIQUE — 7,00 $ CA'],
    ['Request Shipping Cost','Demander les frais d’expédition'],['Please send me the shipping costs for this item.','Veuillez m’envoyer les frais d’expédition pour cet article.'],['Item name','Nom de l’article'],['Your physical / mailing address','Votre adresse physique / postale'],['Open E-mail to Malinda','Ouvrir un courriel à Malinda']
  ]);

  const authorEnglish = `Hello! My name is Malinda Dollack. I am a retired piano teacher and registered nurse and currently a Christian Childrens Book author. I am married and have been blessed to share 37 wonderful years with my husband. My world has always revolved around children. Before meeting my husband, God gave me the precious gift of Jennifer. My beautiful daughter, who had special needs, lived to the age of two and a half before God called her home to Heaven. I look forward to the glorious day when I will be reunited with my precious daughter. My husband and I were unable to have more biological children. Then, over ten years ago, God performed another miracle. Through Facebook, my husband's daughter from a previous relationship, who had been placed for adoption as a baby, found us. Since then, God has blessed us with a wonderful family that includes our daughter, two grandsons, and four great-grandchildren. God truly works in amazing ways. I also was adopted as a baby, or as my parents lovingly told me, I was “chosen.” As early as I can remember my adopted parents told me I was "chosen" at an orphanage in Edmonton, Alberta from thousands of babies, because I was the cutest baby of them all. Today I know I have been chosen by God, not because of cuteness or anything I have done, but entirely by His grace. He has chosen me to be His servant, and yes I am cute. Most importantly, I am a born-again, Spirit-filled follower of Jesus Christ. For many years, I believed my husband was the evangelist while I supported him through prayer at home. Recently, God reminded me that I am also an evangelist—as are all His followers. We simply have different audiences. I have always believed that we can make a lasting difference in the lives of children, whether they are biologically ours or not. As a piano teacher, I had the privilege of teaching children as young as three years old. Over the years God has placed numerous children in my life although God did not give me more biological children, He gave me many other children to love, teach, and share the Gospel of Jesus Christ with. I prayerfully sought the Holy Spirit's guidance as I wrote these stories. Thank you for your interest in these wonderful books. “Let the little children come to me...” — Matthew 19:14 (NIV) With love in Christ, Malinda Dollack`;
  translations.set(authorEnglish, `Bonjour! Je m’appelle Malinda Dollack. Je suis une ancienne professeure de piano et infirmière autorisée à la retraite, et je suis maintenant auteure de livres chrétiens pour enfants. Je suis mariée et j’ai eu la bénédiction de partager 37 merveilleuses années avec mon mari. Mon univers a toujours tourné autour des enfants. Avant de rencontrer mon mari, Dieu m’a donné le précieux cadeau de Jennifer. Ma magnifique fille, qui avait des besoins particuliers, a vécu jusqu’à l’âge de deux ans et demi avant que Dieu ne la rappelle auprès de lui au ciel. J’attends avec joie le jour glorieux où je serai réunie avec ma précieuse fille. Mon mari et moi n’avons pas pu avoir d’autres enfants biologiques. Puis, il y a plus de dix ans, Dieu a accompli un autre miracle. Grâce à Facebook, la fille de mon mari issue d’une relation antérieure, qui avait été confiée à l’adoption lorsqu’elle était bébé, nous a retrouvés. Depuis, Dieu nous a bénis d’une merveilleuse famille comprenant notre fille, deux petits-fils et quatre arrière-petits-enfants. Dieu agit vraiment de façon extraordinaire. J’ai moi aussi été adoptée lorsque j’étais bébé ou, comme mes parents me le disaient avec amour, j’ai été « choisie ». Aussi loin que je me souvienne, mes parents adoptifs me disaient qu’ils m’avaient « choisie » dans un orphelinat d’Edmonton, en Alberta, parmi des milliers de bébés, parce que j’étais le plus mignon de tous. Aujourd’hui, je sais que j’ai été choisie par Dieu, non pas à cause de mon apparence ni de quoi que ce soit que j’aurais accompli, mais entièrement par sa grâce. Il m’a choisie pour le servir et, oui, je suis mignonne. Plus important encore, je suis une disciple de Jésus-Christ née de nouveau et remplie de l’Esprit. Pendant de nombreuses années, je croyais que mon mari était l’évangéliste tandis que je le soutenais par la prière à la maison. Récemment, Dieu m’a rappelé que je suis moi aussi une évangéliste, comme le sont tous ses disciples. Nous avons simplement des auditoires différents. J’ai toujours cru que nous pouvons avoir une influence durable dans la vie des enfants, qu’ils soient biologiquement les nôtres ou non. Comme professeure de piano, j’ai eu le privilège d’enseigner à des enfants dès l’âge de trois ans. Au fil des années, Dieu a placé de nombreux enfants dans ma vie. Même s’il ne m’a pas donné d’autres enfants biologiques, il m’a donné beaucoup d’autres enfants à aimer, à enseigner et avec qui partager l’Évangile de Jésus-Christ. J’ai recherché dans la prière la direction du Saint-Esprit pendant l’écriture de ces histoires. Merci de votre intérêt pour ces merveilleux livres. « Laissez les petits enfants venir à moi... » — Matthieu 19:14 (NIV) Avec amour en Christ, Malinda Dollack`);

  const productTranslations = {
    'PDF Download Book Mark':['Signet PDF à télécharger','Dimensions : 8 pouces de haut × 2 pouces de large. Envoyé immédiatement par courriel au destinataire après que Malinda a reçu son adresse courriel.'],
    'PDF Download Bookmark':['Signet PDF à télécharger','Dimensions : 8 pouces de haut × 2 pouces de large. Le signet PDF est envoyé par courriel au destinataire après que Malinda a reçu son adresse courriel.'],
    'One Hand-made Laminated Jesus Loves You! Book Mark':['Un signet plastifié « Jésus t’aime! » fait à la main','Format : 8 pouces de haut × 2 pouces de large. Prévoir 24 heures de traitement. Expédié par Malinda avec Postes Canada après réception du virement Interac et une fois le traitement terminé. Envoyez un courriel à dollackj316@gmail.com pour connaître les frais d’expédition exacts vers votre adresse.'],
    'One Hand-made Laminated Jesus Loves You! Bookmark':['Un signet plastifié « Jésus t’aime! » fait à la main','Format : 8 pouces de haut × 2 pouces de large. Prévoir 24 heures de traitement. Expédié par Malinda avec Postes Canada après réception du virement Interac et une fois le traitement terminé. Envoyez un courriel à dollackj316@gmail.com pour connaître les frais d’expédition exacts vers votre adresse.'],
    'Four Hand-made Laminated Jesus Loves You! Book Marks':['Quatre signets plastifiés « Jésus t’aime! » faits à la main','Chaque signet mesure 8 pouces de haut × 2 pouces de large. Prévoir 24 heures de traitement. Expédiés par Malinda avec Postes Canada après réception du virement Interac et une fois le traitement terminé. Envoyez un courriel à dollackj316@gmail.com pour connaître les frais d’expédition exacts vers votre adresse.'],
    'Four Hand-made Laminated Jesus Loves You! Bookmarks':['Quatre signets plastifiés « Jésus t’aime! » faits à la main','Chaque signet mesure 8 pouces de haut × 2 pouces de large. Prévoir 24 heures de traitement. Expédiés par Malinda avec Postes Canada après réception du virement Interac et une fois le traitement terminé. Envoyez un courriel à dollackj316@gmail.com pour connaître les frais d’expédition exacts vers votre adresse.'],
    'PDF Download Jesus Loves You! Stickers':['Autocollants PDF « Jésus t’aime! » à télécharger','Choisissez 1 page pour 4,50 $ CA : 1 grand autocollant, 9 pouces de haut × 6,5 pouces de large; 4 autocollants moyens, chacun de 5,75 pouces de haut × 4 pouces de large; ou 20 petits autocollants, chacun de 2 pouces × 2 pouces. Choisissez 2 pages pour 5,00 $ CA ou les 3 pages pour 7,00 $ CA. Les pages PDF sont envoyées par courriel après réception du virement Interac.'],
    'Hand-made Jesus Loves You! Stickers':['Autocollants « Jésus t’aime! » faits à la main','Choisissez 1 page pour 6,58 $ CA : 1 grand autocollant, 9 pouces de haut × 6,5 pouces de large; 4 autocollants moyens, chacun de 5,75 pouces de haut × 4 pouces de large; ou 20 petits autocollants, chacun de 2 pouces × 2 pouces. Choisissez 2 pages pour 10,00 $ CA ou les 3 pages pour 15,00 $ CA. Prévoir 24 heures de traitement. Expédiés par Malinda avec Postes Canada après réception du virement Interac.'],
    'PDF Download Standard E-Book Edition':['Édition standard du livre numérique PDF à télécharger','Envoyée immédiatement par courriel à l’acheteur après réception du virement Interac.'],
    'PDF Download Flip Book E-Book Edition':['Édition livre numérique feuilletable PDF à télécharger','Envoyée immédiatement par courriel à l’acheteur après réception du virement Interac.'],
    'PDF Download Standard E-Book Coloring Book Edition':['Édition standard du livre à colorier numérique PDF à télécharger','Envoyée immédiatement par courriel à l’acheteur après réception du virement Interac.'],
    'Staples Produced Soft Cover Edition PhotoBook':['Livre photo à couverture souple produit par Staples','Format : 7 pouces de haut × 9 pouces de large. Prévoir de 10 à 14 jours de traitement. Le ramassage est offert au magasin Staples Canada local de l’acheteur, ou le livre peut être expédié à l’acheteur après avoir été traité par Staples Canada et reçu à Olds, en Alberta. Le virement Interac doit être reçu avant que le livre soit commandé chez Staples. Les frais d’expédition à l’acheteur sont en sus; il n’y a aucuns frais d’expédition si la commande est ramassée au magasin Staples Canada local de l’acheteur. Envoyez un courriel à dollackj316@gmail.com pour connaître les frais d’expédition exacts vers votre adresse.'],
    'Hand Made Perfect Binding Soft Cover Edition':['Édition à couverture souple à reliure parfaite faite à la main','Format : 11 pouces de haut × 8,5 pouces de large. Prévoir 3 jours de traitement. Expédiée par Malinda avec Postes Canada après réception du virement Interac. Les frais d’expédition sont en sus.'],
    'Hand-made Perfect Binding Soft Cover Edition':['Édition à couverture souple à reliure parfaite faite à la main','Format : 11 pouces de haut × 8,5 pouces de large. Prévoir 3 jours de traitement. Expédiée par Malinda avec Postes Canada après réception du virement Interac. Les frais d’expédition sont en sus.'],
    'Hand Made Perfect Binding Hard Cover Edition':['Édition à couverture rigide à reliure parfaite faite à la main','Format : 11 pouces de haut × 8,5 pouces de large. Prévoir 3 jours de traitement. Expédiée par Malinda avec Postes Canada après réception du virement Interac. Les frais d’expédition sont en sus.'],
    'Hand-made Perfect Binding Hard Cover Edition':['Édition à couverture rigide à reliure parfaite faite à la main','Format : 11 pouces de haut × 8,5 pouces de large. Prévoir 3 jours de traitement. Expédiée par Malinda avec Postes Canada après réception du virement Interac. Les frais d’expédition sont en sus.'],
    'Hand Made Upcycled Decoupage Art Pad Edition':['Édition bloc d’art découpé surcyclé faite à la main','Format : 10 pouces de haut × 8 pouces de large. Prévoir 3 jours de traitement. Expédiée par Malinda avec Postes Canada après réception du virement Interac. Les frais d’expédition sont en sus.'],
    'Hand-made Upcycled Decoupage Art Pad Edition':['Édition bloc d’art découpé surcyclé faite à la main','Format : 10 pouces de haut × 8 pouces de large. Prévoir 3 jours de traitement. Expédiée par Malinda avec Postes Canada après réception du virement Interac. Les frais d’expédition sont en sus.'],
    'Hand Made Card Stock Coloring Book Edition':['Édition livre à colorier sur papier cartonné faite à la main','Format : 11 pouces de haut × 8,5 pouces de large. Prévoir 3 jours de traitement. Expédiée par Malinda avec Postes Canada après réception du virement Interac. Les frais d’expédition sont en sus.'],
    'Hand-made Card Stock Coloring Book Edition':['Édition livre à colorier sur papier cartonné faite à la main','Format : 11 pouces de haut × 8,5 pouces de large. Prévoir 3 jours de traitement. Expédiée par Malinda avec Postes Canada après réception du virement Interac. Les frais d’expédition sont en sus.']
  };

  const bookFr = [
    ['Sarah the Baby Sheep: My Shepherd, Jesus’s Birth, The Christmas Story','Sarah le petit mouton : Mon berger, la naissance de Jésus, l’histoire de Noël','Luc 2.1–20 (NIV)'],
    ['Papa Finnigan the Fish: Sings Over the Eggs. Jesus Sings Over All Of Us','Papa Finnigan le poisson : Il chante sur les œufs. Jésus chante sur chacun de nous','Sophonie 3.17 (NIV)'],
    ['Wally the Whale: Obeys God and Swallows a Human','Wally la baleine : Il obéit à Dieu et avale un humain','Jonas 1.1–17 (NIV)'],
    ['Levi the Lion: Listens to God and Laughs with Daniel','Levi le lion : Il écoute Dieu et rit avec Daniel','Daniel 6.1–28 (NIV)'],
    ['Freddy the Ferret: Finds Fun in the Firey Furnace with Friends. Freddy Trusted God to Deliver him from the Flames','Freddy le furet : Il s’amuse avec ses amis dans la fournaise ardente. Freddy a fait confiance à Dieu pour le délivrer des flammes','Daniel 3.1–30 (NIV)'],
    ['Patsy the Plain Peacock: Gives Queen Esther Fashion Advice','Patsy le paon tout simple : Il donne des conseils de mode à la reine Esther','Esther 4.13–17 (NIV)'],
    ['Davy the Donkey: Speaks Out Loud, the Bullying by Balaam','Davy l’âne : Il dénonce à voix haute les mauvais traitements de Balaam','Nombres 22.21–39 (NIV)'],
    ['Larry the Lizard: Leaps with the Leper! Only One Leper Thanks Jesus','Larry le lézard : Il bondit avec le lépreux! Un seul lépreux remercie Jésus','Luc 17.11–19 (NIV)'],
    ['Francesco’s Frog Fiesta in Egypt: The Second Plague','La fête des grenouilles de Francesco en Égypte : La deuxième plaie','Exode 8.1–15 (NIV)'],
    ['Sweet-Pea the Sparrow: Is Cared for by God','Sweet-Pea le moineau : Dieu prend soin de lui','Matthieu 10.29–31 (NIV)'],
    ['Willy the Water Strider Bug: Walks on Water with Jesus','Willy le gerris : Il marche sur l’eau avec Jésus','Matthieu 14.22–33 (NIV)'],
    ['Barry the Blind Mole: Receives His Sight Along with the Blind Man Jesus Healed','Barry la taupe aveugle : Il reçoit la vue avec l’homme aveugle que Jésus a guéri','Jean 9.25 (NIV)']
  ];

  function norm(s){return String(s||'').replace(/\s+/g,' ').trim();}
  function addFr(el, fr){
    if(!el || !fr || el.querySelector(':scope > .fr-ca')) return;
    const span=document.createElement('span');span.className='fr-ca';span.lang='fr-CA';span.textContent=fr;el.appendChild(span);
  }

  // Products: French title and description directly beneath English.
  document.querySelectorAll('.store-card').forEach(card=>{
    const h=card.querySelector('h3'); if(!h) return;
    const p=productTranslations[norm(h.childNodes[0]?.textContent || h.textContent)];
    if(p){ addFr(h,p[0]); const desc=card.querySelector('.catalog-details') || [...card.querySelectorAll('p')].find(x=>!x.classList.contains('price')&&!x.classList.contains('staples-availability')&&!x.querySelector('.fr-ca')); if(desc)addFr(desc,p[1]); }
  });

  // Book shelf titles and scripture references.
  document.querySelectorAll('#bookGrid .book-card').forEach((card,i)=>{const t=bookFr[i];if(!t)return;addFr(card.querySelector('h3'),t[1]);addFr(card.querySelector('.reference'),t[2]);});

  // Exact visible-text translations across the rest of the page.
  const candidates=document.querySelectorAll('h1,h2,h3,p,small,strong,span,button,a,label,legend,figcaption,cite,option,address');
  candidates.forEach(el=>{
    if(el.classList.contains('fr-ca') || el.closest('.fr-ca')) return;
    if(el.matches('.price') || el.closest('.price')) return;
    if(el.children.length && !['A','BUTTON','LABEL','ADDRESS'].includes(el.tagName)) return;
    const key=norm([...el.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent).join(' ') || el.textContent);
    const fr=translations.get(key) || translations.get(norm(el.textContent));
    if(fr) addFr(el,fr);
  });

  // Translate the long author biography as one block.
  const bio=[...document.querySelectorAll('.about-copy p')].find(p=>norm(p.textContent).startsWith('Hello! My name is Malinda Dollack.') && norm(p.textContent).length>400);
  if(bio) addFr(bio,translations.get(authorEnglish));

  // Future-printing note contains nested bold text, so translate it as one complete block.
  const future=document.querySelector('.future-printing-note');
  if(future) addFr(future,translations.get('Please Note: The first photos show the current book printed by Staples. For all future printings, the new cover shown here will be used. Illustrations in the current book that depict Jerusalem with the Dome of the Rock have also been updated for future printings to depict Bethlehem, with white buildings and flat roofs.'));

  // Form placeholders also get Canadian French without changing the English labels.
  const placeholders={
    'Enter the item name':'Entrez le nom de l’article',
    'Street address, town/city, province/state, postal/ZIP code, country':'Adresse, ville, province/État, code postal/ZIP, pays'
  };
  document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{const fr=placeholders[el.placeholder];if(fr)el.placeholder += ' / '+fr;});
});
