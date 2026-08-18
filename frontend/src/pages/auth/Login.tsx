import React from 'react'

const Login = () => {
    return (
        <div className="min-h-screen bg-[#17120f] flex items-center justify-center px-4 py-4">
            {/* Main Container */}
            <div className="w-full max-w-xl h-112.5 bg-[#2b211c] rounded-2xl shadow-xl overflow-hidden flex items-center justify-center">
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
                        Welcome back          </h1>

                    <p className="text-[#a99e98] text-xs mb-3">
                        Sign in to continue to your dashboard.          </p>

                    <form className="space-y-2">


                        {/* Email + Mobile */}

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs font-medium text-white mb-1"
                            >
                                Email or phone
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                            />
                        </div>


                        {/* Password + Confirm Password */}


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




                        {/* Create Account Button */}
                        <button
                            type="submit"
                            className="w-full mt-1 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Sign in
                        </button>
                        <button
                            type="submit"
                            className="w-full mt-1 bg-[#c8c5bf] hover:bg-[#f4ecde] text-black text-sm font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Continue to admin demo

                        </button>

                    </form>

                    {/* Login */}
                    <p className="text-center text-xs text-[#a99e98] mt-3">
                        New here?{" "}
                        <span className="text-[#c85b4d] font-medium cursor-pointer hover:underline">
                            Create an account?
                        </span>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login