'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FileDropZone from '@/components/FileDropZone';
import { saveFile } from '@/utils/storage';

export default function UploadPage() {
  const router = useRouter();

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const id = crypto.randomUUID();
        saveFile({ id, name: file.name, dataUrl, pages: 0 });
        router.push(`/read/${id}`);
      };
      reader.readAsDataURL(file);
    },
    [router]
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1 className="text-2xl font-semibold">Carregar PDF</h1>
      <FileDropZone onFileAccepted={handleFile} />
    </main>
  );
} 