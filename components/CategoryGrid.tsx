import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';
import { ASSET_IMAGES, UNSPLASH_BOUQUET_IMAGES } from '../data/initialData';

interface CategoryItem {
  id: ProductCategory;
  title: string;
  subtitle: string;
  image: string;
}

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, navigateTo, products } = useApp();

  const categories: CategoryItem[] = [
    {
      id: 'Buket Bunga',
      title: 'Buket Bunga',
      subtitle: 'Hadiah romantis, ulang tahun, & wisuda hemat mulai Rp 55rb',
      image: UNSPLASH_BOUQUET_IMAGES.rainbowBlossom,
    },
    {
      id: 'Bunga Meja',
      title: 'Bunga Meja',
      subtitle: 'Vas keramik artistik warna-warni untuk meja kantor & ruang tamu',
      image: UNSPLASH_BOUQUET_IMAGES.colorfulTulips,
    },
    {
      id: 'Papan Bunga',
      title: 'Papan Bunga',
      subtitle: 'Bunga papan ucapan Selamat & Sukses, Wedding, & Wisuda khas Indonesia',
      image: ASSET_IMAGES.papanBunga,
    },
    {
      id: 'Bunga Duka Cita',
      title: 'Bunga Duka Cita',
      subtitle: 'Standing arrangement warna pastel lembut belasungkawa terhormat',
      image: UNSPLASH_BOUQUET_IMAGES.pastelLilies,
    },
  ];

  const handleSelect = (category: ProductCategory) => {
    setSelectedCategory(category);
    navigateTo('catalog');
  };

  return (
    <section className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#6B8767] block mb-1">
              Koleksi Berdasarkan Kategori
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1E2621]">
              Pilihan Rangkaian Untuk Momen Spesial
            </h2>
          </div>
          <p className="text-sm text-[#556E51] max-w-md">
            Pilih kategori bunga segar yang Anda butuhkan, kami merangkai dengan bahan berkualitas tinggi dan kesegaran terjamin.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className="group text-left rounded-xl bg-white border border-[#E6EAE5] overflow-hidden hover:border-[#ADC0AA] hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F4F6F4] relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ASSET_IMAGES.spring;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#2C382A] group-hover:bg-[#445841] group-hover:text-white transition-colors shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#556E51] mb-1.5">
                      <span>{count} Pilihan Desain</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#1E2621] group-hover:text-[#445841] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#6B8767] mt-1.5 line-clamp-2 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F4F6F4] flex items-center justify-between text-xs font-medium text-[#445841]">
                    <span>Lihat Koleksi</span>
                    <span className="text-[#88A284] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
