import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = `${import.meta.env.VITE_API_URL}/users/details`; // API URL

interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  projects: string[];
}

const UserProjects: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId: number) => {
    navigate(`/users/edit/details/${userId}`); // Redirect to edit page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Assigned Projects</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Projects</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.projects.length > 0
                    ? user.projects.map((project, index) => {
                        // Tentukan warna berdasarkan urutan proyek
                        let bgColor;
                        if (index === 0) {
                        bgColor = 'bg-red-500'; // Warna untuk proyek pertama
                        } else if (index === 1) {
                        bgColor = 'bg-purple-500'; // Warna untuk proyek kedua
                        } else if (index === 2) {
                        bgColor = 'bg-blue-500'; // Warna untuk proyek ketiga
                        } else {
                        bgColor = 'bg-yellow-500'; // Warna untuk proyek setelah ketiga
                        }

                        return (
                        <span
                            key={index}
                            className={`inline-block px-3 py-1 text-white w-full mb-1 rounded-lg ${bgColor} mr-2`}>
                            {project}
                        </span>
                        );
                    })
                    : 'No Projects Assigned'}
                </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Edit
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProjects;