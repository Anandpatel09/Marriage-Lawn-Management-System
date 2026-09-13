import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const AdminRoute = () => {
    const {
        user,
        isAuthenticated,
        loading,
    } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#17120f] flex items-center justify-center text-white">
                Checking authentication...
            </div>
        );
    }

    // Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but not admin
    if (user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;