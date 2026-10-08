import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTracking } from './components/OrderTracking';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ASSET_IMAGES } from './data/initialData';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <main className="flex-1">
      {activeView === 'home' && (
        <>
          <Hero />
          <CategoryGrid />
          <FeaturedProducts />
          {/* Brief atelier promise section */}
          <section className="py-14 bg-white border-t border-[#E6EAE5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6EAE5] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#6B8767]">
                    Kustomisasi Istimewa
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1E2621]">
                    Rangkai Hadiah Bunga Sempurna dengan Sentuhan Personal
                  </h3>
                  <p className="text-xs sm:text-sm text-[#556E51] leading-relaxed max-w-xl">
                    Pilih warna pita sutra favorit penerima dan cantumkan kartu ucapan dengan pesan tulus. Kami memastikan setiap kata tertulis dengan rapi dan bunga sampai dalam kondisi segar merekah.
                  </p>
                </div>
                <div className="md:col-span-4 flex justify-start md:justify-end">
                  <div className="w-full sm:w-auto p-4 bg-white rounded-xl border border-[#E6EAE5] shadow-xs text-xs space-y-2 text-[#445841]">
                    <div className="font-semibold text-[#1E2621]">Layanan Prioritas:</div>
                    <div>✓ Pilihan 6 Warna Pita Sutra</div>
                    <div>✓ Kartu Ucapan Gratis</div>
                    <div>✓ Sameday Delivery Jabodetabek</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {activeView === 'catalog' && <CatalogPage />}
      {activeView === 'product-detail' && <ProductDetail />}
      {activeView === 'checkout' && <CheckoutPage />}
      {activeView === 'order-success' && <OrderSuccessModal />}
      {activeView === 'order-tracking' && <OrderTracking />}
      {activeView === 'about' && <AboutPage />}
      {activeView === 'admin' && <AdminDashboard />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2621]">
        <Navbar />
        <MainContent />
        <CartDrawer />
        <Footer />
      </div>
    </AppProvider>
  );
}
