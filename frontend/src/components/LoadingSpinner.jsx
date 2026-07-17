const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const s = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-14 h-14' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`${s[size]} border-[3px] border-dark-700 border-t-primary-500 rounded-full animate-spin`} />
      {text && <p className="text-slate-400 text-sm animate-pulse">{text}</p>}
    </div>
  );
};
export default LoadingSpinner;
