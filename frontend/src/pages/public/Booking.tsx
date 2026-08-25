import React, { useState } from "react";
import {
  CalendarDays,
  MapPin,
} from "lucide-react";

import Navbar from "../../components/comman/Navbar";
import Footer from "../../components/comman/Footer";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = [
    {
      id: "BKG-1042",
      title: "Wedding at Marigold Garden Lawn",
      status: "Confirmed",
      date: "12 Sept 2026",
      time: "Evening",
      guests: "480 guests",
      total: "₹85,000",
      paid: "₹40,000",
    },
    {
      id: "BKG-1043",
      title: "Reception at Marigold Garden Lawn",
      status: "Confirmed",
      date: "28 Aug 2026",
      time: "Evening",
      guests: "300 guests",
      total: "₹45,000",
      paid: "₹45,000",
    },
    {
      id: "BKG-1044",
      title: "Wedding at Heritage Courtyard",
      status: "Pending",
      date: "5 Nov 2026",
      time: "Full day",
      guests: "150 guests",
      total: "₹1,50,000",
      paid: "₹30,000",
    },
    {
      id: "BKG-1045",
      title: "Sangeet at Royal Palms Banquet Lawn",
      status: "Pending",
      date: "19 Aug 2026",
      time: "Evening",
      guests: "240 guests",
      total: "₹65,000",
      paid: "₹0",
    },
    {
      id: "BKG-1046",
      title: "Wedding at Marigold Garden Lawn",
      status: "Confirmed",
      date: "2 Dec 2026",
      time: "Full day",
      guests: "500 guests",
      total: "₹85,000",
      paid: "₹85,000",
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-[#17120f] text-white">

      <Navbar />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 sm:px-6">

        <div className="w-full max-w-3xl mx-auto">

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-medium mb-5">
            My bookings
          </h1>


          {/* Tabs */}
          <div className="inline-flex p-0.5 bg-[#2b231e] rounded-md mb-4">

            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-3 py-1 text-[10px] rounded transition ${
                activeTab === "upcoming"
                  ? "bg-[#17120f] text-white"
                  : "text-[#8f827a]"
              }`}
            >
              Upcoming
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`px-3 py-1 text-[10px] rounded transition ${
                activeTab === "past"
                  ? "bg-[#17120f] text-white"
                  : "text-[#8f827a]"
              }`}
            >
              Past
            </button>

          </div>


          {/* Booking Cards */}
          <div className="space-y-3">

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="border border-[#463b34] bg-[#241d18] rounded-lg p-2 sm:p-6"
              >

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_150px] gap-4">

                  {/* Left */}
                  <div>

                    <div className="flex items-center gap-2 flex-wrap">

                      <h2 className="text-xl font-medium text-white">
                        {booking.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded text-[10px] border mt-1 ${
                          booking.status === "Confirmed"
                            ? "text-[#62b879] border-[#315c3c] bg-[#1d2d21]"
                            : "text-[#d8a849] border-[#795b22] bg-[#302719]"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </div>


                    {/* Date */}
                    <div className="flex items-center gap-1.5 mt-2 text-[15px] text-[#9e9188]">

                      <CalendarDays size={11} />

                      <span>
                        {booking.date} · {booking.time}
                      </span>

                    </div>


                    {/* Guests */}
                    <div className="flex items-center gap-1.5 mt-1.5 text-[15px] text-[#9e9188]">

                      <MapPin size={11} />

                      <span>
                        {booking.guests} · Booking {booking.id}
                      </span>

                    </div>

                  </div>


                  {/* Right */}
                  <div className="sm:border-l sm:border-[#3b322c] sm:pl-4">

                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#9e9188]">
                        Total
                      </span>

                      <span className="text-white">
                        {booking.total}
                      </span>
                    </div>


                    <div className="flex justify-between mt-1 text-[14px]">
                      <span className="text-[#9e9188]">
                        Paid
                      </span>

                      <span className="text-[#55a966]">
                        {booking.paid}
                      </span>
                    </div>


                    {/* Progress */}
                    <div className="w-full h-1 bg-[#352c26] rounded-full mt-2 overflow-hidden">

                      <div
                        className="h-full bg-[#d8a849]"
                        style={{
                          width: `${
                            booking.total === "₹0"
                              ? 0
                              : Math.min(
                                  (parseInt(
                                    booking.paid.replace(/[₹,]/g, "")
                                  ) /
                                    parseInt(
                                      booking.total.replace(/[₹,]/g, "")
                                    )) *
                                    100,
                                  100
                                )
                          }%`,
                        }}
                      />

                    </div>


                    {/* Contact */}
                    <button
                      className="w-full mt-2 py-1 border border-[#51463e] rounded text-[11px] text-white hover:bg-[#302721] transition"
                    >
                      Contact coordinator
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>
      <Footer/>

    </div>
  );
};

export default Bookings;