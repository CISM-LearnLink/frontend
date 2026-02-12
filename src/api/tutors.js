import client from './client';

const API_URL = '/tutors';

export const getTutors = async (params = {}) => {
  const res = await client.get(API_URL, { params });
  return res.data;
};

export const getTutorById = async (id) => {
  const res = await client.get(`${API_URL}/${id}`);
  return res.data;
}; 