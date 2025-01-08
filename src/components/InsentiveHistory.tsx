import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { AddForm, IncentiveDataForm } from '../components/molecules/AddInsentiveForm';
import { EditForm } from '../components/molecules/EditInsentiveForm';
import { ToastService } from '../components/molecules/Toast';

export interface IncentiveData {
  id: number;
  nik: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  customer: string;
  dmsTarget: number;
  arPaidTarget: number;
  unitName: string;
  points: number;
  valuePerPoint: number;
  accumulativeIncentive: number;
  contestIncentive: number | null;
  SBIIncentive: number | null;
}

const InsentiveHistory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [data] = useState<IncentiveData[]>([
    {
      id: 1,
      nik: '123456',
      name: 'John Doe',
      role: 'Developer',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      customer: 'Customer A',
      dmsTarget: 100,
      arPaidTarget: 95,
      unitName: 'Unit 1',
      points: 10,
      valuePerPoint: 50,
      accumulativeIncentive: 500,
      contestIncentive : 100,
      SBIIncentive : 100,
    },
    // Tambahkan data lainnya
  ]);

  const [formVisible, setFormVisible] = useState<'add' | 'edit' | null>(null);
  const [editData, setEditData] = useState<IncentiveDataForm | null>(null);  // Changed from IncentiveDataForm to IncentiveData

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" bg-gray-100">
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
                  {[
                    'No', 'NIK', 'Nama', 'Jabatan', 'Periode Awal',
                    'Periode Akhir', 'Customer', 'T. Do DMS',
                    'T. Lunas A/R', 'Nama Unit', 'Poin',
                    'Nilai Per Poin', 'Jumlah Insentif', 'Contest Insentif', 'SBI Insentif', 'Aksi',
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
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    {[index + 1, item.nik, item.name, item.role, item.startDate, item.endDate, item.customer, item.dmsTarget, item.arPaidTarget, item.unitName, item.points, item.valuePerPoint, item.accumulativeIncentive, item.contestIncentive, item.SBIIncentive].map((value, i) => (
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
                {filteredData.length === 0 && (
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