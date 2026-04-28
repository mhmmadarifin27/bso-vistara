"use client";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  
  // State untuk menyimpan inputan user
  const [formData, setFormData] = useState({
    nama: "",
    instansi: "",
    email: "",
    tujuan: "",
    pesan: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk mengirim pesan ke WhatsApp
  const sendToWhatsApp = () => {
    // Nomor WA Tujuan (Ganti dengan nomor PR Vistara, awali dengan 62 tanpa spasi)
    const nomorWA = "6285810390120"; 
    
    // Validasi sederhana
    if(!formData.nama || !formData.tujuan || !formData.pesan) {
      alert("Mohon lengkapi Nama, Tujuan, dan Pesan terlebih dahulu.");
      return;
    }

    // Merangkai isi pesan
    const teksPesan = `Halo Tim Vistara, saya ingin mengajukan kemitraan.%0A%0A*Nama:* ${formData.nama}%0A*Instansi:* ${formData.instansi || '-'}%0A*Email:* ${formData.email || '-'}%0A*Tujuan:* ${formData.tujuan}%0A%0A*Pesan Singkat:*%0A${formData.pesan}`;
    
    // Membuka tab baru ke link WhatsApp
    const urlWA = `https://wa.me/${nomorWA}?text=${teksPesan}`;
    window.open(urlWA, "_blank");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 transition-colors duration-500 pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#800000]/10 dark:bg-[#800000]/20 text-[#800000] dark:text-[#ff4d4d] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#800000] animate-pulse"></span>
            Portal Kemitraan
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-tight">
            Mari Membangun <br/>
            <span className="text-[#800000] relative inline-block">
              Dampak Bersama.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#800000]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
            Apakah Anda mewakili komunitas, perusahaan, atau institusi? Kami selalu terbuka untuk diskusi, undangan media partner, hingga kolaborasi program strategis.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* --- BAGIAN KIRI: INFORMASI KONTAK (Cards) --- */}
          <div className="w-full lg:w-5/12 space-y-6 animate-slide-in-right">
            
            <div className="group bg-white dark:bg-[#111] p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-50 dark:bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#800000]/10 transition-transform">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-2">Markas Vistara</h3>
              <p className="text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
                Jl. Jend. Sudirman, Palembang<br/>
                Sumatera Selatan, Indonesia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <a href="mailto:partnership@vistara.org" className="group bg-white dark:bg-[#111] p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl hover:border-[#800000]/30 hover:-translate-y-1 transition-all duration-300 block">
                <div className="w-12 h-12 bg-slate-50 dark:bg-black rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#800000]/10 transition-transform">
                  <span className="text-xl">✉️</span>
                </div>
                <p className="text-xs font-bold text-[#800000] uppercase tracking-widest mb-1">Email Kemitraan</p>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">partnership@vistara.org</h3>
              </a>

              <a href="tel:+6281234567890" className="group bg-white dark:bg-[#111] p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl hover:border-[#800000]/30 hover:-translate-y-1 transition-all duration-300 block">
                <div className="w-12 h-12 bg-slate-50 dark:bg-black rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#800000]/10 transition-transform">
                  <span className="text-xl">📞</span>
                </div>
                <p className="text-xs font-bold text-[#800000] uppercase tracking-widest mb-1">Telepon / WA</p>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">+62 812-3456-7890</h3>
              </a>
            </div>

          </div>

          {/* --- BAGIAN KANAN: FORM INTERAKTIF --- */}
          <div className="w-full lg:w-7/12 animate-fade-in">
            <div className="bg-white dark:bg-[#111] p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#800000]/5 dark:bg-[#800000]/10 rounded-full blur-3xl pointer-events-none"></div>

              <h2 className="text-3xl font-black uppercase mb-8 text-slate-900 dark:text-white relative z-10">
                Kirim Pesan
              </h2>

              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-gray-400 ml-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-gray-400 ml-2">Instansi / Organisasi</label>
                    <input 
                      type="text" 
                      name="instansi"
                      value={formData.instansi}
                      onChange={handleChange}
                      placeholder="Asal instansi Anda"
                      className="w-full bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-gray-400 ml-2">Email Aktif</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      className="w-full bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-gray-400 ml-2">Jenis Tujuan</label>
                    <div className="relative">
                      {/* PERBAIKAN: Menggunakan defaultValue="", menghilangkan atribut selected di option */}
                      <select 
                        name="tujuan"
                        value={formData.tujuan}
                        onChange={handleChange}
                        className="w-full appearance-none bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all duration-300 cursor-pointer"
                      >
                        <option value="" disabled>Pilih Tujuan Kolaborasi</option>
                        <option value="Media Partner">Media Partner</option>
                        <option value="Sponsorship">Sponsorship / Pendanaan</option>
                        <option value="Kolaborasi Event">Kolaborasi Event</option>
                        <option value="Lainnya">Pertanyaan Umum / Lainnya</option>
                      </select>
                      <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-gray-400 ml-2">Pesan / Penjelasan Singkat</label>
                  <textarea 
                    rows={5}
                    name="pesan"
                    value={formData.pesan}
                    onChange={handleChange}
                    placeholder="Ceritakan secara singkat bentuk kolaborasi yang Anda inginkan..."
                    className="w-full bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-600 resize-none"
                  ></textarea>
                </div>

                {/* PERBAIKAN: Menambahkan onClick={sendToWhatsApp} */}
                <button 
                  type="button" 
                  onClick={sendToWhatsApp}
                  className="w-full group relative inline-flex items-center justify-center gap-3 bg-[#800000] text-white px-8 py-5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-[#800000]/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#800000]/40 overflow-hidden"
                >
                  <span className="relative z-10">Kirim via WhatsApp</span>
                  <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="absolute inset-0 h-full w-0 bg-white/20 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}