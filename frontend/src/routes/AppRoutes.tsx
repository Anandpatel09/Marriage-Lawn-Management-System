import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Contact from "../pages/public/Contact";




const AppRoutes = () => {
    return (
        <Routes>

            {/* Customer */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />


            {/* Authentication */}


        </Routes>
    );
};

export default AppRoutes;