'use client';

import { useMemo } from 'react';
import { initialProducts } from '@/data/products';
import Header from '@/components/Header';
import FeaturedProduct from '@/components/FeaturedProduct';

export default function Home() {
  const featuredProduct = useMemo(() => {
    return initialProducts.find(p => p.isActive) ?? initialProducts[0];
  }, []);

  const isDevelopment = process.env.NODE_ENV === 'development';
  const hasWhatsAppConfig = Boolean((process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').trim());

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ocean-light/40">
      <Header />
      
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <section className="mb-8">
            <p className="text-sm font-semibold text-ocean-secondary tracking-wide">Stok hari ini</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-ocean-primary leading-tight">
              Udang premium, segar dan padu — terus order sekarang
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Harga jelas ikut kg. Pilih berat, tekan WhatsApp, dan kami uruskan penghantaran — cepat, mudah, tak serabut.
            </p>

            {isDevelopment && !hasWhatsAppConfig ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                NEXT_PUBLIC_WHATSAPP_NUMBER belum diset. Letak nombor WhatsApp dalam .env untuk aktifkan order.
              </div>
            ) : null}
          </section>

          <FeaturedProduct product={featuredProduct} />

          <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl border border-ocean-primary/10 shadow-sm p-6">
              <p className="text-sm font-semibold text-ocean-primary">Tekan, isi, hantar</p>
              <p className="mt-2 text-sm text-gray-600">
                Flow order ringkas: pilih berat, isi alamat, dan mesej siap format pergi ke WhatsApp.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-ocean-primary/10 shadow-sm p-6">
              <p className="text-sm font-semibold text-ocean-primary">Tidak serabut</p>
              <p className="mt-2 text-sm text-gray-600">
                Tiada grid panjang, tiada kategori. Pelanggan nampak satu produk dan terus buat keputusan.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-ocean-primary/10 shadow-sm p-6">
              <p className="text-sm font-semibold text-ocean-primary">Boleh tukar produk bila-bila</p>
              <p className="mt-2 text-sm text-gray-600">
                Bila anda nak jual produk lain, anda cuma tukar data produk (nama, harga, imej, stok).
              </p>
            </div>
          </section>

          <section className="mt-12 bg-white rounded-3xl border border-ocean-primary/10 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-extrabold text-ocean-primary">Soalan Lazim</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-ocean-light/35 p-4">
                <p className="font-semibold text-gray-800">Macam mana bayaran dan penghantaran?</p>
                <p className="mt-1 text-gray-600">
                  Selepas klik WhatsApp, anda boleh bincang kaedah bayaran dan penghantaran terus dalam chat.
                </p>
              </div>
              <div className="rounded-2xl bg-ocean-light/35 p-4">
                <p className="font-semibold text-gray-800">Boleh tempah lebih dari 1kg?</p>
                <p className="mt-1 text-gray-600">
                  Boleh. Tambah berat menggunakan butang + dan sistem akan kira jumlah anggaran automatik.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto border-t border-ocean-primary/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-sm text-gray-600">
            © 2025 JordanSky. Tempahan: +60 12-834 0714 (WhatsApp)
          </p>
        </div>
      </footer>
    </div>
  );
}
