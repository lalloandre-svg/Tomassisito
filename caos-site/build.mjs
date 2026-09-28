// Build del sito CAOS Caffè: copia public/ in dist/ e genera il menù statico
// (dist/menu/index.html e dist/en/menu/index.html) da data/*.json.
// Uso: node build.mjs   — nessuna dipendenza, serve solo Node 18+.

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, "dist");
const readJson = (f) => JSON.parse(readFileSync(join(ROOT, "data", f), "utf8"));

const info = readJson("info.json");
const menu = readJson("menu.json");
const oggi = readJson("oggi.json");

const avvisi = [];
const errori = [];

// ---------- testi fissi dell'interfaccia ----------
const UI = {
  it: {
    path: "/menu",
    title: "Menù · Caos Caffè, Aprilia",
    description: "Il menù di Caos Caffè ad Aprilia: brunch, all day, pranzo, aperitivo, caffè specialty. Con prezzi e allergeni.",
    skip: "Vai al menù",
    menu: "menù",
    sezioni: "Sezioni del menù",
    allergeni: "Allergeni",
    allergeniLabel: "Allergeni:",
    nessuno: "nessuno in elenco",
    daConfermare: "da confermare in cucina, chiedi",
    chiedi: "chiedi allo staff",
    da: "da",
    euro: "euro",
    veg: "VEG",
    vegTitle: "Vegano",
    gf: "senza glutine",
    filtri: "Filtra",
    soloVeg: "Solo piatti vegani",
    senza: "Senza",
    azzera: "Azzera",
    legenda: "Legenda allergeni",
    aggiornato: "Aggiornato il",
    oggiTitolo: "Oggi in macchina",
    oggiVuoto: "Quelli di oggi sono sul foglio del giorno. Chiedi al banco.",
    dove: "Dove siamo",
    orari: "Orari",
    contatti: "Contatti",
    apriMaps: "Apri in Maps",
    lingua: "English",
    linguaHref: "/en/menu",
    linguaCode: "en",
    stampa: "Stampa",
    nonAdatto: "contiene",
    nonVeg: "non vegano",
    chiediTag: "allergeni da confermare: chiedi",
    locale: "it_IT",
  },
  en: {
    path: "/en/menu",
    title: "Menu · Caos Caffè, Aprilia",
    description: "The menu of Caos Caffè in Aprilia: brunch, all day, lunch, aperitivo, specialty coffee. With prices and allergens.",
    skip: "Skip to menu",
    menu: "menu",
    sezioni: "Menu sections",
    allergeni: "Allergens",
    allergeniLabel: "Allergens:",
    nessuno: "none listed",
    daConfermare: "to be confirmed by the kitchen, ask",
    chiedi: "ask the staff",
    da: "from",
    euro: "euro",
    veg: "VEG",
    vegTitle: "Vegan",
    gf: "gluten free",
    filtri: "Filter",
    soloVeg: "Vegan dishes only",
    senza: "Without",
    azzera: "Reset",
    legenda: "Allergen key",
    aggiornato: "Updated on",
    oggiTitolo: "On the machine today",
    oggiVuoto: "Today's coffees are on today's sheet. Ask at the counter.",
    dove: "Where we are",
    orari: "Hours",
    contatti: "Contact",
    apriMaps: "Open in Maps",
    lingua: "Italiano",
    linguaHref: "/menu",
    linguaCode: "it",
    stampa: "Print",
    nonAdatto: "contains",
    nonVeg: "not vegan",
    chiediTag: "allergens to be confirmed: ask",
    locale: "en_GB",
  },
};

// ---------- utilità ----------
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Testo con i fornitori tra asterischi: *PEPPOVO* -> <em class="forn">PEPPOVO</em>
const inline = (s) => esc(s).replace(/\*([^*]+)\*/g, '<em class="forn">$1</em>');
const plain = (s) => String(s).replace(/\*([^*]+)\*/g, "$1");

