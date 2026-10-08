import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Clock, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  RotateCcw, 
  ArrowLeft,
  Filter,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory, Order, OrderStatus } from '../../types';
import { formatIDR, formatDateID } from '../../utils/formatters';
import { AdminProductModal } from './AdminProductModal';
import { AdminOrderDetailModal } from './AdminOrderDetailModal';
import { ASSET_IMAGES } from '../../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    deleteOrder,
    adminTab,
    setAdminTab,
    navigateTo,
    resetToDemoData,
  } = useApp();

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState<ProductCategory | 'Semua'>('Semua');

  // Order modal state
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatus | 'Semua'>('Semua');

  // Delete confirmation
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Compute metrics
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Dibatalkan')
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const totalOrdersCount = orders.length;
  
  const pendingOrdersCount = orders.filter((o) => o.status === 'Diproses').length;
  
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (productCatFilter !== 'Semua' && p.category !== productCatFilter) return false;
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [products, productCatFilter, productSearch]);

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderStatusFilter !== 'Semua' && o.status !== orderStatusFilter) return false;
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        return (
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.includes(q)
        );
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // Handlers for Products
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (prodData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, prodData);
    } else {
      addProduct(prodData);
    }
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6EAE5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6B8767]"></span>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1E2621]">
                Dashboard Pengelola & Manajemen Toko
              </h1>
            </div>
            <p className="text-xs text-[#556E51] mt-1">
              Bloom & Glow Florist · Panel Administrasi & Pengendalian Operasional
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset data produk dan pesanan ke versi awal demo?')) {
                  resetToDemoData();
                }
              }}
              className="px-3 py-2 text-xs font-medium text-[#556E51] hover:text-[#1E2621] bg-white border border-[#D0D9CE] rounded-lg hover:bg-[#FAF8F5] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset data demo ke pengaturan awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Demo</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-[#445841] hover:bg-[#374635] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lihat Tampilan Toko</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E6EAE5] pb-2">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              adminTab === 'overview'
                ? 'bg-[#445841] text-white shadow-sm'
                : 'text-[#556E51] hover:bg-[#E6EAE5] hover:text-[#1E2621]'
            }`}
          >
            Ringkasan Statistik
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              adminTab === 'products'
                ? 'bg-[#445841] text-white shadow-sm'
                : 'text-[#556E51] hover:bg-[#E6EAE5] hover:text-[#1E2621]'
            }`}
          >
            <span>Manajemen Produk Bunga ({products.length})</span>
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              adminTab === 'orders'
                ? 'bg-[#445841] text-white shadow-sm'
                : 'text-[#556E51] hover:bg-[#E6EAE5] hover:text-[#1E2621]'
            }`}
          >
            <span>Manajemen Pesanan ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#B55D6A]"></span>
            )}
          </button>
        </div>

        {/* TAB 1: OVERVIEW & STATISTIK */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Metric 1 */}
              <div className="bg-white p-5 rounded-xl border border-[#E6EAE5] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#556E51] mb-2">
                  <span>Total Pendapatan</span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E6EAE5] flex items-center justify-center text-[#6B8767]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-display text-2xl font-bold text-[#1E2621] tabular-nums">
                  {formatIDR(totalRevenue)}
                </div>
                <p className="text-[11px] text-[#6B8767] mt-1">
                  Dari {orders.filter(o => o.status !== 'Dibatalkan').length} transaksi berhasil
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-white p-5 rounded-xl border border-[#E6EAE5] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#556E51] mb-2">
                  <span>Total Pesanan Masuk</span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E6EAE5] flex items-center justify-center text-[#6B8767]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-display text-2xl font-bold text-[#1E2621] tabular-nums">
                  {totalOrdersCount} Pesanan
                </div>
                <p className="text-[11px] text-[#556E51] mt-1">
                  Semua status transaksi terdata
                </p>
              </div>

              {/* Metric 3 */}
              <div className="bg-white p-5 rounded-xl border border-[#E6EAE5] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#556E51] mb-2">
                  <span>Perlu Diproses</span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E6EAE5] flex items-center justify-center text-[#B55D6A]">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-display text-2xl font-bold text-[#B55D6A] tabular-nums">
                  {pendingOrdersCount} Pesanan
                </div>
                <p className="text-[11px] text-[#556E51] mt-1">
                  Segera rangkai untuk jadwal kirim
                </p>
              </div>

              {/* Metric 4 */}
              <div className="bg-white p-5 rounded-xl border border-[#E6EAE5] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#556E51] mb-2">
                  <span>Total Produk Aktif</span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E6EAE5] flex items-center justify-center text-[#6B8767]">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-display text-2xl font-bold text-[#1E2621] tabular-nums">
                  {products.length} Bunga
                </div>
                <p className="text-[11px] text-[#88A284] mt-1">
                  {lowStockProducts.length > 0 ? `${lowStockProducts.length} stok menipis (<= 5)` : 'Semua stok aman'}
                </p>
              </div>

            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-xl border border-[#E6EAE5] shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[#E6EAE5] flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#1E2621]">
                    Pesanan Terbaru Masuk
                  </h3>
                  <p className="text-xs text-[#556E51]">
                    Daftar transaksi yang perlu dipantau oleh pengelola florist.
                  </p>
                </div>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs font-semibold text-[#445841] hover:underline cursor-pointer"
                >
                  Lihat Semua Pesanan →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#556E51] border-b border-[#E6EAE5]">
                    <tr>
                      <th className="p-3.5 font-medium">ID Pesanan</th>
                      <th className="p-3.5 font-medium">Pelanggan</th>
                      <th className="p-3.5 font-medium">Bunga Dipesan</th>
                      <th className="p-3.5 font-medium">Tgl Kirim</th>
                      <th className="p-3.5 font-medium">Total</th>
                      <th className="p-3.5 font-medium">Status</th>
                      <th className="p-3.5 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4F6F4]">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="p-3.5 font-mono font-semibold text-[#1E2621]">
                          {ord.id}
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-[#1E2621] block">{ord.customerName}</span>
                          <span className="text-[11px] text-[#88A284]">{ord.customerPhone}</span>
                        </td>
                        <td className="p-3.5">
                          {ord.items.map(it => it.product.name).join(', ')}
                        </td>
                        <td className="p-3.5 text-[#556E51]">
                          {formatDateID(ord.deliveryDate)}
                        </td>
                        <td className="p-3.5 font-semibold text-[#1E2621] tabular-nums">
                          {formatIDR(ord.total)}
                        </td>
                        <td className="p-3.5">
                          <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-semibold ${
                            ord.status === 'Diproses'
                              ? 'bg-amber-100 text-amber-800'
                              : ord.status === 'Dikirim'
                              ? 'bg-blue-100 text-blue-800'
                              : ord.status === 'Selesai'
                              ? 'bg-[#E6EAE5] text-[#445841]'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedOrderForDetail(ord)}
                            className="p-1.5 text-[#556E51] hover:text-[#1E2621] hover:bg-[#E6EAE5] rounded-md transition-colors cursor-pointer"
                            title="Buka rincian pesanan"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MANAJEMEN PRODUK (CRUD) */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E6EAE5] shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#88A284] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Cari nama bunga atau kategori..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                  />
                </div>

                {/* Category filter */}
                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value as any)}
                  aria-label="Filter kategori bunga"
                  className="text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg px-3 py-2 text-[#2C382A] focus:outline-none focus:border-[#6B8767]"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Buket Bunga">Buket Bunga</option>
                  <option value="Bunga Meja">Bunga Meja</option>
                  <option value="Papan Bunga">Papan Bunga</option>
                  <option value="Bunga Duka Cita">Bunga Duka Cita</option>
                </select>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-[#445841] hover:bg-[#374635] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Bunga Baru</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl border border-[#E6EAE5] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#556E51] border-b border-[#E6EAE5]">
                    <tr>
                      <th className="p-3.5 font-medium">Foto</th>
                      <th className="p-3.5 font-medium">Nama Produk</th>
                      <th className="p-3.5 font-medium">Kategori</th>
                      <th className="p-3.5 font-medium">Harga</th>
                      <th className="p-3.5 font-medium">Stok</th>
                      <th className="p-3.5 font-medium">Status Stok</th>
                      <th className="p-3.5 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4F6F4]">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="p-3.5">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = ASSET_IMAGES.spring;
                            }}
                            className="w-12 h-12 object-cover rounded-lg border border-[#E6EAE5]"
                          />
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-[#1E2621] block">{prod.name}</span>
                          <span className="text-[11px] text-[#556E51] line-clamp-1 max-w-xs">{prod.description}</span>
                        </td>
                        <td className="p-3.5 text-[#556E51]">
                          {prod.category}
                        </td>
                        <td className="p-3.5 font-semibold text-[#1E2621] tabular-nums">
                          {formatIDR(prod.price)}
                        </td>
                        <td className="p-3.5 font-mono text-[#1E2621] tabular-nums font-medium">
                          {prod.stock} unit
                        </td>
                        <td className="p-3.5">
                          {prod.stock <= 0 ? (
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800">
                              Habis
                            </span>
                          ) : prod.stock <= 5 ? (
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">
                              Menipis ({prod.stock})
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E6EAE5] text-[#445841]">
                              Tersedia
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="p-1.5 text-[#556E51] hover:text-[#445841] hover:bg-[#E6EAE5] rounded-md transition-colors cursor-pointer"
                            title="Ubah Produk"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(prod)}
                            className="p-1.5 text-[#88A284] hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center text-xs text-[#556E51]">
                  Tidak ada produk bunga yang cocok dengan kriteria filter.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: MANAJEMEN PESANAN */}
        {adminTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E6EAE5] shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#88A284] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Cari ID pesanan, nama pemesan, no telp..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
                  />
                </div>

                {/* Status filter */}
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                  aria-label="Filter status pesanan"
                  className="text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg px-3 py-2 text-[#2C382A] focus:outline-none focus:border-[#6B8767]"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Dikirim">Dikirim</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>

            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-[#E6EAE5] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#556E51] border-b border-[#E6EAE5]">
                    <tr>
                      <th className="p-3.5 font-medium">ID & Waktu</th>
                      <th className="p-3.5 font-medium">Pemesan & Kontak</th>
                      <th className="p-3.5 font-medium">Alamat & Jadwal Kirim</th>
                      <th className="p-3.5 font-medium">Rincian Bunga</th>
                      <th className="p-3.5 font-medium">Total & Pembayaran</th>
                      <th className="p-3.5 font-medium">Ubah Status</th>
                      <th className="p-3.5 font-medium text-right">Rincian Lengkap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4F6F4]">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="p-3.5">
                          <span className="font-mono font-semibold text-[#1E2621] block">{ord.id}</span>
                          <span className="text-[11px] text-[#88A284]">
                            {new Date(ord.createdAt).toLocaleDateString('id-ID')}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-[#1E2621] block">{ord.customerName}</span>
                          <span className="text-[11px] text-[#556E51]">{ord.customerPhone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-[#1E2621] font-medium block">
                            {formatDateID(ord.deliveryDate)} ({ord.deliveryTimeSlot?.split(' ')[0] || 'Siang'})
                          </span>
                          <span className="text-[11px] text-[#556E51] line-clamp-1 max-w-xs">
                            {ord.customerAddress}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="text-[11px]">
                              <span className="font-medium text-[#1E2621]">{it.product.name} (x{it.quantity})</span>
                              <span className="text-[#88A284] block">Pita: {it.ribbonColor}</span>
                            </div>
                          ))}
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-[#1E2621] tabular-nums block">
                            {formatIDR(ord.total)}
                          </span>
                          <span className="text-[11px] text-[#556E51]">{ord.paymentMethod}</span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            aria-label={`Ubah status pesanan ${ord.id}`}
                            className={`text-xs font-semibold rounded-md px-2 py-1 border cursor-pointer focus:outline-none ${
                              ord.status === 'Diproses'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : ord.status === 'Dikirim'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : ord.status === 'Selesai'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            <option value="Diproses">Diproses</option>
                            <option value="Dikirim">Dikirim</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Dibatalkan">Dibatalkan</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedOrderForDetail(ord)}
                            className="px-2.5 py-1 text-xs font-medium text-[#445841] bg-[#E6EAE5] hover:bg-[#D0D9CE] rounded-md transition-colors cursor-pointer"
                          >
                            Lihat Kartu & Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="py-12 text-center text-xs text-[#556E51]">
                  Tidak ada pesanan masuk yang cocok dengan filter.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      <AdminProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

      {/* Order Detail Modal */}
      <AdminOrderDetailModal
        isOpen={!!selectedOrderForDetail}
        onClose={() => setSelectedOrderForDetail(null)}
        order={selectedOrderForDetail}
        onStatusChange={(orderId, newStatus) => {
          updateOrderStatus(orderId, newStatus);
          if (selectedOrderForDetail && selectedOrderForDetail.id === orderId) {
            setSelectedOrderForDetail({ ...selectedOrderForDetail, status: newStatus });
          }
        }}
      />

      {/* Delete Product Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setProductToDelete(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative bg-white rounded-xl border border-[#E6EAE5] p-6 max-w-sm w-full z-10 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="font-display text-lg font-semibold text-[#1E2621]">
              Hapus Bunga Ini?
            </h4>
            <p className="text-xs text-[#556E51]">
              Apakah Anda yakin ingin menghapus data <strong className="text-[#1E2621]">"{productToDelete.name}"</strong> dari katalog? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 border border-[#D0D9CE] text-[#556E51] text-xs font-semibold rounded-lg hover:bg-[#FAF8F5] cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
