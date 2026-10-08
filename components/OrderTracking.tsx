import React, { useState } from 'react';
import { Search, PackageCheck, Clock, Truck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDateID, formatIDR } from '../utils/formatters';
import { OrderStatus } from '../types';
import { ASSET_IMAGES } from '../data/initialData';

export const OrderTracking: React.FC = () => {
  const { orders, navigateTo } = useApp();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    orders.length > 0 ? orders[0].id : ''
  );

  const matchedOrder = orders.find(
    (o) => o.id.toLowerCase() === (searchOrderId.trim() || selectedOrderId).toLowerCase()
  );

  const getStatusStep = (status: OrderStatus) => {
    switch (status) {
      case 'Diproses':
        return 1;
      case 'Dikirim':
        return 2;
      case 'Selesai':
        return 3;
      case 'Dibatalkan':
        return -1;
      default:
        return 1;
    }
  };

  const currentStep = matchedOrder ? getStatusStep(matchedOrder.status) : 0;

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#6B8767] block mb-1">
            Status Pengiriman Real-Time
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#1E2621]">
            Lacak Pesanan Bunga Anda
          </h1>
          <p className="text-xs sm:text-sm text-[#556E51] mt-1">
            Masukkan Nomor ID Pesanan Anda untuk memeriksa status perangkaian dan pengiriman kurir.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-[#E6EAE5] p-4 sm:p-5 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#88A284] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                placeholder="Contoh ID Pesanan: BG-20261007-001"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
              />
            </div>
            <button
              onClick={() => {
                if (searchOrderId.trim()) {
                  setSelectedOrderId(searchOrderId.trim());
                }
              }}
              className="px-6 py-2.5 bg-[#445841] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#374635] transition-colors cursor-pointer"
            >
              Cari Status
            </button>
          </div>

          {/* Quick chips of recent orders */}
          {orders.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#F4F6F4] flex flex-wrap items-center gap-2 text-xs text-[#556E51]">
              <span className="font-medium">Pesanan Terkini:</span>
              {orders.slice(0, 3).map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => {
                    setSearchOrderId(ord.id);
                    setSelectedOrderId(ord.id);
                  }}
                  className="px-2 py-0.5 rounded bg-[#FAF8F5] hover:bg-[#E6EAE5] border border-[#E6EAE5] font-mono text-[11px] text-[#2C382A] cursor-pointer"
                >
                  {ord.id} ({ord.customerName.split(' ')[0]})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tracking Details */}
        {matchedOrder ? (
          <div className="bg-white rounded-xl border border-[#E6EAE5] p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6EAE5]">
              <div>
                <span className="text-xs text-[#556E51] block">Nomor Pesanan:</span>
                <span className="font-mono text-xl font-bold text-[#1E2621]">{matchedOrder.id}</span>
                <p className="text-xs text-[#556E51] mt-0.5">
                  Pemesan: <strong className="text-[#1E2621]">{matchedOrder.customerName}</strong>
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-[#556E51] block">Status Saat Ini:</span>
                <span className="inline-block mt-1 px-3 py-1 bg-[#E6EAE5] text-[#445841] font-semibold text-xs rounded-md">
                  {matchedOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#556E51] mb-6">
                Tahapan Pengerjaan Florist
              </h3>

              <div className="relative grid grid-cols-3 gap-2 sm:gap-4 text-center">
                {/* Step line */}
                <div className="absolute top-4 left-[16%] right-[16%] h-0.5 bg-[#E6EAE5] -z-0" />

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 1
                        ? 'bg-[#445841] text-white'
                        : 'bg-[#E6EAE5] text-[#556E51]'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#1E2621] mt-2">Dirangkai</span>
                  <span className="text-[11px] text-[#556E51] hidden sm:block mt-0.5">
                    Floral artisan memilih bunga segar
                  </span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 2
                        ? 'bg-[#445841] text-white'
                        : 'bg-[#E6EAE5] text-[#556E51]'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#1E2621] mt-2">Sedang Dikirim</span>
                  <span className="text-[11px] text-[#556E51] hidden sm:block mt-0.5">
                    Kurir membawa bunga dengan hati-hati
                  </span>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 3
                        ? 'bg-[#445841] text-white'
                        : 'bg-[#E6EAE5] text-[#556E51]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#1E2621] mt-2">Selesai</span>
                  <span className="text-[11px] text-[#556E51] hidden sm:block mt-0.5">
                    Bunga tiba di tangan penerima
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Details Card */}
            <div className="bg-[#FAF8F5] rounded-xl border border-[#E6EAE5] p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-[#2C382A] block mb-1">Jadwal Pengantaran:</span>
                <p className="text-[#556E51]">
                  {formatDateID(matchedOrder.deliveryDate)} ({matchedOrder.deliveryTimeSlot || 'Standar'})
                </p>
                {matchedOrder.notes && (
                  <p className="text-[#88A284] mt-1 italic">Catatan: "{matchedOrder.notes}"</p>
                )}
              </div>
              <div>
                <span className="font-semibold text-[#2C382A] block mb-1">Alamat Tujuan:</span>
                <p className="text-[#556E51]">{matchedOrder.customerAddress}</p>
              </div>
            </div>

            {/* Item list */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#556E51] mb-3">
                Item Rangkaian Pesanan
              </h4>
              <div className="space-y-3">
                {matchedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-[#FAF8F5] rounded-lg border border-[#E6EAE5] text-xs">
                    <img
                      src={it.product.image}
                      alt={it.product.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = ASSET_IMAGES.spring;
                      }}
                      className="w-14 h-14 rounded-md object-cover border border-[#E6EAE5] shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-semibold text-[#1E2621]">
                        <span>{it.product.name}</span>
                        <span className="tabular-nums">{formatIDR(it.product.price * it.quantity)}</span>
                      </div>
                      <div className="text-[11px] text-[#556E51] mt-0.5">
                        Pita: {it.ribbonColor} · Qty: {it.quantity}
                      </div>
                      {it.greetingCard && (
                        <div className="text-[11px] text-[#445841] italic mt-1 bg-white p-2 rounded border border-[#F4F6F4]">
                          "Untuk {it.greetingCard.to}: {it.greetingCard.message} - Dari {it.greetingCard.from}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E6EAE5] p-12 text-center">
            <AlertCircle className="w-10 h-10 text-[#88A284] mx-auto mb-3" />
            <h3 className="font-display text-xl font-semibold text-[#1E2621] mb-1">
              Pesanan Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#556E51] max-w-sm mx-auto mb-6">
              Pastikan Anda memasukkan nomor ID Pesanan dengan format yang benar (misalnya: BG-20261007-001).
            </p>
            <button
              onClick={() => navigateTo('catalog')}
              className="px-5 py-2.5 bg-[#445841] text-white text-xs font-semibold rounded-lg hover:bg-[#374635] cursor-pointer"
            >
              Kembali ke Katalog
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
