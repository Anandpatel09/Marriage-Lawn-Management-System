import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

import Navbar from "../../components/comman/Navbar";
import Footer from "../../components/comman/Footer";

const BookNow = () => {
  const [selectedDate, setSelectedDate] = useState(25);
  const [ocas,setOcas]=useState("Wedding")
  const [venue, setVenue] = useState("Marigold Garden Lawn");
  const [packageName, setPackageName] = useState("Golden Vivah");
  const [guests, setGuests] = useState(300);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState("");

  const basePrice = 78500;
  const extraPlates = Math.max(0, guests - 300);
  const extraPrice = extraPlates * 250;
  const subtotal = basePrice + extraPrice;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const days = [
    "",
    "",
    "",
    "",
    "",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  const occasions = [
  "Wedding",
  "Engagement",
  "Reception",
  "Sangeet",
  "Mehndi",
  "Haldi",
  "Roka Ceremony",
  "Birthday Party",
  "Anniversary",
  "Baby Shower",
  "Corporate Event",
  "Family Function",
  "Other",
];

  return (
    <div className="min-h-dvh flex flex-col bg-[#17120f] text-white">

      <Navbar />

      <main className="flex-1 px-4 py-8 sm:px-6">

        <div className="max-w-4xl mx-auto">

          {/* ================= HEADER ================= */}
          <div className="mb-6">

            <h1 className="text-2xl sm:text-3xl font-medium">
              Book your date
            </h1>

            <p className="text-[11px] text-[#9e9188] mt-1">
              We hold your date free for 48 hours after enquiry.
            </p>

          </div>


          {/* ================= TOP SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_198px] gap-4">


            {/* ================= DATE & VENUE ================= */}
            <section className="border border-[#4a4039] bg-[#241d18] rounded-lg p-3">

              <h2 className="text-xs font-semibold mb-4">
                Choose date & venue
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-[184px_1fr] gap-4">


                {/* Calendar */}
                <div className="border border-[#4a4039] bg-[#17120f] rounded-md p-3 w-75 h-75">

                  {/* Month */}
                  <div className="flex items-center justify-between mb-3">

                    <button className="text-[#9e9188] hover:text-white">
                      <ChevronLeft size={12} />
                    </button>

                    <span className="text-[15px] font-medium">
                      August 2026
                    </span>

                    <button className="text-[#9e9188] hover:text-white">
                      <ChevronRight size={12} />
                    </button>

                  </div>


                  {/* Week */}
                  <div className="grid grid-cols-7 text-center mb-1">

                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                      (day) => (
                        <span
                          key={day}
                          className="text-[12px] text-[#8f827a]"
                        >
                          {day}
                        </span>
                      )
                    )}

                  </div>


                  {/* Dates */}
                  <div className="grid grid-cols-7 gap-y-1">

                    {days.map((day, index) => {

                      if (!day) {
                        return <div key={index} />;
                      }

                      const number = Number(day);

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(number)}
                          className={`h-6 text-[13px] rounded transition ${
                            selectedDate === number
                              ? "bg-[#a94b3f] text-white"
                              : "text-[#b8aaa1] hover:bg-[#342b25]"
                          }`}
                        >
                          {number}
                        </button>
                      );
                    })}

                  </div>

                </div>


                {/* Venue / Package */}
                <div className="space-y-4 w-75 flex flex-col ml-35">

                  {/* Venue */}
                  <div>
                    <label
                      htmlFor="venue"
                      className="block text-[9px] font-medium mb-1"
                    >
                      Lawn
                    </label>

                    <select
                      id="venue"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className="w-full h-8 px-2 bg-transparent border border-[#4b4039] rounded-md text-[9px] text-white outline-none focus:border-[#d8a849]"
                    >
                      <option
                        className="bg-[#241d18]"
                        value="Marigold Garden Lawn"
                      >
                        Durga Marriage Lawn
                      </option>

          
                    </select>
                  </div>


                  {/* Package */}
                  <div>
                    <label
                      htmlFor="package"
                      className="block text-[9px] font-medium mb-1"
                    >
                      Package
                    </label>

                    <select
                      id="package"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className="w-full h-8 px-2 bg-transparent border border-[#4b4039] rounded-md text-[9px] text-white outline-none focus:border-[#d8a849]"
                    >
                      <option
                        className="bg-[#241d18]"
                        value="Golden Vivah"
                      >
                       Golden
                      </option>
                    </select>
                  </div>

                  {/* occasions */}
                  <div>
                    <label
                      htmlFor="occasions"
                      className="block text-[9px] font-medium mb-1"
                    >
                      Occasions
                    </label>

                    <select
                      id="occasions"
                      value={ocas}
                      onChange={(e) => setOcas(e.target.value)}
                      className="w-full h-8 px-2 bg-transparent border border-[#4b4039] rounded-md text-[9px] text-white outline-none focus:border-[#d8a849]"
                    >
                      <option
                        className="bg-[#241d18]"
                        value=""
                      >
                       select Occasions
                      </option>
                      {occasions.map((occasion)=>(
                         <option
                        className="bg-[#241d18]"
                        value={occasion}
                        key={occasion}
                      >
                       {occasion}
                      </option>
                      ))}
                      
                    </select>
                  </div>


                  {/* Guests */}
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-[9px] font-medium mb-1"
                    >
                      Guests
                    </label>

                    <input
                      id="guests"
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) =>
                        setGuests(Number(e.target.value))
                      }
                      className="w-full h-8 px-2 bg-transparent border border-[#4b4039] rounded-md text-[9px] text-white outline-none focus:border-[#d8a849]"
                    />
                  </div>


                  {/* Availability */}
                  <div className="flex items-center gap-2 h-8 px-2 bg-[#25291f] rounded-md">

                    <Check
                      size={11}
                      className="text-[#62a86c]"
                    />

                    <span className="text-[8px] text-[#6ca873]">
                      This date looks available
                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* ================= SUMMARY ================= */}
            <aside className="border border-[#4a4039] bg-[#241d18] rounded-lg p-3">

              <h2 className="text-xs font-semibold mb-5">
                Summary
              </h2>


              <div className="space-y-3 text-[9px]">

                <div className="flex justify-between">
                  <span className="text-[#8f827a]">
                    Date
                  </span>

                  <span>
                    18 Oct 2026
                  </span>
                </div>


                <div className="flex justify-between">
                  <span className="text-[#8f827a]">
                    Package
                  </span>

                  <span>
                    {packageName}
                  </span>
                </div>


                <div className="flex justify-between">
                  <span className="text-[#8f827a]">
                    Guests
                  </span>

                  <span>
                    {guests}
                  </span>
                </div>


                <div className="border-t border-[#3c332d] pt-3 flex justify-between">
                  <span className="text-[#8f827a]">
                    Base
                  </span>

                  <span>
                    {formatPrice(basePrice)}
                  </span>
                </div>


                <div className="flex justify-between">
                  <span className="text-[#8f827a]">
                    Extra plates
                  </span>

                  <span>
                    {formatPrice(extraPrice)}
                  </span>
                </div>


                <div className="border-t border-[#3c332d] pt-3 flex justify-between text-sm font-medium">
                  <span>
                    Total incl. GST
                  </span>

                  <span>
                    {formatPrice(total)}
                  </span>
                </div>

              </div>


              <button
                type="button"
                className="w-full mt-4 py-2 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-[9px] font-medium rounded-md transition"
              >
                Request booking
              </button>


              <button
                type="button"
                className="w-full mt-2 py-1.5 border border-[#4b4039] hover:bg-[#302721] text-white text-[9px] rounded-md transition"
              >
                Talk to us first
              </button>

            </aside>

          </div>


          {/* ================= YOUR DETAILS ================= */}
          <section className="mt-4 border border-[#4a4039] bg-[#241d18] rounded-lg p-3">

            <h2 className="text-xs font-semibold mb-4">
              Your details
            </h2>


            {/* Name + Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label
                  htmlFor="name"
                  className="block text-[9px] font-medium mb-1"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full h-8 px-2 bg-transparent border border-[#4b4039] rounded-md text-[9px] text-white placeholder-[#81756e] outline-none focus:border-[#d8a849]"
                />
              </div>


              <div>
                <label
                  htmlFor="mobile"
                  className="block text-[9px] font-medium mb-1"
                >
                  Mobile
                </label>

                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98290 00000"
                  className="w-full h-8 px-2 bg-transparent border border-[#4b4039] rounded-md text-[9px] text-white placeholder-[#81756e] outline-none focus:border-[#d8a849]"
                />
              </div>

            </div>


            {/* Email */}
            <div className="mt-3">

              <label
                htmlFor="email"
                className="block text-[9px] font-medium mb-1"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-8 px-2 bg-transparent border border-[#4b4039] rounded-md text-[9px] text-white placeholder-[#81756e] outline-none focus:border-[#d8a849]"
              />

            </div>


            {/* Special Requests */}
            <div className="mt-3">

              <label
                htmlFor="requests"
                className="block text-[9px] font-medium mb-1"
              >
                Special requests
              </label>

              <textarea
                id="requests"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                rows={3}
                placeholder="Anything we should know?"
                className="w-full px-2 py-2 bg-transparent border border-[#4b4039] rounded-md text-[9px] text-white placeholder-[#81756e] outline-none focus:border-[#d8a849] resize-none"
              />

            </div>

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default BookNow;