const variants = {
  matched: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  missing:  'bg-red-500/15 text-red-400 border-red-500/30',
  neutral:  'bg-primary-500/15 text-primary-400 border-primary-500/30',
  amber:    'bg-amber-500/15 text-amber-400 border-amber-500/30',
  cyan:     'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
};

const SkillBadge = ({ label, variant = 'neutral', onRemove }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
    {label}
    {onRemove && (
      <button onClick={() => onRemove(label)} className="hover:opacity-70 transition-opacity leading-none">×</button>
    )}
  </span>
);
export default SkillBadge;
