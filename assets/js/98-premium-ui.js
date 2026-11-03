/*
 * CCE Prelims Tracker — Premium UI layer
 * Redesigned Home, new Insights (data analysis) page, mobile-first exam / practice shell.
 * Data, notes, PYQ and solutions are NOT touched — this file only changes how things are shown.
 * Must load AFTER 19-core-tracker.js and all patch scripts, and BEFORE 99-boot.js.
 */
(function () {
  "use strict";

  /* ---------- small helpers ---------- */
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  const heat = (acc) => (acc == null ? "h0" : acc >= 75 ? "h3" : acc >= 50 ? "h2" : "h1");
  const accTone = (acc) => (acc == null ? "" : acc >= 75 ? "good" : acc >= 50 ? "mid" : "low");
  const fmtDur = (ms) => {
    const s = Math.round((ms || 0) / 1000);
    return Math.floor(s / 60) + "m " + String(s % 60).padStart(2, "0") + "s";
  };
  const streakNow = () => {
    let sk = 0;
    for (let i = S.log[today()] ? 0 : 1; S.log[today(i)]; i++) sk++;
    return sk;
  };
  const last14 = () => [...Array(14)].map((_, i) => S.log[today(13 - i)] || 0);

  const activityCard = (days) => {
    const mx = Math.max(1, ...days);
    const total = days.reduce((a, b) => a + b, 0);
    return `<div class="pc-card rv"><div class="pc-head"><b>છેલ્લા 14 દિવસ</b><span class="mu sm">${total} actions</span></div>
      <div class="act">${days
        .map((d) => `<i class="${d ? "" : "z"}" style="height:${d ? Math.max(12, (d / mx) * 100) : 7}%" title="${d}"></i>`)
        .join("")}</div></div>`;
  };

  /* ---------- HOME ---------- */
  dash = function () {
    const A = all(), N = A.length;
    const av = (k) => Math.round(A.reduce((a, x) => a + x[k], 0) / N * 100);
    const ov = Math.round(A.reduce((a, x) => a + x.p, 0) / N);
    const clr = A.filter((x) => x.t.clr).length;
    const U = new Map();
    Object.values(V).forEach((v) => v.forEach((x) => U.set(x[1], x[2])));
    let ts = 0, ws = 0;
    U.forEach((s, id) => { ts += s; if (S.vw[id]) ws += s; });
    const tot = A.reduce((a, x) => a + x.n, 0), dn = A.reduce((a, x) => a + x.d, 0);
    const at = A.reduce((a, x) => a + x.at, 0), ok = A.reduce((a, x) => a + x.ok, 0);
    const nx = A.find((x) => !x.t.clr && x.p > 0) || A.find((x) => !x.t.clr);
    const hr = new Date().getHours();
    const gr = hr < 12 ? "સુપ્રભાત" : hr < 17 ? "શુભ બપોર" : "શુભ સાંજ";
    const L_ = av("fl"), N_ = av("fn"), P_ = av("fp");
    const wk = A.filter((x) => x.acc != null && x.at >= 3 && x.acc < 60).sort((a, b) => a.acc - b.acc).slice(0, 4);

    const row = (label, v, color) =>
      `<div class="hm-row"><span>${label}</span><div class="pb"><i data-w="${v}" style="background:${color}"></i></div><b>${v}%</b></div>`;

    return `${nudge()}
<section class="hm-hero rv">
  <div class="hm-hl">
    <span class="hm-hi">${gr}</span>
    <h1>તૈયારી ${ov}% પૂરી</h1>
    <p class="mu">${clr} / ${N} topics clear</p>
  </div>
  ${ring(ov, "o", 92)}
  <div class="hm-rows">
    ${row("Lectures", L_, "#8b7bff")}${row("Notes", N_, "#22d3ee")}${row("PYQ", P_, "#f472b6")}
  </div>
</section>

${nx ? `<a class="hm-cont rv" href="#/t/${nx.id}">
  <div class="hm-thumb" style="${cover(nx.id)}">${thumb(nx.id)}</div>
  <div class="hm-ct">
    <span class="mu sm">આગળ ચાલુ રાખો · ${SUB[nx.s]} ${nx.i}</span>
    <b>${e(tn(nx.id)[0])}</b>
    ${bar(nx.p)}
    <span class="hm-go">${step(nx)} શરૂ કરો</span>
  </div>
</a>` : ""}

<div class="hm-stats rv">
  <div><b>${at ? pct(ok, at) + "%" : "—"}</b><span>Accuracy</span></div>
  <div><b>${streakNow()}<small>દિવસ</small></b><span>Streak</span></div>
  <div><b>${dn}<small>/${tot}</small></b><span>PYQ solved</span></div>
  <div><b>${dur(ws)}</b><span>Lectures જોયા</span></div>
</div>

<h2 class="pc-h rv">તમારી Journey</h2>
<div class="g g2 hm-subj">${Object.keys(T).map((s) => {
      const it = A.filter((x) => x.s === s), p = Math.round(it.reduce((a, x) => a + x.p, 0) / it.length);
      return `<div class="pc-card rv ${s}">
        <a class="pc-head" href="#/${s}"><span><b>${SUB[s]}</b> <span class="mu sm">${SE[s]}</span></span><b class="pc-big">${p}%</b></a>
        ${bar(p)}
        <div class="tiles">${it.map((x) => `<a href="#/t/${x.id}" class="tile ${x.t.clr ? "c" : ""}" style="--p:${x.p}%" title="${e(tn(x.id)[0])} — ${x.p}%"><span>${IC[s][x.i - 1]}</span></a>`).join("")}</div>
      </div>`;
    }).join("")}</div>

<div class="g g2" style="margin-top:14px">
  ${activityCard(last14())}
  <div class="pc-card rv"><div class="pc-head"><b>Focus Areas</b><a class="mu sm" href="#/stats">બધું જુઓ</a></div>
    ${wk.length ? wk.map((x) => `<a class="fa" href="#/p/${x.id}?bad"><span>${IC[x.s][x.i - 1]} ${e(tn(x.id)[0])}</span><b style="color:var(--no)">${x.acc}%</b></a>`).join("")
        : `<p class="mu sm" style="margin-top:10px">PYQ solve કરશો ત્યારે નબળા topics અહીં દેખાશે.</p>`}
  </div>
</div>`;
  };

  /* ---------- INSIGHTS (data analysis) ---------- */
  window.stats = function () {
    const A = all();
    const at = A.reduce((a, x) => a + x.at, 0), ok = A.reduce((a, x) => a + x.ok, 0);
    const dn = A.reduce((a, x) => a + x.d, 0), tot = A.reduce((a, x) => a + x.n, 0);
    const acc = at ? pct(ok, at) : 0;
    const tried = A.filter((x) => x.at > 0).sort((a, b) => a.acc - b.acc);
    const weak = tried.filter((x) => x.acc < 60).slice(0, 5);
    const strong = tried.filter((x) => x.acc >= 75).slice(-3).reverse();

    // test history
    const tests = Object.keys(S.tt || {}).filter((id) => S.tt[id] && S.tt[id].sub && tn(id)).map((id) => {
      const qs = build(id), R_ = qs.map((q) => S.a[q.id] || {});
      const c = R_.filter((z) => z.ok === true).length, w = R_.filter((z) => z.ok === false).length;
      return { id, c, w, n: qs.length, score: Math.round((c - w / 4) * 100) / 100, el: S.tt[id].el || 0, t0: S.tt[id].t0 || 0 };
    }).sort((a, b) => b.t0 - a.t0);

    const subjAcc = Object.keys(T).map((s) => {
      const it = A.filter((x) => x.s === s), a = it.reduce((q, x) => q + x.at, 0), o = it.reduce((q, x) => q + x.ok, 0);
      return { s, acc: a ? pct(o, a) : null, at: a };
    });

    if (!at && !tests.length) {
      return `<div class="in-empty rv"><div class="in-ico">📊</div><h1>Insights</h1>
        <p class="mu">હજી data નથી. કોઈ topic નો PYQ test આપો — પછી અહીં તમારી accuracy, નબળા topics અને progress દેખાશે.</p>
        <a class="btn p" href="#/m">PYQ શરૂ કરો</a></div>`;
    }

    return `<div class="rv"><span class="eb">Data Analysis</span><h1>તમારી Insights</h1></div>
<section class="in-top rv">
  ${ring(acc, "o", 104)}
  <div class="in-kpis">
    <div><b>${at}</b><span>Attempted</span></div>
    <div><b>${ok}</b><span>સાચા</span></div>
    <div><b>${at - ok}</b><span>ખોટા</span></div>
    <div><b>${pct(dn, tot)}%</b><span>Bank covered</span></div>
  </div>
</section>

<div class="g g2" style="margin-top:14px">
  ${subjAcc.map((x) => `<div class="pc-card rv ${x.s}"><div class="pc-head"><b>${SUB[x.s]} accuracy</b><b class="pc-big">${x.acc == null ? "—" : x.acc + "%"}</b></div>${bar(x.acc || 0)}<p class="mu sm" style="margin-top:8px">${x.at} પ્રશ્નો attempt કર્યા</p></div>`).join("")}
</div>

<div class="pc-card rv" style="margin-top:14px">
  <div class="pc-head"><b>Topic Mastery</b><span class="mu sm">tap કરો → topic ખુલશે</span></div>
  <div class="in-heat">${A.map((x) => `<a href="#/t/${x.id}" class="${heat(x.acc)}" title="${e(tn(x.id)[0])} — ${x.acc == null ? "no data" : x.acc + "%"}"><span>${IC[x.s][x.i - 1]}</span><small>${x.acc == null ? "—" : x.acc + "%"}</small></a>`).join("")}</div>
  <div class="in-key"><span><i class="h3"></i>75%+</span><span><i class="h2"></i>50–74%</span><span><i class="h1"></i>&lt;50%</span><span><i class="h0"></i>Data નથી</span></div>
</div>

<div class="g g2" style="margin-top:14px">
  <div class="pc-card rv"><div class="pc-head"><b>પહેલા આ સુધારો</b></div>
    ${weak.length ? weak.map((x) => `<a class="in-line" href="#/p/${x.id}?bad"><span>${IC[x.s][x.i - 1]} ${e(tn(x.id)[0])}</span><span class="in-acc low">${x.acc}%</span></a>`).join("")
        : `<p class="mu sm" style="margin-top:10px">અત્યારે કોઈ નબળો topic નથી. 👏</p>`}
  </div>
  <div class="pc-card rv"><div class="pc-head"><b>તમારા મજબૂત topics</b></div>
    ${strong.length ? strong.map((x) => `<a class="in-line" href="#/t/${x.id}"><span>${IC[x.s][x.i - 1]} ${e(tn(x.id)[0])}</span><span class="in-acc good">${x.acc}%</span></a>`).join("")
        : `<p class="mu sm" style="margin-top:10px">75%+ accuracy મળે એટલે અહીં દેખાશે.</p>`}
  </div>
</div>

<div class="pc-card rv" style="margin-top:14px">
  <div class="pc-head"><b>Topic પ્રમાણે Accuracy</b></div>
  ${tried.slice().reverse().map((x) => `<a class="in-bar" href="#/t/${x.id}"><span>${IC[x.s][x.i - 1]} ${e(tn(x.id)[0])}</span><div class="pb ${accTone(x.acc)}"><i data-w="${x.acc}"></i></div><b>${x.acc}%</b></a>`).join("") || `<p class="mu sm">Data નથી.</p>`}
</div>

${activityCard(last14()).replace('class="pc-card rv"', 'class="pc-card rv" style="margin-top:14px"')}

${tests.length ? `<div class="pc-card rv" style="margin-top:14px"><div class="pc-head"><b>Test History</b><span class="mu sm">${tests.length} tests</span></div>
  ${tests.map((x) => `<a class="in-line" href="#/x/${x.id}"><span><b>${e(tn(x.id)[0])}</b><br><span class="mu sm">${x.c} સાચા · ${x.w} ખોટા · ${fmtDur(x.el)}</span></span><span class="in-acc ${accTone(pct(x.c, x.n))}">${x.score}/${x.n}</span></a>`).join("")}</div>` : ""}`;
  };

  /* ---------- ROUTER (adds #/stats + route attribute for CSS) ---------- */
  R = function (fresh) {
    clearInterval(TI);
    const h = location.hash.slice(2).split("/"), v = h[0], id = (h[1] || "").split("?")[0], app = document.getElementById("app");
    document.querySelectorAll("nav a").forEach((a) =>
      a.classList.toggle("on", a.dataset.v === (v && "tpxn".includes(v) && id ? id[0] : v)));
    document.body.dataset.route = v || "home";
    const y = scrollY;
    document.title = (tn(id) && "tpxn".includes(v) ? tn(id)[1] + " · " : v === "data" ? "Data · " : v === "stats" ? "Insights · " : "") + "CCE Prelims Tracker";
    app.innerHTML = v === "m" || v === "r" ? subj(v) : v === "t" ? topic(id) : v === "p" ? prac(id) : v === "x" ? exam(id)
      : v === "n" ? notesView(id) : v === "data" ? data() : v === "stats" ? stats() : dash();
    anim(fresh);
    if (!fresh) scrollTo(0, y);
  };

  /* ---------- SUBJECT PAGE: add search ---------- */
  const _subj = subj;
  subj = function (s) {
    const html = _subj(s);
    const box = `<label class="srch rv"><span>🔍</span><input type="search" placeholder="Topic શોધો…" oninput="topicSearch(this.value)" autocomplete="off"></label><p class="mu sm srch-none" hidden>કોઈ topic મળ્યો નથી.</p>`;
    return html.replace('<div class="chips rv">', box + '<div class="chips rv">');
  };
  window.topicSearch = function (q) {
    q = q.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll("#app .tc").forEach((c) => {
      const ok = !q || c.textContent.toLowerCase().includes(q);
      c.hidden = !ok;
      if (ok) shown++;
    });
    const n = document.querySelector(".srch-none");
    if (n) n.hidden = shown > 0;
  };

  /* ---------- EXAM: progress bar, palette button, compact action bar ---------- */
  const _exam = exam;
  exam = function (id) {
    let h = _exam(id);
    if (h.indexOf('class="xb') < 0) return h; // result screen / empty state
    const qs = CUR.qs, n = qs.length;
    const ans = qs.filter((q) => (S.a[q.id] || {}).sel != null).length;
    h = h.replace('<button class="btn s sub"',
      `<button class="btn s pbtn" onclick="PALO=!PALO;R()">▦ ${ans}/${n}</button><button class="btn s sub"`);
    h = h.replace('<div class="pw">',
      `<div class="xprog"><i style="width:${pct(PI + 1, n)}%"></i></div><div class="pw">`);
    h = h.replace("★ Mark for Review &amp; Next", "★ Review")
         .replace("Clear Response", "Clear")
         .replace("← Previous", "←");
    return h;
  };

  /* close the palette sheet after choosing a question on phones */
  document.addEventListener("click", function (ev) {
    if (innerWidth <= 860 && ev.target.closest && ev.target.closest(".pal .pc")) PALO = false;
    if (ev.target.closest && ev.target.closest(".op") && navigator.vibrate) navigator.vibrate(8);
  }, true);
})();
