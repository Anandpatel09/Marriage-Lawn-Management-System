import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Contact from "../pages/public/Contact";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";




const AppRoutes = () => {
    return (
        <Routes>

            {/* Customer */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/singnin" element={<Register />} />
            <Route path="/login" element={<Login />} />


            {/* Authentication */}


        </Routes>
    );
};

export default AppRoutes;