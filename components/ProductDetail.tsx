import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ShoppingBag, Heart, Shield, Sparkles, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';
import { RIBBON_OPTIONS, GREETING_CARD_PRESETS, PAPAN_BUNGA_PRESETS, ASSET_IMAGES } from '../data/initialData';

export const ProductDetail: React.FC = () => {
  const {
    activeProductId,
    products,
    navigateTo,
    addToCart,
  } = useApp();

  const product = products.find((p) => p.id === activeProductId) || products[0];

  const isPapanBunga = product?.category === 'Papan Bunga';

  // Customization state
  const [selectedRibbon, setSelectedRibbon] = useState<string>(RIBBON_OPTIONS[0].name);
  const [cardTo, setCardTo] = useState<string>('');
  const [cardMessage, setCardMessage] = useState<string>(
    isPapanBunga
      ? 'Selamat & Sukses Atas Peresmian Usaha di Rajabasa, Bandar Lampung'
      : 'Selamat dan bahagia selalu! Semoga harimu indah semekar bunga ini.'
  );
  const [cardFrom, setCardFrom] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Sync default message when switching to/from Papan Bunga
  useEffect(() => {
    if (isPapanBunga) {
      if (!cardMessage || cardMessage.includes('semekar bunga')) {
        setCardMessage('Selamat & Sukses Atas Peresmian Usaha di Rajabasa, Bandar Lampung');
      }
    }
  }, [isPapanBunga]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#556E51]">Produk tidak ditemukan.</p>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-4 px-4 py-2 bg-[#445841] text-white text-xs font-semibold rounded-lg"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  const handlePresetSelect = (presetMsg: string) => {
    setCardMessage(presetMsg);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart(
      product,
      quantity,
      selectedRibbon,
      {
        to: cardTo.trim() || 'Penerima Terkasih',
        message: cardMessage.trim() || 'Semoga harimu indah semekar bunga ini.',
        from: cardFrom.trim() || 'Pengirim Rahasia',
      }
    );

    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2500);
  };

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <button
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#556E51] hover:text-[#1E2621] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Bunga</span>
        </button>

        {/* 2-Column Contiguous Purchase PDP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Column 1: Image & Specifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl overflow-hidden bg-white border border-[#E6EAE5] shadow-sm relative aspect-[4/3] sm:aspect-square">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ASSET_IMAGES.spring;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium text-[#445841] rounded-md shadow-sm border border-[#E6EAE5]">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Floral details card */}
            <div className="bg-white rounded-xl border border-[#E6EAE5] p-5 space-y-4">
              <h4 className="font-display text-base font-semibold text-[#1E2621]">
                Spesifikasi & Komposisi Bunga
              </h4>

              {product.flowerTypes && product.flowerTypes.length > 0 && (
                <div>
                  <span className="text-xs text-[#556E51] block mb-1">Jenis Bunga:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.flowerTypes.map((fl, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#FAF8F5] border border-[#E6EAE5] px-2.5 py-1 rounded text-[#2C382A]"
                      >
                        {fl}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.dimensions && (
                <div className="text-xs text-[#556E51]">
                  <span className="font-medium text-[#2C382A]">Dimensi Rangkaian:</span> {product.dimensions}
                </div>
              )}

              {product.careTips && (
                <div className="p-3 bg-[#FAF8F5] border border-[#E6EAE5] rounded-lg text-xs text-[#445841] flex gap-2.5 items-start">
                  <Info className="w-4 h-4 text-[#6B8767] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Tips Perawatan Agar Tetap Segar:</span>
                    <span>{product.careTips}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Contiguous Purchase Module */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E6EAE5] p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Title & Price Header */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#556E51] mb-2">
                <span>{product.category}</span>
                <span className={`font-medium ${product.stock > 0 ? 'text-[#556E51]' : 'text-rose-600'}`}>
                  {product.stock > 0 ? `Tersedia: ${product.stock} tangkai/set` : 'Stok Kosong'}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1E2621] leading-tight">
                {product.name}
              </h1>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-[#1E2621] tabular-nums">
                  {formatIDR(product.price)}
                </span>
                <span className="text-xs text-[#556E51]">
                  Sudah termasuk pita & kartu ucapan eksklusif
                </span>
              </div>

              <p className="text-sm text-[#556E51] mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            <hr className="border-[#F4F6F4]" />

            {isPapanBunga ? (
              /* Customization for Papan Bunga */
              <div className="space-y-4 bg-[#FAF8F5] p-4 sm:p-5 rounded-xl border border-[#E6EAE5]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#6B8767] uppercase tracking-wider block">
                      Kustomisasi Bunga Papan Ucapan
                    </span>
                    <h4 className="font-display text-base font-semibold text-[#1E2621]">
                      Teks Ucapan & Nama Pengirim
                    </h4>
                  </div>
                  <span className="text-[11px] bg-[#E6EAE5] text-[#445841] px-2 py-0.5 rounded font-medium">
                    Ukuran Besar 2m x 1.25m
                  </span>
                </div>

                {/* Quick Preset Buttons */}
                <div>
                  <span className="text-[11px] text-[#556E51] block mb-1.5 font-medium">
                    Pilih Format Ucapan:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PAPAN_BUNGA_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setCardMessage(`${preset.headline} Atas Peresmian / Acara di Rajabasa, Bandar Lampung`);
                        }}
                        className="text-[11px] px-2.5 py-1 rounded bg-white border border-[#E6EAE5] hover:border-[#6B8767] hover:bg-[#F4F6F4] text-[#2C382A] font-medium transition-colors cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields for Papan Bunga */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C382A] mb-1">
                      Ditujukan Kepada (Nama Toko / Perusahaan / Mempelai / Yang Dituju):
                    </label>
                    <input
                      type="text"
                      value={cardTo}
                      onChange={(e) => setCardTo(e.target.value)}
                      placeholder="Contoh: PT Solusi Teknologi Lampung / Rizky & Dinda"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C382A] mb-1">
                      Teks Ucapan / Kalimat Utama di Papan Bunga:
                    </label>
                    <textarea
                      rows={2}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      placeholder="Contoh: SELAMAT & SUKSES ATAS PERESMIAN KANTOR BARU DI RAJABASA"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#2C382A] mb-1">
                      Teks Ucapan / Nama Pengirim (Tercetak di Bawah Papan Bunga):
                    </label>
                    <input
                      type="text"
                      value={cardFrom}
                      onChange={(e) => setCardFrom(e.target.value)}
                      placeholder="Contoh: Direksi & Karyawan PT Sinar Lampung / Bpk. H. Hendra & Keluarga"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                    />
                    <span className="text-[10px] text-[#88A284] mt-1 block">
                      *Teks ucapan & nama pengirim akan dirangkai rapi dengan bunga suyok timbul di bagian bawah papan bunga.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Customization 1: Ribbon Color Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E2621] uppercase tracking-wider mb-2">
                    1. Pilih Warna Pita Sutra: <span className="text-[#6B8767] font-normal lowercase capitalize ml-1">{selectedRibbon}</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {RIBBON_OPTIONS.map((ribbon) => {
                      const isSelected = selectedRibbon === ribbon.name;
                      return (
                        <button
                          key={ribbon.id}
                          type="button"
                          onClick={() => setSelectedRibbon(ribbon.name)}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium transition-all text-left cursor-pointer ${
                            isSelected
                              ? 'border-[#445841] bg-[#F4F6F4] text-[#1E2621] ring-1 ring-[#445841]'
                              : 'border-[#E6EAE5] hover:border-[#D0D9CE] text-[#556E51]'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border shrink-0"
                            style={{ backgroundColor: ribbon.hex, borderColor: ribbon.border }}
                          />
                          <span className="truncate">{ribbon.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Customization 2: Greeting Card Form */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#1E2621] uppercase tracking-wider">
                      2. Kustomisasi Kartu Ucapan
                    </label>
                    <span className="text-[11px] text-[#6B8767]">Free Custom Message</span>
                  </div>

                  {/* Quick Presets */}
                  <div>
                    <span className="text-[11px] text-[#556E51] block mb-1.5">Template Pesan Cepat:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {GREETING_CARD_PRESETS.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handlePresetSelect(p.message)}
                          className="text-[11px] px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E6EAE5] hover:border-[#ADC0AA] hover:bg-[#E6EAE5] text-[#445841] transition-colors cursor-pointer"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-medium text-[#556E51] mb-1">
                        Kepada (Nama Penerima):
                      </label>
                      <input
                        type="text"
                        value={cardTo}
                        onChange={(e) => setCardTo(e.target.value)}
                        placeholder="Contoh: Dinda & Rian"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#556E51] mb-1">
                        Dari (Nama Pengirim):
                      </label>
                      <input
                        type="text"
                        value={cardFrom}
                        onChange={(e) => setCardFrom(e.target.value)}
                        placeholder="Contoh: Rama & Keluarga"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#556E51] mb-1">
                      Pesan Ucapan di Kartu:
                    </label>
                    <textarea
                      rows={3}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      placeholder="Tuliskan ucapan tulus Anda di sini..."
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                    />
                  </div>
                </div>
              </>
            )}

            <hr className="border-[#F4F6F4]" />

            {/* Quantity & Buy CTA */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-[#1E2621]">Jumlah:</span>
                <div className="flex items-center border border-[#D0D9CE] rounded-lg overflow-hidden bg-[#FAF8F5]">
                  <button
                    type="button"
                    disabled={quantity <= 1 || isOutOfStock}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-sm text-[#445841] hover:bg-[#E6EAE5] disabled:opacity-40 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-semibold text-[#1E2621] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={quantity >= product.stock || isOutOfStock}
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-1.5 text-sm text-[#445841] hover:bg-[#E6EAE5] disabled:opacity-40 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <span className="text-xs text-[#556E51]">
                  Subtotal: <strong className="text-[#1E2621] font-semibold">{formatIDR(product.price * quantity)}</strong>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#445841] hover:bg-[#374635] disabled:bg-[#D0D9CE] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Stok Tidak Tersedia' : 'Tambahkan ke Keranjang'}</span>
                </button>
              </div>

              {addedToast && (
                <div className="p-3 bg-[#E6EAE5] border border-[#ADC0AA] rounded-lg text-xs text-[#2C382A] flex items-center gap-2 animate-fade-in">
                  <Check className="w-4 h-4 text-[#445841] shrink-0" />
                  <span>Berhasil ditambahkan ke keranjang belanja Anda!</span>
                </div>
              )}
            </div>

            {/* Florist Guarantee */}
            <div className="pt-4 border-t border-[#F4F6F4] grid grid-cols-2 gap-3 text-xs text-[#556E51]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#6B8767]" />
                <span>Jaminan Bunga 100% Segar</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6B8767]" />
                <span>Kartu Ucapan Tulisan Rapi</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
