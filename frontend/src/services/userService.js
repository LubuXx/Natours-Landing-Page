import api from './api';

export const getMe = async () => {
    const response = await api.get('/users/me');
    return response.data;
};

export const updateMe = async userData => {
    const response = await api.patch('/users/updateMe', userData);
    return response.data;
};

export const updateMyPassword = async passwordData => {
    const response = await api.patch('/users/updateMyPassword', passwordData);
    return response.data;
};

export const deleteMe = async () => {
    const response = await api.delete('/users/deleteMe');
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const getUser = async id => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

export const createUser = async userData => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
};

export const deleteUser = async id => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};