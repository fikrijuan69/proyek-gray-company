import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ToastProvider } from './../components/molecules/Toast';
import SubHeader from '../components/SubHeader';

function Layout() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Header */}
      <header className="bg-teal-700 text-white p-4 fixed w-full z-30 top-0 left-0">
        <div className="container flex items-start">
          <h1 className="text-2xl font-semibold ml-6">Toyota</h1>
        </div>
      </header>


      {/* Main Content */}

      <div className="lg:ml-64 flex-grow lg:mt-[4rem]"> 
        <SubHeader/>

        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default Layout;

