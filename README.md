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

## Come tornare indietro
- **Tutto:** pubblicare il tema "Backup prima di SEO AI (26-09-2026)", oppure ricaricare i file di `backup-pre-seo-ai/` ed eliminare `snippets/seo-ai-schema.liquid` e `templates/robots.txt.liquid`.
- **Un solo file:** ricaricare quel file da `backup-pre-seo-ai/`.

## Timer unico, soglia 69 €, prezzo in alto (28-09-2026) — CARICATO sul tema "Copia aggiornata di Copia di Craft + Over your limits"
Backup del tema su Shopify prima di queste modifiche: **"Backup prima di timer e fascia (28-09-2026)"**. I file caricati coincidono con quelli del repo (MD5 verificato).
| File | Modifica |
|---|---|
| `snippets/roasting-countdown-script.liquid` (nuovo) | Logica unica del countdown: conta fino a martedì ore 12:00, ora di Roma (chiusura ordini per la tostatura del martedì). Collega gli elementi figli in modo ritardato: senza questo la riga della scheda prodotto restava su "--g --h --m" |
| `snippets/roast-countdown-header.liquid` | Stesso design; usa la logica unica; etichetta "Ordina entro martedì alle 12"; niente più stato "Oggi si tosta" per tutto il martedì |
| `snippets/tomassi-roast-line.liquid` (nuovo) | Riga della scheda prodotto: "Si tosta il martedì: ordina entro le 12 per entrare nel prossimo lotto. Mancano …". Sostituisce la parte `roast` di `tomassi-pdp` (che usava le 9 del fuso del visitatore e "entro le 14") |
| `sections/header-group.json` | Barra annunci: "Spedizione gratuita in Italia per ordini da €69" (era €70; il carrello usa già 69) |
| `templates/index.json` | Hero: "Spedizione gratuita da €69"; testo Business riscritto con fatti concreti |
| `templates/product.json` | Prezzo, varianti, quantità e acquisto subito sotto il titolo (etichette e barrette dopo); badge "Tostato il martedì, spedito entro 24h"; sezione storia riscritta senza "tante mani" e "in altura" |
| `templates/product.over-your-limits.json` | Stesso riordino; riga tostatura unica |
| `snippets/tomassi-pdp.liquid` | Scheda nell'accordion: il valore di ogni voce finisce a fine riga (prima si attaccava il testo seguente, es. "Azienda: Finca El Paraíso Colombia … Tra le vette…"); aggiunte le voci "Raccolto" e "Metodo consigliato" usate dalle schede OYL |
| `sections/cart-flair.liquid` | Carrello: stesso orario (martedì 12:00, Roma) al posto di "martedì 9:00 / entro le 14"; "Spedito entro 24h dalla tostatura" |
| `templates/page.abbonamento.json` | FAQ: aggiunto rinnovo automatico fino a disdetta; "Dal 26 in poi" (prima "Dal 25", in conflitto con "entro il 25") |

Applicato direttamente sui prodotti (live, vale per tutti i temi):
- Blend 1969: metafield `custom.origine` → "Brasile · Perù · Etiopia" (era "Brasile · India").
- El Vergel: rimossa l'affermazione errata "Sidra significa cedro"; origine genetica della varietà indicata come discussa.
- Abbonamento: descrizione riscritta (invio mensile, 3 modi di pagare, tostatura chiara/media, impegno minimo, rinnovo e disdetta), allineata alla landing e ai piani Joy.
- Rusatira Anaerobic e Family Blend: tolto "Natural" dal processo.
- Family Blend: Makhore raccolto 2024/2025.
- Mikava Reserve: "Paul & Kevin Doyle".
- El Diviso e Zarza: barrette (erano 8/8/3 come San Rafael) → El Diviso 8,5/6,5/6,5, Zarza 8,5/6,5/7,5. Valori stimati dalle descrizioni, da confermare all'assaggio.
