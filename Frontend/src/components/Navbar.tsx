import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { LINKS } from "../constants";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = (event: React.MouseEvent, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-4 z-50 flex w-full justify-center">
      {/* Wrapper that is centered */}
      <div className="flex items-center justify-between w-[90%] max-w-5xl p-4 backdrop-blur-lg rounded-full shadow-lg bg-white/70">
        {/* Logo */}
        <img src={logo} alt="logo" width={80} height={22} />

        {/* Desktop Links */}
        <div className="hidden space-x-6 lg:flex">
          {LINKS.map((link, index) => (
            <a
              key={index}
              href={`#${link.targetId}`}
              className={`text-sm ${
                index !== 0 ? "border-l-2 border-neutral-300/20 pl-2" : ""
              } hover:opacity-50`}
              onClick={(e) => handleScroll(e, link.targetId)}
            >
              {link.text}
            </a>
          ))}

          {/* Admin Link */}
          <Link
            to="/admin-login-99"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

{isMobileMenuOpen && (
  <div className="absolute top-full mt-2 w-[90%] max-w-5xl backdrop-blur-lg rounded-lg shadow-lg bg-white/90 lg:hidden">
    {LINKS.map((link, index) => (
      <a
        key={index}
        href={`#${link.targetId}`}
        className="block p-4 uppercase tracking-tighter text-gray-800 font-medium hover:text-blue-600 hover:bg-gray-100 rounded"
        onClick={(e) => handleScroll(e, link.targetId)}
      >
        {link.text}
      </a>
    ))}
    <Link
      to="/admin-login-99"
      className="block p-4 uppercase tracking-tighter text-gray-800 font-medium hover:text-blue-600 hover:bg-gray-100 rounded"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      Admin
    </Link>
  </div>
)}

    </nav>
  );
};

export default Navbar;
