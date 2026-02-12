import client from './client';

export const register = async (userData) => {
  const res = await client.post('/auth/register', userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await client.post('/auth/login', userData);
  return res.data;
}; 