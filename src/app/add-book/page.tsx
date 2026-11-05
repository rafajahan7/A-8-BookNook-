
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getToken } from "@/lib/getToken";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AddBook() {
  const { data: session, isPending } = authClient.useSession();

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
    totalCopies: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [adding, setAdding] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      setUploadError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/upload/image`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Image upload failed.");
      }

      setBook((previousBook) => ({
        ...previousBook,
        image: data.imageUrl,
      }));
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!session?.user || !userEmail) {
      toast.error("Please log in before adding a book.");
      return;
    }

    if (!book.image) {
      toast.error("Please upload a book image first.");
      return;
    }

    const totalCopies = Number(book.totalCopies);

    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    try {
      setAdding(true);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...book,
            totalCopies: totalCopies,
            userName: userName,
            userEmail: userEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add book.");
      }

      toast.success("Book added successfully!");

      setBook({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
        totalCopies: "",
      });

      setUploadError("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setAdding(false);
    }
  };

  
  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#f8f7f3] px-4 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
            BookNook Library
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-gray-600">
            Share a new book with our reading community.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Book Title
              </label>

              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Author Name
              </label>

              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={book.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-amber-600"
              >
                <option value="">Select a category</option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

           
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Total Copies
              </label>

              <input
                type="number"
                name="totalCopies"
                value={book.totalCopies}
                onChange={handleChange}
                placeholder="Enter total number of copies"
                min="1"
                step="1"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-amber-600"
              />

              <p className="mt-1 text-sm text-gray-500">
                Enter how many copies of this book are available in total.
              </p>
            </div>

           
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Book Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading || adding}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              {uploading && (
                <div className="mt-3 rounded-lg bg-amber-50 p-3">
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-700"></div>
                  </div>

                  <p className="mt-2 text-center text-sm text-amber-700">
                    Uploading image, please wait...
                  </p>
                </div>
              )}

              {uploadError && (
                <p className="mt-2 text-sm text-red-600">
                  {uploadError}
                </p>
              )}

              {book.image && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-green-700">
                    Image uploaded successfully!
                  </p>

                  <img
                    src={book.image}
                    alt="Book preview"
                    className="h-48 w-36 rounded-lg border object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Short Description
              </label>

              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Write a short description..."
                rows={4}
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-amber-600"
              />
            </div>

            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Added By
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    User Name
                  </label>

                  <input
                    type="text"
                    value={userName}
                    readOnly
                    className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-gray-700">
                    User Email
                  </label>

                  <input
                    type="email"
                    value={userEmail}
                    readOnly
                    className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || adding || !userEmail}
              className="w-full rounded-lg bg-amber-700 py-3 font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {adding ? "Adding Book..." : "Add Book"}
            </button>

            {adding && (
              <div className="rounded-lg bg-amber-50 p-3">
                <div className="flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-700"></div>
                </div>

                <p className="mt-2 text-center text-sm text-amber-700">
                  Adding your book, please wait...
                </p>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
