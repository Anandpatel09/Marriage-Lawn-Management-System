import { CalendarPlus, Search, Sun, Bell } from "lucide-react";
import { useState } from "react";
import ConfirmedBookings from "./ConfirmedBooking";
import PendingBookings from "./pendingBooking";
import CompletedBookings from "./CompletedBooking";
import CancelledBookings from "./CanceledBooking";
import AllBookings from "./AllBooking";


import  { type Booking } from "./BookingTable";
const Bookings = () => {

    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");

    const bookings: Booking[] = [
        {
            id: "BKG-1042",
            customerName: "Aarav & Ishita Sharma",
            lawn: "Marigold Garden Lawn",
            event: "Wedding · Evening",
            date: "12 Sept 2026",
            guests: 480,
            amount: "₹7,85,000",
            payment: "Partial",
            status: "Confirmed",
        },
        {
            id: "BKG-1043",
            customerName: "Rohit Agarwal",
            lawn: "Marigold Garden Lawn",
            event: "Reception · Evening",
            date: "28 Aug 2026",
            guests: 300,
            amount: "₹4,25,000",
            payment: "Paid",
            status: "Confirmed",
        },
        {
            id: "BKG-1044",
            customerName: "Meera Rathore",
            lawn: "Heritage Courtyard",
            event: "Wedding · Full Day",
            date: "5 Nov 2026",
            guests: 190,
            amount: "₹11,50,000",
            payment: "Partial",
            status: "Pending",
        },
        {
            id: "BKG-1045",
            customerName: "Kabir Jain",
            lawn: "Royal Palms Banquet Lawn",
            event: "Sangeet · Evening",
            date: "19 Aug 2026",
            guests: 240,
            amount: "₹2,65,000",
            payment: "Unpaid",
            status: "Pending",
        },
        {
            id: "BKG-1046",
            customerName: "Sanya & Vikram Mehta",
            lawn: "Marigold Garden Lawn",
            event: "Wedding · Full Day",
            date: "2 Dec 2026",
            guests: 500,
            amount: "₹7,85,000",
            payment: "Paid",
            status: "Confirmed",
        },
        {
            id: "BKG-1039",
            customerName: "Meera Rathore",
            lawn: "Royal Palms Banquet Lawn",
            event: "Engagement · Morning",
            date: "22 May 2026",
            guests: 180,
            amount: "₹2,65,000",
            payment: "Paid",
            status: "Completed",
        },
        {
            id: "BKG-1038",
            customerName: "Aarav & Ishita Sharma",
            lawn: "Heritage Courtyard",
            event: "Mehendi · Morning",
            date: "11 Apr 2026",
            guests: 120,
            amount: "₹4,25,000",
            payment: "Partial",
            status: "Cancelled",
        },
    ];

    /*
     * Search
     */
    const filteredBookings = bookings.filter((booking) => {

        const value = search.toLowerCase();

        return (
            booking.id.toLowerCase().includes(value) ||
            booking.customerName.toLowerCase().includes(value) ||
            booking.lawn.toLowerCase().includes(value)
        );
    });

    /*
     * Render selected component
     */
    const renderBookings = () => {

        switch (activeTab) {

            case "Confirmed":
                return (
                    <ConfirmedBookings
                        bookings={filteredBookings}
                    />
                );

            case "Pending":
                return (
                    <PendingBookings
                        bookings={filteredBookings}
                    />
                );

            case "Completed":
                return (
                    <CompletedBookings
                        bookings={filteredBookings}
                    />
                );

            case "Cancelled":
                return (
                    <CancelledBookings
                        bookings={filteredBookings}
                    />
                );

            default:
                return (
                    <AllBookings
                        bookings={filteredBookings}
                    />
                );
        }
    };

    return (

        <div className="min-h-screen bg-[#17120f] text-white">

            {/* ================= HEADER ================= */}

            <header className="h-[72px] border-b border-[#342c27] flex items-center justify-between px-5 md:px-7">

                <div>

                    <h1 className="text-2xl font-serif">
                        Bookings
                    </h1>

                    <p className="text-sm text-[#9d9189]">
                        {bookings.length} of {bookings.length} bookings
                    </p>

                </div>


                <div className="flex items-center gap-4">

                    <button
                        className="hidden sm:flex items-center gap-2 bg-[#d8a849] text-black px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#c99a3d] transition"
                    >
                        <CalendarPlus size={17} />
                        New booking
                    </button>

                    <button className="text-[#c5bbb4] hover:text-white">
                        <Sun size={19} />
                    </button>

                    <button className="text-[#c5bbb4] hover:text-white">
                        <Bell size={19} />
                    </button>

                    <div className="w-9 h-9 rounded-full bg-[#a94b3f] flex items-center justify-center text-sm">
                        RC
                    </div>

                </div>

            </header>


            {/* ================= CONTENT ================= */}

            <main className="p-5 md:p-7">

                {/* Filters */}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

                    {/* Status Tabs */}

                    <div className="flex flex-wrap items-center gap-1 bg-[#2b231e] p-1 rounded-lg w-fit">

                        {[
                            "All",
                            "Confirmed",
                            "Pending",
                            "Completed",
                            "Cancelled",
                        ].map((tab) => (

                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    px-4 py-2 rounded-md text-sm transition
                                    ${
                                        activeTab === tab
                                            ? "bg-[#17120f] text-white shadow"
                                            : "text-[#b7aaa1] hover:text-white"
                                    }
                                `}
                            >
                                {tab}
                            </button>

                        ))}

                    </div>


                    {/* Search */}

                    <div className="relative w-full lg:w-80">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#80756e]"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search bookings"
                            className="
                                w-full
                                h-10
                                pl-10
                                pr-4
                                rounded-lg
                                bg-transparent
                                border border-[#4b4039]
                                text-sm
                                text-white
                                placeholder-[#80756e]
                                outline-none
                                focus:border-[#d8a849]
                            "
                        />

                    </div>

                </div>


                {/* ================= TABLE ================= */}

                <div className="border border-[#403831] rounded-xl bg-[#241d18] overflow-hidden">

                    {renderBookings()}

                </div>

            </main>

        </div>
    );
};

export default Bookings;