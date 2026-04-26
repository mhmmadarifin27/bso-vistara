"use client";
import { useEffect, useState } from "react";

export default function TentangKamiPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 transition-colors duration-500 pt-28 pb-24 overflow-hidden">
      
      {/* --- SECTION 1: MAKNA LOGO & FILOSOFI --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 flex justify-center relative">
            {/* Dekorasi Belakang Logo */}
            <div className="absolute inset-0 bg-[#800000]/5 rounded-full blur-3xl transform scale-125"></div>
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[4rem] shadow-2xl flex items-center justify-center transform hover:rotate-3 transition-transform duration-700">
              <span className="text-[#800000] text-[10rem] md:text-[14rem] font-black tracking-tighter select-none">V</span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <h4 className="text-[#800000] font-bold tracking-[0.4em] text-sm uppercase mb-4">Filosofi Vistara</h4>
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-tight">
              Lebih Dari <br/><span className="text-[#800000]">Sekadar Logo.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
              Vistara bukan hanya sebuah nama, ia adalah doa dan arah gerak. Huruf <strong>"V"</strong> yang kokoh melambangkan visi yang jauh ke depan dan kemenangan kolektif bagi setiap orang yang terlibat di dalamnya.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-[#111] rounded-3xl border-l-4 border-[#800000]">
                <p className="font-bold uppercase text-[#800000] text-sm mb-2">Warna Maroon</p>
                <p className="text-sm text-slate-500">Keberanian dan tekad yang membara.</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-[#111] rounded-3xl border-l-4 border-slate-900 dark:border-white">
                <p className="font-bold uppercase text-slate-900 dark:text-white text-sm mb-2">Putih Bersih</p>
                <p className="text-sm text-slate-500">Ketulusan dan transparansi dalam beraksi.</p>
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

      {/* --- SECTION 3: PROGRAM & TARGET (GAYA TARGET/INISIATIF) --- */}
      <section className="py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h4 className="text-[#800000] font-bold tracking-[0.4em] text-sm uppercase mb-4">Strategic Focus</h4>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight">
              Program <br/><span className="text-[#800000]">Prioritas.</span>
            </h2>
          </div>
          <p className="text-xl text-slate-500 dark:text-gray-400 max-w-md">
            Kami tidak hanya berencana, kami menetapkan target untuk setiap perubahan yang kami perjuangkan.
          </p>
        </div>

        <div className="space-y-12">
          {[
            {
              title: "Vistara Digital Academy",
              desc: "Pelatihan intensif coding, desain, dan literasi data untuk 1.000+ pelajar di pelosok daerah.",
              target: "1.000+ Alumni",
              img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
            },
            {
              title: "Social Innovation Hub",
              desc: "Inkubator proyek sosial yang mendanai inisiatif pemuda berbasis solusi teknologi berkelanjutan.",
              target: "50 Proyek/Tahun",
              img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop"
            }
          ].map((prog, i) => (
            <div key={i} className={`flex flex-col lg:flex-row items-stretch gap-0 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl transition-all duration-500 hover:shadow-[#800000]/10 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image Side */}
              <div className="w-full lg:w-1/2 h-[300px] lg:h-auto overflow-hidden">
                <img src={prog.img} alt={prog.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
              </div>
              {/* Content Side */}
              <div className="w-full lg:w-1/2 p-10 md:p-16 bg-white dark:bg-[#111] flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1 bg-[#800000] text-white text-xs font-bold rounded-full uppercase tracking-widest">Ongoing</span>
                  <div className="h-[1px] flex-grow bg-gray-200 dark:bg-gray-800"></div>
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-6 text-slate-900 dark:text-white tracking-tight">{prog.title}</h3>
                <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {prog.desc}
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-[#800000]">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Target Capaian</p>
                    <p className="text-3xl font-black">{prog.target}</p>
                  </div>
                  <button className="flex-grow md:flex-none px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-[#800000] dark:hover:bg-[#800000] hover:text-white transition-all">
                    Detail Program
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}