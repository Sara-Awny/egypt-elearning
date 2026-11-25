// Hand-drawn SVG pictures for every item in the lesson (original artwork).
const W = 400, H = 240;
const wrap = (body, sky = ['#8fd8ff', '#e6f8ff']) =>
  `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice">
  <defs><linearGradient id="sk${sky[0].slice(1)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#sk${sky[0].slice(1)})"/>${body}</svg>`;

const sun = (x = 330, y = 50, r = 28) =>
  `<g><circle cx="${x}" cy="${y}" r="${r + 10}" fill="#fff3a0" opacity=".5"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ffd93b"/>
  <circle cx="${x - 9}" cy="${y - 4}" r="3" fill="#7a4b00"/><circle cx="${x + 9}" cy="${y - 4}" r="3" fill="#7a4b00"/>
  <path d="M${x - 9} ${y + 8} q9 8 18 0" stroke="#7a4b00" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`;
const cloud = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="0" rx="26" ry="13"/><ellipse cx="20" cy="-8" rx="20" ry="14"/><ellipse cx="-18" cy="-6" rx="16" ry="11"/></g>`;
const palm = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 q4 -30 -2 -58" stroke="#8a5a2b" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g fill="#2fb44e"><path d="M-2 -58 q-30 -6 -44 14 q26 -10 44 -6z"/><path d="M-2 -58 q30 -6 44 14 q-26 -10 -44 -6z"/><path d="M-2 -58 q-18 -26 -38 -22 q24 4 38 22z"/><path d="M-2 -58 q18 -26 38 -22 q-24 4 -38 22z"/><path d="M-2 -58 q0 -26 6 -34 q2 20 -6 34z"/></g>
  <circle cx="-4" cy="-56" r="4" fill="#b5651d"/><circle cx="3" cy="-55" r="4" fill="#b5651d"/></g>`;
const tag = (t, x, y, c = '#ff5c8a') =>
  `<g><rect x="${x - t.length * 6.5 - 10}" y="${y - 16}" width="${t.length * 13 + 20}" height="26" rx="13" fill="${c}"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="Cairo,Tahoma,sans-serif">${t}</text></g>`;
const sandBg = '#f6cf7a';

