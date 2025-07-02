import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../../api/authApi";

export default function GuestGuard() {
    const isLoggedIn = useAuthStatus();
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}