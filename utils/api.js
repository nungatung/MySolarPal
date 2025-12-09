import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // change to your local IP when testing on device
});

export const getRecommendations = (data) => API.post('/solar/recommendations', data);
export const getProductionGraph = (data) => API.post('/solar/monthly-production', data);
