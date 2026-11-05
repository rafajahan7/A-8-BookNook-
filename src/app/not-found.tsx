
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F5F7FA]">
      <div className="text-center max-w-lg">

        <div className="flex justify-center mb-6">
          <div className="bg-[#173B57] p-4 rounded-2xl">
            <BookOpen className="text-white" size={40} />
          </div>
        </div>

        <h1 className="text-7xl font-bold text-[#173B57]">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3 mb-8">
          Sorry! The page you are looking for doesnt exist
          or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-block bg-[#173B57] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#245575] transition"
        >
          Back to Home
        </Link>

      </div>
    </main>
  );
}
