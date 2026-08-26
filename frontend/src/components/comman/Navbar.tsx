


import { Menu, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
     const navigat=useNavigate();

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <nav className="w-full sticky top-0 z-50 bg-[#17120f]  h-14 bg-[#17120f] border-b border-[#2f2824] flex items-center px-4 gap-3">


                {/* Logo */}
                <div className="flex items-center gap-1">
                    <div className="w-14 h-10 bg-[#a94b3f] rounded-lg flex items-center justify-center text-white text-lg font-serif ">
                        DML
                    </div>

                    <span className="text-white text-lg font-medium whitespace-nowrap">
                        Durga Marriage Lawn
                    </span>
                </div>


                {/* ================= DESKTOP MENU ================= */}
                <div className="hidden md:flex items-center ml-auto whitespace-nowrap gap">

                    <Link
                        to="/"
                        className="px-4 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm font-medium"                    >
                        Home
                    </Link>

                    <Link
                        to="/lawns"
                        className="px-4 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm transition"
                    >
                        Our Lawns
                    </Link>

                    <Link
                        to="/packages"
                        className="px-4 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm transition"
                    >
                        Packages
                    </Link>

                    <Link
                        to="/booknow"
                        className="px-4 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm transition"
                    >
                        Book Now
                    </Link>

                    <Link
                        to="/bookings"
                        className="px-4 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm transition"
                    >
                        Bookings
                    </Link>

                    <Link
                        to="/about"
                        className="px-4 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm transition"
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        className="px-4 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm transition"
                    >
                        Contact
                    </Link>

                    {/* Theme */}
                    <button
                        className="ml-2 w-10 h-10 flex items-center justify-center text-[#aaa19b] hover:text-white"
                    >
                        <Sun />
                    </button>

                    {/* Profile */}
                    <button
                        className="px-3 py-2 border border-[#4b4039] rounded-lg text-white hover:bg-[#2b211c] transition"
                    >
                        My Profile
                    </button>

                    {/* Sign In */}
                    <button
                    onClick={()=> navigat("/register")}
                    
                        className="ml-2 px-5 py-2 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-medium rounded-lg transition"
                    >
                        Sign in
                    </button>

                </div>


                {/* ================= MOBILE MENU BUTTON ================= */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden ml-auto w-10 h-10 flex items-center justify-center text-white text-2xl"
                >
                    <Menu />
                </button>

            </nav>


            {/* ================= MOBILE SIDEBAR ================= */}

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                />
            )}


            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-[#211914] z-50 transform transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >

                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-[#3a302a]">

                    <span className="text-white text-lg font-medium">
                        Menu
                    </span>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#aaa19b] hover:text-white text-2xl"
                    >
                        ×
                    </button>

                </div>


                {/* Sidebar Links */}
                <div className="flex flex-col p-4 gap-2">

                    <Link
                        to="/"
                        className="px-4 py-3 rounded-lg bg-[#332a25] text-white"
                    >
                        Home
                    </Link>

                    <Link
                        to="/lawns"
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white transition"
                    >
                        Our Lawns
                    </Link>

                    <Link
                        to="/packages"
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white transition"
                    >
                        Packages
                    </Link>

                    <Link
                        to="/book"
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white transition"
                    >
                        Book Now
                    </Link>

                    <Link
                        to="/bookings"
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white transition"
                    >
                        My Bookings
                    </Link>

                    <Link
                        to="/about"
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white transition"
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white transition"
                    >
                        Contact
                    </Link>


                    {/* Divider */}
                    <div className="border-t border-[#3a302a] my-3"></div>


                    {/* Theme */}
                    <button
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white"
                    >
                        <Sun />
                        Theme
                    </button>


                    {/* Profile */}
                    <button
                        className="w-full px-4 py-3 border border-[#4b4039] rounded-lg text-white hover:bg-[#332a25] transition"
                    >
                        My Profile
                    </button>


                    {/* Sign In */}
                    <button
                        className="w-full mt-1 px-4 py-3 bg-[#d8a849] text-black rounded-lg font-medium hover:bg-[#c99a3d]"
                    >
                        Sign in
                    </button>

                </div>

            </div>
        </>
    );
};

export default Navbar;