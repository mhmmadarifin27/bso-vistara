"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/utils/supabase";

export default function AdminDashboard() {
  // Referensi untuk auto-scroll kartu statistik di mobile
  const statsScrollRef = useRef<HTMLDivElement>(null);

  // State untuk menyimpan jumlah data asli dari Supabase
  const [totalPengurus, setTotalPengurus] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  
  // State untuk menyimpan data event terbaru
  const [latestEvent, setLatestEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data dari Supabase saat halaman dimuat
  useEffect(() => {
    const fetchStats = async () => {
      // 1. Hitung total anggota pengurus
      const { count: pengurusCount } = await supabase
        .from('pengurus_members')
        .select('*', { count: 'exact', head: true });
      
      // 2. Hitung total event/dokumentasi & Ambil 1 Event Terbaru
      const { count: eventsCount } = await supabase
        .from('events') // Sesuaikan jika nama tabelmu beda
        .select('*', { count: 'exact', head: true });

      // DI SINI PERBAIKANNYA: Ganti created_at jadi date
      const { data: latestEventData, error: eventError } = await supabase
        .from('events')
        .select('title, date') // Menggunakan kolom 'date' sesuai tabel Supabase-mu
        .order('date', { ascending: false }) // Urutkan berdasarkan date
        .limit(1);

      if (eventError) {
        console.error("Gagal mengambil event terbaru:", eventError);
      }

      // 3. Update state
      setTotalPengurus(pengurusCount || 0);
      setTotalEvents(eventsCount || 0);
      setTotalMessages(0); // Dummy sementara
      
      if (latestEventData && latestEventData.length > 0) {
        setLatestEvent(latestEventData[0]);
      }
      
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  // Logika Auto-Scroll khusus untuk Mobile
  useEffect(() => {
    const container = statsScrollRef.current;
    // Cek jika container belum ada, masih loading, atau jika di layar desktop (grid)
    if (!container || isLoading || window.innerWidth >= 768) return;

    const scrollInterval = setInterval(() => {
      // Jika sudah mentok kanan, kembali ke kiri
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Geser ke kanan seukuran 1 kartu (sekitar 260px)
        container.scrollBy({ left: 260, behavior: "smooth" });
      }
    }, 3000); // Geser tiap 3 detik

    return () => clearInterval(scrollInterval);
  }, [isLoading]);

  // Data Statistik Terhubung dengan State
  const stats = [
    { title: "Total Pengurus", value: isLoading ? "-" : totalPengurus.toString(), icon: "👥", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { title: "Dokumentasi Event", value: isLoading ? "-" : totalEvents.toString(), icon: "📸", color: "text-[#800000]", bg: "bg-[#800000]/10", border: "border-[#800000]/20" },
    { title: "Pesan Kemitraan", value: isLoading ? "-" : totalMessages.toString(), icon: "✉️", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-gray-400 mt-2 text-sm md:text-base">Selamat datang di Pusat Kendali Konten Vistara. Pantau dan kelola data publikasi organisasi Anda di sini.</p>
        </div>
        <Link href="/" target="_blank" className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shrink-0">
          Lihat Website ↗
        </Link>
      </div>

      {/* STATISTIK KARTU (Horizontal Auto-Scroll di Mobile, Grid di Desktop) */}
      <div 
        ref={statsScrollRef}
        className="flex md:grid md:grid-cols-3 gap-6 mb-12 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {stats.map((stat, i) => (
          <div key={i} className="min-w-[260px] md:min-w-0 bg-white dark:bg-[#111] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-900 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group snap-center shrink-0">
            {/* Glow effect di pojok */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${stat.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl border ${stat.border}`}>
                {stat.icon}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                {stat.value}
              </p>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* GRID KONTEN BAWAH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI (Aktivitas Terakhir) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-900 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-900 pb-4">
            <h3 className="text-xl font-black uppercase flex items-center gap-3 text-slate-900 dark:text-white">
              <span className="w-2 h-2 bg-[#800000] rounded-full animate-pulse"></span>
              Log Aktivitas Terakhir
            </h3>
          </div>
          
          <ul className="space-y-6">
            {/* Log Dinamis: Event Terbaru (Dengan Fallback Placeholder) */}
            {latestEvent ? (
              <li className="flex gap-4 items-start group animate-fade-in">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">
                  🎉
                </div>
                <div>
                  <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                    Event baru: <span className="text-[#800000] dark:text-[#ff4d4d]">"{latestEvent.title}"</span> berhasil ditambahkan.
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Event tanggal: {new Date(latestEvent.date).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </li>
            ) : (
              <li className="flex gap-4 items-start group animate-fade-in opacity-70">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg shadow-sm">
                  ⏳
                </div>
                <div>
                  <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                    Belum ada publikasi Event baru.
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Data event • Menunggu input pertama
                  </p>
                </div>
              </li>
            )}

            {/* Log Dinamis: Pengurus */}
            <li className="flex gap-4 items-start group">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">👥</div>
              <div>
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">Ada {totalPengurus} data pengurus yang saat ini aktif di Landing Page.</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Status Sinkronisasi • Real-time</p>
              </div>
            </li>

            {/* Log Statis: Sistem */}
            <li className="flex gap-4 items-start group">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">✅</div>
              <div>
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">Sistem CMS berhasil terhubung ke Supabase.</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Sistem • Hari Ini</p>
              </div>
            </li>
          </ul>
        </div>

        {/* KOLOM KANAN (Info Sistem & Shortcut) */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Banner Shortcut Supabase */}
          <div className="bg-[#800000] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-[#800000]/30 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <span className="text-9xl font-black">⚙️</span>
             </div>
             <div className="relative z-10">
               <h3 className="text-xl font-black uppercase mb-3">Database Aktif</h3>
               <p className="text-white/80 text-sm leading-relaxed mb-8">
                 Sistem CMS ini telah terhubung dengan infrastruktur Supabase. Perubahan data akan langsung tayang di Landing Page secara real-time.
               </p>
               <Link href="/admin/pengurus" className="inline-block bg-white text-[#800000] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg">
                 Kelola Pengurus →
               </Link>
             </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-900 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <h3 className="text-sm font-bold text-[#800000] uppercase tracking-widest mb-4">Informasi Server</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Status API</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 font-medium">Auto-Sync</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}