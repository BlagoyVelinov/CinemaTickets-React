import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const UserContext = createContext({
    id: 0,
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});

export function UserProvider({ 
    children,
}) {
    const [authData, setAuthData] = usePersistedState('authData', {});

    const userLoginHandler = (resultData) => {        
        setAuthData(resultData);
    };

    const userLogoutHandler = () => {        
        setAuthData({});
    };

    return(
        <UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
            {children}
        </UserContext.Provider>
    );
}