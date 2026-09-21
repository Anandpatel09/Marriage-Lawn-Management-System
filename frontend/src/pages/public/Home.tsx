
import { CalendarDays } from "lucide-react";
import Navbar from '../../components/comman/Navbar'


const Home = () => {
  return (
    <div>
    

      <div className="min-h-screen bg-[#17120f] text-white">

        <Navbar />

        {/* ================= HERO ================= */}
        <section className="relative min-h-[540px] overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b160f]/95 via-[#2b160f]/80 to-[#2b160f]/55" />

          {/* Content */}
          <div className="relative z-10 max-w-[1500px] mx-auto px-8 sm:px-10 lg:px-16 pt-12 pb-16">

            {/* Top Label */}
            <p className="text-[#d8a849] text-xs sm:text-sm tracking-[0.35em] font-medium mb-8">
              SINCE 2009 · RAJASTHAN
            </p>

            {/* Heading */}
            <h1 className="max-w-[650px] text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] font-serif font-normal text-[#f4eee8]">
              Wedding lawns
              <br />
              lit by marigold
              <br />
              and moonlight
            </h1>

            {/* Description */}
            <p className="max-w-162.5 mt-8 text-base sm:text-lg leading-7 text-[#b8aaa1]">
              Four handpicked venues, catering-inclusive packages and a
              booking team that answers in minutes.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[#d8a849] hover:bg-[#c99a3d] text-black font-medium rounded-lg transition">
                <CalendarDays size={18} />
                Check availability
              </button>

              <button className="px-8 py-4 border border-[#62534a] bg-[#17120f]/70 hover:bg-[#2b211c] text-white font-medium rounded-lg transition">
                Explore lawns
              </button>

            </div>
          </div>
        </section>


        {/* ================= OUR LAWNS ================= */}
        <section className="px-8 sm:px-10 lg:px-16 py-20">

          <div className="max-w-375 mx-auto">

            <div className="mb-10">
              <p className="text-[#d8a849] text-xs tracking-[0.3em] uppercase mb-3">
                Our venues
              </p>

              <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white">
                Our lawns
              </h2>

              <p className="mt-3 text-[#a99c94] max-w-xl">
                Beautiful spaces designed for weddings, celebrations
                and unforgettable moments.
              </p>
            </div>


            {/* Lawn Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {[
                "Marigold Lawn",
                "Moonlight Lawn",
                "Royal Garden",
                "Heritage Lawn",
              ].map((lawn) => (
                <div
                  key={lawn}
                  className="group border border-[#3d332d] bg-[#241d18] rounded-xl overflow-hidden hover:border-[#d8a849] transition"
                >

                  <div className="h-56 bg-[#30251f] flex items-center justify-center">
                    <span className="text-[#75685f] group-hover:text-[#d8a849] transition">
                      {lawn}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-serif">
                      {lawn}
                    </h3>

                    <p className="mt-2 text-sm text-[#a99c94]">
                      Elegant wedding venue for your special
                      celebration.
                    </p>

                    <button className="mt-5 text-sm text-[#d8a849] hover:text-white transition">
                      View lawn →
                    </button>
                  </div>

                </div>
              ))}

            </div>

          </div>
        </section>
      

      </div>
    </div>
  )
}

export default Home
