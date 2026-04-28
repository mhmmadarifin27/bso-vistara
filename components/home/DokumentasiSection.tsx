"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabase"; // Pastikan path ini sesuai dengan letak file supabase.ts kamu

export default function DokumentasiSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [kegiatan, setKegiatan] = useState<any[]>([]);

  // 1. Mengambil data dari Supabase
  useEffect(() => {
    const fetchDokumentasi = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_upcoming', false) // Hanya ambil event yang sudah selesai (Arsip)
        .order('date', { ascending: false })
        .limit(8); // Ambil maksimal 8 kegiatan terbaru

      if (data) setKegiatan(data);
      if (error) console.error("Gagal load dokumentasi:", error);
    };

    fetchDokumentasi();
  }, []);

  // 2. Logika Auto-Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || kegiatan.length === 0) return;

    const scrollInterval = setInterval(() => {
      // Cek apakah scroll sudah mentok di kanan
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        // Jika mentok, kembali ke kiri dengan mulus
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Geser sejauh ukuran 1 card
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3000); // Otomatis geser setiap 3 detik

    return () => clearInterval(scrollInterval);
  }, [kegiatan]); // Dijalankan setelah data kegiatan terisi

  // Pola margin zigzag agar desainnya tidak kaku/rata
  const marginPatterns = ["md:mt-0", "md:mt-12", "md:mt-24", "md:mt-6", "md:mt-16", "md:mt-2", "md:mt-20", "md:mt-10"];

  return (
    <section id="dokumentasi" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight border-l-4 border-[#800000] pl-4 text-slate-900 dark:text-white">
            Dokumentasi<br/>Kegiatan
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mt-4 max-w-lg">
            Jejak langkah nyata kami di lapangan, menciptakan dampak yang terukur.
          </p>
        </div>
        
        {/* Indikator Geser (Tampil di Mobile) */}
        <div className="md:hidden flex items-center gap-2 text-slate-400 text-sm font-bold tracking-widest uppercase">
          Geser <svg className="w-4 h-4 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>
      </div>
      
      {/* Container Carousel */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-32 snap-x snap-mandatory hide-scrollbar items-start"
      >
        {kegiatan.length === 0 ? (
          <div className="w-full py-10 flex justify-center">
            <p className="text-gray-500 italic animate-pulse">Memuat dokumentasi kegiatan...</p>
          </div>
        ) : (
          kegiatan.map((item, index) => {
            // Mengambil margin dari array pola secara berulang
            const marginClass = marginPatterns[index % marginPatterns.length];
            
            return (
              <div 
                key={item.id} 
                className={`relative flex-shrink-0 w-[280px] md:w-[320px] aspect-[3/4] overflow-hidden group cursor-pointer snap-center ${marginClass} border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                <img 
                  src={item.image_url} // URL gambar langsung diambil dari Supabase
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 w-full">
                  <div className="w-8 h-1 bg-[#800000] mb-3"></div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-snug">{item.title}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
      
    </section>
  );
}