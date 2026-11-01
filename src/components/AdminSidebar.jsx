import { Link } from "react-router-dom";
import Logout from "./Logout";

const AdminSidebar = ({ setUser }) => {
  return (
    <div className="p-5 w-1/6 bg-black h-screen flex flex-col sticky top-0">
      <h1 className="text-white font-bold text-3xl mb-10">Pages Admin</h1>

      <div className="flex flex-col gap-4">
        <Link
          to="/admin/Dashboard"
          className="text-white hover:bg-white hover:text-black p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/add"
          className="text-white hover:bg-white hover:text-black p-2 rounded"
        >
          Add Books
        </Link>

        <Link
          to="/admin/manage"
          className="text-white hover:bg-white hover:text-black p-2 rounded"
        >
          Manage Books
        </Link>

        <Link
          to="/admin/orders"
          className="text-white hover:bg-white hover:text-black p-2 rounded"
        >
          Manage Orders
        </Link>

        <Link
          to="/home"
          className="text-white hover:bg-white hover:text-black p-2 rounded"
        >
          Visit Website
        </Link>
      </div>

      <div className="mt-auto">
        <Logout setUser={setUser} />
      </div>
    </div>
  );
};

export default AdminSidebar;
