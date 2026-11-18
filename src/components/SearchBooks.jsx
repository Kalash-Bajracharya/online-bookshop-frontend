
import React, { useEffect, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { GetRequest } from "../../services/http";
import ApiImage from "../body/user/ApiImage";

const SearchBooks = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
       const response = await GetRequest("books/getAll");
          console.log(response);
          setBooks(response.data);
          
    };

    fetchBooks();
  }, []);

  const results = books
    .filter(
      (item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.author?.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="relative w-full min-w-0">
      {/* Search Input */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary border border-primary/10 focus-within:border-primary/50">
        <SearchIcon size={19} className="text-primary shrink-0" />

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search books..."
          className="w-full min-w-0 bg-transparent outline-none text-primary text-sm"
        />

        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setShowResults(false);
            }}
            aria-label="Clear search"
          >
            <X size={17} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {showResults && search.trim() && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[260px] bg-secondary rounded-xl shadow-lg border border-primary/10 z-50 overflow-hidden">
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item._id}
                to={`/detail/${item._id}`}
                onClick={() => {
                  setSearch("");
                  setShowResults(false);
                }}
                className="flex items-center gap-3 p-3 hover:bg-accent transition"
              >
                <div className="w-12 h-14 shrink-0 bg-gray-100 rounded overflow-hidden">
                  <ApiImage
                    path={item.image}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-primary text-sm truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {item.author}
                  </p>
                  <p className="text-sm font-bold text-primary mt-1">
                    NPR. {item.price}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500">
              No books found.
            </p>
          )}
        </div>
      )}

      {/* Close results when clicking elsewhere */}
      {showResults && (
        <button
          type="button"
          aria-label="Close search results"
          className="fixed inset-0 z-[-1] cursor-default"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default SearchBooks;
