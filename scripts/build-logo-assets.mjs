// One-time asset pipeline: lifts the ClarityAI emblem + wordmark out of the
// flat JPG (baked light/checkerboard background) and emits clean transparent
// art, favicons, app icons and an OG share image. Run: node scripts/build-logo-assets.mjs
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'fs';

const SRC = 'public/logo 1.jpg';
const DARK = { r: 10, g: 11, b: 13, alpha: 1 }; // #0a0b0d brand-bg
const CYAN = { r: 0, g: 245, b: 255 };
const CORE = { r: 205, g: 250, b: 255 };
mkdirSync('public/brand', { recursive: true });

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: Ch } = info;
const at = (x, y) => { const i = (y * W + x) * Ch; return [data[i], data[i + 1], data[i + 2]]; };
const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;
const sat = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// Coverage = how much this pixel is real ink (dark stroke OR saturated accent)
// vs the light, desaturated background. Returns 0..1 alpha.
function coverage(r, g, b) {
  const L = lum(r, g, b), S = sat(r, g, b);
  const aDark = clamp((228 - L) / (228 - 150), 0, 1); // dark strokes
  const aSat = clamp((S - 18) / 55, 0, 1);            // cyan/teal accents
  return Math.pow(Math.max(aDark, aSat), 0.85);
}

// White matte (RGB=255, alpha=coverage) for a crop region — tintable downstream.
// opts.mask {cx,cy,rin,rout} fades alpha to 0 beyond the disc.
// opts.mirrorCx mirrors the clean left half onto the right (removes the asymmetric ribbon).
function matte(left, top, w, h, opts = {}) {
  const { mask, mirrorCx } = opts;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const sx = mirrorCx != null && x > mirrorCx ? Math.round(2 * mirrorCx - x) : x;
    const [r, g, b] = at(left + sx, top + y);
    const o = (y * w + x) * 4;
    let a = coverage(r, g, b);
    if (mask) {
      const d = Math.hypot(x - mask.cx, y - mask.cy);
      a *= clamp((mask.rout - d) / (mask.rout - mask.rin), 0, 1);
    }
    out[o] = out[o + 1] = out[o + 2] = 255;
    out[o + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: w, height: h, channels: 4 } });
}

// Soft radial core (white→cyan→transparent) to relight the keyed-out centre.
function coreGlow(size) {
  const c = size / 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><defs><radialGradient id="c" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff"/><stop offset="0.35" stop-color="#7df9ff"/><stop offset="0.7" stop-color="#00f5ff" stop-opacity="0.35"/><stop offset="1" stop-color="#00f5ff" stop-opacity="0"/></radialGradient></defs><circle cx="${c}" cy="${c}" r="${c}" fill="url(#c)"/></svg>`);
}

function findBBox(y0, y1, x0 = 0, x1 = W) {
  let l = W, r = 0, t = H, b = 0;
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const [R, G, B] = at(x, y);
    if (sat(R, G, B) > 20 || lum(R, G, B) < 185) { if (x < l) l = x; if (x > r) r = x; if (y < t) t = y; if (y > b) b = y; }
  }
  return { l, r, t, b };
}

// ---- EMBLEM (circle centred 512,364 r≈107) → square crop, circular-masked ----
const EMB = { left: 384, top: 236, w: 256, h: 256 };
const emblem = matte(EMB.left, EMB.top, EMB.w, EMB.h, { mask: { cx: 128, cy: 128, rin: 113, rout: 121 }, mirrorCx: 128 });
const emblemPng = await emblem.clone().resize(512, 512, { kernel: 'lanczos3' }).png().toBuffer();
await sharp(emblemPng).toFile('public/brand/clarity-emblem.png'); // white, transparent

// Emblem rendered as a glowing cyan mark on the brand-dark surface.
async function onDark(size, pad) {
  const inner = Math.round(size * (1 - 2 * pad));
  const off = Math.round((size - inner) / 2);
  const emb = await sharp(emblemPng).resize(inner, inner, { kernel: 'lanczos3' }).png().toBuffer();
  const glow = await sharp(emb).tint(CYAN).blur(Math.max(1, size * 0.012)).png().toBuffer();
  const core = await sharp(emb).tint(CORE).png().toBuffer();
  const cg = Math.round(inner * 0.34);
  const cgBuf = await sharp(coreGlow(cg)).png().toBuffer();
  const cgOff = Math.round((size - cg) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: DARK } })
    .composite([
      { input: glow, left: off, top: off, blend: 'screen' },
      { input: glow, left: off, top: off, blend: 'screen' },
      { input: core, left: off, top: off },
      { input: cgBuf, left: cgOff, top: cgOff, blend: 'screen' },
    ]).png();
}

