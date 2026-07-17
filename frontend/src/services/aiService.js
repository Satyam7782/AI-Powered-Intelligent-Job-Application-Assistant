import api from './api';
export const aiService = {
  analyzeATS:          (formData) => api.post('/ai/ats-analysis', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  recommendJobs:       ()         => api.get('/ai/recommend-jobs'),
  tailorResume:        (formData) => api.post('/ai/tailor-resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  generateCoverLetter: (data)     => api.post('/ai/cover-letter', data),
};