// Caos Mano è tutto maiuscolo: si scrive in minuscolo. Il tasto "A" maiuscolo dà la ∀,
// quindi ∀ nel dato diventa "A". La Ø non c'è nel font: la rendiamo in Source Code Pro.
const mano = (s) =>
  esc(String(s).toLowerCase().replace(/∀/g, "A")).replace(/ø/g, '<span class="fb">Ø</span>');
const manoLabel = (s) => (/[∀ø]/i.test(s) ? ` aria-label="${esc(String(s).replace(/∀/g, "A"))}"` : "");

const t = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.it : v);

const prezzoNum = (p) => {
  const m = String(p).match(/\d+(?:,\d+)?/);
  return m ? Number(m[0].replace(",", ".")) : null;
};

function prezzo(v, lang) {
  if (v.prezzo === undefined) return "";
  if (!/^\d+(,\d+)?( \(\d+(,\d+)?\))?$|^\d+(,\d+)?–\d+(,\d+)?$/.test(v.prezzo)) {
    errori.push(`Prezzo non valido "${v.prezzo}" (${t(v.nome, "it")}). Usa la virgola: 5,8`);
  }
  const da = v.da ? `<span class="da">${UI[lang].da}</span> ` : "";
  return `<span class="prezzo">${da}<span class="mano">${esc(v.prezzo)}</span><span class="vh"> ${UI[lang].euro}</span></span>`;
}

// Allergeni: numeri con <abbr title> + note. Restituisce html e attributi per i filtri.
function allergeni(v, lang, dove) {
  const ui = UI[lang];
  const nums = v.allergeni;
  const nota = t(v.allergeni_nota, lang);
  const verificato = v.verificato !== false;
  const incerto = nums === undefined || !!nota || !verificato;

  if (!verificato) avvisi.push(`Allergeni da validare in cucina: ${t(v.nome, "it")} (${dove})`);
  for (const n of nums ?? []) {
    if (!menu.allergeni[n]) errori.push(`Allergene ${n} inesistente in ${t(v.nome, "it")}`);
  }

  const attr = ` data-all="${(nums ?? []).join(" ")}"${incerto ? ' data-unk="1"' : ""}`;
  let parti = [];
  if (nums === undefined) {
    parti.push(esc(ui.chiedi));
  } else {
    if (nums.length) {
      parti.push(nums.map((n) => `<abbr title="${esc(menu.allergeni[n]?.[lang] ?? "")}">${n}</abbr>`).join(", "));
    }
    if (nota) parti.push(esc(nota));
    if (!nums.length && !nota) parti.push(`—<span class="vh"> ${ui.nessuno}</span>`);
  }
  let html = parti.join(" ");
  if (!verificato) html += ` <span class="dubbio">(${esc(ui.daConfermare)})</span>`;
  return { html: `<span class="all"><span class="vh">${ui.allergeniLabel} </span>${html}</span>`, attr };
}

// ---------- voci ----------
function voce(v, lang, sez, { nascondiNome = false, h = 3 } = {}) {
  const ui = UI[lang];
  const nomeTxt = t(v.nome, lang);
  const a = allergeni(v, lang, sez.id);
  const food = sez.registro === "food";
  const flags = [];
  if (v.veg) flags.push(`<abbr class="flag" title="${ui.vegTitle}">${ui.veg}</abbr>`);
  const nomeNota = t(v.nome_nota, lang) ?? (lang === "en" ? v.nome_en?.toLowerCase() : undefined);
  const sotto = nomeNota ? ` <span class="nome-nota">${esc(nomeNota)}</span>` : "";
  const nomeHtml = nascondiNome
    ? ""
    : `<h${h} class="nome"><span class="mano"${manoLabel(nomeTxt)}>${mano(nomeTxt)}</span>${sotto}</h${h}>`;
  const desc = v.desc ? `<p class="desc">${inline(t(v.desc, lang))}</p>` : "";
  return `<li class="voce${nascondiNome ? " voce-sola" : ""}"${a.attr}${food ? ` data-veg="${v.veg ? 1 : 0}"` : ""}>
  <div class="riga">${nomeHtml}${flags.join("")}${prezzo(v, lang)}</div>
  ${desc}<p class="meta">${a.html}<span class="tag" aria-live="off"></span></p>
</li>`;
}

