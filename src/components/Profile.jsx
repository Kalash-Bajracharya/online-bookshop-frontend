
import { useState } from "react";
import { UserRound, Mail, Wallet } from "lucide-react";

const Profile = () => {
  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });

  // Placeholder until we connect the orders API
  const totalSpent = 0;

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto ">

        <h1 className="mb-2 text-3xl font-bold text-stone-800 flex justify-end">
          My Profile
        </h1>

  

        {/* Profile Header */}
        <div className="mb-6  h-20 flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#2F3A1d] text-2xl font-bold text-white">
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

        {/* Account Details */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-stone-800">
            Account Information
          </h2>

          <div className="flex items-center gap-4 border-b border-stone-100 py-4">
            <UserRound className="text-stone-500" size={22} />

            <div>
              <p className="text-sm text-stone-500">Full Name</p>
              <p className="font-medium text-stone-800">
                {user.name || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4">
            <Mail className="text-stone-500" size={22} />

            <div>
              <p className="text-sm text-stone-500">Email Address</p>
              <p className="break-all font-medium text-stone-800">
                {user.email || "Not available"}
              </p>
            </div>
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

      </div>
    </div>
  );
};

export default Profile;
