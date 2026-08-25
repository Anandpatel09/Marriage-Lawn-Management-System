import React from "react";
import Navbar from "../../components/comman/Navbar";
import Footer from "../../components/comman/Footer";

const About = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-[#17120f] text-white">

      <Navbar />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 sm:px-6">

        <div className="max-w-5xl mx-auto">

          {/* ================= HEADER ================= */}
          <section className="mb-8">

            <h1 className="text-3xl sm:text-4xl font-normal mb-3">
              About us
            </h1>

            <p className="max-w-2xl text-sm leading-5 text-[#b8aaa1]">
              We create beautiful spaces where celebrations become
              unforgettable memories. Our venues are designed to make
              every wedding, gathering and special occasion feel unique.
            </p>

          </section>


          {/* ================= STATS ================= */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">

            {/* Card 1 */}
            <div className="h-20 sm:h-24 border border-[#4a4039] bg-[#241d18] rounded-lg flex flex-col items-center justify-center">

              <span className="text-2xl sm:text-3xl font-light">
                3,400+
              </span>

              <span className="mt-1 text-[9px] uppercase tracking-wide text-[#a99c94]">
                Weddings hosted
              </span>

            </div>


            {/* Card 2 */}
            <div className="h-20 sm:h-24 border border-[#4a4039] bg-[#241d18] rounded-lg flex flex-col items-center justify-center">

              <span className="text-2xl sm:text-3xl font-light">
                17
              </span>

              <span className="mt-1 text-[9px] uppercase tracking-wide text-[#a99c94]">
                Years of service
              </span>

            </div>


            {/* Card 3 */}
            <div className="h-20 sm:h-24 border border-[#4a4039] bg-[#241d18] rounded-lg flex flex-col items-center justify-center">

              <span className="text-2xl sm:text-3xl font-light">
                4
              </span>

              <span className="mt-1 text-[9px] uppercase tracking-wide text-[#a99c94]">
                Venues
              </span>

            </div>


            {/* Card 4 */}
            <div className="h-20 sm:h-24 border border-[#4a4039] bg-[#241d18] rounded-lg flex flex-col items-center justify-center">

              <span className="text-2xl sm:text-3xl font-light">
                4.7
              </span>

              <span className="mt-1 text-[9px] uppercase tracking-wide text-[#a99c94]">
                Avg. rating
              </span>

            </div>

          </section>


          {/* ================= WHAT WE DO ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Text */}
            <div>

              <h2 className="text-xl sm:text-2xl font-medium mb-4">
                What we do differently
              </h2>

              <ul className="space-y-3 text-xs sm:text-sm text-[#b8aaa1]">

                <li className="flex gap-2">
                  <span className="text-[#d8a849]">•</span>
                  <span>
                    One coordinator assigned to your event from booking
                    to the final celebration.
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="text-[#d8a849]">•</span>
                  <span>
                    In-house kitchen with carefully prepared menus.
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="text-[#d8a849]">•</span>
                  <span>
                    Transparent pricing with no unexpected charges.
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="text-[#d8a849]">•</span>
                  <span>
                    Flexible booking options so you can plan comfortably.
                  </span>
                </li>

              </ul>

            </div>


            {/* Image */}
            <div className="w-full">

              <img
                src="/images/wedding-lawn.jpg"
                alt="Wedding venue"
                className="w-full h-48 sm:h-56 object-cover rounded-lg border border-[#4a4039]"
              />

            </div>

          </section>


          {/* ================= CTA ================= */}
          <div className="flex justify-center mt-9">

            <button className="px-6 py-2.5 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-xs sm:text-sm font-medium rounded-md transition">
              Plan your wedding with us
            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default About;