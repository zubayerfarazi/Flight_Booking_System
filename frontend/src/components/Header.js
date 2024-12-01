import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`http://localhost:4000/api/logout`);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Flight Booking</Link>
        </h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/flights" className="hover:underline">
            Flights
          </Link>
          <Link to="/search" className="hover:underline">
            Search
          </Link>
        </nav>

        <div className="relative">
          {user ? (
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{user.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </div>
          )}

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
