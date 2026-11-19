
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, ShoppingBag } from "lucide-react";
import { APIURL, GetRequest } from "../../../services/http";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrders = async () => {
    try {
      const response = await GetRequest("orders/getAll");
      setOrders(response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateOrderStatus = async (id, orderStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${APIURL}/orders/updateStatus/${id}`,
        { orderStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === id ? { ...order, orderStatus } : order
        )
      );

      if (selectedOrder?._id === id) {
        setSelectedOrder((previous) => ({ ...previous, orderStatus }));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update order status");
    }
  };

  const updatePaymentStatus = async (id, paymentStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${APIURL}/orders/updatePayment/${id}`,
        { paymentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === id ? { ...order, paymentStatus } : order
        )
      );

      if (selectedOrder?._id === id) {
        setSelectedOrder((previous) => ({ ...previous, paymentStatus }));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update payment");
    }
  };

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="w-5/6 min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all customer orders.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="text-xl font-bold text-gray-800">{orders.length}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-xl font-bold text-amber-600">
            {orders.filter((order) => order.orderStatus === "PENDING").length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Confirmed</p>
          <p className="text-xl font-bold text-blue-600">
            {orders.filter((order) => order.orderStatus === "CONFIRMED").length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Delivered</p>
          <p className="text-xl font-bold text-green-600">
            {orders.filter((order) => order.orderStatus === "DELIVERED").length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-5 bg-white border border-gray-200 rounded-xl overflow-hidden">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-100 rounded-full p-4 mb-3">
              <ShoppingBag size={28} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700">No orders found</p>
            <p className="text-sm text-gray-500 mt-1">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-4 font-semibold">Order ID</th>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold text-center">Items</th>
                  <th className="px-5 py-4 font-semibold text-right">Total</th>
                  <th className="px-5 py-4 font-semibold">Payment</th>
                  <th className="px-5 py-4 font-semibold">Payment Status</th>
                  <th className="px-5 py-4 font-semibold">Order Status</th>
                  <th className="px-5 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-700">
                      #{order._id.slice(-7)}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800">
                        {order.shippingAddress?.name || order.user?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.user?.email || "No email"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-center text-gray-600">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold text-gray-800 whitespace-nowrap">
                      NPR. {order.totalAmount}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {order.paymentMethod}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          updatePaymentStatus(order._id, e.target.value)
                        }
                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-xs outline-none focus:border-blue-400"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="FAILED">Failed</option>
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-xs outline-none focus:border-blue-400"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED" >Cancelled</option>
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center">
                        <button
                          type="button"
                          title="View order"
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {orders.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
            Showing {orders.length} orders
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order Details
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  #{selectedOrder._id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            {/* Customer */}
            <div className="mb-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                Delivery Details
              </h3>

              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm space-y-1">
                <p>Name: {selectedOrder.shippingAddress?.name}</p>
                <p>Phone: {selectedOrder.shippingAddress?.phone}</p>
                <p>Address: {selectedOrder.shippingAddress?.address}</p>
                <p>City: {selectedOrder.shippingAddress?.city}</p>
                <p>Email: {selectedOrder.user?.email || "Unavailable"}</p>
              </div>
            </div>

            {/* Books */}
            <h3 className="font-semibold text-gray-800 mb-3">
              Books Ordered
            </h3>

            <div className="space-y-3 mb-5">
              {selectedOrder.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-gray-100 pb-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-800 whitespace-nowrap">
                    NPR. {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4 font-bold text-gray-800">
              <span>Total Amount</span>
              <span>NPR. {selectedOrder.totalAmount}</span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-lg bg-[#2F3A1D] py-3 text-white hover:bg-[#46552c] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
