const books = [
  {name:"Sarah", title:"Sarah the Baby Sheep: Jesus’s Birth, the Christmas Story", ref:"Luke 2:1–20 NIV", img:"sarah-new.png"},
  {name:"Joy", title:"Joy the Fish: Relocates to a New Pond, Heaven Our New Pond", ref:"John 14:1–3 NIV", img:"joy-new.png"},
  {name:"Wally", title:"Wally the Whale: Obeys God and Swallows a Human", ref:"Jonah 1:1–17 NIV", img:"wally-new.png"},
  {name:"Levi", title:"Levi the Lion: Listens to God and Laughs with Daniel", ref:"Daniel 6:1–28 NIV", img:"levi-new.png"},
  {name:"Freddy", title:"Freddy the Ferret: Finds Fun in the Fiery Furnace", ref:"Daniel 3 NIV", img:"freddy-new.png"},
  {name:"Patsy", title:"Patsy the Plain Peacock: Gives Queen Esther Fashion Advice", ref:"Esther 4:13–17 NIV", img:"patsy-new.png"},
  {name:"Davy", title:"Davy the Donkey: Speaks Out Loud, the Bullying by Balaam", ref:"Numbers 22:21–39 NIV", img:"davy-new.png"},
  {name:"Larry", title:"Larry the Lizard: Leaps with the Leper! Only One Leper Thanks Jesus", ref:"Luke 17:11–19 NIV", img:"larry-new.png"},
  {name:"Francesco", title:"Francesco’s Frog Fiesta in Egypt: The Second Plague", ref:"Exodus 8:1–15 NIV", img:"francesco-new.png"},
  {name:"Sweet-Pea", title:"Sweet-Pea the Sparrow: Is Cared for by God", ref:"Matthew 10:29–31 NIV", img:"sweetpea-new.png"},
  {name:"Willy", title:"Willy the Water Strider Bug: Walks on Water with Jesus", ref:"Matthew 14:22–33 NIV", img:"willy-new.png"},
  {name:"Barry", title:"Barry the Blind Mole: Receives His Sight Along with the Blind Man Jesus Healed", ref:"John 9:25 NIV", img:"barry-new.png"}
];
const grid=document.getElementById('bookGrid');
books.forEach((b,i)=>{const card=document.createElement('article');card.className='book-card';const media=b.img?`<img src="${b.img}" alt="${b.title} book cover">`:`<div class="placeholder"><span>🔥</span><b>Freddy the Ferret</b><small>Cover artwork coming soon</small></div>`;card.innerHTML=`<button class="cover-button" aria-label="Enlarge ${b.title}">${media}<span class="book-number">${i+1}</span></button><h3>${b.title}</h3><p class="reference">${b.ref}</p><div class="prices"><span>E-book <b>C$7.00</b></span><span>Softcover <b>C$17.77</b></span></div><button class="soon">COMING SOON</button>`;const cover=card.querySelector('.cover-button');if(b.img){cover.addEventListener('click',()=>openImage(b.img,b.title))}else{cover.addEventListener('click',()=>showModal('comingSoonModal',b.title))}card.querySelector('.soon').addEventListener('click',()=>showModal('comingSoonModal',b.title));grid.appendChild(card)});

const overlay=document.getElementById('overlay');
function showModal(id,title=''){const m=document.getElementById(id);if(title)document.getElementById('modalBook').textContent=title;m.classList.add('open');overlay.classList.add('open')}
function closeModals(){document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));overlay.classList.remove('open')}
document.querySelectorAll('.close-modal').forEach(b=>b.addEventListener('click',closeModals));overlay.addEventListener('click',closeModals);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>showModal(b.dataset.open)));
const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const nav=document.querySelector('nav');nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('nav').classList.remove('open')));document.getElementById('year').textContent=new Date().getFullYear();

const bookmarkOptions=document.getElementById('bookmarkOptions');books.filter(b=>b.img).forEach(b=>{const btn=document.createElement('button');btn.type='button';btn.dataset.bookmark=b.name;btn.innerHTML=`<img src="${b.img}" alt="${b.name} bookmark thumbnail"><span>${b.name}</span>`;bookmarkOptions.appendChild(btn)});
const bookmarkForm=document.getElementById('bookmarkForm'),bookmarkStatus=document.getElementById('bookmarkStatus');bookmarkForm.addEventListener('submit',e=>{e.preventDefault();bookmarkOptions.classList.add('unlocked');bookmarkStatus.textContent='Choose your favourite character bookmark below!'});bookmarkOptions.addEventListener('click',e=>{const btn=e.target.closest('button');if(!btn)return;if(!bookmarkOptions.classList.contains('unlocked')){bookmarkStatus.textContent='Please enter your email address first.';document.getElementById('bookmarkEmail').focus();return}bookmarkStatus.textContent=`${btn.dataset.bookmark} selected. The finished bookmark download can be connected when the bookmark file is ready.`});

