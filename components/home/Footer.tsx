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
    <footer className="relative w-full overflow-hidden bg-[#050505] text-white pt-20 pb-8 border-t-4 border-[#800000]">
      
      {/* 1. Background Image Dummy dengan Overlay Gelap */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop" 
          alt="Vistara Background" 
          className="w-full h-full object-cover opacity-30"
        />
        {/* Overlay gradien agar teks tetap terbaca tajam */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/80"></div>
      </div>

      {/* 2. Konten Footer Utama */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
          
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#800000] text-white font-bold p-2 rounded-lg text-2xl shadow-lg">V</div>
              <div>
                <h3 className="font-black text-2xl tracking-[0.2em] uppercase">VISTARA</h3>
                <p className="text-[#ff4d4d] text-xs font-bold tracking-widest uppercase">Organisasi Pergerakan</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Lembaga yang berdedikasi melahirkan generasi pemimpin masa depan yang inovatif, beradab, dan berwawasan global melalui kolaborasi strategis.
            </p>
            
            {/* Social Media Icons (Gaya Kotak Outline) */}
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
            <h4 className="text-[#ff4d4d] font-bold tracking-[0.2em] text-sm uppercase mb-6">Tautan Cepat</h4>
            <ul className="space-y-4">
              {[
                { name: "Beranda", path: "/" },
                { name: "Tentang Kami", path: "/tentang-kami" },
                { name: "Program Kerja", path: "#" },
                { name: "Dokumentasi", path: "/#dokumentasi" },
                { name: "Kemitraan", path: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.path} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                    <svg className="w-4 h-4 text-[#800000] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami (Glassmorphism Cards) */}
          <div>
            <h4 className="text-[#ff4d4d] font-bold tracking-[0.2em] text-sm uppercase mb-6">Hubungi Kami</h4>
            <div className="space-y-4">
              
              {/* Card Telepon */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="p-3 bg-[#800000]/20 rounded-xl border border-[#800000]/30">
                  <svg className="w-6 h-6 text-[#ff4d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Telepon</p>
                  <p className="font-bold text-lg">+62 812-3456-7890</p>
                </div>
              </div>

              {/* Card Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="p-3 bg-[#800000]/20 rounded-xl border border-[#800000]/30">
                  <svg className="w-6 h-6 text-[#ff4d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Email</p>
                  <p className="font-bold text-lg">info@vistara.org</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3. Bottom Bar / Copyright */}
        <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            © 2026 VISTARA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}