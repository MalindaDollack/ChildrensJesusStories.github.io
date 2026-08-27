document.addEventListener('DOMContentLoaded', () => {
  const matchSection = document.querySelector('.story-match-section');
  if (!matchSection || document.getElementById('interactiveActivities')) return;

  const style = document.createElement('style');
  style.textContent = `
    #interactiveActivities{max-width:980px;margin:34px auto;padding:22px;border:4px solid #6b218a;border-radius:24px;background:#fff;text-align:center;box-shadow:0 8px 24px rgba(75,20,111,.12)}
    #interactiveActivities h3{margin:0 0 6px;color:#4b146f;font-family:"Baloo 2",sans-serif;font-size:clamp(1.8rem,4vw,2.5rem)}
    #interactiveActivities .ia-sub{font-weight:800;color:#6b218a;margin:0 0 16px}
    .ia-tabs{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:18px}
    .ia-tabs button,.ia-reset{border:0;border-radius:999px;background:#5b197d;color:#fff;font-weight:900;padding:11px 18px;cursor:pointer;font:inherit}
    .ia-tabs button.active{background:#a00078}
    .ia-panel{display:none}.ia-panel.active{display:block}
    .ia-card{border:2px solid #d9b3ee;border-radius:18px;padding:16px;background:#fcf9ff}
    .ia-note{font-weight:800;color:#4b146f;margin:8px 0 14px}
    .ws-wrap{display:grid;grid-template-columns:minmax(0,1fr) 230px;gap:18px;align-items:start}
    .ws-grid{display:grid;grid-template-columns:repeat(14,1fr);gap:2px;user-select:none;touch-action:none;border:3px solid #6b218a;background:#6b218a;padding:2px;border-radius:12px;overflow:hidden}
    .ws-cell{aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:#fff;color:#4b146f;font-weight:900;font-size:clamp(.72rem,2vw,1.15rem);cursor:pointer}
    .ws-cell.selecting{background:#f4c6f0}.ws-cell.found{background:#ffe47a;color:#3b2250}
    .ws-list{display:grid;grid-template-columns:1fr;gap:7px;text-align:left}
    .ws-word{padding:7px 10px;border-radius:10px;background:#f4ebfb;color:#4b146f;font-weight:900}.ws-word.found{text-decoration:line-through;background:#dff4df;color:#28622f}
    .sudoku-wrap{display:grid;grid-template-columns:minmax(0,1fr) 180px;gap:18px;align-items:start}
    .sudoku-grid{display:grid;grid-template-columns:repeat(9,1fr);border:3px solid #4b146f;background:#4b146f;gap:1px;max-width:620px;margin:auto}
    .sdk-cell{aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:#fff;color:#4b146f;font-weight:900;font-size:clamp(.9rem,2.4vw,1.35rem);border:0;min-width:0;cursor:pointer}
    .sdk-cell:nth-child(3n){border-right:2px solid #4b146f}.sdk-cell:nth-child(9n){border-right:0}
    .sdk-cell[data-row="2"],.sdk-cell[data-row="5"]{border-bottom:2px solid #4b146f}
    .sdk-cell.given{background:#eee7f4;cursor:default}.sdk-cell.wrong{background:#ffdede}.sdk-cell.correct{background:#e5f6e5}
    .sdk-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.sdk-pad button{min-height:48px;border:2px solid #6b218a;background:#fff;color:#4b146f;border-radius:10px;font-weight:900;font-size:1.1rem;cursor:pointer}.sdk-pad button:hover{background:#f5eafa}
    .maze-shell{max-width:720px;margin:auto}.maze-grid{display:grid;grid-template-columns:repeat(15,1fr);gap:2px;background:#4b146f;padding:3px;border-radius:18px;touch-action:none;user-select:none}
    .maze-cell{aspect-ratio:1;background:#fff;border-radius:3px}.maze-cell.wall{background:#4b146f}.maze-cell.path{background:#ffd8f4}.maze-cell.start{background:#bff0c2}.maze-cell.finish{background:#ffe27a}.maze-cell.visited{background:#f08dd5}
    .maze-labels{display:flex;justify-content:space-between;font-weight:900;color:#4b146f;margin:6px 4px 12px}
    .ia-message{min-height:28px;margin:12px 0 8px;font-weight:900;color:#a00078}
    @media(max-width:760px){.ws-wrap,.sudoku-wrap{grid-template-columns:1fr}.ws-list{grid-template-columns:repeat(2,minmax(0,1fr))}.sdk-pad{max-width:300px;margin:auto}.ia-card{padding:10px}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.id = 'interactiveActivities';
  section.innerHTML = `
    <h3>🎄 Sarah’s Interactive Bible Activities</h3>
    <p class="ia-sub">Play with a mouse, touchscreen, or tablet.</p>
    <div class="ia-tabs" role="tablist" aria-label="Interactive activities">
      <button type="button" class="active" data-panel="wordSearchPanel">Word Search</button>
      <button type="button" data-panel="sudokuPanel">Sudoku</button>
      <button type="button" data-panel="mazePanel">Maze</button>
    </div>
    <div id="wordSearchPanel" class="ia-panel active ia-card">
      <p class="ia-note">Click and drag in a straight line across a hidden word. Words may go forward, backward, down, or diagonally.</p>
      <div class="ws-wrap"><div id="wsGrid" class="ws-grid" aria-label="Interactive word search"></div><div id="wsList" class="ws-list"></div></div>
      <p id="wsMessage" class="ia-message" aria-live="polite"></p><button type="button" class="ia-reset" id="wsReset">New Word Search</button>
    </div>
    <div id="sudokuPanel" class="ia-panel ia-card">
      <p class="ia-note">Choose an empty square, then choose a number. Each row, column, and 3×3 box must contain 1–9.</p>
      <div class="sudoku-wrap"><div id="sudokuGrid" class="sudoku-grid" aria-label="Interactive Sudoku"></div><div><div id="sdkPad" class="sdk-pad"></div><p id="sdkMessage" class="ia-message" aria-live="polite"></p><button type="button" class="ia-reset" id="sdkReset">Start Sudoku Again</button></div></div>
    </div>
    <div id="mazePanel" class="ia-panel ia-card">
      <p class="ia-note">Start on the green square and drag through the open path to the gold FINISH square. Touching a wall resets the path.</p>
      <div class="maze-shell"><div class="maze-labels"><span>START</span><span>FINISH → Sarah</span></div><div id="mazeGrid" class="maze-grid" aria-label="Interactive maze"></div></div>
      <p id="mazeMessage" class="ia-message" aria-live="polite"></p><button type="button" class="ia-reset" id="mazeReset">Start Maze Again</button>
    </div>`;
  matchSection.insertAdjacentElement('afterend', section);

  section.querySelectorAll('.ia-tabs button').forEach(btn => btn.addEventListener('click', () => {
    section.querySelectorAll('.ia-tabs button').forEach(b => b.classList.toggle('active', b === btn));
    section.querySelectorAll('.ia-panel').forEach(p => p.classList.toggle('active', p.id === btn.dataset.panel));
  }));

  // WORD SEARCH
  const WORDS = ['ANGELS','BETHLEHEM','BIBLE','BIRTH','BROTHERS','FROG','JESUS','LOVE','MAMA','MANGER','MERRYCHRISTMAS','PAPA','SARAH','SHEEP','SHEPHERD','STAR'];
  const SIZE = 14;
  const DIRS = [[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,-1],[-1,1]];
  let wsGridData = [], wsFound = new Set(), wsStart = null, wsDragging = false, wsSelection = [];
  const wsGrid = document.getElementById('wsGrid'), wsList = document.getElementById('wsList'), wsMessage = document.getElementById('wsMessage');
  function buildWordSearch(){
    wsFound = new Set(); wsStart=null; wsDragging=false; wsSelection=[]; wsGridData=Array.from({length:SIZE},()=>Array(SIZE).fill(''));
    const words=[...WORDS].sort((a,b)=>b.length-a.length);
    for(const word of words){
      let placed=false;
      for(let tries=0;tries<800 && !placed;tries++){
        const [dr,dc]=DIRS[Math.floor(Math.random()*DIRS.length)]; const r=Math.floor(Math.random()*SIZE), c=Math.floor(Math.random()*SIZE);
        const er=r+dr*(word.length-1), ec=c+dc*(word.length-1); if(er<0||er>=SIZE||ec<0||ec>=SIZE) continue;
        let ok=true; for(let i=0;i<word.length;i++){const ch=wsGridData[r+dr*i][c+dc*i]; if(ch&&ch!==word[i]){ok=false;break;}}
        if(!ok) continue; for(let i=0;i<word.length;i++) wsGridData[r+dr*i][c+dc*i]=word[i]; placed=true;
      }
    }
    const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) if(!wsGridData[r][c]) wsGridData[r][c]=letters[Math.floor(Math.random()*26)];
    wsGrid.innerHTML=''; wsGridData.forEach((row,r)=>row.forEach((ch,c)=>{const d=document.createElement('div');d.className='ws-cell';d.textContent=ch;d.dataset.r=r;d.dataset.c=c;wsGrid.appendChild(d);}));
    wsList.innerHTML=WORDS.map(w=>`<div class="ws-word" data-word="${w}">${w==='MERRYCHRISTMAS'?'MERRY CHRISTMAS':w}</div>`).join(''); wsMessage.textContent='';
  }
  function getLine(r1,c1,r2,c2){const dr=Math.sign(r2-r1),dc=Math.sign(c2-c1),rd=Math.abs(r2-r1),cd=Math.abs(c2-c1);if(!(r1===r2||c1===c2||rd===cd))return[];const len=Math.max(rd,cd);const arr=[];for(let i=0;i<=len;i++)arr.push([r1+dr*i,c1+dc*i]);return arr;}
  function paintSelection(line){wsGrid.querySelectorAll('.selecting').forEach(x=>x.classList.remove('selecting'));line.forEach(([r,c])=>wsGrid.querySelector(`[data-r="${r}"][data-c="${c}"]`)?.classList.add('selecting'));wsSelection=line;}
  wsGrid.addEventListener('pointerdown',e=>{const cell=e.target.closest('.ws-cell');if(!cell)return;wsDragging=true;wsStart=[+cell.dataset.r,+cell.dataset.c];paintSelection([wsStart]);wsGrid.setPointerCapture?.(e.pointerId);e.preventDefault();});
  wsGrid.addEventListener('pointermove',e=>{if(!wsDragging||!wsStart)return;const el=document.elementFromPoint(e.clientX,e.clientY);const cell=el?.closest?.('.ws-cell');if(!cell||!wsGrid.contains(cell))return;paintSelection(getLine(wsStart[0],wsStart[1],+cell.dataset.r,+cell.dataset.c));});
  function finishWs(){if(!wsDragging)return;wsDragging=false;const text=wsSelection.map(([r,c])=>wsGridData[r][c]).join('');const rev=[...text].reverse().join('');const word=WORDS.find(w=>!wsFound.has(w)&&(w===text||w===rev));if(word){wsFound.add(word);wsSelection.forEach(([r,c])=>{const cell=wsGrid.querySelector(`[data-r="${r}"][data-c="${c}"]`);cell?.classList.add('found');cell?.classList.remove('selecting');});wsList.querySelector(`[data-word="${word}"]`)?.classList.add('found');wsMessage.textContent=`Great job! You found ${word==='MERRYCHRISTMAS'?'MERRY CHRISTMAS':word}!`;if(wsFound.size===WORDS.length)wsMessage.textContent='Wonderful! You found every word — JESUS LOVES YOU!';}else{wsGrid.querySelectorAll('.selecting').forEach(x=>x.classList.remove('selecting'));wsMessage.textContent=text.length>1?'Keep looking — try another word.':'';}wsSelection=[];}
  wsGrid.addEventListener('pointerup',finishWs);wsGrid.addEventListener('pointercancel',finishWs);document.getElementById('wsReset').addEventListener('click',buildWordSearch);buildWordSearch();

  // SUDOKU
  const puzzle=[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]];
  const solution=[[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]];
  const sudokuGrid=document.getElementById('sudokuGrid'),sdkPad=document.getElementById('sdkPad'),sdkMessage=document.getElementById('sdkMessage');let sdkSelected=null;
  function buildSudoku(){sdkSelected=null;sdkMessage.textContent='';sudokuGrid.innerHTML='';puzzle.forEach((row,r)=>row.forEach((v,c)=>{const b=document.createElement('button');b.type='button';b.className='sdk-cell'+(v?' given':'');b.dataset.row=r;b.dataset.col=c;b.textContent=v||'';if(!v)b.addEventListener('click',()=>{sudokuGrid.querySelectorAll('.sdk-cell').forEach(x=>x.style.outline='');sdkSelected=b;b.style.outline='3px solid #a00078';});sudokuGrid.appendChild(b);}));}
  sdkPad.innerHTML='';for(let n=1;n<=9;n++){const b=document.createElement('button');b.type='button';b.textContent=n;b.addEventListener('click',()=>{if(!sdkSelected){sdkMessage.textContent='Choose an empty square first.';return;}const r=+sdkSelected.dataset.row,c=+sdkSelected.dataset.col;sdkSelected.textContent=n;sdkSelected.classList.remove('wrong','correct');if(solution[r][c]===n){sdkSelected.classList.add('correct');sdkMessage.textContent='Correct!';const empties=[...sudokuGrid.querySelectorAll('.sdk-cell:not(.given)')];if(empties.every(x=>+x.textContent===solution[+x.dataset.row][+x.dataset.col]))sdkMessage.textContent='Excellent! You solved the Sudoku!';}else{sdkSelected.classList.add('wrong');sdkMessage.textContent='Not quite — try another number.';}});sdkPad.appendChild(b);}document.getElementById('sdkReset').addEventListener('click',buildSudoku);buildSudoku();

  // MAZE
  const maze=[
    '###############',
    '#S#.....#.....#',
    '#.#.###.#.###.#',
    '#.#...#.#...#.#',
    '#.###.#.###.#.#',
    '#.....#.....#.#',
    '#####.#####.#.#',
    '#.....#...#.#.#',
    '#.#####.#.#.#.#',
    '#.......#.#...#',
    '#.#######.###.#',
    '#.#.....#.....#',
    '#.#.###.#####.#',
    '#...#.........F',
    '###############'
  ];
  const mazeGrid=document.getElementById('mazeGrid'),mazeMessage=document.getElementById('mazeMessage');let mazeDragging=false,mazeLast=null,mazeWon=false;
  function buildMaze(){mazeDragging=false;mazeLast=null;mazeWon=false;mazeMessage.textContent='';mazeGrid.innerHTML='';maze.forEach((row,r)=>[...row].forEach((ch,c)=>{const d=document.createElement('div');d.className='maze-cell '+(ch==='#'?'wall':ch==='S'?'start':ch==='F'?'finish':'path');d.dataset.r=r;d.dataset.c=c;mazeGrid.appendChild(d);}));}
  function mazeCellAt(x,y){const el=document.elementFromPoint(x,y);const cell=el?.closest?.('.maze-cell');return cell&&mazeGrid.contains(cell)?cell:null;}
  function mazeStep(cell){if(!cell||mazeWon)return;if(cell.classList.contains('wall')){buildMaze();mazeMessage.textContent='Oops — you touched a wall. Start again at START.';return;}const r=+cell.dataset.r,c=+cell.dataset.c;if(!mazeLast){if(!cell.classList.contains('start'))return;mazeLast=[r,c];cell.classList.add('visited');return;}const dist=Math.abs(r-mazeLast[0])+Math.abs(c-mazeLast[1]);if(dist!==1)return;mazeLast=[r,c];cell.classList.add('visited');if(cell.classList.contains('finish')){mazeWon=true;mazeDragging=false;mazeMessage.textContent='You did it! Jesus found His way to Sarah! JESUS LOVES YOU!';}}
  mazeGrid.addEventListener('pointerdown',e=>{const cell=e.target.closest('.maze-cell');if(!cell)return;mazeDragging=true;mazeStep(cell);mazeGrid.setPointerCapture?.(e.pointerId);e.preventDefault();});
  mazeGrid.addEventListener('pointermove',e=>{if(!mazeDragging)return;mazeStep(mazeCellAt(e.clientX,e.clientY));});mazeGrid.addEventListener('pointerup',()=>mazeDragging=false);mazeGrid.addEventListener('pointercancel',()=>mazeDragging=false);document.getElementById('mazeReset').addEventListener('click',buildMaze);buildMaze();
});