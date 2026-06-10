import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Active link styling
  const activeLinkClass = ({ isActive }) =>
    isActive
      ? "text-white border-b-2 border-white pb-1"
      : "text-blue-100 hover:text-white transition";

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "block w-full text-left px-4 py-2 text-white bg-blue-700 rounded-md"
      : "block w-full text-left px-4 py-2 text-blue-100 hover:bg-blue-700 hover:text-white rounded-md transition";

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              SkillBridge
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/dashboard" className={activeLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={activeLinkClass}>
              Profile
            </NavLink>
            <NavLink to="/search" className={activeLinkClass}>
              Search
            </NavLink>
            <NavLink to="/sessions" className={activeLinkClass}>
              Sessions
            </NavLink>
            <NavLink to="/credits" className={activeLinkClass}>
              Credits
            </NavLink>
           
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md text-white text-sm font-medium transition shadow-sm"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (dropdown) */}
        {isOpen && (
          <div className="md:hidden pb-3 pt-2 space-y-1">
            <NavLink to="/dashboard" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
              Profile
            </NavLink>
            <NavLink to="/search" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
              Search
            </NavLink>
            <NavLink to="/sessions" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
              Sessions
            </NavLink>
            <NavLink to="/credits" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
              Credits
            </NavLink>        
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition mt-1"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;