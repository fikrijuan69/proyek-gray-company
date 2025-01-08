import React, { useState } from 'react';

interface Notification {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
}

const Notifications: React.FC = () => {
  const [data] = useState<Notification[]>([
    { id: 1, judul: 'Notifikasi 1', deskripsi: 'Deskripsi notifikasi 1', tanggal: '2024-12-31' },
    { id: 2, judul: 'Notifikasi 2', deskripsi: 'Deskripsi notifikasi 2', tanggal: '2024-12-30' },
    { id: 3, judul: 'Notifikasi 3', deskripsi: 'Deskripsi notifikasi 3', tanggal: '2024-12-29' },
    { id: 4, judul: 'Notifikasi 4', deskripsi: 'Deskripsi notifikasi 4', tanggal: '2024-12-28' },
    { id: 5, judul: 'Notifikasi 5', deskripsi: 'Deskripsi notifikasi 5', tanggal: '2024-12-27' },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Notifikasi</h1>

        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xl text-gray-800">{item.judul}</h3>
                <span className="text-sm text-gray-500">{item.tanggal}</span>
              </div>
              <p className="text-gray-600 mt-2">{item.deskripsi}</p>
            </div>
          ))}
          {data.length === 0 && (
            <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-center text-gray-500">
              Tidak ada notifikasi
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
