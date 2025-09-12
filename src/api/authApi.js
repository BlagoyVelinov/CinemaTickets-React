import { useCallback, useContext, useEffect, useRef, useState } from "react";
import request from "./request";
import { UserContext } from "../contexts/UserContext";

const BASE_URL = import.meta.env.VITE_CINEMA_AZURE_BASE_URL || import.meta.env.VITE_CINEMA_BASE_URL;

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
                `${BASE_URL}/users/login`,
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
                `${BASE_URL}/users/register`,
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
    
        request.post(`${BASE_URL}/users/logout`, null, options).then(()=> {
            userLogoutHandler();
        });
    
    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    }
    
};

export const useUser = (targetUserId) => {
    const { id, username, imageUrl: imageUrlFromContext } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserById = async (userId) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return;
        }

        const options = { 
            headers: { 
                Authorization: `Bearer ${accessToken}` 
            } 
        };

        const result = await request.get(`${BASE_URL}/users/user/${userId}`, null, options);
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
        };
    
        const result = await request.get(`${BASE_URL}/users/${username}`, null, options);
        return result;
    }

    useEffect(() => {
        const identifier = targetUserId || id || username;
        if (!identifier) {
            setUser(null); 
            return; 
        }

        setLoading(true);
        setError(null);
        
        const fetcher = targetUserId || id ? fetchUserById : fetchUserByUsername;
        fetcher(identifier)
            .then(result => {
                // Ensure imageUrl reflects the latest from context if available
                setUser(prev => ({ ...(result || {}), imageUrl: imageUrlFromContext ?? result?.imageUrl }));
            })
            .catch(err => {
                setError(err);
                console.error('Failed to fetch user:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [targetUserId, id, username]);

    // Update imageUrl reactively when context changes without refetch
    useEffect(() => {
        if (imageUrlFromContext) {
            setUser(prev => (prev ? { ...prev, imageUrl: imageUrlFromContext } : prev));
        }
    }, [imageUrlFromContext]);

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
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userLogoutHandler } = useContext(UserContext);

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
        
            const result = await request.get(`${BASE_URL}/users/all-users`, null, options);
            setUsers(result);
        } catch (error) {
            setError(error);
            if (error.message === 'Unauthorized or Forbidden') {
                userLogoutHandler();
            }
        } finally {
            setLoading(false);
        }
    }, [userLogoutHandler, setUsers]);

    useEffect(() => {
        if (users.length === 0 && !loading) {
            fetchAllUsers();
        }
    }, [users, loading, fetchAllUsers]);

    return{
        users,
        loading,
        error,
        fetchAllUsers
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

            if (abortRef.current) {
                abortRef.current.abort();
            }

            const controller = new AbortController();
            abortRef.current = controller;

            const options = {
                headers: { Authorization: `Bearer ${accessToken}`},
                signal: controller.signal,
            }
            
            const result = await request.put(
                `${BASE_URL}/users/user/${id}`, userData, options);
            
            return result;
        } catch (error) {
            if (error && (error.name === 'AbortError' || error.code === 'ERR_CANCELED')) {
                return;
            }
            console.error('Edit failed:', error);
            throw error;
        }
    }
    
    useEffect(() => {
        return () => {
            const currentController = abortRef.current;
            if (currentController && !currentController.signal.aborted) {
                currentController.abort();
            }
        };
    }, []);
    
    return {
        editUserData,
    }
};

export const useDeleteUser = () => {

    const deleteUser = async ( userId ) => {

        try {
            const accessToken = localStorage.getItem("accessToken");
            const result = await request.delete(`${BASE_URL}/users/delete-user/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(result);
            return result;
            
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    return {
        deleteUser,
    }
};