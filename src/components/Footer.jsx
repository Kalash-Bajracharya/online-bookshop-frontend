import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-2">
      <div className="px-20 py-5">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold">Pages</h2>

            <p className="text-gray-300 mt-2">
               Discover your next favorite book. Explore stories,
              knowledge, and adventures all in one place.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <p className="text-gray-300 mb-1 cursor-pointer">
              Home
            </p>

            <p className="text-gray-300 mb-1 cursor-pointer">
              Books
            </p>

            <p className="text-gray-300 mb-1 cursor-pointer">
              Categories
            </p>

            <p className="text-gray-300 cursor-pointer">
              Contact
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <div className="flex gap-2 items-center mb-3 text-gray-300">
              <MapPin size={18} />
              <span>Kathmandu, Nepal</span>
            </div>

            <div className="flex gap-2 items-center mb-3 text-gray-300">
              <Phone size={18} />
              <span>+977 9800000000</span>
            </div>

            <div className="flex gap-2 items-center text-gray-300">
              <Mail size={18} />
              <span>hello@pages.com</span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-5 pt-2 text-center text-gray-400">
          © 2026 Pages. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;