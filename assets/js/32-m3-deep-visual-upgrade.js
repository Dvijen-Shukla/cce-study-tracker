/* m3 deep teaching upgrade: question-specific worked layouts + expanded Gujarati notes.
   Load after all topic/question-bank scripts. No external images; diagrams are built from the actual question. */
(function(){
'use strict';
const root=window, banks=root.PYQ||{}, notes=root.NOTES||(root.NOTES={});
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const card=(title,body,tag='CONCEPT MAP')=>`<section style="border:1px solid var(--bd,#dce3ef);border-radius:15px;overflow:hidden;margin:12px 0;background:var(--card,#fff);color:var(--tx,#172033)"><header style="padding:10px 13px;background:linear-gradient(110deg,rgba(99,102,241,.12),rgba(20,184,166,.08));border-bottom:1px solid var(--bd,#dce3ef);display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap"><b style="font-size:14px">${esc(title)}</b><span style="font-size:9px;letter-spacing:.8px;font-weight:900;opacity:.65">${esc(tag)}</span></header><div style="padding:12px">${body}</div></section>`;
const box=(label,value,accent='#4f46e5')=>`<div style="min-width:0;flex:1;padding:10px;border:1px solid var(--bd,#dce3ef);border-top:3px solid ${accent};border-radius:10px;background:rgba(148,163,184,.07)"><div style="font-size:10px;opacity:.72;margin-bottom:5px">${esc(label)}</div><b style="font-size:15px;line-height:1.5;overflow-wrap:anywhere">${esc(value)}</b></div>`;
const flow=items=>`<div style="display:flex;align-items:stretch;gap:7px;flex-wrap:wrap">${items.map((x,i)=>`${i?'<div style="align-self:center;font-weight:900;opacity:.6">→</div>':''}${box(x[0],x[1],x[2])}`).join('')}</div>`;
const steps=q=>{let s=Array.isArray(q.sv)?q.sv:[];if(!s.length)s=String(q.e||'').split(/\n+/).filter(Boolean);return s.map(x=>String(x).trim()).filter(Boolean)};
const txt=q=>`${q.t||''} ${q.q||''} ${q.e||''} ${steps(q).join(' ')}`.toLowerCase();
const nums=q=>[...String(`${q.q||''} ${q.e||''}`).matchAll(/₹\s*[\d,]+(?:\.\d+)?|\b\d+(?:,\d{3})*(?:\.\d+)?%?|\b\d+\s*:\s*\d+(?:\s*:\s*\d+)?/g)].map(m=>m[0].trim());
function pctVisual(q,t,s){
 const n=nums(q).filter(x=>/^\d/.test(x)), increase=/વધારો|વધે|વધાર|increase|increased/.test(t), decrease=/ઘટાડ|ઘટે|ઓછો|ઓછી|decrease|discount|છૂટ/.test(t), successive=/ક્રમિક|ક્રમશઃ|પછી|successive|બે વખત|વધારો અને ઘટાડો|discount/.test(t), vote=/ચૂંટણી|મતદાન|મતદાર|વોટ|candidate|votes/.test(t), fraction=/અપૂર્ણાંક|fraction/.test(t), base=n[0]||'N', rate=(t.match(/\d+(?:\.\d+)?\s*%/)||[])[0]||'r%';
 if(vote) return card('મતદાન પ્રશ્ન · કુલ મતમાંથી હિસ્સો',flow([['કુલ મત','100%','#6366f1'],['માન્ય મત','કુલ − અમાન્ય','#0d9488'],['જીતનો તફાવત','વિજેતા − હારનાર','#d97706']])+`<p style="line-height:1.7;margin:10px 0 0">પહેલાં કુલ મત, અમાન્ય મત અને માન્ય મત વચ્ચેનો સંબંધ લખો. પછી જીતનું માર્જિન/ટકાવારી કયા કુલના આધારે પૂછ્યું છે તે નક્કી કરો.</p>`,'QUESTION MODEL');
 if(successive) return card('ક્રમિક ફેરફાર · દરેક વખતે નવો આધાર',`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:8px">${box('શરૂઆત','100%','#64748b')}${box('પહેલો ફેરફાર',increase?`× (100 + ${rate})/100`:`× (100 − ${rate})/100`,'#d97706')}${box('બીજો ફેરફાર','પહેલી અસર પછીની કિંમત પર લાગુ','#0d9488')}</div><div style="margin-top:10px;padding:10px;border-radius:9px;background:rgba(99,102,241,.09);line-height:1.7"><b>મુખ્ય વિચાર:</b> બંને ટકા સીધા ઉમેરવા/બાદ કરવા નહીં. Factorથી ગણો: નવી કિંમત = મૂળ કિંમત × પહેલો factor × બીજો factor.</div>`,'STEP MODEL');
 if(fraction) return card('અપૂર્ણાંક ↔ ટકાવારી',flow([['અપૂર્ણાંક','a / b','#6366f1'],['100 વડે ગુણો','(a ÷ b) × 100','#0d9488'],['ટકાવારી','% માં જવાબ','#d97706']])+`<p style="margin:10px 0 0;line-height:1.7">ઝડપી રૂપાંતરણ: 1/2 = 50%, 1/4 = 25%, 1/5 = 20%, 1/8 = 12.5%. પહેલાં અપૂર્ણાંક સરળ કરવાથી ગણતરી ટૂંકી બને છે.</p>`);
 if(increase||decrease) return card(increase?'વધારો · જૂની કિંમતથી નવી કિંમત':'ઘટાડો · જૂની કિંમતથી નવી કિંમત',flow([['મૂળ કિંમત','100%','#64748b'],[increase?'વધારો ઉમેરો':'ઘટાડો બાદ કરો',rate,'#d97706'],['નવી કિંમત',increase?`100% + ${rate}`:`100% − ${rate}`,'#0d9488']])+`<div style="margin-top:10px;padding:10px;border-radius:9px;background:rgba(13,148,136,.09);line-height:1.7"><b>સૂત્ર:</b> નવી કિંમત = મૂળ કિંમત × ${increase?'(100 + r)':'(100 − r)'}/100.<br/>ટકાવારી વધારો/ઘટાડો પૂછ્યો હોય તો પહેલાં તફાવત કાઢો, પછી તેને મૂળ કિંમતથી ભાગો.</div>`,'BEFORE → AFTER');
 return card('ટકાવારી · કુલને 100 સમાન ભાગ માનો',`<div style="display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:3px">${Array.from({length:100},(_,i)=>`<span style="aspect-ratio:1;border-radius:2px;background:${i<25?'#6366f1':'rgba(148,163,184,.20)'}"></span>`).join('')}</div><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:9px;font-size:12px"><b>100 નાના ભાગ = 100%</b><b>25 રંગેલા ભાગ = 25% = 1/4</b></div><p style="line-height:1.7;margin:9px 0 0">કોઈ સંખ્યાના x% માટે: <b>કુલ × x/100</b>. શક્ય હોય તો ટકા અપૂર્ણાંકમાં ફેરવો; જેમ કે 25% એટલે ચોથો ભાગ.</p>`,'BASE-100 MODEL');
}
function partnerVisual(q,t,s){
 const timeline=/મહિના|વર્ષ|પછી જોડ|જોડાય|ઉપાડ|ઉમેર|મૂડી બદલે|બાકી સમય/.test(t), numsFound=nums(q).filter(x=>/^\d/.test(x)), ratios=numsFound.filter(x=>x.includes(':'));
 if(timeline) return card('ભાગીદારી · મૂડી × સમયની સમયરેખા',`<div style="display:grid;gap:8px">${s.filter(x=>/મહિના|વર્ષ|મૂડી|રોકાણ|વજન|×/.test(x)).slice(0,5).map((x,i)=>`<div style="display:grid;grid-template-columns:30px minmax(0,1fr);gap:8px;align-items:start"><span style="display:grid;place-items:center;width:27px;height:27px;border-radius:8px;background:${['#e0e7ff','#ccfbf1','#fef3c7','#fce7f3','#dbeafe'][i%5]};font-weight:900">${i+1}</span><div style="padding:8px 10px;border-radius:9px;background:rgba(148,163,184,.08);line-height:1.65">${esc(x)}</div></div>`).join('')||`<div style="line-height:1.7">દરેક ભાગીદાર માટે <b>મૂડી × ધંધામાં રહેલા મહિના</b> ગણો. મૂડી બદલાય તો દરેક સમયખંડ અલગ ગણો અને વજન ઉમેરો.</div>`}</div><div style="margin-top:10px;padding:10px;border-radius:9px;background:rgba(13,148,136,.10);line-height:1.7"><b>Visual rule:</b> સમયગાળો જુદો હોય તો માત્ર મૂડીની સરખામણી ન કરવી. નફાનો ગુણોત્તર = કુલ મૂડી-સમય વજનનો ગુણોત્તર.</div>`,'CAPITAL × TIME');
 const rline=s.find(x=>/ગુણોત્તર|ભાગ|નફો/.test(x))||s[0]||'નફો મૂડીના ગુણોત્તર પ્રમાણે વહેંચો.';
 return card('ભાગીદારી · નફો ભાગોમાં વહેંચો',flow([['પગલું 1','દરેકનું મૂડી × સમય','#6366f1'],['પગલું 2','વજનનો ગુણોત્તર સરળ કરો','#0d9488'],['પગલું 3','કુલ નફો ÷ કુલ ભાગ','#d97706']])+`<div style="margin-top:10px;padding:10px;border-radius:9px;background:rgba(99,102,241,.08);line-height:1.7">${esc(rline)}</div><p style="font-size:12px;line-height:1.65;margin:9px 0 0">જો બધાનો સમય સમાન હોય તો મૂડીનો ગુણોત્તર જ નફાનો ગુણોત્તર બને છે. સમય જુદો હોય તો મૂડી × સમય લો.</p>`,'PROFIT SHARING');
}
function build(q,i){const t=txt(q),s=steps(q),isPartner=/ભાગીદાર|ભાગીદારી|રોકાણ|મૂડી|નફાનો ગુણોત્તર|partner|capital|investment/.test(t);const answer=Array.isArray(q.o)&&q.o[q.a]!==undefined?q.o[q.a]:'';const visual=isPartner?partnerVisual(q,t,s):pctVisual(q,t,s);const sh=s.map((x,j)=>`<div style="display:grid;grid-template-columns:29px minmax(0,1fr);gap:9px;padding:10px 0;border-bottom:${j===s.length-1?'0':'1px solid var(--bd,#e2e8f0)'}"><span style="display:grid;place-items:center;width:27px;height:27px;border-radius:8px;background:${j===s.length-1?'rgba(16,185,129,.16)':'rgba(99,102,241,.12)'};font-weight:900;font-size:11px;color:${j===s.length-1?'#059669':'#6366f1'}">${String(j+1).padStart(2,'0')}</span><div style="font-size:14px;line-height:1.8;white-space:pre-wrap;overflow-wrap:anywhere">${esc(x)}</div></div>`).join('');return `<div style="border:1px solid var(--bd,#dce3ef);border-radius:16px;overflow:hidden;margin:10px 0;background:var(--card,#fff);color:var(--tx,#172033)"><div style="padding:13px 15px;background:linear-gradient(110deg,rgba(99,102,241,.13),rgba(20,184,166,.07));border-bottom:1px solid var(--bd,#dce3ef)"><div style="font-size:9px;letter-spacing:1px;font-weight:900;opacity:.65">CCE MATHS · CONCEPT FIRST</div><div style="font-size:16px;font-weight:850;line-height:1.55;margin-top:5px">${esc(q.t||'વિગતવાર ઉકેલ')}</div><div style="font-size:12px;line-height:1.6;opacity:.8;margin-top:4px">${isPartner?'ભાગીદારી: મૂડી, સમય અને નફાનો સંબંધ':'ટકાવારી: આધાર, ફેરફાર અને પ્રમાણ'}</div></div><div style="padding:12px 14px">${visual}<h4 style="margin:17px 0 5px;font-size:14px">ઉકેલ — પગલું પ્રમાણે</h4>${sh||`<p style="line-height:1.8">${esc(q.e||'આ પ્રશ્ન માટે લખિત સમજૂતી ઉપલબ્ધ નથી.')}</p>`}<div style="margin-top:12px;padding:12px;border-left:4px solid #10b981;border-radius:9px;background:rgba(16,185,129,.09)"><div style="font-size:10px;font-weight:900;letter-spacing:.7px;color:#059669">અંતિમ જવાબ</div><b style="font-size:16px;display:block;margin-top:4px;line-height:1.6">${esc(answer||'પગલાં પ્રમાણે મળેલ જવાબ')}</b><div style="font-size:11px;opacity:.72;margin-top:5px">યાદ રાખો: પહેલાં પ્રશ્નનો આધાર ઓળખો, પછી જ સૂત્ર લાગુ કરો.</div></div></div></div>`;}
// Deep notes are intentionally organized as teachable concepts, examples, visual routes and common traps.
const pct=[
['01 · ટકાવારીનો પાયો — “દર 100 માંથી”',[
'ટકાવારી (%) નો અર્થ દર 100 માંથી કેટલા ભાગ. એટલે x% = x/100. કોઈ પણ પ્રશ્નમાં પહેલો સવાલ: 100% કઈ વસ્તુ છે — કુલ સંખ્યા, મૂળ કિંમત, કુલ મત કે પગાર?',
'દૃશ્ય મોડેલ: 100 સમાન ભાગમાંથી 25 ભાગ પસંદ કરો ⇒ 25% = 25/100 = 1/4. 50% = 1/2; 20% = 1/5; 12.5% = 1/8; 75% = 3/4.',
'સૂત્ર: N ના x% = N × x/100. ઉદાહરણ: 240 ના 15% = 240 × 15/100 = 36. ઝડપી રીત: 10% = 24 અને 5% = 12, તેથી 15% = 36.',
'ઝડપી કોષ્ટક: 1/2=50%, 1/3≈33.33%, 1/4=25%, 1/5=20%, 1/6≈16.67%, 1/8=12.5%, 1/10=10%, 3/4=75%, 3/8=37.5%, 5/8=62.5%.',
'સામાન્ય ભૂલ: 25% of 80 માં 25 ને 80 માંથી બાદ નથી કરતા; 80 × 25/100 = 20 થાય છે.'
]],
['02 · આપેલ ટકા પરથી મૂળ સંખ્યા શોધવી',[
'જો કોઈ સંખ્યાના x% બરાબર A હોય, તો કુલ સંખ્યા N = A × 100/x. અહીં A એ ભાગ છે, N આખું છે.',
'દૃશ્ય: અજાણ્યું કુલ N → x% ભાગ = A → 100% = A × 100/x.',
'ઉદાહરણ: સંખ્યાના 20% = 60 ⇒ N = 60 × 100/20 = 300. ચકાસણી: 300 ના 20% = 60.',
'જો 40% વિદ્યાર્થીઓ = 120 હોય, તો કુલ વિદ્યાર્થીઓ = 120×100/40 = 300. “ટકા આપેલા છે અને ભાગ આપેલો છે” ત્યારે આ રીત વાપરો.',
'ટ્રેપ: 20% of N શોધવું અને “20 એ N ના કેટલા ટકા?” શોધવું અલગ છે. બીજા પ્રકારમાં (20/N)×100 કરવું પડે.'
]],
['03 · વધારો, ઘટાડો અને મૂળ આધાર',[
'ટકાવારી વધારો = (વધારાની રકમ ÷ મૂળ રકમ)×100. ટકાવારી ઘટાડો = (ઘટાડાની રકમ ÷ મૂળ રકમ)×100. આધાર મૂળ રકમ જ છે, નવી રકમ નહીં.',
'વધારા પછી નવી કિંમત = મૂળ કિંમત × (100+r)/100. ઘટાડા પછી નવી કિંમત = મૂળ કિંમત × (100−r)/100.',
'ઉદાહરણ: ₹500 માં 20% વધારો ⇒ ₹500×120/100 = ₹600. 20% ઘટાડો ⇒ ₹500×80/100 = ₹400.',
'નવી કિંમતમાંથી મૂળ કિંમત પાછી મેળવવી હોય તો ઊલટો factor વાપરો. ₹600 એ 20% વધેલી કિંમત હોય, તો મૂળ = 600×100/120 = ₹500.',
'સામાન્ય ભૂલ: ₹500 થી ₹600 નો વધારો ₹100 છે; ટકા વધારો 100/500×100 = 20%, 100/600×100 નહીં.'
]],
['04 · સતત ટકાવારી ફેરફાર (Successive Change)',[
'બીજો ફેરફાર પહેલી અસર પછીની કિંમત પર લાગુ પડે છે. તેથી બે ટકાને સીધા ઉમેરવા/બાદ કરવા કરતાં factors ગુણો.',
'બે વધારો a%, b% ⇒ કુલ factor = (1+a/100)(1+b/100). ચોખ્ખો ફેરફાર = a+b+ab/100 ટકા.',
'બે ઘટાડા a%, b% ⇒ કુલ factor = (1−a/100)(1−b/100). કુલ ઘટાડો = a+b−ab/100 ટકા.',
'ઉદાહરણ: 20% વધારો પછી 10% વધારો ⇒ 1.20×1.10=1.32 ⇒ કુલ વધારો 32%. 20% છૂટ પછી 10% છૂટ ⇒ 0.80×0.90=0.72 ⇒ કુલ છૂટ 28%.',
'ખાસ ટ્રેપ: 10% વધારો પછી 10% ઘટાડો ⇒ 1.10×0.90=0.99; અંતિમ કિંમત મૂળની 99%, એટલે 1% ઘટાડો — શૂન્ય ફેરફાર નહીં.'
]],
['05 · સરખામણી, ખર્ચ અને વપરાશ',[
'જો કિંમત r% વધે અને કુલ ખર્ચ સ્થિર રાખવો હોય, તો નવો વપરાશ જૂના વપરાશનો 100/(100+r) ભાગ બને છે. ઘટાડો = [r/(100+r)]×100%.',
'જો કિંમત r% ઘટે અને ખર્ચ સમાન રહે, તો વપરાશમાં વધારો = [r/(100−r)]×100%. ઉદાહરણ: ભાવ 25% વધે ⇒ વપરાશ ઘટાડો = 25/125×100 = 20%.',
'A, B કરતાં r% વધુ હોય ⇒ B, A કરતાં [r/(100+r)]×100% ઓછું. A, B કરતાં r% ઓછું હોય ⇒ B, A કરતાં [r/(100−r)]×100% વધુ.',
'દરેક પ્રશ્નમાં “વધુ/ઓછું કોની સરખામણીમાં?” તે લખો. 20% વધુ અને 20% ઓછું એકબીજાના સમકક્ષ નથી, કારણ કે આધાર બદલાય છે.',
'પરીક્ષા રીત: આધારને 100 માનો. ત્યારબાદ ફેરફાર સીધો 100 માં ઉમેરો/બાદ કરો; જરૂરી હોય તો અંતે વાસ્તવિક કિંમતમાં ફેરવો.'
]],
['06 · ચૂંટણી, મતદાન અને પરિણામ આધારિત પ્રશ્નો',[
'પહેલા સંબંધ ગોઠવો: કુલ મત = માન્ય મત + અમાન્ય મત. જીતનું માર્જિન = વિજેતાના મત − હારેલાના મત.',
'જો મતદાન કરનારાઓમાંથી x% અમાન્ય હોય, તો માન્ય મત = કુલ મતના (100−x)%. પરંતુ પ્રશ્ન “કુલ નોંધાયેલા મતદારો” અથવા “મતદાન કરનારાઓ” પૈકી કયા આધારની વાત કરે છે તે ધ્યાનથી વાંચો.',
'જો બે ઉમેદવારો સિવાય કોઈ મત ન હોય, તો બંનેના મતનો સરવાળો માન્ય મત થાય છે. જીતનું અંતર આપેલું હોય તો સમીકરણ બનાવી શકાય: A+B=કુલ માન્ય મત અને A−B=માર્જિન.',
'ટ્રેપ: જીતનું માર્જિન કુલ મતના x% છે કે વિજેતાના મતના x% છે — આ બંને અલગ ગણતરી છે. પ્રશ્નના શબ્દો પરથી આધાર નક્કી કરો.'
]]
];
const partner=[
['07 · ભાગીદારીનો મૂળ નિયમ — મૂડી × સમય',[
'ભાગીદારીમાં નફાનો હિસ્સો ∝ મૂડી × ધંધામાં મૂડી રહેલો સમય. મૂડી સમાન હોય તો વધુ સમયનું વજન વધુ; સમય સમાન હોય તો વધુ મૂડીનું વજન વધુ.',
'સૂત્ર: A:B નફો = (A ની મૂડી × A નો સમય) : (B ની મૂડી × B નો સમય). સમય એક જ એકમમાં રાખો — બંને મહિના અથવા બંને વર્ષ.',
'ઉદાહરણ: A ₹4,000 અને B ₹12,000 એક વર્ષ માટે રોકે ⇒ વજન 4000×12 : 12000×12 = 1:3. સમય સમાન હોવાથી સીધો મૂડીનો ગુણોત્તર પણ ચાલે.',
'વિરોધી ઉદાહરણ: A ₹10,000 12 મહિના અને B ₹15,000 8 મહિના ⇒ 120000:120000 = 1:1. માત્ર મૂડી 2:3 જોઈને જવાબ ન આપવો.',
'ઝડપી ચેક: જો કોઈ એક ભાગીદારની મૂડી બમણી અને સમય અડધો હોય, તો મૂડી×સમયનું વજન સમાન રહી શકે.'
]],
['08 · અલગ સમયે જોડાવું, બહાર નીકળવું અથવા મૂડી બદલવી',[
'એક વર્ષ = 12 મહિના માનો. “A શરૂઆતથી” હોય તો 12 મહિના. “B 3 મહિના પછી જોડાય” તો B નો સમય 12−3=9 મહિના.',
'સમયરેખા બનાવો: મહિનો 1–4 → જૂની મૂડી; મહિનો 5–12 → નવી મૂડી. દરેક સમયખંડનું મૂડી×મહિના વજન કાઢીને ઉમેરો.',
'ઉદાહરણ: ₹10,000 પહેલા 4 મહિના અને ₹15,000 બાકી 8 મહિના ⇒ વજન = 10,000×4 + 15,000×8 = 40,000+1,20,000 = 1,60,000.',
'મૂડી ઉપાડે તો ઉપાડ્યા પછીની બાકી મૂડી જ બાકી મહિનાઓ માટે લો. વધારાની મૂડી ઉમેરે તો નવી મૂડીનો સમયગાળો અલગ ગણો.',
'ટ્રેપ: “4 મહિના પછી જોડાયો” એટલે 4 મહિના રોકાણ નહીં; સામાન્ય 12 મહિનાના ધંધામાં બાકી 8 મહિના રોકાણ.'
]],
['09 · નફો ગુણોત્તર પ્રમાણે વહેંચવો — એક ભાગ પદ્ધતિ',[
'પહેલા દરેકનું મૂડી×સમય વજન કાઢો, પછી ગુણોત્તર સરળ કરો. કુલ ગુણોત્તર ભાગ = ગુણોત્તરના બધા આંકડાનો સરવાળો.',
'એક ભાગની કિંમત = કુલ નફો ÷ કુલ ભાગ. વ્યક્તિનો નફો = તેના ગુણોત્તરના ભાગ × એક ભાગની કિંમત.',
'ઉદાહરણ: A:B=2:3 અને કુલ નફો ₹25,000 ⇒ કુલ ભાગ 5; એક ભાગ ₹5,000; A = ₹10,000 અને B = ₹15,000.',
'જો ગુણોત્તર 2:3:5 અને કુલ નફો ₹20,000 ⇒ કુલ ભાગ 10; એક ભાગ ₹2,000; હિસ્સા ₹4,000, ₹6,000, ₹10,000.',
'અંતિમ ચકાસણી: બધા ભાગીદારોના નફાનો સરવાળો મૂળ કુલ નફા જેટલો જ આવવો જોઈએ.'
]],
['10 · અજ્ઞાત મૂડી/સમય અને નફાનો સંબંધ',[
'નફાનો ગુણોત્તર = મૂડીના ગુણોત્તર × સમયના ગુણોત્તર. અજ્ઞાત મૂડી અથવા સમય શોધવા માટે સમાન ક્રમમાં ગુણોત્તર ગોઠવો.',
'ઉદાહરણ: A:B નફો 3:2, મૂડી 2:1 ⇒ સમયનો ગુણોત્તર = (3/2) ÷ (2/1) = 3:4. A:B નો ક્રમ દરેક જગ્યાએ જાળવો.',
'જો નફાનો ગુણોત્તર અને સમય સરખો હોય, તો મૂડીનો ગુણોત્તર નફાના ગુણોત્તર જેટલો જ. જો મૂડી અને નફો સરખા હોય, તો સમયનો ગુણોત્તર સમાન.',
'પરીક્ષા ટ્રેપ: “રોકાણ ત્રણ ગણું” નો અર્થ 3:1; “ત્રણ ગણું વધુ” જેવા શબ્દોમાં સંદર્ભ સ્પષ્ટ વાંચો. ગુણોત્તર સરળ કરતાં બંને બાજુ એક જ સંખ્યાથી ભાગો.'
]],
['11 · ટકાવારી અને ભાગીદારીના common exam traps',[
'ટકાવારીમાં કુલને 100 ભાગ માનો; ભાગીદારીમાં કુલ નફાને ગુણોત્તરના કુલ ભાગોમાં વહેંચો. બંનેમાં એક-ભાગ પદ્ધતિ કામ કરે છે.',
'ટકાવારીમાં આધાર (base) બદલાય છે; ભાગીદારીમાં સમય બદલાય છે. દરેક પ્રશ્નમાં આ બે બાબતો સૌથી પહેલાં ઓળખો.',
'ભાગીદારીમાં સમય એકમ સમાન રાખો. ટકાવારીમાં મૂળ કિંમતને આધાર રાખો. ક્રમિક ટકાવારીમાં દરેક ફેરફાર પછીની કિંમત પર લાગુ કરો.',
'ઉકેલ ચેકલિસ્ટ: (1) શું પૂછ્યું છે? (2) આધાર/સમય શું છે? (3) યોગ્ય સૂત્ર? (4) એકમ સરખાં છે? (5) અંતિમ જવાબ વિકલ્પ અને અંદાજ સાથે મેળ ખાય છે?'
]]
];
notes.m3=pct.concat(partner);
if(Array.isArray(banks.m3)) banks.m3.forEach((q,i)=>{if(q&&(q.q||q.t)) q.h=build(q,i);});
root.M3_DEEP_VISUAL_UPGRADE={version:1,questionCount:(banks.m3||[]).length,noteSections:notes.m3.length,loaded:true};
console.info('[m3 deep upgrade] applied to',root.M3_DEEP_VISUAL_UPGRADE.questionCount,'questions and',notes.m3.length,'deep note sections');
})();