const characterGrid=document.getElementById('characterGrid');const votes=JSON.parse(localStorage.getItem('storyGardenVotes')||'{}');books.forEach(b=>{const card=document.createElement('button');card.className='character-card';card.type='button';card.innerHTML=b.img?`<img src="${b.img}" alt="${b.name}"><strong>${b.name}</strong><span>${votes[b.name]||0} vote(s)</span>`:`<div class="placeholder"><span>🔥</span></div><strong>${b.name}</strong><span>${votes[b.name]||0} vote(s)</span>`;card.addEventListener('click',()=>{votes[b.name]=(votes[b.name]||0)+1;localStorage.setItem('storyGardenVotes',JSON.stringify(votes));card.querySelector('span').textContent=`${votes[b.name]} vote(s)`;document.getElementById('voteStatus').textContent=`Thank you! You voted for ${b.name}.`});characterGrid.appendChild(card)});

const reviewBook=document.getElementById('reviewBook');books.forEach(b=>reviewBook.insertAdjacentHTML('beforeend',`<option>${b.name}</option>`));const reviewList=document.getElementById('reviewList');function renderReviews(){const reviews=JSON.parse(localStorage.getItem('storyGardenReviews')||'[]');if(!reviews.length){reviewList.innerHTML='<p class="empty">Be the first visitor to leave a review on this device.</p>';return}reviewList.innerHTML=reviews.map(r=>`<article class="review-item"><div class="stars-display">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><strong>${escapeHtml(r.book)}</strong><p>“${escapeHtml(r.review)}”</p><small>— ${escapeHtml(r.name)}</small></article>`).join('')}
function escapeHtml(text){return String(text).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]))}
document.getElementById('reviewForm').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const reviews=JSON.parse(localStorage.getItem('storyGardenReviews')||'[]');reviews.unshift({name:data.get('name'),book:data.get('book'),rating:Number(data.get('rating')),review:data.get('review')});localStorage.setItem('storyGardenReviews',JSON.stringify(reviews.slice(0,20)));e.currentTarget.reset();renderReviews();closeModals();document.getElementById('community').scrollIntoView({behavior:'smooth'})});renderReviews();

function openMail(subject,name,email,message){const body=`Name: ${name}\nEmail: ${email}\n\n${message}`;window.location.href=`mailto:dollackj316@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
document.getElementById('messageForm').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);openMail(d.get('subject'),d.get('name'),d.get('email'),d.get('message'))});document.querySelectorAll('.email-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);openMail(form.dataset.subject,d.get('name'),d.get('email'),d.get('message'))}));
function preview(inputId,previewId){document.getElementById(inputId).addEventListener('change',e=>{const file=e.target.files[0];if(!file)return;const img=document.getElementById(previewId);img.src=URL.createObjectURL(file);img.classList.add('show')})}preview('photoInput','photoPreview');preview('artInput','artPreview');

// Large picture viewer. Clicking any website picture opens it at a larger size.
const imageViewer=document.createElement('div');
imageViewer.id='imageViewer';
imageViewer.className='image-viewer';
imageViewer.setAttribute('role','dialog');
imageViewer.setAttribute('aria-modal','true');
imageViewer.setAttribute('aria-label','Large picture view');
imageViewer.innerHTML='<button class="image-viewer-close" type="button" aria-label="Close large picture">×</button><img alt=""><p></p>';
document.body.appendChild(imageViewer);
function openImage(src,alt='Picture'){const img=imageViewer.querySelector('img');img.src=src;img.alt=alt;imageViewer.querySelector('p').textContent=alt;imageViewer.classList.add('open');document.body.classList.add('viewer-open')}
function closeImage(){imageViewer.classList.remove('open');document.body.classList.remove('viewer-open')}
imageViewer.addEventListener('click',e=>{if(e.target===imageViewer||e.target.closest('.image-viewer-close'))closeImage()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeImage()});
document.addEventListener('click',e=>{const img=e.target.closest('img');if(!img||img.closest('#imageViewer')||img.classList.contains('upload-preview')||img.closest('.cover-button'))return;e.preventDefault();e.stopPropagation();openImage(img.currentSrc||img.src,img.alt||'Picture')},true);
