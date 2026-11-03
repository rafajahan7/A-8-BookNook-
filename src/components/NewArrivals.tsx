import Link from "next/link";
import Image from "next/image";
import books from "@/data/books.json";

export default function NewArrivals() {
  // Get the latest 6 books
  const newArrivals = [...books]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      <div className="text-center mb-12">
        <p className="text-sm font-semibold tracking-widest text-[#D9A65A] mb-3">
          FRESH FROM OUR COLLECTION
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-[#173B57]">
          New Arrivals
        </h2>

        <p className="text-gray-500 mt-3">
          Discover the latest additions to our book collection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {newArrivals.map((book) => (

          <div
            key={book.id}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300"
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

            <div className="mb-4">

              <span className="text-xs font-semibold text-[#D9A65A] uppercase tracking-wider">
                {book.category}
              </span>

              <h3 className="text-xl font-bold text-[#173B57] mt-2">
                {book.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                By {book.author}
              </p>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  ⭐ {book.rating}
                </p>

                <p className="text-sm text-gray-500">
                  {book.publishedYear}
                </p>
              </div>

            </div>

            <Link
              href={`/books/${book.id}`}
              className="block text-center w-full bg-[#173B57] text-white py-3 rounded-lg hover:bg-[#D9A65A] transition"
            >
              View Details
            </Link>

          </div>

        ))}

      </div>

      <div className="text-center mt-12">
        <Link
          href="/all-books"
          className="inline-block border border-[#173B57] text-[#173B57] px-8 py-3 rounded-lg font-semibold hover:bg-[#173B57] hover:text-white transition"
        >
          See All Books
        </Link>
      </div>

    </section>
  );
}