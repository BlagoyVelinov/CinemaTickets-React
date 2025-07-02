import { createContext, useContext } from "react";

export const UserContext = createContext({
    id: 0,
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});

export function useUserContext() {
    return useContext(UserContext);
}