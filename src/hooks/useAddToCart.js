import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

/**
 * Drop-in replacement for calling addToCart directly.
 *
 * Usage in any component:
 *
 *   const { handleAddToCart, feedback } = useAddToCart();
 *
 *   <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
 *   {feedback && <p>{feedback}</p>}
 *
 * - If the user is logged in  → adds to cart and shows a brief "Added!" confirmation.
 * - If the user is a guest    → redirects to /login, remembering the current page
 *                               so they come back here after signing in.
 */
export function useAddToCart() {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Brief feedback message shown after adding ("Added to cart!" or the login nudge)
  const [feedback, setFeedback] = useState("");

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      // Send them to login, and remember where they came from
      navigate("/login", { state: { from: location } });
      return;
    }

    addToCart(product);

    // Show a short "Added!" confirmation, then clear it after 2 seconds
    setFeedback("Added to cart!");
    setTimeout(() => setFeedback(""), 2000);
  };

  return { handleAddToCart, feedback };
}