# CAOS Caffè — brief per lo sviluppo del sito

> File di contesto per Claude Code. Mettilo nella radice di `caos-site/` come `CLAUDE.md`: viene letto in automatico a ogni sessione.
> Aggiornato al 28/09/2026. Fonti: Brand Manual v2 (ago 2026, **prevale**), menù nuovo (file di lavoro giro 41–45), memoria progetto CAOS.

---

## 0. Il compito

Rifare/completare il sito di **CAOS Caffè** (caoscaffe.com): bar-caffetteria-cucina ad Aprilia, aperto dal 1969, con torrefazione di famiglia (Tomassicoffee).

Obiettivi, in ordine:
1. **Menù online** su `caoscaffe.com/menu` — è la destinazione del QR stampato sulla carta. Deve essere completo, con **allergeni**, sempre aggiornabile senza ristampare. Priorità assoluta.
2. Sito vetrina: chi siamo, caffè, cornetteria, locale, orari/contatti, come arrivare.
3. Mobile-first: la maggior parte delle visite arriva dal QR al tavolo.
4. Italiano principale, inglese secondario (selettore IT/EN già presente).

Esiste già una base: `~/Desktop/Claude code/caos-site/` (vedi §8). Si parte da lì, non da zero.

---

## 1. Dati del locale

| | |
|---|---|
| Nome | **Caos Caffè** (marchio: CAOS, con la A rovesciata **∀** nel logo) · est. 1969 |
| Indirizzo | Via G. Verdi 24, 04011 Aprilia (LT) |
| Sito | www.caoscaffe.com |
| Email | **info@caoscaffe.com** (il sito attuale usa `ciao@caoscaffe.com` → da correggere) |
| Telefono | +39 06 928 1900 |
| Instagram | @caoscaffe.aprilia |
| Facebook | /caos.caffe |
| Orari (brand manual) | Inverno 7:00 → 22:00 · Estate 8:00 → 15:00 e 16:00 → 22:00 · **Chiuso il mercoledì** |
| Payoff | **Sempre presenti, sempre umani.** (firma istituzionale, non ripeterla ovunque) |
| Frase dell'insegna | **CAOS necessario.** |

Fasce orarie del menù (carta nuova):
- Brunch 8:00–15:00
- All day 7:00–22:00
- Hungry? solo a pranzo, 12:00–15:00
- Social! (aperitivo) dalle 16:00, ultimi ordini 21:30 — *nel file di lavoro compare anche "16:00–21:00": da confermare*

Metti orari, contatti e fasce in **un solo file dati** (es. `data/info.json`) e leggili da lì ovunque: footer, pagina locale, striscia "adesso", schema.org.

---

## 2. Brand: regole vincolanti

### Posizionamento
- "Il posto di Aprilia dove la qualità non è un'occasione speciale: è quello che trovi ogni giorno."
- Tensione di marca: **fuori sembra caos, dentro c'è ricerca, cura e qualità.**
- Mai affermazioni di unicità ("l'unico posto", "il migliore").
- Target 25–40 anni, curioso, appassionato di caffè; il cliente storico resta.

### Tono di voce
- Si dà del **tu**, sempre.
- Frasi corte. Più di due virgole → spezza.
- Mai il condizionale di cortesia: "Prova questo", non "potresti provare".
- **Un fatto, non un aggettivo**: "arriva dal Guatemala", non "eccezionale".
- Chiudi con un invito: "Per il resto, chiedi."
- Nomi prodotto anche in inglese (la battuta sta nel nome); **tutto il resto in italiano**. "L'inglese è un ingrediente, non una lingua."
- Prezzo dichiarato senza scusarsi: "Costa più di un caffè normale perché il caffè costa più del normale. Assaggialo, poi decidi."
- Parole sì: caos, vivo, pausa, persone, incontro, reale, fermarsi, quotidiano, scelta, scoperta, flusso, fatto, chiedi, assaggia, prova.
- Parole **vietate**: luxury, gourmet, eccellenza, esperienza unica, location, cliente al centro, qualità e cortesia, veloce, rapido, efficiente, imperdibile, esclusivo. Non usare "velocità" e "abitudine" come descrizione.
- Niente "il nostro …" nelle descrizioni prodotto.
- **Niente claim salutistici** (curcuma, matcha ecc.: sono regolati per legge).
- "Confettura", non "marmellata". "**Piatti aperitivo**", mai "taglieri".
- "**Cornetteria, non pasticceria**": lievitati fatti qui, sfoglia di due giorni, burro vero, niente surgelati. "Finito. Torna domani."

Claim ufficiali (uno per pagina/materiale, non accumularli):
"Facciamo poche cose e le abbiamo assaggiate tutte." · "Sì, costa un po' di più." · "Da noi si viene con calma." · "Dietro il CAOS c'è metodo." · "Tutti parlano. Noi prepariamo." · "La qualità non fa rumore, si sente." (claim della nuova copertina, in prova)

