import request from "./request";

const baseUrl = 'http://localhost:8080/api/users';

export const useLogin = () => {
    const login = async (username, password) => {
        const result = await request.post(`${baseUrl}/login`, {username, password});
    
        return result;
    }
    
    return {
        login,
    }
}