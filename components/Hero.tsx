import React from 'react';
import { ArrowRight, Sparkles, Clock, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/initialData';

export const Hero: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useApp();

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-16 lg:py-20 border-b border-[#E6EAE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Soft subtle announcement label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6EAE5] rounded-full text-xs font-medium text-[#445841]">
              <Sparkles className="w-3.5 h-3.5 text-[#6B8767]" />
              <span>Buket Bunga Warna-Warni Cantik Mulai Rp 50.000 - Rp 250.000</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1E2621] leading-[1.15] text-balance">
              Buket Bunga Cantik & Segar, Harga Lebih Terjangkau
            </h1>

            <p className="text-base sm:text-lg text-[#556E51] font-normal leading-relaxed max-w-xl">
              Bloom & Glow Florist menghadirkan koleksi buket bunga warna-warni yang memikat dengan harga bersahabat mulai dari Rp 50.000 hingga Rp 250.000. Lengkap dengan pita sutra dan kartu ucapan kustom gratis.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  navigateTo('catalog');
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#445841] hover:bg-[#374635] text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all cursor-pointer group"
              >
                <span>Jelajahi Katalog Bunga</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('Buket Bunga');
                  navigateTo('catalog');
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-[#D0D9CE] hover:border-[#ADC0AA] hover:bg-[#F4F6F4] text-[#2C382A] text-sm font-medium rounded-lg transition-all cursor-pointer"
              >
                <span>Pesan Buket Terlaris</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E6EAE5] text-[#445841]">
              <div>
                <p className="font-display text-2xl font-bold text-[#1E2621] tabular-nums">100%</p>
                <p className="text-xs text-[#556E51] mt-0.5">Bunga Segar Harian</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#1E2621] tabular-nums">Gratis</p>
                <p className="text-xs text-[#556E51] mt-0.5">Pita & Kartu Ucapan</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#1E2621] tabular-nums">Sameday</p>
                <p className="text-xs text-[#556E51] mt-0.5">Siap Antar Tepat Waktu</p>
              </div>
            </div>

          </div>

          {/* Media Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-[5/4] bg-[#E6EAE5] border border-[#D0D9CE]">
              <img
                src={ASSET_IMAGES.hero}
                alt="Bloom & Glow Florist atelier workspace"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-[#E6EAE5] shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#6B8767] block">
                      Studio Florist
                    </span>
                    <h3 className="font-display text-base font-semibold text-[#1E2621]">
                      Dirangkai Oleh Floral Artisan Profesional
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center border border-[#E6EAE5] shrink-0 text-[#6B8767]">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative backdrop glow */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-[#F4D9DC]/40 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#D0D9CE]/40 rounded-full blur-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};
