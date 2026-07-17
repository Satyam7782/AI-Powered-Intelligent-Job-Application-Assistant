import { useNavigate } from 'react-router-dom';
import {
  FiShield, FiTarget, FiBriefcase, FiFileText, FiMail,
  FiArrowRight, FiUpload, FiCheckCircle, FiClock, FiUser
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const cards = [
  {
    id: 'card-resume-health',
    icon: FiShield,
    title: 'Resume Health',
    value: '82%',
    subtitle: 'Your resume strength score',
    route: '/resume',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    glow: 'rgba(16,185,129,0.2)',
    border: 'rgba(16,185,129,0.3)',
  },
  {
    id: 'card-ats',
    icon: FiTarget,
    title: 'ATS Match Score',
    value: 'Analyze',
    subtitle: 'Compare vs job description',
    route: '/ats',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    glow: 'rgba(99,102,241,0.2)',
    border: 'rgba(99,102,241,0.3)',
  },
  {
    id: 'card-jobs',
    icon: FiBriefcase,
    title: 'Job Matches',
    value: '4 Found',
    subtitle: 'AI-matched opportunities',
    route: '/jobs',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    glow: 'rgba(245,158,11,0.2)',
    border: 'rgba(245,158,11,0.3)',
  },
  {
    id: 'card-tailor',
    icon: FiFileText,
    title: 'Resume Tailoring',
    value: 'AI Ready',
    subtitle: 'Customized for your role',
    route: '/tailor',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    glow: 'rgba(6,182,212,0.2)',
    border: 'rgba(6,182,212,0.3)',
  },
  {
    id: 'card-cover',
    icon: FiMail,
    title: 'Cover Letter',
    value: 'Generate',
    subtitle: 'Professional letter in seconds',
    route: '/cover-letter',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    glow: 'rgba(139,92,246,0.2)',
    border: 'rgba(139,92,246,0.3)',
  },
];

const quickActions = [
  { icon: FiUpload, label: 'Upload Resume', route: '/resume', color: '#6366f1' },
  { icon: FiTarget, label: 'Run ATS Check', route: '/ats',    color: '#10b981' },
  { icon: FiUser,   label: 'Edit Profile',  route: '/profile', color: '#f59e0b' },
  { icon: FiMail,   label: 'Write Letter',  route: '/cover-letter', color: '#8b5cf6' },
];

const pipeline = [
  { label: 'Profile Setup',   done: true  },
  { label: 'Resume Upload',   done: true  },
  { label: 'ATS Analysis',    done: false },
  { label: 'Job Matching',    done: false },
  { label: 'Apply',           done: false },
];

const activity = [
  { icon: FiCheckCircle, text: 'Resume uploaded successfully', time: '2 hours ago',   color: '#10b981' },
  { icon: FiUser,        text: 'Profile created and saved',    time: '3 hours ago',   color: '#6366f1' },
  { icon: FiClock,       text: 'Account created — welcome!',  time: 'Today',         color: '#8b5cf6' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {getGreeting()}, <span className="gradient-text">{user?.name?.split(' ')[0] || 'there'}</span> 👋
          </h2>
          <p className="text-slate-400 mt-1 text-sm">Your AI-powered career assistant is ready</p>
        </div>
        <button
          onClick={() => navigate('/ats')}
          className="btn-primary flex items-center gap-2 self-start"
        >
          <FiTarget size={16} /> Run ATS Analysis
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map(({ id, icon: Icon, title, value, subtitle, route, gradient, glow, border }) => (
          <div
            key={id}
            id={id}
            onClick={() => navigate(route)}
            className="glass-card p-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: 'rgba(51,65,85,0.6)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.boxShadow = `0 8px 32px ${glow}`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(51,65,85,0.6)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: glow, border: `1px solid ${border}` }}>
              <Icon size={18} style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
            </div>
            <p className="text-xs text-slate-500 mb-1">{title}</p>
            <p className="text-xl font-bold text-white mb-1">{value}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{subtitle}</p>
            <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs" style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>Open</span>
              <FiArrowRight size={11} className="text-primary-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Quick Actions */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ icon: Icon, label, route, color }) => (
              <button
                key={label}
                onClick={() => navigate(route)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dark-700 hover:border-primary-500/40 hover:bg-dark-700 transition-all text-center"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <span className="text-xs text-slate-400 font-medium leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Pipeline */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">AI Workflow Pipeline</h3>
          <div className="space-y-3">
            {pipeline.map(({ label, done }, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${done ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' : 'bg-dark-700 border border-dark-600 text-slate-600'}`}>
                    {done ? <FiCheckCircle size={14} /> : <span>{i + 1}</span>}
                  </div>
                  {i < pipeline.length - 1 && (
                    <div className={`w-0.5 h-4 mt-1 ${done ? 'bg-emerald-500/40' : 'bg-dark-700'}`} />
                  )}
                </div>
                <div>
                  <p className={`text-xs font-medium ${done ? 'text-emerald-400' : 'text-slate-500'}`}>{label}</p>
                  <p className="text-[10px] text-slate-600">{done ? 'Completed' : 'Pending'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activity.map(({ icon: Icon, text, time, color }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-300 leading-snug">{text}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
