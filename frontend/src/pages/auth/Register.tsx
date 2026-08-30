import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {

  //  VALIDATION SCHEMA 
  const schema = z
    .object({
      first_name: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(30, "First name is too long"),

      last_name: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(30, "Last name is too long"),

      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),

      mobile: z
        .string()
        .min(10, "Mobile number must be 10 digits")
        .max(10, "Mobile number must be 10 digits")
        .regex(/^[0-9]+$/, "Mobile number must contain only numbers"),

      city: z
        .string()
        .min(2, "City is required")
        .max(50, "City name is too long"),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/[0-9]/, "Password must contain a number"),

      confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });


  //  REACT HOOK FORM 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  //  TYPESCRIPT TYPE 

  type RegisterFormData = z.infer<typeof schema>;

  // FORM SUBMIT 
  const onSubmit = (data: RegisterFormData) => {
    console.log("Form submitted:", data);
  };


  return (
    <div className="min-h-screen bg-[#17120f] flex items-center justify-center px-4 py-4">

      {/* Main Container */}
      <div className="w-full max-w-2xl h-112.5 bg-[#2b211c] rounded-2xl shadow-xl overflow-hidden flex">

        {/* ================= FORM SECTION ================= */}
        <div className="w-full md:w-1/2 p-4">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-14 h-9 bg-[#a94b3f] rounded-lg flex items-center justify-center text-white text-xl">
              DML
            </div>

            <span className="text-white text-lg font-medium">
              Durga Marriage Lawn
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-semibold text-white mb-1">
            Create your account
          </h1>

          <p className="text-[#a99e98] text-xs mb-3">
            Register to manage your lawn bookings.
          </p>


          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
          >

            {/* First Name + Last Name */}
            <div className="grid grid-cols-2 gap-3">

              {/* First Name */}
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-xs font-medium text-white mb-1"
                >
                  First Name
                </label>

                <input
                  id="first_name"
                  type="text"
                  placeholder="First name"
                  {...register("first_name")}
                  className={`w-full px-3 py-1.5 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${errors.first_name
                    ? "border-red-500"
                    : "border-[#4b4039] focus:border-[#d8a849]"
                    }`}
                />

                {errors.first_name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>


              {/* Last Name */}
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-xs font-medium text-white mb-1"
                >
                  Last Name
                </label>

                <input
                  id="last_name"
                  type="text"
                  placeholder="Last name"
                  {...register("last_name")}
                  className={`w-full px-3 py-1.5 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${errors.last_name
                    ? "border-red-500"
                    : "border-[#4b4039] focus:border-[#d8a849]"
                    }`}
                />

                {errors.last_name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

            </div>


            {/* Email + Mobile */}
            <div className="grid grid-cols-2 gap-3">

              {/* Email */}
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
                  {...register("email")}
                  className={`w-full px-3 py-1.5 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${errors.email
                    ? "border-red-500"
                    : "border-[#4b4039] focus:border-[#d8a849]"
                    }`}
                />

                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>


              {/* Mobile */}
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
                  {...register("mobile")}
                  className={`w-full px-3 py-1.5 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${errors.mobile
                    ? "border-red-500"
                    : "border-[#4b4039] focus:border-[#d8a849]"
                    }`}
                />

                {errors.mobile && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.mobile.message}
                  </p>
                )}
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
                {...register("city")}
                className={`w-full px-3 py-1.5 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${errors.city
                  ? "border-red-500"
                  : "border-[#4b4039] focus:border-[#d8a849]"
                  }`}
              />

              {errors.city && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>


            {/* Password + Confirm Password */}
            <div className="grid grid-cols-2 gap-3">

              {/* Password */}
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
                  {...register("password")}
                  className={`w-full px-3 py-1.5 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${errors.password
                    ? "border-red-500"
                    : "border-[#4b4039] focus:border-[#d8a849]"
                    }`}
                />

                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>


              {/* Confirm Password */}
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
                  {...register("confirmPassword")}
                  className={`w-full px-3 py-1.5 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${errors.confirmPassword
                    ? "border-red-500"
                    : "border-[#4b4039] focus:border-[#d8a849]"
                    }`}
                />

                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
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


          {/* Login link */}
          <p className="text-center text-xs text-[#a99e98] mt-3">
            Already have an account?{" "}

            <span className="text-[#c85b4d] font-medium cursor-pointer hover:underline">
              <Link to="/login">
                Login
              </Link>
            </span>
          </p>

        </div>


        {/* ================= RIGHT SECTION ================= */}
        <div className="hidden md:flex md:w-1/2 bg-[#a94b3f] items-center justify-center p-6">

          <div className="text-center text-white">

            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-5xl">🏡</span>
            </div>

            <h2 className="text-2xl font-semibold mt-3">
              Welcome to Vivaah Lawns
            </h2>

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