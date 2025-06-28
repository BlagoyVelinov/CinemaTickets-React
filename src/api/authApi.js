import { useEffect, useRef } from "react";
import request from "./request";

const baseUrl = 'http://localhost:8080/api/users';

export const useLogin = () => {
    const abortRef = useRef(new AbortController());

    const login = async (username, password) => {
        const result = await request.post(
            `${baseUrl}/login`,
             {username, password},
             { signal: abortRef.current.signal}
            );
        
        return result;
    }
    
    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, []);
    
    return {
        login,
    }
}