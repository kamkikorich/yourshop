'use client';

import Link from 'next/link';

export default function Header() {


  return (
    <header className="bg-white/85 backdrop-blur sticky top-0 z-40 border-b border-ocean-primary/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-extrabold leading-tight text-ocean-primary">Borneo Fresh Seafood</h1>
              <p className="text-xs text-gray-500">Order harian: 1 produk, cepat dan mudah</p>
            </div>
          </Link>

          <Link
            href="/admin"
            className="text-sm bg-ocean-primary text-white hover:bg-ocean-secondary px-4 py-2 rounded-full transition-colors shadow-sm"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
