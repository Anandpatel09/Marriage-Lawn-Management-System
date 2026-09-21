import { Menu, Sun, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
        navigate("/login", { replace: true });
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <nav className="w-full sticky top-0 z-50 bg-[#17120f] border-b border-[#2f2824]">
                <div className="min-h-14 px-3 sm:px-4 flex items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 min-w-0">
                        <div className="w-11 h-9 sm:w-14 sm:h-10 shrink-0 bg-[#a94b3f] rounded-lg flex items-center justify-center text-white text-base sm:text-lg font-serif">
                            DML
                        </div>

                        <span className="text-white text-sm sm:text-lg font-medium truncate">
                            Durga Marriage Lawn
                        </span>
                    </Link>

                    {/* ================= DESKTOP ================= */}
                    <div className="hidden lg:flex items-center ml-auto gap-1">

                        <Link
                            to="/home"
                            className="px-3 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm"
                        >
                            Home
                        </Link>

                        <Link
                            to="/lawns"
                            className="px-3 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm"
                        >
                            Our Lawns
                        </Link>

                        <Link
                            to="/packages"
                            className="px-3 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm"
                        >
                            Packages
                        </Link>

                        <Link
                            to="/booknow"
                            className="px-3 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm"
                        >
                            Book Now
                        </Link>

                        <Link
                            to="/bookings-public"
                            className="px-3 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm"
                        >
                            Bookings
                        </Link>

                        <Link
                            to="/about"
                            className="px-3 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="px-3 py-2 rounded-lg text-[#aaa19b] hover:text-white text-sm"
                        >
                            Contact
                        </Link>

                        <button
                            className="w-9 h-9 flex items-center justify-center text-[#aaa19b] hover:text-white"
                        >
                            <Sun size={19} />
                        </button>

                        <button
                            onClick={() => navigate("/profile")}
                            className="px-3 py-2 border border-[#4b4039] rounded-lg text-white hover:bg-[#2b211c]"
                        >
                            My Profile
                        </button>

                        {user ? (
                            <div className="flex items-center gap-3 ml-2">
                                <span className="text-white text-sm font-medium">
                                    Hi, {user.first_name}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-medium rounded-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-medium rounded-lg"
                            >
                                Sign in
                            </button>
                        )}
                    </div>

                    {/* ================= TABLET / MOBILE ================= */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden ml-auto w-10 h-10 flex items-center justify-center text-white"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                />
            )}

            {/* ================= MOBILE SIDEBAR ================= */}
            <div
                className={`fixed top-0 right-0 h-full 
                    w-[85%] max-w-sm
                    bg-[#211914] z-50
                    transform transition-transform duration-300
                    lg:hidden
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="h-16 px-4 sm:px-5 flex items-center justify-between border-b border-[#3a302a]">
                    <span className="text-white text-lg font-medium">
                        Menu
                    </span>

                    <button
                        onClick={closeMenu}
                        className="w-10 h-10 flex items-center justify-center text-[#aaa19b] hover:text-white"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Links */}
                <div className="flex flex-col p-3 sm:p-4 gap-2 overflow-y-auto h-[calc(100%-64px)]">

                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-lg bg-[#332a25] text-white"
                    >
                        Home
                    </Link>

                    <Link
                        to="/lawns"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white"
                    >
                        Our Lawns
                    </Link>

                    <Link
                        to="/packages"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white"
                    >
                        Packages
                    </Link>

                    <Link
                        to="/booknow"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white"
                    >
                        Book Now
                    </Link>

                    <Link
                        to="/bookings"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white"
                    >
                        My Bookings
                    </Link>

                    <Link
                        to="/about"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white"
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white"
                    >
                        Contact
                    </Link>

                    <div className="border-t border-[#3a302a] my-2" />

                    <button
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#aaa19b] hover:bg-[#332a25] hover:text-white"
                    >
                        <Sun size={20} />
                        Theme
                    </button>

                    <button
                        onClick={() => {
                            closeMenu();
                            navigate("/profile");
                        }}
                        className="w-full px-4 py-3 border border-[#4b4039] rounded-lg text-white hover:bg-[#332a25]"
                    >
                        My Profile
                    </button>

                    {user ? (
                        <>
                            <div className="px-4 py-3 text-white text-sm font-medium">
                                Hi, {user.first_name} {user.last_name}
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 bg-[#d8a849] text-black rounded-lg font-medium hover:bg-[#c99a3d]"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                closeMenu();
                                navigate("/login");
                            }}
                            className="w-full px-4 py-3 bg-[#d8a849] text-black rounded-lg font-medium hover:bg-[#c99a3d]"
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;