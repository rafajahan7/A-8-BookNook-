
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import {
  BookOpen,
  Menu,
  X,
  ChevronDown,
  UserRound,
  LogOut
} from "lucide-react";

function NavbarContent() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", private: false },
    { name: "All Books", href: "/all-books", private: false },
    { name: "Add Book", href: "/add-book", private: true },
    { name: "My Books", href: "/my-books", private: true },
    { name: "My Borrows", href: "/my-borrows", private: true }
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <BookOpen size={32} className="text-[#D9A65A]" />

            <span className="text-2xl font-bold text-[#173B57]">
              BookNook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks
              .filter((link) => !link.private || isLoggedIn)
              .map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition ${
                    pathname === link.href
                      ? "text-[#D9A65A]"
                      : "text-[#173B57] hover:text-[#D9A65A]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

          </div>

          {/* Login / Profile */}
          <div className="hidden md:flex items-center gap-4">

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="font-semibold text-[#173B57] hover:text-[#D9A65A] transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-[#173B57] text-white px-5 py-2.5 rounded-lg hover:bg-[#D9A65A] transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-[#173B57] font-medium"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F5F3EF] flex items-center justify-center">
                    <UserRound size={22} />
                  </div>

                  <span>Demo User</span>

                  <ChevronDown size={18} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">

                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F5F3EF]"
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-[#F5F3EF]"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#173B57]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-5">

            <div className="flex flex-col gap-4">

              {navLinks
                .filter((link) => !link.private || isLoggedIn)
                .map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-medium ${
                      pathname === link.href
                        ? "text-[#D9A65A]"
                        : "text-[#173B57]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

              {!isLoggedIn ? (
                <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">

                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="font-semibold text-[#173B57]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-[#173B57] text-white text-center py-2.5 rounded-lg"
                  >
                    Register
                  </Link>

                </div>
              ) : (
                <div className="pt-3 border-t border-gray-100">

                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-[#173B57]"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 text-red-500"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}
