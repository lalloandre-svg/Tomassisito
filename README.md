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
| `templates/index.json` | Homepage: nascosto l'indicatore di scroll ("mouse") nella hero (`show_scroll_cue: false`) |

## Come tornare indietro
- **Tutto:** pubblicare il tema "Backup prima di SEO AI (26-09-2026)", oppure ricaricare i file di `backup-pre-seo-ai/` ed eliminare `snippets/seo-ai-schema.liquid` e `templates/robots.txt.liquid`.
- **Un solo file:** ricaricare quel file da `backup-pre-seo-ai/`.
