"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
    return null;
  }
  
  return (
    <footer className="relative w-full overflow-hidden bg-[#800000] dark:bg-[#050505] text-white pt-20 pb-8 border-t-4 border-[#ff4d4d] dark:border-[#800000] transition-colors duration-500">
      
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/1777515100219.png" 
          alt="Vistara Background" 
          className="absolute bottom-0 w-full h-auto md:h-full object-contain md:object-cover object-bottom opacity-40 dark:opacity-50 transition-opacity duration-500" 
        />
        {/* Gradasi yang menyesuaikan mode (Maroon ke transparan di light, Hitam ke transparan di dark) */}
        <div className="absolute inset-0 bg-gradient from-[#800000]/10 via-[#800000]/60 to-[#800000] dark:from-[#050505]/90 dark:via-[#050505]/40 dark:to-[#050505] transition-colors duration-500"></div>
      </div>

      {/* 2. Konten Utama */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Social Media */}
        <div className="flex gap-4 mb-8">
          <a href="https://www.instagram.com/vistara.fst" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/20 dark:bg-white/10 hover:bg-[#ff4d4d] dark:hover:bg-[#800000] transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>

        {/* Logo & Judul */}
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6 mb-8">
          <div className="w-16 h-16 bg-white/20 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/30 dark:border-white/20 p-2 shadow-2xl flex items-center justify-center">
            <img src="/logo vistara.png" alt="Logo Vistara" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-black text-2xl md:text-3xl tracking-[0.1em] uppercase leading-none mb-1 text-white">VISTARA</h3>
            <p className="text-[#ffb3b3] dark:text-[#ff4d4d] text-xs font-bold tracking-[0.2em] uppercase">Lembaga Pergerakan</p>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="flex items-center gap-2 text-white/90 dark:text-gray-300 font-medium text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
           <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#ffb3b3] dark:text-[#ff4d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
           <p>
             Fakultas Sains dan Teknologi, UIN Raden Fatah<br className="hidden md:block" />
             Palembang, Sumatera Selatan, Indonesia.
           </p>
        </div>

        {/* Kontak */}
        <div className="text-white/90 dark:text-gray-300 text-sm md:text-base font-medium flex flex-col md:flex-row gap-2 md:gap-4 items-center mb-16 md:mb-24">
          <span>E: admin@vistara.org</span>
          <span className="hidden md:inline text-white/50 dark:text-gray-500">|</span>
          <span>WA: +62 812-3456-7890</span>
        </div>

      </div>

      {/* 3. Bottom Bar / Copyright */}
      <div className="relative z-10 pt-6 mt-10 border-t border-white/20 dark:border-white/10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] md:text-xs font-bold tracking-widest text-white/70 dark:text-gray-500 uppercase text-center md:text-left">
          © 2026 VISTARA. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4 text-white/80 dark:text-gray-400 text-[10px] md:text-xs font-bold tracking-widest uppercase">
          <span className="hover:text-white cursor-pointer transition-colors">Privasi</span>
          <span className="w-1 h-1 bg-[#ffb3b3] dark:bg-[#800000] rounded-full"></span>
          <span className="hover:text-white cursor-pointer transition-colors">Syarat Ketentuan</span>
        </div>
      </div>
      
    </footer>
  );
}