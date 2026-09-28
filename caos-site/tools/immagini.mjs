// Genera public/img/og-menu.png (1200×630) e public/img/apple-touch-icon.png (180×180)
// dal logo e dai font del brand. Serve Playwright: node tools/immagini.mjs
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const require = createRequire(execSync("npm root -g").toString().trim() + "/");
const { chromium } = require("playwright");
const b64 = (f) => fs.readFileSync(path.join(root, f)).toString("base64");
const info = JSON.parse(fs.readFileSync(path.join(root, "data/info.json"), "utf8"));

const fonts = `
@font-face{font-family:"Caos Mano";src:url(data:font/woff2;base64,${b64("public/fonts/CaosMano-Regular.woff2")}) format("woff2")}
@font-face{font-family:"SCP";src:url(data:font/woff;base64,${b64("public/fonts/SourceCodePro-VF.woff")}) format("woff");font-weight:200 900}`;
const logo = `data:image/svg+xml;base64,${b64("public/img/logo-caos.svg")}`;

const og = `<!doctype html><style>${fonts}
body{margin:0;width:1200px;height:630px;background:#f1ede2;display:flex;align-items:center;gap:80px;padding:0 96px;box-sizing:border-box;font-family:SCP}
img{height:430px}
h1{font:400 150px/1 "Caos Mano";margin:0 0 28px;border-bottom:10px solid #f8a11d;padding-bottom:18px}
p{font-size:30px;font-weight:500;margin:0 0 10px}
</style><body><img src="${logo}"><div><h1>menù</h1>
<p>${info.indirizzo.via}, ${info.indirizzo.citta}</p><p style="font-weight:700">caoscaffe.com/menu</p></div></body>`;

const icon = `<!doctype html><style>body{margin:0;width:180px;height:180px;background:#f1ede2;display:grid;place-items:center}img{height:150px}</style><body><img src="${logo}"></body>`;

const browser = await chromium.launch();
for (const [html, w, h, out] of [[og, 1200, 630, "og-menu.png"], [icon, 180, 180, "apple-touch-icon.png"]]) {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.setContent(html);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(root, "public/img", out) });
  console.log("public/img/" + out);
}
await browser.close();
