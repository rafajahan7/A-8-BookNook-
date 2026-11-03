
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

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

  useEffect(() => {
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

    if (id) {
      fetchBook();
    }
  }, [id]);

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

          {/* Book Image */}
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

          {/* Book Information */}
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
              disabled={book.availableCopies <= 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
            >
              {book.availableCopies > 0
                ? "Borrow Book"
                : "Currently Unavailable"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
