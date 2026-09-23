import { useState } from "react";
import { useAuth } from "./useAuth";

export const useSignup = () => {
    const { signup } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const signupUser = async userData => {
        try {
            setIsLoading(true);
            setError(null);
            await signup(userData);
        } catch (err) {
            setError(err.response?.data?.error?.errors || err.response?.data?.message || 'Something went wrong. Please try again later!');
            throw err;
        } finally {
            setIsLoading(false);
        };
    };

    return { signupUser, isLoading, error };
};