export const art = {
  nile: () => wrap(`${sun()}${cloud(80, 50)}${cloud(200, 34, .8)}
    <rect y="150" width="400" height="90" fill="#8ad65c"/><rect y="150" width="400" height="10" fill="#6cc04a"/>
    <path d="M-10 190 C100 150 200 230 410 175 L410 215 C220 270 100 190 -10 235Z" fill="#2c9be6"/>
    <path d="M30 205 q40 -18 80 -2" stroke="#a9e0ff" stroke-width="3" fill="none"/>
    <g transform="translate(250 188)"><path d="M-30 0 h60 l-10 14 h-40z" fill="#c8793a"/><path d="M0 0 v-42 l26 36z" fill="#fff"/><path d="M-2 0 v-30 l-18 28z" fill="#ffe9a8"/></g>
    ${palm(40, 165)}${palm(350, 160, .8)}${palm(75, 160, .6)}`),

  delta: () => wrap(`<rect y="0" width="400" height="95" fill="#37a6e8"/>
    <path d="M0 40 q50 -14 100 0 t100 0 t100 0 t100 0" stroke="#bfe8ff" stroke-width="3" fill="none"/>
    <path d="M200 90 L40 215 Q200 238 360 215 Z" fill="#7fd24f" stroke="#4ea72f" stroke-width="3"/>
    <g stroke="#2c9be6" stroke-width="6" fill="none" stroke-linecap="round"><path d="M200 240 V150 L110 92"/><path d="M200 150 L290 92"/></g>
    <g fill="#5dbb3a"><rect x="130" y="170" width="30" height="20" rx="4"/><rect x="235" y="172" width="34" height="20" rx="4"/><rect x="170" y="200" width="30" height="16" rx="4"/><rect x="215" y="205" width="30" height="14" rx="4"/></g>
    ${tag('فرع رشيد', 105, 80, '#1d7fc4')}${tag('فرع دمياط', 295, 80, '#1d7fc4')}${tag('الدلتا ▲ مثلث', 200, 130, '#e0579a')}`, ['#bfe8ff', '#e6f8ff']),

  valley: () => wrap(`${sun(70, 45, 24)}${cloud(220, 45)}
    <rect y="120" width="400" height="120" fill="#f2cf80"/>
    <path d="M0 120 q100 -20 200 -2 t200 2 V160 H0Z" fill="#e5b45e"/>
    <rect x="0" y="150" width="150" height="90" fill="#7fd24f"/><rect x="250" y="150" width="150" height="90" fill="#7fd24f"/>
    <path d="M140 150 Q200 170 260 150 L290 240 H110Z" fill="#2c9be6"/><path d="M200 165 V240" stroke="#bfe8ff" stroke-width="3" stroke-dasharray="8 8"/>
    ${palm(60, 200, .9)}${palm(345, 205, .9)}${palm(100, 215, .6)}
    ${tag('وادي النيل', 200, 135, '#1d7fc4')}`),

  fayoum: () => wrap(`${sun(60, 45, 24)}
    <rect y="110" width="400" height="130" fill="${sandBg}"/>
    <ellipse cx="230" cy="175" rx="140" ry="55" fill="#7fd24f"/><ellipse cx="260" cy="180" rx="60" ry="26" fill="#2c9be6"/>
    <path d="M0 215 H200 L215 185" stroke="#2c9be6" stroke-width="7" fill="none" stroke-linejoin="round"/>
    ${palm(150, 185, .7)}${palm(350, 190, .7)}${palm(110, 172, .5)}
    ${tag('ترعة بحر يوسف', 90, 232, '#1d7fc4')}${tag('منخفض الفيوم', 230, 100, '#2fa05a')}`),

  plateau: () => wrap(`${sun()}${cloud(90, 45)}
    <rect y="170" width="400" height="70" fill="${sandBg}"/>
    <path d="M40 170 L70 100 H330 L365 170Z" fill="#d9964a"/><path d="M70 100 H330 l-4 14 H74z" fill="#f2b869"/>
    <path d="M90 130 H310 M80 150 H325" stroke="#b8742c" stroke-width="4" opacity=".6"/>
    ${tag('هضبة: أرض مرتفعة سطحها مستوٍ', 200, 205, '#d9702c')}`),

  mountain: () => wrap(`${sun(60, 45, 22)}${cloud(300, 40, .9)}
    <rect y="190" width="400" height="50" fill="#9a8a78"/>
    <path d="M20 200 L130 50 L240 200Z" fill="#8a6b99"/><path d="M130 50 l-30 40 l18 -8 l12 14 l14 -14 l18 8z" fill="#fff"/>
    <path d="M170 200 L280 70 L390 200Z" fill="#6e5a85"/><path d="M280 70 l-24 32 l14 -6 l10 11 l12 -11 l14 6z" fill="#fff"/>
    ${tag('الجبال: قمم عالية', 200, 218, '#7b4fa8')}`),

  dunes: () => wrap(`${sun(330, 45, 26)}
    <path d="M0 140 Q80 80 170 140 T400 120 V240 H0Z" fill="#f5c260"/>
    <path d="M0 185 Q110 120 220 190 T400 170 V240 H0Z" fill="#eaa93d"/>
    <path d="M0 140 Q80 80 170 140" stroke="#fde6a8" stroke-width="4" fill="none"/>
    <g stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".85"><path d="M30 60 q40 -14 80 0"/><path d="M80 80 q40 -14 80 0"/><path d="M200 55 q40 -14 80 0"/></g>
    ${tag('كثبان رملية (الرياح)', 200, 228, '#d9702c')}`),

  depressionLife: () => wrap(`${sun(60, 45, 22)}
    <path d="M0 120 L120 120 Q200 215 280 120 H400 V240 H0Z" fill="${sandBg}"/>
    <ellipse cx="200" cy="200" rx="68" ry="20" fill="#7fd24f"/><ellipse cx="200" cy="203" rx="28" ry="8" fill="#2c9be6"/>
    ${palm(165, 205, .6)}${palm(235, 205, .6)}${palm(200, 195, .5)}
    <g transform="translate(95 118)"><rect x="-10" y="-14" width="20" height="14" fill="#e07a5f"/><path d="M-13 -14 L0 -26 L13 -14z" fill="#9d4b3a"/></g>
    ${tag('سيوة: مياه جوفية وسكان', 200, 228, '#2fa05a')}`),

  depressionEmpty: () => wrap(`${sun(60, 45, 22)}
    <path d="M0 110 L90 110 Q200 235 310 110 H400 V240 H0Z" fill="#e8bb66"/>
    <path d="M110 170 q90 40 180 0" stroke="#d29a3c" stroke-width="4" fill="none"/>
    <g fill="#b78935"><circle cx="150" cy="195" r="5"/><circle cx="240" cy="200" r="4"/><circle cx="200" cy="180" r="3"/></g>
    <text x="200" y="150" text-anchor="middle" font-size="26">🏜️</text>
    ${tag('القطارة: نادر السكان', 200, 228, '#c25e2b')}`),

  dryValley: () => wrap(`${cloud(300, 40)}
    <path d="M0 110 Q100 90 200 110 T400 100 V240 H0Z" fill="#e1a85a"/>
    <path d="M0 120 L130 120 Q200 135 200 160 L200 240 H260 L270 160 Q290 125 400 120 V240" fill="none"/>
    <path d="M150 240 Q170 190 150 150 Q200 125 250 150 Q230 190 250 240Z" fill="#c98c42"/>
    <path d="M165 240 Q185 190 170 160 Q200 145 230 160 Q215 190 235 240Z" fill="#b5762f"/>
    <g stroke="#7a4f1c" stroke-width="2" fill="none" opacity=".7"><path d="M185 170 l8 8 l-6 8 l9 8"/><path d="M205 190 l-8 8 l7 8"/></g>
    <g stroke="#3a8fd9" stroke-width="4" stroke-linecap="round"><path d="M290 62 l-4 14"/><path d="M304 62 l-4 14"/><path d="M318 62 l-4 14"/></g>
    ${tag('وادٍ جاف (مثل وادي قنا)', 200, 224, '#8a5a2b')}`),

  redsea: () => wrap(`${sun(330, 45, 24)}
    <rect y="170" width="400" height="70" fill="#1fa0d8"/><path d="M0 190 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="#aee6ff" stroke-width="3" fill="none"/>
    <path d="M-10 175 L70 80 L110 120 L170 40 L240 130 L290 90 L350 175Z" fill="#c8693f"/>
    <path d="M170 40 l-22 26 l14 -4 l8 10 l10 -10 l12 6z" fill="#ffe0c2"/>
    ${tag('أعلى قمة: جبل شايب البنات', 200, 215, '#c8452f')}`),

  resources: () => wrap(`${sun(340, 40, 22)}
    <rect y="170" width="400" height="70" fill="${sandBg}"/>
    <g transform="translate(60 150)"><rect x="0" y="12" width="46" height="16" fill="#ffd23b" stroke="#c99a00" stroke-width="3"/><rect x="10" y="-4" width="46" height="16" fill="#ffe16b" stroke="#c99a00" stroke-width="3"/><rect x="24" y="12" width="46" height="16" fill="#ffd23b" stroke="#c99a00" stroke-width="3"/></g>
    <g transform="translate(260 175)" stroke="#444" stroke-width="5" fill="none" stroke-linecap="round"><path d="M-30 0 L0 -90 L30 0"/><path d="M-20 -30 H20 M-10 -60 H10"/><path d="M0 -90 V-100"/></g>
    <path d="M300 175 q10 -20 20 0 q-10 6 -20 0" fill="#222"/>
    <text x="95" y="130" font-size="22" font-weight="800" text-anchor="middle" fill="#a67900" font-family="Cairo,Tahoma">ذهب</text>
    <text x="270" y="60" font-size="20" font-weight="800" text-anchor="middle" fill="#333" font-family="Cairo,Tahoma">بترول وغاز</text>
    ${tag('ثروات الصحراء الشرقية', 200, 225, '#c8452f')}`),

  sinaiSouth: () => wrap(`${sun(60, 45, 22)}
    <rect y="200" width="400" height="40" fill="#a78e75"/>
    <path d="M10 210 L120 70 L215 210Z" fill="#9b6b6b"/><path d="M150 210 L270 40 L390 210Z" fill="#7d5252"/>
    <path d="M270 40 l-20 26 l12 -5 l8 10 l10 -10 l10 5z" fill="#fff"/>
    <g transform="translate(110 205)"><rect x="-14" y="-18" width="28" height="18" fill="#f4e4c1"/><path d="M-17 -18 l17 -14 l17 14z" fill="#b5651d"/></g>
    ${tag('الجنوب: جبال وعرة', 200, 228, '#7b4a4a')}`),

  sinaiMid: () => wrap(`${sun(330, 45, 24)}
    <rect y="140" width="400" height="100" fill="#e9c27a"/>
    <path d="M0 140 H400 L390 100 H150 L120 140Z" fill="#d79b52"/>
    <path d="M200 240 Q215 195 190 160 H260 Q240 195 260 240Z" fill="#b5762f"/>
    ${tag('هضبة التيه + وادي العريش الجاف', 200, 225, '#c26a2b')}`),

  sinaiNorth: () => wrap(`${sun(60, 45, 24)}${cloud(280, 40)}
    <rect y="90" width="400" height="60" fill="#1fa0d8"/><path d="M0 110 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="#aee6ff" stroke-width="3" fill="none"/>
    <path d="M0 150 Q200 125 400 150 V240 H0Z" fill="#f8de9a"/>
    <path d="M270 160 L330 110 L390 160Z" fill="#a39682"/>
    ${palm(100, 190, .8)}${palm(160, 200, .6)}
    ${tag('الشمال: سهول ساحلية وجبل الحلال', 200, 226, '#1d8fb0')}`),

  folds: () => wrap(`
    <g fill="none" stroke-width="22" stroke-linecap="round"><path d="M20 190 Q110 90 200 190 T380 190" stroke="#e8794a"/><path d="M20 160 Q110 60 200 160 T380 160" stroke="#f2c14e"/><path d="M20 130 Q110 30 200 130 T380 130" stroke="#6bc46b"/></g>
    <g stroke="#333" stroke-width="5" stroke-linecap="round" fill="#333"><path d="M8 220 H55 M45 212 l10 8 l-10 8"/><path d="M392 220 H345 M355 212 l-10 8 l10 8"/></g>
    ${tag('الالتواءات: ضغط جانبي', 200, 232, '#7b4fa8')}`, ['#ffe9c9', '#fff4e0']),

  faults: () => wrap(`
    <g stroke="#333" stroke-width="3"><rect x="30" y="80" width="150" height="60" fill="#6bc46b"/><rect x="30" y="140" width="150" height="60" fill="#e8794a"/>
    <rect x="195" y="50" width="175" height="60" fill="#6bc46b"/><rect x="195" y="110" width="175" height="60" fill="#e8794a"/><rect x="195" y="170" width="175" height="30" fill="#f2c14e"/><rect x="30" y="200" width="150" height="26" fill="#f2c14e"/></g>
    <g stroke="#333" stroke-width="5" stroke-linecap="round" fill="#333"><path d="M375 200 V150 M367 160 l8 -10 l8 10" /><path d="M20 90 V140 M12 130 l8 10 l8 -10"/></g>
    ${tag('الانكسارات: ارتفاع وانخفاض', 200, 232, '#7b4fa8')}`, ['#ffe9c9', '#fff4e0']),

  wind: () => wrap(`${sun(340, 40, 22)}
    <path d="M0 160 Q90 100 170 160 T340 150 T400 160 V240 H0Z" fill="#f5c260"/>
    <g stroke="#7ec8f0" stroke-width="6" stroke-linecap="round" fill="none"><path d="M20 70 q50 -20 100 0 q22 8 30 -10"/><path d="M60 110 q60 -20 120 0 q20 6 30 -8"/><path d="M200 70 q50 -20 100 0"/></g>
    ${tag('التعرية بالرياح ← الكثبان', 200, 222, '#d9702c')}`),

  water: () => wrap(`${cloud(90, 40)}${cloud(300, 36, .9)}
    <path d="M0 100 H130 L170 220 H230 L270 100 H400 V240 H0Z" fill="#b97b3a"/>
    <path d="M150 100 L180 220 H220 L250 100Z" fill="#2c9be6"/>
    <path d="M165 120 q35 14 70 0" stroke="#bfe8ff" stroke-width="3" fill="none"/>
    <g stroke="#3a8fd9" stroke-width="4" stroke-linecap="round"><path d="M70 55 l-4 14"/><path d="M84 55 l-4 14"/><path d="M310 52 l-4 14"/><path d="M324 52 l-4 14"/></g>
    ${tag('التعرية بالماء ← الوادي', 200, 226, '#1d7fc4')}`),

  oldEgypt: () => wrap(`${sun(70, 45, 24)}
    <rect y="170" width="400" height="70" fill="${sandBg}"/>
    <path d="M120 180 L215 60 L310 180Z" fill="#e2b25a" stroke="#b98a2e" stroke-width="3"/><path d="M215 60 L310 180 H250Z" fill="#c99a3d"/>
    <path d="M30 180 L95 95 L160 180Z" fill="#ebc16e" stroke="#b98a2e" stroke-width="3"/>
    ${palm(350, 195, .8)}
    ${tag('المصريون القدماء استثمروا الصحاري', 200, 222, '#a8742a')}`),

  tourism: () => wrap(`${sun(330, 40, 24)}${cloud(80, 50)}
    <rect y="140" width="400" height="100" fill="#1fa0d8"/><path d="M0 170 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="#aee6ff" stroke-width="3" fill="none"/>
    <path d="M0 140 Q120 100 220 140 Z" fill="#f8de9a"/>
    <path d="M200 140 L260 70 L320 140Z" fill="#9b6b6b"/>
    ${palm(90, 150, .8)}
    <g transform="translate(300 200)"><path d="M-30 0 h60 l-10 14 h-40z" fill="#ff7a59"/><path d="M0 0 v-34 l22 30z" fill="#fff"/></g>`),

  map: () => wrap(`<rect width="400" height="240" fill="#bfe8ff"/>
    <path d="M60 40 H210 L330 40 L350 120 L300 200 H60Z" fill="#fff3d6"/>
    <path d="M60 40 H225 L225 200 H60Z" fill="#f5c260" stroke="#fff" stroke-width="3"/>
    <path d="M285 40 H340 L345 120 L300 200 H255 Z" fill="#e8794a" stroke="#fff" stroke-width="3"/>
    <path d="M225 40 H285 V200 H255 L225 200Z" fill="#7fd24f" stroke="#fff" stroke-width="3"/>
    <path d="M225 40 L255 15 L285 40Z" fill="#37c27a" stroke="#fff" stroke-width="3"/>
    <path d="M300 40 L390 40 L370 150 L345 120Z" fill="#b57ad9" stroke="#fff" stroke-width="3"/>
    <text x="140" y="125" text-anchor="middle" font-size="16" font-weight="800" fill="#7a4b00" font-family="Cairo,Tahoma">الصحراء الغربية</text>
    <text x="305" y="150" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="Cairo,Tahoma">الشرقية</text>
    <text x="255" y="125" text-anchor="middle" font-size="12" font-weight="800" fill="#1a5d1a" font-family="Cairo,Tahoma" transform="rotate(-90 255 125)">وادي النيل</text>
    <text x="255" y="30" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="Cairo,Tahoma">الدلتا</text>
    <text x="355" y="85" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="Cairo,Tahoma">سيناء</text>
    <text x="200" y="232" text-anchor="middle" font-size="11" fill="#555" font-family="Cairo,Tahoma">رسم تقريبي مبسط، وليس خريطة الكتاب</text>`),
};

