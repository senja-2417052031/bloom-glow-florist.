import React from 'react';
import { CheckCircle2, MessageSquare, Truck, ArrowRight, Printer, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatIDR, formatDateID, generateWhatsAppLink } from '../utils/formatters';

export const OrderSuccessModal: React.FC = () => {
  const { lastCreatedOrder, navigateTo } = useApp();

  if (!lastCreatedOrder) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#556E51]">Belum ada pesanan yang dibuat.</p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-4 py-2 bg-[#445841] text-white text-xs font-semibold rounded-lg"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const order = lastCreatedOrder;

  const waMessage = `Halo Bloom & Glow Florist! Saya ingin konfirmasi pesanan bunga dengan detail berikut:

No Pesanan: ${order.id}
Nama Pemesan: ${order.customerName}
Tanggal Pengantaran: ${formatDateID(order.deliveryDate)} (${order.deliveryTimeSlot || 'Standar'})
Metode Pembayaran: ${order.paymentMethod}
Total Pembayaran: ${formatIDR(order.total)}

Mohon konfirmasi ketersediaan dan foto rangkaian bunganya ya. Terima kasih!`;

  const waLink = generateWhatsAppLink('081234567890', waMessage);

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-[85vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-2xl border border-[#E6EAE5] p-6 sm:p-8 shadow-sm text-center">
          
          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-full bg-[#E6EAE5] text-[#445841] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-semibold tracking-wider uppercase text-[#6B8767] block mb-1">
            Pesanan Berhasil Dibuat
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1E2621]">
            Terima Kasih, {order.customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-[#556E51] mt-1 max-w-md mx-auto">
            Pesanan Anda telah kami catat dengan nomor order <strong className="text-[#1E2621] font-mono">{order.id}</strong>. Tim florist kami akan segera merangkai bunga segar pesanan Anda.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konfirmasi via WhatsApp Florist</span>
            </a>

            <button
              onClick={() => navigateTo('order-tracking')}
              className="w-full sm:w-auto px-5 py-3 bg-[#FAF8F5] hover:bg-[#E6EAE5] border border-[#D0D9CE] text-[#2C382A] text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#6B8767]" />
              <span>Lacak Status Pesanan</span>
            </button>
          </div>

          {/* Order Invoice Recap */}
          <div className="mt-8 text-left bg-[#FAF8F5] rounded-xl border border-[#E6EAE5] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6EAE5] text-xs">
              <div>
                <span className="text-[#556E51] block">ID Pesanan:</span>
                <span className="font-mono font-semibold text-[#1E2621]">{order.id}</span>
              </div>
              <div className="text-right">
                <span className="text-[#556E51] block">Status:</span>
                <span className="inline-block px-2 py-0.5 bg-[#E6EAE5] text-[#445841] font-medium rounded text-[11px]">
                  {order.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#556E51]">
              <div>
                <span className="block font-medium text-[#2C382A]">Tujuan Pengiriman:</span>
                <p className="mt-0.5 text-[#1E2621]">{order.customerAddress}</p>
              </div>
              <div>
                <span className="block font-medium text-[#2C382A]">Jadwal Pengantaran:</span>
                <p className="mt-0.5 text-[#1E2621]">
                  {formatDateID(order.deliveryDate)} ({order.deliveryTimeSlot})
                </p>
              </div>
              <div>
                <span className="block font-medium text-[#2C382A]">Metode Pembayaran:</span>
                <p className="mt-0.5 text-[#1E2621]">{order.paymentMethod}</p>
              </div>
              <div>
                <span className="block font-medium text-[#2C382A]">Total Pembayaran:</span>
                <p className="mt-0.5 font-bold text-sm text-[#1E2621] tabular-nums">
                  {formatIDR(order.total)}
                </p>
              </div>
            </div>

            {/* Item and card message snippet */}
            <div className="pt-3 border-t border-[#E6EAE5] space-y-2">
              <span className="block text-xs font-medium text-[#2C382A]">Rangkaian Bunga:</span>
              {order.items.map((it, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-[#E6EAE5] text-xs space-y-1">
                  <div className="flex justify-between font-medium text-[#1E2621]">
                    <span>{it.product.name} (x{it.quantity})</span>
                    <span className="tabular-nums">{formatIDR(it.product.price * it.quantity)}</span>
                  </div>
                  <div className="text-[11px] text-[#556E51]">
                    Pilihan Pita: <strong className="text-[#2C382A]">{it.ribbonColor}</strong>
                  </div>
                  {it.greetingCard && (
                    <div className="p-2 bg-[#FAF8F5] rounded border border-[#F4F6F4] text-[11px] text-[#445841] italic">
                      "Untuk {it.greetingCard.to}: {it.greetingCard.message} - Dari {it.greetingCard.from}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-[#556E51] hover:text-[#1E2621] underline transition-colors cursor-pointer"
            >
              Kembali ke Halaman Beranda Toko
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
