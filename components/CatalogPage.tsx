import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';
import { ProductCard } from './FeaturedProducts';

export const CatalogPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [priceFilter, setPriceFilter] = useState<'all' | 'under100' | '100to180' | 'above180'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'name'>('popular');

  const categories: (ProductCategory | 'Semua')[] = [
    'Semua',
    'Buket Bunga',
    'Bunga Meja',
    'Papan Bunga',
    'Bunga Duka Cita',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        // Category check
        if (selectedCategory !== 'Semua' && prod.category !== selectedCategory) {
          return false;
        }

        // Search check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = prod.name.toLowerCase().includes(q);
          const matchDesc = prod.description.toLowerCase().includes(q);
          const matchCat = prod.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        // Price range check (Rp 50.000 - Rp 250.000 range)
        if (priceFilter === 'under100' && prod.price >= 100000) return false;
        if (priceFilter === '100to180' && (prod.price < 100000 || prod.price > 180000)) return false;
        if (priceFilter === 'above180' && prod.price <= 180000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // default/popular
      });
  }, [products, selectedCategory, searchQuery, priceFilter, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('Semua');
    setSearchQuery('');
    setPriceFilter('all');
    setSortBy('popular');
  };

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#556E51] mb-2">
            <span>Beranda</span>
            <span>/</span>
            <span className="text-[#1E2621] font-medium">Katalog Bunga</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#1E2621]">
            Katalog Bunga Segar Bloom & Glow
          </h1>
          <p className="text-sm text-[#556E51] mt-1 max-w-2xl">
            Pilih rangkaian bunga terbaik dengan kustomisasi pita sutra dan pesan kartu ucapan personal untuk orang tersayang.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl border border-[#E6EAE5] p-4 sm:p-5 mb-8 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#88A284] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari mawar, sunflower, hydrangea, duka cita..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] focus:ring-1 focus:ring-[#6B8767] text-[#1E2621]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#88A284] hover:text-[#2C382A]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Price Filter Selector */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#556E51] shrink-0" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                aria-label="Filter berdasarkan rentang harga"
                className="text-xs sm:text-sm bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg px-3 py-2 text-[#2C382A] focus:outline-none focus:border-[#6B8767] cursor-pointer"
              >
                <option value="all">Semua Rentang Harga</option>
                <option value="under100">&lt; Rp 100.000 (Hemat)</option>
                <option value="100to180">Rp 100.000 - Rp 180.000</option>
                <option value="above180">&gt; Rp 180.000 (Papan Bunga & Premium)</option>
              </select>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Urutkan produk"
                className="text-xs sm:text-sm bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg px-3 py-2 text-[#2C382A] focus:outline-none focus:border-[#6B8767] cursor-pointer"
              >
                <option value="popular">Terpopuler</option>
                <option value="price-low">Harga: Terendah</option>
                <option value="price-high">Harga: Tertinggi</option>
                <option value="name">Nama (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (Segmented Button Controls) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-[#F4F6F4]">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#445841] text-white shadow-sm'
                      : 'bg-[#F4F6F4] text-[#556E51] hover:bg-[#E6EAE5] hover:text-[#1E2621]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Info & Count */}
        <div className="flex items-center justify-between text-xs text-[#556E51] mb-6">
          <span>
            Menampilkan <strong className="text-[#1E2621] font-semibold">{filteredProducts.length}</strong> produk bunga
          </span>
          {(selectedCategory !== 'Semua' || searchQuery || priceFilter !== 'all' || sortBy !== 'popular') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#6B8767] hover:text-[#374635] font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E6EAE5] p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E6EAE5] flex items-center justify-center mx-auto mb-4 text-[#88A284]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#1E2621] mb-2">
              Tidak Ada Bunga Yang Cocok
            </h3>
            <p className="text-xs text-[#556E51] mb-6 leading-relaxed">
              Kami tidak menemukan rangkaian bunga sesuai kriteria pencarian Anda. Coba ubah kata kunci atau hapus filter harga.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#445841] text-white text-xs font-semibold rounded-lg hover:bg-[#374635] transition-colors cursor-pointer"
            >
              Tampilkan Semua Bunga
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