export const kids = {
  nour: (mood = 'smile') => `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 150 Q25 100 60 100 Q95 100 95 150Z" fill="#ff7aa8"/><circle cx="60" cy="62" r="34" fill="#ffd9b8"/>
    <path d="M24 62 Q20 20 60 22 Q100 20 96 62 Q90 38 60 40 Q30 38 24 62Z" fill="#7a3b1d"/>
    <path d="M22 70 Q14 110 30 118 L38 84Z M98 70 Q106 110 90 118 L82 84Z" fill="#fff"/><path d="M20 66 Q60 -6 100 66 Q96 30 60 18 Q24 30 20 66Z" fill="#fff"/>
    <circle cx="48" cy="64" r="4.5" fill="#222"/><circle cx="72" cy="64" r="4.5" fill="#222"/><circle cx="40" cy="76" r="5" fill="#ff9aa8" opacity=".7"/><circle cx="80" cy="76" r="5" fill="#ff9aa8" opacity=".7"/>
    ${mood === 'wow' ? '<ellipse cx="60" cy="82" rx="6" ry="7" fill="#c0392b"/>' : '<path d="M48 78 q12 12 24 0" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>'}</svg>`,
  yousef: (mood = 'smile') => `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 150 Q25 100 60 100 Q95 100 95 150Z" fill="#4aa8ff"/><circle cx="60" cy="62" r="34" fill="#f2c9a0"/>
    <path d="M26 58 Q24 20 60 22 Q96 20 94 58 Q86 36 60 38 Q34 36 26 58Z" fill="#2b1b12"/>
    <circle cx="48" cy="64" r="4.5" fill="#222"/><circle cx="72" cy="64" r="4.5" fill="#222"/><circle cx="40" cy="76" r="5" fill="#ff9aa8" opacity=".6"/><circle cx="80" cy="76" r="5" fill="#ff9aa8" opacity=".6"/>
    ${mood === 'wow' ? '<ellipse cx="60" cy="82" rx="6" ry="7" fill="#c0392b"/>' : '<path d="M46 78 q14 14 28 0" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>'}
    <rect x="40" y="3" width="40" height="16" rx="6" fill="#ffd23b"/></svg>`,
};

