import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const Layout = () => {
  return (
    <div className="flex text-stone-200 h-screen">
      <Sidebar />
      <main className="flex-1 bg-stone-800">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
