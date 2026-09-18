import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { API } from "../../api/api-constant";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await axiosInstance.post(
                API.AUTH.RESET_PASSWORD,
                {
                    token,
                    password,
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Unable to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#17120f] flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md bg-[#2b211c] border border-[#2f2824] rounded-2xl p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
                    Reset Password
                </h1>

                <p className="text-[#aaa19b] text-sm text-center mt-2">
                    Create a new password for your account.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >

                    <div>
                        <label className="block text-white text-sm mb-2">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 rounded-lg bg-[#17120f] border border-[#4b4039] text-white outline-none focus:border-[#d8a849]"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
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
                        className="w-full py-3 bg-[#d8a849] hover:bg-[#c99a3d] text-black font-semibold rounded-lg disabled:opacity-50"
                    >
                        {loading
                            ? "Updating..."
                            : "Reset Password"}
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

export default ResetPassword;