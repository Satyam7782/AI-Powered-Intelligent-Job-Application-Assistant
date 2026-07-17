import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCpu, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { authService } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

const getStrength = (pw) => {
  if (!pw) return { label: '', color: '', width: '0%' };
  let score = 0;
  if (pw.length >= 6)  score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: 'Weak',   color: '#ef4444', width: '25%' };
  if (score <= 3) return { label: 'Medium', color: '#f59e0b', width: '60%' };
  return              { label: 'Strong',  color: '#10b981', width: '100%' };
};

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validate = () => {
    if (!form.name.trim())  return 'Full name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email address.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    try {
      const res = await authService.register({ name: form.name, email: form.email, password: form.password });
      const { token, id, name, email } = res.data;
      login({ id, name, email }, token);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Registration failed. Please try again.';
      setError(typeof msg === 'string' ? msg : 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: 'reg-name',     name: 'name',    label: 'Full Name',       type: 'text',     icon: FiUser,  placeholder: 'John Doe',          auto: 'name' },
    { id: 'reg-email',    name: 'email',   label: 'Email Address',   type: 'email',    icon: FiMail,  placeholder: 'you@example.com',   auto: 'email' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />

      <div className="w-full max-w-md animate-slide-up relative z-10">
        <div className="glass-card p-8 border border-dark-700 shadow-2xl"
          style={{ boxShadow: '0 24px 64px rgba(99,102,241,0.12)' }}>

          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-violet-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
              style={{ boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}>
              <FiCpu className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="text-slate-400 text-sm mt-1">Start your AI-powered job journey</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2">
              <FiAlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email */}
            {fields.map(({ id, name, label, type, icon: Icon, placeholder, auto }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    id={id}
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="input-field pl-11"
                    autoComplete={auto}
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <FiLock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="reg-password"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="input-field pl-11 pr-11"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {/* Strength bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300"
                      style={{ width: strength.width, background: strength.color }} />
                  </div>
                  <p className="text-xs mt-1" style={{ color: strength.color }}>{strength.label} password</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="reg-confirm"
                  type={showPass ? 'text' : 'password'}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="input-field pl-11 pr-11"
                  autoComplete="new-password"
                />
                {form.confirm && form.password === form.confirm && (
                  <FiCheck size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400" />
                )}
              </div>
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating Account...</>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>

        <p className="text-center mt-4">
          <Link to="/" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
