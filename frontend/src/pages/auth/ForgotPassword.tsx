import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { API } from "../../api/api-constant";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const response = await axiosInstance.post(
                API.AUTH.FORGOT_PASSWORD,
                {
                    email: email.trim(),
                }
            );

            setMessage(response.data.message);
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#17120f] flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md bg-[#2b211c] border border-[#2f2824] rounded-2xl p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
                    Forgot Password
                </h1>

                <p className="text-[#aaa19b] text-sm text-center mt-2">
                    Enter your email and we'll send you a password reset link.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <div>
                        <label className="block text-white text-sm mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-[#17120f] border border-[#4b4039] text-white outline-none focus:border-[#d8a849]"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="text-green-400 text-sm">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-[#d8a849] hover:bg-[#c99a3d] text-black font-semibold disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                <div className="text-center mt-5">
                    <Link
                        to="/login"
                        className="text-[#d8a849] hover:underline text-sm"
                    >
                        Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;