
"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName: string;
  userEmail: string;
  price: number;
  publishedYear: number;
  availableCopies: number;
  totalCopies: number;
  createdAt: string;
  rating: number;
  featured: boolean;
}

function AllBooksContent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();

  const categoryFromURL = searchParams.get("category");
  const selectedCategory = categoryFromURL || "All";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
  `${process.env.NEXT_PUBLIC_URL}/api/books`
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch books.");
        }

        setBooks(data.books);
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

    fetchBooks();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(books.map((book) => book.category)))
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">

      <div className="text-center mb-10">
        <p className="text-sm font-semibold tracking-widest text-[#D9A65A] mb-3">
          OUR COLLECTION
        </p>

        <h1 className="text-4xl font-bold text-[#173B57]">
          Explore All Books
        </h1>

        <p className="text-gray-500 mt-3">
          Discover your next favorite book from our collection.
        </p>
      </div>

      {loading ? (
  <LoadingSpinner />
) : error ? (
        <p className="text-center py-16 text-red-600">
          {error}
        </p>
      ) : (
        <>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by book title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 outline-none focus:border-[#D9A65A]"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  if (category === "All") {
                    window.location.href = "/all-books";
                  } else {
                    window.location.href = `/all-books?category=${encodeURIComponent(category)}`;
                  }
                }}
                className={`px-5 py-2 rounded-full border transition ${
                  selectedCategory === category
                    ? "bg-[#173B57] text-white border-[#173B57]"
                    : "bg-white text-[#173B57] border-gray-300 hover:bg-[#F5F3EF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="text-gray-500 mb-6">
            Showing {filteredBooks.length} books
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                >

                  <div className="bg-[#F5F3EF] rounded-lg p-4 mb-5">
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={300}
                      height={350}
                      className="w-full h-64 object-contain"
                      unoptimized
                    />
                  </div>

                  <p className="text-xs font-semibold text-[#D9A65A] uppercase">
                    {book.category}
                  </p>

                  <h2 className="text-xl font-bold text-[#173B57] mt-2">
                    {book.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    By {book.author}
                  </p>

                  <div className="flex justify-between mt-4 mb-5">
                    <p className="text-gray-600">
                      ⭐ {book.rating}
                    </p>

                    <p className="font-semibold text-[#173B57]">
                      ৳{book.price}
                    </p>
                  </div>

                  <Link
                    href={`/books/${book._id}`}
                    className="block text-center bg-[#173B57] text-white py-3 rounded-lg hover:bg-[#D9A65A] transition"
                  >
                    View Details
                  </Link>

                </div>
              ))}

            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-[#173B57]">
                No Books Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try another search or category.
              </p>
            </div>
          )}
        </>
      )}

    </main>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense
      fallback={
        <p className="text-center py-16 text-gray-500">
          Loading books...
        </p>
      }
    >
      <AllBooksContent />
    </Suspense>
  );
}