### Logo
- Segno = V60 capovolto + tazzina-cappello + baffo-cornetto. La **A rovesciata è voluta**. "est. 1969" sempre col marchio.
- Versioni: positiva (nero + segno arancio) su chiaro · negativa su scuro · su arancio senza riempimento arancio · solo logotipo per dimensioni piccole.
- **Vietato**: deformare, ruotare, ricolorare, effetti/ombre, chiuderlo in forme, **riscriverlo con un font** (nemmeno con Caos Mano), fondi affollati.
- Area di rispetto = altezza della "C". Usa sempre l'SVG originale.

### Colori (CSS custom properties)
```css
:root{
  /* nucleo — almeno 3 su 4 in ogni pagina */
  --off-white:#f1ede2;
  --bianco:#ffffff;
  --nero:#000000;
  --arancio:#f8a11d;
  /* rosso del logo — prezzi e grafiche nel menù nuovo */
  --rosso-logo:#e8380d;
  /* caldi — per lo spazio, usare con misura */
  --oatmeal:#dcd5c3; --oak:#bc9a75; --terracotta:#b97050; --sage:#a1ab92; --moss:#6d7448;
  /* grigio tipografico per note/didascalie (non è colore di brand) */
  --grigio:#707478;
  /* registro menù: un fondo per sezione */
  --food-bg:#f8e0d0;  --food-title:#f0a018;  --food-text:#a8480c;  /* pesca / arancio / ruggine */
  --sweet-bg:#d8d8f8; --sweet-title:#5840e8; --sweet-text:#5840e8; /* lilla / viola */
  --hot-bg:#d0d8d8;   --hot-title:#284058;   --hot-text:#284058;   /* grigio-azzurro / blu notte */
  --chill-bg:#f8d8e8; --chill-title:#f83898; --chill-text:#c01a6a; /* rosa / rosa fluo / magenta */
}
```
Regole:
- Non si inventano tinte. Nuova sezione → colore da questa tabella.
- **Contrasto**: testo sotto ~40 px deve avere ≥ 4,5:1 sul fondo. Arancio su pesca (1,7:1) è **vietato** per testo piccolo e prezzi → usa ruggine `#a8480c`. Sull'arancio il testo piccolo è nero.
- Nel menù: un fondo per sezione, testo nero, colore profondo sui dettagli, un solo accento per volta.

