import api from './api';

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
};

export const updateCurrentUser = async (id, userData) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};

export const deleteCurrentUser = async (id) => {
    const response = await api.deletee(`/users/${id}`);
    return response.data;
};