import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const AppLayout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith('/auth');

  return (
    <div className="app-shell">
      {!hideHeaderFooter && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
