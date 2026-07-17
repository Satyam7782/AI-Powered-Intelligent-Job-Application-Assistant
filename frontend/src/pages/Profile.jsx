import { useState, useEffect, useCallback } from 'react';
import { FiSave, FiUser, FiBook, FiCode, FiBriefcase, FiAward, FiStar, FiPlus, FiCheckCircle } from 'react-icons/fi';
import { profileService } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';
import SkillBadge from '../components/SkillBadge';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '', email: '', education: '', skills: '',
    projects: '', experience: '', certifications: '', careerInterests: '',
  });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadProfile = useCallback(async () => {
    try {
      const res = await profileService.getProfile();
      const d = res.data;
      setForm({
        name: d.name || user?.name || '',
        email: d.email || user?.email || '',
        education: d.education || '',
        projects: d.projects || '',
        experience: d.experience || '',
        certifications: d.certifications || '',
        careerInterests: d.careerInterests || '',
      });
      if (d.skills) setSkills(d.skills.split(',').map(s => s.trim()).filter(Boolean));
    } catch {
      setForm(f => ({ ...f, name: user?.name || '', email: user?.email || '' }));
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills([...skills, s]);
    setSkillInput('');
  };

  const removeSkill = (sk) => setSkills(skills.filter(s => s !== sk));

  const handleSkillKey = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await profileService.saveProfile({ ...form, skills: skills.join(', ') });
      showToast('Profile saved successfully!');
    } catch {
      showToast('Failed to save. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-dark-700 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );

  const sections = [
    { icon: FiBook,     label: 'Education',         name: 'education',       placeholder: 'B.Tech in Computer Science — JNTU Hyderabad (2020–2024) | CGPA: 8.2' },
    { icon: FiBriefcase,label: 'Experience',         name: 'experience',      placeholder: 'Intern — Tech Solutions Pvt Ltd (Jun 2023 – Aug 2023)\n- Developed RESTful APIs using Spring Boot\n- Fixed 15+ backend bugs' },
    { icon: FiCode,     label: 'Projects',           name: 'projects',        placeholder: 'Library Management System — Java + MySQL + Spring Boot\nStudent Portal — Spring Boot + Thymeleaf' },
    { icon: FiAward,    label: 'Certifications',     name: 'certifications',  placeholder: 'Java Programming — Coursera (2023)\nSpring Boot — Udemy (2024)' },
    { icon: FiStar,     label: 'Career Interests',   name: 'careerInterests', placeholder: 'Backend Development, Microservices, Cloud Engineering, System Design' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl animate-slide-up border
          ${toast.type === 'success'
            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
            : 'bg-red-500/20 border-red-500/40 text-red-300'}`}>
          <FiCheckCircle size={18} />
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* Header card */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0"
          style={{ boxShadow: '0 8px 32px rgba(99,102,241,0.35)' }}>
          {form.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-white">{form.name || 'Your Name'}</h2>
          <p className="text-slate-400 text-sm">{form.email}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {skills.slice(0, 4).map(s => <SkillBadge key={s} label={s} variant="neutral" />)}
            {skills.length > 4 && <span className="text-xs text-slate-500 self-center">+{skills.length - 4} more</span>}
          </div>
        </div>
        <button id="save-profile" onClick={handleSave} disabled={loading}
          className="btn-primary flex items-center gap-2 flex-shrink-0">
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
            : <><FiSave size={16} />Save Profile</>}
        </button>
      </div>

      {/* Personal Info */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <FiUser size={18} className="text-primary-400" />
          <h3 className="font-semibold text-white">Personal Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
            <input id="profile-name" type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="John Doe" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <input type="email" value={form.email} readOnly
              className="input-field opacity-50 cursor-not-allowed" />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <FiCode size={18} className="text-primary-400" />
          <h3 className="font-semibold text-white">Skills</h3>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            id="skill-input"
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKey}
            placeholder="Type a skill and press Enter (e.g. Java, React)"
            className="input-field"
          />
          <button onClick={addSkill} className="btn-primary flex items-center gap-1 px-4 flex-shrink-0">
            <FiPlus size={16} />
          </button>
        </div>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <SkillBadge key={s} label={s} variant="neutral" onRemove={removeSkill} />)}
          </div>
        ) : (
          <p className="text-slate-600 text-sm">No skills added yet. Start typing above.</p>
        )}
      </div>

      {/* Other sections */}
      {sections.map(({ icon: Icon, label, name, placeholder }) => (
        <div key={name} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon size={18} className="text-primary-400" />
            <h3 className="font-semibold text-white">{label}</h3>
          </div>
          <textarea
            id={`profile-${name}`}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            rows={4}
            className="input-field resize-none leading-relaxed"
          />
        </div>
      ))}

      {/* Bottom save */}
      <div className="flex justify-end pb-4">
        <button onClick={handleSave} disabled={loading} className="btn-primary flex items-center gap-2">
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
            : <><FiSave size={16} />Save All Changes</>}
        </button>
      </div>
    </div>
  );
}
