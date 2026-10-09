import { MapPin, Users, Play, CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/comman/Navbar";
import Footer from "../../../components/comman/Footer";

interface Lawn {
  id: number;
  name: string;
  image: string;
  description: string;
  address: string;
  capacity: string;
  features: string[];
  videoId?: string;
}

const lawns: Lawn[] = [
  {
    id: 1,
    name: "Durga Marriage Lawn",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    description:
      "A beautiful and spacious lawn designed for weddings, receptions and memorable family celebrations.",
    address: "Fatehpur, Pakhrauli, Sultanpur, Uttar Pradesh",
    capacity: "500+ Guests",
    features: [
      "Large Garden Area",
      "Decoration Space",
      "Parking",
      "Stage Area",
    ],
  },

  {
    id: 2,
    name: "Marigold Garden Lawn",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    description:
      "An elegant outdoor venue with a beautiful ambience for weddings, engagements and grand celebrations.",
    address: "Sultanpur, Uttar Pradesh",
    capacity: "400+ Guests",
    features: ["Garden Venue", "Dining Area", "Parking", "Wedding Stage"],
  },

  {
    id: 3,
    name: "Heritage Courtyard",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80",
    description:
      "A premium celebration space suitable for large weddings, receptions and special occasions.",
    address: "Sultanpur, Uttar Pradesh",
    capacity: "800+ Guests",
    features: [
      "Premium Venue",
      "Large Parking",
      "Stage Area",
      "Catering Space",
    ],
  },
];

const OurLawns = () => {
  const navigate = useNavigate();

  const handleBookNow = (lawnId: number) => {
    navigate(`/booknow?venueId=${lawnId}`);
  };

  return (
    <div className="min-h-screen bg-[#17120f] text-white">
      <Navbar />

      <main>
        {/* =================================================
            HERO
        ================================================= */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="max-w-3xl">
            <p className="text-[#d8a849] text-sm font-medium mb-3">OUR LAWNS</p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Celebrate Your
              <span className="text-[#d8a849]"> Special Moments</span>
            </h1>

            <p className="mt-5 text-[#a99e98] text-sm sm:text-base leading-7">
              Discover beautiful spaces for weddings, receptions, engagements
              and every celebration that deserves to be remembered.
            </p>
          </div>
        </section>

        {/* =================================================
            LAWNS
        ================================================= */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {lawns.map((lawn) => (
              <div
                key={lawn.id}
                className="overflow-hidden bg-[#2b211c] border border-[#3a2f29] rounded-2xl"
              >
                {/* IMAGE */}

                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={lawn.image}
                    alt={lawn.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#17120f]/90 via-transparent to-transparent" />

                  {/* VENUE LABEL */}

                  <div className="absolute left-4 bottom-4">
                    <span className="inline-flex items-center gap-2 bg-[#17120f]/80 backdrop-blur-sm border border-[#514239] px-3 py-1.5 rounded-lg text-xs">
                      <Users size={13} className="text-[#d8a849]" />

                      {lawn.capacity}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-semibold">
                        {lawn.name}
                      </h2>

                      <div className="flex items-start gap-2 mt-3 text-[#968980]">
                        <MapPin
                          size={15}
                          className="text-[#d8a849] mt-0.5 shrink-0"
                        />

                        <span className="text-xs leading-5">
                          {lawn.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-[#a39790] leading-6">
                    {lawn.description}
                  </p>

                  {/* FEATURES */}

                  <div className="flex flex-wrap gap-2 mt-5">
                    {lawn.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 rounded-md bg-[#201813] border border-[#3d332c] text-[11px] text-[#a99e98]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* BUTTONS */}

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => handleBookNow(lawn.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-[#d8a849] hover:bg-[#c99a3d] text-black rounded-lg text-sm font-medium transition"
                    >
                      <CalendarDays size={16} />
                      Book Now
                      <ArrowRight size={15} />
                    </button>

                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-[#201813] hover:bg-[#332821] border border-[#4b4039] rounded-lg text-sm transition"
                    >
                      View Details
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            YOUTUBE LIVE VIDEO SECTION
        ================================================= */}

        <section className="border-t border-[#302823] bg-[#211a16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
              <div>
                <p className="text-[#d8a849] text-sm font-medium mb-2">
                  LIVE & VIDEOS
                </p>

                <h2 className="text-3xl sm:text-4xl font-semibold">
                  See Our Lawns in Action
                </h2>

                <p className="mt-3 text-[#9e9188] text-sm max-w-2xl">
                  Watch wedding celebrations, decorations and events from our
                  lawns.
                </p>
              </div>

              <a
                href="https://www.youtube.com/@durgamarriagelawn1098?si=9IGj2cRndIfUoj36"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#d8a849] hover:text-[#f0c867] transition"
              >
                Visit YouTube Channel
                <ArrowRight size={15} />
              </a>
            </div>

            {/* MAIN LIVE VIDEO */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#40342c] bg-[#17120f]">
                  {/*
                    Replace YOUR_CHANNEL_ID with
                    your actual YouTube channel ID.

                    Example:
                    https://www.youtube.com/embed/live_stream?channel=UCXXXXXXXX
                  */}

                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/live_stream?channel=@durgamarriagelawn1098"
                    title="Durga Marriage Lawn Live"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* VIDEO INFO */}

              <div className="bg-[#2b211c] border border-[#3a2f29] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />

                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                  </span>

                  <span className="text-sm font-medium">Live from YouTube</span>
                </div>

                <h3 className="text-xl font-semibold">
                  Experience Our Celebrations
                </h3>

                <p className="mt-3 text-sm text-[#94877e] leading-6">
                  Get a real view of our wedding lawn, decorations, lighting and
                  events before making your booking.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#9e9188]">
                    <Play size={14} className="text-[#d8a849]" />
                    Wedding celebrations
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#9e9188]">
                    <Play size={14} className="text-[#d8a849]" />
                    Lawn decorations
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#9e9188]">
                    <Play size={14} className="text-[#d8a849]" />
                    Live events
                  </div>
                </div>

                <a
                  href="https://www.youtube.com/@durgamarriagelawn1098?si=9IGj2cRndIfUoj36"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 mt-7 py-3 border border-[#5a493d] hover:bg-[#362a23] rounded-lg text-sm transition"
                >
                  Watch More Videos
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            CTA
        ================================================= */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative overflow-hidden rounded-2xl border border-[#5a4738] bg-[#2b211c] p-8 sm:p-12 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Ready to Plan Your
                <span className="text-[#d8a849]"> Special Day?</span>
              </h2>

              <p className="mt-4 max-w-2xl mx-auto text-sm text-[#a39790]">
                Choose your preferred lawn, select your date and send us your
                booking request.
              </p>

              <button
                type="button"
                onClick={() => navigate("/booknow")}
                className="inline-flex items-center gap-2 mt-7 px-7 py-3 bg-[#d8a849] hover:bg-[#c99a3d] text-black rounded-lg text-sm font-medium transition"
              >
                Book Your Date
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurLawns;
