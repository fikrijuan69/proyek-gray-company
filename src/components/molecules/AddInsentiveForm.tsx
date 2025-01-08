import React, { useState } from 'react';

interface AddFormProps {
  onSubmit: (data: IncentiveDataForm) => Promise<void>;
  onClose: () => void;
}


export interface IncentiveDataForm {
  id: number;
  nik: string;
  name: string;
  position: string;
  startPeriod: string;
  endPeriod: string;
  customer: string;
  tDoDms: string;
  tLunasAr: string;
  unitName: string;
  points: string;
  valuePerPoint: string;
  totalIncentive: string;
}


export const AddForm: React.FC<AddFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<IncentiveDataForm>({
    id: Date.now(),
    nik: '',
    name: '',
    position: '',
    startPeriod: '',
    endPeriod: '',
    customer: '',
    tDoDms: '',
    tLunasAr: '',
    unitName: '',
    points: '',
    valuePerPoint: '',
    totalIncentive: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Jabatan"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Periode Awal</label>
          <input
            type="date"
            value={formData.startPeriod}
            onChange={(e) => setFormData({ ...formData, startPeriod: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Periode Akhir</label>
          <input
            type="date"
            value={formData.endPeriod}
            onChange={(e) => setFormData({ ...formData, endPeriod: e.target.value })}
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
            value={formData.tDoDms}
            onChange={(e) => setFormData({ ...formData, tDoDms: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="T. Do DMS"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">T. Lunas A/R</label>
          <input
            value={formData.tLunasAr}
            onChange={(e) => setFormData({ ...formData, tLunasAr: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="T. Lunas A/R"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Unit</label>
          <input
            value={formData.unitName}
            onChange={(e) => setFormData({ ...formData, unitName: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nama Unit"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Poin</label>
          <input
            value={formData.points}
            onChange={(e) => setFormData({ ...formData, points: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Poin"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nilai Per Poin</label>
          <input
            value={formData.valuePerPoint}
            onChange={(e) => setFormData({ ...formData, valuePerPoint: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nilai Per Poin"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Total Insentif</label>
          <input
            value={formData.totalIncentive}
            onChange={(e) => setFormData({ ...formData, totalIncentive: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Total Insentif"
          />
        </div>
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
