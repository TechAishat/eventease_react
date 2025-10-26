import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

const Header = () => {
  const logout = useAuthStore((state) => state.logout);
  const session = useAuthStore((state) => state.getSession());
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <NavLink to="/" className="brand" aria-label="EventEase home">
          <span className="brand-icon" aria-hidden="true">EE</span>
          EventEase Tickets
        </NavLink>
        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/tickets">Tickets</NavLink>
          {session ? (
            <button type="button" className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/auth/login" className="btn btn-secondary">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
