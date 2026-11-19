import { useState, useEffect } from "react";
import { UserRound, Mail, Wallet, Phone, MapPin, Save } from "lucide-react";
import axios from "axios";
import { APIURL } from "../../services/http";

const Profile = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${APIURL}/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const total = response.data
        .filter((order) => order.paymentStatus === "PAID")
        .reduce((sum, order) => sum + order.totalAmount, 0);

      setTotalSpent(total);

    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, []);

  const [totalSpent, setTotalSpent] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${APIURL}/users/update/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = {
        ...user,
        ...response.data,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-6 text-3xl font-bold text-stone-800 text-right">
          My Profile
        </h1>

        {/* Profile Header */}
        <div className="mb-6 flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#2F3A1d] text-3xl font-bold text-white">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-stone-800">
              {user.name || "User"}
            </h2>
            <p className="text-sm text-stone-500">
              Bookshop Member
            </p>
          </div>
        </div>

        {/* Total Spending */}
        <div className="rounded-xl bg-[#2F3A1d] p-6 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/15 p-3">
              <Wallet size={26} />
            </div>

            <div>
              <p className="text-sm text-stone-200">
                Total Amount Spent
              </p>

              <h2 className="text-3xl font-bold">
                NPR. {totalSpent.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
        </div>

        {/* Editable Account Details */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-stone-800">
            Account Information
          </h2>

          {/* Full Name */}
          <div className="border-b border-stone-100 py-4">
            <label className="mb-2 flex items-center gap-3 text-sm text-stone-500">
              <UserRound size={20} />
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-[#2F3A1d]"
            />
          </div>

          {/* Email */}
          <div className="border-b border-stone-100 py-4">
            <label className="mb-2 flex items-center gap-3 text-sm text-stone-500">
              <Mail size={20} />
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-[#2F3A1d]"
            />
          </div>

          {/* Phone */}
          <div className="border-b border-stone-100 py-4">
            <label className="mb-2 flex items-center gap-3 text-sm text-stone-500">
              <Phone size={20} />
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-[#2F3A1d]"
            />
          </div>

          {/* Address */}
          <div className="py-4">
            <label className="mb-2 flex items-center gap-3 text-sm text-stone-500">
              <MapPin size={20} />
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-[#2F3A1d]"
            />
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-[#2F3A1d] px-6 py-3 font-semibold text-white transition hover:bg-[#414e2a] disabled:opacity-60"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
