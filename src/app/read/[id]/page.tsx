'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFile } from '@/utils/storage';
import PdfViewer from '@/components/PdfViewer';
import PaginationBar from '@/components/PaginationBar';

export default function ReaderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const entry = getFile(id);
    if (!entry) {
      router.replace('/upload');
    } else {
      setDataUrl(entry.dataUrl);
    }
  }, [id, router]);

  if (!dataUrl) {
    return <p className="p-8">Carregando...</p>;
  }

  return (
    <main className="flex flex-col items-center p-4">
      <PaginationBar page={page} total={totalPages || 1} onChange={setPage} />
      <PdfViewer dataUrl={dataUrl} pageNumber={page} onLoadSuccess={setTotalPages} />
    </main>
  );
} 