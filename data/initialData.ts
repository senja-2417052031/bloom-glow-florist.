import { Product, Order } from '../types';
import heroBannerImg from '../assets/images/hero_florist_banner_1791422002881.jpg';
import bouquetRosesImg from '../assets/images/category_bouquet_roses_1791422022715.jpg';
import tableVaseImg from '../assets/images/table_flower_vase_1791422036504.jpg';
import sympathyWreathImg from '../assets/images/sympathy_white_wreath_1791422050492.jpg';

// Newly generated colorful bouquets
import bouquetSpringImg from '../assets/images/bouquet_colorful_spring_1791423081336.jpg';
import bouquetRainbowImg from '../assets/images/bouquet_rainbow_roses_1791423097227.jpg';
import bouquetTulipsImg from '../assets/images/bouquet_colorful_tulips_1791423114103.jpg';
import bouquetCelebrationImg from '../assets/images/bouquet_vibrant_celebration_1791423125177.jpg';

// Authentic Indonesian Papan Bunga Selamat & Sukses images
import indonesianPapanBungaImg from '../assets/images/indonesian_papan_bunga_1791423665748.jpg';
import papanGrandOpeningImg from '../assets/images/papan_bunga_grand_opening_1791423688690.jpg';

export const ASSET_IMAGES = {
  hero: heroBannerImg,
  bouquet: bouquetRosesImg,
  table: tableVaseImg,
  sympathy: sympathyWreathImg,
  spring: bouquetSpringImg,
  rainbow: bouquetRainbowImg,
  tulips: bouquetTulipsImg,
  celebration: bouquetCelebrationImg,
  papanBunga: indonesianPapanBungaImg,
  papanBungaGrand: papanGrandOpeningImg,
};

// High-resolution colorful flower bouquet photography from Unsplash
export const UNSPLASH_BOUQUET_IMAGES = {
  rainbowBlossom: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
  colorfulTulips: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
  vibrantFiesta: indonesianPapanBungaImg, // Papan Bunga authentic image
  pastelLilies: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
  sunflowerJoy: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=800&q=80',
  springRadiance: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=80',
  petiteSweetheart: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
  grandSymphony: papanGrandOpeningImg, // Grand Papan Bunga authentic image
};

export const RIBBON_OPTIONS = [
  { id: 'sage', name: 'Sage Green', hex: '#6B8767', border: '#445841' },
  { id: 'blush', name: 'Soft Blush Pink', hex: '#EABEC3', border: '#CB7984' },
  { id: 'ivory', name: 'Cream Ivory', hex: '#FAF6EE', border: '#D0C8B8' },
  { id: 'gold', name: 'Champagne Satin', hex: '#D4AF37', border: '#AA8825' },
  { id: 'navy', name: 'Midnight Navy', hex: '#1E293B', border: '#0F172A' },
  { id: 'wine', name: 'Burgundy Wine', hex: '#6A1A24', border: '#4A1219' },
];

export const GREETING_CARD_PRESETS = [
  {
    label: 'Ulang Tahun',
    message: 'Selamat ulang tahun yang penuh kebahagiaan! Semoga setiap harimu mekar dengan senyuman dan keberkahan.',
  },
  {
    label: 'Wisuda / Kelulusan',
    message: 'Happy Graduation! Selamat atas pencapaian luar biasamu. Sukses selalu untuk babak baru dalam hidupmu!',
  },
  {
    label: 'Anniversary',
    message: 'Happy Anniversary, cintaku. Terima kasih telah selalu menjadi alasan terindah dalam hidupku. Love you always.',
  },
  {
    label: 'Grand Opening',
    message: 'Selamat dan sukses atas pembukaan usaha baru. Semoga semakin maju, berkah, dan laris manis!',
  },
  {
    label: 'Duka Cita',
    message: 'Turut berduka cita yang sedalam-dalamnya. Semoga keluarga yang ditinggalkan diberikan ketabahan dan kekuatan.',
  },
];

