import api from './api';

export const getReviews = async () => {
    const response = await api.get('/reviews');
    return response.data;
};

export const getReview = async (id) => {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
};

export const createReview = async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
};

export const updateReview = async (id, reviewData) => {
    const response = await api.patch(`/reviews/${id}`, reviewData);
    return response.data;
};

export const deleteReview = async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
};