// Nota unica sotto una lista in cui qualche voce non ha allergeni in elenco.
const notaListaSenzaAll = (voci, lang) =>
  voci.some((v) => v.allergeni === undefined && !v.allergeni_nota)
    ? `<p class="meta nota-all">${UI[lang].allergeniLabel} ${esc(UI[lang].chiedi)}</p>`
    : "";

function voceLista(v, lang, sez) {
  const a = allergeni(v, lang, sez.id);
  const food = sez.registro === "food";
  const nome = t(v.nome, lang);
  // nelle liste brevi il "—" (nessun allergene) non si ripete su ogni riga
  const mostraAll = (v.allergeni !== undefined && v.allergeni.length) || v.allergeni_nota || v.verificato === false;
  return `<li class="breve"${a.attr}${food ? ` data-veg="${v.veg ? 1 : 0}"` : ""}>
  <span class="nome-breve">${esc(nome)}</span><span class="punti" aria-hidden="true"></span>${prezzo(v, lang)}
  <span class="meta">${mostraAll ? a.html : ""}<span class="tag"></span></span>
</li>`;
}

function oggiInMacchina(lang) {
  const ui = UI[lang];
  const oggiIso = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Rome" });
  const valido = oggi.data === oggiIso && oggi.caffe.length;
  // La lista si scrive sempre (nascosta se non è di oggi): js/menu.js la mostra quando la data coincide.
  const lista = oggi.caffe.length
    ? `<ul class="oggi-lista"${valido ? "" : " hidden"}>${oggi.caffe
        .map(
          (c) =>
            `<li><strong>${esc(c.metodo ?? "")}</strong> ${esc(c.caffe ?? "")}${c.origine ? ` · ${esc(c.origine)}` : ""}${c.note ? ` <span class="nota">${esc(c.note)}</span>` : ""}</li>`
        )
        .join("")}</ul>`
    : "";
  return `<div class="oggi" data-oggi="${esc(oggi.data)}">
  <h4 class="oggi-titolo">${ui.oggiTitolo}</h4>
  ${lista}<p class="oggi-vuoto"${valido ? " hidden" : ""}>${ui.oggiVuoto}</p>
</div>`;
}

function blocco(b, lang, sez) {
  const ui = UI[lang];
  if (b.tipo === "voci") {
    return `<ul class="voci">${b.voci.map((v) => voce(v, lang, sez)).join("\n")}</ul>`;
  }
  if (b.tipo === "lista") {
    return `<div class="lista-blocco"><h3 class="sotto">${esc(t(b.titolo, lang))}</h3>
<ul class="lista">${b.voci.map((v) => voceLista(v, lang, sez)).join("\n")}</ul>${notaListaSenzaAll(b.voci, lang)}</div>`;
  }
  if (b.tipo === "fascia") {
    const titoloEn = lang === "en" && b.titolo_en ? ` <span class="nome-nota">${esc(b.titolo_en.toLowerCase())}</span>` : "";
    const intro = b.intro ? `<p class="intro">${inline(t(b.intro, lang))}</p>` : "";
    const corpo =
      b.stile === "lista"
        ? `<ul class="lista">${b.voci.map((v) => voceLista(v, lang, sez)).join("\n")}</ul>${notaListaSenzaAll(b.voci, lang)}`
        : `<ul class="voci">${b.voci
            .map((v) => voce(v, lang, sez, { nascondiNome: t(v.nome, lang) === b.titolo, h: 4 }))
            .join("\n")}</ul>`;
    const rot = b.rotazione
      ? `<h4 class="sotto">${esc(t(b.rotazione_titolo, lang))}</h4><ul class="voci">${b.rotazione
          .map((v) => voce(v, lang, sez, { h: 5 }))
          .join("\n")}</ul>`
      : "";
    const nota = b.nota ? `<p class="nota">${inline(t(b.nota, lang))}</p>` : "";
    return `<div class="fascia">
  <h3 class="fascia-titolo"><span class="mano"${manoLabel(b.titolo)}>${mano(b.titolo)}</span>${titoloEn}</h3>
  ${intro}${b.oggi_in_macchina ? oggiInMacchina(lang) : ""}${corpo}${rot}${nota}
</div>`;
  }
  errori.push(`Blocco di tipo sconosciuto "${b.tipo}" in ${sez.id}`);
  return "";
}

