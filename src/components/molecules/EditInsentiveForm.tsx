import React, { useState, useEffect } from 'react';

interface EditFormProps {
  data: IncentiveDataForm;
  onClose: () => void; // Prop untuk menutup form
}

export interface IncentiveDataForm {
  id: string;
  nik: string;
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

export const EditForm: React.FC<EditFormProps> = ({ data, onClose }) => {
  const [formData, setFormData] = useState<IncentiveDataForm | null>(null);
  const [initialData, setInitialData] = useState<IncentiveDataForm | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 

        console.log(data);
        const response = await fetch(`http://localhost:3002/api/v1/main/incentive/${data.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch incentive data');
        }
        const fetchedData: IncentiveDataForm = await response.json();
        setInitialData(fetchedData);
        setFormData(fetchedData);
      } catch (error) {
        console.error('Error fetching incentive data:', error);
      }
    };

    if (data.id) fetchData();
  }, [data.id]);

  const getModifiedFields = () => {
    if (!formData || !initialData) return {};

    const modifiedFields: Partial<IncentiveDataForm> = {};

    for (const key in formData) {
      if (formData[key as keyof IncentiveDataForm] !== initialData[key as keyof IncentiveDataForm]) {
        modifiedFields[key as keyof IncentiveDataForm] = formData[key as keyof IncentiveDataForm];
      }
    }

    return modifiedFields;
  };

  const handleInputChange = (key: keyof IncentiveDataForm, value: string | number) => {
    if (!formData) return;
    setFormData((prev) => prev && { ...prev, [key]: typeof prev[key] === 'number' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const updatedData = getModifiedFields();

    try {

      const sales_id = localStorage.getItem('sales_id')

      console.log(sales_id);

      const response = await fetch(`http://localhost:3002/api/v1/main/incentive/${sales_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      console.log('Data updated successfully');
      alert("Data updated successfully !")

      onClose(); // Tutup form setelah data berhasil diupdate
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Edit Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="max-h-[300px] overflow-y-auto mb-4">
            {/* NIK */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">NIK</label>
              <input
                type="text"
                value={formData.nik}
                onChange={(e) => handleInputChange('nik', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="NIK"
              />
            </div>


            {/* Jabatan */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Jabatan</label>
              <input
                type="text"
                value={formData.jabatan}
                onChange={(e) => handleInputChange('jabatan', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Jabatan"
              />
            </div>

            {/* Periode Awal */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Periode Awal</label>
              <input
                type="date"
                value={formData.periode_awal}
                onChange={(e) => handleInputChange('periode_awal', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Periode Akhir */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Periode Akhir</label>
              <input
                type="date"
                value={formData.periode_akhir}
                onChange={(e) => handleInputChange('periode_akhir', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Customer */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Customer</label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) => handleInputChange('customer', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Customer"
              />
            </div>

            {/* T DO DMS */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">T DO DMS</label>
              <input
                type="text"
                value={formData.t_do_dms}
                onChange={(e) => handleInputChange('t_do_dms', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="T DO DMS"
              />
            </div>

            {/* T Lunas AR */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">T Lunas AR</label>
              <input
                type="text"
                value={formData.t_lunas_ar}
                onChange={(e) => handleInputChange('t_lunas_ar', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="T Lunas AR"
              />
            </div>

            {/* Nama Unit */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nama Unit</label>
              <input
                type="text"
                value={formData.nama_unit}
                onChange={(e) => handleInputChange('nama_unit', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nama Unit"
              />
            </div>

            {/* Poin */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Poin</label>
              <input
                type="number"
                value={formData.poin}
                onChange={(e) => handleInputChange('poin', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Poin"
              />
            </div>

            {/* Nilai Per Poin */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nilai Per Poin</label>
              <input
                type="number"
                value={formData.nilai_per_poin}
                onChange={(e) => handleInputChange('nilai_per_poin', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nilai Per Poin"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};