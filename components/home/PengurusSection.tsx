"use client";
import { useState, useEffect, useRef } from "react";

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
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

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

// 2. Main Section Component (Ini yang diekspor ke Beranda)
export default function PengurusSection() {
  // Tambahan: Ref untuk container scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Data 4 BPH Inti (Statis)
  const bphInti = [
    { role: "Ketua Umum", name: "Andi Pratama", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
    { role: "Wakil Ketua", name: "Budi Santoso", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
    { role: "Sekretaris", name: "Siti Rahma", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
    { role: "Bendahara", name: "Nisa Kamila", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" },
  ];

  // Data 5 Divisi (Animasi)
  const divisiData = [
    {
      divisiName: "Divisi PR",
      images: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80", // Tim PR
        "https://images.unsplash.com/photo-1560250097001-sgb28f1b6a12?w=500&q=80", // Kadiv
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80", // Wakadiv
      ],
      roles: ["Full Team", "Ketua Divisi", "Wakil Ketua"],
      names: ["Keluarga PR", "Muhammad Arifin", "Aisyah Putri"]
    },
    {
      divisiName: "Divisi Kreatif",
      images: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80",
      ],
      roles: ["Full Team", "Ketua Divisi", "Wakil Ketua"],
      names: ["Tim Kreatif", "Reza Fahlevi", "Diana Sari"]
    },
    {
      divisiName: "Divisi Event",
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80",
      ],
      roles: ["Full Team", "Ketua Divisi", "Wakil Ketua"],
      names: ["Tim Event", "Dimas Anggara", "Rina Melati"]
    },
    {
      divisiName: "Divisi HRD",
      images: [
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80",
        "https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?w=500&q=80",
      ],
      roles: ["Full Team", "Ketua Divisi", "Wakil Ketua"],
      names: ["Tim HRD", "Fajar Nugraha", "Lestari"]
    },
    {
      divisiName: "Divisi IT",
      images: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80",
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&q=80",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
      ],
      roles: ["Full Team", "Ketua Divisi", "Wakil Ketua"],
      names: ["Tim IT Dev", "Bayu Pratama", "Nadia Vega"]
    }
  ];

  // Tambahan: Logika Auto-Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      // Cek apakah scroll sudah mencapai ujung kanan (mentok)
      // (dikurangi sedikit pixel untuk antisipasi pembulatan desimal browser)
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        // Jika mentok, scroll mulus kembali ke ujung kiri (awal)
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Geser ke kanan sejauh lebar 1 card (sekitar 320px termasuk gap)
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3500); // Menggeser otomatis setiap 3.5 detik

    return () => clearInterval(scrollInterval);
  }, []);

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

      {/* Container Carousel - Scroll menyamping dengan penambahan ref */}
      <div 
        ref={scrollContainerRef} 
        className="flex gap-6 overflow-x-auto pb-10 px-6 md:px-12 snap-x snap-mandatory hide-scrollbar"
      >
        
        {/* Render 4 Frame Statis BPH Inti */}
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
        <div className="hidden md:flex flex-shrink-0 items-center justify-center w-12 snap-center">
          <div className="w-[2px] h-32 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
        </div>

        {/* Render 5 Frame Divisi yang Animasinya Bergantian */}
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