// ---- Large app icons: the real emblem on the brand-dark surface ----
const iconBuf = await (await onDark(512, 0.14)).toBuffer();
for (const [path, s] of [['public/apple-touch-icon.png', 180], ['public/icon-192.png', 192], ['public/icon-512.png', 512]])
  await sharp(iconBuf).resize(s, s, { kernel: 'lanczos3' }).png().toFile(path);

// ---- Small favicon: a simplified, legible glyph (crisp at 16px) ----
const node = (a) => { const r = (a * Math.PI) / 180; return `${(32 + 13 * Math.cos(r)).toFixed(1)}" cy="${(32 + 13 * Math.sin(r)).toFixed(1)}`; };
const svgFav = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><radialGradient id="c" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff"/><stop offset="0.4" stop-color="#7df9ff"/><stop offset="1" stop-color="#00f5ff" stop-opacity="0"/></radialGradient></defs><rect width="64" height="64" rx="15" fill="#0a0b0d"/><g fill="none" stroke="#00f5ff"><circle cx="32" cy="32" r="21" stroke-width="1.4" opacity="0.4"/><circle cx="32" cy="32" r="13" stroke-width="1.6" opacity="0.75"/></g><g fill="#00f5ff">${[0, 90, 180, 270].map((a) => `<circle cx="${node(a)}" r="2.2"/>`).join('')}</g><circle cx="32" cy="32" r="11" fill="url(#c)"/><circle cx="32" cy="32" r="4.2" fill="#eafdff"/></svg>`;
writeFileSync('public/favicon.svg', svgFav);
const favBuf = await sharp(Buffer.from(svgFav)).resize(64, 64).png().toBuffer();
for (const s of [16, 32, 48]) await sharp(favBuf).resize(s, s, { kernel: 'lanczos3' }).png().toFile(`public/favicon-${s}.png`);

// ---- Wordmark (real "ClarityAI / AI Made Clear" lifted from the file) ----
const wb = findBBox(585, 840);
const PAD = 14;
const word = matte(wb.l - PAD, wb.t - PAD, (wb.r - wb.l) + 2 * PAD, (wb.b - wb.t) + 2 * PAD);
const wordPng = await word.clone().tint(CORE).png().toBuffer();
const wordW = (wb.r - wb.l) + 2 * PAD, wordH = (wb.b - wb.t) + 2 * PAD;
console.log('wordmark bbox', wb, '→', wordW, 'x', wordH);

// ---- OG / social share image 1200x630 ----
const OGW = 1200, OGH = 630;
const ogBg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OGW}" height="${OGH}">
  <defs>
    <radialGradient id="g1" cx="22%" cy="30%" r="55%"><stop offset="0" stop-color="#00f5ff" stop-opacity="0.20"/><stop offset="1" stop-color="#00f5ff" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="85%" cy="75%" r="55%"><stop offset="0" stop-color="#a855f7" stop-opacity="0.18"/><stop offset="1" stop-color="#a855f7" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${OGW}" height="${OGH}" fill="#0a0b0d"/>
  <rect width="${OGW}" height="${OGH}" fill="url(#g1)"/>
  <rect width="${OGW}" height="${OGH}" fill="url(#g2)"/>
  <rect x="0" y="0" width="${OGW}" height="6" fill="#00f5ff" opacity="0.5"/>
</svg>`;
const embOG = await sharp(emblemPng).resize(300, 300, { kernel: 'lanczos3' }).tint(CORE).png().toBuffer();
const embOGglow = await sharp(emblemPng).resize(300, 300, { kernel: 'lanczos3' }).tint(CYAN).blur(8).png().toBuffer();
const ogCore = await sharp(coreGlow(104)).png().toBuffer();
const wordScale = Math.min(560 / wordW, 200 / wordH);
const wordOG = await sharp(wordPng).resize(Math.round(wordW * wordScale), Math.round(wordH * wordScale), { kernel: 'lanczos3' }).png().toBuffer();
const wordOGmeta = await sharp(wordOG).metadata();
await sharp(Buffer.from(ogBg)).composite([
  { input: embOGglow, left: 150, top: OGH / 2 - 150 },
  { input: embOG, left: 150, top: OGH / 2 - 150 },
  { input: ogCore, left: 248, top: OGH / 2 - 52, blend: 'screen' },
  { input: wordOG, left: 500, top: Math.round(OGH / 2 - wordOGmeta.height / 2) },
]).png().toFile('public/og-image.png');

console.log('done: emblem, favicons, icons, og-image generated.');
