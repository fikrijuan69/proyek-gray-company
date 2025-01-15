import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { AddForm, IncentiveDataForm } from '../components/molecules/AddInsentiveForm';
import { EditForm } from '../components/molecules/EditInsentiveForm';
import { ToastService } from '../components/molecules/Toast';

export interface IncentiveData {
  id: number;
  nik: string;
  nama: string;
  jabatan: string;
  periode_awal: string;
  periode_akhir: string;
  customer: string;
  t_do_dms: string;
   t_lunas_ar: string;
  nama_unit: string;
  poin: number;
  nilai_per_poin: number;
}
const InsentiveHistory: React.FC = () => {
  const [data, setData] = useState<IncentiveData[]>([]);  // Store fetched data

  const [formVisible, setFormVisible] = useState<'add' | 'edit' | null>(null);
  const [editData, setEditData] = useState<IncentiveDataForm | null>(null);  // Changed from IncentiveDataForm to IncentiveData

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchIncentives = async () => {
      try {
        // Get the token from local storage (or other methods like global state)
        const token = localStorage.getItem('auth_token');
        
        const response = await fetch('http://localhost:3002/api/v1/main/incentive/a/duh', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Optional, depending on API requirements
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch incentives');
        }
    
        const incentives = await response.json();
        
        console.log(incentives.data);

        console.log("lol");
        // Ensure the "data" field is accessed from the response
        setData(incentives.data);  // Set fetched data to state
      } catch (error) {
        ToastService.error('Gagal mengambil data insentif.');
      }
    };
    

    fetchIncentives();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setFormVisible('add');
  };

  const handleEdit = (item: IncentiveDataForm) => {
    setEditData(item);  // Set the data to be edited
    setFormVisible('edit');  // Make the edit form visible
  };

  const handleAddSubmit = async (newData: IncentiveDataForm) => {
    try {
      await fetch('/api/incentives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      setFormVisible(null);
      ToastService.success('Berhasil menambahkan data!');
    } catch (error) {
      ToastService.error('Gagal menambahkan data.');
    }
  };

  const handleEditSubmit = async (updatedData: IncentiveDataForm) => {
    try {
      await fetch(`/api/incentives/${updatedData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      setFormVisible(null);
      ToastService.success('Berhasil mengedit data!');
    } catch (error) {
      ToastService.error('Gagal mengedit data.');
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-[1100px] mx-auto p-2">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-700">Catatan Insentif</h1>
          </div>

          <div className="flex justify-end items-center mb-4 gap-4">
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Tambah
            </button>
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
                  {[
                    'No', 'NIK', 'Nama', 'Jabatan', 'Periode Awal',
                    'Periode Akhir', 'Customer', 'T. Do DMS',
                    'T. Lunas A/R', 'Nama Unit', 'Poin',
                    'Nilai Per Poin', 'Jumlah Insentif', 'Aksi',
                  ].map((header) => (
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
                {data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    {[
  index + 1, 
  item.nik, 
  item.nama, 
  item.jabatan, 
  new Date(item.periode_awal).toLocaleDateString(), // Convert to readable date
  new Date(item.periode_akhir).toLocaleDateString(), // Convert to readable date
  item.customer, 
  new Date( item.t_do_dms).toLocaleDateString(), // Convert to readable date
  new Date( item.t_lunas_ar).toLocaleDateString(), // Convert to readable dat
, 
  item.nama_unit, 
  item.poin,
  item.nilai_per_poin, 
  item.poin * item.nilai_per_poin
                    ].map((value, i) => (
                      <td key={i} className="border border-gray-300 px-4 py-2 text-sm text-center">
                        {value}
                      </td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2 text-sm text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleEdit(item as any)}
                          className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
                        >
                          Edit
                        </button>
                        <button
                          // onClick={() => handleDelete(item)}
                          className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan={14}
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
        {formVisible === 'edit' && editData && (
          <EditForm
            data={editData}
            onSubmit={handleEditSubmit}
            onClose={() => setFormVisible(null)}
          />
        )}
      </div>
    </div>
  );
};

export default InsentiveHistory;
