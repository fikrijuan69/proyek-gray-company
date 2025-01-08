import React from 'react';
import UsersTable from './forms/users/UsersTable';
import PermissionsTable from './forms/users/UserPermission';
import HumanRightsAttachment from './HumanRightsAttachment';


const LayoutUsers: React.FC = () => {
  return (
    <div className="pb-[14rem]"> 
        <UsersTable/>
        <PermissionsTable/>
        <HumanRightsAttachment/>
      <hr className="mb-8" />
    </div>
  );
};

export default LayoutUsers;
