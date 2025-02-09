import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen text-stone-950 dark:text-stone-200 ">
      <Sidebar />
      <main className="flex-1 bg-stone-200 dark:bg-stone-800">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
