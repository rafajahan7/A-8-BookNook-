
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { UserRound, Mail, ArrowLeft, BookOpen } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#173B57]">Loading profile...</p>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">

      <div className="max-w-3xl mx-auto">

        <Link
          href="/"
          className="flex items-center gap-2 text-[#173B57] mb-8 hover:text-[#D9A65A]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="bg-[#173B57] text-white text-center py-10">

            <div className="flex justify-center mb-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white text-[#173B57] flex items-center justify-center">
                  <UserRound size={45} />
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-200 mt-2">
              BookNook Member
            </p>

          </div>

          <div className="p-8">

            <h2 className="text-xl font-bold text-[#173B57] mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-4 border-b pb-4">
                <UserRound className="text-[#D9A65A]" size={24} />

                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-800">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b pb-4">
                <Mail className="text-[#D9A65A]" size={24} />

                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-semibold text-gray-800">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <BookOpen className="text-[#D9A65A]" size={24} />

                <div>
                  <p className="text-sm text-gray-500">Account</p>
                  <p className="font-semibold text-gray-800">
                    BookNook User
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-[#173B57] text-white px-6 py-3 rounded-lg hover:bg-[#245575] transition"
              >
                Back to Homepage
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
