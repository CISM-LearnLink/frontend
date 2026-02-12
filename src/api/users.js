import client from './client';

const API_URL = '/users';

export const getUserById = async (id) => {
  const res = await client.get(`${API_URL}/${id}`);
  return res.data;
};

export const getAllUsers = async () => {
  const res = await client.get(API_URL);
  return res.data;
}; 