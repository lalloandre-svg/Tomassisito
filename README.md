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
| `templates/page.mi-sorella-zoccola.json` | Pagina Over Your Limits, sezione Grammatica: "Thè" → "Tè verde", "Passion Fruit" → "Frutto della passione"; icone tutte PNG uguali a quelle dei prodotti (Anguria e Mango erano SVG 50px); aggiunta una nota breve a ogni gusto |
| `snippets/tomassi-i18n.liquid` | Traduzioni EN per i gusti e le note delle griglie Grammatica (pagina OYL e pagina Grammatica sensoriale) |
| `templates/page.grammatica.json` | Pagina Grammatica sensoriale rifatta in stile OYL: al posto delle 30 righe Craft su fondo chiaro ora c'è la griglia `oyl-grammatica` (fondo nero, oro) con i 30 gusti, icona = immagine del prodotto, nota breve e link al prodotto; bottone finale verso i caffè Over Your Limits |
| `assets/oyl.css` | Newsletter del footer scura (nero/oro) sulle pagine OYL; sul resto del sito resta chiara |
| `templates/page.contatti-2.json` | Contatti Over Your Limits: aggiunta la sezione invisibile "OYL — Stili" (serve per la newsletter scura) |
| `sections/oyl-sentore.liquid` (nuovo) | Scheda del singolo sentore in stile OYL: icona grande su alone oro, titolo, attacco, testo, "Dove lo trovi in tazza" (caffè OYL che citano il sentore), link a grammatica e caffè |
| `templates/product.grammatica.json` | Usa `oyl-sentore` al posto della scheda prodotto Craft (tolto anche il blocco "Torna allo shop" / "Etichetta pulsante") |
| `assets/gram-*.webp` (nuovi) | Icone dei nuovi sentori (Violetta, Uva viola, Uva verde, Timo, Nib di cacao), scontornate; copiate anche in Shopify Files |

## Come tornare indietro
- **Tutto:** pubblicare il tema "Backup prima di SEO AI (26-09-2026)", oppure ricaricare i file di `backup-pre-seo-ai/` ed eliminare `snippets/seo-ai-schema.liquid` e `templates/robots.txt.liquid`.
- **Un solo file:** ricaricare quel file da `backup-pre-seo-ai/`.

## Modifiche ai prodotti (dati del negozio, valgono anche sul tema live)
- Nuovi prodotti sentore (Non in elenco, template `grammatica`, collezione Grammatica): Violetta, Uva viola, Uva verde, Timo, Nib di cacao.
- Handle corretti con reindirizzamento dal vecchio URL: ciliegia-copia→mirtillo, lampone-copia→melone, miele-copia→fragola, melone-copia→rosa, fragola-copia→lampone, mirtillo-copia→miele, rosa-copia→camomilla, camomilla-copia→sciroppo, sciroppo-copia→rosa-nera, lemongrass-copia→bubblegum, caramello→prugna.
