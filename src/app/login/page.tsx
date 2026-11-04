
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { BookOpen, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const requestedPage = params.get("callbackURL") || "/";

      const callbackURL =
        requestedPage.startsWith("/") && !requestedPage.startsWith("//")
          ? requestedPage
          : "/";

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (error) {
        toast.error(error.message || "Login failed!");
        return;
      }

      toast.success("Login successful!");

      router.push(callbackURL);
      router.refresh();

    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

    } catch {
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">


        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="bg-[#173B57] p-3 rounded-xl">
            <BookOpen className="text-white" size={27} />
          </div>

          <span className="text-2xl font-bold text-[#173B57]">
            BookNook
          </span>
        </Link>


        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back!
          </h1>

          <p className="text-gray-500 mt-2">
            Log in to continue your reading journey.
          </p>
        </div>

  
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-[#173B57]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-[#173B57]"
              />
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm text-gray-400 cursor-not-allowed">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-[#173B57] text-white py-3 rounded-lg font-semibold hover:bg-[#245575] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

    
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
        >
          {googleLoading ? "Connecting to Google..." : (
            <>
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </>
          )}
        </button>

  
        <p className="text-center text-sm text-gray-600 mt-7">
          Dont have an account?{" "}
          <Link
            href="/register"
            className="text-[#173B57] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

     
        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-[#173B57]"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
