import axios from 'axios';
import React, { useState } from 'react';

interface AddFormProps {
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

export const AddForm: React.FC<AddFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<IncentiveDataForm>({
    id: Date.now(),
    nik: '',
    name: '',
    jabatan: '',
    periode_awal: '',
    periode_akhir: '',
    customer: '',
    t_do_dms: '',
     t_lunas_ar: '',
    nama_unit: '',
    point: '',
    nilai_per_poin: '',
  });

  const apiUrl = 'http://localhost:3002/api/v1/main/incentive'; // Replace with your actual API URL

  const submitIncentiveData = async (data: IncentiveDataForm) => {
    try {
      const response = await axios.post(apiUrl, data);
      console.log('Data submitted successfully:', response.data);
      alert('Insentif berhasil disimpan!'); // Hardcoded success alert
    } catch (error :any) {
      console.error('Error submitting data:' );
      alert(`Gagal mengirimkan data insentif! ${error.response.data.message}`); // Hardcoded error alert
      throw new Error('Failed to submit incentive data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitIncentiveData(formData);  // Submit to API
      onClose();  // Close form after submission
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Tambah Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="max-h-[200px] overflow-y-auto mb-4">
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
                onChange={(e) => setFormData({ ...formData,  periode_awal: e.target.value })}
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Customer</label>
              <input
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Customer"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">T. Do DMS</label>
              <input
                type='date'
                value={formData.t_do_dms}
                onChange={(e) => setFormData({ ...formData, t_do_dms: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="T. Do DMS"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">T. Lunas A/R</label>
              <input
               type='date'
                value={formData. t_lunas_ar}
                onChange={(e) => setFormData({ ...formData,  t_lunas_ar: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="T. Lunas A/R"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nama Unit</label>
              <input
                value={formData.nama_unit}
                onChange={(e) => setFormData({ ...formData, nama_unit: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nama Unit"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Poin</label>
              <input
                value={formData.point}
                onChange={(e) => setFormData({ ...formData, point: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Poin"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nilai Per Poin</label>
              <input
                value={formData.nilai_per_poin}
                onChange={(e) => setFormData({ ...formData, nilai_per_poin: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nilai Per Poin"
              />
            </div>

          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mr-2 bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
