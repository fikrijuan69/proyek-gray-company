import { Link } from 'react-router-dom';

interface SidebarItemProps {
  label: string;
  href: string;
  icon: JSX.Element;  // Accept the icon here
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon }) => {
  return (
    <li className="my-2">
      <Link to={`/${href}`} className="text-gray-200 hover:text-blue-500 px-4 py-2 rounded-md flex items-center">
        {/* Display the icon along with the label */}
        <span className="mr-3">{icon}</span> {/* Optional: add space between icon and label */}
        {label}
      </Link>
    </li>
  );
};

export default SidebarItem;
