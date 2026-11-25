import './style.css';
import { art, kids } from './art.js';
import { SOURCE, SOURCE_URL, PASS, goals, intro, units, modules, infos, acts, flow, tests, finalTest, glossary } from './data.js';

const app = document.getElementById('app');
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem('egl_' + k)) ?? d; } catch { return d; } },
  set: (k, v) => localStorage.setItem('egl_' + k, JSON.stringify(v)),
  del: (k) => localStorage.removeItem('egl_' + k),
};
const S = { student: store.get('student', null), prog: store.get('prog', { pre: {}, post: {}, final: null }), view: 'login' };
const save = () => store.set('prog', S.prog);
const $ = (h) => { const d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstElementChild; };
const shuffle = (a) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const nm = () => S.student?.name || '';

/* ---------- sound ---------- */
let ac;
function tone(freqs, dur = 0.14, type = 'sine') {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f; o.connect(g); g.connect(ac.destination);
      const t = ac.currentTime + i * dur; g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur); o.start(t); o.stop(t + dur); });
  } catch { /* no audio */ }
}
const sfx = { ok: () => tone([523, 659, 784, 1046], 0.12), bad: () => tone([200, 160], 0.2, 'square'), click: () => tone([700], 0.05), win: () => tone([523, 659, 784, 1046, 784, 1046, 1318], 0.13) };
function speak(t) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'ar-SA'; u.rate = 0.9; speechSynthesis.speak(u); } catch { /* none */ } }

/* ---------- router ---------- */
function go(view) { S.view = view; try { speechSynthesis.cancel(); } catch { /* */ } render(); window.scrollTo(0, 0); }
const seq = (m) => [...flow[m].content, ...flow[m].acts];
const viewOf = (id) => (acts[id] ? 'act:' + id : 'info:' + id);

function render() {
  if (!S.student && S.view !== 'login') S.view = 'login';
  const [k, a] = S.view.split(':');
  ({ login, welcome, s1: opening, s2: guide, s3: generalGoals, s4: main, menu: () => menu(+a), pre: () => quiz(+a, 'pre'), obj: () => objectives(+a), info: () => info(a), act: () => activity(a), post: () => quiz(+a, 'post'), final: finalQuiz, result, help, exit: exitScreen })[k]();
}

/* ---------- shell ---------- */
const fx = '<div class="bg"><i>☁️</i><i>⭐</i><i>☁️</i><i>🌟</i><i>🎈</i><i>⭐</i></div>';
function shell({ n, title, color = '#1d8fc4', body, audio, nav = {}, home = true, charMood = 'smile', char = true }) {
  const navBtns = `${nav.prev ? '<button class="btn ghost" data-nav="prev">◀ السابق</button>' : '<span></span>'}
    <span class="mid">${home ? '<button class="btn small ghost" data-nav="home">🏠 الرئيسية</button>' : ''}</span>
    ${nav.next ? `<button class="btn" data-nav="next">${nav.nextLabel || 'التالي ▶'}</button>` : '<span></span>'}`;
  app.innerHTML = '';
  const el = $(`<main class="screen" style="--c:${color}">${fx}
    <header class="top"><div class="logo">🗺️ رحلة عبر مظاهر سطح مصر</div>
      <div class="who">${n ? `<span class="sn">شاشة ${n} / 46</span>` : ''}👦 ${nm()} <button class="btn small ghost" data-nav="exit">خروج</button></div></header>
    <div class="card big">${title ? `<h1 class="sechead">${title}</h1>` : ''}
      ${audio ? `<div class="say">${char ? `<div class="kid sm">${kids.scout(charMood)}</div>` : ''}<div class="bubble"><b>الكشّاف:</b> ${audio} <button class="btn small ghost" id="spk" title="استمع">🔊</button></div></div>` : ''}
      <div id="body">${body || ''}</div>
      ${(nav.prev || nav.next) ? `<div class="nav">${navBtns}</div>` : (home ? `<div class="nav"><span></span><span class="mid"><button class="btn small ghost" data-nav="home">🏠 الرئيسية</button></span><span></span></div>` : '')}
    </div><footer class="src">📖 ${SOURCE}<br><a href="${SOURCE_URL}" target="_blank" rel="noopener">رابط الكتاب الرسمي</a></footer></main>`);
  app.append(el);
  const q = (s) => el.querySelector(s);
  el.querySelectorAll('[data-nav]').forEach((b) => (b.onclick = () => { sfx.click(); const t = b.dataset.nav; t === 'home' ? go('s4') : t === 'exit' ? go('exit') : t === 'prev' ? nav.prev() : nav.next(); }));
  const sp = q('#spk'); if (sp) sp.onclick = () => speak(audio);
  return el;
}

