/*
 * CCE Prelims Tracker — Core tracker, progress, rendering and save logic
 * Split from the original index.html; logic/data retained.
 * Load order is controlled by index.html. Do not add async/defer or reorder without testing.
 */
const SUB={m:"ગણિત",r:"રીઝનિંગ"},SE={m:"Quantitative Aptitude",r:"Reasoning"};
const IC={m:["🔢","🧩","💯","💰","🏦","⚖️","⏱️","🚆","📊","🧮","🌱","✖️","📈","📏","📐"],r:["🔐","👪","🎂","🧭","🕒","⭕","🏅","🔁","🔗","❓","🧠","🖼️","🎲","📋","🦋","➕","🛠️","📜","🧩","💬"]};
const W={l:25,n:25,p:35,c:15},L="ABCDE";
const NI=["Concept સમજ","Formulas / સૂત્રો","Methods & Tricks","Important Questions + Solutions","Common Mistakes"];
const NOTES_=typeof NOTES!=="undefined"?NOTES:{};
const KEY="cce_tracker_v1";
let S={t:{},q:[],a:{},vw:{},log:{}},FH=null,F="all";
/* ---------- storage: localStorage + IndexedDB + optional disk file ---------- */
const idb=new Promise(r=>{try{const q=indexedDB.open("cce",1);q.onupgradeneeded=()=>q.result.createObjectStore("k");q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)}catch(x){r(null)}});
const idbOp=(m,...a)=>idb.then(d=>d?new Promise(r=>{try{const q=d.transaction("k",m==="get"||m==="getAllKeys"?"readonly":"readwrite").objectStore("k")[m](...a);q.onsuccess=()=>r(q.result);q.onerror=()=>r()}catch(x){r()}}):undefined);
const today=(o=0)=>{const d=new Date(Date.now()-o*864e5);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
let tm;function save(){S.ts=Date.now();const j=JSON.stringify(S);try{localStorage.setItem(KEY,j)}catch(x){}
idbOp("put",j,"S");srvPut(j);{const el=document.getElementById("sv");if(el)el.textContent="● Saved "+new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}if(S._bk!==today()){S._bk=today();idbOp("put",j,"bk"+today());idbOp("delete","bk"+today(8))}
clearTimeout(tm);tm=setTimeout(fsWrite,600)}
async function fsWrite(){if(!FH)return;try{if(await FH.queryPermission({mode:"readwrite"})!=="granted")return;const w=await FH.createWritable();await w.write(JSON.stringify(S));await w.close()}catch(x){}}
async function fsLink(){try{FH=await showSaveFilePicker({suggestedName:"cce-data.json",types:[{accept:{"application/json":[".json"]}}]});await idbOp("put",FH,"fh");await fsWrite();R()}catch(x){}}
async function fsAllow(){try{if(FH&&await FH.requestPermission({mode:"readwrite"})==="granted"){await fsWrite();R()}}catch(x){}}
async function fsInit(){FH=await idbOp("get","fh")||null;if(FH&&await FH.queryPermission({mode:"readwrite"})==="granted"){try{const d=JSON.parse(await(await FH.getFile()).text());if(d&&d.t&&(d.ts||0)>(S.ts||0))S=d}catch(x){}}}
const SRV="http://localhost:8765";let srvOk=false;
const srvPut=j=>{if(srvOk)fetch(SRV+"/save",{method:"POST",body:j}).catch(()=>{})};
async function srvGet(){
  // The optional disk-save server is local-only. Do not probe localhost on GitHub Pages/mobile hosting.
  const localServerPage = location.protocol === "http:" &&
    (location.hostname === "localhost" || location.hostname === "127.0.0.1") &&
    location.port === "8765";
  if (!localServerPage) return null;
  try {
    const c = new AbortController();
    setTimeout(() => c.abort(), 1500);
    const r = await fetch(SRV + "/load", { signal: c.signal });
    const d = await r.json();
    srvOk = true;
    return d;
  } catch (x) { return null; }
}
async function boot(){let a=null,b=null;try{a=JSON.parse(localStorage.getItem(KEY))}catch(x){}try{b=JSON.parse(await idbOp("get","S")||"null")}catch(x){}
const c=await srvGet();S=[a,b,c].filter(Boolean).sort((x,y)=>(y.ts||0)-(x.ts||0))[0]||S;await fsInit().catch(()=>{});
S.vw=S.vw||{};S.log=S.log||{};S.mk=S.mk||{};if(srvOk)srvPut(JSON.stringify(S));
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();onNav();R(1)}

/* ---------- model ---------- */
const e=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const tn=id=>T[id[0]]&&T[id[0]][+id.slice(1)-1];
const tp=id=>{const t=S.t[id]||(S.t[id]={});t.nc=t.nc||[];t.note=t.note||"";t.url=t.url||"";if(id==="r19"&&t.lec===undefined)t.lec=true;return t};
const bump=()=>{S.log[today()]=(S.log[today()]||0)+1};
const dur=s=>{const h=Math.floor(s/3600),m=Math.round(s%3600/60);return h?h+"h "+(m?m+"m":""):m+"m"};
const hue=id=>(id[0]==="m"?215:320)+(+id.slice(1)*23)%90;
const cover=id=>`background:linear-gradient(135deg,hsl(${hue(id)} 70% 38%),hsl(${hue(id)+40} 75% 22%))`;
function st(id){const t=tp(id),vs=V[id]||[],wn=vs.filter(v=>S.vw[v[1]]).length,qs=build(id),rv=qs.filter(q=>S.a[q.id]&&S.a[q.id].rv),at=rv.filter(q=>S.a[q.id].sel!=null),ok=at.filter(q=>S.a[q.id].ok).length;
const fl=vs.length?wn/vs.length:(t.lec?1:0),fn=(t.nd!==undefined?t.nd:t.nc.filter(Boolean).length>=NI.length)?1:0,fp=qs.length?rv.length/qs.length:(t.pd?1:0);
return{id,s:id[0],i:+id.slice(1),t,vs,wn,sec:vs.reduce((a,v)=>a+v[2],0),n:qs.length,d:rv.length,at:at.length,ok,acc:at.length?Math.round(ok/at.length*100):null,fl,fn,fp,p:Math.round(fl*W.l+fn*W.n+fp*W.p+(t.clr?W.c:0)),qs}}
const all=()=>{const o=[];for(const s in T)T[s].forEach((_,i)=>o.push(st(s+(i+1))));return o};
const stt=x=>x.t.clr?["Clear","g"]:x.p>0?["ચાલુ","w"]:["બાકી",""];
const step=x=>x.fl<1?"Lecture":x.fn<1?"Notes":x.fp<1?"PYQ":"Mark Clear";
const ring=(p,g,z)=>`<div class="ring" style="width:${z}px;height:${z}px"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" cx="60" cy="60" r="52" stroke="url(#g${g})" data-ring="${p}"/></svg><b data-n="${p}" data-s="%">${p}%</b></div>`;
const tri=(a,b,c,ov,z)=>{const R=[52,41,30],cl=["#8b7bff","#22d3ee","#f472b6"];return `<div class="ring tri" style="width:${z}px;height:${z}px"><svg viewBox="0 0 120 120">${[a,b,c].map((v,i)=>`<circle class="bg" cx="60" cy="60" r="${R[i]}"/><circle class="fg" cx="60" cy="60" r="${R[i]}" stroke="${cl[i]}" data-ring="${v}"/>`).join("")}</svg><b data-n="${ov}" data-s="%">${ov}%</b></div>`};
const bar=p=>`<div class="pb"><i data-w="${p}"></i></div>`;
function anim(fresh){const a=document.getElementById("app");a.classList.toggle("fresh",!!fresh);
if(fresh)a.querySelectorAll(".rv").forEach((el,i)=>el.style.animationDelay=Math.min(i,16)*45+"ms");
requestAnimationFrame(()=>requestAnimationFrame(()=>{a.querySelectorAll("[data-w]").forEach(el=>el.style.width=el.dataset.w+"%");
a.querySelectorAll("[data-ring]").forEach(el=>{const C=2*Math.PI*el.getAttribute("r");el.style.strokeDasharray=C;el.style.strokeDashoffset=C*(1-el.dataset.ring/100)});
if(fresh)a.querySelectorAll("[data-n]").forEach(el=>{const n=+el.dataset.n,s=el.dataset.s||"",t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1100);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0)})}))}
/* ---- generators: PYQ ---- */
let PALO=innerWidth>860,PI=0,PF="all",SOL=0,SOLF=0,CUR=null,TI=null,PEND=null,NF=1;
const DG={N:"ઉત્તર",E:"પૂર્વ",S:"દક્ષિણ",W:"પશ્ચિમ",NE:"ઉત્તર-પૂર્વ",NW:"ઉત્તર-પશ્ચિમ",SE:"દક્ષિણ-પૂર્વ",SW:"દક્ષિણ-પશ્ચિમ"},DI="NESW",VC={N:[0,1],E:[1,0],S:[0,-1],W:[-1,0]},OPP={N:"S",S:"N",E:"W",W:"E",NE:"SW",SW:"NE",NW:"SE",SE:"NW"};
const TN={L:"ડાબે વળો",R:"જમણે વળો",U:"યુ-ટર્ન",F:"સીધા આગળ",N:"ઉત્તર તરફ",E:"પૂર્વ તરફ",S:"દક્ષિણ તરફ",W:"પશ્ચિમ તરફ"};
const ASK={face:"હવે તેનું મોઢું કઈ દિશામાં છે?",dist:"હવે તે શરૂઆતના બિંદુથી કેટલા અંતરે છે?",short:"હવે તેના શરૂઆતના બિંદુ અને અંતિમ બિંદુ વચ્ચેનું લઘુત્તમ અંતર કેટલું છે?",dd:"હવે તે શરૂઆતના બિંદુથી કઈ દિશામાં અને કેટલા અંતરે છે?",back:"શરૂઆતના બિંદુએ પાછા પહોંચવા માટે તેને કઈ દિશામાં અને કેટલું અંતર કાપવું પડશે?",home:"હવે અંતિમ સ્થાનથી તેનું ઘર કઈ દિશામાં અને કેટલા અંતરે છે?"};
const dirOf=(x,y)=>(y>0?"N":y<0?"S":"")+(x>0?"E":x<0?"W":"");
function walk(s){let f=s.s||null,x=0,y=0,st=[];s.m.forEach(m=>{const k=m[0],d=m[1],un=m[2]||s.u||"મીટર";
f=DI.includes(k)?k:k==="F"?f:k==="U"?DI[(DI.indexOf(f)+2)%4]:DI[(DI.indexOf(f)+(k==="R"?1:3))%4];
x+=VC[f][0]*d;y+=VC[f][1]*d;st.push({k,d,u:un,f,x,y})});return{f,x,y,st}}
const dans=(s,w)=>{const d=Math.round(Math.hypot(w.x,w.y)*100)/100,r=dirOf(w.x,w.y);return s.ask==="face"?w.f:s.ask==="dist"||s.ask==="short"?d:s.ask==="dd"?[d,r]:[d,OPP[r]]};
const ofm=(o,u)=>Array.isArray(o)?`${o[0]} ${u}, ${DG[o[1]]}`:typeof o==="number"?`${o} ${u}`:(DG[o]||o);
function pathSVG(w,u){const P=[[0,0],...w.st.map(p=>[p.x,p.y])],xs=P.map(p=>p[0]),ys=P.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),W=270,H=160,sc=Math.min(W/((x1-x0)||1),H/((y1-y0)||1),48),
tx=p=>40+(p[0]-x0)*sc+(W-(x1-x0)*sc)/2,ty=p=>200-(p[1]-y0)*sc-(H-(y1-y0)*sc)/2,E=P[P.length-1],us=u==="કિમી"?"કિમી":"મી",f1=n=>n.toFixed(1);
let g=`<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#67e8f9"/></marker></defs>`;
for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i],X1=tx(a),Y1=ty(a),X2=tx(b),Y2=ty(b),L=Math.hypot(X2-X1,Y2-Y1);if(L<1)continue;
g+=`<line x1="${f1(X1)}" y1="${f1(Y1)}" x2="${f1(X2)}" y2="${f1(Y2)}" stroke="#67e8f9" stroke-width="3.5" stroke-linecap="round" marker-end="url(#ar)"/><text x="${f1((X1+X2)/2-(Y2-Y1)/L*14)}" y="${f1((Y1+Y2)/2+(X2-X1)/L*14+4)}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" stroke="#0b1020" stroke-width="3" paint-order="stroke">${w.st[i-1].d} ${us}</text>`}
if(Math.hypot(tx(E)-tx(P[0]),ty(E)-ty(P[0]))>6){const d=Math.round(Math.hypot(w.x,w.y)*100)/100;g+=`<line x1="${f1(tx(P[0]))}" y1="${f1(ty(P[0]))}" x2="${f1(tx(E))}" y2="${f1(ty(E))}" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="6 5"/><text x="${f1((tx(P[0])+tx(E))/2+10)}" y="${f1((ty(P[0])+ty(E))/2-6)}" font-size="11" font-weight="700" fill="#f9a8d4" stroke="#0b1020" stroke-width="3" paint-order="stroke">અંતર ${d} ${us}</text>`}
P.forEach((p,i)=>{const X=tx(p),Y=ty(p),s0=i===0,e0=i===P.length-1&&i>0;g+=`<circle cx="${f1(X)}" cy="${f1(Y)}" r="${s0||e0?8:5}" fill="${s0?"#4ade80":e0?"#f472b6":"#fff"}"/>`;if(s0)g+=`<text x="${f1(X-10)}" y="${f1(Y+22)}" font-size="11" font-weight="700" fill="#4ade80" stroke="#0b1020" stroke-width="3" paint-order="stroke">શરૂઆત</text>`;if(e0)g+=`<text x="${f1(X+10)}" y="${f1(Y-12)}" font-size="11" font-weight="700" fill="#f472b6" stroke="#0b1020" stroke-width="3" paint-order="stroke">અંત</text>`});
g+=`<text x="335" y="24" text-anchor="middle" font-weight="800" fill="#fff" font-size="14">N</text><path d="M335 56 V32" stroke="#fff" stroke-width="3" marker-end="url(#ar)"/>`;
return `<svg viewBox="0 0 360 230" style="width:100%;max-width:620px">${g}</svg>`}
function dsol(s,w,u,A){const d=Math.round(Math.hypot(w.x,w.y)*100)/100,r=dirOf(w.x,w.y),pos=(x,y)=>(y?`${y>0?"ઉત્તર":"દક્ષિણ"} ${Math.abs(y)}`:"ઉ/દ 0")+" · "+(x?`${x>0?"પૂર્વ":"પશ્ચિમ"} ${Math.abs(x)}`:"પૂ/પ 0"),sm=c=>w.st.filter(p=>p.f===c&&p.d).map(p=>p.d);
let h=`<h4>1️⃣ Concept</h4><p>દિશા ચક્ર: <b>N → E → S → W → N</b>. જમણે વળો = ચક્રમાં 1 સ્થાન આગળ, ડાબે વળો = 1 સ્થાન પાછળ, યુ-ટર્ન = 2 સ્થાન. ${s.ask==="face"?"આ પ્રશ્નમાં ફક્ત અંતિમ દિશા પૂછી છે, તેથી અંતર ગણવાની જરૂર નથી.":"અહીં દરેક દિશાનું અંતર અલગ ગણી (ઉત્તર − દક્ષિણ, પૂર્વ − પશ્ચિમ) શરૂઆતના બિંદુથી સ્થાન શોધવાનું છે."}</p>
<h4>2️⃣ Step-by-step ચાલ</h4><div class="tw"><table class="tb"><tr><th>Step</th><th>શું થયું</th><th>હવે મોઢું</th><th>સ્થાન (શરૂઆતથી)</th></tr>`;
let pf=s.s||null;w.st.forEach((p,i)=>{const act=p.k==="L"||p.k==="R"?`${DG[pf]} તરફ મોઢું હતું → ${p.k==="L"?"ડાબે":"જમણે"} વળતાં ${DG[p.f]}`:p.k==="U"?`${DG[pf]} → યુ-ટર્ન → ${DG[p.f]}`:p.k==="F"?`${DG[p.f]} તરફ સીધા`:`${DG[p.f]} દિશામાં`;
h+=`<tr><td>${i+1}</td><td>${act}${p.d?` · <b>${p.d} ${p.u}</b> ચાલ્યા`:" (માત્ર વળાંક)"}</td><td>${DG[p.f]}</td><td>${pos(p.x,p.y)}</td></tr>`;pf=p.f});h+=`</table></div>`;
if(s.ask!=="face"){const f=a=>a.length?a.join(" + ")+" = "+a.reduce((x,y)=>x+y,0):"0",a=Math.abs(w.x),b=Math.abs(w.y);
h+=`<h4>3️⃣ ગણતરી</h4><div class="calc"><p>⬆️ ઉત્તર: ${f(sm("N"))}<br>⬇️ દક્ષિણ: ${f(sm("S"))}<br>👉 ઉત્તર − દક્ષિણ = <b>${w.y>=0?w.y+" "+u+" ઉત્તર":-w.y+" "+u+" દક્ષિણ"}</b></p><p>➡️ પૂર્વ: ${f(sm("E"))}<br>⬅️ પશ્ચિમ: ${f(sm("W"))}<br>👉 પૂર્વ − પશ્ચિમ = <b>${w.x>=0?w.x+" "+u+" પૂર્વ":-w.x+" "+u+" પશ્ચિમ"}</b></p></div>`;
if(w.x&&w.y)h+=`<p>બંને દિશામાં અંતર બાકી છે ⇒ કર્ણ (પાયથાગોરસ): √(${a}² + ${b}²) = √${a*a+b*b} = <b>${d} ${u}</b>, દિશા <b>${DG[r]}</b>${Number.isInteger(d)?` &nbsp;(${Math.min(a,b)}-${Math.max(a,b)}-${d} ત્રિપુટી)`:""}</p>`;
else h+=`<p>એક જ અક્ષ પર અંતર બાકી છે ⇒ સીધું અંતર = <b>${d} ${u}</b>${r?` (${DG[r]} તરફ)`:""}.</p>`;
if((s.ask==="back"||s.ask==="home")&&r)h+=`<p>પાછા ${s.ask==="home"?"ઘરે":"શરૂઆતના બિંદુએ"} જવા દિશા ઉલટી કરો: ${DG[r]} ⇒ <b>${DG[OPP[r]]}</b></p>`}
else{let li=-1;s.m.forEach((m,i)=>{if(DI.includes(m[0]))li=i});const base=li>=0?s.m[li][0]:s.s,rest=s.m.slice(li+1),R_=rest.filter(m=>m[0]==="R").length+2*rest.filter(m=>m[0]==="U").length,L_=rest.filter(m=>m[0]==="L").length,k=(((R_-L_)%4)+4)%4,fin=DI[(DI.indexOf(base)+k)%4];
if(fin===w.f)h+=`<h4>3️⃣ Shortcut (Last Direction)</h4><div class="calc"><p>છેલ્લી નિશ્ચિત દિશા: <b>${DG[base]}</b>. તે પછી જમણા વળાંક R = ${R_} (યુ-ટર્ન = 2R), ડાબા વળાંક L = ${L_}.<br>(R − L) = ${R_-L_} → 4 થી ભાગતા શેષ = <b>${k}</b> ⇒ ${["મૂળ દિશા જ","મૂળથી જમણી તરફ (90°)","મૂળથી ઉલટી દિશા (180°)","મૂળથી ડાબી તરફ (270°)"][k]} ⇒ <b>${DG[fin]}</b></p></div>`}
return h+`<p class="tp2">⚠ ડાબે/જમણે હંમેશા વ્યક્તિના મોઢા પ્રમાણે ગણો, નકશા પ્રમાણે નહીં. અંતર ફક્ત ત્યારે જોડો જ્યારે એ જ દિશામાં હોય.</p><h4>✅ જવાબ</h4><p class="ans">${ofm(A,u)}</p><h4>🗺️ Visual (ચાલ + અંતર)</h4>`}
function dq(s,id,I){const w=walk(s),u=s.u||"મીટર",A=dans(s,w),a=s.o.findIndex(o=>JSON.stringify(o)===JSON.stringify(A)),nm=s.n||"એક વ્યક્તિ";
let q=s.s?`${nm} ${DG[s.s]} દિશા તરફ મોઢું કરીને ઊભો છે. `:"";
q+=s.m.map((m,k)=>{const T=m[0],d=m[1],un=m[2]||u,z=T==="L"?"ડાબી તરફ વળીને":T==="R"?"જમણી તરફ વળીને":T==="U"?"યુ-ટર્ન લઈને":T==="F"?"સીધા આગળ":DG[T]+" દિશામાં";
return (k?"ત્યારબાદ તે ":s.s?"તે ":nm+" ")+z+(d?` ${d} ${un} ચાલે છે`:" વળે છે")}).join(". ")+". "+(s.r?"(બધા વળાંકો 90° ના છે.) ":"")+ASK[s.ask];
return{id:I,t:id,b:1,q,o:s.o.map(o=>ofm(o,u)),a,y:s.y,h:dsol(s,w,u,A),sv:pathSVG(w,u)}}
const clk=(h,m)=>{const pt=(a,l)=>[(60+l*Math.sin(a*Math.PI/180)).toFixed(1),(60-l*Math.cos(a*Math.PI/180)).toFixed(1)],ha=(h%12)*30+m/2,ma=m*6;let t="";for(let i=0;i<12;i++){const p=pt(i*30,53),q=pt(i*30,i%3?48:44);t+=`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="currentColor" stroke-width="${i%3?1.5:3}" opacity=".7"/>`}
const H=pt(ha,28),M=pt(ma,42);return `<svg viewBox="0 0 120 120" width="150" height="150"><circle cx="60" cy="60" r="57" fill="rgba(255,255,255,.05)" stroke="currentColor" stroke-opacity=".4" stroke-width="2"/>${t}<line x1="60" y1="60" x2="${H[0]}" y2="${H[1]}" stroke="#a5b4fc" stroke-width="5" stroke-linecap="round"/><line x1="60" y1="60" x2="${M[0]}" y2="${M[1]}" stroke="#67e8f9" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="60" r="3.5" fill="#fff"/></svg>`};
const mix=v=>{const w=Math.floor(v+1e-9),n=Math.round((v-w)*11);return n?`${w} ${n}/11`:`${w}`};
const clkA=(h,m)=>{const pt=(a,l)=>[+(60+l*Math.sin(a*Math.PI/180)).toFixed(1),+(60-l*Math.cos(a*Math.PI/180)).toFixed(1)],ha=(h%12)*30+m/2,ma=m*6;let t="";
for(let i=0;i<12;i++){const p=pt(i*30,53),q=pt(i*30,i%3?48:44);t+=`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="currentColor" stroke-width="${i%3?1.5:3}" opacity=".7"/>`;if(i%3===0){const n=pt(i*30,37);t+=`<text x="${n[0]}" y="${n[1]+3}" font-size="9" text-anchor="middle" fill="currentColor" opacity=".8">${i||12}</text>`}}
let d=((ma-ha)%360+360)%360,a1=ha,sw=d;if(d>180){a1=ma;sw=360-d}
if(sw>0.01){const p1=pt(a1,22),p2=pt(a1+sw,22),pl=pt(a1+sw/2,31);t+=`<path d="M${p1[0]} ${p1[1]} A22 22 0 0 1 ${p2[0]} ${p2[1]}" fill="none" stroke="#fbbf24" stroke-width="3"/><text x="${pl[0]}" y="${pl[1]+3}" font-size="8.5" font-weight="700" text-anchor="middle" fill="#fbbf24">${+sw.toFixed(2)}°</text>`}
const H=pt(ha,27),M=pt(ma,42);return `<svg viewBox="0 0 120 120" style="width:100%;max-width:300px"><circle cx="60" cy="60" r="57" fill="rgba(255,255,255,.05)" stroke="currentColor" stroke-opacity=".4" stroke-width="2"/>${t}<line x1="60" y1="60" x2="${H[0]}" y2="${H[1]}" stroke="#a5b4fc" stroke-width="5" stroke-linecap="round"/><line x1="60" y1="60" x2="${M[0]}" y2="${M[1]}" stroke="#67e8f9" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="60" r="3.5" fill="#fff"/></svg><div class="lgd"><span><i style="background:#a5b4fc"></i>કલાકનો કાંટો ${+ha.toFixed(2)}°</span><span><i style="background:#67e8f9"></i>મિનિટનો કાંટો ${+ma.toFixed(2)}°</span></div>`};
function cq(s,id,I){const H=s.h%12,hx=H*30+s.m*0.5,mx=s.m*6,df=Math.abs(hx-mx),sm=df>180?360-df:df,r=Math.abs(30*H-5.5*s.m),pd=String(s.m).padStart(2,"0"),
pat=H&&s.m===4*H?`મિનિટ = કલાક×4 ⇒ ખૂણો = મિનિટ×2 = ${s.m*2}°`:H&&(s.m===5*H||s.m===6*H)?`મિનિટ = કલાક×${s.m/H} ⇒ ખૂણો = મિનિટ÷2 = ${s.m/2}°`:"";
return{id:I,t:id,b:1,q:`${s.p?s.p+" ":""}${s.h}:${pd} વાગ્યે ઘડિયાળની કલાકની સોય અને મિનિટની સોય વચ્ચે બનતો નાનો ખૂણો કેટલો હશે?`,o:s.o.map(o=>o+"°"),a:s.o.indexOf(sm),y:s.y,v:clk(s.h,s.m),sv:clkA(s.h,s.m),
h:`<h4>1️⃣ સમય</h4><p>${s.h}:${pd} ⇒ કલાક H = <b>${H}</b>${s.h>12?" (12-કલાક ફોર્મેટમાં)":""}, મિનિટ M = <b>${s.m}</b></p>
<h4>2️⃣ કલાકના કાંટાનો ખૂણો (12 થી)</h4><div class="calc"><p>= 30 × H + M/2<br>= 30 × ${H} + ${s.m}/2 = ${30*H} + ${s.m/2} = <b>${hx}°</b></p></div>
<h4>3️⃣ મિનિટના કાંટાનો ખૂણો (12 થી)</h4><div class="calc"><p>= 6 × M = 6 × ${s.m} = <b>${mx}°</b></p></div>
<h4>4️⃣ બંને વચ્ચેનો તફાવત</h4><div class="calc"><p>|${hx} − ${mx}| = <b>${df}°</b></p>${df>180?`<p>${df}° એ 180° થી મોટો છે ⇒ નાનો ખૂણો = 360° − ${df}° = <b>${sm}°</b></p>`:`<p>${df}° ≤ 180° ⇒ આ જ નાનો ખૂણો છે.</p>`}</div>
<h4>5️⃣ Formula થી ચકાસણી</h4><div class="calc"><p>|30H − 5.5M| = |${30*H} − ${5.5*s.m}| = ${r}°${r>180?` → 360 − ${r} = ${sm}°`:""}</p></div>${pat?`<p class="tp2">⚡ પાટિયું (Shortcut): ${pat}</p>`:""}<p class="tp2">💡 Option ચેક: મિનિટ ${s.m%2?"એકી":"બેકી"} છે ⇒ ખૂણામાં ${s.m%2?".5 આવે":"દશાંશ ન આવે"}.</p><h4>✅ જવાબ</h4><p class="ans">${sm}°</p><h4>🕒 Visual (પીળો આર્ક = નાનો ખૂણો)</h4>`}}
const KK={0:"એકબીજાને મળશે (0°)",90:"એકબીજાને કાટખૂણે આવશે (90°)",180:"એકબીજાની સામ-સામે આવશે (180°)"};
function mq(s,id,I){const a=s.a%12,c=[],th=s.k;for(const g of[1,-1])for(const k of[-1,0,1]){const v=(30*a+g*th+360*k)/5.5;if(v>=-1e-9&&v<60-1e-9)c.push(Math.round(v*1e6)/1e6)}
const u=[...new Set(c)].sort((p,q)=>p-q),pk=s.f?[u[0]]:u,ai=s.ans!=null?s.ans:s.o.indexOf(s.a+":"+mix(pk[0]));
return{id:I,t:id,b:1,q:`${s.a} અને ${s.a%12+1} વાગ્યાની વચ્ચે ઘડિયાળના બંને કાંટા કેટલા વાગ્યે ${s.f?"પ્રથમ વખત 90° નો ખૂણો બનાવશે":KK[th]}?`,o:s.o,a:ai,y:s.y,sv:`<div class="cl2">${pk.map(v=>clkA(s.a,v)).join("")}</div>`,
h:`<h4>1️⃣ Concept</h4><p>મિનિટનો કાંટો 1 મિનિટમાં 6° અને કલાકનો કાંટો ½° ફરે છે ⇒ સાપેક્ષ વેગ = <b>5.5° પ્રતિ મિનિટ</b>.</p>
<h4>2️⃣ શરૂઆતની સ્થિતિ (${s.a}:00)</h4><div class="calc"><p>કલાકનો કાંટો 12 થી = 30 × ${a} = ${30*a}°<br>મિનિટનો કાંટો = 0°<br>જોઈતો ખૂણો θ = ${s.f?90:th}°</p></div>
<h4>3️⃣ સમીકરણ</h4><p>5.5 × m = 30H ± θ (જરૂર પડે તો ± 360°)</p>${pk.map(v=>`<div class="calc"><p>5.5 × m = <b>${Math.round(v*5.5)}</b><br>m = ${Math.round(v*5.5)} ÷ 5.5 = ${Math.round(v*5.5)*2}/11 = <b>${mix(v)} મિનિટ</b><br>⇒ સમય = <b>${s.a}:${mix(v)}</b></p></div>`).join("")}
${pk.length>1?"<p>બંને સમય 0 થી 60 મિનિટની અંદર છે ⇒ બંને માન્ય.</p>":s.f?"<p>પ્રથમ વખત માટે નાનો માન્ય સમય લો.</p>":""}<p class="tp2">⚡ ટ્રીક: n × 5 5/11 મિનિટ — 0° માટે n = H ; 180° માટે n = H−6 ; 90° માટે n = H−3 અથવા H−9 (નેગેટિવ આવે તો +12 ; 60 કે વધુ આવે તો રદ).</p><h4>✅ જવાબ</h4><p class="ans">${s.o[ai]}</p><h4>🕒 Visual (તે સમયે કાંટા)</h4>`}}
const WD=["રવિવાર","સોમવાર","મંગળવાર","બુધવાર","ગુરુવાર","શુક્રવાર","શનિવાર"],MN=["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટેમ્બર","ઑક્ટોબર","નવેમ્બર","ડિસેમ્બર"];
const isLeap=y=>y%4===0&&(y%100!==0||y%400===0),dowOf=(d,m,y)=>new Date(Date.UTC(y,m-1,d)).getUTCDay(),MD=y=>[31,isLeap(y)?29:28,31,30,31,30,31,31,30,31,30,31];
function oddSol(d,m,y){const yy=y-1,c=Math.floor(yy/100)*100,r=yy-c,oc=[0,5,3,1][(c/100)%4],lp=Math.floor(r/4),yo=(r+lp)%7,md=MD(y),pre=md.slice(0,m-1),dd=pre.reduce((a,b)=>a+b,0)+d,mo=dd%7,tot=(oc+yo+mo)%7;
return{tot,h:`<div class="calc"><p><b>${d} ${MN[m-1]} ${y}</b><br>1️⃣ પૂર્ણ વર્ષો = ${yy} ⇒ સદી ${c} ના વિષમ દિવસ = <b>${oc}</b><br>2️⃣ બાકીના ${r} વર્ષ: લીપ વર્ષ = ${lp} ⇒ ${r} + ${lp} = ${r+lp} ÷ 7 નો શેષ = <b>${yo}</b><br>3️⃣ ${y} માં ${d} ${MN[m-1]} સુધી: ${pre.length?pre.join(" + ")+" + ":""}${d} = ${dd} દિવસ ÷ 7 નો શેષ = <b>${mo}</b><br>4️⃣ કુલ = ${oc} + ${yo} + ${mo} = ${oc+yo+mo} ÷ 7 નો શેષ = <b>${tot}</b> ⇒ <b>${WD[tot]}</b></p></div>`}}
function kq(s,id,I){const o=s.o,base={id:I,t:id,b:1,y:s.y};let q,A,h;
if(s.k==="dow"){const[d,m,y]=s.d,z=oddSol(d,m,y);q=`${d} ${MN[m-1]}, ${y} ના રોજ અઠવાડિયાનો કયો દિવસ હતો?`;A=dowOf(d,m,y);h=`<h4>1️⃣ Concept</h4><p>વાર = (સદીના + વર્ષોના + તારીખ સુધીના દિવસોના) વિષમ દિવસ ÷ 7 નો શેષ. કોડ: રવિ 0, સોમ 1, મંગળ 2, બુધ 3, ગુરુ 4, શુક્ર 5, શનિ 6.</p><h4>2️⃣ ગણતરી</h4>${z.h}<h4>✅ જવાબ</h4><p class="ans">${WD[A]}</p>`}
else if(s.k==="rel"){q=s.q;const r=Math.abs(s.n)%7,sg=s.n>0;A=((s.wd+(sg?r:-r))%7+7)%7;
h=`<h4>1️⃣ Concept</h4><p>7 દિવસે એ જ વાર આવે. એટલે દિવસોને 7 વડે ભાગી <b>શેષ</b> લો. ભવિષ્ય (પછી) ⇒ વાર <b>+ શેષ</b>; ભૂતકાળ (પહેલાં) ⇒ વાર <b>− શેષ</b>.</p>${s.pre?`<h4>2️⃣ આજનો વાર</h4><div class="calc"><p>${s.pre}</p></div>`:""}<h4>${s.pre?"3️⃣":"2️⃣"} ગણતરી</h4><div class="calc"><p>${Math.abs(s.n)} ÷ 7 = ${Math.floor(Math.abs(s.n)/7)} પૂર્ણ અઠવાડિયા, શેષ = <b>${r}</b><br>આજે <b>${WD[s.wd]}</b> ${sg?"+":"−"} ${r} = <b>${WD[A]}</b></p></div><h4>✅ જવાબ</h4><p class="ans">${WD[A]}</p>`}
else if(s.k==="rep"){const y=s.yr,lp=isLeap(y),j=dowOf(1,1,y);q=`વર્ષ ${y} જેવું કૅલેન્ડર તેના પછીના કયા વર્ષનું હશે?`;const ok=Y=>isLeap(Y)===lp&&dowOf(1,1,Y)===j;A=o.findIndex(ok);const Y=o[A],lps=[...Array(Y-y)].filter((_,i)=>isLeap(y+i)).length;
h=`<h4>1️⃣ Concept</h4><p>કૅલેન્ડર સરખું ત્યારે જ આવે જ્યારે <b>(1) લીપ-સ્થિતિ સરખી</b> અને <b>(2) 1 જાન્યુઆરીનો વાર સરખો</b> હોય. સામાન્ય વર્ષે વાર 1 દિવસ આગળ ખસે, લીપ વર્ષે 2 દિવસ.</p><h4>2️⃣ આપેલ વર્ષ</h4><div class="calc"><p>${y} = <b>${lp?"લીપ":"સામાન્ય"}</b> વર્ષ, 1 જાન્યુઆરી = <b>${WD[j]}</b></p></div><h4>3️⃣ Options ચકાસો</h4><div class="tw"><table class="tb"><tr><th>વર્ષ</th><th>પ્રકાર</th><th>1 જાન્યુ.</th><th>સરખું?</th></tr>${o.map(Z=>`<tr><td>${Z}</td><td>${isLeap(Z)?"લીપ":"સામાન્ય"}</td><td>${WD[dowOf(1,1,Z)]}</td><td>${ok(Z)?"✓":"✗"}</td></tr>`).join("")}</table></div>${o.filter(ok).length>1?'<p class="tp2">એક કરતાં વધુ વર્ષ સરખા છે ⇒ <b>પછીનું સૌથી નજીકનું (પ્રથમ)</b> વર્ષ લો.</p>':""}<h4>4️⃣ Shortcut</h4><div class="calc"><p>${y} થી ${Y} સુધી કુલ ખસેડ = ${Y-y} વર્ષ + ${lps} લીપ = <b>${Y-y+lps}</b> ⇒ ${(Y-y+lps)%7===0?"7 નો ગુણાંક ✓":""}</p></div><h4>✅ જવાબ</h4><p class="ans">${Y}</p>`}
else{const[d1,m1,y1]=s.from,[d2,m2,y2]=s.to,a=oddSol(d1,m1,y1),b=oddSol(d2,m2,y2),sh=(s.wd-a.tot+7)%7;q=`જો ${d1} ${MN[m1-1]} ${y1} ના દિવસે ${WD[s.wd]} હોય તો ${d2} ${MN[m2-1]} ${y2} ના દિવસે કયો વાર હોય?`;A=(b.tot+sh)%7;
h=`<h4>1️⃣ Concept</h4><p>બંને તારીખોનો વાર વિષમ દિવસથી શોધો. પ્રશ્નમાં આપેલો વાર સાચા કૅલેન્ડરથી અલગ હોય તો તે તફાવત (ખસેડ) અંતિમ જવાબમાં ઉમેરો.</p><h4>2️⃣ પહેલી તારીખ</h4>${a.h}<p>પ્રશ્નમાં આપેલ વાર = <b>${WD[s.wd]}</b> ${sh?`⇒ સાચા કૅલેન્ડર કરતાં ખસેડ = <b>${sh}</b> દિવસ`:"⇒ સાચા કૅલેન્ડર સાથે મેળ ખાય છે, ખસેડ = 0"}</p><h4>3️⃣ બીજી તારીખ</h4>${b.h}<div class="calc"><p>${WD[b.tot]} ${sh?`+ ${sh} = `:""}<b>${WD[A]}</b></p></div><h4>✅ જવાબ</h4><p class="ans">${WD[A]}</p>`}
return{...base,q,o:o.map(v=>s.k==="rep"?String(v):WD[v]),a:s.k==="rep"?A:o.indexOf(A),h}}
function bq(s,id,I){const rows=s.ed.map(x=>{const m=x.match(/^(.+?)→(.+?):(.+)$/);return m?`<div class="bl"><span class="nd1">${e(m[1])}</span><span class="ar">─ ${e(m[3])} ─▶</span><span class="nd1">${e(m[2])}</span></div>`:`<div class="bl"><span class="ar">${e(x.replace(":"," ⇒ "))}</span></div>`}).join("");
const sy=s.ed.some(x=>!/→/.test(x));
return{id:I,t:id,b:1,q:s.q,o:s.o,a:s.a,y:s.y,h:`<h4>1️⃣ ${sy?"સંકેતોનો અર્થ":"આપેલા સંબંધો (X → Y : X એ Y ના/ની ...)"}</h4><div class="calc">${rows}</div><h4>2️⃣ ઉકેલ (Step-by-step)</h4>${s.s.map((t,i)=>`<div class="stp2"><i>${i+1}</i><span>${e(t)}</span></div>`).join("")}<h4>✅ જવાબ</h4><p class="ans">(${L[s.a]}) ${e(s.o[s.a])}</p><p class="tp2">💡 Tip: પહેલા દરેક વ્યક્તિની gender લખો, પછી પેઢી (ઉપર/નીચે) અને ભાઈ-બહેન જોડો. પ્રશ્ન 'X નો Y સાથે' હોય ત્યારે X કોણ છે તે Y ના સંદર્ભમાં કહો.</p>`}}
const BC={};
function norm(s,id,i){const I="~"+id+"-"+(i+1);if(s.t==="d")return dq(s,id,I);if(s.t==="c")return cq(s,id,I);if(s.t==="m")return mq(s,id,I);if(s.t==="k")return kq(s,id,I);if(s.t==="b")return bq(s,id,I);
return{id:I,t:id,b:1,q:s.q,o:s.o,a:s.a,y:s.y,h:s.h||"",e:s.e||"",v:s.v||"",sv:s.sv||""}}
const build=id=>{if(!BC[id])BC[id]=(typeof PYQ!=="undefined"&&PYQ[id]||[]).map((s,i)=>norm(s,id,i));return BC[id].concat(S.q.filter(q=>q.t===id))};
const findQ=id=>id[0]==="~"?build(id.slice(1).split("-")[0]).find(q=>q.id===id):S.q.find(q=>q.id===id);
const fok=q=>{const a=S.a[q.id]||{};return PF==="all"||(PF==="un"&&!a.rv)||(PF==="bad"&&a.rv&&a.ok===false)||(PF==="mk"&&(S.mk||{})[q.id])};
/* ---- art ---- */
const art=id=>id==="r5"?`<svg class="art" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-width="3"/>${[...Array(12)].map((_,i)=>`<line x1="60" y1="${i%3?9:6}" x2="60" y2="${i%3?13:18}" stroke="#fff" stroke-width="2.5" transform="rotate(${i*30} 60 60)"/>`).join("")}<line class="hh" x1="60" y1="60" x2="60" y2="34" stroke="#fff" stroke-width="5" stroke-linecap="round"/><line class="mh" x1="60" y1="60" x2="60" y2="18" stroke="#67e8f9" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="60" r="4" fill="#fff"/></svg>`
:id==="r4"?`<svg class="art" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-width="3"/><text x="60" y="19" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">N</text><text x="60" y="110" fill="#fff" font-size="11" text-anchor="middle">S</text><text x="14" y="64" fill="#fff" font-size="11" text-anchor="middle">W</text><text x="106" y="64" fill="#fff" font-size="11" text-anchor="middle">E</text><g class="nd"><polygon points="60,24 68,60 52,60" fill="#f472b6"/><polygon points="60,96 68,60 52,60" fill="#fff"/></g><circle cx="60" cy="60" r="4" fill="#0b1020"/></svg>`
:`<em>${IC[id[0]][+id.slice(1)-1]}</em>`;
const thumb=id=>art(id);
const wm=id=>{
  const icon=IC[id[0]][+id.slice(1)-1];
  return `<i class="wmk">${icon}</i>
          <i class="wmk">${icon}</i>
          <i class="wmk">${icon}</i>`;
};
const nl=l=>l[0]==="§"?`<div class="fm">${e(l.slice(1).trim())}</div>`:l[0]==="★"?`<div class="tp">${e(l.slice(1).trim())}</div>`:l.startsWith("Q:")?`<div class="eq">${e(l)}</div>`:`<div class="li">${e(l)}</div>`;
const pips=x=>`<div class="pips"><u><i style="width:${x.fl*100}%"></i></u><u><i style="width:${x.fn*100}%"></i></u><u><i style="width:${x.fp*100}%"></i></u><u><i style="width:${x.t.clr?100:0}%"></i></u></div>`;
/* ---------- views ---------- */
function nudge(){const ds=Object.keys(S.log||{}).length;if(ds<3)return"";const le=S.lastExport||0;if(Date.now()-le<12*864e5)return"";
return `<div class="bn rv"><span>💾 તમારો progress આ ફોનના browser માં સચવાય છે. ક્યારેક <b>Backup</b> download કરી રાખો — browser data clear થાય તો પણ બધું સુરક્ષિત રહેશે.</span><a class="btn s" href="#/data">Backup લો</a></div>`}
function dash(){const A=all(),N=A.length,av=k=>Math.round(A.reduce((a,x)=>a+x[k],0)/N*100),ov=Math.round(A.reduce((a,x)=>a+x.p,0)/N),clr=A.filter(x=>x.t.clr).length;
const U=new Map();Object.values(V).forEach(v=>v.forEach(x=>U.set(x[1],x[2])));let ts=0,ws=0;U.forEach((s,id)=>{ts+=s;if(S.vw[id])ws+=s});
const tot=A.reduce((a,x)=>a+x.n,0),dn=A.reduce((a,x)=>a+x.d,0),at=A.reduce((a,x)=>a+x.at,0),ok=A.reduce((a,x)=>a+x.ok,0),nd=A.filter(x=>x.fn>=1).length;
const nx=A.find(x=>!x.t.clr&&x.p>0)||A.find(x=>!x.t.clr);let sk=0;for(let i=S.log[today()]?0:1;S.log[today(i)];i++)sk++;
const wk=A.filter(x=>x.acc!=null&&x.at>=3&&x.acc<60).sort((a,b)=>a.acc-b.acc).slice(0,4),days=[...Array(14)].map((_,i)=>S.log[today(13-i)]||0),mx=Math.max(1,...days),hr=new Date().getHours(),gr=hr<12?"સુપ્રભાત":hr<17?"શુભ બપોર":"શુભ સાંજ";
const L=av("fl"),Nn=av("fn"),P=av("fp");
return `${nudge()}
<section class="hero2 rv"><div class="hl"><span class="eb">CCE Prelims · ગણિત + રીઝનિંગ</span><h1>${gr}!<br><span class="gr">તૈયારી આગળ વધી રહી છે</span></h1><p class="mu">${clr} / ${N} topics clear · ${N-clr} બાકી</p>
<div class="lg"><span><i style="background:#8b7bff"></i>Lectures <b>${L}%</b></span><span><i style="background:#22d3ee"></i>Notes <b>${Nn}%</b></span><span><i style="background:#f472b6"></i>PYQ <b>${P}%</b></span></div></div><div class="hr">${tri(L,Nn,P,ov,230)}</div></section>
${nx?`<a class="cd cont rv" href="#/t/${nx.id}"><div class="cvv" style="${cover(nx.id)}">${wm(nx.id)}${thumb(nx.id)}</div><div class="cb"><span class="eb">હવે પછી · ${SUB[nx.s]} ${nx.i}</span><h2>${e(tn(nx.id)[0])}</h2><p class="mu">${e(tn(nx.id)[1])}</p>${pips(nx)}<span class="btn p">${step(nx)} ચાલુ કરો →</span></div></a>`:""}
<div class="g g5" style="margin-top:16px"><div class="cd stat rv"><b>${dur(ws)}</b><span>Lectures જોયા · કુલ ${dur(ts)}</span>${bar(ts?Math.round(ws/ts*100):0)}</div><div class="cd stat rv"><b>${nd}<small class="mu"> /${N}</small></b><span>Notes પૂરી</span>${bar(Math.round(nd/N*100))}</div>
<div class="cd stat rv"><b>${dn}<small class="mu"> /${tot}</small></b><span>PYQ solved</span>${bar(tot?Math.round(dn/tot*100):0)}</div><div class="cd stat rv"><b>${at?Math.round(ok/at*100)+"%":"—"}</b><span>Accuracy</span>${bar(at?Math.round(ok/at*100):0)}</div><div class="cd stat rv"><b>🔥 ${sk}</b><span>Day streak</span></div></div>
<h2 class="rv">તમારી Journey</h2><div class="g g2">${Object.keys(T).map(s=>{const it=A.filter(x=>x.s===s),p=Math.round(it.reduce((a,x)=>a+x.p,0)/it.length);
return `<div class="cd rv ${s}"><div style="display:flex;justify-content:space-between;align-items:center"><a href="#/${s}" style="color:inherit;text-decoration:none"><b style="font-size:20px">${SUB[s]}</b> <span class="mu sm">${SE[s]}</span></a><b style="font-size:22px">${p}%</b></div><div style="margin:12px 0 4px">${bar(p)}</div>
<div class="tiles">${it.map(x=>`<a href="#/t/${x.id}" class="tile ${x.t.clr?"c":""}" style="--p:${x.p}%" title="${e(tn(x.id)[0])} — ${x.p}%"><span>${IC[s][x.i-1]}</span></a>`).join("")}</div></div>`}).join("")}</div>
<div class="g g2" style="margin-top:16px"><div class="cd rv"><b>છેલ્લા 14 દિવસ</b><span class="mu sm" style="float:right">${days.reduce((a,b)=>a+b,0)} actions</span><div class="act">${days.map(d=>`<i class="${d?"":"z"}" style="height:${d?Math.max(10,d/mx*100):6}%" title="${d}"></i>`).join("")}</div></div>
<div class="cd rv"><b>Focus Areas</b>${wk.length?wk.map(x=>`<a class="fa" href="#/p/${x.id}?bad"><span>${IC[x.s][x.i-1]} ${e(tn(x.id)[0])}</span><b style="color:var(--no)">${x.acc}%</b></a>`).join(""):`<p class="mu sm" style="margin-top:10px">PYQ solve કરશો ત્યારે નબળા topics અહીં દેખાશે.</p>`}</div></div>`}
function subj(s){const A=all().filter(x=>x.s===s),p=Math.round(A.reduce((a,x)=>a+x.p,0)/A.length),fl=A.filter(x=>F==="all"||(F==="todo"&&x.p===0)||(F==="go"&&x.p>0&&!x.t.clr)||(F==="ok"&&x.t.clr));
return `<div class="${s}"><div class="rv sh2"><div><span class="eb">${SE[s]}</span><h1>${SUB[s]}</h1><p class="mu">${A.filter(x=>x.t.clr).length} / ${A.length} topics clear</p></div>${ring(p,s,120)}</div>
<div class="chips rv">${[["all","બધા"],["todo","બાકી"],["go","ચાલુ"],["ok","Clear"]].map(c=>`<button class="chip ${F===c[0]?"on":""}" onclick="F='${c[0]}';R()">${c[1]}</button>`).join("")}</div>
<div class="g g3" style="margin-top:16px">${fl.map(x=>{const b=stt(x);return `<a class="tc rv" href="#/t/${x.id}"><div class="cv" style="${cover(x.id)}">${wm(x.id)}${thumb(x.id)}<small>${x.i}</small></div><div class="tb"><b>${e(tn(x.id)[0])}</b><span class="mu sm">${e(tn(x.id)[1])}</span>${pips(x)}
<div class="meta"><span>🎬 ${x.wn}/${x.vs.length}</span><span>🎯 ${x.n?x.d+"/"+x.n:"—"}</span><span class="bd ${b[1]}">${b[0]} ${x.p}%</span></div></div></a>`}).join("")||`<p class="mu">અહીં કોઈ topic નથી.</p>`}</div></div>`}
function topic(id){const n=tn(id);if(!n)return dash();const x=st(id),t=x.t,s=x.s,b=stt(x),nt=NOTES_[id];
const fl=[["Lecture",x.fl,"lec"],["Notes",x.fn,"notes"],["PYQ",x.fp,"pyq"],["Clear",t.clr?1:0,"clr"]],cur=fl.findIndex(f=>f[1]<1);
return `<div class="${s}"><a class="back" href="#/${s}">← ${SUB[s]}</a>
<div class="th2 rv" style="${cover(id)}">${wm(id)}<div style="flex:1;min-width:230px;position:relative"><span class="bd ${b[1]}" style="background:rgba(0,0,0,.3);color:#fff">${b[0]}</span><h1 style="margin:12px 0 4px">${e(n[0])}</h1><p style="opacity:.8">${e(n[1])}</p></div><div style="position:relative">${art(id).replace("<em>",'<em class="big">')}</div><div style="position:relative">${ring(x.p,s,120)}</div></div>
<div class="flow rv">${fl.map((f,i)=>`${i?`<i class="fl ${fl[i-1][1]>=1?"on":""}"></i>`:""}<a class="fs ${f[1]>=1?"ok":i===cur?"cur":""}" href="#" onclick="jump('${f[2]}');return false"><span class="fd">${f[1]>=1?"✓":i+1}</span><b>${f[0]}</b><small>${i===cur?"તમે અહીં છો":Math.round(f[1]*100)+"%"}</small></a>`).join("")}</div>
<div class="sec rv" id="s-lec"><div class="cd"><div class="sh"><div><b>1 · Lectures</b><p class="mu sm">${x.vs.length?x.wn+" / "+x.vs.length+" જોયા · કુલ "+dur(x.sec):"આ topic ની playlist માં video નથી"}</p></div>${x.vs.length?`<button class="btn s" onclick="allV('${id}',${x.wn<x.vs.length})">${x.wn<x.vs.length?"Mark all watched":"Unmark all"}</button>`:""}</div>
${x.vs.map(v=>`<div class="vd ${S.vw[v[1]]?"dn":""}"><a class="vt" href="https://www.youtube.com/watch?v=${v[1]}" target="_blank" rel="noopener" style="background-image:url(https://i.ytimg.com/vi/${v[1]}/mqdefault.jpg)">▶</a><div><b>${e(v[0])}</b><span class="mu sm">${dur(v[2])}</span></div><input type="checkbox" title="Watched" ${S.vw[v[1]]?"checked":""} onchange="vw('${v[1]}',this.checked)"></div>`).join("")||`<label class="ck"><input type="checkbox" ${t.lec?"checked":""} onchange="tg('${id}','lec',this.checked)"> Lecture પૂરું થયું (manual)</label>`}</div></div>
<div class="sec rv" id="s-notes"><div class="cd"><div class="sh"><div><b>2 · Notes</b><p class="mu sm">Detailed notes વાંચો → તમારી book માં લખો → નીચે tick કરો</p></div>${nt?`<a class="btn p" href="#/n/${id}">📖 Full Notes View</a>`:`<span class="mu sm">Notes ટૂંક સમયમાં ઉમેરાશે</span>`}</div>
<label class="ck" style="font-size:16px;margin-top:6px"><input type="checkbox" ${x.fn>=1?"checked":""} onchange="nd('${id}',this.checked)"> ✍️ મારી notes લખાઈ ગઈ (Notes complete)</label></div></div>
<div class="sec rv" id="s-pyq"><div class="cd"><div class="sh"><div><b>3 · PYQ Practice</b><p class="mu sm">જાતે solve કરો → Show Answer → Detailed Solution</p></div></div>
${x.n?`<div class="g3m"><div class="mini"><b>${x.n}</b><span>કુલ પ્રશ્નો</span></div><div class="mini"><b>${x.d}</b><span>Solved</span></div><div class="mini"><b>${x.acc!=null?x.acc+"%":"—"}</b><span>Accuracy</span></div></div>${bar(Math.round(x.d/x.n*100))}<div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap"><a class="btn p" href="#/x/${id}">📝 ${ttxt(id)}</a><a class="btn" href="#/p/${id}">▶ Practice Mode (instant answer)</a>${x.d>x.ok&&x.at>x.ok?`<a class="btn" href="#/p/${id}?bad">Review Mistakes</a>`:""}</div>`:`<p class="mu" style="margin-bottom:8px">આ topic ના PYQ ટૂંક સમયમાં ઉમેરાશે. ત્યાં સુધી તમે જાતે practice કરો તો નીચે tick કરી શકો છો.</p><label class="ck"><input type="checkbox" ${t.pd?"checked":""} onchange="tg('${id}','pd',this.checked)"> PYQ પૂરા (manual)</label>`}
<details style="margin-top:18px"><summary>+ Add Question</summary><div class="f"><textarea id="fq" rows="3" placeholder="પ્રશ્ન"></textarea><div class="f f2">${[0,1,2,3].map(k=>`<input id="fo${k}" placeholder="Option ${L[k]}">`).join("")}</div>
<div class="f f2"><select id="fa"><option value="0">સાચો જવાબ: A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select><input id="fy" placeholder="Source / Year"></div><textarea id="fe" rows="2" placeholder="Solution / Explanation"></textarea><input id="fi" type="file" accept="image/*"><button class="btn p" onclick="addQ('${id}')">Add Question</button></div></details></div></div>
<div class="sec rv" id="s-clr"><div class="cd"><div class="sh" style="margin:0"><div><b>4 · Mark Clear</b><p class="mu sm">Lecture, Notes, PYQ પછી confidence આવે ત્યારે</p></div><button class="btn ${t.clr?"":"p"}" onclick="clr('${id}')">${t.clr?"Mark as Not Clear":"Mark Topic Clear"}</button></div></div></div></div>`}
function prac(id){const n=tn(id);if(!n)return dash();const qs=build(id);CUR={id,qs};
if(!qs.length)return `<a class="back" href="#/t/${id}">← ${e(n[0])}</a><div class="cd" style="margin-top:16px"><h2 style="margin-top:0">હજી PYQ નથી</h2><p class="mu">Topic page પરથી જાતે Add Question કરી શકો છો.</p></div>`;
PI=Math.max(0,Math.min(PI,qs.length-1));const ls=qs.map((q,k)=>k).filter(k=>k===PI||fok(qs[k])),q=qs[PI],a=S.a[q.id]||{},x=st(id),s=id[0],pos=ls.indexOf(PI);
return `<div class="${s}"><div class="pw"><div class="pm"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><a class="back" href="#/t/${id}">← ${e(n[0])}</a><span class="pst">${x.d}/${x.n} solved${x.acc!=null?` · ${x.acc}% accuracy`:""}</span></div><div style="margin:12px 0">${bar(Math.round(x.d/x.n*100))}</div>
<div class="cd pq"><div class="qh"><b>પ્રશ્ન ${PI+1} <span class="mu">/ ${qs.length}</span></b>${q.y?`<span class="tag">${e(q.y)}</span>`:""}<button class="mkb" onclick="mark('${q.id}')">${(S.mk||{})[q.id]?"★":"☆"} Review</button>${q.b?"":`<button class="x" title="Delete" onclick="delQ('${q.id}')">✕</button>`}</div>
<div class="qt">${e(q.q)}</div>${q.img?`<img src="${e(q.img)}" alt="">`:""}${q.v?`<div class="vis">${q.v}</div>`:""}
<div class="opts">${q.o.map((o,k)=>{let c="op";if(a.rv){if(k===q.a)c+=" good";else if(k===a.sel)c+=" bad"}else if(k===a.sel)c+=" sel";return `<button class="${c}" ${a.rv?"disabled":""} onclick="pick('${q.id}',${k})"><i>${L[k]}</i><span>${e(o)}</span></button>`}).join("")}</div>
${a.rv?`<div class="bnr ${a.ok===true?"g":a.ok===false?"b":"s"}">${a.ok===true?"✓ સાચો જવાબ!":a.ok===false?"✗ ખોટો — સાચો જવાબ: "+L[q.a]+" ) "+e(q.o[q.a]):"Skipped — સાચો જવાબ: "+L[q.a]+" ) "+e(q.o[q.a])}</div>`:""}
<div class="qa">${a.rv?`<button class="btn s" onclick="retry('${q.id}')">Retry</button>`:`<button class="btn p s" onclick="reveal('${q.id}')">Show Answer</button>`}<button class="btn s" onclick="SOL=!SOL;R()">💡 ${SOL?"Hide":"Detailed"} Solution</button></div>
${SOL?`<div class="sol${SOLF?" full":""}"><div class="solh"><b>💡 Detailed Solution</b><button class="btn s" onclick="SOLF=!SOLF;R()">${SOLF?"✕ Close":"⛶ Full view"}</button></div>${q.h||(q.e?`<p style="white-space:pre-wrap">${e(q.e)}</p>`:`<p class="mu">આ પ્રશ્નનું solution ઉપલબ્ધ નથી — Add Question માં Solution લખી શકાય.</p>`)}${q.sv?`<div class="vis">${q.sv}</div>`:""}</div>`:""}
<div class="nv"><button class="btn" onclick="nav(-1)" ${pos<=0?"disabled":""}>← Previous</button><span class="mu sm" style="align-self:center">← → keys · 1-4 option · Enter = answer</span><button class="btn p" onclick="nav(1)" ${pos>=ls.length-1?"disabled":""}>Next →</button></div></div></div>
<details class="cd pal" ${PALO?"open":""} ontoggle="PALO=this.open"><summary>Question Palette <span class="mu sm">· ${qs.length} પ્રશ્નો</span></summary><div class="chips" style="margin:10px 0 0">${[["all","All"],["un","Unsolved"],["bad","Wrong"],["mk","★"]].map(c=>`<button class="chip ${PF===c[0]?"on":""}" onclick="setF('${c[0]}')">${c[1]}</button>`).join("")}</div>
<div class="pg">${ls.map(k=>{const z=S.a[qs[k].id]||{};return `<button class="pc ${k===PI?"cur":""} ${z.rv?(z.ok===true?"g":z.ok===false?"b":""):z.sel!=null?"sel":""} ${(S.mk||{})[qs[k].id]?"k":""}" onclick="gq(${k})">${k+1}</button>`}).join("")}</div>
<p class="mu sm" style="margin-top:14px">🟩 સાચા · 🟥 ખોટા · 🟦 પસંદ કરેલ · ★ review</p></details></div></div>`}
function data(){
setTimeout(async()=>{const k=((await idbOp("getAllKeys"))||[]).filter(x=>/^bk/.test(x)).sort().reverse(),el=document.getElementById("bkl");if(el)el.innerHTML=k.map(x=>`<button class="btn s" onclick="rest('${x}')">${x.slice(2)}</button>`).join(" ")||"<span class='mu sm'>હજી કોઈ auto-backup નથી</span>"},50);
const le=S.lastExport?new Date(S.lastExport).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"હજી સુધી નહીં";
const desk=!!window.showSaveFilePicker&&!matchMedia("(pointer:coarse)").matches;
return `<span class="eb rv">Data &amp; Safety</span><h1 class="rv">તમારો Progress સુરક્ષિત રાખો</h1><p class="mu rv" style="margin-top:6px">દરેક click પર બધું આપમેળે save થાય છે. વધારે સુરક્ષા માટે અહીંથી Backup લઈ રાખો.</p>
<div class="g g2" style="margin-top:22px"><div class="cd rv"><b>📥 Backup Download</b><p class="mu sm" style="margin:6px 0 14px">છેલ્લું backup: <b>${le}</b><br>File Google Drive / WhatsApp માં save કરી રાખો. નવો phone કે browser હોય ત્યારે Import કરી દો.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn p" onclick="exp()">⬇ Export Backup</button><label class="btn">⬆ Import Backup<input type="file" accept=".json" hidden onchange="rd(this.files[0],impB)"></label></div></div>
<div class="cd rv"><b>🕑 Daily Auto-backup (7 દિવસ)</b><p class="mu sm" style="margin:6px 0 12px">આ browser માં રોજ આપમેળે copy બને છે. કોઈ દિવસની state પાછી લાવવા ક્લિક કરો.</p><div id="bkl" style="display:flex;gap:6px;flex-wrap:wrap"></div></div></div>
${desk?`<div class="g g2" style="margin-top:16px"><div class="cd rv"><b>💾 Disk file auto-save ${FH?"· Connected ✓":""}</b><p class="mu sm" style="margin:6px 0 12px">Computer માટે (Chrome/Edge): એક વાર file પસંદ કરો, પછી દરેક change તેમાં લખાશે.</p>${FH?`<button class="btn" onclick="fsAllow()">Re-allow access</button>`:`<button class="btn p" onclick="fsLink()">Connect Save File</button>`}</div>
<div class="cd rv"><b>🗄️ Local Server ${srvOk?"· Running ✓":""}</b><p class="mu sm" style="margin-top:6px"><code>start.bat</code> double-click કરો (Python જોઈએ), પછી <code>http://localhost:8765</code> ખોલો. Data <code>cce-data.json</code> માં સચવાય છે.</p></div></div>`:""}
<details class="cd rv" style="margin-top:16px"><summary>Advanced · Questions import / Reset</summary><p class="mu sm" style="margin:14px 0 6px">Questions JSON: [{"t":"m4","q":"પ્રશ્ન","o":["A","B","C","D"],"a":2,"e":"solution","y":"2023"}] <br>(a = સાચા option નો નંબર, 1 થી શરૂ)</p><textarea id="jq" rows="3"></textarea><div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn p" onclick="impQ(document.getElementById('jq').value)">Import Questions</button><button class="btn d" onclick="resetAll()">Reset Everything</button></div></details>`}
/* ---- Test (CBT), Result, Notes full view ---- */
const nd=(id,v)=>go(()=>{tp(id).nd=v;bump()});
function ttxt(id){const T_=(S.tt||{})[id];return T_?(T_.sub?"Test Result જુઓ":"Test ચાલુ રાખો"):"Start Test (CBT)"}
function tick(){const el=document.getElementById("tm"),T_=S.tt&&CUR&&S.tt[CUR.id];if(!el||!T_||T_.sub)return;const s=Math.floor((Date.now()-T_.t0)/1000);el.textContent=String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function exam(id){const n=tn(id);if(!n)return dash();const qs=build(id);CUR={id,qs};S.tt=S.tt||{};let T_=S.tt[id];
if(!qs.length)return `<a class="back" href="#/t/${id}">← ${e(n[0])}</a><div class="cd" style="margin-top:16px"><h2 style="margin-top:0">હજી PYQ નથી</h2></div>`;
if(T_&&T_.sub)return result(id,qs,T_);
if(!T_){T_=S.tt[id]={t0:Date.now(),sub:0,vis:{},mr:{}};qs.forEach(q=>delete S.a[q.id]);save()}
T_.vis=T_.vis||{};T_.mr=T_.mr||{};PI=Math.max(0,Math.min(PI,qs.length-1));const q=qs[PI],a=S.a[q.id]||{};T_.vis[q.id]=1;
const cl=q2=>{const z=S.a[q2.id]||{},m=T_.mr[q2.id];return m?(z.sel!=null?"m g":"m"):z.sel!=null?"g":T_.vis[q2.id]?"r":"n"};
const cnt=c=>qs.filter(q2=>cl(q2)===c||(c==="m"&&cl(q2)==="m g")).length,ans=qs.filter(q2=>(S.a[q2.id]||{}).sel!=null).length;
clearInterval(TI);TI=setInterval(tick,1000);setTimeout(tick,0);
return `<div class="${id[0]}"><div class="xb rv"><b>${e(n[0])}</b><span class="mu">CBT Mode · ${qs.length} પ્રશ્નો</span><span class="tm">⏱ <b id="tm">00:00</b></span><button class="btn s sub" onclick="submitT('${id}')">Submit Test</button></div>
<div class="pw"><div class="pm"><div class="cd pq xq"><div class="qh"><b>પ્રશ્ન ${PI+1} / ${qs.length}</b><span class="tag">+1 · −¼</span>${q.y?`<span class="tag">${e(q.y)}</span>`:""}</div>
<div class="qt">${e(q.q)}</div>${q.img?`<img src="${e(q.img)}" alt="">`:""}${q.v?`<div class="vis">${q.v}</div>`:""}
<div class="opts">${q.o.map((o,k)=>`<button class="op ${k===a.sel?"sel":""}" onclick="pick('${q.id}',${k})"><i>${L[k]}</i><span>${e(o)}</span></button>`).join("")}</div>
<div class="eab"><button class="btn" onclick="tmark()">★ Mark for Review &amp; Next</button><button class="btn" onclick="tclear()">Clear Response</button><button class="btn" onclick="nav(-1)" ${PI<=0?"disabled":""}>← Previous</button><button class="btn p" onclick="nav(1)" ${PI>=qs.length-1?"disabled":""}>Save &amp; Next →</button></div></div></div>
<details class="cd pal" ${PALO?"open":""} ontoggle="PALO=this.open"><summary>Question Palette <span class="mu sm">· ${ans}/${qs.length} answered</span></summary><div class="lgx"><span><i class="pc g"></i>Answered ${ans}</span><span><i class="pc r"></i>Not Answered ${qs.filter(q2=>cl(q2)==="r").length}</span><span><i class="pc n"></i>Not Visited ${cnt("n")}</span><span><i class="pc m"></i>Review ${qs.filter(q2=>T_.mr[q2.id]).length}</span></div>
<div class="pg">${qs.map((q2,k)=>`<button class="pc ${cl(q2)} ${k===PI?"cur":""}" onclick="gq(${k})">${k+1}</button>`).join("")}</div><button class="btn p" style="width:100%;margin-top:16px" onclick="submitT('${id}')">Submit Test</button></details></div></div>`}
function tmark(){const T_=S.tt[CUR.id],q=CUR.qs[PI];T_.mr[q.id]?delete T_.mr[q.id]:T_.mr[q.id]=1;save();nav(1)}
const tclear=()=>go(()=>{const a=S.a[CUR.qs[PI].id];if(a)a.sel=null});
function submitT(id){const qs=CUR.qs,T_=S.tt[id],un=qs.filter(q=>(S.a[q.id]||{}).sel==null).length;
if(!confirm(`કુલ ${qs.length} પ્રશ્નો · જવાબ આપેલ ${qs.length-un} · બાકી ${un}\n\nTest Submit કરવો છે?`))return;
qs.forEach(q=>{const a=S.a[q.id]||(S.a[q.id]={});a.rv=1;a.ok=a.sel==null?null:a.sel===q.a});T_.sub=1;T_.el=Date.now()-T_.t0;bump();save();clearInterval(TI);R(1);scrollTo(0,0)}
function retake(id){if(!confirm("Test ફરી શરૂ કરવો? જૂના જવાબો રીસેટ થશે."))return;go(()=>{delete S.tt[id];build(id).forEach(q=>delete S.a[q.id])});scrollTo(0,0)}
function viewSol(id,k){PEND={pi:k,sol:1};location.hash="#/p/"+id}
function result(id,qs,T_){const n=tn(id),A=qs.map(q=>S.a[q.id]||{}),c=A.filter(z=>z.ok===true).length,w=A.filter(z=>z.ok===false).length,sk=qs.length-c-w,sc=Math.round((c-w/4)*100)/100,acc=c+w?Math.round(c/(c+w)*100):0,pc=Math.round(c/qs.length*100),sec=Math.round((T_.el||0)/1000),
msg=pc>=80?"ખૂબ સરસ! 🎉":pc>=60?"સારું પ્રદર્શન 👍":pc>=40?"થોડી વધુ practice જોઈએ 💪":"Concept ફરી વાંચો, પછી Retake કરો 📘";
return `<div class="${id[0]}"><a class="back" href="#/t/${id}">← ${e(n[0])}</a>
<section class="hero2 rv" style="margin-top:14px"><div class="hl"><span class="eb">Test Result · ${e(n[0])}</span><h1>${sc}<small class="mu"> / ${qs.length}</small></h1><p class="mu">${msg}<br>Negative marking: ખોટા જવાબ દીઠ −¼</p>
<div class="lg"><span><i style="background:#4ade80"></i>સાચા <b>${c}</b></span><span><i style="background:#fb7185"></i>ખોટા <b>${w}</b></span><span><i style="background:#fbbf24"></i>Skipped <b>${sk}</b></span></div></div><div class="hr">${ring(pc,id[0],190)}</div></section>
<div class="g g5" style="margin-top:16px"><div class="cd stat rv"><b>${c}</b><span>સાચા જવાબ</span></div><div class="cd stat rv"><b>${w}</b><span>ખોટા જવાબ</span></div><div class="cd stat rv"><b>${sk}</b><span>Skipped</span></div><div class="cd stat rv"><b>${acc}%</b><span>Accuracy (attempted)</span></div><div class="cd stat rv"><b>${Math.floor(sec/60)}m ${sec%60}s</b><span>લાગેલો સમય</span></div></div>
<div class="cd rv" style="margin-top:16px"><div class="sh"><b>પ્રશ્ન પ્રમાણે Review</b><span class="mu sm">Solution જોવા ક્લિક કરો</span></div>${qs.map((q,k)=>{const z=A[k],st_=z.ok===true?["✓ સાચો","g"]:z.ok===false?["✗ ખોટો","b"]:["– Skipped","s"];
return `<div class="rr"><b>${k+1}</b><span class="rs ${st_[2]||st_[1]}">${st_[0]}</span><span class="mu">તમારો: ${z.sel!=null?L[z.sel]:"—"} · સાચો: ${L[q.a]}</span><button class="btn s" onclick="viewSol('${id}',${k})">💡 Solution</button></div>`}).join("")}</div>
<div class="nv rv" style="margin-top:16px"><a class="btn" href="#/p/${id}">બધા Solutions જુઓ</a>${w?`<a class="btn" href="#/p/${id}?bad">ફક્ત ખોટા જુઓ</a>`:""}<button class="btn p" onclick="retake('${id}')">↻ Retake Test</button></div></div>`}
/* notes full view */
function rn(ls){let h="",tb=[];const fl=()=>{if(tb.length){h+=`<div class="tw"><table>${tb.map((r,i)=>`<tr>${r.map(c=>i?`<td>${e(c)}</td>`:`<th>${e(c)}</th>`).join("")}</tr>`).join("")}</table></div>`;tb=[]}};
ls.forEach(l=>{if(l[0]==="|"){tb.push(l.slice(1).split("|").map(x=>x.trim()).filter((x,i,a)=>!(i===a.length-1&&x==="")));return}fl();
if(l.startsWith("## "))h+=`<h3>${e(l.slice(3))}</h3>`;else if(l[0]==="§")h+=`<div class="fm">${e(l.slice(1).trim())}</div>`;else if(l[0]==="★")h+=`<div class="tp">💡 ${e(l.slice(1).trim())}</div>`;else if(l[0]==="⚠")h+=`<div class="wr">⚠ ${e(l.slice(1).trim())}</div>`;
else if(l.startsWith("Q:")){const p=l.slice(2).split("⇒");h+=`<div class="ex"><b>ઉદાહરણ:</b> ${e(p[0].trim())}${p.slice(1).map((z,i)=>`<div class="st"><i>${i+1}</i><span>${e(z.trim())}</span></div>`).join("")}</div>`}
else if(l[0]==="→")h+=`<div class="sp2">${e(l.slice(1).trim())}</div>`;else h+=`<div class="li">${e(l)}</div>`});fl();return h}
const bookHTML=(id,n,nt)=>`<header class="bh"><span>CCE Prelims · ${SUB[id[0]]}</span><h1>${e(n[0])}</h1><p>${e(n[1])}</p></header>`+nt.map((c,k)=>`<section><h2><i>${k+1}</i><span>${e(c[0])}</span></h2>${rn(c[1])}</section>`).join("")+`<footer>— Notes End · બધા PYQ solve કરો 🎯 —</footer>`;
function notesView(id){const n=tn(id),nt=NOTES_[id];if(!n)return dash();
return `<div class="${id[0]} nbar"><a class="back" href="#/t/${id}">← ${e(n[0])}</a><div class="nbt"><button class="btn s" onclick="fz(-1)">A−</button><button class="btn s" onclick="fz(1)">A+</button><button class="btn s" onclick="dlNotes('${id}')">⬇ Download</button><button class="btn p s" onclick="window.print()">🖨 Print / PDF</button></div></div>
<article class="book" id="book" style="--nf:${NF}">${nt?bookHTML(id,n,nt):`<header class="bh"><h1>${e(n[0])}</h1></header><p>આ topic ની detailed notes ટૂંક સમયમાં ઉમેરાશે.</p>`}</article>`}
function fz(d){NF=Math.min(1.5,Math.max(.8,NF+d*.1));document.getElementById("book").style.setProperty("--nf",NF)}
function dlNotes(id){const n=tn(id),b=document.getElementById("book").innerHTML,css=document.getElementById("bookcss").textContent,
h=`<!DOCTYPE html><html lang="gu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(n[0])} — Notes</title><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;600;700&family=Inter:wght@400;600;800&display=swap" rel="stylesheet"><style>body{margin:0;padding:16px;background:#f1eee4;font-family:Inter,"Noto Sans Gujarati",sans-serif}${css}@media print{body{background:#fff;padding:0}.book{margin:0;border-radius:0;box-shadow:none}}</style></head><body><article class="book">${b}</article></body></html>`,
a=document.createElement("a");a.href=URL.createObjectURL(new Blob([h],{type:"text/html"}));a.download="CCE-Notes-"+n[1].replace(/[^a-z0-9]+/gi,"-")+".html";a.click()}

function jump(k){const el=document.getElementById("s-"+k);if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}
function nav(d){if(!CUR)return;const qs=CUR.qs,ls=qs.map((q,k)=>k).filter(k=>k===PI||fok(qs[k])),p=ls.indexOf(PI);PI=ls[Math.max(0,Math.min(ls.length-1,p+d))];SOL=SOLF=0;R()}
const gq=k=>{PI=k;SOL=SOLF=0;R()};
function setF(f){PF=f;const k=CUR.qs.findIndex(fok);if(k>=0)PI=k;SOL=SOLF=0;R()}
const mark=id=>go(()=>{S.mk=S.mk||{};S.mk[id]?delete S.mk[id]:S.mk[id]=1});
/* ---------- actions ---------- */
const go=f=>{f();save();R()};
const tg=(id,k,v)=>go(()=>{tp(id)[k]=v;bump()}),nc=(id,k,v)=>go(()=>{tp(id).nc[k]=v;bump()}),vw=(v,c)=>go(()=>{c?S.vw[v]=1:delete S.vw[v];bump()});
const allV=(id,c)=>go(()=>{V[id].forEach(v=>c?S.vw[v[1]]=1:delete S.vw[v[1]]);bump()});
const clr=id=>{const x=st(id);if(!x.t.clr&&x.p<85&&!confirm("બધા steps પૂરા નથી થયા. છતાં Clear કરવું?"))return;go(()=>{tp(id).clr=!x.t.clr;bump()})};
function ns(id,v){tp(id).note=v;clearTimeout(ns.t);ns.t=setTimeout(save,500)}
const tpl=id=>{const t=tp(id);if(t.note&&!confirm("Template notes ના અંતે ઉમેરાશે."))return;go(()=>{t.note+=(t.note?"\n\n":"")+NI.map(l=>"■ "+l+"\n\n").join("")})};
const cp=id=>go(()=>{const t=tp(id);t.note+=(t.note?"\n\n":"")+NOTES_[id].map(c=>"■ "+c[0]+"\n"+c[1].map(l=>"• "+l).join("\n")).join("\n\n")});
const pick=(id,k)=>go(()=>{const a=S.a[id]||(S.a[id]={});if(!a.rv)a.sel=a.sel===k?null:k});
const reveal=id=>go(()=>{const q=findQ(id),a=S.a[id]||(S.a[id]={});a.rv=1;a.ok=a.sel==null?null:a.sel===q.a;bump()});
const retry=id=>go(()=>{delete S.a[id]});
function delQ(id){if(confirm("આ પ્રશ્ન delete કરવો?"))go(()=>{S.q=S.q.filter(q=>q.id!==id);delete S.a[id]})}
function resetT(id){if(confirm("આ topic ના બધા PYQ ફરી શરૂ કરવા?"))go(()=>build(id).forEach(q=>delete S.a[q.id]))}
function addQ(t){const g=i=>document.getElementById(i),o=[0,1,2,3].map(i=>g("fo"+i).value.trim());while(o.length&&!o[o.length-1])o.pop();
const q=g("fq").value.trim(),a=+g("fa").value;if(!q||o.length<2||o.some(x=>!x)||a>=o.length)return alert("પ્રશ્ન, ઓછામાં ઓછા 2 options અને સાચો જવાબ બરાબર ભરો");
const f=g("fi").files[0],done=img=>go(()=>S.q.push({id:uid(),t,q,o,a,e:g("fe").value.trim(),y:g("fy").value.trim(),img}));
if(f){const r=new FileReader();r.onload=()=>done(r.result);r.readAsDataURL(f)}else done("")}
function impQ(txt){try{let a=JSON.parse(txt);if(!Array.isArray(a))a=[a];let n=0;a.forEach(x=>{if(!x.q||!Array.isArray(x.o)||x.o.length<2||!tn(x.t||"x0"))return;S.q.push({id:uid(),t:x.t,q:x.q,o:x.o,a:Math.max(0,(+x.a||1)-1),e:x.e||"",y:x.y||"",img:x.img||""});n++});save();alert(n+" questions add thaya");R()}catch(er){alert("JSON ma bhul chhe: "+er.message)}}
function rd(f,cb){if(!f)return;const r=new FileReader();r.onload=()=>cb(r.result);r.readAsText(f)}
function exp(){S.lastExport=Date.now();save();const b=new Blob([JSON.stringify(S)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="cce-backup-"+today()+".json";a.click()}
function impB(t){try{const d=JSON.parse(t);if(!d.t||!d.q||!d.a)throw Error("Invalid backup");if(!confirm("હાલનો data replace થશે. ચાલુ રાખવું?"))return;S=d;save();R()}catch(er){alert(er.message)}}
async function rest(k){const j=await idbOp("get",k);if(j&&confirm(k.slice(2)+" ની state restore કરવી? (હાલનો data replace થશે)")){S=JSON.parse(j);save();R()}}
function resetAll(){if(confirm("બધું delete થશે (progress + questions + notes). પાક્કું?")&&confirm("છેલ્લી વાર — Reset કરવું?")){S={t:{},q:[],a:{},vw:{},log:{},mk:{}};save();R()}}
function onNav(){onNav0();if(PEND){PI=PEND.pi;SOL=PEND.sol;PEND=null}}
function onNav0(){F="all";SOL=SOLF=0;const h=location.hash.slice(2).split("/"),q=(h[1]||"").split("?");PF=q[1]==="bad"?"bad":"all";PI=0;if(h[0]==="p"&&tn(q[0]||"x0")){const qs=build(q[0]);const k=PF==="bad"?qs.findIndex(fok):qs.findIndex(z=>!(S.a[z.id]&&S.a[z.id].rv));PI=k<0?0:k}}
function R(fresh){clearInterval(TI);const h=location.hash.slice(2).split("/"),v=h[0],id=(h[1]||"").split("?")[0],app=document.getElementById("app");
document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.dataset.v===(v&&"tpxn".includes(v)&&id?id[0]:v)));
const y=scrollY;document.title=(tn(id)&&"tpxn".includes(v)?tn(id)[1]+" · ":v==="data"?"Data · ":"")+"CCE Prelims Tracker";app.innerHTML=v==="m"||v==="r"?subj(v):v==="t"?topic(id):v==="p"?prac(id):v==="x"?exam(id):v==="n"?notesView(id):v==="data"?data():dash();anim(fresh);if(!fresh)scrollTo(0,y)}
addEventListener("hashchange",()=>{onNav();R(1);scrollTo(0,0)});
addEventListener("keydown",ev=>{if(!CUR||!/^#\/[px]\//.test(location.hash)||/INPUT|TEXTAREA|SELECT/.test(ev.target.tagName))return;const k=ev.key,q=CUR.qs[PI];
if(k==="ArrowRight")nav(1);else if(k==="ArrowLeft")nav(-1);else if(k==="Enter"&&q&&location.hash.startsWith("#/p/")&&!(S.a[q.id]||{}).rv)reveal(q.id);else if(/^[1-5]$/.test(k)&&q&&+k<=q.o.length)pick(q.id,k-1)});
document.addEventListener("mousemove",ev=>{const c=ev.target.closest&&ev.target.closest(".cd,.tc");if(c){const r=c.getBoundingClientRect();c.style.setProperty("--mx",ev.clientX-r.left+"px");c.style.setProperty("--my",ev.clientY-r.top+"px")}});
addEventListener("beforeunload",()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(x){}});
