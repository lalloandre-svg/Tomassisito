# Over Your Limits (OYL) – Immagini e testi

Riepilogo di quanto deciso per la linea **Over Your Limits**.
La linea **TMS** è separata e non è toccata da queste modifiche.

## 1. Immagini da caricare su Shopify

Ordine in galleria: **1ª colorata, 2ª trasparente**. Rimuovere le vecchie foto `IMG_369x.jpg`.
I numeri si riferiscono ai file inviati in chat.

| Prodotto | Colorata | Trasparente | Da rimuovere |
|---|---|---|---|
| Panama: Hacienda La Esmeralda Lino | 19 | 25 | IMG_3693.jpg |
| Panama: Hiu Los Lajones 21B | 18 | 27 | IMG_3692.jpg |
| Colombia: Ombligon Floral Symphony | 20 | 26 | IMG_3694.jpg |
| Colombia: Mikava Santuario Reserve | 30 | 29 | IMG_3691.jpg |
| Panama: Abu Natural GN-3345 | 2 | 1 | – |
| Panama: Abu Washed GW-3230 | 32 | 31 | – |
| Brasile: Daterra Guarani Aramosa | 6 | 5 | – |
| Brasile: Daterra Yellow Aramosa BV31 | 8 | 7 | – |
| Panama: Finca Deborah Enigma | 10 | 9 | – |
| Panama: Finca Deborah Illumination | 12 | 11 | – |
| Panama: Finca Los Lajones 5A | 14 | 13 | – |
| Panama: Janson 474 | già sul sito | già sul sito | – |

**Da scartare:** 3 e 4 (Abu Washed con GN-3230, sostituite da 31/32), 23 (Mikava Reserve con etichetta "Ombligon"),
21/22/24 (viola con etichetta "Mikava Extended", non corrispondono al profilo).

**Non da caricare ora (prodotti esauriti):** Mikava Santuario Extended (15), Java Fruit Forward (16, 28).

**Da controllare:** Deborah Illumination (11/12) – possibile ritaglio netto vicino all'etichetta, in basso a sinistra, e piccola macchia grigia in basso a destra.

## 2. Modifiche ai testi su Shopify

### Regole generali
| Campo | Valore |
|---|---|
| Tag OYL | `Over Your Limits` (unica grafia; sostituisce `Over your Limits`) |
| Tipo prodotto OYL | `Caffè specialty da gara` |
| Tipo prodotto TMS (caffè) | `Specialty coffee` |
| Vendor | `Tomassi Coffee` su tutti i prodotti (tranne "Planet") |
| Varietà | `Gesha` ovunque (non "Geisha") |

### Tag "Over Your Limits" da aggiungere/uniformare
Lino, Hiu 21B, Janson 474, Ombligon, Mikava Reserve, Abu Natural, Abu Washed,
Daterra Guarani, Daterra Yellow, Deborah Enigma, Deborah Illumination, Los Lajones 5A.

### Titoli
| Attuale | Nuovo |
|---|---|
| Brasile: Daterra Yellow aramosa | Brasile: Daterra Yellow Aramosa BV31 |
| Panama: Los Lajones 5A | Panama: Finca Los Lajones 5A |
| Panama: Abu Washed GW-3230 | invariato (confermato GW-3230) |
| Panama: Janson 474 | invariato |

