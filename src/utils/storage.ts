'use client';

export interface FileEntry {
  id: string;
  name: string;
  dataUrl: string;
  pages: number;
}

const KEY = 'kindle-files';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readList(): FileEntry[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as FileEntry[];
  } catch {
    return [];
  }
}

export function saveFile(entry: FileEntry): void {
  if (!isBrowser()) return;
  const list = readList();
  localStorage.setItem(KEY, JSON.stringify([...list, entry]));
}

export function getFile(id: string): FileEntry | undefined {
  if (!isBrowser()) return undefined;
  return readList().find((f) => f.id === id);
} 