import api from './api';

export const signup = async userData  => {
    const response = await api.post('/users/signup', userData);
    return response.data;
};

export const login = async credentials => {
    const response = await api.post('/users/login', credentials);
    return response.data;
};

export const logout = async () => {
    const response = await api.get('/users/logout')
    return response.data;
}

export const forgotPassword = async email => {
    const response = await api.post('/users/forgotPassword', { email });
    return response.data;
};

export const resetPassword = async (token, passwordData) => {
    const response = await api.patch(`/users/resetPassword/${token}`, passwordData);
    return response.data;
};