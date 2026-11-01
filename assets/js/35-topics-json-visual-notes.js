/* CCE Study Tracker — detailed notes + visual worked solutions for topics.json imports.
 * Additive only: touches imported questions marked topicsJsonKey and NOTES m9-m13.
 * Load after 34-topics-json-question-bank.js. Does not rewrite other topic banks or styles.
 */
(function(){
 'use strict';
 if(typeof PYQ==='undefined'||typeof NOTES==='undefined'){
   console.error('[topics.json visuals] PYQ/NOTES unavailable; check script order.'); return;
 }
 const CONCEPTS=[{"mean_concepts":{"title":"સરેરાશ / મધ્યક (Mean / Average - x̄)","definition":"આપેલા તમામ અવલોકનોના સરવાળાને અવલોકનોની કુલ સંખ્યા વડે ભાગતા મળતી કિંમતને મધ્યક (સરેરાશ) કહેવાય છે.","formula":"x̄ = (તમામ અવલોકનોનો સરવાળો) / (અવલોકનોની કુલ સંખ્યા)","key_properties":["જો દરેક અવલોકનમાં k ઉમેરવામાં કે બાદ કરવામાં આવે, તો નવો મધ્યક પણ (જૂનો મધ્યક ± k) થાય.","જો દરેક અવલોકનને k વડે ગુણવામાં કે ભાગવામાં આવે, તો નવો મધ્યક પણ (જૂનો મધ્યક × k) અથવા (જૂનો મધ્યક / k) થાય.","સમાંતર શ્રેણી (AP) અથવા ક્રમિક સંખ્યાઓ માટે સરેરાશ = (પ્રથમ પદ + અંતિમ પદ) / 2"]},"median_concepts":{"title":"મધ્યસ્થ (Median - M)","definition":"આપેલા અવલોકનોને ચડતા કે ઊતરતા ક્રમમાં ગોઠવ્યા પછી બરાબર મધ્યમાં આવતા અવલોકનને મધ્યસ્થ કહે છે.","formulas":{"odd_n":"જો અવલોકનોની સંખ્યા n એકી હોય: M = ((n + 1) / 2) મું અવલોકન","even_n":"જો અવલોકનોની સંખ્યા n બેકી હોય: M = [(n/2) મું અવલોકન + (n/2 + 1) મું અવલોકન] / 2"}},"mode_concepts":{"title":"બહુલક (Mode - Z)","definition":"આપેલા માહિતીના સંગ્રહમાં સૌથી વધુ વખત પુનરાવર્તન પામતા અવલોકનને બહુલક કહે છે.","properties":["માહિતીમાં એક કરતા વધુ બહુલક હોઈ શકે છે (Bimodal / Multimodal).","જો કોઈ પણ અવલોકન પુનરાવર્તિત ન થતું હોય તો બહુલક મળતો નથી."],"empirical_formula":"અનુભવજન્ય સૂત્ર (Empirical Formula): Z = 3M - 2x̄ (બહુલક = 3 × મધ્યસ્થ - 2 × મધ્યક)"},"special_formulas":{"natural_numbers_mean":"પ્રથમ n પ્રાકૃતિક સંખ્યાઓની સરેરાશ = (n + 1) / 2","whole_numbers_mean":"પ્રથમ n પૂર્ણ સંખ્યાઓની સરેરાશ = (n - 1) / 2  અથવા (0 + (n-1)) / 2","squares_mean":"પ્રથમ n પ્રાકૃતિક સંખ્યાના વર્ગોની સરેરાશ = ((n + 1)(2n + 1)) / 6","cubes_mean":"પ્રથમ n પ્રાકૃતિક સંખ્યાના ઘનની સરેરાશ = [n(n + 1)²] / 4","odd_numbers_mean":"પ્રથમ n એકી સંખ્યાઓની સરેરાશ = n","even_numbers_mean":"પ્રથમ n બેકી સંખ્યાઓની સરેરાશ = n + 1","weighted_mean":"ભારિત સરેરાશ (Weighted Mean) = Σ(w_i × x_i) / Σw_i"}},{"bodmas_rule":{"title":"VBODMAS નિયમ","description":"સાદુરૂપ આપવા માટે કૌંસ અને ક્રિયાઓનો સરખો ક્રમ પાળવો અનિવાર્ય છે:","order":["V - Vinculum / Bar (રેખા કૌંસ) - માથા પર બાર હોય તે ક્રિયા સૌથી પહેલા કરવી","B - Brackets (કૌંસ) - પ્રથમ નાનો કૌંસ (), પછી છગડીયો કૌંસ {}, પછી મોટો કૌંસ []","O - Of / Orders (કા / નો / ની / નું / ઘાત / વર્ગમૂળ)","D - Division (ભાગાકાર ÷)","M - Multiplication (ગુણાકાર ×)","A - Addition (સરવાળો +)","S - Subtraction (બાદબાકી -)"]},"bracket_types":{"title":"કૌંસના પ્રકારો અને ક્રમ","types":["1. નાનો કૌંસ (Round Bracket / Parenthesis): ( )","2. છગડીયો કૌંસ (Curly Bracket / Brace): { }","3. મોટો કૌંસ (Square Bracket): [ ]"]},"algebraic_identities":{"title":"બીજગણિતીય విస్తરણના સૂત્રો","formulas":["(a + b)² = a² + 2ab + b²","(a - b)² = a² - 2ab + b²","a² - b² = (a - b)(a + b)","(a + b)³ = a³ + b³ + 3ab(a + b)","(a - b)³ = a³ - b³ - 3ab(a - b)","a³ + b³ = (a + b)(a² - ab + b²)","a³ - b³ = (a - b)(a² + ab + b²)","(a + b + c)² = a² + b² + c² + 2(ab + bc + ca)","a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca)","જો a + b + c = 0 હોય, તો a³ + b³ + c³ = 3abc"]},"reciprocal_shortcuts":{"title":"x + 1/x આધારિત શોર્ટકટ ટ્રીક્સ","rules":["જો x + 1/x = k હોય, તો x² + 1/x² = k² - 2","જો x - 1/x = k હોય, તો x² + 1/x² = k² + 2","જો x + 1/x = k હોય, તો x³ + 1/x³ = k³ - 3k","જો x - 1/x = k હોય, તો x³ - 1/x³ = k³ + 3k","જો x + 1/x = k હોય, તો x⁴ + 1/x⁴ = (k² - 2)² - 2","જો x + 1/x = 2 હોય, તો x = 1 (કોઈપણ ઘાત માટે xⁿ + 1/xⁿ = 2)"]}},{"1_to_30_squares":"1²=1, 2²=4, 3²=9, ..., 10²=100, 11²=121, ..., 20²=400, 21²=441, ..., 30²=900, 31²=961, 32²=1024 (4 અંકની નાનામાં નાની પૂર્ણવર્ગ સંખ્યા).","shortcut_square_ending_with_5":"(N5)² = [N × (N+1)] 25. દા.ત. (25)² = 2×3|25 = 625, (75)² = 7×8|25 = 5625, (115)² = 11×12|25 = 13225.","square_root_trick":"એકમનો અંક સરખામણી: 1 -> 1 કે 9, 4 -> 2 કે 8, 9 -> 3 કે 7, 6 -> 4 કે 6, 5 -> 5. છેલ્લેથી બે અંક છોડીને બાકીના અંકથી નાની પૂર્ણવર્ગ સંખ્યા શોધો.","important_square_root_examples":["√3249 = 57","√7056 = 84","√2304 = 48","√9216 = 96","√18769 = 137","√26244 = 162","√54756 = 234","અપવાદ: √1296 = 36 (યાદ રાખો)"],"1_to_20_cubes":"1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³=216, 7³=343, 8³=512, 9³=729, 10³=1000, 11³=1331, 12³=1728, 13³=2197, 14³=2744, 15³=3375, 16³=4096, 17³=4913, 18³=5832, 19³=6859, 20³=8000.","cube_root_trick":"એકમનો અંક સરખામણી: 1->1, 4->4, 5->5, 6->6, 9->9, 0->0 (અચળ). 2<->8 અને 3<->7. છેલ્લેથી 3 અંક છોડીને ડાબી બાજુના અંકથી નાનો ઘન જુઓ.","important_cube_root_examples":["∛91125 = 45","∛6859 = 19","∛46656 = 36","∛531441 = 81","∛21952 = 28","∛103823 = 47","∛456533 = 77"],"perfect_square_rules":["4 અંકની નાનામાં નાની પૂર્ણવર્ગ સંખ્યા = 1024 (32²)","4 અંકની મોટામાં મોટી પૂર્ણવર્ગ સંખ્યા = 9801 (99²)","5 અંકની નાનામાં નાની પૂર્ણવર્ગ સંખ્યા = 10000 (100²)","5 અંકની મોટામાં મોટી પૂર્ણવર્ગ સંખ્યા = 99856 (316²)","પૂર્ણવર્ગ સંખ્યાનો એકમનો અંક ક્યારેય 2, 3, 7 કે 8 હોઈ શકે નહીં.","કોઈપણ પૂર્ણવર્ગ સંખ્યાનો Digit Sum (અંકોનો સરવાળો) હંમેશા 1, 4, 7 કે 9 જ હોય.","કોઈપણ પૂર્ણવર્ગ સંખ્યાના છેલ્લા બે અંક 1 થી 24 ના વર્ગના છેલ્લા બે અંક જેવા જ હોય.","જો પૂર્ણવર્ગ સંખ્યામાં n અંકો હોય: એકી n માટે વર્ગમૂળમાં (n+1)/2 અંકો અને બેકી n માટે n/2 અંકો હોય."]},{"1_polynomials_basics":{"title":"બહુપદી (Polynomials) ના મૂળભૂત ગુણધર્મો","points":["બહુપદીની ઘાત (Degree of Polynomial): બહુપદીમાં ચલની મહત્તમ ઘાતને બહુપદીની ઘાત કહે છે.","સુરેખ બહુપદી (Linear Polynomial): ઘાત = 1, પ્રમાણિત સ્વરૂપ p(x) = ax + b (a ≠ 0). મહત્તમ 1 શૂન્ય.","દ્વિઘાત બહુપદી (Quadratic Polynomial): ઘાત = 2, પ્રમાણિત સ્વરૂપ p(x) = ax² + bx + c (a ≠ 0). મહત્તમ 2 શૂન્યો.","ત્રિઘાત બહુપદી (Cubic Polynomial): ઘાત = 3, પ્રમાણિત સ્વરૂપ p(x) = ax³ + bx² + cx + d (a ≠ 0). મહત્તમ 3 શૂન્યો."]},"2_quadratic_zeroes_relation":{"title":"દ્વિઘાત બહુપદીના શૂન્યો અને સહગુણકો વચ્ચેનો સંબંધ","points":["જો દ્વિઘાત બહુપદી p(x) = ax² + bx + c ના શૂન્યો α અને β હોય, તો:","1. શૂન્યોનો સરવાળો (Sum of Zeroes): α + β = -b / a = -(x નો સહગુણક) / (x² નો સહગુણક)","2. શૂન્યોનો ગુણાકાર (Product of Zeroes): α · β = c / a = અચળ પદ / (x² નો સહગુણક)","3. જો શૂન્યો α અને β આપેલા હોય તો બહુપદી: p(x) = k [x² - (α + β)x + (α · β)]"]},"3_cubic_zeroes_relation":{"title":"ત્રિઘાત બહુપદીના શૂન્યો અને સહગુણકો વચ્ચેનો સંબંધ","points":["જો ત્રિઘાત બહુપદી p(x) = ax³ + bx² + cx + d ના શૂન્યો α, β અને γ હોય, તો:","1. α + β + γ = -b / a","2. αβ + βγ + γα = c / a","3. α · β · γ = -d / a"]},"4_linear_equations_two_variables":{"title":"દ્વિચલ સુરેખ સમીકરણ યુગ્મ (Linear Equations in Two Variables)","points":["પ્રમાણિત સ્વરૂપ: a₁x + b₁y + c₁ = 0 અને a₂x + b₂y + c₂ = 0","1. છેદતી રેખાઓ / અનન્ય ઉકેલ (Unique Solution): a₁/a₂ ≠ b₁/b₂","2. સંપાતી રેખાઓ / અનંત ઉકેલો (Infinitely Many Solutions): a₁/a₂ = b₁/b₂ = c₁/c₂","3. સમાંતર રેખાઓ / એક પણ ઉકેલ ન મળે (No Solution): a₁/a₂ = b₁/b₂ ≠ c₁/c₂"]},"5_quadratic_equations_and_discriminant":{"title":"દ્વિઘાત સમીકરણ અને વિવેચક (Quadratic Equations & Discriminant)","points":["દ્વિઘાત સમીકરણનું પ્રમાણિત સ્વરૂપ: ax² + bx + c = 0 (a ≠ 0)","વિવેચક (Discriminant): D = b² - 4ac","બીજનો પ્રકાર (Nature of Roots):"," - જો D > 0 હોય: બે ભિન્ન અને વાસ્તવિક બીજ મળે. [x = (-b ± √D) / 2a]"," - જો D = 0 હોય: બે સમાન વાસ્તવિક બીજ મળે. [x = -b / 2a]"," - જો D < 0 હોય: એકપણ વાસ્તવિક બીજ ન મળે (બીજ વાસ્તવિક નથી)."]}}];
 const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const human=s=>String(s||'').replace(/^\d+_/,'').replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
 function flatten(value,key,lines){
   if(value==null)return;
   if(typeof value==='string'||typeof value==='number'){
     const v=String(value).trim(); if(!v)return;
     if(/formula|rule|equation|shortcut|identity|સૂત્ર|ટ્રિક/i.test(key||'')) lines.push('§ '+v);
     else lines.push(v); return;
   }
   if(Array.isArray(value)){
     value.forEach((v,i)=>{
       if(typeof v==='string'||typeof v==='number'){
         const str=String(v).trim(); if(str) lines.push((/formula|rule|order|point|step|property|સૂત્ર|નિયમ/i.test(key||'')?'§ ':'→ ')+str);
       } else flatten(v,key+'_'+(i+1),lines);
     }); return;
   }
   if(typeof value==='object'){
     if(value.definition) lines.push(String(value.definition));
     if(value.description) lines.push(String(value.description));
     if(value.formula) lines.push('§ '+value.formula);
     if(value.empirical_formula) lines.push('§ '+value.empirical_formula);
     for(const [k,v] of Object.entries(value)){
       if(['title','definition','description','formula','empirical_formula'].includes(k)) continue;
       if(k==='key_properties'||k==='properties'||k==='rules'||k==='order'||k==='types'||k==='formulas'||k==='points'){
         if(Array.isArray(v)) v.forEach(x=>lines.push((k==='key_properties'||k==='properties'?'★ ':'→ ')+String(x)));
         else flatten(v,k,lines);
       } else flatten(v,k,lines);
     }
   }
 }
 function section(title,obj,key){
   const lines=[];
   if(obj && typeof obj==='object' && !Array.isArray(obj) && obj.title) lines.push(String(obj.title));
   flatten(obj,key||title,lines);
   const clean=[...new Set(lines.map(x=>String(x).trim()).filter(Boolean))];
   return [title,clean.length?clean:['આ વિભાગમાં source JSON માં વધારાની નોંધ આપવામાં આવી નથી.']];
 }
 function addSections(id,items){
   NOTES[id]=NOTES[id]||[];
   const existing=new Set(NOTES[id].map(s=>s[0]));
   items.forEach(s=>{if(!existing.has(s[0])){NOTES[id].push(s);existing.add(s[0]);}});
 }
 // Keep each source chapter's concepts attached to its matching existing website topic.
 const m9=CONCEPTS[0]||{}, m10=CONCEPTS[1]||{}, m11=CONCEPTS[2]||{}, m13=CONCEPTS[3]||{};
 addSections('m9',[
   ['topics.json · સરેરાશ (Mean) — Concept + Formula',section('સરેરાશ',m9.mean_concepts,'mean_concepts')[1]],
   ['topics.json · મધ્યસ્થ (Median) — Position Method',section('મધ્યસ્થ',m9.median_concepts,'median_concepts')[1]],
   ['topics.json · બહુલક (Mode) — Frequency Method',section('બહુલક',m9.mode_concepts,'mode_concepts')[1]],
   ['topics.json · બધા જરૂરી Average Formulas',section('વિશેષ સૂત્રો',m9.special_formulas,'special_formulas')[1]]
 ]);
 addSections('m10',[
   ['topics.json · VBODMAS — ક્રમ અને ઉપયોગ',section('VBODMAS',m10.bodmas_rule,'bodmas_rule')[1]],
   ['topics.json · કૌંસના પ્રકાર અને ક્રમ',section('કૌંસના પ્રકાર',m10.bracket_types,'bracket_types')[1]],
   ['topics.json · Algebraic Identities — વિસ્તરણનાં સૂત્રો',section('બીજગણિતીય સૂત્રો',m10.algebraic_identities,'algebraic_identities')[1]],
   ['topics.json · Reciprocal Shortcuts',section('શોર્ટકટ્સ',m10.reciprocal_shortcuts,'reciprocal_shortcuts')[1]]
 ]);
 addSections('m11',[
   ['topics.json · 1 થી 30 સુધીના વર્ગ',section('વર્ગ',m11['1_to_30_squares'],'1_to_30_squares')[1]],
   ['topics.json · 5 પર પૂરા થતા અંકોના વર્ગની ટ્રિક',section('વર્ગની ટ્રિક',m11.shortcut_square_ending_with_5,'shortcut_square_ending_with_5')[1]],
   ['topics.json · વર્ગમૂળ શોધવાની રીત',section('વર્ગમૂળ',m11.square_root_trick,'square_root_trick')[1]],
   ['topics.json · મહત્વનાં વર્ગમૂળ ઉદાહરણો',section('વર્ગમૂળનાં ઉદાહરણો',m11.important_square_root_examples,'important_square_root_examples')[1]],
   ['topics.json · 1 થી 20 સુધીના ઘન',section('ઘન',m11['1_to_20_cubes'],'1_to_20_cubes')[1]],
   ['topics.json · ઘનમૂળની ટ્રિક',section('ઘનમૂળ',m11.cube_root_trick,'cube_root_trick')[1]],
   ['topics.json · મહત્વનાં ઘનમૂળ ઉદાહરણો',section('ઘનમૂળનાં ઉદાહરણો',m11.important_cube_root_examples,'important_cube_root_examples')[1]],
   ['topics.json · પૂર્ણવર્ગના નિયમો',section('પૂર્ણવર્ગના નિયમો',m11.perfect_square_rules,'perfect_square_rules')[1]]
 ]);
 // The last JSON chapter combines polynomial, linear-equation and quadratic-equation notes.
 addSections('m12',[
   ['topics.json · બહુપદી — મૂળભૂત સમજ',section('બહુપદી',m13['1_polynomials_basics'],'1_polynomials_basics')[1]],
   ['topics.json · દ્વિઘાત બહુપદીના શૂન્યો અને સહગુણકો',section('દ્વિઘાત બહુપદી',m13['2_quadratic_zeroes_relation'],'2_quadratic_zeroes_relation')[1]],
   ['topics.json · ત્રિઘાત બહુપદીના શૂન્યો અને સહગુણકો',section('ત્રિઘાત બહુપદી',m13['3_cubic_zeroes_relation'],'3_cubic_zeroes_relation')[1]]
 ]);
 addSections('m13',[
   ['topics.json · બે ચલવાળા સુરેખ સમીકરણ યુગ્મ',section('સુરેખ સમીકરણ',m13['4_linear_equations_two_variables'],'4_linear_equations_two_variables')[1]],
   ['topics.json · દ્વિઘાત સમીકરણ અને વિવેચક',section('દ્વિઘાત સમીકરણ',m13['5_quadratic_equations_and_discriminant'],'5_quadratic_equations_and_discriminant')[1]]
 ]);
 function splitSteps(text){
   let raw=String(text||'').replace(/\r/g,'').split(/\n+|\s*(?:⇒|=>|→)\s*/).map(s=>s.trim()).filter(Boolean);
   if(raw.length<=1){
     raw=String(text||'').split(/(?<=[।])\s+|(?<=\.)\s+(?=[^0-9])/).map(s=>s.trim()).filter(Boolean);
   }
   if(raw.length<=1){
     const one=raw[0]||String(text||'').trim();
     // Preserve numeric decimals; split only at semicolons or clearly chained calculation statements.
     raw=one.split(/\s*;\s*|\s+(?=(?:પછી|હવે|તેથી|અહીં|સૂત્ર:|ગણતરી:|સરવાળો|સરેરાશ|મધ્યસ્થ|મૂલ્ય|અંતે|કારણ કે)\b)/).map(s=>s.trim()).filter(Boolean);
   }
   return raw.length?raw:[String(text||'ઉકેલ ઉપલબ્ધ નથી.').trim()];
 }
 function visualSolution(q){
   const explanation=String(q.e||q.explanation||q.__sourceExplanation||'').trim();
   const steps=splitSteps(explanation);
   const options=Array.isArray(q.o)?q.o:[];
   const answer=options[q.a]||'જવાબ source JSON માંથી ઉપલબ્ધ નથી';
   const sub=String(q.topicsJsonSubtopic||'Concept').trim();
   const stepCards=steps.map((st,i)=>`<div class="tjson-step"><span class="tjson-n">${i+1}</span><div class="tjson-stepbody"><small>${i===0?'સમજવાની શરૂઆત':i===steps.length-1?'અંતિમ ગણતરી':'આગળનું પગલું'}</small><div>${esc(st)}</div></div></div>`).join('');
   const answerRows=options.map((o,i)=>`<div class="tjson-opt ${i===q.a?'is-answer':''}"><span>${'ABCDEF'[i]||i+1}</span><b>${esc(o)}</b>${i===q.a?'<em>સાચો જવાબ · JSON key</em>':''}</div>`).join('');
   return `<div class="tjson-solution">
    <div class="tjson-head"><div><span class="tjson-kicker">CCE · VISUAL WORKED SOLUTION</span><h3>${esc(sub)}</h3><p>પ્રશ્નને ભાગોમાં સમજો, પછી દરેક પગલું અનુસરો.</p></div><div class="tjson-mark">${steps.length}<small>STEPS</small></div></div>
    <div class="tjson-flow"><div><small>01 · પ્રશ્ન</small><b>શું શોધવાનું છે?</b><span>${esc(q.q||'')}</span></div><i>→</i><div><small>02 · પદ્ધતિ</small><b>${esc(sub||'આપેલ માહિતી')}</b><span>નીચેના પગલાંમાં source explanation ને ક્રમબદ્ધ રીતે જુઓ.</span></div><i>→</i><div><small>03 · પરિણામ</small><b>જવાબ ચકાસો</b><span>${esc(answer)}</span></div></div>
    <div class="tjson-body"><div class="tjson-section-title"><span>STEP-BY-STEP</span><b>ઉકેલની પ્રક્રિયા</b></div>${stepCards}</div>
    <div class="tjson-bottom"><div class="tjson-final"><small>FINAL ANSWER</small><div class="tjson-finalrow"><span>${'ABCDEF'[q.a]||'?'}</span><b>${esc(answer)}</b></div><p>જવાબ અને explanation આપેલા topics.json માંથી લેવામાં આવ્યા છે.</p></div><div class="tjson-options"><div class="tjson-section-title"><span>OPTION CHECK</span><b>વિકલ્પો</b></div>${answerRows}</div></div>
   </div>`;
 }
 function installStyles(){
   if(document.getElementById('topics-json-visual-styles'))return;
   const st=document.createElement('style'); st.id='topics-json-visual-styles';
   st.textContent=`
   .tjson-solution{margin-top:16px;border:1px solid rgba(96,165,250,.28);border-radius:20px;overflow:hidden;background:linear-gradient(155deg,rgba(15,23,42,.98),rgba(10,18,32,.98));color:#e5edf8;box-shadow:0 14px 38px rgba(2,8,23,.22);font-size:14px}
   .tjson-head{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:22px 22px 18px;background:radial-gradient(ellipse at 90% 0%,rgba(34,211,238,.15),transparent 48%),linear-gradient(110deg,rgba(59,130,246,.12),transparent)}
   .tjson-kicker,.tjson-section-title span{display:block;color:#67e8f9;font-size:10px;font-weight:800;letter-spacing:.16em}
   .tjson-head h3{font-size:20px;line-height:1.3;margin:8px 0;color:#f8fafc}.tjson-head p{margin:0;color:#a9bad0;line-height:1.6}
   .tjson-mark{width:62px;height:62px;flex:0 0 62px;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(34,211,238,.09);border:1px solid rgba(103,232,249,.32);font-size:25px;font-weight:850;color:#a5f3fc}.tjson-mark small{font-size:9px;letter-spacing:.12em;color:#7dd3fc}
   .tjson-flow{display:grid;grid-template-columns:1fr 22px 1fr 22px 1fr;align-items:stretch;gap:8px;padding:0 22px 20px}.tjson-flow>div{min-width:0;border:1px solid rgba(148,163,184,.16);border-radius:13px;padding:12px;background:rgba(30,41,59,.58);display:flex;flex-direction:column;gap:5px}.tjson-flow small{font-size:9px;letter-spacing:.1em;color:#7dd3fc;font-weight:800}.tjson-flow b{font-size:12px;color:#f8fafc}.tjson-flow span{font-size:11px;line-height:1.5;color:#b8c7d9;overflow-wrap:anywhere}.tjson-flow>i{align-self:center;text-align:center;color:#67e8f9;font-style:normal;font-size:20px}
   .tjson-body{padding:0 22px 18px}.tjson-section-title{display:flex;align-items:baseline;gap:10px;margin:0 0 12px}.tjson-section-title b{font-size:15px;color:#f8fafc}.tjson-step{display:grid;grid-template-columns:32px 1fr;gap:11px;position:relative;margin:0 0 10px}.tjson-step:not(:last-child):after{content:'';position:absolute;left:15px;top:34px;bottom:-12px;width:1px;background:linear-gradient(rgba(103,232,249,.5),rgba(103,232,249,.05))}.tjson-n{z-index:1;width:32px;height:32px;display:grid;place-items:center;border-radius:10px;background:rgba(59,130,246,.15);border:1px solid rgba(96,165,250,.35);font-weight:800;color:#bfdbfe}.tjson-stepbody{padding:9px 12px 11px;border-radius:12px;border:1px solid rgba(148,163,184,.14);background:rgba(15,23,42,.7);line-height:1.75;overflow-wrap:anywhere}.tjson-stepbody small{display:block;margin-bottom:3px;color:#7dd3fc;font-size:9px;letter-spacing:.08em;font-weight:800;text-transform:uppercase}.tjson-stepbody div{white-space:normal;color:#e2e8f0}
   .tjson-bottom{display:grid;grid-template-columns:minmax(190px,.78fr) minmax(0,1.22fr);gap:18px;padding:18px 22px 22px;background:rgba(2,6,23,.28);border-top:1px solid rgba(148,163,184,.14)}.tjson-final{border-radius:15px;padding:16px;border:1px solid rgba(52,211,153,.32);background:linear-gradient(145deg,rgba(16,185,129,.12),rgba(15,23,42,.55));align-self:start}.tjson-final>small{font-size:10px;letter-spacing:.15em;font-weight:850;color:#6ee7b7}.tjson-finalrow{display:flex;gap:10px;align-items:center;margin:10px 0}.tjson-finalrow span{width:32px;height:32px;display:grid;place-items:center;border-radius:10px;background:#065f46;color:#d1fae5;font-weight:850}.tjson-finalrow b{font-size:20px;color:#d1fae5;overflow-wrap:anywhere}.tjson-final p{font-size:10px;line-height:1.55;color:#9fb7b0;margin:8px 0 0}.tjson-options{min-width:0}.tjson-opt{display:flex;align-items:center;gap:9px;margin:6px 0;padding:8px 10px;border-radius:10px;border:1px solid rgba(148,163,184,.13);background:rgba(15,23,42,.55);color:#cbd5e1}.tjson-opt>span{width:23px;height:23px;display:grid;place-items:center;border-radius:7px;background:rgba(148,163,184,.12);font-size:10px;font-weight:800}.tjson-opt b{font-weight:600;overflow-wrap:anywhere}.tjson-opt em{margin-left:auto;font-size:9px;font-style:normal;color:#6ee7b7;white-space:nowrap}.tjson-opt.is-answer{border-color:rgba(52,211,153,.42);background:rgba(16,185,129,.1);color:#ecfdf5}.tjson-opt.is-answer>span{background:#047857;color:white}
   @media(max-width:620px){.tjson-head{padding:17px}.tjson-head h3{font-size:17px}.tjson-flow{grid-template-columns:1fr;padding:0 17px 17px}.tjson-flow>i{transform:rotate(90deg);height:14px}.tjson-body{padding:0 17px 16px}.tjson-bottom{grid-template-columns:1fr;padding:16px 17px 18px}.tjson-opt em{white-space:normal}.tjson-mark{width:52px;height:52px;flex-basis:52px}}
   `; document.head.appendChild(st);
 }
 let enhanced=0;
 Object.keys(PYQ).forEach(id=>{
   (PYQ[id]||[]).forEach(q=>{
     if(!q||!q.topicsJsonKey||q.__topicsJsonVisualDone)return;
     // Preserve original explanation for auditability, but render it as numbered visual steps.
     q.__sourceExplanation=String(q.e||q.explanation||'');
     q.h=visualSolution(q);
     q.__topicsJsonVisualDone=true; enhanced++;
   });
 });
 if(typeof document!=='undefined')installStyles();
 console.info(`[topics.json visuals] Added detailed notes; rendered ${enhanced} imported solutions as visual step cards.`);
})();
