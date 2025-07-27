import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function AdminGuard() {
    const { admin, username } = useUserContext();
    
    if (!username) {
        return <Navigate to="/users/login" />;
    }
    
    if (!admin) {
        return <Navigate to="/" />;
    }
    
    return <Outlet />;
} 