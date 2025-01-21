import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SubHeader from '../components/SubHeader';

function Layout() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Header */}
      <header className="bg-teal-700 text-white px-3 fixed w-full z-30 top-0 left-0">
  <div className="container flex items-center">
    <img

      src="https://ik.imagekit.io/eoeykxtr4/jd%20toyota%20logo.png?updatedAt=1737471415005"
      alt="Logo Toyota"
      className="ml-2 w-16 h-auto" // Menyesuaikan ukuran gambar
    />
  </div>
</header>



      {/* Main Content */}

      <div className="lg:ml-64 flex-grow lg:mt-[4rem]"> 
        <SubHeader/>

          <Outlet />
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default Layout;

