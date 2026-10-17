// frontend/src/services/api.js

const BASE_URL = "https://athletiq-multi-sport-ai-performance-t4h1.onrender.com/api";

export const fetchF1Drivers = async () => {
  const response = await fetch(`${BASE_URL}/f1/drivers`);
  if (!response.ok) throw new Error("Failed to fetch F1 drivers");
  return response.json();
};

export const fetchF1YoungTalent = async () => {
  const response = await fetch(`${BASE_URL}/f1/young-talent`);
  if (!response.ok) throw new Error("Failed to fetch F1 young talent");
  return response.json();
};

export const fetchCricketPlayers = async () => {
  const response = await fetch(`${BASE_URL}/cricket/players`);
  if (!response.ok) throw new Error("Failed to fetch Cricket players");
  return response.json();
};

export const fetchCricketYoungTalent = async () => {
  const response = await fetch(`${BASE_URL}/cricket/young-talent`);
  if (!response.ok) throw new Error("Failed to fetch Cricket young talent");
  return response.json();
};

export const fetchFootballScorers = async () => {
  const response = await fetch(`${BASE_URL}/football/scorers`);
  if (!response.ok) throw new Error("Failed to fetch Football scorers");
  return response.json();
};

export const fetchFootballYoungTalent = async () => {
  const response = await fetch(`${BASE_URL}/football/young-talent`);
  if (!response.ok) throw new Error("Failed to fetch Football young talent");
  return response.json();
};