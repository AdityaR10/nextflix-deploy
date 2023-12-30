import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
}

const NavbarItem : React.FC<NavbarItemProps> =({
    label,
})=> {
  return (
    <div className="text-white hover:text-gray-300 cursor-pointer transition z-50">
      {label}
    </div>
  )
}

export default NavbarItem;