import {
    Navigate,
    Routes,
    Route,
} from "react-router-dom";

import Home from "../pages/public/Home";
import Contact from "../pages/public/Contact";
import About from "../pages/public/About";
import Packages from "../pages/public/Packages";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Bookings from "../pages/public/Booking";
import BookNow from "../pages/public/BookNow";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";

const AppRoutes = () => {
    return (
        <Routes>

            {/* ================= AUTH ================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ================= PUBLIC ================= */}

            <Route
                path="/contact"
                element={<Contact />}
            />

            <Route
                path="/about"
                element={<About />}
            />

            <Route
                path="/packages"
                element={<Packages />}
            />


            {/* ================= PROTECTED ================= */}

            <Route element={<ProtectedRoute />}>

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/bookings"
                    element={<Bookings />}
                />

                <Route
                    path="/booknow"
                    element={<BookNow />}
                />

            </Route>


            {/* ================= ADMIN ================= */}

            <Route element={<AdminRoute />}>
                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />
            </Route>

        </Routes>
    );
};

export default AppRoutes;