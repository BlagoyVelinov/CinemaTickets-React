import { useEffect, useRef } from "react";
import request from "./request";

const baseUrl = 'http://localhost:8080/api/users';

export const useLogin = () => {
    const abortRef = useRef(new AbortController());

    const login = async (username, password) => {
        try {
            if (!username || !password) {
                throw new Error('Username and password are required');
            }

            if (username.trim().length < 5) {
                throw new Error('Username must be at least 5 characters long');
            }

            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            const result = await request.post(
                `${baseUrl}/login`,
                {username, password},
                { signal: abortRef.current.signal}
            );
            
            return result;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    
    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, []);
    
    return {
        login,
    }
}

export const useRegister = () => {
    const abortRef = useRef(new AbortController());

    const register = async (userData) => {
        try {
            const validation = userData.validate();
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            const result = await request.post(
                `${baseUrl}/register`,
                userData.toJSON(),
                { signal: abortRef.current.signal }
            );
            
            return result;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, []);
    
    return {
        register,
    }
}