### Descrizioni
- **Lino** – profilo sensoriale: aggiungere *fragola* e *ribes* (sono presenti nell'immagine).
- **Janson 474** – "Varietà: Geisha" → "Gesha".
- Verificare "Geisha" → "Gesha" in tutte le altre schede (es. Perù Pituco).

## 3. Rimandato
- Rwanda: Rusatira Anaerobic Sleeping Bag – indirizzo pagina `…honey-sleeping-bag-copia` da correggere.
- Revisione completa dei testi di tutti i prodotti (TMS inclusi).

## 4. Stato al 28/09/2026

**Fatto su Shopify**
- Immagini collegate (colorata + trasparente): Abu Natural, Abu Washed, Daterra Guarani, Daterra Yellow,
  Deborah Enigma, Deborah Illumination, Los Lajones 5A, Mikava Reserve (rimosse IMG_3691 e IMG_3698).
- Testi, tag `Over Your Limits`, vendor `Tomassi Coffee` aggiornati su tutti i 12 OYL.
- Titoli: "Lino 7B", "Finca Los Lajones 5A", "Daterra Yellow Aramosa BV31".
- Daterra Guarani Aramosa: descrizione riscritta (Guarani = linea selezionata della famiglia Aramosa; raccolto 2025).
- Mikava: CoE Colombia (Nord) 2019, 92,71 punti; produttore Paul Kevin Doyle.
- Abu Washed: fermentazione in sacchi GrainPro immersi in acqua corrente (chicchi non a contatto con l'acqua); raccolto 2024 anche per Abu Natural.
- Los Lajones: Boquete, pendici del Volcán Barú, lavorazione senza acqua.

**Da fare**
- Caricare in Contenuti → File le immagini di Lino, Hiu 21B, Ombligon e collegarle (togliere IMG_3692/3693/3694 e le eventuali vecchie trasparenti).
- Vendor "Tomassi Coffee" sul resto del catalogo (TMS, attrezzatura, ecc.).
- Revisione testi linea TMS.

## 5. Riscrittura testi per la vendita (28/09/2026)

Nuova struttura per tutti i 12 OYL (senza ricette):
frase d'apertura → In tazza → Perfetto se… → Scheda tecnica → La storia → Perché Over Your Limits.

Per ogni prodotto aggiornati anche:
- SEO Google: titolo (≈60 caratteri) e meta description (≈155 caratteri) con nome, varietà, processo, origine e note.
- Metafield `custom.*` letti dallo schema JSON-LD del tema (Google + assistenti AI):
  `origine`, `varieta`, `processo`, `metodo_consigliato`, `in_tazza`, `per_chi_e`, `perche_oyl`.
  I valori numerici (dolcezza/corpo/acidità) sono presenti solo su 5 prodotti e non sono stati inventati.

Copia dei testi precedenti: `backup-oyl-testi/2026-09-28-prima-della-riscrittura.json`.

## 6. Valori sensoriali, ricette, inglese (28/09/2026)

- Dolcezza / corpo / acidità (1–10) aggiunti ai 7 OYL che non li avevano (stime dalle descrizioni sensoriali delle schede Tomassi, sulla stessa scala dei 5 esistenti):

| Caffè | Dolcezza | Corpo | Acidità |
|---|---|---|---|
| Abu Natural GN-3345 | 8.0 | 7.0 | 7.0 |
| Abu Washed GW-3230 | 7.0 | 5.5 | 8.0 |
| Finca Los Lajones 5A | 8.5 | 7.0 | 7.0 |
| Finca Deborah Enigma | 7.5 | 7.0 | 7.5 |
| Finca Deborah Illumination | 8.0 | 7.0 | 7.5 |
| Daterra Guarani Aramosa | 7.5 | 6.0 | 6.5 |
| Daterra Yellow Aramosa BV31 | 7.0 | 6.0 | 6.5 |

- `custom.ricetta_consigliata` (non visibile nella pagina, letto da schema/AI) compilato per 7 caffè dalle schede Pages.
- Traduzioni EN (titolo, descrizione, SEO, tipo prodotto "Competition-grade specialty coffee") per tutti i 12 OYL, sostituite le vecchie traduzioni.
- Da chiarire: anno di raccolto Abu Natural (scheda 2025 / sito 2024) e Guarani (scheda 2024 / sito 2025).
- Traduzioni EN anche dei metafield testuali (processo, metodo, in tazza, per chi è, perché OYL, ricetta; origine/varietà dove diverse).
- Guarani: handle cambiato in `brasile-daterra-guarani-aramosa` con redirect da `…-tumoru-guarani`.
- Lino, 21B, Ombligon avevano già le immagini nuove (IMG_3692/3693/3694.jpg + IMG_3700/3701/3702.png): nessuna modifica necessaria.
- Aggiunta a tutte le 12 schede OYL (IT + EN) la sezione "Freschezza da competizione" / "Competition-grade freshness": caffè conservati crudi, sottovuoto e in freezer, tostati solo al momento dell'ordine.
