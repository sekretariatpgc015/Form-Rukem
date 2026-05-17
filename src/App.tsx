import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

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

  const [showPrintWarning, setShowPrintWarning] = useState(false);

  const handleMemberChange = (index: number, field: keyof FamilyMember, value: string) => {
    const newMembers = [...formData.anggotaKeluarga];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData({ ...formData, anggotaKeluarga: newMembers });
  };

  const handlePrint = () => {
    // Check if app is running inside an iframe
    if (window.self !== window.top) {
      setShowPrintWarning(true);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans print:bg-white print:py-0 print:px-0">
      
      {/* Print Warning Modal */}
      {showPrintWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 print:hidden">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowPrintWarning(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Buka di Tab Baru</h3>
              <p className="text-gray-600 mb-6">
                Sistem pratinjau (preview) cetak diblokir saat berada di dalam penyunting pratinjau ini.
                <br /><br />
                Silakan buka aplikasi di <strong>tab baru</strong> dengan mengklik ikon panah (buka di tab baru) di pojok kanan atas, kemudian tekan kembali tombol Cetak Formulir.
              </p>
              <button
                 onClick={() => {
                  setShowPrintWarning(false);
                 }}
                 className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 md:p-12 print:shadow-none print:p-0 print:max-w-none">
        
        {/* Header Section */}
        <div className="flex justify-between items-center border-b-[3px] border-double border-blue-900 pb-4 mb-8 pt-4 print:pb-1 print:mb-2 print:pt-0">
          <div className="w-24 md:w-32 flex-shrink-0 flex items-center justify-center pl-4 md:pl-0">
            <img src="https://drive.google.com/thumbnail?id=17G7evIeHShfqn7aSm7L1mfgjlb1hStya" alt="Logo RW" className="w-full max-h-20 md:max-h-28 print:max-h-16 object-contain" referrerPolicy="no-referrer" />
          </div>
          
          <div className="flex-1 text-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase tracking-wide print:text-xl print:leading-tight">Rukun Kematian</h1>
            <h2 className="text-[17px] md:text-xl font-bold text-blue-900 mb-1 print:text-[14px] print:mb-0 print:leading-tight">PERUM. PESONA GADING CIBITUNG RW. 015</h2>
            <p className="text-sm md:text-[15px] text-blue-900 print:text-[11px] print:leading-tight">Desa Wanajaya, Kec. Cibitung, Kab. Bekasi 17520</p>
            <p className="text-sm md:text-[15px] text-blue-900 mt-1 print:text-[11px] print:mt-0 print:leading-tight">Telp. 0812.4754.1267 - 0878.0444.6070</p>
          </div>

          <div className="w-24 md:w-32 flex-shrink-0 flex items-center justify-center pr-4 md:pr-0">
            <img src="https://drive.google.com/thumbnail?id=1F-lVYFP7r2CD24xYJCAGVmOs0Ta6NyRJ" alt="Logo Rukun Kematian" className="w-full max-h-20 md:max-h-28 print:max-h-16 object-contain" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Form Title */}
        <div className="text-center mb-8 print:mb-2">
          <h3 className="text-xl font-bold uppercase underline print:text-base">Form Data Anggota Baru</h3>
        </div>

        {/* Form Body */}
        <div className="space-y-6 print:space-y-1.5 print:[&_label]:text-[12px] print:[&_input]:text-[12px] print:text-[12px]">
          
          {/* Kepala Keluarga */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 print:flex-row print:items-center">
            <label className="md:w-64 print:w-48 font-medium flex justify-between">
              <span>1. Nama Kepala Keluarga</span>
              <span className="hidden md:inline print:inline">:</span>
            </label>
            <input 
              type="text" 
              className="flex-1 border-b-2 border-gray-300 focus:border-blue-700 outline-none px-2 py-1 bg-transparent print:py-0"
              value={formData.kepalaKeluarga}
              onChange={(e) => setFormData({...formData, kepalaKeluarga: e.target.value})}
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Anggota Keluarga */}
          <div className="flex flex-col gap-2">
            <label className="font-medium flex justify-between">
              <span>2. Anggota Keluarga (Sesuai Kartu Keluarga)<span className="hidden md:inline print:inline ml-2">:</span></span>
            </label>
            <div className="pl-4 md:pl-8 space-y-3 mt-2 print:mt-1 print:space-y-1">
              {formData.anggotaKeluarga.map((member, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between w-full print:flex-row print:gap-2">
                  <span className="hidden md:inline print:inline text-gray-500">•</span>
                  <input 
                    type="text" 
                    className="flex-1 w-full md:w-auto print:w-auto border-b border-dashed border-gray-400 focus:border-blue-500 outline-none px-2 py-1 bg-transparent print:py-0"
                    placeholder={`Nama Anggota ${index + 1}`}
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm print:text-xs">(</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input 
                        type="radio" 
                        name={`gender-${index}`} 
                        value="L"
                        checked={member.gender === 'L'}
                        onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                        className="w-4 h-4 text-blue-600 print:w-3 print:h-3"
                      /> <span className="text-sm print:text-xs">L</span>
                    </label>
                    <span className="text-sm print:text-xs">/</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input 
                        type="radio" 
                        name={`gender-${index}`} 
                        value="P"
                        checked={member.gender === 'P'}
                        onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                        className="w-4 h-4 text-blue-600 print:w-3 print:h-3"
                      /> <span className="text-sm print:text-xs">P</span>
                    </label>
                    <span className="text-sm print:text-xs">)</span>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0 print:w-auto print:mt-0">
                    <span className="text-sm whitespace-nowrap print:text-xs">Hubungan :</span>
                    <input 
                      type="text" 
                      className="w-full md:w-32 print:w-32 border-b border-dashed border-gray-400 focus:border-blue-500 outline-none px-2 py-1 bg-transparent print:py-0"
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
           <div className="flex flex-col gap-2 pt-2 print:pt-0">
            <label className="font-medium">
              3. Alamat Tinggal Sekarang
            </label>
            <div className="pl-4 md:pl-5">
              <textarea 
                className="w-full border-b-[1.5px] border-dashed border-gray-400 focus:border-blue-500 outline-none px-2 py-1 bg-transparent resize-none leading-loose print:leading-normal print:py-0 print:min-h-[40px] print:text-[13px]"
                rows={2}
                value={formData.alamat}
                onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                placeholder="Blok / No. Rumah / RT / RW"
              />
            </div>
          </div>

          {/* No Hp, Agama, Status */}
          <div className="space-y-4 pt-2 print:space-y-1 print:pt-1">
             <div className="flex flex-col md:flex-row md:items-start gap-2 print:flex-row print:items-center">
              <label className="md:w-64 print:w-48 font-medium flex justify-between">
                <span>4. No. Handphone</span>
                <span className="hidden md:inline print:inline">:</span>
              </label>
              <input 
                type="tel" 
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-700 outline-none px-2 py-1 bg-transparent print:py-0"
                value={formData.noHp}
                onChange={(e) => setFormData({...formData, noHp: e.target.value})}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-2 print:flex-row print:items-center">
              <label className="md:w-64 print:w-48 font-medium flex justify-between">
                <span>5. Agama</span>
                <span className="hidden md:inline print:inline">:</span>
              </label>
              <input 
                type="text" 
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-700 outline-none px-2 py-1 bg-transparent print:py-0"
                value={formData.agama}
                onChange={(e) => setFormData({...formData, agama: e.target.value})}
              />
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 print:flex-row print:items-center">
              <label className="md:w-64 print:w-48 font-medium w-full print:w-48 flex justify-between">
                <span>6. Status</span>
                <span className="hidden md:inline print:inline">:</span>
              </label>
              <div className="flex-1 flex gap-6 w-full print:w-auto items-center">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Tetap"
                      checked={formData.status === 'Tetap'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-4 h-4 text-blue-600 print:w-3 print:h-3"
                    /> <span>Tetap</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Kontrak"
                      checked={formData.status === 'Kontrak'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-4 h-4 text-blue-600 print:w-3 print:h-3"
                    /> <span>Kontrak</span>
                  </label>
              </div>
            </div>
          </div>

          {/* Biaya Administrasi */}
          <div className="flex flex-col gap-2 pt-2 print:pt-1">
             <label className="font-medium">
              7. Biaya Administrasi
            </label>
            <div className="pl-4 md:pl-8 space-y-2 print:space-y-0.5">
              <div className="flex flex-col md:flex-row gap-2 print:flex-row print:items-center">
                <span className="md:w-48 print:w-40">a. Uang Pendaftaran</span>
                <span className="hidden md:inline print:inline">:</span>
                <span className="font-medium">Rp. 10.000</span>
              </div>
              <div className="flex flex-col md:flex-row gap-2 border-b border-black pb-2 max-w-[300px] print:flex-row print:items-center print:pb-1">
                <span className="md:w-48 print:w-40">b. Uang Iuran Bulanan</span>
                <span className="hidden md:inline print:inline">:</span>
                <span className="font-medium">Rp. 4.000</span>
              </div>
               <div className="flex flex-col md:flex-row gap-2 pt-1 font-bold print:flex-row print:items-center print:pt-0">
                <span className="md:w-48 print:w-40 text-center md:text-left print:text-left">Jumlah</span>
                <span className="hidden md:inline print:inline">:</span>
                <span>Rp. 14.000</span>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-6 print:mt-1 print:p-1.5">
            <p className="font-bold text-center text-sm md:text-base print:text-[11px] print:leading-snug">
              (Uang tersebut dibayarkan saat melapor ke Pengurus RT setempat dengan melampirkan foto kopi KTP dan Kartu Keluarga)
            </p>
          </div>

          {/* Agreement */}
           <div className="mt-8 pt-6 border-t border-gray-200 print:mt-1 print:pt-1">
             <label className="flex items-start gap-3 cursor-pointer group">
               <div className="pt-1 print:pt-0">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer print:w-4 print:h-4"
                    checked={formData.setuju}
                    onChange={(e) => setFormData({...formData, setuju: e.target.checked})}
                  />
               </div>
               <span className="text-base text-gray-800 leading-relaxed group-hover:text-black print:text-[11px] print:leading-tight">
                 Saya menyatakan bersedia untuk mematuhi peraturan yang berlaku dalam KETENTUAN UMUM Rukun Kematian RW. 015.
               </span>
             </label>
           </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 print:mt-2 pt-8 print:pt-0 break-inside-avoid print:text-[11px] print:gap-12 print:grid-cols-2">
            
            <div className="flex flex-col items-start pt-6 print:pt-0">
              <div className="flex items-center gap-2 mb-20 print:mb-10 w-full max-w-[200px]">
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

            <div className="flex flex-col items-start md:items-end print:items-end w-full">
              <div className="mb-20 print:mb-10 w-fit text-center">
                <p>Bekasi, ............................................</p>
                <p className="mt-1 text-center">Kepala Keluarga</p>
              </div>
              <div className="w-full max-w-[250px] border-b border-black mb-1 print:max-w-[200px]"></div>
            </div>

          </div>

          <div className="flex flex-col items-center justify-center mt-12 print:mt-2 w-full break-inside-avoid print:text-[11px]">
            <p className="mb-20 print:mb-1">Mengetahui,</p>
            <div className="flex flex-col md:flex-row justify-between w-full md:px-12 gap-20 print:flex-row print:px-12 print:gap-12 w-full">
               <div className="flex flex-col items-center">
                  <p className="mb-24 print:mb-12">Ketua Rukun Kematian</p>
                  <p className="font-bold underline tracking-widest uppercase print:text-[12px]">USMAN</p>
               </div>
               <div className="flex flex-col items-center">
                  <p className="mb-24 print:mb-12">Ketua RW. 015</p>
                  <p className="font-bold underline tracking-widest uppercase print:text-[12px]">WARDIYANTO</p>
               </div>
            </div>
          </div>

        </div>

        {/* Print Button (Hidden in print) */}
        <div className="mt-16 flex justify-center print:hidden">
          <button 
            onClick={handlePrint}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2"
          >
            Cetak Formulir
          </button>
        </div>

      </div>
    </div>
  );
}
