/* Question-specific visual solution renderer for LCM/HCF, Percentage + Partnership, and Profit/Loss.
   Every diagram is generated from the actual question and worked steps; no stock images or repeated irrelevant badges. */
(function(){
  "use strict";
  const root=typeof window!=="undefined"?window:globalThis;
  const banks=typeof PYQ!=="undefined"?PYQ:(root.PYQ||{});
  const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const style=`font-family:inherit;color:#172033;border:1px solid #dbe3ee;border-radius:13px;overflow:hidden;background:#fff;margin:10px 0;`;
  const pill=(txt,bg="#f1f5f9",fg="#334155")=>`<span style="display:inline-block;padding:6px 10px;margin:2px 4px 2px 0;border-radius:8px;background:${bg};color:${fg};font-size:12px;font-weight:750">${esc(txt)}</span>`;
  const panel=(title,body)=>`<div style="padding:12px;border:1px solid #e2e8f0;border-radius:11px;background:#fbfdff;min-width:0"><div style="font-size:11px;color:#64748b;font-weight:800;letter-spacing:.4px;margin-bottom:7px">${esc(title)}</div>${body}</div>`;
  const numTokens=s=>[...String(s||"").matchAll(/₹\s*[\d,]+(?:\.\d+)?|\b\d+(?:,\d{3})*(?:\.\d+)?%?|\b\d+\s*:\s*\d+(?:\s*:\s*\d+)?/g)].map(x=>x[0].trim()).filter(Boolean);
  function stepsFor(q){let a=Array.isArray(q.sv)?q.sv:[];if(!a.length)a=String(q.e||"").split(/\n+/).map(x=>x.trim()).filter(Boolean);return a.map(x=>String(x).replace(/^\s*(?:\d+[.)]|→|⇒|[-•])\s*/,"").trim()).filter(Boolean)}
  function pickText(q){return `${q.t||""} ${q.q||""} ${q.e||""} ${(q.sv||[]).join(" ")}`.toLowerCase()}
  function factorVisual(q,txt,nums){
    const isH=/ગુ\.સા\.અ|hcf|મહત્તમ સામાન્ય અવયવ|મહત્તમ અવયવ/.test(txt), isLCM=/લ\.સા\.અ|lcm|સૌથી નાની સંખ્યા|ન્યૂનતમ સામાન્ય ગુણાકાર/.test(txt);
    const factors=[...String(q.e||"").matchAll(/([\d,]+)\s*=\s*([^\n.]+)/g)].slice(0,5).map(m=>[m[1],m[2].trim()]);
    if(factors.length){return panel(isH?"સામાન્ય અવયવ શોધો · HCF":"અવયવોની મહત્તમ ઘાત લો · LCM",`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:7px">${factors.map(([n,f])=>`<div style="border:1px solid #cbd5e1;border-radius:9px;padding:9px;background:#fff"><div style="font-size:12px;color:#64748b">${esc(n)}</div><div style="font-size:13px;font-weight:800;margin-top:5px;overflow-wrap:anywhere">${esc(f.replace(/×/g," · "))}</div></div>`).join("")}</div><div style="margin-top:9px;padding:9px;border-radius:8px;background:${isH?"#eff6ff":"#ecfdf5"};font-weight:800;color:${isH?"#1d4ed8":"#047857"}">${isH?"HCF = દરેકમાં સામાન્ય રહેલા અવયવોની નાની ઘાત":"LCM = દરેક અવયવની સૌથી મોટી ઘાત"}</div>`)}
    const ds=numTokens(q.q||"").filter(x=>/^\d/.test(x)).slice(0,5);
    return panel(isH?"HCF વિચારચિત્ર":"LCM વિચારચિત્ર",`<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">${ds.map(n=>pill(n,"#eff6ff","#1d4ed8")).join("")}</div><div style="text-align:center;font-size:18px;font-weight:900;color:#475569;margin:9px 0">${isH?"↓ સામાન્ય ભાગ":"↓ બધા જરૂરી ગુણક"}</div><div style="padding:10px;background:${isH?"#eff6ff":"#ecfdf5"};border-radius:9px;text-align:center;font-weight:800">${isH?"સૌથી મોટો સામાન્ય અવયવ":"સૌથી નાનો સામાન્ય ગુણાકાર"}</div>`);
  }
  function partnershipVisual(q,txt,nums,steps){
    const timeline=/મહિના|વર્ષ|પછી જોડ|ઉમેર|કાઢી|ઉપાડ|મધ્યમાં|બાકી સમય/.test(txt);
    const ratio=String(q.e||"").match(/(?:ગુણોત્તર|ratio)[^\n]{0,80}/i);
    if(timeline){
      const relevant=steps.filter(s=>/મહિના|વર્ષ|મૂડી|રોકાણ|ગુણનફાળો|વજન/.test(s)).slice(0,4);
      return panel("મૂડી × સમય · નફાનો આધાર",`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(125px,1fr));gap:8px">${(relevant.length?relevant:steps.slice(0,3)).map((s,i)=>`<div style="border-left:4px solid ${["#2563eb","#0d9488","#d97706"][i%3]};padding:8px 9px;background:#f8fafc;border-radius:0 8px 8px 0"><div style="font-size:10px;font-weight:800;color:#64748b;margin-bottom:4px">${["મૂડીનો સમયખંડ","આગળનો સમયખંડ","કુલ વજન"][i%3]}</div><div style="font-size:12px;line-height:1.55;font-weight:700">${esc(s)}</div></div>`).join("")}</div><div style="margin-top:9px;text-align:center;padding:9px;background:#ecfeff;border-radius:8px;color:#0f766e;font-weight:850">નફાનો ગુણોત્તર = દરેક ભાગીદારનું કુલ (મૂડી × સમય)</div>`)
    }
    const ratioLine=steps.find(s=>/ગુણોત્તર|ભાગ|નફો/.test(s))||steps[0]||"મૂડીના પ્રમાણ પ્રમાણે નફો વહેંચો.";
    const nums2=numTokens(ratioLine).slice(-4);
    return panel("નફાના ભાગનું ચિત્ર",`<div style="display:flex;gap:5px;align-items:stretch;flex-wrap:wrap">${(nums2.length?nums2:["A","B"]).map((n,i)=>`<div style="flex:1;min-width:55px;padding:10px 5px;text-align:center;border-radius:8px;background:${["#dbeafe","#ccfbf1","#fef3c7"][i%3]};color:#1e293b"><div style="font-size:10px;font-weight:800">${i===0?"ભાગીદાર A":i===1?"ભાગીદાર B":"ગુણોત્તર"}</div><div style="font-size:17px;font-weight:900;margin-top:4px">${esc(n)}</div></div>`).join("")}</div><div style="margin-top:8px;font-size:12px;line-height:1.6;color:#475569">${esc(ratioLine)}</div>`);
  }
  function percentageVisual(q,txt,nums,steps){
    const increase=/વધારો|વધે|વધાર|increase|increased|more than|વધારવામાં/.test(txt);
    const decrease=/ઘટાડ|ઘટે|ઓછો|ઓછી|decrease|decreased|discount|છૂટ/.test(txt);
    const successive=/ક્રમશઃ|એક પછી એક|successive|બે વખત|બે discount|વધારો અને ઘટાડો/.test(txt);
    const useful=steps.filter(s=>/%|ટકા|ટકાવારી|મૂળ|કુલ|વધારો|ઘટાડો|ભાગ|100/.test(s)).slice(0,3);
    if(successive) return panel("ટકાવારીને factorમાં ફેરવો",`<div style="display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap"><div style="padding:9px;background:#eff6ff;border-radius:8px;text-align:center"><small>મૂળ કિંમત</small><br><b>100%</b></div><div style="font-size:18px;font-weight:900">×</div><div style="padding:9px;background:#fef3c7;border-radius:8px;text-align:center"><small>પહેલો ફેરફાર</small><br><b>${increase?"(100 + r)%":"(100 − r)%"}</b></div><div style="font-size:18px;font-weight:900">×</div><div style="padding:9px;background:#dcfce7;border-radius:8px;text-align:center"><small>આગળનો ફેરફાર</small><br><b>factor</b></div></div><div style="margin-top:8px;font-size:12px;line-height:1.6">${useful.map(s=>`<div style="padding:4px 0;border-bottom:1px dashed #e2e8f0">${esc(s)}</div>`).join("")}</div>`);
    const numeric=nums.filter(x=>/^\d/.test(x)).slice(0,4);
    return panel("100 ને આધાર માનો · percentage model",`<div style="display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:3px">${Array.from({length:10},(_,i)=>`<span style="height:22px;border-radius:3px;background:${i<(decrease?7:increase?6:5)?(decrease?"#fbbf24":increase?"#34d399":"#60a5fa"):"#e2e8f0"}"></span>`).join("")}</div><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:8px">${numeric.map((n,i)=>pill(["આપેલ કિંમત","ટકા / ફેરફાર","ગણતરી","જવાબ"][i] ? `${["આપેલ","ટકા","ગણતરી","જવાબ"][i]}: ${n}`:n,i===0?"#eff6ff":i===1?"#fef3c7":"#ecfdf5",i===0?"#1d4ed8":i===1?"#92400e":"#166534")).join("")}</div><div style="margin-top:8px;font-size:12px;line-height:1.6">${useful.map(s=>`<div style="padding:4px 0;border-bottom:1px dashed #e2e8f0">${esc(s)}</div>`).join("")}</div>`);
  }
  function profitVisual(q,txt,nums,steps){
    const disc=/discount|ડિસ્કાઉન્ટ|વટાવ|છૂટ|marked price|અંકિત/.test(txt);
    const loss=/ખોટ|loss/.test(txt);
    const percent=/ટકાવારી|%|ટકા|percent/.test(txt);
    const money=nums.filter(x=>/₹/.test(x)||/[\d,]/.test(x)).slice(0,4);
    const tags=steps.filter(s=>/પડતર|વેચાણ|નફો|ખોટ|અંકિત|છૂટ|SP|CP|ટકા|%/.test(s)).slice(0,3);
    if(disc){return panel("અંકિત કિંમત → છૂટ → વેચાણ કિંમત",`<div style="display:grid;grid-template-columns:1fr 24px 1fr 24px 1fr;gap:3px;align-items:center;text-align:center"><div style="padding:9px 4px;border-radius:8px;background:#ede9fe"><div style="font-size:10px;color:#6d28d9;font-weight:800">MP</div><b style="font-size:12px">અંકિત કિંમત</b></div><div style="font-weight:900;color:#64748b">−</div><div style="padding:9px 4px;border-radius:8px;background:#fef3c7"><div style="font-size:10px;color:#92400e;font-weight:800">Discount</div><b style="font-size:12px">છૂટ</b></div><div style="font-weight:900;color:#64748b">=</div><div style="padding:9px 4px;border-radius:8px;background:#dcfce7"><div style="font-size:10px;color:#166534;font-weight:800">SP</div><b style="font-size:12px">વેચાણ</b></div></div><div style="margin-top:9px;font-size:12px;line-height:1.55">${tags.map(s=>`<div style="padding:4px 0;border-bottom:1px dashed #e2e8f0">${esc(s)}</div>`).join("")}</div>`)}
    if(money.length>=2){return panel(loss?"ખોટ કેવી રીતે બને?":"પડતરથી વેચાણ સુધી",`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div style="padding:10px;border-radius:9px;background:#eff6ff;border:1px solid #bfdbfe"><div style="font-size:10px;font-weight:800;color:#1d4ed8">CP · પડતર કિંમત</div><div style="font-size:18px;font-weight:900;margin-top:4px">${esc(money[0])}</div></div><div style="padding:10px;border-radius:9px;background:#f0fdf4;border:1px solid #bbf7d0"><div style="font-size:10px;font-weight:800;color:#15803d">SP · વેચાણ કિંમત</div><div style="font-size:18px;font-weight:900;margin-top:4px">${esc(money[1])}</div></div></div><div style="margin:8px 0;text-align:center;color:#475569;font-weight:800">${loss?"CP − SP = ખોટ":"SP − CP = નફો"}</div><div style="height:9px;border-radius:8px;background:#e2e8f0;overflow:hidden"><div style="height:100%;width:${loss?"45%":"70%"};background:${loss?"#f59e0b":"#10b981"};border-radius:8px"></div></div><div style="font-size:11px;color:#64748b;margin-top:6px">${percent?"ટકાવારી હંમેશા CP ને આધાર માનીને કાઢો.":"પહેલા CP અને SP નો તફાવત શોધો."}</div>`)}
    return panel("ટકાવારીનો આધાર = 100",`<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:3px">${Array.from({length:10},(_,i)=>`<span style="height:20px;border-radius:3px;background:${i<(loss?4:6)?(loss?"#fbbf24":"#34d399"):"#e2e8f0"}"></span>`).join("")}</div><div style="margin-top:8px;font-size:12px;line-height:1.6">${esc(steps.find(s=>/%|ટકા|નફો|ખોટ/.test(s))||steps[0]||"ટકાવારી = (નફો અથવા ખોટ ÷ પડતર કિંમત) × 100")}</div>`);
  }
  function visual(q,topic){
    const txt=pickText(q), steps=stepsFor(q), nums=numTokens(`${q.q||""} ${q.e||""}`);
    if(topic==="m2"){
      if(/ઘડિયાળ|એકસાથે|બેલ|વાગે|અંતરાલ|દરેક.*મિનિટ/.test(txt)) return panel("ચક્ર / ફરી મળવાનો સમય",`<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;justify-content:center">${nums.slice(0,4).map((n,i)=>pill(`${i+1}. ${n}`,"#fef3c7","#92400e")).join("")}</div><div style="text-align:center;font-size:24px;font-weight:900;color:#b45309;margin:8px 0">LCM</div><div style="text-align:center;font-size:12px;color:#475569">બધા અંતરાલોનો લ.સા.અ. = ફરી સાથે થવાનો સમય</div>`);
      return factorVisual(q,txt,nums);
    }
    if(topic==="m3") return /ભાગીદાર|ભાગીદારી|રોકાણ|મૂડી|નફાનો ગુણોત્તર|partner|capital|investment/.test(txt) ? partnershipVisual(q,txt,nums,steps) : percentageVisual(q,txt,nums,steps);
    return profitVisual(q,txt,nums,steps);
  }
  function build(q,topic,index){
    const st=stepsFor(q); const answer=(Array.isArray(q.o)&&q.o[q.a]!==undefined)?q.o[q.a]:"";
    const label=topic==="m2"?"LCM / HCF":topic==="m3"?"ટકાવારી + ભાગીદારી":"નફો / ખોટ";
    const stepHtml=st.map((s,i)=>`<div style="display:grid;grid-template-columns:28px 1fr;gap:9px;padding:9px 0;border-bottom:${i===st.length-1?"0":"1px solid #edf1f6"}"><span style="display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:${i===st.length-1?"#dcfce7":"#eaf0ff"};color:${i===st.length-1?"#166534":"#1d4ed8"};font-size:11px;font-weight:900">${i+1}</span><div style="font-size:13px;line-height:1.7;color:#273449;white-space:pre-wrap">${esc(s)}</div></div>`).join("");
    return `<div style="${style}"><div style="padding:13px 15px;background:#f8fafc;border-bottom:1px solid #e2e8f0"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"><span style="font-size:10px;letter-spacing:1px;color:#64748b;font-weight:900">WORKED SOLUTION · Q${index+1}</span>${pill(label,"#eaf0ff","#1d4ed8")}</div><div style="font-size:16px;font-weight:850;line-height:1.5;margin-top:7px">${esc(q.t||q.q||"પ્રશ્નનું સમાધાન")}</div></div><div style="padding:13px 15px"><div style="font-size:10px;color:#64748b;font-weight:900;letter-spacing:.7px;margin-bottom:8px">QUESTION-BASED VISUAL</div>${visual(q,topic)}<div style="font-size:10px;color:#64748b;font-weight:900;letter-spacing:.7px;margin:14px 0 3px">STEP-BY-STEP ગણતરી</div>${stepHtml||`<div style="font-size:13px;line-height:1.7">${esc(q.e||"આ પ્રશ્ન માટે વિસ્તૃત સમાધાન ઉપલબ્ધ નથી.")}</div>`}</div><div style="padding:11px 15px;background:#f0fdf4;border-top:1px solid #dcfce7;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span style="font-size:10px;font-weight:900;letter-spacing:.7px;color:#15803d">FINAL ANSWER</span><strong style="font-size:15px;color:#14532d">${esc(answer||"ઉપરના પગલાં પ્રમાણે")}</strong></div></div>`;
  }
  // Add the Percentage half to m3, then keep the existing Partnership sections in the same topic.
  if(typeof NOTES!=="undefined"){
    const existing=NOTES.m3||[];
    const hasPct=existing.some(x=>/ટકાવારીના આધાર|ટકાવારીના પ્રકાર|ટકા વધારો/.test(String(x&&x[0]||"")));
    if(!hasPct){
      const pct=[
        ["00 · ટકાવારીનો આધાર — 100 ભાગનું ચિત્ર",["ટકાવારી એટલે દરેક 100 ભાગમાંથી કેટલા ભાગ. એટલે % નો અર્થ ‘દર 100 માંથી’.","## Visual base","| ટકા | અપૂર્ણાંક | અર્થ |","|---:|---:|---|","| 10% | 10/100 = 1/10 | 100 માંથી 10 ભાગ |","| 25% | 25/100 = 1/4 | ચોથો ભાગ |","| 50% | 50/100 = 1/2 | અડધો ભાગ |","| 75% | 75/100 = 3/4 | ત્રણ ચોથા |","| 100% | 100/100 = 1 | આખું |","§ x% of N = (x/100) × N. પહેલા 100 થી ભાગો, પછી ટકા વડે ગુણો.","★ 25% = 1/4, 20% = 1/5, 12.5% = 1/8, 10% = 1/10 — મનગમતા ઝડપી ભાગ."]],
        ["01 · કોઈ સંખ્યાના x% શોધો",["§ x% of N = N × x/100.","## Visual route","કુલ N → 100 થી ભાગો → 1% → x થી ગુણો → x%","Q: 240 ના 15% ⇒ 240÷100×15 = 2.4×15 = 36.","Q: 800 ના 25% ⇒ 800÷4 = 200.","★ જ્યાં શક્ય હોય ત્યાં ટકાને સરળ અપૂર્ણાંકમાં ફેરવો: 25% = 1/4, 50% = 1/2, 75% = 3/4."]],
        ["02 · ટકાવારીથી મૂળ સંખ્યા શોધો",["જો x% = આપેલી રકમ A હોય, તો કુલ = A × 100/x.","## Visual reverse","ભાગ A → 100/x થી ગુણો → મૂળ કુલ","Q: કોઈ સંખ્યાના 20% = 60 ⇒ કુલ = 60×100/20 = 300.","⚠ 20% of N અને N ના 20 જેટલા ભાગ — બંને અલગ છે; પ્રશ્નમાં આપેલું શું છે તે ઓળખો."]],
        ["03 · ટકા વધારો / ઘટાડો",["વધારો પછી નવી કિંમત = મૂળ × (100 + r)/100.","ઘટાડો પછી નવી કિંમત = મૂળ × (100 − r)/100.","## Visual","મૂળ 100% → વધારો r% હોય તો (100+r)% ; ઘટાડો r% હોય તો (100−r)%","Q: ₹500 માં 20% વધારો ⇒ 500×120/100 = ₹600.","Q: ₹500 માં 20% ઘટાડો ⇒ 500×80/100 = ₹400.","⚠ વધારો 20% અને પછી ઘટાડો 20% થાય તો મૂળ કિંમત પાછી મળતી નથી."]],
        ["04 · સતત / successive ટકાવારી ફેરફાર",["બે ટકા ફેરફાર સીધા ઉમેરવા નહીં; દરેક ફેરફાર નવી કિંમત પર લાગે છે.","§ સતત વધારો a%, b% ⇒ કુલ અસર = a + b + ab/100 %.","§ સતત ઘટાડો a%, b% ⇒ કુલ ઘટાડો = a + b − ab/100 %.","## Example","20% વધારો પછી 10% વધારો ⇒ 1.20 × 1.10 = 1.32 ⇒ કુલ વધારો 32%.","20% છૂટ પછી 10% છૂટ ⇒ 0.80 × 0.90 = 0.72 ⇒ કુલ છૂટ 28%.","⚠ +a% અને −a% નો net ફેરફાર શૂન્ય નથી."]],
        ["05 · સરખામણી અને પરીક્ષા શોર્ટકટ",["A એ B કરતાં x% વધુ હોય ⇒ B એ A કરતાં (100x)/(100+x)% ઓછું.","A એ B કરતાં x% ઓછું હોય ⇒ B એ A કરતાં (100x)/(100−x)% વધુ.","જો વસ્તી/પગાર/કિંમત પહેલા r% વધે અને પછી ઘટે, તો દર વખતે નવી કિંમત આધાર બને.","## One-part method","કુલને 100 ભાગ માનો → આપેલ ટકા જેટલા ભાગ પસંદ કરો → જરૂરી હોય તો વાસ્તવિક કિંમતથી 1 ભાગની કિંમત શોધો.","⚠ ટકાવારી હંમેશા કયા આધાર પર છે તે લખો: મૂળ કિંમત, CP, વસ્તી કે કુલ ગુણ."]]
      ];
      NOTES.m3=pct.concat(existing);
    }
  }
  ["m2","m3","m4"].forEach(topic=>{
    const arr=banks[topic]; if(!Array.isArray(arr)) return;
    arr.forEach((q,i)=>{if(q && (q.q||q.t)) q.h=build(q,topic,i);});
  });
  root.QUESTION_SPECIFIC_VISUALS={version:2,topics:["m2","m3","m4"],description:"Question-specific diagrams with worked steps; no stock images."};
  console.info("[visual solutions] question-specific diagrams applied to m2/m3/m4");
})();
