import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiMenu, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Navbar = ({ onMenuClick, title = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-dark-900/90 backdrop-blur border-b border-dark-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          id="sidebar-toggle"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-all"
        >
          <FiMenu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-dark-700 transition-all">
          <FiBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full border-2 border-dark-900" />
        </button>

        {/* User avatar / dropdown */}
        <div className="relative ml-1">
          <button
            id="user-dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-dark-700 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="hidden md:block text-sm font-medium text-slate-300">{user?.name?.split(' ')[0]}</span>
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-12 w-52 glass-card border border-dark-700 rounded-2xl shadow-2xl py-2 z-50 animate-slide-up">
                <div className="px-4 py-3 border-b border-dark-700">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => { navigate('/profile'); setDropdownOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-dark-700 transition-all"
                >
                  <FiUser size={14} /> My Profile
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-dark-700 transition-all"
                >
                  <FiSettings size={14} /> Settings
                </button>
                <div className="border-t border-dark-700 mt-1 pt-1">
                  <button
                    id="logout-btn"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                  >
                    <FiLogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
