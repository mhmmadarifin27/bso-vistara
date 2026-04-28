"use client";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cek preferensi sistem atau local storage jika diperlukan
  }, []);

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
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        
        {/* Logo - Diubah ke /login sebagai jalur rahasia Admin */}
        <Link href="/login" className="flex items-center gap-3 group">
          <div className="bg-[#800000] text-white font-bold p-2 rounded-sm text-xl tracking-wider group-hover:scale-105 transition-transform duration-300">V</div>
          <span className="font-extrabold text-2xl tracking-[0.2em] text-slate-900 dark:text-white">VISTARA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-bold text-xs tracking-widest uppercase">
          <Link href="/" className="text-slate-900 dark:text-gray-100 hover:text-[#800000] dark:hover:text-[#ff4d4d] transition-colors">Beranda</Link>
          <Link href="tentang-kami" className="text-slate-900 dark:text-gray-100 hover:text-[#800000] dark:hover:text-[#ff4d4d] transition-colors">Tentang Kami</Link>
          <Link href="event" className="text-slate-900 dark:text-gray-100 hover:text-[#800000] dark:hover:text-[#ff4d4d] transition-colors">Event</Link>
          <Link href="contact" className="text-slate-900 dark:text-gray-100 hover:text-[#800000] dark:hover:text-[#ff4d4d] transition-colors">Contact</Link>
          
          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="ml-4 p-2 rounded-full bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 transition-all text-sm">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-xl">{isDarkMode ? '☀️' : '🌙'}</button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900 dark:text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4 font-bold text-sm tracking-widest uppercase shadow-xl border-b border-gray-100 dark:border-gray-900">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
          <Link href="tentang-kami" onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</Link>
          <Link href="event" onClick={() => setIsMobileMenuOpen(false)}>Event</Link>
          <Link href="contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}