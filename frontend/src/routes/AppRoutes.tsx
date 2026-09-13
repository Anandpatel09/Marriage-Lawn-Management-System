


import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Contact from "../pages/public/Contact";
import About from "../pages/public/About";
import Packages from "../pages/public/Packages";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import Bookings from "../pages/public/Booking";
import BookNow from "../pages/public/BookNow";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
// import AdminRoute from "../components/auth/AdminRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* ================= PUBLIC ROUTES ================= */}

            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/packages" element={<Packages />} />

            {/* Authentication */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />


            {/* ================= CUSTOMER / AUTHENTICATED ROUTES ================= */}

            <Route element={<ProtectedRoute />}>

                <Route
                    path="/bookings"
                    element={<Bookings />}
                />

                <Route
                    path="/booknow"
                    element={<BookNow />}
                />

            </Route>


            {/* ================= ADMIN ROUTES ================= */}

            <Route element={<AdminRoute />}>

                <Route
                    path="/admin/dashboard"
                    element={<div>Admin Dashboard</div>}
                />

            </Route>

        </Routes>
    );
};

export default AppRoutes;