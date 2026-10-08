import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Menu, X, ArrowLeft, Search, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FloristLogo } from './FloristLogo';

export const Navbar: React.FC = () => {
  const {
    activeView,
    navigateTo,
    cartCount,
    setIsCartDrawerOpen,
    setSelectedCategory,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = activeView === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E6EAE5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark with Floral Silhouette Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                navigateTo('home');
              }}
              className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer focus:outline-none"
              title="Bloom & Glow Florist - Beranda"
            >
              {/* Minimalist Aesthetic Floral Logo */}
              <FloristLogo size="md" />

              <span className="font-display text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#1E2621] whitespace-nowrap">
                Bloom & Glow Florist
              </span>
            </button>
            {isAdmin && (
              <span className="hidden sm:inline-block text-[11px] font-medium text-[#445841] bg-[#E6EAE5] px-2 py-0.5 rounded ml-1">
                Admin
              </span>
            )}
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#445841]">
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                navigateTo('home');
              }}
              className={`transition-colors hover:text-[#1E2621] cursor-pointer py-1 ${
                activeView === 'home' ? 'text-[#1E2621] border-b-2 border-[#6B8767]' : ''
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                navigateTo('catalog');
              }}
              className={`transition-colors hover:text-[#1E2621] cursor-pointer py-1 ${
                activeView === 'catalog' ? 'text-[#1E2621] border-b-2 border-[#6B8767]' : ''
              }`}
            >
              Katalog Bunga
            </button>
            <button
              onClick={() => navigateTo('order-tracking')}
              className={`transition-colors hover:text-[#1E2621] cursor-pointer py-1 ${
                activeView === 'order-tracking' ? 'text-[#1E2621] border-b-2 border-[#6B8767]' : ''
              }`}
            >
              Lacak Pesanan
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`transition-colors hover:text-[#1E2621] cursor-pointer py-1 ${
                activeView === 'about' ? 'text-[#1E2621] border-b-2 border-[#6B8767]' : ''
              }`}
            >
              Profil & Pembuat
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {!isAdmin ? (
              <>
                {/* Cart Button */}
                <button
                  onClick={() => setIsCartDrawerOpen(true)}
                  aria-label="Buka Keranjang Belanja"
                  className="relative p-2.5 rounded-full text-[#2C382A] hover:bg-[#E6EAE5] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 text-[#2C382A]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-[#B55D6A] text-white text-xs font-semibold rounded-full flex items-center justify-center tabular-nums shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Modul Admin Switcher */}
                <button
                  onClick={() => navigateTo('admin')}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#2C382A] bg-[#E6EAE5] hover:bg-[#D0D9CE] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  title="Masuk ke Panel Pengelola Toko"
                >
                  <ShieldCheck className="w-4 h-4 text-[#556E51]" />
                  <span className="hidden sm:inline">Modul Admin</span>
                  <span className="sm:hidden">Admin</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#556E51] hover:bg-[#445841] rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Toko</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2C382A] hover:bg-[#E6EAE5] rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6EAE5] bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              setSelectedCategory('Semua');
              navigateTo('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1E2621] hover:bg-[#E6EAE5] rounded-md"
          >
            Beranda
          </button>
          <button
            onClick={() => {
              setSelectedCategory('Semua');
              navigateTo('catalog');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1E2621] hover:bg-[#E6EAE5] rounded-md"
          >
            Katalog Bunga Lengkap
          </button>
          <button
            onClick={() => {
              navigateTo('order-tracking');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1E2621] hover:bg-[#E6EAE5] rounded-md flex items-center justify-between"
          >
            <span>Lacak Status Pesanan</span>
            <Truck className="w-4 h-4 text-[#6B8767]" />
          </button>
          <button
            onClick={() => {
              navigateTo('about');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1E2621] hover:bg-[#E6EAE5] rounded-md"
          >
            Tentang Florist & Profil Pembuat
          </button>
          
          <div className="pt-2 border-t border-[#E6EAE5]">
            <button
              onClick={() => {
                if (isAdmin) {
                  navigateTo('home');
                } else {
                  navigateTo('admin');
                }
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-md bg-[#6B8767] text-white hover:bg-[#556E51]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAdmin ? 'Beralih ke Tampilan Toko' : 'Masuk ke Modul Admin / Toko'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
