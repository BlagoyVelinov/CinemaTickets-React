import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../../api/authApi";

export default function AuthGuard() {
    const isLoggedIn = useAuthStatus();
    if (!isLoggedIn) {
        return <Navigate to="/users/login" />;
    }
    return <Outlet />;
}