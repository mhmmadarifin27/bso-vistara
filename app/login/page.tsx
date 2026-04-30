"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi loading ke Supabase (1.5 detik)
    setTimeout(() => {
      setIsLoading(false);
      // Nanti di sini kita pasang logika Supabase Auth
      router.push("/admin"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#800000]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#800000]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 relative z-10 animate-fade-in">
        
        <div className="text-center mb-10">
          <Link href="/" className="inline-block bg-[#800000] text-white font-bold p-3 rounded-xl text-3xl shadow-lg mb-4 hover:scale-105 transition-transform">
            V
          </Link>
          <h1 className="text-3xl font-black text-white tracking-widest uppercase">Vistara Portal</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Restricted Access. Authorized Personnel Only.</p>
        </div>

        <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-400 ml-2">Email Administrator</label>
              <input 
                type="email" 
                required
                placeholder="admin@vistara.org"
                className="w-full bg-black border border-white/10 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all placeholder-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-gray-400 ml-2">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#800000]/50 focus:border-[#800000] transition-all placeholder-gray-600"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#800000] text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-[#800000]/40 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? "Authenticating..." : "Login to CMS"}
            </button>
          </form>
        </div>

        {/* Tombol Back to Home (Kanan Atas) */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <Link 
          href="/" 
          title="Kembali ke Beranda"
          className="flex items-center justify-center w-12 h-12 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-full shadow-sm hover:scale-110 hover:shadow-md transition-all group"
        >
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-[#800000] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>

      </div>
    </div>
  );
}