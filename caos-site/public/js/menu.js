// CAOS Caffè · menù online. Tutto è progressivo: senza JS il menù si legge lo stesso.
(function () {
  "use strict";
  var datiEl = document.getElementById("dati-menu");
  if (!datiEl) return;
  var D = JSON.parse(datiEl.textContent);

  // ---------- ora di Aprilia ----------
  function oraRoma() {
    var parti = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
      year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(new Date());
    var o = {};
    parti.forEach(function (p) { o[p.type] = p.value; });
    var giorni = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      giorno: giorni[o.weekday],
      minuti: Number(o.hour) * 60 + Number(o.minute),
      iso: o.year + "-" + o.month + "-" + o.day
    };
  }
  function min(hhmm) { var p = hhmm.split(":"); return Number(p[0]) * 60 + Number(p[1]); }

  // ---------- striscia "adesso" ----------
  var adesso = oraRoma();
  var striscia = document.getElementById("striscia");
  var aperto = adesso.giorno !== D.giornoChiuso && D.turni.some(function (t) {
    return adesso.minuti >= min(t[0]) && adesso.minuti < min(t[1]);
  });

  if (adesso.giorno === D.giornoChiuso) {
    striscia.textContent = D.testi.chiuso;
  } else if (!aperto) {
    var prossimo = D.turni.map(function (t) { return t[0]; }).filter(function (t) { return min(t) > adesso.minuti; })[0] || D.turni[0][0];
    striscia.textContent = D.testi.fuori + " " + prossimo.replace(/^0/, "") + ".";
  } else {
    var attive = [];
    document.querySelectorAll(".sez[data-da]").forEach(function (s) {
      if (adesso.minuti >= min(s.dataset.da) && adesso.minuti < min(s.dataset.a)) {
        attive.push(s);
        s.querySelector(".adesso").hidden = false;
      }
    });
    if (attive.length) {
      striscia.innerHTML = "";
      var pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = D.testi.adesso;
      striscia.appendChild(pill);
      attive.forEach(function (s) {
        var a = document.createElement("a");
        a.href = "#" + s.id;
        a.innerHTML = s.querySelector("h2").innerHTML;
        striscia.appendChild(a);
      });
    }
  }
  if (striscia.childNodes.length) striscia.hidden = false;

  // ---------- filtri ----------
  var form = document.getElementById("filtri");
  var esito = document.getElementById("esito");
  var voci = document.querySelectorAll(".voce, .breve");
  form.hidden = false;

  function applica() {
    var soloVeg = form.elements.veg.checked;
    var senza = Array.prototype.filter.call(form.querySelectorAll('input[name="senza"]'), function (i) { return i.checked; })
      .map(function (i) { return i.value; });
    var attivi = soloVeg || senza.length;
    var escluse = 0;

    voci.forEach(function (v) {
      var tag = v.querySelector(".tag");
      var all = (v.dataset.all || "").split(" ").filter(Boolean);
      var motivo = "";
      var contiene = senza.filter(function (n) { return all.indexOf(n) !== -1; });
      if (contiene.length) {
        motivo = D.ui.nonAdatto + " " + contiene.map(function (n) { return n + " " + D.allergeni[n]; }).join(", ");
      } else if (soloVeg && v.dataset.veg === "0") {
        motivo = D.ui.nonVeg;
      }
      v.classList.toggle("off", !!motivo);
      if (motivo) escluse++;
      if (tag) {
        tag.textContent = motivo || (senza.length && v.dataset.unk ? D.ui.chiedi : "");
      }
    });

    if (!attivi) { esito.textContent = ""; return; }
    var tot = voci.length;
    esito.textContent = D.lang === "en"
      ? (tot - escluse) + " of " + tot + " items fit. Greyed-out items are marked."
      : (tot - escluse) + " voci su " + tot + " vanno bene. Le altre sono attenuate e segnate.";
  }
  form.addEventListener("change", applica);
  form.addEventListener("reset", function () { setTimeout(applica, 0); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });

  // ---------- nav: evidenzia la sezione visibile ----------
  if ("IntersectionObserver" in window) {
    var links = {};
    document.querySelectorAll(".nav-sez a").forEach(function (a) { links[a.hash.slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          links[e.target.id].setAttribute("aria-current", "true");
          if (links[e.target.id].scrollIntoView && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            links[e.target.id].parentNode.parentNode.scrollTo({ left: links[e.target.id].offsetLeft - 16, behavior: "smooth" });
          }
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll(".sez, .legenda").forEach(function (s) { obs.observe(s); });
  }
})();
