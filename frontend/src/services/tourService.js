import api from './api';

export const getTours = async () => {
    const response = await api.get('/tours');
    return response.data;
};

export const getTour = async (id) => {
    const response = await api.get(`/tours/${id}`);
    return response.data;
};

export const createTour = async (tourData) => {
    const response = await api.post('/tours', tourData);
    return response.data;
};

export const updateTour = async (id, tourData) => {
    const response = await api.patch(`/tours/${id}`, tourData);
    return response.data;
};

export const deleteTour = async (id) => {
    const response = await api.delete(`/tours/${id}`);
    return response.data;
};

export const getTop5CheapTours = async () => {
    const response = await api.get('/tours/top-5-cheap');
    return response.data;
};

export const getMonthlyPlan = async (year) => {
    const response = await api.get(`/tours/monthly-plan/:${year}`);
    return response.data;
};