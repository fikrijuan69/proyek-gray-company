import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Accounts: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminPage = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak tersedia. Harap login terlebih dahulu.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3002/api/v1/access/page-account-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(response.data.message || "Berhasil mengakses halaman admin.");
      } catch (err: any) {
        setError(err.response?.data?.message || "Terjadi kesalahan.");
      }
    };

    fetchAdminPage();
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return <div>{message || "Memuat halaman..."}</div>;
};

export default Accounts;

