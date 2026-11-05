
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Landmark,
  Baby,
  Atom,
  Lightbulb
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Book {
  category: string;
}

export default function ExploreCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [bookCounts, setBookCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/books`
        );

        if (!response.ok) {
          throw new Error("Failed to load categories");
        }

        const data = await response.json();

        const books: Book[] = data.books;

        const counts: Record<string, number> = {};

        books.forEach((book) => {
          counts[book.category] = (counts[book.category] || 0) + 1;
        });

        if (isActive) {
          setBookCounts(counts);
          setCategories(Object.keys(counts));
        }
      } catch (error) {
        console.log("Category loading error:", error);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isActive = false;
    };
  }, []);

  const categoryIcons = {
    Fiction: BookOpen,
    History: Landmark,
    Kids: Baby,
    Science: Atom,
    Others: Lightbulb
  };

  const categoryDescriptions: Record<string, string> = {
    Fiction: "Discover captivating stories and imaginative adventures.",
    History: "Explore the past through fascinating stories.",
    Kids: "Find wonderful books for young readers.",
    Science: "Explore science, discoveries and the universe.",
    Others: "Discover inspiring and informative reads."
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest text-[#D9A65A] mb-3">
          FIND YOUR INTEREST
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-[#173B57]">
          Explore by Categories
        </h2>

        <p className="text-gray-500 mt-3">
          Find your next favorite book from our different collections.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500">
          No categories available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {categories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || BookOpen;

            return (
              <Link
                href={`/all-books?category=${encodeURIComponent(category)}`}
                key={category}
                className="group bg-[#F5F3EF] p-8 rounded-2xl hover:bg-[#173B57] transition duration-300"
              >

                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 group-hover:bg-[#D9A65A]">
                  <Icon
                    size={28}
                    className="text-[#D9A65A] group-hover:text-white"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#173B57] group-hover:text-white mb-2">
                  {category}
                </h3>

                <p className="text-gray-500 group-hover:text-gray-300 mb-4">
                  {categoryDescriptions[category] || "Explore books in this collection."}
                </p>

                <p className="text-sm font-semibold text-[#D9A65A]">
                  {bookCounts[category]} Books →
                </p>

              </Link>
            );
          })}

        </div>
      )}

    </section>
  );
}
