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

import BookingsPublic from "../pages/public/Booking-Public";
import BookNow from "../pages/public/BookNow";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProfile from "../pages/admin/adminNavbarData/AdminProfile";
import UserProfile from "../pages/customer/UserProfile";
import Availability from "../pages/admin/Availability";
import Bookings from "../pages/admin/Booking/Bookings";

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
                    path="/profile"
                    element={<UserProfile />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/bookings-public"
                    element={<BookingsPublic />}
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

            <Route
                path="/admin/profile"
                element={<AdminProfile />}
            />
            <Route
                path="/admin/availability"
                element={<Availability />}
            />

            <Route
                path="/admin/bookings"
                element={<Bookings />}
            />
        </Routes>
    );
};

export default AppRoutes;