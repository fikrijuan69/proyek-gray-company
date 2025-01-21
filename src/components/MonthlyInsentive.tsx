import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { AddForm, IncentiveDataForm } from '../components/molecules/AddInsentiveForm';
import Toast from './atoms/Toasta';

export interface IncentiveDataResponse {
  result: IncentiveData[];
}


export interface IncentiveData {
  nama: string | null;
  supervisor: string | null | undefined;
  totalInsentif: number;
  tInsentifPromotion: number;
  status: string | null;
}

const MonthlyInsentive: React.FC = () => {
  const [data, setData] = useState<IncentiveData[]>([]);
  const [formVisible, setFormVisible] = useState<'add' | 'edit' | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/v1/main/incentive');
        let result: IncentiveDataResponse = await response.json();
        setData(result.result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setToast({ message: 'Gagal memuat data insentif.', type: 'error' });
      }
    };
    fetchData();
  }, []);

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

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    setShowConfirm(false);
  };

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

          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  {['Nama', 'Supervisor', 'Total Insentif', 'Status', 'Aksi'].map((header) => (
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
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{item.nama || '-'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{item.supervisor || '-'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">{item.totalInsentif}</td>
<td className="border border-gray-300 px-4 py-2 text-sm text-center">
  {item.status === "accepted" ? '✅' : '❌'}
</td>
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
                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
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
