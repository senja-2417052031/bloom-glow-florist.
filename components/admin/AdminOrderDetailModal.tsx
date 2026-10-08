import React from 'react';
import { X, MessageSquare, Phone, MapPin, Calendar, Clock, CreditCard, CheckCircle, Truck, Package, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { formatIDR, formatDateID, generateWhatsAppLink } from '../../utils/formatters';
import { ASSET_IMAGES } from '../../data/initialData';

interface AdminOrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export const AdminOrderDetailModal: React.FC<AdminOrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  if (!isOpen || !order) return null;

  const waMessage = `Halo ${order.customerName}, kami dari Admin Bloom & Glow Florist menginfokan update pesanan bunga Anda (${order.id}). Status saat ini: ${order.status}.`;
  const waLink = generateWhatsAppLink(order.customerPhone, waMessage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl border border-[#E6EAE5] shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6EAE5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base sm:text-lg font-bold text-[#1E2621]">
                {order.id}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#E6EAE5] text-[#445841] font-semibold">
                {order.status}
              </span>
            </div>
            <p className="text-xs text-[#556E51] mt-0.5">
              Dibuat pada: {new Date(order.createdAt).toLocaleString('id-ID')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#556E51] hover:text-[#1E2621] hover:bg-[#FAF8F5] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Change Status Control */}
        <div className="mt-5 p-4 bg-[#FAF8F5] rounded-xl border border-[#E6EAE5]">
          <label className="block text-xs font-semibold text-[#1E2621] uppercase tracking-wider mb-2">
            Perbarui Status Pesanan Ini:
          </label>
          <div className="flex flex-wrap gap-2">
            {(['Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'] as OrderStatus[]).map((st) => {
              const isCurrent = order.status === st;
              return (
                <button
                  key={st}
                  onClick={() => onStatusChange(order.id, st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#445841] text-white shadow-sm ring-2 ring-[#445841]'
                      : 'bg-white border border-[#D0D9CE] text-[#556E51] hover:bg-[#E6EAE5]'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E6EAE5] space-y-2">
            <span className="font-semibold text-[#2C382A] uppercase tracking-wider text-[11px] block">
              Data Pemesan
            </span>
            <div className="font-semibold text-[#1E2621] text-sm">
              {order.customerName}
            </div>
            <div className="flex items-center gap-1.5 text-[#556E51]">
              <Phone className="w-3.5 h-3.5 text-[#6B8767]" />
              <span>{order.customerPhone}</span>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-semibold pt-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat WhatsApp Pelanggan</span>
            </a>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E6EAE5] space-y-2">
            <span className="font-semibold text-[#2C382A] uppercase tracking-wider text-[11px] block">
              Jadwal & Pengiriman
            </span>
            <div className="flex items-center gap-1.5 text-[#1E2621] font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#6B8767]" />
              <span>{formatDateID(order.deliveryDate)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#556E51]">
              <Clock className="w-3.5 h-3.5 text-[#6B8767]" />
              <span>{order.deliveryTimeSlot || 'Jadwal Standar'}</span>
            </div>
            <div className="flex items-start gap-1.5 text-[#556E51]">
              <MapPin className="w-3.5 h-3.5 text-[#6B8767] shrink-0 mt-0.5" />
              <span>{order.customerAddress}</span>
            </div>
            {order.notes && (
              <p className="text-[11px] text-[#88A284] italic pt-1">
                Catatan: "{order.notes}"
              </p>
            )}
          </div>
        </div>

        {/* Ordered Items & Greeting Card Customization */}
        <div className="mt-5 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E2621]">
            Rincian Item & Kustomisasi Bunga
          </h4>

          {order.items.map((it, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-[#E6EAE5] text-xs space-y-2 shadow-xs">
              <div className="flex items-center justify-between font-semibold text-[#1E2621]">
                <div className="flex items-center gap-3">
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ASSET_IMAGES.spring;
                    }}
                    className="w-12 h-12 object-cover rounded-lg border border-[#E6EAE5]"
                  />
                  <div>
                    <span className="block text-sm">{it.product.name}</span>
                    <span className="text-[#556E51] font-normal text-xs">
                      Jumlah: {it.quantity} x {formatIDR(it.product.price)}
                    </span>
                  </div>
                </div>
                <span className="tabular-nums font-bold">
                  {formatIDR(it.product.price * it.quantity)}
                </span>
              </div>

              {/* Ribbon Selection */}
              <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#F4F6F4] flex items-center justify-between">
                <span className="text-[#556E51]">Pilihan Warna Pita Sutra:</span>
                <span className="font-semibold text-[#2C382A]">{it.ribbonColor}</span>
              </div>

              {/* Greeting Card Preview */}
              {it.greetingCard && (
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E6EAE5] space-y-1">
                  <div className="flex justify-between text-[11px] text-[#556E51]">
                    <span>Kartu Ucapan: Kepada <strong className="text-[#1E2621]">{it.greetingCard.to}</strong></span>
                    <span>Dari: <strong className="text-[#1E2621]">{it.greetingCard.from}</strong></span>
                  </div>
                  <p className="text-xs text-[#445841] italic bg-white p-2.5 rounded border border-[#F4F6F4]">
                    "{it.greetingCard.message}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment & Total */}
        <div className="mt-5 pt-4 border-t border-[#E6EAE5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
          <div>
            <span className="text-[#556E51]">Metode Pembayaran:</span>
            <span className="font-semibold text-[#1E2621] ml-1.5">{order.paymentMethod}</span>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#556E51] block">Total Transaksi:</span>
            <span className="font-display text-2xl font-bold text-[#1E2621] tabular-nums">
              {formatIDR(order.total)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
