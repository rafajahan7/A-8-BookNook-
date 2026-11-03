
import Link from "next/link";
import {
  BookOpen,
  Heart,
  Rocket,
  WandSparkles,
  Search,
  GraduationCap
} from "lucide-react";

import books from "@/data/books.json";

export default function ExploreCategories() {

  const categories = [
    {
      name: "Classic Fiction",
      icon: BookOpen,
      description: "Explore timeless literary masterpieces."
    },
    {
      name: "Romance",
      icon: Heart,
      description: "Discover beautiful stories of love."
    },
    {
      name: "Science Fiction",
      icon: Rocket,
      description: "Travel through imaginative worlds."
    },
    {
      name: "Fantasy",
      icon: WandSparkles,
      description: "Enter magical worlds and adventures."
    },
    {
      name: "Mystery",
      icon: Search,
      description: "Solve mysteries through exciting stories."
    },
    {
      name: "Self-Help",
      icon: GraduationCap,
      description: "Find inspiration for personal growth."
    }
  ];

  const availableCategories = Array.from(
    new Set(books.map((book) => book.category))
  );

  const displayedCategories = categories.filter((category) =>
    availableCategories.includes(category.name)
  );

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {displayedCategories.map((category) => {
          const Icon = category.icon;

          const bookCount = books.filter(
            (book) => book.category === category.name
          ).length;

          return (
            <Link
              href={`/all-books?category=${encodeURIComponent(category.name)}`}
              key={category.name}
              className="group bg-[#F5F3EF] p-8 rounded-2xl hover:bg-[#173B57] transition duration-300"
            >

              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 group-hover:bg-[#D9A65A]">
                <Icon
                  size={28}
                  className="text-[#D9A65A] group-hover:text-white"
                />
              </div>

              <h3 className="text-xl font-bold text-[#173B57] group-hover:text-white mb-2">
                {category.name}
              </h3>

              <p className="text-gray-500 group-hover:text-gray-300 mb-4">
                {category.description}
              </p>

              <p className="text-sm font-semibold text-[#D9A65A]">
                {bookCount} Books →
              </p>

            </Link>
          );
        })}

      </div>

    </section>
  );
}
