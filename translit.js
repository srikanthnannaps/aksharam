/**
 * Aksharam — ITRANS-style Telugu transliteration.
 * Case-sensitive ITRANS (A/I/U/E/O, T/D/N, Sh, M, H) plus a few
 * Telugu-friendly conveniences: word-final m → anusvara, sri → శ్రీ,
 * and a tiny phonetic lexicon so everyday spellings like nenu work.
 */
(function (root) {
  "use strict";

  const PHONETIC = {
    nenu: "నేను",
    neenu: "నేను",
    telugu: "తెలుగు",
    amma: "అమ్మ",
    padam: "పదం",
    sri: "శ్రీ",
    shri: "శ్రీ",
    sree: "శ్రీ",
    book: "బుక్",
    house: "హౌస్",
    navodaya: "నవోదయ",
  };

  // Longest-first consonant keys. Values are one or more Telugu letters
  // (conjunct units like క్ష already include virama).
  const CONS = sortPairs([
    ["ksh", "క్ష"],
    ["kSh", "క్ష"],
    ["x", "క్ష"],
    ["j~n", "జ్ఞ"],
    ["jNY", "జ్ఞ"],
    ["GY", "జ్ఞ"],
    ["jn", "జ్ఞ"],
    ["chh", "ఛ"],
    ["shh", "ష"],
    ["kh", "ఖ"],
    ["gh", "ఘ"],
    ["Ch", "ఛ"],
    ["CH", "ఛ"],
    ["jh", "ఝ"],
    ["th", "థ"],
    ["dh", "ధ"],
    ["ph", "ఫ"],
    ["bh", "భ"],
    ["sh", "శ"],
    ["Sh", "ష"],
    ["Th", "ఠ"],
    ["DH", "ఢ"],
    ["Dh", "ఢ"],
    ["~N", "ఙ"],
    ["ng", "ఙ"],
    ["~n", "ఞ"],
    ["ch", "చ"],
    ["kh", "ఖ"],
    ["k", "క"],
    ["g", "గ"],
    ["j", "జ"],
    ["T", "ట"],
    ["D", "డ"],
    ["N", "ణ"],
    ["t", "త"],
    ["d", "ద"],
    ["n", "న"],
    ["p", "ప"],
    ["b", "బ"],
    ["m", "మ"],
    ["y", "య"],
    ["r", "ర"],
    ["l", "ల"],
    ["L", "ళ"],
    ["v", "వ"],
    ["w", "వ"],
    ["s", "స"],
    ["h", "హ"],
    ["R", "ఱ"],
    ["f", "ఫ"],
    ["c", "చ"],
  ]);

  // Independent vowels (start of a syllable).
  const IND = sortPairs([
    ["RRI", "ౠ"],
    ["RRi", "ఋ"],
    ["R^I", "ౠ"],
    ["R^i", "ఋ"],
    ["LLi", "ఌ"],
    ["ai", "ఐ"],
    ["au", "ఔ"], ["ou", "ఔ"], ["ow", "ఔ"],
    ["aa", "ఆ"],
    ["ii", "ఈ"],
    ["uu", "ఊ"],
    ["ee", "ఏ"],
    ["oo", "ఓ"],
    ["A", "ఆ"],
    ["I", "ఈ"],
    ["U", "ఊ"],
    ["E", "ఏ"],
    ["O", "ఓ"],
    ["a", "అ"],
    ["i", "ఇ"],
    ["u", "ఉ"],
    ["e", "ఎ"],
    ["o", "ఓ"],
  ]);

  // Dependent vowel signs. Inherent 'a' is empty.
  const DEP = sortPairs([
    ["RRI", "ౄ"],
    ["RRi", "ృ"],
    ["R^I", "ౄ"],
    ["R^i", "ృ"],
    ["ai", "ై"],
    ["au", "ౌ"], ["ou", "ౌ"], ["ow", "ౌ"],
    ["aa", "ా"],
    ["ii", "ీ"],
    ["uu", "ూ"],
    ["ee", "ే"],
    ["oo", "ో"],
    ["A", "ా"],
    ["I", "ీ"],
    ["U", "ూ"],
    ["E", "ే"],
    ["O", "ో"],
    ["a", ""],
    ["i", "ి"],
    ["u", "ు"],
    ["e", "ె"],
    ["o", "ో"],
  ]);

  function sortPairs(pairs) {
    return pairs
      .slice()
      .sort((a, b) => b[0].length - a[0].length || a[0].localeCompare(b[0]));
  }

  function match(table, s, i) {
    for (let p = 0; p < table.length; p++) {
      const k = table[p][0];
      if (s.startsWith(k, i)) return { k: k, v: table[p][1], len: k.length };
    }
    return null;
  }

  function preprocessEnglish(s) {
    s = s.replace(/oo([kgt])$/i, "u$1");
    s = s.replace(/([oO][uUwW])([bcdfgklmnprstvwxz])[eE]$/g, "$1$2");
    return s;
  }

  function isAnusvara(s, i) {
    if (s[i] === "M") return 1;
    if (s.startsWith(".n", i) || s.startsWith(".m", i)) return 2;
    return 0;
  }

  function convertWord(raw) {
    if (!raw) return raw;
    const key = raw.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(PHONETIC, key)) {
      return PHONETIC[key];
    }

    // Whole-word sri / shrI already in PHONETIC; also fold shrI-style inside ITRANS below.
    let i = 0;
    let out = "";
    const s = preprocessEnglish(raw);

    while (i < s.length) {
      // Explicit anusvara / visarga / halant at this position (rare but valid).
      const an = isAnusvara(s, i);
      if (an) {
        out += "ం";
        i += an;
        continue;
      }
      if (s[i] === "H") {
        out += "ః";
        i += 1;
        continue;
      }
      if (s.startsWith(".h", i)) {
        out += "్";
        i += 2;
        continue;
      }

      const cons = match(CONS, s, i);
      if (cons) {
        i += cons.len;

        if (s.startsWith(".h", i)) {
          out += cons.v + "్";
          i += 2;
          continue;
        }

        const an2 = isAnusvara(s, i);
        if (an2) {
          out += cons.v + "ం";
          i += an2;
          continue;
        }
        if (s[i] === "H") {
          out += cons.v + "ః";
          i += 1;
          continue;
        }

        const vow = match(DEP, s, i);
        if (vow) {
          out += cons.v + vow.v;
          i += vow.len;
          const an3 = isAnusvara(s, i);
          if (an3) {
            out += "ం";
            i += an3;
          } else if (s[i] === "H") {
            out += "ః";
            i += 1;
          }
          continue;
        }

        // No vowel: conjunct, word-final m → anusvara, or inherent a.
        const nextCons = match(CONS, s, i);
        if (nextCons) {
          out += cons.v + "్";
          continue;
        }
        if (i >= s.length && cons.k === "m") {
          out += "ం";
          continue;
        }
        if (i >= s.length) {
          out += cons.v + "్";
          continue;
        }
        out += cons.v; // inherent a
        continue;
      }

      const ind = match(IND, s, i);
      if (ind) {
        out += ind.v;
        i += ind.len;
        const an4 = isAnusvara(s, i);
        if (an4) {
          out += "ం";
          i += an4;
        } else if (s[i] === "H") {
          out += "ః";
          i += 1;
        }
        continue;
      }

      out += s[i];
      i += 1;
    }

    return out;
  }

  function transliterate(text) {
    if (!text) return "";
    // Latin ITRANS runs only; Telugu, punctuation, digits, spaces stay.
    return String(text).replace(/[A-Za-z~.^+]+/g, convertWord);
  }

  const API = {
    transliterate: transliterate,
    convertWord: convertWord,
    PHONETIC: PHONETIC,
  };

  root.AksharamTranslit = API;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = API;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
