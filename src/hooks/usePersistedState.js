import { useState } from "react";

export default function usePersistedState(stateKey, initialState) {

    const [state, setState] = useState(() => {
        try {
            const persistedState = localStorage.getItem(stateKey);
            if (!persistedState) {
                return typeof initialState === 'function' 
                    ? initialState() 
                    : initialState;
            }
            return JSON.parse(persistedState);
        } catch (e) {
            return typeof initialState === 'function' 
                ? initialState() 
                : initialState;
        }
    });

    const setPersistedState = (input) => {
        const data = typeof input === 'function' 
            ? input(state) 
            : input;

            try {
                const persistedData = JSON.stringify(data);
                localStorage.setItem(stateKey, persistedData);
            } catch (e) {
                console.error("Failed to save to localStorage", e);
            }
        setState(data);
    };

    return [state, setPersistedState];
}