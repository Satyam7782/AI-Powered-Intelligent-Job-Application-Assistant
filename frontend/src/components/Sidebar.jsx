import { NavLink } from 'react-router-dom';
import {
  FiGrid, FiUser, FiUpload, FiTarget, FiBriefcase,
  FiFileText, FiMail, FiCpu, FiX, FiZap
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/dashboard',    icon: FiGrid,      label: 'Dashboard' },
  { to: '/profile',      icon: FiUser,      label: 'My Profile' },
  { to: '/resume',       icon: FiUpload,    label: 'Resume Upload' },
  { to: '/ats',          icon: FiTarget,    label: 'ATS Analysis' },
  { to: '/jobs',         icon: FiBriefcase, label: 'Job Recommendations' },
  { to: '/tailor',       icon: FiFileText,  label: 'Resume Tailoring' },
  { to: '/cover-letter', icon: FiMail,      label: 'Cover Letter' },
];

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuth();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-dark-900 border-r border-dark-700 z-30
          flex flex-col transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-dark-700">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
              <FiCpu className="text-white w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg gradient-text">JobAI</span>
              <p className="text-[10px] text-slate-500 -mt-0.5">Career Assistant</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white p-1">
            <FiX size={18} />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-dark-700 mx-3 mt-3 glass-card rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-[11px] text-slate-500 truncate">{user?.email || ''}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-4 pb-2">Navigation</p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'sidebar-active' : ''}`
              }
              onClick={() => window.innerWidth < 1024 && onClose()}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* AI Status badge */}
        <div className="px-4 pb-4">
          <div className="glass-card p-3 rounded-xl border border-primary-500/20 bg-primary-500/5">
            <div className="flex items-center gap-2 mb-1">
              <FiZap size={12} className="text-primary-400" />
              <p className="text-xs font-semibold text-primary-400">AI Engine</p>
            </div>
            <p className="text-[11px] text-slate-500">Mock mode — ready for real AI integration</p>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
