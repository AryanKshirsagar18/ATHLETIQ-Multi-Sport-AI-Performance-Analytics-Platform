import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

// Formula 1 Endpoints
export const fetchF1Drivers = () => API.get('/f1/drivers');
export const fetchF1YoungTalent = () => API.get('/f1/young-talent');

// Cricket Endpoints
export const fetchCricketPlayers = () => API.get('/cricket/players');
export const fetchCricketYoungTalent = () => API.get('/cricket/young-talent');

// Football Endpoints
export const fetchFootballScorers = () => API.get('/football/scorers');
export const fetchFootballYoungTalent = () => API.get('/football/young-talent');

export default API;