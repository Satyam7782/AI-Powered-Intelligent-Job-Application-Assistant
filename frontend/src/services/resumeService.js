import api from './api';
export const resumeService = {
  uploadResume: (formData) => api.post('/resume/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getResume:    () => api.get('/resume'),
};
