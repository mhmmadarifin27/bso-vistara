"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk form & upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null); // State penanda mode edit
  const [existingImageUrl, setExistingImageUrl] = useState<string>(""); // Menyimpan URL gambar lama saat diedit

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    description: "", // State deskripsi ini yang akan kita isi di form
    is_upcoming: false,
  });

  // --- FUNGSI READ (MENGAMBIL DATA) ---
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
    
    if (data) setEvents(data);
    if (error) console.error("Error fetching events:", error);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // --- FUNGSI CREATE & UPDATE (SIMPAN / EDIT) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = existingImageUrl; // Default pakai gambar lama

    // JIKA ADA FILE GAMBAR BARU YANG DIUPLOAD
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `dokumentasi/${fileName}`; 

      const { error: uploadError } = await supabase.storage
        .from('vistara-images') 
        .upload(filePath, selectedFile);

      if (uploadError) {
        alert("Gagal mengunggah gambar: " + uploadError.message);
        setIsLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('vistara-images')
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;

      // Opsional: Hapus gambar lama dari storage jika sedang mode edit dan mengganti gambar
      if (editingId && existingImageUrl) {
        const oldFilePath = existingImageUrl.split('/vistara-images/')[1];
        if (oldFilePath) {
          await supabase.storage.from('vistara-images').remove([oldFilePath]);
        }
      }
    } else if (!editingId) {
      // Jika tambah data baru tapi tidak pilih gambar
      alert("Mohon pilih gambar terlebih dahulu!");
      setIsLoading(false);
      return;
    }

    if (editingId) {
      // PROSES UPDATE DATA KE SUPABASE
      const { error: updateError } = await supabase
        .from('events')
        .update({ ...formData, image_url: imageUrl })
        .eq('id', editingId);

      if (updateError) alert("Gagal update data: " + updateError.message);
      else alert("Data berhasil diupdate!");

    } else {
      // PROSES INSERT DATA BARU KE SUPABASE
      const { error: insertError } = await supabase
        .from('events')
        .insert([{ ...formData, image_url: imageUrl }]);

      if (insertError) alert("Gagal menambahkan data: " + insertError.message);
      else alert("Dokumentasi berhasil ditambahkan!");
    }

    setIsLoading(false);
    resetForm();
    fetchEvents();
  };

  // --- FUNGSI DELETE (HAPUS DATA & GAMBAR) ---
  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Yakin ingin menghapus event ini? Data dan gambar tidak bisa dikembalikan.")) return;

    // 1. Hapus data dari tabel
    const { error: deleteError } = await supabase.from('events').delete().eq('id', id);
    
    if (deleteError) {
      alert("Gagal menghapus data: " + deleteError.message);
      return;
    }

    // 2. Hapus gambar dari storage
    if (imageUrl) {
      const filePath = imageUrl.split('/vistara-images/')[1]; 
      if (filePath) {
        await supabase.storage.from('vistara-images').remove([filePath]);
      }
    }

    fetchEvents();
  };

  // --- FUNGSI PERSIAPAN EDIT (MENGISI FORM) ---
  const handleEdit = (event: any) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location || "",
      category: event.category || "",
      description: event.description || "",
      is_upcoming: event.is_upcoming,
    });
    setExistingImageUrl(event.image_url);
    setSelectedFile(null); // Kosongkan file pilihan agar tidak menimpa jika tidak diganti
    
    // Scroll ke form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- FUNGSI RESET FORM ---
  const resetForm = () => {
    setEditingId(null);
    setExistingImageUrl("");
    setFormData({ title: "", date: "", location: "", category: "", description: "", is_upcoming: false });
    setSelectedFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase text-slate-900 dark:text-white">Kelola Events & Dokumentasi</h2>
        <p className="text-slate-500 mt-2">Tambah, edit, dan hapus kegiatan organisasi di sini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI: FORM TAMBAH/EDIT DATA */}
        <div className="lg:col-span-1 bg-white dark:bg-[#111] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm relative">
          {editingId && (
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-[2rem] uppercase tracking-widest">
              Mode Edit
            </div>
          )}
          <h3 className="text-lg font-bold uppercase mb-6 border-b pb-4 dark:border-gray-800">
            {editingId ? "Edit Kegiatan" : "Tambah Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input File Gambar */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                {editingId ? "Ganti Gambar (Opsional)" : "Upload Gambar"}
              </label>
              {editingId && existingImageUrl && !selectedFile && (
                <div className="mb-2 w-full h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img src={existingImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input 
                id="file-upload"
                required={!editingId} // Tidak wajib diisi jika sedang mode edit
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }} 
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#800000]/10 file:text-[#800000] hover:file:bg-[#800000]/20 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-500">Judul Kegiatan</label>
              <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500">Tanggal</label>
                <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500">Kategori</label>
                <input required type="text" placeholder="Seminar, Baksos..." value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
              </div>
            </div>

            {/* INPUT DESKRIPSI DITAMBAHKAN DI SINI */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500">Deskripsi / Detail Acara</label>
              <textarea 
                required 
                rows={4} 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                placeholder="Tulis detail lengkap kegiatannya di sini..."
                className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white resize-none" 
              />
            </div>
            {/* AKHIR INPUT DESKRIPSI */}
            
            <label className="flex items-center gap-2 mt-4 cursor-pointer">
              <input type="checkbox" checked={formData.is_upcoming} onChange={(e) => setFormData({...formData, is_upcoming: e.target.checked})} className="w-4 h-4 accent-[#800000]" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Tandai sebagai "Event Mendatang"</span>
            </label>
            
            <div className="flex gap-2 mt-6">
              <button type="submit" disabled={isLoading} className="flex-1 bg-[#800000] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#600000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? "Memproses..." : editingId ? "Update Data" : "Simpan & Upload"}
              </button>
              
              {editingId && (
                <button type="button" onClick={resetForm} className="bg-slate-200 dark:bg-gray-800 text-slate-900 dark:text-white px-4 rounded-xl font-bold uppercase text-xs hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors">
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* KOLOM KANAN: LIST DATA */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold uppercase mb-6 border-b pb-4 dark:border-gray-800">Daftar Dokumentasi</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-black text-gray-500">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Gambar</th>
                  <th className="px-4 py-3">Judul</th>
                  <th className="px-4 py-3">Tanggal & Status</th>
                  <th className="px-4 py-3 rounded-r-xl text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                   <tr><td colSpan={4} className="text-center py-8 text-gray-500">Belum ada data event.</td></tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="border-b dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-[#1a1a1a]">
                      <td className="px-4 py-3">
                        <img src={event.image_url} alt="img" className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-800" />
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{event.title}</td>
                      <td className="px-4 py-3">
                        <div className="text-slate-600 dark:text-gray-400 mb-1">{event.date}</div>
                        {event.is_upcoming ? 
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Upcoming</span> : 
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Arsip</span>
                        }
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(event)}
                            className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                            title="Edit Data"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(event.id, event.image_url)}
                            className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                            title="Hapus Data"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}