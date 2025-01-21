// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Accounts: React.FC = () => {
//   const [message, setMessage] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAdminPage = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Token tidak tersedia. Harap login terlebih dahulu.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://localhost:3002/api/v1/access/page-account-admin", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setMessage(response.data.message || "Berhasil mengakses halaman admin.");
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Terjadi kesalahan.");
//       }
//     };

//     fetchAdminPage();
//   }, []); // Hanya dijalankan sekali saat komponen dimuat

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   return <div>{message || "Memuat halaman..."}</div>;
// };

// export default Accounts;

import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { AddForm } from '../components/molecules/AddAccountForm';  // Update to AddAccountForm if needed
import { EditForm } from '../components/molecules/EditAccountForm';  // Update to EditAccountForm if needed
import { ToastService } from '../components/molecules/Toast';

export interface AccountData {
  id: number;
  name: string;
  role: string;
  email: string;
  supervisor: string; 
}
const Accounts: React.FC = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<AccountData[]>([
    { id: 1, name: 'John Doe', role: 'Developer', email: 'john@example.com', supervisor: 'Alice Johnson' },
    { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@example.com', supervisor: 'Bob Williams' },
    { id: 3, name: 'Michael Brown', role: 'Manager', email: 'michael@example.com', supervisor: 'Carol Adams' },
  ]);
  const [formVisible, setFormVisible] = useState<'add' | 'edit' | null>(null);
  const [editData, setEditData] = useState<AccountData | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAdd = () => {
    setEditData(null);
    setFormVisible('add');
  };

  const handleEdit = (item: AccountData) => {
    setEditData(item);
    setFormVisible('edit');
  };

  const handleAddSubmit = async (newData: AccountData) => {
    try {
      await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      setData((prevData) => [...prevData, newData]);
      setFormVisible(null);
      ToastService.success('Berhasil menambahkan akun!');
    } catch (error) {
      ToastService.error('Gagal menambahkan akun.');
    }
  };

  const handleEditSubmit = async (updatedData: AccountData) => {
    try {
      await fetch(`/api/accounts/${updatedData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      setData((prevData) =>
        prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
      );
      setFormVisible(null);
      ToastService.success('Berhasil mengedit akun!');
    } catch (error) {
      ToastService.error('Gagal mengedit akun.');
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="w-full h-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Daftar Akun</h1>
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

        {/* Table Container with Horizontal Scrolling */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Nama</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Jabatan</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Supervisor</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.role}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.supervisor}</td>
                  <td className="flex gap-2 border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-emerald-500 w-full text-white px-4 py-2 rounded-md hover:bg-emerald-600"
                    >
                      Edit
                    </button>
                    <button
                      // onClick={() => handleDelete(item)}
                      className="bg-rose-500 w-full text-white px-4 py-2 rounded-md hover:bg-emerald-600"
                    >
                      Delete
                    </button>
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
      {formVisible === 'edit' && editData && (
        <EditForm
          data={editData}
          onSubmit={handleEditSubmit}
          onClose={() => setFormVisible(null)}
        />
      )}
    </div>
  );
};

export default Accounts;
