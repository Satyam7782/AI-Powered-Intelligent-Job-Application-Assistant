import { useState } from 'react';
import { FiMail, FiCopy, FiDownload, FiRefreshCw, FiFileText, FiAlertCircle } from 'react-icons/fi';
import { aiService } from '../services/aiService';
import EmptyState from '../components/EmptyState';

const MOCK_LETTER = (jobTitle, company) => `${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}

Hiring Manager
${company || 'The Company'}

Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle || 'Software Developer'} position at ${company || 'your organization'}. As a recent Computer Science graduate from JNTU Hyderabad with hands-on experience in Java backend development and a genuine passion for building scalable software solutions, I am confident that my skills align perfectly with your team's needs.

During my internship at Tech Solutions Pvt Ltd, I gained practical experience developing RESTful APIs using Spring Boot, managing MySQL databases, and collaborating in an Agile development environment. I successfully delivered 5+ API endpoints that improved data processing efficiency by 30%, and resolved 15+ backend issues that enhanced overall system stability. My academic projects — including a Library Management System and a Student Portal with JWT authentication — demonstrate my ability to architect and implement end-to-end backend solutions independently.

What excites me most about ${company || 'your organization'} is your commitment to innovation and technical excellence. I am eager to contribute to your team, continue growing as a developer, and help build products that make a real impact. I bring not only strong technical skills but also a collaborative mindset, enthusiasm for learning new technologies quickly, and dedication to delivering high-quality work.

I would welcome the opportunity to discuss how my background aligns with your team's goals. Thank you sincerely for considering my application — I look forward to the possibility of contributing to ${company || 'your organization'}.

Sincerely,
John Doe
johndoe@email.com | +91-9876543210 | linkedin.com/in/johndoe`;

export default function CoverLetter() {
  const [form, setForm]       = useState({ jobTitle: '', company: '', requirements: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState('');
  const [copied, setCopied]   = useState(false);
  const [dots, setDots]       = useState('');

  const animateDots = () => {
    let i = 0;
    const iv = setInterval(() => setDots('.'.repeat((i++ % 3) + 1)), 400);
    return iv;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    if (!form.jobTitle.trim()) { setError('Please enter the job title.'); return; }
    setLoading(true); setError(''); setResult(null);
    const iv = animateDots();
    try {
      const res = await aiService.generateCoverLetter(form);
      setResult(res.data);
    } catch {
      setResult({
        coverLetter: MOCK_LETTER(form.jobTitle, form.company),
        jobTitle: form.jobTitle,
        company: form.company,
        wordCount: MOCK_LETTER(form.jobTitle, form.company).split(/\s+/).length,
      });
    } finally {
      setLoading(false);
      clearInterval(iv);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result?.coverLetter || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result?.coverLetter || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `cover_letter_${form.jobTitle.replace(/\s+/g, '_')}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-5">

      {/* Input section */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
          <FiMail size={16} className="text-primary-400" /> Generate Cover Letter
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Job Title <span className="text-red-400">*</span></label>
            <input
              id="cl-job-title"
              type="text"
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Java Backend Developer"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Company Name</label>
            <input
              id="cl-company"
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. TechCorp Solutions"
              className="input-field"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Key Requirements <span className="text-slate-600">(optional)</span></label>
          <textarea
            id="cl-requirements"
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder="Paste key job requirements or anything specific you'd like highlighted in your cover letter..."
            rows={4}
            className="input-field resize-none leading-relaxed text-sm"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2">
            <FiAlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          id="generate-cl-btn"
          onClick={handleGenerate}
          disabled={loading || !form.jobTitle.trim()}
          className="btn-primary flex items-center gap-2"
        >
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Writing{dots}</>
            : <><FiMail size={16} />Generate Cover Letter</>}
        </button>
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="glass-card p-8 text-center animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="w-16 h-16 border-4 border-dark-700 border-t-primary-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FiFileText size={18} className="text-primary-400" />
            </div>
          </div>
          <p className="text-white font-semibold">AI is writing your cover letter{dots}</p>
          <p className="text-slate-500 text-sm mt-1">Crafting a personalized, professional letter...</p>
        </div>
      )}

      {/* Generated letter */}
      {result && !loading && (
        <div className="animate-fade-in space-y-4">
          {/* Header bar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="badge-green">Cover Letter Ready</span>
              <span className="text-xs text-slate-500">{result.wordCount} words</span>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
                <FiCopy size={14} /> {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={handleDownload} className="btn-secondary flex items-center gap-2 text-sm py-2 px-4">
                <FiDownload size={14} /> Download
              </button>
              <button onClick={() => { setResult(null); setForm({ ...form }); }} className="btn-secondary flex items-center gap-2 text-sm py-2 px-4">
                <FiRefreshCw size={14} /> Regenerate
              </button>
            </div>
          </div>

          {/* Letter preview */}
          <div className="glass-card p-6 border border-dark-700"
            style={{ background: 'rgba(30,41,59,0.9)' }}>
            <div className="max-w-2xl mx-auto">
              {/* Letterhead accent */}
              <div className="border-b border-primary-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <FiMail size={12} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary-400">Cover Letter</p>
                    {result.jobTitle && <p className="text-xs text-slate-500">{result.jobTitle}{result.company ? ` @ ${result.company}` : ''}</p>}
                  </div>
                </div>
              </div>

              {/* Letter body */}
              <pre className="text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {result.coverLetter}
              </pre>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <EmptyState
          icon={FiMail}
          title="No Cover Letter Yet"
          description="Fill in the job details above and click Generate. Our AI will craft a professional, personalized cover letter in seconds."
        />
      )}
    </div>
  );
}
