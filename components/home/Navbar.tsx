"use client";
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Ref untuk mendeteksi klik di luar menu mobile
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Cek preferensi sistem atau local storage (bisa ditambahkan logika khusus di sini)
  }, []);

  // Efek untuk menutup mobile menu saat klik di luar area navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    // Tambahkan event listener saat komponen dipasang
    document.addEventListener("mousedown", handleClickOutside);
    
    // Bersihkan event listener saat komponen dilepas
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  if (!mounted) return null;

  return (
    <nav 
      ref={menuRef} 
      className="fixed top-0 w-full z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        
       {/* Logo */}
        <Link href="/login" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
          <img 
            src="/logo vistara.png" 
            alt="Logo Vistara" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          <span className="font-extrabold text-2xl tracking-[0.2em] text-[#800000] dark:text-white">
            VISTARA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-bold text-xs tracking-widest uppercase">
          <Link href="/" className={`hover:text-[#800000] dark:hover:text-[#ff4d4d] transition-colors ${pathname === '/' ? 'text-[#800000] dark:text-[#ff4d4d]' : 'text-slate-900 dark:text-gray-100'}`}>Beranda</Link>
          <Link href="/tentang-kami" className={`hover:text-[#800000] dark:hover:text-[#ff4d4d] transition-colors ${pathname === '/tentang-kami' ? 'text-[#800000] dark:text-[#ff4d4d]' : 'text-slate-900 dark:text-gray-100'}`}>Tentang Kami</Link>
          <Link href="/event" className={`hover:text-[#800000] dark:hover:text-[#ff4d4d] transition-colors ${pathname === '/event' ? 'text-[#800000] dark:text-[#ff4d4d]' : 'text-slate-900 dark:text-gray-100'}`}>Event</Link>
          <Link href="/contact" className={`hover:text-[#800000] dark:hover:text-[#ff4d4d] transition-colors ${pathname === '/contact' ? 'text-[#800000] dark:text-[#ff4d4d]' : 'text-slate-900 dark:text-gray-100'}`}>Contact</Link>
          
          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="ml-4 p-2 rounded-full bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 transition-all text-sm">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-xl">{isDarkMode ? '☀️' : '🌙'}</button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-slate-900 dark:text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div 
        className={`md:hidden absolute w-full bg-white dark:bg-[#0a0a0a] shadow-xl border-b border-gray-100 dark:border-gray-900 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 font-bold text-sm tracking-widest uppercase">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`py-2 ${pathname === '/' ? 'text-[#800000] dark:text-[#ff4d4d]' : 'text-slate-900 dark:text-gray-100'}`}>Beranda</Link>
          <Link href="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className={`py-2 ${pathname === '/tentang-kami' ? 'text-[#800000] dark:text-[#ff4d4d]' : 'text-slate-900 dark:text-gray-100'}`}>Tentang Kami</Link>
          <Link href="/event" onClick={() => setIsMobileMenuOpen(false)} className={`py-2 ${pathname === '/event' ? 'text-[#800000] dark:text-[#ff4d4d]' : 'text-slate-900 dark:text-gray-100'}`}>Event</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`py-2 ${pathname === '/contact' ? 'text-[#800000] dark:text-[#ff4d4d]' : 'text-slate-900 dark:text-gray-100'}`}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}