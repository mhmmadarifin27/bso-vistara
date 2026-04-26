"use client";
import { useEffect, useRef } from "react";

export default function DokumentasiSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Data dummy ditambahkan menjadi 8 kegiatan dengan variasi margin yang dipertahankan
  const kegiatan = [
    { title: "Rapat Kerja Tahunan", img: "1551836022-d5d88e9218df", margin: "md:mt-0" },
    { title: "Seminar Nasional", img: "1540575467063-178a50c2df87", margin: "md:mt-12" },
    { title: "Bakti Sosial", img: "1593113598332-cd288d649433", margin: "md:mt-24" },
    { title: "Workshop Inovasi", img: "1517245386807-bb43f82c33c4", margin: "md:mt-6" },
    { title: "Pelatihan Kepemimpinan", img: "1522071820081-009f0129c71c", margin: "md:mt-16" },
    { title: "Diskusi Publik", img: "1531482615713-2afd69097998", margin: "md:mt-2" },
    { title: "Kunjungan Desa", img: "1500648767791-00dcc994a43e", margin: "md:mt-20" },
    { title: "Kemitraan Strategis", img: "1552664730-d307ca884978", margin: "md:mt-10" }
  ];

  // Logika Auto-Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      // Cek apakah scroll sudah mentok di kanan
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        // Jika mentok, kembali ke kiri
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Geser sejauh ukuran 1 card
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3000); // Otomatis geser setiap 3 detik

    return () => clearInterval(scrollInterval);
  }, []);

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
      
      {/* Container Carousel: Diubah dari grid menjadi flex untuk mengakomodasi scroll horizontal */}
      {/* pb-32 ditambahkan agar margin top (md:mt-24) tidak terpotong di bagian bawah */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-32 snap-x snap-mandatory hide-scrollbar items-start"
      >
        {kegiatan.map((item, index) => (
          <div 
            key={index} 
            className={`relative flex-shrink-0 w-[280px] md:w-[320px] aspect-[3/4] overflow-hidden group cursor-pointer snap-center ${item.margin} border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500`}
          >
            <img 
              src={`https://images.unsplash.com/photo-${item.img}?auto=format&fit=crop&w=600&q=80`} 
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
        ))}
      </div>
      
    </section>
  );
}