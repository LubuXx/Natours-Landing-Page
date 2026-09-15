import { useState } from "react";
import { useAuth } from "./useAuth";

export const useLogin = () => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async credentials => {
        try {
            setIsLoading(true);
            setError(null);
            await login(credentials);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again later!');
            throw err;
        } finally {
            setIsLoading(false);
        };
    };

    return { loginUser, isLoading, error };
};