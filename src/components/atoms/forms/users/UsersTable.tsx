import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = `${import.meta.env.VITE_API_URL}/users`; // API URL

interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  projects: string[]; 
  role : string;
  created_at : Date;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch data from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch users');

      const data: User[] = await response.json();
      const sanitizedData = data.map(user => ({
        ...user,
        projects: Array.isArray(user.projects) ? user.projects : [],
      }));

      setUsers(sanitizedData);
    } catch (err) {
      setError('Unable to load user data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete operation
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');

      setUsers(users.filter(user => user.id !== id));
    } catch {
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">List Users</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/users/add')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
        >
          Add User
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="table-auto w-full bg-white shadow rounded-lg border-x border-gray-300">
  <thead>
    <tr className="bg-gray-200">
      <th className="px-4 py-2">No</th>
      <th className="px-4 py-2">Full Name</th>
      <th className="px-4 py-2">Username</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Role</th>
      <th className="px-4 py-2">Projects</th>
      <th className="px-4 py-2">Created At</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan={8} className="text-center py-4">Loading...</td>
      </tr>
    ) : users.length === 0 ? (
      <tr>
        <td colSpan={8} className="text-center py-4">No users found</td>
      </tr>
    ) : (
      users.map((user, index) => (
        <tr key={user.id} className="border-b h-full">
          <td className="px-4 py-2 text-center h-full">{index + 1}</td>
          <td className="px-4 py-2 h-full">{user.full_name}</td>
          <td className="px-4 py-2 h-full">{user.username}</td>
          <td className="px-4 py-2 break max-w-xs break-words h-full">{user.email}</td>

          <td className="border border-gray-300 px-4 py-2 h-full">
            {Array.isArray(user.role) && user.role.length > 0 ? user.role[0] : 'USER'}
          </td>

          <td className="border border-gray-300 px-4 py-2 h-full">
            {user.projects.length > 0
              ? user.projects.map((project, index) => {
                  let bgColor;
                  if (index === 0) {
                    bgColor = 'bg-red-500';
                  } else if (index === 1) {
                    bgColor = 'bg-purple-500';
                  } else if (index === 2) {
                    bgColor = 'bg-blue-500';
                  } else {
                    bgColor = 'bg-yellow-500';
                  }

                  return (
                    <span key={index} className={`inline-block px-3 py-1 text-white w-full mb-1 rounded-lg ${bgColor} mr-2`}>
                      {project}
                    </span>
                  );
                })
              : 'No Projects Assigned'}
          </td>

          <td className="px-4 py-2 break-words max-w-xs border-r border-gray-300 h-full">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(new Date(user.created_at))}
          </td>

          <td className="px-4 py-2 flex flex-col justify-center items-center space-y-2 h-full">
            <button
              onClick={() => navigate(`/users/edit/${user.id}`)}
              className="bg-emerald-500 text-white px-4 py-2 w-20 text-center rounded hover:bg-green-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 text-white px-4 py-2 w-20 text-center rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>


    </div>
  );
};

export default UsersTable;
