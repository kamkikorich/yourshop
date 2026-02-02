'use client';

import { useState } from 'react';
import { Product, getStockLabel, getStockColorClass } from '@/data/products';
import OrderButton from './OrderButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedKg, setSelectedKg] = useState(product.minOrderKg);
  
  const totalPrice = product.pricePerKg * selectedKg;
  const isOutOfStock = product.stockStatus === 'out';

  return (
    <div className="bg-fresh-white rounded-2xl shadow-lg overflow-hidden border border-ocean-primary/10 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image Placeholder - Ocean Fresh themed */}
      <div className="relative h-48 bg-gradient-to-br from-ocean-light to-ocean-secondary/20 flex items-center justify-center">
        <div className="text-6xl animate-wave">
          {product.category === 'udang' && '🦐'}
          {product.category === 'ikan' && '🐟'}
          {product.category === 'ketam' && '🦀'}
          {product.category === 'lain' && '🦑'}
        </div>
        <div className={`absolute top-3 right-3 ${getStockColorClass(product.stockStatus)} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}>
          {getStockLabel(product.stockStatus)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-ocean-primary mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
          
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-ocean-secondary">
              RM{product.pricePerKg}
            </span>
            <span className="text-sm text-gray-500">/kg</span>
          </div>
        </div>
        
        {/* Order Controls */}
        {!isOutOfStock && (
          <div className="space-y-3">
            {/* Weight Selector */}
            <div className="flex items-center justify-between bg-ocean-light/30 rounded-lg p-2">
              <span className="text-sm font-medium text-gray-700">Berat:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedKg(Math.max(product.minOrderKg, selectedKg - 0.5))}
                  className="w-8 h-8 rounded-full bg-ocean-primary text-white flex items-center justify-center text-lg font-bold active:scale-95 transition-transform"
                  disabled={selectedKg <= product.minOrderKg}
                >
                  -
                </button>
                <span className="w-16 text-center font-semibold text-ocean-primary">
                  {selectedKg} kg
                </span>
                <button
                  onClick={() => setSelectedKg(selectedKg + 0.5)}
                  className="w-8 h-8 rounded-full bg-ocean-primary text-white flex items-center justify-center text-lg font-bold active:scale-95 transition-transform"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Total Price Display */}
            <div className="flex justify-between items-center pt-2 border-t border-ocean-primary/10">
              <span className="text-sm text-gray-600">Jumlah:</span>
              <span className="text-xl font-bold text-ocean-secondary">
                RM{totalPrice.toFixed(2)}
              </span>
            </div>
            
            {/* WhatsApp Order Button */}
            <OrderButton product={product} quantity={selectedKg} totalPrice={totalPrice} />
          </div>
        )}
        
        {isOutOfStock && (
          <button
            disabled
            className="w-full py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
          >
            Stok Habis
          </button>
        )}
      </div>
    </div>
  );
}
