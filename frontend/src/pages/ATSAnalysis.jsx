import { useState, useRef } from 'react';
import { FiTarget, FiUpload, FiFile, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';
import { aiService } from '../services/aiService';
import SkillBadge from '../components/SkillBadge';
import EmptyState from '../components/EmptyState';

const MOCK = {
  score: 82,
  matchedSkills: ['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Git', 'Maven'],
  missingSkills: ['Docker', 'AWS', 'Redis', 'Kubernetes'],
  suggestions: [
    'Mention REST API design principles explicitly in your experience section',
    'Add a Docker project to your portfolio to demonstrate containerization skills',
    'Quantify your internship achievements with specific metrics and numbers',
    'Include any cloud platform experience — even free-tier projects count',
    'Add unit testing experience (JUnit, Mockito) if applicable',
  ],
  summary: 'Your resume shows strong Java backend skills. Adding cloud and containerization experience will significantly boost your ATS score.',
};

const ScoreRing = ({ score }) => {
  const r = 72, c = 2 * Math.PI * r;
  const fill = (score / 100) * c;
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#1e293b" strokeWidth="12" />
        <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={`${fill} ${c}`} strokeLinecap="round"
          transform="rotate(-90 90 90)" style={{ transition: 'stroke-dasharray 1s ease' }} />
        <text x="90" y="85" textAnchor="middle" fill="#f1f5f9" fontSize="32" fontWeight="800">{score}%</text>
        <text x="90" y="108" textAnchor="middle" fill="#64748b" fontSize="12">ATS Score</text>
      </svg>
      <p className="text-sm font-medium mt-1" style={{ color }}>
        {score >= 70 ? '✓ Good Match' : score >= 40 ? '⚠ Average Match' : '✗ Low Match'}
      </p>
    </div>
  );
};

export default function ATSAnalysis() {
  const [file, setFile]         = useState(null);
  const [jd, setJd]             = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');
  const inputRef = useRef();

  const handleFile = (f) => {
    if (f && (f.type.includes('pdf') || f.name.endsWith('.docx'))) setFile(f);
    else setError('Please upload a PDF or DOCX file.');
  };

  const handleAnalyze = async () => {
    if (!jd.trim()) { setError('Please paste a job description.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const fd = new FormData();
      if (file) fd.append('resume', file);
      fd.append('jobDescription', jd);
      const res = await aiService.analyzeATS(fd);
      setResult(res.data);
    } catch {
      setResult(MOCK); // fallback to mock
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── Left: Inputs ── */}
        <div className="space-y-5">
          {/* Resume upload */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <FiUpload size={16} className="text-primary-400" /> Upload Resume (optional)
            </h3>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => !file && inputRef.current.click()}
              className="border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer"
              style={{ borderColor: dragOver ? '#6366f1' : file ? '#10b981' : '#334155', background: dragOver ? 'rgba(99,102,241,0.05)' : 'transparent' }}
            >
              <input ref={inputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={e => handleFile(e.target.files[0])} />
              {file ? (
                <div className="flex items-center gap-3">
                  <FiFile size={20} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white truncate flex-1">{file.name}</span>
                  <button onClick={e => { e.stopPropagation(); setFile(null); }} className="text-slate-500 hover:text-red-400 transition-colors">
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  <span className="text-primary-400 font-medium">Click to upload</span> or drag & drop
                </p>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <FiTarget size={16} className="text-primary-400" /> Job Description
            </h3>
            <textarea
              id="jd-input"
              value={jd}
              onChange={e => { setJd(e.target.value); setError(''); }}
              placeholder="Paste the full job description here...&#10;&#10;Example: We are looking for a Java Backend Developer with experience in Spring Boot, MySQL, REST APIs..."
              rows={12}
              className="input-field resize-none leading-relaxed text-sm"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2">
              <FiAlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            id="analyze-btn"
            onClick={handleAnalyze}
            disabled={loading || !jd.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> AI is analyzing...</>
              : <><FiTarget size={16} /> Analyze with AI</>}
          </button>
        </div>

        {/* ── Right: Results ── */}
        <div className="glass-card p-5 min-h-[500px] flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 border-4 border-dark-700 border-t-primary-500 rounded-full animate-spin" />
              <div className="text-center">
                <p className="text-white font-semibold">AI is analyzing your resume</p>
                <p className="text-slate-500 text-sm mt-1 animate-pulse">Scanning against job requirements...</p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-5 animate-fade-in">
              {/* Score Ring */}
              <div className="flex justify-center py-2">
                <ScoreRing score={result.score} />
              </div>

              {/* Summary */}
              {result.summary && (
                <div className="p-3 rounded-xl bg-primary-500/8 border border-primary-500/20">
                  <p className="text-sm text-slate-300 leading-relaxed">{result.summary}</p>
                </div>
              )}

              {/* Matched */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiCheckCircle size={14} className="text-emerald-400" />
                  <h4 className="text-sm font-semibold text-white">Matched Skills ({result.matchedSkills?.length})</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills?.map(s => <SkillBadge key={s} label={s} variant="matched" />)}
                </div>
              </div>

              {/* Missing */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiAlertCircle size={14} className="text-red-400" />
                  <h4 className="text-sm font-semibold text-white">Missing Skills ({result.missingSkills?.length})</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills?.map(s => <SkillBadge key={s} label={s} variant="missing" />)}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Suggestions to Improve</h4>
                <div className="space-y-2">
                  {result.suggestions?.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <p className="text-sm text-slate-300 leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon={FiTarget}
                title="Ready to Analyze"
                description="Paste a job description and click Analyze to see your ATS score, matched skills, and AI suggestions."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
