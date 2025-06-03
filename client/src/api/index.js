import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const previewAudience = (query) => api.post('/campaigns/preview', { query });
export const createCampaign = (payload) => api.post('/campaigns/create', payload);
export const getCampaigns = () => api.get('/campaigns');

export default api;
