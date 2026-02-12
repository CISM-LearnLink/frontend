import client from './client';

const API_URL = '/bookings';

export const getBookings = async () => {
  const res = await client.get(API_URL);
  return res.data;
};

export const createBooking = async (bookingData) => {
  const res = await client.post(API_URL, bookingData);
  return res.data;
};

export const getBookingById = async (id) => {
  const res = await client.get(`${API_URL}/${id}`);
  return res.data;
}; 