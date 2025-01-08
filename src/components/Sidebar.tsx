import SidebarMenu from './molecules/SidebarMenu';
import { FaHome, FaUsers, FaBell, FaChartBar, FaUserCircle } from 'react-icons/fa';  // Import react-icons
import { MdOutlinePointOfSale } from "react-icons/md";

const Sidebar: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', href: 'dashboard', icon: <FaHome /> },
    { label: 'Insentive', href: 'insentive', icon: <FaChartBar /> },
    { label: 'Sales', href: 'sales', icon: <MdOutlinePointOfSale /> },
    { label: 'Notifications', href: 'notifications', icon: <FaBell /> },
    { label: 'Accounts', href: 'accounts', icon: <FaUsers /> },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Spacer div to mimic the height of the header */}
      <div className="h-16 lg:h-20" /> {/* 16px for mobile, 20px for large screens */}

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed top-0 left-0 h-full z-10 hidden lg:flex flex-col">
        <div className="py-4 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">Developer</h1>
        </div>

        <div className="py-4 px-6 overflow-y-auto h-full pb-20">
          <SidebarMenu items={menuItems} />
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-3">
        {menuItems.map((item) => (
          <a href={item.href} key={item.label} className="flex flex-col items-center text-sm">
            {item.icon} {/* Display icon for mobile */}
            <span>{item.label}</span>
          </a>
        ))}
        <a href="/profile" className="flex flex-col items-center text-sm">
          <FaUserCircle /> {/* Ikon Avatar */}
          <span>
            Profile

          </span>
          </a>
        
      </div>
    </div>
  );
};

export default Sidebar;
