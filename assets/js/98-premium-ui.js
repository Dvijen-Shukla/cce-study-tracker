/*
 * CCE Prelims Tracker — Premium UI layer (v3)
 * Replaces ONLY the view/render layer (router, dashboard, subject, topic, practice, CBT test, result)
 * and adds an Analysis page. All data, notes, PYQ banks, solutions and storage logic are untouched.
 * Must load AFTER every data script and BEFORE 99-boot.js.
 */
(function () {
  "use strict";

  /* ---------- tiny helpers ---------- */
  const $ = id => document.getElementById(id);
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const P = {
    home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8.5 7.5h7"/><path d="M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>',
    bulb: '<path d="M9.5 18h5M10.5 21h3"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>',
    chart: '<path d="M5 20v-8M12 20V4M19 20v-5"/>',
    shield: '<path d="M12 3l7.5 3v5.5c0 4.8-3.2 8-7.5 9.5-4.3-1.5-7.5-4.7-7.5-9.5V6z"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    next: '<path d="M9 18l6-6-6-6"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    flame: '<path d="M12 3c.5 3-1.5 4.5-3 6.5-1.3 1.8-2 3.3-2 5.3a5 5 0 0 0 10 0c0-2-1-3.3-2-4.5-.3 1.2-.9 1.8-1.7 2 .5-3-.3-6.4-1.3-9.3z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    star: '<path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
    book: '<path d="M4 5.5C7 4 10 4.5 12 6.5c2-2 5-2.5 8-1V19c-3-1.5-6-1-8 1-2-2-5-2.5-8-1z"/><path d="M12 6.5V20"/>',
    pen: '<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/>',
    bolt: '<path d="M13 3L5.5 13.5h5.8L10.5 21l7.5-10.5h-5.8z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
    retry: '<path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4v4.6h4.6"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    cal: '<rect x="4" y="5.5" width="16" height="14.5" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4"/>',
    alert: '<path d="M12 4l9 15.5H3z"/><path d="M12 10v4.5M12 17.5v.01"/>',
    dl: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>'
  };
  const ic = (n, s = 20) =>
    `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;

  /* ---------- sheets (bottom sheet on mobile / dialog on desktop) ---------- */
  let PSH = 0; // practice/test palette sheet open
  function lockBody() {
    document.body.classList.toggle("lock", !!($("ush") || PSH));
  }
  function sheet(html) {
    closeSheet();
    const d = document.createElement("div");
    d.id = "ush";
    d.innerHTML = `<div class="ush-b" onclick="closeSheet()"></div><div class="ush-p" role="dialog" aria-modal="true"><i class="ush-h"></i>${html}</div>`;
    document.body.appendChild(d);
    lockBody();
    requestAnimationFrame(() => d.classList.add("on"));
  }
  function closeSheet() {
    const d = $("ush");
    if (d) d.remove();
    lockBody();
  }
  function palOpen(v) {
    PSH = v ? 1 : 0;
    R();
  }

  /* ---------- progress helpers ---------- */
  const heroRing = (a, b, c, ov, z) => tri(a, b, c, ov, z);
  const mini = (p, z = 56, col = "var(--a1)") =>
    `<div class="mring" style="width:${z}px;height:${z}px"><svg viewBox="0 0 44 44"><circle class="bg" cx="22" cy="22" r="18"/><circle class="fg" cx="22" cy="22" r="18" style="stroke:${col}" data-ring="${p}"/></svg><b>${p}%</b></div>`;
  const bar2 = (p, cls = "") => `<div class="ub ${cls}"><i data-w="${p}"></i></div>`;

  const usteps = x => {
    const s = [
      ["L", x.fl],
      ["N", x.fn],
      ["P", x.fp],
      ["✓", x.t.clr ? 1 : 0]
    ];
    return `<div class="usteps">${s
      .map(
        a =>
          `<span class="${a[1] >= 1 ? "ok" : a[1] > 0 ? "part" : ""}"><u><i style="width:${Math.round(a[1] * 100)}%"></i></u><em>${a[0]}</em></span>`
      )
      .join("")}</div>`;
  };

  /* ---------- counting questions for the daily goal ---------- */
  const qdAdd = n => {
    S.qd = S.qd || {};
    S.qd[today()] = (S.qd[today()] || 0) + n;
  };
  const qrev = id =>
    go(() => {
      const q = findQ(id),
        a = S.a[id] || (S.a[id] = {});
      if (!a.rv) qdAdd(1);
      a.rv = 1;
      a.ok = a.sel == null ? null : a.sel === q.a;
      bump();
    });
  const setGoal = n => {
    S.goal = n;
    save();
    closeSheet();
    R();
  };
  const goalSheet = () =>
    sheet(`<h3>Daily Goal</h3><p class="mu">રોજ કેટલા PYQ solve કરવા છે?</p><div class="u-goalopts">${[10, 15, 20, 30, 50]
      .map(n => `<button class="btn ${(S.goal || 15) === n ? "p" : ""}" onclick="setGoal(${n})">${n}</button>`)
      .join("")}</div>`);
  const setExam = v => {
    S.exam = v || "";
    save();
    R();
  };

  /* ================= ROUTER ================= */
  function R(fresh) {
    clearInterval(TI);
    const h = location.hash.slice(2).split("/"),
      v = h[0],
      id = (h[1] || "").split("?")[0],
      app = $("app"),
      isT = !!tn(id) && "tpxn".includes(v);
    const tabv = isT ? id[0] : v === "stats" || v === "data" || v === "m" || v === "r" ? v : "";
    document.querySelectorAll("[data-v]").forEach(a => a.classList.toggle("on", a.dataset.v === tabv));
    const focus = isT && (v === "p" || v === "x") && build(id).length > 0;
    document.body.classList.toggle("focus", focus);
    document.body.classList.toggle("notesmode", isT && v === "n");
    if (!(v === "p" || v === "x")) PSH = 0;
    const y = scrollY;
    document.title = (isT ? tn(id)[1] + " · " : v === "data" ? "Data · " : v === "stats" ? "Analysis · " : "") + "CCE Prelims Tracker";
    app.innerHTML =
      v === "m" || v === "r"
        ? subj(v)
        : v === "t"
        ? topic(id)
        : v === "p"
        ? prac(id)
        : v === "x"
        ? exam(id)
        : v === "n"
        ? notesView(id)
        : v === "data"
        ? data()
        : v === "stats"
        ? stats()
        : dash();
    lockBody();
    anim(fresh);
    if (!fresh) scrollTo(0, y);
  }

  /* ================= HOME ================= */
  function dash() {
    const A = all(),
      N = A.length,
      av = k => Math.round((A.reduce((a, x) => a + x[k], 0) / N) * 100),
      ov = Math.round(A.reduce((a, x) => a + x.p, 0) / N),
      clrN = A.filter(x => x.t.clr).length;
    const U = new Map();
    Object.values(V).forEach(v => v.forEach(x => U.set(x[1], x[2])));
    let ts = 0,
      ws = 0;
    U.forEach((s, id) => {
      ts += s;
      if (S.vw[id]) ws += s;
    });
    const tot = A.reduce((a, x) => a + x.n, 0),
      dn = A.reduce((a, x) => a + x.d, 0),
      at = A.reduce((a, x) => a + x.at, 0),
      ok = A.reduce((a, x) => a + x.ok, 0),
      nd = A.filter(x => x.fn >= 1).length;
    const nx = A.find(x => !x.t.clr && x.p > 0) || A.find(x => !x.t.clr);
    let sk = 0;
    for (let i = S.log[today()] ? 0 : 1; S.log[today(i)]; i++) sk++;
    const wk = A.filter(x => x.acc != null && x.at >= 3 && x.acc < 60).sort((a, b) => a.acc - b.acc).slice(0, 4);
    const L = av("fl"),
      Nn = av("fn"),
      Pq = av("fp"),
      hr = new Date().getHours(),
      gr = hr < 12 ? "સુપ્રભાત" : hr < 17 ? "શુભ બપોર" : "શુભ સાંજ";
    const qd = S.qd || {},
      goal = S.goal || 15,
      td = qd[today()] || 0,
      gp = Math.min(100, pct(td, goal));
    const wkd = [...Array(7)].map((_, i) => {
      const k = today(6 - i),
        d = new Date(Date.now() - (6 - i) * 864e5);
      return { l: DAYS[d.getDay()][0], n: S.log[k] || 0, t: i === 6 };
    });
    const mx = Math.max(1, ...wkd.map(d => d.n));
    const dl = S.exam ? Math.ceil((new Date(S.exam + "T00:00:00") - new Date()) / 864e5) : null;
    const now = new Date();

    return `${nudge()}
<div class="u-hello rv"><div><span class="u-date">${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]}</span><h1>${gr} 👋</h1></div>
<div class="u-chips">${dl != null && dl >= 0 ? `<a class="u-chip" href="#/stats">${ic("cal", 15)}<b>${dl}</b> days</a>` : ""}<span class="u-chip ${sk ? "hot" : ""}">${ic("flame", 15)}<b>${sk}</b></span></div></div>

<section class="u-hero rv"><div class="u-hero-r">${heroRing(L, Nn, Pq, ov, 132)}</div>
<div class="u-hero-l"><span class="eb">Overall Progress</span>
<div class="u-leg"><div><i style="background:#8b7bff"></i><span>Lectures</span><b>${L}%</b></div><div><i style="background:#22d3ee"></i><span>Notes</span><b>${Nn}%</b></div><div><i style="background:#f472b6"></i><span>PYQ</span><b>${Pq}%</b></div></div></div>
<p class="u-hero-f"><b>${clrN}</b> / ${N} topics clear <span>·</span> ${N - clrN} બાકી</p></section>

${
  nx
    ? `<a class="u-next rv ${nx.s}" href="#/t/${nx.id}"><div class="u-nv" style="${cover(nx.id)}">${wm(nx.id)}${thumb(nx.id)}</div>
<div class="u-nb"><span class="eb">હવે પછી · ${SUB[nx.s]} ${nx.i}</span><b>${e(tn(nx.id)[0])}</b><span class="u-ns"><i></i>${step(nx)}${nx.p ? " · " + nx.p + "%" : ""}</span></div><span class="u-go">${ic("next", 20)}</span></a>`
    : ""
}

<div class="u-two rv">
<button class="u-card u-goal" onclick="goalSheet()" aria-label="Daily goal">${mini(gp, 58, "var(--ok)")}<div><span class="eb">Today</span><b>${td}<small> / ${goal}</small></b><span class="mu sm">PYQ solved</span></div></button>
<div class="u-card u-time"><span class="eb">Time left</span><b>${dur(Math.max(0, ts - ws))}</b><span class="mu sm">lectures બાકી</span>${bar2(pct(ws, ts))}</div></div>

<div class="u-stats rv">
<div class="u-st">${ic("play", 16)}<b>${dur(ws)}</b><span>Lectures જોયા</span></div>
<div class="u-st">${ic("pen", 16)}<b>${nd}<small>/${N}</small></b><span>Notes પૂરી</span></div>
<div class="u-st">${ic("target", 16)}<b>${dn}<small>/${tot}</small></b><span>PYQ solved</span></div>
<div class="u-st">${ic("bolt", 16)}<b>${at ? Math.round((ok / at) * 100) + "%" : "—"}</b><span>Accuracy</span></div></div>

<h2 class="u-h rv">તમારી Journey</h2>
<div class="u-two stack rv">${Object.keys(T)
      .map(s => {
        const it = A.filter(x => x.s === s),
          p = Math.round(it.reduce((a, x) => a + x.p, 0) / it.length);
        return `<div class="u-card u-sj ${s}"><a class="u-sjh" href="#/${s}"><div><b>${SUB[s]}</b><span class="mu sm">${SE[s]} · ${it.filter(x => x.t.clr).length}/${it.length} clear</span></div><strong>${p}%</strong></a>${bar2(p)}
<div class="tiles">${it.map(x => `<a href="#/t/${x.id}" class="tile ${x.t.clr ? "c" : ""}" style="--p:${x.p}%" title="${e(tn(x.id)[0])} — ${x.p}%"><span>${IC[s][x.i - 1]}</span></a>`).join("")}</div></div>`;
      })
      .join("")}</div>

<div class="u-two stack rv" style="margin-top:12px">
<div class="u-card"><div class="u-ch"><b>Activity</b><span class="mu sm">છેલ્લા 7 દિવસ</span></div><div class="u-wk">${wkd
      .map(d => `<div class="${d.t ? "t" : ""}"><i class="${d.n ? "" : "z"}" style="height:${d.n ? Math.max(12, (d.n / mx) * 100) : 5}%" title="${d.n}"></i><span>${d.l}</span></div>`)
      .join("")}</div></div>
<div class="u-card"><div class="u-ch"><b>Focus Areas</b><span class="mu sm">accuracy &lt; 60%</span></div>${
      wk.length
        ? wk.map(x => `<a class="u-fa" href="#/p/${x.id}?bad"><span>${IC[x.s][x.i - 1]} ${e(tn(x.id)[0])}</span><b>${x.acc}%</b></a>`).join("")
        : `<p class="mu sm u-empty">PYQ solve કરશો ત્યારે નબળા topics અહીં દેખાશે.</p>`
    }</div></div>`;
  }

  /* ================= SUBJECT ================= */
  let SQ = "";
  function usearch(v) {
    SQ = (v || "").toLowerCase().trim();
    let n = 0;
    document.querySelectorAll(".u-tc").forEach(c => {
      const hit = !SQ || c.dataset.q.includes(SQ);
      c.style.display = hit ? "" : "none";
      if (hit) n++;
    });
    const em = $("uempty");
    if (em) em.style.display = n ? "none" : "";
  }
  function subj(s) {
    const A = all().filter(x => x.s === s),
      p = Math.round(A.reduce((a, x) => a + x.p, 0) / A.length),
      fl = A.filter(x => F === "all" || (F === "todo" && x.p === 0) || (F === "go" && x.p > 0 && !x.t.clr) || (F === "ok" && x.t.clr));
    const cnt = { all: A.length, todo: A.filter(x => x.p === 0).length, go: A.filter(x => x.p > 0 && !x.t.clr).length, ok: A.filter(x => x.t.clr).length };
    setTimeout(() => usearch(SQ), 0);
    return `<div class="${s}"><div class="u-sh rv"><div><span class="eb">${SE[s]}</span><h1>${SUB[s]}</h1><p class="mu">${cnt.ok} / ${A.length} topics clear · ${cnt.go} ચાલુ</p></div>${ring(p, s, 92)}</div>
<div class="u-tools rv"><label class="u-search">${ic("search", 18)}<input type="search" placeholder="Topic શોધો…" value="${e(SQ)}" oninput="usearch(this.value)" autocomplete="off"></label>
<div class="chips">${[["all", "બધા"], ["todo", "બાકી"], ["go", "ચાલુ"], ["ok", "Clear"]]
      .map(c => `<button class="chip ${F === c[0] ? "on" : ""}" onclick="F='${c[0]}';R()">${c[1]}<em>${cnt[c[0]]}</em></button>`)
      .join("")}</div></div>
<div class="u-grid">${
      fl
        .map(x => {
          const b = stt(x);
          return `<a class="u-tc rv" href="#/t/${x.id}" data-q="${e((tn(x.id)[0] + " " + tn(x.id)[1]).toLowerCase())}"><div class="u-cv" style="${cover(x.id)}">${wm(x.id)}${thumb(x.id)}<small>${String(x.i).padStart(2, "0")}</small></div>
<div class="u-tb"><div class="u-tt"><b>${e(tn(x.id)[0])}</b><span class="bd ${b[1]}">${x.t.clr ? "✓ Clear" : x.p ? x.p + "%" : "બાકી"}</span></div><span class="mu sm">${e(tn(x.id)[1])}</span>${usteps(x)}
<div class="u-meta"><span>${ic("play", 12)} ${x.wn}/${x.vs.length}</span><span>${ic("target", 12)} ${x.n ? x.d + "/" + x.n : "—"}</span>${x.acc != null ? `<span class="acc">${x.acc}%</span>` : ""}</div></div></a>`;
        })
        .join("") || ""
    }</div><p class="mu u-empty" id="uempty" style="display:${fl.length ? "none" : ""}">અહીં કોઈ topic નથી.</p></div>`;
  }

  /* ================= TOPIC ================= */
  const nextAct = x => {
    if (x.fl < 1) {
      const v = x.vs.find(z => !S.vw[z[1]]);
      return v ? { t: "Lecture જુઓ", h: "https://www.youtube.com/watch?v=" + v[1], ext: 1, i: "play" } : { t: "Lecture પૂરું કરો", j: "lec", i: "play" };
    }
    if (x.fn < 1) return NOTES_[x.id] ? { t: "Notes વાંચો", h: "#/n/" + x.id, i: "book" } : { t: "Notes પૂરી કરો", j: "notes", i: "pen" };
    if (x.fp < 1) return x.n ? { t: x.d ? "Test ચાલુ રાખો" : "PYQ Test શરૂ કરો", h: "#/x/" + x.id, i: "target" } : { t: "PYQ પૂરા કરો", j: "pyq", i: "target" };
    return x.t.clr ? null : { t: "Topic Clear કરો", c: 1, i: "check" };
  };
  function topic(id) {
    const n = tn(id);
    if (!n) return dash();
    const x = st(id),
      t = x.t,
      s = x.s,
      b = stt(x),
      nt = NOTES_[id],
      na = nextAct(x);
    const fl = [
      ["Lecture", x.fl, "lec", "play"],
      ["Notes", x.fn, "notes", "pen"],
      ["PYQ", x.fp, "pyq", "target"],
      ["Clear", t.clr ? 1 : 0, "clr", "check"]
    ];
    const cur = fl.findIndex(f => f[1] < 1);
    const cta = na
      ? `<div class="u-cta"><div class="u-cta-i">${na.h && !na.ext ? `<a class="btn p" href="${na.h}">${ic(na.i, 18)} ${na.t}</a>` : na.ext ? `<a class="btn p" href="${na.h}" target="_blank" rel="noopener">${ic(na.i, 18)} ${na.t}</a>` : na.c ? `<button class="btn p" onclick="clr('${id}')">${ic(na.i, 18)} ${na.t}</button>` : `<button class="btn p" onclick="jump('${na.j}')">${ic(na.i, 18)} ${na.t}</button>`}</div></div>`
      : "";
    return `<div class="${s} u-topic"><a class="back" href="#/${s}">${ic("back", 18)} ${SUB[s]}</a>
<section class="u-th rv" style="${cover(id)}">${wm(id)}<div class="u-th-t"><span class="bd ${b[1]}">${b[0]}</span><h1>${e(n[0])}</h1><p>${e(n[1])}</p></div><div class="u-th-r"><div class="u-th-art">${art(id).replace("<em>", '<em class="big">')}</div>${ring(x.p, s, 92)}</div></section>

<div class="u-flow rv">${fl
      .map(
        (f, i) =>
          `<a class="${f[1] >= 1 ? "ok" : i === cur ? "cur" : ""}" href="#" onclick="jump('${f[2]}');return false"><span>${f[1] >= 1 ? ic("check", 16) : ic(f[3], 16)}</span><b>${f[0]}</b><small>${f[1] >= 1 ? "Done" : i === cur ? "Now" : Math.round(f[1] * 100) + "%"}</small></a>`
      )
      .join("")}</div>

<div class="sec rv" id="s-lec"><div class="u-card"><div class="u-sec"><span class="u-n">1</span><div><b>Lectures</b><p class="mu sm">${x.vs.length ? x.wn + " / " + x.vs.length + " જોયા · કુલ " + dur(x.sec) : "આ topic ની playlist માં video નથી"}</p></div>${x.vs.length ? `<button class="btn s" onclick="allV('${id}',${x.wn < x.vs.length})">${x.wn < x.vs.length ? "Mark all" : "Unmark"}</button>` : ""}</div>
${x.vs.length ? bar2(pct(x.wn, x.vs.length)) : ""}
<div class="u-vl">${
      x.vs
        .map(
          v => `<div class="u-v ${S.vw[v[1]] ? "dn" : ""}"><a class="u-vt" href="https://www.youtube.com/watch?v=${v[1]}" target="_blank" rel="noopener" style="background-image:url(https://i.ytimg.com/vi/${v[1]}/mqdefault.jpg)" aria-label="Play"><i>${ic("play", 18)}</i><em>${dur(v[2])}</em></a><div class="u-vb"><b>${e(v[0])}</b><span class="mu sm">${S.vw[v[1]] ? "✓ જોયું" : dur(v[2])}</span></div><label class="u-tick"><input type="checkbox" class="u-chk" ${S.vw[v[1]] ? "checked" : ""} onchange="vw('${v[1]}',this.checked)" aria-label="Watched"></label></div>`
        )
        .join("") ||
      `<label class="ck u-manual"><input type="checkbox" class="u-chk" ${t.lec ? "checked" : ""} onchange="tg('${id}','lec',this.checked)"> Lecture પૂરું થયું (manual)</label>`
    }</div></div></div>

<div class="sec rv" id="s-notes"><div class="u-card"><div class="u-sec"><span class="u-n">2</span><div><b>Notes</b><p class="mu sm">વાંચો → તમારી book માં લખો → tick કરો</p></div>${nt ? `<a class="btn p s" href="#/n/${id}">${ic("book", 16)} Open</a>` : `<span class="mu sm">ટૂંક સમયમાં</span>`}</div>
<label class="u-row"><input type="checkbox" class="u-chk" ${x.fn >= 1 ? "checked" : ""} onchange="nd('${id}',this.checked)"><span><b>મારી notes લખાઈ ગઈ</b><small class="mu">Notes complete</small></span></label></div></div>

<div class="sec rv" id="s-pyq"><div class="u-card"><div class="u-sec"><span class="u-n">3</span><div><b>PYQ Practice</b><p class="mu sm">જાતે solve કરો → Answer → Detailed solution</p></div></div>
${
  x.n
    ? `<div class="u-m3"><div><b>${x.n}</b><span>પ્રશ્નો</span></div><div><b>${x.d}</b><span>Solved</span></div><div><b>${x.acc != null ? x.acc + "%" : "—"}</b><span>Accuracy</span></div></div>${bar2(pct(x.d, x.n))}
<div class="u-btns"><a class="btn p" href="#/x/${id}">${ic("target", 18)} ${ttxt(id)}</a><a class="btn" href="#/p/${id}">${ic("bolt", 18)} Practice Mode</a>${x.at > x.ok ? `<a class="btn" href="#/p/${id}?bad">${ic("alert", 18)} Mistakes (${x.at - x.ok})</a>` : ""}${x.d ? `<button class="btn" onclick="resetT('${id}')">${ic("retry", 18)} Reset</button>` : ""}</div>`
    : `<p class="mu" style="margin:10px 0">આ topic ના PYQ ટૂંક સમયમાં ઉમેરાશે.</p><label class="u-row"><input type="checkbox" class="u-chk" ${t.pd ? "checked" : ""} onchange="tg('${id}','pd',this.checked)"><span><b>PYQ પૂરા (manual)</b></span></label>`
}
<details class="u-more"><summary>+ પોતાનો પ્રશ્ન ઉમેરો</summary><div class="f"><textarea id="fq" rows="3" placeholder="પ્રશ્ન"></textarea><div class="f f2">${[0, 1, 2, 3].map(k => `<input id="fo${k}" placeholder="Option ${L[k]}">`).join("")}</div>
<div class="f f2"><select id="fa"><option value="0">સાચો જવાબ: A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select><input id="fy" placeholder="Source / Year"></div><textarea id="fe" rows="2" placeholder="Solution / Explanation"></textarea><input id="fi" type="file" accept="image/*"><button class="btn p" onclick="addQ('${id}')">Add Question</button></div></details></div></div>

<div class="sec rv" id="s-clr"><div class="u-card"><div class="u-sec" style="margin:0"><span class="u-n">4</span><div><b>Mark Clear</b><p class="mu sm">Confidence આવે ત્યારે</p></div><button class="btn ${t.clr ? "" : "p"} s" onclick="clr('${id}')">${t.clr ? "Undo" : "Topic Clear"}</button></div></div></div>
${cta}</div>`;
  }

  /* ================= QUESTION PALETTE ================= */
  const palPractice = (qs, ls) =>
    `<div class="u-pt"><b>Question Palette</b><span class="mu sm">${qs.filter(q => (S.a[q.id] || {}).rv).length}/${qs.length} solved</span></div>
<div class="chips">${[["all", "All"], ["un", "Unsolved"], ["bad", "Wrong"], ["mk", "★"]].map(c => `<button class="chip ${PF === c[0] ? "on" : ""}" onclick="setF('${c[0]}')">${c[1]}</button>`).join("")}</div>
<div class="u-pg">${ls
      .map(k => {
        const z = S.a[qs[k].id] || {};
        return `<button class="u-pc ${k === PI ? "cur" : ""} ${z.rv ? (z.ok === true ? "g" : z.ok === false ? "b" : "sk") : z.sel != null ? "sel" : ""} ${(S.mk || {})[qs[k].id] ? "k" : ""}" onclick="ugq(${k})">${k + 1}</button>`;
      })
      .join("")}</div>
<p class="u-lg"><span><i class="g"></i>સાચા</span><span><i class="b"></i>ખોટા</span><span><i class="sel"></i>પસંદ</span><span><i class="k"></i>★</span></p>`;
  const ugq = k => {
    PSH = 0;
    gq(k);
  };

  /* ================= PRACTICE ================= */
  function prac(id) {
    const n = tn(id);
    if (!n) return dash();
    const qs = build(id);
    CUR = { id, qs };
    if (!qs.length)
      return `<a class="back" href="#/t/${id}">${ic("back", 18)} ${e(n[0])}</a><div class="u-card" style="margin-top:16px"><h2 class="u-h" style="margin-top:0">હજી PYQ નથી</h2><p class="mu">Topic page પરથી જાતે પ્રશ્ન ઉમેરી શકો છો.</p></div>`;
    PI = Math.max(0, Math.min(PI, qs.length - 1));
    const ls = qs.map((q, k) => k).filter(k => k === PI || fok(qs[k])),
      q = qs[PI],
      a = S.a[q.id] || {},
      x = st(id),
      s = id[0],
      pos = ls.indexOf(PI),
      mk = (S.mk || {})[q.id];
    const banner = a.rv
      ? `<div class="u-res ${a.ok === true ? "g" : a.ok === false ? "b" : "s"}"><span>${a.ok === true ? ic("check", 22) : a.ok === false ? ic("x", 22) : ic("alert", 22)}</span><div><b>${a.ok === true ? "સાચો જવાબ!" : a.ok === false ? "ખોટો જવાબ" : "Skipped"}</b>${a.ok === true ? "" : `<small>સાચો જવાબ: <em>${L[q.a]}) ${e(q.o[q.a])}</em></small>`}</div></div>`
      : "";
    const solBody = SOL
      ? `<div class="sol${SOLF ? " full" : ""}"><div class="solh"><b>💡 Detailed Solution</b><button class="btn s" onclick="SOLF=!SOLF;R()">${SOLF ? "✕ Close" : "⛶ Full view"}</button></div>${q.h || (q.e ? `<p style="white-space:pre-wrap">${e(q.e)}</p>` : `<p class="mu">આ પ્રશ્નનું solution ઉપલબ્ધ નથી.</p>`)}${q.sv ? `<div class="vis">${q.sv}</div>` : ""}</div>`
      : "";
    return `<div class="${s} u-pr"><div class="u-top"><a class="u-ib" href="#/t/${id}" aria-label="Back">${ic("back", 22)}</a>
<div class="u-tt2"><b>${e(n[0])}</b><span>પ્રશ્ન <strong>${PI + 1}</strong> / ${qs.length}${x.acc != null ? " · " + x.acc + "% accuracy" : ""}</span></div>
<button class="u-ib ${mk ? "on" : ""}" onclick="mark('${q.id}')" aria-label="Mark for review">${ic("star", 21)}</button>
<button class="u-ib u-palb" onclick="palOpen(1)" aria-label="Palette">${ic("grid", 21)}</button></div>
<div class="u-seg">${bar2(pct(x.d, x.n))}</div>
<div class="u-layout"><div class="u-main">
<div class="u-q"><div class="u-qh"><span class="u-qn">Q${PI + 1}</span>${q.y ? `<span class="tag">${e(q.y)}</span>` : ""}${q.b ? "" : `<button class="x" title="Delete" onclick="delQ('${q.id}')">✕</button>`}</div>
<div class="qt">${e(q.q)}</div>${q.img ? `<img src="${e(q.img)}" alt="" class="u-qimg">` : ""}${q.v ? `<div class="vis">${q.v}</div>` : ""}
<div class="opts">${q.o
      .map((o, k) => {
        let c = "op";
        if (a.rv) {
          if (k === q.a) c += " good";
          else if (k === a.sel) c += " bad";
        } else if (k === a.sel) c += " sel";
        return `<button class="${c}" ${a.rv ? "disabled" : ""} onclick="pick('${q.id}',${k})"><i>${L[k]}</i><span>${e(o)}</span></button>`;
      })
      .join("")}</div>${banner}</div>
${a.rv && SOL ? solBody : ""}
<div class="u-act"><button class="u-ib sq" onclick="nav(-1)" ${pos <= 0 ? "disabled" : ""} aria-label="Previous">${ic("back", 22)}</button>
${
  a.rv
    ? `<button class="btn grow ${SOL ? "on" : ""}" onclick="SOL=!SOL;R()">${ic("bulb", 18)} ${SOL ? "Hide" : "Solution"}</button><button class="btn p grow" onclick="nav(1)" ${pos >= ls.length - 1 ? "disabled" : ""}>Next ${ic("next", 18)}</button>`
    : `<button class="btn p grow" onclick="qrev('${q.id}')">${ic("eye", 18)} ${a.sel == null ? "Show Answer" : "Check Answer"}</button><button class="btn" onclick="SOL=!SOL;R()" aria-label="Solution">${ic("bulb", 18)}</button>`
}
${a.rv ? "" : `<button class="u-ib sq" onclick="nav(1)" ${pos >= ls.length - 1 ? "disabled" : ""} aria-label="Next">${ic("next", 22)}</button>`}</div>
${!a.rv && SOL ? solBody : ""}
${a.rv ? `<div class="u-rt"><button class="btn s" onclick="retry('${q.id}')">${ic("retry", 15)} Retry</button><span class="mu sm">← → keys · 1-4 option · Enter = answer</span></div>` : ""}
</div>
<aside class="u-side"><div class="u-card">${palPractice(qs, ls)}</div></aside></div>
${PSH ? `<div id="upal"><div class="ush-b on" onclick="palOpen(0)"></div><div class="ush-p on"><i class="ush-h"></i>${palPractice(qs, ls)}<button class="btn" style="width:100%;margin-top:14px" onclick="palOpen(0)">Close</button></div></div>` : ""}
</div>`;
  }

  /* ================= CBT TEST ================= */
  function exam(id) {
    const n = tn(id);
    if (!n) return dash();
    const qs = build(id);
    CUR = { id, qs };
    S.tt = S.tt || {};
    let T_ = S.tt[id];
    if (!qs.length) return `<a class="back" href="#/t/${id}">${ic("back", 18)} ${e(n[0])}</a><div class="u-card" style="margin-top:16px"><h2 class="u-h" style="margin-top:0">હજી PYQ નથી</h2></div>`;
    if (T_ && T_.sub) return result(id, qs, T_);
    if (!T_) {
      T_ = S.tt[id] = { t0: Date.now(), sub: 0, vis: {}, mr: {} };
      qs.forEach(q => delete S.a[q.id]);
      save();
    }
    T_.vis = T_.vis || {};
    T_.mr = T_.mr || {};
    PI = Math.max(0, Math.min(PI, qs.length - 1));
    const q = qs[PI],
      a = S.a[q.id] || {};
    T_.vis[q.id] = 1;
    const cl = q2 => {
      const z = S.a[q2.id] || {},
        m = T_.mr[q2.id];
      return m ? (z.sel != null ? "m g" : "m") : z.sel != null ? "g" : T_.vis[q2.id] ? "r" : "n";
    };
    const ans = qs.filter(q2 => (S.a[q2.id] || {}).sel != null).length,
      nA = qs.filter(q2 => cl(q2) === "r").length,
      nN = qs.filter(q2 => cl(q2) === "n").length,
      nM = qs.filter(q2 => T_.mr[q2.id]).length;
    clearInterval(TI);
    TI = setInterval(tick, 1000);
    setTimeout(tick, 0);
    const pal = `<div class="u-pt"><b>Question Palette</b><span class="mu sm">${ans}/${qs.length} answered</span></div>
<div class="u-pg">${qs.map((q2, k) => `<button class="u-pc ${cl(q2)} ${k === PI ? "cur" : ""}" onclick="ugq(${k})">${k + 1}</button>`).join("")}</div>
<p class="u-lg"><span><i class="g"></i>Answered ${ans}</span><span><i class="r"></i>Not answered ${nA}</span><span><i class="n"></i>Not visited ${nN}</span><span><i class="m"></i>Review ${nM}</span></p>
<button class="btn p" style="width:100%;margin-top:14px" onclick="usub('${id}')">Submit Test</button>`;
    return `<div class="${id[0]} u-pr u-ex"><div class="u-top"><a class="u-ib" href="#/t/${id}" aria-label="Exit">${ic("back", 22)}</a>
<div class="u-tt2"><b>${e(n[0])}</b><span>CBT · પ્રશ્ન <strong>${PI + 1}</strong> / ${qs.length}</span></div>
<span class="u-timer">${ic("clock", 16)}<b id="tm">00:00</b></span><button class="u-ib u-palb" onclick="palOpen(1)" aria-label="Palette">${ic("grid", 21)}</button></div>
<div class="u-seg">${bar2(pct(ans, qs.length))}</div>
<div class="u-layout"><div class="u-main"><div class="u-q"><div class="u-qh"><span class="u-qn">Q${PI + 1}</span><span class="tag">+1 · −¼</span>${q.y ? `<span class="tag">${e(q.y)}</span>` : ""}${T_.mr[q.id] ? `<span class="tag rv-t">★ Review</span>` : ""}</div>
<div class="qt">${e(q.q)}</div>${q.img ? `<img src="${e(q.img)}" alt="" class="u-qimg">` : ""}${q.v ? `<div class="vis">${q.v}</div>` : ""}
<div class="opts">${q.o.map((o, k) => `<button class="op ${k === a.sel ? "sel" : ""}" onclick="pick('${q.id}',${k})"><i>${L[k]}</i><span>${e(o)}</span></button>`).join("")}</div>
<button class="u-clear" onclick="tclear()" ${a.sel == null ? "disabled" : ""}>${ic("x", 14)} Clear response</button></div>
<div class="u-act"><button class="u-ib sq" onclick="nav(-1)" ${PI <= 0 ? "disabled" : ""} aria-label="Previous">${ic("back", 22)}</button>
<button class="btn grow" onclick="tmark()">${ic("star", 17)} Mark &amp; Next</button><button class="btn p grow" onclick="nav(1)" ${PI >= qs.length - 1 ? "disabled" : ""}>Save &amp; Next ${ic("next", 18)}</button></div></div>
<aside class="u-side"><div class="u-card">${pal}</div></aside></div>
${PSH ? `<div id="upal"><div class="ush-b on" onclick="palOpen(0)"></div><div class="ush-p on"><i class="ush-h"></i>${pal}<button class="btn" style="width:100%;margin-top:10px" onclick="palOpen(0)">Close</button></div></div>` : ""}</div>`;
  }
  function usub(id) {
    const qs = CUR.qs,
      T_ = S.tt[id],
      un = qs.filter(q => (S.a[q.id] || {}).sel == null).length,
      mr = Object.keys(T_.mr || {}).length;
    PSH = 0;
    sheet(`<h3>Test Submit કરવો છે?</h3><div class="u-sub3"><div><b>${qs.length - un}</b><span>Answered</span></div><div class="w"><b>${un}</b><span>Not answered</span></div><div><b>${mr}</b><span>Review</span></div></div><p class="mu sm" style="margin:12px 0">Submit પછી જવાબ બદલી શકાશે નહીં.</p><div class="u-sbtn"><button class="btn" onclick="closeSheet()">પાછા જાઓ</button><button class="btn p" onclick="dosub('${id}')">Submit Test</button></div>`);
  }
  function dosub(id) {
    closeSheet();
    const qs = CUR.qs,
      T_ = S.tt[id];
    let ans = 0;
    qs.forEach(q => {
      const a = S.a[q.id] || (S.a[q.id] = {});
      if (a.sel != null) ans++;
      a.rv = 1;
      a.ok = a.sel == null ? null : a.sel === q.a;
    });
    T_.sub = 1;
    T_.el = Date.now() - T_.t0;
    qdAdd(ans);
    bump();
    save();
    clearInterval(TI);
    R(1);
    scrollTo(0, 0);
  }

  /* ================= RESULT ================= */
  function result(id, qs, T_) {
    const n = tn(id),
      A = qs.map(q => S.a[q.id] || {}),
      c = A.filter(z => z.ok === true).length,
      w = A.filter(z => z.ok === false).length,
      sk = qs.length - c - w,
      sc = Math.round((c - w / 4) * 100) / 100,
      acc = c + w ? Math.round((c / (c + w)) * 100) : 0,
      pc = Math.round((c / qs.length) * 100),
      sec = Math.round((T_.el || 0) / 1000),
      msg = pc >= 80 ? "ખૂબ સરસ! 🎉" : pc >= 60 ? "સારું પ્રદર્શન 👍" : pc >= 40 ? "થોડી વધુ practice જોઈએ 💪" : "Concept ફરી વાંચો, પછી Retake કરો 📘";
    return `<div class="${id[0]} u-rs"><a class="back" href="#/t/${id}">${ic("back", 18)} ${e(n[0])}</a>
<section class="u-rh rv"><div><span class="eb">Test Result</span><h1>${sc}<small> / ${qs.length}</small></h1><p>${msg}</p><span class="mu sm">Negative marking: ખોટા જવાબ દીઠ −¼</span></div>${ring(pc, id[0], 124)}</section>
<div class="u-split rv"><i class="g" style="flex:${c || 0.0001}"></i><i class="b" style="flex:${w || 0.0001}"></i><i class="s" style="flex:${sk || 0.0001}"></i></div>
<div class="u-stats rv"><div class="u-st g"><b>${c}</b><span>સાચા</span></div><div class="u-st b"><b>${w}</b><span>ખોટા</span></div><div class="u-st s"><b>${sk}</b><span>Skipped</span></div><div class="u-st"><b>${acc}%</b><span>Accuracy</span></div></div>
<div class="u-card rv" style="margin-top:12px"><div class="u-ch"><b>પ્રશ્ન પ્રમાણે Review</b><span class="mu sm">${ic("clock", 13)} ${Math.floor(sec / 60)}m ${sec % 60}s</span></div>
<div class="u-rl">${qs
      .map((q, k) => {
        const z = A[k],
          s_ = z.ok === true ? ["સાચો", "g"] : z.ok === false ? ["ખોટો", "b"] : ["Skipped", "s"];
        return `<button class="u-ri ${s_[1]}" onclick="viewSol('${id}',${k})"><span class="u-rn">${k + 1}</span><span class="u-rs2">${s_[0]}</span><span class="mu sm u-ra">તમારો: <b>${z.sel != null ? L[z.sel] : "—"}</b> · સાચો: <b>${L[q.a]}</b></span><span class="u-rg">${ic("bulb", 15)}</span></button>`;
      })
      .join("")}</div></div>
<div class="u-btns rv" style="margin-top:14px"><a class="btn" href="#/p/${id}">બધા Solutions</a>${w ? `<a class="btn" href="#/p/${id}?bad">ફક્ત ખોટા</a>` : ""}<button class="btn p" onclick="retake('${id}')">${ic("retry", 17)} Retake</button></div></div>`;
  }

  /* ================= ANALYSIS ================= */
  function stats() {
    const A = all(),
      N = A.length,
      ov = Math.round(A.reduce((a, x) => a + x.p, 0) / N),
      tot = A.reduce((a, x) => a + x.n, 0),
      dn = A.reduce((a, x) => a + x.d, 0),
      at = A.reduce((a, x) => a + x.at, 0),
      ok = A.reduce((a, x) => a + x.ok, 0),
      acc = at ? Math.round((ok / at) * 100) : null;
    const U = new Map();
    Object.values(V).forEach(v => v.forEach(x => U.set(x[1], x[2])));
    let ts = 0,
      ws = 0;
    U.forEach((s, id) => {
      ts += s;
      if (S.vw[id]) ws += s;
    });
    const score = acc == null ? ov : Math.round(ov * 0.6 + acc * 0.4),
      lvl = score >= 80 ? "Exam Ready 🏆" : score >= 55 ? "Strong 💪" : score >= 25 ? "Building 📈" : "Getting Started 🌱";
    const dl = S.exam ? Math.ceil((new Date(S.exam + "T00:00:00") - new Date()) / 864e5) : null;
    const remH = Math.max(0, ts - ws) / 3600,
      remQ = Math.max(0, tot - dn);
    const tried = A.filter(x => x.at > 0).sort((a, b) => a.acc - b.acc);
    const wrongTopics = A.filter(x => x.at - x.ok > 0).sort((a, b) => b.at - b.ok - (a.at - a.ok)).slice(0, 5);
    const wrongTotal = A.reduce((a, x) => a + (x.at - x.ok), 0),
      marked = Object.keys(S.mk || {}).length;
    const dow = (new Date().getDay() + 6) % 7;
    const heat = [...Array(35)].map((_, i) => {
      const ago = dow + 28 - i;
      if (ago < 0) return `<i class="f"></i>`;
      const n = S.log[today(ago)] || 0,
        lv = n === 0 ? 0 : n < 4 ? 1 : n < 10 ? 2 : n < 20 ? 3 : 4;
      return `<i class="l${lv}" title="${today(ago)} · ${n}"></i>`;
    });
    const act28 = [...Array(28)].filter((_, i) => S.log[today(i)]).length;
    const hist = Object.keys(S.tt || {})
      .filter(k => S.tt[k] && S.tt[k].sub && tn(k))
      .map(k => {
        const qs = build(k),
          A_ = qs.map(q => S.a[q.id] || {}),
          c = A_.filter(z => z.ok === true).length,
          w = A_.filter(z => z.ok === false).length;
        return { k, t0: S.tt[k].t0, c, w, n: qs.length, sc: Math.round((c - w / 4) * 100) / 100, el: Math.round((S.tt[k].el || 0) / 1000) };
      })
      .sort((a, b) => b.t0 - a.t0)
      .slice(0, 8);
    const sj = Object.keys(T).map(s => {
      const it = A.filter(x => x.s === s),
        av = k => Math.round((it.reduce((a, x) => a + x[k], 0) / it.length) * 100),
        a_ = it.reduce((a, x) => a + x.at, 0),
        o_ = it.reduce((a, x) => a + x.ok, 0);
      return { s, fl: av("fl"), fn: av("fn"), fp: av("fp"), acc: a_ ? Math.round((o_ / a_) * 100) : null, p: Math.round(it.reduce((a, x) => a + x.p, 0) / it.length) };
    });
    return `<div class="u-sh rv"><div><span class="eb">Analysis</span><h1>તમારું Progress</h1><p class="mu">Data પરથી તમારી તૈયારીનું ચિત્ર</p></div></div>
<section class="u-hero u-sc rv"><div class="u-hero-r">${ring(score, "o", 128)}</div><div class="u-hero-l"><span class="eb">Preparation Score</span><h2>${lvl}</h2><p class="mu sm">Progress ${ov}% ${acc != null ? "· Accuracy " + acc + "%" : "· PYQ solve કરો એટલે accuracy ઉમેરાશે"}</p></div></section>

<div class="u-card rv" style="margin-top:12px"><div class="u-ch"><b>${ic("cal", 17)} Exam Plan</b></div>
<label class="u-date-in"><span class="mu sm">Exam / target date</span><input type="date" value="${e(S.exam || "")}" onchange="setExam(this.value)"></label>
${
  dl != null && dl >= 0
    ? `<div class="u-m3 plan"><div><b>${dl}</b><span>દિવસ બાકી</span></div><div><b>${dl ? (remH / dl).toFixed(1) : "—"}h</b><span>Lecture / day</span></div><div><b>${dl ? Math.ceil(remQ / dl) : "—"}</b><span>PYQ / day</span></div></div>`
    : dl != null
    ? `<p class="mu sm" style="margin-top:10px">તારીખ નીકળી ગઈ છે — નવી તારીખ પસંદ કરો.</p>`
    : `<p class="mu sm" style="margin-top:10px">તારીખ ઉમેરો એટલે daily target આપમેળે ગણાશે.</p>`
}</div>

<div class="u-two stack rv" style="margin-top:12px">${sj
      .map(
        r => `<div class="u-card ${r.s}"><div class="u-ch"><b>${SUB[r.s]}</b><strong class="u-big">${r.p}%</strong></div>
<div class="u-bars"><div><span>Lectures</span>${bar2(r.fl)}<b>${r.fl}%</b></div><div><span>Notes</span>${bar2(r.fn)}<b>${r.fn}%</b></div><div><span>PYQ</span>${bar2(r.fp)}<b>${r.fp}%</b></div><div><span>Accuracy</span>${bar2(r.acc || 0, "ok")}<b>${r.acc != null ? r.acc + "%" : "—"}</b></div></div></div>`
      )
      .join("")}</div>

<div class="u-card rv" style="margin-top:12px"><div class="u-ch"><b>Topic-wise Accuracy</b><span class="mu sm">નબળાથી મજબૂત</span></div>${
      tried.length
        ? `<div class="u-acc">${tried
            .map(x => `<a href="#/t/${x.id}" class="${x.s}"><span>${IC[x.s][x.i - 1]} ${e(tn(x.id)[0])}</span><div class="ub ${x.acc >= 75 ? "ok" : x.acc >= 50 ? "wa" : "no"}"><i data-w="${x.acc}"></i></div><b>${x.acc}%</b></a>`)
            .join("")}</div>`
        : `<p class="mu sm u-empty">PYQ practice કે test આપ્યા પછી અહીં topic-wise accuracy દેખાશે.</p>`
    }</div>

<div class="u-two stack rv" style="margin-top:12px"><div class="u-card"><div class="u-ch"><b>Consistency</b><span class="mu sm">${act28} / 28 દિવસ active</span></div><div class="u-heat"><div class="u-hd"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div><div class="u-hg">${heat.join("")}</div></div></div>
<div class="u-card"><div class="u-ch"><b>Mistakes Center</b><span class="mu sm">${wrongTotal} ખોટા · ${marked} ★</span></div>${
      wrongTopics.length
        ? wrongTopics.map(x => `<a class="u-fa" href="#/p/${x.id}?bad"><span>${IC[x.s][x.i - 1]} ${e(tn(x.id)[0])}</span><b>${x.at - x.ok}</b></a>`).join("")
        : `<p class="mu sm u-empty">ખોટા જવાબો અહીં collect થશે — ત્યાંથી સીધા revise કરી શકશો.</p>`
    }</div></div>

<div class="u-card rv" style="margin-top:12px"><div class="u-ch"><b>Test History</b><span class="mu sm">છેલ્લા ${hist.length}</span></div>${
      hist.length
        ? hist
            .map(
              h =>
                `<a class="u-hi ${h.k[0]}" href="#/x/${h.k}"><div><b>${e(tn(h.k)[0])}</b><span class="mu sm">${new Date(h.t0).getDate()} ${MONTHS[new Date(h.t0).getMonth()]} · ${Math.floor(h.el / 60)}m</span></div><strong>${h.sc}<small>/${h.n}</small></strong></a>`
            )
            .join("")
        : `<p class="mu sm u-empty">CBT Test આપશો પછી history અહીં દેખાશે.</p>`
    }</div>`;
  }

  /* ================= keyboard + swipe ================= */
  addEventListener(
    "keydown",
    ev => {
      if (ev.key !== "Enter" || !CUR || !/^#\/p\//.test(location.hash) || /INPUT|TEXTAREA|SELECT|BUTTON|A/.test(ev.target.tagName)) return;
      const q = CUR.qs[PI];
      if (q && !(S.a[q.id] || {}).rv) {
        ev.stopImmediatePropagation();
        qrev(q.id);
      }
    },
    true
  );
  let sx = 0,
    sy = 0,
    st0 = 0;
  document.addEventListener(
    "touchstart",
    ev => {
      const t = ev.touches[0];
      sx = t.clientX;
      sy = t.clientY;
      st0 = Date.now();
    },
    { passive: true }
  );
  document.addEventListener(
    "touchend",
    ev => {
      if (!CUR || !/^#\/[px]\//.test(location.hash) || document.body.classList.contains("lock")) return;
      if (ev.target.closest && ev.target.closest(".sol,.vis,.tw,input,textarea,select,.chips")) return;
      const t = ev.changedTouches[0],
        dx = t.clientX - sx,
        dy = t.clientY - sy;
      if (Math.abs(dx) > 90 && Math.abs(dy) < 40 && Date.now() - st0 < 500) nav(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );
  addEventListener("keydown", ev => {
    if (ev.key === "Escape") {
      if ($("ush")) closeSheet();
      else if (PSH) palOpen(0);
    }
  });

  /* ---------- expose to inline handlers / other scripts ---------- */
  Object.assign(window, {
    R, dash, subj, topic, prac, exam, result, stats,
    submitT: usub, usub, dosub, qrev, setGoal, goalSheet, setExam, usearch,
    sheet, closeSheet, palOpen, ugq
  });
})();
