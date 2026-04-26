import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import "./globals.css"; // Pastikan Tailwind di-import di sini

export const metadata: Metadata = {
  title: "Vistara | Membangun Masa Depan Bersama",
  description: "Company Profile Vistara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 transition-colors duration-500 selection:bg-[#800000] selection:text-white">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}