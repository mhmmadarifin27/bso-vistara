"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fungsi Dark Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Menu dibagi menjadi dua kategori seperti referensi gambar
  const mainMenu = [
    { name: "Dashboard", path: "/admin", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { name: "Struktur BPH", path: "/admin/pengurus", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
    { name: "Event Vistara", path: "/admin/events", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
    { name: "Pesan Masuk", path: "/admin/messages", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
  ];

  return (
    // Background utama menggunakan warna abu-abu kebiruan terang (light) dan hitam pekat (dark)
    <div className="flex h-screen bg-[#f4f7fe] dark:bg-[#050505] md:p-5 font-sans transition-colors duration-500 overflow-hidden">
      
      {/* 1. SIDEBAR FLOATING (Gaya Melayang) */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:relative w-[280px] bg-white dark:bg-[#111] md:rounded-[2rem] shadow-2xl md:shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} flex flex-col overflow-hidden`}>
        
        {/* Header Sidebar: Logo & Nama */}
        <div className="h-28 px-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 p-1.5 shadow-sm">
            <img src="/logo vistara.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-black text-2xl tracking-widest uppercase text-slate-900 dark:text-white leading-none">Vistara</h2>
            <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Admin Panel</p>
          </div>
        </div>

        {/* Menu Navigasi Utama */}
        <div className="px-6 mb-2">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4 ml-2">Menu Utama</p>
          <nav className="space-y-2">
            {mainMenu.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  href={item.path}
                  onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                    isActive 
                      ? "bg-[#800000] text-white shadow-lg shadow-[#800000]/20" 
                      : "text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-[#1a1a1a] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Menu General (Bawah) */}
        <div className="px-6 mt-auto mb-8">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4 ml-2">General</p>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-bold text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-[#1a1a1a] hover:text-slate-900 dark:hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pengaturan
            </button>
            <Link href="/login" className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"></div>
      )}

      {/* 2. AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col md:ml-6 min-w-0 h-full overflow-hidden">
        
        {/* TOPBAR (Tinggi, Luas, dan Modern) */}
        <header className="h-28 md:h-32 px-6 md:px-2 flex items-center justify-between shrink-0">
          
          {/* Kiri: Tombol Mobile & Teks */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2.5 bg-white dark:bg-[#111] text-slate-700 dark:text-gray-300 rounded-xl shadow-sm shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            
            {/* Teks CMS - Diperkecil di Mobile (text-lg) agar tidak bertabrakan */}
            <h1 className="text-lg sm:text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight shrink-0 truncate">
              Vistara <span className="text-[#800000]">Workspace</span>
            </h1>

            {/* Search Bar ala Donezo (Hanya muncul di Desktop) */}
            <div className="hidden lg:flex items-center bg-white dark:bg-[#111] rounded-full px-5 py-3 shadow-sm border border-gray-100 dark:border-gray-800 ml-8 w-80">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder="Search data..." 
                className="bg-transparent border-none focus:outline-none ml-3 text-sm w-full text-slate-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>
          </div>
          
          {/* Kanan: Ikon & Profil Lengkap */}
          <div className="flex items-center gap-2 sm:gap-6 shrink-0">
            
            {/* Tombol Dark Mode (Sekarang muncul di semua device) */}
            <button onClick={toggleTheme} className="p-2 sm:p-3 bg-white dark:bg-[#111] rounded-full shadow-sm border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-[#800000] transition-colors shrink-0">
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Garis Pemisah Vertikal */}
            <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-800"></div>

            {/* Profil Admin Modern (Avatar + Teks) */}
            <div className="flex items-center gap-3 cursor-pointer shrink-0">
              
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 dark:bg-[#1a1a1a] rounded-full overflow-hidden shadow-sm border-2 border-white dark:border-gray-800">
                <img src="logo vistara.png" alt="Admin Avatar" className="w-full h-full object-cover"/>
              </div>
            </div>
            
          </div>
        </header>

        {/* 3. SCROLLABLE PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 md:px-2 pb-10 hide-scrollbar">
          {children}
        </main>

      </div>
    </div>
  );
}