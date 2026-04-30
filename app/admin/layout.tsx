"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fungsi Dark Mode khusus Admin Panel
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Cek tema saat pertama kali load
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
    // Auto-close sidebar di layar kecil
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const menuItems = [
    { name: "Dashboard Overview", path: "/admin", icon: "📊" },
    { name: "Struktur BPH", path: "/admin/pengurus", icon: "👥" },
    { name: "Event & Dokumentasi", path: "/admin/events", icon: "📸" },
    { name: "Program Prioritas", path: "/admin/programs", icon: "🎯" },
    { name: "Pesan Kemitraan", path: "/admin/messages", icon: "✉️" },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 overflow-hidden font-sans transition-colors duration-500">
      
      {/* SIDEBAR */}
      <aside className={`fixed md:relative z-50 h-full w-72 bg-white dark:bg-[#111] border-r border-gray-200 dark:border-gray-900 flex flex-col shadow-2xl transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#800000] text-white font-bold p-2 rounded-lg text-xl">V</div>
            <div>
              <h2 className="font-black text-xl tracking-widest uppercase text-slate-900 dark:text-white">Vistara</h2>
              <p className="text-[#800000] text-[10px] font-bold tracking-widest uppercase">Admin Panel</p>
            </div>
          </div>
          {/* Tombol tutup sidebar (hanya muncul di Mobile) */}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-[#800000]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto hide-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)} // Tutup menu saat diklik di HP
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold tracking-wider transition-all ${
                  isActive 
                    ? "bg-[#800000] text-white shadow-lg shadow-[#800000]/20" 
                    : "text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-[#1a1a1a] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-gray-900">
          <Link href="/login" className="flex items-center justify-center gap-3 w-full bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-red-100 dark:hover:bg-red-900/20 transition-all">
            <span className="text-lg">🚪</span>
            Logout
          </Link>
        </div>
      </aside>

      {/* OVERLAY UNTUK MOBILE (Klik di luar sidebar untuk menutup) */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"></div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        
        {/* TOPBAR */}
        <header className="h-20 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-900 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30 transition-colors duration-500">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="font-black text-lg hidden sm:block tracking-wide">CMS Workspace</h1>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Tombol Dark Mode */}
            <button onClick={toggleTheme} className="p-3 rounded-xl bg-slate-100 dark:bg-[#111] hover:bg-slate-200 dark:hover:bg-[#1a1a1a] transition-all text-sm border border-transparent dark:border-gray-800">
              {isDarkMode ? '☀️ Mode Siang' : '🌙 Mode Malam'}
            </button>

            {/* Profil Admin */}
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200 dark:border-gray-800">
              <div className="text-right hidden md:block">
                <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Admin Vistara</p>
              </div>
              <div className="w-10 h-10 bg-slate-0 dark:bg-[#111] rounded-full overflow-hidden ">
                <img src="logo vistara.png" alt="Admin" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        </header>

        {/* ISI HALAMAN (PAGES) */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}