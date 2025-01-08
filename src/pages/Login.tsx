import React from 'react';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-200">
    <div className="flex flex-col md:flex-row bg-white rounded-md shadow-lg w-full max-w-4xl overflow-hidden">
      {/* Sebelah kiri - Gambar Placeholder */}
      <div className="hidden md:flex w-1/2 bg-gray-300 items-center justify-center">
        <p className="text-gray-500">Gambar Placeholder</p>
      </div>

      {/* Sebelah kanan - Form Login */}
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-2 text-center">Halo, selamat datang!</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Login untuk mengecek pencairan insentif
        </p>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username/NIK</label>
            <input
              type="text"
              placeholder="Masukkan Username atau NIK"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Masukkan Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Lupa Password?
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