/* ---------- login / welcome ---------- */
function login() {
  app.innerHTML = '';
  app.append($(`<main class="screen login">${fx}<div class="card center big">
    <div class="duo"><div class="kid">${kids.scout()}</div><div class="kid">${kids.nour()}</div></div>
    <h1>أهلاً بك في رحلتنا الكشفية! 🇪🇬</h1><p>الدراسات الاجتماعية · الصف الخامس الابتدائي<br>الدرس الثاني: مظاهر سطح مصر</p>
    <form id="f"><label>اكتب اسمك وسجل دخولك</label><input id="name" placeholder="اسم التلميذ / التلميذة" maxlength="30" autocomplete="off" required />
    <div class="pick"><label><input type="radio" name="g" value="b" checked> ولد 👦</label><label><input type="radio" name="g" value="g"> بنت 👧</label></div>
    <button class="btn" type="submit">دخول 🚀</button><div class="err" id="err"></div></form></div>
    <footer class="src">📖 ${SOURCE}</footer></main>`));
  const old = store.get('student', null); if (old) document.getElementById('name').value = old.name;
  document.getElementById('f').onsubmit = (e) => { e.preventDefault(); const name = document.getElementById('name').value.trim();
    if (name.length < 2) { document.getElementById('err').textContent = 'اكتب اسمك من فضلك'; return; }
    S.student = { name, g: new FormData(e.target).get('g') }; store.set('student', S.student); sfx.ok(); go('welcome'); };
}
function welcome() {
  shell({ title: `أهلاً يا ${nm()}! ${S.student.g === 'g' ? '👧' : '👦'}🎉`, color: '#e0579a', home: false, charMood: 'wow',
    audio: `أهلاً بك يا ${nm()}! أنا الكشّاف، وسأكون دليلك في رحلتنا عبر مظاهر سطح مصر.`,
    body: `<div class="center"><p class="lead">سنتعلم معاً أربعة موديولات، ونختبر أنفسنا قبل كل موديول وبعده، ثم نحصل على شهادتك!</p><button class="btn" id="go">يلا نبدأ ▶</button></div>` }).querySelector('#go').onclick = () => go('s1');
}

