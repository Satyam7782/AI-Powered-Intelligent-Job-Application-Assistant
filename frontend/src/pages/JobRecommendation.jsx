import { useState } from 'react';
import { FiBriefcase, FiMapPin, FiStar, FiArrowRight, FiZap } from 'react-icons/fi';
import { aiService } from '../services/aiService';
import EmptyState from '../components/EmptyState';
import SkillBadge from '../components/SkillBadge';

const MOCK_JOBS = [
  { title: 'Java Backend Developer', company: 'TechCorp Solutions', matchPercentage: 94, location: 'Bengaluru, India', type: 'Full-time', skills: ['Java', 'Spring Boot', 'MySQL', 'REST API'], description: 'Build and maintain scalable Java microservices for our enterprise platform. Work with cross-functional teams in an Agile environment.' },
  { title: 'Software Engineer', company: 'Innovate Systems', matchPercentage: 91, location: 'Hyderabad, India', type: 'Full-time', skills: ['Java', 'Spring', 'Agile', 'Git'], description: 'Join our growing team building cloud-native applications. Strong Java fundamentals required with willingness to learn new tech.' },
  { title: 'Backend Engineer', company: 'DataFlow Inc', matchPercentage: 88, location: 'Mumbai, India', type: 'Full-time', skills: ['Java', 'Kafka', 'PostgreSQL', 'Docker'], description: 'Design high-throughput data processing pipelines and RESTful APIs serving millions of requests daily.' },
  { title: 'QA Engineer', company: 'QualityFirst Labs', matchPercentage: 82, location: 'Pune, India', type: 'Full-time', skills: ['Selenium', 'Java', 'TestNG', 'JUnit'], description: 'Ensure product quality through automated testing frameworks. Java background a huge advantage.' },
];

const matchColor = (pct) => pct >= 90 ? '#10b981' : pct >= 80 ? '#6366f1' : '#f59e0b';
const matchBg    = (pct) => pct >= 90 ? 'rgba(16,185,129,0.12)' : pct >= 80 ? 'rgba(99,102,241,0.12)' : 'rgba(245,158,11,0.12)';

const SkeletonCard = () => (
  <div className="glass-card p-5 animate-pulse">
    <div className="flex justify-between mb-4">
      <div className="h-5 bg-dark-700 rounded w-2/3" />
      <div className="h-5 bg-dark-700 rounded w-14" />
    </div>
    <div className="h-4 bg-dark-700 rounded w-1/2 mb-3" />
    <div className="h-3 bg-dark-700 rounded w-full mb-2" />
    <div className="h-3 bg-dark-700 rounded w-4/5 mb-4" />
    <div className="flex gap-2">
      {[1,2,3].map(i => <div key={i} className="h-6 w-16 bg-dark-700 rounded-full" />)}
    </div>
  </div>
);

const JobCard = ({ job }) => {
  const color = matchColor(job.matchPercentage);
  const bg    = matchBg(job.matchPercentage);
  return (
    <div className="glass-card p-5 card-hover border border-dark-700 hover:border-primary-500/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-base leading-tight truncate">{job.title}</h3>
          <p className="text-slate-400 text-sm mt-0.5">{job.company}</p>
        </div>
        <div className="flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-bold"
          style={{ background: bg, color, border: `1px solid ${color}40` }}>
          {job.matchPercentage}%
        </div>
      </div>

      {/* Match bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-500">Match Score</span>
          <span className="text-xs font-semibold" style={{ color }}>{job.matchPercentage}% match</span>
        </div>
        <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${job.matchPercentage}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
        <span className="flex items-center gap-1"><FiMapPin size={11} />{job.location}</span>
        <span className="px-2 py-0.5 rounded-full bg-dark-700 text-slate-400">{job.type}</span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{job.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.map(s => <SkillBadge key={s} label={s} variant="neutral" />)}
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-primary-500/40 text-primary-400 text-sm font-medium hover:bg-primary-500/10 transition-all">
        View Details <FiArrowRight size={14} />
      </button>
    </div>
  );
};

export default function JobRecommendation() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs]       = useState(null);

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const res = await aiService.recommendJobs();
      setJobs(res.data);
    } catch {
      setJobs(MOCK_JOBS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-6">

      {/* Header */}
      <div className="glass-card p-6 text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}>
          <FiZap size={26} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">AI Job Recommendations</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-5">
          Our AI analyzes your profile and skills to find the best-matched job opportunities for you.
        </p>
        <button
          id="recommend-btn"
          onClick={handleRecommend}
          disabled={loading}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Finding Jobs...</>
            : <><FiBriefcase size={16} />Get AI Recommendations</>}
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : jobs ? (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-400">{jobs.length} jobs found based on your profile</p>
            <span className="badge-blue flex items-center gap-1"><FiStar size={11} /> AI Ranked</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jobs.map((job, i) => <JobCard key={i} job={job} />)}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={FiBriefcase}
          title="No Recommendations Yet"
          description="Click the button above and let our AI find the perfect job matches based on your skills and experience."
          action={
            <button onClick={handleRecommend} className="btn-primary flex items-center gap-2">
              <FiBriefcase size={16} /> Get Recommendations
            </button>
          }
        />
      )}
    </div>
  );
}
