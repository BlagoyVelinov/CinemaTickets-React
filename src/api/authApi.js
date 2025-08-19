import { useCallback, useContext, useEffect, useRef, useState } from "react";
import request from "./request";
import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

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
    const { id,username } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserById = async (userId) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return;
        }

        const options = { headers: { Authorization: `Bearer ${accessToken}` } };

        const result = await request.get(`${baseUrl}/user/${userId}`, null, options);
        return result;
      };

    const fetchUserByUsername = async (username) => {
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

    useEffect(() => {
        const identifier = id || username;
        if (!identifier) {
            setUser(null); 
            return; 
        }

        setLoading(true);
        setError(null);
        
        const fetcher = id ? fetchUserById : fetchUserByUsername;
        fetchUserByUsername(username)
        fetcher(identifier)
            .then(result => {
                setUser(result);
            })
            .catch(err => {
                setError(err);
                console.error('Failed to fetch user:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, username]);

    return {
        user,
        loading,
        error,
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
        console.error(e);
        return false;
    }
};

export const useAllUsers = () => {
    const [users, setUsers] = usePersistedState('allUsers', []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setLoading(false);
                return;
            }

            const options = {
                headers: { 
                    Authorization: `Bearer ${accessToken}`
                }
            }
        
            const result = await request.get(`${baseUrl}/all-users`, null, options);
            setUsers(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [setUsers]);

    useEffect(() => {
        if (!users || users.length === 0) {
            fetchAllUsers();
        }
    }, [users, fetchAllUsers]);

    return{
        users,
        loading,
        error,
        refetch: fetchAllUsers
    };
};

export const useEditUser = () => {
    const abortRef = useRef(new AbortController());
    
    const editUserData = async ( id, userData ) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            if (!accessToken) {
                return;
            }

            const options = {
                headers: { Authorization: `Bearer ${accessToken}`},
                signal: abortRef.current.signal,
            }
            
            const result = await request.put(
                `${baseUrl}/user/${id}`, userData, options);
            
            return result;
        } catch (error) {
            console.error('Edit failed:', error);
            throw error;
        }
    }
    
    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, []);
    
    return {
        editUserData,
    }
};