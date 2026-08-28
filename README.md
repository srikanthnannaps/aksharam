# అక్షరం · Aksharam

A Telugu type lab and poster toy. Type English, get Telugu posters and padyams. One static page. No login, no analytics, no payments.

## Open it

From this folder:

```bash
# any static server, e.g.
python3 -m http.server 8765
```

Then open [http://localhost:8765](http://localhost:8765).

Or open `index.html` directly in a browser. Google Fonts must load (Noto Serif Telugu, Noto Sans Telugu, Ramabhadra) so Telugu is not tofu.

## Transliteration tests

Type these ITRANS-style words in the box. Live Telugu must be:

| Type     | Telugu |
|----------|--------|
| `amma`   | అమ్మ |
| `nenu`   | నేను |
| `telugu` | తెలుగు |
| `padam`  | పదం |
| `sri`    | శ్రీ |
| `kaa`    | కా |
| `kki`    | క్కి |
| `ksha`   | క్ష |
| `kaM`    | కం |

Also: `nEnu` / `neenu` → నేను, `shrI` → శ్రీ, `M` → ం (anusvara), `.h` → ్ (halant).

Cheat sheet on the page: ka kha ga gha nga, vowels a aa i ii u uu e ee ai o oo au, M H.

Paste real Telugu anytime; it is left alone. Click a padyam to drop it on the poster. Tap a syllable in the explode strip to see హల్లు / గుణింతం / వత్తు / అనుస్వారం tiles.

## Files

- `index.html` — page
- `styles.css` — palm-leaf / temple-mural chrome
- `translit.js` — ITRANS-style engine
- `app.js` — poster canvas, padyam wall, PNG download

Padyams are traditional public-domain lines from Vemana Śatakam and Sumati Śatakam (Baddena).
