# Font

| File | Font | Note |
|---|---|---|
| `CaosMano-Regular.woff2`, `CaosMano-Bold.woff2` | Caos Mano | font del brand, disegnato da Andrè |
| `SourceCodePro-VF.woff`, `SourceCodePro-Italic-VF.woff` | Source Code Pro variabile (pesi 200–900) | licenza OFL, vedi `SourceCodePro-OFL.txt` |

I WOFF di Source Code Pro sono generati dai TTF di Google Fonts con `node tools/ttf2woff.mjs file.ttf file.woff`.
Miglioria possibile: versioni WOFF2 solo con i caratteri latini (circa 30 KB l'uno invece di 100): servono `fonttools` e `brotli` (`pyftsubset`).
