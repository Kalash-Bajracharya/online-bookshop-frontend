import React, { useEffect, useState } from "react";
import homepage from "../../assets/homepage.png";
import { Book, ShoppingBag, ShoppingCartIcon, Star, Truck } from "lucide-react";
import { Carousel } from "@mantine/carousel";
import { GetRequest, PostRequest } from "../../../services/http";
import ApiImage from "./ApiImage";
import { Link } from "react-router-dom";
import { Notification } from "@mantine/core";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [notification, setNotification] = useState(null);

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

  console.log(books);

  useEffect(() => {
    fetchBooks();
  }, []);

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
      {/* Hero Section */}
      <div
        className="homepage min-h-[450px] md:min-h-[550px] bg-cover bg-center md:bg-right flex items-center"
        style={{ backgroundImage: `url(${homepage})` }}
      >
        <div className="px-6 py-12 sm:px-10 md:px-14 lg:px-20 w-full md:w-[60%] lg:w-[55%] flex flex-col gap-4">
          <h2 className="text-accent text-lg sm:text-xl">
            Good Books. <b>Better Days</b>
          </h2>

          <h1 className="text-primary text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Discover Your Next Favorite{" "}
            <span className="text-accent">Book</span>
          </h1>

          <p className="text-gray-700 text-sm sm:text-base max-w-lg">
            From timeless classics to modern bestsellers, find the stories that
            stay with you.
          </p>
        </div>
      </div>

      {/* Promo Section */}
      <div className="m-3 sm:m-5 lg:mx-10 px-5 sm:px-8 lg:px-12 py-6 bg-secondary rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <Truck size={36} className="text-primary shrink-0" />
          <div>
            <h2 className="text-primary font-semibold">Free Shipping</h2>
            <p className="text-gray-700 text-xs">On orders over NPR 1,000</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShoppingBag size={36} className="text-primary shrink-0" />
          <div>
            <h2 className="text-primary font-semibold">Easy Returns</h2>
            <p className="text-gray-700 text-xs">Within 7 days</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Book size={36} className="text-primary shrink-0" />
          <div>
            <h2 className="text-primary font-semibold">Quality Books</h2>
            <p className="text-gray-700 text-xs">Handpicked for you</p>
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <section className="px-5 sm:px-8 lg:px-20 py-8">
        <h2 className="text-primary text-2xl font-semibold">Best Sellers</h2>
        <p className="text-gray-700 text-sm mt-1">
          Most loved books, handpicked for you
        </p>

        <div>
          <Carousel
            withIndicators
            height={440}
            slideSize={{ base: "100%", xs: "50%", md: "33.333333%" }}
            slideGap="md"
            emblaOptions={{
              loop: true,
              align: "start",
              slidesToScroll: 1,
            }}
          >
            {[...books]
              .sort((a, b) => (b.sold || 0) - (a.sold || 0))
              .slice(0, 10)
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

        {/* Add your best-selling book cards here */}
      </section>

      {/* New Arrivals */}
      <section className="px-5 sm:px-8 lg:px-20 py-8">
        <h2 className="text-primary text-2xl font-semibold">New Arrivals</h2>
        <p className="text-gray-700 text-sm mt-1">
          Recently added to our collection
        </p>

        <div>
          <Carousel
            withIndicators
            height={440}
            slideSize={{ base: "100%", xs: "50%", md: "33.333333%" }}
            slideGap="md"
            emblaOptions={{
              loop: true,
              align: "start",
              slidesToScroll: 1,
            }}
          >
            {[...books]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 10)
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
      </section>
    </div>
  );
};

export default Home;
