import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { AddForm, IncentiveDataForm } from '../components/molecules/AddInsentiveForm';
import Toast from './atoms/Toasta';

export interface IncentiveData {
  id: number;
  name: string;
  supervisor: string;
  totalInsentive: number;
  promotionInsentive: number;
  status: string;
}

const MonthlyInsentive: React.FC = () => {

  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    setShowConfirm(true); // Tutup dialog
    // handleEdit(item); // Panggil fungsi edit
  };

  const handleConfirmYes = () => {
    setShowConfirm(false); // Tutup dialog
    // handleEdit(item); // Panggil fungsi edit
  };

  const [search, setSearch] = useState('');
  const [data] = useState<IncentiveData[]>([
    {
      id: 1,
      name: 'John Doe',
      supervisor: 'Jane Smith',
      totalInsentive: 500,
      promotionInsentive: 50,
      status: '✅',
    },
    // Add more data here
  ]);
  const [formVisible, setFormVisible] = useState<'add' | 'edit' | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };


  const handleAddSubmit = async (newData: IncentiveDataForm) => {
    try {
      await fetch('http://localhost:3002/api/v1/main/incentive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      setFormVisible(null);
      setToast({ message: 'Berhasil menambahkan data!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Gagal menambahkan data.', type: 'error' });
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100">
      <div className="max-w-[1100px] mx-auto p-2">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-700">Insentif Bulanan</h1>
          </div>

          <div className="flex justify-end items-center mb-4 gap-4">
            <button
              onClick={() => console.log('Download Semua Data')}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center gap-2"
            >
              <FiDownload /> Download
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari berdasarkan nama"
              value={search}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  {['Nama', 'Supervisor', 'Total Insentif', 'T. Insentif Promotion', 'Status', 'Aksi'].map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-4 py-2 text-left text-sm whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, _) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    {[item.name, item.supervisor, item.totalInsentive, item.promotionInsentive, item.status].map((value, i) => (
                      <td key={i} className="border border-gray-300 px-4 py-2 text-sm text-center">
                        {value}
                      </td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleConfirm()}
                          className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
                        >
                          Kirim
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {formVisible === 'add' && (
          <AddForm onSubmit={handleAddSubmit} onClose={() => setFormVisible(null)} />
        )}
      </div>

      {/* Toasts */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}


              {/* Dialog Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p className="text-lg mb-4">Apakah Anda yakin?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmYes}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MonthlyInsentive;
