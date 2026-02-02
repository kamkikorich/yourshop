'use client';

import { useEffect, useState } from 'react';
import { initialProducts, Product, StockStatus } from '@/data/products';
import Link from 'next/link';

export default function AdminPage() {
  const requiredPassword = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? '').trim();
  const [isAuthed, setIsAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<StockStatus>('available');
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!isDevelopment) return;
    const saved = sessionStorage.getItem('admin_authed') === '1';
    setIsAuthed(saved);
  }, [isDevelopment]);

  const handleLogin = () => {
    if (!requiredPassword) {
      setLoginError('Password admin belum dikonfigurasi.');
      return;
    }

    if (passwordInput.trim() !== requiredPassword) {
      setLoginError('Password salah.');
      return;
    }

    sessionStorage.setItem('admin_authed', '1');
    setIsAuthed(true);
    setPasswordInput('');
    setLoginError(null);
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditPrice(product.pricePerKg);
    setEditStock(product.stockStatus);
  };

  const saveEdit = () => {
    setProducts(prev => prev.map(p => {
      if (p.id === editingId) {
        return {
          ...p,
          pricePerKg: editPrice,
          stockStatus: editStock,
        };
      }
      return p;
    }));
    setEditingId(null);
  };

  const toggleActive = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, isActive: !p.isActive };
      }
      return p;
    }));
  };

  if (!isDevelopment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean-light/30 to-fresh-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">�</div>
            <h1 className="text-2xl font-bold text-ocean-primary">Admin Dimatikan</h1>
            <p className="text-sm text-gray-500">Borneo Fresh Seafood</p>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Halaman admin tidak tersedia untuk build production (static export).
          </p>

          <Link 
            href="/" 
            className="block text-center mt-4 text-sm text-ocean-primary hover:underline"
          >
            ← Kembali ke Laman Utama
          </Link>
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean-light/30 to-fresh-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔒</div>
            <h1 className="text-2xl font-bold text-ocean-primary">Admin Login</h1>
            <p className="text-sm text-gray-500">JordanSky</p>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">Password Admin</label>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
            className="w-full px-4 py-3 border border-ocean-primary/25 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-primary"
            placeholder="Masukkan password"
          />

          {loginError ? (
            <p className="mt-3 text-sm text-red-600">{loginError}</p>
          ) : null}

          <button
            type="button"
            onClick={handleLogin}
            className="mt-5 w-full py-3 rounded-xl bg-ocean-primary text-white font-semibold hover:bg-ocean-secondary transition-colors"
          >
            Masuk
          </button>

          <Link
            href="/"
            className="block text-center mt-4 text-sm text-ocean-primary hover:underline"
          >
            ← Kembali ke Laman Utama
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ocean-light/20">
      <header className="bg-ocean-primary text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛠️</span>
            <div>
              <h1 className="font-bold">Admin Panel</h1>
              <p className="text-xs text-white/70">Pengurusan Produk</p>
            </div>
          </div>
          
          <Link
            href="/"
            className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
          >
            🏠 Lihat Kedai
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Jumlah Produk</p>
            <p className="text-2xl font-bold text-ocean-primary">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Aktif</p>
            <p className="text-2xl font-bold text-green-500">{products.filter(p => p.isActive).length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Stok Habis</p>
            <p className="text-2xl font-bold text-red-500">{products.filter(p => p.stockStatus === 'out').length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-ocean-primary">Senarai Produk</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-ocean-light/50">
                <tr className="text-left text-sm">
                  <th className="p-4 font-semibold text-gray-700">Produk</th>
                  <th className="p-4 font-semibold text-gray-700">Harga/kg</th>
                  <th className="p-4 font-semibold text-gray-700">Stok</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className={!product.isActive ? 'bg-gray-50' : ''}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {product.category === 'udang' && '🦐'}
                          {product.category === 'ikan' && '🐟'}
                          {product.category === 'ketam' && '🦀'}
                          {product.category === 'lain' && '🦑'}
                        </span>
                        <div>
                          <p className="font-medium text-ocean-primary">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-24 px-2 py-1 border border-ocean-primary rounded"
                        />
                      ) : (
                        <span className="font-semibold">RM{product.pricePerKg}</span>
                      )}
                    </td>
                    
                    <td className="p-4">
                      {editingId === product.id ? (
                        <select
                          value={editStock}
                          onChange={(e) => setEditStock(e.target.value as StockStatus)}
                          className="px-2 py-1 border border-ocean-primary rounded"
                        >
                          <option value="available">Sedia</option>
                          <option value="limited">Terhad</option>
                          <option value="out">Habis</option>
                        </select>
                      ) : (
                        <span className={`
                          inline-flex px-2 py-1 rounded-full text-xs font-medium
                          ${product.stockStatus === 'available' && 'bg-green-100 text-green-700'}
                          ${product.stockStatus === 'limited' && 'bg-amber-100 text-amber-700'}
                          ${product.stockStatus === 'out' && 'bg-red-100 text-red-700'}
                        `}>
                          {product.stockStatus === 'available' && 'Sedia'}
                          {product.stockStatus === 'limited' && 'Terhad'}
                          {product.stockStatus === 'out' && 'Habis'}
                        </span>
                      )}
                    </td>
                    
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(product.id)}
                        className={`
                          inline-flex px-3 py-1 rounded-full text-xs font-medium transition-colors
                          ${product.isActive 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {product.isActive ? 'Aktif' : 'Tidak Aktif'}
                      </button>
                    </td>
                    
                    <td className="p-4 text-right">
                      {editingId === product.id ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                          >
                            Batal
                          </button>
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1 text-sm bg-ocean-primary text-white rounded hover:bg-ocean-secondary"
                          >
                            Simpan
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(product)}
                          className="px-3 py-1 text-sm text-ocean-primary hover:bg-ocean-light rounded"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          💡 Tip: Tukar status ke &quot;Tidak Aktif&quot; untuk sembunyikan produk dari katalog tanpa memadamkannya.
        </p>
      </main>
    </div>
  );
}
