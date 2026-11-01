/*
 * CCE Prelims Tracker — Symmetry visuals and repairs
 * Split from the original index.html; logic/data retained.
 * Load order is controlled by index.html. Do not add async/defer or reorder without testing.
 */
/* Symmetry visual repair v3 — append AFTER cce-pdf-topics-addon-v2. */
(function(){
 const IMG={
    33:"img/87e295e475a3.webp",
    34:"img/ed3765df4add.webp",
    35:"img/43ae776507bb.webp",
    36:"img/075f8879ee3c.webp",
    37:"img/112bd40764ad.webp",
    38:"img/6ada1f8a74ea.webp",
    39:"img/1e2cdfeacc85.webp",
    40:"img/f0c43915ab1a.webp",
    41:"img/cda57e7096bc.webp",
    42:"img/aa77da640ae7.webp",
    43:"img/4a7094b57842.webp",
    44:"img/71fd2c85acf9.webp",
    45:"img/926cfcffa79a.webp",
    46:"img/77b24d30e2ce.webp",
    47:"img/8e6a3a3d4f9b.webp",
    48:"img/881154594ef2.webp",
    49:"img/045a9aeebea5.webp",
    50:"img/331c2fb44821.webp",
    51:"img/130008502e93.webp",
    52:"img/25f6a2dba7c4.webp",
    53:"img/7da8bf22cc0a.webp",
    54:"img/1e918e3782e7.webp",
    55:"img/c7b487030c66.webp"
 };
 const escHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const svg=(body,label='સંમિતિની આકૃતિ')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 210" role="img" aria-label="${label}" style="display:block;width:100%;max-width:520px;height:auto;margin:8px auto;background:#fff;border-radius:10px"><rect x="1" y="1" width="358" height="208" rx="10" fill="#fff" stroke="#d7deea"/>${body}</svg>`;
 const line=(x1,y1,x2,y2,color='#e11d48',dash='6 5',w=3)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-dasharray="${dash}" stroke-linecap="round"/>`;
 const shapeSVG=p=>{
  const base='#243b53', fill='#dbeafe';
  const tri=(pts)=>`<polygon points="${pts}" fill="${fill}" stroke="${base}" stroke-width="3" stroke-linejoin="round"/>`;
  if(p===13)return svg(`${tri('180,35 85,175 275,175')}`+line(180,35,180,175),'વિષમબાજુ ત્રિકોણ — સંમિતિ રેખા નથી');
  if(p===14)return svg(`${tri('180,30 85,175 275,175')}${line(180,30,180,175)}`,'સમદ્વિબાજુ ત્રિકોણ — એક સંમિતિ રેખા');
  if(p===15)return svg(`${tri('180,28 85,175 275,175')}${line(180,28,180,175)}${line(85,175,227,101)}${line(275,175,133,101)}`,'સમબાજુ ત્રિકોણ — ત્રણ સંમિતિ રેખા');
  if(p===16)return svg(`<rect x="100" y="35" width="160" height="140" fill="${fill}" stroke="${base}" stroke-width="3"/>${line(180,30,180,180)}${line(95,105,265,105)}${line(100,35,260,175)}${line(260,35,100,175)}`,'ચોરસ — ચાર સંમિતિ રેખા');
  if(p===17)return svg(`<rect x="75" y="55" width="210" height="100" fill="${fill}" stroke="${base}" stroke-width="3"/>${line(180,45,180,165)}${line(65,105,295,105)}`,'લંબચોરસ — બે સંમિતિ રેખા');
  if(p===18)return svg(`<polygon points="180,30 270,105 180,180 110,105" fill="${fill}" stroke="${base}" stroke-width="3"/>${line(180,25,180,185)}`,'પતંગ આકાર — સામાન્ય રીતે એક સંમિતિ રેખા');
  if(p===19)return svg(`<circle cx="180" cy="105" r="72" fill="${fill}" stroke="${base}" stroke-width="3"/>${line(95,105,265,105)}${line(180,20,180,190)}${line(120,45,240,165)}${line(240,45,120,165)}`,'વર્તુળ — અનંત સંમિતિ રેખાઓ');
  if(p===20)return svg(`<polygon points="180,30 270,105 180,180 90,105" fill="${fill}" stroke="${base}" stroke-width="3"/>${line(180,30,180,180)}${line(90,105,270,105)}`,'સમચતુર્ભુજ — બે કર્ણ સંમિતિ રેખા');
  if(p===21)return svg(`<polygon points="100,60 275,60 250,150 75,150" fill="${fill}" stroke="${base}" stroke-width="3"/>`,'સમાંતરબાજુ ચતુષ્કોણ — સામાન્ય રીતે સંમિતિ રેખા નથી');
  if(p===22)return svg(`<polygon points="100,45 260,65 285,155 80,170" fill="${fill}" stroke="${base}" stroke-width="3"/>`,'અનિયમિત ચતુષ્કોણ');
  if(p===23)return svg(`<polygon points="180,25 260,83 230,170 130,170 100,83" fill="${fill}" stroke="${base}" stroke-width="3"/>${[0,1,2,3,4].map(i=>line(180,105,180+85*Math.sin(i*2*Math.PI/5),105-85*Math.cos(i*2*Math.PI/5))).join('')}`,'નિયમિત પંચકોણ');
  if(p===24)return svg(`<polygon points="180,25 250,65 250,145 180,185 110,145 110,65" fill="${fill}" stroke="${base}" stroke-width="3"/>${[0,1,2].map(i=>line(180,105,180+90*Math.cos(i*Math.PI/3),105+90*Math.sin(i*Math.PI/3))).join('')}${[0,1,2].map(i=>line(180,105,180-90*Math.cos(i*Math.PI/3),105-90*Math.sin(i*Math.PI/3))).join('')}`,'નિયમિત ષટ્કોણ');
  if(p===25)return svg(`<polygon points="110,40 235,35 285,90 250,165 125,175 75,100" fill="${fill}" stroke="${base}" stroke-width="3"/>`,'અનિયમિત ષટ્કોણ');
  return '';
 };
 const getPage=q=>{const m=String(q.q||'').match(/PDF પેજ\s*(\d+)/);return m?+m[1]:null};
 const mkSolution=(q,p,imgHTML)=>{
  const ans=String(q.o?.[q.a]??''); const expl=String(q.e||'').replace(/^ઉકેલ:\s*/,'');
  let concept='',steps=[];
  if(p>=13&&p<=25){
   concept='રેખીય સંમિતિ એટલે એવી રેખા કે જેના બંને બાજુના ભાગો અરીસામાં દેખાતા પ્રતિબિંબની જેમ સરખા હોય. માત્ર બહારનો આકાર નહીં, અંદરની રેખા/બિંદુ/રંગ પણ સરખી સ્થિતિમાં હોવા જોઈએ.';
   const bank={13:['ત્રિકોણની ત્રણેય બાજુ અને ખૂણા જુદા છે. કોઈ રેખા પર વાળતાં બંને ભાગો સંપૂર્ણ રીતે મેળ ખાતા નથી.','એટલે સંમિતિ રેખાઓની સંખ્યા 0 છે.'],14:['બે બાજુ સરખી હોવાથી શિખરથી આધારના મધ્યબિંદુ સુધીની રેખા બંને ભાગોને મેળવે છે.','અન્ય દિશામાં વાળતાં ભાગો મેળ ખાતા નથી; તેથી 1 રેખા.'],15:['ત્રણેય બાજુ સરખી છે. દરેક શિખરથી સામેની બાજુના મધ્યબિંદુ સુધી એક સંમિતિ રેખા મળે છે.','કુલ 3 સંમિતિ રેખા.'],16:['ચોરસમાં મધ્યમાંથી ઊભી અને આડી બે રેખા છે.','બંને કર્ણો પણ ચોરસને બે સમાન પ્રતિબિંબ ભાગોમાં વહેંચે છે. કુલ 4.'],17:['લંબચોરસની ઊભી અને આડી મધ્યરેખા જ બે ભાગોને મેળવે છે.','કર્ણો સંમિતિ રેખા નથી (ચોરસ સિવાયના સામાન્ય લંબચોરસમાં). કુલ 2.'],18:['પતંગના આકારમાં લાંબી કર્ણ/મુખ્ય મધ્યરેખાની બંને બાજુના ભાગો મેળ ખાતા હોય છે.','બીજી દિશામાં ભાગો મેળ ખાતા નથી. સામાન્ય પતંગ માટે 1 રેખા.'],19:['વર્તુળમાં કેન્દ્રમાંથી પસાર થતી દરેક સીધી રેખા વ્યાસ બને છે.','દરેક વ્યાસ વર્તુળને બે સરખા અર્ધવર્તુળમાં વહેંચે છે. આવી રેખાઓ અનંત છે.'],20:['સમચતુર્ભુજમાં બંને કર્ણો આકારને બે પ્રતિબિંબ-સમાન ભાગોમાં વહેંચે છે.','સામાન્ય સમચતુર્ભુજમાં કુલ 2 સંમિતિ રેખા.'],21:['સામાન્ય સમાંતરબાજુ ચતુષ્કોણને કોઈ સીધી રેખા પર વાળતાં બંને ભાગો સરખા પડતા નથી.','વિરુદ્ધ બાજુઓ સમાંતર હોવું પૂરતું નથી. તેથી 0 રેખા.'],22:['સામાન્ય અનિયમિત ચતુષ્કોણમાં બાજુઓ/ખૂણાઓનો મેળ મળતો નથી.','આકૃતિમાં ખાસ સમાનતા ન હોય તો સંમિતિ રેખા 0.'],23:['નિયમિત પંચકોણની બધી બાજુઓ અને ખૂણાઓ સરખા હોય છે.','દરેક શિખરથી સામેની બાજુના મધ્ય તરફ એક રેખા મળે છે. કુલ 5.'],24:['નિયમિત ષટ્કોણમાં 3 રેખાઓ સામસામેના શિખરોમાંથી અને 3 સામસામેની બાજુઓના મધ્યમાંથી પસાર થાય છે.','કુલ 6 સંમિતિ રેખા.'],25:['અનિયમિત આકારમાં બાજુઓ/ખૂણાઓ સરખા હોવાની ખાતરી નથી.','આકૃતિને મધ્યરેખા પર કલ્પનાથી વાળો; કોઈ પણ દિશામાં બંને બાજુ મેળ ન ખાતી હોય તો 0.']};
   steps=bank[p]||[expl];
  } else if(p>=26&&p<=32){
   concept='અંગ્રેજી અક્ષરોની સંમિતિ નક્કી કરતી વખતે પ્રશ્નમાં દર્શાવેલા CAPITAL LETTER/font ને જ આધાર બનાવો. જુદા fontમાં A, M, H, O જેવા અક્ષરોનું આકાર બદલાઈ શકે છે.';
   steps=['ઊભી અરીસા રેખા માટે અક્ષરની ડાબી અને જમણી બાજુ મેળવો.','આડી/પાણી પ્રતિબિંબ માટે ઉપર અને નીચેનો ભાગ મેળવો.','અક્ષર 180° ફેરવતાં જ સરખો દેખાય તે પરિભ્રમણીય સંમિતિ છે; આ અરીસા સંમિતિથી અલગ છે.',expl];
  } else if(p>=33&&p<=46){
   concept='આ આકૃતિમાં સંમિતિ રેખા શોધવા માટે દરેક રેખા પર આકૃતિને કલ્પનાથી વાળો. રેખાની બંને બાજુના દરેક ખૂણા, વળાંક અને બિંદુએ સમાન અંતરે પ્રતિબિંબ હોવું જોઈએ.';
   steps=['પ્રથમ બહારની બાઉન્ડરી જુઓ: આકારનો ડાબો ભાગ જમણા ભાગ સાથે મેળ ખાય છે કે નહીં તે તપાસો.','પછી અંદરના બધા બિંદુઓ/વર્તુળો/રેખાઓ તપાસો. એક પણ નિશાન મેળ ન ખાય તો તે રેખા માન્ય નથી.','ચિત્રમાં દર્શાવેલી લાલ રેખાઓ સંભવિત અક્ષો બતાવે છે; દરેક અક્ષ બંને ભાગોને મેળવે છે કે નહીં તે તપાસો.','કુલ માન્ય રેખાઓ ગણો અને વિકલ્પ સાથે સરખાવો.',expl];
  } else if(p>=47&&p<=54){
   concept='પરિભ્રમણીય સંમિતિમાં આકૃતિને કેન્દ્રની આસપાસ ફેરવીએ છીએ. 360° પૂર્ણ થાય તે પહેલાં જેટલી વાર આકૃતિ મૂળ જેવી દેખાય, તે ક્રમ (order) છે.';
   steps=['કેન્દ્ર અથવા ફરવાનો બિંદુ ઓળખો.','સૌથી નાનો ખૂણો θ શોધો જેમાં આકૃતિ ફરી મૂળ જેવી દેખાય.','સૂત્ર: ક્રમ = 360° ÷ θ. ઉદાહરણ: 90° પર ફરી મેળ મળે તો 360° ÷ 90° = 4.','ચિત્રમાં દર્શાવેલી ખૂણાની ગણતરી/વારંવાર દેખાતી સ્થિતિઓ તપાસો.',expl];
  } else {
   concept='અંક માટે પણ બહારનો આકાર અને અંદરના નિશાન બંને તપાસવાના છે. અરીસા સંમિતિ અને પરિભ્રમણીય સંમિતિ બે અલગ ગુણધર્મ છે.';
   steps=['અરીસાની રેખા પર બે ભાગ સરખા પડે છે કે નહીં તે તપાસો.','પછી 180° ફેરવતાં અંક મૂળ જેવો દેખાય છે કે નહીં તે અલગથી તપાસો.','બંને શરતો સાચી હોય ત્યારે જ બંને પ્રકારની સંમિતિ ધરાવતા અંકમાં ગણો.',expl];
  }
  const imgCard=imgHTML?`<div class="sym-visual"><div class="sym-visual-title">🔎 આકૃતિને ધ્યાનથી જુઓ</div>${imgHTML}<p>ચિત્રમાં આકારની બાઉન્ડરી અને અંદરના નિશાનો બંને તપાસો. અરીસા/ફેરવવાની રેખા બંને બાજુ સમાનતા સાબિત કરે ત્યારે જ તેને માન્ય ગણવી.</p></div>`:'';
  return `<div class="sym-solution"><div class="sym-concept"><b>🧠 મૂળ Concept</b><p>${escHTML(concept)}</p></div>${imgCard}<div class="sym-steps"><h4>🪜 પગલુંવાર ઉકેલ</h4>${steps.map((x,i)=>`<div class="sym-step"><span>${i+1}</span><div>${escHTML(x)}</div></div>`).join('')}</div><div class="sym-answer"><small>સાચો વિકલ્પ</small><strong>${String.fromCharCode(65+(Number(q.a)||0))} · ${escHTML(ans)}</strong><p>મૂળ PDFમાં દર્શાવેલા જવાબ/સમજૂતી સાથે અંતિમ જવાબ મેળવો.</p></div><div class="sym-check"><b>✅ સ્વ-ચકાસણી</b><p>જો આકૃતિમાં અંદરનું બિંદુ, રેખા અથવા રંગ બદલાઈ જાય તો તે સમમિત નથી. ફક્ત બહારનો આકાર સરખો હોવો પૂરતો નથી.</p></div></div>`;
 };
 function apply(){
  if(typeof PYQ==='undefined'||typeof NOTES==='undefined')return false;
  const qs=PYQ.r15||[];
  qs.filter(q=>q&&q.symmetryPdfSource).forEach(q=>{
   const p=getPage(q); if(!p)return;
   let image='';
   if(IMG[p]){image=`<img class="sym-pdf-figure" src="${IMG[p]}" alt="સંમિતિ PDF પેજ ${p} ની સ્પષ્ટ આકૃતિ" loading="lazy">`;q.v=image;}
   else if(p>=13&&p<=25){const s=shapeSVG(p);if(s){q.v=s;image=s;}}
   else if(q.v && String(q.v).includes('<img')){q.v='';}
   q.h=mkSolution(q,p,image);
   q.e=`સંમિતિ · PDF પેજ ${p}. ${String(q.e||'').replace(/^ઉકેલ:\s*/,'')}`;
  });
  NOTES.r15=NOTES.r15||[];
  if(!NOTES.r15.some(n=>Array.isArray(n)&&n[0]==='સંમિતિ — Concept Masterclass v3')){
   NOTES.r15.push(['સંમિતિ — Concept Masterclass v3',[
    'સંમિતિ (Symmetry) એટલે આકૃતિને કોઈ રેખા પર વાળતાં અથવા નિર્ધારિત ખૂણે ફેરવતાં તેના ભાગો નિયમસર મેળ ખાય. પ્રશ્નમાં બહારનો આકાર અને અંદરના નિશાન બંને મહત્વના છે.',
    'રેખીય/અરીસા સંમિતિ: રેખાને અક્ષ માનીએ. અક્ષની એક બાજુનો દરેક બિંદુ બીજી બાજુના અનુરૂપ બિંદુથી સમાન લંબ અંતરે હોવો જોઈએ. બંને ભાગો સંપૂર્ણ રીતે ઢંકાય તો જ રેખા માન્ય.',
    'સંમિતિ રેખા ગણવાની રીત: (1) આકારનો મધ્ય/સંભવિત અક્ષ શોધો. (2) કલ્પનાથી વાળો. (3) ખૂણા, વળાંક, બિંદુ, અંદરની રેખા અને રંગ મેળવો. (4) મેળ ખાતી બધી અલગ રેખાઓ જ ગણો.',
    'મહત્વના આકારો: વિષમબાજુ ત્રિકોણ = 0; સમદ્વિબાજુ ત્રિકોણ = 1; સમબાજુ ત્રિકોણ = 3; સામાન્ય લંબચોરસ = 2; ચોરસ = 4; સામાન્ય સમચતુર્ભુજ = 2; સામાન્ય સમાંતરબાજુ ચતુષ્કોણ = 0; વર્તુળ = અનંત.',
    'નિયમિત બહુકોણમાં બાજુઓની સંખ્યા n હોય તો રેખીય સંમિતિની સંખ્યા પણ n હોય છે. આ નિયમ માત્ર નિયમિત આકાર માટે છે: બધા બાજુ અને બધા ખૂણા સમાન હોવા જોઈએ.',
    'પતંગ આકારમાં સામાન્ય રીતે એક સંમિતિ રેખા હોય છે. અનિયમિત ચતુષ્કોણ/ષટ્કોણમાં આપમેળે સંમિતિ માની ન લેવી; આકૃતિ ખરેખર વાળીને મેળ ખાય છે કે નહીં તે તપાસવું.',
    'વર્તુળમાં અનંત સંમિતિ રેખા છે, કારણ કે કેન્દ્રમાંથી પસાર થતી દરેક વ્યાસરેખા બે સરખા અર્ધવર્તુળ બનાવે છે.',
    'અંગ્રેજી CAPITAL LETTERS: અરીસા સંમિતિ (mirror/vertical), પાણી પ્રતિબિંબ (horizontal) અને પરિભ્રમણીય સંમિતિ અલગ છે. અક્ષરનો font બદલાય તો પરિણામ બદલાઈ શકે; પ્રશ્નમાં દર્શાવેલી શૈલી જ લો.',
    'પરિભ્રમણીય સંમિતિનો ક્રમ = 360° ÷ સૌથી નાનો ખૂણો જેમાં આકૃતિ ફરી મૂળ જેવી દેખાય. 180° → ક્રમ 2; 120° → 3; 90° → 4; 72° → 5; 60° → 6.',
    'પરિભ્રમણીય સંમિતિમાં 360° પર મૂળ સ્થિતિ આવવી હંમેશા શક્ય છે, પરંતુ ક્રમ શોધતી વખતે સૌથી નાનો ધન ખૂણો લો. જો 90° પર ફરી મેળ મળે તો 180° અને 270° પણ મેળ ખાશે, પરંતુ ક્રમ 4 ગણાશે.',
    'પ્રશ્નમાં અંદર બિંદુઓ હોય તો માત્ર બહારની આકૃતિ ન જુઓ. ઉદાહરણ તરીકે વર્તુળની બહારની બાઉન્ડરી અનંત સમમિત છે, પરંતુ ત્રણ બિંદુઓની અસમાન ગોઠવણી તેની સંમિતિ ઘટાડી શકે છે.',
    'ઝડપી પરીક્ષા ચેક: રેખીય સંમિતિ = “વાળતાં મેળ?”; પરિભ્રમણીય સંમિતિ = “ફેરવતાં મેળ?”; Mirror = ડાબે-જમણે ઉલટું; Water reflection = ઉપર-નીચે ઉલટું.',
    'PDF-આધારિત નોંધ: કેટલાક સ્લાઇડમાં મૂળ પ્રશ્નની આકૃતિ સ્પષ્ટ રીતે દર્શાવેલી નથી અથવા ચિહ્નિત જવાબ/લાલ ઉકેલ-રેખા દેખાય છે. જ્યાં ચિત્ર ઉપલબ્ધ છે ત્યાં તે PDFમાંથી ઊંચી ગુણવત્તામાં crop કરેલું છે; જ્યાં આકૃતિ ગાયબ છે ત્યાં સમજ માટે સ્વચ્છ schematic બનાવ્યું છે.'
   ]]);
  }
  if(!document.getElementById('symmetry-visual-repair-v3-style')){
   const st=document.createElement('style');st.id='symmetry-visual-repair-v3-style';st.textContent=`
    .vis{display:flex;align-items:center;justify-content:center;overflow:hidden;min-width:0;box-sizing:border-box}
    .vis .sym-pdf-figure{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:58vh!important;object-fit:contain!important;margin:8px auto!important;padding:8px;background:#fff;border:1px solid #d9e2ef;border-radius:12px;box-sizing:border-box}
    .sym-solution{display:grid;gap:12px;line-height:1.75;color:inherit}
    .sym-concept,.sym-visual,.sym-steps,.sym-answer,.sym-check{padding:13px 15px;border:1px solid var(--bd,rgba(130,145,170,.25));border-radius:14px;background:rgba(120,140,170,.055);min-width:0}
    .sym-concept p,.sym-visual p,.sym-answer p,.sym-check p{margin:6px 0 0;line-height:1.75}
    .sym-visual-title{font-weight:750;margin-bottom:8px}
    .sym-visual svg,.sym-visual img{display:block;width:auto!important;height:auto!important;max-width:100%!important;max-height:50vh!important;object-fit:contain!important;margin:8px auto;background:#fff;border-radius:10px}
    .sym-steps h4{margin:0 0 10px}
    .sym-step{display:grid;grid-template-columns:28px minmax(0,1fr);gap:10px;align-items:start;padding:9px 0;border-bottom:1px solid var(--bd,rgba(130,145,170,.2))}
    .sym-step:last-child{border-bottom:0}
    .sym-step span{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;font-size:12px;font-weight:800;background:rgba(59,130,246,.14);color:#60a5fa}
    .sym-answer{border-color:rgba(34,197,94,.35);background:rgba(34,197,94,.07)}
    .sym-answer small{display:block;opacity:.75}.sym-answer strong{display:block;font-size:1.08rem;margin-top:3px}
    @media(max-width:640px){.sym-concept,.sym-visual,.sym-steps,.sym-answer,.sym-check{padding:11px}.vis .sym-pdf-figure{max-height:48vh!important}}
   `;document.head.appendChild(st);
  }
  try{delete BC.r15;}catch(e){}
  try{if(typeof R==='function')R();}catch(e){console.error('Symmetry refresh error',e)}
  console.info('Symmetry visual repair v3: images and detailed solutions applied to',qs.filter(q=>q&&q.symmetryPdfSource).length,'questions.');
  return true;
 }
 let tries=0;function init(){if(apply())return;if(tries++<150)setTimeout(init,100);else console.error('Symmetry repair: PYQ/NOTES not found. Add after v2 add-on.');}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

