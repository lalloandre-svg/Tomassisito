# CAOS Caffè · sito · istruzioni

Per chi aggiorna il sito senza essere sviluppatore. Il menù online è su **caoscaffe.com/menu** (è il link del QR: non va mai cambiato).

Tutto quello che cambia spesso sta in tre file della cartella `data/`:

| File | Cosa contiene |
|---|---|
| `data/menu.json` | sezioni, piatti, prezzi, allergeni |
| `data/info.json` | indirizzo, telefono, email, orari estate/inverno |
| `data/oggi.json` | i caffè specialty di oggi ("oggi in macchina") |

Si modificano anche da GitHub, dal browser: apri il file, clicca la matita ✏️, cambia, poi **Commit changes**. Se l'hosting è collegato (vedi sotto), il sito si aggiorna da solo in un paio di minuti.

---

## Cambiare un prezzo
In `data/menu.json` cerca il nome del piatto e cambia `"prezzo"`:
```json
"nome": "WAFFLE",
"prezzo": "5,8",
```
- Usa **la virgola**: `"5,8"`, non `"5.8"`. Niente simbolo €.
- "a partire da" → aggiungi `"da": true`.

## Togliere un piatto
Cancella tutto il blocco tra `{` e `}` del piatto, **compresa la virgola** che lo separa dal successivo. Se la build dà errore, di solito è una virgola in più o in meno.

Per toglierlo solo per un periodo, è più semplice cambiare la descrizione o chiedere a chi gestisce il sito.

## Aggiungere un piatto
Copia un piatto simile e cambia i campi:
```json
{
  "nome": "NOME IN MAIUSCOLO",
  "veg": true,
  "desc": {
    "it": "Una frase. I fornitori tra asterischi: *PEPPOVO*",
    "en": "One sentence. Suppliers between asterisks: *PEPPOVO*"
  },
  "prezzo": "9",
  "allergeni": [1, 3, 7]
}
```
- `veg` solo se è vegano. `"senza_glutine": true` se è senza glutine.
- Il nome resta uguale in italiano e in inglese. Se contiene la A rovesciata del marchio, scrivila `∀` (es. `ADD SOME C∀OS`).
- Tono: si dà del tu, frasi corte, un fatto e non un aggettivo (vedi `CLAUDE.md` §2).

## Allergeni
Numeri da 1 a 14 (la legenda è in fondo alla pagina):
1 Glutine · 2 Crostacei · 3 Uova · 4 Pesce · 5 Arachidi · 6 Soia · 7 Latte · 8 Frutta a guscio · 9 Sedano · 10 Senape · 11 Sesamo · 12 Solfiti · 13 Lupini · 14 Molluschi

- `"allergeni": []` = nessuno.
- Se dipende dalla farcia o dal gusto: `"allergeni_nota": { "it": "+ farcia: chiedi", "en": "+ filling: ask" }`.
- **Allergeni non ancora confermati dalla cucina**: aggiungi `"verificato": false`. Online escono con "(da confermare in cucina, chiedi)". Quando la cucina conferma, togli quella riga.

Oggi sono da confermare: **Sesame Street** (11), **Damn Good Fries** (salsa), **Marocchino** (7).

## Oggi in macchina (specialty del giorno)
In `data/oggi.json`:
```json
{
  "data": "2026-09-29",
  "caffe": [
    { "metodo": "Espresso", "caffe": "Nome", "origine": "Paese, regione", "note": "due o tre note" },
    { "metodo": "Filtro", "caffe": "Nome", "origine": "Paese" }
  ]
}
```
La `data` deve essere quella di oggi (anno-mese-giorno), altrimenti online compare "Quelli di oggi sono sul foglio del giorno. Chiedi al banco.". Così un foglio vecchio non resta mai in pagina.

Nota: la pagina si rigenera a ogni modifica. Se aggiorni `oggi.json` la sera prima con la data di domani, la lista compare solo dopo la mezzanotte (lo gestisce il telefono di chi guarda).

## Orari estate / inverno
In `data/info.json` cambia `"orario_attivo"` in `"estate"` o `"inverno"`. Si aggiornano da soli il piede della pagina, la striscia "Adesso in cucina" e i dati per Google.
Le fasce del menù (Brunch 8–15 ecc.) sono in `data/menu.json`, in ogni sezione: `"orario"` (il testo) e `"fascia_oraria"` (per la striscia "adesso").

## Drink list
È già in `data/menu.json` con `"draft": true`: **non compare online**. Quando è pronta, completa le voci e cancella la riga `"draft": true`.

---

## Per chi sviluppa

```
data/          menu.json, info.json, oggi.json  ← i dati
public/        file copiati così come sono (css, js, font, immagini, _redirects)
build.mjs      genera dist/menu/index.html e dist/en/menu/index.html
dist/          il sito pronto (non va nel repository)
CLAUDE.md      brief completo del progetto
```

- Build: `node build.mjs` (Node 18+, nessuna dipendenza). Se un prezzo o un allergene non è valido, la build si ferma e dice dove. In fondo elenca cosa controllare prima di pubblicare.
- Anteprima: `npm run serve`.
- Hosting: Netlify (c'è `netlify.toml`) o Cloudflare Pages con comando `node build.mjs` e cartella `dist`. `/menu` è servito da `dist/menu/index.html`, quindi l'URL pulito funziona senza rewrite.
- Il menù si legge anche con JavaScript spento. `js/menu.js` aggiunge filtri, striscia "adesso", scadenza di "oggi in macchina" e il ripiego se Caos Mano non carica.

### Mancano ancora (da copiare dal Mac)
- `public/fonts/`: Caos Mano e Source Code Pro (vedi `public/fonts/LEGGIMI.md`).
- `public/img/logo-caos.svg` (logo ufficiale, versione positiva), `public/img/favicon.svg`, `public/img/og-menu.jpg` (1200×630, per le anteprime nei social).
- Le altre pagine del sito attuale (`index.html`, `caffe.html`, …) vanno in `public/`: vedi `CLAUDE.md` §8.
