import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Header({ searchQuery, setSearchQuery }) {
  const { cart } = useCart();
  const { isLoggedIn, userEmail, logout } = useAuth();
  const navigate = useNavigate();

  // Total number of individual items in the cart (not unique products)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 whitespace-nowrap hover:text-blue-600 transition-colors"
          >
            👟 SneakerStore
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search sneakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Right side nav */}
          <nav className="flex items-center gap-3">

            {/* Contact link */}
            <Link
              to="/contact"
              className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>

            {/* Cart button with badge */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label={`Cart, ${cartItemCount} item${cartItemCount !== 1 ? "s" : ""}`}
            >
              {/* Cart icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11"
                />
              </svg>

              <span className="hidden sm:inline">Cart</span>

              {/* Badge — only shown when cart has items */}
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth — show user email + logout when logged in, sign in when not */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:block text-sm text-gray-500 truncate max-w-[140px]">
                  {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}