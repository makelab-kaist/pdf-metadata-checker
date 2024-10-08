import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { log } from 'console';

const dir = path.join('.', 'pdf');
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.pdf'))
  .map((f) => path.join(dir, f));

files.forEach(async (file) => {
  const bytes = fs.readFileSync(file);

  try {
    const pdfDoc = await PDFDocument.load(bytes, {
      updateMetadata: false,
    });
    const author =
      pdfDoc.getAuthor() === undefined ? '✅' : `❌ ${pdfDoc.getAuthor()}`;
    log(file, pdfDoc.getTitle(), '==>', author);
  } catch (e) {
    log('Skipping file ', file);
  }
});
