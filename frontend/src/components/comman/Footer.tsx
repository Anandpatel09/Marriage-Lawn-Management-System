import { Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-[#241d18] border-t border-[#3a302a] text-white">

            {/* Footer Content */}
            <div className="max-w-5xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="text-sm font-medium mb-3">
                            Durga Marriage lawns
                        </h2>

                        <p className="text-xs leading-5 text-[#a99c94] max-w-xs">
                            Durga Marriage lawns,
                            hosting celebrations since 2022.
                        </p>
                    </div>


                    {/* Explore */}
                    <div>
                        <h3 className="text-xs font-semibold mb-3">
                            Explore
                        </h3>

                        <div className="space-y-2">
                            <a
                                href="#"
                                className="block text-xs text-[#a99c94] hover:text-white transition"
                            >
                                Our Lawns
                            </a>

                            <a
                                href="#"
                                className="block text-xs text-[#a99c94] hover:text-white transition"
                            >
                                Packages
                            </a>

                            <a
                                href="#"
                                className="block text-xs text-[#a99c94] hover:text-white transition"
                            >
                                Check Availability
                            </a>
                        </div>
                    </div>


                    {/* Company */}
                    <div>
                        <h3 className="text-xs font-semibold mb-3">
                            Company
                        </h3>

                        <div className="space-y-2">
                            <a
                                href="#"
                                className="block text-xs text-[#a99c94] hover:text-white transition"
                            >
                                About Us
                            </a>

                            <a
                                href="#"
                                className="block text-xs text-[#a99c94] hover:text-white transition"
                            >
                                Contact
                            </a>

                            <a
                                href="#"
                                className="block text-xs text-[#a99c94] hover:text-white transition"
                            >
                                Admin Console
                            </a>
                        </div>
                    </div>


                    {/* Contact */}
                    <div>
                        <h3 className="text-xs font-semibold mb-3">
                            Talk to us
                        </h3>

                        <div className="space-y-2">

                            <div className="flex items-center gap-2">
                                <Phone
                                    size={13}
                                    className="text-[#a99c94]"
                                />

                                <span className="text-xs text-[#a99c94]">
                                    +91 9335056579
                                </span>
                            </div>

                            <p className="text-xs text-[#a99c94]">
                                Tonk Road, Jaipur, Rajasthan
                            </p>

                        </div>
                    </div>

                </div>

            </div>


            {/* Copyright */}
            <div className="border-t border-[#3a302a]">

                <div className="max-w-5xl mx-auto px-6 py-3 text-center">

                    <p className="text-[10px] text-[#857870]">
                        © 2026 Durga Marriage  Lawns. All rights reserved || Made with love 💛 by Anand .
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;