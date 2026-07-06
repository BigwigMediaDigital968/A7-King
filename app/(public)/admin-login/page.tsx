"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to track visibility


    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        // simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (
            email === "admin@a7king.com" &&
            password === "password"
        ) {
            localStorage.setItem("isAdmin", "true");
            router.push("/admin");
            return;
        }
        console.log("Invalid credentials");

        toast.error("Invalid credentials");
    }

    return (
        <>
        <Toaster
                position="top-center" />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md mx-auto  bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
                Account Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 text-sm bg-gray-50 transition-colors"
                    />
                </div>

                {/* Password Field */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        {/* <span className="text-xs text-rose-600 hover:underline cursor-pointer">
                            Forgot?
                        </span> */}
                    </div>

                    {/* Wrapper container for absolute positioning of the eye icon */}
                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? 'text' : 'password'} // Dynamically switches types
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full p-2.5 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 text-sm bg-gray-50 transition-colors"
                        />
                        <button
                            type="button" // CRITICAL: Ensures this doesn't submit the form accidentally
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-2 bg-[#e11d48] text-white py-2.5 px-4 rounded font-medium text-sm hover:bg-rose-700 transition-colors focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                >
                    Sign In
                </button>
            </form>
        </div>
        </div>
        </>
    );
}
