"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase"; // Pastikan path ini sesuai dengan file supabase kamu

export default function LoginPage() {
  const router = useRouter();
  
  // State untuk menyimpan inputan user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State untuk loading dan error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(""); // Reset error setiap kali tombol ditekan

    // 1. Kirim data login ke Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // 2. Kalau gagal (email/password salah)
      setErrorMsg("Email atau Password salah. Silakan coba lagi.");
      setIsLoading(false);
    } else {
      // 3. Kalau sukses, langsung arahkan ke Dashboard
      router.push("/admin"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Tombol Back to Home (Kanan Atas) - Dipindah ke luar agar posisinya benar di pojok layar */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <Link 
          href="/" 
          title="Kembali ke Beranda"
          className="flex items-center justify-center w-12 h-12 bg-[#111] border border-gray-800 rounded-full shadow-sm hover:scale-110 hover:shadow-md transition-all group"
        >
          <svg className="w-5 h-5 text-gray-400 group-hover:text-[#800000] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>

      {/* Dekorasi Background */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#800000]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#800000]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 relative z-10 animate-fade-in">
        
        <div className="text-center mb-10">
          {/* Logo Vistara Berupa Gambar */}
          <Link href="/" className="mx-auto w-20 h-20 bg-[#111] dark:bg-black rounded-2xl border border-[#800000]/30 p-3 shadow-2xl shadow-[#800000]/20 flex items-center justify-center mb-6 group hover:scale-105 hover:shadow-[#800000]/40 transition-all duration-300">
            <img 
              src="/logo vistara.png" // Pastikan nama file ini sesuai dengan yang ada di folder public kamu
              alt="Logo Vistara" 
              className="w-full h-full object-contain drop-shadow-md group-hover:brightness-110 transition-all" 
            />
          </Link>
          <h1 className="text-3xl font-black text-white tracking-widest uppercase">Vistara Portal</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Restricted Access. Authorized Personnel Only.</p>
        </div>

        <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Tampilkan pesan error jika login gagal */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold p-3 rounded-xl text-center">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-400 ml-2">Email Administrator</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="w-full bg-black border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all placeholder-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-400 ml-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all placeholder-gray-600"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#800000] text-white px-8 py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-[#800000]/40 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                "Login to CMS"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}