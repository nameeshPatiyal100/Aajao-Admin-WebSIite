// components/layout/UserLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const CommonLayout = () => {
  return (
    <div className="user-layout">
      <Header />
      <main className="min-h-screen p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayout;

