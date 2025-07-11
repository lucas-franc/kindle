'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onFileAccepted: (file: File) => void;
}

export default function FileDropZone({ onFileAccepted }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length) onFileAccepted(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'bg-gray-100' : 'bg-white dark:bg-neutral-900'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte o arquivo aqui ...</p>
      ) : (
        <p>Arraste e solte um arquivo PDF ou clique para selecionar</p>
      )}
    </div>
  );
} 