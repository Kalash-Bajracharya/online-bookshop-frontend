import { useEffect, useState } from "react";
import { GetRequest, PostRequest } from "../../../services/http";
import { ShoppingCart, ShoppingCartIcon, Star } from "lucide-react";
import ApiImage from "./ApiImage";
import Filter from "../../components/Filter";
import { Link } from "react-router-dom";
import { Notification } from "@mantine/core";

function Shop() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
   const [notification, setNotification] = useState(null);

  const fetchBooks = async () => {
    const response = await GetRequest("books/getActive");
    console.log(response);
    setBooks(response.data);
    setFilteredBooks(response.data);
  };

  const handleAddToCart = async (bookId) => {
    try {
      const response = await PostRequest("cart/add", {
        bookId: bookId,
      });

      
    setNotification({
        color: "green",
        title: "Success",
        message: response.data.message,
      });
    } catch (error) {
      setNotification({
        color: "red",
        title: "Error",
        message: error.response?.data?.message || "Failed to add book",
      });
    }
  };

  console.log(books);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="w-full">
           {notification && (
        <div className="fixed bottom-5 right-5 z-[50] w-[350px]">
          <Notification
            color={notification.color}
            title={notification.title}
            onClose={() => setNotification(null)}
            withCloseButton
          >
            {notification.message}
          </Notification>
        </div>
      )}
      <div className="px-2 sm:px-4 lg:px-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 lg:w-1/5 shrink-0">
          <Filter books={books} setFilteredBooks={setFilteredBooks} />
        </div>

        <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredBooks.map((item) => (
            <Link
              to={`/detail/${item._id}`}
              key={item._id}
              className="min-w-0 overflow-hidden rounded-2xl bg-secondary shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image section */}
              <div className="relative h-44 sm:h-48 bg-gray-100 flex items-center justify-center">
                <ApiImage
                  path={item.image}
                  className="h-full w-full object-contain p-4"
                />

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white shadow">
                  <Star size={13} fill="#2F3A1d" color="#2F3A1d" />
                  <span className="text-xs font-semibold text-primary">
                    {item.rating}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-3 sm:p-4">
                {/* Category */}
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {item.category}
                </p>

                {/* Title */}
                <h2 className="mt-2 text-base sm:text-lg font-bold text-primary truncate">
                  {item.title}
                </h2>

                {/* Author */}
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {item.author}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Price</p>

                    <p className="text-base sm:text-lg font-bold text-primary">
                      NPR. {item.price}
                    </p>
                  </div>

                  {/* Cart */}
                 
                </div>

                {/* Add to cart */}
                <button
                    className=" rounded-xl w-full p-2 bg-primary text-secondary flex items-center justify-center gap-2 hover:scale-105 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(item._id);
                    }}
                  >
                    <ShoppingCartIcon size={19} /> Add to Cart
                  </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
