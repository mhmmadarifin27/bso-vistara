"use client";
import { useEffect, useState } from "react";

export default function TentangKamiPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 transition-colors duration-500 pt-05 pb-05 overflow-hidden">
      {/* --- SECTION 0: INTRO / APA ITU VISTARA --- */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Kolom Kiri: Judul Utama */}
          <div className="w-full md:w-1/3 sticky top-32">
            <div className="h-[3px] w-16 bg-[#800000] mb-8"></div>
            <h2 className="text-[#800000] font-black text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4">
              Identitas Kami
            </h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
              KITA <br /> ADALAH <br /> <span className="text-[#800000] drop-shadow-lg">VISTARA.</span>
            </h1>
          </div>

          {/* Kolom Kanan: Paragraf Penjelasan */}
          <div className="w-full md:w-2/3 md:pt-6">
            <h3 className="text-2xl md:text-4xl font-black leading-[1.4] text-slate-800 dark:text-gray-200 mb-8 tracking-tight">
              Lebih dari sekadar organisasi, kami adalah <span className="text-[#800000]">ekosistem pergerakan dan inovasi</span> bagi para pemuda.
            </h3>
            
            <div className="space-y-6 text-base md:text-lg text-slate-600 dark:text-gray-400 leading-[1.8] font-medium max-w-2xl">
              <p>
                Lahir dan berkembang dari semangat kolaborasi di lingkungan kampus UIN Raden Fatah Palembang, Vistara hadir sebagai wadah yang mendobrak batas. Kami percaya bahwa potensi mahasiswa tidak seharusnya hanya terkurung di dalam ruang kelas.
              </p>
              <p>
                Kami menyinergikan berbagai elemen—mulai dari teknologi, seni, budaya, hingga olahraga—untuk menciptakan harmoni yang berdampak. Vistara adalah tempat di mana ide-ide liar dirapikan, minat bakat difasilitasi, dan gagasan brilian dieksekusi menjadi karya nyata yang bermanfaat bagi masyarakat luas.
              </p>
            </div>

            {/* Highlight Values (Nilai Utama) */}
            <div className="mt-14 flex flex-wrap gap-10 md:gap-16 border-t border-gray-200 dark:border-gray-800 pt-10">
              <div>
                <p className="font-black text-3xl md:text-4xl text-slate-900 dark:text-white mb-1">Kolaborasi</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#800000]">Pondasi Gerak</p>
              </div>
              <div>
                <p className="font-black text-3xl md:text-4xl text-slate-900 dark:text-white mb-1">Kreativitas</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#800000]">Napas Kami</p>
              </div>
              <div>
                <p className="font-black text-3xl md:text-4xl text-slate-900 dark:text-white mb-1">Inovasi</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#800000]">Arah Tujuan</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* --- SECTION 1: MAKNA LOGO & FILOSOFI --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* KOLOM KIRI: LOGO ASLI */}
          <div className="w-full lg:w-5/12 flex justify-center relative">
            {/* Dekorasi Glow Belakang Logo (Perpaduan emas/hijau samar) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-emerald-600/10 rounded-full blur-3xl transform scale-125"></div>
            
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[3rem] shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-700 p-8">
              {/* Gambar Logo Asli Vistara */}
              <img 
                src="/logo vistara.png" 
                alt="Logo Vistara" 
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>
          
          {/* KOLOM KANAN: TEKS & GRID FILOSOFI */}
          <div className="w-full lg:w-7/12">
            <h4 className="text-[#800000] font-bold tracking-[0.4em] text-sm uppercase mb-4">Filosofi Vistara</h4>
            <h1 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-tight tracking-tighter">
              Lebih Dari <br/><span className="text-[#800000]">Sekadar Logo.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-gray-400 mb-10 leading-relaxed">
              Setiap elemen visual kami memiliki jiwa. Memadukan akar budaya Nusantara dengan semangat kolaborasi modern, logo ini adalah doa dan kompas yang mengarahkan setiap langkah pergerakan Vistara.
            </p>
            
            {/* GRID 6 FILOSOFI - VERSION: BRAND BREAKDOWN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* 1. Gunungan Wayang */}
              <div className="p-6 bg-slate-50 dark:bg-[#111] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <img src="/filosofi-gunungan.png" alt="Icon" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all" />
                  <div>
                    <p className="font-black uppercase text-slate-900 dark:text-white text-[10px] mb-1 tracking-widest text-[#800000]">Gunungan Wayang</p>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">
                      Melambangkan perjalanan hidup, kebijaksanaan, dan akar budaya Nusantara.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Ornamen Simetris */}
              <div className="p-6 bg-slate-50 dark:bg-[#111] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <img src="/filosofi-ornamen.png" alt="Icon" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all" />
                  <div>
                    <p className="font-black uppercase text-slate-900 dark:text-white text-[10px] mb-1 tracking-widest text-[#800000]">Ornamen Simetris</p>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">
                      Keseimbangan antara kreativitas, seni, budaya, dan olahraga yang harmonis.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Warna Hijau Tua */}
              <div className="p-6 bg-slate-50 dark:bg-[#111] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  {/* Lingkaran Warna CSS */}
                  <div className="w-10 h-10 rounded-full bg-[#004d40] shrink-0 border-4 border-white dark:border-gray-800 shadow-sm"></div>
                  <div>
                    <p className="font-black uppercase text-slate-900 dark:text-white text-[10px] mb-1 tracking-widest text-[#800000]">Warna Hijau Tua</p>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">
                      Simbol pertumbuhan, harapan, dan ketenangan dalam pergerakan.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Lingkaran Bermotif */}
              <div className="p-6 bg-slate-50 dark:bg-[#111] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <img src="/filosofi-lingkaran.png" alt="Icon" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all" />
                  <div>
                    <p className="font-black uppercase text-slate-900 dark:text-white text-[10px] mb-1 tracking-widest text-[#800000]">Lingkaran Bermotif</p>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">
                      Melambangkan persatuan, kesinambungan, dan semangat kolaborasi.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. Ornamen Kaligrafi Ornamental */}
              <div className="p-6 bg-slate-50 dark:bg-[#111] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  <img src="/filosofi-kaligrafi.png" alt="Icon" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all" />
                  <div>
                    <p className="font-black uppercase text-slate-900 dark:text-white text-[10px] mb-1 tracking-widest text-[#800000]">Kaligrafi Ornamental</p>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">
                      Kesan elegan yang menghubungkan nilai tradisional dan modern.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Warna Emas */}
              <div className="p-6 bg-slate-50 dark:bg-[#111] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-4">
                  {/* Lingkaran Warna CSS */}
                  <div className="w-10 h-10 rounded-full bg-[#d4af37] shrink-0 border-4 border-white dark:border-gray-800 shadow-sm"></div>
                  <div>
                    <p className="font-black uppercase text-slate-900 dark:text-white text-[10px] mb-1 tracking-widest text-[#800000]">Warna Emas</p>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">
                      Melambangkan keunggulan, prestasi, dan nilai luhur organisasi.
                    </p>
                  </div>
                  </div>
                  </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* --- SECTION 2: VISI & MISI (GAYA CENDIKIA - 2 FOTO + ANIMASI) --- */}
      <section className="py-24 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* VISI - Image Left */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 group">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 border-2 border-[#800000] rounded-[3rem] group-hover:inset-0 transition-all duration-500"></div>
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Visi Vistara" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 animate-slide-in-right">
              <h2 className="text-[#800000] font-black text-6xl md:text-8xl opacity-10 mb-[-2rem] select-none">VISION</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 relative z-10">Visi Kami</h3>
              <p className="text-2xl md:text-3xl text-slate-700 dark:text-gray-300 leading-snug font-medium italic">
                "Menjadi pusat kolaborasi yang melahirkan pemimpin inovatif untuk masa depan Indonesia yang lebih mandiri."
              </p>
              <div className="w-24 h-2 bg-[#800000] mt-8"></div>
            </div>
          </div>

          {/* MISI - Image Right */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 group">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 border-2 border-slate-900 dark:border-white rounded-[3rem] group-hover:inset-0 transition-all duration-500"></div>
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                  alt="Misi Vistara" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-slate-900 dark:text-white font-black text-6xl md:text-8xl opacity-10 mb-[-2rem] select-none text-right">MISSION</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase mb-8 relative z-10">Misi Kami</h3>
              <div className="space-y-6">
                {[
                  "Membangun ekosistem yang menghubungkan potensi pemuda.",
                  "Memberikan edukasi teknologi dan kepemimpinan secara merata.",
                  "Mendorong proyek sosial berbasis data dan inovasi nyata."
                ].map((misi, i) => (
                  <div key={i} className="flex gap-6 items-start group/item">
                    <span className="flex-shrink-0 w-12 h-12 bg-[#800000] text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover/item:rotate-12 transition-transform">
                      {i + 1}
                    </span>
                    <p className="text-xl text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: SEJARAH PERJALANAN (TIMELINE) --- */}
      <section className="py-32 max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* HEADER SEJARAH */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h4 className="text-[#800000] font-bold tracking-[0.4em] text-sm uppercase mb-4">Our History</h4>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight">
              Jejak <br/><span className="text-[#800000]">Perjalanan.</span>
            </h2>
          </div>
          <p className="text-xl text-slate-500 dark:text-gray-400 max-w-md">
            Setiap pencapaian besar selalu dimulai dari langkah pertama yang penuh keberanian. Ini adalah cerita kami.
          </p>
        </div>

        {/* TIMELINE WRAPPER */}
        <div className="relative">
          
          {/* Garis Vertikal (Tulang Punggung Timeline) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800 -translate-x-1/2 hidden md:block"></div>
          {/* Garis vertikal untuk tampilan mobile (di kiri) */}
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800 md:hidden"></div>

          <div className="space-y-16 md:space-y-32">
            
            {/* ITEM SEJARAH 1 (Kanan) */}
            <div className="relative flex flex-col md:flex-row justify-between items-center w-full group">
              {/* Titik Tengah */}
              <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-[#800000] border-4 border-white dark:border-[#0a0a0a] -translate-x-1/2 z-10 shadow-lg group-hover:scale-150 transition-transform duration-500"></div>
              
              {/* Konten Kiri (Kosong di Desktop, agar konten di kanan) */}
              <div className="hidden md:block w-5/12"></div>
              
              {/* Konten (Teks & Gambar) */}
              <div className="w-full pl-20 md:pl-0 md:w-5/12 flex flex-col md:items-start text-left">
                <span className="text-[#800000] font-black text-3xl md:text-5xl mb-4 tracking-tighter">2023</span>
                <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4">Awal Mula Vistara</h3>
                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl border border-gray-100 dark:border-gray-800">
                   <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" alt="Awal Mula" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                  Berawal dari diskusi kecil di Fakultas Sains dan Teknologi UIN Raden Fatah, sekelompok mahasiswa memiliki visi yang sama untuk membentuk wadah pergerakan dan kreativitas.
                </p>
              </div>
            </div>

            {/* ITEM SEJARAH 2 (Kiri) */}
            <div className="relative flex flex-col md:flex-row-reverse justify-between items-center w-full group">
              {/* Titik Tengah */}
              <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-slate-300 dark:bg-gray-700 border-4 border-white dark:border-[#0a0a0a] -translate-x-1/2 z-10 group-hover:bg-[#800000] group-hover:scale-150 transition-all duration-500"></div>
              
              {/* Konten Kanan (Kosong di Desktop) */}
              <div className="hidden md:block w-5/12"></div>
              
              {/* Konten (Teks & Gambar) */}
              <div className="w-full pl-20 md:pl-0 md:w-5/12 flex flex-col md:items-end text-left md:text-right">
                <span className="text-slate-400 font-black text-3xl md:text-5xl mb-4 tracking-tighter group-hover:text-[#800000] transition-colors duration-500">2024</span>
                <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4">Deklarasi & Peresmian</h3>
                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl border border-gray-100 dark:border-gray-800">
                   <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" alt="Deklarasi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                  Vistara resmi dibentuk secara struktural. Identitas organisasi mulai dibangun dengan fokus pada keseimbangan seni, budaya, dan inovasi teknologi bagi para pemuda.
                </p>
              </div>
            </div>

            {/* ITEM SEJARAH 3 (Kanan) */}
            <div className="relative flex flex-col md:flex-row justify-between items-center w-full group">
              {/* Titik Tengah */}
              <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-slate-300 dark:bg-gray-700 border-4 border-white dark:border-[#0a0a0a] -translate-x-1/2 z-10 group-hover:bg-[#800000] group-hover:scale-150 transition-all duration-500"></div>
              
              {/* Konten Kiri (Kosong di Desktop) */}
              <div className="hidden md:block w-5/12"></div>
              
              {/* Konten (Teks & Gambar) */}
              <div className="w-full pl-20 md:pl-0 md:w-5/12 flex flex-col md:items-start text-left">
                <span className="text-slate-400 font-black text-3xl md:text-5xl mb-4 tracking-tighter group-hover:text-[#800000] transition-colors duration-500">2025</span>
                <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4">Ekspansi Kolaborasi</h3>
                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl border border-gray-100 dark:border-gray-800">
                   <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop" alt="Kolaborasi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                  Tahun ini menjadi tonggak sejarah dengan diluncurkannya sistem CMS digital dan meluasnya jaringan media partnership yang menjangkau lebih dari sekadar lingkup kampus.
                </p>
              </div>
            </div>

            {/* ITEM MASA DEPAN (Kiri - Akhir Timeline) */}
            <div className="relative flex flex-col md:flex-row-reverse justify-between items-center w-full group pt-10">
               {/* Titik Akhir */}
               <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-transparent border-4 border-dashed border-[#800000] -translate-x-1/2 z-10 animate-spin-slow"></div>
               
               <div className="hidden md:block w-5/12"></div>
               
               <div className="w-full pl-20 md:pl-0 md:w-5/12 flex flex-col md:items-end text-left md:text-right">
                 <h3 className="text-3xl font-black uppercase text-slate-900 dark:text-white mb-2">Masa Depan Vistara</h3>
                 <p className="text-slate-500 italic">Perjalanan kami baru saja dimulai...</p>
               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}