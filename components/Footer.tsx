import React from 'react';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';
import { FloristLogo } from './FloristLogo';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useApp();

  const handleCategoryClick = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    navigateTo('catalog');
  };

  return (
    <footer className="bg-[#1E2621] text-[#E6EAE5] border-t border-[#2C382A] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2C382A]">
          
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <FloristLogo size="sm" className="bg-[#2D3A37] border-[#445841]" />
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Bloom & Glow Florist
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#ADC0AA] max-w-sm leading-relaxed">
              Atelier perangkaian bunga potong segar dengan dedikasi pada keindahan estetika dan ketepatan waktu. Setiap buket, papan ucapan, vas meja, dan krans duka cita dirangkai dengan rasa hormat dan kasih sayang.
            </p>

            <div className="pt-2">
              <p className="text-xs text-[#88A284]">
                Jam Operasional Toko & Pengantaran:
              </p>
              <p className="text-xs text-white font-medium mt-0.5">
                Senin – Minggu: 07.00 – 21.00 WIB (Sameday Delivery Ready)
              </p>
            </div>
          </div>

          {/* Quick Category Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Kategori Bunga
            </h4>
            <ul className="space-y-2 text-xs text-[#ADC0AA]">
              <li>
                <button
                  onClick={() => handleCategoryClick('Buket Bunga')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Buket Bunga (Bouquet)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Bunga Meja')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bunga Meja Vas Keramik
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Papan Bunga')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Papan Bunga Ucapan (Steekwerk)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Bunga Duka Cita')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bunga Duka Cita & Standing Wreath
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation & Help (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-[#ADC0AA]">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Semua');
                    navigateTo('catalog');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Semua Katalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('order-tracking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lacak Pesanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Profil & Pengembang
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-[#EABEC3] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Modul Admin Toko</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              LAYANAN FLORIST
            </h4>
            <p className="text-xs text-[#ADC0AA] leading-relaxed">
              Studio Florist Rajabasa, Bandar Lampung. Layanan pengiriman bunga segar ke seluruh wilayah Bandar Lampung dan sekitarnya.
            </p>
            <p className="text-xs font-mono text-white">
              WA: +62 812-3456-7890
            </p>
          </div>

        </div>

        {/* Mandatory Identity Credit & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#88A284]">
          
          <div className="text-center md:text-left">
            <p className="text-white font-medium">
              Dibuat oleh Mahasiswa Program Studi Sistem Informasi, Jurusan Ilmu Komputer
            </p>
            <p className="text-[11px] text-[#ADC0AA] mt-0.5">
              Studi Kasus E-Commerce dan Sistem Informasi Manajemen Toko Bunga (Bloom & Glow Florist)
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>&copy; {new Date().getFullYear()} Bloom & Glow Florist. All rights reserved.</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
