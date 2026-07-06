import { Link } from "react-router-dom";
import { useAddToCart } from "../../hooks/useAddToCart";

/**
 * Example product card showing how to wire up the useAddToCart hook.
 * Adapt this to match your existing ProductCard / ProductList component.
 */
export default function ProductCard({ product }) {
  const { handleAddToCart, feedback } = useAddToCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

      {/* Product image — links to detail page */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>

      <div className="p-4">
        {/* Name & price */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <p className="mt-2 font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>

        {/* Add to Cart button */}
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all"
        >
          Add to Cart
        </button>

        {/* Feedback message — "Added to cart!" or empty */}
        {feedback && (
          <p className="mt-2 text-center text-sm font-medium text-green-600">
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}