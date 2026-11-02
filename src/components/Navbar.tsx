
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Menu,
  X,
  ChevronDown,
  UserRound,
  LogOut
} from "lucide-react";

export default function Navbar() {

  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

 const navLinks = [
  { name: "Home", href: "/", private: false },
  { name: "All Books", href: "/books", private: false },
  { name: "Add Book", href: "/add-book", private: true },
  { name: "My Books", href: "/my-books", private: true },
  { name: "My Borrows", href: "/my-borrows", private: true },
];

  const visibleLinks = navLinks.filter((link) => {
    return !link.private || isLoggedIn;
  });

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="navbar mx-auto max-w-7xl px-4 md:px-8">

     

        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">

            <div className="rounded-lg bg-[#173B57] p-2">
              <BookOpen size={25} color="white" />
            </div>

            <span className="text-2xl font-bold text-[#173B57]">
              BookNook
            </span>

          </Link>
        </div>

        

        <div className="flex-none md:hidden">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        

        <div className="hidden md:flex items-center gap-6">

          {visibleLinks.map((link) => (

            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                pathname === link.href
                  ? "text-[#D9A65A]"
                  : "text-gray-700 hover:text-[#D9A65A]"
              }`}
            >
              {link.name}
            </Link>

          ))}

        

          {!isLoggedIn && (
            <div className="flex items-center gap-3">

              <Link
                href="/login"
                className="btn btn-outline border-[#173B57] text-[#173B57]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="btn bg-[#173B57] text-white hover:bg-[#D9A65A] hover:text-white border-none"
              >
                Register
              </Link>

            </div>
          )}

         

          {isLoggedIn && (

            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >

                <div className="avatar placeholder">
                  <div className="w-10 rounded-full bg-[#173B57] text-white">
                    <span>U</span>
                  </div>
                </div>

                <ChevronDown size={17} />

              </button>

              {profileOpen && (

                <div className="absolute right-0 top-14 w-48 rounded-lg bg-white shadow-lg border p-3">

                  <p className="font-semibold text-gray-800">
                    User Name
                  </p>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 py-3 text-sm hover:text-[#D9A65A]"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>

                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setProfileOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm text-red-600"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    

      {menuOpen && (

        <div className="md:hidden border-t bg-white px-5 py-4">

          <div className="flex flex-col gap-4">

            {visibleLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-[#D9A65A]"
              >
                {link.name}
              </Link>

            ))}

            {!isLoggedIn && (

              <div className="flex gap-3 pt-2">

                <Link
                  href="/login"
                  className="btn btn-outline flex-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="btn bg-[#173B57] text-white flex-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>

              </div>

            )}

            {isLoggedIn && (

              <>
                <Link href="/profile" onClick={() => setMenuOpen(false)}>
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setMenuOpen(false);
                  }}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>

            )}

          </div>

        </div>

      )}

    </header>
  );
}
