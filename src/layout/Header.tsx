import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  VideoCameraOutlined,
  BookOutlined,
  SearchOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import EMBLEM from "../assets/EMBLEM.svg";

const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle
  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // NavLink common style
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1 px-2 py-1 text-sm transition-colors duration-200 ${
      isActive
        ? "text-red-700 border-b border-red-700"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <>
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-[#1a1b2e] border-b border-gray-700 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={EMBLEM} alt="Logo" className="h-6 w-auto" />
            <span className="text-sm text-gray-200">MovieZone</span>
          </div>

          {/* NavLinks */}
          <nav className="flex items-center gap-3 sm:gap-5">
            <NavLink to="/" className={navLinkStyle}>
              <HomeOutlined />
              <span className="hidden sm:inline">Home</span>
            </NavLink>
            <NavLink to="/movies" className={navLinkStyle}>
              <VideoCameraOutlined />
              <span className="hidden sm:inline">Movies</span>
            </NavLink>
            <NavLink to="/saved" className={navLinkStyle}>
              <BookOutlined />
              <span className="hidden sm:inline">Saved</span>
            </NavLink>
            <NavLink to="/search" className={navLinkStyle}>
              <SearchOutlined />
              <span className="hidden sm:inline">Search</span>
            </NavLink>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="text-lg text-gray-400 hover:text-white transition"
          >
            {isDark ? <SunOutlined /> : <MoonOutlined />}
          </button>
        </div>
      </header>

      {/* Push-down spacer so content doesn't hide behind sticky header */}
      <div className={`${isScrolled ? "h-[48px]" : "h-[64px]"} transition-all duration-300`}></div>
    </>
  );
};

export default Header;
