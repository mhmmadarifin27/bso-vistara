import Link from "next/link";

export default function HeroSection() {
  return (
    // Background utama yang solid (Putih di siang, Hitam di malam)
    <section id="beranda" className="w-full bg-white dark:bg-[#0a0a0a] pt-20 transition-colors duration-500">
      
      {/* Container Gambar dengan Lengkungan Boeing (rounded-tl-[100px]) */}
      <div className="relative w-full h-[85vh] min-h-[600px] bg-slate-200 dark:bg-gray-900 rounded-tl-[80px] md:rounded-tl-[180px] overflow-hidden shadow-2xl">
        
        {/* Gambar Background */}
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
          alt="Vistara Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay Gradient: Agar teks tetap terbaca, kita kasih gradasi dari kiri ke kanan */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent dark:from-[#0a0a0a]/90 dark:via-[#0a0a0a]/50 dark:to-transparent"></div>

        {/* Konten Teks di Atas Gambar */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-3xl animate-fade-in-up">
              
              <h1 className="text-5xl md:text-7xl font-normal text-white leading-[1.1] tracking-tight">
                Connect, protect <br/>
                and explore our <br/>
                <span className="font-bold text-white dark:text-white">world and beyond</span>
              </h1>
              
              {/* Teks Versi Vistara (Bisa kamu pakai yang ini) */}
              {/* <h1 className="text-5xl md:text-7xl font-normal text-white leading-[1.1] tracking-tight">
                Membangun, melindungi <br/>
                dan menjelajahi <br/>
                <span className="font-bold text-[#ff4d4d] dark:text-[#cc0000]">masa depan bersama</span>
              </h1> 
              */}

              <p className="mt-6 text-lg md:text-xl text-gray-200 font-light max-w-xl">
                Organisasi yang berdedikasi untuk menciptakan dampak positif bagi masyarakat melalui inovasi dan kolaborasi tingkat tinggi.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="#tentang-kami" className="bg-[#800000] hover:bg-[#990000] text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Kenali Kami
                </Link>
                <Link href="#contact" className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all">
                  Jalin Kemitraan
                </Link>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}