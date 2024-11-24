import Sidebar from './sidebar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex text-zinc-300 h-screen">
      <Sidebar />
      <main className="flex-1 bg-zinc-800">{children}</main>
    </div>
  );
};

export default Layout;