/* ---------- general screens 1-4 ---------- */
function opening() {
  const el = shell({ n: 1, title: 'رحلة عبر مظاهر سطح مصر .. من الدلتا إلى سيناء', color: '#e0579a', home: false, charMood: 'wow',
    audio: `أهلاً بك يا بطل! هيا نبدأ رحلتنا الكشفية لاكتشاف مظاهر سطح بلدنا مصر.`,
    body: `<div class="open"><div class="pic">${art.map()}</div><div class="center"><div class="kid big2 bob">${kids.scout('wow')}</div><p class="lead">مادة الدراسات الاجتماعية · الصف الخامس الابتدائي<br>أهلاً بك يا <b>${nm()}</b>!</p><button class="btn" id="go">ابدأ ▶</button></div></div>` });
  el.querySelector('#go').onclick = () => go('s2');
}
function guide() {
  shell({ n: 2, title: 'دليل الاستخدام', color: '#1d8fc4', audio: 'اقرأ التعليمات قبل البدء.', nav: { prev: () => go('s1'), next: () => go('s3') },
    body: `<p class="lead">عزيزي التلميذ، اتبع التعليمات:</p><ol class="steps2">
      <li>استخدم زر <b>التالي</b> و<b>السابق</b> للتنقل.</li><li>تعرف على <b>الأهداف</b>.</li><li>ابدأ بالاختبار <b>القبلي</b>.</li><li>أدِّ <b>الأنشطة</b>.</li><li>حل الاختبار <b>البعدي</b> وانتقل للموديول التالي إذا حصلت على ${PASS}% أو أكثر.</li></ol>
      <div class="icons"><span>🔊 استمع للتعليق</span><span>🏠 الرئيسية</span><span>◀ ▶ تنقل</span><span>✋ اسحب وأفلت</span></div>` });
}
function generalGoals() {
  shell({ n: 3, title: 'الأهداف العامة للدرس', color: '#2fa05a', audio: 'هذه هي الأهداف التي سنحققها معاً في رحلتنا.', nav: { prev: () => go('s2'), next: () => go('s4') },
    body: `<p class="lead">${intro}</p><p>في نهاية هذا الدرس، سأكون قادراً على أن:</p><ul class="goals">${goals.map((g) => `<li>${g}</li>`).join('')}</ul>` });
}
function main() {
  const done = (m) => S.prog.post[m] >= PASS;
  const allDone = [1, 2, 3, 4].every(done);
  shell({ n: 4, title: 'الشاشة الرئيسية', color: '#e0579a', home: false, audio: 'اختر الموديول الذي تريد البدء به.',
    body: `<div class="grid mods">${modules.map((m) => `<button class="mod" data-m="${m.id}" style="--c:${m.color}"><div class="pic">${art[m.art]()}</div><h3>${m.emoji} الموديول ${m.id}${done(m.id) ? ' ✅' : ''}</h3><p>${m.title}</p>${S.prog.post[m.id] != null ? `<small>نتيجتك: ${S.prog.post[m.id]}%</small>` : ''}</button>`).join('')}</div>
      <div class="row3"><button class="btn big3" id="fin">🏆 الاختبار النهائي${allDone ? '' : ' (أنهِ الموديولات أولاً)'}</button><button class="btn ghost big3" id="hp">❓ المساعدة والدعم</button></div>` })
    .querySelectorAll('.mod').forEach((b) => (b.onclick = () => { sfx.click(); go('menu:' + b.dataset.m); }));
  document.getElementById('fin').onclick = () => (allDone ? go('final') : (sfx.bad(), alert('أنهِ الاختبارات البعدية للموديولات الأربعة أولاً يا ' + nm())));
  document.getElementById('hp').onclick = () => go('help');
}

/* ---------- module menu & objectives ---------- */
function menu(m) {
  const M = modules[m - 1]; const n = [5, 25 - 0, 0, 0][0];
  const nums = { 1: 5, 2: 15, 3: 25, 4: 34 };
  shell({ n: nums[m], title: `الموديول ${m}: ${M.title}`, color: M.color, audio: 'اختر ما تريد البدء به. ابدأ بالاختبار القبلي لتعرف مستواك.', nav: { prev: () => go('s4') },
    body: `<div class="pic wide">${art[M.art]()}</div><div class="menu5">
      ${[['pre:' + m, '📝 الاختبار القبلي', S.prog.pre[m] != null ? S.prog.pre[m] + '%' : ''], ['obj:' + m, '🎯 الأهداف', ''], [viewOf(seq(m)[0]), '📖 المحتوى', ''], [viewOf(flow[m].acts[0]), '🎮 الأنشطة', ''], ['post:' + m, '🏁 الاختبار البعدي', S.prog.post[m] != null ? S.prog.post[m] + '%' : '']]
        .map(([v, t, s]) => `<button class="btn big3" data-v="${v}">${t} <small>${s}</small></button>`).join('')}</div>` })
    .querySelectorAll('[data-v]').forEach((b) => (b.onclick = () => go(b.dataset.v)));
}
function objectives(m) {
  const M = modules[m - 1]; const nums = { 1: 7, 2: 17, 3: 27, 4: 36 };
  shell({ n: nums[m], title: `أهداف الموديول ${m}`, color: M.color, audio: 'تعرف على ما ستتعلمه في هذا الموديول.', nav: { prev: () => go('menu:' + m), next: () => go(viewOf(seq(m)[0])) },
    body: `<p class="lead">في نهاية الموديول سأكون قادراً على:</p><ul class="goals">${M.goals.map((g) => `<li>${g.replace('أن يصف التلميذ', 'أن أصف').replace('أن ', 'أن ')}</li>`).join('')}</ul>` });
}

