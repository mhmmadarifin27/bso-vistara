"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function EventDetailPage() {
  const params = useParams();
  const [eventDetail, setEventDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', params.id)
        .single();

      if (data) setEventDetail(data);
      if (error) console.error("Error:", error);
      setIsLoading(false);
    };

    if (params.id) fetchEventDetail();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="w-8 h-8 border-2 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!eventDetail) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 transition-colors duration-500 pt-32 pb-24">
      
      {/* CONTAINER UTAMA */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* 1. NAVIGASI BALIK */}
        <Link href="/event" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-[#800000] transition-colors mb-16">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Galeri
        </Link>

        {/* 2. AREA HEADER */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-[#800000]"></div>
            <span className="text-[#800000] font-black text-xs uppercase tracking-[0.2em]">
              {eventDetail.category || "Dokumentasi"}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase leading-[1.1] tracking-tighter mb-8 max-w-full break-words">
            {eventDetail.title}
          </h1>
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-4">
            <span>📅 {eventDetail.date}</span>
            {eventDetail.location && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>📍 {eventDetail.location}</span>
              </>
            )}
          </div>
        </header>

        {/* 3. FRAME GAMBAR UTAMA */}
        <div className="w-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-900 mb-12">
          <img 
            src={eventDetail.image_url} 
            alt={eventDetail.title} 
            className="w-full h-auto object-cover max-h-[80vh]"
          />
        </div>

        {/* 4. AREA DESKRIPSI - FIX LEBAR FULL */}
        <div className="w-full">
          <div className="space-y-6">
            {eventDetail.description ? (
              // Tambahan break-words agar kalau ada link/kata panjang tidak menembus layar
              eventDetail.description.split('\n').filter((p: string) => p.trim() !== "").map((paragraf: string, index: number) => (
                <p 
                  key={index} 
                  className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-[1.8] font-medium break-words text-justify md:text-left"
                >
                  {paragraf}
                </p>
              ))
            ) : (
              <p className="italic text-gray-400">Deskripsi kegiatan tidak tersedia.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}