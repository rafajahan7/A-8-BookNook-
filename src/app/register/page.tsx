
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setPasswordError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      toast.success("Registration successful! Please log in.");

      router.push("/login");

    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

  
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-[#173B57] p-3 rounded-xl">
            <BookOpen className="text-white" size={27} />
          </div>

          <span className="text-2xl font-bold text-[#173B57]">
            BookNook
          </span>
        </Link>

  
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join BookNook and explore your next favorite book.
          </p>
        </div>

  
        <form onSubmit={handleRegister} className="space-y-4">

  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#173B57]"
            />
          </div>

   
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#173B57]"
            />
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo URL
            </label>

            <input
              type="url"
              placeholder="Enter your profile photo URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#173B57]"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#173B57]"
            />

            {passwordError && (
              <p className="text-red-500 text-sm mt-2">
                {passwordError}
              </p>
            )}

            <p className="text-xs text-gray-500 mt-2">
              Must contain uppercase, lowercase and at least 6 characters.
            </p>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#173B57] hover:bg-[#245575] disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

       
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#173B57] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="text-center mt-6">
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
