# Tomassicoffee – modifiche tema Shopify

Tema Shopify di lavoro: **"Copia aggiornata di Copia di Craft + Over your limits"** (non pubblicato).

## Cartelle
- `backup-pre-seo-ai/` – versione originale dei file del tema, prima delle modifiche SEO/AI (26-09-2026).
- `theme-seo-ai/` – versione modificata caricata sul tema.

Esiste anche un tema duplicato intatto su Shopify: **"Backup prima di SEO AI (26-09-2026)"**.

## Modifiche SEO / ricerca AI
| File | Modifica |
|---|---|
| `snippets/seo-ai-schema.liquid` (nuovo) | JSON-LD: Organization + Store (sede Aprilia, orari, contatti, fondatori), WebSite, BreadcrumbList, Product con dati del caffè dai metafield `custom.*`, CollectionPage/ItemList |
| `layout/theme.liquid` | Renderizza `seo-ai-schema` nell'`<head>` |
| `sections/header.liquid` | Rimossi i vecchi JSON-LD Organization/WebSite (ora nello snippet) |
| `sections/main-product.liquid` | Rimosso il vecchio JSON-LD Product (ora nello snippet) |
| `snippets/meta-tags.liquid` | `og:image` in https |
| `templates/robots.txt.liquid` (nuovo) | Regole default Shopify + autorizzazione esplicita ai crawler AI |
| `sections/footer-group.json` | Riattivato il box newsletter nel footer |
| `templates/page.newsletter.json` | La pagina /pages/newsletter ora mostra il form di iscrizione (prima era vuota) |
| `templates/index.json` | Homepage: nascosto l'indicatore di scroll ("mouse") nella hero (`show_scroll_cue: false`) |

## Revisione testi (28-09-2026)
Riscrittura dei testi dopo il feedback sul tema "Copia aggiornata di Copia di Craft + Over your limits".
Backup su Shopify: tema **"Backup prima dei testi (28-09-2026)"**; originali dei file in `backup-pre-testi/`.

| File | Modifica |
|---|---|
| `templates/index.json` | Hero riscritta (niente più «Lo specialty serio» / «famiglia che gareggia»); fascia slogan con fatti al posto di «Taste the difference / Feel the passion»; percorsi OYL, Monorigine e Blend riscritti; tolto «86+» (sostituito da 6° ai Mondiali 2024) e titoli attribuiti a Emanuele |
| `templates/page.abbonamento.json` | Titolo piani chiarisce: consegna sempre mensile, cambia solo il pagamento; tolti «diverso ma coerente» e «doppione… valeva la pena» |
| `templates/collection.json` | Card abbonamento: «fino al 25%» ora dice «dal secondo anno»; testo OYL senza «gli stessi caffè che portiamo in competizione» |
| `templates/page.mi-sorella-zoccola.json` | Landing OYL: meno «estremo / fuori scala / non per tutti», niente «dietro ogni lotto c'è una gara vera» |
| `templates/product.over-your-limits.json`, `sections/pdp-oyl-teca.liquid` | «Rivendicalo» → «Aggiungi al carrello»; badge «Microlotto · Quantità minime · Tostato su ordinazione» |
| `templates/page.chi-siamo.json` | Tolte le frasi difensive; storia concreta (Danimarca 2009, Aprilia 2013, titoli); sezione «I nostri valori» disattivata (non eliminata) |
| `sections/page-campioni-team.liquid`, `sections/page-campioni-recruiting.liquid` | Pagine gare: spiegate le discipline, risultati in primo piano, tolte le frasi generiche |
| `sections/tomassi-family.liquid` | Esempio punti corretto: 445 punti, poi un ordine da almeno €55 per il 5% |
| `snippets/tomassi-i18n.liquid`, `snippets/tomassi-en.liquid` | Dizionari EN aggiornati sui nuovi testi italiani |
| Prodotto El Vergel (metafield `custom.in_tazza`) | Note in catalogo allineate alla scheda: fragola, banana, mela rossa, gelsomino… |

### Seconda tornata (28-09-2026)
| File | Modifica |
|---|---|
| `templates/index.json` | Hero: «Il caffè lo prendiamo sul serio. / Noi stessi, un po’ meno.»; secondo bottone «Aiutami a scegliere» → Coffee Crush |
| `sections/coffee-crush-game.liquid`, `assets/coffee-crush-game.js` | Via «Tu swipe / swipare / swipato»; nel risultato nuovo riquadro «Perché proprio lui» (corpo/acidità/dolcezza reali del caffè + aroma a cui hai messo ♥) |
| `sections/footer-group.json`, `templates/page.newsletter.json` | Newsletter: «Quando arriva un caffè nuovo, te lo diciamo.» + promessa concreta (nuovi lotti, ricette, giorni di tostatura) |
| `snippets/tomassi-i18n.liquid`, `snippets/tomassi-en.liquid` | Traduzioni EN dei nuovi testi |
| Blog «notizie» (16 articoli) | Titoli che dicono di cosa parla l’articolo; URL invariati. Vecchi titoli in `backup-pre-testi/blog/titoli-articoli.md` |

## Come tornare indietro
- **Tutto:** pubblicare il tema "Backup prima di SEO AI (26-09-2026)", oppure ricaricare i file di `backup-pre-seo-ai/` ed eliminare `snippets/seo-ai-schema.liquid` e `templates/robots.txt.liquid`.
- **Un solo file:** ricaricare quel file da `backup-pre-seo-ai/`.
