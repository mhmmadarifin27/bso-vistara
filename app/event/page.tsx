"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Tambahan: Import Link
import { supabase } from "@/utils/supabase";

export default function EventPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tambahan: State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Batas 6 foto per halaman

  useEffect(() => {
    const fetchEvents = async () => {
      // Ambil Event Mendatang
      const { data: upcomingData } = await supabase
        .from('events')
        .select('*')
        .eq('is_upcoming', true)
        .order('date', { ascending: true });
      
      if (upcomingData) setUpcomingEvents(upcomingData);

      // Ambil Arsip Event (Galeri)
      const { data: pastData } = await supabase
        .from('events')
        .select('*')
        .eq('is_upcoming', false)
        .order('date', { ascending: false });
      
      if (pastData) setPastEvents(pastData);
      
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  // Tambahan: Logika Pagination
  const totalPages = Math.ceil(pastEvents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPastEvents = pastEvents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll mulus ke bagian arsip saat ganti halaman
    document.getElementById('dokumentasi')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-900 dark:text-white bg-[#f8f9fa] dark:bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-[#800000]/20 border-t-[#800000] rounded-full animate-spin mb-4"></div>
        <p className="font-bold tracking-widest uppercase text-sm animate-pulse">Menyiapkan Galeri...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 transition-colors duration-500 pt-32 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 animate-fade-in">
          <div className="max-w-2xl relative z-10">
            <h4 className="text-[#800000] font-bold tracking-[0.3em] text-sm uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#800000]"></span>
              Galeri Vistara
            </h4>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-6 tracking-tight">
              Karya & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800000] to-red-600">
                Pergerakan.
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-lg">
              Kumpulan dokumentasi visual dari setiap inisiatif dan kolaborasi yang telah kami jalankan.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="text-8xl font-black text-[#800000]/5 dark:text-white/5 uppercase select-none tracking-tighter">
                GALLERY
             </div>
          </div>
        </div>

        {/* --- UPCOMING EVENT (Jika Ada) --- */}
        {upcomingEvents.length > 0 && (
          <div className="mb-32 animate-slide-in-right relative">
            <div className="absolute -left-6 md:-left-12 top-0 bottom-0 w-2 bg-[#800000]"></div>
            <h3 className="text-2xl font-black uppercase mb-10 pl-6">Mendatang</h3>
            
            <div className="grid grid-cols-1 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="group relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-black">
                  <img src={event.image_url} alt={event.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
                  
                  {/* Overlay Gradient Elegan */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-14 w-full">
                    <span className="bg-[#800000] text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-lg">
                      {event.category || "Segera Hadir"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-white leading-tight drop-shadow-lg">
                      {event.title}
                    </h2>
                    <div className="flex flex-wrap gap-6 text-gray-300 font-bold text-sm tracking-widest uppercase mb-6">
                      <p className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                        📅 {event.date}
                      </p>
                    </div>
                    {/* Tombol Lihat Detail untuk Upcoming */}
                    <Link href={`/event/${event.id}`} className="inline-block bg-white text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#800000] hover:text-white transition-all shadow-xl">
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ARSIP DOKUMENTASI (MASONRY GRID STYLE) --- */}
        <div id="dokumentasi" className="animate-fade-in relative pt-10">
          <h3 className="text-2xl font-black uppercase mb-12 flex items-center gap-4">
            <span className="w-10 h-[2px] bg-[#800000]"></span>
            Arsip Visual
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {currentPastEvents.length === 0 ? (
              <p className="text-gray-500 italic col-span-full text-center py-20">Belum ada dokumentasi tersimpan.</p>
            ) : (
              // Tambahan: Mapping diganti menggunakan currentPastEvents (yg sudah dipotong limit 6)
              currentPastEvents.map((item, index) => {
                // Logika zig-zag: Kolom tengah diturunkan ke bawah sedikit agar asimetris dan keren
                const isMiddleColumn = index % 3 === 1;
                const marginClass = isMiddleColumn ? "lg:mt-16" : "mt-0";

                return (
                  // BUNGKUS DENGAN LINK AGAR BISA DIKLIK KE [id]
                  <Link 
                    href={`/event/${item.id}`} 
                    key={item.id} 
                    className={`group relative block w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-[#111] shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer ${marginClass}`}
                  >
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" 
                    />
                    
                    {/* Glassmorphism Overlay saat di-hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Konten Teks (Muncul dari bawah saat hover) */}
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end">
                      <div className="w-10 h-1 bg-[#800000] mb-4"></div>
                      <h3 className="text-2xl font-black uppercase text-white leading-snug mb-2 drop-shadow-md">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                          {item.date}
                        </p>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff4d4d] bg-[#800000]/20 px-3 py-1 rounded-full backdrop-blur-md">
                          Baca Detail ↗
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* --- PAGINATION UI --- */}
          {totalPages > 1 && (
            <div className="mt-32 flex justify-center items-center gap-2 font-bold text-sm">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 disabled:opacity-30 hover:bg-[#800000] hover:text-white hover:border-[#800000] transition-colors"
              >
                &lt;
              </button>
              
              {/* Generate angka halaman */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === number 
                      ? "bg-[#800000] text-white border-transparent shadow-lg shadow-[#800000]/30" 
                      : "border border-gray-200 dark:border-gray-800 hover:border-[#800000] text-slate-600 dark:text-gray-400"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 disabled:opacity-30 hover:bg-[#800000] hover:text-white hover:border-[#800000] transition-colors"
              >
                &gt;
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}