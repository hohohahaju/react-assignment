import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Wraps any route that requires the user to be logged in.
 * If not authenticated, redirects to /login and remembers
 * where the user was trying to go (via location.state.from),
 * so LoginPage can redirect them back after a successful login.
 */
export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}