
import { Outlet, Route, Routes, Navigate } from "react-router-dom";

// Public layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./body/user/Home";
import Shop from "./body/user/Shop";
import Detail from "./body/user/Detail";

// Authentication
import Login from "./body/Login";
import Signup from "./body/signup";
import Cart from "./components/Cart";

// User pages
import Profile from "./components/Profile";

// Admin pages
import AdminSidebar from "./components/AdminSidebar";
import Dashboard from "./body/admin/Dashboard";
import ManageBooks from "./body/admin/ManageBooks";
import Demo from "./body/Demo";


// Route guards
import PrivateRoutes from "./routes/PrivateRoutes";
import UserRoutes from "./routes/UserRoutes";
import AddBooks from "./body/admin/AddBooks";
import ManageOrders from "./body/admin/ManageOrders";



function App() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<Navigate to="/home" replace />} />

          {/* Visitors can browse without logging in */}
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="detail/:_id" element={<Detail />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/user"
          element={
            <UserRoutes>
              <>
                <Navbar />
                <Outlet />
              </>
            </UserRoutes>
          }
        >
          <Route path="Profile" element={<Profile />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <div className="flex">
              <AdminSidebar  />
              <Outlet />
              </div>
            </PrivateRoutes>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add" element={<AddBooks />} />
          <Route path="manage" element={<ManageBooks />} />
          <Route path="/admin/books/edit/:id" element={<AddBooks />} />
          <Route path="orders" element={<ManageOrders />} />

          <Route path="demo" element={<Demo />} />
        </Route>

        {/* ================= AUTHENTICATION ================= */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* ================= NOT FOUND ================= */}
        <Route path="*" element={<h1 className="p-10">Not found :101</h1>} />
      </Routes>
    </div>
  );
}

export default App;
