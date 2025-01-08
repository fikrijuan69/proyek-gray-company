import React from 'react';
import SidebarItem from '../atoms/SidebarItem';

interface SidebarMenuProps {
  items: { label: string; href: string; icon: JSX.Element }[];  // Include icon type here
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <SidebarItem key={index} label={item.label} href={item.href} icon={item.icon} />
      ))}
    </ul>
  );
};

export default SidebarMenu;
