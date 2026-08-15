const Register = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex">

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10">

          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Create your account
          </h1>

          <form className="space-y-4">
              {/* First Name */}
            <div className="flex flex-column gap-2 ">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
                />
              </div>

            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Mobile Number
              </label>

              <input
                id="mobile"
                type="tel"
                placeholder="Enter mobile number"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                City
              </label>

              <input
                id="city"
                type="text"
                placeholder="Enter city"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div className=" flex flex-column gap-2 ">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
                />
              </div>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700
              text-white font-semibold py-3 rounded-lg
              transition duration-200"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Login
            </span>
          </p>

        </div>

        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center">

          <div className="text-center text-white">
            <div className="w-52 h-52 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-6xl">🏡</span>
            </div>

            <h2 className="text-3xl font-bold mt-6">
              Welcome to Durga Marriage Lawn
            </h2>

            <p className="text-blue-100 mt-3">
              Create your account to manage your lawn bookings.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Register