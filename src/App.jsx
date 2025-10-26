import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore.js';
import { useTicketStore } from './store/ticketStore.js';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tickets from './pages/Tickets.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AppLayout from './components/AppLayout.jsx';
import ToastContainer from './components/ToastContainer.jsx';

const App = () => {
  const hydrateAuth = useAuthStore((state) => state.hydrate);
  const isAuthHydrated = useAuthStore((state) => state.isHydrated);
  const hydrateTickets = useTicketStore((state) => state.hydrate);
  const isTicketHydrated = useTicketStore((state) => state.isHydrated);
  const location = useLocation();

  useEffect(() => {
    hydrateAuth();
    hydrateTickets();
  }, [hydrateAuth, hydrateTickets]);

  if (!isAuthHydrated || !isTicketHydrated) {
    return (
      <div className="app-loading">
        <div className="spinner" aria-label="Loading" />
        <p>Loading EventEase...</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes location={location}>
        <Route element={<AppLayout />}>  
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
