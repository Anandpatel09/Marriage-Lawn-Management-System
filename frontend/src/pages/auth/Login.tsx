import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axios";
import { API } from "../../api/api";
import axios from "axios";

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

const Login = () => {
    const [role, setRole] = useState<"customer" | "admin">("customer");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const loginData = {
                email: data.email,
                password: data.password,
                role: role,
            };

            const response = await axiosInstance.post(
                API.AUTH.LOGIN,
                loginData
            );

            console.log("Login successful:", response.data);

            // Example:
            // localStorage.setItem("accessToken", response.data.accessToken);

            if (role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(
                    error.response?.data?.message || "Login failed"
                );
            } else {
                console.log("Something went wrong");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#17120f] flex items-center justify-center px-4 py-4">

            <div className="w-full max-w-md bg-[#2b211c] rounded-lg shadow-xl overflow-hidden">

                <div className="w-full p-7">

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
                        Welcome back
                    </h1>

                    <p className="text-[#a99e98] text-xs mb-3">
                        Sign in to continue.
                    </p>

                    {/* Role Toggle */}
                    <div className="w-full flex p-1 bg-[#332a25] rounded-lg mb-3">

                        <button
                            type="button"
                            onClick={() => setRole("customer")}
                            className={`w-1/2 py-1 rounded-md text-sm font-medium ${role === "customer"
                                    ? "bg-[#17120f] text-white"
                                    : "text-[#b8aea8]"
                                }`}
                        >
                            Customer
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("admin")}
                            className={`w-1/2 py-1 rounded-md text-sm font-medium ${role === "admin"
                                    ? "bg-[#17120f] text-white"
                                    : "text-[#b8aea8]"
                                }`}
                        >
                            Admin
                        </button>



                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-2"
                    >

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
                                {...register("email")}
                                placeholder="Enter email"
                                className="w-full px-3 py-1.5 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                            />

                            {errors.email && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
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
                                    placeholder="Password"
                                    {...register("password")}
                                    className="w-full px-3 py-1.5 pr-10 bg-transparent border border-[#4b4039] rounded-lg text-sm text-white placeholder-[#80756f] outline-none focus:border-[#d8a849] transition"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>

                            </div>

                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}

                        </div>

                        {/* Login */}
                        <button
                            type="submit"
                            className="w-full mt-1 bg-[#d8a849] hover:bg-[#c99a3d] text-black text-sm font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Login
                        </button>

                        {/* Demo */}
                        <button
                            type="button"
                            onClick={() => navigate("/admin/dashboard")}
                            className="w-full mt-1 bg-[#c8c5bf] hover:bg-[#f4ecde] text-black text-sm font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Continue to admin demo
                        </button>

                    </form>

                    {/* Register */}
                    <p className="text-center text-xs text-[#a99e98] mt-3">
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