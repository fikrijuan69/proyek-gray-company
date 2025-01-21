import React, { useState } from 'react';

const ResetPassword: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>(''); // NIK or Email
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages
    setLoading(true); // Set loading state

    try {
      const response = await fetch('http://localhost:3002/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier }), // Send NIK or Email
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        throw new Error(data.message || 'Reset password failed.');
      }

      setMessage('Email untuk reset password telah dikirim!');
    } catch (err: any) {
      setMessage(err.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="flex flex-col bg-white rounded-md shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Masukkan NIK atau Email Anda untuk menerima link reset password di email anda.
        </p>
        <form onSubmit={handleResetPassword}>
          {/* Identifier Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">NIK atau Email</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Masukkan NIK atau Email"
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
            {loading ? 'Memuat...' : 'Kirim Email'}
          </button>
        </form>
        {/* Message */}
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
