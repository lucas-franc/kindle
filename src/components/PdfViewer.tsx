'use client';

import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configura worker do pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  dataUrl: string;
  pageNumber: number;
  onLoadSuccess?: (numPages: number) => void;
}

export default function PdfViewer({ dataUrl, pageNumber, onLoadSuccess }: Props) {
  // Ajusta largura responsiva
  const calcWidth = () => (window.innerWidth < 700 ? window.innerWidth - 32 : 600);
  const [width, setWidth] = useState<number | undefined>(
    typeof window !== 'undefined' ? calcWidth() : undefined,
  );

  useEffect(() => {
    const handleResize = () => setWidth(calcWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Document
      file={dataUrl}
      onLoadSuccess={({ numPages }: { numPages: number }) => onLoadSuccess?.(numPages)}
    >
      <Page
        key={pageNumber}
        pageNumber={pageNumber}
        width={width}
        /* camada de texto ativada pelo CSS overlay */
      />
    </Document>
  );
} 