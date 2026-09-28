import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

export const fetchF1Drivers = () => API.get('/f1/drivers');

export default API;