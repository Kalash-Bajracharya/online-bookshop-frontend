import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetRequest, PostRequest } from "../../../services/http";
import { ChevronRight, ShoppingCartIcon, Star } from "lucide-react";
import ApiImage from "./ApiImage";
import "@mantine/carousel/styles.css";
import { Tabs } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Notification } from "@mantine/core";

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [notification, setNotification] = useState(null);
  const params = useParams();

  const fetchBook = async () => {
    try {
      setLoading(true);

      const response = await GetRequest(`books/get/${params._id}`);

      console.log(response);

      setBook(response.data);
    } catch (err) {
      console.log(err);
      alert("Error loading book");
    } finally {
      setLoading(false);
    }
  };
  const fetchBooks = async () => {
    try {
      const response = await GetRequest("books/getActive");
      console.log("All books:", response.data);

      setBooks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.log("Error fetching books:", err);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchBooks();
  }, [params._id]);

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

  if (loading) {
    return <div className="mt-15">Loading...</div>;
  }

  if (!book) {
    return <div className="mt-15">Book not found</div>;
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-12">
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
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 text-sm text-gray-500"
      >
        <Link to="/shop" className="transition hover:text-primary">
          Shop
        </Link>
        <ChevronRight size={15} aria-hidden="true" />
        <span className="font-medium text-primary">Book details</span>
      </nav>

      <div className="bg-secondary rounded-2xl overflow-hidden shadow-lg  flex flex-col lg:flex-row gap-4 lg:gap-8 p-3 sm:p-5">
        {/* Book Image */}
        <div className="w-full lg:w-2/5 h-[300px] sm:h-[400px] lg:h-[550px] xl:h-[600px] shrink-0 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
          <ApiImage
            path={book.image}
            className="h-full w-full object-contain p-8"
          />
        </div>

        {/* Book Information */}
        <div className="min-w-0 flex-1 p-2 sm:p-4 flex flex-col">
          {/* Category */}
          <div className="inline-block w-fit px-3 py-1 bg-accent text-secondary rounded-full font-semibold text-sm">
            {book.category?.trim()}
          </div>

          {/* Title */}
          <h1 className="mt-4 sm:mt-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-primary font-bold leading-tight break-words">
            {book.title}
          </h1>

          {/* Author */}
          <p className="mt-3 text-base sm:text-lg text-gray-500">
            by <span className="font-semibold text-primary">{book.author}</span>
          </p>

          {/* Rating + Stock */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Rating */}
            <div className="flex items-center gap-2 bg-accent px-3 py-2 rounded-lg">
              <span className="text-yellow-600 text-lg">★</span>
              <span className="font-semibold text-primary">{book.rating}</span>
            </div>

            {/* Stock */}
            <div className="px-3 py-2 rounded-lg border border-primary/20 ">
              <span className="text-gray-500">Stock: </span>
              <span className="font-semibold text-primary">{book.stock}</span>
            </div>
          </div>

          {/* Description */}
          {/* <div className="mt-8">
            <h2 className="text-xl font-semibold text-primary mb-2">
              About this book
            </h2>

            <p className="text-gray-500 leading-7">
              {book.description || "No description available for this book."}
            </p>
          </div> */}

          {/* Book Information */}
          <div className="mt-8 sm:mt-12 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-accent">
              <p className="text-xs text-gray-500">Pages</p>
              <p className="font-semibold text-primary">{book.pages}</p>
            </div>

            <div className="p-3 rounded-xl bg-accent">
              <p className="text-xs text-gray-500">Publisher</p>
              <p className="font-semibold text-primary break-words">
                {book.publisher}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-accent">
              <p className="text-xs text-gray-500">ISBN</p>
              <p className="font-semibold text-primary break-words">
                {book.isbn}
              </p>
            </div>
          </div>

          {/* Price + Cart */}
          <div className="mt-auto pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400">Price</p>

              <p className="text-2xl sm:text-3xl font-bold text-primary">
                NPR. {book.price}
              </p>
            </div>

            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl bg-primary text-secondary font-semibold hover:scale-105 transition-all duration-200"
              disabled={book.stock <= 0}
              onClick={() => handleAddToCart(book._id)}
            >
               {book.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-secondary rounded-xl mt-3 shadow-lg border border-primary/10 p-2 sm:p-4">
        <Tabs
          color="#2F3A1d"
          radius="xs"
          variant="pills"
          defaultValue="Description"
        >
          <Tabs.List>
            <Tabs.Tab value="Description">Description</Tabs.Tab>
            <Tabs.Tab value="Reviews">Reviews</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Description" className="text-primary p-2 sm:p-4">
            {book.description}
          </Tabs.Panel>

          <Tabs.Panel value="Reviews" className="text-primary p-2 sm:p-4">
            Messages tab content
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="mt-2">
        <Carousel
          withIndicators
          height={400}
          slideSize={{ base: "100%", xs: "50%", md: "33.333333%" }}
          slideGap="md"
          emblaOptions={{
            loop: true,
            align: "start",
            slidesToScroll: 1,
          }}
        >
          {books
            .filter(
              (item) =>
                item._id !== book._id &&
                (item.category === book.category ||
                  item.author === book.author),
            )
            .map((item) => (
              <Carousel.Slide key={item._id}>
                <Link
                  to={`/detail/${item._id}`}
                  className="block h-full min-w-0 overflow-hidden rounded-2xl bg-secondary shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
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
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {item.category}
                    </p>

                    <h2 className="mt-2 text-base sm:text-lg font-bold text-primary truncate">
                      {item.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 truncate">
                      {item.author}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="text-base sm:text-lg font-bold text-primary">
                          NPR. {item.price}
                        </p>
                      </div>
                    </div>

                    {/* Buy now */}
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
              </Carousel.Slide>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Detail;
