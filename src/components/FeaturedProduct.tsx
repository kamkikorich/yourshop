'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/data/products';
import { getStockColorClass, getStockLabel } from '@/data/products';
import OrderButton from '@/components/OrderButton';

interface FeaturedProductProps {
  product: Product;
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  const [selectedKg, setSelectedKg] = useState(product.minOrderKg);
  const isOutOfStock = product.stockStatus === 'out';

  const step = product.minOrderKg < 1 ? 0.5 : 1;

  const totalPrice = useMemo(() => {
    return product.pricePerKg * selectedKg;
  }, [product.pricePerKg, selectedKg]);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-ocean-primary to-ocean-secondary shadow-xl">
          <div className="relative aspect-[4/3]">
            <Image
              src={process.env.NODE_ENV === 'production' ? `/yourshop${product.image}` : product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4">
              <div className={`${getStockColorClass(product.stockStatus)} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}>
                {getStockLabel(product.stockStatus)}
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>
              <p className="text-white/85 mt-2 text-sm sm:text-base max-w-xl">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-ocean-primary/10 shadow-lg p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Harga hari ini</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-ocean-primary">RM{product.pricePerKg}</span>
                <span className="text-sm text-gray-500">/kg</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Minimum</p>
              <p className="text-lg font-bold text-ocean-primary">{product.minOrderKg}kg</p>
            </div>
          </div>

          {product.highlights?.length ? (
            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              {product.highlights.map((text, idx) => (
                <li key={`${product.id}-h-${idx}`} className="flex gap-2">
                  <span className="mt-[2px] inline-block w-2 h-2 rounded-full bg-ocean-secondary flex-none" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 rounded-2xl border border-ocean-primary/10 bg-ocean-light/35 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ocean-primary">Pilih berat</span>
              <span className="text-sm font-semibold text-ocean-primary">{selectedKg} kg</span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedKg(Math.max(product.minOrderKg, Number((selectedKg - step).toFixed(2))))}
                className="w-12 h-12 rounded-xl bg-ocean-primary text-white text-xl font-bold active:scale-[0.98] transition-transform disabled:opacity-50"
                disabled={selectedKg <= product.minOrderKg || isOutOfStock}
              >
                -
              </button>

              <div className="flex-1 text-center">
                <p className="text-xs text-gray-500">Jumlah anggaran</p>
                <p className="text-2xl font-extrabold text-ocean-secondary">RM{totalPrice.toFixed(2)}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedKg(Number((selectedKg + step).toFixed(2)))}
                className="w-12 h-12 rounded-xl bg-ocean-primary text-white text-xl font-bold active:scale-[0.98] transition-transform disabled:opacity-50"
                disabled={isOutOfStock}
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-5">
            {isOutOfStock ? (
              <button
                disabled
                className="w-full py-4 rounded-2xl bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
              >
                Stok Habis
              </button>
            ) : (
              <OrderButton product={product} quantity={selectedKg} totalPrice={totalPrice} />
            )}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="rounded-2xl border border-ocean-primary/10 bg-white p-3 text-center">
              <p className="font-semibold text-ocean-primary">Fast Order</p>
              <p className="mt-1">WhatsApp terus</p>
            </div>
            <div className="rounded-2xl border border-ocean-primary/10 bg-white p-3 text-center">
              <p className="font-semibold text-ocean-primary">Harga Jelas</p>
              <p className="mt-1">RM/kg</p>
            </div>
            <div className="rounded-2xl border border-ocean-primary/10 bg-white p-3 text-center">
              <p className="font-semibold text-ocean-primary">Stok Live</p>
              <p className="mt-1">{getStockLabel(product.stockStatus)}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <p className="text-sm font-semibold text-gray-800">Cara order</p>
            <ol className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Pilih berat dan tekan butang WhatsApp.</li>
              <li>Isi nama dan alamat penghantaran.</li>
              <li>Teruskan perbincangan penghantaran & bayaran di WhatsApp.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
