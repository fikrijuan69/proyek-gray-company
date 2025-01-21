import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true); // Set loading state

    try {
      const response = await fetch('http://localhost:3002/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send user credentials
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        throw new Error(data.message || 'Login failed.');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.data.token);

      alert('Login berhasil!');
      // Redirect user after successful login (if needed)
      window.location.href = '/dashboard'; // Change '/dashboard' to your desired route
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="flex flex-col md:flex-row bg-white rounded-md shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Left Section (Image Placeholder) */}
        <div className="hidden md:flex w-1/2 bg-gray-300 items-center justify-center">
  <img
    src="https://ik.imagekit.io/eoeykxtr4/WhatsApp%20Image%202025-01-21%20at%2020.30.52_44c5f833.jpg?updatedAt=1737466765024"
    alt=""
    className="w-full h-full object-cover"
  />
</div>


        {/* Right Section (Login Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Halo, selamat datang!</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Login untuk mengecek pencairan insentif
          </p>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? 'Memuat...' : 'Login'}
            </button>
          </form>
          {/* Error Message */}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          <div className="mt-4 text-center">
            <a href="/reset-password" className="text-sm text-blue-500 hover:underline">
              Lupa Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
