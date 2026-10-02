import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Modern CSS color functions unsupported by html2canvas:
 * oklab, oklch, lab, lch, color-mix, color
 */
const UNSUPPORTED_COLOR_REGEX = /\b(oklab|oklch|lab|lch|color-mix|color)\s*\([^)]*(\([^)]*\)[^)]*)*\)/gi;

/**
 * Clean modern unsupported colors from cloned document styles before html2canvas processes it
 */
export const prepareCloneForHtml2Canvas = (clonedDoc: Document) => {
  const styleTags = clonedDoc.querySelectorAll('style');
  styleTags.forEach((style) => {
    try {
      if (style.textContent) {
        style.textContent = style.textContent.replace(UNSUPPORTED_COLOR_REGEX, '#1e293b');
      }
    } catch {
      style.remove();
    }
  });

  const allElements = clonedDoc.querySelectorAll('*');
  allElements.forEach((node) => {
    const el = node as HTMLElement;
    if (el.getAttribute) {
      const styleAttr = el.getAttribute('style');
      if (styleAttr && /oklab|oklch|color-mix|lab|lch|color\(/i.test(styleAttr)) {
        el.setAttribute('style', styleAttr.replace(UNSUPPORTED_COLOR_REGEX, '#1e293b'));
      }
    }
  });
};

/**
 * Export HTML element to PDF with 100% full-page landscape A4 fit
 */
export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  orientation: 'portrait' | 'landscape' = 'landscape'
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FCFAF4',
    logging: false,
    scrollX: 0,
    scrollY: 0,
    onclone: prepareCloneForHtml2Canvas,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
}

/**
 * Export HTML element to high-res PNG
 */
export async function exportElementToPng(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#FCFAF4',
    logging: false,
    scrollX: 0,
    scrollY: 0,
    onclone: prepareCloneForHtml2Canvas,
  });

  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = filename;
  link.click();
}
