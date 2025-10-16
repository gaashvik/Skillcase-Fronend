import React from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = React.useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Close admin dropdown when clicking outside
  const adminMenuRef = React.useRef();
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(e.target)) {
        setAdminMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              to={user?.user_prof_level ? `/practice/${user.user_prof_level}` : "/practice/test"}
              className="text-slate-600 hover:text-slate-900 transition font-medium"
            >
              Practice
            </Link>
            <Link
              to={user?.user_prof_level ? `/test/${user.user_prof_level}` : "/test/test"}
              className="text-slate-600 hover:text-slate-900 transition font-medium"
            >
              Test
            </Link>
            <Link
              to={user?.user_prof_level ? `/interview/${user.user_prof_level}` : "/interview/test"}
              className="text-slate-600 hover:text-slate-900 transition font-medium"
            >
              Interview
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <div className="relative" ref={adminMenuRef}>
                    <button
                      onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                      className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition font-semibold flex items-center space-x-2"
                    >
                      <span>Admin Tools</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {adminMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-2">
                        <Link
                          to="/admin/addFlashSet"
                          className="block px-4 py-2 text-slate-700 hover:bg-slate-100"
                          onClick={() => setAdminMenuOpen(false)}
                        >
                          ➕ Add Flash Set
                        </Link>
                        <Link
                          to="/admin/deleteFlashSet"
                          className="block px-4 py-2 text-slate-700 hover:bg-slate-100"
                          onClick={() => setAdminMenuOpen(false)}
                        >
                          🗑️ Delete Flash Set
                        </Link>
                      </div>
                    )}
                  </div>
                )}

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
              to={user?.user_prof_level ? `/practice/${user.user_prof_level}` : "/practice/test"}
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
                {user?.role === "admin" && (
                  <div className="space-y-2">
                    <Link
                      to="/admin/addFlashSet"
                      className="block w-full bg-cyan-500 text-white px-6 py-2 rounded-lg text-center font-semibold hover:bg-cyan-600 transition"
                    >
                     Add Flash Set
                    </Link>
                    <Link
                      to="/admin/deleteFlashSet"
                      className="block w-full bg-red-500 text-white px-6 py-2 rounded-lg text-center font-semibold hover:bg-red-600 transition"
                    >
                    Delete Flash Set
                    </Link>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full bg-amber-500 text-white px-6 py-2 rounded-lg text-center font-semibold hover:bg-amber-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full bg-amber-500 text-white px-6 py-2 rounded-lg text-center font-semibold hover:bg-amber-600 transition"
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
