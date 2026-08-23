
import Navbar from '../../components/comman/Navbar'

const Contact = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-[#17120f]">

      <Navbar />

      {/* Main Content */}
      <div className="flex-1 w-full border-b border-[#2f2824] px-4 py-6 overflow-y-auto">

        {/* Contact Container */}
        <div className="w-full max-w-lg mx-auto">

          {/* Heading */}
          <div className="mb-4 py-8  ">
            <h1 className="text-2xl font-bold text-white mb-1">
              Contact us
            </h1>

            <p className="text-[12px] text-white">
              We reply within an hour, 9am to 9pm.
            </p>
          </div>

          {/* Company */}
          <div className="flex items-center gap-3 mb-4">

            <div className="w-14 h-9 bg-[#a94b3f] rounded-lg flex items-center justify-center text-white text-xl">
              DML
            </div>

            <span className="text-white text-lg font-medium">
              Durga Marriage Lawns
            </span>

            <p className="text-white text-lg font-medium px-14 ">Send an enquiry </p>

          </div>

          {/* Form */}
          <form className="space-y-3">

            {/* First Name + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs font-medium text-white mb-1"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs font-medium text-white mb-1"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                />
              </div>

            </div>

            {/* Email + Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-white mb-1"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-xs font-medium text-white mb-1"
                >
                  Mobile
                </label>

                <input
                  id="mobile"
                  type="tel"
                  placeholder="Mobile number"
                  className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                />
              </div>

            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-xs font-medium text-white mb-1"
              >
                City
              </label>

              <input
                id="city"
                type="text"
                placeholder="Enter city"
                className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
              />
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-xs font-medium text-white mb-1"
              >
                Tentative Booking Date
              </label>

              <input
                id="date"
                type="date"
                className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white outline-none focus:border-[#d8a849] transition [color-scheme:dark]"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-white mb-1"
              >
                Message
              </label>

              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your event"
                className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-1 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-semibold py-2 rounded-lg transition duration-200"
            >
              Send enquiry
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Contact