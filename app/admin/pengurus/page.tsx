"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function AdminPengurusPage() {
  const [frames, setFrames] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- STATE FORM BINGKAI ---
  const [frameData, setFrameData] = useState({ title: "", category: "bph" });
  const [editingFrameId, setEditingFrameId] = useState<string | null>(null);
  
  // --- STATE FORM ANGGOTA ---
  const [memberData, setMemberData] = useState({ frame_id: "", name: "", role: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");

  const fetchData = async () => {
    const { data: fData } = await supabase.from('pengurus_frames').select('*').order('created_at', { ascending: true });
    const { data: mData } = await supabase.from('pengurus_members').select('*').order('created_at', { ascending: true });
    if (fData) setFrames(fData);
    if (mData) setMembers(mData);
  };

  useEffect(() => { fetchData(); }, []);

  // ==========================================
  // LOGIKA BINGKAI (FRAME)
  // ==========================================
  const handleSaveFrame = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (editingFrameId) {
      // PROSES UPDATE
      const { error } = await supabase.from('pengurus_frames').update(frameData).eq('id', editingFrameId);
      if (error) alert("Gagal update bingkai: " + error.message);
      else alert("Bingkai berhasil diupdate!");
    } else {
      // PROSES INSERT BARU
      const { error } = await supabase.from('pengurus_frames').insert([frameData]);
      if (error) alert("Gagal tambah bingkai: " + error.message);
      else alert("Bingkai berhasil dibuat!");
    }

    setIsLoading(false);
    setFrameData({ title: "", category: "bph" });
    setEditingFrameId(null);
    fetchData();
  };

  // Fungsi Pemicu Mode Edit Bingkai
  const startEditFrame = (frame: any) => {
    setEditingFrameId(frame.id);
    setFrameData({ title: frame.title, category: frame.category });
  };

  const handleDeleteFrame = async (id: string) => {
    if (!confirm("Yakin hapus bingkai ini? Semua anggota di dalamnya akan kehilangan bingkai!")) return;
    await supabase.from('pengurus_frames').delete().eq('id', id);
    fetchData();
  };

  // ==========================================
  // LOGIKA ANGGOTA (MEMBER)
  // ==========================================
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberData.frame_id) return alert("Pilih bingkai/divisi dulu!");
    
    // Wajib ada foto JIKA ini tambah baru (Bukan Edit)
    if (!editingMemberId && !selectedFile) return alert("Pilih foto anggota!");

    setIsLoading(true);
    let imageUrl = existingImageUrl;

    // Jika upload foto baru
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `pengurus/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('vistara-images').upload(filePath, selectedFile);
      
      if (uploadError) {
        alert("Gagal unggah foto: " + uploadError.message);
        setIsLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage.from('vistara-images').getPublicUrl(filePath);
      imageUrl = publicUrlData.publicUrl;
    }

    if (editingMemberId) {
      // PROSES UPDATE
      const { error: updateError } = await supabase.from('pengurus_members').update({ 
        frame_id: Number(memberData.frame_id), 
        name: memberData.name, 
        role: memberData.role, 
        image_url: imageUrl 
      }).eq('id', editingMemberId);

      if (updateError) alert("Gagal update anggota: " + updateError.message);
      else alert("Anggota berhasil diupdate!");
    } else {
      // PROSES INSERT BARU
      const { error: insertError } = await supabase.from('pengurus_members').insert([{ 
        frame_id: Number(memberData.frame_id), 
        name: memberData.name, 
        role: memberData.role, 
        image_url: imageUrl 
      }]);

      if (insertError) alert("Gagal tambah anggota: " + insertError.message);
      else alert("Anggota berhasil ditambahkan!");
    }

    setIsLoading(false);
    setMemberData({ frame_id: memberData.frame_id, name: "", role: "" });
    setSelectedFile(null);
    setEditingMemberId(null);
    setExistingImageUrl("");
    
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    
    fetchData();
  };

  // Fungsi Pemicu Mode Edit Anggota
  const startEditMember = (member: any) => {
    setEditingMemberId(member.id);
    setMemberData({ frame_id: member.frame_id.toString(), name: member.name, role: member.role });
    setExistingImageUrl(member.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll otomatis ke atas
  };

  const handleDeleteMember = async (id: string, imageUrl: string) => {
    if (!confirm("Yakin hapus anggota ini?")) return;
    await supabase.from('pengurus_members').delete().eq('id', id);
    if (imageUrl) {
      const filePath = imageUrl.split('/vistara-images/')[1];
      if (filePath) await supabase.storage.from('vistara-images').remove([filePath]);
    }
    fetchData();
  };

  // ==========================================
  // FUNGSI WARNA BADGE KATEGORI
  // ==========================================
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'pembina':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'bph':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'divisi':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // ==========================================
  // TAMPILAN UI
  // ==========================================
  return (
    <div className="animate-fade-in pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase text-slate-900 dark:text-white">Kelola Struktur Pengurus</h2>
        <p className="text-slate-500 mt-2">Atur bingkai Pembina/BPH/Divisi, lalu masukkan anggota ke dalamnya.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* KOLOM 1: KELOLA BINGKAI (FRAMES) */}
        <div className="bg-white dark:bg-[#111] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold uppercase mb-4 border-b pb-4 dark:border-gray-800">
            {editingFrameId ? "1. Edit Bingkai" : "1. Buat Bingkai (Struktur)"}
          </h3>
          <form onSubmit={handleSaveFrame} className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500">Kategori Hierarki</label>
                <select required value={frameData.category} onChange={(e) => setFrameData({...frameData, category: e.target.value})} className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white">
                  {/* Tambahan Opsi Pembina */}
                  <option value="pembina">Dewan Pembina (Puncak)</option>
                  <option value="bph">BPH Inti (Tengah)</option>
                  <option value="divisi">Divisi (Sayap Animasi)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500">Nama Bingkai</label>
                <input required type="text" placeholder="Cth: Pembina / Ketua Umum" value={frameData.title} onChange={(e) => setFrameData({...frameData, title: e.target.value})} className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={isLoading} className="flex-1 bg-[#800000] text-white py-3 rounded-xl font-bold uppercase text-xs hover:bg-[#600000]">
                {editingFrameId ? "Update Bingkai" : "Tambah Bingkai"}
              </button>
              {editingFrameId && (
                <button type="button" onClick={() => { setEditingFrameId(null); setFrameData({title: "", category: "bph"}); }} className="px-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold uppercase text-xs">
                  Batal
                </button>
              )}
            </div>
          </form>

          {/* List Bingkai */}
          <div className="space-y-2">
            {frames.map((frame) => (
              <div key={frame.id} className="flex justify-between items-center bg-slate-50 dark:bg-black p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                <div>
                  {/* Gunakan fungsi getCategoryBadge untuk mewarnai label */}
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold mr-2 ${getCategoryBadge(frame.category)}`}>
                    {frame.category}
                  </span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{frame.title}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => startEditFrame(frame)} className="text-blue-500 text-xs font-bold hover:underline">Edit</button>
                  <button onClick={() => handleDeleteFrame(frame.id)} className="text-red-500 text-xs font-bold hover:underline">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM 2: KELOLA ANGGOTA (MEMBERS) */}
        <div className="bg-white dark:bg-[#111] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold uppercase mb-4 border-b pb-4 dark:border-gray-800">
            {editingMemberId ? "2. Edit Data Anggota/Pembina" : "2. Tambah Anggota ke Bingkai"}
          </h3>
          <form onSubmit={handleSaveMember} className="space-y-4 mb-8">
            <div>
              <label className="text-xs font-bold uppercase text-gray-500">Pilih Bingkai Tujuannya</label>
              <select required value={memberData.frame_id} onChange={(e) => setMemberData({...memberData, frame_id: e.target.value})} className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white">
                <option value="" disabled>-- Pilih Bingkai --</option>
                {frames.map((f) => <option key={f.id} value={f.id}>{f.title} ({f.category})</option>)}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500">Nama Lengkap</label>
                <input required type="text" placeholder="Bapak Dr. John Doe" value={memberData.name} onChange={(e) => setMemberData({...memberData, name: e.target.value})} className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500">Jabatan Khusus</label>
                <input required type="text" placeholder="Cth: Dosen Pembina" value={memberData.role} onChange={(e) => setMemberData({...memberData, role: e.target.value})} className="w-full mt-1 bg-slate-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">
                Foto (Rasio 3:4 / Potrait) {editingMemberId && <span className="text-blue-500 font-normal normal-case">- Opsional jika tidak diganti</span>}
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={(e) => { if (e.target.files) setSelectedFile(e.target.files[0]); }} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#800000]/10 file:text-[#800000] cursor-pointer" />
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={isLoading} className="flex-1 bg-[#800000] text-white py-3 rounded-xl font-bold uppercase text-xs hover:bg-[#600000]">
                {editingMemberId ? "Update Data" : "Simpan Data"}
              </button>
              {editingMemberId && (
                <button type="button" onClick={() => { 
                  setEditingMemberId(null); 
                  setMemberData({frame_id: memberData.frame_id, name: "", role: ""}); 
                  setExistingImageUrl(""); 
                  const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                  if (fileInput) fileInput.value = "";
                }} className="px-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold uppercase text-xs">
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

      </div>

      {/* DAFTAR SELURUH ANGGOTA (DI BAWAH) */}
      <div className="mt-8 bg-white dark:bg-[#111] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-bold uppercase mb-4 border-b pb-4 dark:border-gray-800">Daftar Data Tersimpan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-black text-gray-500">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Foto & Nama</th>
                <th className="px-4 py-3">Jabatan</th>
                <th className="px-4 py-3">Masuk di Bingkai</th>
                <th className="px-4 py-3 rounded-r-xl">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const parentFrame = frames.find(f => f.id === member.frame_id);
                return (
                  <tr key={member.id} className="border-b dark:border-gray-800">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={member.image_url} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                      <span className="font-bold text-slate-900 dark:text-white">{member.name}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-gray-300">{member.role}</td>
                    <td className="px-4 py-3 text-xs font-bold text-[#800000] dark:text-[#ff4d4d]">
                      {parentFrame ? `${parentFrame.title} (${parentFrame.category})` : "Bingkai Terhapus"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button onClick={() => startEditMember(member)} className="text-blue-500 text-xs font-bold hover:underline">Edit</button>
                        <button onClick={() => handleDeleteMember(member.id, member.image_url)} className="text-red-500 text-xs font-bold hover:underline">Hapus</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}