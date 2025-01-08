import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserForm from '../components/atoms/forms/users/UsersForm';
import EditUsersForm from '../components/atoms/forms/users/EditUsersForm';
import LayoutUsers from '../components/atoms/LayoutUsers';

const Users: React.FC = () => {
  return (
    <div className='pb-[14rem]'>

      <Routes>
        <Route index element={<LayoutUsers />} />
        <Route path="add" element={<UserForm />} />
        <Route path="edit/:id" element={<EditUsersForm />} />
      </Routes>
    </div>
  );
};


export default Users;



