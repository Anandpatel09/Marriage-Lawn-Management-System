const Register = () => {
  return (
    <div className="min-h-screen bg-[#17120f] flex items-center justify-center px-4 py-4">

      {/* Main Container */}
      <div className="w-full max-w-2xl h-112.5 bg-[#2b211c] rounded-2xl shadow-xl overflow-hidden flex">

        {/* ================= FORM SECTION ================= */}
        <div className="w-full md:w-1/2 p-4">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-[#a94b3f] rounded-lg flex items-center justify-center text-white text-xl">
              V
            </div>

            <span className="text-white text-lg font-medium">
              Vivaah Lawns
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-semibold text-white mb-1">
            Create your account
          </h1>

          <p className="text-[#a99e98] text-xs mb-3">
            Register to manage your lawn bookings.
          </p>

          <form className="space-y-2">

            {/* First Name + Last Name */}
            <div className="grid grid-cols-2 gap-3">

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
            <div className="grid grid-cols-2 gap-3">

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

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-2 gap-3">

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-white mb-1"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-white mb-1"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                />
              </div>

            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full mt-1 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-semibold py-2 rounded-lg transition duration-200"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-xs text-[#a99e98] mt-3">
            Already have an account?{" "}
            <span className="text-[#c85b4d] font-medium cursor-pointer hover:underline">
              Login
            </span>
          </p>

        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="hidden md:flex md:w-1/2 bg-[#a94b3f] items-center justify-center p-6">

          <div className="text-center text-white">

            {/* Icon */}
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-5xl">🏡</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-semibold mt-3">
              Welcome to Vivaah Lawns
            </h2>

            {/* Description */}
            <p className="text-white/70 mt-2 text-sm max-w-sm">
              Create your account and start managing your marriage lawn
              bookings with ease.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;