function sezione(s, lang) {
  const titoloEn = lang === "en" && s.titolo_en ? `<span class="nome-nota">${esc(s.titolo_en.toLowerCase())}</span>` : "";
  const orario = s.orario ? `<p class="orario">${esc(t(s.orario, lang))}</p>` : "";
  const sotto = s.sottotitolo ? `<p class="sottotitolo">${esc(t(s.sottotitolo, lang))}</p>` : "";
  const intro = s.intro ? `<p class="intro">${inline(t(s.intro, lang))}</p>` : "";
  const nota = s.nota ? `<p class="nota">${inline(t(s.nota, lang))}</p>` : "";
  const fascia = s.fascia_oraria ? ` data-da="${s.fascia_oraria[0]}" data-a="${s.fascia_oraria[1]}"` : "";
  return `<section id="${s.id}" class="sez reg-${s.registro}" aria-labelledby="t-${s.id}"${fascia}>
  <header class="sez-testa">
    <h2 id="t-${s.id}"><span class="mano"${manoLabel(s.titolo)}>${mano(s.titolo)}</span></h2>
    ${titoloEn}${orario}<span class="adesso" hidden>${lang === "en" ? "now" : "adesso"}</span>
  </header>
  ${sotto}${intro}
  ${s.blocchi.map((b) => blocco(b, lang, s)).join("\n")}
  ${nota}
</section>`;
}