### Tipografia
- **Source Code Pro** (monospaziato) è l'unico font di testo. Pesi: Bold (titoli, etichette), Medium (sottotitoli), Regular (corpo), Light (descrizioni nel menù nuovo), Italic con parsimonia. Ripiego: `ui-monospace, Menlo, Consolas, monospace`. **Mai un font proporzionale.**
- **Caos Mano** = font disegnato a mano da Andrè: titoli di sezione, nomi piatti, prezzi, cartelli. Mai per il marchio.
- Composizione: 60–70 caratteri per riga; allineato a sinistra, mai giustificato; `hyphens: none`; maiuscole accentate corrette (MENÙ, QUALITÀ — mai A'); titoli senza punto finale.
- Titoli di sezione del menù in inglese (BRUNCH, ALL DAY, HUNGRY?, SOCIAL!…): non mescolare lingue nei titoli dello stesso livello.

#### Caos Mano — attenzione
- File web: `~/Desktop/Materiale ristrutturazione CAOS/01 Brand/Font Caos Mano/web/` → `CaosMano-{Light,Regular,Bold,Italic,BoldItalic,Outline}.woff2`. Copiali in `caos-site/fonts/`.
- Famiglie: **Caos Mano** (Regular/Bold/Italic/BoldItalic), **Caos Mano Light**, **Caos Mano Outline** (famiglie separate).
- È tutto maiuscolo, **ma la A è speciale**: tasto `a` minuscola = A normale · tasto `A` maiuscola = **∀** (A rovesciata).
  → Scrivi il testo in **minuscolo** nell'HTML: `cAos` → C∀OS, `brunch` → BRUNCH.
  → **Mai `text-transform: uppercase`** sugli elementi in Caos Mano: trasformerebbe tutte le A in ∀.
- `font-feature-settings: "calt" 1` (default): le lettere alternate evitano doppie identiche. Non disattivarlo.
- Icone del marchio nel font: `<` tazzina · `>` cornetto · `{` `}` faccine · `|` riempimento. Utili come decorazioni (con `aria-hidden="true"`).
- **Manca la Ø** (Grød Up): per quel nome usa un fallback (es. la Ø in Source Code Pro dentro uno `<span>`).
- Rendi il font con `font-display: swap` e testo reale (non immagini) per SEO e accessibilità.

```css
@font-face{font-family:"Caos Mano";src:url(/fonts/CaosMano-Regular.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Caos Mano";src:url(/fonts/CaosMano-Bold.woff2) format("woff2");font-weight:700;font-display:swap}
@font-face{font-family:"Caos Mano";src:url(/fonts/CaosMano-Italic.woff2) format("woff2");font-style:italic;font-display:swap}
@font-face{font-family:"Caos Mano Light";src:url(/fonts/CaosMano-Light.woff2) format("woff2");font-display:swap}
```
Source Code Pro: meglio self-hosted (`@fontsource/source-code-pro` o i woff2 in `/fonts`) invece di Google Fonts (privacy GDPR + velocità).

### Elementi grafici
- Asterischi, cerchi, parentesi, frecce, sottolineature a mano: **1–2 per pagina**, solo nero, arancio o rosso logo; indicano, non decorano; non si ruotano.
- Etichetta **ADD SOME C∀OS** = fascia delle aggiunte. CAOS PICK e GO BIG **non** vanno nel menù.
- SVG pronti: `~/Downloads/02 Caos Caffe/Social e template Instagram/output/caos_upselling_assets/SVG_editabili/` (frecce, cerchio, parentesi, sottolineatura, raggiera, asterisco, ADD SOME CAOS). Icone Sea You / Meat Me: `~/Downloads/02 Caos Caffe/Brand, logo e grafiche/CAOS_taglieri_SVG/`.

### Fotografia
- Luce naturale laterale, mai flash; prodotto vicino e reale, mani sì, nessuno in posa; post-produzione minima.
- **Vietati**: stock, immagini generate con IA, piatti finti, sfondi da catalogo.
- Foto pronte per il web: `caos-site/img/` (≈ 30 jpg, max 1600 px). Sorgenti: `~/Downloads/02 Caos Caffe/Foto locale e prodotti/Foto per categoria/` (brunch, dolci, location, team).
- Servire in AVIF/WebP con `<picture>` + `srcset`, `loading="lazy"` sotto la piega, `width`/`height` sempre dichiarati. `alt` descrittivi in italiano.

### Atmosfera (il 30/70)
Il menù è il posto del **30% caotico** del brand (colori pieni per sezione, scritte a mano). Il resto del sito — come la sala — resta **caldo e nordico**: tanto bianco/off-white, tipografia forte, spazio, gerarchia semplice.

---

## 3. Architettura del sito

| URL | Contenuto | Note |
|---|---|---|
| `/` | Home: chi siamo in una frase, la giornata per fasce orarie, caffè, cornetteria, fornitori, spazio, orari + mappa | striscia "adesso" che accende la fascia corrente (già esiste in `js/caos.js`) |
| `/menu` | **Menù completo con allergeni** — destinazione del QR | vedi §4–5. Deve funzionare anche senza JS |
| `/menu#brunch` ecc. | ancore per sezione | nav sticky con le sezioni |
| `/caffe` | Blend 1969, specialty a rotazione, torrefazione Tomassi | |
| `/forno` | la cornetteria | nome "Lievito 1969" **non confermato** (vedi §9) |
| `/locale` | zone del locale, orari, come arrivare, mappa | |
| `/noi` | storia dal 1969, come lavoriamo, team | nomi team mancanti |
| `/ordina` | click&collect / tavoli 10+ | form ancora finti (vedi §7) |
| `/privacy`, `/cookie` | obbligatorie | |

URL puliti (`/menu`, non `/menu.html`): configura rewrites sull'hosting. **`/menu` deve esistere e restare stabile per sempre**: è stampato nel QR.

---

## 4. Il menù online — requisiti

- **Dati separati dal layout**: `data/menu.json` (o `menu.yaml`) con sezioni, voci, prezzi, allergeni, flag. Il personale deve poter cambiare un prezzo o togliere un piatto modificando solo quel file (o un CMS leggero: Decap CMS / Pages CMS / Google Sheet → JSON al build).
- Rendering **statico** (HTML generato al build o server-side): il menù si deve leggere anche con JS spento e caricare in < 1 s su 4G.
- Ogni sezione con: titolo (Caos Mano), orario, colore di fondo di registro (§2), elenco voci.
- Ogni voce: **nome** (Caos Mano o SCP Bold) · **descrizione** (una frase, SCP Light) · **fornitore** (corsivo, colore testo di sezione) · **prezzo** · **allergeni** come numeri `1, 3, 7` (piccoli, colore testo di sezione, con `title`/tooltip o legenda accessibile).
- Prezzi: formato italiano con virgola, senza € sulla riga (`5,8`, `da 6`); "Prezzi in euro, IVA inclusa. Niente coperto." nel piede.
- Flag: `veg` (badge VEG), `senza glutine`, `da` (prezzo a partire da), `cambia spesso`.
- **Filtri** utili: vegano · senza un allergene (es. "senza 7 latte" → nasconde/attenua le voci che lo contengono). Il sito attuale ha un filtro "fatto da noi": si può tenere.
- Fasce "cambia spesso" in **fascia arancio** (testo nero, prezzi in rosso logo) — come nella carta stampata.
- **Legenda allergeni** sempre raggiungibile + dicitura contaminazione.
- Allergeni marcati `*` = dedotti, **da validare in cucina**: nel JSON tienili con `"verificato": false`; prima di andare online vanno confermati. Non pubblicare allergeni non verificati come certi.
- Bilingue: nomi prodotto invariati, descrizioni tradotte (campo `en`).
- Stampabile (`@media print`) in modo pulito.
- Schema.org: `Restaurant` + `Menu` / `MenuSection` / `MenuItem` con `offers.price` e `suitableForDiet` (VeganDiet, GlutenFreeDiet).

---

## 5. Contenuto del menù (carta nuova, prezzi confermati)

Legenda: `VEG` vegano · `da` = prezzo a partire da · allergeni con `*` = da validare in cucina.

### Allergeni (legenda)
1 Glutine · 2 Crostacei · 3 Uova · 4 Pesce · 5 Arachidi · 6 Soia · 7 Latte · 8 Frutta a guscio · 9 Sedano · 10 Senape · 11 Sesamo · 12 Solfiti · 13 Lupini · 14 Molluschi
Dicitura: *"In cucina si lavorano tutti gli allergeni: possibili tracce. Chiedi allo staff."*
Piede: *"Prezzi in euro, IVA inclusa. Niente coperto."*

### Filosofia (testo di Andrè — non riscrivere)
> **Facciamo le cose bene, ogni giorno.**
> Ingredienti veri, stagioni che cambiano e produttori scelti con cura. Prepariamo in casa lievitati, pasta fresca e fermentazioni: dalla colazione all'aperitivo, ogni proposta segue lo stesso filo.
> Alcune cose restano.
> Altre cambiano spesso.
> Per il resto, chiedi.

Come funziona: *"In carta trovi quello che resta. Quello che cambia è in vetrina, in frigo e sul foglio del giorno. Tutto, con gli allergeni, lo trovi qui."*

### BRUNCH · 8:00–15:00 (fondo pesca)
| Voce | Descrizione | € | All. |
|---|---|---|---|
| EGGS BENEDICT | Uovo poché *PEPPOVO* su pan brioche *VIVY BAKERY*, salsa hollandaise, spinacino e una punta di paprika e pepe rosa | 10 | 1, 3, 7, 10 |
| SCRAMBLED EGGS | Uova *PEPPOVO* strapazzate piano nel burro *BEPPE E SUOI FORMAGGI*, con pane integrale *VIVY BAKERY* | 8 | 1, 3, 7 |
| BUTTER BREAD | Pane integrale *VIVY BAKERY* con burro montato e Tomone *BEPPE E SUOI FORMAGGI*, e sopra la confettura di more *APE D'ORO* | 6 | 1, 7, 12 |
| GRØD UP | Il risengrød, riso al latte danese, il dolce preferito del bimbo. Qui cresciuto con riso giapponese cotto al latte, vaniglia, cannella e caramello salato al caffè *TOMASSICOFFEE* | 9 | 7 |
| SESAME STREET · VEG | Verdura di stagione arrostita, con ceci croccanti al cumino, hummus, cipolle rosse marinate, pomodorini confit e germogli freschi. Senza glutine | 9 | 11* |

**ADD SOME C∀OS** (fascia arancio): Pancetta affumicata 2 · Salmone 3 (4) · Tonno scottato 3 (4) · Cipolle rosse marinate 1 · Avocado 2 · Uovo CBT 1,5 (3)

### ALL DAY · 7:00–22:00 (fondo pesca)
| Voce | Descrizione | € | All. |
|---|---|---|---|
| AVOCADO TOAST | Avocado su pane integrale *VIVY BAKERY*, con uova strapazzate *PEPPOVO*, limone, semi tostati e un filo d'olio *CALISSONI BULGARI*. Anche vegano: senza uovo, con spinacino in più | 9 | 1, 3, 7, 11 |
| CROQUE MONSIEUR | Pan brioche *VIVY BAKERY* con prosciutto cotto *BOTTEGA ROCCIA* e Tomone *BEPPE E SUOI FORMAGGI*, coperto di besciamella e gratinato | 12 | 1, 3, 7 |
| NUTS FOR CHOCO | Yogurt con burro d'arachidi fatto da noi, cioccolato *DIVINO*, banana, crumble croccante e sciroppo d'acero | 8 | 1, 5, 6, 7, 8 |
| GOOD MESS | Yogurt con composta e frutta fresca, semi tostati e miele di castagno *APE D'ORO* | 7 | 7, 11 |
| STICKY BUSINESS | Pan brioche *VIVY BAKERY* con burro d'arachidi fatto da noi e confettura *APE D'ORO*. Si attacca alle dita, ed è il bello | 6 | 1, 3, 5, 7, 12 |
| WAFFLE | Waffle dolce con sciroppo d'acero o la crema del giorno | 5,8 | 1, 3, 7 |
| WAFFLE ALLA FRUTTA | Waffle dolce con frutta fresca, granola croccante e caramello salato al caffè *TOMASSICOFFEE* | 7,5 | 1, 3, 7, 8 |

**CAMBIANO SPESSO** (fascia arancio):
| Voce | Descrizione | € | All. |
|---|---|---|---|
| NEW YORK ROLLS | Un cornetto salato diventato tondo: sfogliato, farcito bene e decisamente fuori forma. La farcia cambia spesso, chiedi quella di oggi | da 6 | 1, 3, 7 + farcia (chiedi) |
| VOLEVO ESSERE UN TOAST | Pan brioche farcito e passato sulla piastra. Non è proprio un toast, ma ci teneva. Farcia del giorno | da 6 | 1, 3, 7 + farcia (chiedi) |
| DOLCI & LIEVITATI *(nome provvisorio)* | Croissant, lievitati, torte e dolci fatti da noi: cambiano spesso, guarda la vetrina | da 1,8 | chiedi |
| CAOS IN A SPOON | Dolci al cucchiaio fatti da noi, in lattina. Li trovi in frigo | da 5 | per gusto |

### HUNGRY? · solo a pranzo, 12:00–15:00 (fondo pesca)
| Voce | Descrizione | € | All. |
|---|---|---|---|
| PASTA & CO. *(in testa, fascia arancio)* | Pasta, secondi e contorni. Quello che bolle in pentola cambia spesso. Tu chiedi. | da 10 | chiedi allo staff |
| CHICKEN ME OUT | Pollo arrosto su quinoa o riso, con verdure di stagione, crema acida, erbe e semi tostati | 12 | 7, 11 |
| QUINOA ME CRAZY · VEG | Quinoa o riso con verdure di stagione arrosto e crude, pomodorini confit, crema di mandorle, vinaigrette di sedano ed erbe, semi tostati e olio *CALISSONI BULGARI*. Senza glutine | 11 | 8, 9, 11, 12 |
| (HA)TUNA MATATA | Tonno scottato su quinoa o riso, con avocado, verdure croccanti, vinaigrette agli agrumi ed erbe | 13 | 4 |

Dentro Pasta & Co. ruotano anche Sicily Me Softly (VEG, 10, all. 8, 9, 12) e Zucchini Business (VEG, 12, all. 1, 6, 10) — senza riga propria in carta; online si possono mostrare come "questa settimana".

### SOCIAL! · dalle 16:00, ultimi ordini 21:30 (fondo pesca)
**Piatti aperitivo** — *Cinque assaggi tra caldo e freddo, croccante e cremoso, pensati per stare bene insieme. E sì, anche tu sei invitato.*
| Voce | Assaggi | € | All. |
|---|---|---|---|
| SEA YOU | Mini avocado toast al salmone · Millefoglie di patata, panna acida e alice · Chips di cornetto e bottarga · Riso croccante e tonno scottato · Apple Sea Brioche, con mela verde, ricotta salata e alga | 13 | 1, 3, 4, 7, 11, 12 |
| MEAT ME | Mini croque monsieur · Pane, burro al caffè e formaggio stagionato · Waffle salato con pancetta all'acero e mela verde · Mini eggs benedict · Millefoglie di patata e pancetta | 11 | 1, 3, 7, 10, 12 |
| BEAN MISSING YOU · VEG *(nome provvisorio)* | Mini avocado toast · Millefoglie di patata, fagiolini e maionese vegana · Cialda di riso, hummus e pomodorino confit · Crostino di polenta e caponata · Mini burger di zucchine | 12 | 1, 6, 8, 9, 10, 11, 12 |
| YOU & ME · per due | Il meglio di Sea You, Meat Me e Bean Missing You nello stesso piatto, scelto dalla cucina | 22 | secondo gli assaggi, chiedi |

**SNACKS!** (fascia arancio) — *Piccole cose salate, da prendere con le mani e finire senza troppe domande.*
Crispy Brioche Cubes 3 (1, 3, 7) — Cubetti di pan brioche tostati nel burro, croccanti e salati · Damn Good Fries 4 (salsa da verificare*) — Patate sottili, dorate e croccanti, con la salsa Caos · Totally Nuts 4 (7, 8, 11) — Mandorle, nocciole e semi tostati nel burro, con limone e rosmarino · Croissant Chips 3 (1, 7) — Sfoglie di croissant salato con burro, parmigiano, pepe e sale al caffè · Salse in più 0,5 — Chiedi quali ci sono oggi

### CAFFÈ E CALDO (fondo grigio-azzurro, blu notte)
**Il caffè della casa · Blend 1969** — *Espresso e classici nascono dal Blend 1969 di TOMASSICOFFEE: dolce, equilibrato, per tutto il giorno.*

**SPECIALTY COFFEE** (fascia arancio, in testa) — *Ogni giorno caffè diversi per espresso, filtro e batch brew. Quelli di oggi sono sul foglio del giorno.* Espresso del giorno da 3 · Filtro a mano da 4 · Batch brew da 4. Cortado e flat white anche con lo specialty: prezzo secondo il caffè.
> Online questa è la sezione ideale per un blocco **"oggi in macchina"** aggiornabile dal personale (il "foglio del giorno" digitale).

I classici: Espresso 1,5 · Doppio 3 · Decaffeinato 1,6 · Americano 1,8 · Cappuccino 2 (7) · Caffellatte 2,2 (7) · Latte macchiato 2,2 (7) · Marocchino 1,6 (7*) · Corretto 2,5

| Voce | Descrizione | € | All. |
|---|---|---|---|
| CORTADO | Espresso tagliato con poco latte caldo | 1,8 | 7 |
| FLAT WHITE | Doppio espresso, latte vellutato e poca schiuma | 3,5 | 7 |
| CHAI LATTE | Tè nero Assam e sette spezie tostate e macinate da noi, sotto una nuvola di latte | 4 | 7 |
| MATCHA LATTE | Tè verde matcha e latte montato. Verde, morbido, sveglio | 4 | 7 |
| GOLDEN MILK | Latte montato con il nostro mix di curcuma, pepe nero e cannella. Color oro, zero caffeina | 4 | 7 |
| CIOCCOLATA CALDA | Cioccolato fuso da noi, densa come deve essere: il cucchiaino è d'obbligo | 3,5 | 7 |
| TÈ E INFUSI | Verdi, neri, bianchi e tisane in rotazione: chiedi la selezione di oggi | 3 | — |

Nota: *Ogni bevanda col latte si può fare con una bevanda vegetale, +0,3.*

### FREDDO (fondo rosa)
**CAOS IN A SIP** (fascia arancio, in testa) — da 4 — *Bevande fatte da noi e chiuse in lattina: Cold Brew · Tè freddo limone e verbena · Tè freddo pesca e sambuco. Le trovi in frigo.*

| Voce | Descrizione | € | All. |
|---|---|---|---|
| ICED BLACK | Espresso, acqua fredda e ghiaccio. Nero, senza drammi | 2,5 | — |
| FREDDO | Espresso montato col ghiaccio: freddo e cremoso | 2 | — |
| ICED LATTE | Espresso, latte freddo e ghiaccio | 3,5 | 7 |
| FLASH BREW | Filtro caldo estratto direttamente sul ghiaccio. Pulito, aromatico, subito freddo | da 4 | — |
| ESPRESSO TONIC | Doppio espresso e acqua tonica. Acido e frizzante | da 4 | — |
| MATCHA TONIC | Matcha, tonica e ghiaccio. Verde, frizzante, sveglio | da 5 | — |
| SPREMUTA D'ARANCIA | Arance spremute al momento. Il resto non serve | 4 | — |
| LE MORRE · NETTARI DI FRUTTA | Frutta da bere: chiedi i gusti di oggi | 5 | — |
| KOMBUCHA | Fermentata, fresca, appena frizzante | da 4 | — |
| BIBITE | MoleCola 3 · altre bolle da 3,5. Le altre cambiano spesso: guarda cosa c'è in frigo | da 3 | — |
| ACQUA WAMI 0,5 L | | 1 | — |
| ACQUA MICROFILTRATA | Microfiltrata da noi, naturale o frizzante. 0,5 L 0,5 · 1 L 1 | 0,5 | — |

### DRINK LIST (carta a sé, ancora in sviluppo — dati di luglio, solo riferimento)
Spritz 8–9 (Aperitivo, Bitter, Hugo, Violetta, Caos) · Gin tonic 10–12 (Boia, Boigin Saffron, Brockmans, J.Rose JR°03, Acqueverdi) · Classici 8–11 (Negroni, Americano, Whisky Sour, Mojito, Moscow Mule, Daiquiri) · Caos in a Shot (cocktail in lattina) 6 · La Credenza: amari da 5, distillati da 4, birre in lattina da 6, calici naturali da 6 (bolle da 7). Solfiti (12) su spritz, vermouth, vino, birra; Whisky Sour 3 (albume).
→ Sul sito prevedi la sezione ma **non pubblicarla** finché la drink list non è chiusa (flag `draft: true`).

---

## 6. Requisiti tecnici

- **Stack consigliato**: sito statico generato (Astro o Eleventy) partendo dall'HTML/CSS esistente, con `data/*.json` per menù e info. In alternativa restare su HTML puro + un piccolo script di build che genera `menu.html` da `menu.json`. Niente framework pesanti: è un sito di un bar.
- **Hosting**: Netlify / Cloudflare Pages / Vercel, dominio caoscaffe.com, HTTPS, redirect `www` → apex (o viceversa), rewrites per URL senza `.html`.
- **Performance**: Lighthouse ≥ 95 mobile. Immagini AVIF/WebP responsive, font woff2 preload (solo i pesi usati), niente librerie JS esterne.
- **Accessibilità**: WCAG 2.2 AA. Contrasto 4,5:1 (vedi §2), focus visibile (attuale: outline viola 3px), target touch ≥ 44 px, `lang="it"`, skip link, allergeni leggibili dagli screen reader (es. `<abbr title="Glutine">1</abbr>`), rispettare `prefers-reduced-motion` (il marquee va fermato).
- **SEO locale**: title/description per pagina, Open Graph con immagine assoluta, `schema.org/CafeOrCoffeeShop` o `Restaurant` con indirizzo, geo, `openingHoursSpecification` (mercoledì chiuso; orario invernale/estivo), `servesCuisine`, `hasMenu: https://caoscaffe.com/menu`, `sitemap.xml`, `robots.txt`. Link al profilo Google Business.
- **GDPR / legale**: privacy policy e cookie policy; se c'è solo hosting statico senza tracking, niente banner. Se aggiungi analytics, usa uno cookieless (Plausible / Umami / Cloudflare Web Analytics). Mappa: iframe Google Maps solo dopo consenso, oppure immagine statica + link "Apri in Maps". P.IVA nel footer.
- **Lingua**: il meccanismo `data-en` attuale va bene per poche stringhe; per il menù meglio due build (`/menu` e `/en/menu`) con `hreflang`.
- **Manutenzione**: scrivi un `LEGGIMI.md` per chi non è sviluppatore: come cambiare un prezzo, togliere un piatto, aggiornare "oggi in macchina", cambiare orari estate/inverno.

---

## 7. Form e funzioni (oggi finti)

Nel sito attuale i form hanno `data-stub` e mostrano solo un messaggio. Da collegare:
- **Newsletter/lista** → Mailchimp / Brevo / Klaviyo.
- **Ordina e ritira** (click&collect) → per partire Formspree/Netlify Forms con invio email al bar; poi eventualmente Shopify.
- **Tavoli 10+ con acconto** → sistema di prenotazione con caparra o prodotto "acconto" su Shopify.
Quando un form ha un backend vero, togli `data-stub` e il relativo `<p class="msg">`. Consenso privacy obbligatorio in ogni form.

---

## 8. Cosa c'è già in `caos-site/`

```
index.html      home (usata) — marquee, fasce orarie, cornetteria, caffè, fornitori, come lavoriamo, team, spazio
menu.html       menù per fascia oraria + filtro «fatto da noi» — CONTENUTO VECCHIO (carta di luglio), da rifare con §5
forno.html      cornetteria «Lievito 1969»
caffe.html      Blend 1969 + specialty
locale.html     quattro zone + info pratiche
noi.html        storia, come lavoriamo, team
ordina.html     click&collect e tavoli 10+
home-a/b/c.html, home-nordica.html (2,7 MB, immagini inline), caos-titoli.html → bozze/alternative: NON pubblicare, spostare in /_bozze
css/caos.css    variabili, header sticky nero, nav, burger, IT/EN, stili menù
js/caos.js      burger, IT/EN (localStorage), filtro menù, stub form, striscia "adesso", anno footer
img/            ~30 jpg ottimizzate + logo-caos.svg
LEGGIMI.md      note di pubblicazione
```
Problemi noti nel sito attuale da correggere:
- Orari incoerenti: la home dice "dalle 6:00" / fascia "6:00 → 10:30"; il brand dice **7:00 inverno, 8:00 estate**. Allinea tutto a §1 (e la striscia "adesso" deve gestire estate/inverno).
- Email `ciao@caoscaffe.com` → `info@caoscaffe.com`; aggiungere telefono.
- "taglieri" → "piatti aperitivo"; "marmellate" → "confetture".
- `menu.html` va ricostruito sui dati di §5 (piatti vegani nuovi, prezzi e fasce nuove, sezioni SWEET/HOT STUFF/CHILL/SIP SIP di luglio superate).
- Affermazioni da verificare prima di pubblicare: "tostato a 300 metri da qui", "6 fornitori entro 50 km", premi Gambero Rosso / Bargiornale in fondo alla home, nomi del team (`[NOME]`), "Lievito 1969".
- `LEGGIMI.md` cita immagini `v60.jpg`, `coldbrew.jpg`, `vetrata.jpg` che non sono in `img/`.
- Google Fonts caricato da CDN → self-host.
- Caos Mano non è ancora usato nel sito: introdurlo per titoli sezione, nomi piatti e prezzi del menù.

---

## 9. Aperto / da chiedere ad Andrè

- Nome del piatto aperitivo vegano (**Bean Missing You** provvisorio) e della riga "**Dolci & lievitati**".
- Nome della cornetteria: **Lievito 1969** si usa o no?
- Orario Social!: ultimi ordini 21:30 o chiusura 21:00?
- Allergeni `*` da validare in cucina (Sesame Street, salsa Caos, Caos in a Spoon per gusto, pane VIVY BAKERY: contiene latte/uova?).
- Germogli (quali e su quali piatti; se di senape → allergene 10).
- Drink list definitiva e prezzi Caos in a Shot.
- Nomi e ruoli del team, foto originali al posto dei fermi dei reel.
- Hosting e dominio: dove è registrato caoscaffe.com, chi ha l'accesso DNS.
- Serve l'ordine online vero (Shopify) o basta una richiesta via email?
- Dati legali per il footer (ragione sociale, P.IVA).
- Titoli **CAFFÈ E CALDO** e **FREDDO**: sono in italiano mentre gli altri titoli di sezione sono in inglese (regola §2). Confermare o dare i nomi inglesi.
- Aggiunte "Salmone 3 (4)", "Uovo CBT 1,5 (3)": cosa indica il prezzo tra parentesi? Online esce così com'è.
- Allergeni delle aggiunte (ADD SOME C∀OS) e dello specialty: non in carta → online "chiedi allo staff".
- Prezzi in rosso logo sulla fascia arancio: contrasto 2:1, non leggibile a schermo → online i prezzi sulla fascia sono neri.

---

## 10. Percorsi utili sul Mac

- Sito: `~/Desktop/Claude code/caos-site/`
- Logo SVG ufficiale: `~/Desktop/Materiale ristrutturazione CAOS/01 Brand/Logo/Caos - logo (vettoriale).svg` (anche `caos-site/img/logo-caos.svg`)
- Font Caos Mano (web): `~/Desktop/Materiale ristrutturazione CAOS/01 Brand/Font Caos Mano/web/`
- Brand manual v2: `~/Desktop/Materiale ristrutturazione CAOS/01 Brand/Caos - brand manual v2 (ago 2026).pdf`
- Menù nuovo, testo: `~/Desktop/Materiale ristrutturazione CAOS/Claude outputs/Menu nuovo/CAOS_menu_nuovo_LAVORO.md`
- Menù nuovo, grafica (riferimento visivo per `/menu`): `…/Claude outputs/Menu nuovo/CAOS_menu_nuovo_GRAFICA.pdf`
- Foto: `~/Downloads/02 Caos Caffe/Foto locale e prodotti/Foto per categoria/`
- Grafiche a mano (SVG): `~/Downloads/02 Caos Caffe/Social e template Instagram/output/caos_upselling_assets/SVG_editabili/`

Nota: alcuni file originali sono hardlink; se un tool fa storie, copiali prima in `caos-site/` e lavora sulla copia.

---

## 11. Come lavorare

1. Prima di scrivere codice, leggi `index.html`, `css/caos.css`, `js/caos.js` e questo file.
2. Estrai i dati (menù, orari, contatti) in `data/`. Poi il layout.
3. `/menu` per primo, pubblicabile da solo: è quello che serve al QR.
4. Ogni testo nuovo segue §2 (tu, frasi corte, un fatto, chiusa con invito, niente parole vietate).
5. Non inventare fatti (premi, numeri, nomi, allergeni). Se manca un dato, lascia un segnaposto evidente `[DA CONFERMARE]` e aggiungilo a §9.
6. Verifica a ogni giro: HTML valido, Lighthouse mobile, contrasto, prova su telefono vero via QR.

---

## 12. Stato del lavoro (28/09/2026)

- `/menu` e `/en/menu` fatti: `data/menu.json` → `build.mjs` → `dist/`. Istruzioni in `LEGGIMI.md`.
- Mancano nel repository: font (`public/fonts/LEGGIMI.md`), `img/logo-caos.svg`, `img/favicon.svg`, `img/og-menu.jpg`, e le altre pagine del sito attuale (da copiare in `public/` e poi allineare a §8).
