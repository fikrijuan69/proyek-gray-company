import React, { useState } from 'react';
import { AccountData } from '../../pages/Accounts';

interface AddFormProps {
  onSubmit: (data: AccountData) => void;
  onClose: () => void;
}

export const AddForm: React.FC<AddFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<AccountData>({
    id: Date.now(),
    name: '',
    role: '',
    email: '',
    supervisor: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center h-full justify-center z-20">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Tambah Akun</h2>
        <form  onSubmit={handleSubmit}>
          <div className='max-h-[200px] overflow-y-auto'>
            <div className="mb-4 ">
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
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Jabatan"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Supervisor</label>
              <input
                value={formData.supervisor}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Supervisor"
              />
            </div>
 
          </div>
            <div className="flex justify-between pt-4">
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
