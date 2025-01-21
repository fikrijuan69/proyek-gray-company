import React, { useEffect, useState } from 'react';
import SidebarMenu from './molecules/SidebarMenu';
import { FaHome, FaUsers, FaBell, FaChartBar, FaUserCircle } from 'react-icons/fa';
import { MdOutlinePointOfSale } from "react-icons/md";
import axios from 'axios';

const Sidebar: React.FC = () => {
  const [accessibleMenu, setAccessibleMenu] = useState<string[]>([]);

  const menuItems = [
    { label: 'Dashboard', href: 'dashboard', icon: <FaHome />, accessKey: 'dashboard' },
    { label: 'Insentive', href: 'insentive', icon: <FaChartBar />, accessKey: 'insentive' },
    { label: 'Sales', href: 'sales', icon: <MdOutlinePointOfSale />, accessKey: 'sales' },
    { label: 'Notifications', href: 'notifications', icon: <FaBell />, accessKey: 'notifications' },
    // { label: 'Accounts', href: 'accounts', icon: <FaUsers />, accessKey: 'accounts' },
  ];

  useEffect(() => {
    const fetchAccess = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('Token tidak ditemukan, sidebar akan disembunyikan.');
        return;
      }

      try {
        // Memanggil endpoint API untuk mendapatkan akses menu
        const response = await axios.get('http://localhost:3002/api/access-menu', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);

        setAccessibleMenu(response.data.accessibleMenu || []);
      } catch (error) {
        console.error('Gagal memuat akses menu:', error);
      }
    };

    fetchAccess();
  }, []);

  const filteredMenuItems = menuItems.filter((item) =>
    accessibleMenu.includes(item.accessKey)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Spacer div to mimic the height of the header */}
      <div className="h-16 lg:h-20" />

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed top-0 left-0 h-full z-10 hidden lg:flex flex-col">
        <div className="py-4 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">Developer</h1>
        </div>

        <div className="py-4 px-6 overflow-y-auto h-full pb-20">
          <SidebarMenu items={filteredMenuItems} />
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-3">
        {filteredMenuItems.map((item) => (
          <a href={item.href} key={item.label} className="flex flex-col items-center text-sm">
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
        <a href="/profile" className="flex flex-col items-center text-sm">
          <FaUserCircle />
          <span>Profile</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
