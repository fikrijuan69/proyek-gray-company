import React, { ChangeEvent, useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState<string>("https://via.placeholder.com/200"); // Placeholder image
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
console.log(profilePic);
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2Njg3NzIxLCJleHAiOjE3MzcyOTI1MjF9.s0h4l0Ym-GhbnQvs0HRCTiXPNT-VdLbbvPxotHppwEK_rcG7yOb70ofzjez5fBOZXjrs4giv4OIea7R3q28kWw";

        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Menambahkan Bearer token
        };

        const response = await fetch("http://localhost:3002/api/v1/user", {
          method: "GET",
          headers: headers,  
        });
        
        if (response.ok) {
          const data = await response.json();

          console.log(data);
          setFormData({
            nama: data.data.nama || "",
            nik: data.data.nik || "",
            email: data.data.email || "",
            password: "", // Password tidak diisi untuk alasan keamanan
          });
          setProfilePic(data.data.avatar_link || "https://via.placeholder.com/200");
        } else {
          const result = await response.json();
          setToast({ message: result.message || "Gagal memuat data.", type: "error" });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setToast({ message: "Terjadi kesalahan saat memuat data.", type: "error" });
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfilePic(URL.createObjectURL(selectedFile)); // Update preview
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const form = new FormData();

      if (file) {
        form.append("pdf", file);
      }
      form.append("nama", formData.nama);
      form.append("nik", formData.nik);
      form.append("email", formData.email);
      form.append("password", formData.password);

      const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2Njg3NzIxLCJleHAiOjE3MzcyOTI1MjF9.s0h4l0Ym-GhbnQvs0HRCTiXPNT-VdLbbvPxotHppwEK_rcG7yOb70ofzjez5fBOZXjrs4giv4OIea7R3q28kWw";

      const headers = {
        "Authorization": `Bearer ${token}`,  // Menambahkan Bearer token
      };
      
      const response = await fetch("http://localhost:3002/api/v1/user", {
        method: "PUT",
        headers: headers,  
        body: form, 
      });

      if (response.ok) {
        setToast({ message: "Profil berhasil diperbarui!", type: "success" });
      } else {
        const result = await response.json();
        setToast({ message: result.message || "Terjadi kesalahan.", type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setToast({ message: "Gagal mengunggah data. Silakan coba lagi.", type: "error" });
    }
  };

  return (
    <div className="w-full flex justify-start items-start min-h-screen pt-14 px-4 lg:pl-24 ">
      {toast && (
        <div
          className={`top-[9rem] right-5 p-4 rounded-lg shadow-md transition-all fixed ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
          <button
            onClick={() => setToast(null)}
            className="ml-4 text-lg font-bold text-white hover:text-gray-300"
          >
            &times;
          </button>
        </div>
      )}

      <div className="bg-white p-2 py-0 form-container-portrait rounded-lg w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-gray-300 object-cover"
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
          <h1 className="mt-4 text-lg font-semibold text-gray-700 text-center md:text-left">
            Edit Foto
          </h1>
        </div>

        {/* Form */}
        <div className="flex-1 w-full">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center md:text-left">
            Edit Profile
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Masukkan nama"
                className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">NIK</label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleInputChange}
                placeholder="Masukkan NIK"
                className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan email"
                className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