// ---------- schema.org ----------
const giorni = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function jsonLd(lang, sezioni) {
  const url = info.sito + UI[lang].path;
  const aperti = giorni.filter((_, i) => i !== info.giorno_chiuso).map((g) => `https://schema.org/${g}`);
  const turni = info.orari[info.orario_attivo].turni;
  const itemLd = (v) => {
    const o = { "@type": "MenuItem", name: t(v.nome, lang) };
    if (v.desc) o.description = plain(t(v.desc, lang));
    const p = prezzoNum(v.prezzo);
    if (p !== null) {
      o.offers = { "@type": "Offer", priceCurrency: "EUR", price: p.toFixed(2) };
      if (v.da) o.offers.description = lang === "en" ? "starting price" : "prezzo a partire da";
    }
    const diete = [];
    if (v.veg) diete.push("https://schema.org/VeganDiet");
    if (v.senza_glutine) diete.push("https://schema.org/GlutenFreeDiet");
    if (diete.length) o.suitableForDiet = diete;
    return o;
  };
  const data = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "CafeOrCoffeeShop"],
    "@id": info.sito + "/#locale",
    name: info.nome,
    url: info.sito,
    email: info.email,
    telephone: info.telefono,
    foundingDate: String(info.est),
    servesCuisine: ["Brunch", "Caffè", "Italiana"],
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: info.indirizzo.via,
      postalCode: info.indirizzo.cap,
      addressLocality: info.indirizzo.citta,
      addressRegion: info.indirizzo.provincia,
      addressCountry: info.indirizzo.paese,
    },
    sameAs: [info.instagram, info.facebook],
    openingHoursSpecification: turni.map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: aperti,
      opens,
      closes,
    })),
    hasMenu: {
      "@type": "Menu",
      "@id": url + "#menu",
      url,
      inLanguage: lang,
      hasMenuSection: sezioni.map((s) => ({
        "@type": "MenuSection",
        name: s.titolo.replace(/∀/g, "A"),
        ...(s.orario ? { description: t(s.orario, lang) } : {}),
        hasMenuItem: s.blocchi.flatMap((b) => [...b.voci, ...(b.rotazione ?? [])]).map(itemLd),
      })),
    },
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// ---------- pagina ----------
function pagina(lang) {
  const ui = UI[lang];
  const sezioni = menu.sezioni.filter((s) => !s.draft);
  const altro = lang === "it" ? "en" : "it";
  const orario = info.orari[info.orario_attivo];
  const [y, m, d] = menu.aggiornato.split("-");
  const tel = info.telefono.replace(/[^\d+]/g, "");
  const filosofia = t(menu.testi.filosofia, lang);
  const nav = sezioni
    .map((s) => `<li><a href="#${s.id}"><span class="mano"${manoLabel(s.titolo)}>${mano(s.titolo)}</span></a></li>`)
    .join("");
  const allergeniVoci = Object.entries(menu.allergeni);
  const clientData = {
    lang,
    giornoChiuso: info.giorno_chiuso,
    turni: orario.turni,
    allergeni: Object.fromEntries(allergeniVoci.map(([n, v]) => [n, v[lang]])),
    testi: {
      it: { chiuso: "Oggi siamo chiusi. Ci vediamo domani.", fuori: "Adesso siamo chiusi. Apriamo alle", adesso: "Adesso in cucina:" },
      en: { chiuso: "We're closed today. See you tomorrow.", fuori: "We're closed right now. We open at", adesso: "In the kitchen now:" },
    }[lang],
    ui: { nonAdatto: ui.nonAdatto, nonVeg: ui.nonVeg, chiedi: ui.chiediTag },
  };

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(ui.title)}</title>
<meta name="description" content="${esc(ui.description)}">
<link rel="canonical" href="${info.sito}${ui.path}">
<link rel="alternate" hreflang="it" href="${info.sito}${UI.it.path}">
<link rel="alternate" hreflang="en" href="${info.sito}${UI.en.path}">
<link rel="alternate" hreflang="x-default" href="${info.sito}${UI.it.path}">
<meta name="theme-color" content="#000000">
<meta property="og:type" content="website">
<meta property="og:locale" content="${ui.locale}">
<meta property="og:site_name" content="${esc(info.nome)}">
<meta property="og:title" content="${esc(ui.title)}">
<meta property="og:description" content="${esc(ui.description)}">
<meta property="og:url" content="${info.sito}${ui.path}">
<meta property="og:image" content="${info.sito}/img/og-menu.jpg">
<link rel="preload" href="/fonts/SourceCodePro-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/CaosMano-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/menu.css">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<script type="application/ld+json">${jsonLd(lang, sezioni)}</script>
</head>
<body>
<a class="skip" href="#contenuto">${ui.skip}</a>
<header class="testa">
  <a class="logo" href="/"><img src="/img/logo-caos.svg" alt="CAOS Caffè, est. 1969" width="132" height="44"></a>
  <a class="lingua" href="${ui.linguaHref}" hreflang="${ui.linguaCode}" lang="${ui.linguaCode}">${ui.lingua}</a>
</header>

<nav class="nav-sez" aria-label="${ui.sezioni}">
  <ul>${nav}<li><a href="#allergeni">${ui.allergeni}</a></li></ul>
</nav>