// ---- additions for the e-learning version ----
art.mapBlank = () => wrap(`<rect width="400" height="240" fill="#bfe8ff"/>
  <path d="M60 40 H225 V200 H60Z" fill="#cfd3dc" stroke="#fff" stroke-width="3"/>
  <path d="M285 40 H340 L345 120 L300 200 H255 L285 120Z" fill="#cfd3dc" stroke="#fff" stroke-width="3"/>
  <path d="M225 40 H285 V200 H255 H225Z" fill="#cfd3dc" stroke="#fff" stroke-width="3"/>
  <path d="M300 40 L390 40 L370 150 L345 120Z" fill="#cfd3dc" stroke="#fff" stroke-width="3"/>
  ${[['1', 140, 125], ['2', 255, 125], ['3', 318, 120], ['4', 352, 80]].map(([n, x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#e0579a"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="18" font-weight="900" fill="#fff" font-family="Cairo,Tahoma">${n}</text>`).join('')}`);
art.mapSinai = () => wrap(`<rect width="400" height="240" fill="#bfe8ff"/>
  <path d="M110 20 H290 L320 70 L250 230 L190 225 L130 120Z" fill="#f5e3b0" stroke="#fff" stroke-width="3"/>
  <path d="M110 20 H290 L300 55 H125Z" fill="#8ed6a0"/><path d="M135 55 H300 L280 130 H160Z" fill="#e5b96b"/><path d="M160 130 H280 L250 230 L190 225Z" fill="#b57ad9"/>
  <text x="205" y="45" text-anchor="middle" font-size="16" font-weight="800" fill="#1a5d1a" font-family="Cairo,Tahoma">الشمال</text>
  <text x="215" y="100" text-anchor="middle" font-size="16" font-weight="800" fill="#7a4b00" font-family="Cairo,Tahoma">الوسط</text>
  <text x="215" y="185" text-anchor="middle" font-size="16" font-weight="800" fill="#fff" font-family="Cairo,Tahoma">الجنوب</text>`);
art.galleryNile = art.nile;
kids.scout = (mood = 'smile') => `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
  <path d="M25 150 Q25 100 60 100 Q95 100 95 150Z" fill="#7c9a3c"/><path d="M45 100 L60 122 L75 100Z" fill="#ff8a2f"/>
  <circle cx="60" cy="62" r="34" fill="#f2c9a0"/>
  <path d="M20 46 Q60 30 100 46 Q60 22 20 46Z" fill="#a9792f"/><path d="M34 44 Q36 8 60 8 Q84 8 86 44Z" fill="#c9923d"/><rect x="32" y="38" width="56" height="8" rx="4" fill="#7a4b12"/>
  <circle cx="48" cy="66" r="4.5" fill="#222"/><circle cx="72" cy="66" r="4.5" fill="#222"/><circle cx="40" cy="78" r="5" fill="#ff9aa8" opacity=".6"/><circle cx="80" cy="78" r="5" fill="#ff9aa8" opacity=".6"/>
  ${mood === 'wow' ? '<ellipse cx="60" cy="84" rx="6" ry="7" fill="#c0392b"/>' : '<path d="M46 80 q14 14 28 0" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>'}</svg>`;
