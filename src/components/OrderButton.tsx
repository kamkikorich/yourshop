'use client';

import { useState } from 'react';
import { Product } from '@/data/products';

interface OrderButtonProps {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export default function OrderButton({ product, quantity, totalPrice }: OrderButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');

  const handleOrder = () => {
    if (!customerName.trim() || !address.trim()) {
      alert('Sila isi nama dan alamat anda');
      return;
    }

    const message = formatWhatsAppMessage(product, quantity, totalPrice, customerName, address);

    const rawPhoneNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '60128340714').trim();
    const phoneNumber = rawPhoneNumber.replace(/[^\d]/g, '');

    if (!phoneNumber) {
      alert('Nombor WhatsApp belum dikonfigurasi.');
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98]"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Order via WhatsApp
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-fresh-white rounded-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in">
        <h3 className="text-xl font-bold text-ocean-primary mb-4">Maklumat Penerima</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penuh *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Contoh: Ahmad bin Ali"
              className="w-full px-4 py-2 border border-ocean-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Penghantaran *</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Alamat lengkap termasuk bandar dan poskod"
              rows={3}
              className="w-full px-4 py-2 border border-ocean-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-primary resize-none"
            />
          </div>

          <div className="bg-ocean-light/30 rounded-lg p-3 text-sm">
            <p className="font-medium text-ocean-primary mb-1">Ringkasan Pesanan:</p>
            <p>{product.name} - {quantity}kg</p>
            <p className="font-semibold">Jumlah: RM{totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleOrder}
              className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hantar ke WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatWhatsAppMessage(
  product: Product,
  quantity: number,
  totalPrice: number,
  customerName: string,
  address: string
): string {
  const dateStr = new Date().toLocaleDateString('ms-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `🦐 *PESANAN BARU - JordanSky*

📅 Tarikh: ${dateStr}

👤 *Maklumat Penerima:*
Nama: ${customerName}
Alamat: ${address}

📦 *Butiran Pesanan:*
Produk: ${product.name}
Berat: ${quantity} kg
Harga/kg: RM${product.pricePerKg}

💰 *Jumlah Bayaran: RM${totalPrice.toFixed(2)}*

---
_Urutan ini dihantar dari laman web JordanSky_`;
}
