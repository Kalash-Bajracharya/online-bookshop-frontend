import { useState, useEffect } from "react";
import { Avatar } from "@mantine/core";
import { Search, Menu, X, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBooks from "./SearchBooks";
import AvatarMenu from "./AvatarMenu";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Shop", path: "/shop" },
    // { name: "Categories", path: "/categories" },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 w-full  backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-screen-2xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Logo */}
        <Link
          to="/home"
          onClick={closeMenu}
          className="shrink-0 text-2xl font-bold text-primary sm:text-3xl"
        >
          Pages
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-gray-300 bg-secondary p-1 md:flex lg:gap-4 ">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-primary hover:text-white lg:px-4 hover:scale-125"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search + Profile + Mobile Menu */}
        <div className="flex min-w-0 items-center justify-center gap-2 sm:gap-3 lg:gap-5">
          <div>
            <Link to="/Cart">
              <ShoppingCartIcon size={21} color="#2F3A1d" />
            </Link>
          </div>
          <div className="w-28 min-w-0 sm:w-40 md:w-44 lg:w-56 xl:w-64">
            <SearchBooks />
          </div>

          {user ? (
            <AvatarMenu user={user} setUser={setUser} />
          ) : (
            <Link
              to="/Login"
              className="rounded-full bg-primary px-4 py-2 text-sm text-white transition hover:opacity-80"
            >
              Login
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 transition hover:bg-gray-200 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-stone-50 px-4 py-4 shadow-lg md:hidden sm:px-6">
          <div className="flex flex-col gap-2 ">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-primary hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
