import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Import ikon avatar

const SubHeader: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('User logged out'); // Tambahkan logika logout di sini
  };

  // Menutup dropdown jika klik di luar
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
            
        <div className='flex justify-center items-center gap-4'>
            <p className='font-bold'>
                Profile
            </p>
            <FaUserCircle size={32} /> {/* Ikon Avatar */}
        </div>

        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border-black border-[1px] w-48  text-gray-800 rounded-md">
            <div className='w-full text-left px-4 py-2 rounded-md hover:bg-neutral-100 hover:cursor-pointer'>
                Name
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
