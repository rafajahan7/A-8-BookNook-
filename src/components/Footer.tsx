
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#173B57] text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BookNook Information */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <span className="text-3xl">📚</span>
              <span className="text-2xl font-bold">BookNook</span>
            </Link>

            <p className="text-sm leading-7 text-gray-300">
              Discover your next favorite book with BookNook.
              Explore different genres, borrow books and enjoy
              the wonderful world of reading.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#D9A65A]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#D9A65A] transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/all-books" className="hover:text-[#D9A65A] transition">
                  All Books
                </Link>
              </li>

              <li>
                <Link href="/login" className="hover:text-[#D9A65A] transition">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-[#D9A65A] transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#D9A65A]">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm text-gray-300">
              <li>✉ support@booknook.com</li>
              <li>☎ +880 1234-567890</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#D9A65A]">
              Follow Us
            </h3>

            <p className="mb-5 text-sm text-gray-300">
              Follow BookNook for book updates and reading inspiration.
            </p>

            <div className="flex gap-4">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-white/10 px-4 py-2 hover:bg-[#D9A65A] transition"
              >
                f
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full bg-white/10 px-4 py-2 hover:bg-[#D9A65A] transition"
              >
                ◎
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="rounded-full bg-white/10 px-4 py-2 hover:bg-[#D9A65A] transition"
              >
                𝕏
              </a>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/20 pt-6 text-center">
          <p className="text-sm text-gray-300">
            © 2026 BookNook. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  );
}
