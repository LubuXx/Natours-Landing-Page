import { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest, signup as signupRequest, logout as logoutRequest } from '../services/authService';
import { getMe } from "../services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getMe();
                setUser(data.data.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            };
        };

        checkAuth();
    }, []);

    const login = async credentials => {
        const data = await loginRequest(credentials);
        setUser(data.data.user);
        return data;
    };

    const signup = async userData => {
        const data = await signupRequest(userData);
        setUser(data.data.user);
        return data;
    };

    const logout = async () => {
        await logoutRequest();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user}}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};