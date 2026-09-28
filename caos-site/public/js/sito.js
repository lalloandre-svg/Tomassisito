// CAOS Caffè · script comune a tutte le pagine. Tutto è progressivo: senza JS le pagine si leggono lo stesso.
(function () {
  "use strict";
  var root = document.documentElement;
  var datiEl = document.getElementById("dati-sito");
  var D = datiEl ? JSON.parse(datiEl.textContent) : null;

  // ---------- Caos Mano: se non carica, ripiego in SCP maiuscolo ----------
  if (document.fonts && document.fonts.load) {
    document.fonts.load('1em "Caos Mano"', "caos").then(
      function (facce) { if (!facce.length) root.classList.add("no-mano"); },
      function () { root.classList.add("no-mano"); }
    );
  } else {
    root.classList.add("no-mano");
  }
  if (!D) return;

  // ---------- ora di Aprilia ----------
  function oraRoma() {
    var o = {};
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
      year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
    return {
      giorno: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday],
      minuti: Number(o.hour) * 60 + Number(o.minute),
      iso: o.year + "-" + o.month + "-" + o.day
    };
  }
  function min(hhmm) { var p = hhmm.split(":"); return Number(p[0]) * 60 + Number(p[1]); }
  function ora(hhmm) { return hhmm.replace(/^0/, ""); }
  var adesso = oraRoma();
  var T = D.testi;

  // ---------- aperti / chiusi ----------
  var turnoOra = null, prossimo = null;
  if (adesso.giorno !== D.giornoChiuso) {
    D.turni.forEach(function (t) {
      if (adesso.minuti >= min(t[0]) && adesso.minuti < min(t[1])) turnoOra = t;
      else if (!prossimo && min(t[0]) > adesso.minuti) prossimo = t;
    });
  }
  var testo, aperto = !!turnoOra;
  if (aperto) {
    testo = T.aperti + " " + ora(turnoOra[1]) + ".";
  } else if (prossimo) {
    testo = T.chiusiOggi + " " + ora(prossimo[0]) + ".";
  } else {
    var domani = (adesso.giorno + 1) % 7;
    var giorno = domani === D.giornoChiuso ? (domani + 1) % 7 : domani;
    testo = (adesso.giorno === D.giornoChiuso ? T.chiusoOggi + " " : "") +
      T.riapriamo + " " + (giorno === domani ? T.domani : T.giorni[giorno]) + " " + T.alle + " " + ora(D.turni[0][0]) + ".";
  }
  document.querySelectorAll(".stato").forEach(function (el) {
    el.textContent = testo;
    el.classList.toggle("chiuso", !aperto);
    el.hidden = false;
  });

  // ---------- fasce del menù: accende quella in corso ----------
  if (aperto) {
    document.querySelectorAll("[data-da][data-a]").forEach(function (el) {
      var badge = el.querySelector(".adesso");
      if (badge && adesso.minuti >= min(el.dataset.da) && adesso.minuti < min(el.dataset.a)) badge.hidden = false;
    });
  }

  // ---------- oggi in macchina: vale solo per la data indicata ----------
  document.querySelectorAll(".oggi").forEach(function (box) {
    var lista = box.querySelector(".oggi-lista");
    var valido = !!lista && box.dataset.oggi === adesso.iso;
    if (lista) lista.hidden = !valido;
    box.querySelector(".oggi-vuoto").hidden = valido;
  });
})();
