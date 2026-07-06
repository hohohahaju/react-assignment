import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where the user was trying to go before being redirected here.
  // Falls back to "/" if they landed on /login directly.
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If they somehow reach this page while already logged in, send them home.
  if (isLoggedIn) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ── Replace this block with your real API call ──────────────────────
      // Example using DummyJSON (a free fake auth endpoint):
      //
      // const res = await fetch("https://dummyjson.com/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username: email, password }),
      // });
      // if (!res.ok) throw new Error("Invalid email or password.");
      // const data = await res.json();
      // login(data.token, email);
      //
      // ── Stub login for now (remove when you have a real backend) ─────────
      if (!email || !password) throw new Error("Please fill in all fields.");
      if (password.length < 6) throw new Error("Password must be at least 6 characters.");
      login("stub-token-" + Date.now(), email);
      // ─────────────────────────────────────────────────────────────────────

      // After login, go back to where they were trying to go.
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h2>
        <p className="text-sm text-gray-500 mb-6">
          {from !== "/"
            ? "You need to sign in to continue."
            : "Welcome back! Sign in to your account."}
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}