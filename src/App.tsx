import { useState } from 'react';

interface FamilyMember {
  name: string;
  gender: string;
  relation: string;
}

export default function App() {
  const [formData, setFormData] = useState({
    kepalaKeluarga: '',
    anggotaKeluarga: [
      { name: '', gender: '', relation: '' },
      { name: '', gender: '', relation: '' },
      { name: '', gender: '', relation: '' },
      { name: '', gender: '', relation: '' },
    ] as FamilyMember[],
    alamat: '',
    noHp: '',
    agama: '',
    status: '',
    setuju: false,
    rt: ''
  });

  const handleMemberChange = (index: number, field: keyof FamilyMember, value: string) => {
    const newMembers = [...formData.anggotaKeluarga];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData({ ...formData, anggotaKeluarga: newMembers });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 md:p-12 print:shadow-none print:p-0">
        
        {/* Header Section */}
        <div className="flex justify-between items-center border-b-[3px] border-double border-blue-900 pb-4 mb-8 pt-4">
          <div className="w-24 md:w-32 flex-shrink-0 flex items-center justify-center pl-4 md:pl-0">
            <img src="https://drive.google.com/thumbnail?id=17G7evIeHShfqn7aSm7L1mfgjlb1hStya" alt="Logo RW" className="w-full max-h-20 md:max-h-28 object-contain" referrerPolicy="no-referrer" />
          </div>
          
          <div className="flex-1 text-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase tracking-wide">Rukun Kematian</h1>
            <h2 className="text-[17px] md:text-xl font-bold text-blue-900 mb-1">PERUM. PESONA GADING CIBITUNG RW. 015</h2>
            <p className="text-sm md:text-[15px] text-blue-900">Desa Wanajaya, Kec. Cibitung, Kab. Bekasi 17520</p>
            <p className="text-sm md:text-[15px] text-blue-900 mt-1">Telp. 0812.4754.1267 - 0878.0444.6070</p>
          </div>

          <div className="w-24 md:w-32 flex-shrink-0 flex items-center justify-center pr-4 md:pr-0">
            <img src="https://drive.google.com/thumbnail?id=1F-lVYFP7r2CD24xYJCAGVmOs0Ta6NyRJ" alt="Logo Rukun Kematian" className="w-full max-h-20 md:max-h-28 object-contain" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Form Title */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold uppercase underline">Form Data Anggota Baru</h3>
        </div>

        {/* Form Body */}
        <div className="space-y-6">
          
          {/* Kepala Keluarga */}
          <div className="flex flex-col md:flex-row md:items-start gap-2">
            <label className="md:w-64 font-medium flex justify-between">
              <span>1. Nama Kepala Keluarga</span>
              <span className="hidden md:inline">:</span>
            </label>
            <input 
              type="text" 
              className="flex-1 border-b-2 border-gray-300 focus:border-blue-700 outline-none px-2 py-1 bg-transparent"
              value={formData.kepalaKeluarga}
              onChange={(e) => setFormData({...formData, kepalaKeluarga: e.target.value})}
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Anggota Keluarga */}
          <div className="flex flex-col gap-2">
            <label className="font-medium flex justify-between">
              <span>2. Anggota Keluarga (Sesuai Kartu Keluarga)<span className="hidden md:inline ml-2">:</span></span>
            </label>
            <div className="pl-4 md:pl-8 space-y-3 mt-2">
              {formData.anggotaKeluarga.map((member, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between w-full">
                  <span className="hidden md:inline text-gray-500">•</span>
                  <input 
                    type="text" 
                    className="flex-1 w-full md:w-auto border-b border-dashed border-gray-400 focus:border-blue-500 outline-none px-2 py-1 bg-transparent"
                    placeholder={`Nama Anggota ${index + 1}`}
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm">(</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input 
                        type="radio" 
                        name={`gender-${index}`} 
                        value="L"
                        checked={member.gender === 'L'}
                        onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      /> <span className="text-sm">L</span>
                    </label>
                    <span className="text-sm">/</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input 
                        type="radio" 
                        name={`gender-${index}`} 
                        value="P"
                        checked={member.gender === 'P'}
                        onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      /> <span className="text-sm">P</span>
                    </label>
                    <span className="text-sm">)</span>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                    <span className="text-sm whitespace-nowrap">Hubungan :</span>
                    <input 
                      type="text" 
                      className="w-full md:w-32 border-b border-dashed border-gray-400 focus:border-blue-500 outline-none px-2 py-1 bg-transparent"
                      placeholder="Istri/Anak/dll"
                      value={member.relation}
                      onChange={(e) => handleMemberChange(index, 'relation', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alamat */}
           <div className="flex flex-col gap-2 pt-2">
            <label className="font-medium">
              3. Alamat Tinggal Sekarang
            </label>
            <div className="pl-4 md:pl-5">
              <textarea 
                className="w-full border-b-[1.5px] border-dashed border-gray-400 focus:border-blue-500 outline-none px-2 py-1 bg-transparent resize-none leading-loose"
                rows={2}
                value={formData.alamat}
                onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                placeholder="Blok / No. Rumah / RT / RW"
              />
            </div>
          </div>

          {/* No Hp, Agama, Status */}
          <div className="space-y-4 pt-2">
             <div className="flex flex-col md:flex-row md:items-start gap-2">
              <label className="md:w-64 font-medium flex justify-between">
                <span>4. No. Handphone</span>
                <span className="hidden md:inline">:</span>
              </label>
              <input 
                type="tel" 
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-700 outline-none px-2 py-1 bg-transparent"
                value={formData.noHp}
                onChange={(e) => setFormData({...formData, noHp: e.target.value})}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2">
              <label className="md:w-64 font-medium flex justify-between">
                <span>5. Agama</span>
                <span className="hidden md:inline">:</span>
              </label>
              <input 
                type="text" 
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-700 outline-none px-2 py-1 bg-transparent"
                value={formData.agama}
                onChange={(e) => setFormData({...formData, agama: e.target.value})}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
              <label className="md:w-64 font-medium w-full flex justify-between">
                <span>6. Status</span>
                <span className="hidden md:inline">:</span>
              </label>
              <div className="flex-1 flex gap-6 w-full items-center">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Tetap"
                      checked={formData.status === 'Tetap'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    /> <span>Tetap</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Kontrak"
                      checked={formData.status === 'Kontrak'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-4 h-4 text-blue-600"
                    /> <span>Kontrak</span>
                  </label>
              </div>
            </div>
          </div>

          {/* Biaya Administrasi */}
          <div className="flex flex-col gap-2 pt-2">
             <label className="font-medium">
              7. Biaya Administrasi
            </label>
            <div className="pl-4 md:pl-8 space-y-2">
              <div className="flex flex-col md:flex-row gap-2">
                <span className="md:w-48">a. Uang Pendaftaran</span>
                <span className="hidden md:inline">:</span>
                <span className="font-medium">Rp. 10.000</span>
              </div>
              <div className="flex flex-col md:flex-row gap-2 border-b border-black pb-2 max-w-[300px]">
                <span className="md:w-48">b. Uang Iuran Bulanan</span>
                <span className="hidden md:inline">:</span>
                <span className="font-medium">Rp. 4.000</span>
              </div>
               <div className="flex flex-col md:flex-row gap-2 pt-1 font-bold">
                <span className="md:w-48 text-center md:text-left">Jumlah</span>
                <span className="hidden md:inline">:</span>
                <span>Rp. 14.000</span>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-6">
            <p className="font-bold text-center text-sm md:text-base">
              (Uang tersebut dibayarkan saat melapor ke Pengurus RT setempat dengan melampirkan foto kopi KTP dan Kartu Keluarga)
            </p>
          </div>

          {/* Agreement */}
           <div className="mt-8 pt-6 border-t border-gray-200">
             <label className="flex items-start gap-3 cursor-pointer group">
               <div className="pt-1">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    checked={formData.setuju}
                    onChange={(e) => setFormData({...formData, setuju: e.target.checked})}
                  />
               </div>
               <span className="text-base text-gray-800 leading-relaxed group-hover:text-black">
                 Saya menyatakan bersedia untuk mematuhi peraturan yang berlaku dalam KETENTUAN UMUM Rukun Kematian RW. 015.
               </span>
             </label>
           </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-8 break-inside-avoid">
            
            <div className="flex flex-col items-start pt-6">
              <div className="flex items-center gap-2 mb-20 w-full max-w-[200px]">
                <span>Ketua RT.</span>
                <input 
                  type="text" 
                  className="w-16 border-b border-black outline-none pb-0 text-center"
                  value={formData.rt}
                  onChange={(e) => setFormData({...formData, rt: e.target.value})}
                  maxLength={3}
                />
              </div>
              <div className="w-full max-w-[200px] border-b border-black mb-1"></div>
            </div>

            <div className="flex flex-col items-start md:items-end w-full">
              <div className="mb-20 w-fit text-center">
                <p>Bekasi, ............................................</p>
                <p className="mt-1 text-center">Kepala Keluarga</p>
              </div>
              <div className="w-full max-w-[250px] border-b border-black mb-1"></div>
            </div>

          </div>

          <div className="flex flex-col items-center justify-center mt-12 w-full">
            <p className="mb-20">Mengetahui,</p>
            <div className="flex flex-col md:flex-row justify-between w-full md:px-12 gap-20">
               <div className="flex flex-col items-center">
                  <p className="mb-24">Ketua Rukun Kematian</p>
                  <p className="font-bold underline tracking-widest uppercase">USMAN</p>
               </div>
               <div className="flex flex-col items-center">
                  <p className="mb-24">Ketua RW. 015</p>
                  <p className="font-bold underline tracking-widest uppercase">WARDIYANTO</p>
               </div>
            </div>
          </div>

        </div>

        {/* Print Button (Hidden in print) */}
        <div className="mt-16 flex justify-center print:hidden">
          <button 
            onClick={() => window.print()}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2"
          >
            Cetak Formulir
          </button>
        </div>

      </div>
    </div>
  );
}
