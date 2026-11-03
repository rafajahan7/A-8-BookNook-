
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName: string;
  userEmail: string;
  publishedYear: number;
  availableCopies: number;
  totalCopies: number;
  createdAt: string;
  rating: number;
}

export default function BookDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  const userName = "Demo User";
  const userEmail = "demo@booknook.com";

  // Fetch book details
  const fetchBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/books/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load book.");
      }

      setBook(data.book);
      setError("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load book details
  useEffect(() => {
    if (!id) return;

    let isActive = true;

    const loadBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/books/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load book.");
        }

        if (isActive) {
          setBook(data.book);
          setError("");
        }
      } catch (error) {
        if (isActive) {
          setError(
            error instanceof Error
              ? error.message
              : "Something went wrong."
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadBook();

    return () => {
      isActive = false;
    };
  }, [id]);

  // Confirm borrowing
  const handleBorrow = async () => {
    if (!book) return;

    setBorrowing(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/borrows",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId: book._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to borrow book."
        );
      }

      toast.success("Book borrowed successfully!");

      setShowBorrowModal(false);

      await fetchBook();

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading book details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">
          {error || "Book not found."}
        </p>

        <Link
          href="/all-books"
          className="text-blue-600 hover:underline"
        >
          Back to All Books
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <Link
          href="/all-books"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← Back to All Books
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 grid md:grid-cols-2 gap-10">

          <div className="flex justify-center items-center">
            <Image
              src={book.image}
              alt={book.title}
              width={400}
              height={550}
              unoptimized
              className="rounded-xl object-contain max-h-[500px] w-auto"
            />
          </div>

          <div className="flex flex-col justify-center gap-5">

            <div>
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                {book.category}
              </span>

              <h1 className="text-3xl font-bold mt-5 text-gray-900">
                {book.title}
              </h1>

              <p className="text-gray-500 mt-2">
                By {book.author}
              </p>
            </div>

            <div className="border-t border-b py-5 space-y-3">
              <p className="text-gray-700">
                <strong>Published Year:</strong> {book.publishedYear}
              </p>

              <p className="text-gray-700">
                <strong>Available Copies:</strong> {book.availableCopies}
              </p>

              <p className="text-gray-700">
                <strong>Total Copies:</strong> {book.totalCopies}
              </p>

              <p className="text-gray-700">
                <strong>Added By:</strong> {book.userName}
              </p>

              <p className="text-gray-700">
                <strong>Email:</strong> {book.userEmail}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                About This Book
              </h2>

              <p className="text-gray-600 leading-7">
                {book.description}
              </p>
            </div>

            <button
              onClick={() => setShowBorrowModal(true)}
              disabled={book.availableCopies <= 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
            >
              {book.availableCopies > 0
                ? "Borrow This Book"
                : "Currently Unavailable"}
            </button>

          </div>
        </div>
      </div>

      {/* Borrow Confirmation Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Confirm Your Borrowing
            </h2>

            <p className="text-gray-500 mb-6">
              Please check your information before borrowing this book.
            </p>

            <div className="space-y-4">

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  User Name
                </label>

                <input
                  type="text"
                  value={userName}
                  readOnly
                  className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  User Email
                </label>

                <input
                  type="email"
                  value={userEmail}
                  readOnly
                  className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-600"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  Book:
                </p>

                <p className="font-semibold text-gray-900">
                  {book.title}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  Return period: 14 days
                </p>
              </div>

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setShowBorrowModal(false)}
                disabled={borrowing}
                className="w-1/2 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleBorrow}
                disabled={borrowing}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg"
              >
                {borrowing ? "Processing..." : "Confirm Borrow"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
