
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logout from "./Logout";

const AdminSidebar = ({ setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="p-5 w-full md:w-1/6 bg-black text-white md:min-h-screen md:h-screen md:sticky md:top-0 flex flex-col shrink-0">

      <div className="flex justify-between items-center p-5">
        <h1 className="font-bold text-2xl md:text-3xl">
          Pages Admin
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col gap-4 px-5`}>
        <Link onClick={() => setMenuOpen(false)} to="/admin/Dashboard" className="hover:bg-white hover:text-black p-2 rounded">
          Dashboard
        </Link>

        <Link onClick={() => setMenuOpen(false)} to="/admin/add" className="hover:bg-white hover:text-black p-2 rounded">
          Add Books
        </Link>

        <Link onClick={() => setMenuOpen(false)} to="/admin/manage" className="hover:bg-white hover:text-black p-2 rounded">
          Manage Books
        </Link>

        <Link onClick={() => setMenuOpen(false)} to="/admin/orders" className="hover:bg-white hover:text-black p-2 rounded">
          Manage Orders
        </Link>

        <Link onClick={() => setMenuOpen(false)} to="/home" className="hover:bg-white hover:text-black p-2 rounded">
          Visit Website
        </Link>
      </div>

      <div className={`${menuOpen ? "block" : "hidden"} md:block mt-auto p-5`}>
        <Logout setUser={setUser} />
      </div>

    </div>
  );
};

export default AdminSidebar;
