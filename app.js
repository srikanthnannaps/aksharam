/* Aksharam — poster, padyam wall, akshara explode */
(function () {
  "use strict";

  const TELUGU_RE = /[\u0C00-\u0C7F]/;
  const VIRAMA = "\u0C4D";

  const PADYAMS = [
    {
      id: "uppu",
      source: "వేమన శతకం",
      lines: [
        "ఉప్పు కప్పురంబు ఒక్క పోలికనుండు",
        "చూడ చూడ రుచుల జాడ వేరు",
        "పురుషులందు పుణ్య పురుషులు వేరయ",
        "విశ్వదాభిరామ వినుర వేమ!",
      ],
      gloss: "Salt and camphor look alike; taste tells them apart — so too the virtuous among people.",
    },
    {
      id: "alpudu",
      source: "వేమన శతకం",
      lines: [
        "అల్పుడెప్పుడు పలుకు నాడంబరముగాను",
        "సజ్జనుండు పలుకు చల్లగాను",
        "కంచు మోగినట్లు కనకంబు మోగునా",
        "విశ్వదాభిరామ వినుర వేమ!",
      ],
      gloss: "The small man boasts; the good speak softly. Does gold clang like brass?",
    },
    {
      id: "nilamu",
      source: "వేమన శతకం",
      lines: [
        "నిక్కమైన మంచి నీలమొక్కటి చాలు",
        "తళుకు బెళుకు రాలు తట్టెడేల",
        "చదువ పద్యమరయ జాలదా యొక్కటి",
        "విశ్వదాభిరామ వినుర వేమ!",
      ],
      gloss: "One true sapphire is enough; a tray of glitter is not. One good verse is study enough.",
    },
    {
      id: "gangi",
      source: "వేమన శతకం",
      lines: [
        "గంగి గోవుపాలు గరిటడైనను చాలు",
        "కడవెడైనను నేమి ఖరముపాలు",
        "భక్తికల్గుకూడు పట్టెడైనను చాలు",
        "విశ్వదాభిరామ వినుర వేమ!",
      ],
      gloss: "A spoon of a good cow's milk beats a pot of donkey's. A handful eaten with devotion is enough.",
    },
    {
      id: "atma",
      source: "వేమన శతకం",
      lines: [
        "ఆత్మ శుద్ది లేని యాచారమదియేల",
        "భాండశుద్ది లేని పాక మేల",
        "చిత్తశుద్దిలేని శివపూజలేలరా",
        "విశ్వదాభిరామ వినుర వేమ!",
      ],
      gloss: "What use is rite without a clean self, cooking in a dirty pot, or Shiva-puja without a clean heart?",
    },
    {
      id: "cheppu",
      source: "వేమన శతకం",
      lines: [
        "చెప్పులోని రాయి చెవిలోని జోరీగ",
        "కంటిలోని నలుసు కాలి ముల్లు",
        "ఇంటిలోని పోరు నింతింత గాదయా",
        "విశ్వదాభిరామ వినుర వేమ!",
      ],
      gloss: "A stone in the shoe, a wasp in the ear, grit in the eye, a thorn in the foot — a quarrel at home is worse.",
    },
    {
      id: "inumu",
      source: "వేమన శతకం",
      lines: [
        "యినుము విరగనేని యినుమూరు ముమ్మారు",
        "కాచియెతకవచ్చు గ్రమము గాను",
        "మనసు విరిగెనేని మరి చేర్చరాదయా",
        "విశ్వదాభిరామ వినుర వేమ!",
      ],
      gloss: "Iron, broken even thrice, can be heated and joined. A broken heart cannot.",
    },
    {
      id: "kopa",
      source: "సుమతీ శతకం · బద్దెన",
      lines: [
        "తన కోపమె తన శత్రువు",
        "తన శాంతమె తనకు రక్ష, దయ చుట్టంబౌ",
        "తన సంతోషమె స్వర్గము",
        "తన దుఃఖమె నరక మండ్రు తథ్యము సుమతీ",
      ],
      gloss: "One's anger is the enemy; calm is the shield; kindness is kin. Joy is heaven, sorrow hell.",
    },
    {
      id: "akkara",
      source: "సుమతీ శతకం · బద్దెన",
      lines: [
        "అక్కరకు రాని చుట్టము",
        "మ్రొక్కిన వరమీని వేల్పు, మొహరమున దా",
        "నెక్కిన బారని గుర్రము",
        "గ్రక్కున విడవంగవలయు గదరా సుమతీ",
      ],
      gloss: "Drop at once the kin who will not help, the god who will not bless, the horse that will not run.",
    },
    {
      id: "sampada",
      source: "సుమతీ శతకం · బద్దెన",
      lines: [
        "ఎప్పుడు సంపద కలిగిన",
        "నప్పుడు బంధువులు వత్తు రది యెట్లన్నన్",
        "తెప్పలుగ జెఱువు నిండిన",
        "గప్పలు పదివేలు చేరు గదరా సుమతీ",
      ],
      gloss: "Relatives arrive when wealth does — frogs by the thousand when the tank fills.",
    },
  ];

  const CHEAT_CONS = [
    ["ka", "క"], ["kha", "ఖ"], ["ga", "గ"], ["gha", "ఘ"], ["nga", "ఙ"],
    ["cha", "చ"], ["chha", "ఛ"], ["ja", "జ"], ["jha", "ఝ"],
    ["Ta", "ట"], ["ta", "త"], ["da", "ద"], ["na", "న"],
    ["pa", "ప"], ["ba", "బ"], ["ma", "మ"],
    ["ya", "య"], ["ra", "ర"], ["la", "ల"], ["va", "వ"],
    ["sha", "శ"], ["Sha", "ష"], ["sa", "స"], ["ha", "హ"],
    ["ksha", "క్ష"],
  ];
  const CHEAT_VOW = [
    ["a", "అ"], ["aa", "ఆ"], ["i", "ఇ"], ["ii", "ఈ"],
    ["u", "ఉ"], ["uu", "ఊ"], ["e", "ఎ"], ["ee", "ఏ"],
    ["ai", "ఐ"], ["o", "ఓ"], ["oo", "ఓ"], ["ou", "ఔ"], ["au", "ఔ"],
    ["M", "ం"], ["H", "ః"],
  ];

  const STYLES = {
    palm: {
      font: '"Noto Serif Telugu"',
      weight: "600",
      fg: "#2a1810",
      align: "center",
    },
    cinema: {
      font: '"Ramabhadra", "Noto Serif Telugu"',
      weight: "400",
      fg: "#f3d78a",
      align: "center",
    },
    literary: {
      font: '"Noto Serif Telugu"',
      weight: "600",
      fg: "#1a1510",
      align: "left",
    },
    kalamkari: {
      font: '"Noto Serif Telugu"',
      weight: "700",
      fg: "#152238",
      align: "center",
    },
  };

  const el = {
    input: document.getElementById("input"),
    live: document.getElementById("live"),
    strip: document.getElementById("strip"),
    tiles: document.getElementById("tiles"),
    poster: document.getElementById("poster"),
    copyBtn: document.getElementById("copyBtn"),
    pngBtn: document.getElementById("pngBtn"),
    toast: document.getElementById("toast"),
    verses: document.getElementById("verses"),
    consRow: document.getElementById("cons-row"),
    vowelRow: document.getElementById("vowel-row"),
    posterFrame: document.querySelector(".poster-frame"),
    wall: document.querySelector(".wall"),
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const hoverPointer = window.matchMedia("(hover: hover)");
  const smallScreen = window.matchMedia("(max-width: 860px)");

  function motionOk() {
    return !reduceMotion.matches;
  }
  function trailOk() {
    return (
      motionOk() &&
      finePointer.matches &&
      hoverPointer.matches &&
      !smallScreen.matches
    );
  }

  let styleName = "palm";
  let telugu = "";
  let selectedCluster = null;
  let fontsReady = false;
  let lastLive = [];
  let firstPoster = true;
  const bgCache = {};
  const ctx = el.poster.getContext("2d");

  function replayClass(node, name) {
    if (!node) return;
    node.classList.remove(name);
    void node.offsetWidth;
    node.classList.add(name);
  }

  function teluguOf(raw) {
    return (window.AksharamTranslit && AksharamTranslit.transliterate(raw)) || raw;
  }

  function segmentGraphemes(text) {
    if (!text) return [];
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const seg = new Intl.Segmenter("te", { granularity: "grapheme" });
      return Array.from(seg.segment(text), (s) => s.segment);
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

  function analyzeCluster(g) {
    const cps = Array.from(g);
    const tiles = [];
    for (let i = 0; i < cps.length; i++) {
      const c = cps[i];
      const cp = c.codePointAt(0);
      let role = "చిహ్నం";
      let name = "other";
      if (cp === 0x0c4d) {
        role = "పొల్లు";
        name = "virama";
      } else if (cp === 0x0c02) {
        role = "అనుస్వారం";
        name = "anusvara";
      } else if (cp === 0x0c03) {
        role = "విసర్గ";
        name = "visarga";
      } else if (cp === 0x0c01) {
        role = "చంద్రబిందు";
        name = "candrabindu";
      } else if (cp >= 0x0c3e && cp <= 0x0c4c) {
        role = "గుణింతం";
        name = "gunintha";
      } else if (cp === 0x0c55 || cp === 0x0c56) {
        role = "గుణింతం";
        name = "gunintha";
      } else if (cp >= 0x0c05 && cp <= 0x0c14) {
        role = "అచ్చు";
        name = "vowel";
      } else if (cp >= 0x0c15 && cp <= 0x0c39) {
        if (i > 0 && cps[i - 1] === VIRAMA) {
          role = "వత్తు";
          name = "vattu";
        } else {
          role = "హల్లు";
          name = "consonant";
        }
      } else if (c === " " || c === "\n") {
        continue;
      }
      tiles.push({
        char: c,
        hex: "U+" + cp.toString(16).toUpperCase().padStart(4, "0"),
        role: role,
        name: name,
      });
    }
    return tiles;
  }

  function insertAtCursor(text) {
    const ta = el.input;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const v = ta.value;
    ta.value = v.slice(0, start) + text + v.slice(end);
    const pos = start + text.length;
    ta.selectionStart = ta.selectionEnd = pos;
    ta.focus();
    refresh();
  }

  function buildCheat() {
    CHEAT_CONS.forEach(function (pair) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "key";
      b.innerHTML = "<b>" + pair[1] + "</b><i>" + pair[0] + "</i>";
      b.addEventListener("click", function () {
        insertAtCursor(pair[0]);
      });
      el.consRow.appendChild(b);
    });
    CHEAT_VOW.forEach(function (pair) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "key";
      b.innerHTML = "<b>" + pair[1] + "</b><i>" + pair[0] + "</i>";
      b.addEventListener("click", function () {
        insertAtCursor(pair[0]);
      });
      el.vowelRow.appendChild(b);
    });
  }

  function buildWall() {
    PADYAMS.forEach(function (p) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "verse";
      btn.dataset.id = p.id;
      btn.innerHTML =
        '<p class="source">' +
        p.source +
        "</p><p class=\"lines\"><span class=\"line-write\">" +
        p.lines[0] +
        "</span>" +
        p.lines.slice(1).join("\n") +
        "</p><p class=\"gloss\">" +
        p.gloss +
        "</p>";
      btn.addEventListener("click", function () {
        el.input.value = p.lines.join("\n");
        refresh({ ink: true });
        el.poster.scrollIntoView({ behavior: motionOk() ? "smooth" : "auto", block: "center" });
      });
      el.verses.appendChild(btn);
    });
  }

  function observeWall() {
    if (!motionOk() || !el.wall || !("IntersectionObserver" in window)) return;
    el.wall.classList.add("observe-on");
    const cards = el.wall.querySelectorAll(".verse");
    function reveal(card) {
      card.classList.add("in-view");
    }
    function revealVisible() {
      cards.forEach(function (card) {
        if (card.classList.contains("in-view")) return;
        const r = card.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) reveal(card);
      });
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px" }
    );
    cards.forEach(function (card) {
      io.observe(card);
    });
    revealVisible();
    window.addEventListener("scroll", revealVisible, { passive: true });
    window.addEventListener("resize", revealVisible);
  }

  function renderStrip() {
    el.strip.textContent = "";
    const clusters = segmentGraphemes(telugu).filter(function (g) {
      return g !== " " && g !== "\n" && g !== "\t";
    });
    if (!clusters.length) {
      el.tiles.hidden = true;
      return;
    }
    clusters.forEach(function (g, idx) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ak" + (selectedCluster === g + "#" + idx ? " on" : "");
      b.textContent = g;
      b.addEventListener("click", function () {
        selectedCluster = g + "#" + idx;
        showTiles(g);
        renderStrip();
      });
      el.strip.appendChild(b);
    });
  }

  function showTiles(g) {
    const parts = analyzeCluster(g);
    el.tiles.hidden = false;
    el.tiles.textContent = "";
    el.tiles.classList.remove("burst");
    parts.forEach(function (t) {
      const div = document.createElement("div");
      div.className = "tile";
      const ch = document.createElement("span");
      ch.className = "ch";
      ch.textContent = t.char;
      const role = document.createElement("span");
      role.className = "role";
      role.textContent = t.role;
      const hex = document.createElement("span");
      hex.className = "hex";
      hex.textContent = t.hex;
      div.appendChild(ch);
      div.appendChild(role);
      div.appendChild(hex);
      el.tiles.appendChild(div);
    });
    if (motionOk()) replayClass(el.tiles, "burst");
  }

  /* ---------- poster drawing ---------- */

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

  function drawCinemaBg(c, w, h) {
    const g = c.createRadialGradient(w / 2, h * 0.42, 40, w / 2, h * 0.5, w * 0.78);
    g.addColorStop(0, "#3a1410");
    g.addColorStop(0.55, "#1a0a0a");
    g.addColorStop(1, "#090506");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    c.strokeStyle = "#c9a227";
    c.lineWidth = 14;
    c.strokeRect(36, 36, w - 72, h - 72);
    c.strokeStyle = "#c23b22";
    c.lineWidth = 3;
    c.strokeRect(54, 54, w - 108, h - 108);
    c.strokeStyle = "rgba(243, 215, 138, 0.35)";
    c.lineWidth = 1;
    c.strokeRect(66, 66, w - 132, h - 132);
    // corner ornaments
    c.strokeStyle = "#e8c547";
    c.lineWidth = 3;
    [
      [80, 80],
      [w - 80, 80],
      [80, h - 80],
      [w - 80, h - 80],
    ].forEach(function (p, i) {
      c.save();
      c.translate(p[0], p[1]);
      c.rotate((i % 2 === 0 ? 1 : -1) * (i < 2 ? 0 : Math.PI));
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(48, 0);
      c.moveTo(0, 0);
      c.lineTo(0, 48);
      c.stroke();
      c.beginPath();
      c.arc(0, 0, 10, 0, Math.PI * 2);
      c.stroke();
      c.restore();
    });
  }

  function drawLiteraryBg(c, w, h) {
    c.fillStyle = "#f7f1e5";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#1e3354";
    c.fillRect(0, 0, w, 22);
    c.fillStyle = "#c23b22";
    c.fillRect(0, 22, w, 8);
    c.fillStyle = "#d4a017";
    c.fillRect(0, 30, w, 4);
    c.fillStyle = "#c23b22";
    c.fillRect(48, 70, 7, h - 140);
    c.strokeStyle = "#1e3354";
    c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(80, 118);
    c.lineTo(w - 70, 118);
    c.stroke();
    c.fillStyle = "#1e3354";
    c.font = '600 28px "Noto Serif Telugu"';
    c.textAlign = "left";
    c.fillText("అక్షరం", 88, 104);
    c.font = 'italic 500 26px "EB Garamond"';
    c.fillText("a page from the type lab", 210, 104);
    c.fillStyle = "#c23b22";
    c.fillRect(0, h - 28, w, 28);
  }

  function kalamkariMotif(c, x, y, s, color) {
    c.save();
    c.translate(x, y);
    c.strokeStyle = color;
    c.lineWidth = Math.max(1.5, s / 12);
    c.beginPath();
    c.ellipse(0, 0, s * 0.55, s, 0, 0, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.ellipse(0, -s * 0.1, s * 0.28, s * 0.55, 0, 0, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.moveTo(0, s);
    c.quadraticCurveTo(s * 0.4, s * 1.35, 0, s * 1.55);
    c.quadraticCurveTo(-s * 0.4, s * 1.35, 0, s);
    c.stroke();
    c.restore();
  }

  function drawKalamkariBg(c, w, h) {
    c.fillStyle = "#f3e6c8";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#1e3354";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#f3e6c8";
    c.fillRect(28, 28, w - 56, h - 56);
    c.fillStyle = "#9b2c16";
    c.fillRect(40, 40, w - 80, h - 80);
    c.fillStyle = "#f3e6c8";
    c.fillRect(54, 54, w - 108, h - 108);
    c.strokeStyle = "#1e3354";
    c.lineWidth = 3;
    c.strokeRect(68, 68, w - 136, h - 136);
    const dots = 22;
    c.fillStyle = "#1e3354";
    for (let i = 0; i < dots; i++) {
      const t = (i + 0.5) / dots;
      c.beginPath();
      c.arc(90 + t * (w - 180), 90, 4, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.arc(90 + t * (w - 180), h - 90, 4, 0, Math.PI * 2);
      c.fill();
    }
    kalamkariMotif(c, 130, 160, 28, "#c23b22");
    kalamkariMotif(c, w - 130, 160, 28, "#c23b22");
    kalamkariMotif(c, 130, h - 170, 28, "#1e3354");
    kalamkariMotif(c, w - 130, h - 170, 28, "#1e3354");
  }

  const BG_DRAW = {
    palm: drawPalmBg,
    cinema: drawCinemaBg,
    literary: drawLiteraryBg,
    kalamkari: drawKalamkariBg,
  };

  function getBg(name, w, h) {
    const key = name + w + "x" + h;
    if (bgCache[key]) return bgCache[key];
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    BG_DRAW[name](cv.getContext("2d"), w, h);
    bgCache[key] = cv;
    return cv;
  }

  function wrapLines(c, text, font, maxWidth) {
    c.font = font;
    const paragraphs = String(text).split(/\n/);
    const lines = [];
    paragraphs.forEach(function (para) {
      if (para === "") {
        lines.push("");
        return;
      }
      const clusters = segmentGraphemes(para);
      let line = "";
      clusters.forEach(function (g) {
        const trial = line + g;
        if (c.measureText(trial).width <= maxWidth || !line) {
          line = trial;
        } else {
          lines.push(line);
          line = g === " " ? "" : g;
        }
      });
      if (line !== "") lines.push(line);
    });
    return lines;
  }

  function fitAndDrawText(c, text, style, w, h) {
    const preset = STYLES[style];
    const marginX = style === "literary" ? 100 : 120;
    const marginTop = style === "literary" ? 160 : 170;
    const marginBot = 140;
    const maxW = w - marginX * 2;
    const maxH = h - marginTop - marginBot;
    const family = preset.font;
    let lo = 28;
    let hi = text.length < 12 ? 168 : text.length < 40 ? 120 : 84;
    let best = lo;
    let bestLines = wrapLines(c, text, preset.weight + " " + lo + "px " + family, maxW);
    for (let k = 0; k < 12; k++) {
      const mid = Math.floor((lo + hi) / 2);
      const font = preset.weight + " " + mid + "px " + family;
      const lines = wrapLines(c, text, font, maxW);
      const lh = mid * 1.72;
      if (lines.length * lh <= maxH && lines.every(function (ln) {
        c.font = font;
        return c.measureText(ln).width <= maxW + 1;
      })) {
        best = mid;
        bestLines = lines;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    const font = preset.weight + " " + best + "px " + family;
    c.font = font;
    c.fillStyle = preset.fg;
    c.textAlign = preset.align;
    c.textBaseline = "alphabetic";
    const lh = best * 1.72;
    const blockH = bestLines.length * lh;
    let x = preset.align === "left" ? marginX : w / 2;
    if (style === "literary") x = 100;
    let y = marginTop + (maxH - blockH) / 2 + best * 0.85;
    bestLines.forEach(function (ln) {
      c.fillText(ln, x, y);
      y += lh;
    });

    // colophon
    c.textAlign = "center";
    if (style === "cinema") {
      c.fillStyle = "rgba(243, 215, 138, 0.7)";
      c.font = '400 28px "Ramabhadra", "Noto Serif Telugu"';
    } else if (style === "literary") {
      c.fillStyle = "#1e3354";
      c.font = '500 26px "Noto Serif Telugu"';
    } else if (style === "kalamkari") {
      c.fillStyle = "#9b2c16";
      c.font = '600 26px "Noto Serif Telugu"';
    } else {
      c.fillStyle = "#6b4423";
      c.font = '600 26px "Noto Serif Telugu"';
    }
    c.fillText("అక్షరం", w / 2, h - 72);
  }

  function drawPoster(opts) {
    const w = el.poster.width;
    const h = el.poster.height;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(getBg(styleName, w, h), 0, 0);
    const text = telugu.trim() || "అక్షరం";
    if (!fontsReady) {
      ctx.fillStyle = STYLES[styleName].fg;
      ctx.font = '600 48px "Noto Serif Telugu", serif';
      ctx.textAlign = "center";
      ctx.fillText(text, w / 2, h / 2);
    } else {
      fitAndDrawText(ctx, text, styleName, w, h);
    }
    const wantsSettle = !firstPoster && motionOk() && !(opts && opts.silent);
    if (wantsSettle) {
      if (opts && opts.forceSettle) replayClass(el.poster, "settle");
      else if (!el.poster.classList.contains("settle")) replayClass(el.poster, "settle");
    }
    firstPoster = false;
  }

  function renderLive(text, opts) {
    const gs = segmentGraphemes(text);
    const prev = lastLive;
    let mismatch = 0;
    while (mismatch < gs.length && mismatch < prev.length && gs[mismatch] === prev[mismatch]) {
      mismatch += 1;
    }
    const bulk = opts && opts.bulk;
    el.live.textContent = "";
    let delayI = 0;
    gs.forEach(function (g, i) {
      if (g === "\n") {
        el.live.appendChild(document.createElement("br"));
        return;
      }
      const span = document.createElement("span");
      span.className = "live-ak";
      span.textContent = g;
      const changed = i >= mismatch;
      if (changed && g !== " " && motionOk()) {
        span.classList.add("ink-in");
        if (bulk) {
          span.classList.add("ink-d" + Math.min(delayI, 15));
          delayI += 1;
        }
      }
      el.live.appendChild(span);
    });
    lastLive = gs;
  }

  function refresh(opts) {
    telugu = teluguOf(el.input.value);
    const bulk = !!(opts && opts.ink);
    renderLive(telugu, { bulk: bulk });
    selectedCluster = null;
    el.tiles.hidden = true;
    el.tiles.classList.remove("burst");
    renderStrip();
    const opening = firstPoster;
    drawPoster();
    if (bulk && motionOk() && el.posterFrame && !opening) {
      replayClass(el.posterFrame, "spread");
    }
  }

  function toast(msg) {
    el.toast.hidden = false;
    el.toast.textContent = msg;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.toast.hidden = true;
    }, 2200);
  }

  function copyTelugu() {
    const t = telugu;
    if (!t) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(
        function () {
          toast("కాపీ అయింది · Copied");
        },
        fallbackCopy
      );
    } else fallbackCopy();
    function fallbackCopy() {
      const ta = document.createElement("textarea");
      ta.value = t;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        toast("కాపీ అయింది · Copied");
      } catch (e) {
        toast(t);
      }
      document.body.removeChild(ta);
    }
  }

  async function downloadPng() {
    await waitFonts();
    drawPoster();
    // tofu check: measure a known letter
    ctx.save();
    ctx.font = '700 80px "Noto Serif Telugu"';
    const width = ctx.measureText("శ్రీ").width;
    ctx.restore();
    if (width < 20) {
      toast("ఫాంట్ లోడ్ కాలేదు · font not ready, try again");
      return;
    }
    const a = document.createElement("a");
    a.download = "aksharam-poster.png";
    a.href = el.poster.toDataURL("image/png");
    a.click();
    toast("పోస్టరు దిగింది · PNG saved");
  }

  async function waitFonts() {
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      if (document.fonts && document.fonts.load) {
        await Promise.all([
          document.fonts.load('700 80px "Noto Serif Telugu"'),
          document.fonts.load('400 80px "Noto Sans Telugu"'),
          document.fonts.load('400 80px "Ramabhadra"'),
          document.fonts.load('600 48px "EB Garamond"'),
        ]);
      }
    } catch (e) {}
    fontsReady = true;
  }

  function bind() {
    el.input.addEventListener("input", refresh);
    document.querySelectorAll(".style").forEach(function (b) {
      b.addEventListener("click", function () {
        styleName = b.getAttribute("data-style");
        document.querySelectorAll(".style").forEach(function (x) {
          x.classList.toggle("on", x === b);
        });
        if (el.posterFrame) el.posterFrame.setAttribute("data-style", styleName);
        drawPoster({ forceSettle: true });
      });
    });
    document.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        const v = b.getAttribute("data-insert");
        if (v.indexOf("verse:") === 0) {
          const id = v.slice(6);
          const p = PADYAMS.filter(function (x) {
            return x.id === id;
          })[0];
          if (p) el.input.value = p.lines.join("\n");
        } else {
          el.input.value = v;
        }
        refresh({ ink: true });
      });
    });
    el.copyBtn.addEventListener("click", copyTelugu);
    el.pngBtn.addEventListener("click", function () {
      downloadPng();
    });
    document.addEventListener("visibilitychange", function () {
      document.body.classList.toggle("tab-hidden", document.hidden);
    });
    el.poster.addEventListener("animationend", function (e) {
      if (e.animationName === "paper-settle") el.poster.classList.remove("settle");
    });
    el.posterFrame.addEventListener("animationend", function (e) {
      if (e.animationName === "ink-spread") el.posterFrame.classList.remove("spread");
    });
  }

  function initTrail() {
    if (!trailOk()) return;
    const canvas = document.createElement("canvas");
    canvas.id = "ak-trail";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const tctx = canvas.getContext("2d");
    const SIGNS = ["ా", "ి", "ీ", "ు", "ూ", "ె", "ే", "ై", "ొ", "ో", "ం"];
    const particles = [];
    let running = false;
    let lastX = 0;
    let lastY = 0;
    let lastSpawn = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn(x, y) {
      particles.push({
        x: x,
        y: y,
        ch: SIGNS[(Math.random() * SIGNS.length) | 0],
        life: 1,
        rot: (Math.random() - 0.5) * 0.8,
        size: 14 + Math.random() * 8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: 0.12 + Math.random() * 0.25,
      });
      if (particles.length > 22) particles.shift();
    }

    function tick() {
      running = true;
      if (document.hidden || !trailOk()) {
        tctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.length = 0;
        running = false;
        return;
      }
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      tctx.textAlign = "center";
      tctx.textBaseline = "middle";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.018;
        p.x += p.vx;
        p.y += p.vy;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        tctx.save();
        tctx.translate(p.x, p.y);
        tctx.rotate(p.rot * (1 - p.life));
        tctx.globalAlpha = Math.max(0, p.life * 0.42);
        tctx.fillStyle = i % 2 ? "#c23b22" : "#1e3354";
        tctx.font = "500 " + p.size + 'px "Noto Serif Telugu", serif';
        tctx.fillText(p.ch, 0, 0);
        tctx.restore();
      }
      if (particles.length) {
        requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        if (!trailOk() || e.pointerType === "touch") return;
        const tag = e.target && e.target.tagName;
        if (tag === "TEXTAREA" || tag === "INPUT") return;
        const now = performance.now();
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (now - lastSpawn < 48 && dx * dx + dy * dy < 900) return;
        lastSpawn = now;
        lastX = e.clientX;
        lastY = e.clientY;
        spawn(e.clientX, e.clientY);
        if (!running) requestAnimationFrame(tick);
      },
      { passive: true }
    );
  }

  function runSelfTest() {
    const t = window.AksharamTranslit;
    if (!t) return;
    const cases = [
      ["amma", "అమ్మ"],
      ["nenu", "నేను"],
      ["telugu", "తెలుగు"],
      ["padam", "పదం"],
      ["sri", "శ్రీ"],
      ["kaa", "కా"],
      ["kki", "క్కి"],
      ["ksha", "క్ష"],
    ];
    const failed = cases.filter(function (c) {
      return t.transliterate(c[0]) !== c[1];
    });
    if (failed.length) {
      console.error("Aksharam translit failures", failed);
    } else {
      console.info("Aksharam translit: all required tests passed");
    }
  }

  buildCheat();
  buildWall();
  bind();
  observeWall();
  initTrail();
  runSelfTest();
  el.input.value = "telugu";
  refresh({ ink: true });
  waitFonts().then(function () {
    drawPoster({ silent: true });
  });
})();
