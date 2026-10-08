import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, CreditCard, QrCode, Banknote, Calendar, Clock, MapPin, User, Phone, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { formatIDR } from '../utils/formatters';
import { ASSET_IMAGES } from '../data/initialData';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    createOrder,
    navigateTo,
  } = useApp();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  
  // Tomorrow's date formatted as default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().slice(0, 10);
  
  const [deliveryDate, setDeliveryDate] = useState(defaultDateStr);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Pagi (09:00 - 12:00)');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QRIS Instant');
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Free shipping threshold above Rp 200.000
  const shippingFee = cartSubtotal >= 200000 ? 0 : 15000;
  const orderTotal = cartSubtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-[#FAF8F5] min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-full bg-[#E6EAE5] flex items-center justify-center mb-4 text-[#6B8767]">
          <Truck className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-[#1E2621] mb-2">
          Tidak Ada Produk Untuk Di-Checkout
        </h2>
        <p className="text-xs text-[#556E51] mb-6 max-w-sm">
          Keranjang belanja Anda kosong. Silakan pilih bunga terlebih dahulu sebelum melanjutkan proses checkout.
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-6 py-2.5 bg-[#445841] text-white text-xs font-semibold rounded-lg hover:bg-[#374635] transition-colors cursor-pointer"
        >
          Lihat Katalog Bunga
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.name = 'Nama lengkap pemesan wajib diisi.';
    if (!customerPhone.trim()) {
      errors.phone = 'Nomor WhatsApp / telepon wajib diisi.';
    } else if (customerPhone.trim().length < 9) {
      errors.phone = 'Masukkan nomor telepon yang valid.';
    }
    if (!customerAddress.trim()) errors.address = 'Alamat lengkap pengiriman wajib diisi.';
    if (!deliveryDate) errors.date = 'Pilih tanggal pengiriman.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        deliveryDate,
        deliveryTimeSlot,
        notes: notes.trim(),
        paymentMethod,
        items: cart,
        subtotal: cartSubtotal,
        shippingFee,
        total: orderTotal,
      });

      setIsSubmitting(false);
      navigateTo('order-success');
    }, 600);
  };

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <button
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#556E51] hover:text-[#1E2621] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali Berbelanja</span>
        </button>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-[#1E2621]">
            Checkout & Formulir Pemesanan
          </h1>
          <p className="text-xs sm:text-sm text-[#556E51] mt-1">
            Lengkapi data penerima dan jadwalkan pengantaran bunga segar Bloom & Glow.
          </p>
        </div>

        <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section 1: Customer & Recipient Details */}
            <div className="bg-white rounded-xl border border-[#E6EAE5] p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F4F6F4]">
                <User className="w-4 h-4 text-[#445841]" />
                <h2 className="font-display text-lg font-semibold text-[#1E2621]">
                  Informasi Pemesan & Pengiriman
                </h2>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2C382A] mb-1">
                  Nama Lengkap Pemesan <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Sarah Anindita"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none focus:ring-1 text-[#1E2621] ${
                      formErrors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-[#D0D9CE] focus:border-[#6B8767] focus:ring-[#6B8767]'
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-[11px] text-rose-500 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2C382A] mb-1">
                  Nomor WhatsApp / Telepon Aktif <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none focus:ring-1 text-[#1E2621] ${
                      formErrors.phone ? 'border-rose-400 focus:ring-rose-400' : 'border-[#D0D9CE] focus:border-[#6B8767] focus:ring-[#6B8767]'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                )}
                <span className="text-[11px] text-[#88A284] mt-0.5 block">
                  Foto hasil rangkaian bunga akan dikirimkan via WhatsApp sebelum pengantaran.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2C382A] mb-1">
                  Alamat Lengkap Pengiriman <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah/gedung, lantai/unit, kelurahan, kecamatan, dan patokan..."
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none focus:ring-1 text-[#1E2621] ${
                    formErrors.address ? 'border-rose-400 focus:ring-rose-400' : 'border-[#D0D9CE] focus:border-[#6B8767] focus:ring-[#6B8767]'
                  }`}
                />
                {formErrors.address && (
                  <p className="text-[11px] text-rose-500 mt-1">{formErrors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C382A] mb-1">
                    Tanggal Kirim Bunga <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                  />
                  {formErrors.date && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2C382A] mb-1">
                    Rentang Jam Pengantaran
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                  >
                    <option value="Pagi (08:30 - 12:00)">Pagi (08:30 - 12:00)</option>
                    <option value="Siang (13:00 - 16:30)">Siang (13:00 - 16:30)</option>
                    <option value="Sore/Malam (17:00 - 20:30)">Sore/Malam (17:00 - 20:30)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2C382A] mb-1">
                  Catatan Tambahan untuk Kurir (Opsional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Titip di meja resepsionis lobby utama atau telepon jika tiba"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                />
              </div>
            </div>

            {/* Section 2: Payment Methods */}
            <div className="bg-white rounded-xl border border-[#E6EAE5] p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F4F6F4]">
                <CreditCard className="w-4 h-4 text-[#445841]" />
                <h2 className="font-display text-lg font-semibold text-[#1E2621]">
                  Pilih Metode Pembayaran
                </h2>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'QRIS Instant',
                    title: 'QRIS Instant (GoPay, OVO, ShopeePay, Dana, BCA Mobile)',
                    desc: 'Scan barcode langsung via aplikasi e-wallet & m-banking',
                    icon: QrCode,
                  },
                  {
                    id: 'Transfer Bank BCA',
                    title: 'Transfer Bank BCA (No. Rek 827-019-4821 a.n Bloom & Glow)',
                    desc: 'Konfirmasi transfer otomatis setelah pembayaran',
                    icon: CreditCard,
                  },
                  {
                    id: 'Transfer Bank Mandiri',
                    title: 'Transfer Bank Mandiri (No. Rek 137-00-9821-3321)',
                    desc: 'Bebas biaya admin sesama Bank Mandiri',
                    icon: CreditCard,
                  },
                  {
                    id: 'COD (Bayar di Tempat)',
                    title: 'COD (Bayar Tunai saat Kurir Tiba)',
                    desc: 'Bayar langsung ke kurir khusus area Jakarta & sekitarnya',
                    icon: Banknote,
                  },
                ].map((method) => {
                  const isSelected = paymentMethod === method.id;
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#445841] bg-[#F4F6F4] ring-1 ring-[#445841]'
                          : 'border-[#E6EAE5] hover:border-[#D0D9CE] bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => setPaymentMethod(method.id as PaymentMethod)}
                        className="mt-1 text-[#445841] focus:ring-[#445841]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#6B8767]" />
                          <span className="text-xs sm:text-sm font-semibold text-[#1E2621]">
                            {method.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#556E51] mt-0.5">
                          {method.desc}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#E6EAE5] p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F6F4]">
              <h2 className="font-display text-lg font-semibold text-[#1E2621]">
                Ringkasan Pesanan ({cart.length} item)
              </h2>
            </div>

            {/* Itemized summary */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs border-b border-[#F4F6F4] pb-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ASSET_IMAGES.spring;
                    }}
                    className="w-14 h-14 rounded-md object-cover border border-[#E6EAE5] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1E2621] truncate">
                      {item.product.name}
                    </h3>
                    <div className="text-[11px] text-[#556E51] mt-0.5">
                      <span>Pita: {item.ribbonColor}</span> · <span>Qty: {item.quantity}</span>
                    </div>
                    {item.greetingCard && (
                      <div className="text-[11px] text-[#6B8767] italic truncate mt-0.5">
                        "{item.greetingCard.message.slice(0, 35)}..."
                      </div>
                    )}
                  </div>
                  <div className="text-right font-medium text-[#1E2621] tabular-nums">
                    {formatIDR(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#556E51]">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span className="font-medium text-[#1E2621] tabular-nums">
                  {formatIDR(cartSubtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim Florist</span>
                <span className="font-medium text-[#1E2621] tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-[#6B8767] font-semibold">Gratis (Promo &gt; 200rb)</span>
                  ) : (
                    formatIDR(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pita & Kartu Ucapan</span>
                <span className="text-[#6B8767] font-medium">Rp 0 (Gratis)</span>
              </div>

              <div className="pt-3 border-t border-[#E6EAE5] flex justify-between items-baseline text-sm">
                <span className="font-semibold text-[#1E2621]">Total Pembayaran</span>
                <span className="font-display text-2xl font-bold text-[#1E2621] tabular-nums">
                  {formatIDR(orderTotal)}
                </span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-3 bg-[#FAF8F5] border border-[#E6EAE5] rounded-lg text-[11px] text-[#556E51] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#2C382A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6B8767]" />
                <span>Garansi Kesegaran Bunga 100%</span>
              </div>
              <p>
                Bunga dirangkai tepat pada hari pengantaran. Apabila bunga tiba dalam kondisi layu, kami siap ganti rangkaian baru secara gratis.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#445841] hover:bg-[#374635] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Memproses Pesanan...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi & Buat Pesanan Sekarang</span>
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};
