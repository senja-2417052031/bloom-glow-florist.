import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, MessageSquare, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';
import { ASSET_IMAGES } from '../data/initialData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    navigateTo,
  } = useApp();

  if (!isCartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E6EAE5] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E6EAE5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#445841]" />
              <h3 className="font-display text-xl font-semibold text-[#1E2621]">
                Keranjang Belanja ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-[#556E51] hover:text-[#1E2621] hover:bg-[#F4F6F4] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#E6EAE5] flex items-center justify-center mx-auto mb-4 text-[#88A284]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-display text-lg font-semibold text-[#1E2621] mb-1">
                  Keranjang Masih Kosong
                </h4>
                <p className="text-xs text-[#556E51] mb-6 max-w-xs mx-auto">
                  Belum ada karangan bunga yang dipilih. Jelajahi katalog kami untuk menemukan rangkaian favorit Anda.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('catalog');
                  }}
                  className="px-5 py-2.5 bg-[#445841] text-white text-xs font-semibold rounded-lg hover:bg-[#374635] transition-colors cursor-pointer"
                >
                  Lihat Katalog Bunga
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-[#E6EAE5] p-3.5 space-y-3 shadow-xs"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = ASSET_IMAGES.spring;
                      }}
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#E6EAE5]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#1E2621] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#88A284] hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-medium text-[#445841] mt-0.5 tabular-nums">
                        {formatIDR(item.product.price)}
                      </div>

                      {/* Customization details */}
                      <div className="text-[11px] text-[#556E51] mt-1 space-y-0.5 bg-[#FAF8F5] p-2 rounded border border-[#F4F6F4]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-[#2C382A]">Pita:</span>
                          <span>{item.ribbonColor}</span>
                        </div>
                        {item.greetingCard && (
                          <div className="truncate">
                            <span className="font-medium text-[#2C382A]">Kartu:</span>{' '}
                            <span>Untuk {item.greetingCard.to}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Item Subtotal */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F4F6F4]">
                    <div className="flex items-center border border-[#D0D9CE] rounded-md overflow-hidden bg-[#FAF8F5]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-[#445841] hover:bg-[#E6EAE5] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-medium text-[#1E2621] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        disabled={item.quantity >= item.product.stock}
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-[#445841] hover:bg-[#E6EAE5] disabled:opacity-30 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-[#1E2621] tabular-nums">
                      {formatIDR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E6EAE5] bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#556E51]">
                  <span>Total Produk ({cart.length} item)</span>
                  <span className="font-medium text-[#1E2621] tabular-nums">
                    {formatIDR(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#556E51]">
                  <span>Pita & Kartu Ucapan</span>
                  <span className="text-[#6B8767] font-medium">Gratis (Included)</span>
                </div>
                <div className="pt-2 border-t border-[#F4F6F4] flex justify-between text-sm font-semibold text-[#1E2621]">
                  <span>Estimasi Subtotal</span>
                  <span className="font-display text-lg text-[#1E2621] tabular-nums">
                    {formatIDR(cartSubtotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 px-4 bg-[#445841] hover:bg-[#374635] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lanjut ke Formulir Pemesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#88A284]">
                Biaya pengiriman dihitung pada langkah checkout
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
