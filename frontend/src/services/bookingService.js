import api from './api';

export const getBookings = async () => {
    const response = await api.get('/bookings');
    return response.data;
};

export const getBooking = async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
};

export const createBooking = async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
};

export const updateBooking = async (id, bookingData) => {
    const response = await api.patch(`/bookings/${id}`, bookingData);
    return response.data;
};

export const deleteBooking = async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
};

export const getCheckoutSession = async (tourId) => {
    const response = await api.get(`/bookings/checkout-session/${tourId}`);
    return response.data;
};