/* ---------- info screens ---------- */
function cardsHtml(cs, color) { return `<div class="grid">${(cs || []).map((c) => `<article class="pc" style="--c:${color}"><div class="pic">${art[c.art]()}</div><h3>${c.t}</h3><p>${c.d}</p></article>`).join('')}</div>`; }
function info(id) {
  const I = infos[id]; const M = modules[I.m - 1]; const s = seq(I.m); const i = s.indexOf(id);
  const prev = () => (i === 0 ? go('obj:' + I.m) : go(viewOf(s[i - 1])));
  const next = () => (i === s.length - 1 ? go('post:' + I.m) : go(viewOf(s[i + 1])));
  let extra = '';
  const t = I.type;
  if (t === 'units') extra = `<div class="art-row"><div class="pic">${art.map()}</div><div class="unitbtns">${units.map((u) => `<button class="ubtn" data-u="${u.n - 1}" style="--c:${u.color}"><span class="n">${u.n}</span> انقر لتعرف الاسم</button>`).join('')}<div class="reveal" id="rev">👆 اختر وحدة</div></div></div>`;
  else if (t === 'delta') extra = `<div class="pic anim"><div class="sed">${'<i></i>'.repeat(14)}</div>${art.delta()}</div><div class="center"><button class="btn" id="rep">🔄 أعد التشغيل</button></div>`;
  else if (t === 'read') extra = `<div class="art-row"><div class="pic">${art.fayoum()}</div><div><textarea id="ans" placeholder="اكتب إجابتك هنا"></textarea><button class="btn small" id="shw">أرني الإجابة</button><div class="reveal" id="rev" hidden>✅ ${I.answer}</div></div></div><div class="fact"><div class="pic">${art[I.factArt]()}</div><p>💡 ${I.fact}</p></div>`;
  else if (t === 'highlight') extra = `<div class="pic pulse">${art.map()}</div>`;
  else if (t === 'wind') extra = `<div class="pic anim"><div class="windl"><i></i><i></i><i></i></div>${art.dunes()}</div><div class="center"><button class="btn" id="rep">💨 هبّت الرياح</button></div>`;
  else if (t === 'flood') extra = `<div class="pic anim"><div class="flood" id="fl"></div>${art.dryValley()}</div><div class="center"><button class="btn" id="rep">🌧️ شغّل السيل</button></div><div class="fact"><p>🌱 ${I.value}</p></div>`;
  else if (t === 'sinai') extra = `<div class="art-row"><div class="pic">${art.mapSinai()}</div><div><div class="unitbtns">${['الشمال', 'الوسط', 'الجنوب'].map((x, k) => `<button class="ubtn" data-k="${k}" style="--c:${['#2fa05a', '#d99a1f', '#8e5bc9'][k]}">${x}</button>`).join('')}</div><div id="rev" class="reveal">👆 اختر جزءاً</div></div></div>`;
  else if (t === 'inner') extra = `<div class="grid"><article class="pc" style="--c:${M.color}"><div class="pic" id="f1">${art.folds()}</div><h3>الالتواءات</h3><p>ضغط جانبي يلوي الطبقات.</p><button class="btn small" data-sim="f1">▶ تشغيل</button></article>
    <article class="pc" style="--c:${M.color}"><div class="pic" id="f2">${art.faults()}</div><h3>الانكسارات</h3><p>ارتفاع وانخفاض الكتل الصخرية.</p><button class="btn small" data-sim="f2">▶ تشغيل</button></article></div>`;
  else if (t === 'outer') extra = `<div class="grid"><article class="pc" style="--c:${M.color}"><div class="pic anim"><div class="windl"><i></i><i></i><i></i></div>${art.wind()}</div><h3>الرياح</h3><p>التعرية بفعل الرياح شكلت الكثبان الرملية.</p></article>
    <article class="pc" style="--c:${M.color}"><div class="pic">${art.water()}</div><h3>المياه</h3><p>التعرية المائية شكلت وادي النيل والأودية الجافة.</p></article></div>`;
  else if (t === 'effect') extra = `<div class="grid seq">${I.cards.map((c, k) => `<article class="pc pop" style="--c:${M.color};animation-delay:${k * 0.8}s"><div class="pic">${art[c.art]()}</div><h3>${c.t}</h3><p>${c.d}</p></article>`).join('')}</div>`;
  else if (t === 'reflect') extra = `<div class="art-row"><div class="pic slides">${I.gallery.map((g, k) => `<div class="sl" style="animation-delay:${k * 3}s">${art[g]()}</div>`).join('')}</div><div><textarea id="ans" placeholder="اكتب فقرة عن جمال مظاهر السطح وعبّر عن تقديرك لعظمة الله..."></textarea><button class="btn small" id="shw">إرسال</button><div class="reveal" id="rev" hidden>🌟 أحسنت يا ${nm()}! سبحان الله على جمال وتنوع بلدنا.</div></div></div>`;
  else extra = cardsHtml(I.cards, M.color);
  const el = shell({ n: I.n, title: I.title, color: M.color, audio: I.audio, nav: { prev, next }, body: `<p class="lead">${I.text}</p>${extra}` });
  el.querySelectorAll('.pc').forEach((c) => (c.onclick = () => { sfx.click(); c.classList.toggle('on'); }));
  el.querySelectorAll('[data-u]').forEach((b) => (b.onclick = () => { const u = units[+b.dataset.u]; sfx.ok(); const r = el.querySelector('#rev'); r.style.setProperty('--c', u.color); r.innerHTML = `<b>${u.name}</b><br>${u.note}`; }));
  el.querySelectorAll('[data-k]').forEach((b) => (b.onclick = () => { const k = +b.dataset.k; const c = [{ t: 'الشمال', a: 'sinaiNorth', d: 'يتميز بوجود السهول الساحلية وبعض الجبال مثل جبل الحلال.' }, { t: 'الوسط', a: 'sinaiMid', d: 'تنتشر فيه الهضاب مثل هضبة التيه، ويقطعها بعض الأودية الجافة، منها وادي العريش.' }, { t: 'الجنوب', a: 'sinaiSouth', d: 'يتميز بالجبال الوعرة، مثل جبل سانت كاترين وجبل موسى.' }][k]; sfx.ok();
    el.querySelector('#rev').innerHTML = `<div class="pic">${art[c.a]()}</div><b>${c.t}:</b> ${c.d}`; }));
  const rep = el.querySelector('#rep'); if (rep) rep.onclick = () => { const p = rep.closest('#body').querySelector('.anim'); p.classList.remove('go'); void p.offsetWidth; p.classList.add('go'); if (t === 'flood') { const f = el.querySelector('#fl'); f.classList.remove('rise'); void f.offsetWidth; f.classList.add('rise'); } sfx.click(); };
  if (rep) rep.click();
  const shw = el.querySelector('#shw'); if (shw) shw.onclick = () => { el.querySelector('#rev').hidden = false; sfx.ok(); };
  el.querySelectorAll('[data-sim]').forEach((b) => (b.onclick = () => { const p = el.querySelector('#' + b.dataset.sim); p.classList.remove('sim'); void p.offsetWidth; p.classList.add('sim'); sfx.click(); }));
}

