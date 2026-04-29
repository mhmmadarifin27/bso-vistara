"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Logika untuk menyembunyikan Footer di halaman login dan admin
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
    return null;
  }
  
  return (
    <footer className="relative w-full overflow-hidden bg-[#050505] text-white pt-24 pb-12 border-t-4 border-[#800000]">
      
      {/* 1. Background Image Asli Vistara dengan Overlay Cinematic */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/footer-bg.png" // Menggunakan gambar gapura asli yang baru
          alt="Vistara Background" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom" // object-cover memastikan pas di semua ukuran
        />
        {/* Overlay gradien kompleks agar teks tetap tajam dan terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#0a0a0a]"></div>
      </div>

      {/* 2. Konten Footer Utama */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 mb-20">
          
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              {/* Logo Dummy V (Saran: Ganti pake logo asli /logo.png klo udh ada di public) */}
              <div className="bg-[#800000] text-white font-bold p-3 rounded-xl text-3xl shadow-xl">V</div>
              <div>
                <h3 className="font-black text-3xl tracking-[0.2em] uppercase">VISTARA</h3>
                <p className="text-[#ff4d4d] text-xs font-bold tracking-[0.3em] uppercase">Lembaga Pergerakan</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base font-medium">
              Lembaga yang berdedikasi melahirkan generasi pemimpin masa depan yang inovatif, beradab, dan berwawasan global melalui kolaborasi strategis.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-2">
              <a href="#" className="p-3 border border-white/20 rounded-xl hover:bg-[#800000] hover:border-[#800000] transition-all duration-300 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="p-3 border border-white/20 rounded-xl hover:bg-[#800000] hover:border-[#800000] transition-all duration-300 group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h4 className="text-[#ff4d4d] font-bold tracking-[0.3em] text-xs uppercase mb-8">Eksplorasi</h4>
            <ul className="space-y-5">
              {[
                { name: "Beranda", path: "/" },
                { name: "Tentang Kami", path: "/tentang-kami" },
                { name: "Agenda Kegiatan", path: "/#dokumentasi" },
                { name: "Hubungi PR", path: "/contact" },
                { name: "Gabung Anggota", path: "/#gabung" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.path} className="flex items-center gap-3 text-gray-300 hover:text-white transition-all group">
                    <svg className="w-5 h-5 text-[#800000] group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium text-base">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami (Cinematic Cards) */}
          <div>
            <h4 className="text-[#ff4d4d] font-bold tracking-[0.3em] text-xs uppercase mb-8">Pintu Kolaborasi</h4>
            <div className="space-y-5">
              
              {/* Card Telepon */}
              <div className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="p-3 bg-[#800000]/20 rounded-xl border border-[#800000]/30 shadow-inner">
                  <svg className="w-7 h-7 text-[#ff4d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold tracking-[0.2em] uppercase mb-1">Telepon (WA)</p>
                  <p className="font-black text-xl text-white tracking-tight">+62 812-3456-7890</p>
                </div>
              </div>

              {/* Card Email */}
              <div className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="p-3 bg-[#800000]/20 rounded-xl border border-[#800000]/30 shadow-inner">
                  <svg className="w-7 h-7 text-[#ff4d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold tracking-[0.2em] uppercase mb-1">Email Resmi</p>
                  <p className="font-black text-xl text-white tracking-tight">admin@vistara.org</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3. Bottom Bar / Copyright */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase">
            © 2026 VISTARA. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-400 text-xs font-bold tracking-widest">
            <span>Privasi</span>
            <span className="w-1.5 h-1.5 bg-[#800000] rounded-full"></span>
            <span>Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    
  </footer>
  );
}