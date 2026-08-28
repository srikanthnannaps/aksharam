/* Aksharam — అక్షర వేట (Akshara Hunt) */
(function () {
  "use strict";

  const VIRAMA = "\u0C4D";
  const BEST_HUNT = "aksharam-hunt-best";
  const BEST_RACE = "aksharam-race-best";
  const LIVES0 = 3;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* Common words + public-domain padyam first-line pieces (Vemana / Sumati). */
  const WORDS = [
    { te: "అమ్మ", en: "amma" },
    { te: "నాన్న", en: "nAnna" },
    { te: "అక్క", en: "akka" },
    { te: "అన్న", en: "anna" },
    { te: "నేను", en: "nenu" },
    { te: "నీవు", en: "nIvu" },
    { te: "ఇల్లు", en: "illu" },
    { te: "పాలు", en: "pAlu" },
    { te: "నీరు", en: "nIru" },
    { te: "కాలు", en: "kAlu" },
    { te: "చేయి", en: "cEyi" },
    { te: "కన్ను", en: "kannu" },
    { te: "చెవి", en: "cevi" },
    { te: "ముక్కు", en: "mukku" },
    { te: "ఆవు", en: "Avu" },
    { te: "కుక్క", en: "kukka" },
    { te: "పిల్లి", en: "pilli" },
    { te: "గాలి", en: "gAli" },
    { te: "నేల", en: "nEla" },
    { te: "నది", en: "nadi" },
    { te: "తల", en: "tala" },
    { te: "రాజు", en: "rAju" },
    { te: "రాణి", en: "rANi" },
    { te: "కవి", en: "kavi" },
    { te: "కథ", en: "katha" },
    { te: "పాట", en: "pATa" },
    { te: "దీపం", en: "dIpaM" },
    { te: "పూజ", en: "pUja" },
    { te: "బడి", en: "baDi" },
    { te: "చెట్టు", en: "ceTTu" },
    { te: "పక్షి", en: "pakshi" },
    { te: "అగ్ని", en: "agni" },
    { te: "ప్రేమ", en: "prEma" },
    { te: "స్నేహం", en: "snEhaM" },
    { te: "ఉప్పు", en: "uppu" },
    { te: "పదం", en: "padam" },
    { te: "పద్యం", en: "padyam" },
    { te: "తల్లి", en: "talli" },
    { te: "చెల్లి", en: "celli" },
    { te: "పెళ్ళి", en: "peLLi" },
    { te: "శాంతి", en: "shAMti" },
    { te: "ధర్మం", en: "dharmaM" },
    { te: "సత్యం", en: "satyaM" },
    { te: "తోట", en: "tOTa" },
    { te: "టైపు", en: "Taipu" },
    { te: "రైలు", en: "railu" },
    { te: "బస్సు", en: "bassu" },
    { te: "పల్లె", en: "palle" },
    { te: "రిక్షా", en: "rikShA" },
    { te: "గీత", en: "gIta" },
    { te: "వేదం", en: "vEdaM" },
    { te: "పాపం", en: "pApaM" },
    { te: "పుణ్యం", en: "puNyaM" },
    { te: "అన్నం", en: "annaM" },
    { te: "ఆత్మ", en: "Atma" },
    { te: "క్షమ", en: "kShama" },
    { te: "లక్ష్మి", en: "lakShmi" },
    { te: "జ్ఞానం", en: "j~nAnaM" },
    { te: "భక్తి", en: "bhakti" },
    { te: "యుద్ధం", en: "yuddhaM" },
    { te: "మంత్రి", en: "maMtri" },
    { te: "చెప్పు", en: "ceppu" },
    { te: "కంచు", en: "kaMcu" },
    { te: "దయ", en: "daya" },
    { te: "రక్ష", en: "rakSha" },
    { te: "తెలుగు", en: "telugu" },
    { te: "వేమన", en: "vEmana" },
    { te: "అక్షరం", en: "akSharaM" },
    { te: "మనసు", en: "manasu" },
    { te: "సంతోషం", en: "saMtOShaM" },
    { te: "పుస్తకం", en: "pustakaM" },
    { te: "గురువు", en: "guruvu" },
    { te: "ఏనుగు", en: "Enugu" },
    { te: "సింహం", en: "siMhaM" },
    { te: "చంద్రుడు", en: "caMdruDu" },
    { te: "సూర్యుడు", en: "sUryuDu" },
    { te: "వర్షం", en: "varShaM" },
    { te: "సముద్రం", en: "samudraM" },
    { te: "పట్టణం", en: "paTTaNaM" },
    { te: "తమ్ముడు", en: "tammuDu" },
    { te: "కూతురు", en: "kUturu" },
    { te: "పండుగ", en: "paMDuga" },
    { te: "ఆలయం", en: "AlayaM" },
    { te: "నాటకం", en: "nATakaM" },
    { te: "సినిమా", en: "sinimA" },
    { te: "బిర్యానీ", en: "biryAnI" },
    { te: "సుమతీ", en: "sumatI" },
    { te: "శతకం", en: "shatakaM" },
    { te: "ఆనందం", en: "AnaMdaM" },
    { te: "భోజనం", en: "bhOjanaM" },
    { te: "దేవుడు", en: "dEvuDu" },
    { te: "నీలము", en: "nIlamu" },
    { te: "పోలిక", en: "pOlika" },
    { te: "వినుర", en: "vinura" },
    { te: "కోపము", en: "kOpamu" },
    { te: "శాంతము", en: "shAMtamu" },
    { te: "అక్కర", en: "akkara" },
    { te: "ఎప్పుడు", en: "eppuDu" },
    { te: "సంపద", en: "saMpada" },
    { te: "బంధువు", en: "baMdhuvu" },
    { te: "మంచి", en: "maMci" },
    { te: "గంగి", en: "gaMgi" },
    { te: "రాయి", en: "rAyi" },
    { te: "ఇనుము", en: "inumu" },
    { te: "ఒక్క" },
    { te: "కొండ" },
    { te: "కొడుకు" },
    { te: "తండ్రి", en: "taMDri" },
    { te: "నక్షత్రం", en: "nakshatraM" },
    { te: "ఆకాశం", en: "AkAshaM" },
    { te: "హైదరాబాదు", en: "haidarAbAdu" },
    { te: "కప్పురంబు", en: "kappuraMbu" },
    { te: "నిక్కమైన", en: "nikkamaina" },
    { te: "గోవుపాలు", en: "gOvupAlu" },
    { te: "అక్షరాలు", en: "akSharAlu" },
    { te: "పోస్టరు", en: "pOsTaru" },
    { te: "బజారు", en: "bajAru" },
    { te: "చార్మినార్", en: "cArminAr" },
    { te: "గడియారం", en: "gaDiyAraM" },
    { te: "పురుషుడు", en: "puruShuDu" },
    { te: "సజ్జనుడు", en: "sajjanuDu" },
    { te: "బంధువులు", en: "baMdhuvulu" },
    { te: "పోలికనుండు", en: "pOlikanuMDu" },
    { te: "విశ్వదాభిరామ", en: "vishvadAbhirAma" },
    { te: "విశ్వం", en: "vishvaM" },
    { te: "చుట్టము", en: "cuTTamu" },
    { te: "గుర్రము", en: "gurramu" },
    { te: "శుద్ది", en: "shuddi" },
    { te: "మంత్రం", en: "maMtraM" },
    { te: "ఫోను", en: "phOnu" },
    { te: "కాలేజీ", en: "kAlEjI" },
    { te: "ఆఫీసు", en: "AphIsu" },
    { te: "నవోదయ", en: "navodaya" },
    { te: "తెలుగునాడు", en: "telugunADu" },
    { te: "అమరావతి", en: "amarAvati" },
    { te: "విజయవాడ", en: "vijayavADa" },
    { te: "రామాయణం", en: "rAmAyaNaM" },
    { te: "అక్షరమాల", en: "akSharamAla" },
    { te: "పుస్తకాలు", en: "pustakAlu" },
    { te: "కళ్యాణం", en: "kaLyANaM" },
    { te: "సంతోషము", en: "saMtOShamu" },
    { te: "శత్రువు", en: "shatruvu" },
    { te: "మిత్రుడు", en: "mitruDu" },
    { te: "పురుషులు", en: "puruShulu" },
    { te: "భారతం", en: "bhArataM" },
    { te: "తిరుపతి", en: "tirupati" },
    { te: "పద్మావతి", en: "padmAvati" },
    { te: "గోవింద", en: "gOviMda" },
  ];

  const el = {
    hud: document.querySelector(".hud"),
    inkWrap: document.querySelector(".ink-wrap"),
    lives: document.getElementById("lives"),
    score: document.getElementById("score"),
    streak: document.getElementById("streak"),
    best: document.getElementById("best"),
    ink: document.getElementById("ink"),
    inkWet: document.getElementById("inkWet"),
    start: document.getElementById("screen-start"),
    play: document.getElementById("screen-play"),
    over: document.getElementById("screen-over"),
    target: document.getElementById("target"),
    board: document.getElementById("board"),
    raceBox: document.getElementById("raceBox"),
    raceIn: document.getElementById("raceIn"),
    raceLive: document.getElementById("raceLive"),
    floatPts: document.getElementById("floatPts"),
    boardHint: document.getElementById("boardHint"),
    overScore: document.getElementById("overScore"),
    overBest: document.getElementById("overBest"),
    startBtn: document.getElementById("startBtn"),
    againBtn: document.getElementById("againBtn"),
    savePosterBtn: document.getElementById("savePosterBtn"),
    overToast: document.getElementById("overToast"),
    stage: document.querySelector(".stage"),
  };

  const game = {
    mode: "hunt",
    phase: "start",
    lives: LIVES0,
    score: 0,
    streak: 0,
    next: 0,
    aks: [],
    word: null,
    endAt: 0,
    total: 0,
    raf: 0,
    round: 0,
    lock: false,
    recent: [],
    actx: null,
    hiddenAt: 0,
    maxStreak: 0,
    poster: null,
  };

  function segmentGraphemes(text) {
    if (!text) return [];
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const seg = new Intl.Segmenter("te", { granularity: "grapheme" });
      return Array.from(seg.segment(text), function (s) {
        return s.segment;
      });
    }
    return graphemeFallback(text);
  }

  function graphemeFallback(text) {
    const chars = Array.from(text);
    const chunks = [];
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const cp = ch.codePointAt(0);
      const isMark =
        (cp >= 0x0c3e && cp <= 0x0c56) ||
        cp === 0x0c01 ||
        cp === 0x0c02 ||
        cp === 0x0c03 ||
        cp === 0x0c4d ||
        (typeof ch.match === "function" && /\p{M}/u.test(ch));
      if (isMark && chunks.length) chunks[chunks.length - 1] += ch;
      else chunks.push(ch);
    }
    const out = [];
    for (let i = 0; i < chunks.length; i++) {
      const cur = chunks[i];
      if (
        out.length &&
        out[out.length - 1].indexOf(VIRAMA) !== -1 &&
        /[\u0C15-\u0C39]/.test(cur)
      ) {
        out[out.length - 1] += cur;
      } else {
        out.push(cur);
      }
    }
    return out;
  }

  function aksOf(te) {
    return segmentGraphemes(te).filter(function (g) {
      return g !== " " && g !== "\n" && g !== "\t";
    });
  }

  function bestKey() {
    return game.mode === "race" ? BEST_RACE : BEST_HUNT;
  }

  function readBest() {
    try {
      const n = parseInt(localStorage.getItem(bestKey()) || "0", 10);
      return isFinite(n) && n > 0 ? n : 0;
    } catch (e) {
      return 0;
    }
  }

  function writeBest(n) {
    try {
      localStorage.setItem(bestKey(), String(n));
    } catch (e) {}
  }

  /* Palm-leaf poster grain — same pattern as the type lab in app.js. */
  function mulberry(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function drawPalmBg(c, w, h) {
    const g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#f3e4c4");
    g.addColorStop(0.5, "#ead6ae");
    g.addColorStop(1, "#e0c894");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    const rng = mulberry(7);
    c.fillStyle = "rgba(90, 60, 20, 0.035)";
    for (let i = 0; i < 1400; i++) {
      c.fillRect(rng() * w, rng() * h, rng() * 3, rng() * 2);
    }
    c.strokeStyle = "rgba(139, 90, 43, 0.28)";
    c.lineWidth = 1;
    for (let y = 48; y < h - 30; y += 36) {
      c.beginPath();
      c.moveTo(70, y + Math.sin(y / 40) * 1.5);
      c.lineTo(w - 70, y);
      c.stroke();
    }
    c.fillStyle = "#5c3a18";
    for (let y = 90; y < h - 80; y += 70) {
      c.beginPath();
      c.arc(42, y, 9, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#ead6ae";
      c.beginPath();
      c.arc(42, y, 4, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#5c3a18";
    }
    c.strokeStyle = "#6b4423";
    c.lineWidth = 8;
    c.strokeRect(28, 28, w - 56, h - 56);
    c.lineWidth = 2;
    c.strokeRect(42, 42, w - 84, h - 84);
  }

  function waitFonts() {
    const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    return ready.then(function () {
      if (document.fonts && document.fonts.load) {
        return Promise.all([
          document.fonts.load('700 80px "Noto Serif Telugu"'),
          document.fonts.load('600 48px "Noto Serif Telugu"'),
          document.fonts.load('400 80px "Ramabhadra"'),
          document.fonts.load('700 48px "Noto Sans Telugu"'),
        ]);
      }
    }).catch(function () {});
  }

  function fontsUsable(c) {
    c.save();
    c.font = '700 80px "Noto Serif Telugu"';
    const w = c.measureText("శ్రీ").width;
    c.restore();
    return w >= 20;
  }

  function fitScoreSize(c, text, maxW) {
    let size = 340;
    const family = '"Ramabhadra", "Noto Serif Telugu"';
    c.font = "400 " + size + "px " + family;
    while (size > 96 && c.measureText(text).width > maxW) {
      size -= 8;
      c.font = "400 " + size + "px " + family;
    }
    return size;
  }

  function drawScorePoster(state) {
    const w = 1080;
    const h = 1350;
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const c = cv.getContext("2d");
    const score = state && isFinite(state.score) ? Math.max(0, Math.round(state.score)) : 0;
    const streak = state && isFinite(state.streak) ? Math.max(0, Math.round(state.streak)) : 0;
    const mode = state && state.mode === "race" ? "race" : "hunt";
    const record = !!(state && state.record);
    const scoreText = String(score);
    const modeText = mode === "race" ? "టైపు రేస" : "వేట";
    const meta = modeText + "  ·  ×" + streak + " వరుస";

    drawPalmBg(c, w, h);

    c.textAlign = "center";
    c.textBaseline = "alphabetic";

    c.fillStyle = "#c23b22";
    c.fillRect(w / 2 - 48, 168, 96, 6);
    c.fillStyle = "#1e3354";
    c.fillRect(w / 2 - 28, 178, 56, 3);

    c.fillStyle = "#1e3354";
    c.font = '400 92px "Ramabhadra", "Noto Serif Telugu"';
    c.fillText("అక్షర వేట", w / 2, 300);

    c.strokeStyle = "#c23b22";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(220, 348);
    c.lineTo(w - 220, 348);
    c.stroke();
    c.strokeStyle = "#1e3354";
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(260, 358);
    c.lineTo(w - 260, 358);
    c.stroke();

    const maxW = w - 200;
    const scoreSize = fitScoreSize(c, scoreText, maxW);
    c.fillStyle = "#152238";
    c.font = "400 " + scoreSize + "px \"Ramabhadra\", \"Noto Serif Telugu\"";
    c.fillText(scoreText, w / 2, 720);

    c.fillStyle = "#3a2c1a";
    c.font = '600 44px "Noto Serif Telugu"';
    c.fillText(meta, w / 2, 860);

    if (record) {
      c.fillStyle = "#c23b22";
      c.font = '700 32px "Noto Sans Telugu", "Noto Serif Telugu"';
      c.fillText("కొత్త అత్యుత్తమం", w / 2, 960);
    }

    c.fillStyle = "#6b4423";
    c.font = '600 26px "Noto Serif Telugu"';
    c.fillText("అక్షరం", w / 2, h - 72);

    return cv;
  }

  function overToast(msg) {
    if (!el.overToast) return;
    el.overToast.hidden = false;
    el.overToast.textContent = msg;
    clearTimeout(overToast._t);
    overToast._t = setTimeout(function () {
      el.overToast.hidden = true;
    }, 2200);
  }

  function savePoster() {
    if (!el.savePosterBtn || game.phase !== "over") return;
    const snap = game.poster || {
      score: game.score,
      streak: game.maxStreak,
      mode: game.mode,
      record: false,
    };
    el.savePosterBtn.disabled = true;
    waitFonts().then(function () {
      const cv = drawScorePoster(snap);
      const c = cv.getContext("2d");
      if (!fontsUsable(c)) {
        overToast("ఫాంట్ లోడ్ కాలేదు · font not ready, try again");
        return;
      }
      const a = document.createElement("a");
      a.download = "aksharam-hunt.png";
      a.href = cv.toDataURL("image/png");
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      overToast("పోస్టరు దిగింది · PNG saved");
    }).catch(function () {
      overToast("పోస్టరు దించలేదు · could not save");
    }).then(function () {
      el.savePosterBtn.disabled = false;
    });
  }

  function translit(raw) {
    return (window.AksharamTranslit && AksharamTranslit.transliterate(raw)) || raw;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function shuffledTiles(aks) {
    const items = aks.map(function (g, i) {
      return { g: g, id: i };
    });
    if (items.length < 2) return items;
    let out = shuffle(items);
    let guard = 0;
    while (guard < 10 && out.every(function (t, i) { return t.g === aks[i]; })) {
      out = shuffle(items);
      guard += 1;
    }
    return out;
  }

  function rangeForStreak(streak) {
    if (streak < 3) return [2, 3];
    if (streak < 6) return [2, 4];
    if (streak < 10) return [3, 5];
    if (streak < 16) return [3, 6];
    return [4, 8];
  }

  function pickWord() {
    const range = rangeForStreak(game.streak);
    const pool = WORDS.filter(function (w) {
      if (game.mode === "race" && !w.en) return false;
      const n = aksOf(w.te).length;
      if (n < range[0] || n > range[1]) return false;
      if (game.recent.indexOf(w.te) !== -1) return false;
      return true;
    });
    const use = pool.length ? pool : WORDS.filter(function (w) {
      if (game.mode === "race" && !w.en) return false;
      return aksOf(w.te).length >= 2;
    });
    const w = use[Math.floor(Math.random() * use.length)];
    game.recent.push(w.te);
    if (game.recent.length > 12) game.recent.shift();
    return w;
  }

  function wordTime(n, streak) {
    const per = game.mode === "race" ? 1400 : 1100;
    const base = (game.mode === "race" ? 4200 : 3600) + n * per;
    const tighten = Math.pow(0.94, Math.min(streak, 16));
    const minT = n * (game.mode === "race" ? 1000 : 850);
    return Math.max(minT, base * tighten);
  }

  function ensureAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!game.actx) game.actx = new AC();
    if (game.actx.state === "suspended") game.actx.resume();
  }

  function blip(freq, dur, type, gain) {
    if (!game.actx) return;
    const t0 = game.actx.currentTime;
    const o = game.actx.createOscillator();
    const g = game.actx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(gain || 0.05, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g);
    g.connect(game.actx.destination);
    o.start(t0);
    o.stop(t0 + dur);
  }

  function sfx(kind) {
    if (!game.actx) return;
    if (kind === "ok") blip(660, 0.07, "sine", 0.045);
    else if (kind === "bad") blip(170, 0.12, "triangle", 0.05);
    else if (kind === "word") {
      blip(523, 0.08, "sine", 0.04);
      setTimeout(function () { blip(659, 0.08, "sine", 0.04); }, 70);
      setTimeout(function () { blip(784, 0.12, "sine", 0.045); }, 140);
    } else if (kind === "life") {
      blip(320, 0.1, "square", 0.03);
      setTimeout(function () { blip(210, 0.16, "square", 0.03); }, 90);
    } else if (kind === "over") {
      blip(240, 0.18, "sine", 0.04);
      setTimeout(function () { blip(180, 0.28, "sine", 0.04); }, 120);
    }
  }

  function showScreen(name) {
    el.start.hidden = name !== "start";
    el.play.hidden = name !== "play";
    el.over.hidden = name !== "over";
    const playing = name === "play";
    el.hud.hidden = !playing;
    el.inkWrap.hidden = !playing;
    game.phase = name;
    document.body.setAttribute("data-phase", name);
  }

  function renderLives() {
    el.lives.textContent = "";
    for (let i = 0; i < LIVES0; i++) {
      const d = document.createElement("span");
      d.className = "life" + (i >= game.lives ? " gone" : "");
      d.setAttribute("aria-hidden", "true");
      el.lives.appendChild(d);
    }
    el.lives.setAttribute("aria-label", "ప్రాణాలు " + game.lives);
  }

  function renderHud() {
    el.score.textContent = String(game.score);
    el.streak.textContent = "×" + game.streak;
    el.best.textContent = String(readBest());
    renderLives();
  }

  function setInk(p) {
    const v = Math.max(0, Math.min(1, p));
    el.inkWet.style.setProperty("--ink", String(v));
    el.ink.setAttribute("aria-valuenow", String(Math.round(v * 100)));
    el.ink.classList.toggle("low", v < 0.28);
  }

  function renderTarget() {
    el.target.textContent = "";
    game.aks.forEach(function (g, i) {
      const s = document.createElement("span");
      s.className = "slot";
      if (i < game.next) s.classList.add("got");
      else if (i === game.next) s.classList.add("next");
      s.textContent = g;
      el.target.appendChild(s);
    });
  }

  function clearBoard() {
    el.board.textContent = "";
  }

  function dealHunt() {
    el.raceBox.hidden = true;
    el.board.hidden = false;
    if (el.boardHint) el.boardHint.hidden = false;
    clearBoard();
    const tiles = shuffledTiles(game.aks);
    tiles.forEach(function (t) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ak hunt-tile";
      b.textContent = t.g;
      b.setAttribute("aria-label", t.g);
      b.dataset.id = String(t.id);
      b.dataset.g = t.g;
      b.addEventListener("click", function () {
        onTap(b);
      });
      el.board.appendChild(b);
    });
    renderTarget();
  }

  function dealRace() {
    el.board.hidden = true;
    clearBoard();
    el.raceBox.hidden = false;
    if (el.boardHint) el.boardHint.hidden = true;
    el.raceIn.value = "";
    el.raceLive.textContent = "";
    renderTarget();
    el.raceIn.focus();
  }

  function startRound() {
    game.lock = false;
    game.round += 1;
    const round = game.round;
    game.word = pickWord();
    game.aks = aksOf(game.word.te);
    game.next = 0;
    const ms = wordTime(game.aks.length, game.streak);
    game.total = ms;
    game.endAt = performance.now() + ms + 280;
    setInk(1);
    el.floatPts.hidden = true;
    el.floatPts.classList.remove("show");
    if (game.mode === "race") dealRace();
    else dealHunt();
    if (game.raf) cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(function step(now) {
      tick(now, round);
    });
  }

  function tick(now, round) {
    if (round !== game.round || game.phase !== "play" || game.lock) return;
    const left = game.endAt - now;
    if (left <= 0) {
      setInk(0);
      onTimeout(round);
      return;
    }
    setInk(left / game.total);
    game.raf = requestAnimationFrame(function step(t) {
      tick(t, round);
    });
  }

  function bumpScore(leftMs) {
    game.streak += 1;
    if (game.streak > game.maxStreak) game.maxStreak = game.streak;
    const leftover = Math.max(1, Math.round(leftMs / 100));
    const pts = leftover * game.streak;
    game.score += pts;
    showFloat("+" + pts);
    renderHud();
    return pts;
  }

  function showFloat(txt) {
    el.floatPts.hidden = false;
    el.floatPts.textContent = txt;
    el.floatPts.classList.remove("show");
    void el.floatPts.offsetWidth;
    el.floatPts.classList.add("show");
    clearTimeout(showFloat._t);
    showFloat._t = setTimeout(function () {
      el.floatPts.hidden = true;
      el.floatPts.classList.remove("show");
    }, reduceMotion.matches ? 200 : 720);
  }

  function wordDone() {
    game.lock = true;
    if (game.raf) cancelAnimationFrame(game.raf);
    const left = Math.max(0, game.endAt - performance.now());
    bumpScore(left);
    sfx("word");
    const pause = reduceMotion.matches ? 80 : 420;
    const round = game.round;
    setTimeout(function () {
      if (game.round !== round || game.phase !== "play") return;
      startRound();
    }, pause);
  }

  function onTap(btn) {
    if (game.lock || game.phase !== "play" || game.mode !== "hunt") return;
    if (btn.classList.contains("got")) return;
    const expected = game.aks[game.next];
    if (btn.dataset.g === expected) {
      btn.classList.add("got");
      if (!reduceMotion.matches) {
        btn.classList.remove("pop");
        void btn.offsetWidth;
        btn.classList.add("pop");
      }
      game.next += 1;
      sfx("ok");
      renderTarget();
      if (game.next >= game.aks.length) wordDone();
    } else {
      missTile(btn);
    }
  }

  function missTile(btn) {
    game.streak = 0;
    renderHud();
    sfx("bad");
    game.endAt -= 800;
    if (!reduceMotion.matches && btn) {
      btn.classList.remove("shake");
      void btn.offsetWidth;
      btn.classList.add("shake");
    }
  }

  function onRaceInput() {
    if (game.lock || game.phase !== "play" || game.mode !== "race") return;
    const live = translit(el.raceIn.value.trim());
    el.raceLive.textContent = live;
    const te = game.word.te;
    let matched = 0;
    const liveAks = aksOf(live);
    for (let i = 0; i < game.aks.length; i++) {
      if (liveAks[i] === game.aks[i]) matched = i + 1;
      else break;
    }
    game.next = matched;
    renderTarget();
    if (live === te) wordDone();
  }

  function onRaceEnter() {
    if (game.lock || game.phase !== "play" || game.mode !== "race") return;
    const live = translit(el.raceIn.value.trim());
    if (live === game.word.te) {
      wordDone();
      return;
    }
    game.streak = 0;
    renderHud();
    sfx("bad");
    game.endAt -= 800;
    if (!reduceMotion.matches) {
      el.stage.classList.remove("penalty");
      void el.stage.offsetWidth;
      el.stage.classList.add("penalty");
    }
  }

  function onTimeout(round) {
    if (round !== game.round || game.lock) return;
    game.lock = true;
    if (game.raf) cancelAnimationFrame(game.raf);
    game.streak = 0;
    game.lives -= 1;
    sfx("life");
    renderHud();
    if (game.lives <= 0) {
      gameOver();
      return;
    }
    const pause = reduceMotion.matches ? 80 : 380;
    const next = game.round;
    setTimeout(function () {
      if (game.round !== next || game.phase !== "play") return;
      startRound();
    }, pause);
  }

  function gameOver() {
    game.lock = true;
    game.round += 1;
    game.phase = "over";
    if (game.raf) cancelAnimationFrame(game.raf);
    sfx("over");
    const prev = readBest();
    const isRecord = game.score > prev;
    if (isRecord) writeBest(game.score);
    el.overScore.textContent = String(game.score);
    el.overBest.classList.toggle("record", isRecord && game.score > 0);
    if (game.score <= 0) {
      el.overBest.textContent = "అత్యుత్తమం · " + Math.max(prev, 0);
    } else if (isRecord) {
      el.overBest.textContent = "కొత్త అత్యుత్తమం · new best";
    } else {
      el.overBest.textContent = "అత్యుత్తమం · " + prev;
    }
    game.poster = {
      score: game.score,
      streak: game.maxStreak,
      mode: game.mode,
      record: isRecord && game.score > 0,
    };
    if (el.overToast) {
      el.overToast.hidden = true;
      el.overToast.textContent = "";
    }
    showScreen("over");
    el.againBtn.focus();
  }

  function begin() {
    ensureAudio();
    game.lives = LIVES0;
    game.score = 0;
    game.streak = 0;
    game.maxStreak = 0;
    game.poster = null;
    game.recent = [];
    game.lock = false;
    renderHud();
    showScreen("play");
    startRound();
  }

  function setMode(mode) {
    game.mode = mode === "race" ? "race" : "hunt";
    document.querySelectorAll(".mode").forEach(function (b) {
      const on = b.getAttribute("data-mode") === game.mode;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const te = document.querySelector(".how.te");
    const en = document.querySelector(".how.en");
    if (te && en) {
      if (game.mode === "race") {
        te.textContent = "కనిపించే తెలుగు పదాన్ని ఇంగ్లీషు (ITRANS) లో టైపు చేయండి.";
        en.textContent = "Type English (ITRANS) to match the Telugu word before the ink dries.";
      } else {
        te.textContent = "అక్షరాలను సరైన వరుసలో నొక్కండి. సిరా ఆరిపోయేలోపు.";
        en.textContent = "Tap the syllables in order before the ink dries. Three lives. Streaks run hotter.";
      }
    }
    el.best.textContent = String(readBest());
  }

  function bind() {
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        game.hiddenAt = performance.now();
        if (game.raf) cancelAnimationFrame(game.raf);
        return;
      }
      if (game.phase === "play" && !game.lock && game.hiddenAt) {
        game.endAt += performance.now() - game.hiddenAt;
        game.hiddenAt = 0;
        const round = game.round;
        game.raf = requestAnimationFrame(function step(now) {
          tick(now, round);
        });
      }
    });
    el.startBtn.addEventListener("click", begin);
    el.againBtn.addEventListener("click", begin);
    if (el.savePosterBtn) el.savePosterBtn.addEventListener("click", savePoster);
    document.querySelectorAll(".mode").forEach(function (b) {
      b.addEventListener("click", function () {
        setMode(b.getAttribute("data-mode"));
      });
    });
    el.raceIn.addEventListener("input", onRaceInput);
    el.raceIn.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        ev.preventDefault();
        onRaceEnter();
      }
    });
  }

  function runSelfTest() {
    const cases = [
      ["క్ష", ["క్ష"]],
      ["అక్షరం", ["అ", "క్ష", "రం"]],
      ["అమ్మ", ["అ", "మ్మ"]],
      ["శ్రీ", ["శ్రీ"]],
      ["పక్షి", ["ప", "క్షి"]],
      ["లక్ష్మి", ["ల", "క్ష్మి"]],
      ["తెలుగు", ["తె", "లు", "గు"]],
    ];
    const failed = cases.filter(function (c) {
      const got = aksOf(c[0]).join("|");
      return got !== c[1].join("|");
    });
    const short = WORDS.filter(function (w) {
      return aksOf(w.te).length < 2;
    });
    const t = window.AksharamTranslit;
    const raceFail = WORDS.filter(function (w) {
      return w.en && t && t.transliterate(w.en) !== w.te;
    });
    const poster = drawScorePoster({ score: 1840, streak: 6, mode: "hunt", record: true });
    const posterOk = poster && poster.width === 1080 && poster.height === 1350;
    if (failed.length || short.length || raceFail.length || !posterOk) {
      console.error("Akshara Hunt tests failed", {
        split: failed,
        short: short.map(function (w) { return w.te; }),
        race: raceFail.map(function (w) { return w.en + "→" + (t && t.transliterate(w.en)); }),
        poster: posterOk ? "ok" : "bad-size",
      });
    } else {
      console.info("Akshara Hunt: split + word-bank tests passed (" + WORDS.length + " words)");
    }
  }

  bind();
  runSelfTest();
  showScreen("start");
})();
