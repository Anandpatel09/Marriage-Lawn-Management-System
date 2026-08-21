const Navbar = () => {
    return (
        <nav className="w-full h-14 bg-[#17120f] border-b border-[#2f2824] flex items-center px-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-14 h-10 bg-[#a94b3f] rounded-lg flex items-center justify-center text-white text-lg font-serif">
                    DML
                </div>

                <div className="text-white w-50">
                    Durga Marriage Lawn
                </div>
            </div>


            {/* Navigation Links */}
            <div className="flex items-center ml-auto whitespace-nowrap">
                <a
                    href="/"
                    className="px-4 py-2 rounded-lg hover:bg-[#332a25] text-white text-sm font-medium"
                >
                    Home
                </a>

                <a
                    href="/lawns"
                    className="px-4 py-2 rounded-lg hover:bg-[#332a25] text-[#aaa19b] hover:text-white text-sm transition whitespace-nowrap font-medium"
                >
                    Our Lawns
                </a>

                <a
                    href="/packages"
                    className="px-4 py-2 rounded-lg hover:bg-[#332a25] text-[#aaa19b] hover:text-white text-sm transition  whitespace-nowrap font-medium"
                >
                    Packages
                </a>

                <a
                    href="/book"
                    className="px-4 py-2 rounded-lg hover:bg-[#332a25] text-[#aaa19b] hover:text-white text-sm transition whitespace-nowrap font-medium"
                >
                    Book Now
                </a>

                <a
                    href="/bookings"
                    className="px-4 py-2 rounded-lg hover:bg-[#332a25] text-[#aaa19b] hover:text-white text-sm transition font-medium whitespace-nowrap"
                >
                    My Bookings
                </a>

                <a
                    href="/about"
                    className="px-4 py-2 rounded-lg hover:bg-[#332a25] text-[#aaa19b] hover:text-white text-sm transition whitespace-nowrap font-medium"
                >
                    About
                </a>

                <a
                    href="/contact"
                    className="px-4 py-2 rounded-lg hover:bg-[#332a25] text-[#aaa19b] hover:text-white text-sm transition font-medium whitespace-nowrap"
                >
                    Contact
                </a>


                {/* Theme Button */}
                <button
                    type="button"
                    className="ml-3 w-10 h-10 hover:bg-[#332a25] hover:rounded-full flex items-center justify-center text-[#aaa19b] hover:text-white transition font-medium"
                >
                    ☼
                </button>


                {/* Profile */}
                <button
                    type="button"
                    className="ml-1 px-3 py-2 border border-[#4b4039] rounded-lg text-white hover:bg-[#2b211c] transition whitespace-nowrap"
                >
                    My Profile
                </button>


                {/* Sign In */}
                <button
                    type="button"
                    className="ml-2 px-3 py-2 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-medium rounded-lg transition whitespace-nowrap"
                >
                    Sign in
                </button>

            </div>

        </nav>
    );
};

export default Navbar;