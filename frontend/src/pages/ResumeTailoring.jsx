import { useState } from 'react';
import { FiFileText, FiArrowRight, FiCheckCircle, FiCopy, FiDownload, FiZap } from 'react-icons/fi';
import { aiService } from '../services/aiService';
import EmptyState from '../components/EmptyState';

const MOCK = {
  originalResume: `JOHN DOE
Software Developer | johndoe@email.com | +91-9876543210

EDUCATION
B.Tech in Computer Science — JNTU Hyderabad (2020-2024) | CGPA: 8.2

SKILLS
Java, Spring Boot, MySQL, HTML, CSS, JavaScript, Git

EXPERIENCE
Intern — Tech Solutions Pvt Ltd (June 2023 – Aug 2023)
- Worked on backend development tasks
- Fixed bugs in existing modules
- Assisted senior developers

PROJECTS
Library Management System — Java + MySQL desktop application
Student Portal — Spring Boot web app with CRUD operations

CERTIFICATIONS
Java Programming — Coursera`,

  tailoredResume: `JOHN DOE
Java Backend Developer | johndoe@email.com | +91-9876543210 | LinkedIn | GitHub

PROFESSIONAL SUMMARY
Results-driven Java Backend Developer with hands-on experience in Spring Boot microservices,
REST API development, and MySQL database design. Passionate about building scalable systems.

TECHNICAL SKILLS
Languages:   Java 17, SQL, JavaScript
Frameworks:  Spring Boot 3, Spring Security, Spring Data JPA, Maven
Databases:   MySQL, H2
Tools:       Git, Postman, IntelliJ IDEA, Docker (basic)
Concepts:    REST APIs, MVC Architecture, JWT Authentication, Agile

PROFESSIONAL EXPERIENCE
Backend Development Intern — Tech Solutions Pvt Ltd (June 2023 – Aug 2023)
- Developed 5+ RESTful API endpoints using Spring Boot, reducing data fetch time by 30%
- Resolved 15+ backend bugs, improving system stability by 20%
- Collaborated with senior developers in Agile sprint environment (JIRA, daily standups)

PROJECTS
Library Management System  (Java + MySQL + Spring Boot)
- Built full-stack library system with JWT auth supporting 200+ concurrent users
- Implemented CRUD operations with optimized SQL queries (avg <50ms response)

Student Portal  (Spring Boot + Thymeleaf + MySQL)
- Developed student management portal with role-based access control (Admin / Student)
- Integrated email notifications for assignment submission reminders

CERTIFICATIONS
Java Programming — Coursera (2023)
Spring Boot Fundamentals — Udemy (2024)

EDUCATION
B.Tech in Computer Science — JNTU Hyderabad | CGPA: 8.2/10 | 2020–2024`,

  improvements: [
    'Added quantified metrics to internship experience (+30% performance, 15+ bugs fixed)',
    'Restructured skills section with clear categories for ATS readability',
    'Added a professional summary tailored to the target role',
    'Enhanced project descriptions with impact and tech stack details',
    'Added LinkedIn & GitHub profile links to the header',
  ],
  improvementScore: 35,
};

export default function ResumeTailoring() {
  const [jd, setJd]           = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [copied, setCopied]   = useState(false);
  const [dots, setDots]       = useState('');

  const animateDots = () => {
    let i = 0;
    const iv = setInterval(() => { setDots('.'.repeat((i++ % 3) + 1)); }, 500);
    return iv;
  };

  const handleTailor = async () => {
    if (!jd.trim()) return;
    setLoading(true); setResult(null);
    const iv = animateDots();
    try {
      const fd = new FormData();
      fd.append('jobDescription', jd);
      const res = await aiService.tailorResume(fd);
      setResult(res.data);
    } catch {
      setResult(MOCK);
    } finally {
      setLoading(false);
      clearInterval(iv);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result?.tailoredResume || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result?.tailoredResume || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'tailored_resume.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in space-y-5">

      {/* Input */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <FiZap size={16} className="text-primary-400" /> Target Job Description
        </h3>
        <textarea
          id="tailor-jd"
          value={jd}
          onChange={e => setJd(e.target.value)}
          placeholder="Paste the job description you are applying for. Our AI will tailor your resume to match it perfectly..."
          rows={5}
          className="input-field resize-none leading-relaxed text-sm mb-4"
        />
        <button
          id="tailor-btn"
          onClick={handleTailor}
          disabled={loading || !jd.trim()}
          className="btn-primary flex items-center gap-2"
        >
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />AI tailoring{dots}</>
            : <><FiFileText size={16} />Tailor My Resume</>}
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div className="glass-card p-8 text-center animate-fade-in">
          <div className="w-16 h-16 border-4 border-dark-700 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white font-semibold">AI is crafting your tailored resume{dots}</p>
          <p className="text-slate-500 text-sm mt-1">Analyzing job requirements and optimizing your content...</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4 animate-fade-in">
          {/* Score badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <FiCheckCircle size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">+{result.improvementScore || 35}% Improved</span>
            </div>
            <p className="text-slate-500 text-sm">{result.improvements?.length || 5} enhancements applied</p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Original */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-dark-700">
                <div className="w-2 h-2 rounded-full bg-slate-500" />
                <h4 className="text-sm font-semibold text-slate-400">Original Resume</h4>
              </div>
              <pre className="text-xs text-slate-500 whitespace-pre-wrap font-mono leading-relaxed overflow-y-auto max-h-96">
                {result.originalResume}
              </pre>
            </div>

            {/* Tailored */}
            <div className="glass-card p-5 border-emerald-500/20" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h4 className="text-sm font-semibold text-emerald-400">AI Tailored Resume</h4>
                </div>
                <span className="text-xs text-emerald-500 font-medium">Optimized ✓</span>
              </div>
              <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed overflow-y-auto max-h-96">
                {result.tailoredResume}
              </pre>
            </div>
          </div>

          {/* Improvements list */}
          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FiCheckCircle size={14} className="text-emerald-400" /> What was improved
            </h4>
            <div className="space-y-2">
              {result.improvements?.map((imp, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheckCircle size={11} className="text-emerald-400" />
                  </div>
                  <p className="text-sm text-slate-300">{imp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action bar */}
          <div className="flex gap-3 flex-wrap">
            <button onClick={handleCopy} className="btn-primary flex items-center gap-2">
              <FiCopy size={15} /> {copied ? 'Copied!' : 'Copy Tailored Resume'}
            </button>
            <button onClick={handleDownload} className="btn-secondary flex items-center gap-2">
              <FiDownload size={15} /> Download as .txt
            </button>
            <button onClick={() => setResult(null)} className="btn-secondary flex items-center gap-2">
              <FiArrowRight size={15} /> Try Another
            </button>
          </div>
        </div>
      )}

      {!result && !loading && (
        <EmptyState
          icon={FiFileText}
          title="No Resume Tailored Yet"
          description="Paste a job description above and click Tailor. AI will compare your profile and generate an optimized version."
        />
      )}
    </div>
  );
}
