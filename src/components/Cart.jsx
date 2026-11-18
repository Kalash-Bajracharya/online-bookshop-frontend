import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Stepper } from "@mantine/core";
import { APIURL, GetRequest, PostRequest } from "../../services/http";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const token = localStorage.getItem("token");

  // Get cart from backend
  const getCart = async () => {
    try {
      if (token) {
        const response = await GetRequest("cart/");
        setItems(response.data.items || []);
      } else {
        alert("Login first");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // Get saved user details
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    setShippingAddress({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
    });
  }, []);

  // Update quantity
  const updateQuantity = async (bookId, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.put(
        `${APIURL}/cart/update/${bookId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.book._id === bookId ? { ...item, quantity } : item,
        ),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update quantity");
    }
  };

  // Remove a book
  const removeBook = async (bookId) => {
    try {
      await axios.delete(`${APIURL}/cart/remove/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems((prevItems) =>
        prevItems.filter((item) => item.book._id !== bookId),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove book");
    }
  };

  // Calculate total
  const total = items.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0,
  );

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      setPlacingOrder(true);

      const response = await PostRequest("orders/create", {
        paymentMethod,
        shippingAddress,
      });

      setOrderSuccess(response.data.order);
      setItems([]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading cart...</p>;
  }

  // Order success screen
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-stone-50 px-4 py-16">
        <div className="mx-auto max-w-lg rounded-lg bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-bold text-[#2F3A1D]">
            Order Placed Successfully!
          </h1>

          <p className="mb-4 text-stone-600">Thank you for shopping with us.</p>

          <p className="text-sm text-stone-500">Order ID: {orderSuccess._id}</p>

          <p className="mt-3 font-semibold">
            Total: NPR. {orderSuccess.totalAmount.toLocaleString()}
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block rounded-md bg-[#2F3A1D] px-6 py-3 text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-bold text-stone-800">
          My Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <p className="mb-4 text-stone-600">Your cart is empty.</p>

            <Link
              to="/shop"
              className="inline-block rounded-md bg-[#2F3A1D] px-5 py-2 text-white"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <Stepper active={active} color="#2F3A1D">
            {/* STEP 1: CART */}
            <Stepper.Step label="Cart" description="Review your items">
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Cart items */}
                <div className="space-y-4 md:col-span-2">
                  {items.map((item) => (
                    <div
                      key={item.book._id}
                      className="flex gap-4 rounded-lg bg-white p-4 shadow-sm"
                    >
                      <img
                        src={`${APIURL}/${item.book.image}`}
                        alt={item.book.title}
                        className="h-32 w-24 rounded object-cover"
                      />

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h2 className="font-semibold text-stone-800">
                            {item.book.title}
                          </h2>

                          <p className="text-sm text-stone-500">
                            {item.book.author}
                          </p>

                          <p className="mt-2 font-medium text-[#2F3A1D]">
                            NPR. {item.book.price}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.book._id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 rounded border disabled:opacity-40"
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              onClick={() =>
                                updateQuantity(item.book._id, item.quantity + 1)
                              }
                              className="h-8 w-8 rounded border"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeBook(item.book._id)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order summary */}
                <div className="h-fit rounded-lg bg-white p-5 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Books ({items.length})</span>

                    <span>
                      {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      items
                    </span>
                  </div>

                  <div className="my-4 border-t" />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>NPR. {total.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => setActive(1)}
                    className="mt-5 w-full rounded-md bg-[#2F3A1D] py-3 text-white hover:opacity-90"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/shop"
                    className="mt-3 block text-center text-sm text-stone-600 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </Stepper.Step>

            {/* STEP 2: CHECKOUT */}
            <Stepper.Step label="Checkout" description="Delivery and payment">
              <form
                onSubmit={handlePlaceOrder}
                className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                {/* Delivery details */}
                <div className="rounded-lg bg-white p-6 shadow-sm md:col-span-2">
                  <h2 className="mb-5 text-xl font-semibold">
                    Delivery Details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Full Name
                      </label>

                      <input
                        type="text"
                        required
                        value={shippingAddress.name}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-md border p-3 outline-none focus:border-[#2F3A1D]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            phone: e.target.value,
                          })
                        }
                        className="w-full rounded-md border p-3 outline-none focus:border-[#2F3A1D]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Delivery Address
                      </label>

                      <input
                        type="text"
                        required
                        value={shippingAddress.address}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            address: e.target.value,
                          })
                        }
                        className="w-full rounded-md border p-3 outline-none focus:border-[#2F3A1D]"
                      />
                    </div>
                  </div>

                  {/* Payment method */}
                  <h2 className="mb-4 mt-8 text-xl font-semibold">
                    Payment Method
                  </h2>

                  <label className="flex cursor-pointer items-center gap-3 rounded-md border p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />

                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-stone-500">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </label>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActive(0)}
                      className="rounded-md border px-5 py-2"
                    >
                      Back to Cart
                    </button>

                    <button
                      type="submit"
                      disabled={placingOrder}
                      className="rounded-md bg-[#2F3A1D] px-5 py-2 text-white disabled:opacity-50"
                    >
                      {placingOrder ? "Placing Order..." : "Place Order"}
                    </button>
                  </div>
                </div>

                {/* Checkout summary */}
                <div className="h-fit rounded-lg bg-white p-5 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Total Books</span>

                    <span>
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>

                  <div className="my-4 border-t" />

                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>NPR. {total.toLocaleString()}</span>
                  </div>
                </div>
              </form>
            </Stepper.Step>
          </Stepper>
        )}
      </div>
    </div>
  );
};

export default Cart;
