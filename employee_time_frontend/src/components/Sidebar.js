import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/timecard', label: 'Timecard', icon: '⏱️' },
  { to: '/pay', label: 'Pay Breakdown', icon: '💰' },
  { to: '/profile', label: 'Profile', icon: '👤' }
];

// PUBLIC_INTERFACE
const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="etp-sidebar">
      <div className="etp-sidebar-header">
        <span className="etp-logo-dot" /> EMP TimeTracker
      </div>
      <nav className="etp-nav" aria-label="Main navigation">
        {navLinks.map(link => (
          <NavLink
            to={link.to}
            key={link.to}
            className={({ isActive }) => 'etp-nav-link' + (isActive ? ' active' : '')}
            end={link.to === '/'}
          >
            <span style={{marginRight: '9px'}}>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
        <button className="etp-nav-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
