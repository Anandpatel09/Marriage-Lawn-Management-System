import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Contact from "../pages/public/Contact";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import About from "../pages/public/About";
import Bookings from "../pages/public/Booking";
import BookNow from "../pages/public/BookNow";




const AppRoutes = () => {
    return (
        <Routes>

            {/* Customer */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/booknow" element={<BookNow />} />


            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />


            {/* Authentication */}


        </Routes>
    );
};

export default AppRoutes;