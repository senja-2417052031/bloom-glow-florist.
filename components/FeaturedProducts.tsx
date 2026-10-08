import React from 'react';
import { ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';
import { Product } from '../types';
import { ASSET_IMAGES } from '../data/initialData';

export const FeaturedProducts: React.FC = () => {
  const { products, navigateTo, setSelectedCategory } = useApp();

  const featuredList = products.slice(0, 4);

  return (
    <section className="py-16 bg-[#FAF8F5] border-t border-[#E6EAE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#6B8767] block mb-1">
              Pilihan Favorit Pelanggan
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1E2621]">
              Buket Bunga Warna-Warni Terlaris
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Semua');
              navigateTo('catalog');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#445841] hover:text-[#2C382A] cursor-pointer group"
          >
            <span>Lihat Semua Katalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { navigateTo } = useApp();

  return (
    <div className="group rounded-xl bg-white border border-[#E6EAE5] overflow-hidden hover:border-[#ADC0AA] hover:shadow-md transition-all flex flex-col">
      {/* Product Image */}
      <div className="aspect-[4/3] bg-[#F4F6F4] relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = ASSET_IMAGES.spring;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => navigateTo('product-detail', product.id)}
            className="px-3.5 py-2 bg-white/95 hover:bg-white text-[#2C382A] text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Detail</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata clean unboxed */}
          <div className="flex items-center justify-between text-xs text-[#556E51] mb-1.5">
            <span>{product.category}</span>
            <span className="tabular-nums">
              {product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis'}
            </span>
          </div>

          <h3 
            onClick={() => navigateTo('product-detail', product.id)}
            className="font-display text-lg font-semibold text-[#1E2621] hover:text-[#445841] cursor-pointer line-clamp-1 transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6B8767] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F4F6F4] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#556E51] block">Harga</span>
            <span className="font-semibold text-sm sm:text-base text-[#1E2621] tabular-nums">
              {formatIDR(product.price)}
            </span>
          </div>

          <button
            onClick={() => navigateTo('product-detail', product.id)}
            className="px-3 py-1.5 bg-[#E6EAE5] hover:bg-[#445841] hover:text-white text-[#2C382A] text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Kustom</span>
          </button>
        </div>
      </div>
    </div>
  );
};
