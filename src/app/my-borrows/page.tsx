
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getToken } from "@/lib/getToken";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  returned?: boolean;
  actualReturnDate?: string;
}

export default function MyBorrowsPage() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState("");

  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email || "";

  // Fetch borrowed books
  const fetchBorrows = useCallback(async () => {
    try {
      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/borrows`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load borrowed books."
        );
      }

      setBorrows(data.borrows || []);
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

  // Load borrowed books
  useEffect(() => {
  if (isPending || !userEmail) return;

  const loadBorrows = async () => {
    await fetchBorrows();
  };

  loadBorrows();
}, [isPending, userEmail, fetchBorrows]);

  // Return borrowed book
  const handleReturn = async (borrowId: string) => {
    setReturningId(borrowId);

    try {
      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/borrows/${borrowId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to return book."
        );
      }

      toast.success("Book returned successfully!");
      await fetchBorrows();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setReturningId("");
    }
  };

 if (isPending || (Boolean(userEmail) && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Borrows
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all the books you have borrowed.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {(!userEmail || borrows.length === 0) ? (
            <div className="text-center py-16 px-4">
              <h2 className="text-xl font-semibold text-gray-800">
                No Borrowed Books Yet
              </h2>

              <p className="text-gray-500 mt-2">
                You havent borrowed any books yet.
              </p>

              <Link
                href="/all-books"
                className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Explore Books
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-blue-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Book Title</th>
                    <th className="px-6 py-4">Borrow Date</th>
                    <th className="px-6 py-4">Return Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {borrows.map((borrow) => (
                    <tr
                      key={borrow._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <Image
                          src={borrow.bookImage}
                          alt={borrow.bookTitle}
                          width={60}
                          height={80}
                          unoptimized
                          className="rounded-md object-cover"
                        />
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800">
                        {borrow.bookTitle}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(
                          borrow.borrowDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(
                          borrow.returnDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        {borrow.returned ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Returned
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                            Borrowed
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleReturn(borrow._id)}
                          disabled={
                            borrow.returned ||
                            returningId === borrow._id
                          }
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          {borrow.returned
                            ? "Returned"
                            : returningId === borrow._id
                            ? "Returning..."
                            : "Return Book"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