export const PAPAN_BUNGA_PRESETS = [
  { label: 'Selamat & Sukses', headline: 'SELAMAT & SUKSES', desc: 'Peresmian kantor, wisuda, atau pelantikan' },
  { label: 'Happy Wedding', headline: 'HAPPY WEDDING', desc: 'Pernikahan bahagia kedua mempelai' },
  { label: 'Grand Opening', headline: 'SELAMAT ATAS PEMBUKAAN', desc: 'Pembukaan cabang atau kafe baru' },
  { label: 'Turut Berduka Cita', headline: 'TURUT BERDUKA CITA', desc: 'Belasungkawa keluarga besar' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Rainbow Pastel Blossom Bouquet',
    category: 'Buket Bunga',
    price: 165000,
    stock: 24,
    description: 'Buket bunga warna-warni yang sangat cantik memadukan mawar coral, baby breath ungu pastel, dan hydrangea segar. Dibungkus kertas matte Korea bernuansa estetik.',
    image: UNSPLASH_BOUQUET_IMAGES.rainbowBlossom,
    featured: true,
    flowerTypes: ['Mawar Coral & Pink', 'Baby Breath Lilac', 'Hydrangea Pastel', 'Eucalyptus'],
    dimensions: 'Tinggi 42cm x Lebar 32cm',
    careTips: 'Ganti air vas setiap 2 hari dan potong ujung tangkai miring 45 derajat.',
  },
  {
    id: 'prod-002',
    name: 'Sunburst Colorful Tulip & Daisy Vase',
    category: 'Bunga Meja',
    price: 125000,
    stock: 16,
    description: 'Rangkaian bunga meja penuh warna dalam vas keramik minimalis. Perpaduan tulip kuning cerah, daisy putih, dan ranunculus peach yang menghadirkan keceriaan di ruang tamu.',
    image: UNSPLASH_BOUQUET_IMAGES.colorfulTulips,
    featured: true,
    flowerTypes: ['Tulip Kuning & Coral', 'Chamomile Daisy', 'Ranunculus Peach'],
    dimensions: 'Tinggi 32cm x Diameter 24cm',
    careTips: 'Semprot halus kelopak di pagi hari dan tempatkan di ruangan sejuk ber-AC.',
  },
  {
    id: 'prod-003',
    name: 'Papan Bunga Ucapan "Selamat & Sukses" Premium',
    category: 'Papan Bunga',
    price: 350000,
    stock: 20,
    description: 'Karangan bunga papan elegan ukuran besar untuk ucapan selamat, wisuda, atau peresmian usaha di wilayah Rajabasa dan sekitarnya.',
    image: indonesianPapanBungaImg,
    featured: true,
    flowerTypes: ['Bunga Suyok Segar Khas Indonesia', 'Aster Aneka Warna', 'Krisan Segar', 'Daun Pakis'],
    dimensions: 'Ukuran Besar 200cm x 125cm (Kaki Penyangga Kayu Kokoh)',
    careTips: 'Dirangkai di hari pengiriman dengan busa basah penahan air agar bunga tetap segar selama acara berlangsung.',
  },
  {
    id: 'prod-004',
    name: 'Serene Pastel Lilies & Soft Asters',
    category: 'Bunga Duka Cita',
    price: 175000,
    stock: 10,
    description: 'Rangkaian standing arrangement duka cita bernuansa warna pastel lembut yang menenangkan jiwa. Menghadirkan lily putih harum, lisianthus ungu lembut, dan mawar salju terhormat.',
    image: UNSPLASH_BOUQUET_IMAGES.pastelLilies,
    featured: true,
    flowerTypes: ['Casablanca Lily', 'Lisianthus Ungu Pastel', 'Mawar Putih Murni'],
    dimensions: 'Tinggi 75cm x Lebar 45cm',
    careTips: 'Tambahkan 150ml air ke dasar busa bunga setiap hari.',
  },
  {
    id: 'prod-005',
    name: 'Golden Sunflower & Wildflower Joy',
    category: 'Buket Bunga',
    price: 95000,
    stock: 30,
    description: 'Buket bunga matahari cerah dipadukan dengan bunga liar warna-warni chamomile dan limonium ungu. Hadiah terbaik dengan harga ramah kantong untuk sahabat dan wisuda.',
    image: UNSPLASH_BOUQUET_IMAGES.sunflowerJoy,
    featured: false,
    flowerTypes: ['Bunga Matahari (Sunflower)', 'Chamomile Kuning', 'Limonium Ungu'],
    dimensions: 'Tinggi 38cm x Lebar 28cm',
    careTips: 'Bunga matahari menyukai air bersih dalam jumlah cukup.',
  },
  {
    id: 'prod-006',
    name: 'Spring Radiance Table Centerpiece',
    category: 'Bunga Meja',
    price: 145000,
    stock: 15,
    description: 'Rangkaian bunga meja segar bernuansa musim semi penuh warna merah muda, kuning lembut, dan dedaunan hijau asri. Memberikan aroma segar menenangkan di meja kerja.',
    image: UNSPLASH_BOUQUET_IMAGES.springRadiance,
    featured: false,
    flowerTypes: ['Peony Lembut', 'Spray Rose Kuning', 'Lavender Aromatik'],
    dimensions: 'Tinggi 30cm x Lebar 26cm',
    careTips: 'Letakkan jauh dari hembusan angin langsung agar kelopak tidak cepat layu.',
  },
  {
    id: 'prod-007',
    name: 'Petite Colorful Sweetheart Wrap',
    category: 'Buket Bunga',
    price: 55000,
    stock: 40,
    description: 'Buket mini bujet hemat super manis dengan 3 tangkai mawar segar warna-warni, baby breath fluffy, dan pita sutra satin. Pilihan hemat paling favorit!',
    image: UNSPLASH_BOUQUET_IMAGES.petiteSweetheart,
    featured: false,
    flowerTypes: ['Mawar Merah Muda & Peach', 'Baby Breath Putih', 'Pita Sutra'],
    dimensions: 'Tinggi 28cm x Lebar 18cm',
    careTips: 'Bisa langsung dimasukkan ke vas mini setelah dibuka dari bungkus kertas.',
  },
  {
    id: 'prod-008',
    name: 'Papan Bunga Grand Opening & Wisuda Rajabasa',
    category: 'Papan Bunga',
    price: 350000,
    stock: 15,
    description: 'Karangan bunga papan ucapan gaya Indonesia khas selamat & sukses berhiaskan bunga suyok warna-warni melingkar yang rapi dan megah untuk wilayah Bandar Lampung.',
    image: papanGrandOpeningImg,
    featured: false,
    flowerTypes: ['Bunga Suyok Warna-warni', 'Aster Segar', 'Mawar Merah', 'Krisan'],
    dimensions: 'Ukuran Besar 200cm x 125cm (Double Leg Stand Kayu Kokoh)',
    careTips: 'Disiapkan fresh beberapa jam sebelum dikirimkan ke lokasi acara di Bandar Lampung.',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'BG-20261007-001',
    createdAt: '2026-10-07T09:30:00.000Z',
    customerName: 'Alya Ramadhani',
    customerPhone: '081234567890',
    customerAddress: 'Jl. ZA. Pagar Alam No. 45, Rajabasa, Bandar Lampung',
    deliveryDate: '2026-10-08',
    deliveryTimeSlot: '10:00 - 13:00',
    notes: 'Mohon tiba sebelum jam makan siang di gedung rektorat.',
    paymentMethod: 'QRIS Instant',
    items: [
      {
        id: 'cart-init-1',
        productId: 'prod-001',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        ribbonColor: 'Soft Blush Pink',
        greetingCard: {
          to: 'Dinda Saraswati',
          message: 'Happy 24th Birthday sahabat terbaikku! Semoga selalu mekar dan bahagia di setiap langkah.',
          from: 'Alya Ramadhani',
        },
      },
    ],
    subtotal: 165000,
    shippingFee: 15000,
    total: 180000,
    status: 'Diproses',
  },
  {
    id: 'BG-20261007-002',
    createdAt: '2026-10-07T08:15:00.000Z',
    customerName: 'Budi Santoso (PT Lampung Sinar Abadi)',
    customerPhone: '085712345678',
    customerAddress: 'Jl. Soekarno Hatta No. 102, Rajabasa, Bandar Lampung',
    deliveryDate: '2026-10-07',
    deliveryTimeSlot: '08:30 - 12:00',
    notes: 'Kirim pagi untuk peresmian kantor cabang baru di Rajabasa.',
    paymentMethod: 'Transfer Bank BCA',
    items: [
      {
        id: 'cart-init-2',
        productId: 'prod-003',
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        ribbonColor: 'Gold Satin',
        greetingCard: {
          to: 'PT Solusi Teknologi Lampung',
          message: 'Selamat & Sukses Atas Peresmian Kantor Baru di Rajabasa Bandar Lampung',
          from: 'Direksi & Manajemen PT Lampung Sinar Abadi',
        },
      },
    ],
    subtotal: 350000,
    shippingFee: 0,
    total: 350000,
    status: 'Dikirim',
  },
  {
    id: 'BG-20261006-003',
    createdAt: '2026-10-06T14:20:00.000Z',
    customerName: 'Clara Michelle',
    customerPhone: '081398765432',
    customerAddress: 'Jl. Teuku Umar No. 18, Kedaton, Bandar Lampung',
    deliveryDate: '2026-10-06',
    deliveryTimeSlot: '13:00 - 16:30',
    notes: 'Pita dirapikan ya kak, bunga meja untuk ruang tamu.',
    paymentMethod: 'Transfer Bank Mandiri',
    items: [
      {
        id: 'cart-init-3',
        productId: 'prod-002',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        ribbonColor: 'Sage Green',
        greetingCard: {
          to: 'Mama Tersayang',
          message: 'Terima kasih atas segala cinta dan kehangatan yang tak pernah putus. Love you mom!',
          from: 'Clara & Kevin',
        },
      },
    ],
    subtotal: 125000,
    shippingFee: 15000,
    total: 140000,
    status: 'Selesai',
  },
];
