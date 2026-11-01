/*
 * CCE Prelims Tracker — R17 mathematical modeling questions and notes
 * Split from the original index.html; logic/data retained.
 * Load order is controlled by index.html. Do not add async/defer or reorder without testing.
 */
(function(){
'use strict';

// ----------------------------------------------------------------------
// 1. QUESTION DATA (23 Questions from the provided JSON)
// ----------------------------------------------------------------------
const DATA = [
  { question_number:1, question_text:"ગાણિતિક મોડેલિંગ એટલે શું?", options:{ A:"વાસ્તવિક જીવનની કોઈ સમસ્યાને ગણિત, આંકડા, સૂત્રો અથવા સમીકરણના સ્વરૂપમાં રજૂ કરીને તેનો ઉકેલ અથવા અંદાજ મેળવવાની પ્રક્રિયા", B:"માત્ર ગણિતના પ્રશ્નો ઉકેલવાની રીત", C:"ચિત્રો દોરીને માહિતી દર્શાવવી", D:"કોઈપણ આધાર વગર અનુમાન કરવું" }, correct_answer:"A", explanation:"ગાણિતિક મોડેલિંગ એ વાસ્તવિક સમસ્યા -> ગણિતીય સ્વરૂપ -> ગણતરી/વિશ્લેષણ -> પરિણામ/અનુમાન મેળવવાની પ્રક્રિયા છે." },
  { question_number:2, question_text:"એક કંપનીના ઉત્પાદન અને ખર્ચ વચ્ચેનો સંબંધ નીચે મુજબ છે:\nકુલ ખર્ચ = સ્થિર ખર્ચ + (પ્રતિ એકમ ચલ ખર્ચ × ઉત્પાદન)\nસ્થિર ખર્ચ ₹20,000 અને પ્રતિ એકમ ચલ ખર્ચ ₹50 હોય, તો 600 એકમના ઉત્પાદન માટે કુલ ખર્ચ કેટલો થશે?", options:{ A:"₹30,000", B:"₹40,000", C:"₹50,000", D:"₹60,000" }, correct_answer:"C", explanation:"કુલ ખર્ચ = 20,000 + (50 × 600) = 20,000 + 30,000 = ₹50,000." },
  { question_number:3, question_text:"એક વિદ્યાર્થીએ પરીક્ષાના ગુણનો અંદાજ કાઢવા માટે નીચેનું મોડેલ બનાવ્યું:\nઅંતિમ ગુણ = 0.6 × ટેસ્ટ ગુણ + 0.4 × અસાઇનમેન્ટ ગુણ\nટેસ્ટમાં 70 અને અસાઇનમેન્ટમાં 80 ગુણ હોય તો અંતિમ ગુણ કેટલા આવશે?", options:{ A:"72", B:"74", C:"76", D:"78" }, correct_answer:"B", explanation:"અંતિમ ગુણ = (0.6 × 70) + (0.4 × 80) = 42 + 32 = 74." },
  { question_number:4, question_text:"એક કંપનીએ જાહેરાત ખર્ચ અને વેચાણ વચ્ચેનો સંબંધ શોધવા માટે મોડેલ બનાવ્યો:\nવેચાણ = 50,00,000 + 4 × જાહેરાત ખર્ચ\nજો જાહેરાત ખર્ચ ₹10 લાખ હોય, તો મોડેલ મુજબ વેચાણ કેટલું થશે?", options:{ A:"₹70 લાખ", B:"₹80 લાખ", C:"₹90 લાખ", D:"₹100 લાખ" }, correct_answer:"C", explanation:"વેચાણ = 50 લાખ + 4 × (10 લાખ) = 50 લાખ + 40 લાખ = ₹90 લાખ." },
  { question_number:5, question_text:"એક શહેરમાં પાણીની દૈનિક માંગનો અંદાજ આ મોડેલથી કરવામાં આવે છે:\nપાણીની માંગ = 120 + 0.15 × વસ્તી\nઅહીં વસ્તી હજારમાં છે અને પાણીની માંગ હજાર લિટરમાં છે. જો વસ્તી 2,000 હોય, તો માંગ કેટલી થશે?", options:{ A:"300 હજાર લિટર", B:"360 હજાર લિટર", C:"420 હજાર લિટર", D:"450 હજાર લિટર" }, correct_answer:"C", explanation:"પાણીની માંગ = 120 + 0.15 × 2000 = 120 + 300 = 420 હજાર લિટર." },
  { question_number:6, question_text:"કોઈ શહેરમાં વાહનોની સંખ્યા દર વર્ષે 10% વધે છે. હાલ 50,000 વાહનો છે. નીચેના પૈકી કઈ પદ્ધતિ આગામી 3 વર્ષની સંખ્યા માટે સૌથી યોગ્ય ગણિતીય મોડેલ છે?", options:{ A:"50,000 + 10 × 3", B:"50,000 × (1.10)^3", C:"50,000 × 10 × 3", D:"50,000 ÷ (1.10)^3" }, correct_answer:"B", explanation:"ચક્રવૃદ્ધિ વૃદ્ધિ માટે મોડેલ: P × (1 + r/100)^n = 50,000 × (1.10)^3." },
  { question_number:7, question_text:"એક શહેરની વસ્તી 2 લાખ છે અને દર વર્ષે 8%ના દરે વધે છે. જો આ વૃદ્ધિદર સ્થિર રહે એવું મોડેલ માનવામાં આવે, તો 3 વર્ષ પછીની વસ્તી માટે યોગ્ય મોડેલ કયું છે?", options:{ A:"2,00,000 + (8 × 3)", B:"2,00,000 × (1.08)^3", C:"2,00,000 × (0.08)^3", D:"2,00,000 + 8^3" }, correct_answer:"B", explanation:"દર વર્ષે 8% વધારા માટે 3 વર્ષ પછીની વસ્તી = 2,00,000 × (108/100)^3 = 2,00,000 × (1.08)^3." },
  { question_number:8, question_text:"એક મોડેલ દ્વારા વરસાદ અને પાક ઉત્પાદન વચ્ચેનો સંબંધ દર્શાવવામાં આવ્યો છે. પરંતુ નવા વર્ષના વાસ્તવિક આંકડા મોડેલના અનુમાનથી ખૂબ અલગ આવે છે. પ્રથમ યોગ્ય પગલું કયું હોવું જોઈએ?", options:{ A:"વાસ્તવિક આંકડા કાઢી નાખવા", B:"મોડેલને સાચું માનીને પરિણામ સ્વીકારી લેવું", C:"મોડેલની ધારણાઓ અને પરિમાણોની પુનઃચકાસણી કરવી", D:"બધા જૂના આંકડા કાઢી નાખવા" }, correct_answer:"C", explanation:"જ્યારે મોડેલના અનુમાન અને વાસ્તવિક આંકડા અલગ આવે ત્યારે મોડેલની ધારણાઓ અને પરિમાણોની પુનઃચકાસણી (Refinement) કરવી જોઈએ." },
  { question_number:9, question_text:"નીચેના પૈકી કયું ગાણિતિક મોડેલિંગનું સૌથી યોગ્ય ઉદાહરણ છે?", options:{ A:"ગણિતના સૂત્રો યાદ કરવા", B:"ગુણાકારના કોષ્ટક યાદ કરવા", C:"ટ્રાફિકના આંકડા પરથી મુસાફરીનો સમય અંદાજવો", D:"ગણિતના પ્રશ્નો લખવા" }, correct_answer:"C", explanation:"ટ્રાફિક ડેટાનો ઉપયોગ કરીને મુસાફરીના સમયનો અંદાજ મેળવવો એ વાસ્તવિક સમસ્યાનું મોડેલિંગ છે." },
  { question_number:10, question_text:"એક મોડેલ કોઈ ઉત્પાદનનું આગામી વર્ષનું વેચાણ ₹10 કરોડ દર્શાવે છે. વાસ્તવિક વેચાણ ₹8 કરોડ થયું. આથી કયું નિવેદન યોગ્ય છે?", options:{ A:"મોડેલ સંપૂર્ણપણે ખોટું છે.", B:"મોડેલ હંમેશા 100% સાચું હોવું જોઈએ.", C:"મોડેલના અનુમાન અને વાસ્તવિક પરિણામ વચ્ચેના તફાવતનું વિશ્લેષણ કરવું જોઈએ.", D:"વાસ્તવિક વેચાણ ખોટું છે." }, correct_answer:"C", explanation:"મોડેલના અનુમાન અને વાસ્તવિકતા વચ્ચેના તફાવત (Error Analysis) પરથી મોડેલ સુધારી શકાય છે." },
  { question_number:11, question_text:"એક કંપનીએ ઉત્પાદન ખર્ચ માટે મોડેલ બનાવ્યું: C(x) = 50,000 + 120x (અહીં x = ઉત્પાદિત એકમોની સંખ્યા). કંપની 800 એકમોનું ઉત્પાદન કરે છે. પ્રતિ એકમ વેચાણ કિંમત ₹200 હોય તો નફો કેટલો થશે?", options:{ A:"₹14,000", B:"₹24,000", C:"₹30,000", D:"₹40,000" }, correct_answer:"A", explanation:"ખર્ચ C = 50,000 + 120(800) = 50,000 + 96,000 = ₹1,46,000. કુલ આવક = 800 × 200 = ₹1,60,000. નફો = 1,60,000 - 1,46,000 = ₹14,000." },
  { question_number:12, question_text:"એક મોડેલમાં કોઈ શહેરનું દૈનિક પાણીનું વપરાશ વસ્તી સાથે સીધા પ્રમાણમાં હોવાનું માનવામાં આવ્યું છે. પરંતુ વાસ્તવિક માહિતી દર્શાવે છે કે વસ્તી વધે ત્યારે પ્રતિ વ્યક્તિ પાણીનો વપરાશ પણ વધે છે. આ સ્થિતિમાં સૌથી યોગ્ય નિર્ણય કયો?", options:{ A:"જૂનું મોડેલ જ રાખવું", B:"વસ્તીના આંકડા દૂર કરવા", C:"પ્રતિ વ્યક્તિ વપરાશને પણ મોડેલમાં સામેલ કરવો", D:"તમામ વાસ્તવિક આંકડા અવગણવા" }, correct_answer:"C", explanation:"નવા પરિબળો (પ્રતિ વ્યક્તિ વપરાશ દર) ને મોડેલમાં સામેલ કરવાથી મોડેલની ચોકસાઈ વધે છે." },
  { question_number:13, question_text:"એક મોડેલ મુજબ: Y = 100 + 5X. X = 20 માટે મોડેલ Y ની કંઈક કિંમત આપે છે, જ્યારે વાસ્તવિક Y = 230 છે. Percentage Error આશરે કેટલો છે? (વાસ્તવિક મૂલ્યને આધાર માનવું)", options:{ A:"10%", B:"13.04%", C:"15%", D:"30%" }, correct_answer:"B", explanation:"મોડેલ Y = 100 + 5(20) = 200. વાસ્તવિક Y = 230. ભૂલ = 230 - 200 = 30. ટકાવારી ભૂલ = (30 / 230) × 100 = 300 / 23 = 13.04%." },
  { question_number:14, question_text:"એક કંપનીના વેચાણ માટે નીચેના મોડેલો ઉપલબ્ધ છે:\nModel A: સરળ રેખીય મોડેલ\nModel B: ખૂબ જ જટિલ polynomial model\nModel C: અગાઉના ડેટા સાથે સારું પરિણામ અને નવા ડેટા પર પણ સારું પરિણામ\nભવિષ્યના અનુમાન માટે કયો મોડેલ પસંદ કરવો વધુ યોગ્ય છે?", options:{ A:"Model A હંમેશા શ્રેષ્ઠ", B:"Model B કારણ કે તે સૌથી જટિલ છે", C:"Model C કારણ કે તેની generalization સારી છે", D:"સૌથી વધુ parameters ધરાવતો model" }, correct_answer:"C", explanation:"જે મોડેલનું Generalization સારું હોય તે નવા ડેટા પર ચોક્કસ અનુમાન આપે છે, તેથી શ્રેષ્ઠ છે." },
  { question_number:15, question_text:"કોઈ મોડેલના Inputમાં 5% ફેરફાર કરતાં Outputમાં 40% ફેરફાર થાય છે. આ મોડેલ વિશે કયું નિવેદન યોગ્ય છે?", options:{ A:"Model insensitive છે", B:"Model highly sensitive છે", C:"Modelમાં કોઈ સંબંધ નથી", D:"Output હંમેશા સ્થિર રહેશે" }, correct_answer:"B", explanation:"ઈનપુટમાં નાનો ફેરફાર (5%) આઉટપુટમાં મોટો ફેરફાર (40%) લાવે તો મોડેલ Highly Sensitive કહેવાય." },
  { question_number:16, question_text:"એક શહેરના ટ્રાફિક માટે મોડેલ બનાવતી વખતે નીચેની ધારણા લેવામાં આવી: \"દરેક વાહન સમાન ઝડપે ચાલે છે.\" વાસ્તવિક પરિસ્થિતિમાં ટ્રાફિક સિગ્નલ, ભારે વાહનો અને રસ્તાની સ્થિતિને કારણે ઝડપમાં મોટો ફેરફાર થાય છે. આ ધારણા વિશે યોગ્ય તારણ કયું?", options:{ A:"ધારણા હંમેશા સાચી છે", B:"ધારણા મોડેલને સરળ બનાવે છે, પરંતુ તેની મર્યાદા છે", C:"ધારણા જરૂરી નથી", D:"મોડેલમાં કોઈ ફેરફાર શક્ય નથી" }, correct_answer:"B", explanation:"ધારણાઓ (Assumptions) મોડેલને ગણતરી માટે સરળ બનાવે છે પરંતુ તે વાસ્તવિક પરિસ્થિતિની મર્યાદા દર્શાવે છે." },
  { question_number:17, question_text:"એક મોડેલથી 2026નું વેચાણ ₹50 લાખ અનુમાનવામાં આવ્યું હતું, જ્યારે વાસ્તવિક વેચાણ ₹48 લાખ થયું. આના આધારે સૌથી યોગ્ય તારણ કયું?", options:{ A:"મોડેલ સંપૂર્ણપણે નિષ્ફળ છે", B:"મોડેલ સંપૂર્ણપણે સાચું છે", C:"મોડેલના Error નું વિશ્લેષણ કરવું જોઈએ", D:"વાસ્તવિક વેચાણ ખોટું છે" }, correct_answer:"C", explanation:"અનુમાનિત અને વાસ્તવિક મૂલ્ય વચ્ચેના નાના તફાવતનું એરર એનાલિસિસ કરીને મોડેલને વધુ સચોટ બનાવી શકાય છે." },
  { question_number:18, question_text:"એક મોડેલમાં નીચેનું સમીકરણ છે: Distance = Speed × Time. જો Speed km/hour અને Time minutesમાં આપવામાં આવે, તો સીધો ગુણાકાર કરવો યોગ્ય છે?", options:{ A:"હા, હંમેશા", B:"ના, Timeને કલાકમાં convert કરવું પડશે", C:"હા, જો speed 60થી ઓછી હોય", D:"ના, Distanceને minutesમાં convert કરવું પડશે" }, correct_answer:"B", explanation:"એકમની સુસંગતતા (Unit Consistency) જાળવવા માટે સમય (મિનીટ) ને કલાકમાં ફેરવવો જરૂરી છે." },
  { question_number:19, question_text:"એક મોડેલ કહે છે કે વરસાદ અને પાક ઉત્પાદન વચ્ચે સીધો સંબંધ છે. પરંતુ પૂર આવે ત્યારે ખૂબ વધારે વરસાદને કારણે પાકનું ઉત્પાદન ઘટે છે. આ પરિસ્થિતિ દર્શાવે છે કે:", options:{ A:"દરેક સંબંધ linear હોવો જરૂરી છે", B:"મોડેલમાં nonlinear effect સામેલ કરવો જરૂરી હોઈ શકે", C:"વરસાદનો પાક સાથે કોઈ સંબંધ નથી", D:"વધુ વરસાદ હંમેશા વધુ ઉત્પાદન આપે છે" }, correct_answer:"B", explanation:"અમુક હદ પછી નુકસાન થવું એ નોન-લીનિયર (Non-linear) સંબંધ દર્શાવે છે." },
  { question_number:20, question_text:"એક કંપની પાસે બે Model છે:\nModel A: Training Error = 2%, Testing Error = 3%\nModel B: Training Error = 0.1%, Testing Error = 18%\nનવા ડેટા પર કયો Model વધુ વિશ્વસનીય છે?", options:{ A:"Model A", B:"Model B", C:"બંને સમાન", D:"Training Errorના આધારે Model B" }, correct_answer:"A", explanation:"Model A નો ટેસ્ટિંગ એરર (3%) ઓછો હોવાથી નવા ડેટા પર Model A વધુ વિશ્વસનીય છે (Model B માં Overfitting છે)." },
  { question_number:21, question_text:"એક મોડેલમાં: Demand = 1000 - 10P + 5A. અહીં P = કિંમત અને A = જાહેરાત ખર્ચ. જો P = 40 અને A = 20 હોય, તો Demand કેટલી?", options:{ A:"500", B:"600", C:"700", D:"800" }, correct_answer:"C", explanation:"Demand = 1000 - 10(40) + 5(20) = 1000 - 400 + 100 = 700." },
  { question_number:22, question_text:"કોઈ સંખ્યાના 4 ગણા કરતાં 7 વધુ અને તે જ સંખ્યાના 2 ગણા કરતાં 5 ઓછા વચ્ચેનો તફાવત 18 છે તો તે સંખ્યા શોધો?", options:{ A:"1", B:"4", C:"3", D:"2" }, correct_answer:"C", explanation:"(4x + 7) - (2x - 5) = 18 => 2x + 12 = 18 => 2x = 6 => x = 3." },
  { question_number:23, question_text:"એક સંખ્યાના 5 ગણા અને બીજી સંખ્યાના 3 ગણા વચ્ચેનો તફાવત 17 છે. જો પહેલી સંખ્યા બીજી સંખ્યા કરતાં 1 વધુ હોય, તો પહેલી સંખ્યા શોધો?", options:{ A:"8", B:"9", C:"10", D:"7" }, correct_answer:"D", explanation:"પહેલી સંખ્યા x = 7, બીજી y = 6. ચકાસણી: 5(7) - 3(6) = 35 - 18 = 17. શરત સંતોષાય છે." }
];

// ----------------------------------------------------------------------
// 2. UTILITY FUNCTIONS
// ----------------------------------------------------------------------
const LETTERS = ["A", "B", "C", "D"];
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Visual helpers
const svgWrap = (w, h, content) =>
  `<svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${w}px;height:auto;background:#0b0f22;border-radius:12px;padding:8px">${content}</svg>`;

const box = (x, y, w, h, fill, txt, fs=11, col="#0b0f22") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}"/><text x="${x+w/2}" y="${y+h/2+fs/3}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${col}">${esc(txt)}</text>`;

const arrow = (x1, y1, x2, y2, col="#fff") =>
  `<defs><marker id="ar-${x1}-${y1}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${col}"/></marker></defs><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="2" marker-end="url(#ar-${x1}-${y1})"/>`;

const line = (x1, y1, x2, y2, col="#fff", w=2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}"/>`;

const txt = (x, y, t, fs=11, col="#fff", anchor="middle", weight="400") =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${fs}" font-weight="${weight}" fill="${col}">${esc(t)}</text>`;

const circle = (cx, cy, r, fill, stroke="#fff", sw=2) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

function card(n, t) { return `<div class="calc"><p><b>Step ${n}:</b> ${t}</p></div>`; }
function answer(t) { return `<div class="ans">✔ જવાબ: ${t}</div>`; }
function tip(t) { return `<p class="tp2">💡 ${t}</p>`; }

// ----------------------------------------------------------------------
// 3. SOLUTION GENERATOR (Rich Visual Solutions)
// ----------------------------------------------------------------------
function generateSolution(item) {
  const n = item.question_number;
  const q = item.question_text;
  const correct = item.correct_answer;
  const ansText = item.options[correct];
  let steps = [];
  let visual = "";

  // ============ Q1: Definition of Mathematical Modeling ============
  if (n === 1) {
    steps.push("ગાણિતિક મોડેલિંગ એટલે <b>વાસ્તવિક જીવનની સમસ્યાને ગણિતીય ભાષામાં ફેરવવી</b> અને તેનો ઉકેલ શોધવો.");
    steps.push("આ પ્રક્રિયામાં 4 મુખ્ય પગલાં છે: (1) વાસ્તવિક સમસ્યા ઓળખવી → (2) ગાણિતિક સમીકરણ બનાવવું → (3) ગણતરી/ઉકેલ → (4) પરિણામનું અર્થઘટન.");
    steps.push("વિકલ્પ B (માત્ર ગણિતના પ્રશ્નો) એ ખોટો છે — મોડેલિંગ વાસ્તવિક સમસ્યા સાથે જોડાયેલું છે.");
    steps.push("વિકલ્પ C (ચિત્રો દોરવા) અને D (આધાર વગર અનુમાન) પણ ખોટા છે.");
    steps.push("<b>તેથી સાચો વિકલ્પ A છે.</b>");
    visual = svgWrap(340, 120,
      box(5, 40, 70, 36, "#22d3ee", "વાસ્તવિક સમસ્યા", 10) +
      arrow(75, 58, 105, 58, "#f472b6") +
      box(105, 40, 70, 36, "#f472b6", "ગાણિતિક સ્વરૂપ", 10) +
      arrow(175, 58, 205, 58, "#fbbf24") +
      box(205, 40, 60, 36, "#fbbf24", "ઉકેલ/ગણતરી", 10) +
      arrow(265, 58, 295, 58, "#4ade80") +
      box(295, 40, 40, 36, "#4ade80", "પરિણામ", 10) +
      txt(170, 20, "ગાણિતિક મોડેલિંગની 4-પગલાં પ્રક્રિયા", 12, "#a5b4fc", "middle", "700") +
      txt(40, 100, "Step 1", 9, "#22d3ee") + txt(140, 100, "Step 2", 9, "#f472b6") + txt(235, 100, "Step 3", 9, "#fbbf24") + txt(315, 100, "Step 4", 9, "#4ade80")
    );
  }

  // ============ Q2: Fixed + Variable Cost ============
  else if (n === 2) {
    steps.push("આપેલ સૂત્ર: <b>કુલ ખર્ચ = સ્થિર ખર્ચ + (ચલ ખર્ચ પ્રતિ એકમ × ઉત્પાદન)</b>");
    steps.push("મૂલ્યો મૂકો: સ્થિર ખર્ચ = ₹20,000, ચલ ખર્ચ = ₹50/એકમ, ઉત્પાદન = 600 એકમ");
    steps.push("ચલ ખર્ચ કુલ = 50 × 600 = ₹30,000");
    steps.push("કુલ ખર્ચ = 20,000 + 30,000 = <b>₹50,000</b>");
    visual = svgWrap(300, 130,
      // Fixed cost bar
      `<rect x="20" y="30" width="80" height="30" rx="5" fill="#22d3ee"/>` +
      txt(60, 49, "સ્થિર ₹20,000", 10, "#0b0f22", "middle", "700") +
      // Variable cost bar (stacked)
      `<rect x="100" y="30" width="80" height="30" rx="5" fill="#f472b6"/>` +
      txt(140, 49, "ચલ ₹30,000", 10, "#0b0f22", "middle", "700") +
      // Total
      `<rect x="180" y="30" width="100" height="30" rx="5" fill="#4ade80"/>` +
      txt(230, 49, "કુલ ₹50,000", 11, "#0b0f22", "middle", "800") +
      txt(60, 80, "Fixed", 9, "#22d3ee") + txt(140, 80, "50×600", 9, "#f472b6") + txt(230, 80, "Total Cost", 9, "#4ade80") +
      txt(150, 110, "કુલ ખર્ચ = 20,000 + (50 × 600) = 50,000", 12, "#fff", "middle", "600") +
      txt(150, 15, "ખર્ચનું વિભાજન", 12, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q3: Weighted Average ============
  else if (n === 3) {
    steps.push("આપેલ મોડેલ: <b>અંતિમ ગુણ = 0.6 × ટેસ્ટ + 0.4 × અસાઇનમેન્ટ</b>");
    steps.push("ટેસ્ટ ગુણ = 70 → 0.6 × 70 = <b>42</b>");
    steps.push("અસાઇનમેન્ટ ગુણ = 80 → 0.4 × 80 = <b>32</b>");
    steps.push("અંતિમ ગુણ = 42 + 32 = <b>74</b>");
    visual = svgWrap(300, 130,
      // Test bar
      `<rect x="20" y="30" width="100" height="25" rx="5" fill="#22d3ee"/>` +
      txt(70, 47, "ટેસ્ટ: 70", 11, "#0b0f22", "middle", "700") +
      txt(70, 68, "× 0.6 = 42", 10, "#22d3ee", "middle", "600") +
      // Assignment bar
      `<rect x="20" y="80" width="100" height="25" rx="5" fill="#f472b6"/>` +
      txt(70, 97, "અસાઇનમેન્ટ: 80", 11, "#0b0f22", "middle", "700") +
      txt(70, 118, "× 0.4 = 32", 10, "#f472b6", "middle", "600") +
      // Result
      `<rect x="160" y="55" width="120" height="35" rx="8" fill="#4ade80"/>` +
      txt(220, 77, "કુલ = 74", 16, "#0b0f22", "middle", "800") +
      line(130, 65, 160, 65, "#fff", 2) + line(130, 95, 160, 80, "#fff", 2) +
      txt(150, 20, "Weighted Average Model", 11, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q4: Linear Sales-Advertising ============
  else if (n === 4) {
    steps.push("આપેલ સૂત્ર: <b>વેચાણ = 50,00,000 + 4 × જાહેરાત ખર્ચ</b>");
    steps.push("જાહેરાત ખર્ચ = ₹10 લાખ → 4 × 10 = ₹40 લાખ");
    steps.push("વેચાણ = 50 લાખ + 40 લાખ = <b>₹90 લાખ</b>");
    visual = svgWrap(320, 140,
      // Graph axes
      line(40, 120, 300, 120, "#8b92ad", 2) +
      line(40, 120, 40, 20, "#8b92ad", 2) +
      txt(300, 135, "જાહેરાત (લાખ)", 9, "#8b92ad", "middle") +
      txt(20, 25, "વેચાણ", 9, "#8b92ad", "middle") +
      // Line from (40, 90) to (280, 40) representing y=50+4x scaled
      line(40, 90, 280, 40, "#f472b6", 3) +
      // Point at x=10 (scaled to 40+10*16=200), y=90 (scaled 90-(40*1.25)=40)
      circle(200, 40, 5, "#4ade80") +
      txt(200, 30, "₹90L", 10, "#4ade80", "middle", "700") +
      txt(120, 75, "y = 50 + 4x", 11, "#f472b6", "middle", "700") +
      txt(160, 15, "Linear Model: વેચાણ vs જાહેરાત", 11, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q5: Water Demand Linear ============
  else if (n === 5) {
    steps.push("આપેલ મોડેલ: <b>માંગ = 120 + 0.15 × વસ્તી</b> (એકમ: હજાર)");
    steps.push("વસ્તી = 2000 (હજારમાં) → 0.15 × 2000 = <b>300</b>");
    steps.push("માંગ = 120 + 300 = <b>420 હજાર લિટર</b>");
    visual = svgWrap(320, 130,
      // Base demand
      `<rect x="20" y="30" width="60" height="30" rx="5" fill="#22d3ee"/>` +
      txt(50, 49, "120", 12, "#0b0f22", "middle", "700") +
      txt(50, 75, "આધાર માંગ", 9, "#22d3ee", "middle") +
      // Variable demand
      `<rect x="90" y="30" width="140" height="30" rx="5" fill="#f472b6"/>` +
      txt(160, 49, "0.15 × 2000 = 300", 11, "#0b0f22", "middle", "700") +
      txt(160, 75, "વસ્તી આધારિત", 9, "#f472b6", "middle") +
      // Total
      `<rect x="240" y="30" width="70" height="30" rx="5" fill="#4ade80"/>` +
      txt(275, 49, "420", 13, "#0b0f22", "middle", "800") +
      txt(275, 75, "કુલ", 9, "#4ade80", "middle") +
      txt(160, 110, "માંગ = 120 + 300 = 420 હજાર લિટર", 12, "#fff", "middle", "600") +
      txt(160, 15, "Water Demand Model", 11, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q6: Compound Growth (Vehicles) ============
  else if (n === 6) {
    steps.push("દર વર્ષે 10% વધારો = <b>ચક્રવૃદ્ધિ વૃદ્ધિ (Compound Growth)</b>");
    steps.push("સૂત્ર: <b>A = P × (1 + r/100)^n</b>");
    steps.push("P = 50,000, r = 10%, n = 3 → A = 50,000 × (1.10)^3");
    steps.push("(1.10)^3 = 1.331 → A ≈ 66,550 (પરંતુ પ્રશ્ન ફક્ત મોડેલ પૂછે છે)");
    steps.push("<b>તેથી સાચો વિકલ્પ B છે.</b>");
    visual = svgWrap(320, 160,
      // Year 0
      circle(50, 130, 18, "#22d3ee") + txt(50, 135, "50k", 10, "#0b0f22", "middle", "700") +
      txt(50, 155, "Year 0", 9, "#22d3ee") +
      // Year 1
      circle(130, 95, 18, "#f472b6") + txt(130, 100, "55k", 10, "#0b0f22", "middle", "700") +
      txt(130, 120, "Year 1", 9, "#f472b6") +
      // Year 2
      circle(210, 60, 18, "#fbbf24") + txt(210, 65, "60.5k", 10, "#0b0f22", "middle", "700") +
      txt(210, 85, "Year 2", 9, "#fbbf24") +
      // Year 3
      circle(290, 25, 18, "#4ade80") + txt(290, 30, "66.5k", 9, "#0b0f22", "middle", "700") +
      txt(290, 50, "Year 3", 9, "#4ade80") +
      // Arrows
      arrow(68, 125, 112, 100, "#8b92ad") + txt(90, 115, "×1.10", 8, "#8b92ad") +
      arrow(148, 90, 192, 65, "#8b92ad") + txt(170, 80, "×1.10", 8, "#8b92ad") +
      arrow(228, 55, 272, 30, "#8b92ad") + txt(250, 45, "×1.10", 8, "#8b92ad") +
      txt(170, 15, "Compound Growth Model", 11, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q7: Population Growth ============
  else if (n === 7) {
    steps.push("દર વર્ષે 8% વધારો = <b>ચક્રવૃદ્ધિ વૃદ્ધિ</b>");
    steps.push("સૂત્ર: <b>વસ્તી = P × (1 + r/100)^n</b>");
    steps.push("P = 2,00,000, r = 8%, n = 3 → વસ્તી = 2,00,000 × (1.08)^3");
    steps.push("<b>તેથી સાચો વિકલ્પ B છે.</b>");
    visual = svgWrap(320, 140,
      // Year labels
      txt(50, 130, "2L", 12, "#22d3ee", "middle", "700") +
      txt(130, 130, "2.16L", 12, "#f472b6", "middle", "700") +
      txt(210, 130, "2.33L", 12, "#fbbf24", "middle", "700") +
      txt(290, 130, "2.52L", 12, "#4ade80", "middle", "700") +
      // Bars
      `<rect x="35" y="90" width="30" height="30" rx="4" fill="#22d3ee"/>` +
      `<rect x="115" y="80" width="30" height="40" rx="4" fill="#f472b6"/>` +
      `<rect x="195" y="70" width="30" height="50" rx="4" fill="#fbbf24"/>` +
      `<rect x="275" y="60" width="30" height="60" rx="4" fill="#4ade80"/>` +
      // Arrow
      arrow(70, 105, 110, 100, "#8b92ad") + arrow(150, 95, 190, 90, "#8b92ad") + arrow(230, 85, 270, 80, "#8b92ad") +
      txt(170, 20, "Population Growth: P × (1.08)^3", 11, "#a5b4fc", "middle", "700") +
      txt(170, 40, "Compound Growth Formula", 10, "#8b92ad", "middle")
    );
  }

  // ============ Q8: Model Validation ============
  else if (n === 8) {
    steps.push("મોડેલના અનુમાન અને વાસ્તવિક આંકડા વચ્ચે <b>મોટો તફાવત</b> છે.");
    steps.push("આનો અર્થ એ નથી કે મોડેલ સંપૂર્ણ ખોટું છે — તેની <b>ધારણાઓ (assumptions)</b> ખોટી હોઈ શકે.");
    steps.push("પ્રથમ યોગ્ય પગલું: <b>મોડેલની ધારણાઓ અને પરિમાણોની પુનઃચકાસણી કરવી</b>.");
    steps.push("આને <b>Model Refinement</b> કહેવાય. વાસ્તવિક ડેટા સાથે મોડેલને ફરી ફિટ કરવો.");
    visual = svgWrap(320, 140,
      // Model prediction
      `<rect x="20" y="30" width="120" height="40" rx="8" fill="#f472b6"/>` +
      txt(80, 55, "મોડેલ અનુમાન", 11, "#0b0f22", "middle", "700") +
      // Actual data
      `<rect x="180" y="30" width="120" height="40" rx="8" fill="#22d3ee"/>` +
      txt(240, 55, "વાસ્તવિક ડેટા", 11, "#0b0f22", "middle", "700") +
      // Big gap arrow
      arrow(140, 50, 180, 50, "#fb7185") +
      txt(160, 40, "તફાવત!", 10, "#fb7185", "middle", "700") +
      // Action box
      `<rect x="60" y="95" width="200" height="30" rx="8" fill="#4ade80"/>` +
      txt(160, 115, "→ ધારણાઓની પુનઃચકાસણી (Refinement)", 11, "#0b0f22", "middle", "700") +
      txt(160, 15, "Model Error Analysis", 12, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q9: Example of Modeling ============
  else if (n === 9) {
    steps.push("ગાણિતિક મોડેલિંગ = <b>વાસ્તવિક ડેટાનો ઉપયોગ કરીને ભવિષ્યનો અંદાજ</b>.");
    steps.push("વિકલ્પ A અને B = માત્ર યાદશક્તિ (modeling નથી).");
    steps.push("વિકલ્પ D = પ્રશ્નો લખવા (modeling નથી).");
    steps.push("વિકલ્પ C = <b>ટ્રાફિક ડેટા → મુસાફરી સમયનો અંદાજ</b> — આ સાચું ઉદાહરણ છે.");
    visual = svgWrap(320, 130,
      // Traffic data
      box(10, 40, 70, 35, "#22d3ee", "ટ્રાફિક ડેટા", 9) +
      arrow(80, 57, 110, 57, "#f472b6") +
      // Model
      box(110, 40, 70, 35, "#f472b6", "ગાણિતિક મોડેલ", 9) +
      arrow(180, 57, 210, 57, "#fbbf24") +
      // Prediction
      box(210, 40, 80, 35, "#4ade80", "મુસાફરી સમય", 9) +
      txt(160, 100, "વાસ્તવિક ડેટા → મોડેલ → અંદાજ", 11, "#a5b4fc", "middle", "600") +
      txt(160, 20, "ગાણિતિક મોડેલિંગનું ઉદાહરણ", 11, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q10: Error Analysis ============
  else if (n === 10) {
    steps.push("મોડેલ અનુમાન = ₹10 કરોડ, વાસ્તવિક = ₹8 કરોડ");
    steps.push("તફાવત = 10 − 8 = ₹2 કરોડ (20% error)");
    steps.push("મોડેલ <b>સંપૂર્ણ ખોટું નથી</b> — તેમાં સુધારો શક્ય છે.");
    steps.push("યોગ્ય પગલું: <b>તફાવતનું વિશ્લેષણ કરવું</b> (Error Analysis).");
    visual = svgWrap(320, 130,
      // Model bar
      `<rect x="20" y="30" width="200" height="30" rx="5" fill="#f472b6"/>` +
      txt(120, 49, "મોડેલ ₹10 કરોડ", 11, "#0b0f22", "middle", "700") +
      // Actual bar
      `<rect x="20" y="70" width="160" height="30" rx="5" fill="#22d3ee"/>` +
      txt(100, 89, "વાસ્તવિક ₹8 કરોડ", 11, "#0b0f22", "middle", "700") +
      // Gap
      `<rect x="180" y="70" width="40" height="30" rx="5" fill="#fb7185"/>` +
      txt(200, 89, "₹2", 11, "#fff", "middle", "700") +
      txt(160, 115, "→ Error Analysis દ્વારા મોડેલ સુધારો", 11, "#4ade80", "middle", "600") +
      txt(160, 15, "Model vs Reality", 12, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q11: Cost Function & Profit ============
  else if (n === 11) {
    steps.push("આપેલ ખર્ચ ફંક્શન: <b>C(x) = 50,000 + 120x</b>");
    steps.push("x = 800 → C = 50,000 + 120(800) = 50,000 + 96,000 = <b>₹1,46,000</b>");
    steps.push("કુલ આવક = 800 × 200 = <b>₹1,60,000</b>");
    steps.push("નફો = આવક − ખર્ચ = 1,60,000 − 1,46,000 = <b>₹14,000</b>");
    visual = svgWrap(320, 150,
      // Cost bar
      `<rect x="40" y="30" width="100" height="35" rx="5" fill="#f472b6"/>` +
      txt(90, 52, "ખર્ચ ₹1.46L", 10, "#0b0f22", "middle", "700") +
      // Revenue bar
      `<rect x="160" y="30" width="120" height="35" rx="5" fill="#22d3ee"/>` +
      txt(220, 52, "આવક ₹1.60L", 10, "#0b0f22", "middle", "700") +
      // Profit
      `<rect x="160" y="75" width="30" height="35" rx="5" fill="#4ade80"/>` +
      txt(175, 97, "₹14k", 9, "#0b0f22", "middle", "700") +
      txt(175, 125, "નફો", 9, "#4ade80", "middle") +
      // Equations
      txt(160, 15, "C(x) = 50,000 + 120x", 12, "#a5b4fc", "middle", "700") +
      line(140, 47, 160, 47, "#8b92ad", 2)
    );
  }

  // ============ Q12: Adding New Parameters ============
  else if (n === 12) {
    steps.push("જૂનું મોડેલ ફક્ત <b>વસ્તી</b> પર આધારિત હતું.");
    steps.push("વાસ્તવિક ડેટા દર્શાવે છે કે <b>પ્રતિ વ્યક્તિ વપરાશ</b> પણ વધે છે.");
    steps.push("યોગ્ય નિર્ણય: <b>નવા પરિબળોને મોડેલમાં સામેલ કરવા</b> — જેમ કે 'પ્રતિ વ્યક્તિ વપરાશ દર'.");
    steps.push("આનાથી મોડેલ વધુ <b>realistic</b> અને <b>accurate</b> બને છે.");
    visual = svgWrap(320, 130,
      // Old model
      `<rect x="20" y="30" width="120" height="50" rx="8" fill="#8b92ad" opacity="0.5"/>` +
      txt(80, 50, "જૂનું મોડેલ", 11, "#fff", "middle", "700") +
      txt(80, 68, "ફક્ત વસ્તી", 9, "#fff", "middle") +
      // Arrow
      arrow(140, 55, 180, 55, "#4ade80") +
      // New model
      `<rect x="180" y="30" width="120" height="50" rx="8" fill="#4ade80"/>` +
      txt(240, 50, "નવું મોડેલ", 11, "#0b0f22", "middle", "700") +
      txt(240, 68, "વસ્તી + વપરાશ", 9, "#0b0f22", "middle") +
      txt(160, 105, "નવા પરિબળો ઉમેરો → વધુ ચોકસાઈ", 11, "#a5b4fc", "middle", "600")
    );
  }

  // ============ Q13: Percentage Error ============
  else if (n === 13) {
    steps.push("મોડેલ: Y = 100 + 5X, X = 20 → Y_model = 100 + 100 = <b>200</b>");
    steps.push("વાસ્તવિક Y = <b>230</b>");
    steps.push("ભૂલ (Error) = |230 − 200| = <b>30</b>");
    steps.push("Percentage Error = (Error / વાસ્તવિક) × 100 = (30/230) × 100 = <b>13.04%</b>");
    visual = svgWrap(320, 150,
      // Number line
      line(40, 80, 300, 80, "#8b92ad", 2),
      // Model point at 200 (scaled: 40 + 200*0.8 = 200)
      circle(200, 80, 8, "#f472b6") +
      txt(200, 60, "મોડેલ = 200", 10, "#f472b6", "middle", "700") +
      // Actual point at 230 (scaled: 40+230*0.8=224)
      circle(224, 80, 8, "#22d3ee") +
      txt(240, 105, "વાસ્તવિક = 230", 10, "#22d3ee", "middle", "700") +
      // Gap
      line(200, 80, 224, 80, "#fb7185", 4) +
      txt(212, 125, "ભૂલ = 30", 9, "#fb7185", "middle", "700") +
      // Formula
      `<rect x="60" y="15" width="200" height="22" rx="5" fill="#1e293b"/>` +
      txt(160, 30, "% Error = (30/230) × 100 = 13.04%", 11, "#4ade80", "middle", "700")
    );
  }

  // ============ Q14: Model Selection ============
  else if (n === 14) {
    steps.push("Model A: સરળ — ઓછું fit થાય (Underfitting)");
    steps.push("Model B: વધુ જટિલ — ટ્રેનિંગ પર સારું, નવા ડેટા પર ખરાબ (Overfitting)");
    steps.push("Model C: <b>Generalization સારું</b> — જૂના + નવા બંને ડેટા પર સારું");
    steps.push("યોગ્ય પસંદગી: <b>Model C</b>");
    visual = svgWrap(320, 140,
      // Three models
      `<rect x="10" y="30" width="90" height="50" rx="8" fill="#8b92ad" opacity="0.4"/>` +
      txt(55, 48, "Model A", 11, "#fff", "middle", "700") +
      txt(55, 66, "સરળ", 9, "#fff", "middle") +
      `<rect x="115" y="30" width="90" height="50" rx="8" fill="#fbbf24" opacity="0.5"/>` +
      txt(160, 48, "Model B", 11, "#0b0f22", "middle", "700") +
      txt(160, 66, "જટિલ (Overfit)", 9, "#0b0f22", "middle") +
      `<rect x="220" y="30" width="90" height="50" rx="8" fill="#4ade80"/>` +
      txt(265, 48, "Model C", 11, "#0b0f22", "middle", "700") +
      txt(265, 66, "Generalization", 9, "#0b0f22", "middle") +
      txt(160, 110, "→ નવા ડેટા પર Model C શ્રેષ્ઠ", 11, "#4ade80", "middle", "700") +
      txt(160, 15, "Model Selection", 12, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q15: Sensitivity ============
  else if (n === 15) {
    steps.push("Input ફેરફાર = 5%, Output ફેરફાર = 40%");
    steps.push("ગુણોત્તર = 40/5 = <b>8x</b> — એટલે Input કરતાં 8 ગણો Output ફેરફાર!");
    steps.push("આવા મોડેલને <b>Highly Sensitive</b> કહેવાય.");
    steps.push("નાનો ફેરફાર પણ મોટું પરિણામ બદલી નાખે છે.");
    visual = svgWrap(320, 120,
      // Input bar
      `<rect x="40" y="30" width="30" height="25" rx="4" fill="#22d3ee"/>` +
      txt(55, 47, "5%", 11, "#0b0f22", "middle", "700") +
      txt(55, 70, "Input", 9, "#22d3ee", "middle") +
      // Arrow
      arrow(80, 43, 160, 43, "#fb7185") +
      txt(120, 35, "×8", 11, "#fb7185", "middle", "700") +
      // Output bar
      `<rect x="170" y="20" width="120" height="35" rx="4" fill="#f472b6"/>` +
      txt(230, 42, "40%", 13, "#0b0f22", "middle", "700") +
      txt(230, 68, "Output", 9, "#f472b6", "middle") +
      txt(160, 100, "→ Highly Sensitive Model", 12, "#fb7185", "middle", "700")
    );
  }

  // ============ Q16: Assumptions ============
  else if (n === 16) {
    steps.push("મોડેલની ધારણા: <b>દરેક વાહન સમાન ઝડપે ચાલે છે</b>.");
    steps.push("વાસ્તવિકતામાં ટ્રાફિક, ભારે વાહનો, રસ્તાની સ્થિતિ → ઝડપ બદલાય.");
    steps.push("ધારણા <b>મોડેલને સરળ બનાવે છે</b> પરંતુ તેની <b>મર્યાદા</b> છે.");
    steps.push("ધારણાઓ વગર મોડેલ બની શકે નહીં — પરંતુ તેની અસર સમજવી જરૂરી.");
    visual = svgWrap(320, 140,
      // Assumption box
      `<rect x="10" y="30" width="140" height="50" rx="8" fill="#fbbf24"/>` +
      txt(80, 48, "ધારણા", 11, "#0b0f22", "middle", "700") +
      txt(80, 66, "સમાન ઝડપ", 9, "#0b0f22", "middle") +
      // Reality box
      `<rect x="170" y="30" width="140" height="50" rx="8" fill="#22d3ee"/>` +
      txt(240, 48, "વાસ્તવિકતા", 11, "#0b0f22", "middle", "700") +
      txt(240, 66, "ઝડપ બદલાય", 9, "#0b0f22", "middle") +
      // Arrow
      line(150, 55, 170, 55, "#8b92ad", 2) +
      txt(160, 100, "→ મોડેલ સરળ પણ મર્યાદિત", 11, "#4ade80", "middle", "700") +
      txt(160, 15, "Assumptions in Modeling", 12, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q17: Error Analysis (2026) ============
  else if (n === 17) {
    steps.push("અનુમાન = ₹50 લાખ, વાસ્તવિક = ₹48 લાખ");
    steps.push("તફાવત = 2 લાખ (4% error) — <b>નાની ભૂલ</b>.");
    steps.push("મોડેલ સંપૂર્ણ નિષ્ફળ નથી — <b>Error નું વિશ્લેષણ</b> કરીને સુધારો.");
    steps.push("<b>તેથી સાચો વિકલ્પ C છે.</b>");
    visual = svgWrap(320, 120,
      // Prediction
      `<rect x="20" y="30" width="120" height="35" rx="8" fill="#f472b6"/>` +
      txt(80, 52, "અનુમાન ₹50L", 10, "#0b0f22", "middle", "700") +
      // Actual
      `<rect x="160" y="30" width="120" height="35" rx="8" fill="#22d3ee"/>` +
      txt(220, 52, "વાસ્તવિક ₹48L", 10, "#0b0f22", "middle", "700") +
      // Small gap
      arrow(140, 47, 160, 47, "#fbbf24") +
      txt(150, 38, "₹2L", 9, "#fbbf24", "middle", "700") +
      txt(160, 95, "→ Error Analysis જરૂરી", 11, "#4ade80", "middle", "700") +
      txt(160, 15, "Small Error → Refine Model", 12, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q18: Unit Consistency ============
  else if (n === 18) {
    steps.push("સૂત્ર: <b>Distance = Speed × Time</b>");
    steps.push("Speed = km/hour, Time = minutes → <b>એકમ અલગ છે</b>!");
    steps.push("સીધો ગુણાકાર કરવો ખોટો છે. પહેલા Time ને કલાકમાં ફેરવો.");
    steps.push("ઉ.દા. 30 મિનિટ = 0.5 કલાક → Distance = Speed × 0.5");
    steps.push("<b>તેથી સાચો વિકલ્પ B છે.</b>");
    visual = svgWrap(320, 130,
      // Speed box
      box(10, 30, 90, 35, "#22d3ee", "Speed (km/h)", 10) +
      // Time box (wrong)
      box(120, 30, 90, 35, "#fb7185", "Time (min) ✗", 10) +
      // Arrow to correct
      arrow(150, 70, 150, 95, "#4ade80") +
      // Correct time
      box(110, 95, 100, 28, "#4ade80", "Time (hours) ✓", 10) +
      txt(160, 15, "Unit Consistency", 12, "#a5b4fc", "middle", "700") +
      line(105, 47, 120, 47, "#8b92ad", 2)
    );
  }

  // ============ Q19: Non-Linear Effect ============
  else if (n === 19) {
    steps.push("સામાન્ય રીતે વરસાદ ↑ → પાક ↑ (linear)");
    steps.push("પરંતુ <b>ખૂબ વધારે વરસાદ</b> → પૂર → પાક ↓");
    steps.push("આ સંબંધ સીધી રેખા નથી — <b>Non-linear</b> (વળાંક) છે.");
    steps.push("મોડેલમાં આ effect સામેલ કરવો જરૂરી છે.");
    visual = svgWrap(320, 150,
      // Axes
      line(40, 120, 300, 120, "#8b92ad", 2) + line(40, 120, 40, 20, "#8b92ad", 2) +
      txt(300, 135, "વરસાદ", 9, "#8b92ad", "middle") +
      txt(20, 25, "પાક", 9, "#8b92ad", "middle") +
      // Linear line
      line(40, 100, 160, 40, "#22d3ee", 3) +
      // Non-linear curve (bell-like: peak then drop)
      `<path d="M160 40 Q200 20 240 60 Q260 80 280 110" fill="none" stroke="#f472b6" stroke-width="3"/>` +
      // Labels
      txt(100, 80, "Linear", 10, "#22d3ee", "middle", "700") +
      txt(250, 95, "Non-linear", 10, "#f472b6", "middle", "700") +
      txt(160, 15, "Rainfall vs Crop Yield", 12, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q20: Overfitting ============
  else if (n === 20) {
    steps.push("Model A: Train 2%, Test 3% → <b>સારું generalization</b>");
    steps.push("Model B: Train 0.1%, Test 18% → <b>Overfitting</b> (ટ્રેનિંગ પર વધુ fit, નવા ડેટા પર ખરાબ)");
    steps.push("નવા ડેટા પર <b>Model A વધુ વિશ્વસનીય</b>.");
    visual = svgWrap(320, 140,
      // Model A
      `<rect x="20" y="30" width="130" height="60" rx="8" fill="#4ade80"/>` +
      txt(85, 50, "Model A", 11, "#0b0f22", "middle", "700") +
      txt(85, 68, "Train 2% / Test 3%", 9, "#0b0f22", "middle") +
      txt(85, 82, "✓ Generalization", 9, "#0b0f22", "middle", "700") +
      // Model B
      `<rect x="170" y="30" width="130" height="60" rx="8" fill="#fb7185"/>` +
      txt(235, 50, "Model B", 11, "#fff", "middle", "700") +
      txt(235, 68, "Train 0.1% / Test 18%", 9, "#fff", "middle") +
      txt(235, 82, "✗ Overfitting", 9, "#fff", "middle", "700") +
      txt(160, 115, "→ Model A વધુ વિશ્વસનીય", 12, "#4ade80", "middle", "700") +
      txt(160, 15, "Overfitting vs Generalization", 12, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q21: Demand Model ============
  else if (n === 21) {
    steps.push("આપેલ મોડેલ: <b>Demand = 1000 − 10P + 5A</b>");
    steps.push("P = 40 → −10 × 40 = <b>−400</b>");
    steps.push("A = 20 → +5 × 20 = <b>+100</b>");
    steps.push("Demand = 1000 − 400 + 100 = <b>700</b>");
    visual = svgWrap(320, 130,
      // Components
      `<rect x="10" y="30" width="80" height="30" rx="5" fill="#22d3ee"/>` +
      txt(50, 49, "1000", 11, "#0b0f22", "middle", "700") +
      txt(50, 75, "આધાર", 9, "#22d3ee", "middle") +
      // Minus
      txt(105, 49, "−", 16, "#fb7185", "middle", "800") +
      // Price effect
      `<rect x="120" y="30" width="70" height="30" rx="5" fill="#fb7185"/>` +
      txt(155, 49, "400", 11, "#fff", "middle", "700") +
      txt(155, 75, "કિંમત", 9, "#fb7185", "middle") +
      // Plus
      txt(205, 49, "+", 16, "#4ade80", "middle", "800") +
      // Ad effect
      `<rect x="220" y="30" width="70" height="30" rx="5" fill="#4ade80"/>` +
      txt(255, 49, "100", 11, "#0b0f22", "middle", "700") +
      txt(255, 75, "જાહેરાત", 9, "#4ade80", "middle") +
      // Result
      `<rect x="100" y="95" width="120" height="25" rx="5" fill="#fbbf24"/>` +
      txt(160, 113, "= 700", 14, "#0b0f22", "middle", "800") +
      txt(160, 15, "Demand = 1000 − 10P + 5A", 11, "#a5b4fc", "middle", "700")
    );
  }

  // ============ Q22: Linear Equation ============
  else if (n === 22) {
    steps.push("ધારો કે સંખ્યા = <b>x</b>");
    steps.push("સંખ્યાના 4 ગણા કરતાં 7 વધુ = <b>4x + 7</b>");
    steps.push("સંખ્યાના 2 ગણા કરતાં 5 ઓછા = <b>2x − 5</b>");
    steps.push("તફાવત = 18 → (4x + 7) − (2x − 5) = 18");
    steps.push("2x + 12 = 18 → 2x = 6 → <b>x = 3</b>");
    visual = svgWrap(320, 150,
      // Equation box
      `<rect x="20" y="15" width="280" height="30" rx="8" fill="#1e293b"/>` +
      txt(160, 35, "(4x + 7) − (2x − 5) = 18", 13, "#4ade80", "middle", "700") +
      // Steps
      `<rect x="40" y="60" width="240" height="25" rx="6" fill="#0f172a"/>` +
      txt(160, 77, "→ 4x + 7 − 2x + 5 = 18", 11, "#22d3ee", "middle", "600") +
      `<rect x="40" y="95" width="240" height="25" rx="6" fill="#0f172a"/>` +
      txt(160, 112, "→ 2x + 12 = 18", 11, "#fbbf24", "middle", "600") +
      `<rect x="40" y="130" width="240" height="25" rx="6" fill="#0f172a"/>` +
      txt(160, 147, "→ 2x = 6 → x = 3", 11, "#4ade80", "middle", "700")
    );
  }

  // ============ Q23: Two-Variable System ============
  else if (n === 23) {
    steps.push("ધારો: પહેલી સંખ્યા = x, બીજી = y");
    steps.push("સમીકરણ 1: <b>5x − 3y = 17</b>");
    steps.push("સમીકરણ 2: <b>x = y + 1</b>");
    steps.push("(2) ને (1) માં મૂકો: 5(y+1) − 3y = 17 → 2y + 5 = 17 → 2y = 12 → <b>y = 6</b>");
    steps.push("x = 6 + 1 = <b>7</b>");
    steps.push("ચકાસણી: 5(7) − 3(6) = 35 − 18 = 17 ✓");
    visual = svgWrap(320, 160,
      // Variables
      `<rect x="10" y="15" width="140" height="25" rx="6" fill="#22d3ee"/>` +
      txt(80, 33, "5x − 3y = 17", 11, "#0b0f22", "middle", "700") +
      `<rect x="170" y="15" width="140" height="25" rx="6" fill="#f472b6"/>` +
      txt(240, 33, "x = y + 1", 11, "#0b0f22", "middle", "700") +
      // Arrow
      arrow(160, 28, 170, 28, "#fbbf24") +
      // Substitution
      `<rect x="40" y="55" width="240" height="25" rx="6" fill="#0f172a"/>` +
      txt(160, 72, "5(y+1) − 3y = 17", 11, "#fbbf24", "middle", "600") +
      `<rect x="40" y="90" width="240" height="25" rx="6" fill="#0f172a"/>` +
      txt(160, 107, "2y + 5 = 17 → y = 6", 11, "#22d3ee", "middle", "600") +
      `<rect x="40" y="125" width="240" height="25" rx="6" fill="#0f172a"/>` +
      txt(160, 142, "x = 7, y = 6 → x = 7", 12, "#4ade80", "middle", "800")
    );
  }

  // Build HTML
  let html = `<h4>📌 Concept</h4><p><b>ગાણિતિક મોડેલિંગ</b>માં પ્રશ્નની માહિતીને સમીકરણમાં ફેરવીને ઉકેલવાનો હોય છે. નીચે પગલાવાર ઉકેલ અને વિઝ્યુલ સમજૂતી છે.</p>`;
  html += `<h4>🪜 Step-by-step ઉકેલ</h4>`;
  steps.forEach((s, i) => { html += card(i + 1, s); });
  if (visual) html += `<h4>📊 Visual સમજૂતી</h4><div class="vis">${visual}</div>`;
  html += answer(ansText);
  html += tip("દરેક પ્રશ્નમાં સૂત્ર, એકમ અને ગણતરી ધ્યાનથી ચકાસો. વિઝ્યુલ આકૃતિ પરથી પેટર્ન સમજો.");
  return html;
}

// ----------------------------------------------------------------------
// 4. QUESTION BUILDER
// ----------------------------------------------------------------------
function buildQuestion(item, idx) {
  return {
    t: "x",
    q: item.question_text,
    o: Object.values(item.options),
    a: Object.keys(item.options).indexOf(item.correct_answer),
    y: "ગાણિતિક મોડેલિંગ · Q" + (idx + 1),
    h: generateSolution(item),
    v: "",
    sv: ""
  };
}

// ----------------------------------------------------------------------
// 5. DETAILED NOTES (Enhanced with visuals, tables, examples)
// ----------------------------------------------------------------------
const NOTES_DATA = [
  ["🎯 ગાણિતિક મોડેલિંગ — પરિચય", [
    "ગાણિતિક મોડેલિંગ એ વાસ્તવિક જીવનની સમસ્યાને ગણિતીય ભાષામાં રજૂ કરીને તેનો ઉકેલ શોધવાની પ્રક્રિયા છે.",
    "## મોડેલિંગનાં 4 મુખ્ય પગલાં",
    "→ Step 1: વાસ્તવિક સમસ્યાને ઓળખવી (Real-world problem)",
    "→ Step 2: ચલ અને પરિમાણો નક્કી કરીને ગાણિતિક સમીકરણ બનાવવું (Formulate)",
    "→ Step 3: સમીકરણ ઉકેલવું / ગણતરી કરવી (Solve)",
    "→ Step 4: પરિણામનું અર્થઘટન અને ચકાસણી (Interpret & Validate)",
    "## ઉપયોગી ટેબલ: મોડેલિંગ vs સામાન્ય ગણિત",
    "| લક્ષણ | સામાન્ય ગણિત | ગાણિતિક મોડેલિંગ |",
    "| પ્રશ્નનો પ્રકાર | અમૂર્ત | વાસ્તવિક સમસ્યા |",
    "| ધારણાઓ | ઓછી | ખૂબ જરૂરી |",
    "| પરિણામ | ચોક્કસ | અંદાજિત પણ ઉપયોગી |",
    "★ મોડેલ હંમેશા 100% સાચું ન હોય — તે અંદાજ આપે છે."
  ]],
  ["📐 મુખ્ય પ્રકારના ગાણિતિક મોડેલ", [
    "## 1. રેખીય મોડેલ (Linear Model)",
    "§ y = mx + c",
    "Q: વેચાણ = 50,00,000 + 4 × જાહેરાત ખર્ચ ⇒ આ રેખીય મોડેલ છે, જ્યાં c = 50,00,000, m = 4.",
    "## 2. ચક્રવૃદ્ધિ વૃદ્ધિ મોડેલ (Exponential / Compound Growth)",
    "§ A = P × (1 + r/100)^n",
    "Q: વસ્તી 2 લાખ, 8% વાર્ષિક, 3 વર્ષ → 2,00,000 × (1.08)^3",
    "## 3. ભારિત સરેરાશ મોડેલ (Weighted Average)",
    "§ અંતિમ ગુણ = w1×x1 + w2×x2 + … (જ્યાં w નો સરવાળો = 1)",
    "Q: 0.6×ટેસ્ટ + 0.4×અસાઇનમેન્ટ = 0.6(70)+0.4(80)=74",
    "## 4. ખર્ચ-આવક મોડેલ (Cost-Revenue)",
    "§ કુલ ખર્ચ = સ્થિર ખર્ચ + (ચલ ખર્ચ × એકમ)",
    "§ નફો = આવક − ખર્ચ",
    "Q: C(x) = 50,000 + 120x, આવક = 800×200 → નફો ₹14,000"
  ]],
  ["📊 ડેટા અને મોડેલની ચોકસાઈ", [
    "## મોડેલની ચોકસાઈ માપવાના પગલાં",
    "§ Error = |અનુમાનિત મૂલ્ય − વાસ્તવિક મૂલ્ય|",
    "§ Percentage Error = (Error / વાસ્તવિક) × 100%",
    "## ઉદાહરણ ટેબલ",
    "| મોડેલ | Training Error | Testing Error | વિશ્વસનીયતા |",
    "| Model A | 2% | 3% | ✓ સારી (Generalization) |",
    "| Model B | 0.1% | 18% | ✗ Overfitting |",
    "## મહત્વના શબ્દો",
    "§ Generalization = નવા ડેટા પર મોડેલનું સારું પ્રદર્શન",
    "§ Overfitting = ટ્રેનિંગ ડેટા પર ખૂબ સારું, નવા ડેટા પર ખરાબ",
    "§ Underfitting = ટ્રેનિંગ પર પણ ખરાબ પ્રદર્શન",
    "§ Sensitivity = ઇનપુટ ફેરફારની આઉટપુટ પર અસર",
    "★ Percentage Error નાનો હોય તો મોડેલ સારું."
  ]],
  ["🧩 એકમની સુસંગતતા (Unit Consistency)", [
    "મોડેલમાં તમામ એકમ સમાન હોવા જોઈએ. અલગ એકમ હોય તો પહેલા એકમ રૂપાંતર કરો.",
    "## ઉપયોગી રૂપાંતરણ ટેબલ",
    "| શું | થી | ગુણક |",
    "| કિમી/કલાક | મીટર/સેકન્ડ | × 5/18 |",
    "| મીટર/સેકન્ડ | કિમી/કલાક | × 18/5 |",
    "| મિનિટ | કલાક | ÷ 60 |",
    "| લાખ | રૂપિયા | × 1,00,000 |",
    "Q: Distance = Speed × Time ⇒ Speed km/h, Time minutes હોય તો Time ÷ 60 કરો",
    "★ એકમ ખોટું હોય તો જવાબ 60 ગણો કે 1/60 ગણો થઈ જાય છે."
  ]],
  ["⚙️ ધારણાઓ (Assumptions) નું મહત્વ", [
    "દરેક મોડેલ અમુક ધારણાઓ પર બને છે. ધારણા સાચી ન હોય તો પરિણામ ખોટું આવે.",
    "Q: ટ્રાફિક મોડેલમાં ધારણા: 'દરેક વાહન સમાન ઝડપે ચાલે છે' ⇒ વાસ્તવિકતામાં ખોટું પણ મોડેલ સરળ બનાવે.",
    "## યોગ્ય ધારણા vs ખોટી ધારણા",
    "| યોગ્ય ધારણા | ખોટી ધારણા |",
    "| સામાન્ય ડેટા માટે સાચી | હંમેશા સાચી માનવી |",
    "| મર્યાદા સ્વીકારવી | મર્યાદા અવગણવી |",
    "★ જ્યારે મોડેલના પરિણામ અને વાસ્તવિકતા અલગ પડે, ત્યારે ધારણાઓ તપાસવી જોઈએ."
  ]],
  ["📉 ભૂલ વિશ્લેષણ (Error Analysis)", [
    "મોડેલના અનુમાન અને વાસ્તવિક પરિણામ વચ્ચેના તફાવતને ભૂલ કહેવાય.",
    "§ Error = |મોડેલ મૂલ્ય − વાસ્તવિક મૂલ્ય|",
    "§ % Error = (Error / વાસ્તવિક) × 100",
    "Q: મોડેલ Y = 200, વાસ્તવિક Y = 230 ⇒ ભૂલ 30 ⇒ % error = 13.04%",
    "## ભૂલનાં કારણો",
    "→ ધારણાઓ ખોટી હોવી",
    "→ ડેટા અધૂરો હોવો",
    "→ મોડેલ ખૂબ સરળ કે ખૂબ જટિલ હોવું",
    "→ સમય સાથે સંબંધ બદલાવો (Non-stationary)",
    "★ ભૂલ મળે તો મોડેલ સુધારવો (Refinement) જરૂરી."
  ]],
  ["🔍 સંવેદનશીલતા (Sensitivity)", [
    "ઇનપુટમાં થોડો ફેરફાર આઉટપુટમાં કેટલો મોટો ફેરફાર લાવે તે દર્શાવે છે.",
    "§ Sensitivity = (% Output ફેરફાર) / (% Input ફેરફાર)",
    "| ઇનપુટ ફેરફાર | આઉટપુટ ફેરફાર | પ્રકાર |",
    "| 5% | 5% | સંતુલિત |",
    "| 5% | 40% | Highly Sensitive ⚠️ |",
    "| 5% | 1% | Insensitive |",
    "★ વધુ સંવેદનશીલ મોડેલમાં નાની ભૂલ પણ મોટું પરિણામ બદલે."
  ]],
  ["📌 Quick Revision", [
    "મોડેલિંગના 4 પગલાં: સમસ્યા → સમીકરણ → ઉકેલ → ચકાસણી",
    "રેખીય: y = mx + c ; ચક્રવૃદ્ધિ: A = P(1+r/100)^n",
    "ભારિત સરેરાશ: Σwᵢxᵢ, જ્યાં Σwᵢ = 1",
    "% Error = (|Error| / વાસ્તવિક) × 100",
    "Generalization = નવા ડેટા પર સારું પ્રદર્શન",
    "Overfitting = ટ્રેનિંગ પર ખૂબ સારું, નવા પર ખરાબ",
    "એકમ સુસંગતતા = km/h × 5/18 = m/s",
    "ધારણાઓ મોડેલને સરળ પણ મર્યાદિત બનાવે"
  ]]
];

// ----------------------------------------------------------------------
// 6. ADD TO TRACKER
// ----------------------------------------------------------------------
function addToTracker() {
  if (typeof PYQ === "undefined" || typeof NOTES === "undefined") {
    console.error("Mathematical Modeling: PYQ or NOTES object not found.");
    return;
  }

  PYQ.r17 = PYQ.r17 || [];
  if (!PYQ.r17.some(q => q.q === DATA[0].question_text)) {
    DATA.forEach((item, i) => PYQ.r17.push(buildQuestion(item, i)));
  }

  NOTES.r17 = NOTES.r17 || [];
  if (!NOTES.r17.some(n => Array.isArray(n) && n[0] === "🎯 ગાણિતિક મોડેલિંગ — પરિચય")) {
    NOTES.r17.push(...NOTES_DATA);
  }

  try { delete BC.r17; } catch (e) {}
  try { if (typeof R === "function") R(); } catch (e) {}

  console.log("✅ Mathematical Modeling (r17) enhanced & added successfully.");
}

// ----------------------------------------------------------------------
// 7. INITIALIZE
// ----------------------------------------------------------------------
let attempts = 0;
function init() {
  if (typeof PYQ !== "undefined" && typeof NOTES !== "undefined") {
    addToTracker();
  } else if (attempts < 100) {
    attempts++;
    setTimeout(init, 100);
  } else {
    console.error("Mathematical Modeling: PYQ/NOTES objects not found.");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
})();

