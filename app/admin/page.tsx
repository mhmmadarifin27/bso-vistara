import Link from "next/link";

export default function AdminDashboard() {
  // Data stat dummy
  const stats = [
    { title: "Total BPH & Divisi", value: "14", icon: "👥", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { title: "Dokumentasi Event", value: "24", icon: "📸", color: "text-[#800000]", bg: "bg-[#800000]/10", border: "border-[#800000]/20" },
    { title: "Program Prioritas", value: "3", icon: "🎯", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { title: "Pesan Kemitraan", value: "8", icon: "✉️", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-gray-400 mt-2 text-sm md:text-base">Selamat datang di Pusat Kendali Konten Vistara. Pantau dan kelola data publikasi organisasi Anda di sini.</p>
        </div>
        <Link href="/" target="_blank" className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
          Lihat Website Publik ↗
        </Link>
      </div>

      {/* STATISTIK KARTU */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white dark:bg-[#111] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-900 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
            {/* Glow effect di pojok */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${stat.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl border ${stat.border}`}>
                {stat.icon}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</p>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* GRID KONTEN BAWAH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI (Aktivitas Terakhir - Makan 2 Kolom) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-900 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-900 pb-4">
            <h3 className="text-xl font-black uppercase flex items-center gap-3 text-slate-900 dark:text-white">
              <span className="w-2 h-2 bg-[#800000] rounded-full animate-pulse"></span>
              Log Aktivitas Terakhir
            </h3>
            <button className="text-xs font-bold text-[#800000] uppercase tracking-widest hover:underline">Lihat Semua</button>
          </div>
          
          <ul className="space-y-6">
            <li className="flex gap-4 items-start group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">📸</div>
              <div>
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">Dokumentasi "Vistara Summit" berhasil dipublikasikan.</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Oleh Admin PR • 2 jam yang lalu</p>
              </div>
            </li>
            <li className="flex gap-4 items-start group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">✉️</div>
              <div>
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">Pesan Kemitraan masuk dari Universitas Sriwijaya.</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Media Partner • 5 jam yang lalu</p>
              </div>
            </li>
            <li className="flex gap-4 items-start group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">👥</div>
              <div>
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">Data Pengurus "Divisi Kreatif" diperbarui.</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Oleh Admin Utama • Kemarin, 14:30 WIB</p>
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
               <Link href="/admin/events" className="inline-block bg-white text-[#800000] px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg">
                 Tambah Event Baru →
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
                <span className="text-sm text-slate-500 font-medium">Storage Used</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">14.5 MB / 1 GB</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-full h-2 mt-2">
                <div className="bg-[#800000] h-2 rounded-full w-[1.5%]"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}