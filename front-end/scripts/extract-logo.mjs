// Extrai o logótipo CELA VI do PDF para PNGs prontos a usar.
// Uso: node scripts/extract-logo.mjs "../CONTATRO DE EMPRÉSTIMO.pdf"
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const pdfPath = process.argv[2] ?? path.resolve(projectRoot, "..", "CONTATRO DE EMPRÉSTIMO.pdf");
const outDir = path.resolve(projectRoot, "public");
const standardFontDataUrl = pathToFileURL(
  path.resolve(projectRoot, "node_modules/pdfjs-dist/standard_fonts") + path.sep,
).href;

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(Math.ceil(width), Math.ceil(height));
    return { canvas, context: canvas.getContext("2d") };
  }
  reset(cc, width, height) {
    cc.canvas.width = Math.ceil(width);
    cc.canvas.height = Math.ceil(height);
  }
  destroy(cc) {
    cc.canvas.width = 0;
    cc.canvas.height = 0;
  }
}

const canvasFactory = new NodeCanvasFactory();

async function loadDoc() {
  const data = new Uint8Array(readFileSync(pdfPath));
  return pdfjs.getDocument({
    data,
    standardFontDataUrl,
    canvasFactory,
  }).promise;
}

async function renderPage(doc, pageNum, targetWidth) {
  const page = await doc.getPage(pageNum);
  const base = page.getViewport({ scale: 1 });
  const scale = targetWidth / base.width;
  const viewport = page.getViewport({ scale });
  const { canvas, context } = canvasFactory.create(viewport.width, viewport.height);
  await page.render({ canvasContext: context, viewport, canvasFactory }).promise;
  return { canvas, context, w: canvas.width, h: canvas.height };
}

// Converte fundo escuro em transparência. colored=false => força branco.
// Curva de alfa: fundo escuro -> 100% transparente; logo -> opaco (sem halo).
function keyOutDark(context, w, h, colored) {
  const img = context.getImageData(0, 0, w, h);
  const d = img.data;
  const LO = 26; // abaixo disto = totalmente transparente
  const HI = 120; // acima disto = totalmente opaco
  for (let i = 0; i < d.length; i += 4) {
    const lum = Math.max(d[i], d[i + 1], d[i + 2]);
    let a;
    if (lum <= LO) a = 0;
    else if (lum >= HI) a = 255;
    else a = Math.round(((lum - LO) / (HI - LO)) * 255);
    if (!colored) {
      d[i] = 255;
      d[i + 1] = 255;
      d[i + 2] = 255;
    }
    d[i + 3] = a;
  }
  context.putImageData(img, 0, 0);
}

function trim(context, w, h) {
  const { data } = context.getImageData(0, 0, w, h);
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 12) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX) return context.canvas;
  const pad = Math.round(Math.max(w, h) * 0.03);
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);
  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const out = createCanvas(cw, ch);
  out.getContext("2d").putImageData(context.getImageData(minX, minY, cw, ch), 0, 0);
  return out;
}

async function save(canvas, name) {
  const buf = await canvas.encode("png");
  const file = path.resolve(outDir, name);
  const { writeFileSync } = await import("node:fs");
  writeFileSync(file, buf);
  console.log(`  -> ${name} (${canvas.width}x${canvas.height})`);
}

async function main() {
  console.log("PDF:", pdfPath);
  const doc = await loadDoc();
  console.log("Páginas:", doc.numPages);

  // Página 3: logo branco sobre preto -> branco transparente.
  const white = await renderPage(doc, 3, 1600);
  keyOutDark(white.context, white.w, white.h, false);
  await save(trim(white.context, white.w, white.h), "logo-celavi.png");

  // Página 2: logo dourado sobre preto -> dourado transparente.
  const gold = await renderPage(doc, 2, 1600);
  keyOutDark(gold.context, gold.w, gold.h, true);
  await save(trim(gold.context, gold.w, gold.h), "logo-celavi-gold.png");

  // Página 2 como ícone quadrado (dourado sobre preto, opaco) para PWA/favicon.
  const icon = await renderPage(doc, 2, 512);
  await save(icon.canvas, "icon-celavi.png");

  console.log("Concluído.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
