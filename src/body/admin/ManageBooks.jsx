import { Search, SquarePen, Trash2, BookOpen, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIURL, GetRequest, PutRequest } from "../../../services/http";
import ApiImage from "../user/ApiImage";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const response = await GetRequest("books/getAll");
        setBooks(response.data);
      } catch (error) {
        console.log("Error fetching expenses:", error);
      }
    };

    fetchbooks();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`${APIURL}/books/delete/${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks((previousBooks) =>
        previousBooks.filter((item) => item._id !== _id),
      );
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (_id) => {
    navigate(`/admin/books/edit/${_id}`);
  };

  const filteredBooks = books.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.author?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = async (id) => {
    try {
      await PutRequest(`books/toggle/${id}`);

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id ? { ...book, isActive: !book.isActive } : book,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-5/6 min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Books</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all books in your store.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-500">Total Books</p>
          <p className="text-xl font-bold text-gray-800">{books.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-7 bg-white border border-gray-200 rounded-xl p-4">
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Search by title, author"
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="mt-5 bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-100 rounded-full p-4 mb-3">
              <BookOpen size={28} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700">
              {books.length === 0 ? "No books added yet" : "No books found"}
            </p>
            <p className="text-sm text-gray-500 mt-1 text-center">
              {books.length === 0
                ? "Add your first book to get started."
                : "Try searching with a different title or author."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-4 font-semibold">Book</th>
                  <th className="px-5 py-4 font-semibold">Author</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold text-right">Price</th>
                  <th className="px-5 py-4 font-semibold text-center">Stock</th>
                  <th className="px-5 py-4 font-semibold">Show</th>
                  <th className="px-5 py-4 font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredBooks.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                          <ApiImage
                            path={item.image}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <span
                          className="font-semibold text-gray-800 max-w-[200px] truncate"
                          title={item.title}
                        >
                          {item.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3 text-gray-600">{item.author}</td>

                    <td className="px-5 py-3">
                      <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-5 py-3 text-right font-semibold text-gray-800 whitespace-nowrap">
                      NPR. {item.price}
                    </td>

                    <td className="px-5 py-3 text-center">
                      <span
                        className={`inline-block min-w-10 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.stock === 0
                            ? "bg-red-50 text-red-600"
                            : item.stock <= 5
                              ? "bg-amber-50 text-amber-700"
                              : "bg-green-50 text-green-700"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>

                    <td className="px-5 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggle(item._id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          item.isActive
                            ? "text-red-600 bg-red-50 hover:bg-red-100"
                            : "text-green-600 bg-green-50 hover:bg-green-100"
                        }`}
                      >
                        {item.isActive ? (
                          <>
                            <EyeOff size={16} />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye size={16} />
                            Show
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          title="Edit book"
                          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                          onClick={() => handleEdit(item._id)}
                        >
                          <SquarePen size={16} />
                        </button>

                        <button
                          type="button"
                          title="Delete book"
                          className="p-2 rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredBooks.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
