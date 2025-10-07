import React from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to home after logout
  };

  const AdminLink = () =>
    user?.role === "admin" ? (
      <Link
        to="/admin/addFlashSet"
        className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition font-semibold"
      >
        Add Flash Set
      </Link>
    ) : null;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-slate-800">
            SKILL<span className="text-amber-500">CASE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/practice"
              className="text-slate-600 hover:text-slate-900 transition font-medium"
            >
              Practice
            </Link>
            <Link
              to="/test"
              className="text-slate-600 hover:text-slate-900 transition font-medium"
            >
              Test
            </Link>
            <Link
              to="/interview"
              className="text-slate-600 hover:text-slate-900 transition font-medium"
            >
              Interview
            </Link>

            {isAuthenticated ? (
              <>
                <AdminLink />
                <button
                  onClick={handleLogout}
                  className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition font-semibold"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/" className="block text-slate-600 hover:text-slate-900 font-medium">
              Home
            </Link>
            <Link
              to="/practice"
              className="block text-slate-600 hover:text-slate-900 font-medium"
            >
              Practice
            </Link>
            <Link
              to="/test"
              className="block text-slate-600 hover:text-slate-900 font-medium"
            >
              Test
            </Link>
            <Link
              to="/interview"
              className="block text-slate-600 hover:text-slate-900 font-medium"
            >
              Interview
            </Link>

            {isAuthenticated ? (
              <>
                <AdminLink />
                <button
                  onClick={handleLogout}
                  className="w-full bg-amber-500 text-white px-6 py-2 rounded-lg text-center font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full bg-amber-500 text-white px-6 py-2 rounded-lg text-center font-semibold"
              >
                Get Started
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
