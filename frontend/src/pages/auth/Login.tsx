import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import axiosInstance from "../../api/axios";
import { API } from "../../api/api";

// ==================== VALIDATION ====================

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof schema>;

// ==================== COMPONENT ====================

const Login = () => {
  const navigate = useNavigate();

  // Selected login type in UI
  const [role, setRole] = useState<"customer" | "admin">("customer");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // API error message
  const [serverError, setServerError] = useState("");

  // ==================== FORM ====================

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  // ==================== LOGIN ====================

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setServerError("");

      const loginData = {
        email: data.email.trim(),
        password: data.password,
        role: role,
      };

      const response = await axiosInstance.post(
        API.AUTH.LOGIN,
        loginData
      );

      console.log("Login successful:", response.data);

      const {
        accessToken,
        user,
      } = response.data;

      // Make sure backend returned required data
      if (!accessToken || !user) {
        throw new Error("Invalid login response from server");
      }

      // ------------------------------------------------
      // Temporary while you are developing:
      // Store access token in localStorage.
      // Later we can move this to AuthContext/state.
      // ------------------------------------------------
      localStorage.setItem("accessToken", accessToken);

      // Store basic user information
      localStorage.setItem("user", JSON.stringify(user));

      // ------------------------------------------------
      // IMPORTANT:
      // Use the role returned by backend/database.
      // Do NOT trust only the role selected in frontend.
      // ------------------------------------------------

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "customer") {
        navigate("/");
      } else {
        setServerError("Invalid user role.");
      }

    } catch (error) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Login failed. Please try again.";

        setServerError(message);
      } else if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  };

  // ==================== JSX ====================

  return (
    <div className="min-h-screen bg-[#17120f] flex items-center justify-center px-4 py-4">

      <div className="w-full max-w-md bg-[#2b211c] rounded-lg shadow-xl overflow-hidden">

        <div className="w-full p-7">

          {/* ================= LOGO ================= */}

          <div className="flex items-center gap-3 mb-3">

            <div className="w-14 h-9 bg-[#a94b3f] rounded-lg flex items-center justify-center text-white text-xl">
              DML
            </div>

            <span className="text-white text-lg font-medium">
              Durga Marriage Lawn
            </span>

          </div>


          {/* ================= HEADING ================= */}

          <h1 className="text-2xl font-semibold text-white mb-1">
            Welcome back
          </h1>

          <p className="text-[#a99e98] text-xs mb-4">
            Sign in to continue.
          </p>


          {/* ================= ROLE TOGGLE ================= */}

          <div className="w-full flex p-1 bg-[#332a25] rounded-lg mb-4">

            {/* Customer */}

            <button
              type="button"
              onClick={() => {
                setRole("customer");
                setServerError("");
              }}
              className={`w-1/2 py-1.5 rounded-md text-sm font-medium transition ${
                role === "customer"
                  ? "bg-[#17120f] text-white"
                  : "text-[#b8aea8] hover:text-white"
              }`}
            >
              Customer
            </button>


            {/* Admin */}

            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setServerError("");
              }}
              className={`w-1/2 py-1.5 rounded-md text-sm font-medium transition ${
                role === "admin"
                  ? "bg-[#17120f] text-white"
                  : "text-[#b8aea8] hover:text-white"
              }`}
            >
              Admin
            </button>

          </div>


          {/* ================= SERVER ERROR ================= */}

          {serverError && (
            <div className="mb-4 px-3 py-2 rounded-md border border-red-500/30 bg-red-500/10">
              <p className="text-red-400 text-xs">
                {serverError}
              </p>
            </div>
          )}


          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >

            {/* ================= EMAIL ================= */}

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
                autoComplete="email"
                placeholder="Enter email"
                {...register("email")}
                className={`w-full px-3 py-1.5 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#4b4039] focus:border-[#d8a849]"
                }`}
              />

              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>


            {/* ================= PASSWORD ================= */}

            <div>

              <label
                htmlFor="password"
                className="block text-xs font-medium text-white mb-1"
              >
                Password
              </label>

              <div className="relative w-full">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  {...register("password")}
                  className={`w-full px-3 py-1.5 pr-10 bg-transparent border rounded-lg text-sm text-white placeholder-[#80756f] outline-none transition ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#4b4039] focus:border-[#d8a849]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a99e98] hover:text-white transition"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>


            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#d8a849] hover:bg-[#c99a3d] disabled:opacity-50 disabled:cursor-not-allowed text-black text-sm font-semibold py-2 rounded-lg transition duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>


          {/* ================= REGISTER ================= */}

          <p className="text-center text-xs text-[#a99e98] mt-4">

            New here?{" "}

            <span
              className="text-[#c85b4d] font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Create an account
            </span>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;