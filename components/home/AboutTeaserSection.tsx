import Link from "next/link";

export default function PilarSection() {
  return (
    <section id="tentang-kami" className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* BAGIAN KIRI: GAMBAR DENGAN BADGE MENGAMBANG */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Dekorasi Latar (Kotak di belakang gambar) */}
            <div className="absolute -inset-4 bg-[#800000] dark:bg-[#111] rounded-[2.5rem] transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 z-0"></div>
            
            {/* Container Gambar */}
            <div className="relative z-10 w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
              <img 
                src="all.png" 
                alt="Kegiatan Vistara" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#800000]/10 mix-blend-multiply"></div>
            </div>

            {/* Badge Mengambang ala Cendekia */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-[#800000] text-white p-5 rounded-2xl shadow-xl transform group-hover:-translate-y-2 transition-transform duration-300">
              <p className="text-3xl font-black leading-none">100%</p>
              <p className="text-[10px] font-bold tracking-widest uppercase mt-1">Kolaborasi Nyata</p>
            </div>
          </div>

          {/* BAGIAN KANAN: TEKS & QUOTE */}
          <div className="w-full lg:w-1/2">
            {/* Overline dengan Ikon Hati/Love */}
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-[#800000]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <h4 className="text-[#800000] font-bold tracking-[0.2em] text-xs uppercase">
                Mengenal Lebih Dekat
              </h4>
            </div>

            {/* Judul Utama */}
            <h2 className="text-4xl md:text-5xl font-medium text-slate-900 dark:text-white leading-tight mb-8">
              Wadah Bagi <span className="font-bold text-[#800000]">Penggerak Perubahan</span> & Inovasi Sosial.
            </h2>

            {/* Paragraf Deskripsi */}
            <div className="space-y-6 text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
              <p>
                Vistara lahir dari sebuah gagasan sederhana: menghadirkan ruang kolaborasi yang nyaman di mana ide, kepedulian, dan aksi nyata tumbuh bersama dalam harmoni.
              </p>
              <p>
                Bukan sekadar organisasi, kami mengajak setiap individu menyelami makna pergerakan dan mengaplikasikannya di tengah masyarakat. Di sini, karakter dibentuk melalui keteladanan, dan masa depan dirancang dengan kolaborasi strategis lintas sektor.
              </p>
            </div>

            {/* Garis Pemisah Tipis */}
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800 my-8"></div>

            {/* Kutipan (Quote) */}
            <blockquote className="mb-10">
              <p className="text-xl font-medium italic text-slate-800 dark:text-gray-300 leading-relaxed mb-4">
                "Kami bergerak bukan hanya untuk menciptakan program kerja yang terlihat megah, tapi untuk mewariskan nilai-nilai kebaikan yang bertahan lama."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-1 bg-[#800000]"></div>
                <p className="text-sm font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                  Tito Nurseha, S.pd., M.si. | Pembina Vistara
                </p>
              </div>
            </blockquote>

            {/* Tombol CTA */}
            <Link 
              href="/tentang-kami" 
              className="inline-flex items-center gap-3 bg-[#800000] hover:bg-[#600000] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Baca Sejarah Lengkap
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}