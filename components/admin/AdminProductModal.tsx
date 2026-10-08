import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Product, ProductCategory } from '../../types';
import { ASSET_IMAGES, UNSPLASH_BOUQUET_IMAGES } from '../../data/initialData';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id'>) => void;
  initialProduct?: Product | null;
}

const PRESET_IMAGES = [
  { label: 'Papan Bunga Selamat & Sukses', url: ASSET_IMAGES.papanBunga },
  { label: 'Papan Bunga Grand Opening', url: ASSET_IMAGES.papanBungaGrand },
  { label: 'Buket Rainbow Blossom', url: UNSPLASH_BOUQUET_IMAGES.rainbowBlossom },
  { label: 'Buket Colorful Tulips', url: UNSPLASH_BOUQUET_IMAGES.colorfulTulips },
  { label: 'Buket Sunflower Joy', url: UNSPLASH_BOUQUET_IMAGES.sunflowerJoy },
  { label: 'Buket Sweetheart Mini', url: UNSPLASH_BOUQUET_IMAGES.petiteSweetheart },
];

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Buket Bunga');
  const [price, setPrice] = useState<number>(125000);
  const [stock, setStock] = useState<number>(15);
  const [image, setImage] = useState<string>(UNSPLASH_BOUQUET_IMAGES.rainbowBlossom);
  const [description, setDescription] = useState('');
  const [dimensions, setDimensions] = useState('Tinggi 40cm x Lebar 30cm');
  const [flowerTypesStr, setFlowerTypesStr] = useState('Mawar, Baby Breath, Eucalyptus');
  const [careTips, setCareTips] = useState('Ganti air bersih secara rutin.');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setStock(initialProduct.stock);
      setImage(initialProduct.image);
      setDescription(initialProduct.description);
      setDimensions(initialProduct.dimensions || '');
      setFlowerTypesStr(initialProduct.flowerTypes ? initialProduct.flowerTypes.join(', ') : '');
      setCareTips(initialProduct.careTips || '');
    } else {
      setName('');
      setCategory('Buket Bunga');
      setPrice(125000);
      setStock(15);
      setImage(UNSPLASH_BOUQUET_IMAGES.rainbowBlossom);
      setDescription('');
      setDimensions('Tinggi 40cm x Lebar 30cm');
      setFlowerTypesStr('Mawar, Baby Breath, Eucalyptus');
      setCareTips('Ganti air secara rutin.');
    }
    setError('');
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama bunga wajib diisi.');
      return;
    }
    if (price <= 0) {
      setError('Harga harus lebih dari 0.');
      return;
    }
    if (stock < 0) {
      setError('Stok tidak boleh bernilai negatif.');
      return;
    }

    const flowerTypes = flowerTypesStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      name: name.trim(),
      category,
      price,
      stock,
      image,
      description: description.trim() || 'Rangkaian bunga segar berkualitas tinggi dirangkai khusus oleh floral artisan Bloom & Glow.',
      dimensions: dimensions.trim(),
      flowerTypes,
      careTips: careTips.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl border border-[#E6EAE5] shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E6EAE5]">
          <div>
            <h3 className="font-display text-xl font-semibold text-[#1E2621]">
              {initialProduct ? 'Ubah Data Produk Bunga' : 'Tambah Produk Bunga Baru'}
            </h3>
            <p className="text-xs text-[#556E51] mt-0.5">
              Kelola informasi katalog, harga jual, dan stok persediaan bunga.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#556E51] hover:text-[#1E2621] hover:bg-[#FAF8F5] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          
          {/* Nama Produk */}
          <div>
            <label className="block font-medium text-[#2C382A] mb-1">
              Nama Rangkaian Bunga <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Royal Peony Blush Bouquet"
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
            />
          </div>

          {/* Kategori, Harga, Stok */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-[#2C382A] mb-1">
                Kategori Bunga <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
              >
                <option value="Buket Bunga">Buket Bunga</option>
                <option value="Bunga Meja">Bunga Meja</option>
                <option value="Papan Bunga">Papan Bunga</option>
                <option value="Bunga Duka Cita">Bunga Duka Cita</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#2C382A] mb-1">
                Harga Jual (IDR) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1000"
                step="5000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#2C382A] mb-1">
                Stok Tersedia <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
              />
            </div>
          </div>

          {/* Pilihan Foto Bunga */}
          <div>
            <label className="block font-medium text-[#2C382A] mb-1">
              Foto Produk (Pilih Preset Galeri Florist):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImage(preset.url)}
                  className={`border rounded-lg p-1.5 text-left transition-all cursor-pointer ${
                    image === preset.url
                      ? 'border-[#445841] bg-[#F4F6F4] ring-1 ring-[#445841]'
                      : 'border-[#E6EAE5] hover:border-[#ADC0AA]'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-14 object-cover rounded-md mb-1"
                  />
                  <span className="block text-[10px] text-[#2C382A] truncate">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-2">
              <label className="block text-[11px] text-[#556E51] mb-1">
                Atau Masukkan URL Gambar Khusus:
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://... URL gambar bunga"
                className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block font-medium text-[#2C382A] mb-1">
              Deskripsi Produk
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan kesan estetika, kemewahan, atau nuansa rangkaian bunga..."
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
            />
          </div>

          {/* Dimensi & Komposisi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#2C382A] mb-1">
                Dimensi / Ukuran
              </label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="Contoh: Tinggi 45cm x Lebar 35cm"
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#2C382A] mb-1">
                Komposisi Bunga (Pisahkan Koma)
              </label>
              <input
                type="text"
                value={flowerTypesStr}
                onChange={(e) => setFlowerTypesStr(e.target.value)}
                placeholder="Mawar, Baby Breath, Eucalyptus"
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
              />
            </div>
          </div>

          {/* Care Tips */}
          <div>
            <label className="block font-medium text-[#2C382A] mb-1">
              Petunjuk Perawatan (Care Tips)
            </label>
            <input
              type="text"
              value={careTips}
              onChange={(e) => setCareTips(e.target.value)}
              placeholder="Contoh: Ganti air vas setiap 2 hari dan potong tangkai miring"
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D0D9CE] rounded-lg focus:outline-none focus:border-[#6B8767] text-[#1E2621]"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E6EAE5] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D0D9CE] hover:bg-[#FAF8F5] text-[#556E51] rounded-lg cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#445841] hover:bg-[#374635] text-white font-semibold rounded-lg shadow-sm cursor-pointer"
            >
              {initialProduct ? 'Simpan Perubahan' : 'Tambahkan Produk'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
