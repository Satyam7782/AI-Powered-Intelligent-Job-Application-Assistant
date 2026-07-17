import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Landing        from './pages/Landing';
import Login          from './pages/Login';
import Register       from './pages/Register';
import Dashboard      from './pages/Dashboard';
import Profile        from './pages/Profile';
import ResumeUpload   from './pages/ResumeUpload';
import ATSAnalysis    from './pages/ATSAnalysis';
import JobRecommendation from './pages/JobRecommendation';
import ResumeTailoring   from './pages/ResumeTailoring';
import CoverLetter       from './pages/CoverLetter';

const Protected = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"              element={<Landing />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/register"      element={<Register />} />
        <Route path="/dashboard"     element={<Protected><Dashboard /></Protected>} />
        <Route path="/profile"       element={<Protected><Profile /></Protected>} />
        <Route path="/resume"        element={<Protected><ResumeUpload /></Protected>} />
        <Route path="/ats"           element={<Protected><ATSAnalysis /></Protected>} />
        <Route path="/jobs"          element={<Protected><JobRecommendation /></Protected>} />
        <Route path="/tailor"        element={<Protected><ResumeTailoring /></Protected>} />
        <Route path="/cover-letter"  element={<Protected><CoverLetter /></Protected>} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