/* ---------- drag/tap bins ---------- */
function bins(def, host) {
  const items = shuffle(def.items.map((x, i) => ({ ...x, id: i })));
  const place = {}; let sel = null;
  const tableHtml = def.table
    ? `<div class="tbl"><div class="th"></div>${def.cols.map((c) => `<div class="th">${c}</div>`).join('')}${def.rows.map((r, ri) => `<div class="th">${r}</div>${def.cols.map((_, ci) => `<div class="bin" data-b="r${ri}c${ci}"><div class="in"></div></div>`).join('')}`).join('')}</div>`
    : `<div class="binsg" style="--n:${def.bins.length}">${def.bins.map((b) => `<div class="bin" data-b="${b.id}">${b.art ? `<div class="pic sm">${art[b.art]()}</div>` : ''}<b>${b.label}</b><div class="in"></div></div>`).join('')}</div>`;
  host.innerHTML = `${def.art ? `<div class="pic wide">${art[def.art]()}</div>` : ''}${tableHtml}<div class="pool" id="pool"></div>`;
  const pool = host.querySelector('#pool');
  const draw = () => {
    pool.innerHTML = ''; host.querySelectorAll('.bin .in').forEach((x) => (x.innerHTML = ''));
    items.forEach((it) => { const c = $(`<span class="chip ${sel === it.id ? 'sel' : ''} ${it.mark || ''}" draggable="true">${it.t}</span>`);
      c.onclick = (e) => { e.stopPropagation(); if (place[it.id]) { delete place[it.id]; it.mark = ''; sel = null; } else sel = sel === it.id ? null : it.id; sfx.click(); draw(); };
      c.ondragstart = (e) => { e.dataTransfer.setData('text', it.id); sel = it.id; };
      (place[it.id] ? host.querySelector(`[data-b="${place[it.id]}"] .in`) : pool).append(c); });
  };
  host.querySelectorAll('.bin').forEach((b) => { const drop = () => { if (sel == null) return; place[sel] = b.dataset.b; items.find((x) => x.id === sel).mark = ''; sel = null; sfx.click(); draw(); };
    b.onclick = drop; b.ondragover = (e) => e.preventDefault(); b.ondrop = (e) => { e.preventDefault(); const id = e.dataTransfer.getData('text'); if (id !== '') sel = +id; drop(); }; });
  draw();
  return {
    check() { let ok = 0; items.forEach((it) => { if (!place[it.id]) { it.mark = 'wrong'; return; } it.mark = place[it.id] === it.bin ? 'right' : 'wrong'; if (it.mark === 'right') ok++; }); draw(); return { ok, total: items.length }; },
    reset() { items.forEach((it) => { it.mark = ''; delete place[it.id]; }); sel = null; draw(); },
    placedAll: () => items.every((it) => place[it.id]),
  };
}

