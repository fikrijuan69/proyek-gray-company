import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import './global.css'
import Insentive from './pages/Insentive';
import Notifications from './pages/Notifications';
import Dashboard from './pages/Dashboard';
// import Accounts from './pages/Accounts';
import Sales from './pages/Sales';
import ResetPassword from './pages/ResetPassword';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
  <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="notifications" element={<Notifications />} />           
        <Route path="insentive" element={<Insentive />} />   
        <Route path="sales" element={<Sales />} />   
        {/* <Route path="accounts" element={<Accounts />} />    */}
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

    </Routes>
  </BrowserRouter>
);