<main id="contenuto">
  <div class="apertura">
    <h1><span class="mano">${mano(ui.menu)}</span></h1>
    <p class="filosofia-titolo">${esc(t(menu.testi.filosofia_titolo, lang))}</p>
    <p class="filosofia">${esc(filosofia[0])}</p>
    <p class="filosofia-chiusa">${filosofia.slice(1).map(esc).join("<br>")}</p>
    <p class="come">${esc(t(menu.testi.come_funziona, lang))}</p>
    <p class="striscia" id="striscia" hidden></p>

    <form class="filtri" id="filtri" hidden aria-label="${ui.filtri}">
      <fieldset>
        <legend>${ui.filtri}</legend>
        <label class="check"><input type="checkbox" name="veg"> ${ui.soloVeg}</label>
        <p class="senza-label">${ui.senza}:</p>
        <div class="chips">
          ${allergeniVoci
            .map(([n, v]) => `<label class="chip"><input type="checkbox" name="senza" value="${n}"><span>${n} ${esc(v[lang])}</span></label>`)
            .join("\n          ")}
        </div>
        <button type="reset" class="azzera">${ui.azzera}</button>
        <p class="esito" id="esito" aria-live="polite"></p>
      </fieldset>
    </form>
  </div>

  ${sezioni.map((s) => sezione(s, lang)).join("\n\n  ")}

  <section id="allergeni" class="legenda" aria-labelledby="t-allergeni">
    <h2 id="t-allergeni">${ui.legenda}</h2>
    <ol class="legenda-lista">
      ${allergeniVoci.map(([n, v]) => `<li value="${n}"><span class="n">${n}</span> ${esc(v[lang])}</li>`).join("\n      ")}
    </ol>
    <p class="contaminazione">${esc(t(menu.testi.contaminazione, lang))}</p>
    <p class="piede">${esc(t(menu.testi.piede, lang))}</p>
    <p class="aggiornato">${ui.aggiornato} ${d}/${m}/${y}</p>
  </section>
</main>

<footer class="piede-sito">
  <div>
    <h2>${ui.dove}</h2>
    <p>${esc(info.indirizzo.via)}<br>${esc(info.indirizzo.cap)} ${esc(info.indirizzo.citta)} (${esc(info.indirizzo.provincia)})</p>
    <p><a href="${esc(info.maps)}" rel="noopener">${ui.apriMaps}</a></p>
  </div>
  <div>
    <h2>${ui.orari}</h2>
    <p>${esc(orario[lang])}<br>${esc(info.chiuso[lang])}</p>
  </div>
  <div>
    <h2>${ui.contatti}</h2>
    <p><a href="tel:${tel}">${esc(info.telefono)}</a><br><a href="mailto:${esc(info.email)}">${esc(info.email)}</a></p>
    <p><a href="${esc(info.instagram)}" rel="noopener">Instagram</a> · <a href="${esc(info.facebook)}" rel="noopener">Facebook</a></p>
  </div>
  <p class="payoff">${esc(info.payoff)}</p>
</footer>

<script type="application/json" id="dati-menu">${JSON.stringify(clientData).replace(/</g, "\\u003c")}</script>
<script src="/js/menu.js" defer></script>
</body>
</html>
`;
}

// ---------- scrittura ----------
function scrivi(rel, contenuto) {
  const f = join(DIST, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, contenuto);
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
if (existsSync(join(ROOT, "public"))) {
  cpSync(join(ROOT, "public"), DIST, { recursive: true, filter: (f) => !f.endsWith(".md") });
}

const it = pagina("it");
const en = pagina("en");

for (const s of menu.sezioni.filter((s) => s.draft)) avvisi.push(`Sezione in bozza, non pubblicata: ${s.titolo}`);

if (errori.length) {
  console.error("\nERRORI — correggi data/*.json e rilancia:\n  " + [...new Set(errori)].join("\n  "));
  process.exit(1);
}

scrivi("menu/index.html", it);
scrivi("en/menu/index.html", en);

const unici = [...new Set(avvisi)];
if (unici.length) console.warn("Da controllare prima di pubblicare:\n  " + unici.join("\n  "));
console.log(`\nOK: dist/menu/index.html (${(it.length / 1024).toFixed(1)} KB), dist/en/menu/index.html (${(en.length / 1024).toFixed(1)} KB)`);
