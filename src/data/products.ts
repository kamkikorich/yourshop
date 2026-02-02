export type StockStatus = 'available' | 'limited' | 'out';

export interface Product {
  id: string;
  name: string;
  description: string;
  highlights?: string[];
  pricePerKg: number;
  image: string;
  stockStatus: StockStatus;
  category: 'udang' | 'ikan' | 'ketam' | 'lain';
  minOrderKg: number;
  isActive: boolean;
}

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Udang Galah Premium Borneo',
    description: 'Udang galah segar pilihan hari ini. Sesuai untuk grill, butter, dan masakan berkuah. Stok terhad, siapa cepat dia dapat.',
    highlights: [
      'Tempahan terus melalui WhatsApp',
      'Minimum tempahan 1kg',
      'Status stok dikemas kini',
    ],
    pricePerKg: 85,
    image: '/images/featured-udang.jpg',
    stockStatus: 'available',
    category: 'udang',
    minOrderKg: 1,
    isActive: true,
  },
];

export const getStockLabel = (status: StockStatus): string => {
  const labels: Record<StockStatus, string> = {
    'available': 'Stok Sedia',
    'limited': 'Stok Terhad',
    'out': 'Stok Habis',
  };
  return labels[status];
};

export const getStockColorClass = (status: StockStatus): string => {
  const colors: Record<StockStatus, string> = {
    'available': 'bg-green-500',
    'limited': 'bg-amber-500',
    'out': 'bg-red-500',
  };
  return colors[status];
};

export const categories = [
  { id: 'all', label: 'Semua', icon: '🦐' },
  { id: 'udang', label: 'Udang', icon: '🦐' },
  { id: 'ikan', label: 'Ikan', icon: '🐟' },
  { id: 'ketam', label: 'Ketam', icon: '🦀' },
  { id: 'lain', label: 'Lain-lain', icon: '🦑' },
] as const;
