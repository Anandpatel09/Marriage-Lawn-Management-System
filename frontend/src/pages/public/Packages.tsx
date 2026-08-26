import React from "react";
import { Check, Star } from "lucide-react";
import Navbar from "../../components/comman/Navbar";
import Footer from "../../components/comman/Footer";

const Packages = () => {

  const packages = [
    {
      name: "Silver Shaadi",
      venue: "Marigold Garden Lawn",
      price: "₹4,25,000",
      perPlate: "₹850 / plate - up to 300 guests",
      features: [
        "Lawn for 1 day",
        "Basic floral decor",
        "Veg buffet - 12 items",
        "Sound system",
      ],
      popular: false,
    },

    {
      name: "Golden Vivah",
      venue: "Marigold Garden Lawn",
      price: "₹7,85,000",
      perPlate: "₹1250 / plate - up to 500 guests",
      features: [
        "Lawn + hall",
        "Premium mandap decor",
        "Multi-cuisine buffet",
        "DJ & lighting",
        "Bridal suite",
      ],
      popular: true,
    },

    {
      name: "Sangeet Night",
      venue: "Royal Palms Banquet Lawn",
      price: "₹2,65,000",
      perPlate: "₹700 / plate - up to 250 guests",
      features: [
        "Evening slot",
        "Stage & LED wall",
        "Snacks & mocktails",
        "Dance floor",
      ],
      popular: false,
    },

    {
      name: "Heritage Royale",
      venue: "Heritage Courtyard",
      price: "₹11,50,000",
      perPlate: "₹2100 / plate - up to 200 guests",
      features: [
        "2-day courtyard",
        "Royal decor",
        "Live counters",
        "20 boutique rooms",
        "Fireworks",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-[#17120f] text-white">

      <Navbar />

      {/* Main */}
      <main className="flex-1 px-4 py-8 sm:px-6">

        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-3xl sm:text-4xl font-normal">
              Packages
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#a99c94]">
              Transparent pricing – venue, decor and catering bundled.
            </p>

          </div>


          {/* Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {packages.map((pkg) => (

              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-lg border p-4 transition duration-200
                  ${
                    pkg.popular
                      ? "border-[#d8a849] shadow-[0_12px_30px_rgba(216,168,73,0.12)]"
                      : "border-[#4a4039]"
                  }
                  bg-[#241d18]
                `}
              >

                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-[#d8a849] text-black rounded text-[8px] font-medium">

                    <Star size={9} fill="currentColor" />

                    Popular

                  </div>
                )}


                {/* Package Name */}
                <h2 className="text-base font-medium pr-12">
                  {pkg.name}
                </h2>


                {/* Venue */}
                <p className="mt-3 text-[9px] text-[#a99c94]">
                  {pkg.venue}
                </p>


                {/* Price */}
                <div className="mt-3">

                  <p className="text-2xl sm:text-[25px] font-light">
                    {pkg.price}
                  </p>

                  <p className="mt-2 text-[9px] text-[#b0a39a]">
                    {pkg.perPlate}
                  </p>

                </div>


                {/* Features */}
                <ul className="mt-4 space-y-2 flex-1">

                  {pkg.features.map((feature) => (

                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[10px] text-[#b8aaa1]"
                    >

                      <Check
                        size={12}
                        className="mt-[1px] shrink-0 text-[#d8a849]"
                      />

                      <span>
                        {feature}
                      </span>

                    </li>

                  ))}

                </ul>


                {/* Button */}
                <button
                  className="w-full mt-5 py-2 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-[10px] font-medium rounded-md transition"
                >
                  Book this package
                </button>

              </div>

            ))}

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Packages;