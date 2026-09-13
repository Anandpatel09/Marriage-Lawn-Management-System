import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import axios from "axios";
import axiosInstance from "../api/axios";
import { API } from "../api/api";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile?: string;
    city?: string;
    role: "customer" | "admin";
};

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const accessToken =
                localStorage.getItem("accessToken");

            // No token means user is not logged in
            if (!accessToken) {
                setUser(null);
                return;
            }

            const response = await axiosInstance.get(
                API.AUTH.ME,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setUser(response.data.user);

        } catch (error) {
            console.error("Auth check failed:", error);

            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await axiosInstance.post(API.AUTH.LOGOUT);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    error.response?.data?.message ||
                    "Logout failed"
                );
            } else {
                console.error("Logout failed");
            }
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};