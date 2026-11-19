import React, { useEffect, useState } from "react";
import { GetRequest, PostRequest } from "../../../services/http";
import { Modal, Button, Group, Text } from "@mantine/core";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await GetRequest("orders/my-orders");
        setOrders(response.data);
      } catch (error) {
        console.log("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  const confirmCancel = (id) => {
    setSelectedOrder(id);
    setOpened(true);
  };

  const handleCancel = async () => {
    try {
      const response = await PostRequest(`orders/cancel/${selectedOrder}`, {});

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder
              ? { ...order, orderStatus: "CANCELLED" }
              : order,
          ),
        );

        setOpened(false);
        setSelectedOrder(null);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Cancel Order"
        centered
      >
        <Text size="sm">Are you sure you want to cancel this order?</Text>

        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={() => setOpened(false)}>
            Go Back
          </Button>

          <Button color="red" onClick={handleCancel}>
            Yes, Cancel Order
          </Button>
        </Group>
      </Modal>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border-gray-200  rounded-xl p-5 mb-5 bg-secondary"
          >
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="font-semibold">Order #{order._id}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <span className=" bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {order.orderStatus}
                </span>
              </div>
            </div>

            {/* Ordered Books */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-semibold mb-3">Books Ordered</h3>

              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                >
                  <div>
                    <p className="font-medium">
                      {item.book?.title || item.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    NPR. {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-semibold mt-4">
              Total: NPR. {order.totalAmount}
            </p>

            <p className="text-sm text-gray-500">
              Payment: {order.paymentMethod}
            </p>
            {order.orderStatus === "PENDING" && (
              <Button
                color="red"
                variant="light"
                onClick={() => confirmCancel(order._id)}
              >
                Cancel Order
              </Button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
