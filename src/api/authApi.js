import { useContext, useEffect, useRef } from "react";
import request from "./request";
import { UserContext } from "../contexts/UserContext";

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
};

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
};

export const useLogout = () => {
    const { userLogoutHandler } = useContext(UserContext);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) {
            return;
        }
        const options = {
            headers: { 
                Authorization: `Bearer ${accessToken}`
            }
        }
    
        request.post(`${baseUrl}/logout`, null, options).then(()=> {
            userLogoutHandler();
        });
    
    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    }
    
};

export const useUser = () => {
    const fetchUser = async (username) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return;
        }
        const options = {
            headers: { 
                Authorization: `Bearer ${accessToken}`
            }
        }
    
        const result = await request.get(`${baseUrl}/${username}`, null, options);
        return result;
    }

    return {
        fetchUser,
    }
};

export const useAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    const authData = localStorage.getItem('authData');
    
    if (!accessToken || !authData) {
        return false;
    }
    
    try {
        const parsedAuthData = JSON.parse(authData);
        return !!(accessToken && parsedAuthData.username);
    } catch (e) {
        return false;
    }
};