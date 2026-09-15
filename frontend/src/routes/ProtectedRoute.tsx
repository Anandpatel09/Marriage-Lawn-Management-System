import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const {
        isAuthenticated,
        loading,
    } = useAuth();

    const location = useLocation();

    // Wait until authentication check is complete
    if (loading) {
        return (
            <div className="min-h-screen bg-[#17120f] flex items-center justify-center text-white">
                Checking authentication...
            </div>
        );
    }

    // User is not logged in
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // User is logged in
    return <Outlet />;
};

export default ProtectedRoute;