import { Link } from 'react-router-dom';
import {
  FiCpu, FiTarget, FiFileText, FiMail, FiBriefcase,
  FiTrendingUp, FiUser, FiArrowRight, FiCheck, FiZap
} from 'react-icons/fi';

const features = [
  { icon: FiTarget,     color: '#6366f1', bg: 'rgba(99,102,241,0.12)',  title: 'ATS Score Analysis',    desc: 'Instantly check how your resume scores against any job description with our AI-powered ATS engine.' },
  { icon: FiFileText,   color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', title: 'Resume Tailoring',       desc: 'Automatically customize your resume for each role, highlighting the most relevant skills and achievements.' },
  { icon: FiMail,       color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', title: 'Cover Letter Gen',      desc: 'Generate professional, personalized cover letters in seconds tailored to the company and role.' },
  { icon: FiBriefcase,  color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', title: 'AI Job Matching',        desc: 'Discover the best-fit jobs based on your skills and experience with intelligent match scoring.' },
  { icon: FiTrendingUp, color: '#10b981', bg: 'rgba(16,185,129,0.12)', title: 'Skill Gap Analysis',     desc: 'Pinpoint exactly which skills you are missing and get a personalized roadmap to bridge those gaps.' },
  { icon: FiUser,       color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',  title: 'Master Profile Builder', desc: 'Build a centralized profile with education, skills, projects, and experience — used across all features.' },
];

const stats = [
  { value: '500+', label: 'Graduates Helped' },
  { value: '94%',  label: 'Avg ATS Score' },
  { value: '3×',   label: 'More Interviews' },
];

const perks = ['No credit card required', 'AI-powered insights', 'Free for students'];

export default function Landing() {
  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(51,65,85,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '64px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <FiCpu color="#fff" size={18} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            JobAI
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', padding: '8px 16px', borderRadius: 10, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#94a3b8'}
          >Sign In</Link>
          <Link to="/register" style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
            textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
            padding: '8px 20px', borderRadius: 10,
          }}>Get Started</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden'
      }}>
        {/* Glowing orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 999, padding: '6px 16px', marginBottom: '1.5rem'
        }}>
          <FiZap color="#818cf8" size={14} />
          <span style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: 600 }}>AI-Powered Career Platform</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, maxWidth: 800, marginBottom: '1.5rem', color: '#fff' }}>
          Land Your Dream Job with{' '}
          <span style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI&#8209;Powered Precision
          </span>
        </h1>

        <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: 580, lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Stop guessing. Use intelligent ATS analysis, tailored resumes, and AI cover letters
          to stand out and get interviews — built for fresh graduates.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link to="/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
            textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
            padding: '14px 32px', borderRadius: 14,
            boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
          }}>
            Get Started Free <FiArrowRight size={16} />
          </Link>
          <Link to="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(51,65,85,0.8)', color: '#cbd5e1',
            textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
            padding: '14px 32px', borderRadius: 14, background: 'rgba(30,41,59,0.5)'
          }}>
            Sign In
          </Link>
        </div>

        {/* Perks */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {perks.map(p => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FiCheck color="#34d399" size={14} />
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{p}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map(({ value, label }) => (
            <div key={label} style={{
              background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(51,65,85,0.6)',
              borderRadius: 16, padding: '20px 32px', textAlign: 'center', minWidth: 130
            }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</p>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 4 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Everything You Need</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>6 Powerful AI Features</h2>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
            From resume analysis to cover letter generation — everything to maximize your chances.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {features.map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} style={{
              background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(51,65,85,0.6)',
              borderRadius: 20, padding: '28px 24px',
              transition: 'all 0.3s ease', cursor: 'default'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = color + '55'; e.currentTarget.style.boxShadow = `0 16px 40px ${color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(51,65,85,0.6)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: 48, height: 48, background: bg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Icon color={color} size={22} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', marginBottom: 8 }}>{title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{
          maxWidth: 700, margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.25)', borderRadius: 28, padding: '4rem 2rem'
        }}>
          <FiZap color="#818cf8" size={40} style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            Ready to Land Your Dream Job?
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>
            Join hundreds of graduates who&apos;ve already boosted their interview rate with JobAI.
          </p>
          <Link to="/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
            textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
            padding: '14px 36px', borderRadius: 14,
            boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
          }}>
            Start for Free <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(51,65,85,0.5)', padding: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiCpu color="#fff" size={14} />
          </div>
          <span style={{ fontWeight: 700, background: 'linear-gradient(135deg,#818cf8,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>JobAI</span>
        </div>
        <p style={{ color: '#475569', fontSize: '0.8rem' }}>© {new Date().getFullYear()} JobAI. Built for fresh graduates.</p>
      </footer>
    </div>
  );
}
