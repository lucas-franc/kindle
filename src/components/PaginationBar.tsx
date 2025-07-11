'use client';

import React from 'react';

interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

export default function PaginationBar({ page, total, onChange }: Props) {
  return (
    <div className="flex items-center gap-4 my-4">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        ←
      </button>
      <span className="min-w-[80px] text-center">
        {page} / {total}
      </span>
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onChange(page + 1)}
        disabled={page >= total}
      >
        →
      </button>
    </div>
  );
} 