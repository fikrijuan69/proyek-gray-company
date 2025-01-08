import React, { ChangeEvent } from 'react';

const Dashboard: React.FC = () => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="w-full flex justify-start items-start min-h-screen pt-14 px-4 lg:pl-24">    
      <div className="bg-white p-2 py-0 form-container-portrait rounded-lg w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <div className="relative">
            <img
              src="https://via.placeholder.com/200"
              alt="Profile"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-gray-300"
            />
            <label
              htmlFor="upload"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 6a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </label>
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <h1 className="mt-4 text-lg font-semibold text-gray-700 text-center md:text-left">Edit Foto</h1>
        </div>

        {/* Form */}
        <div className="flex-1 w-full">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center md:text-left">Edit Profile</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                placeholder="Masukkan nama"
                className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">NIK</label>
              <input
                type="text"
                placeholder="Masukkan NIK"
                className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
