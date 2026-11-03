/* CCE Study Tracker — technique-led visual solutions + deep notes for topics.json questions.
   Loads LAST so imported m9–m13 solutions use a question-relevant visual language. */
(function(){
'use strict';
if(typeof PYQ==='undefined'||typeof NOTES==='undefined')return;
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const add=(id,sections)=>{NOTES[id]=NOTES[id]||[];const have=new Set(NOTES[id].map(x=>x[0]));sections.forEach(s=>{if(!have.has(s[0])){NOTES[id].push(s);have.add(s[0]);}})};
// Notes follow the supplied topics.json concepts; examples below are instructional illustrations derived from those concepts.
add('m9',[
['MASTERCLASS 01 · સરેરાશ (Mean): અર્થથી પરીક્ષા સુધી',[
'## 1. ખ્યાલ શું છે?', 'સરેરાશ એ તમામ અવલોકનોને સમાન રીતે વહેંચીએ ત્યારે દરેકને મળતી પ્રતિનિધિ કિંમત છે. એટલે સરેરાશ કોઈ એક અવલોકન હોવું જરૂરી નથી; તે બે અવલોકનો વચ્ચેની દશાંશ કિંમત પણ હોઈ શકે છે.',
'§ સરેરાશ = કુલ સરવાળો ÷ કુલ અવલોકનોની સંખ્યા',
'## 2. પ્રશ્ન વાંચતાં પહેલાં ઓળખો', '• “સરેરાશ કેટલી?”, “average marks”, “per item” → સરવાળો અને સંખ્યા શોધો.', '• “સરેરાશ x છે અને n સંખ્યાઓ છે” → કુલ સરવાળો = x × n.', '• “એક સંખ્યા ઉમેરાઈ/કાઢી” → જૂનો અને નવો કુલ સરવાળો સરખાવો.',
'## 3. ઉકેલનો નકશો', 'આપેલી સંખ્યાઓ → કુલ સરવાળો S → સંખ્યા n → S/n → વિકલ્પમાં એકમ/દશાંશ ચકાસો.',
'§ S = n × x̄   ;   x̄ = S/n',
'Q: 12, 18, 20, 30 ની સરેરાશ ⇒ S = 12+18+20+30 = 80 ⇒ n = 4 ⇒ સરેરાશ = 80/4 = 20',
'## 4. ઝડપ માટેના ઉપયોગી નિયમો', '★ દરેક સંખ્યામાં k ઉમેરો તો સરેરાશ પણ k વધે; દરેકમાંથી k બાદ કરો તો k ઘટે.', '★ દરેક સંખ્યાને k થી ગુણો તો સરેરાશ k ગણી થાય; k થી ભાગો તો સરેરાશ પણ k થી ભાગાય.', '★ સતત સંખ્યાઓ / AP માટે સરેરાશ = (પ્રથમ પદ + છેલ્લું પદ)/2, જ્યારે પદો સમાન અંતરે હોય.',
'## 5. વારંવાર થતી ભૂલો', '⚠ સરવાળો સાચો હોય છતાં n ખોટું ગણવાથી જવાબ ખોટો થાય છે.', '⚠ “સરેરાશ 65” અને “કુલ 65” એક નથી. કુલ = સરેરાશ × સંખ્યા.', '⚠ પ્રશ્નમાં ગ્રામ, ગુણ, કિમી વગેરે એકમ હોય તો અંતિમ જવાબમાં એકમ લખો.'
]],
['MASTERCLASS 02 · મધ્યસ્થ (Median): સ્થાન આધારિત રીત',[
'## 1. મધ્યસ્થ અને સરેરાશનો તફાવત', 'મધ્યસ્થ એ ગોઠવેલી માહિતીનું મધ્યસ્થાન છે. મધ્યક/સરેરાશ સરવાળા પર આધારિત છે, જ્યારે મધ્યસ્થ ક્રમ અને સ્થાન પર આધારિત છે.',
'## 2. સૌથી પહેલું પગલું — ક્રમ ગોઠવો', 'આંકડા ચડતા અથવા ઊતરતા ક્રમમાં ગોઠવો. ગોઠવ્યા વિના મૂળ યાદીનું મધ્યનું સ્થાન પસંદ ન કરો.',
'§ n એકી હોય: સ્થાન = (n+1)/2', '§ n બેકી હોય: મધ્યસ્થ = [n/2મા પદ + (n/2+1)મા પદ] ÷ 2',
'## 3. સ્થાનને દૃશ્યરૂપે સમજો', 'ઉદાહરણ (એક n): 4, 1, 8, 3, 6 → ગોઠવો: 1, 3, [4], 6, 8. પાંચ પદમાં ત્રીજું પદ મધ્યસ્થ = 4.', 'ઉદાહરણ (બેકી n): 9, 2, 7, 4 → ગોઠવો: 2, [4, 7], 9. મધ્યનાં બે પદનો સરેરાશ = (4+7)/2 = 5.5.',
'## 4. x ધરાવતા પ્રશ્નો', 'જો n = 10 હોય તો પાંચમું અને છઠ્ઠું પદ વાપરો. જો તે x અને x+2 હોય અને મધ્યસ્થ 63 હોય:', 'Q: 63 = [x + (x+2)]/2 ⇒ 126 = 2x+2 ⇒ 2x = 124 ⇒ x = 62',
'## 5. અપૂર્ણાંક/દશાંશ માહિતી', 'સમાન હર હોય તો અપૂર્ણાંકનું સરખામણું સરળ છે. જુદા હર હોય તો દશાંશમાં રૂપાંતર અથવા ક્રોસ-ગુણાકારથી યોગ્ય ક્રમ નક્કી કરો. માત્ર અંદાજિત દશાંશના કારણે નજીકના બે પદનો ક્રમ ઉલટાવશો નહીં.',
'⚠ મધ્યસ્થ શોધતાં સરવાળો કરવાની જરૂર નથી; પહેલા ગોઠવણી, પછી સ્થાન.', '⚠ n બેકી હોય ત્યારે એક જ પદ પસંદ ન કરવું — બે મધ્ય પદનો સરેરાશ લેવો.'
]],
['MASTERCLASS 03 · બહુલક (Mode): આવર્તન વાંચવાની કળા',[
'બહુલક એટલે સૌથી વધુ વાર આવતી કિંમત. તે મધ્યસ્થાન નથી અને સરવાળો/કુલ સંખ્યા સાથે સંબંધિત નથી.',
'## Frequency table બનાવો', '| કિંમત | આવર્તન |', '| 8 | 3 |', '| 9 | 2 |', '| 10 | 1 |', 'આ નાનકડા ઉદાહરણમાં 8 નું આવર્તન સૌથી વધુ હોવાથી બહુલક 8 છે.',
'## ત્રણ શક્ય પરિણામ', '→ એક જ કિંમતનું આવર્તન સૌથી વધુ → એક બહુલક (unimodal).', '→ બે કિંમતો સમાન રીતે સૌથી વધુ વાર આવે → બે બહુલક (bimodal).', '→ કોઈ કિંમત પુનરાવર્તિત ન થાય → આપેલા અભ્યાસક્રમના નિયમ મુજબ બહુલક મળતો નથી.',
'Q: 4, 7, 4, 9, 7, 4 ⇒ 4 ત્રણ વાર, 7 બે વાર, 9 એક વાર ⇒ બહુલક = 4',
'## પરીક્ષા ચેકલિસ્ટ', '1) દરેક જુદી કિંમતની ગણતરી કરો. 2) સૌથી મોટું આવર્તન શોધો. 3) જો ટાઈ હોય તો બધી ટાઈ થયેલી કિંમતો લખો.',
'⚠ “સૌથી મોટી સંખ્યા” અને “સૌથી વધુ વાર આવતી સંખ્યા” જુદી બાબતો છે.'
]],
['MASTERCLASS 04 · Mean–Median–Mode અને ખાસ સરેરાશ સૂત્રો',[
'## અનુભવજન્ય સંબંધ', '§ Z = 3M − 2x̄', 'અહીં Z = બહુલક, M = મધ્યસ્થ, x̄ = સરેરાશ. આ સંબંધનો ઉપયોગ ત્યારે જ કરો જ્યારે પ્રશ્નમાં આ ત્રણ માપ વચ્ચેનો અનુભવજન્ય સંબંધ અપાયો/માન્ય હોય.',
'Q: M = 36, x̄ = 46 ⇒ Z = 3×36 − 2×46 ⇒ 108 − 92 = 16',
'## શ્રેણી માટેના સૂત્રો', '| માહિતી | સરેરાશ |', '| પ્રથમ n પ્રાકૃતિક સંખ્યાઓ 1 થી n | (n+1)/2 |', '| પ્રથમ n પૂર્ણ સંખ્યાઓ 0 થી n−1 | (n−1)/2 |', '| પ્રથમ n એકી સંખ્યાઓ | n |', '| પ્રથમ n બેકી સંખ્યાઓ 2,4,…,2n | n+1 |', '| 1²+2²+…+n² ના સરવાળાની સરેરાશ | (n+1)(2n+1)/6 |', '| 1³+2³+…+n³ ના સરવાળાની સરેરાશ | n(n+1)²/4 |',
'## Weighted Mean', '§ ભારિત સરેરાશ = Σ(wx) ÷ Σw', 'જ્યારે દરેક કિંમતનું વજન/વારંવારતા જુદું હોય ત્યારે માત્ર કિંમતોનો સાદો સરેરાશ ન લેવો. દરેક કિંમતને તેના વજનથી ગુણો, બધા ગુણાકારોનો સરવાળો કરો અને કુલ વજનથી ભાગો.',
'⚠ સૂત્ર પસંદ કરતાં પહેલાં તપાસો કે શ્રેણી 1થી શરૂ થાય છે કે 0થી; આ નાનો ફેરફાર જવાબ બદલી શકે છે.'
]]
]);
add('m10',[
['MASTERCLASS 01 · VBODMAS — ક્રિયાનો સાચો ક્રમ',[
'ગણિતીય પદાવલીમાં ક્રિયાઓનો ક્રમ જાળવવો જરૂરી છે; ડાબેથી જમણે બધું એક પછી એક કરવું હંમેશા યોગ્ય નથી.',
'## ક્રમનો નકશો', '1. Vinculum / ઉપરની રેખા', '2. Brackets — અંદરથી બહાર', '3. Orders — ઘાત, વર્ગમૂળ વગેરે', '4. Division અને Multiplication — સમાન પ્રાથમિકતા, ડાબેથી જમણે', '5. Addition અને Subtraction — સમાન પ્રાથમિકતા, ડાબેથી જમણે',
'Q: 18 ÷ 3 × 2 ⇒ ડાબેથી જમણે: 18÷3 = 6 ⇒ 6×2 = 12',
'Q: 10 − 2 + 3 ⇒ 10−2 = 8 ⇒ 8+3 = 11',
'## ચકાસવાની ટેવ', 'દરેક પંક્તિમાં એક મુખ્ય ક્રિયા કરો અને નવું પરિણામ લખો. એક જ લીટીમાં અનેક પગલાં mentally કરવાથી ચિહ્નની ભૂલ થાય છે.',
'⚠ ગુણાકાર હંમેશા ભાગાકાર પહેલાં અને સરવાળો હંમેશા બાદબાકી પહેલાં એવો નિયમ નથી. સમાન પ્રાથમિકતાની ક્રિયા ડાબેથી જમણે કરો.'
]],
['MASTERCLASS 02 · કૌંસ, Vinculum અને અંદરથી બહાર',[
'## કૌંસ વાંચવાની રીત', 'નાનો કૌંસ ( ), પછી { }, પછી [ ] દેખાય તો સૌથી અંદરના કૌંસથી કામ શરૂ કરો. કૌંસનો પ્રકાર ક્રમ બતાવે છે; તે અંદરની ક્રિયાની પ્રાથમિકતાને બદલેતો નથી.',
'Q: 3 × [8 − (2+1)] ⇒ પહેલા (2+1)=3 ⇒ [8−3]=5 ⇒ 3×5=15',
'## ઉપરની રેખા (Vinculum)', 'રેખાની નીચે/ઉપર આવરી લેવાયેલા ભાગને એક જૂથ માનો અને રેખા હેઠળની ક્રિયા પહેલાં પૂરી કરો. પછી સામાન્ય ક્રમ લાગુ કરો.',
'## પેપર પર ઉકેલ ગોઠવો', 'આપેલી પદાવલી → સૌથી અંદરનો જૂથ → ઘાત/વર્ગમૂળ → × અને ÷ ડાબેથી જમણે → + અને − ડાબેથી જમણે.',
'⚠ કૌંસ દૂર કરતી વખતે બહારનું ઋણ ચિહ્ન હોય તો અંદરના દરેક પદનું ચિહ્ન બદલાય છે: −(a−b)=−a+b.'
]],
['MASTERCLASS 03 · Algebraic identities — વિસ્તરણ અને અવયવીકરણ',[
'## મુખ્ય ઓળખાણો', '§ (a+b)² = a² + 2ab + b²', '§ (a−b)² = a² − 2ab + b²', '§ a²−b² = (a−b)(a+b)', '§ (a+b)³ = a³+b³+3ab(a+b)', '§ (a−b)³ = a³−b³−3ab(a−b)', '§ a³+b³ = (a+b)(a²−ab+b²)', '§ a³−b³ = (a−b)(a²+ab+b²)', '§ (a+b+c)² = a²+b²+c²+2(ab+bc+ca)',
'## કઈ ઓળખાણ ક્યારે?', '→ બે વર્ગનો તફાવત હોય: a²−b² → તરત બે અવયવ.', '→ બે પદના સરવાળાનો વર્ગ: મધ્ય પદ 2ab ભૂલશો નહીં.', '→ ઘનનો સરવાળો/તફાવત: પહેલા a±b નો અવયવ, પછી ત્રણ પદવાળો બીજો અવયવ.',
'Q: 49²−1² ⇒ (49−1)(49+1) ⇒ 48×50 = 2400',
'⚠ (a+b)² ને a²+b² ન લખવું; વચ્ચે 2ab આવે છે.', '⚠ a³+b³ માં બીજા કૌંસનું મધ્ય પદ −ab હોય છે, જ્યારે a³−b³ માં +ab હોય છે.'
]],
['MASTERCLASS 04 · x + 1/x પ્રકારની શોર્ટકટ ઓળખાણો',[
'આ પ્રકારના પ્રશ્નમાં x ની કિંમત અલગથી શોધવી જરૂરી ન પણ હોય; આપેલી જોડેલી કિંમતને ઓળખાણમાં બેસાડો.',
'§ જો x + 1/x = k હોય, તો x² + 1/x² = k² − 2', '§ જો x − 1/x = k હોય, તો x² + 1/x² = k² + 2', '§ જો x + 1/x = k હોય, તો x³ + 1/x³ = k³ − 3k', '§ જો x − 1/x = k હોય, તો x³ − 1/x³ = k³ + 3k',
'Q: x + 1/x = 5 ⇒ x² + 1/x² = 5²−2 = 23',
'## સૂત્ર કેવી રીતે યાદ રાખવું?', '(x+1/x)² = x² + 2 + 1/x². તેથી વચ્ચેનું 2 જમણી બાજુ લઈ જતાં −2 થાય છે. આથી સૂત્ર યાદ કરતાં પહેલાં એક વાર વિસ્તરણ સમજો.',
'⚠ “+” અને “−” વાળો પ્રશ્ન ગૂંચવશો નહીં; આપેલી જ ઓળખાણ વાપરો અને બંને બાજુ square/ cube કરતી વખતે મધ્ય પદ સાચું રાખો.'
]]
]);
add('m11',[
['MASTERCLASS 01 · વર્ગ અને વર્ગમૂળ: પરીક્ષા માટેનું Number Map',[
'## વર્ગ શું છે?', 'n² એટલે n × n. 1થી 30 સુધીના વર્ગો નિયમિત પુનરાવર્તનથી યાદ કરો; ઝડપી ગણતરી અને વર્ગમૂળના છેલ્લાં અંકો માટે આ આધાર બને છે.',
'## 5 પર પૂરા થતા અંકનો વર્ગ', '§ (10a+5)² = a(a+1) સાથે અંતે 25 લખો.', 'Q: 75² ⇒ 7×8 = 56 ⇒ અંતે 25 ⇒ 5625', 'Q: 115² ⇒ 11×12 = 132 ⇒ અંતે 25 ⇒ 13225',
'## વર્ગમૂળ માટે છેલ્લાં અંકો', 'પૂર્ણવર્ગનો એકમનો અંક 2, 3, 7 કે 8 નથી હોતો. 1 માટે મૂળનો એકમ 1/9, 4 માટે 2/8, 9 માટે 3/7, 6 માટે 4/6, 5 માટે 5, 0 માટે 0 હોઈ શકે.',
'## ચાર પગલાંની રીત', '1) છેલ્લાં બે અંકથી શક્ય એકમનો અંક પસંદ કરો. 2) છેલ્લાં બે અંક પહેલાંનો ભાગ લો. 3) તે ભાગથી નાનો નજીકનો પૂર્ણવર્ગ શોધો. 4) સંભવિત મૂળને square કરીને ચકાસો.',
'Q: √3249 ⇒ છેલ્લાં બે અંક 49 હોવાથી એકમ 3 અથવા 7. 32 પહેલાંનો ભાગ 32; 5²=25 અને 6²=36 એટલે દશક 5. શક્યતા 53/57; 57²=3249 ⇒ જવાબ 57.',
'⚠ છેલ્લાં અંકની ટ્રિકથી ઉમેદવાર મળે છે, અંતિમ ખાતરી માટે square કરીને ચકાસો.'
]],
['MASTERCLASS 02 · ઘન અને ઘનમૂળ: ત્રણ અંકનો બ્લોક',[
'ઘન n³ = n×n×n. ઘનમૂળ શોધતાં સંખ્યાને જમણી બાજુથી ત્રણ-ત્રણ અંકના બ્લોકમાં વિચારો.',
'## એકમના અંકની જોડી', '§ 2 ↔ 8 અને 3 ↔ 7; 0,1,4,5,6,9 ના એકમના ઘનનો એકમ અનુક્રમે એ જ રહે છે.',
'## ઘનમૂળની પ્રક્રિયા', '1) જમણી બાજુના છેલ્લાં ત્રણ અંકથી એકમનો અંક ઓળખો. 2) બાકી ડાબા ભાગમાં સૌથી મોટો પૂર્ણ ઘન શોધો. 3) તેનો ઘનમૂળ દશકનો અંક બને. 4) બંને જોડીને ચકાસો.',
'Q: ∛6859 ⇒ છેલ્લાં ત્રણ અંક 859? ધ્યાન: સંખ્યા 6|859 તરીકે બ્લોક થાય છે; 859 એકમ 9 આપે છે. ડાબે 6, 1³≤6<2³ ⇒ દશક 1, ઉમેદવાર 19; 19³=6859 ⇒ જવાબ 19.',
'## વર્ગમૂળ અને ઘનમૂળ વચ્ચેનો તફાવત', 'વર્ગમૂળમાં છેલ્લાં બે અંકના pattern અને ડાબા ભાગનો square જોવો; ઘનમૂળમાં છેલ્લાં ત્રણ અંક અને ડાબા ભાગનો cube જોવો.',
'⚠ બ્લોક ગણતાં ડાબેથી નહીં, જમણી બાજુથી શરૂ કરો.'
]],
['MASTERCLASS 03 · પૂર્ણવર્ગ ઓળખવો: eliminate, then verify',[
'## ઝડપી elimination નિયમો', '• પૂર્ણવર્ગનો એકમનો અંક 2, 3, 7, 8 હોઈ શકતો નથી.', '• પૂર્ણવર્ગનો digit sum વારંવાર 1, 4, 7 અથવા 9 માં ઘટે છે (ડિજિટલ રૂટ નિયમ). આ જરૂરી શરત છે, પૂરતી ખાતરી નથી.', '• 4 અંકની નાની પૂર્ણવર્ગ સંખ્યા 32²=1024; મોટી 99²=9801.', '• 5 અંકની નાની પૂર્ણવર્ગ સંખ્યા 100²=10000; મોટી 316²=99856.',
'## ત્રણ સ્તરની ચકાસણી', '1) અંકની સંખ્યા મુજબ મૂળના અંકોની શક્ય સંખ્યા નક્કી કરો. 2) એકમના અંકથી ઉમેદવારો ઘટાડો. 3) નજીકના વર્ગો વચ્ચે સંખ્યા આવે છે કે નહીં તે તપાસો.',
'⚠ digit sum યોગ્ય આવે એટલે સંખ્યા પૂર્ણવર્ગ છે એવો નિષ્કર્ષ ન કાઢવો; આ માત્ર screening trick છે.',
'## છેલ્લાં બે અંક', 'પૂર્ણવર્ગના છેલ્લાં બે અંક 1² થી 24² ના અંતિમ બે અંકના ચક્રમાંના હોઈ શકે છે. પરીક્ષામાં પહેલા અસંભવિત વિકલ્પ દૂર કરો, પછી મૂળ square કરીને ખાતરી કરો.'
]]
]);
add('m12',[
['MASTERCLASS 01 · બહુપદી: ઓળખ, ઘાત અને શૂન્યો',[
'## બહુપદી ઓળખવાની શરત', 'બહુપદીમાં ચલના ઘાત 0,1,2,3,… જેવા અનૃણ પૂર્ણાંક હોય છે; ચલ હરામાં અથવા મૂળચિહ્ન હેઠળ આવવાથી ઘણીવાર ઋણ/અપૂર્ણાંક ઘાત બને છે અને તે બહુપદી રહેતી નથી.',
'## Degree (ઘાત)', '§ p(x)=ax+b (a≠0) → ઘાત 1', '§ p(x)=ax²+bx+c (a≠0) → ઘાત 2', '§ p(x)=ax³+bx²+cx+d (a≠0) → ઘાત 3', 'શૂન્ય સિવાયની અચળ બહુપદીની ઘાત 0 છે; શૂન્ય બહુપદીની ઘાત અવ્યાખ્યાયિત છે.',
'Q: x + 2/√x + 5 ⇒ 2/√x = 2x^(−1/2); ચલનો ઘાત અપૂર્ણાંક છે ⇒ બહુપદી નથી.',
'## શૂન્ય શું છે?', 'p(α)=0 થાય તે α બહુપદીનું શૂન્ય છે. શૂન્યોનો પ્રશ્ન આવે ત્યારે માત્ર સમીકરણના ઉકેલ જ નહીં, બહુપદીમાં મૂકતાં પરિણામ 0 થાય છે કે નહીં તે પણ સમજો.',
'⚠ √2x² માં √2 ગુણાંક છે — તે પોતે બહુપદીને અયોગ્ય બનાવતું નથી. ચલ x નો ઘાત યોગ્ય હોવો જરૂરી છે.'
]],
['MASTERCLASS 02 · શૂન્યો અને સહગુણકો — Sum/Product map',[
'## દ્વિઘાત માટે', '§ ax²+bx+c ના શૂન્યો α, β હોય તો α+β=−b/a અને αβ=c/a.',
'## ચિહ્નથી શૂન્યોનો સ્વભાવ', '→ ગુણાકાર ધન અને સરવાળો ઋણ ⇒ બંને શૂન્યો ઋણ (વાસ્તવિક શૂન્યોના સંદર્ભમાં).', '→ ગુણાકાર ઋણ ⇒ એક ધન, એક ઋણ.', '→ ગુણાકાર ધન અને સરવાળો ધન ⇒ બંને ધન.',
'Q: x²+99x+127 ⇒ સરવાળો = −99 (ઋણ), ગુણાકાર = 127 (ધન) ⇒ બંને શૂન્યો ઋણ.',
'## ત્રિઘાત માટે', '§ ax³+bx²+cx+d ના શૂન્યો α,β,γ હોય તો α+β+γ=−b/a; αβ+βγ+γα=c/a; αβγ=−d/a.',
'જો બે શૂન્યો 0 હોય તો ત્રીજું શૂન્ય સીધું sum formula થી મળે: 0+0+γ=−b/a ⇒ γ=−b/a.',
'⚠ દ્વિઘાતમાં product c/a છે; ત્રિઘાતમાં product −d/a છે. ચિહ્ન અને denominator ચકાસો.'
]]
]);
add('m13',[
['MASTERCLASS 01 · બે ચલનાં સુરેખ સમીકરણ: રેખાઓનો અર્થ',[
'## પ્રમાણિત સ્વરૂપ', '§ a₁x+b₁y+c₁=0 અને a₂x+b₂y+c₂=0',
'## ઉકેલોની સંખ્યા — ratio test', '| શરત | રેખાઓ | ઉકેલ |', '| a₁/a₂ ≠ b₁/b₂ | છેદતી | એક ઉકેલ |', '| a₁/a₂ = b₁/b₂ = c₁/c₂ | એક જ રેખા | અનંત ઉકેલો |', '| a₁/a₂ = b₁/b₂ ≠ c₁/c₂ | સમાંતર | કોઈ ઉકેલ નહીં |',
'## Intercept method', 'રેખા 3x+4y=12 માટે x-axis પર y=0 મૂકો ⇒ x=4. y-axis પર x=0 મૂકો ⇒ y=3. બિંદુઓ (4,0) અને (0,3) જોડવાથી રેખા મળે.',
'§ અક્ષો સાથે બનેલા કાટકોણ ત્રિકોણનું ક્ષેત્રફળ = ½ × |x-intercept| × |y-intercept|',
'Q: 3x+4y=12 ⇒ intercepts 4 અને 3 ⇒ ક્ષેત્રફળ = ½×4×3 = 6',
'## Coordinates', 'x=3 ઊભી રેખા છે; y=−4 આડી રેખા છે. છેદનબિંદુમાં પહેલાં x, પછી y લખો: (3,−4).',
'⚠ ratio test કરતી વખતે denominators 0 થાય તેવી સ્થિતિમાં ratio લખવાને બદલે મૂળ સમીકરણની proportionality તપાસો.'
]],
['MASTERCLASS 02 · દ્વિઘાત સમીકરણ અને વિવેચક (D)',[
'## પ્રમાણિત સ્વરૂપ', '§ ax²+bx+c=0, જ્યાં a≠0', '§ D=b²−4ac', '§ x=(−b±√D)/(2a)',
'## D શું કહે છે?', '| D | મૂળનો પ્રકાર |', '| D>0 અને પૂર્ણવર્ગ | બે ભિન્ન સંમેય મૂળ (જો a,b,c સંમેય હોય) |', '| D>0 પણ પૂર્ણવર્ગ નહીં | બે ભિન્ન વાસ્તવિક અસંમેય મૂળ (સંમેય ગુણાંકોના સંદર્ભમાં) |', '| D=0 | બે સમાન વાસ્તવિક મૂળ |', '| D<0 | વાસ્તવિક મૂળ નથી |',
'## ગણતરીને પંક્તિમાં કરો', 'Q: √3x²+10x+7√3=0 ⇒ a=√3, b=10, c=7√3 ⇒ D=10²−4(√3)(7√3) ⇒ 100−84 ⇒ D=16.',
'## Word problem model', 'ઉંમર/ક્ષેત્રફળ/ઝડપ/ઉત્પાદન જેવા પ્રશ્નમાં પહેલા અજ્ઞાતને x માનો. વાક્યને સમીકરણમાં ફેરવો, બધા પદ એક બાજુ લાવો, પછી factorisation અથવા quadratic formula વાપરો. છેલ્લે મૂળ મૂકી મૂળ પરિસ્થિતિ સાથે મેળ ખાતું છે કે નહીં તે તપાસો.',
'⚠ દ્વિઘાત સમીકરણમાં a=0 ન હોવું જોઈએ. D ગણતાં b પર square લગાડવાનું ભૂલશો નહીં અને 4ac માં બંને ગુણાંક સાચા લો.'
]]
]);
function detect(q){const topic=String(q.topicsJsonSubtopic||'').toLowerCase(),s=(topic+' '+String(q.q||'')+' '+String(q.e||'')).toLowerCase();
// Specific algebra/equation families must be tested before generic x²/square tokens.
if(/બહુપદી|polynomial|શૂન્ય|degree|ઘાતાંક|સહગુણક|ત્રિઘાત/.test(s))return 'poly';
if(/સુરેખ|linear|રેખા|અક્ષ|intercept|છેદનબિંદુ|ratio|યામાક્ષ/.test(s))return 'linear';
if(/વિવેચક|discriminant|દ્વિઘાત સમીકરણ|quadratic equation|ઉંમર|ઝડપ|ક્ષેત્રફળ|ઉત્પાદન|વસ્તુ ઉત્પાદન|કૂટપ્રશ્ન/.test(s))return 'quadratic';
if(/મધ્યસ્થ|median|ચડતા ક્રમ|અપૂર્ણાંક સંખ્યાઓનો મધ્યસ્થ/.test(s))return 'median';
if(/બહુલક|mode|પુનરાવર્ત|bimodal/.test(s))return 'mode';
if(/સરેરાશ|average|mean|મધ્યક/.test(s))return 'mean';
if(/ઘનમૂળ|cube root|∛/.test(s))return 'cuberoot';
if(/વર્ગમૂળ|square root|√\d|પૂર્ણવર્ગ/.test(s))return 'sqrt';
if(/vbodmas|bodmas|કૌંસ|ક્રમ|simplif|પદાવલી/.test(s))return 'order';
if(/identity|સૂત્ર|વિસ્તરણ|x \+ 1\/x|x²|x³/.test(s)&&!/દ્વિઘાત|સમીકરણ|શૂન્ય/.test(s))return 'identity';
if(/વર્ગ|square|\^2|²/.test(s)&&/\d/.test(s))return 'square';
return 'method';}
const themes={median:['#38bdf8','#0c4a6e','POSITION MAP','ક્રમ → સ્થાન → મધ્યસ્થ'],mode:['#fb7185','#881337','FREQUENCY LAB','ગણતરી → આવર્તન → બહુલક'],mean:['#34d399','#064e3b','AVERAGE ENGINE','સરવાળો → n → ભાગાકાર'],sqrt:['#a78bfa','#4c1d95','ROOT FINDER','છેલ્લા અંક → નજીકનો વર્ગ → ચકાસણી'],cuberoot:['#fbbf24','#78350f','CUBE DECODER','3-અંક બ્લોક → એકમ → દશક'],square:['#f472b6','#831843','SQUARE PATTERN','ઓળખાણ → ઝડપી ગણતરી → ચકાસણી'],order:['#60a5fa','#1e3a8a','OPERATION STACK','કૌંસ → ઘાત → ×/÷ → +/−'],identity:['#c084fc','#581c87','IDENTITY WORKBENCH','રચના ઓળખો → સૂત્ર → મૂલ્ય'],poly:['#2dd4bf','#134e4a','POLYNOMIAL MAP','ઘાત → સહગુણક → શૂન્ય'],quadratic:['#fb923c','#7c2d12','EQUATION SOLVER','મોડેલ → પ્રમાણિત સ્વરૂપ → મૂળ'],linear:['#93c5fd','#1e40af','LINE INTERSECTION','સમીકરણ → ગુણોત્તર/છેદ → અર્થ'],method:['#cbd5e1','#334155','WORKED REASONING','આપેલ → નિયમ → ગણતરી']};
function stripFinal(t){return String(t||'').split(/તેથી સાચો જવાબ|સાચો જવાબ|જવાબ [A-D]/)[0].trim();}
function visual(q){const type=detect(q),th=themes[type],exp=String(q.__sourceExplanation||q.e||'').trim(),opts=Array.isArray(q.o)?q.o:[],answer=opts[q.a]||'જવાબ ઉપલબ્ધ નથી';
const lines=stripFinal(exp).split(/\n+/).map(x=>x.trim()).filter(Boolean);const steps=lines.length?lines:[exp||'ઉકેલ માટે પ્રશ્નમાં આપેલી માહિતીનો ઉપયોગ કરો.'];
let visual='';
if(type==='median'){
 const nums=(String(q.q||'').match(/(?:\d+\/\d+|\d+(?:\.\d+)?)/g)||[]).slice(0,12);
 visual=`<div class="d36-visual d36-median"><div class="d36-label">ORDERING STRIP</div><div class="d36-pills">${nums.map((n,i)=>`<span style="--i:${i}">${esc(n)}</span>`).join('')}</div><div class="d36-caption">આંકડાને પહેલાં ગોઠવો; પછી n પ્રમાણે મધ્યનું સ્થાન પસંદ કરો.</div></div>`;
}else if(type==='mode'){
 const nums=(String(q.q||'').match(/(?:\d+\/\d+|\d+(?:\.\d+)?)/g)||[]).slice(0,15);const freq={};nums.forEach(n=>freq[n]=(freq[n]||0)+1);const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]);
 visual=`<div class="d36-visual d36-mode"><div class="d36-label">FREQUENCY BARS · ઓળખો કઈ કિંમત સૌથી વધુ આવે છે</div><div class="d36-bars">${sorted.slice(0,8).map(([n,v])=>`<div class="d36-bar"><b>${esc(n)}</b><span><i style="width:${Math.max(12,v/Math.max(1,sorted[0][1])*100)}%"></i></span><em>${v}×</em></div>`).join('')||'<p>આવર્તન ગણો.</p>'}</div></div>`;
}else if(type==='mean'){
 visual=`<div class="d36-visual d36-mean"><div class="d36-equation"><span>Σ બધા મૂલ્યો</span><b>÷</b><span>કુલ સંખ્યા (n)</span><b>=</b><strong>સરેરાશ</strong></div><div class="d36-caption">પહેલા કુલ સરવાળો બનાવો, પછી સાચી સંખ્યાથી ભાગો.</div></div>`;
}else if(type==='sqrt'||type==='square'){
 visual=`<div class="d36-visual d36-root"><div class="d36-label">SQUARE CHECK · ઉમેદવારને વર્ગ કરીને ખાતરી કરો</div><div class="d36-root-grid"><div><small>01 · છેલ્લાં અંક</small><b>એકમની શક્યતા</b></div><div><small>02 · નજીકનો વર્ગ</small><b>દશક/ડાબો ભાગ</b></div><div><small>03 · ચકાસણી</small><b>મૂળ × મૂળ</b></div></div></div>`;
}else if(type==='cuberoot'){
 visual=`<div class="d36-visual d36-cube"><div class="d36-label">CUBE ROOT · જમણી બાજુથી બ્લોક બનાવો</div><div class="d36-cube-blocks"><span>ડાબો બ્લોક<br/><b>દશકનો અંક</b></span><i>│</i><span>છેલ્લા 3 અંક<br/><b>એકમનો અંક</b></span></div></div>`;
}else if(type==='quadratic'){
 visual=`<div class="d36-visual d36-quad"><div class="d36-equation"><span>વાક્ય/પ્રશ્ન</span><b>→</b><span>ax²+bx+c=0</span><b>→</b><strong>D=b²−4ac</strong></div><div class="d36-caption">અજ્ઞાત નક્કી કરો → સમીકરણ બનાવો → પ્રમાણિત સ્વરૂપમાં લાવો → મૂળ/વિકલ્પ ચકાસો.</div></div>`;
}else if(type==='linear'){
 visual=`<div class="d36-visual d36-line"><div class="d36-axis"><i></i><b>x</b><em>y</em><span>રેખા / છેદબિંદુ / intercept</span></div><div class="d36-caption">x અને y ના ગુણાંક અલગથી ઓળખો; પ્રશ્ન ratio, intercept કે coordinate વિશે છે તે નક્કી કરો.</div></div>`;
}else if(type==='poly'){
 visual=`<div class="d36-visual d36-poly"><div class="d36-poly-cards"><span><small>ઘાત</small><b>Degree</b></span><span><small>સહગુણક</small><b>a, b, c, d</b></span><span><small>શૂન્ય</small><b>p(α)=0</b></span></div></div>`;
}else if(type==='order'){
 visual=`<div class="d36-visual d36-order"><div class="d36-order-stack"><span>01 · કૌંસ</span><i>↓</i><span>02 · ઘાત / મૂળ</span><i>↓</i><span>03 · × અને ÷ ડાબેથી જમણે</span><i>↓</i><span>04 · + અને − ડાબેથી જમણે</span></div></div>`;
}else if(type==='identity'){
 visual=`<div class="d36-visual d36-identity"><div class="d36-identity-flow"><span>પદાવલીમાં pattern શોધો</span><b>→</b><span>યોગ્ય ઓળખાણ પસંદ કરો</span><b>→</b><span>મૂલ્ય બેસાડો</span></div></div>`;
}else{visual=`<div class="d36-visual d36-method"><div class="d36-equation"><span>આપેલ માહિતી</span><b>→</b><span>લાગુ નિયમ</span><b>→</b><strong>પરિણામ</strong></div></div>`;}
const cards=steps.map((s,i)=>`<article class="d36-step"><div class="d36-stepnum">${String(i+1).padStart(2,'0')}</div><div><small>${i===0?'READ THE GIVEN':i===steps.length-1?'CHECK THE RESULT':'NEXT MOVE'}</small><p>${esc(s)}</p></div></article>`).join('');
const options=opts.map((o,i)=>`<div class="d36-option ${i===q.a?'active':''}"><span>${'ABCDEF'[i]||i+1}</span><div>${esc(o)}</div>${i===q.a?'<b>✓</b>':''}</div>`).join('');
return `<section class="d36-solution" style="--accent:${th[0]};--deep:${th[1]}"><header class="d36-head"><div><div class="d36-kicker">${th[2]} · CCE MATHS</div><h3>${esc(q.topicsJsonSubtopic||'Question technique')}</h3><p>${th[3]}</p></div><div class="d36-stamp">${type.toUpperCase()}<small>METHOD</small></div></header><div class="d36-problem"><small>THE QUESTION</small><p>${esc(q.q||'')}</p></div>${visual}<div class="d36-work"><div class="d36-section-head"><span>WORKING</span><h4>એક પગલું, એક કારણ</h4></div>${cards}</div><div class="d36-result"><div><small>FINAL RESULT</small><strong>${esc(answer)}</strong><p>આ વિકલ્પ source question-bank ના answer key પ્રમાણે દર્શાવાયો છે.</p></div><div class="d36-options"><div class="d36-section-head"><span>OPTION AUDIT</span><h4>વિકલ્પો</h4></div>${options}</div></div></section>`;
}
function styles(){if(document.getElementById('d36-style'))return;const s=document.createElement('style');s.id='d36-style';s.textContent=`
.d36-solution{--accent:#38bdf8;--deep:#0c4a6e;margin:18px 0;border:1px solid color-mix(in srgb,var(--accent) 35%,#263247);border-radius:18px;overflow:hidden;background:#0b1220;color:#e6edf7;box-shadow:0 14px 38px #02061725;font:14px/1.7 Inter,"Noto Sans Gujarati",sans-serif}.d36-head{display:flex;justify-content:space-between;gap:16px;padding:22px;background:radial-gradient(ellipse at 85% 0%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 55%),linear-gradient(120deg,var(--deep),#101827 70%);border-bottom:1px solid #ffffff12}.d36-kicker,.d36-label{font-size:10px;letter-spacing:.15em;font-weight:850;color:var(--accent)}.d36-head h3{margin:7px 0 4px;font-size:20px;line-height:1.4;color:#fff}.d36-head p{margin:0;color:#b8c6d8}.d36-stamp{align-self:center;flex:0 0 auto;border:1px solid color-mix(in srgb,var(--accent) 50%,transparent);background:#ffffff08;color:var(--accent);border-radius:12px;padding:9px 11px;font-size:11px;font-weight:850;letter-spacing:.06em;text-align:center}.d36-stamp small{display:block;font-size:8px;letter-spacing:.16em}.d36-problem{margin:16px 18px 0;padding:14px 16px;border-left:3px solid var(--accent);background:#ffffff06;border-radius:0 12px 12px 0}.d36-problem small,.d36-result small{font-size:9px;letter-spacing:.15em;color:var(--accent);font-weight:850}.d36-problem p{margin:5px 0 0;line-height:1.8}.d36-visual{margin:14px 18px;padding:17px;border:1px solid #ffffff16;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--deep) 40%,#101827),#111a2a)}.d36-pills{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.d36-pills span{padding:8px 11px;border-radius:9px;border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);background:color-mix(in srgb,var(--accent) 10%,transparent);font-weight:750}.d36-caption{font-size:12px;color:#aebed2;margin-top:12px}.d36-equation,.d36-identity-flow{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px}.d36-equation span,.d36-equation strong,.d36-identity-flow span{padding:10px 12px;border-radius:9px;background:#ffffff08;border:1px solid #ffffff14;text-align:center}.d36-equation b,.d36-identity-flow b{color:var(--accent)}.d36-equation strong{color:#fff;background:color-mix(in srgb,var(--accent) 17%,transparent);border-color:color-mix(in srgb,var(--accent) 35%,transparent)}.d36-bars{display:grid;gap:8px;margin-top:10px}.d36-bar{display:grid;grid-template-columns:45px 1fr 30px;align-items:center;gap:9px}.d36-bar>span{height:11px;border-radius:99px;background:#ffffff0c;overflow:hidden}.d36-bar i{display:block;height:100%;border-radius:99px;background:var(--accent)}.d36-bar em{font-size:11px;color:#d5deeb;font-style:normal}.d36-root-grid,.d36-poly-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:10px}.d36-root-grid>div,.d36-poly-cards>span{padding:12px;border:1px solid #ffffff13;border-radius:10px;background:#ffffff05}.d36-root-grid small,.d36-poly-cards small{display:block;color:var(--accent);font-size:10px}.d36-root-grid b,.d36-poly-cards b{display:block;margin-top:5px;font-size:12px}.d36-cube-blocks{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:13px}.d36-cube-blocks span{padding:13px;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);border-radius:10px;text-align:center;background:#ffffff08}.d36-cube-blocks b{display:block;color:var(--accent)}.d36-cube-blocks i{color:var(--accent);font-style:normal;font-size:23px}.d36-order-stack{display:grid;grid-template-columns:1fr;justify-items:center;gap:5px}.d36-order-stack span{width:min(100%,390px);text-align:center;padding:8px 12px;border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);border-radius:8px;background:#ffffff07}.d36-order-stack i{font-style:normal;color:var(--accent)}.d36-axis{height:130px;position:relative;border-left:1px solid #94a3b8;border-bottom:1px solid #94a3b8;margin:6px 12px 0}.d36-axis:before{content:'';position:absolute;left:0;right:0;top:50%;border-top:1px dashed #ffffff24}.d36-axis:after{content:'';position:absolute;top:0;bottom:0;left:50%;border-left:1px dashed #ffffff24}.d36-axis i,.d36-axis b,.d36-axis em,.d36-axis span{position:absolute;font-style:normal}.d36-axis i{width:65%;height:2px;left:18%;top:55%;background:var(--accent);transform:rotate(-25deg)}.d36-axis b{right:-10px;bottom:-24px}.d36-axis em{left:-18px;top:-10px}.d36-axis span{bottom:8px;left:10px;font-size:11px;color:#cbd5e1}.d36-work{padding:17px 18px}.d36-section-head{display:flex;align-items:baseline;gap:10px;margin-bottom:10px}.d36-section-head>span{font-size:9px;letter-spacing:.15em;color:var(--accent);font-weight:850}.d36-section-head h4{margin:0;font-size:15px;color:#f8fafc}.d36-step{display:grid;grid-template-columns:42px 1fr;gap:12px;padding:12px 0;border-top:1px solid #ffffff0d}.d36-stepnum{width:38px;height:38px;display:grid;place-items:center;border-radius:12px;color:var(--accent);border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);background:color-mix(in srgb,var(--accent) 9%,transparent);font-weight:850}.d36-step small{font-size:9px;letter-spacing:.12em;color:#90a5bf;font-weight:850}.d36-step p{margin:4px 0 0;white-space:pre-wrap;line-height:1.9;color:#e6edf7}.d36-result{display:grid;grid-template-columns:minmax(170px,.8fr) minmax(0,1.2fr);gap:18px;padding:18px;background:#060b14;border-top:1px solid #ffffff14}.d36-result>div:first-child{padding:15px;border-radius:12px;border:1px solid color-mix(in srgb,var(--accent) 38%,transparent);background:color-mix(in srgb,var(--deep) 35%,transparent);align-self:start}.d36-result strong{display:block;margin-top:7px;font-size:24px;color:#fff;overflow-wrap:anywhere}.d36-result p{margin:8px 0 0;color:#aab9cc;font-size:11px}.d36-option{display:flex;align-items:center;gap:9px;margin:6px 0;padding:8px 10px;border:1px solid #ffffff12;border-radius:9px;background:#ffffff04}.d36-option>span{flex:0 0 24px;height:24px;display:grid;place-items:center;border-radius:7px;background:#ffffff0c;font-size:10px;font-weight:850}.d36-option>div{flex:1;overflow-wrap:anywhere}.d36-option.active{border-color:color-mix(in srgb,var(--accent) 55%,transparent);background:color-mix(in srgb,var(--accent) 9%,transparent)}.d36-option.active>span,.d36-option.active>b{color:var(--accent)}@media(max-width:620px){.d36-head{padding:16px}.d36-head h3{font-size:17px}.d36-stamp{font-size:9px;padding:7px}.d36-result{grid-template-columns:1fr;padding:15px}.d36-root-grid,.d36-poly-cards{grid-template-columns:1fr}.d36-visual,.d36-problem{margin-left:12px;margin-right:12px}.d36-work{padding:15px 12px}.d36-equation{gap:6px}.d36-equation span,.d36-equation strong{padding:8px;font-size:12px}}
`;document.head.appendChild(s)}
let count=0;Object.keys(PYQ).forEach(id=>(PYQ[id]||[]).forEach(q=>{if(!q||!q.topicsJsonKey)return;q.__sourceExplanation=String(q.__sourceExplanation||q.e||'');q.h=visual(q);q.__d36Type=detect(q);count++;}));if(typeof document!=='undefined')styles();console.info('[deep design engine] technique-specific visual solutions:',count);
})();
