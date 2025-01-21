import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Import icon avatar

const SubHeader: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    console.log('User logged out');
    window.location.href = '/login'; // Redirect to login page
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        console.error('No token found, redirecting to login.');
        window.location.href = '/login'; // Redirect if no token
        return;
      }

      try {
        const response = await fetch('http://103.196.155.16:3002/api/v1/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserName(data.data.nama); // Update state with user name
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-neutral-100 px-6 py-4 flex justify-end z-50">
      {/* Dropdown Profile */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleToggleDropdown}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <div className="flex justify-center items-center gap-4">
            <p className="font-bold">
              {userName || 'Loading...'}
            </p>
            <FaUserCircle size={32} /> {/* Icon Avatar */}
          </div>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border-black border-[1px] w-48 text-gray-800 rounded-md">
            <div className="w-full text-left px-4 py-2 rounded-md hover:bg-neutral-100">
              {userName || 'Name'}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md hover:bg-neutral-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default SubHeader;