function activity(id) {
  const A = acts[id]; const M = modules[A.m - 1];
  if (!A.bins) return info(id);
  const s = seq(A.m); const i = s.indexOf(id);
  const prev = () => (i === 0 ? go('obj:' + A.m) : go(viewOf(s[i - 1])));
  const next = () => (i === s.length - 1 ? go('post:' + A.m) : go(viewOf(s[i + 1])));
  const el = shell({ n: A.n, title: A.title, color: M.color, audio: A.audio, nav: { prev, next },
    body: `<p class="lead">${A.text}</p><div id="act"></div><div class="center"><button class="btn" id="chk">تحقق ✔</button> <button class="btn ghost" id="rst">إعادة 🔁</button><div class="fb" id="fb"></div></div>` });
  const b = bins(A, el.querySelector('#act'));
  el.querySelector('#chk').onclick = () => { const r = b.check(); const fb = el.querySelector('#fb');
    if (r.ok === r.total) { sfx.ok(); fb.innerHTML = `<span class="good">🎉 أحسنت يا ${nm()}! كل الإجابات صحيحة.</span>`; } else { sfx.bad(); fb.innerHTML = `<span class="bad">${r.ok} من ${r.total} صحيحة. المحاولة مرة أخرى: انقر على البطاقة الحمراء لإعادتها.</span>`; } };
  el.querySelector('#rst').onclick = () => { b.reset(); el.querySelector('#fb').innerHTML = ''; };
}

