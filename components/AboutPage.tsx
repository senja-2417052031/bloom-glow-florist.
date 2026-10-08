import React from 'react';
import { Award, BookOpen, Heart, Sparkles, Code2, Database, ShieldCheck, MapPin, Mail, Phone } from 'lucide-react';
import { ASSET_IMAGES } from '../data/initialData';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#FAF8F5] min-h-[90vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Story Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#6B8767] block mb-2">
            Tentang Bloom & Glow Florist
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E2621]">
            Menyampaikan Cerita & Ketulusan Lewat Kuntum Bunga
          </h1>
          <p className="text-sm sm:text-base text-[#556E51] mt-3 leading-relaxed">
            Bloom & Glow Florist didirikan atas kecintaan terhadap seni tata flora botani dan kekuatan bunga dalam mengukir memori berharga. Kami percaya bahwa setiap buket, papan ucapan, maupun krans belasungkawa adalah bahasa kasih yang abadi.
          </p>
        </div>

        {/* Studio Atelier Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="rounded-2xl overflow-hidden border border-[#E6EAE5] shadow-md aspect-[4/3] bg-white">
            <img
              src={ASSET_IMAGES.hero}
              alt="Florist workshop studio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#556E51]">
            <h2 className="font-display text-2xl font-semibold text-[#1E2621]">
              Filosofi Kesegaran & Ketelitian Rangkaian
            </h2>
            <p className="leading-relaxed">
              Kami bekerja sama langsung dengan perkebunan bunga dataran tinggi di Indonesia untuk memastikan kelopak bunga yang tiba di studio kami dipetik dalam kemekaran optimal.
            </p>
            <p className="leading-relaxed">
              Setiap pemesanan dikerjakan secara eksklusif oleh floral artisan tersertifikasi. Pelanggan dapat memilih warna pita sutra premium serta menyematkan pesan kartu ucapan bertuliskan tangan yang hangat.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-[#E6EAE5]">
                <span className="font-display text-lg font-bold text-[#1E2621]">100% Segar</span>
                <p className="text-[11px] text-[#556E51] mt-0.5">Bunga harian terpilih tanpa pengawet berbahaya</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#E6EAE5]">
                <span className="font-display text-lg font-bold text-[#1E2621]">Sameday Delivery</span>
                <p className="text-[11px] text-[#556E51] mt-0.5">Pengiriman aman dengan armada kurir khusus florist</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Profile & Developer Identity Card (Mandatory Requirement) */}
        <div className="bg-white rounded-2xl border-2 border-[#6B8767]/30 p-6 sm:p-10 shadow-sm mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6EAE5]/50 rounded-full blur-2xl -z-0" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6EAE5]">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#6B8767] block mb-1">
                  Identitas Pengembang & Studi Kasus Akademik
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1E2621]">
                  Dibuat oleh Mahasiswa Program Studi Sistem Informasi, Jurusan Ilmu Komputer
                </h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#E6EAE5] text-[#445841] flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2C382A]">
                  <Database className="w-4 h-4 text-[#6B8767]" />
                  <span>Studi Kasus Bisnis Florist</span>
                </div>
                <p className="text-xs text-[#556E51] leading-relaxed">
                  Proyek aplikasi e-commerce dan sistem manajemen terintegrasi untuk mendigitalkan proses pemesanan, kustomisasi produk (pita & kartu ucapan), serta monitoring rantai pasok bunga potong segar.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2C382A]">
                  <Code2 className="w-4 h-4 text-[#6B8767]" />
                  <span>Arsitektur & Komponen</span>
                </div>
                <p className="text-xs text-[#556E51] leading-relaxed">
                  Dibangun dengan React, TypeScript, dan Tailwind CSS. Menerapkan pemisahan tugas bersih antara Modul Pelanggan (B2C Frontstore) dan Modul Admin Pengelola Toko (B2B Backoffice CRUD).
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2C382A]">
                  <ShieldCheck className="w-4 h-4 text-[#6B8767]" />
                  <span>Interaktivitas & Data Real-Time</span>
                </div>
                <p className="text-xs text-[#556E51] leading-relaxed">
                  Fitur pencarian terfilter, stepper pelacakan pesanan, formulir kustomisasi kartu ucapan, dan sinkronisasi stok lokal yang persistif melalui browser storage.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E6EAE5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#556E51]">
              <span className="font-medium text-[#2C382A]">
                Fakultas Matematika dan Ilmu Pengetahuan Alam / Ilmu Komputer
              </span>
              <span className="font-mono text-[#6B8767] bg-[#E6EAE5] px-2.5 py-1 rounded">
                Semester Proyek Sistem Informasi
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Store Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#556E51]">
          <div className="bg-white p-5 rounded-xl border border-[#E6EAE5]">
            <div className="flex items-center gap-2 font-semibold text-[#1E2621] mb-2">
              <MapPin className="w-4 h-4 text-[#6B8767]" />
              <span>Lokasi Atelier Studio</span>
            </div>
            <p>Jl. ZA. Pagar Alam No. 88, Rajabasa, Kota Bandar Lampung, Lampung</p>
            <p className="mt-1 text-[11px] text-[#88A284]">Melayani pengiriman ke seluruh wilayah Bandar Lampung dan sekitarnya</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E6EAE5]">
            <div className="flex items-center gap-2 font-semibold text-[#1E2621] mb-2">
              <Phone className="w-4 h-4 text-[#6B8767]" />
              <span>Kontak & WhatsApp</span>
            </div>
            <p className="font-mono text-[#1E2621]">+62 812-3456-7890</p>
            <p className="mt-1 text-[11px] text-[#88A284]">Layanan konsultasi florist 24/7</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E6EAE5]">
            <div className="flex items-center gap-2 font-semibold text-[#1E2621] mb-2">
              <Mail className="w-4 h-4 text-[#6B8767]" />
              <span>Email & Kolaborasi</span>
            </div>
            <p className="font-mono text-[#1E2621]">hello@bloomandglowflorist.id</p>
            <p className="mt-1 text-[11px] text-[#88A284]">Kerja sama event, wedding, & corporate</p>
          </div>
        </div>

      </div>
    </div>
  );
};
