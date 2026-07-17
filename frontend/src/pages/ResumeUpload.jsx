import { useState, useEffect, useRef } from 'react';
import { FiUpload, FiFile, FiCheckCircle, FiAlertCircle, FiTrash2, FiDownload, FiClock } from 'react-icons/fi';
import { resumeService } from '../services/resumeService';

const formatBytes = (b) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(2)} MB`;

const formatDate = (s) => {
  if (!s) return '';
  const d = new Date(s);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export default function ResumeUpload() {
  const [file, setFile]           = useState(null);
  const [dragOver, setDragOver]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState('');
  const [existing, setExisting]   = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    resumeService.getResume()
      .then(res => setExisting(res.data))
      .catch(() => {});
  }, []);

  const validateFile = (f) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(f.type) && !f.name.match(/\.(pdf|docx)$/i)) {
      setError('Only PDF and DOCX files are allowed.'); return false;
    }
    if (f.size > 10 * 1024 * 1024) { setError('File size must be under 10 MB.'); return false; }
    return true;
  };

  const handleFile = (f) => {
    setError(''); setSuccess(false);
    if (f && validateFile(f)) setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await resumeService.uploadResume(fd);
      setExisting(res.data);
      setSuccess(true);
      setFile(null);
    } catch {
      setError('Upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  const reset = () => { setFile(null); setSuccess(false); setError(''); };

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">

      {/* Existing resume card */}
      {existing && (
        <div className="glass-card p-5 border border-emerald-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <FiFile size={22} className="text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FiCheckCircle size={14} className="text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Current Resume</span>
              </div>
              <p className="font-semibold text-white truncate">{existing.filename}</p>
              <div className="flex items-center gap-3 mt-1">
                {existing.fileSize && <span className="text-xs text-slate-500">{formatBytes(existing.fileSize)}</span>}
                {existing.uploadedAt && (
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <FiClock size={11} /> {formatDate(existing.uploadedAt)}
                  </span>
                )}
              </div>
            </div>
            <button onClick={() => setExisting(null)} className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Upload zone */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-2">{existing ? 'Replace Resume' : 'Upload Your Resume'}</h3>
        <p className="text-slate-500 text-sm mb-5">Supports PDF and DOCX up to 10 MB</p>

        {success ? (
          <div className="text-center py-10 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle size={40} className="text-emerald-400" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Uploaded Successfully!</h4>
            <p className="text-slate-400 text-sm mb-6">Your resume has been saved and is ready for AI analysis.</p>
            <button onClick={reset} className="btn-secondary">Upload Another</button>
          </div>
        ) : (
          <>
            {/* Drop zone */}
            <div
              id="drop-zone"
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => !file && inputRef.current.click()}
              className="border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer"
              style={{
                borderColor: dragOver ? '#6366f1' : file ? '#10b981' : '#334155',
                background: dragOver ? 'rgba(99,102,241,0.05)' : file ? 'rgba(16,185,129,0.04)' : 'transparent',
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={e => handleFile(e.target.files[0])}
              />

              {file ? (
                <div className="animate-fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                    <FiFile size={32} className="text-emerald-400" />
                  </div>
                  <p className="font-semibold text-white">{file.name}</p>
                  <p className="text-slate-500 text-sm mt-1">{formatBytes(file.size)}</p>
                  <button onClick={e => { e.stopPropagation(); setFile(null); }}
                    className="mt-3 text-xs text-slate-500 hover:text-red-400 transition-colors">Remove</button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-dark-700 border border-dark-600 flex items-center justify-center mx-auto mb-4">
                    <FiUpload size={28} className="text-slate-500" />
                  </div>
                  <p className="font-semibold text-white mb-1">
                    {dragOver ? 'Drop it here!' : 'Drag & drop your resume'}
                  </p>
                  <p className="text-slate-500 text-sm">or <span className="text-primary-400 font-medium">browse to upload</span></p>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2">
                <FiAlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              id="upload-btn"
              onClick={handleUpload}
              disabled={!file || uploading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-5"
            >
              {uploading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</>
                : <><FiUpload size={16} /> Upload Resume</>}
            </button>
          </>
        )}
      </div>

      {/* Info box */}
      <div className="glass-card p-5">
        <h4 className="text-sm font-semibold text-white mb-3">Supported Formats</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { fmt: 'PDF', desc: 'Recommended format', icon: '📄' },
            { fmt: 'DOCX', desc: 'Microsoft Word', icon: '📝' },
          ].map(({ fmt, desc, icon }) => (
            <div key={fmt} className="flex items-center gap-3 p-3 rounded-xl bg-dark-900 border border-dark-700">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{fmt}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">Maximum file size: 10 MB</p>
      </div>
    </div>
  );
}
