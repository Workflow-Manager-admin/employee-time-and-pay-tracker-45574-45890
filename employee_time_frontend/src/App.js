import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthProvider, { useAuth } from './components/AuthProvider';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Timecard from './pages/Timecard';
import PayBreakdown from './pages/PayBreakdown';
import Profile from './pages/Profile';

import './App.css';

// Layout wrapper to insert sidebar + main content, except for login screen
function AppLayout({ children }) {
  const location = useLocation();
  const showSidebar = !location.pathname.startsWith('/login');

  return (
    <div className="etp-root">
      {showSidebar && <Sidebar />}
      <main className="etp-main-content">{children}</main>
    </div>
  );
}

// Authentication-aware route protection
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="etp-page-centered">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

// PUBLIC_INTERFACE
function App() {
  // Modern minimal background + CSS variables for theming
  useEffect(() => {
    document.documentElement.style.setProperty('--etp-color-primary', '#1976d2');
    document.documentElement.style.setProperty('--etp-color-secondary', '#ffffff');
    document.documentElement.style.setProperty('--etp-color-accent', '#388e3c');
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/timecard"
              element={
                <PrivateRoute>
                  <Timecard />
                </PrivateRoute>
              }
            />
            <Route
              path="/pay"
              element={
                <PrivateRoute>
                  <PayBreakdown />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            {/* Default route: dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
