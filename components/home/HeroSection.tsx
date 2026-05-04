"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection() {
  // Daftar URL gambar untuk Slideshow (Silakan ganti dengan foto asli kegiatan Vistara)
  const images = [
    "all.png",
    "foto4.jpeg", // Gambar 2
    "foto3.jpg"  // Gambar 3
  ];

  // State untuk melacak gambar mana yang sedang aktif
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Efek Auto-Slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000 ms = 5 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen dibongkar
  }, [images.length]);

  return (
    // Background utama yang solid (Putih di siang, Hitam di malam)
    <section id="beranda" className="w-full bg-white dark:bg-[#0a0a0a] pt-20 transition-colors duration-500">
      
      {/* Container Gambar dengan Lengkungan Boeing (rounded-tl-[100px]) */}
      <div className="relative w-full h-[85vh] min-h-[600px] bg-slate-200 dark:bg-gray-900 rounded-tl-[80px] md:rounded-tl-[180px] overflow-hidden shadow-2xl">
        
        {/* GAMBAR BACKGROUND DENGAN EFEK FADE */}
        {images.map((src, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
            }`}
          >
            <img 
              src={src} 
              alt={`Vistara Hero ${index + 1}`}
              // Perubahan: object-contain atau object-cover dengan posisi spesifik
              className="w-full h-full object-cover object-top md:object-center"
            />
          </div>
        ))}

        {/* Overlay Gradient: Agar teks tetap terbaca, kita kasih gradasi dari kiri ke kanan */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-[#0a0a0a]/95 dark:via-[#0a0a0a]/60 dark:to-transparent z-10 transition-colors duration-500"></div>

        {/* Konten Teks di Atas Gambar */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-3xl animate-fade-in-up">
              
              {/* Teks Versi Vistara */}
              <h1 className="text-5xl md:text-7xl font-normal text-white leading-[1.1] tracking-tight">
                Membangun, melindungi <br/>
                dan menjelajahi <br/>
                <span className="font-bold text-[#ff4d4d] dark:text-[#cc0000]">masa depan bersama</span>
              </h1> 

              <p className="mt-6 text-lg md:text-xl text-gray-200 font-light max-w-xl">
                Lembaga yang berdedikasi melahirkan generasi pemimpin masa depan yang inovatif, beradab, dan berwawasan global melalui kolaborasi strategis.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="#tentang-kami" className="bg-[#800000] hover:bg-[#990000] text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Kenali Kami
                </Link>
                <Link href="#contact" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all">
                  Jalin Kemitraan
                </Link>
              </div>
              
            </div>
          </div>
        </div>

        {/* Indikator Titik (Dots) di Bawah - Opsional tapi bagus buat UX */}
        <div className="absolute bottom-10 left-6 md:left-12 flex gap-3 z-20">
          {images.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentImageIndex ? "w-8 bg-[#ff4d4d]" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}