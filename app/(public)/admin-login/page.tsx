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
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-md bg-white border-2 border-black p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold text-black">
                            Admin Login
                        </h1>
                        <p className="text-sm text-gray-600 mt-2">
                            Sign in to access the dashboard
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                                className="
            w-full
            border-2
            border-black
            px-4
            py-3
            text-sm
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--color-secondary)]
          "
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="
              w-full
              border-2
              border-black
              px-4
              py-3
              pr-12
              text-sm
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--color-secondary)]
            "
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-black
              hover:opacity-70
              transition-opacity
            "
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="
                                w-full cursor-pointer
                                bg-black
                                text-white
                                py-3
                                font-semibold
                                uppercase
                                tracking-wide
                                transition-all
                                hover:bg-[var(--color-secondary)]
                                hover:text-black
                                border-2
                                border-black
                                "
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
