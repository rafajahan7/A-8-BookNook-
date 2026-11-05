
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getToken } from "@/lib/getToken";
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
  publishedYear: number;
  availableCopies: number;
  totalCopies: number;
}

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const [showEditForm, setShowEditForm] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);

  const { data: session, isPending } = authClient.useSession();

  const userEmail = session?.user?.email || "";

  // Get user's books
  const fetchMyBooks = useCallback(async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/books/my-books`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load books.");
      }

      setBooks(data.books);

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Check login status and fetch books
  useEffect(() => {
  if (isPending || !userEmail) return;

  const loadBooks = async () => {
    try {
      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/books/my-books`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch your books");
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load your books");
    } finally {
      setLoading(false);
    }
  };

  loadBooks();
}, [isPending, userEmail]);

  // Open edit form
  const handleEdit = (book: Book) => {
    setEditBook({ ...book });
    setShowEditForm(true);
  };

  // Update form values
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!editBook) return;

    setEditBook({
      ...editBook,
      [e.target.name]: e.target.value,
    });
  };

  // Save updated book
  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!editBook) return;

    try {
      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/books/${editBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editBook),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update book.");
      }

      toast.success("Book updated successfully!");

      setShowEditForm(false);
      setEditBook(null);

      await fetchMyBooks();

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  // Open delete confirmation
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Delete book
  const handleDelete = async () => {
    try {
      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/books/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete book.");
      }

      setBooks(
        books.filter((book) => book._id !== deleteId)
      );

      toast.success("Book deleted successfully!");

      setShowDeleteModal(false);
      setDeleteId("");

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  // Show loading spinner
  if (isPending || (userEmail && loading)) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Books
        </h1>

        <p className="text-gray-500 mb-8">
          Manage the books you have added to BookNook.
        </p>

        {books.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <p className="text-gray-600">
              You havent added any books yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >

                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    unoptimized
                    className="object-contain p-4"
                  />
                </div>

                <div className="p-5">

                  <span className="text-sm text-blue-600">
                    {book.category}
                  </span>

                  <h2 className="text-xl font-semibold mt-2">
                    {book.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    By {book.author}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => handleEdit(book)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteClick(book._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditForm && editBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-5">
              Edit Book
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">

              <div>
                <label className="block mb-1 font-medium">
                  Book Title
                </label>

                <input
                  name="title"
                  value={editBook.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Author Name
                </label>

                <input
                  name="author"
                  value={editBook.author}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={editBook.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Book Image URL
                </label>

                <input
                  name="image"
                  value={editBook.image}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={editBook.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditBook(null);
                  }}
                  className="flex-1 border py-3 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                  Save Changes
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-xl p-6 w-full max-w-md">

            <h2 className="text-xl font-bold mb-3">
              Delete Book?
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this book? This action cannot be undone.
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId("");
                }}
                className="flex-1 border py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
