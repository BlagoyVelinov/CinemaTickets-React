import { createContext, useContext } from "react";

export const UserContext = createContext({
    id: 0,
    username: '',
    accessToken: '',
    imageUrl: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
    userPatchAuthData: () => null,
});

export function useUserContext() {
    return useContext(UserContext);
}