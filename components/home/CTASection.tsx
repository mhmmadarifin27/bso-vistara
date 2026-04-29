"use client";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-20 bg-[#f8f9fa] dark:bg-[#0a0a0a] transition-colors duration-500 border-t border-gray-200 dark:border-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        {/* PRE-TITLE */}
        <span className="text-[#800000] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 block">
          Titik Temu Ide & Aksi
        </span>

        {/* HEADLINE / TITLE */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.1] text-slate-900 dark:text-white mb-6">
          Saatnya Ambil <br className="hidden sm:block" />
          <span className="text-[#800000]">Peran.</span>
        </h2>

        {/* SUBTITLE */}
        <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
          Ide hebat butuh ruang untuk dieksekusi. Jangan hanya menjadi penonton, mari gabungkan energi dan ciptakan dampak nyata bersama kami.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center">
          <Link 
            href="/contact" 
            className="group flex items-center gap-3 bg-[#800000] text-white px-10 py-4 md:py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-red-800 hover:scale-105 transition-all duration-300 shadow-xl shadow-[#800000]/20"
          >
            Mulai Kolaborasi
            <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}