import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, redirect them immediately to home page
  if (isLoggedIn) {
    navigate("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple mock validation rule
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    // Call your context login function
    login(email, password);
    
    // Redirect back to the shoe store main deck!
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your cart and view profile orders
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g., jackson@hehe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors shadow-md text-sm mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          Demo Mode: Enter any email and password combination to test.
        </div>
      </div>
    </div>
  );
}