/* ---------- quizzes ---------- */
function runQuestions(list, { title, color, n, onDone, back }) {
  const qs = list.map((q) => (q.type === 'mc' ? { ...q, opts: shuffle(q.o.map((t, i) => ({ t, ok: i === 0 }))) } : q.type === 'tf' ? { ...q, opts: [{ t: 'صح ✅', ok: q.a }, { t: 'خطأ ❌', ok: !q.a }] } : q));
  let i = 0, score = 0;
  const show = () => {
    const q = qs[i]; let picked = null; let api = null;
    const head = `<div class="prog"><div style="width:${(i / qs.length) * 100}%"></div></div><div class="qhead">رقم السؤال: ${i + 1} من ${qs.length}</div>`;
    const inner = q.type === 'bins' ? `<h2>${q.q}</h2><div id="act"></div>` : q.type === 'essay' ? `<h2>${q.q}</h2><textarea id="ess" placeholder="اكتب إجابتك هنا (جملتان على الأقل)"></textarea><div class="reveal" id="mod" hidden>✅ نموذج إجابة: ${q.model}</div>`
      : `<h2>${q.q}</h2><div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${o.t}</button>`).join('')}</div>`;
    const el = shell({ n, title, color, home: true, charMood: 'smile', audio: 'اقرأ السؤال جيداً ثم اختر الإجابة الصحيحة.', body: `${head}${inner}<div class="center"><button class="btn" id="send" disabled>إرسال ✔</button><div class="fb" id="fb"></div></div>` });
    const send = el.querySelector('#send'); const fb = el.querySelector('#fb');
    if (q.type === 'bins') { api = bins(q, el.querySelector('#act')); send.disabled = false; }
    else if (q.type === 'essay') { const t = el.querySelector('#ess'); t.oninput = () => (send.disabled = t.value.trim().length < 15); }
    else el.querySelectorAll('.opt').forEach((b) => (b.onclick = () => { el.querySelectorAll('.opt').forEach((x) => x.classList.remove('pick')); b.classList.add('pick'); picked = +b.dataset.k; send.disabled = false; sfx.click(); }));
    send.onclick = () => {
      let ok = false;
      if (q.type === 'bins') { const r = api.check(); ok = r.ok === r.total; }
      else if (q.type === 'essay') { ok = true; el.querySelector('#mod').hidden = false; }
      else { ok = q.opts[picked].ok; el.querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (q.opts[+x.dataset.k].ok) x.classList.add('right'); }); if (!ok) el.querySelector(`.opt[data-k="${picked}"]`).classList.add('wrong'); }
      if (ok) { score++; sfx.ok(); } else sfx.bad();
      fb.innerHTML = (ok ? `<span class="good">👏 ${q.type === 'essay' ? 'شكراً على إجابتك!' : 'أحسنت!'}</span>` : '<span class="bad">💪 ليست الإجابة الصحيحة، الإجابة الصحيحة باللون الأخضر.</span>') + `<br><button class="btn" id="n">${i + 1 < qs.length ? 'السؤال التالي ▶' : 'عرض النتيجة ✅'}</button>`;
      send.hidden = true;
      el.querySelector('#n').onclick = () => { i++; i < qs.length ? show() : onDone(Math.round((score / qs.length) * 100), score, qs.length); };
    };
  };
  show();
}
function quiz(m, kind) {
  const M = modules[m - 1]; const pre = kind === 'pre';
  const nums = { pre: { 1: 6, 2: 16, 3: 26, 4: 35 }, post: { 1: 14, 2: 24, 3: 33, 4: 42 } };
  const list = shuffle(tests[m][kind]);
  runQuestions(list, { title: `${pre ? 'الاختبار القبلي' : 'الاختبار البعدي'} – الموديول ${m}`, color: M.color, n: nums[kind][m],
    onDone: (pct, sc, tot) => {
      S.prog[kind][m] = pct; save(); sfx.win();
      const pass = pct >= PASS;
      const msg = pre ? (pass ? 'مستواك ممتاز! يمكنك الانتقال للموديول التالي أو مراجعة المحتوى.' : 'لا بأس! لنتعرف على الأهداف ونتعلم معاً.') : (pass ? 'أحسنت! أتقنت الموديول.' : 'لم تصل إلى 80%، لنراجع الدراسة ونحاول مرة أخرى.');
      const target = pre ? (pass ? (m < 4 ? 'menu:' + (m + 1) : 's4') : 'obj:' + m) : (pass ? (m < 4 ? 'menu:' + (m + 1) : 's4') : 'obj:' + m);
      const label = pre ? (pass ? (m < 4 ? 'الموديول التالي ▶' : 'الرئيسية') : 'الأهداف ▶') : (pass ? (m < 4 ? 'الموديول التالي ▶' : 'الرئيسية') : 'إعادة الدراسة 🔁');
      shell({ title: `نتيجتك: ${pct}% (${sc} من ${tot})`, color: M.color, charMood: 'wow', audio: msg, body: `<div class="center"><div class="stars">${pass ? '⭐⭐⭐' : '⭐'}</div><p class="lead">${msg}</p><button class="btn" id="go">${label}</button> <button class="btn ghost" id="mn">قائمة الموديول</button></div>` });
      document.getElementById('go').onclick = () => go(target); document.getElementById('mn').onclick = () => go('menu:' + m);
    } });
}
function finalQuiz() {
  runQuestions(finalTest, { title: 'الاختبار النهائي الشامل', color: '#e0579a', n: 43, onDone: (pct) => { S.prog.final = pct; save(); sfx.win(); go('result'); } });
}

/* ---------- result, help, exit ---------- */
function result() {
  const f = S.prog.final ?? 0; const pass = f >= PASS; const stars = f >= 90 ? 3 : f >= PASS ? 2 : 1;
  const weak = modules.filter((m) => (S.prog.post[m.id] ?? 0) < PASS);
  shell({ n: 44, title: '🎓 النتيجة والتغذية الراجعة', color: '#e0579a', charMood: 'wow', audio: pass ? 'أحسنت! لقد أتممت رحلتك عبر مظاهر سطح مصر.' : 'راجع الموديول المطلوب ثم حاول مرة أخرى.',
    body: `<div class="center cert"><p class="cname">${nm()}</p><p>أنهى الدرس الإلكتروني «مظاهر سطح مصر»</p><div class="stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
      <div class="scores"><div><b>${f}%</b><span>الاختبار النهائي</span></div>${modules.map((m) => `<div><b>${S.prog.pre[m.id] ?? '-'}% ← ${S.prog.post[m.id] ?? '-'}%</b><span>الموديول ${m.id} (قبلي ← بعدي)</span></div>`).join('')}</div>
      <p class="lead">${pass ? `أحسنت يا ${nm()}، لقد أتقنت الدرس!` : `نتيجتك أقل من ${PASS}%. راجع: ${(weak.length ? weak : modules).map((m) => 'الموديول ' + m.id).join('، ')}.`}</p>
      <button class="btn" id="rv">مراجعة 🔁</button> <button class="btn ghost" id="pr">طباعة الشهادة 🖨️</button> <button class="btn ghost" id="hm">الرئيسية</button></div>` });
  document.getElementById('rv').onclick = () => go('s4'); document.getElementById('hm').onclick = () => go('s4'); document.getElementById('pr').onclick = () => window.print();
}
function help() {
  const el = shell({ n: 45, title: 'المساعدة والدعم', color: '#1d8fc4', audio: 'إذا احتجت إلى مساعدة فنحن هنا.', nav: { prev: () => go('s4') },
    body: `<div class="grid"><article class="pc on" style="--c:#1d8fc4"><h3>📘 دليل الاستخدام</h3><ol class="steps2"><li>استخدم التالي والسابق.</li><li>ابدأ بالاختبار القبلي.</li><li>اسحب وأفلت (أو انقر على البطاقة ثم على مكانها).</li><li>انتقل بعد ${PASS}% في الاختبار البعدي.</li></ol></article>
      <article class="pc on" style="--c:#2fa05a"><h3>📖 قاموس المصطلحات</h3><dl>${glossary.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl></article>
      <article class="pc on" style="--c:#e0579a"><h3>✉️ تواصل معنا</h3><textarea id="msg" placeholder="اكتب رسالتك للمعلم هنا"></textarea><button class="btn small" id="snd">إرسال</button><div class="reveal" id="rev" hidden>تم حفظ رسالتك على هذا الجهاز. (نموذج تجريبي: لا يوجد خادم لإرسالها للمعلم.)</div></article></div>` });
  el.querySelector('#snd').onclick = () => { el.querySelector('#rev').hidden = false; sfx.ok(); };
}
function exitScreen() {
  shell({ n: 46, title: 'شكراً لك يا بطل! 👋', color: '#e0579a', home: false, charMood: 'wow', audio: `شكراً لك يا ${nm()}! نراك في رحلة جديدة.`,
    body: `<div class="center"><div class="kid big2 wave">${kids.scout('wow')}</div><p class="lead">شكراً لك! نراك في رحلة جديدة.</p><button class="btn" id="x">خروج 🚪</button> <button class="btn ghost" id="b">عودة للدرس</button></div>` });
  document.getElementById('x').onclick = () => { store.del('student'); S.student = null; S.prog = { pre: {}, post: {}, final: null }; store.del('prog'); go('login'); };
  document.getElementById('b').onclick = () => go('s4');
}

const dv = new URLSearchParams(location.search).get('v');
if (dv) { S.student = { name: 'سلمى', g: 'g' }; S.prog = { pre: { 1: 67, 2: 83 }, post: { 1: 100, 2: 83 }, final: 90 }; S.view = dv; }
render();
