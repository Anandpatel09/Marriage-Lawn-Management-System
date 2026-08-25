import {
  MapPin,
  Mail,
  Phone,
  Clock3,
} from "lucide-react";

import Navbar from "../../components/comman/Navbar";
import Footer from "../../components/comman/Footer";

const Contact = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-[#17120f] text-white">

      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="flex-1 px-4 py-8 sm:px-6">

        <div className="w-full max-w-5xl mx-auto">

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-normal text-white">
              Contact us
            </h1>

            <p className="mt-2 text-sm text-[#b8aaa1]">
              We reply within an hour, 9am to 9pm.
            </p>
          </div>


          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_0.9fr] gap-6">

            {/* ================= FORM ================= */}
            <div className="border border-[#4a4039] bg-[#241d18] rounded-xl p-6">

              <h2 className="text-lg font-semibold mb-8">
                Send an enquiry
              </h2>

              <form className="space-y-5">

                {/* Name + Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium mb-1.5"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="w-full h-9 px-3 bg-transparent border border-[#4b4039] rounded-md text-sm text-white placeholder-[#81756e] outline-none focus:border-[#d8a849] transition"
                    />
                  </div>


                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-xs font-medium mb-1.5"
                    >
                      Mobile
                    </label>

                    <input
                      id="mobile"
                      type="tel"
                      placeholder="+91 98290 00000"
                      className="w-full h-9 px-3 bg-transparent border border-[#4b4039] rounded-md text-sm text-white placeholder-[#81756e] outline-none focus:border-[#d8a849] transition"
                    />
                  </div>

                </div>


                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium mb-1.5"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full h-9 px-3 bg-transparent border border-[#4b4039] rounded-md text-sm text-white placeholder-[#81756e] outline-none focus:border-[#d8a849] transition"
                  />
                </div>


                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-xs font-medium mb-1.5"
                  >
                    Tentative date
                  </label>

                  <input
                    id="date"
                    type="date"
                    className="w-full h-9 px-3 bg-transparent border border-[#4b4039] rounded-md text-sm text-white outline-none focus:border-[#d8a849] transition [color-scheme:dark]"
                  />
                </div>


                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium mb-1.5"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your event"
                    className="w-full px-3 py-2 bg-transparent border border-[#4b4039] rounded-md text-sm text-white placeholder-[#81756e] outline-none focus:border-[#d8a849] transition resize-none"
                  />
                </div>


                {/* Submit */}
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-medium rounded-md transition"
                >
                  Send enquiry
                </button>

              </form>

            </div>


            {/* ================= REACH US ================= */}
            <div className="border border-[#4a4039] bg-[#241d18] rounded-xl p-6">

              <h2 className="text-lg font-semibold mb-7">
                Reach us
              </h2>


              {/* Phone */}
              <div className="flex items-start gap-3 mb-5">

                <Phone
                  size={17}
                  strokeWidth={1.7}
                  className="mt-0.5 text-[#a99c94] shrink-0"
                />

                <span className="text-sm text-[#b8aaa1]">
                  +91 9335056579
                </span>

              </div>


              {/* Email */}
              <div className="flex items-start gap-3 mb-5">

                <Mail
                  size={17}
                  strokeWidth={1.7}
                  className="mt-0.5 text-[#a99c94] shrink-0"
                />

                <span className="text-sm text-[#b8aaa1]">
                  hello@dmllawns.in
                </span>

              </div>


              {/* Address */}
              <div className="flex items-start gap-3 mb-5">

                <MapPin
                  size={17}
                  strokeWidth={1.7}
                  className="mt-0.5 text-[#a99c94] shrink-0"
                />

                <span className="text-sm leading-5 text-[#b8aaa1]">
                  Hanumanganj, Vanarash Road, Sultanpur, Uttar Pradesh
                </span>

              </div>


              {/* Timing */}
              <div className="flex items-start gap-3">

                <Clock3
                  size={17}
                  strokeWidth={1.7}
                  className="mt-0.5 text-[#a99c94] shrink-0"
                />

                <span className="text-sm text-[#b8aaa1]">
                  Open daily, 9:00 am - 9:00 pm
                </span>

              </div>

            </div>

          </div>

        </div>

      </main>
{/* Footer */}
      <Footer/>

    </div>
  );
};

export default Contact;