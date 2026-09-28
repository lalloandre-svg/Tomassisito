(function () {
  /* Coffee Crush gioco — logica (sezione sections/coffee-crush-game.liquid) */
  var EN = (function () { var r = document.getElementById('CoffeeCrush'); return !!(r && r.getAttribute('data-lang') === 'en'); })();
  var AXN = 7; /* famiglie aromatiche: 0 fiori, 1 tropicale, 2 frutti rossi, 3 agrumi, 4 cioccolato/nocciola, 5 fermentati, 6 tè */
  var KW = [
    ['gelsomin',0],['rosa',0],['lavand',0],['violett',0],['fior',0],['floral',0],['magnoli',0],['sambuc',0],['carcad',0],
    ['mango',1],['ananas',1],['passion',1],['litchi',1],['banana',1],['cocco',1],['tropical',1],['melone',1],['anguria',1],['cocomero',1],['papaya',1],['pesca',1],['nettarina',1],['albicocc',1],
    ['fragol',2],['lampon',2],['mora',2],['mirtill',2],['ribes',2],['frutti di bosco',2],['frutti rossi',2],['ciliegi',2],['prugna',2],['uva',2],['red fruits',2],
    ['limone',3],['mandarin',3],['aranci',3],['pompelmo',3],['citronell',3],['lemongrass',3],['citrus',3],['bergamott',3],['mela ',3],['apple',3],
    ['cioccolat',4],['caramello',4],['nocciol',4],['miele',4],['vanigli',4],['biscott',4],['cacao',4],['mandorl',4],['frutta secca',4],['zucchero',4],['nutty',4],['chocolate',4],['melassa',4],['honey',4],
    ['bubblegum',5],['anaerobic',5],['mosto',5],['fermentazion',5],['maceration',5],['thermal',5],['caramella',5],['sciroppo',5],['funky',5],
    ['tè verde',6],['te verde',6],['tè nero',6],['camomill',6],['green tea',6]
  ];

  function vecFor(p) {
    var text = ((p.desc || '') + ' ' + (p.tags || '')).toLowerCase();
    var v = [0,0,0,0,0,0,0];
    for (var i = 0; i < KW.length; i++) if (text.indexOf(KW[i][0]) >= 0) v[KW[i][1]] += 1;
    for (var c = 0; c < AXN; c++) v[c] = Math.min(v[c], 3);
    var s = 0; for (var j = 0; j < AXN; j++) s += v[j] * v[j];
    if (!s) { v[4] = 1; s = 1; }
    s = Math.sqrt(s);
    for (var k = 0; k < AXN; k++) v[k] = v[k] / s;
    return v;
  }
  function hash(str) { var h = 0; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; }
  function num(x) { var n = parseFloat(x); return isNaN(n) ? null : Math.max(0, Math.min(10, n)); }

  /* ---------- bio dating scritte a mano (per handle); i caffe nuovi usano il fallback ---------- */
  var BIOS = {
    'colombia-el-vergel-bourbon-sidra-mosto': { n:'El Vergel Sidra Mosto', b:'Bubblegum, banana e cocomero. Ti scrive alle 3 di notte "sei sveglia?". Illegale in dodici paesi del gusto.', bEN:'Bubblegum, banana and watermelon. Texts you "you up?" at 3am. Illegal in twelve countries of taste.', t:['fragola','banana','ananas','bubblegum'], tEN:['strawberry','banana','pineapple','bubblegum'] },
    'colombia-finca-el-paraiso-lychee': { n:'Paraíso Lychee', b:'Esotico ma serio: ti porta ai tropici senza farti uscire dalla cucina. Le red flag le lascia agli altri.', bEN:'Exotic but serious: takes you to the tropics without leaving the kitchen. Leaves the red flags to others.', t:['litchi','frutto della passione','ananas','pesca'], tEN:['lychee','passion fruit','pineapple','peach'] },
    'colombia-zarza-bourbon-aji': { n:'Zarza Bourbon Ají', b:'Dolce come i messaggi del buongiorno. Miele, more e caramella alla fragola: lo approva perfino tua nonna.', bEN:'Sweet as good-morning texts. Honey, blackberry and strawberry candy: even your grandma approves.', t:['miele','mora','ciliegia','caramella alla fragola'], tEN:['honey','blackberry','cherry','strawberry candy'] },
    'colombia-el-diviso-typica-mejorado': { n:'El Diviso', b:'Succoso e solare: melone, anguria e pesca. L’estate che non vuoi far finire.', bEN:'Juicy and sunny: melon, watermelon and peach. The summer you never want to end.', t:['melone','pesca','anguria','fragola'], tEN:['melon','peach','watermelon','strawberry'] },
    'colombia-mikava-santuario-reserve': { n:'Mikava Reserve', b:'Complicato ma affascinante: limone, lemongrass e camomilla. Uno yoga retreat in tazza.', bEN:'Complicated but charming: lemon, lemongrass and chamomile. A yoga retreat in a cup.', t:['limone','lemongrass','tè verde','camomilla'], tEN:['lemon','lemongrass','green tea','chamomile'] },
    'costa-rica-las-lajas-finca-carrizal': { n:'Las Lajas Carrizal', b:'Frizzante e croccante: uva verde, ribes e lampone. Il primo bacio che non ti aspettavi.', bEN:'Fizzy and crisp: green grape, redcurrant and raspberry. The first kiss you didn’t see coming.', t:['uva verde','ribes','lampone','sambuco'], tEN:['green grape','redcurrant','raspberry','elderflower'] },
    'kenya-nyeri-specialty-coffee': { n:'Nyeri Shir', b:'Il mattiniero: mandarino, limone e biscotto al burro. Ti sveglia col sorriso, senza snooze.', bEN:'The early bird: mandarin, lemon and butter biscuit. Wakes you up smiling, no snooze.', t:['mandarino','limone','frutti rossi','biscotto al burro'], tEN:['mandarin','lemon','red fruits','butter biscuit'] },
    'etiopia-messier-washed': { n:'Messier', b:'Il poeta pulito: pesca, violetta e tè verde. Ti scrive lettere, non messaggi.', bEN:'The clean poet: peach, violet and green tea. Writes you letters, not texts.', t:['pesca gialla','violetta','tè verde','mirtillo'], tEN:['yellow peach','violet','green tea','blueberry'] },
    'family-blend': { n:'Family Blend', b:'Quello che ti presenta subito ai suoi: fragola, caramello e cioccolato. Un abbraccio di famiglia.', bEN:'The one who introduces you to their parents right away: strawberry, caramel and chocolate. A family hug.', t:['fragola','miele','caramello','cioccolato'], tEN:['strawberry','honey','caramel','chocolate'] },
    'peru-anas-blues-washed': { n:'Añas Blues', b:'Affidabile ma mai noioso: mandarino, miele e cioccolato. Il ragazzo della porta accanto, versione specialty.', bEN:'Reliable but never boring: mandarin, honey and chocolate. The boy next door, specialty edition.', t:['mandarino','miele','cioccolato','caramello'], tEN:['mandarin','honey','chocolate','caramel'] },
    'etiopia-makhore-natural': { n:'Makhore', b:'Doppia vita: di giorno mirtillo e fragola, di notte cioccolato fondente. Non riesci a smettere di pensarci.', bEN:'Double life: blueberry and strawberry by day, dark chocolate by night. You can’t stop thinking about it.', t:['mirtillo','fragola','arancia','cioccolato fondente'], tEN:['blueberry','strawberry','orange','dark chocolate'] },
    'blend-futuro': { n:'Blend Futuro', b:'Ambizioso: al secondo appuntamento parla già di futuro. Mandarino, fragola e caramello.', bEN:'Ambitious: talks about the future on the second date. Mandarin, strawberry and caramel.', t:['mandarino','fragola','caramello','nocciola'], tEN:['mandarin','strawberry','caramel','hazelnut'] },
    'brasile-cerrado-mineiro-natural': { n:'San Rafael', b:'Zero giochetti: cacao, cioccolato e frutta secca. Ti tiene la porta aperta e mantiene le promesse.', bEN:'No games: cocoa, chocolate and dried fruit. Holds the door open and keeps its promises.', t:['cacao','cioccolato fondente','uva passa','frutta secca'], tEN:['cocoa','dark chocolate','raisin','dried fruit'] },
    'blend-1969': { n:'Blend 1969', b:'Il classico intramontabile: cioccolato al latte, nocciola e caramello. Come i film in bianco e nero, ma caldo.', bEN:'The timeless classic: milk chocolate, hazelnut and caramel. Like black-and-white films, but warm.', t:['cioccolato al latte','nocciola','mandorla','caramello'], tEN:['milk chocolate','hazelnut','almond','caramel'] },
    'colombia-ombligon-floral-symphony': { n:'Ombligón Floral Symphony', b:'Si presenta con un mazzo di fiori e una playlist già pronta: ciliegia, anguria, gelsomino e rosa. Esagerato, e lo sa.', bEN:'Shows up with a bouquet and a playlist ready: cherry, watermelon, jasmine and rose. Over the top, and knows it.', t:['ciliegia','anguria','gelsomino','rosa'], tEN:['cherry','watermelon','jasmine','rose'] }
  };
  var FALLBIO = [
    'Romantico dichiarato: profuma di fiori e non se ne vergogna. Ti fa sentire speciale dal primo sorso.',
    'Spirito tropicale: vacanza permanente, frutta esotica e zero pensieri. Ti porta lontano restando in tazza.',
    'Cuore di frutti rossi: dolce, succoso, impossibile da dimenticare. Il crush estivo che dura tutto l’anno.',
    'Frizzante e brillante: ti sveglia meglio della sveglia. Agrumi, energia e battute pronte.',
    'La comfort zone fatta caffè: cioccolato, caramello e coccole. Con lui non serve fingere.',
    'Toxic ma hot: fermentazioni spinte e sapori che non dovrebbero esistere. Lo sai che è un azzardo, ci caschi lo stesso.',
    'Elegante e pulito: tè verde, silenzi comodi, green flag ovunque. La calma che cercavi.'
  ];
  var FALLBIO_EN = [
    'A self-declared romantic: smells of flowers and isn’t ashamed of it. Makes you feel special from the first sip.',
    'Tropical soul: permanent holiday, exotic fruit, zero worries. Takes you far while staying in the cup.',
    'Red-fruit heart: sweet, juicy, impossible to forget. The summer crush that lasts all year.',
    'Fizzy and bright: wakes you up better than your alarm. Citrus, energy and quick comebacks.',
    'The comfort zone in coffee form: chocolate, caramel and cuddles. With them you don’t have to pretend.',
    'Toxic but hot: pushed fermentations and flavours that shouldn’t exist. You know it’s a gamble, you swipe anyway.',
    'Clean and elegant: green tea, comfortable silences, green flags everywhere. The calm you were looking for.'
  ];

  function buildCoffee(p) {
    var bio = BIOS[p.handle];
    var v = vecFor(p);
    var dom = 0; for (var i = 1; i < AXN; i++) if (v[i] > v[dom]) dom = i;
    var name = bio ? bio.n : (p.title.indexOf(':') >= 0 ? p.title.split(':').pop().trim() : p.title);
    var notes = bio ? (EN ? bio.tEN : bio.t) : (function () {
      var m = (p.desc || '').match(/(?:Profilo (?:sensoriale|aromatico)|(?:Sensory|Aromatic) profile):\s*([^]*?)(?:Variet|Process|$)/i);
      return m ? m[1].split(',').slice(0, 4).map(function (s) { return s.trim(); }).filter(Boolean) : [];
    })();
    var bioText = bio ? (EN ? bio.bEN : bio.b) : (EN ? FALLBIO_EN[dom] : FALLBIO[dom]);
    return { p: p, vec: v, dom: dom, name: name, bio: bioText, notes: notes,
      val: { sweet: num(p.sweet), body: num(p.body), acid: num(p.acid) },
      jit: (hash(p.handle) % 97) / 97000 };
  }

  /* ---------- domande di RISERVA (usate solo se nella sezione non ci sono blocchi "Domanda") ----------
     k: 'body' | 'acid' | 'sweet' -> dir +1 = "♥ vuol dire valore alto", -1 = "♥ vuol dire valore basso"
     f: famiglia aromatica (0-6). Ordine alternato attributo / aroma. */
  var CARDS = [
    { e:'🫂', k:'body', dir:1, t:'Ti piacciono gli abbracci che stritolano?', tEN:'Into hugs that squeeze the air out of you?' },
    { e:'🍓', f:2, t:'Colazione a letto, con le fragole?', tEN:'Breakfast in bed, with strawberries?' },
    { e:'😏', k:'acid', dir:1, t:'Ti piace chi ti punzecchia?', tEN:'Into someone who teases you?' },
    { e:'💐', f:0, t:'Ti conquista chi si presenta con i fiori?', tEN:'Won over by someone who shows up with flowers?' },
    { e:'🥰', k:'sweet', dir:1, t:'Ti sciogli per le smancerie?', tEN:'Do you melt for sweet talk?' },
    { e:'🏝️', f:1, t:'Prima fuga insieme: ai tropici?', tEN:'First getaway together: the tropics?' },
    { e:'🛋️', k:'acid', dir:-1, t:'Serata tranquilla, zero colpi di scena?', tEN:'Quiet night in, no plot twists?' },
    { e:'🍫', f:4, t:'Divano, coperta e cioccolata calda?', tEN:'Sofa, blanket and hot chocolate?' },
    { e:'🩰', k:'body', dir:-1, t:'Ti piace chi ha il passo leggero?', tEN:'Into someone light on their feet?' },
    { e:'🍊', f:3, t:'Spritz al tramonto?', tEN:'Spritz at sunset?' },
    { e:'🖤', k:'sweet', dir:-1, t:'Ti piacciono i tipi tosti, di poche parole?', tEN:'Into the tough, quiet type?' },
    { e:'🍵', f:6, t:'Domenica mattina: tè e un buon libro?', tEN:'Sunday morning: tea and a good book?' },
    { e:'🌶️', f:5, t:'Ti attirano quelli un po’ pericolosi?', tEN:'Drawn to the slightly dangerous ones?' }
  ];

  /* ---------- mazzo della partita ----------
     Blocchi "Domanda" = tipi (kind) con fino a 5 varianti. A ogni partita: una variante per tipo (a rotazione, così chi
     rigioca vede domande diverse) e ordine mischiato. Il punteggio dipende solo dal tipo -> stesse risposte, stesso caffè. */
  var KIND = { body_hi:{k:'body',dir:1}, body_lo:{k:'body',dir:-1}, acid_hi:{k:'acid',dir:1}, acid_lo:{k:'acid',dir:-1}, sweet_hi:{k:'sweet',dir:1}, sweet_lo:{k:'sweet',dir:-1},
    f0:{f:0}, f1:{f:1}, f2:{f:2}, f3:{f:3}, f4:{f:4}, f5:{f:5}, f6:{f:6} };
  var SLOTS = [], GAME = [], NK = { sweet:0, body:0, acid:0 };
  function loadSlots(r) {
    var q = [];
    try { q = JSON.parse(r.querySelector('[data-ccg-questions]').textContent) || []; } catch (e) { q = []; }
    q = q.filter(function (x) { return KIND[x.k] && x.v && x.v.length; });
    if (!q.length) q = CARDS.map(function (c, i) {
      var k = c.k ? c.k + (c.dir > 0 ? '_hi' : '_lo') : 'f' + c.f;
      return { id: 'fallback-' + i, k: k, v: [{ e: c.e, t: c.t, en: c.tEN }] };
    });
    return q;
  }
  function plays() { return parseInt(ls('ccg_plays') || '0', 10) || 0; }
  function buildGame() {
    var n = plays(), firstEmoji = '💘';
    GAME = SLOTS.map(function (sl) {
      var v = sl.v[(n + hash(sl.id)) % sl.v.length];
      var m = KIND[sl.k], e = v.e || (sl.v[0] && sl.v[0].e) || firstEmoji;
      return { e: e, k: m.k, dir: m.dir, f: m.f, t: v.t, tEN: v.en || v.t, slot: sl.id };
    });
    for (var i = GAME.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = GAME[i]; GAME[i] = GAME[j]; GAME[j] = x; }
    NK = { sweet:0, body:0, acid:0 };
    GAME.forEach(function (c) { if (c.k) NK[c.k]++; });
    renderPreview();
  }
  /* la card davanti nella home È la prima domanda: swipandola parte il gioco */
  function renderPreview() {
    if (!root) return;
    for (var i = 0; i < 3; i++) {
      var c = GAME[i]; if (!c) continue;
      var pe = root.querySelector('[data-ccg-pe="' + i + '"]'), pt = root.querySelector('[data-ccg-pt="' + i + '"]');
      if (pe) pe.textContent = c.e;
      if (pt) pt.textContent = EN ? c.tEN : c.t;
    }
    var pc = root.querySelector('[data-ccg-pcard]');
    if (pc) { pc.classList.remove('fly-r', 'fly-l', 'is-drag'); pc.style.removeProperty('--dx'); pc.style.removeProperty('--dr'); pc.querySelectorAll('.ccg__pstamp').forEach(function (s) { s.style.opacity = ''; }); }
  }
  function renderSingles() {
    var box = root.querySelector('[data-ccg-single]'); if (!box || !coffees.length) return;
    var av = root.querySelector('[data-ccg-avs]'), tx = root.querySelector('[data-ccg-singletext]');
    var withImg = coffees.filter(function (c) { return c.p.img; }).slice(0, 5);
    if (av) av.innerHTML = withImg.map(function (c) { return '<img src="' + c.p.img + '" alt="" width="36" height="36" loading="lazy">'; }).join('');
    if (tx) tx.textContent = EN ? coffees.length + ' single coffees are waiting for you 😏' : coffees.length + ' caffè single ti aspettano 😏';
    box.hidden = false;
  }

  /* ---------- stato ---------- */
  var root, gate, play, reveal, result, deck, stepEl, barEl, coffees = [], CODE = 'COFFEECRUSH10', FCODE = '', PCT = 10;
  var FAIR = false, EXPORT = false, WHEN = 'end', ENDPOINT = '';
  var phase = 'gate', idx = 0, likes = 0, votes = { sweet:0, body:0, acid:0 }, fvec = [0,0,0,0,0,0,0], busy = false;
  var leadDone = false, idleT = null;
  var cur = null; /* risultato corrente: { top, runners, compat } */

  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function isSub() { return !FAIR && ls('ccg_sub') === '1'; }
  function setSub() { if (!FAIR) ls('ccg_sub', '1'); }
  function saveState() { if (FAIR) return; try { sessionStorage.setItem('ccg_state4', JSON.stringify({ ph: phase, l: likes, v: votes, f: fvec, n: NK, g: GAME.length })); } catch (e) {} }
  function loadState() { if (FAIR) return null; try { return JSON.parse(sessionStorage.getItem('ccg_state4') || 'null'); } catch (e) { return null; } }
  function clearState() { try { sessionStorage.removeItem('ccg_state4'); } catch (e) {} }
  /* altezza di un'eventuale testata fissa (su questa pagina di norma non è fissa) */
  function headH() {
    var h = 0;
    document.querySelectorAll('.shopify-section-group-header-group, sticky-header, .header-wrapper').forEach(function (el) {
      var cs = getComputedStyle(el);
      if (cs.position !== 'sticky' && cs.position !== 'fixed') return;
      var r = el.getBoundingClientRect();
      if (r.height > 0 && r.height < window.innerHeight * 0.6) h = Math.max(h, r.bottom > 0 && r.top <= 1 ? r.bottom : r.height);
    });
    return Math.round(h);
  }
  function measure() { if (root) root.style.setProperty('--ccg-head', headH() + 'px'); }
  function scrollToEl(el) {
    if (!el) return;
    var go = function () {
      measure();
      var y = el.getBoundingClientRect().top + window.pageYOffset - headH() - 12;
      try { window.scrollTo({ top: Math.max(0, y), behavior: 'auto' }); } catch (e) { window.scrollTo(0, Math.max(0, y)); }
    };
    go(); setTimeout(go, 120);
  }
  function param(name) { var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(location.search); return m ? decodeURIComponent(m[1]) : ''; }
  function show(which) {
    [gate, play, reveal, result].forEach(function (el) { if (el) el.hidden = (el !== which); });
  }

  /* ---------- email raccolte in fiera: restano sul dispositivo (export CSV) + Shopify + endpoint opzionale ---------- */
  function leads() { try { return JSON.parse(ls('ccg_leads') || '[]'); } catch (e) { return []; } }
  function saveLeads(a) { ls('ccg_leads', JSON.stringify(a)); }
  function addLead(email, match) {
    var a = leads(), rec = { e: email, m: match || '', t: new Date().toISOString(), s: 0 };
    a.push(rec); saveLeads(a);
    return a.length - 1;
  }
  function markSynced(i) { var a = leads(); if (a[i]) { a[i].s = 1; saveLeads(a); } }
  function renderExport() {
    var box = root.querySelector('[data-ccg-export]'); if (!box) return;
    var a = leads(), ok = a.filter(function (x) { return x.s; }).length;
    box.innerHTML = '<h2>' + (EN ? 'Emails collected on this device' : 'Email raccolte su questo dispositivo') + ': ' + a.length + '</h2>' +
      '<p>' + (EN ? 'Confirmed by Shopify: ' : 'Confermate da Shopify: ') + ok + ' · ' + (EN ? 'download the CSV and import it in Admin > Customers.' : 'scarica il CSV e importalo in Admin > Clienti.') + '</p>' +
      '<div class="ccg__actions"><button type="button" class="ccg__btn ccg__btn--dark" data-ccg-csv' + (a.length ? '' : ' disabled') + '>' + (EN ? 'Download CSV' : 'Scarica CSV') + '</button>' +
      '<button type="button" class="ccg__copy" data-ccg-wipe' + (a.length ? '' : ' disabled') + '>' + (EN ? 'Clear list' : 'Svuota elenco') + '</button></div>';
    box.hidden = false;
  }
  function downloadCsv() {
    var rows = [['Email', 'Email Marketing: Status', 'Tags', 'Note', 'Data', 'Confermata Shopify']];
    leads().forEach(function (x) { rows.push([x.e, 'subscribed', 'newsletter, coffee-crush, fiera', 'Coffee Crush match: ' + x.m, x.t, x.s ? 'si' : 'no']); });
    var csv = rows.map(function (r) { return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(','); }).join('\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'coffee-crush-email-' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- modalità fiera: reset automatico se nessuno tocca lo schermo ---------- */
  function bump() {
    if (!FAIR) return;
    clearTimeout(idleT);
    var ms = phase === 'play' ? 60000 : phase === 'reveal' ? 90000 : phase === 'result' ? 45000 : 0;
    if (ms) idleT = setTimeout(resetFair, ms);
  }
  function resetFair() {
    clearTimeout(idleT);
    phase = 'gate'; idx = 0; likes = 0; votes = { sweet:0, body:0, acid:0 }; fvec = [0,0,0,0,0,0,0]; busy = false; leadDone = false; cur = null;
    var form = document.getElementById('CoffeeCrushSignup');
    if (form) { form.reset(); hideErrs(form); }
    placeForm();
    if (result) result.innerHTML = '';
    buildGame();
    show(gate);
    if (EXPORT) renderExport();
    window.scrollTo(0, 0);
  }

  function init() {
    root = document.getElementById('CoffeeCrush');
    if (!root) return;
    CODE = root.getAttribute('data-code') || CODE;
    FCODE = root.getAttribute('data-faircode') || CODE;
    PCT = root.getAttribute('data-pct') || PCT;
    WHEN = root.getAttribute('data-when') === 'start' ? 'start' : 'end';
    ENDPOINT = root.getAttribute('data-endpoint') || '';
    var products = [];
    try { products = JSON.parse(root.querySelector('[data-ccg-products]').textContent); } catch (e) { products = []; }
    coffees = products.map(buildCoffee);
    SLOTS = loadSlots(root);
    gate = root.querySelector('[data-ccg-gate]');
    play = root.querySelector('[data-ccg-play]');
    reveal = root.querySelector('[data-ccg-reveal]');
    result = root.querySelector('[data-ccg-result]');
    deck = root.querySelector('[data-ccg-deck]');
    stepEl = root.querySelector('[data-ccg-step]');
    barEl = root.querySelector('[data-ccg-bar]');
    measure();
    var totalEl = root.querySelector('[data-ccg-total]');
    if (totalEl) totalEl.textContent = SLOTS.length;
    buildGame();
    renderSingles();
    attachDrag(root.querySelector('[data-ccg-pcard]'), function (liked) { startGame(liked); });

    /* modalità fiera: ?fiera=1 la accende (resta accesa sul dispositivo), ?fiera=0 la spegne, ?fiera=export mostra le email raccolte */
    var f = param('fiera');
    if (f === '1' || f === 'export') ls('ccg_fair', '1');
    if (f === '0') ls('ccg_fair', null);
    FAIR = ls('ccg_fair') === '1';
    EXPORT = FAIR && f === 'export';
    document.documentElement.classList.toggle('ccg-fair', FAIR);
    root.querySelector('[data-ccg-webnote]').hidden = FAIR;
    root.querySelector('[data-ccg-fairnote]').hidden = !(FAIR && WHEN === 'end');
    root.querySelector('[data-ccg-formnote]').hidden = FAIR;
    root.querySelector('[data-ccg-consentwrap]').hidden = !FAIR;
    var tags = root.querySelector('[data-ccg-tags]');
    if (tags) tags.value = FAIR ? 'newsletter, coffee-crush, fiera' : 'newsletter, coffee-crush';
    if (FAIR) clearState();
    placeForm();
    if (EXPORT) renderExport();

    /* rientro dal submit nativo del form newsletter */
    if (!FAIR && (param('ccg') === 'unlocked' || /customer_posted=true/.test(location.search))) setSub();

    /* link condiviso: ?match=handle */
    var sh = param('match');
    if (sh && !FAIR) {
      var c = coffees.filter(function (x) { return x.p.handle === sh; })[0];
      var box = root.querySelector('[data-ccg-shared]');
      if (c && box) {
        box.innerHTML = (c.p.img ? '<img src="' + c.p.img + '" alt="">' : '') +
          '<p>' + (EN ? 'Your friend matched with <strong>' + esc(c.name) + '</strong>. Who will you match with?' : 'Chi ti ha mandato qui ha fatto match con <strong>' + esc(c.name) + '</strong>. E tu con chi fai match?') + '</p>';
        box.hidden = false;
      }
    }

    /* si apre SEMPRE sull'intro; il risultato torna solo se si rientra col tasto "indietro" (es. dalla scheda caffè) */
    var nav = null; try { nav = performance.getEntriesByType('navigation')[0]; } catch (e) {}
    var st = loadState();
    if (st && st.ph === 'result' && coffees.length && nav && nav.type === 'back_forward' && !(window.Shopify && Shopify.designMode)) {
      likes = st.l || 0; votes = st.v || votes; fvec = st.f || fvec; NK = st.n || NK; busy = false;
      finish();
    } else { clearState(); show(gate); phase = 'gate'; }
  }

  /* il form (unico, renderizzato da Shopify) viene spostato dove serve */
  function placeForm(slot) {
    var form = document.getElementById('CoffeeCrushSignup');
    if (!form || !root) return;
    var submit = form.querySelector('[data-ccg-submit]');
    var gslot = root.querySelector('[data-ccg-gateslot]');
    var gstart = root.querySelector('[data-ccg-gstart]');
    var fairStart = FAIR && WHEN === 'start' && !leadDone && phase === 'gate';
    if (gslot) gslot.hidden = !fairStart;
    if (gstart) gstart.hidden = fairStart;
    if (!slot) slot = fairStart ? gslot : root.querySelector('[data-ccg-formwrap]');
    slot.appendChild(form);
    if (submit) {
      if (fairStart) submit.textContent = EN ? 'Let’s play →' : 'Giochiamo →';
      else if (phase === 'reveal') submit.textContent = EN ? 'Reveal my match' : 'Svelami il match';
      else submit.textContent = EN ? 'Sign me up & unlock' : 'Iscrivimi e sblocca';
    }
  }
  function hideErrs(form) { form.querySelectorAll('[data-ccg-err],[data-ccg-err2]').forEach(function (e) { e.hidden = true; }); }

  /* first: undefined = bottone "Inizia"; true/false = risposta già data swipando la card della home */
  function startGame(first) {
    if (!root || !coffees.length) return;
    if (FAIR && WHEN === 'start' && !leadDone) { renderPreview(); var e = document.getElementById('CcgEmail'); if (e) try { e.focus(); } catch (x) {} return; }
    if (!GAME.length || phase !== 'gate') buildGame();
    ls('ccg_plays', String(plays() + 1));
    phase = 'play'; idx = 0; likes = 0; votes = { sweet:0, body:0, acid:0 }; fvec = [0,0,0,0,0,0,0]; busy = false;
    if (!FAIR || WHEN !== 'start') leadDone = false;
    placeForm();
    if (first === true || first === false) { score(GAME[0], first); idx = 1; }
    show(play);
    saveState();
    renderDeck();
    scrollToEl(play);
    bump();
  }
  function score(card, liked) {
    if (liked) likes++;
    if (card.k) votes[card.k] += (liked ? 1 : -1) * card.dir;
    else if (card.f !== undefined) { if (liked) fvec[card.f] += 1; }
  }

  /* ---------- deck & swipe ---------- */
  function renderDeck() {
    stepEl.textContent = Math.min(idx + 1, GAME.length);
    barEl.style.width = (idx / GAME.length * 100) + '%';
    deck.innerHTML = '';
    for (var i = Math.min(idx + 2, GAME.length - 1); i >= idx; i--) {
      var c = GAME[i];
      var el = document.createElement('div');
      el.className = 'ccg-card';
      el.style.transform = 'translateY(' + ((i - idx) * 10) + 'px) scale(' + (1 - (i - idx) * 0.04) + ')';
      el.style.zIndex = 10 - (i - idx);
      if (i !== idx) el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<span class="ccg-card__stamp ccg-card__stamp--like">Like</span>' +
        '<span class="ccg-card__stamp ccg-card__stamp--nope">Nope</span>' +
        '<div class="ccg-card__emoji" aria-hidden="true">' + c.e + '</div>' +
        '<p class="ccg-card__text">' + (EN ? c.tEN : c.t) + '</p>';
      deck.appendChild(el);
      if (i === idx) attachDrag(el, swipe);
    }
  }

  function attachDrag(el, done) {
    if (!el || el.__ccgDrag) return;
    el.__ccgDrag = true;
    var sx = 0, dx = 0, drag = false, isPrev = el.hasAttribute('data-ccg-pcard');
    var likeStamp = el.querySelector('.ccg-card__stamp--like, .ccg__pstamp:not(.ccg__pstamp--nope)');
    var nopeStamp = el.querySelector('.ccg-card__stamp--nope, .ccg__pstamp--nope');
    el.addEventListener('pointerdown', function (ev) {
      if (busy) return;
      drag = true; sx = ev.clientX; el.classList.add('is-drag');
      el.setPointerCapture(ev.pointerId);
    });
    el.addEventListener('pointermove', function (ev) {
      if (!drag) return;
      dx = ev.clientX - sx;
      if (isPrev) { el.style.setProperty('--dx', dx + 'px'); el.style.setProperty('--dr', (dx * 0.06) + 'deg'); }
      else el.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx * 0.06) + 'deg)';
      likeStamp.style.opacity = Math.max(0, Math.min(1, dx / 90));
      nopeStamp.style.opacity = Math.max(0, Math.min(1, -dx / 90));
    });
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    function release() {
      if (!drag) return;
      drag = false; el.classList.remove('is-drag');
      if (dx > 90) { if (el.hasAttribute('data-ccg-pcard')) el.classList.add('fly-r'); done(true); }
      else if (dx < -90) { if (el.hasAttribute('data-ccg-pcard')) el.classList.add('fly-l'); done(false); }
      else { el.style.transform = ''; el.style.removeProperty('--dx'); el.style.removeProperty('--dr'); likeStamp.style.opacity = isPrev ? '' : 0; nopeStamp.style.opacity = isPrev ? '' : 0; }
      dx = 0;
    }
  }

  function swipe(liked) {
    if (busy || phase !== 'play' || idx >= GAME.length) return;
    busy = true;
    score(GAME[idx], liked);
    var els = deck.querySelectorAll('.ccg-card');
    var top = els[els.length - 1];
    if (top) top.classList.add(liked ? 'fly-r' : 'fly-l');
    setTimeout(function () {
      idx++;
      busy = false;
      saveState();
      if (idx >= GAME.length) finish(); else renderDeck();
    }, 260);
  }

  /* ---------- calcolo del match (valori veri) ---------- */
  function targets() {
    /* voti normalizzati sul numero di domande di quell'attributo: tutto sì -> 9/10, tutto no -> 2/10 */
    var t = {};
    ['sweet','body','acid'].forEach(function (k) { t[k] = NK[k] ? 5.5 + 3.5 * votes[k] / NK[k] : null; });
    return t;
  }
  function scoreAll() {
    var t = targets();
    var fl = fvec.some(function (x) { return x > 0; });
    var fn = Math.sqrt(fvec.reduce(function (a, x) { return a + x * x; }, 0)) || 1;
    return coffees.map(function (c) {
      var d = 0, n = 0;
      ['sweet','body','acid'].forEach(function (k) {
        if (c.val[k] !== null && t[k] !== null) { d += Math.pow(t[k] - c.val[k], 2); n++; }
      });
      var attr = n ? 1 - Math.sqrt(d / n) / 7 : 0.6;
      var flav = 0.5;
      if (fl) { flav = 0; for (var i = 0; i < AXN; i++) flav += (fvec[i] / fn) * c.vec[i]; }
      var s = 0.6 * attr + 0.4 * flav;
      return { c: c, s: s + c.jit, t: t };
    }).sort(function (a, b) { return b.s - a.s; });
  }
  /* ---------- perché proprio lui: motivi del match, dalle risposte e dai valori del caffè ---------- */
  var FAM = ['ai fiori', 'alla frutta tropicale', 'ai frutti rossi', 'agli agrumi', 'al cioccolato e alla nocciola', 'alle fermentazioni particolari', 'al tè'];
  var FAM_EN = ['flowers', 'tropical fruit', 'red fruit', 'citrus', 'chocolate and hazelnut', 'unusual fermentations', 'tea'];
  var ATTR = {
    body:  { hi: ['Ti piace il corpo pieno: il suo è ', 'You like a full body: theirs is '], lo: ['Preferisci un caffè leggero: il suo corpo è ', 'You prefer a light coffee: their body is '] },
    acid:  { hi: ['Cerchi un caffè vivace: la sua acidità è ', 'You want a lively coffee: their acidity is '], lo: ['Vuoi poca acidità: la sua è ', 'You want low acidity: theirs is '] },
    sweet: { hi: ['Ti piace dolce: la sua dolcezza è ', 'You like it sweet: their sweetness is '], lo: ['Preferisci poco dolce: la sua dolcezza è ', 'You prefer less sweet: their sweetness is '] }
  };
  function reasons(top) {
    var c = top.c, t = top.t || targets(), out = [], attrs = [];
    ['body', 'acid', 'sweet'].forEach(function (k) {
      var tv = t[k], cv = c.val[k];
      if (tv === null || cv === null || Math.abs(tv - 5.5) < 0.9) return;
      var hi = tv > 5.5;
      if ((hi && cv >= 6) || (!hi && cv <= 5)) attrs.push({ k: k, hi: hi, v: cv, w: Math.abs(tv - 5.5) });
    });
    attrs.sort(function (a, b) { return b.w - a.w; });
    attrs.slice(0, 2).forEach(function (a) {
      out.push(ATTR[a.k][a.hi ? 'hi' : 'lo'][EN ? 1 : 0] + (Math.round(a.v * 10) / 10) + '/10.');
    });
    var best = -1, bw = 0;
    for (var i = 0; i < AXN; i++) { var w = fvec[i] * c.vec[i]; if (w > bw) { bw = w; best = i; } }
    if (best >= 0) {
      var notes = c.notes.slice(0, 3).join(', ');
      out.push(EN
        ? 'You hearted ' + FAM_EN[best] + (notes ? ': in the cup you’ll find ' + notes + '.' : ': it’s one of their main notes.')
        : 'Hai messo ♥ ' + FAM[best] + (notes ? ': in tazza trovi ' + notes.toLowerCase() + '.' : ': è una delle sue note principali.'));
    }
    if (!out.length) out.push(EN
      ? 'Of the ' + coffees.length + ' coffees available, it’s the closest to your answers.'
      : 'Tra i ' + coffees.length + ' caffè disponibili è quello più vicino alle tue risposte.');
    return out;
  }
  function whyHtml(top) {
    return '<div class="ccg__why"><h3>' + (EN ? 'Why this one' : 'Perché proprio lui') + '</h3><ul>' +
      reasons(top).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
  }
  function compatOf(s) { return Math.max(40, Math.min(99, Math.round(s * 100))); }

  /* ---------- fine partita: in fiera prima l'email, poi il match ---------- */
  function finish() {
    var scored = scoreAll();
    cur = { top: scored[0], runners: scored.slice(1, 3), compat: compatOf(scored[0].s) };
    if (FAIR && !leadDone) {
      phase = 'reveal';
      var im = root.querySelector('[data-ccg-rvimg]');
      if (im) im.style.backgroundImage = cur.top.c.p.img ? 'url("' + cur.top.c.p.img + '")' : '';
      placeForm(root.querySelector('[data-ccg-revealslot]'));
      show(reveal);
      scrollToEl(reveal);
      bump();
      setTimeout(function () { var e = document.getElementById('CcgEmail'); if (e) try { e.focus({ preventScroll: true }); } catch (x) {} }, 200);
      return;
    }
    phase = 'result';
    saveState();
    renderResult();
    bump();
  }

  function renderResult() {
    var c = cur.top.c, compat = cur.compat, runners = cur.runners;
    var html = '';
    if (!likes) html += '<div class="ccg__rhead"><p class="ccg__lead">' + (EN ? 'You swiped ✕ on everything. Tough crowd, huh? Don’t worry: the one who can handle you exists.' : 'Hai detto ✕ a tutto. Difficile, eh? Tranquillo: uno che ti regge esiste.') + '</p></div>';

    var left = '<div class="ccg__match">' +
      (c.p.img ? '<img src="' + c.p.img + '" alt="' + esc(c.name) + '">' : '') +
      '<p class="ccg__itsa">It’s a match! 💘</p>' +
      '<h2 class="ccg__mname">' + esc(c.name) + '</h2>' +
      '<span class="ccg__mcompat">' + compat + (EN ? '% compatible' : '% compatibili') + '</span>' +
      '<p class="ccg__mbio">' + esc(c.bio) + '</p>' +
      whyHtml(cur.top) +
      (c.notes.length ? '<div class="ccg__chips">' + c.notes.map(function (n) { return '<span class="ccg__chip">' + esc(n) + '</span>'; }).join('') + '</div>' : '') +
      '</div>';
    if (!FAIR) left += buyBox(c);

    var right = '<div class="ccg__code" data-ccg-codebox>' + codeHtml() + '</div>';
    if (!FAIR) right += '<div class="ccg__share"><button type="button" class="ccg__btn ccg__btn--dark" data-ccg-share>' + (EN ? 'Share your match' : 'Condividi il tuo match') + ' 💌</button>' +
      '<p class="ccg__note" data-ccg-share-msg hidden></p></div>';
    if (runners.length) {
      right += '<div class="ccg__runners"><h3>' + (EN ? 'They liked you too' : 'Ti hanno messo like anche') + '</h3><div class="ccg__rgrid">' +
        runners.map(function (r) {
          var inner = (r.c.p.img ? '<img src="' + r.c.p.img + '" alt="' + esc(r.c.name) + '">' : '') +
            '<p class="ccg__rname">' + esc(r.c.name) + '</p>' +
            '<p class="ccg__rcompat">' + compatOf(r.s) + '% ♥</p>';
          return FAIR ? '<div class="ccg__rcard">' + inner + '</div>' : '<a class="ccg__rcard" href="' + r.c.p.url + '">' + inner + '</a>';
        }).join('') + '</div></div>';
    }
    if (!FAIR && likes >= GAME.length - 2) {
      right += '<p class="ccg__egg">' + (EN ? 'You hearted basically everything. Coffee polyamory? <a href="/pages/abbonamento">Maybe you need the subscription</a> 👀' : 'Hai messo ♥ praticamente a tutto. Poliamore da caffè? <a href="/pages/abbonamento">Forse ti serve l’abbonamento</a> 👀') + '</p>';
    }
    right += FAIR
      ? '<button type="button" class="ccg__btn ccg__btn--go ccg__btn--xl ccg__newplayer" data-ccg-newplayer>' + (EN ? 'Next player' : 'Nuovo giocatore') + ' <span aria-hidden="true">→</span></button>'
      : '<button type="button" class="ccg__again" data-ccg-again>' + (EN ? 'Play again' : 'Rigioca') + '</button>';

    result.innerHTML = html + '<div class="ccg__rcol">' + left + '</div><div class="ccg__rcol">' + right + '</div>';
    show(result);
    if (!FAIR) { placeForm(result.querySelector('[data-ccg-formslot]') || undefined); selectDefaults(c); }
    scrollToEl(result);
  }

  /* --- acquisto: opzioni del prodotto come chip --- */
  var sel = [];
  function buyBox(c) {
    var opts = c.p.opts || [], vars = c.p.vars || [];
    if (!vars.length) return '<div class="ccg__buycard"><a class="ccg__btn ccg__btn--cta" href="' + c.p.url + '">' + (EN ? 'Go out with ' : 'Esci con ') + esc(c.name) + '</a></div>';
    var h = '<div class="ccg__buycard"><h3>' + (EN ? 'Take it home' : 'Portalo a casa') + '</h3>';
    opts.forEach(function (name, oi) {
      var vals = [];
      vars.forEach(function (v) { if (vals.indexOf(v.o[oi]) < 0) vals.push(v.o[oi]); });
      if (vals.length < 2 && (name === 'Title' || vals[0] === 'Default Title')) return;
      h += '<fieldset class="ccg__optgroup"><legend>' + esc(name) + '</legend><div class="ccg__opts">' +
        vals.map(function (val) { return '<button type="button" class="ccg__opt" data-ccg-opt="' + oi + '" data-val="' + esc(val) + '" aria-pressed="false">' + esc(val) + '</button>'; }).join('') +
        '</div></fieldset>';
    });
    h += '<p class="ccg__mprice" data-ccg-price>' + esc(c.p.price) + '</p>' +
      '<div class="ccg__actions"><button type="button" class="ccg__btn ccg__btn--cta" data-ccg-add>' + (EN ? 'Add to cart' : 'Aggiungi al carrello') + '</button>' +
      '<a class="ccg__btn ccg__btn--ghost" href="' + c.p.url + '">' + (EN ? 'See the coffee' : 'Guarda la scheda') + '</a></div>' +
      '<p class="ccg__added" data-ccg-added aria-live="polite" hidden></p></div>';
    return h;
  }
  function selectDefaults(c) {
    var vars = (c.p.vars || []);
    var first = vars.filter(function (v) { return v.a; })[0] || vars[0];
    sel = first ? first.o.slice() : [];
    refreshOpts(c);
  }
  function currentVariant(c) {
    return (c.p.vars || []).filter(function (v) { return v.o.join('|') === sel.join('|'); })[0] || null;
  }
  function refreshOpts(c) {
    if (!result) return;
    result.querySelectorAll('[data-ccg-opt]').forEach(function (b) {
      var oi = +b.getAttribute('data-ccg-opt'), val = b.getAttribute('data-val');
      b.setAttribute('aria-pressed', sel[oi] === val ? 'true' : 'false');
      var test = sel.slice(); test[oi] = val;
      var ok = (c.p.vars || []).some(function (v) { return v.a && v.o.join('|') === test.join('|'); });
      b.disabled = !ok && sel[oi] !== val;
    });
    var v = currentVariant(c);
    var pr = result.querySelector('[data-ccg-price]');
    var add = result.querySelector('[data-ccg-add]');
    if (pr) pr.textContent = v ? v.p : c.p.price;
    if (add) { add.disabled = !(v && v.a); add.textContent = (v && v.a) ? (EN ? 'Add to cart' : 'Aggiungi al carrello') : (EN ? 'Sold out' : 'Esaurito'); }
  }
  function addToCart(btn) {
    var c = cur && cur.top.c; if (!c) return;
    var v = currentVariant(c); if (!v || !v.a) return;
    var msg = result.querySelector('[data-ccg-added]');
    btn.disabled = true;
    fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ items: [{ id: v.id, quantity: 1 }] }) })
      .then(function (r) { if (!r.ok) throw new Error('add'); return r.json(); })
      .then(function () {
        if (msg) { msg.innerHTML = (EN ? 'Added! ' : 'Aggiunto! ') + '<a href="/cart">' + (EN ? 'Go to cart' : 'Vai al carrello') + ' →</a>'; msg.hidden = false; }
        btn.disabled = false;
        return fetch('/cart.js').then(function (r) { return r.json(); }).then(function (cart) {
          document.querySelectorAll('.cart-count-bubble span[aria-hidden="true"]').forEach(function (s) { s.textContent = cart.item_count; });
          document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true }));
        });
      })
      .catch(function () {
        if (msg) { msg.textContent = EN ? 'Could not add it: try from the product page.' : 'Non sono riuscito ad aggiungerlo: prova dalla scheda prodotto.'; msg.hidden = false; }
        btn.disabled = false;
      });
  }

  /* --- codice sconto: sul sito dietro email (una volta sola), in fiera sempre dopo l'email --- */
  function codeHtml() {
    if (FAIR) {
      return '<h3>' + (EN ? 'The first date’s on us' : 'Il primo appuntamento lo offriamo noi') + '</h3>' +
        '<p>' + (EN ? PCT + '% off on tomassicoffee.com, once per customer. Snap a photo of this screen 📸' : PCT + '% di sconto su tomassicoffee.com, una volta per cliente. Fai una foto a questo schermo 📸') + '</p>' +
        '<div class="ccg__codebox"><span class="ccg__codeval">' + esc(FCODE) + '</span></div>';
    }
    if (isSub()) {
      return '<h3>' + (EN ? 'The first date’s on us' : 'Il primo appuntamento lo offriamo noi') + '</h3>' +
        '<p>' + (EN ? PCT + '% off your coffees, once per customer.' : PCT + '% di sconto sui caffè, una volta per cliente.') + '</p>' +
        '<div class="ccg__codebox"><span class="ccg__codeval">' + esc(CODE) + '</span>' +
        '<button type="button" class="ccg__copy" data-ccg-copy>' + (EN ? 'Copy' : 'Copia') + '</button></div>' +
        '<a class="ccg__btn ccg__btn--go" href="/discount/' + encodeURIComponent(CODE) + '?redirect=/cart">' + (EN ? 'Apply it to my cart' : 'Applicalo al carrello') + '</a>';
    }
    return '<h3>' + (EN ? 'Unlock ' + PCT + '% off your match' : 'Sblocca il ' + PCT + '% sul tuo match') + '</h3>' +
      '<p>' + (EN ? 'Leave your email: the code appears right here.' : 'Lascia la tua email: il codice compare qui sotto.') + '</p>' +
      '<div data-ccg-formslot></div>';
  }
  function unlock() {
    setSub();
    placeForm(); /* rimette il form al suo posto prima di riscrivere il box */
    var box = result.querySelector('[data-ccg-codebox]');
    if (box) box.innerHTML = codeHtml();
  }

  /* --- invio email: Shopify (newsletter) + endpoint opzionale; in fiera anche copia sul dispositivo --- */
  function sendLead(form, email) {
    var match = cur && cur.top ? cur.top.c.p.handle : '';
    var li = FAIR ? addLead(email, match) : -1;
    try {
      fetch(form.action, { method: 'POST', body: new FormData(form), credentials: 'same-origin' })
        .then(function (r) { if (li >= 0 && r.ok && !/challenge/.test(r.url)) markSynced(li); })
        .catch(function () {});
    } catch (e) {}
    if (ENDPOINT) {
      try { fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ email: email, match: match, fair: FAIR, ts: new Date().toISOString(), source: 'coffee-crush' }) }); } catch (e) {}
    }
  }

  /* --- condividi: immagine storia (se il browser lo permette) o link --- */
  function shareUrl() { return location.origin + location.pathname + '?match=' + encodeURIComponent(cur.top.c.p.handle); }
  function storyImage(cb) {
    try {
      var c = cur.top.c, W = 1080, H = 1920;
      var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      var x = cv.getContext('2d');
      x.fillStyle = '#2A1A10'; x.fillRect(0, 0, W, H);
      var acc = '#E5533C';
      x.textAlign = 'center';
      x.fillStyle = acc; x.font = '800 44px sans-serif'; x.fillText('COFFEE CRUSH', W / 2, 220);
      x.fillStyle = '#F5ECD7'; x.font = '800 96px sans-serif'; x.fillText("It's a match!", W / 2, 360);
      function rest() {
        x.fillStyle = '#F5ECD7'; x.font = '800 80px sans-serif';
        wrap(x, c.name, W / 2, 1300, 900, 92);
        x.fillStyle = '#7FBF8E'; x.font = '800 60px sans-serif'; x.fillText(cur.compat + (EN ? '% compatible' : '% compatibili'), W / 2, 1520);
        x.fillStyle = '#F5ECD7'; x.font = '400 40px sans-serif'; x.fillText(c.notes.slice(0, 3).join(' · '), W / 2, 1610);
        x.fillStyle = acc; x.font = '700 44px sans-serif'; x.fillText('tomassicoffee.com', W / 2, 1800);
        cv.toBlob(function (b) { cb(b); }, 'image/png');
      }
      if (!c.p.img) return rest();
      var im = new Image(); im.crossOrigin = 'anonymous';
      im.onload = function () {
        x.save(); x.beginPath(); x.arc(W / 2, 800, 330, 0, Math.PI * 2); x.closePath(); x.fillStyle = '#F5ECD7'; x.fill(); x.clip();
        var s = Math.max(660 / im.width, 660 / im.height);
        x.drawImage(im, W / 2 - im.width * s / 2, 800 - im.height * s / 2, im.width * s, im.height * s);
        x.restore();
        x.lineWidth = 16; x.strokeStyle = acc; x.beginPath(); x.arc(W / 2, 800, 330, 0, Math.PI * 2); x.stroke();
        rest();
      };
      im.onerror = rest;
      im.src = c.p.img.indexOf('//') === 0 ? 'https:' + c.p.img : c.p.img;
    } catch (e) { cb(null); }
  }
  function wrap(x, text, cx, y, maxW, lh) {
    var words = String(text).split(' '), line = '', lines = [];
    words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (x.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
    lines.push(line);
    lines.forEach(function (l, i) { x.fillText(l, cx, y + i * lh); });
  }
  function share() {
    if (!cur) return;
    var url = shareUrl();
    var text = EN ? ('My Coffee Crush match is ' + cur.top.c.name + ' (' + cur.compat + '% compatible). Who’s yours?') : ('Il mio match su Coffee Crush è ' + cur.top.c.name + ' (' + cur.compat + '% compatibili). E il tuo?');
    var msg = result.querySelector('[data-ccg-share-msg]');
    function copyLink() {
      try { navigator.clipboard.writeText(text + ' ' + url); } catch (e) {}
      if (msg) { msg.textContent = EN ? 'Link copied: paste it wherever you like.' : 'Link copiato: incollalo dove vuoi.'; msg.hidden = false; }
    }
    if (!navigator.share) return copyLink();
    storyImage(function (blob) {
      var data = { title: 'Coffee Crush', text: text, url: url };
      if (blob && typeof File !== 'undefined') {
        var file = new File([blob], 'coffee-crush-match.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) data = { files: [file], title: 'Coffee Crush', text: text + ' ' + url };
      }
      navigator.share(data).catch(function (e) { if (e && e.name !== 'AbortError') copyLink(); });
    });
  }

  function flyPreview(liked) { var pc = root && root.querySelector('[data-ccg-pcard]'); if (pc) pc.classList.add(liked ? 'fly-r' : 'fly-l'); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* ---------- eventi delegati: sopravvivono ai re-render dell'editor tema ---------- */
  if (!window.__ccgBound3) {
    window.__ccgBound3 = true;

    document.addEventListener('submit', function (ev) {
      var form = ev.target;
      if (!form || form.id !== 'CoffeeCrushSignup') return;
      ev.preventDefault();
      if (!root) init();
      var emailEl = document.getElementById('CcgEmail');
      var email = ((emailEl && emailEl.value) || '').trim();
      var err = form.querySelector('[data-ccg-err]'), err2 = form.querySelector('[data-ccg-err2]');
      hideErrs(form);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { if (err) err.hidden = false; return; }
      var consent = form.querySelector('[data-ccg-consent]');
      if (FAIR && consent && !consent.checked) { if (err2) err2.hidden = false; return; }
      sendLead(form, email);
      if (FAIR) {
        leadDone = true;
        if (phase === 'reveal') { phase = 'result'; placeForm(); renderResult(); bump(); }
        else { form.reset(); startGame(); }
        return;
      }
      unlock();
    }, true);

    document.addEventListener('click', function (ev) {
      var t = ev.target;
      if (!t || !t.closest || !root) return;
      var b;
      if (t.closest('[data-ccg-start]')) startGame();
      else if (t.closest('[data-ccg-yes]')) swipe(true);
      else if (t.closest('[data-ccg-no]')) swipe(false);
      else if (t.closest('[data-ccg-again]')) { phase = 'again'; startGame(); }
      else if (t.closest('[data-ccg-pyes]')) { flyPreview(true); startGame(true); }
      else if (t.closest('[data-ccg-pno]')) { flyPreview(false); startGame(false); }
      else if (t.closest('[data-ccg-newplayer]')) resetFair();
      else if (t.closest('[data-ccg-share]')) share();
      else if (t.closest('[data-ccg-csv]')) downloadCsv();
      else if (t.closest('[data-ccg-wipe]')) {
        if (window.confirm(EN ? 'Delete all emails saved on this device? Download the CSV first.' : 'Cancellare tutte le email salvate su questo dispositivo? Prima scarica il CSV.')) { saveLeads([]); renderExport(); }
      }
      else if ((b = t.closest('[data-ccg-add]'))) addToCart(b);
      else if ((b = t.closest('[data-ccg-opt]'))) {
        if (b.disabled || !cur) return;
        sel[+b.getAttribute('data-ccg-opt')] = b.getAttribute('data-val');
        refreshOpts(cur.top.c);
      }
      else if ((b = t.closest('[data-ccg-copy]'))) {
        try { navigator.clipboard.writeText(CODE); b.textContent = EN ? 'Copied!' : 'Copiato!'; } catch (e) {}
      }
    });

    document.addEventListener('keydown', function (ev) {
      bump();
      if (!root || !play || play.hidden) return;
      if (ev.target && /INPUT|TEXTAREA|SELECT/.test(ev.target.tagName)) return;
      if (ev.key === 'ArrowRight') swipe(true);
      if (ev.key === 'ArrowLeft') swipe(false);
    });
    document.addEventListener('pointerdown', bump, { passive: true });
    document.addEventListener('input', bump);

    document.addEventListener('shopify:section:load', init);
    window.addEventListener('resize', measure);
  }

  init();
})();
