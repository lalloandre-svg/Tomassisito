// Converte un font TTF/OTF in WOFF 1.0 (tabelle compresse con zlib). Uso: node tools/ttf2woff.mjs in.ttf out.woff
import fs from "node:fs";
import zlib from "node:zlib";

const [, , src, dst] = process.argv;
const ttf = fs.readFileSync(src);
const flavor = ttf.readUInt32BE(0);
const numTables = ttf.readUInt16BE(4);
const tables = [];
for (let i = 0; i < numTables; i++) {
  const o = 12 + i * 16;
  const tag = ttf.readUInt32BE(o), checksum = ttf.readUInt32BE(o + 4), offset = ttf.readUInt32BE(o + 8), length = ttf.readUInt32BE(o + 12);
  const data = ttf.subarray(offset, offset + length);
  const comp = zlib.deflateSync(data, { level: 9 });
  tables.push({ tag, checksum, length, data: comp.length < length ? comp : data });
}
const pad4 = (n) => (n + 3) & ~3;
let off = 44 + numTables * 20;
const dir = Buffer.alloc(numTables * 20);
tables.sort((a, b) => a.tag - b.tag).forEach((t, i) => {
  t.offset = off;
  dir.writeUInt32BE(t.tag, i * 20);
  dir.writeUInt32BE(off, i * 20 + 4);
  dir.writeUInt32BE(t.data.length, i * 20 + 8);
  dir.writeUInt32BE(t.length, i * 20 + 12);
  dir.writeUInt32BE(t.checksum, i * 20 + 16);
  off += pad4(t.data.length);
});
const total = off;
const out = Buffer.alloc(total);
out.write("wOFF", 0, "latin1");
out.writeUInt32BE(flavor, 4);
out.writeUInt32BE(total, 8);
out.writeUInt16BE(numTables, 12);
out.writeUInt32BE(pad4(12 + numTables * 16) + tables.reduce((s, t) => s + pad4(t.length), 0), 16);
out.writeUInt16BE(1, 20);
dir.copy(out, 44);
for (const t of tables) t.data.copy(out, t.offset);
fs.writeFileSync(dst, out);
console.log(`${dst}: ${(ttf.length / 1024).toFixed(0)} KB → ${(total / 1024).toFixed(0)} KB`);
