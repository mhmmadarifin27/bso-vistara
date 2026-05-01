"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/utils/supabase";

// 1. Komponen Khusus untuk Frame Divisi (Animasi Bergantian)
const AnimatedDivisiCard = ({ 
  divisiName, 
  images, 
  roles, 
  names 
}: { 
  divisiName: string, 
  images: string[], 
  roles: string[], 
  names: string[] 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-ganti foto setiap 3 detik
  useEffect(() => {
    // Hindari error kalau data kosong
    if (!images || images.length === 0) return; 
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images?.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-72 h-96 flex-shrink-0 rounded-[2rem] overflow-hidden group shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111]">
      {/* Layer Gambar */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${divisiName} - ${names[index]}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      
      {/* Overlay Gradient Hitam */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20"></div>

      {/* Konten Teks */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white z-30">
        <div className="bg-[#800000] text-[10px] font-bold px-3 py-1 inline-block rounded-full mb-3 uppercase tracking-widest shadow-md">
          {divisiName}
        </div>
        <p className="text-gray-300 font-semibold text-xs tracking-widest uppercase mb-1 transition-opacity duration-500">
          {roles[currentIndex]}
        </p>
        <h3 className="text-xl font-black transition-opacity duration-500">
          {names[currentIndex]}
        </h3>
      </div>
    </div>
  );
};

// 2. Main Section Component
export default function PengurusSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // State untuk menampung data dari database (Ditambah state untuk Pembina)
  const [pembinaData, setPembinaData] = useState<any[]>([]);
  const [bphInti, setBphInti] = useState<any[]>([]);
  const [divisiData, setDivisiData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPengurus = async () => {
      const { data: frames, error: errorFrames } = await supabase
        .from('pengurus_frames')
        .select('*')
        .order('created_at', { ascending: true });

      const { data: members, error: errorMembers } = await supabase
        .from('pengurus_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (frames && members) {
        const tempPembina: any[] = [];
        const tempBph: any[] = [];
        const tempDivisi: any[] = [];

        frames.forEach((frame) => {
          // Cari orang-orang yang frame_id nya sama dengan id bingkai ini
          const frameMembers = members.filter((m) => m.frame_id === frame.id);

          if (frameMembers.length > 0) {
            // JALUR 1: Kategori PEMBINA (Kasta Tertinggi)
            if (frame.category === 'pembina') {
              frameMembers.forEach((m) => {
                tempPembina.push({
                  role: m.role || frame.title,
                  name: m.name,
                  img: m.image_url,
                  badge: frame.title
                });
              });
            } 
            // JALUR 2: Kategori DIVISI (Animasi Bergerak)
            else if (frame.category === 'divisi' || frame.is_divisi === true) {
              tempDivisi.push({
                divisiName: frame.title,
                images: frameMembers.map((m) => m.image_url),
                roles: frameMembers.map((m) => m.role),
                names: frameMembers.map((m) => m.name)
              });
            } 
            // JALUR 3: Kategori BPH (Atau data lama yang belum diset)
            else {
              frameMembers.forEach((m) => {
                tempBph.push({
                  role: m.role || frame.title,
                  name: m.name,
                  img: m.image_url
                });
              });
            }
          }
        });

        setPembinaData(tempPembina);
        setBphInti(tempBph);
        setDivisiData(tempDivisi);
      }
      
      setIsLoading(false);
    };

    fetchPengurus();
  }, []);

  // Logika Auto-Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isLoading) return; 

    const scrollInterval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(scrollInterval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="py-24 bg-[#f8f9fa] dark:bg-[#050505] flex justify-center">
        <div className="w-8 h-8 border-2 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Jika semua data database kosong, sembunyikan section-nya
  if (pembinaData.length === 0 && bphInti.length === 0 && divisiData.length === 0) return null;

  return (
    <section id="pengurus" className="py-24 bg-[#f8f9fa] dark:bg-[#050505] overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h4 className="text-[#800000] font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Struktur Organisasi
          </h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase">
            Wajah <span className="text-[#800000]">Vistara</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mt-4 max-w-lg">
            Mengenal lebih dekat para penggerak di balik setiap inisiatif dan kolaborasi organisasi.
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
        className="flex gap-6 overflow-x-auto pb-10 px-6 md:px-12 snap-x snap-mandatory hide-scrollbar"
      >
        
        {/* 1. RENDER FRAME PEMBINA (Paling Depan!) */}
        {pembinaData.map((pembina, index) => (
          <div key={`pembina-${index}`} className="relative w-72 h-96 flex-shrink-0 rounded-[2rem] overflow-hidden snap-center group shadow-lg border border-purple-100 dark:border-purple-900/50">
            <img src={pembina.img} alt={pembina.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
               <div className="bg-purple-600/80 backdrop-blur-sm border border-purple-400/30 text-[10px] font-bold px-3 py-1 inline-block rounded-full mb-3 uppercase tracking-widest text-white shadow-md">
                {pembina.badge || "Dewan Pembina"}
              </div>
              <p className="text-purple-300 font-bold text-xs tracking-widest uppercase mb-1">{pembina.role}</p>
              <h3 className="text-xl font-black">{pembina.name}</h3>
            </div>
          </div>
        ))}

        {/* Garis Pemisah Visual antara Pembina dan BPH Inti */}
        {pembinaData.length > 0 && (bphInti.length > 0 || divisiData.length > 0) && (
          <div className="hidden md:flex flex-shrink-0 items-center justify-center w-8 snap-center">
            <div className="w-[2px] h-32 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
          </div>
        )}

        {/* 2. RENDER FRAME BPH INTI (Tengah) */}
        {bphInti.map((bph, index) => (
          <div key={`bph-${index}`} className="relative w-72 h-96 flex-shrink-0 rounded-[2rem] overflow-hidden snap-center group shadow-lg border border-gray-100 dark:border-gray-800">
            <img src={bph.img} alt={bph.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
               <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] font-bold px-3 py-1 inline-block rounded-full mb-3 uppercase tracking-widest text-white shadow-md">
                BPH Inti
              </div>
              <p className="text-[#ff4d4d] font-bold text-xs tracking-widest uppercase mb-1">{bph.role}</p>
              <h3 className="text-xl font-black">{bph.name}</h3>
            </div>
          </div>
        ))}

        {/* Garis Pemisah Visual antara BPH Inti dan Divisi */}
        {bphInti.length > 0 && divisiData.length > 0 && (
          <div className="hidden md:flex flex-shrink-0 items-center justify-center w-8 snap-center">
            <div className="w-[2px] h-32 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
          </div>
        )}

        {/* 3. RENDER FRAME DIVISI (Paling Kanan / Belakang) */}
        {divisiData.map((div, index) => (
          <div key={`div-${index}`} className="snap-center">
             <AnimatedDivisiCard 
                divisiName={div.divisiName} 
                images={div.images} 
                roles={div.roles}
                names={div.names} 
              />
          </div>
        ))}
        
      </div>
    </section>
  );
}