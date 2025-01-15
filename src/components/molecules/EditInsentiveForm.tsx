import React, { useState, useEffect } from 'react';

interface EditFormProps {
  data: IncentiveDataForm;
  onSubmit: (data: IncentiveDataForm) => Promise<void>;
  onClose: () => void;
}

export interface IncentiveDataForm {
  id: number;
  nik: string;
  name: string;
  jabatan: string;
  periode_awal: string;
  periode_akhir: string;
  customer: string;
  t_do_dms: string;
  t_lunas_ar: string;
  nama_unit: string;
  point: string;
  nilai_per_poin: string;
}

export const EditForm: React.FC<EditFormProps> = ({ data, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<IncentiveDataForm>(data);

  // Fungsi untuk mendapatkan data berdasarkan ID
  const getIncentiveById = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3002/api/v1/main/incentive/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch incentive');
      }
      const fetchedData: IncentiveDataForm = await response.json();
      setFormData(fetchedData);
    } catch (error) {
      console.error('Error fetching incentive:', error);
    }
  };

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    if (data.id) {
      getIncentiveById(data.id);
    }
  }, [data.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Edit Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="max-h-[200px] overflow-y-auto mb-4">
            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">NIK</label>
              <input
                value={formData.nik}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="NIK"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nama"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Jabatan</label>
              <input
                value={formData.jabatan}
                onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Jabatan"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Periode Awal</label>
              <input
                type="date"
                value={formData.periode_awal}
                onChange={(e) => setFormData({ ...formData, periode_awal: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Periode Akhir</label>
              <input
                type="date"
                value={formData.periode_akhir}
                onChange={(e) => setFormData({ ...formData, periode_akhir: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* Add other fields similarly */}

          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
